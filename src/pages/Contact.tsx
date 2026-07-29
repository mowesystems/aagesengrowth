import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import company from '@/config/company';

const helpOptions = [
  'Hjemmeside eller webshop',
  'Marketing & content',
  'Google Ads / Meta Ads',
  'SEO / GEO',
  'Løbende marketingansvar',
  'Andet',
];

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (formData: FormData): boolean => {
    const newErrors: Record<string, string> = {};
    const name = (formData.get('name') as string)?.trim();
    const email = (formData.get('email') as string)?.trim();
    const consent = formData.get('consent');

    if (!name) newErrors.name = 'Indtast dit navn';
    if (!email) newErrors.email = 'Indtast din e-mail';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Ugyldig e-mailadresse';
    if (!consent) newErrors.consent = 'Accepter privatlivspolitikken';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (!validate(formData)) return;

    setStatus('loading');
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });
      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Forside', item: 'https://www.aagesengrowth.dk/' },
      { '@type': 'ListItem', position: 2, name: 'Kontakt', item: 'https://www.aagesengrowth.dk/kontakt' },
    ],
  };

  return (
    <>
      <SEOHead
        title="Kontakt"
        description="Kontakt Aagesen Growth — skriv eller book et møde. Vi vender tilbage hurtigst muligt."
        canonical="/kontakt"
        schema={breadcrumbSchema}
      />

      <section className="bg-navy text-off-white pt-32 pb-16 lg:pt-40 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="relative max-w-content mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="text-xs font-sans font-medium uppercase tracking-[0.25em] text-accent mb-6">Kontakt</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-serif text-display text-off-white mb-6 max-w-2xl text-balance">
              Lad os tage en snak.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg-light py-22 lg:py-30">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              {status === 'success' && (
                <div className="flex items-start gap-4 p-6 bg-off-white border border-accent/30 mb-8">
                  <CheckCircle size={22} className="text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans font-medium text-navy mb-1">Tak for din besked</p>
                    <p className="text-muted text-sm">Vi vender tilbage hurtigst muligt.</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-start gap-4 p-6 bg-off-white border border-red-400/30 mb-8">
                  <AlertCircle size={22} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans font-medium text-navy mb-1">Noget gik galt</p>
                    <p className="text-muted text-sm">Prøv igen eller skriv direkte til os.</p>
                  </div>
                </div>
              )}

              <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="space-y-5">
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden"><label>Udfyld ikke: <input name="bot-field" /></label></p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-sans font-medium text-navy mb-2">Navn *</label>
                    <input type="text" id="name" name="name" required className="w-full px-4 py-3 bg-off-white border border-navy/12 text-dark focus:border-navy focus:outline-none transition-colors" />
                    {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-sans font-medium text-navy mb-2">Virksomhed</label>
                    <input type="text" id="company" name="company" className="w-full px-4 py-3 bg-off-white border border-navy/12 text-dark focus:border-navy focus:outline-none transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-sans font-medium text-navy mb-2">E-mail *</label>
                    <input type="email" id="email" name="email" required className="w-full px-4 py-3 bg-off-white border border-navy/12 text-dark focus:border-navy focus:outline-none transition-colors" />
                    {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-sm font-sans font-medium text-navy mb-2">Hjemmeside</label>
                    <input type="url" id="website" name="website" placeholder="https://" className="w-full px-4 py-3 bg-off-white border border-navy/12 text-dark focus:border-navy focus:outline-none transition-colors" />
                  </div>
                </div>

                <div>
                  <label htmlFor="help" className="block text-sm font-sans font-medium text-navy mb-2">Hvad ønsker du hjælp til?</label>
                  <select id="help" name="help" className="w-full px-4 py-3 bg-off-white border border-navy/12 text-dark focus:border-navy focus:outline-none transition-colors">
                    <option value="">Vælg...</option>
                    {helpOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-sans font-medium text-navy mb-2">Besked</label>
                  <textarea id="message" name="message" rows={4} className="w-full px-4 py-3 bg-off-white border border-navy/12 text-dark focus:border-navy focus:outline-none transition-colors resize-none" />
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="consent" className="mt-1 w-4 h-4 accent-navy flex-shrink-0" />
                    <span className="text-sm text-muted leading-relaxed">
                      Jeg accepterer{' '}
                      <Link to="/privatlivspolitik" className="text-navy underline underline-offset-2 hover:text-accent">privatlivspolitikken</Link>.
                    </span>
                  </label>
                  {errors.consent && <p className="text-red-600 text-xs mt-1">{errors.consent}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide px-8 py-4 text-base bg-navy text-off-white hover:bg-navy-2 border border-navy hover:border-navy-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? <><Loader size={18} className="animate-spin" /> Sender...</> : 'Send besked'}
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={120}>
                <div className="bg-navy text-off-white p-8">
                  <h3 className="font-serif text-xl text-off-white mb-4">Book direkte</h3>
                  <p className="text-off-white/50 text-sm leading-relaxed mb-6">
                    Foretrækker du at booke direkte? Vælg en tid, der passer dig.
                  </p>
                  <Button booking size="md" variant="light" className="w-full">Book et møde</Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
