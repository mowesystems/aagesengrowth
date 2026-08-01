import React from 'react';
import SEOHead from '@/components/SEOHead';
import Reveal from '@/components/ui/Reveal';
import company from '@/config/company';

const Privacy: React.FC = () => (
  <>
    <SEOHead
      title="Privatlivspolitik"
      description="Privatlivspolitik for Aagesen Growth ApS — behandling af personoplysninger i overensstemmelse med GDPR."
      canonical="/privatlivspolitik"
    />
    <section className="bg-navy text-off-white pt-32 pb-16 lg:pt-40 lg:pb-20 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="relative max-w-content mx-auto px-6 lg:px-10">
        <Reveal><h1 className="font-serif text-display text-off-white">Privatlivspolitik</h1></Reveal>
      </div>
    </section>

    <section className="bg-bg-light py-22 lg:py-30">
      <div className="max-w-prose mx-auto px-6 lg:px-10 space-y-12">
        <Reveal>
          <div className="p-6 bg-off-white border border-accent/30">
            <p className="text-sm text-muted leading-relaxed">
              Bemærk: Denne tekst er en skabelon og skal gennemgås af en jurist inden lancering.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <h2 className="font-serif text-2xl text-navy mb-3">1. Ansvarlig</h2>
          <p className="text-muted leading-relaxed">
            {company.legalName} ({company.brandName}) er dataansvarlig for behandlingen af personoplysninger på denne hjemmeside.
          </p>
        </Reveal>
        <Reveal>
          <h2 className="font-serif text-2xl text-navy mb-3">2. Hvilke oplysninger</h2>
          <p className="text-muted leading-relaxed mb-4">Når du udfylder kontaktformularen, behandler vi:</p>
          <ul className="space-y-1.5 text-muted leading-relaxed">
            <li>Navn, virksomhed, e-mail, hjemmeside</li>
            <li>Besked og valgt ydelsesområde</li>
          </ul>
        </Reveal>
        <Reveal>
          <h2 className="font-serif text-2xl text-navy mb-3">3. Formål</h2>
          <p className="text-muted leading-relaxed">
            Oplysningerne bruges til at besvare din henvendelse og vurdere et evt. samarbejde. Slettes, når de ikke længere er nødvendige.
          </p>
        </Reveal>
        <Reveal>
          <h2 className="font-serif text-2xl text-navy mb-3">4. Dine rettigheder</h2>
          <p className="text-muted leading-relaxed mb-4">Efter GDPR har du ret til indsigt, rettelse, sletning og indsigelse.</p>
        </Reveal>
        <Reveal>
          <h2 className="font-serif text-2xl text-navy mb-3">5. Kontakt</h2>
          <p className="text-muted leading-relaxed">
            Spørgsmål? Skriv til {company.email || 'vores e-mail'}.
          </p>
        </Reveal>
      </div>
    </section>
  </>
);

export default Privacy;
