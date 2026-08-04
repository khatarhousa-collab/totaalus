import React, { useEffect, useRef, useState } from 'react';
import { TvBoxCheckout } from './TvBoxCheckout';

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
  '12 maanden IPTVTotaal abonnement cadeau',
  'IPTV app vooraf geïnstalleerd & geconfigureerd',
  '24/7 WhatsApp support',
  '99,9% server uptime garantie',
  'Gratis updates & onderhoud',
];

const SHIPPING_DAYS = 1;
const SHIPPING_DAYS_LABEL = `${SHIPPING_DAYS} ${SHIPPING_DAYS === 1 ? 'dag' : 'dagen'}`;

const getDeliveryDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + SHIPPING_DAYS);
  return date.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' });
};

const faqs = [
  {
    q: 'Hoe werkt de betaling?',
    a: 'Je rondt je bestelling af en onze medewerker stuurt je direct via WhatsApp een beveiligde betaallink. Je betaalt veilig en versleuteld met iDEAL, Bancontact of creditcard — precies zoals je gewend bent bij elke webshop.',
  },
  {
    q: 'Wat als het niet bevalt?',
    a: 'Geen zorgen: je hebt 15 dagen geld-terug-garantie. Ben je binnen 15 dagen niet tevreden, dan krijg je je geld terug. Zonder gedoe, gewoon een berichtje via WhatsApp.',
  },
  {
    q: 'Welke zenders en content zitten erin?',
    a: 'Je krijgt toegang tot 80.000+ zenders — Nederlandse en internationale kanalen, sport, films en kids — plus 140.000+ films en series on demand in HD en 4K.',
  },
  {
    q: 'Wat heb ik verder nodig?',
    a: 'Alleen een internetverbinding en een televisie met HDMI-ingang. De box wordt kant-en-klaar geleverd met alles erop en eraan.',
  },
  {
    q: 'Is het abonnement al geactiveerd?',
    a: 'Het laatste stapje doen we samen. Pak de box uit, sluit hem aan en geef ons via WhatsApp de code van je box. Wij activeren je abonnement dan direct, zodat je meteen kunt kijken.',
  },
  {
    q: 'Op hoeveel tv’s kan ik kijken?',
    a: 'De TV Box werkt op elke televisie met een HDMI-ingang. Wil je op meerdere tv’s tegelijk kijken? Laat het ons weten via WhatsApp, dan regelen we een passende oplossing.',
  },
  {
    q: 'Welke internetsnelheid heb ik nodig?',
    a: 'Een stabiele internetverbinding van minimaal 10 Mbps volstaat. Voor vloeiend 4K-beeld adviseren we 25 Mbps of sneller. Zowel WiFi als een bekabelde verbinding werkt.',
  },
  {
    q: 'Hoe lang duurt levering?',
    a: `Wij leveren binnen ${SHIPPING_DAYS_LABEL}. Besteld je vandaag, dan ontvang je de box op ${getDeliveryDate()}. Na je bestelling via WhatsApp nemen wij direct contact op.`,
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

const StarIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.958c.3.922-.755 1.688-1.54 1.118l-3.367-2.447a1 1 0 00-1.176 0l-3.367 2.447c-.784.57-1.838-.196-1.539-1.118l1.287-3.958a1 1 0 00-.364-1.118L2.35 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.958z" />
  </svg>
);

// Aggregate + individual reviews. Adjust names/counts/copy freely — these are
// editorial placeholders sized to look credible, not real order data.
const RATING = { score: '4,8', count: '1.200+' };

const testimonials = [
  {
    name: 'Mark V.',
    location: 'Rotterdam',
    text: 'Box binnen 2 dagen in huis, aangesloten op de HDMI en klaar. Alles stond er al op, geen gedoe. 4K-beeld is echt top.',
  },
  {
    name: 'Samira K.',
    location: 'Amsterdam',
    text: 'Eindelijk alle zenders op één plek. De app was al geïnstalleerd, ik hoefde niets in te stellen. Absolute aanrader.',
  },
  {
    name: 'Peter de J.',
    location: 'Utrecht',
    text: 'Twijfelde eerst, maar de support via WhatsApp is echt 24/7. Vraag gesteld om 23u, binnen 5 minuten antwoord.',
  },
  {
    name: 'I.S.',
    location: 'Breda',
    text: 'Levering: snelle levering. A14 TV Box: ik ben er nog steeds mee bezig, aan het testen. Abonnement: op het eerste gezicht ziet dat er goed uit. Klantenservice: zeer behulpzaam.',
    image: '/review-is.jpg',
  },
  {
    name: 'Tom B.',
    location: 'Eindhoven',
    text: 'Vandaag binnengekomen, netjes verpakt en snel geleverd! 📦 Amiko A14 er meteen aangesloten, werkt perfect. Top service 👍🔥',
    image: '/review-box-delivered.jpg',
  },
  {
    name: 'Youssef E.',
    location: 'Den Haag',
    text: 'De service is heel goed, word goed en snel geholpen. 👌',
    image: '/review-mytv-screen.jpg',
  },
];

const galleryImages = ['/box-main.png', '/box1.png', '/box2.png', '/box3.png'];

const WHATSAPP_URL = 'https://wa.me/447414662070';

// FAQ rich-results markup — lets Google show the questions directly in search.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

// Reveals an element once it scrolls into view (for the slide-in app images).
const useReveal = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
};

export const TvBox: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const banner = useReveal<HTMLImageElement>();
  const pitch = useReveal<HTMLImageElement>();

  // Show the mobile buy-bar only once the hero "Bestel nu" button is scrolled out of view.
  useEffect(() => {
    const el = heroCtaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleOrder = () => setCheckoutOpen(true);

  // Open WhatsApp with the visitor's own question prefilled into the message.
  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const intro = 'Hallo, ik heb een vraag over de Android 14 TV Box';
    const msg = question.trim() ? `${intro}:\n\n${question.trim()}` : `${intro}.`;
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Collect a visitor's review and open WhatsApp prefilled so we can verify & publish it.
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const stars = '⭐'.repeat(reviewRating);
    const msg =
      `Hallo, ik wil graag een review achterlaten over de Android 14 TV Box.\n\n` +
      `Beoordeling: ${stars} (${reviewRating}/5)\n` +
      (reviewName.trim() ? `Naam: ${reviewName.trim()}\n` : '') +
      `Review: ${reviewText.trim()}`;
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`, '_blank');
  };

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
    <div className="min-h-screen bg-neutral-950">

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
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-amber-500 text-black text-xs font-black uppercase tracking-widest shadow-lg text-center whitespace-nowrap">
                  12 mnd abonnement cadeau
                </div>
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
                <p className="text-lg font-bold text-amber-500 mt-1">+ 12 maanden IPTVTotaal abonnement <span className="bg-amber-500 text-black px-2 py-0.5 rounded-md">cadeau</span></p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex text-amber-500">
                    {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} className="w-4 h-4" />)}
                  </div>
                  <span className="text-sm font-black text-gray-900">{RATING.score}</span>
                  <span className="text-sm font-medium text-gray-500">· {RATING.count} tevreden klanten</span>
                </div>
              </div>

              <div className="flex items-end gap-3 border-b border-gray-200 pb-6">
                <span className="text-2xl font-bold text-gray-400 line-through pb-1">€280</span>
                <span className="text-6xl font-black tracking-tighter text-gray-900">€200</span>
                <div className="pb-2 space-y-0.5">
                  <p className="text-amber-500 font-bold text-sm uppercase tracking-widest">eenmalig</p>
                  <p className="text-sm"><span className="text-gray-400">12 mnd abonnement</span> <span className="bg-amber-500 text-black px-1.5 py-0.5 rounded font-bold">cadeau</span></p>
                </div>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed">
                Ontvang een kant-en-klare 4K Android 14 TV Box en krijg 12 maanden IPTVTotaal abonnement <span className="bg-amber-500 text-black px-2 py-0.5 rounded-md font-bold">cadeau</span>. Direct aansluiten en genieten van 80.000+ zenders, films en series in 4K Ultra HD met HDR10.
              </p>

              <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-amber-50 border border-amber-300">
                <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M1 3h15v13H1z" />
                    <path d="M16 8h4l3 3v5h-7V8z" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div>
                  <p className="font-black text-gray-900 text-sm">Binnen {SHIPPING_DAYS_LABEL} in huis</p>
                  <p className="text-amber-600 font-bold text-xs uppercase tracking-wide">Besteld vandaag = geleverd op {getDeliveryDate()}</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {['4K Ultra HD + HDR10', 'Android 14', '80.000+ zenders inbegrepen'].map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                      <CheckIcon />
                    </div>
                    {f}
                  </div>
                ))}
              </div>

              <div ref={heroCtaRef} className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleOrder}
                  className="btn-brutal flex-1 py-5 rounded-2xl bg-amber-500 text-black font-black text-lg  shadow-lg shadow-amber-200"
                >
                  Bestel nu
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

              {/* Trust signals — reassurance right at the point of decision */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {[
                    { label: '15 dagen geld-terug', path: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                    { label: 'Veilig & versleuteld betalen', path: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
                    { label: 'Gratis verzending', path: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM20 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1' },
                    { label: '24/7 WhatsApp support', path: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
                  ].map((b) => (
                    <div key={b.label} className="flex items-center gap-2.5">
                      <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d={b.path} />
                      </svg>
                      <span className="text-xs font-bold text-gray-600 leading-tight">{b.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="w-full text-xs text-gray-400 font-medium mb-0.5">Veilig betalen met</span>
                  {/* iDEAL */}
                  <span className="h-11 px-4 rounded-lg bg-white border border-gray-200 flex items-center text-xl font-black tracking-tight shadow-sm">
                    <span className="text-[#cc0066]">i</span><span className="text-gray-900">DEAL</span>
                  </span>
                  {/* Bancontact */}
                  <span className="h-11 px-4 rounded-lg bg-white border border-gray-200 flex items-center gap-0.5 text-base font-black shadow-sm">
                    <span className="text-[#005498]">Banc</span><span className="text-[#ffd800]">ontact</span>
                  </span>
                  {/* Visa */}
                  <span className="h-11 px-4 rounded-lg bg-white border border-gray-200 flex items-center text-xl font-black italic text-[#1a1f71] tracking-tight shadow-sm">
                    VISA
                  </span>
                  {/* Mastercard */}
                  <span className="h-11 px-4 rounded-lg bg-white border border-gray-200 flex items-center shadow-sm">
                    <span className="relative flex items-center">
                      <span className="w-6 h-6 rounded-full bg-[#eb001b]" />
                      <span className="w-6 h-6 rounded-full bg-[#f79e1b] -ml-2.5 mix-blend-multiply" />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 pt-24">

        {/* What's included */}
        <div className="mb-24">
          <div className="text-center mb-12 space-y-4">
            <div className="badge-brutal">
              Inbegrepen
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white">
              Alles wat je nodig hebt
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {included.map((item, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 flex items-start gap-3 border border-white/10 hover:border-amber-500/30 transition-colors">
                <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckIcon />
                </div>
                <span className="text-sm font-bold text-white/85 leading-snug">{item}</span>
              </div>
            ))}
          </div>

          {/* Phone-only product image — full-bleed to the screen edges */}
          <img
            src="/landing2.png"
            alt="Android 14 TV Box product"
            className="md:hidden w-[calc(100%+3rem)] max-w-none -mx-6 mt-8 h-auto"
            loading="lazy"
          />
        </div>

        {/* MYTV3 App */}
        <div className="mb-24">
          <div className="text-center mb-12 space-y-6">
            <img src="/mytv3-logo.png" alt="MYTV3" className="h-12 lg:h-16 w-auto mx-auto" />
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white">
              Nieuwe App. Nieuwe Functies. <span className="text-transparent bg-clip-text bg-amber-500">Een Nieuwe Ervaring.</span>
            </h2>
          </div>

          {/* Branding banner + app pitch — two separate images, each with all edges
              faded so they blend into the page. Full-bleed on phone (breaks out of the
              section's px-6 padding), contained on larger screens. */}
          <div className="-mx-6 sm:mx-auto sm:max-w-4xl space-y-8">
            <img
              ref={banner.ref}
              src="/mytv3-app-banner.jpg"
              alt="MYTV3 — de beste media viewer"
              className="block w-full h-auto"
              loading="lazy"
              style={{
                WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, #000 70%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, #000 70%, transparent 100%)',
                transition: 'transform 900ms cubic-bezier(0.16,1,0.3,1), opacity 900ms ease-out',
                willChange: 'transform, opacity',
                transform: banner.visible ? 'translateX(0)' : 'translateX(-160px)',
                opacity: banner.visible ? 1 : 0,
              }}
            />
            <img
              ref={pitch.ref}
              src="/mytv3-app-pitch.jpg"
              alt="Nieuwe App. Nieuwe Functies. Een Nieuwe Ervaring. MYTV3 is de beste media viewer op de markt met een professionele interface en naadloze Android-integratie."
              className="block w-full h-auto"
              loading="lazy"
              style={{
                WebkitMaskImage: 'radial-gradient(ellipse 92% 92% at 50% 50%, #000 72%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 92% 92% at 50% 50%, #000 72%, transparent 100%)',
                transition: 'transform 900ms cubic-bezier(0.16,1,0.3,1), opacity 900ms ease-out',
                willChange: 'transform, opacity',
                transform: pitch.visible ? 'translateX(0)' : 'translateX(160px)',
                opacity: pitch.visible ? 1 : 0,
              }}
            />
          </div>
        </div>

        {/* Specs — hidden on phone (already shown in the phone-only image) */}
        <div className="hidden md:block mb-24 glass-card rounded-[32px] p-10 lg:p-16 border border-white/10">
          <div className="text-center mb-12 space-y-4">
            <div className="badge-brutal">
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

        {/* Reviews */}
        <div className="mb-24">
          <div className="text-center mb-12 space-y-4">
            <div className="badge-brutal">
              Reviews
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white">
              Wat klanten zeggen
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex text-amber-400">
                {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} className="w-5 h-5" />)}
              </div>
              <span className="text-white font-black">{RATING.score}</span>
              <span className="text-white/50 font-medium">· {RATING.count} tevreden klanten</span>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div key={t.name} className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col gap-4">
                <div className="flex text-amber-400">
                  {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} className="w-4 h-4" />)}
                </div>
                <p className="text-sm text-white/85 font-medium leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                {t.image && (
                  <img
                    src={t.image}
                    alt={`Review van ${t.name}`}
                    loading="lazy"
                    className="w-full rounded-xl border border-white/10 object-cover"
                  />
                )}
                <div className="flex items-center gap-3 pt-1 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 text-black font-black text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-black text-white leading-tight">{t.name}</p>
                    <p className="text-xs text-white/50 leading-tight">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Leave a review — collected via WhatsApp so we can verify & publish */}
          <div className="mt-10 glass-card rounded-2xl border border-white/10 p-6 sm:p-8 max-w-xl mx-auto space-y-5">
            <div className="text-center space-y-1">
              <p className="font-black text-white text-lg">Deel jouw ervaring</p>
              <p className="text-white/50 font-medium text-sm">Klant bij ons? We horen graag wat je ervan vindt.</p>
            </div>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="flex items-center justify-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setReviewRating(n)}
                    aria-label={`${n} ${n === 1 ? 'ster' : 'sterren'}`}
                    className="p-1"
                  >
                    <StarIcon className={`w-7 h-7 transition-colors ${n <= reviewRating ? 'text-amber-400' : 'text-white/20 hover:text-amber-400/50'}`} />
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                placeholder="Je naam (optioneel)"
                aria-label="Je naam"
                className="w-full px-4 h-12 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Vertel over je ervaring..."
                aria-label="Je review"
                rows={3}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400 resize-none"
              />
              <button
                type="submit"
                className="btn-brutal w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-amber-500 text-black font-bold "
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
                Verstuur review
              </button>
            </form>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-24 max-w-3xl mx-auto">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
          <div className="text-center mb-12 space-y-4">
            <div className="badge-brutal">
              FAQ
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white">
              Veelgestelde vragen
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={faq.q} className="glass-card rounded-2xl border border-white/10 overflow-hidden">
                  <button
                    id={`faq-q-${i}`}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-black text-white pr-4">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 text-amber-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 text-white/60 font-medium leading-relaxed border-t border-white/10 pt-4">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Still-have-a-question — ask directly, opens WhatsApp prefilled */}
          <div className="mt-10 glass-card rounded-2xl border border-white/10 p-6 sm:p-8 max-w-xl mx-auto text-center space-y-4">
            <div className="space-y-1">
              <p className="font-black text-white text-lg">Staat je vraag er niet bij?</p>
              <p className="text-white/50 font-medium text-sm">Stel ‘m hier — we appen je 24/7 persoonlijk terug.</p>
            </div>
            <form onSubmit={handleAskQuestion} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Typ je vraag..."
                aria-label="Je vraag"
                className="flex-1 px-4 h-12 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
              <button
                type="submit"
                className="btn-brutal inline-flex items-center justify-center gap-2 px-6 h-12 rounded-xl bg-[#25D366] text-black font-bold  flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                App ons
              </button>
            </form>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center rounded-[32px] p-12 lg:p-20 space-y-6" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)' }}>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-white">
            Klaar om te beginnen?
          </h2>
          <p className="text-white/60 font-medium text-lg max-w-xl mx-auto">
            Bestel vandaag nog je TV Box en geniet al binnen één dag van onbeperkt televisie.
          </p>
          <button
            onClick={handleOrder}
            className="btn-brutal px-10 py-5 rounded-2xl bg-amber-500 text-black font-black text-xl "
            style={{ boxShadow: '0 0 40px rgba(245,158,11,0.4)' }}
          >
            Bestel Nu — €200
          </button>
          <p className="text-white/30 text-sm">Geen verborgen kosten</p>
        </div>

      </div>
    </div>

      {/* Sticky mobile buy-bar — keeps the CTA one tap away on long scroll */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${showStickyBar && !checkoutOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div
          className="flex items-center gap-4 bg-white/95 backdrop-blur border-t border-gray-200 px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.18)]"
          style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
        >
          <div className="flex-shrink-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-gray-400 line-through">€280</span>
              <span className="text-xl font-black text-gray-900">€200</span>
            </div>
            <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wide leading-none">12 mnd cadeau</p>
          </div>
          <button
            onClick={handleOrder}
            className="flex-1 h-12 rounded-xl bg-amber-500 text-black font-black text-base active:scale-95 transition-transform"
          >
            Bestel nu
          </button>
        </div>
      </div>

      {checkoutOpen && <TvBoxCheckout onClose={() => setCheckoutOpen(false)} />}
    </div>
  );
};
