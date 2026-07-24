
import React from 'react';
import { Link } from 'react-router-dom';

export const WA = "https://api.whatsapp.com/send/?phone=447414662070&text&type=phone_number&app_absent=0";

// ── Flags ────────────────────────────────────────────────────────────────────
export const FLAG_SVGS: Record<string, React.ReactNode> = {
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

export const Flag: React.FC<{ code: string }> = ({ code }) => (
  <div className="w-20 sm:w-28 h-[52px] sm:h-[72px] rounded-xl overflow-hidden shadow-2xl ring-2 ring-black/30 flex-shrink-0">
    {FLAG_SVGS[code] ?? <div className="w-full h-full bg-black/20"/>}
  </div>
);

// ── Match card ────────────────────────────────────────────────────────────────
export const MatchCard: React.FC<{
  team1: string; team2: string; code1: string; code2: string;
  matchDateISO: string; kickoff: string; venue: string; group: string;
}> = ({ team1, team2, code1, code2, matchDateISO, kickoff, venue, group }) => {
  const [t, setT] = React.useState({ d: 0, h: 0, m: 0, s: 0, started: false });
  React.useEffect(() => {
    const target = new Date(matchDateISO).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setT({ d:0,h:0,m:0,s:0,started:true }); return; }
      setT({ d:Math.floor(diff/86400000), h:Math.floor((diff%86400000)/3600000), m:Math.floor((diff%3600000)/60000), s:Math.floor((diff%60000)/1000), started:false });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [matchDateISO]);

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl shadow-amber-500/20 border border-amber-500/10">
      <div className="flex items-center justify-between px-5 py-2.5 bg-neutral-950">
        <span className="text-[11px] font-black text-amber-400 uppercase tracking-[0.15em]">⚽ FIFA WK 2026 · {group}</span>
        <div className="flex items-center gap-1.5 text-[11px] font-black text-black bg-amber-400 px-2.5 py-1 rounded-full uppercase tracking-widest">
          <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"/>LIVE · IPTVTOTAAL
        </div>
      </div>
      <div className="bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 px-3 sm:px-5 pt-4 sm:pt-6 pb-3 sm:pb-5">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
            <Flag code={code1} />
            <span className="text-black font-black text-xs sm:text-base text-center leading-tight truncate w-full px-1">{team1}</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-1 sm:px-2 shrink-0">
            <span className="text-black/20 text-2xl sm:text-4xl font-black tracking-tighter leading-none select-none">VS</span>
            <div className="bg-black/15 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-center">
              <div className="text-black font-black text-[11px] sm:text-sm leading-none whitespace-nowrap">{kickoff}</div>
              <div className="text-black/50 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mt-0.5">aftrap</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
            <Flag code={code2} />
            <span className="text-black font-black text-xs sm:text-base text-center leading-tight truncate w-full px-1">{team2}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          {t.started ? (
            <div className="inline-flex items-center gap-2 bg-black rounded-lg px-4 py-2">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"/>
              <span className="text-amber-400 font-black text-xs uppercase tracking-widest">Live nu bezig</span>
            </div>
          ) : (
            <div className="bg-black/80 rounded-lg px-3 py-2 inline-flex items-center gap-0.5">
              {[{v:t.d,l:'dag'},{v:t.h,l:'uur'},{v:t.m,l:'min'},{v:t.s,l:'sec'}].map(({v,l},i) => (
                <React.Fragment key={l}>
                  {i > 0 && <span className="text-amber-400/50 font-black text-xs sm:text-sm pb-3 px-0.5">:</span>}
                  <div className="flex flex-col items-center w-7 sm:w-9">
                    <span className="text-amber-400 font-black text-base sm:text-lg tabular-nums leading-none">{String(v).padStart(2,'0')}</span>
                    <span className="text-white/30 text-[8px] sm:text-[9px] font-bold uppercase tracking-wide mt-0.5">{l}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="bg-neutral-950 px-3 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 text-white/30 text-[10px] sm:text-[11px] font-medium min-w-0">
          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <span className="truncate">{venue}</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {[{src:'/assets/channels/espn.png',alt:'ESPN',mobileHide:false},{src:'/assets/channels/viaplay.png',alt:'Viaplay',mobileHide:false},{src:'/assets/channels/ziggo-sport.png',alt:'Ziggo Sport',mobileHide:true},{src:'/assets/channels/eurosport.png',alt:'Eurosport',mobileHide:true}].map(ch => (
            <div key={ch.alt} className={`${ch.mobileHide ? 'hidden sm:flex' : 'flex'} bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg px-1.5 sm:px-2 py-1 sm:py-1.5 items-center justify-center h-7 sm:h-8 min-w-[40px] sm:min-w-[48px]`}>
              <img src={ch.src} alt={ch.alt} className="max-h-3.5 sm:max-h-4 max-w-[48px] sm:max-w-[56px] object-contain"/>
            </div>
          ))}
          <div className="flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-[10px] sm:text-[11px] font-black px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-lg h-7 sm:h-8">
            <div className="w-3.5 sm:w-4 h-3.5 sm:h-4 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-sm flex items-center justify-center shrink-0 ring-1 ring-black/20">
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-black rotate-45"/>
            </div>
            <span className="hidden xs:inline sm:inline">IPTVTotaal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── CTA pack €78 ─────────────────────────────────────────────────────────────
export const PackCta: React.FC = () => (
  <div className="rounded-2xl p-px bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 shadow-2xl shadow-amber-500/20">
    <div className="rounded-[15px] bg-neutral-950 p-6 lg:p-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-black uppercase tracking-widest">★ Premium VIP</span>
        <span className="text-xs font-bold text-amber-400/60 uppercase tracking-widest">12 + 3 Maanden Gratis</span>
      </div>
      <div className="flex items-end gap-2 mb-3">
        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">€78</span>
        <span className="text-white/40 font-bold mb-1.5">eenmalig · 15 maanden</span>
      </div>
      <p className="text-white/40 text-sm mb-6">Alle 104 WK 2026 wedstrijden live — plus 80.000+ zenders, films & series.</p>
      <div className="grid sm:grid-cols-2 gap-2 mb-6 text-sm">
        {['+80.000 Kanalen + Netflix','Alle WK 2026 Wedstrijden','HD / 4K / 8K kwaliteit','ESPN · Viaplay · Ziggo Sport','VPN Inbegrepen','Anti-Freeze PRO','Persoonlijke VIP Manager','15 Dagen Geld-Terug'].map(f => (
          <div key={f} className="flex items-center gap-2 text-white/60">
            <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
            {f}
          </div>
        ))}
      </div>
      <a href={WA} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppConversion}
        className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black text-lg hover:scale-[1.02] transition-transform shadow-xl shadow-amber-500/30 no-underline">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.532 5.85L.057 23.292a.75.75 0 00.908.98l5.65-1.48A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.704 9.704 0 01-4.95-1.354l-.354-.21-3.655.957.975-3.562-.23-.368A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
        Bestel via WhatsApp — €78,00
      </a>
      <p className="text-center text-white/30 text-xs mt-3">15 dagen geld-terug garantie · Geen verborgen kosten</p>
    </div>
  </div>
);

// ── Match data ────────────────────────────────────────────────────────────────
export interface Match {
  team1: string; team2: string; code1: string; code2: string;
  matchDateISO: string; kickoff: string; venue: string; group: string;
  date: string; slug: string; pageSlug: string;
  metaTitle: string; metaDesc: string;
  keywords: string[];
  watchText: string;
  intro: string;
  team1Strengths: string[];
  team2Strengths: string[];
  analysis: string;
  whyWatch: string;
}

export const MATCHES: Match[] = [
  {
    team1:'Mexico', team2:'Zuid-Afrika', code1:'MX', code2:'ZA',
    matchDateISO:'2026-06-11T18:00:00Z', kickoff:'20:00 NL-tijd', venue:'Mexico-Stad Stadion', group:'Groep A',
    date:'Donderdag 11 juni 2026', slug:'mexico-zuid-afrika-wk-2026',
    pageSlug:'mexico-vs-zuidafrika-live-kijken-wk-2026',
    metaTitle:'Mexico vs Zuid-Afrika Live Kijken — WK 2026 Opening | IPTVTotaal',
    metaDesc:'Kijk Mexico – Zuid-Afrika live via IPTVTotaal. WK 2026 openingswedstrijd, 11 juni 2026. HD stream op elk apparaat. ESPN · Viaplay · Bestel voor €78.',
    keywords:['mexico vs zuidafrika live kijken','mexico wk 2026 stream','wk 2026 openingswedstrijd kijken','where to watch mexico south africa wk 2026','mexico wk opener livestream','wk 2026 gratis kijken','mexico wk 2026 uitzending'],
    watchText:'De officiële openingswedstrijd van het WK 2026. Gastland Mexico trapt af in eigen stadion. Via IPTVTotaal kijk je dit live in HD — zonder extra abonnement, op elk apparaat.',
    intro:'Het WK 2026 begint in Mexico-Stad. Gastland Mexico opent het grootste voetbaltoernooi ooit voor eigen publiek in een stadion dat al eerder WK-finale hoorde. Zuid-Afrika, de Bafana Bafana, treedt aan als de eerste Afrikaanse uitdager in Groep A. Dit is niet zomaar een openingswedstrijd — dit is het startschot van het spectaculairste sportevenement in de moderne geschiedenis.',
    team1Strengths:['Enorm thuisvoordeel: 80.000+ supporters in eigen stadion','Hirving "Chucky" Lozano en Raúl Jiménez als gevaarlijk aanvalsduo','Mexico kwalificeerde zich voor 8 WK\'s op rij','Tactisch sterk en compact onder bondscoach Jaime Lozano'],
    team2Strengths:['Bafana Bafana verraste op de Africa Cup of Nations','Percy Tau combineert creativiteit met explosiviteit in de diepte','Fysiek sterk elftal dat hoog druk zet over het hele veld','Africa\'s meest onderschatte donkere paard op het WK'],
    analysis:'Mexico start als favoriet, maar het gastlandprestige maakt de druk enorm. Elke fout wordt uitvergroot door thuissupporters. Zuid-Afrika speelt zonder angst — ze hebben niets te verliezen. Verwacht een intense, emotionele wedstrijd. De eerste goal bepaalt het verloop van de hele groep A. Wie scoort, controleert het tempo.',
    whyWatch:'Dit is de historische openingswedstrijd van WK 2026 — het grootste WK ooit met 48 deelnemers. Je kijkt dit live, of je mist het begin van het toernooi dat iedereen bespreekt.',
  },
  {
    team1:'USA', team2:'Paraguay', code1:'US', code2:'PY',
    matchDateISO:'2026-06-12T00:00:00Z', kickoff:'02:00 NL-tijd', venue:'Los Angeles Stadium', group:'Groep D',
    date:'Vrijdag 12 juni 2026 (02:00 NL)', slug:'usa-paraguay-wk-2026',
    pageSlug:'usa-vs-paraguay-live-kijken-wk-2026',
    metaTitle:'USA vs Paraguay Live Kijken — WK 2026 | IPTVTotaal',
    metaDesc:'Kijk USA – Paraguay live via IPTVTotaal. WK 2026 Groep D, 12 juni 2026 om 02:00 NL-tijd. HD stream, ook \'s nachts op elk apparaat. Bestel voor €78.',
    keywords:['usa paraguay live kijken','usa wk 2026 stream','where to watch usa paraguay world cup','usmnt wk 2026 livestream','usa paraguay kijken nederland','wk 2026 nacht wedstrijd kijken'],
    watchText:'Nachtelijk voetbal uit Los Angeles. Het USMNT debuut onder enorme thuisdruk. IPTVTotaal streamt dit live — ook om 02:00 \'s nachts, op telefoon, tablet of tv.',
    intro:'Nachtelijk WK-voetbal vanuit het zonnige Los Angeles. Om 02:00 Nederlandse tijd debuteert het Amerikaanse gastland officieel op het WK 2026. Christian Pulisic en zijn ploeg staan voor de test: kunnen ze waarmaken wat het thuisland verwacht? Paraguay, met Miguel Almirón als sleutelspeler, heeft alles in huis om te verrassen.',
    team1Strengths:['Christian Pulisic (AC Milan) — Amerika\'s grootste ster in zijn prime','Weston McKennie (Juventus) als dynamische motor op het middenveld','Thuisdruk in LA omzetten in energie: 80.000+ fans achter je','Jongste en meest hongerige USMNT-ploeg ooit samengesteld'],
    team2Strengths:['Miguel Almirón (Newcastle) als creatieve en technische motor','Solide defensie die weinig kansen weggaf in de kwalificatie','Zuid-Amerika\'s meest onderschatte elftal met slimme tactiek','Copa América-ervaring in knock-out situaties'],
    analysis:'Dit is een klassieke test voor het USMNT: presteren onder thuisdruk. Amerikaanse fans verwachten meer dan een doorkomst uit de groepsfase. Paraguay speelt slim en disciplinair — ze gaan niet zomaar mee in het USMNT-tempo. Verwacht een krap, tactisch duel waarbij de eerste goal doorslaggevend is. Middernacht in Nederland, maar voor echte voetballiefhebbers is dit de wedstrijd die je niet overslaat.',
    whyWatch:'Nachtvoetbal in LA, live te volgen terwijl het feest in de VS losbarst. De meest unieke WK-sfeer van het toernooi, recht in je woonkamer.',
  },
  {
    team1:'Brazilië', team2:'Marokko', code1:'BR', code2:'MA',
    matchDateISO:'2026-06-13T21:00:00Z', kickoff:'23:00 NL-tijd', venue:'New York/NJ Stadion', group:'Groep C',
    date:'Zaterdag 13 juni 2026', slug:'brazilie-marokko-wk-2026',
    pageSlug:'brazilie-vs-marokko-live-kijken-wk-2026',
    metaTitle:'Brazilië vs Marokko Live Kijken — WK 2026 Blockbuster | IPTVTotaal',
    metaDesc:'Kijk Brazilië – Marokko live via IPTVTotaal. WK 2026 Groep C, 13 juni 2026. Vinícius Jr. vs Marokkaanse ijzeren defensie. HD stream voor €78.',
    keywords:['brazilie marokko live kijken','brazilié wk 2026 stream','where to watch brazil morocco world cup 2026','marokko wk 2026 livestream','brazilie wk kijken nederland','wk 2026 kraker livestream'],
    watchText:'De eerste grote kraker van het toernooi. Vinícius Jr. vs de ijzeren Marokkaanse defensie. Dit is de match die iedereen wil zien — kijk hem live via IPTVTotaal in 4K.',
    intro:'De eerste echte blockbuster van WK 2026. Brazilië — vijfvoudig wereldkampioen en eeuwig favoriet — opent met misschien wel hun zwaarste groepsfase-tegenstander. Marokko schudde de wereld wakker op WK 2022 in Qatar, bereikte als eerste Afrikaans land ooit de halve finale, en heeft sindsdien alleen maar verder gebouwd. In New York, de stad van dromen, worden alle ingrediënten voor voetbaldrama geserveerd.',
    team1Strengths:['Vinícius Jr. — één van de twee beste aanvallers ter wereld op dit moment','Rodrygo, Endrick en Raphinha vormen de gevaarlijkste aanvalslinie van het toernooi','Brazilië wil na 24 jaar eindelijk weer wereldkampioen worden','Frisse, aanvallende speelstijl die elke verdediging onder druk zet'],
    team2Strengths:['WK 2022-halvefinalist met dezelfde defensieve kern intact','Achraf Hakimi (PSG) — snelste rechtsback ter wereld én gevaarlijk aanvallend','Yassine Bounou als wereldklasse keeper die alles tegenhoudt','Bondscoach Regragui bouwt tactisch de perfecte val voor favorietjes'],
    analysis:'Brazilië heeft ster op ster, maar Marokko laat zich niet intimideren. Ze spelen compact, sluiten ruimtes en slaan genadeloos toe op de counter. Vinícius Jr. wordt de sleutelspeler: als hij zijn dag heeft, wint Brazilië ruim. Maar als Hakimi en co. hem neutraliseren, wordt dit een strijd die op één detail beslist. In New York gaat dit een nacht worden die voetbalfans niet vergeten.',
    whyWatch:'Vijf spelers die op dit moment bij de top-10 ter wereld horen, in één wedstrijd. Dit soort clash zie je misschien maar één keer per generatie.',
  },
  {
    team1:'Nederland', team2:'Japan', code1:'NL', code2:'JP',
    matchDateISO:'2026-06-14T19:00:00Z', kickoff:'21:00 NL-tijd', venue:'Dallas Stadium, Texas', group:'Groep F',
    date:'Zondag 14 juni 2026', slug:'nederland-japan-wk-2026',
    pageSlug:'nederland-vs-japan-live-kijken-wk-2026',
    metaTitle:'Nederland vs Japan Live Kijken — WK 2026 Oranje Debuut | IPTVTotaal',
    metaDesc:'Kijk Nederland – Japan live via IPTVTotaal. WK 2026 Groep F, 14 juni 2026 om 21:00. Oranje debuut livestream. HD kwaliteit op elk apparaat. Bestel voor €78.',
    keywords:['nederland japan live kijken','oranje wk 2026 stream','where to watch netherlands japan world cup','nederland japan uitzending','oranje wk kijken','nederland wk 2026 livestream gratis','nederland japan kijken'],
    watchText:'Oranje\'s eerste WK-wedstrijd van 2026. Nederland neemt het op tegen een technisch sterk Japan. De meest gezochte wedstrijd door Nederlandse fans — kijk hem live via IPTVTotaal.',
    intro:'Het moment waar heel Nederland al maanden naar uitkijkt. Oranje maakt zijn WK 2026-debuut in Dallas, Texas, tegen een Japan-elftal dat in 2022 nog sensationeel Duitsland én Spanje versloeg. Dit is geen makkelijke opener. Japan staat bekend als het technisch slimste Aziatische elftal ooit, en ze gaan niet respectvol achteruit. Oranje moet van de eerste minuut scherp zijn.',
    team1Strengths:['Cody Gakpo (Liverpool) in absolute topvorm na een sterk Champions League-seizoen','Virgil van Dijk — verdediger van het jaar en de stabiele rots achterin','Memphis Depay als gevaarlijke invaller en finisher in de slotfase','Bondscoach Ronald Koeman met bewezen WK- en EK-ervaring op het hoogste niveau'],
    team2Strengths:['Japan versloeg Duitsland én Spanje in 2022 — niemand die hen meer onderschat','Takumi Minamino en Kaoru Mitoma als razendsnelle en technische aanvallers','Extreem fit en gedisciplineerd elftal dat nooit opgeeft','Tactisch het meest verrassende Aziatische elftal in WK-geschiedenis'],
    analysis:'Nederland gaat als favoriet het veld in, maar Japan is gevaarlijker dan ooit. In 2022 bewezen ze dat reputatie alleen niet wint. Oranje moet Van Dijks defensie hermetisch sluiten én Gakpo het momentum geven om het verschil te maken. Als Japan in hun tempo kan spelen, wordt het een zenuwen slopende avond. De hele Nederland kijkt mee — jij ook?',
    whyWatch:'Oranje\'s eerste WK-wedstrijd in jaren. Dit is dé Nederlandse sportgebeurtenis van 2026. Je kijkt het live of je hoort het de volgende dag van iedereen om je heen.',
  },
  {
    team1:'Saudi-Arabië', team2:'Uruguay', code1:'SA', code2:'UY',
    matchDateISO:'2026-06-15T21:00:00Z', kickoff:'23:00 NL-tijd', venue:'Miami Stadion, Florida', group:'Groep H',
    date:'Maandag 15 juni 2026', slug:'saudi-arabie-uruguay-wk-2026',
    pageSlug:'saudi-arabie-vs-uruguay-live-kijken-wk-2026',
    metaTitle:'Saudi-Arabië vs Uruguay Live Kijken — WK 2026 | IPTVTotaal',
    metaDesc:'Kijk Saudi-Arabië – Uruguay live via IPTVTotaal. WK 2026 Groep H, 15 juni 2026 om 23:00. Valverde & Núñez livestream. HD stream voor €78.',
    keywords:['saudi arabie uruguay live kijken','uruguay wk 2026 stream','where to watch saudi arabia uruguay world cup','uruguay wk kijken','wk 2026 groep H kijken','saudi arabie wk livestream'],
    watchText:'Valverde en Núñez tegen het verassende Saudi-Arabië. Een tactisch duel dat spannender wordt dan het lijkt. Kijk live via IPTVTotaal — HD, geen buffering.',
    intro:'In Miami speelt Uruguay — driemaal wereldkampioen en altijd gevaarlijk — hun eerste WK-wedstrijd van 2026 tegen het verassende Saudi-Arabië, dat in Qatar sensationeel van Argentinië won. Federico Valverde en Darwin Núñez staan tegenover een Saudi-team dat niemand meer durft te onderschatten. Dit wordt een tactisch duel vol discipline, met gegarandeerd drama.',
    team1Strengths:['Federico Valverde (Real Madrid) — één van de beste middenvelders van zijn generatie','Darwin Núñez (Liverpool) als dodelijke en krachtige aanvaller','Uruguay\'s onwrikbare verdedigingslinie, al decennia de solide basis van alles','Mentale kracht en karakter — Uruguay vecht tot de allerlaatste seconde'],
    team2Strengths:['Saudi-Arabië won in 2022 van Argentinië — dat WK-trauma zit iedereen nog vers in het geheugen','Compact en snel omschakelen op de counter, genadeloos effectief','Fysiek sterk en goed georganiseerd elftal met top-Aziatisch coaching','Speelt vrij, zonder druk — exact de gevaarlijkste tegenstander'],
    analysis:'Valverde is op dit moment één van de vijf beste voetballers ter wereld. Als hij zijn niveau haalt, is Saudi-Arabië kansloos. Maar Uruguay is meerdere keren in het verleden slordig begonnen, en Saudi-Arabië aast op precies zo\'n kans. In Miami, waar duizenden Latijns-Amerikanen de sfeer bepalen, wordt dit een heuse beleving. Dit is geen bijwedstrijd — dit is groep H live.',
    whyWatch:'Valverde + Núñez in hun absolute prime, tegen het elftal dat Argentinië versloeg. Dit is geen wedstrijd die je rustig skippt.',
  },
  {
    team1:'Nederland', team2:'Zweden', code1:'NL', code2:'SE',
    matchDateISO:'2026-06-20T16:00:00Z', kickoff:'18:00 NL-tijd', venue:'Houston Stadium, Texas', group:'Groep F',
    date:'Zaterdag 20 juni 2026', slug:'nederland-zweden-wk-2026',
    pageSlug:'nederland-vs-zweden-live-kijken-wk-2026',
    metaTitle:'Nederland vs Zweden Live Kijken — WK 2026 Oranje | IPTVTotaal',
    metaDesc:'Kijk Nederland – Zweden live via IPTVTotaal. WK 2026 Groep F, 20 juni 2026 om 18:00. Cruciaal duel voor de achtste finales. HD livestream voor €78.',
    keywords:['nederland zweden live kijken','oranje zweden wk stream','where to watch netherlands sweden world cup','nederland zweden uitzending','oranje wk 2026 tweede wedstrijd','nederland zweden livestream'],
    watchText:'Het cruciale Europese duel in Groep F. De winnaar heeft een enorme stap naar de achtste finales. Mis Oranje\'s tweede WK-wedstrijd niet — live via IPTVTotaal.',
    intro:'Oranje\'s tweede WK-wedstrijd — en mogelijk de meest cruciale van de groepsfase. In Houston neemt Nederland het op tegen Zweden in een puur Europees duel om de koppositie in Groep F. De winnaar heeft zo goed als zeker de achtste finales bereikt. Alexander Isak, de topscorer van de Premier League, is de man die Oranje\'s verdediging moet stoppen. Dit wordt een duel om te overleveren.',
    team1Strengths:['Momentum na (verwacht) sterke start in de groepsfase','Xavi Simons (Leipzig) — de meest explosieve Nederlandse middenvelder van zijn generatie','Matthijs de Ligt in terugkeer naar WK-topvorm bij Bayern München','Oranje heeft in Houston massale Nederlandse expatriaat-support achter zich'],
    team2Strengths:['Alexander Isak (Newcastle) — topscorer van de Premier League, onhoudbaar als hij op dreef is','Dejan Kulusevski (Tottenham) als gevaarlijke vleugelaanvaller die overal opduikt','Zweden speelt slim, compact en gevaarlijk op de omschakeling','Ervaren elftal met spelers bij de beste clubs van Europa'],
    analysis:'Dit is een duel om de groepstop. Beide elftallen hebben meer dan voldoende kwaliteit om door te gaan, maar de nummer 1 van Groep F heeft een aanmerkelijk makkelijkere route in de knock-outfase. Verwacht een open, aanvallende wedstrijd — Zweden durft ook te voetballen. Het duel in het duel: Isak vs. Van Dijk. Wie die slag wint, wint waarschijnlijk de match.',
    whyWatch:'Oranje\'s meest kritische WK-duel van de groepsfase. Na deze wedstrijd weten we of Nederland de serieuze WK-favoriet is die iedereen verwacht.',
  },
  {
    team1:'Tunesië', team2:'Nederland', code1:'TN', code2:'NL',
    matchDateISO:'2026-06-25T22:00:00Z', kickoff:'00:00 NL-tijd', venue:'Kansas City Stadium', group:'Groep F',
    date:'Vrijdag 26 juni 2026 (00:00 NL)', slug:'tunesie-nederland-wk-2026',
    pageSlug:'tunesie-vs-nederland-live-kijken-wk-2026',
    metaTitle:'Tunesië vs Nederland Live Kijken — WK 2026 Groepsfase | IPTVTotaal',
    metaDesc:'Kijk Tunesië – Nederland live via IPTVTotaal. WK 2026 Groep F, 26 juni 2026 om 00:00. Beslissende groepswedstrijd Oranje. HD stream voor €78.',
    keywords:['tunesie nederland live kijken','oranje wk groepsfase stream','where to watch tunisia netherlands world cup','nederland wk 2026 derde wedstrijd','tunesie nederland uitzending','oranje wk afsluiting groep'],
    watchText:'Oranje sluit de groepsfase af. Afhankelijk van de stand kan dit alles bepalen. Sla geen seconde over — kijk live via IPTVTotaal, ook laat op de avond.',
    intro:'De beslissende groepsfase-afsluiter van Oranje. In Kansas City om middernacht Nederlandse tijd neemt Nederland het op tegen Tunesië. Afhankelijk van hoe de stand in Groep F ervoor staat, kan dit alles bepalen: groepswinst, een makkelijkere loting, of in het slechtste scenario zelfs uitschakeling. Tunesië — viermaal eerder op het WK — speelt voor hun eigen overleving. Elk detail telt.',
    team1Strengths:['Oranje met maximale inzet als de stand onzeker is — de volle startelf staat op het veld','Gakpo en Depay in wat hun beste WK-vorm ooit kan zijn','Hollandse mentaliteit: nooit opgeven, ook niet als het moeilijk gaat','Ronald Koeman weet exact wanneer hij welke speler opstelt voor maximaal effect'],
    team2Strengths:['Youssef Msakni — Tunesisch technisch fenomeen die op zijn dag iedereen kan passeren','Tunesië haalt altijd meer dan verwacht uit grote toernooien','Speelt vrij, zonder de enorme druk die op Nederlandse schouders rust','Compact en effectief — ze maken het moeilijk voor elke tegenstander'],
    analysis:'Dit kan de meest zenuwslopende wedstrijd van Oranje worden. Als Nederland al zeker door is na twee wedstrijden, roteert Koeman. Maar als de stand onzeker is, gaat de sterkste elf het veld in voor een wedstrijd die alles bepaalt. Tunesië heeft niets te verliezen — en precies dat maakt ze gevaarlijk. Om middernacht in Kansas City begint het. Ben jij wakker?',
    whyWatch:'De wedstrijd die bepaalt of Oranje als groepswinnaar of -tweede doorkomt. De loting voor de knock-outfase hangt er volledig van af. Dit is geen optie — dit is een verplichting.',
  },
];

// ── Overview page ─────────────────────────────────────────────────────────────
export const WK2026Wedstrijden: React.FC = () => {

  React.useEffect(() => {
    document.title = 'WK 2026 Live Kijken — Alle Wedstrijden & Uitzendingen | IPTVTotaal';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Kijk alle WK 2026 wedstrijden live via IPTVTotaal. Oranje, Brazilië, Mexico en meer — HD livestream op elk apparaat. Bestel het Premium VIP pakket voor €78.');
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel','canonical'); document.head.appendChild(canonical); }
    canonical.setAttribute('href', `${window.location.origin}/wk-2026-live-kijken`);
    return () => {
      document.title = 'IPTVTotaal';
      if (metaDesc) metaDesc.setAttribute('content','');
      canonical.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-widest mb-6">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"/>
            WK 2026 · Live Uitzendingen
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-white leading-none mb-5">
            WK 2026 Live Kijken
          </h1>
          <p className="text-white/50 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-3">
            Alle 104 WK 2026 wedstrijden live — inclusief Oranje, halve finales en de finale.
            HD kwaliteit op elk apparaat. Eén pakket voor het complete toernooi.
          </p>
          <p className="text-white/30 text-sm mb-8 sm:mb-10">
            Waar kijk je het WK 2026? · WK livestream · WK 2026 uitzending Nederland
          </p>
          <a href={WA} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppConversion}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black text-base sm:text-lg rounded-full hover:scale-[1.02] transition-transform shadow-xl shadow-amber-500/30">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.532 5.85L.057 23.292a.75.75 0 00.908.98l5.65-1.48A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.704 9.704 0 01-4.95-1.354l-.354-.21-3.655.957.975-3.562-.23-.368A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
            Kijk het WK 2026 via WhatsApp — €78
          </a>
        </div>

        {/* Matches */}
        <div className="space-y-12 lg:space-y-20">
          {MATCHES.map((m, idx) => (
            <div key={m.slug} className="lg:grid lg:grid-cols-2 lg:gap-12 items-start">

              {/* Card — clickable */}
              <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                <Link to={`/wk-2026-live-kijken/${m.pageSlug}`} className="block group">
                  <div className="transition-transform group-hover:scale-[1.02] duration-200">
                    <MatchCard
                      team1={m.team1} team2={m.team2} code1={m.code1} code2={m.code2}
                      matchDateISO={m.matchDateISO} kickoff={m.kickoff} venue={m.venue} group={m.group}
                    />
                  </div>
                  <div className="mt-2 text-center text-amber-400/60 text-xs font-bold uppercase tracking-widest group-hover:text-amber-400 transition-colors">
                    Klik voor volledige analyse →
                  </div>
                </Link>
              </div>

              {/* Content */}
              <div className={`mt-6 lg:mt-0 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="text-xs font-black text-amber-400 uppercase tracking-widest mb-2">{m.date}</div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter text-white leading-tight mb-3 sm:mb-4">
                  Waar kijk je {m.team1} vs {m.team2} live?
                </h2>
                <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-5 sm:mb-6">{m.watchText}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {m.keywords.map(kw => (
                    <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 font-medium">{kw}</span>
                  ))}
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    `Live stream ${m.team1} – ${m.team2} in HD`,
                    'Geen buffering, geen onderbrekingen',
                    'Kijk op Smart TV, telefoon, tablet of laptop',
                    '80.000+ zenders in één pakket',
                    'Binnen 5 minuten actief via WhatsApp',
                  ].map(pt => (
                    <li key={pt} className="flex items-start gap-3 text-white/70">
                      <svg className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      {pt}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={WA} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppConversion}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black rounded-full hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20 text-sm no-underline">
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.532 5.85L.057 23.292a.75.75 0 00.908.98l5.65-1.48A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.704 9.704 0 01-4.95-1.354l-.354-.21-3.655.957.975-3.562-.23-.368A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
                    Nu Activeren — €78
                  </a>
                  <Link to={`/wk-2026-live-kijken/${m.pageSlug}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 border border-white/20 text-white/70 font-bold rounded-full hover:border-amber-400/50 hover:text-white transition-colors text-sm no-underline">
                    Volledige analyse →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-white mb-3">Kijk alle 104 WK-duels live</h2>
            <p className="text-white/40">Één pakket. Elk apparaat. Geen verborgen kosten.</p>
          </div>
          <PackCta />
        </div>

      </div>
    </div>
  );
};
