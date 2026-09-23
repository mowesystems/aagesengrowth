import React from 'react';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import Accordion from '@/components/Accordion';
import { homeAnchors } from '@/i18n/config';
import { useLocale } from '@/i18n/useLocale';

const FAQ: React.FC = () => {
  const { t } = useLocale();

  return (
    <section id={homeAnchors.faq} className="scroll-mt-20 py-22 lg:py-30" aria-labelledby="faq-heading">
      <div className="frame">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <SectionHead eyebrow={t.faq.eyebrow} index="10">
              <span id="faq-heading">{t.faq.heading}</span>
            </SectionHead>
          </div>
          <Reveal className="lg:col-span-8" delay={80}>
            <Accordion items={t.faq.items} openFirst headingLevel="h3" />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
