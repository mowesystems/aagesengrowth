import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import { anchors, type RouteKey } from '@/i18n/config';
import { useLocale } from '@/i18n/useLocale';
import { track } from '@/lib/analytics';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * The header: mark, four page links, booking, one call to action.
 *
 * Every item is a real page, not a scroll target. The scan CTA jumps to the
 * hero scanner on the homepage and goes to the Growth Scan page everywhere
 * else. On phones it appears once the hero's own scanner has scrolled away,
 * so there is never a second scan button in the first viewport.
 */
/** A hash on the current page stays an anchor; a route goes through the router. */
const ScanLink: React.FC<
  React.PropsWithChildren<{ href: string; onClick?: () => void; className?: string } & React.AriaAttributes & { tabIndex?: number }>
> = ({ href, children, ...rest }) =>
  href.startsWith('#') ? (
    <a href={href} {...rest}>
      {children}
    </a>
  ) : (
    <Link to={href} {...rest}>
      {children}
    </Link>
  );

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

  const nav: { key: RouteKey; label: string }[] = [
    { key: 'home', label: t.nav.engine },
    { key: 'websites', label: t.nav.websites },
    { key: 'how', label: t.nav.how },
    { key: 'pricing', label: t.nav.pricing },
    { key: 'faq', label: t.nav.faq },
  ];
  const scanHref = isHome ? `#${anchors.scan}` : path('scan');
  const isCurrent = (key: RouteKey) => location.pathname === path(key);

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
          <div className="flex h-[4.2rem] items-center justify-between gap-4 lg:h-[5.25rem] xl:gap-6">
            <Link to={home} className="-ml-1 flex min-h-11 items-center px-1" aria-label={t.header.home}>
              <BrandLogo size="sm" className="lg:hidden" />
              <BrandLogo size="md" className="hidden lg:block" />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label={t.header.nav}>
              {nav.map((link) => (
                <Link
                  key={link.key}
                  to={path(link.key)}
                  aria-current={isCurrent(link.key) ? 'page' : undefined}
                  className={`group relative inline-flex min-h-11 items-center px-2.5 font-sans text-[0.88rem] font-medium xl:px-4 transition-colors hover:text-ink ${
                    isCurrent(link.key) ? 'text-ink' : 'text-muted'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-[0.7rem] left-2.5 h-px bg-brand transition-[width] duration-300 ease-entrance group-hover:w-[calc(100%-1.25rem)] xl:left-4 xl:group-hover:w-[calc(100%-2rem)] ${
                      isCurrent(link.key) ? 'w-[calc(100%-1.25rem)] xl:w-[calc(100%-2rem)]' : 'w-0'
                    }`}
                  />
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-4 lg:flex xl:gap-5">
              <Link
                to={path('booking')}
                onClick={() => track('primary_cta_clicked', { source: 'header:desktop', cta: 'book_afklaring' })}
                className="link-line text-[0.88rem] text-muted"
              >
                {t.cta.bookAfklaring}
              </Link>
              <ScanLink href={scanHref} onClick={() => onScanClick('desktop')} className="btn btn-primary px-5 xl:px-6">
                {t.cta.scanShort}
                <ArrowRight size={15} aria-hidden="true" />
              </ScanLink>
              <span aria-hidden="true" className="h-4 w-px bg-ink/15" />
              <LanguageSwitcher />
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <LanguageSwitcher className="mr-1" />
              <ScanLink
                href={scanHref}
                onClick={() => onScanClick('mobile')}
                className={`btn btn-primary min-h-10 whitespace-nowrap px-4 text-[0.8rem] transition-[opacity,transform] duration-300 ${
                  pastHero || !isHome ? 'opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
                }`}
                aria-hidden={!(pastHero || !isHome)}
                tabIndex={pastHero || !isHome ? 0 : -1}
              >
                {t.cta.scanMobile}
              </ScanLink>
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
              {[...nav, { key: 'booking' as RouteKey, label: t.nav.booking }].map((link, index) => (
                <li key={link.key} className="rule-row">
                  <Link
                    to={path(link.key)}
                    onClick={close}
                    aria-current={isCurrent(link.key) ? 'page' : undefined}
                    className="flex min-h-[3.8rem] items-baseline gap-5 py-2 font-sans text-[2.1rem] font-semibold leading-none tracking-[-0.03em] text-ink"
                  >
                    <span className="index-mark opacity-60">{String(index + 1).padStart(2, '0')}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="frame relative mt-10 space-y-3">
            <ScanLink href={scanHref} onClick={() => { close(); onScanClick('menu'); }} className="btn btn-primary btn-lg w-full">
              {t.cta.scan}
              <ArrowRight size={16} aria-hidden="true" />
            </ScanLink>
            <Link
              to={path('booking')}
              onClick={() => { close(); track('primary_cta_clicked', { source: 'header:menu', cta: 'book_afklaring' }); }}
              className="btn btn-outline btn-lg w-full"
            >
              {t.cta.bookAfklaring}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
