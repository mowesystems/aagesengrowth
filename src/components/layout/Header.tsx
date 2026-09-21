import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import { homeAnchors } from '@/i18n/config';
import { useLocale } from '@/i18n/useLocale';
import { track } from '@/lib/analytics';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * The header: mark, four anchors, one call to action.
 *
 * The CTA points at the hero scanner rather than a contact page. It is
 * always visible on desktop; on phones it appears once the hero's own
 * scanner has scrolled away, so there is never a second scan button in the
 * first viewport and never a missing one after it.
 */
const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { t, path } = useLocale();

  const close = useCallback(() => setMenuOpen(false), []);
  const home = path('home');
  const isHome = location.pathname === home;
  const anchor = (id: string) => (isHome ? `#${id}` : `${home}#${id}`);

  const nav = [
    { label: t.nav.engine, href: anchor(homeAnchors.engine) },
    { label: t.nav.how, href: anchor(homeAnchors.how) },
    { label: t.nav.pricing, href: anchor(homeAnchors.pricing) },
    { label: t.nav.faq, href: anchor(homeAnchors.faq) },
  ];
  const scanHref = anchor(homeAnchors.scan);

  useEffect(() => {
    close();
  }, [location.pathname, location.hash, close]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

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
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
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

  useEffect(() => {
    if (!menuOpen) return;
    panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      setPastHero(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onScanClick = (placement: string) => track('primary_cta_clicked', { source: `header:${placement}`, cta: 'scan' });

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
          scrolled ? 'border-ink/10 bg-paper/85 backdrop-blur-xl' : 'border-transparent bg-transparent'
        }`}
      >
        <div className="frame">
          <div className="flex h-[4.2rem] items-center justify-between gap-6 lg:h-[5.25rem]">
            <Link to={home} className="-ml-1 flex min-h-11 items-center px-1" aria-label={t.header.home}>
              <BrandLogo size="sm" className="lg:hidden" />
              <BrandLogo size="md" className="hidden lg:block" />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label={t.header.nav}>
              {nav.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative inline-flex min-h-11 items-center px-4 font-sans text-[0.88rem] font-medium text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-[0.7rem] left-4 h-px w-0 bg-brand transition-[width] duration-300 ease-entrance group-hover:w-[calc(100%-2rem)]"
                  />
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-4 lg:flex">
              <a href={scanHref} onClick={() => onScanClick('desktop')} className="btn btn-primary px-6">
                {t.cta.scanShort}
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={scanHref}
                onClick={() => onScanClick('mobile')}
                className={`btn btn-primary min-h-10 whitespace-nowrap px-4 text-[0.8rem] transition-[opacity,transform] duration-300 ${
                  pastHero || !isHome ? 'opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
                }`}
                aria-hidden={!(pastHero || !isHome)}
                tabIndex={pastHero || !isHome ? 0 : -1}
              >
                {t.cta.scanMobile}
              </a>
              <button
                ref={toggleRef}
                type="button"
                className="-mr-2 inline-flex min-h-11 min-w-11 items-center justify-center gap-2.5 px-2 text-ink"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">{menuOpen ? t.header.close : t.header.menu}</span>
                <span aria-hidden="true" className="flex w-5 flex-col gap-[0.3rem]">
                  <span className={`h-px w-full bg-current transition-transform duration-300 ${menuOpen ? 'translate-y-[0.35rem] rotate-45' : ''}`} />
                  <span className={`h-px w-full bg-current transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                  <span className={`h-px w-full bg-current transition-transform duration-300 ${menuOpen ? '-translate-y-[0.35rem] -rotate-45' : ''}`} />
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
          className="animate-fade-in fixed inset-0 z-menu flex flex-col overflow-y-auto bg-paper pb-10 pt-[4.2rem] lg:hidden"
        >
          <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
          <nav aria-label={t.header.menu} className="frame relative flex-1 pt-8">
            <ul className="rule">
              {[...nav, { label: t.nav.review, href: path('review') }].map((link, index) => (
                <li key={link.href} className="rule-row">
                  {link.href.startsWith('/') && !link.href.includes('#') ? (
                    <Link to={link.href} className="flex min-h-[3.8rem] items-baseline gap-5 py-2 font-sans text-[2.1rem] font-semibold leading-none tracking-[-0.03em] text-ink">
                      <span className="index-mark opacity-60">{String(index + 1).padStart(2, '0')}</span>
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} onClick={close} className="flex min-h-[3.8rem] items-baseline gap-5 py-2 font-sans text-[2.1rem] font-semibold leading-none tracking-[-0.03em] text-ink">
                      <span className="index-mark opacity-60">{String(index + 1).padStart(2, '0')}</span>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="frame relative mt-10">
            <a href={scanHref} onClick={() => { close(); onScanClick('menu'); }} className="btn btn-primary btn-lg w-full">
              {t.cta.scan}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
