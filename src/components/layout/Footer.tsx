import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import company from '@/config/company';
import BrandLogo from '@/components/BrandLogo';
import { homeAnchors } from '@/i18n/config';
import { useLocale } from '@/i18n/useLocale';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

const Footer: React.FC = () => {
  const { t, path } = useLocale();
  const hasContact = Boolean(company.email || company.phone);
  const hasSocial = Boolean(company.linkedinUrl || company.instagramUrl);
  const home = path('home');

  const productLinks = [
    { label: t.nav.engine, href: `${home}#${homeAnchors.engine}` },
    { label: t.nav.how, href: `${home}#${homeAnchors.how}` },
    { label: t.nav.pricing, href: `${home}#${homeAnchors.pricing}` },
    { label: t.nav.faq, href: `${home}#${homeAnchors.faq}` },
    { label: t.cta.scanShort, href: `${home}#${homeAnchors.scan}` },
  ];

  return (
    <footer className="on-dark border-t border-paper/10 bg-ink-2">
      <div className="frame">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 lg:grid-cols-12 lg:py-18">
          <div className="col-span-2 lg:col-span-5">
            <Link to={home} aria-label={t.header.home} className="inline-flex">
              <BrandLogo size="lg" light />
            </Link>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-muted-lit">{t.footer.description}</p>
            {hasSocial && (
              <div className="mt-7 flex gap-2">
                {company.linkedinUrl && (
                  <a href={company.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="Aagesen Growth — LinkedIn" className="inline-flex min-h-11 min-w-11 items-center justify-center border border-paper/15 text-paper transition-colors hover:border-brand-lit hover:text-brand-lit">
                    <Linkedin size={16} aria-hidden="true" />
                  </a>
                )}
                {company.instagramUrl && (
                  <a href={company.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Aagesen Growth — Instagram" className="inline-flex min-h-11 min-w-11 items-center justify-center border border-paper/15 text-paper transition-colors hover:border-brand-lit hover:text-brand-lit">
                    <Instagram size={16} aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            <h2 className="meta-lit">{t.footer.productHeading}</h2>
            <ul className="mt-5 space-y-1">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="inline-flex min-h-9 items-center text-sm text-muted-lit transition-colors hover:text-paper">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="meta-lit">{t.footer.companyHeading}</h2>
            <ul className="mt-5 space-y-1">
              <li>
                <Link to={path('booking')} className="inline-flex min-h-9 items-center text-sm text-muted-lit transition-colors hover:text-paper">
                  {t.nav.booking}
                </Link>
              </li>
              <li>
                <Link to={path('work')} className="inline-flex min-h-9 items-center text-sm text-muted-lit transition-colors hover:text-paper">
                  {t.nav.work}
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="meta-lit">{t.footer.contactHeading}</h2>
            {hasContact ? (
              <ul className="mt-5 space-y-1">
                {company.email && (
                  <li>
                    <a href={`mailto:${company.email}`} className="inline-flex min-h-9 items-center gap-2.5 text-sm text-muted-lit transition-colors hover:text-paper">
                      <Mail size={14} aria-hidden="true" />
                      {company.email}
                    </a>
                  </li>
                )}
                {company.phone && (
                  <li>
                    <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="inline-flex min-h-9 items-center gap-2.5 text-sm text-muted-lit transition-colors hover:text-paper">
                      <Phone size={14} aria-hidden="true" />
                      {company.phone}
                    </a>
                  </li>
                )}
              </ul>
            ) : (
              <p className="mt-5">
                <Link to={path('booking')} className="link-line link-line-lit">
                  {t.cta.bookAfklaring}
                </Link>
              </p>
            )}
            {company.address && <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-muted-lit">{company.address}</p>}
            {company.cvr && (
              <p className="meta-lit mt-4">
                {t.footer.cvr} {company.cvr}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-paper/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-lit">
            © {new Date().getFullYear()} {company.legalName}. {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link to={path('privacy')} className="inline-flex min-h-9 items-center text-xs text-muted-lit transition-colors hover:text-paper">
              {t.footer.privacy}
            </Link>
            <Link to={path('cookies')} className="inline-flex min-h-9 items-center text-xs text-muted-lit transition-colors hover:text-paper">
              {t.footer.cookies}
            </Link>
            <LanguageSwitcher light />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
