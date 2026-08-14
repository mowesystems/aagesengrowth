import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import BrandLogo from '@/components/BrandLogo';
import company, { hasBooking } from '@/config/company';

/** Desktop: four. FAQ stays reachable from the menu and the footer. */
const primaryNav = [
  { label: 'Cases', href: '/projekter' },
  { label: 'Ydelser', href: '/ydelser' },
  { label: 'Priser', href: '/priser' },
  { label: 'Om', href: '/om' },
];

/** Mobile: everything, because there is room for it. */
const menuNav = [
  ...primaryNav,
  { label: 'FAQ', href: '/faq' },
  { label: 'Kontakt', href: '/kontakt' },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    close();
  }, [location.pathname, location.hash, close]);

  // Lock scroll behind the panel.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // Escape closes, and Tab is trapped inside the panel while it is open.
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen, close]);

  // Move focus into the panel when it opens.
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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:border focus:border-paper focus:bg-ink-2 focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-paper"
      >
        Spring til indhold
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-header border-b transition-colors duration-300 ${
          scrolled ? 'border-paper/10 bg-ink/90 backdrop-blur-xl' : 'border-transparent bg-transparent'
        }`}
      >
        <div className="frame">
          <div className="flex h-[4.4rem] items-center justify-between gap-6 lg:h-[5.25rem]">
            <Link
              to="/"
              className="-ml-1 flex min-h-11 items-center px-1"
              aria-label="Aagesen Growth — til forsiden"
            >
              <BrandLogo size="md" className="lg:hidden" />
              <BrandLogo size="lg" className="hidden lg:inline-flex" />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primær navigation">
              {primaryNav.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`group relative inline-flex min-h-11 items-center px-4 font-sans text-[0.88rem] font-medium transition-colors ${
                      active ? 'text-paper' : 'text-muted hover:text-paper'
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`iris-rule absolute bottom-[0.65rem] left-4 h-px transition-[width] duration-300 ease-entrance ${
                        active ? 'w-[calc(100%-2rem)]' : 'w-0 group-hover:w-[calc(100%-2rem)]'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:block">
              <Button to="/#website-tjek" className="px-6">
                Få et website-tjek
                <ArrowRight size={15} aria-hidden="true" />
              </Button>
            </div>

            <button
              ref={toggleRef}
              type="button"
              className="-mr-2 inline-flex min-h-11 min-w-11 items-center justify-center gap-2.5 px-2 text-paper lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em]">
                {menuOpen ? 'Luk' : 'Menu'}
              </span>
              <span aria-hidden="true" className="flex w-5 flex-col gap-[0.3rem]">
                <span
                  className={`h-px w-full bg-current transition-transform duration-300 ${
                    menuOpen ? 'translate-y-[0.35rem] rotate-45' : ''
                  }`}
                />
                <span
                  className={`h-px w-full bg-current transition-opacity duration-200 ${
                    menuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`h-px w-full bg-current transition-transform duration-300 ${
                    menuOpen ? '-translate-y-[0.35rem] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="animate-fade-in fixed inset-0 z-menu flex flex-col overflow-y-auto bg-ink pb-10 pt-[4.4rem] lg:hidden"
        >
          <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />

          <nav aria-label="Mobil navigation" className="frame relative flex-1 pt-8">
            <ul className="rule">
              {menuNav.map((link, index) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href} className="rule-row">
                    <Link
                      to={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={`flex min-h-[3.6rem] items-baseline gap-5 py-2 font-display text-[2.35rem] leading-none transition-colors ${
                        active ? 'text-cyan' : 'text-paper'
                      }`}
                    >
                      <span className="index-mark opacity-60">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="frame relative mt-10 space-y-4">
            <Button to="/#website-tjek" size="lg" className="w-full">
              Få et website-tjek
              <ArrowRight size={16} aria-hidden="true" />
            </Button>

            {hasBooking && (
              <a
                href={company.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line"
              >
                Book en afklaring
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
