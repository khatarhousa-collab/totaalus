import React, { createContext, useContext, useEffect, useState } from 'react';

export const FALLBACK_WHATSAPP_NUMBER = '447449708976';

const WhatsAppContext = createContext<string>(FALLBACK_WHATSAPP_NUMBER);

export const WhatsAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [number, setNumber] = useState(FALLBACK_WHATSAPP_NUMBER);

  useEffect(() => {
    fetch('/api/config')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.whatsappNumber) setNumber(data.whatsappNumber);
      })
      .catch(() => {
        // Keep the fallback number on any failure.
      });
  }, []);

  return <WhatsAppContext.Provider value={number}>{children}</WhatsAppContext.Provider>;
};

export const useWhatsAppNumber = (): string => useContext(WhatsAppContext);

export const buildWhatsAppLink = (number: string, message?: string): string =>
  `https://api.whatsapp.com/send/?phone=${number}&text=${message ? encodeURIComponent(message) : ''}&type=phone_number&app_absent=0`;

export const buildWaMeLink = (number: string, message?: string): string =>
  message ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : `https://wa.me/${number}`;

export const buildTelLink = (number: string): string => `tel:+${number}`;
