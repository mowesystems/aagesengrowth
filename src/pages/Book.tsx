import React from 'react';
import { Clock, Video, Check } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import company from '@/config/company';

const Book: React.FC = () => {
  const hasBookingUrl = Boolean(company.bookingUrl);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Forside', item: 'https://www.aagesengrowth.dk/' },
      { '@type': 'ListItem', position: 2, name: 'Book et møde', item: 'https://www.aagesengrowth.dk/book-moede' },
    ],
  };

  return (
    <>
      <SEOHead
        title="Book et møde"
        description="Book et uforpligtende 30-minutters online møde med Aagesen Growth ApS."
        canonical="/book-moede"
        schema={breadcrumbSchema}
      />

      <section className="bg-navy text-off-white pt-32 pb-16 lg:pt-40 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="relative max-w-content mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="text-xs font-sans font-medium uppercase tracking-[0.25em] text-accent mb-6">Book et møde</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-serif text-display text-off-white mb-6 max-w-2xl text-balance">
              Lad os tage en kort afklaring.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lg text-off-white/50 max-w-xl leading-relaxed text-pretty">
              Et uforpligtende møde om jeres hjemmeside, marketing og mulighederne for et fast samarbejde.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg-light py-22 lg:py-30">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <ul className="space-y-6 mb-10">
                  <li className="flex items-start gap-4">
                    <Clock size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans font-medium text-navy mb-1">30 minutter</p>
                      <p className="text-muted text-sm">Kort og fokuseret samtale.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Video size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans font-medium text-navy mb-1">Online</p>
                      <p className="text-muted text-sm">Mødet foregår via videokald.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans font-medium text-navy mb-1">Uforpligtende</p>
                      <p className="text-muted text-sm">Vi finder sammen ud af, om det giver mening.</p>
                    </div>
                  </li>
                </ul>
              </Reveal>
              <Reveal delay={100}>
                <div className="p-6 bg-off-white border border-navy/8">
                  <p className="text-sm text-muted leading-relaxed">
                    Forbered gerne kort: Hvilke opgaver fylder mest? Hvad fungerer, og hvad fungerer ikke? Hvilke mål er vigtigst?
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={120}>
                <div className="bg-off-white border border-navy/8 p-8">
                  <h2 className="font-serif text-2xl text-navy mb-4">Se ledige tider</h2>
                  <p className="text-muted leading-relaxed mb-8 text-sm">
                    {hasBookingUrl
                      ? 'Klik herunder for at se ledige tider i kalenderen og booke et møde.'
                      : 'Bookinglinket opdateres snart. Skriv til os via kontaktformularen, så finder vi en tid.'}
                  </p>
                  {hasBookingUrl ? (
                    <Button booking size="lg" className="w-full">Se ledige tider</Button>
                  ) : (
                    <Button to="/kontakt" size="lg" className="w-full">Skriv til os</Button>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Book;
