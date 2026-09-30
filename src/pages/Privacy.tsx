import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import LegalPage from '@/components/LegalPage';
import company from '@/config/company';
import { useLocale } from '@/i18n/useLocale';

/**
 * Privacy policy.
 *
 * The section headings and body stay Danish in every locale — see the note
 * on `t.legal` in the dictionary. Only the page shell (title, eyebrow, lead,
 * the "note" label and the contact fallback word) follows the reading
 * language, and non-Danish readers see a banner naming which version governs.
 */
const Privacy: React.FC = () => {
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
      <SEOHead title={l.privacyTitle} description={l.privacyDescription} />

      <LegalPage
        eyebrow={l.eyebrow}
        title={l.privacyTitle}
        lead={l.privacyLead}
        notice={l.templateNotice}
        sections={[
          {
            heading: 'Dataansvarlig',
            body: (
              <p>
                {company.legalName} er dataansvarlig for behandlingen af personoplysninger på denne
                hjemmeside.
                {company.cvr ? ` CVR ${company.cvr}.` : ''}
              </p>
            ),
          },
          {
            heading: 'Hvilke oplysninger',
            body: (
              <>
                <p>Når I udfylder kontaktformularen, behandler vi:</p>
                <ul className="space-y-1.5">
                  <li>Navn, virksomhed, e-mail og eventuel hjemmesideadresse</li>
                  <li>Beskeden og det valgte ydelsesområde</li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Formål og grundlag',
            body: (
              <p>
                Oplysningerne bruges til at besvare henvendelsen og vurdere et eventuelt samarbejde.
                Behandlingen sker på grundlag af vores legitime interesse i at kunne svare på en
                henvendelse, I selv har sendt.
              </p>
            ),
          },
          {
            heading: 'Growth Scan',
            body: (
              <p>
                Når du kører en Growth Scan, gemmer vi webadressen og resultatet af scanningen, så rapporten kan vises
                og gemmes som PDF eller billede. Scanningen bygger kun på offentligt tilgængelige oplysninger på det
                website, der scannes, og der gemmes ingen personoplysninger om dig sammen med den. Rapporten kan kun
                åbnes via det unikke link, din browser får, og vises ikke offentligt. For at forhindre misbrug tæller vi
                antallet af scanninger pr. netværk i en time; IP-adressen gemmes kun i envejskrypteret form. Skriv til
                os, hvis en rapport skal slettes.
              </p>
            ),
          },
          {
            heading: 'Opbevaring',
            body: (
              <p>
                Oplysningerne slettes, når de ikke længere er nødvendige for det formål, de blev
                indsamlet til — typisk når en dialog er afsluttet uden aftale, eller når et
                samarbejde er afsluttet og eventuelle bogføringskrav er opfyldt.
              </p>
            ),
          },
          {
            heading: 'Videregivelse',
            body: (
              <p>
                Vi sælger ikke oplysninger videre. Oplysninger kan blive behandlet af de
                leverandører, der driver hjemmesiden og vores e-mail, som databehandlere på vores
                vegne.
              </p>
            ),
          },
          {
            heading: 'Jeres rettigheder',
            body: (
              <p>
                Efter GDPR har I ret til indsigt, berigtigelse, sletning, begrænsning og indsigelse,
                samt ret til at klage til Datatilsynet. Skriv til os, hvis I vil gøre brug af dem.
              </p>
            ),
          },
          {
            heading: 'Kontakt',
            body: <p>Spørgsmål til behandlingen af oplysninger? Skriv til {contactLine}.</p>,
          },
        ]}
      />
    </>
  );
};

export default Privacy;
