import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Button from '@/components/ui/Button';
import { featuredCase } from '@/data/cases';

/**
 * A real 404.
 *
 * The catch-all route must not render the homepage: that returns 200 with full
 * content for every mistyped URL, which lets search engines index unlimited
 * duplicates and leaves visitors unsure whether they landed where they meant
 * to. One route home, one piece of work, no joke at the visitor's expense.
 */
const NotFound: React.FC = () => (
  <>
    <SEOHead
      title="Siden findes ikke"
      description="Siden her findes ikke længere, eller adressen er skrevet forkert."
      noindex
    />

    <section className="grain relative overflow-hidden bg-ink">
      <div className="ambient pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="frame relative pb-20 pt-32 lg:pb-30 lg:pt-40">
        <p className="meta-lit">Fejl 404</p>

        <h1 className="mt-7 max-w-[14ch] font-display text-hero uppercase text-paper">
          Den side findes ikke.
        </h1>

        <p className="mt-8 max-w-measure text-lead text-muted text-pretty">
          Enten er adressen skrevet forkert, eller også er siden flyttet. Herfra kommer I videre.
        </p>

        <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Button to="/" size="lg">
            Til forsiden
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
          <Link to={`/projekter/${featuredCase.slug}`} className="link-line">
            Se casen om {featuredCase.client}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default NotFound;
