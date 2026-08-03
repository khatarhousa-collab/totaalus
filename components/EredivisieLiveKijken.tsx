
import React, { useEffect } from 'react';
import { trackWhatsAppConversion } from './analytics';

const whatsappLink = "https://api.whatsapp.com/send/?phone=447414662070&text&type=phone_number&app_absent=0";
const whatsappVipLink = `https://api.whatsapp.com/send/?phone=447414662070&text=${encodeURIComponent('Hallo, ik wil graag het Premium VIP-pakket van IPTVTotaal (us) aanschaffen voor 12+3 maanden voor 1 apparaat (€78,00).')}&type=phone_number&app_absent=0`;

const StatPill: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="text-center">
    <div className="text-4xl lg:text-5xl font-black text-amber-600 tracking-tighter">{value}</div>
    <div className="text-sm text-stone-900/60 font-medium mt-1">{label}</div>
  </div>
);

const CheckItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start gap-3">
    <svg className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <span className="text-stone-900/70">{children}</span>
  </li>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.532 5.85L.057 23.292a.75.75 0 00.908.98l5.65-1.48A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.704 9.704 0 01-4.95-1.354l-.354-.21-3.655.957.975-3.562-.23-.368A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
  </svg>
);

export const EredivisieLiveKijken: React.FC = () => {

  useEffect(() => {
    document.title = 'Eredivisie Live Kijken via IPTV — Zonder TV-abonnement | IPTVTotaal';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Eredivisie live kijken zonder tv-abonnement? Via IPTVTotaal stream je alle wedstrijden op ESPN en Ziggo Sport. Vanaf €4,60/maand · 15 dagen geld-terug · klaar in 5 min.');

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Eredivisie Live Kijken via IPTV | IPTVTotaal');

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', 'Alle Eredivisie-wedstrijden live via IPTVTotaal. ESPN, Ziggo Sport en 80.000+ zenders in één abonnement. Geen tv-abonnement nodig.');

    return () => {
      document.title = 'IPTVTotaal';
      if (metaDesc) metaDesc.setAttribute('content', '');
    };
  }, []);

  const faqItems = [
    {
      q: 'Op welke zender is de Eredivisie te zien?',
      a: 'De Eredivisie is live te volgen via ESPN (alle wedstrijden) en Ziggo Sport. Met een IPTVTotaal-abonnement heb je direct toegang tot beide zenders, plus 80.000+ andere kanalen.',
    },
    {
      q: 'Kan ik de Eredivisie kijken zonder tv-abonnement?',
      a: 'Ja. Via IPTVTotaal heb je geen tv-abonnement bij een provider nodig. Je streamt alle wedstrijden via je eigen internetverbinding op elk apparaat.',
    },
    {
      q: 'Werkt IPTVTotaal op mijn Smart TV?',
      a: 'Ja. IPTVTotaal werkt op Samsung, LG en Sony Smart TV\'s, maar ook op Fire Stick, Android TV Box, Apple TV, iPhone, Android-telefoon en pc. Binnen 5 minuten ben je klaar.',
    },
    {
      q: 'Kan ik ook de Conference League en Champions League kijken?',
      a: 'Ja. Naast de Eredivisie zijn ook de Champions League, Europa League, Conference League, Premier League en tientallen andere competities inbegrepen in je IPTVTotaal-abonnement.',
    },
    {
      q: 'Wat kost het 12+3 maanden VIP-pakket?',
      a: 'Het Premium VIP 12+3 maanden pakket kost €78,00 eenmalig voor 1 apparaat — dat is €5,20 per maand effectief. Je abonnement is 15 maanden geldig inclusief 3 gratis maanden.',
    },
    {
      q: 'Is er een geld-terug-garantie?',
      a: 'Ja. Je krijgt 15 dagen geld-terug garantie. Bevalt IPTVTotaal niet, dan krijg je je geld terug. Geen vragen.',
    },
  ];

  return (
    <div className="min-h-screen text-stone-900">

      {/* Hero */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/2068975/pexels-photo-2068975.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Eredivisie live kijken via IPTV zonder tv-abonnement"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 text-white">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-white/40 hover:text-amber-400 transition-colors mb-12">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Terug naar home
          </a>

          <div className="badge-brutal !text-sm mb-8">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-amber-400 uppercase tracking-widest">Live · Eredivisie 2024/2025</span>
          </div>

          <h1 className="text-5xl lg:text-8xl font-black tracking-tighter leading-none mb-6 max-w-4xl">
            Eredivisie Live Kijken<br />
            <span className="text-amber-400">via IPTV.</span>
          </h1>

          <p className="text-xl text-white/60 max-w-xl mb-4">
            Alle Eredivisie-wedstrijden live — zonder tv-abonnement, zonder gedoe.
          </p>
          <p className="text-xl text-white/60 max-w-xl mb-10">
            ESPN · Ziggo Sport · 80.000+ zenders. Op elk apparaat.
          </p>

          <a
            href={whatsappLink}
            onClick={trackWhatsAppConversion}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-black font-black rounded-full btn-brutal shadow-xl shadow-amber-500/25 text-lg"
          >
            <WhatsAppIcon />
            Stel je abonnement in via WhatsApp
          </a>

          <p className="mt-4 text-sm text-white/30">Klaar in 5 minuten · Vanaf €4,60/maand · 15 dagen geld-terug</p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-y border-stone-900/10 bg-stone-900/[0.02]">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12 grid grid-cols-2 lg:grid-cols-4 gap-10">
          <StatPill value="80K+" label="live zenders" />
          <StatPill value="99,9%" label="uptime garantie" />
          <StatPill value="5 min" label="activering" />
          <StatPill value="15 dagen" label="geld-terug" />
        </div>
      </div>

      {/* Eredivisie photo */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-10">
        <img
          src="/eredivisie-2026.png"
          alt="Eredivisie 2026 live kijken via IPTV"
          className="w-full rounded-3xl object-cover"
        />
      </div>

      {/* Main section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <div className="badge-brutal !text-sm mb-8">
              <span className="text-sm font-bold text-orange-500 uppercase tracking-widest">⚽ Eredivisie via IPTV</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-stone-900 mb-6 leading-tight">
              Eredivisie kijken<br />
              <span className="text-amber-600">zonder tv-abonnement.</span>
            </h2>
            <p className="text-stone-900/70 text-lg mb-4">
              Geen duur tv-pakket nodig. Via IPTVTotaal stream je alle Eredivisie-wedstrijden live op ESPN en Ziggo Sport — op je Smart TV, telefoon of laptop.
            </p>
            <p className="text-stone-900/70 text-lg mb-8">
              Eén abonnement. Alle wedstrijden. De hele competitie van speelronde 1 tot de kampioenswedstrijd.
            </p>
            <ul className="space-y-3 mb-10">
              <CheckItem>Alle Eredivisie-wedstrijden live op ESPN</CheckItem>
              <CheckItem>Ziggo Sport, Viaplay en meer inbegrepen</CheckItem>
              <CheckItem>Werkt op Smart TV, telefoon, tablet en pc</CheckItem>
              <CheckItem>Geen buffering — 99,9% uptime gegarandeerd</CheckItem>
              <CheckItem>Ook Champions League, Premier League en meer</CheckItem>
            </ul>
            <a
              href={whatsappLink}
            onClick={trackWhatsAppConversion}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 text-black font-black rounded-full btn-brutal shadow-lg shadow-amber-500/20"
            >
              Start vandaag nog
            </a>
          </div>
          <div className="mt-12 lg:mt-0">
            <img
              src="https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Eredivisie speler scoort doelpunt live via IPTV"
              className="w-full rounded-3xl object-cover"
              style={{ maxHeight: 480 }}
            />
            <p className="text-xs text-stone-900/40 mt-2">Foto: Pexels</p>
          </div>
        </div>
      </div>

      {/* Channels */}
      <div className="border-t border-stone-900/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
          <div className="max-w-2xl mb-12">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-stone-900 mb-4">
              Op welke zender kijk je de Eredivisie?
            </h2>
            <p className="text-stone-900/60 text-lg">
              Met IPTVTotaal heb je alle sportzenders in één abonnement.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { name: 'ESPN', desc: 'Dé Eredivisie-zender. Alle wedstrijden live, studio-analyse en nabeschouwing met Nederlandse commentatoren.' },
              { name: 'Ziggo Sport', desc: 'Extra Eredivisie-content, highlights, diepgaande analyses en nabeschouwingen.' },
              { name: 'Viaplay', desc: 'Geselecteerde Eredivisie-wedstrijden en internationale voetbalcompetities.' },
              { name: 'RTL 7', desc: 'Geselecteerde wedstrijden en voetbalprogramma\'s rondom de Eredivisie.' },
              { name: 'beIN Sports', desc: 'Internationaal voetbal en sport in meerdere talen als aanvulling op de Eredivisie.' },
              { name: '+50 sportzenders', desc: 'Sky Sports, Eurosport, DAZN, Canal+ en tientallen meer — allemaal inbegrepen.' },
            ].map(ch => (
              <div key={ch.name} className="p-6 glass-card card-brutal-hover rounded-2xl hover:border-amber-500/60 transition-all">
                <h3 className="text-lg font-black text-stone-900 mb-2">{ch.name}</h3>
                <p className="text-stone-900/60 text-sm leading-relaxed">{ch.desc}</p>
              </div>
            ))}
          </div>

          {/* All-in-one callout */}
          <div className="rounded-3xl p-px bg-amber-500 shadow-xl shadow-amber-500/20">
            <div className="rounded-[23px] bg-amber-50 px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/30">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-black text-stone-900 tracking-tight">Alle zenders. Één abonnement.</p>
                  <p className="text-sm text-stone-900/70 mt-0.5">ESPN, Ziggo Sport, Viaplay én 80.000+ andere zenders — allemaal inbegrepen bij IPTVTotaal. Geen losse abonnementen, geen extra kosten.</p>
                </div>
              </div>
              <a
                href={whatsappVipLink}
                onClick={trackWhatsAppConversion}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-black rounded-full btn-brutal shadow-lg shadow-amber-500/20 text-sm whitespace-nowrap"
              >
                <WhatsAppIcon />
                Bestel nu
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* How to watch */}
      <div className="border-t border-stone-900/10 bg-stone-900/[0.02]">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
          <div className="max-w-2xl">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-stone-900 mb-4">
                Zo kijk je de Eredivisie via IPTV.
              </h2>
              <p className="text-stone-900/60 text-lg mb-10">Drie stappen. Duurt 5 minuten.</p>
              <ol className="space-y-8">
                {[
                  { n: '01', title: 'Stuur ons een WhatsApp', desc: 'Vertel welk apparaat je hebt. Wij sturen je binnen 5 minuten de inloggegevens toe.' },
                  { n: '02', title: 'Download de app', desc: 'TiviMate op Android, GSE Smart IPTV op iPhone, Smart IPTV op je Smart TV.' },
                  { n: '03', title: 'Voer je gegevens in en kijk', desc: 'Plak je M3U-link of Xtream Codes in de app. Alle zenders laden direct — inclusief ESPN voor de Eredivisie.' },
                ].map(step => (
                  <li key={step.n} className="flex gap-6">
                    <span className="text-4xl font-black text-amber-500/40 leading-none shrink-0">{step.n}</span>
                    <div>
                      <h3 className="text-lg font-black text-stone-900 mb-1">{step.title}</h3>
                      <p className="text-stone-900/60 leading-relaxed">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a
                href={whatsappLink}
            onClick={trackWhatsAppConversion}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 mt-10 px-7 py-3.5 bg-amber-500 text-black font-black rounded-full btn-brutal shadow-lg shadow-amber-500/20"
              >
                <WhatsAppIcon />
                Direct starten via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Why IPTVTotaal */}
      <div className="border-t border-stone-900/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-stone-900 mb-12 max-w-2xl">
            Waarom IPTVTotaal voor de Eredivisie?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: '99,9% uptime', desc: 'Geen uitval tijdens de wedstrijd. Redundante servers houden je stream stabiel van de aftrap tot het eindsignaal.' },
              { title: '80.000+ zenders', desc: 'ESPN, Ziggo Sport, Viaplay en tientallen sportzenders inbegrepen. Alles in één abonnement.' },
              { title: 'Vanaf €4,60/maand', desc: 'Geen losse ESPN-abonnementen of tv-pakketten. Één lage prijs voor de hele competitie.' },
              { title: '15 dagen geld-terug', desc: 'Bevalt het niet? Geen vragen gesteld, geld terug. Zo simpel is het.' },
            ].map(item => (
              <div key={item.title} className="p-7 glass-card card-brutal-hover rounded-3xl hover:border-amber-500/50 transition-all">
                <h3 className="text-xl font-black text-amber-600 mb-3">{item.title}</h3>
                <p className="text-stone-900/60 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 12+3 VIP Pack */}
      <div className="border-t border-stone-900/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-stone-900 mb-3">
              Het beste pakket voor de Eredivisie.
            </h2>
            <p className="text-stone-900/60 text-lg">De hele competitie live. Plus alles wat er verder nog speelt.</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative rounded-[40px] p-px bg-amber-500 shadow-2xl shadow-amber-500/30">
              <div className="rounded-[39px] bg-neutral-950 p-10 lg:p-12">

                <div className="flex items-center justify-between mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500 text-black text-xs font-black uppercase tracking-widest">
                    ★ Premium VIP
                  </div>
                  <span className="text-xs font-bold text-amber-400/60 uppercase tracking-widest">Beste Deal · 12 + 3 Maanden Gratis</span>
                </div>

                <div className="mb-8">
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-6xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-amber-500">
                      €78,00
                    </span>
                    <span className="text-white/40 font-bold mb-3">eenmalig</span>
                  </div>
                  <p className="text-white/40 text-sm">Geldig voor 15 maanden · 1 apparaat · €5,20/maand effectief</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mb-10">
                  {[
                    'SD / HD / 4K / 8K / HDR-VR',
                    '+80.000 Kanalen + Netflix',
                    '+200.000 Films & Series',
                    'Alle Sport PPV Events',
                    'ESPN, Ziggo Sport, Viaplay & meer',
                    'Dagelijkse Updates',
                    'VPN Inbegrepen',
                    'Enterprise Anti-Freeze PRO',
                    'Persoonlijke VIP Manager',
                    'VIP 24/7 Support',
                    'Alle Apparaten',
                    'Videoland, Amazon, HBO, Apple TV',
                  ].map(feat => (
                    <div key={feat} className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white/70 text-sm">{feat}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={whatsappVipLink}
                onClick={trackWhatsAppConversion}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-amber-500 text-black font-black text-lg btn-brutal shadow-xl shadow-amber-500/30"
                >
                  <WhatsAppIcon />
                  Bestel via WhatsApp — €78,00
                </a>

                <p className="text-center text-white/30 text-xs mt-4">15 dagen geld-terug garantie · Geen verborgen kosten</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="border-t border-stone-900/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-stone-900 mb-12">
            Veelgestelde vragen over<br />
            <span className="text-amber-600">Eredivisie live kijken via IPTV.</span>
          </h2>
          <div className="max-w-3xl space-y-6">
            {faqItems.map((item, i) => (
              <div key={i} className="p-6 glass-card rounded-2xl">
                <h3 className="text-lg font-black text-stone-900 mb-3">{item.q}</h3>
                <p className="text-stone-900/60 leading-relaxed text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO text block */}
      <div className="border-t border-stone-900/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black tracking-tighter text-stone-900 mb-6">
              Eredivisie kijken zonder tv-abonnement via IPTV
            </h2>
            <p className="text-stone-900/60 leading-relaxed mb-4">
              Wil je de <strong className="text-stone-900/90">Eredivisie live kijken zonder tv-abonnement</strong>? Via IPTVTotaal heb je direct toegang tot ESPN en Ziggo Sport — de twee zenders waarop alle Eredivisie-wedstrijden worden uitgezonden. Geen duur kabelpakket, geen aparte ESPN-abonnement. Gewoon één abonnement voor alles.
            </p>
            <p className="text-stone-900/60 leading-relaxed mb-4">
              Met het <strong className="text-stone-900/90">12+3 maanden VIP-pakket</strong> betaal je €78,00 eenmalig voor 15 maanden onbeperkt streamen. Dat is effectief €5,20 per maand — inclusief 80.000+ kanalen, 200.000+ films en series, Enterprise Anti-Freeze technologie en een persoonlijke VIP Manager die je altijd helpt.
            </p>
            <p className="text-stone-900/60 leading-relaxed">
              <strong className="text-stone-900/90">Eredivisie kijken via IPTV</strong> instellen duurt minder dan 5 minuten. Stuur een WhatsApp, ontvang je inloggegevens en kijk op elk apparaat — Smart TV, iPhone, Android, Fire Stick of laptop. Niet tevreden? 15 dagen geld-terug garantie, geen vragen.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="border-t border-stone-900/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
          <div className="bg-amber-500/8 border-[3px] border-amber-500/30 shadow-[8px_8px_0_0_rgba(245,158,11,0.2)] rounded-[40px] p-10 lg:p-16 text-center">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-stone-900 mb-4">
              Eredivisie. Elke speelronde.<br />
              <span className="text-amber-600">Live via IPTV.</span>
            </h2>
            <p className="text-stone-900/60 text-xl mb-10 max-w-lg mx-auto">
              Stel je abonnement vandaag in. Je bent binnen 5 minuten klaar.
            </p>
            <a
              href={whatsappLink}
            onClick={trackWhatsAppConversion}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-amber-500 text-black font-black rounded-full btn-brutal text-lg"
            >
              <WhatsAppIcon />
              WhatsApp Ons Nu
            </a>
            <p className="mt-4 text-stone-900/50 text-sm">15 dagen geld-terug garantie · Geen verborgen kosten · Vanaf €4,60/maand</p>
          </div>
        </div>
      </div>

    </div>
  );
};
