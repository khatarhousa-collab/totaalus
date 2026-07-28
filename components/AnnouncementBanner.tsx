
import React from 'react';

interface AnnouncementBannerProps {
  onClose: () => void;
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-amber-500 text-black py-2.5 px-4 border-b-[3px] border-black">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm font-bold">
        <span className="inline-flex items-center gap-2">
          <span className="hidden sm:inline">🎉</span>
          <span className="uppercase tracking-wide">Tijdelijke Actie:</span>
          <span className="bg-black text-amber-400 px-2.5 py-0.5 rounded-full text-xs font-extrabold tracking-wider">3 MAANDEN GRATIS</span>
          <span className="hidden sm:inline">bij elk abonnement</span>
        </span>
        <a
          href="#pricing"
          className="hidden sm:inline-flex items-center gap-1 bg-black text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-gray-900 transition-colors ml-2"
        >
          Bekijk aanbod
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
        </a>
        <button
          onClick={onClose}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-black/60 hover:text-black transition-colors"
          aria-label="Sluiten"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    </div>
  );
};
