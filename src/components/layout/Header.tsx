import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import BrandLogo from '@/components/BrandLogo';

const navLinks = [
  { label: 'Ydelser', href: '/ydelser' },
  { label: 'Priser', href: '/priser' },
  { label: 'Cases', href: '/projekter' },
  { label: 'Om', href: '/om' },
  { label: 'FAQ', href: '/faq' },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    close();
  }, [location.pathname, close]);

  // Lock scroll behind the mobile panel
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // Escape closes the panel and returns focus to the trigger
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen, close]);

  // Move focus into the panel when it opens
  useEffect(() => {
    if (!menuOpen) return;
    panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(`${href}/`);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:border focus:border-cream focus:bg-ink-2 focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-cream"
      >
        Spring til indhold
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
          scrolled
            ? 'border-cream/12 bg-ink/92 backdrop-blur-md'
            : 'border-transparent bg-ink'
        }`}
      >
        <div className="shell">
          <div className="flex h-[4.6rem] items-center justify-between gap-6 lg:h-[5.25rem]">
            <Link
              to="/"
              className="-ml-1 flex min-h-11 items-center px-1"
              aria-label="Aagesen Growth ApS — til forsiden"
            >
              <BrandLogo size="md" />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primær navigation">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`group relative inline-flex min-h-11 items-center px-4 font-sans text-sm font-medium transition-colors ${
                      active ? 'text-cream' : 'text-dim hover:text-cream'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-2 left-4 h-px bg-gold-ink transition-all duration-300 ease-smooth ${
                        active ? 'w-[calc(100%-2rem)]' : 'w-0 group-hover:w-[calc(100%-2rem)]'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:block">
              <Button to="/kontakt" className="px-6">
                Få et website-tjek
                <ArrowRight size={15} aria-hidden="true" />
              </Button>
            </div>

            <button
              ref={toggleRef}
              type="button"
              className="-mr-2 inline-flex min-h-11 min-w-11 items-center justify-center text-cream lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Luk menu' : 'Åbn menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="on-light fixed inset-0 z-30 flex flex-col overflow-y-auto bg-cream pb-8 pt-[4.6rem] lg:hidden animate-fade-in"
        >
          <nav aria-label="Mobil navigation" className="shell flex-1 pt-6">
            <ul className="ledger ledger-light">
              {navLinks.map((link, index) => (
                <li key={link.href} className="ledger-row">
                  <Link
                    to={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`flex min-h-14 items-baseline gap-4 py-1 font-serif text-[2rem] leading-none transition-colors ${
                      isActive(link.href) ? 'text-gold-ink' : 'text-ink hover:text-gold-ink'
                    }`}
                  >
                    <span className="meta-on-light opacity-60">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="shell mt-8 space-y-3">
            <Button to="/kontakt" variant="light" size="lg" className="w-full">
              Få et website-tjek
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button booking variant="outline-light" size="lg" className="w-full">
              Book et møde
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
