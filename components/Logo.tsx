import React from 'react';

const sizes = {
  sm: { mark: 'w-8 h-8', icon: 'w-3.5 h-3.5', text: 'text-lg' },
  md: { mark: 'w-9 h-9', icon: 'w-4 h-4', text: 'text-xl' },
  lg: { mark: 'w-11 h-11', icon: 'w-5 h-5', text: 'text-2xl' },
};

export const LogoMark: React.FC<{ size?: keyof typeof sizes }> = ({ size = 'md' }) => {
  const s = sizes[size];
  return (
    <div className={`${s.mark} bg-amber-500 rounded-xl border-2 border-black flex items-center justify-center flex-shrink-0`}>
      <svg viewBox="0 0 24 24" className={s.icon} fill="black">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
};

export const Logo: React.FC<{ dark?: boolean; size?: keyof typeof sizes; href?: string }> = ({ dark, size = 'md', href = '/' }) => {
  const s = sizes[size];
  return (
    <a href={href} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer">
      <LogoMark size={size} />
      <span className={`font-logo ${s.text} ${dark ? 'text-white' : 'text-stone-900'}`}>IPTVTotaal</span>
    </a>
  );
};
