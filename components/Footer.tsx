
import React from 'react';

export const Footer: React.FC = () => {
  const whatsappLink = "https://api.whatsapp.com/send/?phone=447449708976&text&type=phone_number&app_absent=0";

  return (
    <footer className="bg-black text-white py-32 px-6 border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-end">
          <div className="space-y-12 text-center lg:text-left">
            <h2 className="text-4xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
              Ontdek of IPTVTotaal perfect voor jou is <span className="text-italics text-amber-400">(dat is het zeker)</span>
            </h2>
            <p className="text-xl text-white/60 max-w-md mx-auto lg:mx-0">
              Plan een onmiddellijk WhatsApp gesprek over IPTVTotaal en ontdek alle mogelijkheden.
            </p>
            <div className="space-y-4">
              <div className="text-sm font-bold uppercase tracking-widest text-amber-500/60">Gevestigd in</div>
              <div className="text-2xl font-bold">Nederland</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-12 rounded-[48px] text-white border border-amber-900/30">
            <div className="space-y-8">
              <div className="p-6 bg-black/50 rounded-3xl border border-amber-900/20">
                <p className="text-sm font-medium leading-relaxed text-white/80">
                  IPTVTotaal helpt duizenden klanten met premium IPTV. Voor snelle service, WhatsApp ons voor een reactie binnen 5 minuten, bel <a href="tel:+447449708976" className="text-amber-400 font-bold hover:underline">+44 7449 708976</a> of mail <a href="mailto:info@pandoriptv.nl" className="text-amber-400 font-bold hover:underline">info@pandoriptv.nl</a>.
                </p>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-8 bg-gradient-to-r from-amber-500 to-yellow-600 text-black rounded-[32px] font-black text-2xl hover:scale-[1.02] transition-transform block text-center shadow-lg shadow-amber-500/20"
              >
                WhatsApp Ons Nu
              </a>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-amber-900/20 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-sm flex items-center justify-center">
              <div className="w-4 h-4 bg-black rotate-45"></div>
            </div>
            <span className="text-xl font-extrabold tracking-tighter">IPTVTotaal</span>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-8 text-sm font-bold opacity-60">
            <a href="#/algemene-voorwaarden" className="hover:opacity-100 transition-opacity">Algemene voorwaarden</a>
            <a href="#/privacybeleid" className="hover:opacity-100 transition-opacity">Privacybeleid</a>
            <a href="mailto:info@pandoriptv.nl" className="hover:opacity-100 transition-opacity">info@pandoriptv.nl</a>
            <a href="tel:+447449708976" className="hover:opacity-100 transition-opacity">+44 7449 708976</a>
          </div>
          
          <div className="text-sm opacity-40">
            © 2026 IPTVTotaal. Alle rechten voorbehouden.
          </div>
        </div>
      </div>
    </footer>
  );
};
