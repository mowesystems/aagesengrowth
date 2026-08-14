import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import LegalPage from '@/components/LegalPage';
import company from '@/config/company';

const contactLine = company.email ? (
  <a href={`mailto:${company.email}`} className="underline underline-offset-4 hover:text-paper">
    {company.email}
  </a>
) : (
  <Link to="/kontakt" className="underline underline-offset-4 hover:text-paper">
    kontaktformularen
  </Link>
);

const Privacy: React.FC = () => (
  <>
    <SEOHead
      title="Privatlivspolitik"
      description="Sådan behandler Aagesen Growth ApS personoplysninger fra kontaktformularen, i overensstemmelse med GDPR."
      canonical="/privatlivspolitik"
    />

    <LegalPage
      eyebrow="Juridisk"
      title="Privatlivspolitik"
      lead="Hvilke oplysninger vi modtager, hvad de bruges til, og hvad I kan kræve."
      notice="Denne tekst er en skabelon og skal gennemgås af en jurist inden lancering."
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
              <p>
                Website-tjekket på forsiden sender ikke noget af sig selv. Oplysningerne derfra
                behandles først, hvis I selv vælger at sende dem som en henvendelse.
              </p>
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

export default Privacy;
