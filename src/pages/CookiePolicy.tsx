import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import LegalPage from '@/components/LegalPage';
import { resetCookieConsent } from '@/lib/cookieConsent';
import company from '@/config/company';
import { useLocale } from '@/i18n/useLocale';

/** Lets a visitor withdraw consent, which is the half of consent that is easy to forget. */
const ConsentReset: React.FC = () => {
  const { t } = useLocale();
  const l = t.legal;
  const [done, setDone] = useState(false);

  return (
    <div className="border-l-2 border-brand bg-paper-3 p-6 sm:p-7">
      <p className="meta">{l.changeChoice}</p>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{l.changeChoiceBody}</p>
      <button
        type="button"
        onClick={() => {
          resetCookieConsent();
          setDone(true);
        }}
        className="btn btn-outline mt-5"
      >
        {l.resetButton}
      </button>
      <p aria-live="polite" className="mt-3 text-xs text-muted">
        {done ? l.resetDone : ''}
      </p>
    </div>
  );
};

const CookiePolicy: React.FC = () => {
  const { t, path } = useLocale();
  const l = t.legal;

  const contactLine = company.email ? (
    <a href={`mailto:${company.email}`} className="link-inline">
      {company.email}
    </a>
  ) : (
    <Link to={path('booking')} className="link-inline">
      {l.contactFormFallback}
    </Link>
  );

  return (
    <>
      <SEOHead title={l.cookiesTitle} description={l.cookiesDescription} />

      <LegalPage
        eyebrow={l.eyebrow}
        title={l.cookiesTitle}
        lead={l.cookiesLead}
        notice={l.templateNotice}
        footer={<ConsentReset />}
        sections={[
          {
            heading: 'Hvad er cookies',
            body: (
              <p>
                Cookies er små tekstfiler, der gemmes på din enhed, når du besøger en hjemmeside. De
                bruges blandt andet til at huske valg og til at måle, hvordan siden bliver brugt.
              </p>
            ),
          },
          {
            heading: 'Nødvendige',
            body: (
              <p>
                Altid aktive. De sikrer grundlæggende funktioner og husker dit valg i cookiebanneret.
                De kan ikke fravælges, fordi siden ikke fungerer uden dem.
              </p>
            ),
          },
          {
            heading: 'Analyse',
            body: (
              <p>
                Sættes kun, hvis du giver samtykke. De bruges til at forstå, hvordan siden bliver
                brugt, så den kan forbedres. Vælger du &laquo;afvis&raquo;, sættes de ikke.
              </p>
            ),
          },
          {
            heading: 'Dit valg',
            body: (
              <p>
                Valget gemmes lokalt i din browser og deles ikke med andre. Du kan altid trække det
                tilbage nederst på denne side eller slette cookies i din browsers indstillinger.
              </p>
            ),
          },
          {
            heading: 'Kontakt',
            body: <p>Spørgsmål om cookies? Skriv til {contactLine}.</p>,
          },
        ]}
      />
    </>
  );
};

export default CookiePolicy;
