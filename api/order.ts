// Vercel serverless function: saves TV Box checkout submissions to a Notion database.
// Requires env vars: NOTION_TOKEN (internal integration secret) and NOTION_DATABASE_ID.

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

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Notion-Version': NOTION_VERSION,
    'Content-Type': 'application/json',
  };

  try {
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
    res.status(200).json({ pageId: json.id });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'Unknown error' });
  }
}
