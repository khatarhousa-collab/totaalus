
import React, { useEffect } from 'react';
import { trackWhatsAppConversion } from './analytics';

const whatsappLink = "https://api.whatsapp.com/send/?phone=447449708976&text&type=phone_number&app_absent=0";

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

export const NederlandOezbekistanLive: React.FC = () => {

  useEffect(() => {
    document.title = 'Nederland - Oezbekistan Live Kijken | IPTV | IPTVTotaal';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Nederland - Oezbekistan live kijken via IPTV? Kijk de wedstrijd op ESPN, NOS en 80.000+ zenders. Vanaf €4,60/maand · 15 dagen geld-terug · 5 min activering.');

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Nederland - Oezbekistan Live Kijken | IPTVTotaal');

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', 'Bekijk Nederland - Oezbekistan live via IPTVTotaal. 80.000+ zenders, geen buffering, 99,9% uptime. Stel je abonnement in via WhatsApp — klaar in 5 minuten.');

    return () => {
      document.title = 'IPTVTotaal';
      if (metaDesc) metaDesc.setAttribute('content', '');
    };
  }, []);

  const faqItems = [
    {
      q: 'Op welke zender is Nederland - Oezbekistan te zien?',
      a: 'De wedstrijd Nederland - Oezbekistan is live te volgen via ESPN en NOS. Met een IPTVTotaal-abonnement heb je toegang tot beide zenders, plus meer dan 80.000 andere kanalen.',
    },
    {
      q: 'Kan ik Nederland - Oezbekistan op mijn tv kijken via IPTV?',
      a: 'Ja. IPTVTotaal werkt op Smart TV (Samsung, LG, Sony), Fire Stick, Android TV Box, Apple TV, iPhone, Android-telefoon en pc. Binnen 5 minuten ben je klaar.',
    },
    {
      q: 'Hoe snel ontvang ik mijn inloggegevens?',
      a: 'Direct na betaling ontvang je binnen 5 minuten je logingegevens via WhatsApp. Je kunt ruim voor de aftrap online zijn.',
    },
    {
      q: 'Wat kost het 12+3 maanden VIP-pakket?',
      a: 'Het Premium VIP 12+3 maanden pakket kost €78,00 eenmalig voor 1 apparaat — dat is €5,20 per maand effectief. Je abonnement is 15 maanden geldig inclusief 3 gratis maanden.',
    },
    {
      q: 'Is er een geld-terug-garantie?',
      a: 'Ja. Je krijgt 15 dagen geld-terug garantie zonder vragen. Bevalt IPTVTotaal niet, dan krijg je je geld terug.',
    },
  ];

  return (
    <div className="min-h-screen text-stone-900">

      {/* Hero */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Nederland Oezbekistan voetbalwedstrijd live kijken"
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
            <span className="text-sm font-bold text-amber-400 uppercase tracking-widest">Live · Nederland vs Oezbekistan</span>
          </div>

          <h1 className="text-5xl lg:text-8xl font-black tracking-tighter leading-none mb-6 max-w-4xl">
            Nederland – Oezbekistan<br />
            <span className="text-amber-400">Live Kijken via IPTV.</span>
          </h1>

          <p className="text-xl text-white/60 max-w-xl mb-4">
            Mis geen seconde. Kijk Nederland - Oezbekistan live via IPTV — op tv, telefoon of tablet.
          </p>
          <p className="text-xl text-white/60 max-w-xl mb-10">
            ESPN · NOS · 80.000+ zenders. Geen buffering, geen VPN-gedoe.
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

      {/* Match section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <div className="badge-brutal !text-sm mb-8">
              <span className="text-sm font-bold text-orange-400 uppercase tracking-widest">🇳🇱 Oranje in actie</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-stone-900 mb-6 leading-tight">
              Nederland - Oezbekistan.<br />
              <span className="text-amber-600">Live. Volledig. Zonder onderbrekingen.</span>
            </h2>
            <p className="text-stone-900/70 text-lg mb-4">
              Kijk de volledige wedstrijd Nederland - Oezbekistan live via IPTVTotaal. Van de aftrap tot het eindsignaal — op ESPN of NOS, in HD of 4K, op elk apparaat dat je kiest.
            </p>
            <p className="text-stone-900/70 text-lg mb-8">
              Geen losse dag-passen. Geen VPN. Gewoon inloggen en genieten van Oranje in actie.
            </p>
            <ul className="space-y-3 mb-10">
              <CheckItem>Nederland - Oezbekistan live op ESPN en NOS</CheckItem>
              <CheckItem>Nederlandstalig commentaar</CheckItem>
              <CheckItem>Werkt op Smart TV, telefoon en tablet</CheckItem>
              <CheckItem>Geen buffering — 99,9% uptime gegarandeerd</CheckItem>
              <CheckItem>Toegang tot 80.000+ zenders inclusief sportkanalen</CheckItem>
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
              src="https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Oranje fans Nederland voetbal live kijken via IPTV"
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
              Op welke zender kijk je Nederland - Oezbekistan?
            </h2>
            <p className="text-stone-900/60 text-lg">
              Met IPTVTotaal heb je alle sportzenders in één abonnement.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { name: 'NOS', desc: 'Nederlandstalig commentaar voor alle Oranje-wedstrijden inclusief Nederland - Oezbekistan. Inbegrepen in je IPTVTotaal-abonnement.' },
              { name: 'ESPN', desc: 'De belangrijkste Nederlandse sportzender. Live voetbal, studio-analyse en nabeschouwing.' },
              { name: 'RTL 7', desc: 'Commerciële zender met geselecteerde internationale voetbalwedstrijden en analyses.' },
              { name: 'beIN Sports', desc: 'Internationale sportzender. Voetbal in meerdere talen voor elk land.' },
              { name: 'Ziggo Sport', desc: 'Extra voetbalcontent, terugkijken en diepgaande analyses.' },
              { name: '+50 sportzenders', desc: 'Alles eromheen: Eurosport, Sky Sports, DAZN, Canal+ en tientallen meer.' },
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
                  <p className="text-sm text-stone-900/70 mt-0.5">ESPN, NOS, RTL 7, beIN Sports, Ziggo Sport én 80.000+ andere zenders — allemaal inbegrepen bij IPTVTotaal. Geen losse abonnementen, geen extra kosten.</p>
                </div>
              </div>
              <a
                href={`https://api.whatsapp.com/send/?phone=447449708976&text=${encodeURIComponent('Hallo, ik wil graag het Premium VIP-pakket van IPTVTotaal aanschaffen voor 12+3 maanden voor 1 apparaat (€78,00).')}&type=phone_number&app_absent=0`}
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
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-stone-900 mb-4">
                Zo kijk je Nederland - Oezbekistan via IPTV.
              </h2>
              <p className="text-stone-900/60 text-lg mb-10">Drie stappen. Duurt 5 minuten.</p>
              <ol className="space-y-8">
                {[
                  { n: '01', title: 'Stuur ons een WhatsApp', desc: 'Vertel welk apparaat je hebt. Wij sturen je binnen 5 minuten de inloggegevens toe — ruim voor de aftrap.' },
                  { n: '02', title: 'Download de app', desc: 'TiviMate op Android, GSE Smart IPTV op iPhone, Smart IPTV op je Smart TV.' },
                  { n: '03', title: 'Voer je gegevens in en kijk', desc: 'Plak je M3U-link of Xtream Codes in de app. Alle zenders laden direct. Geen gedoe meer.' },
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
            <div className="mt-12 lg:mt-0">
              <img
                src="https://images.pexels.com/photos/159594/soccer-football-player-sport-159594.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Nederland Oezbekistan live kijken via IPTV op tv of telefoon"
                className="w-full rounded-3xl object-cover"
                style={{ maxHeight: 500 }}
              />
              <p className="text-xs text-stone-900/40 mt-2">Foto: Pexels</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why IPTVTotaal */}
      <div className="border-t border-stone-900/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-stone-900 mb-12 max-w-2xl">
            Waarom IPTVTotaal voor Nederland - Oezbekistan?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: '99,9% uptime', desc: 'Geen uitval tijdens de wedstrijd. Redundante servers houden je stream stabiel van de eerste tot de laatste minuut.' },
              { title: '80.000+ zenders', desc: 'ESPN, NOS, RTL en tientallen sportzenders inbegrepen. Alles in één abonnement.' },
              { title: 'Vanaf €4,60/maand', desc: 'Geen losse dagpassen per wedstrijd. Één abonnement voor alle sport en entertainment.' },
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

      {/* 12+3 Months VIP Pack */}
      <div className="border-t border-stone-900/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-stone-900 mb-3">
              Het beste pakket voor Nederland - Oezbekistan.
            </h2>
            <p className="text-stone-900/60 text-lg">De wedstrijd live. Plus alles wat er daarna nog komt.</p>
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
                    'ESPN, NOS, RTL, Viaplay & meer',
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
                  href={whatsappLink}
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
            <span className="text-amber-600">Nederland - Oezbekistan live kijken.</span>
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
              Nederland - Oezbekistan live kijken via IPTV
            </h2>
            <p className="text-stone-900/60 leading-relaxed mb-4">
              Wil je <strong className="text-stone-900/90">Nederland - Oezbekistan live kijken</strong>? Via IPTVTotaal heb je direct toegang tot ESPN, NOS en alle andere sportzenders waarop de wedstrijd wordt uitgezonden. Geen dure dag-abonnementen per wedstrijd, maar één abonnement voor al het live voetbal het hele jaar rond.
            </p>
            <p className="text-stone-900/60 leading-relaxed mb-4">
              Met het <strong className="text-stone-900/90">12+3 maanden VIP-pakket</strong> van IPTVTotaal betaal je €78,00 eenmalig voor 15 maanden onbeperkt streamen. Dat is minder dan €5,20 per maand — inclusief 80.000+ kanalen, 200.000+ films en series, Enterprise Anti-Freeze en een persoonlijke VIP Manager.
            </p>
            <p className="text-stone-900/60 leading-relaxed">
              IPTV voor het kijken naar <strong className="text-stone-900/90">Nederland vs Oezbekistan</strong> instellen duurt minder dan 5 minuten. Stuur ons een WhatsApp, ontvang je inloggegevens en kijk op elk apparaat — Smart TV, iPhone, Android, Fire Stick of laptop. Niet tevreden? 15 dagen geld-terug, geen vragen.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="border-t border-stone-900/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
          <div className="bg-amber-500/8 border-[3px] border-amber-500/30 shadow-[8px_8px_0_0_rgba(245,158,11,0.2)] rounded-[40px] p-10 lg:p-16 text-center">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-stone-900 mb-4">
              Nederland - Oezbekistan.<br />
              <span className="text-amber-600">Kijk het live.</span>
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
