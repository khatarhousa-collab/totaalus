
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { ServicesGrid, FilmsAndShows } from './components/ServicesGrid';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Reviews } from './components/Reviews';
import { PaymentMethods } from './components/PaymentMethods';
import { Footer } from './components/Footer';
import { AlgemeneVoorwaarden } from './components/AlgemeneVoorwaarden';
import { Privacybeleid } from './components/Privacybeleid';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { OverOns } from './components/OverOns';
import { TvBox } from './components/TvBox';
import { useWhatsAppNumber, buildWhatsAppLink } from './contexts/WhatsAppContext';
import { trackWhatsAppConversion } from './components/analytics';

const ContactRedirect: React.FC = () => {
  const number = useWhatsAppNumber();
  useEffect(() => {
    trackWhatsAppConversion();
    window.location.href = buildWhatsAppLink(number);
  }, [number]);
  return null;
};

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const HomePage: React.FC = () => {
  const { pathname } = useLocation();

  // /iptvtotaal serves the same page as / for ad landing traffic; point both at / so
  // Google does not index them as duplicates.
  useEffect(() => {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${window.location.origin}/`);
    return () => canonical.remove();
  }, []);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, observerOptions);
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
    return () => revealElements.forEach(el => observer.unobserve(el));
  }, [pathname]);

  return (
    <main>
      <section className="reveal"><Hero /></section>
      <section className="reveal"><FilmsAndShows /></section>
      <section className="reveal"><Pricing /></section>
      <section className="reveal"><Benefits /></section>
      <section className="reveal"><ServicesGrid /></section>
      <section className="reveal"><Reviews /></section>
      <section className="reveal"><PaymentMethods /></section>
      <section className="reveal"><FAQ /></section>
    </main>
  );
};

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="grid-line grid-line-left"></div>
      <div className="grid-line grid-line-right"></div>

      <ScrollToTop />
      {showBanner && <AnnouncementBanner onClose={() => setShowBanner(false)} />}
      <Header isScrolled={scrollY > 50} hasBanner={showBanner} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/iptvtotaal" element={<HomePage />} />
        <Route path="/over-ons" element={<main><OverOns /></main>} />
        <Route path="/algemene-voorwaarden" element={<main><AlgemeneVoorwaarden /></main>} />
        <Route path="/privacybeleid" element={<main><Privacybeleid /></main>} />
        <Route path="/tv-box" element={<main><TvBox /></main>} />
        {/* Common misspellings of /tv-box — these were landing on an empty page. */}
        <Route path="/tvbox" element={<Navigate to="/tv-box" replace />} />
        <Route path="/tv_box" element={<Navigate to="/tv-box" replace />} />
        <Route path="/contact" element={<ContactRedirect />} />
        {/* Removed pages (reseller program, match-specific streaming landing pages). */}
        <Route path="/reseller" element={<Navigate to="/" replace />} />
        <Route path="/eredivisie-live-kijken" element={<Navigate to="/" replace />} />
        <Route path="/nederland-oezbekistan-live" element={<Navigate to="/" replace />} />
        {/* Anything unmatched previously rendered a blank page between header and footer. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
