
import React, { useEffect } from 'react';
import { trackWhatsAppConversion } from './analytics';

const StatCard: React.FC<{ number: string; label: string }> = ({ number, label }) => (
  <div className="p-8 bg-amber-500/10 border-[3px] border-amber-500/40 rounded-3xl text-center hover:bg-amber-500/20 shadow-[6px_6px_0_0_rgba(245,158,11,0.2)] transition-colors">
    <div className="text-5xl font-black text-amber-600 tracking-tighter mb-2">{number}</div>
    <div className="text-sm font-bold text-stone-900/60 uppercase tracking-widest">{label}</div>
  </div>
);

const ValueCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="p-8 glass-card card-brutal-hover rounded-3xl hover:border-amber-500/60 transition-all">
    <div className="w-12 h-12 bg-amber-500 rounded-2xl border-2 border-black flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-black tracking-tight text-stone-900 mb-3">{title}</h3>
    <p className="text-stone-900/60 leading-relaxed">{description}</p>
  </div>
);

export const OverOns: React.FC = () => {
  const whatsappLink = "https://api.whatsapp.com/send/?phone=447414662070&text&type=phone_number&app_absent=0";

  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
    document.title = 'Over IPTVTotaal | Nederland\'s meest betrouwbare IPTV aanbieder';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'IPTVTotaal is de meest betrouwbare IPTV aanbieder van Nederland. Ontdek wie wij zijn, wat ons onderscheidt en waarom meer dan 10.000 klanten ons vertrouwen voor premium IPTV.');
    return () => {
      document.title = prevTitle;
      if (metaDesc) metaDesc.setAttribute('content', prevDesc);
    };
  }, []);

  return (
    <div className="min-h-screen text-stone-900 pt-32 pb-20">

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-stone-900/50 hover:text-amber-600 transition-colors mb-16"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Terug naar home
        </a>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="max-w-4xl">
          <div className="badge-brutal mb-8 !text-sm">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            Over IPTVTotaal
          </div>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-8">
            Nederland's <br />
            <span className="text-amber-600">meest betrouwbare</span><br />
            IPTV-aanbieder
          </h1>
          <p className="text-xl text-stone-900/70 leading-relaxed max-w-2xl">
            IPTVTotaal werd opgericht vanuit één simpele gedachte: televisie moet betaalbaar, betrouwbaar en voor iedereen toegankelijk zijn. Vandaag de dag vertrouwen duizenden Nederlandse huishoudens op ons voor hun dagelijkse TV-beleving.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 mt-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard number="10.000+" label="Tevreden klanten" />
          <StatCard number="80.000+" label="Zenders & kanalen" />
          <StatCard number="99,9%" label="Uptime garantie" />
          <StatCard number="24/7" label="Klantenservice" />
        </div>
      </div>

      {/* Story */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 mt-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-8">
              Ons verhaal
            </h2>
            <div className="space-y-6 text-stone-900/70 leading-relaxed text-lg">
              <p>
                IPTVTotaal is een Nederlands IPTV-merk dat zich volledig richt op kwaliteit en klanttevredenheid. Wij bieden een complete televisie-ervaring via het internet — snel, stabiel en betaalbaar.
              </p>
              <p>
                Ons platform geeft toegang tot duizenden nationale en internationale zenders, inclusief live sport zoals de Eredivisie, Formule 1 en Champions League, maar ook films, series en kinderprogramma's.
              </p>
              <p>
                We geloven dat goede televisie geen fortuin mag kosten. Daarom bieden wij flexibele abonnementen zonder verborgen kosten, zonder lange contracten — en met een 15 dagen niet-goed-geld-terug garantie.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-neutral-950 border-[3px] border-amber-500/40 shadow-[8px_8px_0_0_rgba(245,158,11,0.2)] rounded-[40px] p-10 space-y-6">
              {[
                { year: '2020', text: 'IPTVTotaal opgericht in Nederland' },
                { year: '2021', text: 'Eerste 1.000 klanten bereikt' },
                { year: '2022', text: 'Lancering van 24/7 WhatsApp support' },
                { year: '2024', text: 'Meer dan 5.000 actieve abonnees' },
                { year: '2025', text: 'Uitbreiding naar 80.000+ zenders' },
              ].map((item) => (
                <div key={item.year} className="flex items-start gap-6">
                  <div className="w-16 h-8 bg-amber-500/10 border-2 border-amber-500/40 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-black text-amber-400">{item.year}</span>
                  </div>
                  <p className="text-white/70 font-medium pt-0.5">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-amber-500 rounded-full -z-10 blur-3xl opacity-10"></div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 mt-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-4">Waarom IPTVTotaal?</h2>
          <p className="text-stone-900/60 text-lg max-w-xl mx-auto">Wij onderscheiden ons door kwaliteit, eerlijkheid en snelle service.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ValueCard
            icon={<svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>}
            title="Instant activering"
            description="Je abonnement is binnen enkele minuten actief na betaling. Geen wachttijden, geen gedoe — gewoon direct kijken."
          />
          <ValueCard
            icon={<svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>}
            title="15 dagen garantie"
            description="Ben je niet tevreden binnen 15 dagen? Dan krijg je je geld terug. Zonder vragen, zonder gedoe."
          />
          <ValueCard
            icon={<svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0"/></svg>}
            title="Geen buffering"
            description="Onze servers zijn geoptimaliseerd voor stabiel streamen in Full HD en 4K — ook tijdens live sport op drukke momenten."
          />
          <ValueCard
            icon={<svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>}
            title="24/7 WhatsApp support"
            description="Ons supportteam is dag en nacht bereikbaar via WhatsApp. Gemiddelde reactietijd: minder dan 5 minuten."
          />
          <ValueCard
            icon={<svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
            title="Eerlijke prijzen"
            description="Geen verborgen kosten, geen verplichte contracten. Betaal maandelijks of jaarlijks — en stop wanneer je wilt."
          />
          <ValueCard
            icon={<svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>}
            title="Alle apparaten"
            description="Kijk op je Smart TV, telefoon, tablet, laptop of Amazon Firestick. IPTVTotaal werkt overal."
          />
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 mt-32">
        <div className="bg-amber-500/8 border-[3px] border-amber-500/30 shadow-[10px_10px_0_0_rgba(245,158,11,0.2)] rounded-[48px] p-12 lg:p-20 text-center">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-6">
            Klaar om te beginnen?
          </h2>
          <p className="text-stone-900/70 text-xl mb-10 max-w-xl mx-auto">
            Neem contact op via WhatsApp en je bent binnen 5 minuten aan het kijken.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappLink}
              onClick={trackWhatsAppConversion}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-amber-500 text-black font-black text-lg rounded-full btn-brutal"
            >
              WhatsApp Ons Nu
            </a>
            <a
              href="#pricing"
              className="btn-brutal-outline inline-flex items-center justify-center gap-3 px-10 py-5 bg-stone-900/5 text-stone-900 font-black text-lg rounded-full hover:bg-stone-900/10 transition-colors"
            >
              Bekijk prijzen
            </a>
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 mt-20">
        <div className="flex flex-col md:flex-row justify-center gap-8 text-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-stone-900/40 mb-2">E-mail</div>
            <a href="mailto:info@iptvtotaal.us" className="text-amber-600 font-bold hover:underline">info@iptvtotaal.us</a>
          </div>
          <div className="hidden md:block w-px bg-stone-900/10"></div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-stone-900/40 mb-2">Telefoon</div>
            <a href="tel:+447414662070" className="text-amber-600 font-bold hover:underline">+44 7414 662070</a>
          </div>
          <div className="hidden md:block w-px bg-stone-900/10"></div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-stone-900/40 mb-2">Gevestigd in</div>
            <span className="text-stone-900 font-bold">Nederland</span>
          </div>
        </div>
      </div>

    </div>
  );
};
