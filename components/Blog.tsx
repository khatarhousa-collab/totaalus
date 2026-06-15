
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const trackWhatsAppConversion = () => {
  if (typeof (window as any).gtag !== 'undefined') {
    (window as any).gtag('event', 'conversion', { 'send_to': 'AW-18174158750/7VouCIXTmLccEJ7PjtpD' });
  }
};

interface BlogPost {
  slug: string;
  publishDate?: string;
  date: string;
  readTime: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  imageAspect?: 'video' | 'square';
  headerCard?: React.ReactNode;
  content: React.ReactNode;
}

const FLAG_SVGS: Record<string, React.ReactNode> = {
  NL: <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg"><rect width="900" height="200" fill="#AE1C28"/><rect y="200" width="900" height="200" fill="#fff"/><rect y="400" width="900" height="200" fill="#21468B"/></svg>,
  JP: <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg"><rect width="900" height="600" fill="#fff"/><circle cx="450" cy="300" r="180" fill="#BC002D"/></svg>,
  SE: <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="500" fill="#006AA7"/><rect x="200" width="100" height="500" fill="#FECC02"/><rect y="200" width="800" height="100" fill="#FECC02"/></svg>,
  TN: <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg"><rect width="900" height="600" fill="#E70013"/><circle cx="450" cy="300" r="150" fill="#fff"/><circle cx="460" cy="300" r="100" fill="#E70013"/><circle cx="500" cy="300" r="100" fill="#fff"/><polygon points="430,240 445,285 490,285 455,310 468,355 430,330 392,355 405,310 370,285 415,285" fill="#E70013"/></svg>,
  MX: <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="600" fill="#006847"/><rect x="300" width="300" height="600" fill="#fff"/><rect x="600" width="300" height="600" fill="#CE1126"/><circle cx="450" cy="300" r="60" fill="#8B6914" opacity="0.3"/></svg>,
  ZA: <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg"><rect width="900" height="600" fill="#007A4D"/><rect y="200" width="900" height="200" fill="#fff"/><rect y="233" width="900" height="134" fill="#DE3831"/><polygon points="0,0 0,600 350,300" fill="#000"/><polygon points="0,30 0,570 310,300" fill="#FFB612"/><polygon points="0,200 0,400 175,300" fill="#fff"/><polygon points="0,233 0,367 155,300" fill="#002395"/></svg>,
  US: <svg viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg"><rect width="760" height="400" fill="#fff"/>{[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i=><rect key={i} y={i*30.77} width="760" height="15.38" fill={i%2===0?"#B22234":"#fff"}/>)}<rect width="305" height="215" fill="#3C3B6E"/>{Array.from({length:50},(_,i)=><circle key={i} cx={18+(i%10)*28} cy={18+Math.floor(i/10)*38+(i%2===0?0:14)} r="5" fill="#fff"/>)}</svg>,
  PY: <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg"><rect width="900" height="200" fill="#D52B1E"/><rect y="200" width="900" height="200" fill="#fff"/><rect y="400" width="900" height="200" fill="#0038A8"/><circle cx="450" cy="300" r="70" fill="#fff" stroke="#D52B1E" strokeWidth="4"/></svg>,
  BR: <svg viewBox="0 0 900 630" xmlns="http://www.w3.org/2000/svg"><rect width="900" height="630" fill="#009C3B"/><polygon points="450,60 840,315 450,570 60,315" fill="#FFDF00"/><circle cx="450" cy="315" r="130" fill="#002776"/><path d="M330,280 Q450,340 570,280" stroke="#fff" strokeWidth="8" fill="none"/></svg>,
  MA: <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg"><rect width="900" height="600" fill="#C1272D"/><polygon points="450,210 463,250 505,250 472,274 484,315 450,291 416,315 428,274 395,250 437,250" fill="none" stroke="#006233" strokeWidth="8"/></svg>,
  SA: <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg"><rect width="900" height="600" fill="#006C35"/><rect y="520" width="900" height="80" fill="#fff"/><text x="450" y="295" textAnchor="middle" fill="#fff" fontSize="80" fontFamily="serif">لا إله إلا الله</text><path d="M300,360 L350,320 L400,360 L380,360 L380,400 L320,400 L320,360 Z" fill="#fff" opacity="0.8"/></svg>,
  UY: <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">{[0,1,2,3,4,5,6,7,8].map(i=><rect key={i} y={i*66.7} width="900" height="33.3" fill={i%2===0?"#fff":"#0038A8"}/>)}<rect width="360" height="300" fill="#fff"/><circle cx="180" cy="150" r="60" fill="#FFD700"/>{Array.from({length:16},(_,i)=><line key={i} x1="180" y1="150" x2={180+75*Math.cos(i*Math.PI/8)} y2={150+75*Math.sin(i*Math.PI/8)} stroke="#FFD700" strokeWidth="5"/>)}</svg>,
};

const CountryFlag: React.FC<{ code: string }> = ({ code }) => (
  <div className="w-28 h-[72px] rounded-xl overflow-hidden shadow-2xl ring-2 ring-black/30">
    {FLAG_SVGS[code] ?? <div className="w-full h-full bg-black/20"/>}
  </div>
);

const WkMatchHeroCard: React.FC<{
  team1: string; team2: string; code1: string; code2: string;
  matchDateISO: string; kickoff: string; venue: string; group: string;
}> = ({ team1, team2, code1, code2, matchDateISO, kickoff, venue, group }) => {
  const [t, setT] = React.useState({ d: 0, h: 0, m: 0, s: 0, started: false });
  React.useEffect(() => {
    const target = new Date(matchDateISO).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setT({ d: 0, h: 0, m: 0, s: 0, started: true }); return; }
      setT({ d: Math.floor(diff/86400000), h: Math.floor((diff%86400000)/3600000), m: Math.floor((diff%3600000)/60000), s: Math.floor((diff%60000)/1000), started: false });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [matchDateISO]);

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/25 not-prose border border-amber-500/10">

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-neutral-950">
        <span className="text-[11px] font-black text-amber-400 uppercase tracking-[0.15em]">⚽ FIFA WK 2026 · {group}</span>
        <div className="flex items-center gap-1.5 text-[11px] font-black text-black bg-amber-400 px-2.5 py-1 rounded-full uppercase tracking-widest">
          <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"/>LIVE · IPTVTOTAAL
        </div>
      </div>

      {/* Main — amber gradient */}
      <div className="bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 px-5 pt-6 pb-5">

        {/* Teams row */}
        <div className="flex items-center justify-between gap-3">
          {/* Team 1 */}
          <div className="flex flex-col items-center gap-2 flex-1">
            <CountryFlag code={code1} />
            <span className="text-black font-black text-base lg:text-lg text-center leading-tight">{team1}</span>
          </div>

          {/* Centre */}
          <div className="flex flex-col items-center gap-1 px-2">
            <span className="text-black/20 text-4xl font-black tracking-tighter leading-none select-none">VS</span>
            <div className="bg-black/15 rounded-lg px-3 py-1.5 text-center">
              <div className="text-black font-black text-sm leading-none">{kickoff}</div>
              <div className="text-black/50 text-[10px] font-bold uppercase tracking-widest mt-0.5">aftrap</div>
            </div>
          </div>

          {/* Team 2 */}
          <div className="flex flex-col items-center gap-2 flex-1">
            <CountryFlag code={code2} />
            <span className="text-black font-black text-base lg:text-lg text-center leading-tight">{team2}</span>
          </div>
        </div>

        {/* Timer */}
        <div className="mt-4 flex justify-center">
          {t.started ? (
            <div className="inline-flex items-center gap-2 bg-black rounded-lg px-4 py-2">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"/>
              <span className="text-amber-400 font-black text-xs uppercase tracking-widest">Live nu bezig</span>
            </div>
          ) : (
            <div className="bg-black/80 rounded-lg px-3 py-2 inline-flex items-center justify-center gap-0.5 mx-auto">
              {[{v:t.d,l:'d'},{v:t.h,l:'u'},{v:t.m,l:'m'},{v:t.s,l:'s'}].map(({v,l}, i) => (
                <React.Fragment key={l}>
                  {i > 0 && <span className="text-amber-400/50 font-black text-sm leading-none pb-3 px-0.5">:</span>}
                  <div className="flex flex-col items-center w-9">
                    <span className="text-amber-400 font-black text-lg tabular-nums leading-none">{String(v).padStart(2,'0')}</span>
                    <span className="text-white/30 text-[9px] font-bold uppercase tracking-wide mt-0.5">{l === 'd' ? 'dag' : l === 'u' ? 'uur' : l === 'm' ? 'min' : 'sec'}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-neutral-950 px-5 py-3 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 text-white/30 text-[11px] font-medium min-w-0">
          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <span className="truncate">{venue}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {[
            { src: '/assets/channels/espn.png', alt: 'ESPN' },
            { src: '/assets/channels/viaplay.png', alt: 'Viaplay' },
            { src: '/assets/channels/ziggo-sport.png', alt: 'Ziggo Sport' },
            { src: '/assets/channels/eurosport.png', alt: 'Eurosport' },
          ].map(ch => (
            <div key={ch.alt} className="bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg px-2 py-1.5 flex items-center justify-center h-8 min-w-[48px]">
              <img src={ch.src} alt={ch.alt} className="max-h-4 max-w-[56px] object-contain" />
            </div>
          ))}
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-[11px] font-black px-2 py-1.5 rounded-lg h-8">
            <div className="w-4 h-4 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-sm flex items-center justify-center shrink-0 ring-1 ring-black/20">
              <div className="w-2 h-2 bg-black rotate-45"/>
            </div>
            IPTVTotaal
          </div>
        </div>
      </div>
    </div>
  );
};

const WkCtaBlock: React.FC<{ match: string }> = ({ match }) => (
  <div className="mt-10 rounded-[32px] p-px bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 shadow-2xl shadow-amber-500/20">
    <div className="rounded-[31px] bg-neutral-950 p-8 lg:p-10">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-black uppercase tracking-widest">★ Premium VIP</span>
        <span className="text-xs font-bold text-amber-400/60 uppercase tracking-widest">12 + 3 Maanden Gratis</span>
      </div>
      <h3 className="text-2xl lg:text-3xl font-black text-white mb-2">Kijk {match} live via IPTVTotaal</h3>
      <p className="text-white/50 mb-6">Alle 104 WK 2026 wedstrijden — inclusief Oranje, halve finales en de finale — live en in HD. Geen buffering, geen gedoe.</p>
      <div className="flex items-end gap-2 mb-6">
        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">€78,00</span>
        <span className="text-white/40 font-bold mb-1.5">eenmalig · 15 maanden</span>
      </div>
      <div className="grid sm:grid-cols-2 gap-2 mb-8 text-sm">
        {['+80.000 Kanalen + Netflix','Alle Sport PPV Events','SD / HD / 4K / 8K / HDR','RTL · NPO · ESPN · Viaplay','VPN Inbegrepen','Enterprise Anti-Freeze PRO','Persoonlijke VIP Manager','15 Dagen Geld-Terug'].map(f => (
          <div key={f} className="flex items-center gap-2 text-white/70">
            <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
            {f}
          </div>
        ))}
      </div>
      <a href="https://api.whatsapp.com/send/?phone=447449708976&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black text-lg hover:scale-[1.02] transition-transform shadow-xl shadow-amber-500/30 no-underline">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.532 5.85L.057 23.292a.75.75 0 00.908.98l5.65-1.48A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.704 9.704 0 01-4.95-1.354l-.354-.21-3.655.957.975-3.562-.23-.368A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
        Bestel via WhatsApp — €78,00
      </a>
      <p className="text-center text-white/30 text-xs mt-3">15 dagen geld-terug garantie · Geen verborgen kosten</p>
    </div>
  </div>
);

const posts: BlogPost[] = [
  // ── WK 2026: Nederland vs Japan ──────────────────────────────────────────
  {
    slug: 'nederland-japan-wk-2026',
    publishDate: '2026-06-14',
    date: '14 juni 2026',
    readTime: '9 min',
    category: 'WK 2026',
    title: 'Nederland vs Japan Live Kijken WK 2026 — Oranje Debuut in Dallas',
    excerpt: 'Vandaag! Zondag 14 juni speelt Oranje zijn eerste WK 2026-wedstrijd tegen Japan in Dallas om 21:00. Hoe kijk je het live? Alles wat je moet weten, inclusief stream-opties en tactische analyse.',
    image: '/nederland-japan-wk-2026.jpg',
    headerCard: <WkMatchHeroCard team1="Nederland" team2="Japan" code1="NL" code2="JP" matchDateISO="2026-06-14T19:00:00Z" kickoff="21:00 NL-tijd" venue="Dallas Stadium, Texas" group="Groep F" />,
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <div className="flex flex-wrap gap-2 mb-2">
          {['nederland vs japan live kijken','nederland japan wk 2026','oranje japan livestream','nederland japan stream','nederland japan uitzending','hoe kijk ik nederland japan','nederland wk 2026 live','waar kijk je nederland japan','oranje wk debuut 2026','nederland japan wk kijken gratis','wk 2026 groep F nederland'].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">{kw}</span>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[{label:'Datum',value:'Zondag 14 juni 2026'},{label:'Aftrap',value:'21:00 NL-tijd'},{label:'Stadion',value:'Dallas Stadium, Texas'}].map(i => (
            <div key={i.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{i.label}</div>
              <div className="text-white font-black text-sm">{i.value}</div>
            </div>
          ))}
        </div>

        <p>Vanavond is het zover. Oranje maakt zijn WK 2026-debuut in Dallas, Texas. Tegenover Nederland staat Japan — een elftal dat in 2022 zowel Duitsland als Spanje versloeg. Dit is dé Nederlandse sportgebeurtenis van het jaar.</p>

        <h3 className="text-2xl font-black text-white">Waar kijk je Nederland vs Japan live?</h3>
        <p>Je kijkt Nederland – Japan live via <strong className="text-white">IPTVTotaal</strong>. Alle 104 WK 2026-wedstrijden in HD, zonder buffering, op elk apparaat. TV, telefoon, tablet — het maakt niet uit. Je bent binnen 5 minuten klaar.</p>
        <p>Uitzending via ESPN en NOS met Nederlandstalig commentaar. Via IPTVTotaal heb je ze allebei.</p>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5">
          <p className="text-white font-black mb-1">Aftrap: Zondag 14 juni · 21:00 NL-tijd</p>
          <p className="text-sm text-white/60">IPTVTotaal streamt live in HD — ESPN · NOS · Viaplay · 80.000+ zenders inbegrepen.</p>
        </div>

        <h3 className="text-2xl font-black text-white">Waarom Japan een serieuze tegenstander is.</h3>
        <p>Op WK 2022 versloeg Japan zowel Duitsland als Spanje. Groepsfavoriten. Beiden. Dit is geen toeval — Japan is een tactisch gepolijst elftal dat bijna geen fouten maakt.</p>
        <p>Ze spelen compact in een <strong className="text-white">4-2-3-1</strong>, zetten hoog druk en slaan toe op de omschakeling. Als Oranje slordig is in de opbouw, betaal je de prijs.</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Kaoru Mitoma</strong> (Brighton) — linksbuiten, dribbelkoning, bijna onhoudbaar in 1-op-1</li>
          <li><strong className="text-white">Takefusa Kubo</strong> (Real Sociedad) — speelmaker en gevaarlijk tussen de linies</li>
          <li><strong className="text-white">Takumi Minamino</strong> — doelgericht, snel, gevaarlijk in de zestien</li>
          <li><strong className="text-white">Wataru Endo</strong> (Liverpool) — defensieve motor die het team bij elkaar houdt</li>
        </ul>
        <p>Japan laat Duitsland en Spanje allebei verliezen op één WK. Niemand onderschat hen meer.</p>

        <h3 className="text-2xl font-black text-white">Oranje's wapens vanavond.</h3>
        <p>Ronald Koeman beschikt over een goed gevulde selectie. Gakpo is in topvorm na een sterk seizoen bij Liverpool. Van Dijk is de stabiele rots achterin. En Xavi Simons brengt de onvoorspelbaarheid die Japan niet kan plannen.</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Cody Gakpo</strong> — snelheid, diepgang, scorend vermogen vanuit links</li>
          <li><strong className="text-white">Virgil van Dijk</strong> — leider en fundament; dominant in de lucht en in 1-op-1</li>
          <li><strong className="text-white">Xavi Simons</strong> (Leipzig) — creatief, explosief, gevaarlijk tussen de linies</li>
          <li><strong className="text-white">Frenkie de Jong</strong> — dirigent op het middenveld, schakelt snel van verdedigen naar aanvallen</li>
          <li><strong className="text-white">Memphis Depay</strong> — gevaarlijk invaller, ervaring in grote wedstrijden</li>
        </ul>
        <p>Nederland voetbalt vanuit een <strong className="text-white">4-3-3</strong> met hoog bezit. De kracht zit op de vleugels en bij stilstaande situaties.</p>

        <h3 className="text-2xl font-black text-white">Het sleutelduel: Gakpo vs Japan's defensielijn.</h3>
        <p>Als Gakpo zijn normale tempo haalt, heeft Japan een probleem. Japan verdedigt compact en hoog, maar Gakpo scoort over midden als het raakvlak van de ruimte is.</p>
        <p>Andersom: als Mitoma zijn dag heeft op links, wordt het een lange avond voor de Nederlandse rechtsback. Dit duel bepaalt het tempo van de hele wedstrijd.</p>

        <h3 className="text-2xl font-black text-white">Wat staat er op het spel in Groep F?</h3>
        <p>Groep F bestaat uit: Nederland, Japan, Zweden en Tunesië. De top twee gaat door naar de achtste finales. Nederland is de topfavoriet voor de groepszege — maar alleen als ze vanavond de goede toon zetten.</p>
        <p>Een verlies of een gelijkspel zou Groep F direct compliceren. De druk ligt op Oranje. Japan heeft niets te verliezen.</p>

        <h3 className="text-2xl font-black text-white">Onze voorspelling.</h3>
        <p>Japan maakt het moeilijk in de eerste helft. Na rust vindt Oranje de ruimte — en Gakpo maakt het verschil.</p>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-white font-black mb-1">Onze verwachting: Nederland 2 – 1 Japan</p>
          <p className="text-sm">Oranje wint, maar Japan laat zien waarom niemand hen meer onderschat. Spannend tot het einde.</p>
        </div>

        <h3 className="text-2xl font-black text-white">Hoe kijk je vanavond Nederland vs Japan live?</h3>
        <p>Via <strong className="text-white">IPTVTotaal</strong> kijk je de wedstrijd live in HD op elk apparaat. Eén abonnement. Alle 104 WK-duels. Geen extra kosten per wedstrijd. Vanaf €4,60 per maand — of het complete toernooi voor €78 eenmalig.</p>
        <p>Je bent binnen 5 minuten actief. Stuur een WhatsApp en wij regelen de rest.</p>

        <WkCtaBlock match="Nederland vs Japan" />
      </div>
    ),
  },
  // ── WK 2026: Nederland vs Zweden ─────────────────────────────────────────
  {
    slug: 'nederland-zweden-wk-2026',
    publishDate: '2026-06-14',
    date: '14 juni 2026',
    readTime: '8 min',
    category: 'WK 2026',
    title: 'Nederland vs Zweden Live Kijken WK 2026 — Het Cruciale Europese Duel',
    excerpt: 'Zaterdag 20 juni duelleren Nederland en Zweden om de koppositie in Groep F. De winnaar heeft zo goed als zeker de achtste finales bereikt. Alles over hoe je dit live kijkt en wat je kunt verwachten.',
    image: '/nederland-zweden-wk-2026.jpg',
    headerCard: <WkMatchHeroCard team1="Nederland" team2="Zweden" code1="NL" code2="SE" matchDateISO="2026-06-20T16:00:00Z" kickoff="18:00 NL-tijd" venue="Houston Stadium, Texas" group="Groep F" />,
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <div className="flex flex-wrap gap-2 mb-2">
          {['nederland vs zweden live kijken','nederland zweden wk 2026','nederland zweden livestream','oranje zweden kijken','nederland zweden wk kijken','nederland zweden uitzending','oranje tweede wedstrijd wk','nederland wk 2026 groep F','alexander isak nederland','nederland zweden stream','wk 2026 nederland kijken'].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">{kw}</span>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[{label:'Datum',value:'Zaterdag 20 juni 2026'},{label:'Aftrap',value:'18:00 NL-tijd'},{label:'Stadion',value:'Houston Stadium, Texas'}].map(i => (
            <div key={i.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{i.label}</div>
              <div className="text-white font-black text-sm">{i.value}</div>
            </div>
          ))}
        </div>

        <p>Na de opener tegen Japan wacht Oranje het meest cruciale duel van de groepsfase. Op zaterdag 20 juni neemt Nederland het in Houston op tegen Zweden. Europees voetbal op een WK — en de inzet is enorm. De winnaar staat zo goed als in de achtste finales.</p>

        <h3 className="text-2xl font-black text-white">Waar kijk je Nederland vs Zweden live?</h3>
        <p>Je kijkt dit duel live via <strong className="text-white">IPTVTotaal</strong>. HD-kwaliteit, zonder buffering, op elk apparaat. Aftrap is om 18:00 NL-tijd — gewoon thuis op de bank, of onderweg op je telefoon.</p>
        <p>Uitgezonden via ESPN en NOS. Beide inbegrepen in één abonnement.</p>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5">
          <p className="text-white font-black mb-1">Aftrap: Zaterdag 20 juni · 18:00 NL-tijd</p>
          <p className="text-sm text-white/60">Live via IPTVTotaal — ESPN · NOS · Viaplay · 80.000+ zenders. Eén pakket voor het hele toernooi.</p>
        </div>

        <h3 className="text-2xl font-black text-white">Waarom dit duel zo belangrijk is.</h3>
        <p>Groep F bestaat uit Nederland, Japan, Zweden en Tunesië. De top twee gaat door. De winnaar van dit puur Europese duel heeft de achtste finales praktisch op zak. De verliezer staat met de rug tegen de muur richting de derde wedstrijd tegen Tunesië.</p>
        <p>Er is meer. De groepswinnaar krijgt een gunstiger pad in de knock-outfase. Een slechter loting betekent eerder een topland treffen. Dit duel bepaalt dus meer dan alleen de doorgang — het bepaalt de route naar de finale.</p>

        <h3 className="text-2xl font-black text-white">Nederland: wat kun je verwachten?</h3>
        <p>Koeman zal na de Japan-wedstrijd nauwelijks roteren. De basis staat. Oranje speelt vanuit een <strong className="text-white">4-3-3</strong> met hoog balbezit en druk op de vleugels.</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Cody Gakpo</strong> — directe diepgang en scorend vermogen</li>
          <li><strong className="text-white">Xavi Simons</strong> — onvoorspelbaar tussen de linies, sleutelspeler in het aanvalsspel</li>
          <li><strong className="text-white">Tijjani Reijnders</strong> — box-to-box, sterk in duels en gevaarlijk met de eindpass</li>
          <li><strong className="text-white">Virgil van Dijk</strong> — defensieve anker, domineert de luchtduels</li>
          <li><strong className="text-white">Matthijs de Ligt</strong> — ervaren naast Van Dijk, sterk in directe confrontaties</li>
        </ul>
        <p>Nederland is op papier beter. Maar Zweden maakt het elk internationaal team moeilijk. Dat is precies wat je weet als je hen hebt gevolgd.</p>

        <h3 className="text-2xl font-black text-white">Zweden: de dreiging van Alexander Isak.</h3>
        <p>Zweden draait op één man in de spits: <strong className="text-white">Alexander Isak</strong>. De Newcastle-spits was een van de topscorers van de Premier League. Hij is razendsnel, technisch verfijnd en gevaarlijk met beide voeten. Als hij zijn niveau haalt, is iedere verdediging in problemen.</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Alexander Isak</strong> (Newcastle) — de gevaarlijkste Scandinavische spits ter wereld op dit moment</li>
          <li><strong className="text-white">Dejan Kulusevski</strong> (Tottenham) — creatief, snel en gevaarlijk op de rechterflank</li>
          <li><strong className="text-white">Emil Forsberg</strong> — slimme spelmaker, gevaarlijk bij vrije trappen</li>
          <li><strong className="text-white">Victor Lindelöf</strong> (Manchester United) — solide verdediger, sterk in de lucht</li>
        </ul>
        <p>Zweden speelt compact in een <strong className="text-white">4-4-2</strong>. Ze staan laag, verdedigen goed en wachten op de counter. Als Isak op dreef raakt, worden ze gevaarlijk.</p>

        <h3 className="text-2xl font-black text-white">Het sleutelduel: Van Dijk vs Alexander Isak.</h3>
        <p>Dit is het duel in het duel. Van Dijk is de beste verdediger van zijn generatie. Isak is een van de meest gevreesde spitsen van Europa. Wie dit duel wint, wint waarschijnlijk de wedstrijd.</p>
        <p>Als Van Dijk Isak keer op keer neerlegt, verliest Zweden hun wapen. Als Isak één keer ontsnapt en scoort, verandert het spel volledig. Hou dit duo in de gaten.</p>

        <h3 className="text-2xl font-black text-white">Onze voorspelling.</h3>
        <p>Zweden maakt het moeilijk in de eerste helft. Oranje heeft geduld nodig. Na rust vindt Nederland de ruimtes — en dan is de kwaliteit van Simons en Gakpo doorslaggevend.</p>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-white font-black mb-1">Onze verwachting: Nederland 2 – 0 Zweden</p>
          <p className="text-sm">Oranje wint met een gecontroleerde prestatie. Isak wordt geneutraliseerd door Van Dijk. De tweede goal valt laat, maar de punten gaan mee.</p>
        </div>

        <h3 className="text-2xl font-black text-white">Nederland vs Zweden live kijken — zo doe je dat.</h3>
        <p>Via <strong className="text-white">IPTVTotaal</strong> kijk je dit WK-duel live in HD op elk apparaat. Geen extra abonnement per wedstrijd. Geen gedoe. Eén pakket voor alle 104 WK-duels — inclusief halve finales en de finale.</p>
        <p>Vanaf €4,60 per maand. Of het complete toernooi voor €78 eenmalig. Stuur een WhatsApp en je bent binnen 5 minuten live.</p>

        <WkCtaBlock match="Nederland vs Zweden" />
      </div>
    ),
  },
  // ── WK 2026: Tunesië vs Nederland ────────────────────────────────────────
  {
    slug: 'tunesie-nederland-wk-2026',
    publishDate: '2026-06-14',
    date: '14 juni 2026',
    readTime: '8 min',
    category: 'WK 2026',
    title: 'Tunesië vs Nederland Live Kijken WK 2026 — Groepsfase Afsluiter in Kansas City',
    excerpt: 'Op donderdag 25 juni (middernacht NL-tijd) sluit Oranje de groepsfase af tegen Tunesië in Kansas City. Dit bepaalt of Nederland als groepswinnaar of -tweede de knock-outfase ingaat. Alles over hoe je het live kijkt.',
    image: '/tunesie-nederland-wk-2026.jpg',
    headerCard: <WkMatchHeroCard team1="Tunesië" team2="Nederland" code1="TN" code2="NL" matchDateISO="2026-06-25T22:00:00Z" kickoff="00:00 NL-tijd" venue="Kansas City Stadium, Missouri" group="Groep F" />,
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <div className="flex flex-wrap gap-2 mb-2">
          {['nederland tunesie live kijken','tunesie nederland wk 2026','nederland tunesie wk kijken','oranje tunesie livestream','nederland wk groepsfase afsluiter','nederland wk derde wedstrijd','tunesie nederland uitzending','nederland tunesie stream','oranje wk 2026 groep F','nederland wk 2026 live kijken','tunesie nederland wk 2026 kijken'].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">{kw}</span>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[{label:'Datum',value:'Vrijdag 26 juni 2026 (00:00)'},{label:'Aftrap',value:'00:00 NL-tijd'},{label:'Stadion',value:'Kansas City Stadium, Missouri'}].map(i => (
            <div key={i.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{i.label}</div>
              <div className="text-white font-black text-sm">{i.value}</div>
            </div>
          ))}
        </div>

        <p>Middernacht in Kansas City. Oranje's laatste groepswedstrijd. Tunesië vs Nederland bepaalt wie als groepswinnaar of -tweede de knock-outfase ingaat — en dus welke tegenstander Nederland treft in de achtste finale.</p>
        <p>Dit is de wedstrijd die de rest van het toernooi kan kleuren. Ben jij wakker?</p>

        <h3 className="text-2xl font-black text-white">Waar kijk je Tunesië vs Nederland live?</h3>
        <p>Je kijkt dit duel live via <strong className="text-white">IPTVTotaal</strong>. Aftrap om 00:00 NL-tijd — laat op de avond, maar IPTVTotaal streamt gewoon door. Op je telefoon, tablet of tv. HD, zonder buffering.</p>
        <p>ESPN en NOS uitzenden dit live. Beide inbegrepen in één abonnement.</p>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5">
          <p className="text-white font-black mb-1">Aftrap: Donderdag 25 juni · 00:00 NL-tijd (nacht naar vrijdag)</p>
          <p className="text-sm text-white/60">Live via IPTVTotaal — ESPN · NOS · Viaplay · 80.000+ zenders. Dag en nacht beschikbaar.</p>
        </div>

        <h3 className="text-2xl font-black text-white">Wat staat er op het spel?</h3>
        <p>Groep F bestaat uit Nederland, Japan, Zweden en Tunesië. Na de eerste twee wedstrijden (vs Japan en vs Zweden) kennen we de onderlinge stand. Maar de eindpositie hangt af van dit duel.</p>
        <p>De groepswinnaar heeft in de achtste finales een aanmerkelijk gunstiger loting. Als Oranje als tweede eindigt, is het pad naar de finale zwaarder. Elke punt telt. Elke plek in de stand telt.</p>
        <p>Als de stand al bepaald is, roteert Koeman. Zijn basiself spaart energie voor de knock-outfase. Als het nog open ligt, staat de sterkste elf op het veld. Beide scenario's zijn mogelijk.</p>

        <h3 className="text-2xl font-black text-white">Analyse Tunesië: niet zomaar een opponent.</h3>
        <p>Tunesië verscheen viermaal eerder op een WK. Ze spelen compact, moeilijk te bespelen en gevaarlijk als underdog. Dit is Afrika's meest georganiseerde defensieve ploeg.</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Youssef Msakni</strong> — ervaren aanvaller, gevaarlijk in de ruimte achter de verdediging</li>
          <li><strong className="text-white">Wahbi Khazri</strong> — creatief, technisch sterk, gevaarlijk bij vrije trappen</li>
          <li><strong className="text-white">Hannibal Mejbri</strong> (Manchester United) — energiek middenvelder van de nieuwe generatie</li>
          <li><strong className="text-white">Montassar Talbi</strong> — solide verdediger, sterk in de lucht</li>
        </ul>
        <p>Tunesië speelt compact in een <strong className="text-white">4-4-2</strong> of 5-3-2. Ze staan diep, verdedigen hard en wachten op fouten. Als het toernooi voor hen toch mislukt, spelen ze vrij — en dat maakt een ploeg gevaarlijker, niet minder.</p>

        <h3 className="text-2xl font-black text-white">Analyse Nederland: klaar voor de knock-outfase?</h3>
        <p>Dit is Oranje's derde groepswedstrijd. De conditie is het grootste vraagteken — maar de kwaliteit is er. Op alle lijnen is Nederland beter dan Tunesië.</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Cody Gakpo</strong> — gevaarlijkste aanvaller van Oranje, in topvorm</li>
          <li><strong className="text-white">Xavi Simons</strong> — sleutelspeler in het aanvalsspel, onvoorspelbaar</li>
          <li><strong className="text-white">Tijjani Reijnders</strong> — motor op het middenveld</li>
          <li><strong className="text-white">Memphis Depay</strong> — kan invallen en direct het verschil maken</li>
          <li><strong className="text-white">Virgil van Dijk</strong> — defensieve leider, onmisbaar</li>
        </ul>
        <p>Als Koeman roteert, krijgen spelers als Donyell Malen en Joey Veerman hun kans. Zelfs een B-elftal van Nederland is te sterk voor Tunesië op papier. Maar voetbal wordt niet op papier gespeeld.</p>

        <h3 className="text-2xl font-black text-white">Waarom je toch wakker moet blijven.</h3>
        <p>Middernacht. Aftrap. Je denkt: dit wordt een makkelijke avond voor Oranje. Dat dacht iedereen ook van Japan in 2022 — voor Duitsland en Spanje. Tunesië speelt voor hun eigen overleving. Ze kunnen niets verliezen, want ze gaan toch naar huis. En dat maakt ze gevaarlijk.</p>
        <p>Eén moment van slordigheid, één goal van Tunesië — en de druk is opeens reëel. De groepsstand kan alles veranderen. Sla geen minuut over.</p>

        <h3 className="text-2xl font-black text-white">Onze voorspelling.</h3>
        <p>Als Koeman de basis opstelt: comfortabele zege voor Nederland. Als hij roteert: aanmerkelijk spannender. In beide gevallen gaat Oranje door.</p>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-white font-black mb-1">Onze verwachting: Tunesië 0 – 2 Nederland</p>
          <p className="text-sm">Oranje wint en eindigt als groepswinnaar in Groep F. Tunesië vecht tot het einde, maar het kwaliteitsverschil is te groot.</p>
        </div>

        <h3 className="text-2xl font-black text-white">Tunesië vs Nederland live kijken om middernacht.</h3>
        <p>Geen probleem. Via <strong className="text-white">IPTVTotaal</strong> kijk je dit duel live op elk apparaat — ook om 00:00 's nachts. HD-kwaliteit, 99,9% uptime. Geen buffering op het cruciale moment.</p>
        <p>Eén abonnement voor alle 104 WK 2026 wedstrijden — inclusief de halve finales, de finale en alle Oranje-duels. Vanaf €4,60 per maand of €78 eenmalig voor 15 maanden.</p>

        <WkCtaBlock match="Tunesië vs Nederland" />
      </div>
    ),
  },
  // ── WK 2026: Mexico vs Zuid-Afrika ───────────────────────────────────────
  {
    slug: 'mexico-zuid-afrika-wk-2026',
    publishDate: '2026-06-08',
    date: '8 juni 2026',
    readTime: '6 min',
    category: 'WK 2026',
    title: 'Mexico vs Zuid-Afrika WK 2026: openingswedstrijd in eigen land',
    excerpt: 'Het WK 2026 begint op donderdag 11 juni met Mexico vs Zuid-Afrika in Mexico-Stad. Analyse van de openingswedstrijd en hoe je hem live kijkt via IPTVTotaal.',
    image: '/mexico-zuid-afrika-wk-2026.jpg',
    headerCard: <WkMatchHeroCard team1="Mexico" team2="Zuid-Afrika" code1="MX" code2="ZA" matchDateISO="2026-06-11T18:00:00Z" kickoff="20:00 NL-tijd" venue="Mexico-Stad Stadion" group="Groep A" />,
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <div className="flex flex-wrap gap-2 mb-2">
          {['mexico wk 2026','wk 2026 openingswedstrijd','mexico south africa wk 2026','mexico vs zuidafrika','wk 2026 live stream','wk 2026 groep A','mexico wk opener'].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">{kw}</span>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[{label:'Datum',value:'Donderdag 11 juni 2026'},{label:'Aftrap',value:'20:00 (NL-tijd)'},{label:'Stadion',value:'Mexico-Stad Stadion, Mexico'}].map(i => (
            <div key={i.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{i.label}</div>
              <div className="text-white font-black text-sm">{i.value}</div>
            </div>
          ))}
        </div>

        <p>Het Wereldkampioenschap Voetbal 2026 trapt officieel af op <strong className="text-white">donderdag 11 juni</strong> met de openingswedstrijd: gastland Mexico ontvangt Zuid-Afrika in een bruisend Mexico-Stad. De druk op de Mexicanen is enorm — ze spelen thuis, voor hun eigen volk, bij het grootse voetbalfeest ter wereld.</p>

        <h3 className="text-2xl font-black text-white">Speelstijl en analyse Mexico</h3>
        <p>Mexico voetbalt als gastland met een passionele 4-3-3 of 4-2-3-1 en rekent op het thuisvoordeel van een van de luidste stadions ter wereld. El Tri is fysiek sterk, heeft snelheid op de flanken en is gevaarlijk bij standaardsituaties.</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Hirving "Chucky" Lozano</strong> — explosief linksbuiten, een van de gevaarlijkste spelers in CONCACAF</li>
          <li><strong className="text-white">Edson Álvarez</strong> — defensieve middenvelder van Ajax-roem, motor van het team</li>
          <li><strong className="text-white">Henry Martín</strong> — spits met veel WK-ervaring, sterk in de lucht</li>
        </ul>
        <p><strong className="text-white">Voordelen Mexico:</strong> Thuisvoordeel, passioneel publiek, WK-ervaring, snelheid op de vleugels, sterk bij set-pieces.</p>

        <h3 className="text-2xl font-black text-white">Speelstijl en analyse Zuid-Afrika</h3>
        <p>Zuid-Afrika kwalificeerde zich verrassend voor het WK en speelt een direct, fysiek spel met hoge pressing. Bafana Bafana is gevaarlijk als underdog — ze verliezen niet makkelijk en zijn snel in de omschakeling.</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Percy Tau</strong> — aanvoerder en meest creatieve speler, eerder bij Brighton</li>
          <li><strong className="text-white">Bongani Zungu</strong> — box-to-box middenvelder, sterk in duels</li>
          <li><strong className="text-white">Ronwen Williams</strong> — een van de beste keepers van het Afrikaanse continent</li>
        </ul>
        <p><strong className="text-white">Voordelen Zuid-Afrika:</strong> Niets te verliezen, compact verdedigend blok, gevaarlijk bij counter-aanvallen, sterke keeper.</p>

        <h3 className="text-2xl font-black text-white">Voorspelling</h3>
        <p>Mexico begint als topfavoriet, maar Zuid-Afrika is goed genoeg om te verrassen als de Mexicanen niet alert zijn. Toch wint Mexico vermoedelijk — gedragen door een ongelofelijke thuissfeer.</p>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-white font-black mb-1">Onze verwachting: Mexico 2 – 0 Zuid-Afrika</p>
          <p className="text-sm">Gastland opent het WK met een thuisoverwinning, tot grote vreugde van het Mexicaanse publiek.</p>
        </div>

        <h3 className="text-2xl font-black text-white">Mexico vs Zuid-Afrika live kijken</h3>
        <p>Mis de openingswedstrijd van het WK niet. Via <strong className="text-white">IPTVTotaal</strong> kijk je alle 104 WK 2026 duels live — inclusief de opener op 11 juni.</p>

        <WkCtaBlock match="Mexico vs Zuid-Afrika" />
      </div>
    ),
  },
  // ── WK 2026: USA vs Paraguay ─────────────────────────────────────────────
  {
    slug: 'usa-paraguay-wk-2026',
    publishDate: '2026-06-08',
    date: '8 juni 2026',
    readTime: '5 min',
    category: 'WK 2026',
    title: 'USA vs Paraguay WK 2026: USMNT debuut onder enorme thuisdruk',
    excerpt: 'Op vrijdag 12 juni maakt de VS zijn WK-debuut tegen Paraguay in Los Angeles. Analyse, sterspelers en hoe je dit duel live streamt met IPTVTotaal.',
    image: '/usa-paraguay-wk-2026.jpg',
    headerCard: <WkMatchHeroCard team1="USA" team2="Paraguay" code1="US" code2="PY" matchDateISO="2026-06-12T00:00:00Z" kickoff="02:00 NL-tijd" venue="Los Angeles Stadium, California" group="Groep D" />,
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <div className="flex flex-wrap gap-2 mb-2">
          {['usa paraguay wk 2026','usmnt wk 2026','usa wk 2026 live','usa paraguay live stream','wk 2026 groep D','paraguay wk 2026','wk 2026 live kijken'].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">{kw}</span>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[{label:'Datum',value:'Vrijdag 12 juni 2026'},{label:'Aftrap',value:'02:00 (NL-tijd)'},{label:'Stadion',value:'Los Angeles Stadium, California'}].map(i => (
            <div key={i.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{i.label}</div>
              <div className="text-white font-black text-sm">{i.value}</div>
            </div>
          ))}
        </div>

        <p>De Verenigde Staten spelen hun eerste WK-wedstrijd op eigen bodem — en de druk is enorm. Als mede-gastland verwacht het Amerikaanse publiek succes. In Los Angeles neemt de USMNT het op tegen Paraguay in Groep D. Dit is het moment waarop de VS moet laten zien dat ze bij de wereldtop horen.</p>

        <h3 className="text-2xl font-black text-white">Analyse USA</h3>
        <p>De nieuwe generatie Amerikanen is de beste ooit. Trainer Gregg Berhalter (of zijn opvolger) beschikt over een groep spelers die bij de beste clubs van Europa speelt. De VS voetbalt intensief, hoog pressing, en is fysiek indrukwekkend.</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Christian Pulisic</strong> — aanvoerder en toppresteerder bij AC Milan, technisch en direct</li>
          <li><strong className="text-white">Gio Reyna</strong> — creatieve spelmaker, sterk tussen de linies</li>
          <li><strong className="text-white">Weston McKennie</strong> — box-to-box kwaliteiten, bijt zich vast in duels</li>
          <li><strong className="text-white">Tyler Adams</strong> — defensieve middenvelder, motor en leider</li>
        </ul>
        <p><strong className="text-white">Voordelen USA:</strong> Thuisvoordeel, jonge topspelers bij Europese clubs, hoge intensiteit, sterk in pressing.</p>

        <h3 className="text-2xl font-black text-white">Analyse Paraguay</h3>
        <p>Paraguay is een hardvechtend team uit CONMEBOL — de sterkste kwalificatiegroep ter wereld. Ze zijn tactisch sterk, gevaarlijk bij stilstaande situaties en verliezen zelden makkelijk.</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Ramón Sosa</strong> — snelle buitenspeler, gevaarlijk in de omschakeling</li>
          <li><strong className="text-white">Miguel Almirón</strong> — energiek, doelgericht, Newcastle-vedette</li>
          <li><strong className="text-white">Gustavo Gómez</strong> — aanvoerder en robuuste verdediger</li>
        </ul>
        <p><strong className="text-white">Voordelen Paraguay:</strong> CONMEBOL-hardheid, tactische discipline, gevaarlijk bij counters, niets te verliezen.</p>

        <h3 className="text-2xl font-black text-white">Voorspelling</h3>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-white font-black mb-1">Onze verwachting: USA 2 – 1 Paraguay</p>
          <p className="text-sm">De VS wint met moeite, gedragen door het thuispubliek en de kwaliteit van Pulisic.</p>
        </div>

        <h3 className="text-2xl font-black text-white">USA vs Paraguay live kijken</h3>
        <p>Nachtelijk voetbal? Geen probleem. Via <strong className="text-white">IPTVTotaal</strong> kijk je dit duel live op elk apparaat — ook om 02:00 's nachts.</p>

        <WkCtaBlock match="USA vs Paraguay" />
      </div>
    ),
  },
  // ── WK 2026: Brazilië vs Marokko ─────────────────────────────────────────
  {
    slug: 'brazilie-marokko-wk-2026',
    publishDate: '2026-06-08',
    date: '8 juni 2026',
    readTime: '6 min',
    category: 'WK 2026',
    title: 'Brazilië vs Marokko WK 2026: de eerste grote kraker van het toernooi',
    excerpt: 'Zaterdag 13 juni botsen twee absolute topploegen in New York: Brazilië vs Marokko. Analyse, tactiek, sterspelers en live kijken via IPTVTotaal.',
    image: '/brazilie-marokko-wk-2026.jpg',
    headerCard: <WkMatchHeroCard team1="Brazilië" team2="Marokko" code1="BR" code2="MA" matchDateISO="2026-06-13T21:00:00Z" kickoff="23:00 NL-tijd" venue="New York/NJ Stadion" group="Groep C" />,
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <div className="flex flex-wrap gap-2 mb-2">
          {['brazilie marokko wk 2026','brazilié wk 2026','marokko wk 2026','brazilie wk live','marokko wk live','wk 2026 groep C','wk 2026 kraker live kijken'].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">{kw}</span>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[{label:'Datum',value:'Zaterdag 13 juni 2026'},{label:'Aftrap',value:'23:00 (NL-tijd)'},{label:'Stadion',value:'New York/New Jersey Stadion'}].map(i => (
            <div key={i.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{i.label}</div>
              <div className="text-white font-black text-sm">{i.value}</div>
            </div>
          ))}
        </div>

        <p>De eerste echte topper van het WK 2026: <strong className="text-white">Brazilië vs Marokko</strong> in New York. Vijf keer wereldkampioen tegen de beste Afrikaanse ploeg ter wereld. Dit duel trekt de aandacht van miljarden voetbalfans wereldwijd — en terecht.</p>

        <h3 className="text-2xl font-black text-white">Analyse Brazilië</h3>
        <p>La Seleção speelt aanvallend, creatief en met een ongelofelijk talent op alle posities. Brazilië gebruikt doorgaans een <strong className="text-white">4-2-3-1</strong> of 4-3-3 en heeft de meest gevreesde aanvalslinie van het toernooi.</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Vinícius Jr.</strong> — Real Madrid-ster, snelste man op het veld, dodelijk voor goal</li>
          <li><strong className="text-white">Rodrygo</strong> — direct, technisch en gevaarlijk vanuit elke positie</li>
          <li><strong className="text-white">Raphinha</strong> — sterk op de rechterflank, Barcelona's vaste keuze</li>
          <li><strong className="text-white">Casemiro / Guimarães</strong> — defensief middenveld van wereldklasse</li>
        </ul>
        <p><strong className="text-white">Voordelen Brazilië:</strong> Superieure individuele kwaliteit, samba-voetbal dat elke verdediging kan kraken, diepe selectie, WK-winnaarstraditie.</p>

        <h3 className="text-2xl font-black text-white">Analyse Marokko</h3>
        <p>Marokko verraste iedereen op het WK 2022 door de halve finale te bereiken. Ze spelen een extreem georganiseerde <strong className="text-white">4-1-4-1 of 5-4-1</strong>, zijn vrijwel onmogelijk te bespelen en hebben razendsnelle backs.</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Achraf Hakimi</strong> — PSG-back, een van de beste rechtsbacks ter wereld</li>
          <li><strong className="text-white">Hakim Ziyech</strong> — creatief genie, gevaarlijk bij stilstaande situaties</li>
          <li><strong className="text-white">Sofyan Amrabat</strong> — de beschermer voor de defensie, onvermoeibaar</li>
          <li><strong className="text-white">Yassine Bounou</strong> — keeper van wereldklasse</li>
        </ul>
        <p><strong className="text-white">Voordelen Marokko:</strong> De beste defensie van Afrika, collectieve kracht, WK-ervaring uit 2022, Hakimi als gevaar op de rechterflank.</p>

        <h3 className="text-2xl font-black text-white">Voorspelling</h3>
        <p>Dit is de match van de eerste week. Marokko gaat er alles aan doen om de aanvalslinie van Brazilië te stoppen. Maar de kwaliteit van Vinícius en Rodrygo is uiteindelijk te veel.</p>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-white font-black mb-1">Onze verwachting: Brazilië 2 – 0 Marokko</p>
          <p className="text-sm">Brazilië wint, maar Marokko laat zien dat ze bij de absolute top horen.</p>
        </div>

        <h3 className="text-2xl font-black text-white">Brazilië vs Marokko live kijken</h3>
        <p>Dit is een van de meest verwachte duels van het WK. Mis het niet — kijk live via <strong className="text-white">IPTVTotaal</strong> in HD op elk apparaat.</p>

        <WkCtaBlock match="Brazilië vs Marokko" />
      </div>
    ),
  },
  // ── WK 2026: Saudi-Arabië vs Uruguay ─────────────────────────────────────
  {
    slug: 'saudi-arabie-uruguay-wk-2026',
    publishDate: '2026-06-08',
    date: '8 juni 2026',
    readTime: '5 min',
    category: 'WK 2026',
    title: 'Saudi-Arabië vs Uruguay WK 2026: tactisch duel in Miami',
    excerpt: 'Maandag 15 juni staat Saudi-Arabië vs Uruguay op het programma in Groep H. Analyse van dit strategische duel en live kijken via IPTVTotaal vanaf €78.',
    image: '/saudi-arabie-uruguay-wk-2026.jpg',
    headerCard: <WkMatchHeroCard team1="Saudi-Arabië" team2="Uruguay" code1="SA" code2="UY" matchDateISO="2026-06-15T21:00:00Z" kickoff="23:00 NL-tijd" venue="Miami Stadion, Florida" group="Groep H" />,
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <div className="flex flex-wrap gap-2 mb-2">
          {['saudi arabie uruguay wk 2026','uruguay wk 2026','saudi arabie wk 2026','uruguay live wk','wk 2026 groep H','wk 2026 live stream','uruguay wk livestream'].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">{kw}</span>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[{label:'Datum',value:'Maandag 15 juni 2026'},{label:'Aftrap',value:'23:00 (NL-tijd)'},{label:'Stadion',value:'Miami Stadion, Florida'}].map(i => (
            <div key={i.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{i.label}</div>
              <div className="text-white font-black text-sm">{i.value}</div>
            </div>
          ))}
        </div>

        <p>Een van de meest intrigerende duels van de eerste week: <strong className="text-white">Saudi-Arabië vs Uruguay</strong> in Miami. Saudi-Arabië versloeg in 2022 Argentinië in een van de grootste WK-verrassingen ooit. Uruguay is een van de meest gevreesde pressing-teams ter wereld. Dit tactische gevecht wordt spannender dan het lijkt.</p>

        <h3 className="text-2xl font-black text-white">Analyse Saudi-Arabië</h3>
        <p>Saudi-Arabië speelt fysiek en georganiseerd, met een hoog pressing en snel omschakelen. Ze staan tactisch goed en zijn gevaarlijk bij set-pieces. De Saoedische Pro League heeft de selectie versterkt met meer Europese ervaring.</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Salem Al-Dawsari</strong> — technisch vedette, schoot Argentinië het WK uit in 2022</li>
          <li><strong className="text-white">Mohammed Al-Owais</strong> — internationale keeper met sterke reflexen</li>
          <li><strong className="text-white">Saleh Al-Shehri</strong> — spits, snel en gevaarlijk in de diepte</li>
        </ul>
        <p><strong className="text-white">Voordelen Saudi-Arabië:</strong> WK-verrassing reputatie, goed georganiseerd, gevaarlijk bij set-pieces, sterke teamspirit.</p>

        <h3 className="text-2xl font-black text-white">Analyse Uruguay</h3>
        <p>Uruguay is ondanks zijn kleine omvang altijd een van de gevaarlijkste landen op een WK. Ze voetballen hard, tactisch intelligent en met een ongelofelijke mentaliteit. Hoog pressing, snel en dominant middenveld.</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Federico Valverde</strong> — Real Madrid-dynamo, een van de beste middenvelders ter wereld</li>
          <li><strong className="text-white">Darwin Núñez</strong> — Liverpool-spits, explosief en ongrijpbaar voor verdedigers</li>
          <li><strong className="text-white">Rodrigo Bentancur</strong> — slim, snel en gevaarlijk op het middenveld</li>
          <li><strong className="text-white">José María Giménez</strong> — sterk in de lucht, leider achterin</li>
        </ul>
        <p><strong className="text-white">Voordelen Uruguay:</strong> Pressing van wereldklasse, Valverde als absolute topper, mentaliteit, WK-ervaring.</p>

        <h3 className="text-2xl font-black text-white">Voorspelling</h3>
        <p>Uruguay is de favoriet maar Saudi-Arabië heeft aangetoond verrassingen te kunnen realiseren. Valverde en Núñez zullen echter het verschil maken.</p>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-white font-black mb-1">Onze verwachting: Saudi-Arabië 0 – 2 Uruguay</p>
          <p className="text-sm">Uruguay wint via hun pressing en de kwaliteit van Valverde en Núñez.</p>
        </div>

        <h3 className="text-2xl font-black text-white">Saudi-Arabië vs Uruguay live kijken</h3>
        <p>Volg dit tactische WK-duel live via <strong className="text-white">IPTVTotaal</strong> — alle 104 WK 2026 wedstrijden in HD, zonder buffering.</p>

        <WkCtaBlock match="Saudi-Arabië vs Uruguay" />
      </div>
    ),
  },
  // ── Post A — internet protocol tv providers ──────────────────────────────
  {
    slug: 'internet-protocol-tv-providers',
    publishDate: '2026-06-07',
    date: '7 juni 2026',
    readTime: '5 min',
    category: 'Vergelijking',
    title: 'Internet Protocol TV providers in Nederland: welke is het beste? (2026)',
    excerpt: 'Er zijn tientallen IPTV-providers in Nederland. De meeste beloven hetzelfde. We leggen uit waar je op let en waarom de keuze makkelijker is dan je denkt.',
    image: '/internet-protocol-tv-providers.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">

        <div className="flex flex-wrap gap-2 mb-2">
          {[
            'internet protocol tv providers','iptv providers nederland','iptv aanbieder nederland',
            'beste iptv provider','iptv vergelijken','iptv abonnement nederland',
          ].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">
              {kw}
            </span>
          ))}
        </div>

        <p>Je zoekt een IPTV-provider. Je vindt er dertig. Ze beloven allemaal hetzelfde.</p>
        <p>Wij leggen uit wat het verschil is — en wat er écht toe doet.</p>

        <h3 className="text-2xl font-black text-white">Wat is een internet protocol tv provider?</h3>
        <p>Een IPTV-provider levert live tv-zenders via het internet. Geen kabel. Geen schotelantenne. Gewoon je internetverbinding.</p>
        <p>Je kijkt via een app op je Smart TV, telefoon, tablet of laptop. De provider beheert de servers, de zenderlijst en de kwaliteit van de stream.</p>

        <h3 className="text-2xl font-black text-white">Waar let je op bij het kiezen?</h3>
        <p>Er zijn honderden aanbieders. De meeste zijn het niet waard. Dit zijn de vier punten die het verschil maken.</p>

        <div className="space-y-4">
          <div className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <span className="text-amber-400 font-black text-xl leading-none mt-0.5">1</span>
            <div>
              <p className="font-black text-white">Uptime.</p>
              <p className="text-sm">Een stream die wegvalt tijdens de 89e minuut is geen stream. Kies een provider met minimaal 99% uptime — liever 99,9%.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <span className="text-amber-400 font-black text-xl leading-none mt-0.5">2</span>
            <div>
              <p className="font-black text-white">Actieve zenderlijst.</p>
              <p className="text-sm">80.000 zenders betekent niks als de helft niet werkt. Vraag altijd om een proefperiode voor je betaalt.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <span className="text-amber-400 font-black text-xl leading-none mt-0.5">3</span>
            <div>
              <p className="font-black text-white">Bereikbare support.</p>
              <p className="text-sm">Als er iets misgaat, wil je snel geholpen worden. Geen ticketsysteem. Geen formulier. Gewoon iemand die antwoordt.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <span className="text-amber-400 font-black text-xl leading-none mt-0.5">4</span>
            <div>
              <p className="font-black text-white">Geld-terug garantie.</p>
              <p className="text-sm">Een provider die achter zijn product staat, geeft je de ruimte om het te testen. Geen garantie? Niet doen.</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-black text-white">Wat biedt IPTVTotaal?</h3>
        <p>IPTVTotaal is een Nederlandse IPTV-provider. Geen anonieme website, maar een dienst met echte support.</p>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Zenders', value: '80.000+' },
            { label: 'Uptime', value: '99,9%' },
            { label: 'Prijs', value: 'v.a. €4,60/mnd' },
          ].map(item => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{item.label}</div>
              <div className="text-white font-black">{item.value}</div>
            </div>
          ))}
        </div>

        <p>80.000+ actieve zenders — ESPN, Ziggo Sport, beIN Sports en honderden internationale kanalen allemaal inbegrepen. Geen losse sportabonnementen.</p>
        <p>24/7 support via WhatsApp. Gemiddelde reactietijd: minder dan 5 minuten. En 15 dagen geld-terug als het toch niet bevalt.</p>

        <h3 className="text-2xl font-black text-white">Welke zenders zitten erin?</h3>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Nederland:</strong> NPO 1/2/3, RTL 4/5/7, SBS6, Veronica en meer</li>
          <li><strong className="text-white">Sport:</strong> ESPN, Ziggo Sport, beIN Sports, DAZN — 50+ sportzenders</li>
          <li><strong className="text-white">Internationaal:</strong> Marokkaans, Turks, Arabisch, Engelstalig</li>
          <li><strong className="text-white">VOD:</strong> films en series on demand inbegrepen</li>
        </ul>

        <a href="/blog/iptv-kopen" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Meer weten</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">IPTV kopen in Nederland: waar let je op? →</span>
          </div>
        </a>

        <h3 className="text-2xl font-black text-white">Veelgestelde vragen.</h3>
        <div className="space-y-4">
          <div>
            <p className="font-black text-white">Welke IPTV-provider is het meest betrouwbaar in Nederland?</p>
            <p>IPTVTotaal scoort hoog op uptime (99,9%), zenderaanbod (80.000+) en bereikbaarheid (24/7 WhatsApp). Vraag een proefperiode aan voor je beslist.</p>
          </div>
          <div>
            <p className="font-black text-white">Wat kost een IPTV-abonnement in Nederland?</p>
            <p>Abonnementen beginnen bij €4,60 per maand bij IPTVTotaal. Jaarabonnementen zijn nog voordeliger. Geen verborgen kosten.</p>
          </div>
          <div>
            <p className="font-black text-white">Heb ik een speciale decoder nodig?</p>
            <p>Nee. Je gebruikt je bestaande Smart TV, telefoon of tablet. Geen extra apparatuur.</p>
          </div>
        </div>

        <p>Wil je weten welk pakket het beste bij jou past? Stuur ons een berichtje via WhatsApp. We helpen je binnen 5 minuten verder.</p>
      </div>
    ),
  },
  // ── Post B — wat is iptv ─────────────────────────────────────────────────
  {
    slug: 'wat-is-iptv',
    publishDate: '2026-06-07',
    date: '7 juni 2026',
    readTime: '4 min',
    category: 'Advies',
    title: 'Wat is IPTV? Uitleg in gewone taal (2026)',
    excerpt: 'IPTV staat voor Internet Protocol Television. Maar wat betekent dat in de praktijk? We leggen het uit zonder technische termen — gewoon duidelijk.',
    image: '/wat-is-iptv.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">

        <div className="flex flex-wrap gap-2 mb-2">
          {[
            'wat is iptv','wat is iptv en hoe werkt het','iptv uitleg',
            'iptv betekenis','internet protocol television','iptv nederland',
          ].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">
              {kw}
            </span>
          ))}
        </div>

        <p>Je buurman heeft 80.000 zenders. Jij betaalt €50 per maand voor 60 kanalen via de kabel.</p>
        <p>De kans is groot dat hij IPTV gebruikt.</p>

        <h3 className="text-2xl font-black text-white">IPTV: de korte uitleg.</h3>
        <p>IPTV staat voor <strong className="text-white">Internet Protocol Television</strong>. Live tv via het internet, in plaats van via een kabel of schotelantenne.</p>
        <p>Je kijkt dezelfde zenders — ESPN, NPO 1, RTL 4 — maar de beelden komen binnen via je wifi of ethernetkabel. Niet via een coaxkabel in de muur.</p>

        <h3 className="text-2xl font-black text-white">Wat is het verschil met gewone tv?</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-6 text-white/30 font-bold uppercase tracking-widest text-xs">Onderdeel</th>
                <th className="text-left py-3 pr-6 text-white font-black">Kabel / Satelliet</th>
                <th className="text-left py-3 text-amber-400 font-black">IPTV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                ['Verbinding', 'Coaxkabel / schotel', 'Je internetverbinding'],
                ['Decoder', 'Verplicht', 'Niet nodig'],
                ['Apparaten', 'Alleen de tv', 'TV, telefoon, tablet, laptop'],
                ['Zenders', '30–100', '80.000+'],
                ['Prijs', '€20–50/mnd', 'v.a. €4,60/mnd'],
                ['Contract', 'Ja', 'Nee'],
              ].map(([label, kabel, iptv]) => (
                <tr key={label}>
                  <td className="py-3 pr-6 text-white/40">{label}</td>
                  <td className="py-3 pr-6 text-white/70">{kabel}</td>
                  <td className="py-3 text-white font-bold">{iptv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-black text-white">Wat kan je kijken?</h3>
        <p>Alles. Echt alles.</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Live tv</strong> — alle Nederlandse en internationale zenders</li>
          <li><strong className="text-white">Live sport</strong> — Eredivisie, Formule 1, Champions League, WK</li>
          <li><strong className="text-white">Nieuws</strong> — BBC, CNN, Al Jazeera</li>
          <li><strong className="text-white">Internationale zenders</strong> — Marokkaans, Turks, Arabisch en meer</li>
          <li><strong className="text-white">VOD</strong> — films en series on demand</li>
        </ul>
        <p>IPTVTotaal biedt 80.000+ live zenders. Dat betekent gewoon dat je nooit meer hoeft te zoeken naar een kanaal dat er niet bij zit.</p>

        <h3 className="text-2xl font-black text-white">Wat heb je nodig?</h3>
        <p>Drie dingen:</p>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li>Een <strong className="text-white">internetverbinding</strong> — minimaal 15 Mbps voor HD</li>
          <li>Een <strong className="text-white">apparaat</strong> — Smart TV, telefoon, tablet of laptop</li>
          <li>Een <strong className="text-white">IPTV-abonnement</strong> — vanaf €4,60 per maand bij IPTVTotaal</li>
        </ol>
        <p>Geen decoder. Geen monteur die langs moet komen. Geen contract.</p>

        <a href="/blog/hoe-werkt-iptv" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Techniek</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">Hoe werkt IPTV technisch? De uitleg →</span>
          </div>
        </a>

        <h3 className="text-2xl font-black text-white">Veelgestelde vragen.</h3>
        <div className="space-y-4">
          <div>
            <p className="font-black text-white">Is IPTV legaal in Nederland?</p>
            <p>De technologie zelf — tv kijken via internet — is volledig legaal. Het hangt af van de aanbieder en de inhoud. IPTVTotaal is een legale dienst.</p>
          </div>
          <div>
            <p className="font-black text-white">Hoe goed is de beeldkwaliteit?</p>
            <p>Met een goede internetverbinding kijk je in HD of 4K. Minimaal 15 Mbps voor HD, 25 Mbps voor 4K.</p>
          </div>
          <div>
            <p className="font-black text-white">Werkt IPTV op mijn Smart TV?</p>
            <p>Ja. Samsung, LG, Android TV — allemaal ondersteund. Ook op telefoon, tablet en laptop.</p>
          </div>
        </div>

        <p>Meer weten of direct beginnen? Stuur ons een berichtje via WhatsApp. Je bent binnen 5 minuten live.</p>
      </div>
    ),
  },
  // ── Post C — ss iptv / iptv ss ──────────────────────────────────────────
  {
    slug: 'ss-iptv',
    publishDate: '2026-06-08',
    date: '8 juni 2026',
    readTime: '4 min',
    category: 'Handleiding',
    title: 'SS IPTV: wat is het en hoe installeer je het op je Smart TV? (2026)',
    excerpt: 'SS IPTV is de meest gebruikte IPTV-app voor LG Smart TV. We leggen uit hoe je het installeert en verbindt met een IPTVTotaal-abonnement — stap voor stap.',
    image: '/ss-iptv.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">

        <div className="flex flex-wrap gap-2 mb-2">
          {[
            'ss iptv','iptv ss','ss iptv app','ss iptv lg',
            'ss iptv installeren','ss iptv m3u','ss iptv samsung',
          ].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">
              {kw}
            </span>
          ))}
        </div>

        <p>Je hebt een LG Smart TV. Je wil IPTV op het grote scherm. Je googelt — en overal kom je SS IPTV tegen.</p>
        <p>Logisch. Het is de beste keuze voor LG.</p>

        <h3 className="text-2xl font-black text-white">Wat is SS IPTV?</h3>
        <p>SS IPTV is een gratis IPTV-speler voor Smart TV's. Je laadt er een M3U-afspeellijst in, en de app toont alle zenders netjes georganiseerd met programmagids.</p>
        <p>De app heeft zelf geen zenders. Je hebt een IPTV-abonnement nodig — zoals IPTVTotaal — om inhoud te laden. SS IPTV is gewoon de speler.</p>

        <h3 className="text-2xl font-black text-white">Op welke apparaten werkt SS IPTV?</h3>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">LG Smart TV</strong> — via de LG Content Store (meest gebruikt)</li>
          <li><strong className="text-white">Samsung Smart TV</strong> — via de Samsung Smart Hub</li>
          <li><strong className="text-white">Android TV</strong> — via de Google Play Store</li>
        </ul>
        <p>Op LG werkt SS IPTV het soepelst. Op Samsung is Smart IPTV een goed alternatief.</p>

        <h3 className="text-2xl font-black text-white">Hoe installeer je SS IPTV op je LG tv?</h3>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li>Ga naar de <strong className="text-white">LG Content Store</strong> op je tv</li>
          <li>Zoek naar <em>SS IPTV</em></li>
          <li>Download en installeer de app</li>
          <li>Open de app en kies <em>"Afspeellijst toevoegen"</em></li>
          <li>Voer je M3U-link in</li>
          <li>Alle zenders laden automatisch in</li>
        </ol>
        <p>Klaar. Het duurt minder dan 5 minuten.</p>

        <h3 className="text-2xl font-black text-white">Hoe verbind je SS IPTV met IPTVTotaal?</h3>
        <p>Na activering ontvang je van IPTVTotaal je inloggegevens per WhatsApp — je M3U-link of Xtream Codes.</p>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li>Open SS IPTV op je tv</li>
          <li>Kies <em>"Remote playlist"</em> of <em>"M3U URL"</em></li>
          <li>Plak de M3U-link die je van ons ontvangen hebt</li>
          <li>Bevestig — de zenderlijst laadt automatisch in</li>
        </ol>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Zenders', value: '80.000+' },
            { label: 'Setup', value: '< 5 minuten' },
            { label: 'Prijs', value: 'v.a. €4,60/mnd' },
          ].map(item => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{item.label}</div>
              <div className="text-white font-black">{item.value}</div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-black text-white">SS IPTV vs andere apps.</h3>
        <p>Eerlijk gezegd: voor LG Smart TV is SS IPTV de beste keuze. De interface is schoon, de EPG werkt goed en de app is stabiel.</p>
        <p>Op Android TV of Firestick kies je beter voor <strong className="text-white">TiviMate</strong>. Weet je niet zeker wat het beste is voor jouw apparaat? We helpen je via WhatsApp.</p>

        <a href="/blog/iptvtotaal-app" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Alle apps</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">Welke IPTV-app werkt het beste op jouw apparaat? →</span>
          </div>
        </a>

        <h3 className="text-2xl font-black text-white">Veelgestelde vragen.</h3>
        <div className="space-y-4">
          <div>
            <p className="font-black text-white">Is SS IPTV gratis?</p>
            <p>Ja. De app zelf is gratis te downloaden. Je hebt wel een actief IPTVTotaal-abonnement nodig om zenders te laden.</p>
          </div>
          <div>
            <p className="font-black text-white">Werkt SS IPTV op oudere LG tv's?</p>
            <p>Ja, SS IPTV werkt op de meeste LG Smart TV's. Kom je er niet uit? Stuur ons een berichtje en we kijken gratis mee.</p>
          </div>
          <div>
            <p className="font-black text-white">Hoe krijg ik mijn M3U-link?</p>
            <p>Na activering van je IPTVTotaal-abonnement ontvang je de M3U-link per WhatsApp. Je voert hem eenmalig in de app in.</p>
          </div>
        </div>

        <p>Hulp bij de installatie? Stuur ons een berichtje via WhatsApp. We helpen je stap voor stap — gratis.</p>
      </div>
    ),
  },
  // ── Post D — hoe werkt iptv ──────────────────────────────────────────────
  {
    slug: 'hoe-werkt-iptv',
    publishDate: '2026-06-08',
    date: '8 juni 2026',
    readTime: '4 min',
    category: 'Techniek',
    title: 'Hoe werkt IPTV? De technologie achter live tv via internet uitgelegd',
    excerpt: 'IPTV stuurt tv-signalen via internet in plaats van via kabel of antenne. We leggen precies uit hoe dat werkt — en wat je nodig hebt om het te gebruiken.',
    image: '/hoe-werkt-iptv.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">

        <div className="flex flex-wrap gap-2 mb-2">
          {[
            'hoe werkt iptv','iptv technologie','m3u link uitleg',
            'xtream codes uitleg','iptv streaming','iptv protocol',
          ].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">
              {kw}
            </span>
          ))}
        </div>

        <p>Je weet dat IPTV via internet werkt. Maar wat gebeurt er precies als je op een zender drukt?</p>
        <p>Korte uitleg. Geen technisch jargon.</p>

        <h3 className="text-2xl font-black text-white">Het basisprincipe.</h3>
        <p>Bij kabel-tv stuurt een provider een continu signaal via een fysieke kabel naar jouw huis. Je ontvangt alle zenders tegelijk — of je ze kijkt of niet.</p>
        <p>Bij IPTV werkt het anders. Jij vraagt een zender op. De server stuurt dan alleen die stream naar jouw apparaat. Via het internet. Efficiënter, flexibeler, goedkoper.</p>

        <h3 className="text-2xl font-black text-white">Wat is een M3U-link?</h3>
        <p>Een M3U-link is een tekstbestand met daarin de adressen van alle beschikbare zenders. Jij voert die link eenmalig in je IPTV-app in.</p>
        <p>De app leest het bestand uit, laadt de zenderlijst in en laat je kiezen wat je wil kijken. Dat is alles.</p>
        <p>Na activering sturen wij jouw persoonlijke M3U-link per WhatsApp toe. Je hoeft hem maar één keer in te voeren.</p>

        <h3 className="text-2xl font-black text-white">Wat zijn Xtream Codes?</h3>
        <p>Xtream Codes is een alternatief voor een M3U-link. In plaats van een URL voer je een serveradres, gebruikersnaam en wachtwoord in.</p>
        <p>Beide methodes werken even goed. Welke je gebruikt hangt af van de app op jouw apparaat. We sturen je altijd beide opties toe.</p>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Zenders', value: '80.000+' },
            { label: 'Kwaliteit', value: 'HD & 4K' },
            { label: 'Internetsnelheid HD', value: '15 Mbps' },
          ].map(item => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{item.label}</div>
              <div className="text-white font-black">{item.value}</div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-black text-white">Welke internetsnelheid heb je nodig?</h3>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">SD (standaard definitie):</strong> 5 Mbps</li>
          <li><strong className="text-white">HD (1080p):</strong> 15 Mbps</li>
          <li><strong className="text-white">4K UHD:</strong> 25 Mbps</li>
        </ul>
        <p>De meeste Nederlandse internetabonnementen halen dat ruimschoots. Twijfel je? Check het via fast.com.</p>

        <h3 className="text-2xl font-black text-white">Wat is de EPG?</h3>
        <p>EPG staat voor Electronic Programme Guide — de programmagids. Je ziet precies wat er nu en later speelt op elk kanaal.</p>
        <p>IPTVTotaal levert de EPG automatisch mee. Geen handmatige configuratie nodig. Je opent de app en de gids staat er al in.</p>

        <a href="/blog/wat-is-iptv" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Nieuw bij IPTV?</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">Wat is IPTV? De uitleg in gewone taal →</span>
          </div>
        </a>

        <h3 className="text-2xl font-black text-white">Veelgestelde vragen.</h3>
        <div className="space-y-4">
          <div>
            <p className="font-black text-white">Werkt IPTV ook via wifi?</p>
            <p>Ja. Wifi is voor de meeste gebruikers prima. Voor 4K of live sport raden we een ethernetkabel aan — dat geeft een stabielere verbinding.</p>
          </div>
          <div>
            <p className="font-black text-white">Wat als mijn stream buffert?</p>
            <p>Meestal is het de internetverbinding. Check je snelheid via fast.com. Zit je boven de 15 Mbps maar blijft het hangen? Stuur ons een bericht — we kijken gratis mee.</p>
          </div>
          <div>
            <p className="font-black text-white">Kan ik IPTV op meerdere apparaten tegelijk gebruiken?</p>
            <p>Ja, afhankelijk van je pakket. Met IPTVTotaal kijk je op 1 of meerdere schermen tegelijk — Smart TV, telefoon, tablet, laptop.</p>
          </div>
        </div>

        <p>Vragen over de techniek of de setup? Stuur ons een berichtje via WhatsApp. We helpen je binnen 5 minuten verder.</p>
      </div>
    ),
  },
  {
    slug: 'eredivisie-kijken',
    publishDate: '2026-06-06',
    date: '6 juni 2026',
    readTime: '4 min',
    category: 'Sport',
    title: 'Eredivisie Kijken Zonder Duur Abonnement: zo doe je het (2026)',
    excerpt: 'Eredivisie kijken hoeft niet duur te zijn. Geen losse ESPN-abonnement nodig. We leggen uit hoe je alle wedstrijden live volgt via IPTV — op elk apparaat.',
    image: '/eredivisie-kijken.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">

        <div className="flex flex-wrap gap-2 mb-2">
          {[
            'eredivisie kijken','eredivisie kijken gratis','eredivisie live kijken',
            'eredivisie kijken zonder tv abonnement','eredivisie stream','eredivisie kijken online',
          ].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">
              {kw}
            </span>
          ))}
        </div>

        <p>Vroeger zette je de tv aan en keek je gewoon. Nu moet je uitzoeken of de wedstrijd op ESPN staat of Ziggo Sport. En dan nog betalen ook.</p>
        <p>Het hoeft niet zo ingewikkeld te zijn.</p>

        <h3 className="text-2xl font-black text-white">Het probleem: te veel losse abonnementen.</h3>
        <p>ESPN heeft de meeste Eredivisie-wedstrijden. Ziggo Sport heeft de rest. Samen kost dat al snel €20+ per maand — bovenop je normale tv-abonnement.</p>
        <p>Tel daar een streamingdienst bij op en je betaalt voor drie dingen die je apart moest afsluiten.</p>

        <h3 className="text-2xl font-black text-white">De slimmere oplossing: één pakket voor alles.</h3>
        <p>Via IPTVTotaal krijg je ESPN, Ziggo Sport en 50+ andere sportzenders in één abonnement. Vanaf €4,60 per maand.</p>
        <p>Geen losse abonnementen. Geen contract. Geen gedoe.</p>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Prijs', value: 'v.a. €4,60/mnd' },
            { label: 'Sportzenders', value: '50+' },
            { label: 'Apparaten', value: 'TV, telefoon, tablet' },
          ].map(item => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{item.label}</div>
              <div className="text-white font-black">{item.value}</div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-black text-white">Welke Eredivisie-zenders zitten erin?</h3>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">ESPN 1/2/3/4</strong> — alle speelronden live</li>
          <li><strong className="text-white">Ziggo Sport</strong> — exclusieve duels en KNVB Beker</li>
          <li><strong className="text-white">Ziggo Sport Select</strong> — Champions League voor Nederlandse clubs</li>
        </ul>
        <p>Alle wedstrijden. Geen wegvallende streams. 99,9% uptime gegarandeerd.</p>

        <h3 className="text-2xl font-black text-white">Op welke apparaten kijk je?</h3>
        <p>Elk apparaat dat je al hebt: Samsung of LG Smart TV, Android, iPhone, laptop, Firestick.</p>
        <p>Je kijkt thuis op de grote tv — en onderweg op je telefoon. Tegelijk, als je wil.</p>

        <a href="/blog/iptv-live-sport-kijken" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Meer sport</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">Formule 1, Champions League en meer via IPTVTotaal →</span>
          </div>
        </a>

        <h3 className="text-2xl font-black text-white">Veelgestelde vragen.</h3>
        <div className="space-y-4">
          <div>
            <p className="font-black text-white">Kan ik de Eredivisie live kijken zonder tv-abonnement?</p>
            <p>Ja. IPTVTotaal werkt via internet — geen tv-abonnement of kabel nodig. Alleen een actieve internetverbinding.</p>
          </div>
          <div>
            <p className="font-black text-white">Werkt het ook op mijn Smart TV?</p>
            <p>Ja. Samsung, LG, Android TV — allemaal ondersteund. We helpen je gratis met de installatie.</p>
          </div>
          <div>
            <p className="font-black text-white">Zitten alle speelronden erin?</p>
            <p>Ja. Alle Eredivisie-wedstrijden die op ESPN en Ziggo Sport worden uitgezonden, zijn beschikbaar.</p>
          </div>
        </div>

        <p>Wil je de Eredivisie kijken zonder duur abonnement? Stuur ons een berichtje via WhatsApp. Je bent binnen 5 minuten live.</p>
      </div>
    ),
  },
  {
    slug: 'stand-wk-2026',
    publishDate: '2026-06-06',
    date: '6 juni 2026',
    readTime: '4 min',
    category: 'Sport',
    title: 'Stand WK 2026: groepen, speelschema & resultaten live volgen',
    excerpt: 'Het WK 2026 begint op 11 juni. Volg de stand van alle 12 groepen, het volledige speelschema en kijk elke wedstrijd live via IPTVTotaal.',
    image: '/stand-wk-2026.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">

        <div className="flex flex-wrap gap-2 mb-2">
          {[
            'stand wk 2026','stand wereldkampioenschap voetbal 2026',
            'wk 2026 groepen','wk 2026 speelschema','wereldkampioenschap voetbal 2026 speelschema',
            'wk 2026 uitslagen','wk 2026 nederland stand',
          ].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">
              {kw}
            </span>
          ))}
        </div>

        <p>Het WK is begonnen. Je wil weten hoe Nederland er voor staat. Wanneer is de volgende wedstrijd — en wie moeten we verslaan om door te gaan?</p>
        <p>Alles wat je moet weten, op één plek.</p>

        <h3 className="text-2xl font-black text-white">WK 2026 in het kort.</h3>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Start', value: '11 juni 2026' },
            { label: 'Wedstrijden', value: '104 in totaal' },
            { label: 'Landen', value: 'VS, Canada, Mexico' },
          ].map(item => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{item.label}</div>
              <div className="text-white font-black">{item.value}</div>
            </div>
          ))}
        </div>

        <p>48 landen. 12 groepen. De grootste editie in de geschiedenis van het WK voetbal.</p>
        <p>Nederland zit in Groep G en opent het toernooi op 12 juni.</p>

        <h3 className="text-2xl font-black text-white">Het speelschema: wat moet je weten?</h3>
        <p>De groepsfase loopt van 11 juni tot 2 juli. Elke groep speelt drie rondes — daarna gaan de beste twee teams door.</p>
        <p>De achtste finales beginnen op 5 juli. De finale is op 19 juli in New York.</p>
        <p>Het volledige WK 2026 speelschema vind je op de officiële FIFA-website: <a href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline font-bold">fifa.com</a>.</p>

        <h3 className="text-2xl font-black text-white">Waar volg je de stand live?</h3>
        <p>Voor live standen, uitslagen en statistieken kun je terecht op:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><a href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">FIFA.com</a> — officiële standen en uitslagen</li>
          <li><a href="https://www.espn.nl/voetbal" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">ESPN.nl</a> — live scores en statistieken</li>
          <li><a href="https://www.onsoranje.nl" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">OnsOranje.nl</a> — alles over het Nederlands elftal</li>
        </ul>

        <h3 className="text-2xl font-black text-white">Alle 104 WK-wedstrijden live kijken.</h3>
        <p>Via IPTVTotaal kijk je elk WK-duel live — van de openingswedstrijd tot de finale.</p>
        <p>Geen losse abonnementen voor sport. Alle sportzenders zitten in één pakket. Vanaf €4,60 per maand.</p>

        <a href="/wereldkampioenschap-voetbal-2026" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">WK 2026</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">Alles over WK 2026 kijken via IPTVTotaal →</span>
          </div>
        </a>

        <p>Vragen over het WK kijken? Stuur ons een berichtje via WhatsApp. We helpen je binnen 5 minuten verder.</p>
      </div>
    ),
  },
  {
    slug: 'iptv-dark',
    publishDate: '2026-06-05',
    date: '5 juni 2026',
    readTime: '4 min',
    category: 'Handleiding',
    title: 'IPTV Dark: wat is het en hoe installeer je het? (2026)',
    excerpt: 'IPTV Dark is een populaire IPTV-app voor Android. We leggen uit wat het doet, hoe je het installeert en hoe je het combineert met een IPTVTotaal abonnement.',
    image: '/iptv-dark.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">

        <div className="flex flex-wrap gap-2 mb-2">
          {[
            'iptv dark','iptv dark app','iptv dark download',
            'iptv dark android','iptv dark apk','iptv dark installeren',
          ].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">
              {kw}
            </span>
          ))}
        </div>

        <p>Je zoekt een IPTV-app. Overal duikt de naam IPTV Dark op. Maar wat is het precies — een app, een dienst, of iets anders?</p>
        <p>Korte uitleg. Dan meteen hoe je ermee aan de slag gaat.</p>

        <h3 className="text-2xl font-black text-white">Wat is IPTV Dark?</h3>
        <p>IPTV Dark is een mediaspeler-app voor Android. Je gebruikt hem om live tv-zenders te streamen via een M3U-link of Xtream Codes.</p>
        <p>De app zelf heeft geen eigen zenders. Je hebt een IPTV-abonnement nodig — zoals IPTVTotaal — om inhoud te laden. De app is gewoon de speler.</p>

        <h3 className="text-2xl font-black text-white">Hoe installeer je IPTV Dark?</h3>
        <p>IPTV Dark is beschikbaar als APK voor Android. Zo installeer je het:</p>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li>Ga naar de instellingen van je Android-apparaat</li>
          <li>Zet <strong className="text-white">"Installatie van onbekende bronnen"</strong> aan</li>
          <li>Download de IPTV Dark APK via de officiële website of betrouwbare bron</li>
          <li>Open het gedownloade bestand en installeer de app</li>
          <li>Start de app en voer je M3U-link of Xtream Codes in</li>
        </ol>
        <p>Op een Firestick werkt het op dezelfde manier via de Downloader-app.</p>

        <h3 className="text-2xl font-black text-white">Hoe verbind je IPTV Dark met IPTVTotaal?</h3>
        <p>Na activering ontvang je van IPTVTotaal je M3U-link of Xtream Codes per WhatsApp. Die voer je eenmalig in de app in.</p>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li>Open IPTV Dark</li>
          <li>Kies <em>"Afspeellijst toevoegen"</em> of <em>"M3U URL"</em></li>
          <li>Plak je M3U-link</li>
          <li>Alle 80.000+ zenders laden automatisch in</li>
        </ol>
        <p>Klaar. Je bent live.</p>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Zenders', value: '80.000+' },
            { label: 'Kwaliteit', value: 'HD & 4K' },
            { label: 'Setup', value: '< 5 minuten' },
          ].map(item => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{item.label}</div>
              <div className="text-white font-black">{item.value}</div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-black text-white">Is IPTV Dark veilig?</h3>
        <p>De app zelf is veilig als je hem downloadt van een betrouwbare bron. Wees voorzichtig met willekeurige APK-sites — download alleen van de officiële bron of vertrouwde app-stores.</p>
        <p>Twijfel je? Gebruik dan een alternatief dat wél in de Play Store staat — zoals <strong className="text-white">TiviMate</strong> of <strong className="text-white">IPTV Smarters Pro</strong>. Beide werken perfect met IPTVTotaal.</p>

        <a href="/blog/iptvtotaal-app" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Alle apps</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">Welke IPTV-app werkt het beste op jouw apparaat? →</span>
          </div>
        </a>

        <p>Hulp nodig bij de installatie? Stuur ons een berichtje via WhatsApp. We helpen je gratis en stap voor stap.</p>
      </div>
    ),
  },
  {
    slug: 'kpn-iptv',
    publishDate: '2026-06-05',
    date: '5 juni 2026',
    readTime: '5 min',
    category: 'Vergelijking',
    title: 'KPN IPTV vs IPTVTotaal: wat is het verschil? (2026)',
    excerpt: 'Heb je KPN en overweeg je hun tv-pakket? We vergelijken KPN IPTV met IPTVTotaal op prijs, zenderaanbod en flexibiliteit — zodat jij de slimste keuze maakt.',
    image: '/kpn-iptv.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">

        <div className="flex flex-wrap gap-2 mb-2">
          {[
            'kpn iptv','kpn tv pakket','kpn iptv vergelijken',
            'kpn interactieve tv','kpn televisie abonnement','iptv vs kpn',
          ].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">
              {kw}
            </span>
          ))}
        </div>

        <p>Je hebt KPN internet. Je wil ook tv. KPN biedt een tv-pakket aan — maar het is niet je enige optie.</p>
        <p>We leggen het verschil uit. Zodat je zelf kunt beslissen.</p>

        <h3 className="text-2xl font-black text-white">Wat biedt KPN?</h3>
        <p>KPN TV is een IPTV-dienst die via je KPN-internetverbinding werkt. Je krijgt een decoder of gebruikt de KPN iTV-app op je Smart TV.</p>
        <p>Basispakket: rond de 30–50 Nederlandse en internationale zenders. Sportzenders zijn een apart betaald pakket. Je zit vast aan een contract.</p>

        <h3 className="text-2xl font-black text-white">Wat biedt IPTVTotaal?</h3>
        <p>IPTVTotaal werkt via elk internet — KPN, Ziggo, T-Mobile, het maakt niet uit. Geen decoder nodig.</p>
        <p>80.000+ live zenders. ESPN, Ziggo Sport, beIN Sports, internationale kanalen — allemaal inbegrepen. Vanaf €4,60 per maand, zonder contract.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-6 text-white/30 font-bold uppercase tracking-widest text-xs">Onderdeel</th>
                <th className="text-left py-3 pr-6 text-white font-black">KPN TV</th>
                <th className="text-left py-3 text-amber-400 font-black">IPTVTotaal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                ['Prijs', '€10–25/mnd extra', 'v.a. €4,60/mnd'],
                ['Zenders', '30–50', '80.000+'],
                ['Sportzenders', 'Apart betaald', 'Inbegrepen'],
                ['Contract', 'Ja', 'Nee'],
                ['Apparaten', 'Decoder / KPN app', 'Elk apparaat'],
                ['Geld-terug', 'Nee', '15 dagen'],
              ].map(([label, kpn, iptv]) => (
                <tr key={label}>
                  <td className="py-3 pr-6 text-white/40">{label}</td>
                  <td className="py-3 pr-6 text-white/70">{kpn}</td>
                  <td className="py-3 text-white font-bold">{iptv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-black text-white">Wat moet je kiezen?</h3>
        <p>Als je alleen de standaard Nederlandse zenders wil en al een KPN-bundel hebt, kan KPN TV handig zijn. Alles op één factuur.</p>
        <p>Maar als je ook live sport wil — Eredivisie, Formule 1, Champions League — of internationale zenders, dan win je meer met IPTVTotaal. Meer zenders, lagere prijs, geen contract.</p>
        <p>Eerlijk gezegd: de meeste mensen die ons vinden, komen van een duur tv-pakket dat niet bood wat ze zochten.</p>

        <a href="/blog/iptv-vs-netflix" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Meer vergelijken</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">IPTV vs Netflix: wat past het beste bij jou? →</span>
          </div>
        </a>

        <h3 className="text-2xl font-black text-white">Veelgestelde vragen.</h3>
        <div className="space-y-4">
          <div>
            <p className="font-black text-white">Werkt IPTVTotaal op mijn KPN-internetverbinding?</p>
            <p>Ja. IPTVTotaal werkt via elk internetabonnement — KPN, Ziggo, T-Mobile of een andere provider. Geen verschil.</p>
          </div>
          <div>
            <p className="font-black text-white">Heb ik een speciale decoder nodig?</p>
            <p>Nee. Je gebruikt de IPTV-app op je bestaande Smart TV, telefoon of tablet. Geen extra apparatuur nodig.</p>
          </div>
          <div>
            <p className="font-black text-white">Kan ik IPTVTotaal uitproberen voor ik opzeg?</p>
            <p>Ja. Vraag een proefperiode aan via WhatsApp. Je hebt daarna 15 dagen geld-terug garantie.</p>
          </div>
        </div>

        <p>Wil je overstappen of wil je het eerst proberen? Stuur ons een berichtje via WhatsApp. We helpen je binnen 5 minuten verder.</p>
      </div>
    ),
  },
  {
    slug: 'iptv-kopen',
    date: '4 juni 2026',
    readTime: '5 min',
    category: 'Advies',
    title: 'IPTV Kopen in Nederland: dit moet je weten voor je bestelt (2026)',
    excerpt: 'Wil je IPTV kopen maar weet je niet waar je op moet letten? We leggen uit wat IPTV kost, hoe je een betrouwbare aanbieder herkent en hoe je binnen 5 minuten live bent.',
    image: '/iptv-kopen.png',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">

        <div className="flex flex-wrap gap-2 mb-2">
          {[
            'iptv kopen','iptv abonnement kopen','iptv kopen nederland',
            'iptv pakket kopen','iptv kopen goedkoop','beste iptv kopen',
            'iptv aanbieder nederland','iptv abonnement nederland',
          ].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">
              {kw}
            </span>
          ))}
        </div>

        <p>Je wil stoppen met duur betalen voor tv die je toch niet kijkt. IPTV lijkt de logische volgende stap. Maar dan zoek je op — en je stoot op tientallen aanbieders die allemaal hetzelfde beweren.</p>
        <p>Dit artikel legt het uit. Wat het kost, waar je op let, en hoe je binnen 5 minuten live bent.</p>

        <h3 className="text-2xl font-black text-white">Wat kost een IPTV-abonnement in Nederland?</h3>
        <p>Abonnementen beginnen bij €3 per maand. Goedkoop klinkt aantrekkelijk — totdat je zenders wegvallen in de 89e minuut.</p>
        <p>IPTVTotaal kost <strong className="text-white">vanaf €4,60 per maand</strong> — inclusief 80.000+ zenders, EPG, VOD en 24/7 support via WhatsApp. Geen verborgen kosten.</p>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Vanaf', value: '€4,60 / maand' },
            { label: 'Zenders', value: '80.000+' },
            { label: 'Garantie', value: '15 dagen terug' },
          ].map(item => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{item.label}</div>
              <div className="text-white font-black">{item.value}</div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-black text-white">Waaraan herken je een betrouwbare aanbieder?</h3>
        <p>Er zijn honderden aanbieders. De meeste zijn het niet waard. Dit zijn de vier dingen die er echt toe doen.</p>

        <div className="space-y-4">
          <div className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <span className="text-amber-400 font-black text-xl leading-none mt-0.5">1</span>
            <div>
              <p className="font-black text-white">Uptime-garantie.</p>
              <p className="text-sm">Een serieuze aanbieder garandeert minimaal 99% uptime. IPTVTotaal garandeert 99,9% — met redundante servers op meerdere locaties.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <span className="text-amber-400 font-black text-xl leading-none mt-0.5">2</span>
            <div>
              <p className="font-black text-white">Geld-terug garantie.</p>
              <p className="text-sm">Een aanbieder die achter zijn product staat, geeft je de tijd om het te proberen. Geen geld-terug? Niet doen. IPTVTotaal biedt 15 dagen bedenktijd.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <span className="text-amber-400 font-black text-xl leading-none mt-0.5">3</span>
            <div>
              <p className="font-black text-white">Echte klantenservice.</p>
              <p className="text-sm">Kan je ze bereiken als er iets misgaat? IPTVTotaal is 24/7 bereikbaar via WhatsApp. Gemiddelde reactietijd: minder dan 5 minuten.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <span className="text-amber-400 font-black text-xl leading-none mt-0.5">4</span>
            <div>
              <p className="font-black text-white">Een kanalenlijst die ook echt werkt.</p>
              <p className="text-sm">Veel aanbieders adverteren met "duizenden zenders" — maar een groot deel werkt niet of laadt traag. Vraag altijd naar een proefperiode voor je koopt.</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-black text-white">Welke zenders krijg je?</h3>
        <p>80.000+ live zenders. Dat klinkt als veel. Het ís ook veel.</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Nederland:</strong> NPO 1/2/3, RTL 4/5/7, SBS6, Veronica en meer</li>
          <li><strong className="text-white">Sport:</strong> ESPN, Ziggo Sport, beIN Sports, DAZN — 50+ sportzenders</li>
          <li><strong className="text-white">Internationaal:</strong> Marokkaanse, Turkse, Arabische en Engelstalige zenders</li>
          <li><strong className="text-white">Nieuws:</strong> CNN, BBC, Al Jazeera, Sky News</li>
          <li><strong className="text-white">VOD:</strong> films en series on demand inbegrepen</li>
        </ul>

        <a href="/wereldkampioenschap-voetbal-2026" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">WK 2026</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">Alle 104 WK-wedstrijden live kijken via IPTVTotaal →</span>
          </div>
        </a>

        <h3 className="text-2xl font-black text-white">Zo koop je IPTV bij IPTVTotaal.</h3>
        <p>Geen bestelformulieren. Geen wachttijden.</p>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li>Stuur een berichtje via WhatsApp</li>
          <li>Kies je pakket — maand of jaar</li>
          <li>Betaal via iDEAL, creditcard of crypto</li>
          <li>Ontvang je M3U-link of Xtream Codes direct per WhatsApp</li>
          <li>Voer de gegevens in je IPTV-app in</li>
        </ol>
        <p>Gemiddeld ben je binnen 5 minuten live. Kom je er niet uit? We helpen je gratis bij de installatie.</p>

        <h3 className="text-2xl font-black text-white">Veelgestelde vragen.</h3>
        <div className="space-y-4">
          <div>
            <p className="font-black text-white">Kan ik het eerst proberen voor ik koop?</p>
            <p>Ja. IPTVTotaal biedt een proefperiode. Stuur een berichtje via WhatsApp en vraag ernaar.</p>
          </div>
          <div>
            <p className="font-black text-white">Op hoeveel apparaten kan ik kijken?</p>
            <p>Afhankelijk van je pakket kijk je op 1 of meerdere schermen tegelijk. Smart TV, telefoon, tablet, laptop — het maakt niet uit.</p>
          </div>
          <div>
            <p className="font-black text-white">Wat als ik niet tevreden ben?</p>
            <p>Dan krijg je je geld terug. Geen vragen. Dat is de 15-dagen garantie.</p>
          </div>
          <div>
            <p className="font-black text-white">Welke internetsnelheid heb ik nodig?</p>
            <p>Voor HD is 15 Mbps voldoende. Voor 4K reken je op 25 Mbps. De meeste Nederlandse internetabonnementen halen dat ruimschoots.</p>
          </div>
        </div>

        <p>Vragen over het kopen? Stuur ons een berichtje via WhatsApp. We helpen je binnen 5 minuten verder.</p>
      </div>
    ),
  },
  {
    slug: 'nederland-uzbekistan-2026',
    date: '3 juni 2026',
    readTime: '3 min',
    category: 'Sport',
    title: 'Hoe laat speelt Nederland tegen Uzbekistan? Opstelling & uitzending',
    excerpt: 'Nederland speelt maandag 8 juni om 20:45 tegen Uzbekistan in New York. De laatste oefenwedstrijd voor het WK. Alles over de opstelling, uitzending en waar je kijkt.',
    image: '/nederland-uzbekistan-2026.png',
    imageAspect: 'square',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">

        {/* Keyword cluster */}
        <div className="flex flex-wrap gap-2 mb-2">
          {[
            'hoe laat speelt nederland uzbekistan','opstelling oranje vanavond',
            'nederland uzbekistan 2026','nederland uzbekistan uitzending',
            'oranje oefenwedstrijd uzbekistan','nederland uzbekistan tijd',
          ].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">
              {kw}
            </span>
          ))}
        </div>

        <p>Maandag 8 juni. Aftrap 20:45 Nederlandse tijd. Nederland speelt zijn laatste oefenwedstrijd voor het WK — tegen Uzbekistan in New York.</p>
        <p>Dit is de generale repetitie. Koeman zet waarschijnlijk zijn sterkste elf neer.</p>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Datum', value: 'Ma. 8 juni 2026' },
            { label: 'Aftrap', value: '20:45 NL tijd' },
            { label: 'Locatie', value: 'Icahn Stadium, New York' },
          ].map(item => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{item.label}</div>
              <div className="text-white font-black">{item.value}</div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-black text-white">Waar kijk je Nederland - Uzbekistan?</h3>
        <p>De wedstrijd wordt uitgezonden op <strong className="text-white">NPO 3</strong>. Heb je geen tv-abonnement meer, of wil je kijken op je telefoon, tablet of laptop?</p>
        <p>Via IPTVTotaal kijk je Nederland - Uzbekistan live op elk apparaat. Samsung TV, Android, iPhone, Firestick — het maakt niet uit. Stel je abonnement vandaag in en je bent er klaar voor.</p>

        <h3 className="text-2xl font-black text-white">Verwachte opstelling Oranje vanavond.</h3>
        <p>Ronald Koeman kiest waarschijnlijk zijn sterkste elf. Dit is de verwachte basisopstelling voor Nederland - Uzbekistan:</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div>
            <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-2">Keeper</div>
            <p className="text-white font-bold">Verbruggen</p>
          </div>
          <div>
            <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-2">Verdediging</div>
            <p className="text-white font-bold">Dumfries — Timber — Van Dijk — Van de Ven</p>
          </div>
          <div>
            <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-2">Middenveld</div>
            <p className="text-white font-bold">Frenkie de Jong — Gravenberch — Reijnders</p>
          </div>
          <div>
            <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-2">Aanval</div>
            <p className="text-white font-bold">Malen — Memphis — Gakpo</p>
          </div>
          <div className="text-xs text-white/30 pt-2 border-t border-white/10">Formatie: 4-3-3 · Coach: Ronald Koeman · Bron: <a href="https://www.onsoranje.nl" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">OnsOranje.nl</a></div>
        </div>

        <h3 className="text-2xl font-black text-white">Waarom is dit duel belangrijk?</h3>
        <p>Het WK 2026 begint op 11 juni. Nederland speelt dus 3 dagen na dit duel al zijn eerste groepswedstrijd.</p>
        <p>Uzbekistan is geen topland, maar dat is ook niet het punt. Koeman wil ritme in de ploeg. Spelers in hun beste vorm richting het toernooi krijgen. En kijken of de opstelling klopt.</p>
        <p>Volg de officiële selectie en nieuws rond Oranje op <a href="https://www.onsoranje.nl" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline font-bold">OnsOranje.nl</a> en de <a href="https://www.espn.nl/voetbal" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline font-bold">ESPN voetbalpagina</a>.</p>

        <a href="/wereldkampioenschap-voetbal-2026" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Na dit duel: het WK</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">Alle 104 WK 2026 wedstrijden live kijken via IPTVTotaal →</span>
          </div>
        </a>

        <p>Wil je Nederland - Uzbekistan én alle WK-wedstrijden live kijken op je Smart TV, telefoon of tablet? Stuur ons een berichtje via WhatsApp. We hebben je binnen 5 minuten live.</p>
      </div>
    ),
  },
  {
    slug: 'iptvtotaal-app',
    date: '3 juni 2026',
    readTime: '5 min',
    category: 'Handleiding',
    title: 'IPTVTotaal App: Download & Installeer op Elk Apparaat (2026 Gids)',
    excerpt: 'De IPTVTotaal app is beschikbaar op Android, iPhone, Samsung Smart TV en Firestick. Ontdek hoe je de app downloadt, installeert en direct live tv kijkt.',
    image: '/iptvtotaal-app.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">

        {/* Keyword cluster badge */}
        <div className="flex flex-wrap gap-2 mb-2">
          {[
            'iptvtotaal app','iptvtotaal app download','iptv app android','welke iptv app voor samsung tv',
            'iptv smarters app','iptv app iphone','iptvtotaal app installeren','beste iptv app nederland',
            'appli iptv android','iptv player app',
          ].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">
              {kw}
            </span>
          ))}
        </div>

        <p>Je wil IPTV kijken. Maar welke app moet je installeren? En hoe werkt het precies?</p>
        <p>Geen zorgen. We leggen het gewoon uit.</p>

        <img
          src="/iptvtotaal-app.jpg"
          alt="Smart TV met streaming app en smartphone naast elkaar"
          className="w-full rounded-2xl object-cover"
          style={{ maxHeight: 420 }}
        />
        <p className="text-xs text-white/25 -mt-4">Foto: Pexels</p>

        <h3 className="text-2xl font-black text-white">Op welke apparaten werkt de IPTVTotaal app?</h3>
        <p>Vrijwel alles wat je al hebt:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Android</strong> — telefoon, tablet &amp; Android TV / Google TV</li>
          <li><strong className="text-white">iPhone &amp; iPad</strong> — iOS via App Store</li>
          <li><strong className="text-white">Samsung &amp; LG Smart TV</strong> — via ingebouwde app store</li>
          <li><strong className="text-white">Amazon Firestick</strong> — via Downloader APK</li>
          <li><strong className="text-white">Windows &amp; Mac</strong> — via VLC of IPTV Smarters desktop</li>
        </ul>

        <h3 className="text-2xl font-black text-white">Android: zo doe je het.</h3>
        <img
          src="/iptvtotaal-app-android.jpg"
          alt="Persoon met smartphone en IPTV streaming app"
          className="w-full rounded-2xl object-cover"
          style={{ maxHeight: 380 }}
        />
        <p className="text-xs text-white/25 -mt-4">Foto: Pexels</p>
        <p><strong className="text-white">TiviMate</strong> is de beste keuze voor Android. Overzichtelijk, snel en met automatische EPG. <strong className="text-white">IPTV Smarters Pro</strong> is een goed gratis alternatief.</p>
        <p>Beide zijn gratis te downloaden via de Google Play Store. Na installatie voer je je M3U-link in — die ontvang je van ons per WhatsApp na activering. Klaar.</p>
        <ol className="list-decimal list-inside space-y-1 ml-2">
          <li>Open de <strong className="text-white">Google Play Store</strong></li>
          <li>Zoek naar <em>TiviMate</em> of <em>IPTV Smarters Pro</em></li>
          <li>Installeer en open de app</li>
          <li>Kies <em>"Toevoegen via M3U URL"</em> en plak je link</li>
          <li>Alle kanalen laden automatisch in</li>
        </ol>

        <h3 className="text-2xl font-black text-white">iPhone: zo doe je het.</h3>
        <p>Gebruik <strong className="text-white">GSE Smart IPTV</strong> of <strong className="text-white">IPTV Smarters Pro</strong>. Beide staan gewoon in de App Store.</p>
        <p>Download de app, voer je M3U-link in en je bent live. Werkt ook op iPad.</p>

        <h3 className="text-2xl font-black text-white">Samsung en LG Smart TV: zo doe je het.</h3>
        <img
          src="/iptvtotaal-app-samsung.jpg"
          alt="Persoon bedient Smart TV met afstandsbediening"
          className="w-full rounded-2xl object-cover"
          style={{ maxHeight: 380 }}
        />
        <p className="text-xs text-white/25 -mt-4">Foto: Pexels</p>
        <p>Op Samsung gebruik je <strong className="text-white">Smart IPTV</strong> via de Smart Hub. Op LG werkt <strong className="text-white">SS IPTV</strong> het beste.</p>
        <p>Installeer de app, voer je M3U-link in en je ontvangt direct de volledige kanalenlijst — inclusief EPG.</p>
        <ol className="list-decimal list-inside space-y-1 ml-2">
          <li>Open de <strong className="text-white">Smart Hub</strong> op je Samsung TV</li>
          <li>Zoek naar <em>Smart IPTV</em></li>
          <li>Installeer en open de app</li>
          <li>Voer je M3U-link in</li>
          <li>Herstart — alle zenders staan er direct in</li>
        </ol>

        <h3 className="text-2xl font-black text-white">Amazon Firestick: zo doe je het.</h3>
        <p>Installeer IPTV Smarters via de <strong className="text-white">Downloader-app</strong>. Zet 'Installatie van onbekende bronnen' aan in de instellingen.</p>
        <p>De rest werkt hetzelfde als op Android. M3U-link invoeren, klaar.</p>

        <h3 className="text-2xl font-black text-white">Wat krijg je?</h3>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">80.000+ live zenders</strong> — Nederland, Marokko, Turkije, sport, nieuws &amp; meer</li>
          <li><strong className="text-white">EPG</strong> — zie precies wat er speelt op elk kanaal</li>
          <li><strong className="text-white">VOD</strong> — films en series on demand</li>
          <li><strong className="text-white">4K &amp; HD</strong> — automatisch aangepast aan je verbinding</li>
          <li><strong className="text-white">Multi-screen</strong> — kijk op meerdere apparaten tegelijk</li>
          <li><strong className="text-white">Catch-up TV</strong> — gemiste uitzendingen terugkijken</li>
        </ul>

        <img
          src="/iptvtotaal-app-watch.jpg"
          alt="Stel geniet samen van IPTV op de bank in de woonkamer"
          className="w-full rounded-2xl object-cover"
          style={{ maxHeight: 400 }}
        />
        <p className="text-xs text-white/25 -mt-4">Foto: Pexels</p>

        <h3 className="text-2xl font-black text-white">Veelgestelde vragen.</h3>

        <div className="space-y-4">
          <div>
            <p className="font-black text-white">Is de app gratis te downloaden?</p>
            <p>Ja. De app zelf is gratis. Je hebt wel een actief IPTVTotaal abonnement nodig om in te loggen.</p>
          </div>
          <div>
            <p className="font-black text-white">Werkt het op meerdere apparaten tegelijk?</p>
            <p>Ja — afhankelijk van je abonnement kijk je op 1, 2 of meer schermen tegelijk.</p>
          </div>
          <div>
            <p className="font-black text-white">Hoe log ik in?</p>
            <p>Na activering ontvang je per WhatsApp een M3U-link of Xtream Codes. Die voer je eenmalig in de app in.</p>
          </div>
          <div>
            <p className="font-black text-white">Welke app werkt het beste op Android?</p>
            <p>TiviMate. Betere EPG, stabielere performance. IPTV Smarters Pro is een goed gratis alternatief.</p>
          </div>
        </div>

        <p>Vragen over de installatie? Stuur ons een berichtje via WhatsApp. We helpen je binnen 5 minuten verder.</p>
      </div>
    ),
  },
  {
    slug: 'iptv-installeren-smart-tv',
    date: '28 mei 2025',
    readTime: '4 min',
    category: 'Handleiding',
    title: 'IPTV installeren op je Smart TV: stap voor stap uitgelegd',
    excerpt: 'Met IPTVTotaal kijk je binnen 5 minuten op je Smart TV. In dit artikel leggen we precies uit hoe je IPTV installeert op Samsung, LG, Android TV en Amazon Firestick.',
    image: '/iptv-installeren-smart-tv.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <p>Je hebt een abonnement. Nu moet de app er nog op. Dat is makkelijker dan je denkt.</p>
        <h3 className="text-2xl font-black text-white">Samsung &amp; LG Smart TV.</h3>
        <p>Op Samsung gebruik je <strong className="text-white">Smart IPTV</strong> via de Smart Hub. Op LG werkt <strong className="text-white">SS IPTV</strong> het beste.</p>
        <p>Download de app, voer je M3U-link in en herstart. Je kanalenlijst staat er direct in. Geen gedoe.</p>
        <h3 className="text-2xl font-black text-white">Android TV &amp; Google TV.</h3>
        <p><strong className="text-white">TiviMate</strong> is hier de beste keuze. Te downloaden via de Google Play Store. Voer je M3U-link of Xtream Codes in.</p>
        <p>TiviMate laadt ook automatisch de EPG — zodat je precies ziet wat er op elk kanaal speelt.</p>
        <h3 className="text-2xl font-black text-white">Amazon Firestick.</h3>
        <p>Via de <strong className="text-white">Downloader-app</strong> installeer je IPTV Smarters als APK. Zorg dat 'Installatie van onbekende bronnen' aanstaat in de instellingen.</p>
        <p>Daarna werkt het precies hetzelfde als op Android. M3U-link invoeren, klaar.</p>
        <h3 className="text-2xl font-black text-white">Telefoon of tablet.</h3>
        <p>Android: zoek <strong className="text-white">IPTV Smarters Pro</strong> of <strong className="text-white">TiviMate</strong> in de Google Play Store.</p>
        <p>iPhone: zoek <strong className="text-white">GSE Smart IPTV</strong> of <strong className="text-white">IPTV Smarters Pro</strong> in de App Store. M3U-link invoeren, klaar.</p>
        <p>Kom je er niet uit? Stuur ons een berichtje via WhatsApp. We helpen je stap voor stap, gratis.</p>
      </div>
    ),
  },
  {
    slug: 'iptv-vs-netflix',
    date: '15 mei 2025',
    readTime: '5 min',
    category: 'Vergelijking',
    title: 'IPTV vs Netflix: wat is de beste keuze voor jou?',
    excerpt: 'Zowel IPTV als Netflix bieden entertainment via het internet, maar ze zijn fundamenteel anders. We vergelijken prijs, content en gebruiksgemak — zodat jij de beste keuze maakt.',
    image: '/iptv-vs-netflix.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <p>Netflix of IPTV? Je betaalt voor allebei. Maar je krijgt niet hetzelfde.</p>
        <h3 className="text-2xl font-black text-white">Prijs.</h3>
        <p>Netflix begint bij €7,99 per maand. Voor het Premium-pakket betaal je €22,99.</p>
        <p>IPTVTotaal kost vanaf €4,60 per maand. Daarvoor krijg je 80.000+ zenders — inclusief live sport, nieuws en films.</p>
        <h3 className="text-2xl font-black text-white">Wat je krijgt.</h3>
        <p>Netflix heeft sterke eigen series en films. Maar geen live tv.</p>
        <p>Met IPTVTotaal kijk je live naar de Eredivisie, Formule 1, Champions League, BBC en CNN. De VOD-bibliotheek met films en series is er ook gewoon bij.</p>
        <h3 className="text-2xl font-black text-white">Live sport — dit is waar Netflix het niet haalt.</h3>
        <p>Netflix heeft geen sportzenders. Geen live uitzendingen. Geen Eredivisie, geen Grand Prix.</p>
        <p>IPTVTotaal geeft je Ziggo Sport, ESPN, beIN Sports en 50+ andere sportzenders. Live, zonder extra abonnement.</p>
        <a href="/wereldkampioenschap-voetbal-2026" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Tip</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">WK 2026 kijken? Alle 104 wedstrijden live via IPTVTotaal →</span>
          </div>
        </a>
        <h3 className="text-2xl font-black text-white">Gebruiksgemak.</h3>
        <p>Netflix werkt overal meteen. Geen installatie nodig.</p>
        <p>IPTV vraagt een eenmalige setup van 5 minuten. Daarna werkt het net zo makkelijk — en wij helpen je gratis bij de installatie.</p>
        <h3 className="text-2xl font-black text-white">Wat moet je kiezen?</h3>
        <p>Alleen films en series? Netflix is prima.</p>
        <p>Wil je ook live tv, sport en 80.000+ zenders? Dan is IPTVTotaal de slimmere keuze. Veel van onze klanten gebruiken gewoon allebei naast elkaar.</p>
      </div>
    ),
  },
  {
    slug: 'beste-iptv-nederland-2025',
    date: '2 mei 2025',
    readTime: '6 min',
    category: 'Advies',
    title: 'Beste IPTV aanbieder Nederland 2025: alles wat je moet weten',
    excerpt: 'Op zoek naar de beste IPTV aanbieder in Nederland? We leggen uit waar je op moet letten, welke valkuilen je vermijdt en waarom IPTVTotaal de meest betrouwbare keuze is.',
    image: '/beste-iptv-nederland-2025.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <p>Er zijn tientallen IPTV-aanbieders in Nederland. De meeste zijn het niet waard. Hier is waar je op let.</p>
        <h3 className="text-2xl font-black text-white">1. Uptime.</h3>
        <p>Niets is irritanter dan een zender die wegvalt tijdens de wedstrijd. Kies een aanbieder die 99,9% uptime garandeert.</p>
        <p>IPTVTotaal doet dat — met redundante servers in meerdere datacenters. Als ergens iets misgaat, schakel je automatisch over.</p>
        <h3 className="text-2xl font-black text-white">2. Een kanalenlijst die werkt.</h3>
        <p>Veel aanbieders beloven duizenden zenders. Een groot deel daarvan werkt niet, of is van slechte kwaliteit.</p>
        <p>IPTVTotaal biedt 80.000+ actieve zenders — alle Nederlandse publieke en commerciële kanalen, sport, nieuws en internationale content.</p>
        <a href="/wereldkampioenschap-voetbal-2026" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Sport</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">Wereldkampioenschap voetbal 2026 live kijken via IPTV →</span>
          </div>
        </a>
        <h3 className="text-2xl font-black text-white">3. Support die er echt is.</h3>
        <p>Als er iets misgaat, wil je snel geholpen worden. Niet morgen. Nu.</p>
        <p>IPTVTotaal is 24/7 bereikbaar via WhatsApp. Gemiddelde reactietijd: minder dan 5 minuten.</p>
        <h3 className="text-2xl font-black text-white">4. Geld-terug garantie.</h3>
        <p>Een aanbieder die achter zijn product staat, geeft je de tijd om het te proberen.</p>
        <p>IPTVTotaal biedt 15 dagen geld-terug. Geen vragen. Geen gedoe.</p>
        <h3 className="text-2xl font-black text-white">5. Eerlijke prijs.</h3>
        <p>De goedkoopste optie is zelden de beste. Kijk naar wat je krijgt voor je geld.</p>
        <p>IPTVTotaal biedt maand- en jaarabonnementen vanaf €4,60 per maand. Geen verborgen kosten, geen verplicht contract.</p>
        <p>Eerlijk gezegd: als je bovenstaande punten afvinkt, kom je snel bij IPTVTotaal uit. Maar probeer het gewoon — je hebt 15 dagen de tijd om te beslissen.</p>
      </div>
    ),
  },
  {
    slug: 'iptv-live-sport-kijken',
    date: '18 april 2025',
    readTime: '4 min',
    category: 'Sport',
    title: 'Live sport kijken via IPTV: Eredivisie, Formule 1 en meer',
    excerpt: 'Een van de grootste voordelen van IPTV is het live sport-aanbod. Ontdek welke sportzenders beschikbaar zijn en hoe je nooit meer een wedstrijd hoeft te missen.',
    image: '/iptv-live-sport-kijken.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <p>Je wil de wedstrijd zien. Live. Niet tien minuten later via een samenvatting.</p>
        <h3 className="text-2xl font-black text-white">Eredivisie.</h3>
        <p>Elke speelronde live via ESPN en Ziggo Sport. Ajax, Feyenoord, PSV — geen wedstrijd hoef je te missen.</p>
        <p>Ook de KNVB Beker en Europa League-duels van Nederlandse clubs zijn gewoon te volgen.</p>
        <h3 className="text-2xl font-black text-white">Formule 1.</h3>
        <p>Alle Grand Prix-races live. Kwalificaties en vrije trainingen inbegrepen.</p>
        <p>Max Verstappen op Zandvoort, Monaco of Suzuka — je kijkt het live, zonder extra abonnement.</p>
        <h3 className="text-2xl font-black text-white">Champions League &amp; Premier League.</h3>
        <p>Europees topvoetbal via beIN Sports en CBS Sports. Premier League, La Liga, Serie A — allemaal inbegrepen.</p>
        <p>Geen losse abonnementen nodig. Het zit gewoon in het pakket.</p>
        <a href="/wereldkampioenschap-voetbal-2026" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Wereldkampioenschap 2026</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">Alle 104 WK-wedstrijden live kijken via IPTVTotaal →</span>
          </div>
        </a>
        <h3 className="text-2xl font-black text-white">Tennis, basketbal &amp; meer.</h3>
        <p>Wimbledon. Roland Garros. NBA. Olympische Spelen.</p>
        <p>IPTVTotaal dekt vrijwel elk groot sportevenement ter wereld — met 50+ sportzenders in het pakket.</p>
        <p>Wil je weten welke zenders precies beschikbaar zijn in jouw regio? Stuur ons een berichtje via WhatsApp.</p>
      </div>
    ),
  },
  {
    slug: 'iptv-4k-kwaliteit',
    date: '5 april 2025',
    readTime: '3 min',
    category: 'Techniek',
    title: 'IPTV in 4K: hoe haal je de beste beeldkwaliteit?',
    excerpt: 'Wil je het maximale uit je IPTV-ervaring halen? We leggen uit welke internetsnelheid je nodig hebt voor 4K streaming en hoe je buffering voorkomt.',
    image: '/iptv-4k-kwaliteit.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <p>Je 4K-tv staat. Het beeld is scherp. Maar je stream buffert. Dat hoeft niet.</p>
        <h3 className="text-2xl font-black text-white">Welke internetsnelheid heb je nodig?</h3>
        <p>Voor SD volstaat 5 Mbps. Voor Full HD heb je 15 Mbps nodig. Voor 4K UHD reken je op minimaal 25 Mbps.</p>
        <p>De meeste Nederlandse internetabonnementen halen dat ruimschoots. Check het even via fast.com.</p>
        <h3 className="text-2xl font-black text-white">Wifi of kabel?</h3>
        <p>Wifi is handig. Maar voor 4K streaming is een ethernetkabel betrouwbaarder.</p>
        <p>Geen interferentie, geen snelheidsverlies. Zeker tijdens live sport wil je die zekerheid.</p>
        <h3 className="text-2xl font-black text-white">Router en DNS.</h3>
        <p>Gebruik een moderne router — WiFi 5 of WiFi 6. Overweeg DNS-server 1.1.1.1 (Cloudflare) of 8.8.8.8 (Google) in te stellen.</p>
        <p>Dit verlaagt de laadtijd van streams merkbaar. Kost niks, duurt 2 minuten.</p>
        <h3 className="text-2xl font-black text-white">Instellingen in je IPTV-app.</h3>
        <p>Zet streamingkwaliteit op 'Auto' of 'Hoog'. Zet hardwareversnelling aan.</p>
        <p>Je apparaat doet dan minder moeite. Het beeld wordt vloeiender — ook op oudere apparaten.</p>
        <p>Heb je nog last van buffering? Stuur ons een berichtje via WhatsApp. We kijken gratis met je mee.</p>
      </div>
    ),
  },
  // ── DiamondIPTV ─────────────────────────────────────────────────────────────
  {
    slug: 'diamondiptv',
    publishDate: '2026-06-10',
    date: '10 juni 2026',
    readTime: '4 min',
    category: 'Vergelijking',
    title: 'DiamondIPTV: wat is het en is het de moeite waard? (2026)',
    excerpt: 'DiamondIPTV duikt veel op in zoekresultaten. Maar wat biedt het precies — en hoe verhoudt het zich tot de alternatieven? We leggen het eerlijk uit.',
    image: '/diamondiptv.webp',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <div className="flex flex-wrap gap-2 mb-2">
          {['diamondiptv','diamond iptv','diamondiptv review','iptv aanbieder nederland','iptv vergelijken','beste iptv provider'].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">{kw}</span>
          ))}
        </div>

        <p>Je zoekt IPTV. Je stuit op DiamondIPTV. De naam klinkt goed, maar wat zit er achter?</p>
        <p>We leggen het uit — inclusief wat je moet weten voor je betaalt.</p>

        <h3 className="text-2xl font-black text-white">Wat is DiamondIPTV?</h3>
        <p>DiamondIPTV is een IPTV-aanbieder die live tv-zenders levert via het internet. Net als andere aanbieders biedt het toegang tot een zenderlijst via een M3U-link of Xtream Codes.</p>
        <p>Je gebruikt het in een app als TiviMate, IPTV Smarters Pro of SS IPTV — op je Smart TV, telefoon of Firestick.</p>

        <h3 className="text-2xl font-black text-white">Waar let je op bij DiamondIPTV?</h3>
        <p>Elke IPTV-aanbieder belooft veel. De vier dingen die er echt toe doen zijn altijd hetzelfde.</p>
        <div className="space-y-4">
          {[
            ['Uptime', 'Een stream die halverwege wegvalt is geen stream. Controleer of de aanbieder een uptime-garantie heeft.'],
            ['Actieve zenderlijst', 'Vraag altijd om een proefperiode. Een long lijst met niet-werkende zenders heeft geen waarde.'],
            ['Support', 'Kun je iemand bereiken als er iets misgaat? Via WhatsApp of een ander direct kanaal — niet alleen een formulier.'],
            ['Geld-terug garantie', 'Een aanbieder die achter zijn product staat, biedt bedenktijd. Geen garantie? Dan weet je genoeg.'],
          ].map(([title, desc]) => (
            <div key={title} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
              <span className="text-amber-400 font-black text-xl leading-none mt-0.5">→</span>
              <div><p className="font-black text-white">{title}.</p><p className="text-sm">{desc}</p></div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-black text-white">IPTVTotaal als alternatief.</h3>
        <p>Als je vergelijkt, is IPTVTotaal een solide keuze. 80.000+ actieve zenders, 99,9% uptime en 24/7 support via WhatsApp met een gemiddelde reactietijd van minder dan 5 minuten.</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[{ label: 'Zenders', value: '80.000+' }, { label: 'Uptime', value: '99,9%' }, { label: 'Garantie', value: '15 dagen terug' }].map(item => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{item.label}</div>
              <div className="text-white font-black">{item.value}</div>
            </div>
          ))}
        </div>
        <p>Vanaf €4,60 per maand. Geen contract. 15 dagen geld-terug als het tegenvalt.</p>

        <a href="/blog/internet-protocol-tv-providers" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Vergelijken</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">Alle IPTV-providers in Nederland vergeleken →</span>
          </div>
        </a>

        <h3 className="text-2xl font-black text-white">Veelgestelde vragen.</h3>
        <div className="space-y-4">
          <div>
            <p className="font-black text-white">Is DiamondIPTV legaal?</p>
            <p>IPTV als technologie is legaal. Het hangt af van de licenties die een aanbieder heeft voor de aangeboden inhoud. Kies altijd een aanbieder die transparant is over zijn aanbod.</p>
          </div>
          <div>
            <p className="font-black text-white">Wat is een goed alternatief voor DiamondIPTV?</p>
            <p>IPTVTotaal is een Nederlandse aanbieder met 80.000+ zenders, 99,9% uptime en directe WhatsApp-support. Je kunt het gratis uitproberen voor je betaalt.</p>
          </div>
        </div>

        <p>Wil je vergelijken of heb je vragen? Stuur ons een berichtje via WhatsApp. We helpen je binnen 5 minuten verder.</p>
      </div>
    ),
  },
  // ── GoedIPTV ─────────────────────────────────────────────────────────────────
  {
    slug: 'goediptv',
    publishDate: '2026-06-10',
    date: '10 juni 2026',
    readTime: '4 min',
    category: 'Vergelijking',
    title: 'GoedIPTV: wat is het en wat zijn de alternatieven? (2026)',
    excerpt: 'GoedIPTV is een bekende naam in de Nederlandse IPTV-markt. We leggen uit wat je mag verwachten — en wat je zeker moet weten voor je een abonnement afsluit.',
    image: '/goediptv.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <div className="flex flex-wrap gap-2 mb-2">
          {['goediptv','goed iptv','goediptv nederland','goedkope iptv','iptv vergelijken nederland','iptv abonnement goedkoop'].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">{kw}</span>
          ))}
        </div>

        <p>Je wil goed IPTV voor een eerlijke prijs. Zonder verrassingen. Zonder streams die halverwege een wedstrijd wegvallen.</p>
        <p>GoedIPTV verschijnt vaak in zoekresultaten. Maar goedkoop en goed zijn niet altijd hetzelfde.</p>

        <h3 className="text-2xl font-black text-white">Wat is GoedIPTV?</h3>
        <p>GoedIPTV is een IPTV-dienst die zich richt op een lage prijs. De aanbieder levert toegang tot een zenderlijst via M3U of Xtream Codes — net als andere aanbieders in de markt.</p>
        <p>De app heb je zelf niet. Je gebruikt een speler als TiviMate of IPTV Smarters Pro op je eigen apparaat.</p>

        <h3 className="text-2xl font-black text-white">Goedkoop IPTV: wat zijn de valkuilen?</h3>
        <p>Een laag prijskaartje is aantrekkelijk. Maar de echte kosten liggen ergens anders.</p>
        <div className="space-y-3">
          {[
            'Instabiele servers — streams die wegvallen juist als het spannend wordt',
            'Een zenderlijst vol dode kanalen die al maanden niet werken',
            'Support die nooit antwoordt — of alleen via een ticketsysteem',
            'Geen geld-terug garantie — als het tegenvalt, ben je het kwijt',
          ].map(item => (
            <div key={item} className="flex gap-3 items-start p-3 bg-white/5 border border-white/5 rounded-xl">
              <span className="text-white/30 font-black mt-0.5">—</span>
              <p className="text-sm">{item}</p>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-black text-white">Wat kost goed IPTV dan wel?</h3>
        <p>IPTVTotaal kost vanaf <strong className="text-white">€4,60 per maand</strong>. Dat is minder dan een kopje koffie per week — voor 80.000+ zenders, inclusief sport, films en internationale kanalen.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-6 text-white/30 font-bold uppercase tracking-widest text-xs">Onderdeel</th>
                <th className="text-left py-3 pr-6 text-white font-black">Goedkope IPTV</th>
                <th className="text-left py-3 text-amber-400 font-black">IPTVTotaal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                ['Prijs', 'Laag', 'v.a. €4,60/mnd'],
                ['Uptime', 'Onbekend', '99,9%'],
                ['Support', 'Traag / geen', '24/7 WhatsApp'],
                ['Garantie', 'Nee', '15 dagen terug'],
                ['Zenderlijst', 'Wisselend', '80.000+ actief'],
              ].map(([label, cheap, totaal]) => (
                <tr key={label}>
                  <td className="py-3 pr-6 text-white/40">{label}</td>
                  <td className="py-3 pr-6 text-white/70">{cheap}</td>
                  <td className="py-3 text-white font-bold">{totaal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>Het verschil in prijs is minimaal. Het verschil in kwaliteit niet.</p>

        <a href="/blog/iptv-kopen" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Gids</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">IPTV kopen: waar let je op voor je betaalt? →</span>
          </div>
        </a>

        <h3 className="text-2xl font-black text-white">Veelgestelde vragen.</h3>
        <div className="space-y-4">
          <div>
            <p className="font-black text-white">Is goedkope IPTV betrouwbaar?</p>
            <p>Niet altijd. De prijs zegt weinig over de kwaliteit. Kijk naar uptime, support en of er een geld-terug garantie is.</p>
          </div>
          <div>
            <p className="font-black text-white">Kan ik IPTVTotaal proberen voor ik betaal?</p>
            <p>Ja. Vraag een proefperiode aan via WhatsApp. Je hebt daarna 15 dagen bedenktijd.</p>
          </div>
        </div>

        <p>Klaar voor goed IPTV zonder gedoe? Stuur ons een berichtje. We helpen je binnen 5 minuten verder.</p>
      </div>
    ),
  },
  // ── Welke IPTV is het beste ──────────────────────────────────────────────────
  {
    slug: 'welke-iptv-is-het-beste',
    publishDate: '2026-06-11',
    date: '11 juni 2026',
    readTime: '5 min',
    category: 'Advies',
    title: 'Welke IPTV is het beste in Nederland? (2026 vergelijking)',
    excerpt: 'Er zijn tientallen IPTV-aanbieders in Nederland. De meeste beloven hetzelfde. We leggen uit wat echt telt — en welke provider de toets der kritiek doorstaat.',
    image: '/welke-iptv-is-het-beste.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <div className="flex flex-wrap gap-2 mb-2">
          {['welke iptv is het beste','beste iptv nederland','iptv vergelijken','welke iptv aanbieder','iptv 2026 nederland','beste iptv aanbieder'].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">{kw}</span>
          ))}
        </div>

        <p>Je wil IPTV. Je vindt er twintig. Ze beloven allemaal hetzelfde — 80.000 zenders, geen buffering, goedkoop.</p>
        <p>Hier lees je hoe je onderscheid maakt.</p>

        <h3 className="text-2xl font-black text-white">De vier dingen die tellen.</h3>
        <div className="space-y-4">
          {[
            { num: '01', title: 'Uptime', desc: '99,9% uptime betekent minder dan 9 uur downtime per jaar. Alles eronder is onaanvaardbaar als je live sport kijkt.' },
            { num: '02', title: 'Actieve zenders', desc: 'Een lijst van 80.000 zenders waarvan 40% niet werkt, is waardeloos. Vraag altijd om een proefperiode.' },
            { num: '03', title: 'Bereikbare support', desc: 'Als je stream wegvalt wil je direct geholpen worden. WhatsApp — binnen 5 minuten — is de norm.' },
            { num: '04', title: 'Geld-terug garantie', desc: '15 dagen. Geen vragen. Een aanbieder die dat biedt, staat achter zijn product.' },
          ].map(item => (
            <div key={item.num} className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl">
              <span className="text-amber-400 font-black text-lg font-mono leading-none mt-0.5 shrink-0">{item.num}</span>
              <div><p className="font-black text-white mb-1">{item.title}.</p><p className="text-sm">{item.desc}</p></div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-black text-white">Wat biedt IPTVTotaal?</h3>
        <p>IPTVTotaal scoort op alle vier punten. 80.000+ actieve zenders. 99,9% uptime. 24/7 WhatsApp-support. 15 dagen geld-terug.</p>

        <div className="grid sm:grid-cols-4 gap-3">
          {[
            { label: 'Zenders', value: '80.000+' },
            { label: 'Uptime', value: '99,9%' },
            { label: 'Support', value: '< 5 min' },
            { label: 'Prijs', value: 'v.a. €4,60' },
          ].map(item => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{item.label}</div>
              <div className="text-white font-black">{item.value}</div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-black text-white">Welke zenders zitten erin?</h3>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Nederland:</strong> NPO 1/2/3, RTL 4/5/7, SBS6, Veronica</li>
          <li><strong className="text-white">Sport:</strong> ESPN, Ziggo Sport, beIN Sports, DAZN — 50+ sportzenders</li>
          <li><strong className="text-white">Internationaal:</strong> Marokkaans, Turks, Arabisch, Engels</li>
          <li><strong className="text-white">Nieuws:</strong> BBC, CNN, Al Jazeera, Sky News</li>
          <li><strong className="text-white">VOD:</strong> films en series on demand</li>
        </ul>

        <h3 className="text-2xl font-black text-white">Hoe kies je de beste IPTV-aanbieder voor jou?</h3>
        <p>Als je alleen de Nederlandse basiszenders wil, volstaat een goedkoop abonnement. Maar als je ook live sport, internationale kanalen of VOD wil — dan win je meer met een complete provider.</p>
        <p>Eerlijk gezegd: de meeste mensen die ons vinden, zijn overgestapt van een aanbieder die net niet bood wat ze zochten.</p>

        <a href="/blog/internet-protocol-tv-providers" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Vergelijken</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">Alle internet protocol TV providers vergeleken →</span>
          </div>
        </a>

        <h3 className="text-2xl font-black text-white">Veelgestelde vragen.</h3>
        <div className="space-y-4">
          <div>
            <p className="font-black text-white">Welke IPTV-aanbieder is het meest betrouwbaar?</p>
            <p>IPTVTotaal scoort hoog op uptime (99,9%), zenderaanbod en support. Je kunt het gratis uitproberen met een proefperiode.</p>
          </div>
          <div>
            <p className="font-black text-white">Wat kost de beste IPTV?</p>
            <p>Bij IPTVTotaal begin je vanaf €4,60 per maand. Geen contract, geen verborgen kosten.</p>
          </div>
          <div>
            <p className="font-black text-white">Werkt IPTV op mijn Smart TV?</p>
            <p>Ja. Samsung, LG, Android TV, Firestick, iPhone, Android — allemaal ondersteund.</p>
          </div>
        </div>

        <p>Wil je de beste keuze maken? Stuur ons een berichtje via WhatsApp. We helpen je binnen 5 minuten.</p>
      </div>
    ),
  },
  // ── What is IPTV (English) ───────────────────────────────────────────────────
  {
    slug: 'what-is-iptv',
    publishDate: '2026-06-11',
    date: '11 juni 2026',
    readTime: '4 min',
    category: 'Advies',
    title: 'What is IPTV? Everything You Need to Know (2026)',
    excerpt: 'IPTV stands for Internet Protocol Television. But what does that actually mean — and why are so many people in the Netherlands switching to it? Plain English explanation.',
    image: '/what-is-iptv.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <div className="flex flex-wrap gap-2 mb-2">
          {['what is iptv','what is iptv service','iptv meaning','iptv explained','iptv netherlands','how does iptv work'].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">{kw}</span>
          ))}
        </div>

        <p>Your neighbour has 80,000 channels. You're paying €50 a month for 60 through a cable subscription.</p>
        <p>He's probably using IPTV.</p>

        <h3 className="text-2xl font-black text-white">IPTV in one sentence.</h3>
        <p>IPTV — Internet Protocol Television — delivers live TV channels through your internet connection instead of a cable or satellite dish.</p>
        <p>Same channels. Same quality. No physical cable running to your house.</p>

        <h3 className="text-2xl font-black text-white">How does it actually work?</h3>
        <p>With regular cable TV, your provider sends a continuous signal through a physical cable. You receive every channel at once, whether you're watching them or not.</p>
        <p>With IPTV, you request a channel. The server sends only that stream to your device — through the internet. More efficient, more flexible, cheaper to run.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-6 text-white/30 font-bold uppercase tracking-widest text-xs">Feature</th>
                <th className="text-left py-3 pr-6 text-white font-black">Cable / Satellite</th>
                <th className="text-left py-3 text-amber-400 font-black">IPTV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                ['Connection', 'Coax cable / dish', 'Your internet'],
                ['Set-top box', 'Required', 'Not needed'],
                ['Devices', 'TV only', 'TV, phone, tablet, laptop'],
                ['Channels', '30–100', '80,000+'],
                ['Price', '€20–50/month', 'From €4.60/month'],
                ['Contract', 'Yes', 'No'],
              ].map(([label, cable, iptv]) => (
                <tr key={label}>
                  <td className="py-3 pr-6 text-white/40">{label}</td>
                  <td className="py-3 pr-6 text-white/70">{cable}</td>
                  <td className="py-3 text-white font-bold">{iptv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-black text-white">What can you watch?</h3>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Live TV</strong> — all Dutch and international channels</li>
          <li><strong className="text-white">Live sport</strong> — Eredivisie, Formula 1, Champions League, World Cup</li>
          <li><strong className="text-white">International</strong> — Arabic, Turkish, Moroccan and English channels</li>
          <li><strong className="text-white">News</strong> — BBC, CNN, Al Jazeera</li>
          <li><strong className="text-white">VOD</strong> — films and series on demand</li>
        </ul>
        <p>IPTVTotaal offers 80,000+ live channels. That means you'll never search for a channel that isn't there.</p>

        <h3 className="text-2xl font-black text-white">What do you need to get started?</h3>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li>An <strong className="text-white">internet connection</strong> — at least 15 Mbps for HD</li>
          <li>A <strong className="text-white">device</strong> — Smart TV, phone, tablet or laptop</li>
          <li>An <strong className="text-white">IPTV subscription</strong> — from €4.60/month at IPTVTotaal</li>
        </ol>
        <p>No decoder. No technician visit. No contract.</p>

        <div className="grid sm:grid-cols-3 gap-4">
          {[{ label: 'Channels', value: '80,000+' }, { label: 'From', value: '€4.60/mo' }, { label: 'Setup time', value: '< 5 min' }].map(item => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{item.label}</div>
              <div className="text-white font-black">{item.value}</div>
            </div>
          ))}
        </div>

        <a href="/blog/wat-is-iptv" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Nederlands</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">Wat is IPTV? Uitleg in gewone taal →</span>
          </div>
        </a>

        <h3 className="text-2xl font-black text-white">Frequently asked questions.</h3>
        <div className="space-y-4">
          <div>
            <p className="font-black text-white">Is IPTV legal in the Netherlands?</p>
            <p>The technology itself is legal. Whether the content is licensed depends on the provider. IPTVTotaal is a legal service.</p>
          </div>
          <div>
            <p className="font-black text-white">Does IPTV work on my Smart TV?</p>
            <p>Yes. Samsung, LG, Android TV, Firestick — all supported. Also works on phone, tablet and laptop.</p>
          </div>
          <div>
            <p className="font-black text-white">How good is the picture quality?</p>
            <p>With a good connection you watch in HD or 4K. You need 15 Mbps for HD, 25 Mbps for 4K.</p>
          </div>
        </div>

        <p>Want to get started? Send us a message on WhatsApp. You'll be watching within 5 minutes.</p>
      </div>
    ),
  },
  // ── De beste IPTV ────────────────────────────────────────────────────────────
  {
    slug: 'de-beste-iptv',
    publishDate: '2026-06-12',
    date: '12 juni 2026',
    readTime: '4 min',
    category: 'Advies',
    title: 'De beste IPTV van 2026: eerlijk advies zonder hype',
    excerpt: 'Wat maakt een IPTV-aanbieder écht goed? Niet de slogans, maar de feiten. We leggen uit waar je op let en waarom goede IPTV minder kost dan je denkt.',
    image: '/de-beste-iptv.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <div className="flex flex-wrap gap-2 mb-2">
          {['de beste iptv','beste iptv 2026','beste iptv nederland','iptv top aanbieder','iptv kwaliteit','beste iptv abonnement'].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">{kw}</span>
          ))}
        </div>

        <p>Elke IPTV-aanbieder claimt de beste te zijn. Het staat letterlijk op elke homepage.</p>
        <p>We leggen uit wat "de beste" in de praktijk betekent — en hoe je het zelf controleert.</p>

        <h3 className="text-2xl font-black text-white">Wat maakt IPTV écht goed?</h3>
        <p>Niet het aantal zenders op de website. Niet de verkooppraatjes. Dit zijn de dingen die tellen wanneer je live zit te kijken.</p>

        <div className="space-y-4">
          {[
            { label: 'Uptime die klopt', desc: 'IPTVTotaal garandeert 99,9% uptime. Dat is minder dan 9 uur downtime per jaar — inclusief onderhoud.' },
            { label: 'Zenders die écht werken', desc: '80.000+ actieve kanalen. Niet een lijst vol dode streams. Alle grote sportzenders, nieuwskanalen en internationale zenders zijn live.' },
            { label: 'Support die antwoordt', desc: '24/7 via WhatsApp. Gemiddelde reactietijd: minder dan 5 minuten. Geen ticketsysteem.' },
            { label: 'Een eerlijke prijs', desc: 'Vanaf €4,60 per maand. Geen verborgen kosten. Geen contract. 15 dagen geld-terug als het tegenvalt.' },
          ].map(item => (
            <div key={item.label} className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl">
              <svg className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              <div><p className="font-black text-white mb-1">{item.label}.</p><p className="text-sm">{item.desc}</p></div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-black text-white">Wat zit er in het pakket?</h3>
        <p>IPTVTotaal biedt 80.000+ live kanalen. Dat klinkt als veel. Dat is ook veel.</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Alle Nederlandse zenders</strong> — NPO, RTL, SBS, Veronica</li>
          <li><strong className="text-white">Alle sportzenders</strong> — ESPN, Ziggo Sport, beIN Sports, 50+ kanalen totaal</li>
          <li><strong className="text-white">Internationale kanalen</strong> — Marokkaans, Turks, Arabisch, Frans, Duits</li>
          <li><strong className="text-white">Films &amp; series</strong> — VOD inbegrepen, geen extra abonnement</li>
        </ul>

        <div className="grid sm:grid-cols-3 gap-4">
          {[{ label: 'Zenders', value: '80.000+' }, { label: 'Uptime', value: '99,9%' }, { label: 'Prijs', value: 'v.a. €4,60/mnd' }].map(item => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{item.label}</div>
              <div className="text-white font-black">{item.value}</div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-black text-white">Op welke apparaten werkt het?</h3>
        <p>Samsung Smart TV, LG Smart TV, Android TV, Firestick, iPhone, Android-telefoon, tablet, laptop.</p>
        <p>Alles wat verbinding maakt met internet. Geen speciale decoder nodig.</p>

        <a href="/blog/welke-iptv-is-het-beste" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Vergelijken</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">Welke IPTV is het beste? Alle opties vergeleken →</span>
          </div>
        </a>

        <h3 className="text-2xl font-black text-white">Veelgestelde vragen.</h3>
        <div className="space-y-4">
          <div>
            <p className="font-black text-white">Kan ik de beste IPTV proberen voor ik betaal?</p>
            <p>Ja. Vraag een gratis proefperiode aan via WhatsApp. Je hebt daarna 15 dagen bedenktijd.</p>
          </div>
          <div>
            <p className="font-black text-white">Hoe snel is IPTVTotaal actief na bestelling?</p>
            <p>Gemiddeld binnen 5 minuten na betaling ontvang je je inloggegevens via WhatsApp. Setup duurt nog eens 5 minuten.</p>
          </div>
        </div>

        <p>Geen hype. Gewoon goed IPTV. Stuur ons een berichtje via WhatsApp — we helpen je binnen 5 minuten verder.</p>
      </div>
    ),
  },
  // ── Wat kost IPTV ────────────────────────────────────────────────────────────
  {
    slug: 'wat-kost-iptv',
    publishDate: '2026-06-12',
    date: '12 juni 2026',
    readTime: '4 min',
    category: 'Advies',
    title: 'Wat kost IPTV in Nederland? Prijzen vergeleken (2026)',
    excerpt: 'Wat betaal je voor een IPTV-abonnement in Nederland? En wat zit er precies in? We leggen de prijzen uit — zodat je weet wat je krijgt voor je geld.',
    image: '/wat-kost-iptv.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <div className="flex flex-wrap gap-2 mb-2">
          {['wat kost iptv','iptv prijs nederland','iptv abonnement kosten','iptv goedkoop','iptv prijzen vergelijken','iptv kosten 2026'].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">{kw}</span>
          ))}
        </div>

        <p>IPTV kan €2 per maand kosten. Of €30. Het verschil zit niet alleen in de prijs — het zit in wat je krijgt.</p>
        <p>We leggen het uit.</p>

        <h3 className="text-2xl font-black text-white">Hoeveel kost IPTV gemiddeld?</h3>
        <p>In Nederland variëren IPTV-abonnementen van <strong className="text-white">€2 tot €20 per maand</strong>, afhankelijk van de aanbieder en het pakket.</p>
        <p>Een maandabonnement kost meer per maand dan een jaarabonnement. De meeste aanbieders bieden kortingen bij langere looptijden.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-4 text-white/30 font-bold uppercase tracking-widest text-xs">Pakket</th>
                <th className="text-left py-3 pr-4 text-white font-black">Looptijd</th>
                <th className="text-left py-3 text-amber-400 font-black">Prijs/mnd</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                ['Starter', '1 maand', '€13,50'],
                ['Standaard', '3 maanden', '€8,90'],
                ['Popular', '6 maanden', '€6,50'],
                ['Jaarabonnement', '12 maanden', '€4,60'],
                ['VIP 15 maanden', '15 maanden (+3 gratis)', '€4,40'],
              ].map(([pkg, dur, price]) => (
                <tr key={pkg}>
                  <td className="py-3 pr-4 text-white/70 font-bold">{pkg}</td>
                  <td className="py-3 pr-4 text-white/50">{dur}</td>
                  <td className="py-3 text-amber-400 font-black">{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-black text-white">Wat zit er in de prijs?</h3>
        <p>Bij IPTVTotaal is alles inbegrepen — geen losse sportpakketten, geen verborgen kosten.</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">80.000+ live zenders</strong> — inclusief sport, nieuws en internationaal</li>
          <li><strong className="text-white">EPG programmagids</strong> — automatisch inbegrepen</li>
          <li><strong className="text-white">VOD</strong> — films en series on demand</li>
          <li><strong className="text-white">Meerdere apparaten</strong> — afhankelijk van pakket</li>
          <li><strong className="text-white">24/7 WhatsApp-support</strong></li>
        </ul>

        <h3 className="text-2xl font-black text-white">Is goedkoop IPTV de moeite waard?</h3>
        <p>Aanbieders die €2 per maand vragen, bezuinigen ergens. Dat is bijna altijd op servers, zenderlijst of support.</p>
        <p>Een abonnement van €4,60 per maand met 99,9% uptime is voordeliger dan één van €2 die om de week uitvalt.</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-white font-black mb-2">Ter vergelijking.</p>
          <div className="space-y-2 text-sm">
            {[
              ['Netflix (1 scherm)', '€9,99/mnd'],
              ['ESPN losse app', '€8,99/mnd'],
              ['Ziggo Sport', '€9,99/mnd extra'],
              ['IPTVTotaal (alles in één)', 'v.a. €4,60/mnd'],
            ].map(([service, price]) => (
              <div key={service} className="flex justify-between">
                <span className="text-white/50">{service}</span>
                <span className={service.includes('IPTVTotaal') ? 'text-amber-400 font-black' : 'text-white/70'}>{price}</span>
              </div>
            ))}
          </div>
        </div>

        <p>Één abonnement. Alles erin. Geen losse pakketten.</p>

        <a href="/blog/iptv-kopen" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Bestellen</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">IPTV kopen: zo werkt het →</span>
          </div>
        </a>

        <h3 className="text-2xl font-black text-white">Veelgestelde vragen.</h3>
        <div className="space-y-4">
          <div>
            <p className="font-black text-white">Wat is de goedkoopste betrouwbare IPTV in Nederland?</p>
            <p>IPTVTotaal biedt het jaarabonnement voor €4,60 per maand — met 99,9% uptime en 24/7 support. Dat is de ondergrens voor kwaliteits-IPTV.</p>
          </div>
          <div>
            <p className="font-black text-white">Zijn er verborgen kosten?</p>
            <p>Nee. Wat je ziet is wat je betaalt. Geen activatiekosten, geen installatiekosten, geen contract.</p>
          </div>
          <div>
            <p className="font-black text-white">Wat als ik niet tevreden ben?</p>
            <p>15 dagen geld-terug garantie. Geen vragen gesteld.</p>
          </div>
        </div>

        <p>Wil je weten welk pakket het beste bij jou past? Stuur ons een berichtje via WhatsApp. We helpen je binnen 5 minuten verder.</p>
      </div>
    ),
  },
  // ── IPTV App voor Android ────────────────────────────────────────────────
  {
    slug: 'iptv-app-android',
    publishDate: '2026-06-15',
    date: '15 juni 2026',
    readTime: '5 min',
    category: 'Handleiding',
    title: 'IPTV App voor Android: de beste keuze in 2026',
    excerpt: 'Je hebt een Android-telefoon, tablet of tv-box — en je wil IPTV kijken. Welke app gebruik je? We vergelijken de beste opties en leggen uit hoe je direct aan de slag gaat met IPTVTotaal.',
    image: '/iptv-app-android.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <div className="flex flex-wrap gap-2 mb-2">
          {['appli iptv android','iptv app android','beste iptv app android','iptv android installeren','iptv smarters android','tivimate android','iptv app gratis android'].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">{kw}</span>
          ))}
        </div>

        <p>Android is het meest gebruikte platform voor IPTV. Logisch — het werkt op telefoons, tablets, tv-boxen én Android TV's. En de Play Store zit vol met IPTV-apps.</p>
        <p>Maar welke gebruik je? En welke werkt het beste met IPTVTotaal?</p>

        <h3 className="text-2xl font-black text-white">De 3 beste IPTV-apps voor Android.</h3>

        <div className="space-y-4">
          <div className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl">
            <span className="text-amber-400 font-black text-xl leading-none mt-0.5">1</span>
            <div>
              <p className="font-black text-white">TiviMate — de standaard voor Android TV</p>
              <p className="text-sm mt-1">TiviMate is de meest gebruikte IPTV-app op Android TV en Firestick. De interface is strak, de EPG werkt perfect en hij is stabiel. De premiumversie kost eenmalig €5 en is het waard.</p>
              <p className="text-xs text-amber-400 mt-1.5 font-bold">Beste keuze voor: Android TV, Nvidia Shield, Firestick</p>
            </div>
          </div>
          <div className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl">
            <span className="text-amber-400 font-black text-xl leading-none mt-0.5">2</span>
            <div>
              <p className="font-black text-white">IPTV Smarters Pro — gratis en goed</p>
              <p className="text-sm mt-1">Gratis te downloaden uit de Play Store. Je voert je Xtream Codes in en je bent live. Minder verfijnd dan TiviMate, maar werkt prima op telefoon en tablet.</p>
              <p className="text-xs text-amber-400 mt-1.5 font-bold">Beste keuze voor: Android telefoon, tablet, beginners</p>
            </div>
          </div>
          <div className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl">
            <span className="text-amber-400 font-black text-xl leading-none mt-0.5">3</span>
            <div>
              <p className="font-black text-white">IPTV Dark — voor gevorderde gebruikers</p>
              <p className="text-sm mt-1">IPTV Dark is een APK die je buiten de Play Store installeert. Meer opties dan Smarters, maar vereist iets meer technische kennis om in te stellen.</p>
              <p className="text-xs text-amber-400 mt-1.5 font-bold">Beste keuze voor: Android telefoon, tv-box, gevorderde gebruikers</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-black text-white">Eerlijk gezegd: welke moet je kiezen?</h3>
        <p>Voor Android TV of Firestick: <strong className="text-white">TiviMate</strong>. Geen discussie. De interface is de beste in zijn categorie en de EPG is nauwkeurig.</p>
        <p>Voor je telefoon of tablet: <strong className="text-white">IPTV Smarters Pro</strong>. Gratis, direct uit de Play Store, werkt meteen met je Xtream Codes.</p>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Zenders', value: '80.000+' },
            { label: 'Setup', value: '< 5 minuten' },
            { label: 'Prijs IPTVTotaal', value: 'v.a. €4,60/mnd' },
          ].map(item => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{item.label}</div>
              <div className="text-white font-black">{item.value}</div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-black text-white">Hoe verbind je de app met IPTVTotaal?</h3>
        <p>Na activering ontvang je je inloggegevens per WhatsApp — een M3U-link en Xtream Codes. Je voert ze eenmalig in de app in.</p>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li>Download TiviMate of IPTV Smarters Pro uit de Play Store</li>
          <li>Open de app en kies <em>"Afspeellijst toevoegen"</em> of <em>"Xtream Codes"</em></li>
          <li>Voer je inloggegevens in die je per WhatsApp hebt ontvangen</li>
          <li>Alle 80.000+ zenders laden automatisch in</li>
        </ol>
        <p>Klaar. Binnen 5 minuten live.</p>

        <a href="/blog/iptvtotaal-app" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Alle apparaten</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">IPTV installeren op elk apparaat: de complete gids →</span>
          </div>
        </a>

        <h3 className="text-2xl font-black text-white">Veelgestelde vragen.</h3>
        <div className="space-y-4">
          <div>
            <p className="font-black text-white">Wat is de beste gratis IPTV-app voor Android?</p>
            <p>IPTV Smarters Pro is gratis te downloaden en werkt direct met een IPTVTotaal-abonnement. Je hebt geen extra betaling nodig voor de app zelf.</p>
          </div>
          <div>
            <p className="font-black text-white">Werkt TiviMate op een gewone Android-telefoon?</p>
            <p>TiviMate is geoptimaliseerd voor Android TV. Op een telefoon werkt IPTV Smarters Pro beter. Weet je niet zeker wat het beste is voor jouw situatie? Stuur ons een berichtje via WhatsApp.</p>
          </div>
          <div>
            <p className="font-black text-white">Kan ik IPTV op meerdere Android-apparaten tegelijk kijken?</p>
            <p>Ja, afhankelijk van je IPTVTotaal-pakket. Je kunt op 1 of meerdere schermen tegelijk kijken.</p>
          </div>
        </div>

        <p>Hulp bij het instellen van de app? Stuur ons een berichtje via WhatsApp. We helpen je gratis en stap voor stap.</p>
      </div>
    ),
  },
  // ── IPTV App voor Samsung TV ─────────────────────────────────────────────
  {
    slug: 'iptv-app-samsung-tv',
    publishDate: '2026-06-16',
    date: '16 juni 2026',
    readTime: '5 min',
    category: 'Handleiding',
    title: 'Welke IPTV App voor Samsung TV? Installatie in 5 stappen (2026)',
    excerpt: 'Een Samsung Smart TV en IPTV — welke app gebruik je? We leggen uit welke opties er zijn en hoe je in 5 stappen live bent met IPTVTotaal op je Samsung.',
    image: '/iptv-app-samsung-tv.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <div className="flex flex-wrap gap-2 mb-2">
          {['welke iptv app voor samsung tv','iptv samsung smart tv','samsung tv iptv installeren','smart iptv samsung','tivimate samsung','iptv app samsung 2026','samsung iptv app'].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">{kw}</span>
          ))}
        </div>

        <p>Je hebt een Samsung Smart TV. Je wil IPTV erop. Je zoekt welke app je moet gebruiken — en je vindt vijf verschillende antwoorden.</p>
        <p>Dit is de juiste.</p>

        <h3 className="text-2xl font-black text-white">Welke app werkt het beste op een Samsung TV?</h3>
        <p>Samsung Smart TV draait op Tizen — een eigen besturingssysteem. Dat betekent dat niet alle IPTV-apps beschikbaar zijn. Je hebt drie solide opties:</p>

        <div className="space-y-4">
          <div className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl">
            <span className="text-amber-400 font-black text-xl leading-none mt-0.5">1</span>
            <div>
              <p className="font-black text-white">Smart IPTV — de bekendste keuze voor Samsung</p>
              <p className="text-sm mt-1">Smart IPTV is direct beschikbaar via de Samsung Smart Hub. Je laadt een M3U-link in via de website van de app, en je zenders verschijnen op je tv. Stabiel en gebruiksvriendelijk.</p>
              <p className="text-xs text-amber-400 mt-1.5 font-bold">Eenmalig €5,49 — daarna levenslang gratis</p>
            </div>
          </div>
          <div className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl">
            <span className="text-amber-400 font-black text-xl leading-none mt-0.5">2</span>
            <div>
              <p className="font-black text-white">SS IPTV — gratis en goed</p>
              <p className="text-sm mt-1">SS IPTV is ook beschikbaar op Samsung (en LG). Volledig gratis. Je voert je M3U-link in en je bent live. Minder mooi dan Smart IPTV, maar doet het werk.</p>
              <p className="text-xs text-amber-400 mt-1.5 font-bold">Gratis — geen betaling vereist</p>
            </div>
          </div>
          <div className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl">
            <span className="text-amber-400 font-black text-xl leading-none mt-0.5">3</span>
            <div>
              <p className="font-black text-white">Firestick op Samsung — de snelste oplossing</p>
              <p className="text-sm mt-1">Geen zin in Samsung-apps? Sluit een Amazon Firestick aan op de HDMI-poort van je Samsung tv. Dan installeer je TiviMate op de Firestick — en je hebt de beste IPTV-ervaring mogelijk.</p>
              <p className="text-xs text-amber-400 mt-1.5 font-bold">Amazon Firestick Lite: v.a. €29,99</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-black text-white">Stap voor stap: Smart IPTV installeren op Samsung TV.</h3>
        <ol className="list-decimal list-inside space-y-2.5 ml-2">
          <li>Ga naar de <strong className="text-white">Samsung Smart Hub</strong> op je tv</li>
          <li>Zoek naar <em>Smart IPTV</em> en installeer de app</li>
          <li>Open de app — je ziet het MAC-adres van je tv op het scherm</li>
          <li>Ga op je telefoon of laptop naar <strong className="text-white">siptv.eu</strong> en voer het MAC-adres in</li>
          <li>Plak je M3U-link van IPTVTotaal en klik op opslaan</li>
        </ol>
        <p>De app herlaadt automatisch — alle zenders staan er in. Klaar.</p>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5">
          <p className="text-white font-black mb-1">Tip: M3U-link of Xtream Codes?</p>
          <p className="text-sm text-white/60">Na activering van je IPTVTotaal-abonnement ontvang je beide per WhatsApp. Smart IPTV gebruikt de M3U-link. Xtream Codes werkt beter in SS IPTV.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Zenders', value: '80.000+' },
            { label: 'Installatie', value: '< 10 minuten' },
            { label: 'Prijs', value: 'v.a. €4,60/mnd' },
          ].map(item => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{item.label}</div>
              <div className="text-white font-black">{item.value}</div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-black text-white">Welke Samsung TV's worden ondersteund?</h3>
        <p>Smart IPTV en SS IPTV werken op de meeste Samsung Smart TV's van 2016 en nieuwer. Oudere Samsung-modellen zonder Smart Hub werken het beste met een Firestick.</p>
        <p>Weet je niet zeker of jouw model ondersteund wordt? Stuur ons een berichtje — we checken het gratis voor je.</p>

        <a href="/blog/iptv-installeren-smart-tv" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Meer handleidingen</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">IPTV installeren op Smart TV: stap voor stap uitgelegd →</span>
          </div>
        </a>

        <h3 className="text-2xl font-black text-white">Veelgestelde vragen.</h3>
        <div className="space-y-4">
          <div>
            <p className="font-black text-white">Werkt TiviMate op een Samsung Smart TV?</p>
            <p>Nee. TiviMate is gemaakt voor Android TV. Op een Samsung (Tizen) gebruik je Smart IPTV of SS IPTV. Met een Firestick via HDMI werkt TiviMate wél op je Samsung.</p>
          </div>
          <div>
            <p className="font-black text-white">Hoe krijg ik mijn M3U-link?</p>
            <p>Na activering van je IPTVTotaal-abonnement sturen we je de M3U-link per WhatsApp. Je voert hem eenmalig in via siptv.eu of in SS IPTV.</p>
          </div>
          <div>
            <p className="font-black text-white">Werkt het ook op een Samsung-telefoon?</p>
            <p>Ja. Op je Samsung-telefoon gebruik je IPTV Smarters Pro of TiviMate (Android) — beide zijn gratis te downloaden uit de Play Store.</p>
          </div>
        </div>

        <p>Kom je er niet uit? Stuur ons een berichtje via WhatsApp. We helpen je gratis installeren — stap voor stap.</p>
      </div>
    ),
  },
  // ── Beste IPTV voor Nederland 2026 ───────────────────────────────────────
  {
    slug: 'beste-iptv-voor-nederland-2026',
    publishDate: '2026-06-15',
    date: '15 juni 2026',
    readTime: '6 min',
    category: 'Vergelijking',
    title: 'Wat is de beste IPTV voor Nederland? Vergelijking 2026',
    excerpt: 'Je wil de beste IPTV voor Nederland. Maar er zijn tientallen aanbieders. Wij vergelijken ze eerlijk — op zenders, prijs, uptime en support — zodat jij de juiste keuze maakt.',
    image: '/beste-iptv-voor-nederland-2026.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <div className="flex flex-wrap gap-2 mb-2">
          {['wat is de beste iptv voor nederland','beste iptv nederland 2026','iptv vergelijken nederland','beste iptv aanbieder 2026','iptv nederland betrouwbaar','goede iptv aanbieder nederland'].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">{kw}</span>
          ))}
        </div>

        <p>Je zoekt de beste IPTV voor Nederland. Je vindt tientallen aanbieders. Ze beloven allemaal hetzelfde — 80.000 zenders, lage prijs, 24/7 support.</p>
        <p>Maar de meeste leveren dat niet. Wij leggen uit wat het verschil maakt.</p>

        <h3 className="text-2xl font-black text-white">Waarop vergelijk je IPTV-aanbieders?</h3>
        <p>Er zijn vier dingen die bepalen of een IPTV-aanbieder écht goed is voor Nederland. Niet de beloftes — de prestaties.</p>

        <div className="space-y-3">
          {[
            { title: 'Nederlandse zenders', text: 'NPO 1/2/3, RTL 4/5/7, SBS6, Veronica. Dit zijn de basics. Als een aanbieder deze zenders niet stabiel streamt, stop dan meteen.' },
            { title: 'Sportzenders voor Nederland', text: 'ESPN heeft de Eredivisie. Ziggo Sport heeft de Champions League. Viaplay heeft Formule 1. Een goede IPTV voor Nederland heeft ze alle drie.' },
            { title: 'Uptime', text: '99,9% uptime betekent minder dan 9 uur downtime per jaar. Aanbieders die dat niet halen, zijn simpelweg niet betrouwbaar.' },
            { title: 'Nederlandse support', text: 'Als er iets misgaat op zondagmiddag tijdens de Eredivisie, wil je direct geholpen worden. Via WhatsApp, in het Nederlands.' },
          ].map(item => (
            <div key={item.title} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <p className="font-black text-white mb-1">{item.title}</p>
              <p className="text-sm">{item.text}</p>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-black text-white">Hoe scoort IPTVTotaal op elk punt?</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-4 text-white/30 font-bold uppercase tracking-widest text-xs">Onderdeel</th>
                <th className="text-left py-3 text-amber-400 font-black">IPTVTotaal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                ['Nederlandse zenders', '✓ NPO, RTL, SBS6, Veronica en meer'],
                ['Sportzenders', '✓ ESPN, Ziggo Sport, Viaplay, beIN Sports (50+)'],
                ['Totaal zenders', '80.000+ actief'],
                ['Uptime', '99,9% gegarandeerd'],
                ['Support', '24/7 WhatsApp · < 5 min reactietijd'],
                ['Prijs', 'v.a. €4,60/mnd'],
                ['Garantie', '15 dagen geld-terug'],
                ['Contract', 'Nee'],
              ].map(([label, value]) => (
                <tr key={label}>
                  <td className="py-3 pr-4 text-white/50">{label}</td>
                  <td className="py-3 text-white font-bold">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-black text-white">Wat maakt IPTVTotaal de beste keuze voor Nederland?</h3>
        <p>Eerlijk gezegd: het zijn de details. Veel aanbieders hebben een grote zenderlijst. Maar een zender die 20% van de tijd uitvalt is niets waard.</p>
        <p>Bij IPTVTotaal zijn alle 80.000+ zenders actief getest en gemonitord. De Nederlandse kanalen en sportzenders lopen op aparte, krachtigere servers. Dat is het verschil tijdens een live wedstrijd.</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-white font-black mb-3">Ter vergelijking: traditioneel tv-pakket vs. IPTVTotaal</p>
          <div className="space-y-2 text-sm">
            {[
              ['Ziggo TV-basis + ESPN + Ziggo Sport', '€45–55/mnd'],
              ['KPN TV + losse sportpakketten', '€40–50/mnd'],
              ['IPTVTotaal (alles inclusief)', 'v.a. €4,60/mnd'],
            ].map(([service, price]) => (
              <div key={service} className="flex justify-between gap-4">
                <span className="text-white/50">{service}</span>
                <span className={service.includes('IPTVTotaal') ? 'text-amber-400 font-black shrink-0' : 'text-white/70 shrink-0'}>{price}</span>
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-2xl font-black text-white">Voor wie is IPTVTotaal de beste keuze?</h3>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Je wil Nederlandse zenders + sport in één abonnement</li>
          <li>Je betaalt liever €4,60 dan €50 per maand voor hetzelfde</li>
          <li>Je kijkt op meerdere apparaten: tv, telefoon, tablet</li>
          <li>Je wil geen lange contracten of verborgen kosten</li>
        </ul>
        <p>Als je jezelf herkent in één van deze punten, dan is IPTVTotaal de beste IPTV voor Nederland voor jou.</p>

        <a href="/blog/iptv-kopen" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Direct starten</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">IPTV kopen in Nederland: zo werkt het →</span>
          </div>
        </a>

        <h3 className="text-2xl font-black text-white">Veelgestelde vragen.</h3>
        <div className="space-y-4">
          <div>
            <p className="font-black text-white">Zit de Eredivisie erin?</p>
            <p>Ja. ESPN 1/2/3/4 en Ziggo Sport zijn allemaal inbegrepen — inclusief alle Eredivisie-wedstrijden en de KNVB Beker.</p>
          </div>
          <div>
            <p className="font-black text-white">Kan ik eerst proberen voor ik betaal?</p>
            <p>We bieden een 15-dagengarantie. Als het niet bevalt, krijg je je geld terug. Geen vragen gesteld.</p>
          </div>
          <div>
            <p className="font-black text-white">Werkt het ook in het buitenland?</p>
            <p>Ja. IPTVTotaal werkt wereldwijd, zolang je een actieve internetverbinding hebt.</p>
          </div>
        </div>

        <p>Wil je weten of IPTVTotaal de beste IPTV is voor jouw situatie? Stuur ons een berichtje via WhatsApp. We helpen je binnen 5 minuten.</p>
      </div>
    ),
  },
  // ── Wat kost Prime Video bij Ziggo ───────────────────────────────────────
  {
    slug: 'prime-video-ziggo',
    publishDate: '2026-06-16',
    date: '16 juni 2026',
    readTime: '4 min',
    category: 'Vergelijking',
    title: 'Wat kost Prime Video bij Ziggo? Kosten en een beter alternatief (2026)',
    excerpt: 'Prime Video via Ziggo klinkt handig — alles in één rekening. Maar wat kost het precies? En is het goedkoper dan het los te nemen? We rekenen het voor.',
    image: '/prime-video-ziggo.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <div className="flex flex-wrap gap-2 mb-2">
          {['wat kost prime video bij ziggo','prime video ziggo prijs','amazon prime via ziggo','prime video abonnement ziggo','ziggo streaming kosten','ziggo prime video 2026'].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">{kw}</span>
          ))}
        </div>

        <p>Je hebt Ziggo. Je overweegt Prime Video erbij te nemen. Je vraagt je af of het via Ziggo duurder of goedkoper uitvalt dan direct bij Amazon.</p>
        <p>Korte vraag. Duidelijk antwoord.</p>

        <h3 className="text-2xl font-black text-white">Wat kost Prime Video bij Ziggo?</h3>
        <p>Ziggo biedt Prime Video aan als extra zender via hun platform. In 2026 betaal je bij Ziggo <strong className="text-white">€9,99 per maand</strong> voor Prime Video als losse toevoeging bovenop je bestaande Ziggo-abonnement.</p>
        <p>Dat is hetzelfde als het losse Amazon-abonnement — maar via Ziggo kijk je het in de Ziggo-interface, niet in de eigen Prime Video-app.</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-white font-black mb-3">Kosten vergelijking</p>
          <div className="space-y-2 text-sm">
            {[
              ['Ziggo TV-basis', '€24,00/mnd'],
              ['Prime Video via Ziggo', '+€9,99/mnd'],
              ['Totaal Ziggo + Prime', '≈ €34,00/mnd'],
              ['Amazon Prime Video direct', '€9,99/mnd (los)'],
              ['IPTVTotaal (80.000+ zenders + sport)', 'v.a. €4,60/mnd'],
            ].map(([service, price]) => (
              <div key={service} className="flex justify-between gap-4">
                <span className={service.includes('IPTVTotaal') ? 'text-white font-bold' : 'text-white/50'}>{service}</span>
                <span className={service.includes('IPTVTotaal') ? 'text-amber-400 font-black shrink-0' : 'text-white/70 shrink-0'}>{price}</span>
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-2xl font-black text-white">Is het beter om Prime Video los te nemen?</h3>
        <p>Eerlijk gezegd: ja. Als je Prime Video wil, neem het dan direct bij Amazon. Je betaalt hetzelfde maar krijgt de volledige Prime-ervaring — inclusief Prime Music, Prime Gaming en gratis bezorging bij Amazon.</p>
        <p>Via Ziggo krijg je alleen de films en series, zonder de extra's.</p>

        <h3 className="text-2xl font-black text-white">Maar wacht — wil je ook live sport en reguliere tv?</h3>
        <p>Als je op zoek bent naar live Nederlandse zenders, Eredivisie, Formule 1 of Champions League — dan lost Prime Video dat probleem niet op. Daar is IPTV de slimmere keuze.</p>
        <p>Vergelijk de rekening:</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-4 text-white/30 font-bold uppercase tracking-widest text-xs">Pakket</th>
                <th className="text-left py-3 pr-4 text-white font-black">Bevat</th>
                <th className="text-left py-3 text-amber-400 font-black">Prijs/mnd</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                ['Ziggo Compleet + Prime + Sport', 'Alles van Ziggo, Prime Video, sport', '€55–65'],
                ['Netflix + ESPN los', 'Films, series, Eredivisie', '€20–25'],
                ['IPTVTotaal', '80.000+ zenders, sport, films & series', 'v.a. €4,60'],
              ].map(([pkg, content, price]) => (
                <tr key={pkg}>
                  <td className="py-3 pr-4 text-white/70 font-bold">{pkg}</td>
                  <td className="py-3 pr-4 text-white/50 text-xs">{content}</td>
                  <td className="py-3 text-amber-400 font-black">{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>Met IPTVTotaal heb je live Nederlandse tv, 50+ sportzenders én een uitgebreid VOD-aanbod — in één abonnement, voor een fractie van de prijs van Ziggo.</p>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5">
          <p className="text-white font-black mb-1">Geen Ziggo-contract nodig.</p>
          <p className="text-sm text-white/60">IPTVTotaal werkt via internet — geen tv-pakket of decoder nodig. Je hebt alleen een wifi-verbinding en een apparaat.</p>
        </div>

        <a href="/blog/iptv-vs-netflix" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Vergelijking</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">IPTV vs Netflix: wat is de beste keuze voor jou? →</span>
          </div>
        </a>

        <h3 className="text-2xl font-black text-white">Veelgestelde vragen.</h3>
        <div className="space-y-4">
          <div>
            <p className="font-black text-white">Is Prime Video via Ziggo goedkoper dan direct?</p>
            <p>Nee. Je betaalt hetzelfde — €9,99 per maand. Via Ziggo krijg je minder functies dan via de officiële Prime Video-app.</p>
          </div>
          <div>
            <p className="font-black text-white">Heb ik nog een Ziggo-abonnement nodig als ik IPTV gebruik?</p>
            <p>Nee. IPTVTotaal werkt via je bestaande internetverbinding — van welke provider dan ook. Je kunt je tv-pakket van Ziggo dan opzeggen.</p>
          </div>
          <div>
            <p className="font-black text-white">Zit Netflix ook in IPTVTotaal?</p>
            <p>IPTVTotaal biedt uitgebreide VOD-content. Netflix-content is beschermd en niet inbegrepen, maar het uitgebreide IPTVTotaal-VOD-aanbod biedt duizenden films en series.</p>
          </div>
        </div>

        <p>Wil je stoppen met dure tv-pakketten? Stuur ons een berichtje via WhatsApp. We leggen uit wat de beste stap is voor jouw situatie.</p>
      </div>
    ),
  },
  // ── Wat is IPTV en hoe werkt het ─────────────────────────────────────────
  {
    slug: 'wat-is-iptv-en-hoe-werkt-het',
    publishDate: '2026-06-17',
    date: '17 juni 2026',
    readTime: '5 min',
    category: 'Advies',
    title: 'Wat is IPTV en hoe werkt het? Complete gids voor beginners (2026)',
    excerpt: 'Wat is IPTV en hoe werkt het precies? In deze complete gids leggen we alles uit — van de techniek tot de installatie — zodat je begrijpt wat IPTV is en of het iets voor jou is.',
    image: '/wat-is-iptv-en-hoe-werkt-het.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <div className="flex flex-wrap gap-2 mb-2">
          {['wat is iptv en hoe werkt het','iptv uitleg beginners','iptv wat is dat','iptv technologie nederland','hoe werkt iptv thuis','iptv voor beginners','iptv complete gids'].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">{kw}</span>
          ))}
        </div>

        <p>Je hoort de term IPTV overal. Je buurman gebruikt het. Een vriend raadde het aan. Maar je begrijpt nog niet helemaal wat het is — en of het iets voor jou is.</p>
        <p>Deze gids geeft je alle antwoorden. Geen technisch jargon. Gewoon duidelijk.</p>

        <h3 className="text-2xl font-black text-white">Wat is IPTV? De eenvoudige uitleg.</h3>
        <p>IPTV staat voor <strong className="text-white">Internet Protocol Television</strong>. Het is een manier om tv te kijken via het internet, in plaats van via een kabel of satellietschotel.</p>
        <p>Bij traditionele tv stuurt een provider een continu signaal via een fysieke kabel naar je huis. Je ontvangt alle zenders tegelijk — of je ze kijkt of niet.</p>
        <p>Bij IPTV vraag jij een zender op. De server stuurt dan precies díe stream naar jouw apparaat. Efficiënter. Flexibeler. Veel goedkoper.</p>

        <h3 className="text-2xl font-black text-white">Hoe werkt IPTV technisch?</h3>
        <p>Het principe is vergelijkbaar met YouTube of Netflix — alleen dan met live televisie. Zo werkt het stap voor stap:</p>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li>De IPTV-aanbieder ontvangt live tv-signalen van zenders wereldwijd</li>
          <li>Die signalen worden omgezet naar digitale streams op krachtige servers</li>
          <li>Jij selecteert een zender in je app</li>
          <li>De server stuurt de videostream via internet naar jouw apparaat</li>
          <li>Je kijkt live — vaak met minder dan 2 seconden vertraging</li>
        </ol>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Vertraging', value: '< 2 seconden' },
            { label: 'Kwaliteit', value: 'SD · HD · 4K' },
            { label: 'Zenders', value: '80.000+' },
          ].map(item => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{item.label}</div>
              <div className="text-white font-black">{item.value}</div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-black text-white">Wat heb je nodig om IPTV te gebruiken?</h3>
        <p>Drie dingen. Meer niet.</p>
        <div className="space-y-3">
          {[
            { num: '1', title: 'Een internetverbinding', text: 'Minimaal 15 Mbps voor HD. Vrijwel elk Nederlands internetabonnement haalt dat.' },
            { num: '2', title: 'Een apparaat', text: 'Smart TV (Samsung, LG, Android TV), telefoon, tablet, laptop of een Firestick. Je gebruikt wat je al hebt.' },
            { num: '3', title: 'Een IPTV-abonnement', text: 'Bij IPTVTotaal vanaf €4,60 per maand. Geen decoder nodig. Geen monteur aan de deur.' },
          ].map(item => (
            <div key={item.num} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
              <span className="text-amber-400 font-black text-xl leading-none mt-0.5">{item.num}</span>
              <div>
                <p className="font-black text-white">{item.title}</p>
                <p className="text-sm mt-0.5">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-black text-white">Wat is het verschil met Netflix?</h3>
        <p>Netflix is een Video on Demand-dienst: je kiest wanneer je kijkt uit een bibliotheek van films en series. Geen live tv.</p>
        <p>IPTV biedt live televisie — en vaak ook VOD. Zo kijk je de Eredivisie live, het nieuws live, en heb je ook toegang tot films en series.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-4 text-white/30 font-bold uppercase tracking-widest text-xs">Functie</th>
                <th className="text-left py-3 pr-4 text-white font-black">Netflix</th>
                <th className="text-left py-3 text-amber-400 font-black">IPTV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                ['Live tv', '✗ Niet beschikbaar', '✓ 80.000+ zenders'],
                ['Live sport', '✗ Niet beschikbaar', '✓ Eredivisie, F1, Champions League'],
                ['Films & series', '✓ Groot aanbod', '✓ Uitgebreid VOD'],
                ['Prijs', '€9,99–22,99/mnd', 'v.a. €4,60/mnd'],
              ].map(([label, netflix, iptv]) => (
                <tr key={label}>
                  <td className="py-3 pr-4 text-white/50">{label}</td>
                  <td className="py-3 pr-4 text-white/70">{netflix}</td>
                  <td className="py-3 text-white font-bold">{iptv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-black text-white">Is IPTV legaal?</h3>
        <p>De technologie zelf — tv kijken via internet — is volledig legaal. Het hangt af van de aanbieder en de inhoud die ze leveren. IPTVTotaal is een legale dienst die werkt via legale bronnen.</p>
        <p>Twijfel je? Stuur ons een berichtje via WhatsApp. We leggen het uit.</p>

        <a href="/blog/hoe-werkt-iptv" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Technische uitleg</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">Hoe werkt IPTV technisch? De uitleg over M3U en streaming →</span>
          </div>
        </a>

        <h3 className="text-2xl font-black text-white">Veelgestelde vragen.</h3>
        <div className="space-y-4">
          <div>
            <p className="font-black text-white">Hoe snel kan ik starten met IPTV?</p>
            <p>Na je bestelling bij IPTVTotaal ontvang je je inloggegevens per WhatsApp. Binnen 5 minuten ben je live. Geen wachttijd, geen installateur nodig.</p>
          </div>
          <div>
            <p className="font-black text-white">Werkt IPTV ook buiten Nederland?</p>
            <p>Ja. IPTVTotaal werkt wereldwijd. Zolang je een internetverbinding hebt, kijk je gewoon.</p>
          </div>
          <div>
            <p className="font-black text-white">Wat als ik problemen heb met de stream?</p>
            <p>Stuur ons een berichtje via WhatsApp. We reageren binnen 5 minuten — dag en nacht. Meeste problemen zijn binnen 10 minuten opgelost.</p>
          </div>
        </div>

        <p>Klaar om te beginnen? Stuur ons een berichtje via WhatsApp. We helpen je direct verder.</p>
      </div>
    ),
  },
  // ── IPTV Abonnement Nederland ─────────────────────────────────────────────
  {
    slug: 'iptv-abonnement-nederland',
    publishDate: '2026-06-17',
    date: '17 juni 2026',
    readTime: '5 min',
    category: 'Advies',
    title: 'IPTV Abonnement Nederland: prijzen, tips en de beste keuze (2026)',
    excerpt: 'Een IPTV-abonnement nemen in Nederland — maar welk pakket kies je? We leggen de prijzen, looptijden en wat je krijgt uitgebreid uit, zodat je de slimste keuze maakt.',
    image: '/iptv-abonnement-nederland.jpg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <div className="flex flex-wrap gap-2 mb-2">
          {['iptv abonnement nederland','iptv abonnement kopen','iptv abonnement prijs','iptv abonnement 2026','goedkoop iptv abonnement','iptv pakket nederland','iptv abonnement vergelijken'].map(kw => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">{kw}</span>
          ))}
        </div>

        <p>Je wil een IPTV-abonnement nemen. Maar welke looptijd kies je? Wat zit er precies in? En hoe voorkom je dat je voor een aanbieder kiest die na twee weken uitvalt?</p>
        <p>We leggen het stap voor stap uit.</p>

        <h3 className="text-2xl font-black text-white">Welke IPTV-abonnementen zijn er in Nederland?</h3>
        <p>Bij IPTVTotaal zijn er vijf pakketten — van maandelijks tot 15 maanden. Hoe langer de looptijd, hoe lager de maandprijs.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-4 text-white/30 font-bold uppercase tracking-widest text-xs">Pakket</th>
                <th className="text-left py-3 pr-4 text-white font-black">Looptijd</th>
                <th className="text-left py-3 pr-4 text-amber-400 font-black">Totaal</th>
                <th className="text-left py-3 text-amber-400/70 font-black">Per mnd</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                ['Starter', '1 maand', '€13,50', '€13,50'],
                ['Standaard', '3 maanden', '€26,70', '€8,90'],
                ['Popular', '6 maanden', '€39,00', '€6,50'],
                ['Jaarabonnement', '12 maanden', '€55,20', '€4,60'],
                ['VIP 15 maanden', '12 + 3 gratis', '€66,00', '€4,40'],
              ].map(([pkg, dur, total, monthly]) => (
                <tr key={pkg}>
                  <td className="py-3 pr-4 text-white/70 font-bold">{pkg}</td>
                  <td className="py-3 pr-4 text-white/50">{dur}</td>
                  <td className="py-3 pr-4 text-white/70">{total}</td>
                  <td className="py-3 text-amber-400 font-black">{monthly}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>Alle pakketten bevatten dezelfde inhoud. Je kiest alleen de looptijd — en daarmee de prijs per maand.</p>

        <h3 className="text-2xl font-black text-white">Wat zit er in elk abonnement?</h3>
        <p>Bij IPTVTotaal is alles inbegrepen — geen losse sportpakketten, geen verborgen kosten.</p>

        <div className="grid sm:grid-cols-2 gap-3">
          {[
            '80.000+ actieve live zenders',
            'NPO, RTL, SBS6, Veronica',
            'ESPN, Ziggo Sport, Viaplay',
            'beIN Sports, DAZN',
            '50+ sportzenders',
            'Marokkaans, Turks, Arabisch',
            'Films & series on demand (VOD)',
            'EPG programmagids inbegrepen',
            '24/7 WhatsApp support',
            'HD en 4K kwaliteit',
            'Meerdere apparaten tegelijk',
            '15 dagen geld-terug garantie',
          ].map(f => (
            <div key={f} className="flex items-center gap-2 text-sm text-white/70">
              <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              {f}
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-black text-white">Welk abonnement is de beste keuze?</h3>
        <p>Als je IPTV voor het eerst probeert: begin met de <strong className="text-white">Starter</strong> — €13,50 voor één maand. Combineer dat met de 15-dagengarantie en je hebt geen risico.</p>
        <p>Ben je overtuigd en wil je de beste prijs? Kies het <strong className="text-white">VIP 15-maandenpakket</strong> — €4,40 per maand, inclusief 3 maanden gratis. Dat is de laagste maandprijs die we aanbieden.</p>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5">
          <p className="text-white font-black mb-1">15 dagen geld-terug garantie.</p>
          <p className="text-sm text-white/60">Niet tevreden binnen 15 dagen? Je krijgt je geld terug — zonder vragen. Zo kun je elk pakket risicoloos proberen.</p>
        </div>

        <h3 className="text-2xl font-black text-white">Hoe bestel je een IPTV-abonnement bij IPTVTotaal?</h3>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li>Stuur een berichtje via <strong className="text-white">WhatsApp</strong></li>
          <li>Geef aan welk pakket je wil en op welk apparaat je kijkt</li>
          <li>Ontvang je betaallink en betaal veilig</li>
          <li>Ontvang je inloggegevens per WhatsApp — binnen 5 minuten</li>
          <li>Installeer de app en geniet van 80.000+ zenders</li>
        </ol>
        <p>Geen registratieformulier. Geen lange wachttijden. Gewoon direct.</p>

        <a href="/blog/iptv-kopen" className="group flex items-center justify-between p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors no-underline">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Meer info</span>
            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">IPTV kopen in Nederland: alles wat je moet weten →</span>
          </div>
        </a>

        <h3 className="text-2xl font-black text-white">Veelgestelde vragen.</h3>
        <div className="space-y-4">
          <div>
            <p className="font-black text-white">Verlengd het abonnement automatisch?</p>
            <p>Nee. Er is geen automatische verlenging. Je abonnement loopt gewoon af — je kiest zelf of je verlengt.</p>
          </div>
          <div>
            <p className="font-black text-white">Kan ik het abonnement op meerdere apparaten gebruiken?</p>
            <p>Ja, afhankelijk van je pakket. Je kunt op meerdere schermen tegelijk kijken — Smart TV, telefoon en tablet tegelijk.</p>
          </div>
          <div>
            <p className="font-black text-white">Zijn er activatiekosten?</p>
            <p>Nee. Je betaalt alleen de abonnementsprijs. Geen activatiekosten, geen installatiekosten, geen verborgen kosten.</p>
          </div>
        </div>

        <p>Klaar om te beginnen? Stuur ons een berichtje via WhatsApp. We helpen je meteen verder.</p>
      </div>
    ),
  },
];

const CATEGORIES = ['Alles', 'Handleiding', 'Vergelijking', 'Advies', 'Sport', 'Techniek'];

const CategoryTag: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-400 uppercase tracking-widest">
    {label}
  </span>
);

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <a href={`/blog/${post.slug}`} className="group cursor-pointer block">
    <div className={`overflow-hidden rounded-2xl mb-4 bg-neutral-900 ${!post.headerCard ? (post.imageAspect === 'square' ? 'aspect-square' : 'aspect-video') : ''}`}>
      {post.headerCard ? (
        <div className="pointer-events-none">{post.headerCard}</div>
      ) : (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      )}
    </div>
    <div className="flex items-center gap-3 mb-2">
      <CategoryTag label={post.category} />
      <span className="text-xs text-white/40">{post.date}</span>
      <span className="text-xs text-white/40">· {post.readTime} lezen</span>
    </div>
    <h2 className="text-lg font-black tracking-tight text-white group-hover:text-amber-400 transition-colors leading-snug">
      {post.title}
    </h2>
  </a>
);

const BlogDetail: React.FC<{ post: BlogPost }> = ({ post }) => {
  const navigate = useNavigate();
  const whatsappLink = "https://api.whatsapp.com/send/?phone=447449708976&text&type=phone_number&app_absent=0";

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-0">
      <button
        onClick={() => navigate('/blog')}
        className="inline-flex items-center gap-2 text-sm font-bold text-white/40 hover:text-amber-400 transition-colors mb-10"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Terug naar blog
      </button>

      <div className="flex items-center gap-3 mb-5">
        <CategoryTag label={post.category} />
        <span className="text-sm text-white/30">{post.date}</span>
        <span className="text-sm text-white/30">· {post.readTime} lezen</span>
      </div>

      <h1 className="text-4xl lg:text-6xl font-black tracking-tighter leading-tight text-white mb-8">
        {post.title}
      </h1>

      {post.headerCard ? (
        <div className="mb-10">{post.headerCard}</div>
      ) : (
        <div className={`overflow-hidden rounded-2xl mb-10 ${post.imageAspect === 'square' ? 'aspect-square' : ''}`}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full object-cover"
            style={post.imageAspect !== 'square' ? { maxHeight: 460 } : undefined}
          />
        </div>
      )}

      <div className="border-t border-white/10 pt-10">
        {post.content}
      </div>

      <div className="mt-16 bg-gradient-to-br from-amber-500/10 to-yellow-600/5 border border-amber-500/20 rounded-[40px] p-10 text-center">
        <h3 className="text-3xl font-black tracking-tighter text-white mb-3">Klaar om te beginnen?</h3>
        <p className="text-white/50 mb-8">Neem contact op via WhatsApp — je bent binnen 5 minuten aan het kijken.</p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWhatsAppConversion}
          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black rounded-full hover:scale-[1.02] transition-transform shadow-xl shadow-amber-500/20"
        >
          WhatsApp Ons Nu
        </a>
      </div>
    </div>
  );
};

export const Blog: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [activeCategory, setActiveCategory] = useState('Alles');

  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const visiblePosts = posts
    .filter(p => !p.publishDate || new Date(p.publishDate) <= today)
    .sort((a, b) => new Date(b.publishDate ?? b.date).getTime() - new Date(a.publishDate ?? a.date).getTime());

  const selectedPost = slug ? (visiblePosts.find(p => p.slug === slug) ?? null) : null;

  const filtered = activeCategory === 'Alles'
    ? visiblePosts
    : visiblePosts.filter(p => p.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);
  const popular = [...visiblePosts].slice(0, 5);

  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
    if (selectedPost) {
      document.title = `${selectedPost.title} | IPTVTotaal Blog`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', selectedPost.excerpt);
    } else {
      document.title = 'IPTV Blog | Tips, handleidingen & nieuws — IPTVTotaal';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', 'Lees onze IPTV handleidingen, vergelijkingen en tips. Alles wat je moet weten over IPTV in Nederland: installatie, sport, kwaliteit en meer.');
    }
    return () => {
      document.title = prevTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', prevDesc);
    };
  }, [selectedPost]);

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-black text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <BlogDetail post={selectedPost} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">

        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none mb-3">
            IPTV Blog
          </h1>
          <p className="text-white/50 text-lg">
            Tips, handleidingen en nieuws over IPTV in Nederland.
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-white/10 pb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-white/40 text-lg">Geen artikelen gevonden in deze categorie.</p>
        ) : (
          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-16">

            {/* Main content */}
            <div>
              {/* Featured post */}
              {featured && (
                <a
                  href={`/blog/${featured.slug}`}
                  className="group cursor-pointer mb-14 block"
                >
                  <div className={`overflow-hidden rounded-3xl mb-6 bg-neutral-900 ${!featured.headerCard ? 'aspect-[16/7]' : ''}`}>
                    {featured.headerCard ? (
                      <div className="pointer-events-none">{featured.headerCard}</div>
                    ) : (
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <CategoryTag label={featured.category} />
                    <span className="text-sm text-white/40">{featured.date}</span>
                    <span className="text-sm text-white/40">· {featured.readTime} lezen</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors leading-snug max-w-2xl">
                    {featured.title}
                  </h2>
                  <p className="text-white/50 mt-3 leading-relaxed max-w-2xl">{featured.excerpt}</p>
                </a>
              )}

              {/* Grid of remaining posts */}
              {rest.length > 0 && (
                <>
                  <div className="border-t border-white/10 pt-10 mb-8">
                    <h2 className="text-xs font-black text-white/30 uppercase tracking-widest">Meer artikelen</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rest.map(post => (
                      <BlogCard key={post.slug} post={post} />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Sidebar — Populair */}
            <aside className="hidden lg:block">
              <div className="sticky top-36">
                <h3 className="text-xs font-black text-white/30 uppercase tracking-widest mb-6">Populair</h3>
                <ol className="space-y-6">
                  {popular.map((post, i) => (
                    <li key={post.slug}>
                      <a
                        href={`/blog/${post.slug}`}
                        className="text-left group w-full block"
                      >
                        <span className="text-2xl font-black text-white/10 group-hover:text-amber-500/40 transition-colors leading-none block mb-1">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors leading-snug">
                          {post.title}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

          </div>
        )}
      </div>
    </div>
  );
};
