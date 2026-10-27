import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import Accordion from '@/components/Accordion';
import { useLocale } from '@/i18n/useLocale';

interface FaqBlockProps {
  /** Which questions to show, by id, in this order. */
  ids: string[];
  eyebrow: string;
  heading: string;
  index?: string;
}

/**
 * Two or three questions where they matter, with a link to the full FAQ.
 * The complete list lives on its own page; no page repeats all of it.
 */
const FaqBlock: React.FC<FaqBlockProps> = ({ ids, eyebrow, heading, index }) => {
  const { t, path } = useLocale();
  const items = ids
    .map((id) => t.faq.items.find((item) => item.id === id))
    .filter((item): item is (typeof t.faq.items)[number] => Boolean(item));

  return (
    <section className="py-20 lg:py-26" aria-label={heading}>
      <div className="frame">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <SectionHead eyebrow={eyebrow} index={index}>
              {heading}
            </SectionHead>
            <Reveal className="mt-8" delay={80}>
              <Link to={path('faq')} className="link-line text-[0.88rem]">
                {t.cta.allFaq}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-8" delay={80}>
            <Accordion items={items} headingLevel="h3" />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default FaqBlock;
