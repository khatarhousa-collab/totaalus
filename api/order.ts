// Vercel serverless function: saves TV Box checkout submissions to a Notion database.
// Requires env vars: NOTION_TOKEN (internal integration secret) and NOTION_DATABASE_ID.

import { ORDER_EMAIL_SUBJECT, buildOrderEmailHtml } from '../lib/orderEmail';

const NOTION_API = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';

type OrderData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  apartment?: string;
  postcode?: string;
  city?: string;
  country?: string;
  product?: string;
  price?: number;
  paymentMethod?: string;
  status?: string;
};

const richText = (content: string) => ({ rich_text: [{ text: { content: content || '' } }] });

// Vercel injects the visitor's IP + geolocation as request headers (no external
// lookup needed). City is URL-encoded (e.g. "New%20York").
function extractGeo(req: any) {
  const h = req.headers || {};
  const get = (k: string) => {
    const v = h[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const forwarded = (get('x-forwarded-for') || '').split(',')[0].trim();
  const ip = forwarded || get('x-real-ip') || '';
  const decode = (v?: string) => {
    if (!v) return '';
    try { return decodeURIComponent(v); } catch { return v; }
  };
  return {
    ip,
    country: get('x-vercel-ip-country') || '',
    region: get('x-vercel-ip-country-region') || '',
    city: decode(get('x-vercel-ip-city')),
  };
}

// The checkout UI is in Dutch; map its values to the English Notion select options.
const COUNTRY_MAP: Record<string, string> = {
  Nederland: 'Netherlands',
  België: 'Belgium',
  Duitsland: 'Germany',
  Luxemburg: 'Luxembourg',
};
const PAYMENT_MAP: Record<string, string> = {
  iDEAL: 'iDEAL',
  Bancontact: 'Bancontact',
  Creditcard: 'Credit card',
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!token || !databaseId) {
    res.status(500).json({ error: 'Notion is not configured' });
    return;
  }

  const body: { action?: 'create' | 'update'; pageId?: string; data?: OrderData } =
    typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const { action = 'create', pageId, data = {} } = body;

  const name = [data.firstName, data.lastName].filter(Boolean).join(' ').trim() || 'Onbekend';
  const fullAddress = [data.address, data.apartment].filter(Boolean).join(', ');

  const properties: Record<string, unknown> = {
    'Name': { title: [{ text: { content: name } }] },
    'Address': richText(fullAddress),
    'Postal code': richText(data.postcode || ''),
    'City': richText(data.city || ''),
    'Product': richText(data.product || ''),
  };
  if (data.email) properties['Email'] = { email: data.email };
  if (data.phone) properties['Phone'] = { phone_number: data.phone };
  if (data.country) properties['Country'] = { select: { name: COUNTRY_MAP[data.country] ?? data.country } };
  if (typeof data.price === 'number') properties['Price'] = { number: data.price };
  if (data.paymentMethod) properties['Payment method'] = { select: { name: PAYMENT_MAP[data.paymentMethod] ?? data.paymentMethod } };
  if (data.status) properties['Status'] = { select: { name: data.status } };

  // Capture the customer's IP and geo-region from Vercel's edge headers.
  const geo = extractGeo(req);
  if (geo.ip) properties['IP address'] = richText(geo.ip);
  const location = [geo.city, geo.region, geo.country].filter(Boolean).join(', ');
  if (location) properties['Location'] = richText(location);

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Notion-Version': NOTION_VERSION,
    'Content-Type': 'application/json',
  };

  try {
    // Detect a duplicate "Order placed" (e.g. a double click) by reading the
    // page's current status before we overwrite it — so we email only once.
    let alreadyPlaced = false;
    if (action === 'update' && pageId && data.status === 'Order placed') {
      try {
        const prev = await fetch(`${NOTION_API}/pages/${pageId}`, { headers });
        const prevJson: any = await prev.json();
        alreadyPlaced = (prevJson?.properties?.Status?.select?.name || '') === 'Order placed';
      } catch {
        /* best-effort: if we can't read it, we proceed */
      }
    }

    let notionRes: Response;
    if (action === 'update' && pageId) {
      notionRes = await fetch(`${NOTION_API}/pages/${pageId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ properties }),
      });
    } else {
      notionRes = await fetch(`${NOTION_API}/pages`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ parent: { database_id: databaseId }, properties }),
      });
    }

    const json: any = await notionRes.json();
    if (!notionRes.ok) {
      res.status(502).json({ error: 'Notion error', detail: json });
      return;
    }

    const resultPageId: string = json.id;

    // When an order is confirmed (and this isn't a duplicate submit): generate a
    // payment reference, email the customer (Netherlands only) and notify the owner.
    // Everything here is best-effort and never fails the order request.
    if (data.status === 'Order placed' && resultPageId && !alreadyPlaced) {
      const twoDigits = String(Math.floor(Math.random() * 100)).padStart(2, '0');
      const reference = `Complete Growth Library ${twoDigits}`;
      const isNL = geo.country === 'NL';

      // Send the payment-details email — only to customers located in the Netherlands.
      let emailSent = false;
      if (isNL && data.email && process.env.RESEND_API_KEY) {
        const shippingAddress = [fullAddress, [data.postcode, data.city].filter(Boolean).join(' ')]
          .filter(Boolean)
          .join(', ');
        try {
          const mailRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'IPTVTotaal <bestellingen@iptvtotaal.digital>',
              to: [data.email],
              bcc: ['info@iptvtotaal.digital'],
              reply_to: 'info@iptvtotaal.digital',
              subject: ORDER_EMAIL_SUBJECT,
              html: buildOrderEmailHtml({
                name,
                address: shippingAddress,
                phone: data.phone || '',
                reference,
              }),
            }),
          });
          emailSent = mailRes.ok;
        } catch {
          /* email is best-effort */
        }
      }

      // Record the reference and the email outcome on the page (best-effort;
      // silently ignored if these columns don't exist in the database yet).
      const emailStatus = !isNL ? 'Buiten NL' : emailSent ? 'Verzonden' : 'Mislukt';
      try {
        await fetch(`${NOTION_API}/pages/${resultPageId}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            properties: {
              'Referentie': richText(reference),
              'Email verzonden': { select: { name: emailStatus } },
            },
          }),
        });
      } catch {
        /* best-effort */
      }

      // Notify the owner with an @mention comment — now including the reference
      // and whether the payment email went out.
      const notifyUserId = process.env.NOTION_NOTIFY_USER_ID || '416df3c2-86b0-40a1-85d8-6038e902c39b';
      const priceLabel = typeof data.price === 'number' ? ` · €${data.price}` : '';
      const mailNote = !isNL
        ? ' · ✉️ geen mail (buiten NL)'
        : emailSent
          ? ' · ✉️ mail verzonden'
          : ' · ✉️ mail niet verzonden';
      const summary = `${name} · ${data.product || 'Bestelling'}${priceLabel} · Ref: ${reference}${mailNote}`;
      try {
        await fetch(`${NOTION_API}/comments`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            parent: { page_id: resultPageId },
            rich_text: [
              { type: 'text', text: { content: '🎉 Nieuwe bestelling geplaatst! ' } },
              { type: 'mention', mention: { type: 'user', user: { id: notifyUserId } } },
              { type: 'text', text: { content: ` — ${summary}` } },
            ],
          }),
        });
      } catch {
        /* notification is best-effort */
      }
    }

    res.status(200).json({ pageId: resultPageId });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'Unknown error' });
  }
}
