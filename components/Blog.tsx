
import React, { useEffect, useState } from 'react';

const trackWhatsAppConversion = () => {
  if (typeof (window as any).gtag !== 'undefined') {
    (window as any).gtag('event', 'conversion', { 'send_to': 'AW-18174158750/7VouCIXTmLccEJ7PjtpD' });
  }
};

interface BlogPost {
  slug: string;
  date: string;
  readTime: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  content: React.ReactNode;
}

const posts: BlogPost[] = [
  {
    slug: 'iptvtotaal-app',
    date: '3 juni 2026',
    readTime: '5 min',
    category: 'Handleiding',
    title: 'IPTVTotaal App: Download & Installeer op Elk Apparaat (2026 Gids)',
    excerpt: 'De IPTVTotaal app is beschikbaar op Android, iPhone, Samsung Smart TV en Firestick. Ontdek hoe je de app downloadt, installeert en direct live tv kijkt.',
    image: 'https://images.pexels.com/photos/35490296/pexels-photo-35490296.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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

        <p>
          De <strong className="text-white">IPTVTotaal app</strong> is de snelste manier om te beginnen met IPTV kijken op elk apparaat. Of je nu een Android-smartphone, een iPhone, een Samsung Smart TV of een Amazon Firestick hebt — in deze gids leggen we stap voor stap uit hoe je de iptvtotaal app downloadt, installeert en direct live tv kijkt.
        </p>

        <img
          src="https://images.pexels.com/photos/35490296/pexels-photo-35490296.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Smart TV met streaming app en smartphone naast elkaar"
          className="w-full rounded-2xl object-cover"
          style={{ maxHeight: 420 }}
        />
        <p className="text-xs text-white/25 -mt-4">Foto: Pexels</p>

        <h3 className="text-2xl font-black text-white">Welke apparaten ondersteunen de IPTVTotaal app?</h3>
        <p>De IPTVTotaal app werkt op vrijwel elk modern apparaat:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">Android</strong> — telefoon, tablet &amp; Android TV / Google TV</li>
          <li><strong className="text-white">iPhone &amp; iPad</strong> — iOS via App Store</li>
          <li><strong className="text-white">Samsung &amp; LG Smart TV</strong> — via ingebouwde app store</li>
          <li><strong className="text-white">Amazon Firestick</strong> — via Downloader APK</li>
          <li><strong className="text-white">Windows &amp; Mac</strong> — via VLC of IPTV Smarters desktop</li>
        </ul>

        <h3 className="text-2xl font-black text-white">IPTVTotaal app downloaden op Android</h3>
        <img
          src="https://images.pexels.com/photos/5117989/pexels-photo-5117989.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Persoon met smartphone en IPTV streaming app"
          className="w-full rounded-2xl object-cover"
          style={{ maxHeight: 380 }}
        />
        <p className="text-xs text-white/25 -mt-4">Foto: Pexels</p>
        <p>
          Voor Android-gebruikers raden wij <strong className="text-white">IPTV Smarters Pro</strong> of <strong className="text-white">TiviMate</strong> aan — beide gratis te downloaden via de Google Play Store. Na installatie voer je de M3U-link of Xtream Codes in die je na activering van je IPTVTotaal abonnement per WhatsApp ontvangt. Herstart de app en je volledige kanalenlijst is direct beschikbaar.
        </p>
        <ol className="list-decimal list-inside space-y-1 ml-2">
          <li>Open de <strong className="text-white">Google Play Store</strong> op je Android-apparaat</li>
          <li>Zoek naar <em>IPTV Smarters Pro</em> of <em>TiviMate</em></li>
          <li>Installeer de app en open hem</li>
          <li>Kies <em>"Toevoegen via M3U URL"</em> en plak je persoonlijke link</li>
          <li>Klaar — alle kanalen laden automatisch in</li>
        </ol>

        <h3 className="text-2xl font-black text-white">IPTVTotaal app installeren op iPhone (iOS)</h3>
        <p>
          Op de iPhone gebruik je <strong className="text-white">GSE Smart IPTV</strong> of <strong className="text-white">IPTV Smarters Pro</strong>, beide beschikbaar in de App Store. Download de app, ga naar instellingen en voeg je M3U-abonnement of Xtream Codes toe. Binnen twee minuten kijk je live op je iPhone of iPad.
        </p>

        <h3 className="text-2xl font-black text-white">Welke IPTV app voor Samsung TV?</h3>
        <img
          src="https://images.pexels.com/photos/5202957/pexels-photo-5202957.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Persoon bedient Smart TV met afstandsbediening"
          className="w-full rounded-2xl object-cover"
          style={{ maxHeight: 380 }}
        />
        <p className="text-xs text-white/25 -mt-4">Foto: Pexels</p>
        <p>
          Voor Samsung Smart TV's gebruik je <strong className="text-white">Smart IPTV</strong> of <strong className="text-white">IPTV Smarters Pro</strong> via de Samsung Smart Hub. Op LG TV werkt <strong className="text-white">SS IPTV</strong> perfect. Voer na installatie je M3U-link in en je ontvangt direct de volledige kanalenlijst van IPTVTotaal — inclusief EPG (elektronische programmagids).
        </p>
        <ol className="list-decimal list-inside space-y-1 ml-2">
          <li>Open de <strong className="text-white">Smart Hub</strong> op je Samsung TV</li>
          <li>Zoek naar <em>Smart IPTV</em> in de app store</li>
          <li>Installeer en open de app</li>
          <li>Voer je persoonlijke M3U-link in</li>
          <li>Herstart de app — alle zenders zijn live beschikbaar</li>
        </ol>

        <h3 className="text-2xl font-black text-white">IPTVTotaal app op Amazon Firestick</h3>
        <p>
          Op de Firestick gebruik je de <strong className="text-white">Downloader-app</strong> om het APK-bestand van IPTV Smarters te installeren. Zorg dat <em>'Installatie van onbekende bronnen'</em> is ingeschakeld in de instellingen van je Firestick. Daarna werkt het precies hetzelfde als op Android: M3U-link invullen en klaar.
        </p>

        <h3 className="text-2xl font-black text-white">Functies van de IPTVTotaal app</h3>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong className="text-white">20.000+ live zenders</strong> — Nederland, Marokko, Turkije, sport, nieuws &amp; meer</li>
          <li><strong className="text-white">EPG (programmagids)</strong> — zie precies wat er op elk kanaal speelt</li>
          <li><strong className="text-white">VOD-bibliotheek</strong> — duizenden films en series on demand</li>
          <li><strong className="text-white">4K &amp; HD streams</strong> — automatisch aangepast aan je verbinding</li>
          <li><strong className="text-white">Multi-screen</strong> — kijk op meerdere apparaten tegelijk</li>
          <li><strong className="text-white">Catch-up TV</strong> — gemiste uitzendingen terugkijken</li>
        </ul>

        <img
          src="https://images.pexels.com/photos/8054847/pexels-photo-8054847.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Stel geniet samen van IPTV op de bank in de woonkamer"
          className="w-full rounded-2xl object-cover"
          style={{ maxHeight: 400 }}
        />
        <p className="text-xs text-white/25 -mt-4">Foto: Pexels</p>

        <h3 className="text-2xl font-black text-white">Veelgestelde vragen over de IPTVTotaal app</h3>

        <div className="space-y-4">
          <div>
            <p className="font-black text-white">Is de IPTVTotaal app gratis te downloaden?</p>
            <p>Ja, de app zelf (IPTV Smarters, TiviMate, GSE Smart IPTV) is gratis te downloaden. Je hebt wel een actief IPTVTotaal abonnement nodig om in te loggen en zenders te bekijken.</p>
          </div>
          <div>
            <p className="font-black text-white">Werkt de app op meerdere apparaten tegelijk?</p>
            <p>Ja — afhankelijk van je abonnement kun je op 1, 2 of meer schermen tegelijk kijken. Bekijk onze abonnementsopties voor de exacte details.</p>
          </div>
          <div>
            <p className="font-black text-white">Hoe log ik in op de IPTVTotaal app?</p>
            <p>Na activering ontvang je per WhatsApp een persoonlijke M3U-link of Xtream Codes (gebruikersnaam + wachtwoord + serveradres). Deze voer je eenmalig in de app in.</p>
          </div>
          <div>
            <p className="font-black text-white">Welke IPTV app werkt het beste op Android?</p>
            <p>TiviMate is de meest populaire keuze onder Android-gebruikers vanwege de overzichtelijke EPG en stabiele performance. IPTV Smarters Pro is een goed gratis alternatief.</p>
          </div>
        </div>

        <p>
          Heb je hulp nodig bij het instellen van de IPTVTotaal app? Neem contact op via WhatsApp — ons team helpt je binnen 5 minuten op weg, gratis en zonder gedoe.
        </p>
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
    image: 'https://images.pexels.com/photos/28549934/pexels-photo-28549934.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <p>IPTV installeren hoeft helemaal niet ingewikkeld te zijn. Of je nu een Samsung Smart TV, een LG TV, een Android TV of een Amazon Firestick hebt — in dit artikel leggen we stap voor stap uit hoe je IPTVTotaal instelt.</p>
        <h3 className="text-2xl font-black text-white">Samsung &amp; LG Smart TV</h3>
        <p>Op Samsung en LG Smart TV's gebruik je de ingebouwde Smart IPTV-app of IPTV Smarters Pro (via de app store). Na het downloaden voer je de M3U-link in die je van ons ontvangt na activering van je abonnement. Herstart de app en je kanalenlijst is direct beschikbaar.</p>
        <h3 className="text-2xl font-black text-white">Android TV &amp; Google TV</h3>
        <p>Android TV-gebruikers kunnen IPTV Smarters Pro of TiviMate downloaden vanuit de Google Play Store. Voer je persoonlijke inloggegevens of M3U-link in en je bent klaar. TiviMate biedt daarbij een overzichtelijke EPG (elektronische programmagids).</p>
        <h3 className="text-2xl font-black text-white">Amazon Firestick</h3>
        <p>Op de Firestick installeer je via de Downloader-app het APK-bestand van IPTV Smarters of gebruik je de directe installatie via de Amazon App Store. Zorg dat 'Installatie van onbekende bronnen' is ingeschakeld in de instellingen.</p>
        <h3 className="text-2xl font-black text-white">Telefoon of tablet</h3>
        <p>Download IPTV Smarters Pro of GSE Smart IPTV in de App Store of Google Play. Voeg je abonnement toe via de M3U-URL of Xtream Codes die je na aankoop per WhatsApp ontvangt.</p>
        <p>Heb je hulp nodig bij de installatie? Neem dan gerust contact op via WhatsApp — ons supportteam helpt je binnen minuten op weg.</p>
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
    image: 'https://images.pexels.com/photos/4406686/pexels-photo-4406686.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <p>Netflix is immens populair, maar steeds meer Nederlanders kiezen ook voor IPTV. Wat zijn de belangrijkste verschillen en welke optie past het beste bij jouw situatie?</p>
        <h3 className="text-2xl font-black text-white">Prijs</h3>
        <p>Netflix kost vanaf €7,99 per maand (met advertenties) tot €22,99 voor het Premium-pakket. IPTVTotaal biedt toegang tot meer dan 20.000 zenders — inclusief live sport, nieuws en films — al vanaf €12 per maand. Bij een jaarabonnement betaal je zelfs nog minder.</p>
        <h3 className="text-2xl font-black text-white">Content</h3>
        <p>Netflix heeft een groot eigen aanbod aan series en films, maar geen live tv. Met IPTV kijk je live naar de Eredivisie, Formule 1, Champions League, BBC, CNN, en duizenden andere internationale zenders. Ook series en films zijn beschikbaar via een VOD-bibliotheek.</p>
        <h3 className="text-2xl font-black text-white">Live sport</h3>
        <p>Dit is waar IPTV écht schittert. Netflix biedt geen live sport. IPTV Totaal geeft je toegang tot Ziggo Sport, ESPN, beIN Sports en tientallen andere sportzenders — live en zonder extra kosten.</p>
        <h3 className="text-2xl font-black text-white">Gebruiksgemak</h3>
        <p>Netflix is ontworpen voor gebruiksgemak en werkt op bijna elk apparaat out-of-the-box. IPTV vereist een eenmalige installatie, maar daarna is het even eenvoudig in gebruik. Ons supportteam helpt je gratis bij de setup.</p>
        <h3 className="text-2xl font-black text-white">Conclusie</h3>
        <p>Wil je alleen films en series? Dan is Netflix een prima keuze. Wil je ook live tv, sport en een enorme kanalenlijst voor een scherpe prijs? Dan is IPTVTotaal de slimmere keuze — of gebruik beide naast elkaar.</p>
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
    image: 'https://images.pexels.com/photos/5202953/pexels-photo-5202953.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <p>De markt voor IPTV-aanbieders in Nederland is groot. Er zijn tientallen aanbieders, maar de kwaliteit verschilt enorm. In dit artikel leer je precies waar je op moet letten bij het kiezen van een betrouwbare IPTV-dienst.</p>
        <h3 className="text-2xl font-black text-white">1. Uptime en stabiliteit</h3>
        <p>De belangrijkste factor is uptime. Niets is frustrerender dan een IPTV-dienst die regelmatig uitvalt — zeker tijdens live sport. IPTVTotaal garandeert 99,9% uptime, gedragen door redundante servers in meerdere datacenters.</p>
        <h3 className="text-2xl font-black text-white">2. Kanalenlijst</h3>
        <p>Let op het aantal én de kwaliteit van de kanalen. Veel aanbieders beloven duizenden zenders, maar een groot deel is dood of van slechte kwaliteit. IPTVTotaal biedt 20.000+ actieve zenders, inclusief alle Nederlandse publieke en commerciële kanalen, sport, nieuws en internationale content.</p>
        <h3 className="text-2xl font-black text-white">3. Klantenservice</h3>
        <p>Een goede IPTV-aanbieder biedt 24/7 ondersteuning. Bij technische problemen wil je snel geholpen worden. IPTVTotaal is bereikbaar via WhatsApp, dag en nacht, met een gemiddelde reactietijd van minder dan 5 minuten.</p>
        <h3 className="text-2xl font-black text-white">4. Geld-terug garantie</h3>
        <p>Serieuze aanbieders staan achter hun product. IPTVTotaal biedt een 15 dagen geld-terug garantie — zonder vragen. Zo kun je de service risicoloos uitproberen.</p>
        <h3 className="text-2xl font-black text-white">5. Prijs vs kwaliteit</h3>
        <p>De goedkoopste optie is zelden de beste. Kies voor een aanbieder die transparante prijzen hanteert zonder verborgen kosten of verplichte contracten. IPTVTotaal biedt flexibele maand- en jaarabonnementen vanaf €12/maand.</p>
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
    image: 'https://images.pexels.com/photos/17071576/pexels-photo-17071576.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <p>Voor sportliefhebbers is IPTV een absolute game-changer. Waar je vroeger dure losse sport-abonnementen nodig had, geeft IPTVTotaal je toegang tot alle grote sportzenders in één pakket.</p>
        <h3 className="text-2xl font-black text-white">Eredivisie &amp; Dutch football</h3>
        <p>Volg elke speelronde van de Eredivisie live via ESPN en Ziggo Sport. Van Ajax tot Feyenoord — mis nooit meer een goal. Ook de KNVB Beker en Europa League-duels van Nederlandse clubs zijn te volgen.</p>
        <h3 className="text-2xl font-black text-white">Formule 1</h3>
        <p>Alle Grand Prix-races live, inclusief kwalificaties en vrije trainingen. Volg Max Verstappen op Circuit Zandvoort en alle andere circuits wereldwijd via Ziggo Sport en F1 TV.</p>
        <h3 className="text-2xl font-black text-white">Champions League &amp; Premier League</h3>
        <p>Europees topvoetbal is beschikbaar via beIN Sports, CBS Sports en andere internationale sportzenders. Ook de Premier League, La Liga en Serie A zijn volledig gedekt.</p>
        <h3 className="text-2xl font-black text-white">Tennis, basketbal &amp; meer</h3>
        <p>Van Wimbledon tot Roland Garros, van NBA tot Olympische Spelen — IPTVTotaal dekt vrijwel alle grote sportevenementen ter wereld. Met meer dan 50 sportzenders in het pakket mis je niets.</p>
        <p>Wil je meer weten over het sportaanbod? Neem contact op via WhatsApp en we vertellen je precies welke zenders beschikbaar zijn in jouw regio.</p>
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
    image: 'https://images.pexels.com/photos/35898730/pexels-photo-35898730.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <p>4K IPTV levert een indrukwekkend scherp beeld — maar alleen als je setup klopt. In dit artikel lees je wat je nodig hebt voor de beste kijkervaring.</p>
        <h3 className="text-2xl font-black text-white">Internetsnelheid</h3>
        <p>Voor SD-streams volstaat 5 Mbps, voor Full HD (1080p) heb je minimaal 15 Mbps nodig, en voor 4K UHD raden we minimaal 25-30 Mbps aan. Bij meerdere gelijktijdige streams vermenigvuldig je dit. De meeste Nederlandse internet-abonnementen voldoen ruimschoots aan deze eisen.</p>
        <h3 className="text-2xl font-black text-white">Bekabeld vs. wifi</h3>
        <p>Voor de meest stabiele verbinding gebruik je een ethernetkabel in plaats van wifi. Dit elimineert interferentie en vermindert buffering aanzienlijk — zeker bij live sport in 4K.</p>
        <h3 className="text-2xl font-black text-white">Router en DNS</h3>
        <p>Gebruik een moderne router (WiFi 5 of WiFi 6) en overweeg een snellere DNS-server zoals 1.1.1.1 (Cloudflare) of 8.8.8.8 (Google) in te stellen. Dit kan de laadtijd van streams merkbaar verbeteren.</p>
        <h3 className="text-2xl font-black text-white">Apparaat-instellingen</h3>
        <p>Zet in je IPTV-app de streamingkwaliteit op 'Auto' of 'Hoog' en zorg dat hardwareversnelling is ingeschakeld. Dit verlaagt de CPU-belasting en zorgt voor vloeiendere weergave op oudere apparaten.</p>
        <p>IPTVTotaal biedt streams in SD, HD, Full HD en 4K — automatisch aangepast aan jouw verbinding. Heb je last van buffering? Ons supportteam helpt je gratis je setup te optimaliseren.</p>
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

const BlogCard: React.FC<{ post: BlogPost; onClick: () => void }> = ({ post, onClick }) => (
  <article
    onClick={onClick}
    className="group cursor-pointer"
  >
    <div className="overflow-hidden rounded-2xl mb-4 aspect-video bg-neutral-900">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="flex items-center gap-3 mb-2">
      <CategoryTag label={post.category} />
      <span className="text-xs text-white/40">{post.date}</span>
      <span className="text-xs text-white/40">· {post.readTime} lezen</span>
    </div>
    <h2 className="text-lg font-black tracking-tight text-white group-hover:text-amber-400 transition-colors leading-snug">
      {post.title}
    </h2>
  </article>
);

const BlogDetail: React.FC<{ post: BlogPost; onBack: () => void }> = ({ post, onBack }) => {
  const whatsappLink = "https://api.whatsapp.com/send/?phone=447449708976&text&type=phone_number&app_absent=0";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-0">
      <button
        onClick={onBack}
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

      <img
        src={post.image}
        alt={post.title}
        className="w-full rounded-2xl object-cover mb-10"
        style={{ maxHeight: 460 }}
      />

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
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState('Alles');

  const filtered = activeCategory === 'Alles'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);
  const popular = [...posts].slice(0, 5);

  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
    if (!selectedPost) {
      document.title = 'IPTV Blog | Tips, handleidingen & nieuws — IPTVTotaal';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', 'Lees onze IPTV handleidingen, vergelijkingen en tips. Alles wat je moet weten over IPTV in Nederland: installatie, sport, kwaliteit en meer.');
    } else {
      document.title = `${selectedPost.title} | IPTVTotaal Blog`;
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
          <BlogDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
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
                <article
                  onClick={() => setSelectedPost(featured)}
                  className="group cursor-pointer mb-14"
                >
                  <div className="overflow-hidden rounded-3xl mb-6 aspect-[16/7] bg-neutral-900">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
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
                </article>
              )}

              {/* Grid of remaining posts */}
              {rest.length > 0 && (
                <>
                  <div className="border-t border-white/10 pt-10 mb-8">
                    <h2 className="text-xs font-black text-white/30 uppercase tracking-widest">Meer artikelen</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rest.map(post => (
                      <BlogCard key={post.slug} post={post} onClick={() => setSelectedPost(post)} />
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
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="text-left group w-full"
                      >
                        <span className="text-2xl font-black text-white/10 group-hover:text-amber-500/40 transition-colors leading-none block mb-1">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors leading-snug">
                          {post.title}
                        </span>
                      </button>
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
