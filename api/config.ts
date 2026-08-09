// Vercel serverless function: exposes site-wide config (currently just the
// WhatsApp contact number) so it can be changed from the wa-admin panel via
// Edge Config without redeploying this site. Falls back to the hardcoded
// number on any failure, so the site never breaks.
import { get } from '@vercel/edge-config';

const FALLBACK_WHATSAPP_NUMBER = '447449708976';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let whatsappNumber = FALLBACK_WHATSAPP_NUMBER;
  try {
    const value = await get('totaalus_whatsappNumber');
    if (typeof value === 'string' && /^\d{8,15}$/.test(value)) {
      whatsappNumber = value;
    }
  } catch {
    // Edge Config not configured / unreachable — serve the fallback silently.
  }

  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=15, stale-while-revalidate=300');
  res.status(200).json({ whatsappNumber });
}
