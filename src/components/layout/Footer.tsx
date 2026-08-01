import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Linkedin } from 'lucide-react';
import company from '@/config/company';
import BrandLogo from '@/components/BrandLogo';

const Footer: React.FC = () => (
  <footer className="border-t border-navy/10 bg-off-white text-navy">
    <div className="max-w-content mx-auto px-6 pb-7 pt-12 lg:px-10 lg:pt-14">
      <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Link to="/" aria-label="Aagesen Growth — forsiden" className="inline-flex">
            <BrandLogo className="h-11 w-auto max-w-[12rem]" />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">{company.footerDescription}</p>
          <Link to="/book-moede" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-navy hover:text-accent">
            Book et møde <ArrowRight size={14} aria-hidden="true" />
          </Link>
          {(company.linkedinUrl || company.instagramUrl) && (
            <div className="mt-5 flex gap-2">
              {company.linkedinUrl && (
                <a href={company.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex min-h-11 min-w-11 items-center justify-center border border-navy/15 text-navy hover:text-accent">
                  <Linkedin size={17} />
                </a>
              )}
              {company.instagramUrl && (
                <a href={company.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex min-h-11 min-w-11 items-center justify-center border border-navy/15 text-navy hover:text-accent">
                  <Instagram size={17} />
                </a>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted">Ydelser</h2>
          <ul className="mt-2 text-sm">
            <li><Link to="/ydelser#websites" className="inline-flex min-h-11 items-center hover:text-accent">Websites & webshops</Link></li>
            <li><Link to="/ydelser#ads" className="inline-flex min-h-11 items-center hover:text-accent">Google Ads & Meta Ads</Link></li>
            <li><Link to="/ydelser#seo" className="inline-flex min-h-11 items-center hover:text-accent">SEO, GEO & AI-synlighed</Link></li>
            <li><Link to="/ydelser#marketing" className="inline-flex min-h-11 items-center hover:text-accent">Analyse & vækststrategi</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted">Virksomhed</h2>
          <ul className="mt-2 text-sm">
            <li><Link to="/projekter" className="inline-flex min-h-11 min-w-11 items-center hover:text-accent">Projekter</Link></li>
            <li><Link to="/om" className="inline-flex min-h-11 min-w-11 items-center hover:text-accent">Om</Link></li>
            <li><Link to="/kontakt" className="inline-flex min-h-11 min-w-11 items-center hover:text-accent">Kontakt</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted">Kontakt</h2>
          <ul className="mt-2 text-sm">
            {company.email && <li><a href={`mailto:${company.email}`} className="inline-flex min-h-11 items-center hover:text-accent">{company.email}</a></li>}
            {company.phone && <li><a href={`tel:${company.phone}`} className="inline-flex min-h-11 items-center hover:text-accent">{company.phone}</a></li>}
            {!company.email && !company.phone && <li><Link to="/kontakt" className="inline-flex min-h-11 items-center hover:text-accent">Skriv til os</Link></li>}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-navy/10 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Aagesen Growth · {company.legalName}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link to="/privatlivspolitik" className="inline-flex min-h-11 items-center hover:text-navy">Privatlivspolitik</Link>
          <Link to="/cookiepolitik" className="inline-flex min-h-11 items-center hover:text-navy">Cookiepolitik</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
