import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import Button from '@/components/base/Button';

const NAV_LINKS = [
  { label: 'Treatments', to: '/treatments' },
  { label: 'Goals', to: '/goals' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Our Standards', to: '/pharmacy-standards' },
  { label: 'Learn', to: '/learn' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-background-50 transition-shadow duration-300 ${
        scrolled ? 'border-b border-background-200 shadow-sm shadow-foreground-950/5' : 'border-b border-background-100'
      }`}
    >
      {/* Announcement bar — deep sage band */}
      <div
        className={`overflow-hidden bg-primary-900 transition-all duration-300 ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-14 opacity-100'
        }`}
      >
        <div className="mx-auto flex w-full max-w-8xl items-center justify-between gap-4 px-5 py-2.5 md:px-8">
          <p className="font-label text-[0.7rem] tracking-[0.02em] text-primary-100/90">
            <span className="font-semibold text-background-50">New</span>
            <span className="hidden sm:inline"> — physician-guided longevity programs now available</span>
            <span className="sm:hidden"> — new programs available</span>
          </p>
          <div className="flex shrink-0 items-center gap-5 font-label text-[0.7rem]">
            <Link
              to="/pharmacy-standards"
              className="hidden items-center gap-1.5 text-primary-200/90 transition-colors duration-200 hover:text-background-50 sm:inline-flex"
            >
              <i className="ri-shield-check-line text-sm leading-none" aria-hidden="true"></i>
              Our standards
            </Link>
            <Link
              to="/assessment"
              className="inline-flex items-center gap-1.5 whitespace-nowrap font-semibold text-background-50 transition-colors duration-200 hover:text-background-50/80"
            >
              Take the assessment
              <i className="ri-arrow-right-line text-sm leading-none" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Main header row */}
      <div className="mx-auto flex h-16 w-full max-w-8xl items-center justify-between px-5 md:h-[4.5rem] md:px-8">
        <div className="flex items-center gap-3">
          <Logo tone="dark" />
        </div>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-label text-[0.82rem] font-medium tracking-tight transition-colors duration-200 hover:text-foreground-950 ${
                pathname === link.to ? 'text-primary-700' : 'text-foreground-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            to="/portal"
            className="font-label text-[0.82rem] font-medium text-foreground-600 transition-colors duration-200 hover:text-foreground-950"
          >
            Sign In
          </Link>
          <Button to="/assessment" variant="primary" size="sm">
            Get Started
          </Button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <Link to="/portal" className="font-label text-[0.8rem] font-medium text-foreground-600">
            Sign In
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-background-300 text-foreground-700 transition-colors duration-200 cursor-pointer hover:border-background-400 hover:text-foreground-950"
          >
            <i className={`${menuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl leading-none`} aria-hidden="true"></i>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen ? (
        <div className="border-t border-background-200 bg-background-50 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col px-5 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="border-b border-background-200 py-3.5 font-label text-sm text-foreground-700 last:border-b-0"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/pricing" className="border-b border-background-200 py-3.5 font-label text-sm text-foreground-700">
              Pricing
            </Link>
            <Link to="/faq" className="border-b border-background-200 py-3.5 font-label text-sm text-foreground-700 last:border-b-0">
              FAQ
            </Link>
            <div className="pt-4 pb-2">
              <Button to="/assessment" variant="primary" size="md" fullWidth>
                Take the Assessment
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
