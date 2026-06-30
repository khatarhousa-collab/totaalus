
import React, { useState } from 'react';
import { FAQS } from '../constants';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b border-amber-900/20 py-8 px-6 transition-all duration-300 rounded-3xl ${isOpen ? 'glass-card mb-4 mt-4 shadow-xl' : ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className={`text-2xl font-black tracking-tight pr-8 transition-colors ${isOpen ? 'text-amber-400' : 'text-white'}`}>{question}</span>
        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${isOpen ? 'bg-amber-500 border-amber-500 text-black rotate-180' : 'bg-transparent border-white/30 text-white'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[500px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-white/70 text-lg font-medium leading-relaxed whitespace-pre-line">{answer}</p>
      </div>
    </div>
  );
};

const TvBoxFAQItem: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`relative py-8 px-6 transition-all duration-300 rounded-3xl mb-4 ${isOpen ? 'shadow-[0_0_40px_rgba(245,158,11,0.2)]' : 'shadow-[0_0_20px_rgba(245,158,11,0.1)]'}`}
      style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(0,0,0,0.4) 100%)', border: '1px solid rgba(245,158,11,0.35)' }}
    >
      {/* NEW badge */}
      <span className="absolute -top-3 left-6 bg-gradient-to-r from-amber-500 to-yellow-600 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
        Nieuw
      </span>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className={`text-2xl font-black tracking-tight pr-8 transition-colors ${isOpen ? 'text-amber-400' : 'text-amber-300'}`}>
          Kan ik het abonnement gebruiken zonder kastje?
        </span>
        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${isOpen ? 'bg-amber-500 border-amber-500 text-black rotate-180' : 'border-amber-500/60 text-amber-400'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[500px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-white/70 text-lg font-medium leading-relaxed mb-5">
          Ja zeker! Als je al een smart tv, telefoon, tablet of computer hebt, werkt ons abonnement daar gewoon op. Heb je geen smart tv? Geen probleem — wij bieden ook een kant-en-klaar kastje aan dat al geconfigureerd is met het abonnement inbegrepen. Gewoon aansluiten en genieten.
        </p>
        <a
          href="/tv-box"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-black text-sm hover:opacity-90 active:scale-95 transition-all"
        >
          Bekijk ons TV kastje aanbod
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-32 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
        <div className="text-center lg:text-left">
          <h2 className="text-5xl lg:text-6xl font-black tracking-tighter lg:sticky top-40 text-white leading-tight">
            Veelgestelde <br/><span className="text-italics underline decoration-amber-500 decoration-4 underline-offset-8">vragen</span>
          </h2>
        </div>
        <div className="space-y-2">
          <TvBoxFAQItem />
          {FAQS.map((item, i) => (
            <FAQItem key={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};
