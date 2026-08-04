
import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const whatsappLink = "https://api.whatsapp.com/send/?phone=447414662070&text&type=phone_number&app_absent=0";

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

          <div className="bg-neutral-950 p-12 rounded-[48px] text-white border border-amber-900/30">
            <div className="space-y-8">
              <div className="p-6 bg-black/50 rounded-3xl border border-amber-900/20">
                <p className="text-sm font-medium leading-relaxed text-white/80">
                  IPTVTotaal helpt duizenden klanten met premium IPTV. Voor snelle service, WhatsApp ons voor een reactie binnen 5 minuten of mail <a href="mailto:support@iptotaal.digital" className="text-amber-400 font-bold hover:underline">support@iptotaal.digital</a>.
                </p>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-8 bg-amber-500 text-black rounded-[32px] font-black text-2xl btn-brutal block text-center shadow-lg shadow-amber-500/20"
              >
                WhatsApp Ons Nu
              </a>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-amber-900/20 flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo dark />
          
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-8 text-sm font-bold opacity-60">
            <a href="/over-ons" className="hover:opacity-100 transition-opacity">Over ons</a>
            <a href="/algemene-voorwaarden" className="hover:opacity-100 transition-opacity">Algemene voorwaarden</a>
            <a href="/privacybeleid" className="hover:opacity-100 transition-opacity">Privacybeleid</a>
            <a href="mailto:support@iptotaal.digital" className="hover:opacity-100 transition-opacity">support@iptotaal.digital</a>
          </div>
          
          <div className="text-sm opacity-40">
            © 2026 IPTVTotaal. Alle rechten voorbehouden.
          </div>
        </div>
      </div>
    </footer>
  );
};
