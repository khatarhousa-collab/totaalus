
import React, { useState } from 'react';
import { FAQS } from '../constants';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b border-amber-900/20 py-8 px-6 transition-all duration-300 rounded-3xl ${isOpen ? 'glass-card mb-4 mt-4' : ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className={`text-2xl font-black tracking-tight pr-8 transition-colors ${isOpen ? 'text-amber-600' : 'text-stone-900'}`}>{question}</span>
        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${isOpen ? 'bg-amber-500 border-amber-500 text-black rotate-180' : 'bg-transparent border-stone-900/20 text-stone-900'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[500px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-stone-900/70 text-lg font-medium leading-relaxed whitespace-pre-line">{answer}</p>
      </div>
    </div>
  );
};

const TvBoxFAQItem: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`relative py-8 px-6 transition-all duration-300 rounded-3xl mb-4 border-[3px] border-amber-500/50 bg-amber-50 ${isOpen ? 'shadow-[8px_8px_0_0_rgba(245,158,11,0.35)]' : 'shadow-[6px_6px_0_0_rgba(245,158,11,0.2)]'}`}
    >
      {/* NEW badge */}
      <span className="absolute -top-3 left-6 bg-amber-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,0.5)]">
        Nieuw
      </span>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className={`text-2xl font-black tracking-tight pr-8 transition-colors ${isOpen ? 'text-amber-600' : 'text-stone-900'}`}>
          Kan ik het abonnement gebruiken zonder kastje?
        </span>
        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${isOpen ? 'bg-amber-500 border-amber-500 text-black rotate-180' : 'border-amber-500/60 text-amber-600'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[500px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-stone-900/70 text-lg font-medium leading-relaxed mb-5">
          Ja zeker! Als je al een smart tv, telefoon, tablet of computer hebt, werkt ons abonnement daar gewoon op. Heb je geen smart tv? Geen probleem — wij bieden ook een kant-en-klaar kastje aan dat al geconfigureerd is met het abonnement inbegrepen. Gewoon aansluiten en genieten.
        </p>
        <a
          href="/tv-box"
          className="btn-brutal inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-black text-sm hover:opacity-90"
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
          <h2 className="text-5xl lg:text-6xl font-black tracking-tighter lg:sticky top-40 text-stone-900 leading-tight">
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
