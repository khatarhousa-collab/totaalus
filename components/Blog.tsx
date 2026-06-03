
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

        <p>Je wil IPTV kijken. Maar welke app moet je installeren? En hoe werkt het precies?</p>
        <p>Geen zorgen. We leggen het gewoon uit.</p>

        <img
          src="https://images.pexels.com/photos/35490296/pexels-photo-35490296.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
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
          src="https://images.pexels.com/photos/5117989/pexels-photo-5117989.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
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
          src="https://images.pexels.com/photos/5202957/pexels-photo-5202957.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
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
          <li><strong className="text-white">20.000+ live zenders</strong> — Nederland, Marokko, Turkije, sport, nieuws &amp; meer</li>
          <li><strong className="text-white">EPG</strong> — zie precies wat er speelt op elk kanaal</li>
          <li><strong className="text-white">VOD</strong> — films en series on demand</li>
          <li><strong className="text-white">4K &amp; HD</strong> — automatisch aangepast aan je verbinding</li>
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
    image: 'https://images.pexels.com/photos/28549934/pexels-photo-28549934.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    image: 'https://images.pexels.com/photos/4406686/pexels-photo-4406686.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <p>Netflix of IPTV? Je betaalt voor allebei. Maar je krijgt niet hetzelfde.</p>
        <h3 className="text-2xl font-black text-white">Prijs.</h3>
        <p>Netflix begint bij €7,99 per maand. Voor het Premium-pakket betaal je €22,99.</p>
        <p>IPTVTotaal kost vanaf €12 per maand. Daarvoor krijg je 20.000+ zenders — inclusief live sport, nieuws en films.</p>
        <h3 className="text-2xl font-black text-white">Wat je krijgt.</h3>
        <p>Netflix heeft sterke eigen series en films. Maar geen live tv.</p>
        <p>Met IPTVTotaal kijk je live naar de Eredivisie, Formule 1, Champions League, BBC en CNN. De VOD-bibliotheek met films en series is er ook gewoon bij.</p>
        <h3 className="text-2xl font-black text-white">Live sport — dit is waar Netflix het niet haalt.</h3>
        <p>Netflix heeft geen sportzenders. Geen live uitzendingen. Geen Eredivisie, geen Grand Prix.</p>
        <p>IPTVTotaal geeft je Ziggo Sport, ESPN, beIN Sports en 50+ andere sportzenders. Live, zonder extra abonnement.</p>
        <h3 className="text-2xl font-black text-white">Gebruiksgemak.</h3>
        <p>Netflix werkt overal meteen. Geen installatie nodig.</p>
        <p>IPTV vraagt een eenmalige setup van 5 minuten. Daarna werkt het net zo makkelijk — en wij helpen je gratis bij de installatie.</p>
        <h3 className="text-2xl font-black text-white">Wat moet je kiezen?</h3>
        <p>Alleen films en series? Netflix is prima.</p>
        <p>Wil je ook live tv, sport en 20.000+ zenders? Dan is IPTVTotaal de slimmere keuze. Veel van onze klanten gebruiken gewoon allebei naast elkaar.</p>
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
        <p>Er zijn tientallen IPTV-aanbieders in Nederland. De meeste zijn het niet waard. Hier is waar je op let.</p>
        <h3 className="text-2xl font-black text-white">1. Uptime.</h3>
        <p>Niets is irritanter dan een zender die wegvalt tijdens de wedstrijd. Kies een aanbieder die 99,9% uptime garandeert.</p>
        <p>IPTVTotaal doet dat — met redundante servers in meerdere datacenters. Als ergens iets misgaat, schakel je automatisch over.</p>
        <h3 className="text-2xl font-black text-white">2. Een kanalenlijst die werkt.</h3>
        <p>Veel aanbieders beloven duizenden zenders. Een groot deel daarvan werkt niet, of is van slechte kwaliteit.</p>
        <p>IPTVTotaal biedt 20.000+ actieve zenders — alle Nederlandse publieke en commerciële kanalen, sport, nieuws en internationale content.</p>
        <h3 className="text-2xl font-black text-white">3. Support die er echt is.</h3>
        <p>Als er iets misgaat, wil je snel geholpen worden. Niet morgen. Nu.</p>
        <p>IPTVTotaal is 24/7 bereikbaar via WhatsApp. Gemiddelde reactietijd: minder dan 5 minuten.</p>
        <h3 className="text-2xl font-black text-white">4. Geld-terug garantie.</h3>
        <p>Een aanbieder die achter zijn product staat, geeft je de tijd om het te proberen.</p>
        <p>IPTVTotaal biedt 15 dagen geld-terug. Geen vragen. Geen gedoe.</p>
        <h3 className="text-2xl font-black text-white">5. Eerlijke prijs.</h3>
        <p>De goedkoopste optie is zelden de beste. Kijk naar wat je krijgt voor je geld.</p>
        <p>IPTVTotaal biedt maand- en jaarabonnementen vanaf €12 per maand. Geen verborgen kosten, geen verplicht contract.</p>
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
    image: 'https://images.pexels.com/photos/17071576/pexels-photo-17071576.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    image: 'https://images.pexels.com/photos/35898730/pexels-photo-35898730.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
