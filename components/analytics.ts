// Google Ads conversion for WhatsApp clicks (account AW-18279133277).
export const trackWhatsAppConversion = () => {
  if (typeof (window as any).gtag !== 'undefined') {
    (window as any).gtag('event', 'conversion', { send_to: 'AW-18279133277/dSPgCJ-nstAcEN3glYxE' });
  }
};
