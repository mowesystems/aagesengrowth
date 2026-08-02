import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import company from '@/config/company';
import BrandLogo from '@/components/BrandLogo';
import services from '@/data/services';

const companyLinks = [
  { label: 'Cases', to: '/projekter' },
  { label: 'Priser', to: '/priser' },
  { label: 'Om', to: '/om' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Kontakt', to: '/kontakt' },
];

const Footer: React.FC = () => {
  const hasContact = Boolean(company.email || company.phone);
  const hasSocial = Boolean(company.linkedinUrl || company.instagramUrl);

  return (
    <footer className="on-light border-t border-cream/10 bg-cream text-ink">
      <div className="shell">
        {/* Closing call to action, carried by the footer rather than a
            near-identical band stacked above it on every page. */}
        <div className="grid grid-cols-1 items-end gap-8 border-b border-ink/15 py-14 lg:grid-cols-12 lg:py-16">
          <div className="lg:col-span-8">
            <p className="meta-on-light">Næste skridt</p>
            <h2 className="mt-5 max-w-2xl font-serif text-display text-ink text-balance">
              Fortæl hvad der ikke virker. Så siger vi, hvad vi ville gøre først.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
            <Link to="/kontakt" className="btn btn-invert btn-lg">
              Få et website-tjek
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 lg:grid-cols-12 lg:py-14">
          <div className="col-span-2 lg:col-span-4">
            <Link to="/" aria-label="Aagesen Growth ApS — til forsiden" className="inline-flex">
              <BrandLogo light size="md" />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-dim-ink">
              {company.footerDescription}
            </p>

            {hasSocial && (
              <div className="mt-6 flex gap-2">
                {company.linkedinUrl && (
                  <a
                    href={company.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Aagesen Growth på LinkedIn"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center border border-ink/20 text-ink transition-colors hover:border-gold hover:text-gold-ink"
                  >
                    <Linkedin size={16} aria-hidden="true" />
                  </a>
                )}
                {company.instagramUrl && (
                  <a
                    href={company.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Aagesen Growth på Instagram"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center border border-ink/20 text-ink transition-colors hover:border-gold hover:text-gold-ink"
                  >
                    <Instagram size={16} aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </div>

          <nav className="lg:col-span-4" aria-labelledby="footer-services">
            <h2 id="footer-services" className="meta-on-light">
              Ydelser
            </h2>
            <ul className="mt-4 grid gap-x-6 sm:grid-cols-2">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    to={service.href}
                    className="inline-flex min-h-10 items-center text-sm text-dim-ink transition-colors hover:text-ink"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-labelledby="footer-company">
            <h2 id="footer-company" className="meta-on-light">
              Virksomhed
            </h2>
            <ul className="mt-4">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex min-h-10 items-center text-sm text-dim-ink transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="meta-on-light">Kontakt</h2>
            <ul className="mt-4 space-y-1">
              {company.email && (
                <li>
                  <a
                    href={`mailto:${company.email}`}
                    className="inline-flex min-h-10 items-center gap-2 text-sm text-dim-ink transition-colors hover:text-ink"
                  >
                    <Mail size={14} aria-hidden="true" />
                    {company.email}
                  </a>
                </li>
              )}
              {company.phone && (
                <li>
                  <a
                    href={`tel:${company.phone.replace(/\s/g, '')}`}
                    className="inline-flex min-h-10 items-center gap-2 text-sm text-dim-ink transition-colors hover:text-ink"
                  >
                    <Phone size={14} aria-hidden="true" />
                    {company.phone}
                  </a>
                </li>
              )}
              {!hasContact && (
                <li>
                  <Link
                    to="/kontakt"
                    className="inline-flex min-h-10 items-center text-sm text-dim-ink transition-colors hover:text-ink"
                  >
                    Skriv til os
                  </Link>
                </li>
              )}
            </ul>

            {(company.address || company.cvr) && (
              <address className="mt-4 not-italic text-xs leading-relaxed text-ink/45">
                {company.address && <span className="block">{company.address}</span>}
                {company.cvr && <span className="block">CVR {company.cvr}</span>}
              </address>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-ink/15 py-7 text-xs text-ink/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}
          </p>
          <div className="flex flex-wrap gap-x-6">
            <Link
              to="/privatlivspolitik"
              className="inline-flex min-h-9 items-center transition-colors hover:text-ink"
            >
              Privatlivspolitik
            </Link>
            <Link
              to="/cookiepolitik"
              className="inline-flex min-h-9 items-center transition-colors hover:text-ink"
            >
              Cookiepolitik
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
