import React from 'react';

export const WaveDivider: React.FC<{ flip?: boolean }> = ({ flip }) => (
  <div className={`wave-divider ${flip ? 'rotate-180' : ''}`} aria-hidden="true">
    <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
      <path
        d="M0,30 C150,60 350,0 600,30 C850,60 1050,0 1200,30 L1200,60 L0,60 Z"
        fill="rgba(245,158,11,0.08)"
        stroke="rgba(245,158,11,0.4)"
        strokeWidth="2"
      />
    </svg>
  </div>
);
