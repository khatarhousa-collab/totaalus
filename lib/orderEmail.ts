// Server-side builder for the "betaalgegevens" email sent to a customer after
// they place a TV Box order. Mirrors email-templates/betaling-bankoverschrijving.html.
// Kept as an inline string (not a file read) so it bundles reliably on Vercel.

export const ORDER_EMAIL_SUBJECT = 'Rond je bestelling af — betaalgegevens Android 14 TV Box';

// Escape user-supplied values so an order field can never inject markup.
function esc(v: string): string {
  return String(v || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export type OrderEmailFields = {
  name: string;
  address: string;
  phone: string;
  reference: string; // full reference the customer must quote, e.g. "Complete Growth Library 47"
};

export function buildOrderEmailHtml({ name, address, phone, reference }: OrderEmailFields): string {
  const N = esc(name);
  const A = esc(address);
  const T = esc(phone);
  const R = esc(reference);

  return `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  body{margin:0;padding:0;}
  /* Laat de contactknoppen netjes onder elkaar vallen op smalle telefoons */
  @media only screen and (max-width:480px){
    .stack-btn{display:block !important;width:100% !important;margin-bottom:10px !important;}
    .stack-btn a{display:block !important;}
    .btn-gap{display:none !important;}
  }
</style>
</head>
<body>
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">Nog &eacute;&eacute;n stap: rond je bestelling af met een directe overschrijving. Vandaag betaald = vandaag ingepakt.</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f2ec;margin:0;padding:0;font-family:'Figtree',Arial,Helvetica,sans-serif;">
  <tr>
    <td align="center" style="padding:32px 12px;">

      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background-color:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.08);">

        <tr><td style="height:5px;background:linear-gradient(90deg,#f59e0b 0%,#ca8a04 100%);font-size:0;line-height:0;">&nbsp;</td></tr>

        <tr>
          <td style="padding:36px 32px 8px 32px;">
            <p style="margin:0 0 16px 0;font-size:18px;font-weight:700;color:#111111;">Beste ${N},</p>
            <p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:#444444;">
              Bedankt voor je bestelling! Om je bestelling af te ronden, maak je het bedrag over via
              een directe bankoverschrijving (SEPA Instant) met onderstaande gegevens. &#128230; Zodra je betaling binnen is,
              pakken we je bestelling <strong>dezelfde dag</strong> nog in. Je ontvangt je TV Box
              <strong>binnen 3 dagen</strong> netjes thuisbezorgd.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:0 32px 8px 32px;">
            <p style="margin:0 0 8px 0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#b9902a;">Jouw bestelling</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#000000;">
              <tr>
                <td align="center" style="padding:0;font-size:0;line-height:0;">
                  <img src="https://www.pandoraiptv.app/box-main.png" width="600" alt="Android 14 TV Box" style="display:block;width:100%;max-width:600px;height:auto;border:0;">
                </td>
              </tr>
              <tr>
                <td style="padding:4px 32px 28px 32px;">
                  <p style="margin:0 0 10px 0;font-size:20px;font-weight:800;color:#ffffff;">Android 14 TV Box</p>
                  <p style="margin:0 0 18px 0;line-height:1.2;">
                    <span style="color:#8a8577;text-decoration:line-through;font-size:15px;">&euro; 280</span>
                    &nbsp;<span style="color:#f5b301;font-size:38px;font-weight:900;letter-spacing:-1px;">&euro; 180</span>
                    &nbsp;<span style="color:#9c9585;font-size:13px;">eenmalig</span>
                    &nbsp;<span style="display:inline-block;background:linear-gradient(90deg,#f59e0b,#ca8a04);color:#111111;font-size:12px;font-weight:800;padding:4px 11px;border-radius:999px;vertical-align:middle;">Bespaar &euro; 100</span>
                  </p>
                  <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.9;color:#d8d2c4;">
                    <tr><td style="color:#f5b301;padding-right:8px;">&#10003;</td><td>4K Ultra HD + HDR10</td></tr>
                    <tr><td style="color:#f5b301;padding-right:8px;">&#10003;</td><td>Android 14 &middot; 2 GB RAM &middot; 16 GB opslag</td></tr>
                    <tr><td style="color:#f5b301;padding-right:8px;">&#10003;</td><td>80.000+ zenders inbegrepen</td></tr>
                    <tr><td style="color:#f5b301;padding-right:8px;">&#10003;</td><td>12 maanden IPTVTotaal abonnement <strong style="color:#f5b301;">cadeau</strong></td></tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:28px 32px 8px 32px;">
            <p style="margin:0 0 4px 0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#b9902a;">Verzendgegevens</p>
            <p style="margin:0 0 12px 0;font-size:13px;line-height:1.5;color:#666666;">Controleer of je verzendgegevens kloppen &mdash; zo komt je TV Box zonder vertraging aan.</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf8f2;border:1px solid #ece5d3;border-radius:12px;">
              <tr>
                <td style="padding:16px 20px;font-size:14px;line-height:1.7;color:#333333;">
                  <strong style="color:#111;">Naam:</strong> ${N}<br>
                  <strong style="color:#111;">Adres:</strong> ${A}<br>
                  <strong style="color:#111;">Telefoon:</strong> ${T}
                </td>
              </tr>
            </table>
            <p style="margin:10px 0 0 0;font-size:13px;line-height:1.5;color:#666666;">Klopt er iets niet? Laat het ons weten via <a href="https://wa.me/447449708976" target="_blank" style="color:#b9902a;font-weight:700;text-decoration:none;">WhatsApp</a> of <a href="mailto:info@iptvtotaal.digital" style="color:#b9902a;font-weight:700;text-decoration:none;">e-mail</a> voordat we verzenden.</p>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 32px 8px 32px;">
            <p style="margin:0 0 8px 0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#b9902a;">Bankoverschrijving</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fffaf0;border:2px solid #f5b301;border-radius:12px;box-shadow:0 6px 22px rgba(245,179,1,0.28);">
              <tr>
                <td style="padding:20px 22px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.5;color:#333333;">
                    <tr>
                      <td style="padding:6px 0;color:#777;width:120px;">Naam</td>
                      <td style="padding:6px 0;font-weight:700;color:#111;">Monarchix</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;color:#777;">IBAN</td>
                      <td style="padding:6px 0;font-weight:700;color:#111;letter-spacing:0.5px;">BE72 9675 9839 8016</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;color:#777;">Referentie</td>
                      <td style="padding:6px 0;font-weight:700;color:#111;">${R}</td>
                    </tr>
                    <tr>
                      <td colspan="2" style="padding:12px 0 0 0;">
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-top:1px dashed #e3cf9a;">
                          <tr>
                            <td style="padding-top:12px;color:#777;font-size:14px;width:120px;">Bedrag</td>
                            <td style="padding-top:12px;font-size:28px;font-weight:900;color:#111;letter-spacing:-0.5px;">&euro; 180,00</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:16px 32px 4px 32px;">
            <p style="margin:0;font-size:13px;line-height:1.6;color:#8a6d1f;background-color:#fdf6e3;border-radius:10px;padding:14px 16px;">
              &#9888;&#65039; <strong>Belangrijk:</strong> vermeld de referentie <strong>exact</strong> en maak het
              <strong>precieze bedrag</strong> over. Zo koppelen we je betaling meteen aan je bestelling.
              Rond je betaling bij voorkeur <strong>binnen 48 uur</strong> af, dan houden we je bestelling voor je klaar.
            </p>
          </td>
        </tr>

        <tr>
          <td align="center" style="padding:24px 32px 6px 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td style="border-radius:999px;background:linear-gradient(90deg,#f59e0b 0%,#ca8a04 100%);">
                  <a href="https://www.pandoraiptv.app/tv-box" target="_blank"
                     style="display:inline-block;padding:14px 36px;font-size:15px;font-weight:700;color:#111111;text-decoration:none;border-radius:999px;">
                    Bekijk de TV Box &rarr;
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td align="center" style="padding:14px 32px 8px 32px;">
            <p style="margin:0 0 16px 0;font-size:14px;line-height:1.6;color:#555555;">
              Hulp nodig? Neem gerust contact met ons op via e-mail of WhatsApp &mdash; we helpen je 24/7.
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" align="center">
              <tr>
                <td class="stack-btn" style="border-radius:999px;background-color:#111111;">
                  <a href="mailto:info@iptvtotaal.digital"
                     style="display:inline-block;padding:12px 26px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">
                    &#9993;&#65039;&nbsp; E-mail ons
                  </a>
                </td>
                <td class="btn-gap" style="width:12px;font-size:0;line-height:0;">&nbsp;</td>
                <td class="stack-btn" style="border-radius:999px;background-color:#25D366;">
                  <a href="https://wa.me/447449708976" target="_blank"
                     style="display:inline-block;padding:12px 26px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">
                    &#128172;&nbsp; WhatsApp
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:28px 32px;background-color:#080808;">
            <p style="margin:0 0 4px 0;font-size:15px;font-weight:800;color:#ffffff;">IPTV<span style="color:#f5b301;">Totaal</span></p>
            <p style="margin:0;font-size:12px;line-height:1.6;color:#8a8577;">
              80.000+ zenders &middot; vanaf &euro;4,60/maand &middot; 99,9% uptime<br>
              15 dagen geld-terug-garantie &middot; 24/7 WhatsApp support
            </p>
          </td>
        </tr>

      </table>

      <p style="margin:16px 0 0 0;font-size:11px;color:#aaa;">Deze e-mail is verstuurd omdat je een bestelling hebt geplaatst bij IPTVTotaal.</p>

    </td>
  </tr>
</table>
</body>
</html>`;
}
