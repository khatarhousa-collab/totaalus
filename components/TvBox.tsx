import React, { useRef, useState } from 'react';

const whatsappNumber = '447449708976';

const trackConversion = () => {
  if (typeof (window as any).gtag !== 'undefined') {
    (window as any).gtag('event', 'conversion', { 'send_to': 'AW-18174158750/7VouCIXTmLccEJ7PjtpD' });
  }
};

const handleOrder = () => {
  trackConversion();
  const msg = 'Hallo, ik wil graag de Android TV Box bestellen (inclusief IPTVTotaal abonnement) voor €160.';
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
};

const specs = [
  { label: 'Besturingssysteem', value: 'Android 14' },
  { label: 'Processor', value: 'Quad-Core' },
  { label: 'RAM', value: '2 GB' },
  { label: 'Opslag', value: '16 GB eMMC' },
  { label: 'Video Output', value: '4K Ultra HD + HDR10' },
  { label: 'Connectiviteit', value: 'Dual Band WiFi 2.4 / 5 GHz' },
  { label: 'Resolutie', value: '4K UHD HDR10' },
  { label: 'IPTV App', value: 'Vooraf geïnstalleerd' },
];

const included = [
  '80.000+ zenders inclusief HD & 4K',
  '140.000+ films & series on demand',
  '12 maanden IPTVTotaal abonnement',
  'IPTV app vooraf geïnstalleerd & geconfigureerd',
  '24/7 WhatsApp support',
  '99,9% server uptime garantie',
  'Gratis updates & onderhoud',
];

const SHIPPING_DAYS = 3;

const getDeliveryDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + SHIPPING_DAYS);
  return date.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' });
};

const faqs = [
  {
    q: 'Wat heb ik verder nodig?',
    a: 'Alleen een internetverbinding en een televisie met HDMI-ingang. De box wordt kant-en-klaar geleverd met alles erop en eraan.',
  },
  {
    q: 'Is het abonnement al geactiveerd?',
    a: 'Ja. Na levering hoef je de box alleen aan te sluiten. Het abonnement is al geactiveerd en de app is geconfigureerd.',
  },
  {
    q: 'Hoe lang duurt levering?',
    a: `Wij leveren binnen ${SHIPPING_DAYS} dagen. Besteld je vandaag, dan ontvang je de box op ${getDeliveryDate()}. Na je bestelling via WhatsApp nemen wij direct contact op.`,
  },
  {
    q: 'Kan ik het abonnement later verlengen?',
    a: 'Ja, na 12 maanden kan je het abonnement eenvoudig verlengen via WhatsApp tegen de dan geldende abonnementsprijs.',
  },
];

const CheckIcon = () => (
  <svg className="w-4 h-4 text-black flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const galleryImages = ['/box-main.png', '/box1.png', '/box2.png', '/box3.png'];

export const TvBox: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goToImage = (i: number) => {
    setActiveImage((i + galleryImages.length) % galleryImages.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const SWIPE_THRESHOLD = 40;
    if (deltaX > SWIPE_THRESHOLD) {
      goToImage(activeImage - 1);
    } else if (deltaX < -SWIPE_THRESHOLD) {
      goToImage(activeImage + 1);
    }
    touchStartX.current = null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-black">

      {/* ── PRODUCT SECTION — white background ── */}
      <div className="bg-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* LEFT — product image gallery */}
            <div className="flex flex-col gap-4">
              <div
                className="relative rounded-[24px] overflow-hidden bg-gray-100 border border-gray-200 aspect-square select-none"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={galleryImages[activeImage]}
                  alt="Android 14 TV Box"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <button
                  onClick={() => goToImage(activeImage - 1)}
                  aria-label="Vorige afbeelding"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => goToImage(activeImage + 1)}
                  aria-label="Volgende afbeelding"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {galleryImages.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => goToImage(i)}
                    className={`rounded-2xl overflow-hidden bg-gray-100 border-2 aspect-square transition-colors ${activeImage === i ? 'border-amber-500' : 'border-gray-200 hover:border-amber-300'}`}
                  >
                    <img src={img} alt={`Android 14 TV Box ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT — product info */}
            <div className="flex flex-col gap-6 lg:pt-4">

              <div className="inline-block w-fit px-4 py-1.5 bg-amber-50 border border-amber-300 rounded-full text-xs font-bold uppercase tracking-widest text-amber-600">
                Nieuw
              </div>

              <div>
                <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900 leading-tight">
                  Android 14 TV Box
                </h1>
                <p className="text-lg font-bold text-amber-500 mt-1">+ 12 maanden IPTVTotaal abonnement</p>
              </div>

              <div className="flex items-end gap-3 border-b border-gray-200 pb-6">
                <span className="text-6xl font-black tracking-tighter text-gray-900">€160</span>
                <div className="pb-2 space-y-0.5">
                  <p className="text-amber-500 font-bold text-sm uppercase tracking-widest">eenmalig</p>
                  <p className="text-gray-400 text-sm">Inclusief 12 mnd abonnement</p>
                </div>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed">
                Ontvang een kant-en-klare 4K Android 14 TV Box met 12 maanden IPTVTotaal abonnement. Direct aansluiten en genieten van 80.000+ zenders, films en series in 4K Ultra HD met HDR10.
              </p>

              <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-amber-50 border border-amber-300">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M1 3h15v13H1z" />
                    <path d="M16 8h4l3 3v5h-7V8z" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div>
                  <p className="font-black text-gray-900 text-sm">Binnen {SHIPPING_DAYS} dagen in huis</p>
                  <p className="text-amber-600 font-bold text-xs uppercase tracking-wide">Besteld vandaag = geleverd op {getDeliveryDate()}</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {['4K Ultra HD + HDR10', 'Android 14', '80.000+ zenders inbegrepen'].map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 flex items-center justify-center flex-shrink-0">
                      <CheckIcon />
                    </div>
                    {f}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleOrder}
                  className="flex-1 py-5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-black text-lg hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-amber-200"
                >
                  Bestel via WhatsApp
                </button>
                <a
                  href="/#pricing"
                  className="flex-1 py-5 rounded-2xl border-2 border-gray-200 text-gray-700 font-bold text-lg hover:border-amber-400 hover:text-amber-600 transition-all text-center"
                >
                  Alleen abonnement →
                </a>
              </div>

              <p className="text-gray-400 text-xs font-medium">
                24/7 WhatsApp support &bull; Geen verborgen kosten
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 pt-24">

        {/* What's included */}
        <div className="mb-24">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-block px-4 py-1.5 bg-amber-500/15 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-widest text-amber-400">
              Inbegrepen
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white">
              Alles wat je nodig hebt
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {included.map((item, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 flex items-start gap-3 border border-white/10 hover:border-amber-500/30 transition-colors">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckIcon />
                </div>
                <span className="text-sm font-bold text-white/85 leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Specs */}
        <div className="mb-24 glass-card rounded-[32px] p-10 lg:p-16 border border-white/10">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-block px-4 py-1.5 bg-amber-500/15 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-widest text-amber-400">
              Specificaties
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white">
              Technische details
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specs.map((s) => (
              <div key={s.label} className="space-y-1 p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs font-black uppercase tracking-widest text-amber-400/70">{s.label}</p>
                <p className="text-lg font-black text-white">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-24 max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-block px-4 py-1.5 bg-amber-500/15 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-widest text-amber-400">
              FAQ
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white">
              Veelgestelde vragen
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card rounded-2xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-black text-white pr-4">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-amber-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}
                    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-white/60 font-medium leading-relaxed border-t border-white/10 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center rounded-[32px] p-12 lg:p-20 space-y-6" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(0,0,0,0) 100%)', border: '1px solid rgba(245,158,11,0.25)' }}>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-white">
            Klaar om te beginnen?
          </h2>
          <p className="text-white/60 font-medium text-lg max-w-xl mx-auto">
            Bestel vandaag nog je TV Box en geniet binnen enkele dagen van onbeperkt televisie.
          </p>
          <button
            onClick={handleOrder}
            className="px-10 py-5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-black text-xl hover:opacity-90 active:scale-95 transition-all"
            style={{ boxShadow: '0 0 40px rgba(245,158,11,0.4)' }}
          >
            Bestel Nu — €160
          </button>
          <p className="text-white/30 text-sm">Geen verborgen kosten</p>
        </div>

      </div>
    </div>
    </div>
  );
};
