
import React, { useState } from 'react';
import { Logo } from './Logo';

interface HeaderProps {
  isScrolled: boolean;
  hasBanner?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isScrolled, hasBanner }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { name: 'Kanalen', href: '/kanalen' },
    { name: 'Voordelen', href: '/#benefits' },
    { name: 'Prijzen', href: '/#pricing' },
    { name: 'Reseller', href: '/reseller' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Over ons', href: '/over-ons' },
    { name: 'TV Box', href: '/tv-box' },
  ];

  return (
    <>
      <nav className="fixed left-0 right-0 z-50 px-4 pt-4" style={{ top: hasBanner ? '40px' : '0px' }}>
        <div
          className={`max-w-7xl mx-auto flex justify-between items-center bg-white border-[3px] border-black rounded-full shadow-[6px_6px_0_0_#F59E0B] px-6 transition-all duration-300 ${isScrolled || isMenuOpen ? 'py-2.5' : 'py-3.5'}`}
        >
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7 text-sm font-semibold">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-stone-900 hover:text-amber-600 transition-colors">{link.name}</a>
            ))}
            <a href="/#pricing" className="btn-brutal !rounded-full px-6 py-2.5 bg-amber-500 text-black font-bold hover:opacity-90 block text-center">Bekijk prijzen</a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-stone-900 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#faf6ed] transition-transform duration-500 ease-in-out transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden pt-24 px-6`}
      >
        <div className="flex flex-col gap-8 text-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="text-3xl font-black tracking-tighter text-stone-900 hover:text-amber-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-4 pt-8">
            <a
              href="/#pricing"
              onClick={closeMenu}
              className="btn-brutal w-full py-5 rounded-3xl bg-amber-500 text-black text-xl font-bold hover:opacity-90 block text-center"
            >
              Bekijk prijzen
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
