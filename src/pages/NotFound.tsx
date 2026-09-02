import React from 'react';
import { ArrowRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Button from '@/components/ui/Button';
import { useLocale } from '@/i18n/useLocale';

const NotFound: React.FC = () => {
  const { t, path } = useLocale();

  return (
    <>
      <SEOHead title={t.pages.notFound.title} description={t.pages.notFound.lead} noindex />

      <section className="relative overflow-hidden">
        <div className="ambient pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="frame relative flex min-h-[70svh] flex-col justify-center py-26">
          <p className="meta-brand">404</p>
          <h1 className="h-statement mt-6 max-w-[14ch]">{t.pages.notFound.lead}</h1>
          <div className="mt-10">
            <Button to={path('home')} size="lg">
              {t.pages.notFound.cta}
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
