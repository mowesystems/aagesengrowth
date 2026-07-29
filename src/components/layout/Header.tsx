import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import company from '@/config/company';
import Button from '@/components/ui/Button';

const navLinks = [
  { label: 'Ydelser', href: '/ydelser' },
  { label: 'Projekter', href: '/projekter' },
  { label: 'Om', href: '/om' },
  { label: 'Kontakt', href: '/kontakt' },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-bg-light/95 backdrop-blur-md border-b border-navy/8'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo — prominent */}
            <Link
              to="/"
              className="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              aria-label="Aagesen Growth — forsiden"
            >
              <img
                src={company.logoPath}
                alt="Aagesen Growth"
                className="h-9 lg:h-11 w-auto"
                width="150"
                height="44"
              />
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
              className="lg:hidden p-2 text-navy"
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
                className="block font-serif text-4xl text-off-white py-3 border-b border-off-white/10 hover:text-accent transition-colors"
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
