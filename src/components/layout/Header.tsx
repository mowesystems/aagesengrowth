import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import BrandLogo from '@/components/BrandLogo';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import { useLocale } from '@/i18n/useLocale';
import type { RouteKey } from '@/i18n/config';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { t, path } = useLocale();

  const close = useCallback(() => setMenuOpen(false), []);

  /**
   * Desktop keeps three destinations plus the CTA. The rest of the site is
   * reachable from the homepage's own sections and from the footer, which is
   * the point of putting the selling on one page.
   */
  const primaryNav: { label: string; key: RouteKey }[] = [
    { label: t.nav.work, key: 'work' },
    { label: t.nav.pricing, key: 'pricing' },
    { label: t.nav.faq, key: 'faq' },
  ];

  /** Mobile gets everything, because there is room for it. */
  const menuNav = [...primaryNav, { label: t.nav.contact, key: 'contact' as RouteKey }];

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

  const isActive = (key: RouteKey) => {
    const target = path(key);
    return location.pathname === target || location.pathname.startsWith(`${target}/`);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:border focus:border-ink focus:bg-paper-2 focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-ink"
      >
        {t.header.skip}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-header border-b transition-colors duration-300 ${
          scrolled
            ? 'border-ink/10 bg-paper/85 backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="frame">
          <div className="flex h-[4.4rem] items-center justify-between gap-6 lg:h-[5.5rem]">
            <Link
              to={path('home')}
              className="-ml-1 flex min-h-11 items-center px-1"
              aria-label={t.header.home}
            >
              <BrandLogo size="sm" className="lg:hidden" />
              <BrandLogo size="md" className="hidden lg:block" />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label={t.nav.services}>
              {primaryNav.map((link) => {
                const active = isActive(link.key);
                return (
                  <Link
                    key={link.key}
                    to={path(link.key)}
                    aria-current={active ? 'page' : undefined}
                    className={`group relative inline-flex min-h-11 items-center px-4 font-sans text-[0.88rem] font-medium transition-colors ${
                      active ? 'text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-[0.7rem] left-4 h-px bg-brand transition-[width] duration-300 ease-entrance ${
                        active ? 'w-[calc(100%-2rem)]' : 'w-0 group-hover:w-[calc(100%-2rem)]'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-4 lg:flex">
              <LanguageSwitcher />
              <span aria-hidden="true" className="h-4 w-px bg-ink/15" />
              <Button to={path('contact')} className="px-6">
                {t.cta.startProject}
                <ArrowRight size={15} aria-hidden="true" />
              </Button>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <LanguageSwitcher />
              <button
                ref={toggleRef}
                type="button"
                className="-mr-2 inline-flex min-h-11 min-w-11 items-center justify-center gap-2.5 px-2 text-ink"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em]">
                  {menuOpen ? t.header.close : t.header.menu}
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
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.header.menu}
          className="animate-fade-in fixed inset-0 z-menu flex flex-col overflow-y-auto bg-paper pb-10 pt-[4.4rem] lg:hidden"
        >
          <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />

          <nav aria-label={t.header.menu} className="frame relative flex-1 pt-8">
            <ul className="rule">
              {menuNav.map((link, index) => {
                const active = isActive(link.key);
                return (
                  <li key={link.key} className="rule-row">
                    <Link
                      to={path(link.key)}
                      aria-current={active ? 'page' : undefined}
                      className={`flex min-h-[3.8rem] items-baseline gap-5 py-2 font-sans text-[2.3rem] font-semibold leading-none tracking-[-0.03em] transition-colors ${
                        active ? 'text-brand' : 'text-ink'
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

          <div className="frame relative mt-10">
            <Button to={path('contact')} size="lg" className="w-full">
              {t.cta.startProject}
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
