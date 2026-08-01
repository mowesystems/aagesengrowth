import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import BrandLogo from '@/components/BrandLogo';

const navLinks = [
  { label: 'Ydelser', href: '/ydelser' },
  { label: 'Projekter', href: '/projekter' },
  { label: 'Om', href: '/om' },
  { label: 'Kontakt', href: '/kontakt' },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(href + '/');

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 border-b border-navy/10 bg-bg-light/95 backdrop-blur-md"
      >
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20 lg:h-[5.5rem]">
            {/* Logo — prominent */}
            <Link
              to="/"
              className="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              aria-label="Aagesen Growth — forsiden"
            >
              <BrandLogo className="h-11 w-auto max-w-[12rem] lg:h-14 lg:max-w-[13.5rem]" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-10" aria-label="Primær navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-sans font-medium transition-colors duration-150 relative group ${
                    isActive(link.href) ? 'text-navy' : 'text-muted hover:text-navy'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                      isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:block">
              <Button booking size="sm">Book et møde</Button>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden inline-flex min-h-11 min-w-11 items-center justify-center text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Luk menu' : 'Åbn menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-navy flex flex-col justify-center px-6 animate-fade-in">
          <nav aria-label="Mobil navigation" className="space-y-2">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block font-serif text-4xl py-3 border-b border-off-white/10 hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${isActive(link.href) ? 'text-accent' : 'text-off-white'}`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-10">
            <Button booking size="lg" variant="light" className="w-full">
              Book et møde
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
