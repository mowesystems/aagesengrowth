import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import company from '@/config/company';
import BrandLogo from '@/components/BrandLogo';
import FinalCTA from '@/components/FinalCTA';
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
    <footer>
      <FinalCTA />

      <div className="border-t border-paper/10 bg-ink-2">
        <div className="frame">
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 lg:grid-cols-12 lg:py-16">
            <div className="col-span-2 lg:col-span-4">
              <Link to="/" aria-label="Aagesen Growth — til forsiden" className="inline-flex">
                <BrandLogo size="lg" />
              </Link>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
                {company.footerDescription}
              </p>

              {hasSocial && (
                <div className="mt-7 flex gap-2">
                  {company.linkedinUrl && (
                    <a
                      href={company.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Aagesen Growth på LinkedIn"
                      className="inline-flex min-h-11 min-w-11 items-center justify-center border border-paper/15 text-paper transition-colors hover:border-cyan hover:text-cyan"
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
                      className="inline-flex min-h-11 min-w-11 items-center justify-center border border-paper/15 text-paper transition-colors hover:border-cyan hover:text-cyan"
                    >
                      <Instagram size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}
            </div>

            <nav className="col-span-2 lg:col-span-4" aria-labelledby="footer-services">
              <h2 id="footer-services" className="meta">
                Ydelser
              </h2>
              <ul className="mt-5 grid gap-x-6 sm:grid-cols-2">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      to={service.href}
                      className="inline-flex min-h-10 items-center text-sm text-muted transition-colors hover:text-paper"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="lg:col-span-2" aria-labelledby="footer-company">
              <h2 id="footer-company" className="meta">
                Virksomhed
              </h2>
              <ul className="mt-5">
                {companyLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="inline-flex min-h-10 items-center text-sm text-muted transition-colors hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lg:col-span-2">
              <h2 className="meta">Kontakt</h2>
              <ul className="mt-5 space-y-1">
                {company.email && (
                  <li>
                    <a
                      href={`mailto:${company.email}`}
                      className="inline-flex min-h-10 items-center gap-2 text-sm text-muted transition-colors hover:text-paper"
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
                      className="inline-flex min-h-10 items-center gap-2 text-sm text-muted transition-colors hover:text-paper"
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
                      className="inline-flex min-h-10 items-center text-sm text-muted transition-colors hover:text-paper"
                    >
                      Skriv til os
                    </Link>
                  </li>
                )}
              </ul>

              {(company.address || company.cvr) && (
                <address className="mt-5 not-italic text-xs leading-relaxed text-muted">
                  {company.address && <span className="block">{company.address}</span>}
                  {company.cvr && <span className="block">CVR {company.cvr}</span>}
                </address>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-paper/10 py-7 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {company.legalName}
            </p>
            <div className="flex flex-wrap gap-x-7">
              <Link
                to="/privatlivspolitik"
                className="inline-flex min-h-9 items-center transition-colors hover:text-paper"
              >
                Privatlivspolitik
              </Link>
              <Link
                to="/cookiepolitik"
                className="inline-flex min-h-9 items-center transition-colors hover:text-paper"
              >
                Cookiepolitik
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
