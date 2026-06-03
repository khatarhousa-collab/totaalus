
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import { Channels } from './components/Channels';
import { ResellerPacks } from './components/ResellerPacks';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { OverOns } from './components/OverOns';
import { Blog } from './components/Blog';
import { WK2026 } from './components/WK2026';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const HomePage: React.FC = () => {
  const { pathname } = useLocation();

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
        <Route path="/blog" element={<main><Blog /></main>} />
        <Route path="/kanalen" element={<main><Channels /></main>} />
        <Route path="/reseller" element={<main><ResellerPacks /></main>} />
        <Route path="/over-ons" element={<main><OverOns /></main>} />
        <Route path="/algemene-voorwaarden" element={<main><AlgemeneVoorwaarden /></main>} />
        <Route path="/privacybeleid" element={<main><Privacybeleid /></main>} />
        <Route path="/wereldkampioenschap-voetbal-2026" element={<main><WK2026 /></main>} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
