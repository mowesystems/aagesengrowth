import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram } from 'lucide-react';
import company from '@/config/company';
import Button from '@/components/ui/Button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-off-white">
      <div className="max-w-content mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" aria-label="Aagesen Growth — forsiden">
              <img
                src={company.logoPath}
                alt="Aagesen Growth"
                className="h-10 w-auto mb-5 brightness-0 invert"
                width="160"
                height="40"
              />
            </Link>
            <p className="text-sm text-off-white/50 leading-relaxed max-w-xs mb-6">
              {company.footerDescription}
            </p>
            <Button booking size="sm" variant="light">Book et møde</Button>
            <div className="flex gap-4 mt-6">
              <a href={company.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-off-white/40 hover:text-off-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href={company.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-off-white/40 hover:text-off-white transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h3 className="font-sans text-xs font-medium uppercase tracking-widest text-off-white/30 mb-4">Ydelser</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Hjemmesider & webshops', href: '/ydelser#websites' },
                { label: 'Marketing & content', href: '/ydelser#marketing' },
                { label: 'Google Ads & Meta Ads', href: '/ydelser#ads' },
                { label: 'SEO, GEO & synlighed', href: '/ydelser#seo' },
              ].map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm text-off-white/50 hover:text-off-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h3 className="font-sans text-xs font-medium uppercase tracking-widest text-off-white/30 mb-4">Virksomhed</h3>
            <ul className="space-y-2.5">
              <li><Link to="/projekter" className="text-sm text-off-white/50 hover:text-off-white transition-colors">Projekter</Link></li>
              <li><Link to="/om" className="text-sm text-off-white/50 hover:text-off-white transition-colors">Om</Link></li>
              <li><Link to="/kontakt" className="text-sm text-off-white/50 hover:text-off-white transition-colors">Kontakt</Link></li>
              <li><Link to="/book-moede" className="text-sm text-off-white/50 hover:text-off-white transition-colors">Book et møde</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h3 className="font-sans text-xs font-medium uppercase tracking-widest text-off-white/30 mb-4">Kontakt</h3>
            <ul className="space-y-2.5 text-sm">
              {company.email && (
                <li><a href={`mailto:${company.email}`} className="text-off-white/50 hover:text-off-white transition-colors">{company.email}</a></li>
              )}
              {company.phone && (
                <li><a href={`tel:${company.phone}`} className="text-off-white/50 hover:text-off-white transition-colors">{company.phone}</a></li>
              )}
              {!company.email && !company.phone && (
                <li><Link to="/kontakt" className="text-off-white/50 hover:text-off-white transition-colors">Skriv til os</Link></li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-off-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex gap-5">
            <Link to="/privatlivspolitik" className="text-xs text-off-white/30 hover:text-off-white/60 transition-colors">Privatlivspolitik</Link>
            <Link to="/cookiepolitik" className="text-xs text-off-white/30 hover:text-off-white/60 transition-colors">Cookiepolitik</Link>
          </div>
          <p className="text-xs text-off-white/30">{company.legalFootnote}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
