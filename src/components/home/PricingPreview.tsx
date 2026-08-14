import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import PricingCard from '@/components/PricingCard';
import { pricingNote, websitePackages } from '@/data/pricing';

/**
 * What a website costs, on the page.
 *
 * The three website packages, unchanged, shown before anyone has to ask. The
 * disclaimer travels with them: it is the reason the prices can be printed at
 * all, so it is not tucked away on another page.
 */
const PricingPreview: React.FC = () => (
  <section className="bg-ink py-20 lg:py-30" aria-labelledby="pricing-preview-heading">
    <div className="frame">
      <div className="grid grid-cols-4 gap-x-6 gap-y-6 lg:grid-cols-12 lg:gap-x-10">
        <div className="col-span-4 lg:col-span-6">
          <p className="meta-lit">Priser</p>
          <h2
            id="pricing-preview-heading"
            className="mt-6 max-w-measure font-display text-section text-paper text-balance"
          >
            Hvad et website koster hos os.
          </h2>
        </div>
        <p className="col-span-4 max-w-measure self-end text-[0.95rem] leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
          Alle priser står på siden. Ingen &laquo;kontakt os for et tilbud&raquo; på det, der kan
          prissættes på forhånd.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 items-stretch gap-px bg-paper/10 md:grid-cols-3 lg:mt-16">
        {websitePackages.map((item, index) => (
          <Reveal className="h-full" key={item.id} delay={index * 70}>
            <PricingCard item={item} compact />
          </Reveal>
        ))}
      </div>

      <div className="mt-9 grid grid-cols-4 items-start gap-x-6 gap-y-6 lg:grid-cols-12 lg:gap-x-10">
        <p className="col-span-4 text-xs leading-relaxed text-muted lg:col-span-8">{pricingNote}</p>
        <Link to="/priser" className="link-line lg:col-span-4 lg:justify-self-end">
          Se alle priser
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
);

export default PricingPreview;
