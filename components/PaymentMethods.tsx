
import React from 'react';

const PayPalIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 21H4a1 1 0 0 1-1-1.1L5.5 3.6A1 1 0 0 1 6.5 3H13c2.5 0 4.5 1.5 4.5 4 0 3.5-3 5-5.5 5H9.5L8.5 18H7z"/>
    <path d="M10 3h4c2.5 0 4.5 1.5 4.5 4 0 3.5-2.5 5-5 5"/>
  </svg>
);

const VisaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/>
    <path d="M2 10h20"/>
    <path d="M7 15h2"/>
    <path d="M12 15h4"/>
  </svg>
);

const MastercardIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="12" r="6"/>
    <circle cx="15" cy="12" r="6"/>
  </svg>
);

const IdealIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3"/>
    <circle cx="12" cy="9" r="3"/>
    <path d="M9 14h6v4H9z"/>
  </svg>
);

const BankTransferIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18"/>
    <path d="M3 10h18"/>
    <path d="M12 3l9 7H3l9-7z"/>
    <path d="M5 10v8"/>
    <path d="M9 10v8"/>
    <path d="M15 10v8"/>
    <path d="M19 10v8"/>
  </svg>
);

const KlarnaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4v16"/>
    <path d="M14 4c0 3.5-1.5 6.8-4 9l5.5 7"/>
    <circle cx="18" cy="18" r="2"/>
  </svg>
);

const PAYMENT_METHODS = [
  { name: 'PayPal', icon: <PayPalIcon /> },
  { name: 'Visa', icon: <VisaIcon /> },
  { name: 'Mastercard', icon: <MastercardIcon /> },
  { name: 'iDEAL', icon: <IdealIcon /> },
  { name: 'Bankoverschrijving', icon: <BankTransferIcon /> },
  { name: 'Klarna', icon: <KlarnaIcon /> },
];

export const PaymentMethods: React.FC = () => {
  return (
    <section id="betaalmethoden" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="badge-brutal mb-6">
          Betaalmethoden
        </div>
        <h2 className="text-3xl lg:text-4xl font-black tracking-tighter text-stone-900 mb-12">
          Betaal zoals jij wilt
        </h2>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {PAYMENT_METHODS.map((method) => (
            <div
              key={method.name}
              className="glass-card card-brutal-hover rounded-[28px] py-6 flex flex-col items-center gap-4 transition-all duration-500 group cursor-default aspect-square max-h-[160px]"
            >
              <div className="w-14 h-14 bg-amber-600 rounded-2xl border-2 border-black flex items-center justify-center text-black group-hover:scale-110 transition-transform flex-shrink-0">
                {method.icon}
              </div>
              <span className="text-xs font-bold tracking-tight text-center text-stone-900/80">{method.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
