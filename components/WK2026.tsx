
import React, { useEffect } from 'react';

const whatsappLink = "https://api.whatsapp.com/send/?phone=447449708976&text&type=phone_number&app_absent=0";

const StatPill: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="text-center">
    <div className="text-4xl lg:text-5xl font-black text-amber-400 tracking-tighter">{value}</div>
    <div className="text-sm text-white/50 font-medium mt-1">{label}</div>
  </div>
);

const CheckItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start gap-3">
    <svg className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <span className="text-white/70">{children}</span>
  </li>
);

export const WK2026: React.FC = () => {

  useEffect(() => {
    document.title = 'Wereldkampioenschap Voetbal 2026 Live Kijken | IPTVTotaal';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Kijk alle 104 WK 2026 wedstrijden live via IPTVTotaal. Oranje, halve finales, de finale — mis geen minuut. Vanaf €4,60 per maand, 15 dagen geld-terug.');
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${window.location.origin}/wereldkampioenschap-voetbal-2026`);
    return () => {
      document.title = 'IPTVTotaal';
      if (metaDesc) metaDesc.setAttribute('content', '');
      canonical.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/58461/pexels-photo-58461.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="WK voetbal 2026 stadion"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-white/40 hover:text-amber-400 transition-colors mb-12">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Terug naar home
          </a>

          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-8">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-amber-400 uppercase tracking-widest">Live · Vanaf 11 juni 2026</span>
          </div>

          <h1 className="text-5xl lg:text-8xl font-black tracking-tighter leading-none mb-6 max-w-4xl">
            Wereldkampioenschap<br />
            <span className="text-amber-400">Voetbal 2026.</span>
          </h1>

          <p className="text-xl text-white/60 max-w-xl mb-4">
            104 wedstrijden. 48 landen. Oranje erbij.
          </p>
          <p className="text-xl text-white/60 max-w-xl mb-10">
            Kijk alles live — via je tv, telefoon of tablet.
          </p>

          <a
            href={whatsappLink}
            onClick={trackWhatsAppConversion}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black rounded-full hover:scale-[1.02] transition-transform shadow-xl shadow-amber-500/25 text-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.532 5.85L.057 23.292a.75.75 0 00.908.98l5.65-1.48A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.704 9.704 0 01-4.95-1.354l-.354-.21-3.655.957.975-3.562-.23-.368A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
            </svg>
            Stel je abonnement in via WhatsApp
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12 grid grid-cols-2 lg:grid-cols-4 gap-10">
          <StatPill value="104" label="wedstrijden live" />
          <StatPill value="48" label="landen meedoen" />
          <StatPill value="3" label="gastlanden" />
          <StatPill value="11 jun" label="aftrap" />
        </div>
      </div>

      {/* Oranje section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 mb-8">
              <span className="text-sm font-bold text-orange-400 uppercase tracking-widest">🇳🇱 Oranje op het WK</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white mb-6 leading-tight">
              Oranje is erbij.<br />Mis geen minuut.
            </h2>
            <p className="text-white/60 text-lg mb-4">
              Nederland doet mee aan het WK 2026. Elke wedstrijd van Oranje — groepsfase, achtste finales, kwartfinales, de finale — kijk je live via IPTVTotaal.
            </p>
            <p className="text-white/60 text-lg mb-8">
              Geen gepiegel met een VPN. Geen betaalde livestream per wedstrijd. Gewoon inloggen en kijken.
            </p>
            <ul className="space-y-3 mb-10">
              <CheckItem>Alle Oranje-wedstrijden live op ESPN en NOS</CheckItem>
              <CheckItem>Nederlandse commentatoren</CheckItem>
              <CheckItem>Werkt op tv, telefoon en tablet</CheckItem>
              <CheckItem>Geen buffering — 99,9% uptime gegarandeerd</CheckItem>
            </ul>
            <a
              href={whatsappLink}
              onClick={trackWhatsAppConversion}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black rounded-full hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20"
            >
              Start vandaag nog
            </a>
          </div>
          <div className="mt-12 lg:mt-0">
            <img
              src="https://images.pexels.com/photos/27132896/pexels-photo-27132896.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Nederlandse Oranje voetbalfans"
              className="w-full rounded-3xl object-cover"
              style={{ maxHeight: 480 }}
            />
            <p className="text-xs text-white/20 mt-2">Foto: Pexels</p>
          </div>
        </div>
      </div>

      {/* Oranje Wedstrijden */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 mb-6">
              <span className="text-sm font-bold text-orange-400 uppercase tracking-widest">🇳🇱 Oranje Speelschema WK 2026</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white mb-4">
              Drie wedstrijden. Eén doel.
            </h2>
            <p className="text-white/50 text-lg">
              Alle Oranje-wedstrijden op het WK 2026 live via IPTVTotaal. Mis er geen één.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                round: 'Groep F · Wedstrijd 1',
                date: 'Zo 14 juni 2026',
                time: '21:00 NL-tijd',
                opponent: 'Japan',
                venue: 'Dallas Stadium, Texas',
                slug: 'nederland-japan-wk-2026',
                color: 'from-amber-500/10',
                label: 'WK Debuut Oranje',
              },
              {
                round: 'Groep F · Wedstrijd 2',
                date: 'Za 20 juni 2026',
                time: '18:00 NL-tijd',
                opponent: 'Zweden',
                venue: 'Houston Stadium, Texas',
                slug: 'nederland-zweden-wk-2026',
                color: 'from-orange-500/10',
                label: 'Cruciaal Europees Duel',
              },
              {
                round: 'Groep F · Wedstrijd 3',
                date: 'Do 25 jun / Vr 26 jun',
                time: '00:00 NL-tijd',
                opponent: 'Tunesië',
                venue: 'Kansas City Stadium',
                slug: 'tunesie-nederland-wk-2026',
                color: 'from-red-500/10',
                label: 'Groepsfase Afsluiter',
              },
            ].map((m) => (
              <a
                key={m.slug}
                href={`/blog/${m.slug}`}
                className="group block p-7 bg-neutral-900 border border-white/10 rounded-2xl hover:border-amber-500/30 transition-all no-underline"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-black text-amber-400/60 uppercase tracking-[0.15em]">{m.round}</span>
                  <span className="text-[10px] font-bold text-white/30 px-2 py-1 rounded-full bg-white/5">{m.label}</span>
                </div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-6 rounded overflow-hidden ring-1 ring-white/20 shrink-0 flex items-center justify-center bg-red-600">
                    <span className="text-[8px] font-black text-white">NL</span>
                  </div>
                  <span className="text-white/30 font-black text-sm">vs</span>
                  <h3 className="text-white font-black text-lg">Nederland vs {m.opponent}</h3>
                </div>
                <div className="space-y-1.5 mb-6">
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <svg className="w-3.5 h-3.5 shrink-0 text-amber-400/50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <span>{m.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <svg className="w-3.5 h-3.5 shrink-0 text-amber-400/50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span>Aftrap {m.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <svg className="w-3.5 h-3.5 shrink-0 text-amber-400/50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <span>{m.venue}</span>
                  </div>
                </div>
                <span className="text-amber-400 text-sm font-bold group-hover:underline">
                  Analyse & live kijken →
                </span>
              </a>
            ))}
          </div>

          <div className="text-center">
            <a
              href={whatsappLink}
              onClick={trackWhatsAppConversion}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black rounded-full hover:scale-[1.02] transition-transform shadow-xl shadow-amber-500/25"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.532 5.85L.057 23.292a.75.75 0 00.908.98l5.65-1.48A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.704 9.704 0 01-4.95-1.354l-.354-.21-3.655.957.975-3.562-.23-.368A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
              </svg>
              Activeer nu — kijk alle Oranje-wedstrijden live
            </a>
          </div>
        </div>
      </div>

      {/* Channels */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
          <div className="max-w-2xl mb-12">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white mb-4">
              Op welke zenders kijk je het WK?
            </h2>
            <p className="text-white/50 text-lg">
              Het WK 2026 is verdeeld over meerdere zenders. Met IPTVTotaal heb je ze allemaal.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { name: 'NOS', desc: 'Gratis publieke omroep. Nederlandstalig commentaar voor alle Oranje-wedstrijden.' },
              { name: 'ESPN', desc: 'Betaalde sportzender met live WK-wedstrijden en uitgebreide voetbaldekking.' },
              { name: 'RTL 7', desc: 'Commerciële zender met geselecteerde WK-wedstrijden en studio-analyse.' },
              { name: 'beIN Sports', desc: 'Internationale sportzender. Alle wedstrijden in meerdere talen.' },
              { name: 'Ziggo Sport', desc: 'Extra WK-content, nabeschouwingen en analyses.' },
              { name: '+ 50 sportzenders', desc: 'Volg het WK vanuit elk land — Arabisch, Engels, Frans, Spaans en meer.' },
            ].map(ch => (
              <div key={ch.name} className="p-6 bg-neutral-900 border border-white/10 rounded-2xl hover:border-amber-500/30 transition-colors">
                <h3 className="text-lg font-black text-white mb-2">{ch.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{ch.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How to watch */}
      <div className="border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white mb-4">
                Zo kijk je het WK via IPTVTotaal.
              </h2>
              <p className="text-white/50 text-lg mb-10">Drie stappen. Duurt 5 minuten.</p>
              <ol className="space-y-8">
                {[
                  { n: '01', title: 'Stuur ons een WhatsApp', desc: 'Vertel welk apparaat je hebt. Wij sturen je binnen 5 minuten de inloggegevens toe.' },
                  { n: '02', title: 'Download de gratis app', desc: 'TiviMate op Android, GSE Smart IPTV op iPhone, Smart IPTV op je Smart TV. Gratis te downloaden.' },
                  { n: '03', title: 'Voer je gegevens in en kijk', desc: 'Plak je M3U-link of Xtream Codes in de app. Alle zenders laden direct. Geen gedoe.' },
                ].map(step => (
                  <li key={step.n} className="flex gap-6">
                    <span className="text-4xl font-black text-amber-400/30 leading-none shrink-0">{step.n}</span>
                    <div>
                      <h3 className="text-lg font-black text-white mb-1">{step.title}</h3>
                      <p className="text-white/50 leading-relaxed">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-12 lg:mt-0">
              <img
                src="https://images.pexels.com/photos/159594/soccer-football-player-sport-159594.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Voetbal actie WK 2026"
                className="w-full rounded-3xl object-cover"
                style={{ maxHeight: 500 }}
              />
              <p className="text-xs text-white/20 mt-2">Foto: Pexels</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why IPTVTotaal */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white mb-12 max-w-xl">
            Waarom IPTVTotaal voor het WK?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: '99,9% uptime', desc: 'Geen uitval tijdens de wedstrijd. Redundante servers houden je stream stabiel.' },
              { title: '80.000+ zenders', desc: 'Alle WK-zenders inbegrepen. Plus sport, nieuws en entertainment.' },
              { title: 'Vanaf €4,60/maand', desc: 'Geen losse dagpassen per wedstrijd. Één abonnement voor het hele toernooi.' },
              { title: '15 dagen geld-terug', desc: 'Bevalt het niet? Geen vragen, geld terug. Zo simpel is het.' },
            ].map(item => (
              <div key={item.title} className="p-7 bg-neutral-900 border border-amber-900/20 rounded-3xl hover:border-amber-500/30 transition-colors">
                <h3 className="text-xl font-black text-amber-400 mb-3">{item.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Yearly Pack */}
      <div className="border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white mb-3">
              Het beste pakket voor het WK.
            </h2>
            <p className="text-white/50 text-lg">Heel het toernooi live. Plus alles wat er daarna nog komt.</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative rounded-[40px] p-px bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 shadow-2xl shadow-amber-500/30">
              <div className="rounded-[39px] bg-neutral-950 p-10 lg:p-12">

                {/* Badge */}
                <div className="flex items-center justify-between mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-black uppercase tracking-widest">
                    ★ Premium VIP
                  </div>
                  <span className="text-xs font-bold text-amber-400/60 uppercase tracking-widest">12 + 3 Maanden Gratis</span>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-6xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                      €78,00
                    </span>
                    <span className="text-white/40 font-bold mb-3">eenmalig</span>
                  </div>
                  <p className="text-white/40 text-sm">Geldig voor 15 maanden · 1 apparaat · €5,20/maand effectief</p>
                </div>

                {/* Features grid */}
                <div className="grid sm:grid-cols-2 gap-3 mb-10">
                  {[
                    'SD / HD / 4K / 8K / HDR-VR',
                    '+80.000 Kanalen + Netflix',
                    '+200.000 Films & Series',
                    'Alle Sport PPV Events',
                    'RTL, NPO, ESPN, Viaplay & meer',
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

                {/* CTA */}
                <a
                  href={whatsappLink}
                  onClick={trackWhatsAppConversion}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black text-lg hover:scale-[1.02] transition-transform shadow-xl shadow-amber-500/30"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.532 5.85L.057 23.292a.75.75 0 00.908.98l5.65-1.48A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.704 9.704 0 01-4.95-1.354l-.354-.21-3.655.957.975-3.562-.23-.368A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                  </svg>
                  Bestel via WhatsApp — €78,00
                </a>

                <p className="text-center text-white/30 text-xs mt-4">15 dagen geld-terug garantie · Geen verborgen kosten</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
          <div className="bg-gradient-to-br from-amber-500/10 to-yellow-600/5 border border-amber-500/20 rounded-[40px] p-10 lg:p-16 text-center">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-white mb-4">
              Het WK begint 11 juni.
            </h2>
            <p className="text-white/50 text-xl mb-10 max-w-lg mx-auto">
              Stel je abonnement vandaag in. Je bent binnen 5 minuten klaar.
            </p>
            <a
              href={whatsappLink}
              onClick={trackWhatsAppConversion}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black rounded-full hover:scale-[1.02] transition-transform shadow-xl shadow-amber-500/20 text-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.532 5.85L.057 23.292a.75.75 0 00.908.98l5.65-1.48A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.704 9.704 0 01-4.95-1.354l-.354-.21-3.655.957.975-3.562-.23-.368A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
              </svg>
              WhatsApp Ons Nu
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};
