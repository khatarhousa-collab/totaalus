
import React, { useState, useEffect } from 'react';
import { PERIOD_PLANS, BASIS_FEATURES, PREMIUM_FEATURES } from '../constants';

const SmallPauseIcon = () => (
  <svg viewBox="0 0 100 100" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
    <line x1="35" y1="25" x2="35" y2="75" />
    <line x1="65" y1="25" x2="65" y2="75" />
  </svg>
);

const SmallCheckIcon = () => (
  <svg viewBox="0 0 100 100" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 50 L45 75 L80 25" />
  </svg>
);

const DeviceIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const Pricing: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('12+3');
  const [selectedDevices, setSelectedDevices] = useState(1);
  const deviceOptions = [1, 2, 3, 4];

  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const difference = midnight.getTime() - now.getTime();
      setTimeLeft({
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentPlan = PERIOD_PLANS.find(p => p.id === selectedPeriod) || PERIOD_PLANS[0];
  const currentDevicePricing = currentPlan.devicePricing.find(dp => dp.devices === selectedDevices) || currentPlan.devicePricing[0];

  const getWhatsAppUrl = (tier: 'basis' | 'premium') => {
    const price = tier === 'basis' ? currentDevicePricing.basisPrice : currentDevicePricing.premiumPrice;
    const tierName = tier === 'basis' ? 'Basis' : 'Premium VIP';
    const deviceText = selectedDevices === 1 ? '1 apparaat' : `${selectedDevices} apparaten`;
    const message = `Hallo, ik wil graag het ${tierName}-pakket van IPTVTotaal aanschaffen voor ${currentPlan.label} voor ${deviceText} (${price}).`;
    return `https://api.whatsapp.com/send/?phone=447449708976&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
  };

  const isBestDeal = currentPlan.isBestDeal;

  return (
    <section id="pricing" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-6">
          <div className="inline-block px-4 py-1.5 bg-amber-500/15 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-widest text-amber-400">
            PRIJZEN
          </div>
          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-white">
            Eén abonnement, <span className="italic">eindeloze</span> mogelijkheden
          </h2>
        </div>

        {/* Countdown Timer */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="glass-card rounded-3xl p-8 text-center shadow-2xl border-2 border-amber-500/50">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <p className="text-sm font-black uppercase tracking-widest text-white">
                Beperkte aanbieding eindigt om middernacht
              </p>
            </div>
            <div className="flex justify-center gap-4 lg:gap-8">
              {[
                { value: timeLeft.hours, label: 'Uren' },
                { value: timeLeft.minutes, label: 'Minuten' },
                { value: timeLeft.seconds, label: 'Seconden' },
              ].map((item, i) => (
                <React.Fragment key={item.label}>
                  {i > 0 && (
                    <div className="flex items-center pb-8">
                      <span className="text-3xl lg:text-4xl font-black text-white">:</span>
                    </div>
                  )}
                  <div className="flex flex-col items-center">
                    <div className="bg-black backdrop-blur-sm rounded-2xl px-6 py-4 min-w-[100px] shadow-xl">
                      <span className="text-4xl lg:text-5xl font-black text-white tabular-nums">
                        {String(item.value).padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-white mt-3">{item.label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Period Toggle */}
        <div className="mb-10">
          <div className="glass-card rounded-3xl p-2 flex gap-2 max-w-2xl mx-auto">
            {PERIOD_PLANS.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPeriod(plan.id)}
                className={`relative flex-1 flex flex-col items-center justify-center gap-0.5 px-4 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  selectedPeriod === plan.id
                    ? plan.isBestDeal
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/40'
                      : 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {plan.isBestDeal && (
                  <span className="absolute -top-2.5 right-2 bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse shadow-lg">
                    -50%
                  </span>
                )}
                <span>{plan.label}</span>
                {plan.subtitle && (
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    selectedPeriod === plan.id ? 'text-yellow-300' : 'text-amber-400/70'
                  }`}>
                    {plan.subtitle}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Device Toggle */}
        <div className="mb-16">
          <div className="glass-card rounded-3xl p-3 grid grid-cols-2 lg:grid-cols-4 gap-2 max-w-3xl mx-auto">
            {deviceOptions.map((devices) => (
              <button
                key={devices}
                onClick={() => setSelectedDevices(devices)}
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  selectedDevices === devices
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-lg shadow-amber-500/20'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <DeviceIcon />
                {devices} {devices === 1 ? 'Apparaat' : 'Apparaten'}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Premium VIP Card */}
          <div className={`relative rounded-[32px] overflow-hidden flex flex-col group hover:scale-[1.02] transition-all duration-500 ${
            isBestDeal
              ? 'ring-2 ring-amber-500/60 shadow-[0_0_60px_rgba(168,85,247,0.4)]'
              : 'ring-1 ring-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.25)]'
          }`}
            style={{
              background: isBestDeal
                ? 'linear-gradient(135deg, rgba(88,28,135,0.6) 0%, rgba(0,0,0,0.95) 40%, rgba(59,7,100,0.5) 100%)'
                : 'linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(0,0,0,0.98) 50%, rgba(59,7,100,0.3) 100%)',
            }}
          >
            {/* Beste Deal Banner */}
            {isBestDeal && (
              <div className="flex justify-center pt-4">
                <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                  Beste Deal
                </div>
              </div>
            )}

            {/* Premium Badge */}
            <div className={`absolute ${isBestDeal ? 'top-14' : 'top-6'} left-6`}>
              <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <StarIcon />
                Premium VIP
                <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse"></span>
              </div>
            </div>

            <div className={`p-10 flex-1 flex flex-col ${isBestDeal ? 'pt-20' : 'pt-16'}`}>
              <div className="mb-8">
                <p className="text-lg lg:text-xl font-black uppercase tracking-widest mb-2 text-amber-400/80">
                  {currentPlan.label}
                </p>
                <h3 className="text-2xl lg:text-3xl font-black tracking-tighter text-white">Premium VIP Pakket</h3>
              </div>

              <div className="mb-10">
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-black tracking-tighter leading-none transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #eab308, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {currentDevicePricing.premiumPrice}
                  </span>
                </div>
                <div className="text-sm mt-2 font-medium flex items-center gap-2 text-amber-400/50">
                  <DeviceIcon />
                  {selectedDevices} {selectedDevices === 1 ? 'apparaat' : 'apparaten'} inbegrepen
                </div>
              </div>

              <div className="space-y-3 mb-10 flex-1">
                <div className="text-xs font-black uppercase tracking-widest mb-6 text-amber-500/50">Wat is inbegrepen</div>
                {PREMIUM_FEATURES.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold text-white/90">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-amber-500 to-yellow-600">
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <a
                href={getWhatsAppUrl('premium')}
                target="_blank"
                rel="noopener noreferrer"

                className="w-full py-5 text-lg font-black rounded-2xl transition-all block text-center bg-gradient-to-r from-amber-500 to-yellow-600 text-black hover:from-amber-600 hover:to-yellow-700 active:scale-95"
                style={{ boxShadow: '0 0 30px rgba(245,158,11,0.3)' }}
              >
                Word VIP Nu
              </a>
            </div>
          </div>

          {/* Basis Card */}
          <div className={`relative rounded-[32px] overflow-hidden shadow-2xl flex flex-col group hover:scale-[1.02] transition-all duration-500 ${
            isBestDeal ? 'ring-2 ring-purple-500/50' : ''
          }`}
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(6,182,212,0.10) 50%, rgba(59,130,246,0.05) 100%)',
              border: '1px solid rgba(59,130,246,0.25)',
            }}
          >
            {/* Beste Deal Banner */}
            {isBestDeal && (
              <div className="flex justify-center pt-4">
                <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                  Beste Deal
                </div>
              </div>
            )}

            {/* Badge */}
            <div className={`absolute ${isBestDeal ? 'top-14' : 'top-6'} left-6`}>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                Basis
              </div>
            </div>

            <div className={`p-10 flex-1 flex flex-col ${isBestDeal ? 'pt-20' : 'pt-16'}`}>
              <div className="mb-8">
                <p className="text-lg lg:text-xl font-black uppercase tracking-widest mb-2 text-blue-400/80">
                  {currentPlan.label}
                </p>
                <h3 className="text-2xl lg:text-3xl font-black tracking-tighter text-white">Basis Pakket</h3>
              </div>

              <div className="mb-10">
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-black tracking-tighter leading-none text-blue-400 transition-all duration-300">
                    {currentDevicePricing.basisPrice}
                  </span>
                </div>
                <div className="text-sm mt-2 font-medium flex items-center gap-2 text-blue-300/60">
                  <DeviceIcon />
                  {selectedDevices} {selectedDevices === 1 ? 'apparaat' : 'apparaten'} inbegrepen
                </div>
              </div>

              <div className="space-y-3 mb-10 flex-1">
                <div className="text-xs font-black uppercase tracking-widest mb-6 text-blue-400/50">Wat is inbegrepen</div>
                {BASIS_FEATURES.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold text-white/90">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-blue-500 to-cyan-500">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <a
                href={getWhatsAppUrl('basis')}
                target="_blank"
                rel="noopener noreferrer"

                className="w-full py-5 text-lg font-black rounded-2xl transition-all shadow-xl block text-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 active:scale-95"
              >
                Bestel Nu
              </a>
            </div>
          </div>
        </div>

        {/* Bottom info */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-xl font-black text-white">Pauzeer of annuleer op elk moment</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 text-sm font-bold text-white/60 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <SmallPauseIcon /> Pauzeer op elk moment
            </span>
            <span className="flex items-center gap-2">
              <SmallCheckIcon /> Probeer het 15 dagen
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
