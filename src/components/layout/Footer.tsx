import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram } from 'lucide-react';
import company from '@/config/company';
import Button from '@/components/ui/Button';
import BrandLogo from '@/components/BrandLogo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-off-white">
      <div className="max-w-content mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" aria-label="Aagesen Growth — forsiden">
              <BrandLogo light className="h-12 w-auto max-w-[13rem] mb-5" />
            </Link>
            <p className="text-sm text-off-white/50 leading-relaxed max-w-xs mb-6">
              {company.footerDescription}
            </p>
            <Button booking size="sm" variant="light">Book et møde</Button>
            <div className="flex gap-4 mt-6">
              {company.linkedinUrl && (
                <a href={company.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex min-h-11 min-w-11 items-center justify-center border border-off-white/15 text-off-white/60 hover:text-off-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                  <Linkedin size={18} />
                </a>
              )}
              {company.instagramUrl && (
                <a href={company.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex min-h-11 min-w-11 items-center justify-center border border-off-white/15 text-off-white/60 hover:text-off-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                  <Instagram size={18} />
                </a>
              )}
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

        <div className="border-t border-off-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-off-white/50">© {new Date().getFullYear()} Aagesen Growth</p>
          <p className="text-xs text-off-white/50 whitespace-normal sm:text-right">{company.legalFootnote}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
