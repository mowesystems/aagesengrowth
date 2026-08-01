import React from 'react';
import SEOHead from '@/components/SEOHead';
import Reveal from '@/components/ui/Reveal';
import company from '@/config/company';

const CookiePolicy: React.FC = () => (
  <>
    <SEOHead
      title="Cookiepolitik"
      description="Cookiepolitik for Aagesen Growth ApS — hvilke cookies vi bruger og hvordan du ændrer indstillinger."
      canonical="/cookiepolitik"
    />
    <section className="bg-navy text-off-white pt-32 pb-16 lg:pt-40 lg:pb-20 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="relative max-w-content mx-auto px-6 lg:px-10">
        <Reveal><h1 className="font-serif text-display text-off-white">Cookiepolitik</h1></Reveal>
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
          <h2 className="font-serif text-2xl text-navy mb-3">1. Hvad er cookies</h2>
          <p className="text-muted leading-relaxed">
            Cookies er små tekstfiler, der gemmes på din enhed ved besøg på en hjemmeside.
          </p>
        </Reveal>
        <Reveal>
          <h2 className="font-serif text-2xl text-navy mb-3">2. Nødvendige cookies</h2>
          <p className="text-muted leading-relaxed">Altid aktive. Sikrer grundlæggende funktioner.</p>
        </Reveal>
        <Reveal>
          <h2 className="font-serif text-2xl text-navy mb-3">3. Analysecookies</h2>
          <p className="text-muted leading-relaxed">
            Aktiveres kun med dit samtykke. Hjælper os med at forstå brug og forbedre oplevelsen.
          </p>
        </Reveal>
        <Reveal>
          <h2 className="font-serif text-2xl text-navy mb-3">4. Ændre indstillinger</h2>
          <p className="text-muted leading-relaxed">
            Du kan til enhver tid slette cookies i din browser. Dit valg gemmes lokalt på din enhed.
          </p>
        </Reveal>
        <Reveal>
          <h2 className="font-serif text-2xl text-navy mb-3">5. Kontakt</h2>
          <p className="text-muted leading-relaxed">Spørgsmål? Skriv til {company.email || 'vores e-mail'}.</p>
        </Reveal>
      </div>
    </section>
  </>
);

export default CookiePolicy;
