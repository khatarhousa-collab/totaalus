
import { FAQItem, PricingPlan, SubscriptionTier, PeriodPlan } from './types';

export const FAQS: FAQItem[] = [
  {
    question: "Hoe snel ontvang ik mijn toegang?",
    answer: "Direct na betaling ontvang je binnen 5 minuten je logingegevens via WhatsApp. Setup duurt nog eens 5 minuten. Je kunt binnen 10 minuten al kijken."
  },
  {
    question: "Hoe werkt de onboarding?",
    answer: "Abonneer op een pakket en we sturen je direct je logingegevens via WhatsApp. Dit proces duurt ongeveer 5 minuten vanaf het moment dat je betaalt. Je krijgt ook een setup-handleiding meegestuurd."
  },
  {
    question: "Is IPTV legaal in Nederland?",
    answer: "Ja, het gebruik van IPTV-diensten is legaal in Nederland. IPTVTotaal is een legitieme IPTV-aanbieder met premium infrastructuur en 24/7 support."
  },
  {
    question: "Is er een limiet op wat ik kan bekijken?",
    answer: "Nee! Met je abonnement krijg je onbeperkte toegang tot alle 65.000+ kanalen en 200.000+ films & series. Stream zoveel je wilt."
  },
  {
    question: "Hoe werkt de pauze-functie?",
    answer: "We begrijpen dat je niet altijd actief kijkt. Als je je abonnement pauzeert, wordt de factureringsperiode bevroren. Bijvoorbeeld: gebruik je 21 dagen en pauzeer je daarna, dan heb je nog 10 dagen over voor later."
  },
  {
    question: "Krijg ik een gratis proefperiode?",
    answer: "We bieden geen gratis proefperiodes aan. In plaats daarvan krijg je een 15-dagen geld-terug-garantie. Dit is beter omdat je volledige toegang hebt (niet beperkt) en meer tijd om alles grondig te testen.\n\nAls de service binnen deze 15 dagen stopt met werken en wij het probleem niet kunnen oplossen, krijg je je geld volledig terug."
  },
  {
    question: "Welke apparaten worden ondersteund?",
    answer: "IPTVTotaal werkt op vrijwel alle apparaten: Smart TV's (Samsung, LG, Sony), Fire Stick, Apple TV, Android/iOS telefoons en tablets, PC/Mac, Android TV boxes, en meer."
  },
  {
    question: "Buffert de stream?",
    answer: "Nee! We gebruiken premium servers met 99.9% uptime garantie. Geen buffering, geen lag, geen onderbrekingen. Prime kwaliteit, altijd."
  },
  {
    question: "Krijg ik Nederlandse kanalen?",
    answer: "Ja! Alle Nederlandse kanalen zijn inbegrepen: NPO 1/2/3, RTL 4/5/7/8, SBS6/9, Veronica, NET5, en meer. Plus Belgische en internationale kanalen."
  }
];

export const BASIS_FEATURES: string[] = [
  "SD/HD/FULL HD Kwaliteit",
  "+50.000 Kanalen + Netflix",
  "RTL, NPO, Ziggo, SBS, ESPN, Viaplay",
  "+140.000 Films & Series",
  "Wekelijkse Updates",
  "24/7 Support NL & BE",
  "100% Anoniem",
  "Anti-Freeze Technologie",
  "Alle Apparaten",
  "VPN Inbegrepen",
  "Exclusieve NL & BE Content",
  "Amazon, HBO, Apple TV, Hulu"
];

export const PREMIUM_FEATURES: string[] = [
  "SD/HD/FULL HD/4K/8K/HDR/VR",
  "+80.000 Kanalen + Netflix",
  "RTL, NPO, Ziggo, SBS, ESPN, Viaplay, VTM",
  "+200.000 Films & Series",
  "Dagelijkse Updates",
  "Alle Sport PPV Events",
  "VIP 24/7 Support",
  "Enterprise Anti-Freeze PRO",
  "Persoonlijke VIP Manager",
  "Alle Apparaten",
  "VPN Inbegrepen",
  "Exclusieve VIP Content",
  "Videoland, Amazon, HBO, Apple TV, Hulu"
];

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  { name: "Premium VIP", features: PREMIUM_FEATURES },
  { name: "Basis", features: BASIS_FEATURES }
];

export const PERIOD_PLANS: PeriodPlan[] = [
  {
    id: "3",
    label: "3 Maanden",
    devicePricing: [
      { devices: 1, basisPrice: "€24,99", premiumPrice: "€34,99" },
      { devices: 2, basisPrice: "€39,99", premiumPrice: "€49,99" },
      { devices: 3, basisPrice: "€49,99", premiumPrice: "€69,99" },
      { devices: 4, basisPrice: "€57,99", premiumPrice: "€89,99" }
    ]
  },
  {
    id: "6",
    label: "6 Maanden",
    devicePricing: [
      { devices: 1, basisPrice: "€34,99", premiumPrice: "€44,99" },
      { devices: 2, basisPrice: "€49,99", premiumPrice: "€79,99" },
      { devices: 3, basisPrice: "€69,99", premiumPrice: "€99,99" },
      { devices: 4, basisPrice: "€89,99", premiumPrice: "€139,99" }
    ]
  },
  {
    id: "12+3",
    label: "12+3 Maanden",
    subtitle: "Beste Deal",
    isBestDeal: true,
    devicePricing: [
      { devices: 1, basisPrice: "€69,99", premiumPrice: "€78,00" },
      { devices: 2, basisPrice: "€99,99", premiumPrice: "€124,99" },
      { devices: 3, basisPrice: "€139,99", premiumPrice: "€179,99" },
      { devices: 4, basisPrice: "€179,99", premiumPrice: "€199,99" }
    ]
  }
];

export const SERVICES = [
  "Nederlandse kanalen", "Belgische kanalen", "Sport live", "Films & Series", "Internationale kanalen", 
  "VOD", "Catch-up TV", "EPG", "Multi-screen", "99.9% uptime", "HD & 4K", "Formule 1", "Eredivisie"
];

export const CHANNEL_LOGOS = [
  { name: "ESPN", logo: "/assets/channels/espn.png" },
  { name: "Viaplay", logo: "/assets/channels/viaplay.png" },
  { name: "Ziggo Sport", logo: "/assets/channels/ziggo-sport.png" },
  { name: "Eurosport", logo: "/assets/channels/eurosport.png" },
  { name: "Sky Sports", logo: "/assets/channels/sky-sports.png" },
  { name: "DAZN", logo: "/assets/channels/dazn.png" },
  { name: "F1", logo: "/assets/channels/f1.png" }
];

export const TOP_FILMS = [
  { title: "The Odyssey", posterUrl: "/assets/posters/the-odyssey.jpg" },
  { title: "Vaiana", posterUrl: "/assets/posters/vaiana.jpg" },
  { title: "Minions & Monsters", posterUrl: "/assets/posters/minions-monsters.jpg" },
  { title: "Toy Story 5", posterUrl: "/assets/posters/toy-story-5.jpg" },
  { title: "The Invite", posterUrl: "/assets/posters/the-invite.jpg" },
  { title: "Michael", posterUrl: "/assets/posters/michael.jpg" },
  { title: "Jackass: Best and Last", posterUrl: "/assets/posters/jackass-best-and-last.jpg" },
  { title: "Jurassic Park", posterUrl: "/assets/posters/jurassic-park.jpg" },
  { title: "The Departed", posterUrl: "/assets/posters/the-departed.jpg" },
  { title: "Evil Dead Burn", posterUrl: "/assets/posters/evil-dead-burn.jpg" },
  { title: "Disclosure Day", posterUrl: "/assets/posters/disclosure-day.jpg" },
  { title: "Hokum", posterUrl: "/assets/posters/hokum.jpg" },
  { title: "Obsession", posterUrl: "/assets/posters/obsession.jpg" },
  { title: "Polis", posterUrl: "/assets/posters/polis.jpg" }
];

export const TOP_TVSHOWS_NL = [
  { title: "Mocro Maffia", posterUrl: "/assets/tvshows/mocro-maffia.jpg" },
  { title: "Gooische Vrouwen", posterUrl: "/assets/tvshows/gooische-vrouwen.jpg" },
  { title: "LOL: Last One Laughing", posterUrl: "/assets/tvshows/lol-last-one-laughing.jpg" },
  { title: "Vandaag Inside", posterUrl: "/assets/tvshows/vandaag-inside.jpg" },
  { title: "Winter Vol Liefde", posterUrl: "/assets/tvshows/winter-vol-liefde.jpg" },
  { title: "Pandora", posterUrl: "/assets/tvshows/pandora.jpg" },
  { title: "Sprekend Nederland", posterUrl: "/assets/tvshows/sprekend-nederland.jpg" },
  { title: "B&B Vol Liefde", posterUrl: "/assets/tvshows/b-b-vol-liefde.jpg" },
  { title: "Ons Kent Ons", posterUrl: "/assets/tvshows/ons-kent-ons.jpg" },
  { title: "Los Het Op", posterUrl: "/assets/tvshows/los-het-op.jpg" },
  { title: "Nederland Met Vakantie", posterUrl: "/assets/tvshows/nederland-met-vakantie.jpg" },
  { title: "Helden van Hier: Op Interventie", posterUrl: "/assets/tvshows/helden-van-hier-op-interventie.jpg" },
  { title: "Ik Weet er Alles Van", posterUrl: "/assets/tvshows/ik-weet-er-alles-van.jpg" },
  { title: "Met Vier in Bed", posterUrl: "/assets/tvshows/met-vier-in-bed.jpg" },
  { title: "Vera", posterUrl: "/assets/tvshows/vera.jpg" },
  { title: "Endeavour", posterUrl: "/assets/tvshows/endeavour.jpg" },
  { title: "FBI", posterUrl: "/assets/tvshows/fbi.jpg" },
  { title: "Matlock", posterUrl: "/assets/tvshows/matlock.jpg" },
  { title: "Ambulance UK", posterUrl: "/assets/tvshows/ambulance-uk.jpg" },
  { title: "Kitchen Nightmares", posterUrl: "/assets/tvshows/kitchen-nightmares.jpg" },
  { title: "Undercover Boss USA", posterUrl: "/assets/tvshows/undercover-boss-usa.jpg" },
  { title: "America's Got Talent", posterUrl: "/assets/tvshows/america-s-got-talent.jpg" },
  { title: "Lego Masters Australië", posterUrl: "/assets/tvshows/lego-masters-australie.jpg" },
  { title: "Duck Dynasty: The Revival", posterUrl: "/assets/tvshows/duck-dynasty-the-revival.jpg" },
  { title: "Beauty and the Billionaire", posterUrl: "/assets/tvshows/beauty-and-the-billionaire.jpg" },
  { title: "The Bold: Classics Special", posterUrl: "/assets/tvshows/the-bold-classics-special.jpg" },
  { title: "My Boyfriend, My Rapist: The Secret Footage", posterUrl: "/assets/tvshows/my-boyfriend-my-rapist-the-secret-footage.jpg" }
];

export const TOP_TVSHOWS_INTL = [
  { title: "Breaking Bad", posterUrl: "/assets/tvshows-intl/breaking-bad.jpg" },
  { title: "Reacher", posterUrl: "/assets/tvshows-intl/reacher.jpg" },
  { title: "NCIS", posterUrl: "/assets/tvshows-intl/ncis.jpg" },
  { title: "Law & Order", posterUrl: "/assets/tvshows-intl/law-order.jpg" },
  { title: "Law & Order: SVU", posterUrl: "/assets/tvshows-intl/law-order-special-victims-unit.jpg" },
  { title: "The Rookie", posterUrl: "/assets/tvshows-intl/the-rookie.jpg" },
  { title: "The Good Doctor", posterUrl: "/assets/tvshows-intl/the-good-doctor.jpg" },
  { title: "The Mentalist", posterUrl: "/assets/tvshows-intl/the-mentalist.jpg" },
  { title: "House", posterUrl: "/assets/tvshows-intl/house.jpg" },
  { title: "Supernatural", posterUrl: "/assets/tvshows-intl/supernatural.jpg" },
  { title: "Shameless", posterUrl: "/assets/tvshows-intl/shameless.jpg" },
  { title: "Rick and Morty", posterUrl: "/assets/tvshows-intl/rick-and-morty.jpg" },
  { title: "From", posterUrl: "/assets/tvshows-intl/from.jpg" },
  { title: "Sesame Street", posterUrl: "/assets/tvshows-intl/sesame-street.jpg" },
  { title: "Miraculous: Ladybug & Cat Noir", posterUrl: "/assets/tvshows-intl/miraculous-tales-of-ladybug-cat-noir.jpg" },
  { title: "Mushoku Tensei", posterUrl: "/assets/tvshows-intl/mushoku-tensei-jobless-reincarnation.jpg" },
  { title: "Agent Kim: Reactivated", posterUrl: "/assets/tvshows-intl/agent-kim-reactivated.jpg" },
  { title: "C.I.D.", posterUrl: "/assets/tvshows-intl/c-i-d.jpg" },
  { title: "Raw", posterUrl: "/assets/tvshows-intl/raw.jpg" },
  { title: "Sister-in-Law Is at Home", posterUrl: "/assets/tvshows-intl/sister-in-law-is-at-home.jpg" }
];
