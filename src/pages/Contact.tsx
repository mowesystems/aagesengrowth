import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';

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
    const message = (formData.get('message') as string)?.trim();

    if (!name) newErrors.name = 'Indtast dit navn';
    if (!email) newErrors.email = 'Indtast din e-mail';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Ugyldig e-mailadresse';
    if (!message) newErrors.message = 'Skriv kort, hvad du ønsker hjælp til';

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
      const body = new URLSearchParams();
      formData.forEach((value, key) => {
        if (typeof value === 'string') body.append(key, value);
      });
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
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

      <section className="inner-hero grid-bg-light">
        <div className="relative max-w-content mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="text-xs font-sans font-medium uppercase tracking-[0.25em] text-accent mb-6">Kontakt</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-serif text-display text-navy mb-6 max-w-2xl text-balance">
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
                <div role="status" aria-live="polite" className="flex items-start gap-4 p-6 bg-off-white border border-accent/30 mb-8">
                  <CheckCircle size={22} className="text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-sans font-medium text-navy mb-1">Tak for din besked</p>
                    <p className="text-muted text-sm">Din henvendelse er sendt. Vi vender tilbage hurtigst muligt.</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div role="alert" className="flex items-start gap-4 p-6 bg-off-white border border-red-400/30 mb-8">
                  <AlertCircle size={22} className="text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-sans font-medium text-navy mb-1">Noget gik galt</p>
                    <p className="text-muted text-sm">Beskeden blev ikke sendt. Prøv igen om et øjeblik.</p>
                  </div>
                </div>
              )}

              <form name="contact" method="POST" action="/kontakt" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="space-y-5" noValidate>
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden" aria-hidden="true"><label>Udfyld ikke dette felt: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-sans font-medium text-navy mb-2">Navn *</label>
                    <input type="text" id="name" name="name" required autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} className="form-field" />
                    {errors.name && <p id="name-error" className="text-red-700 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-sans font-medium text-navy mb-2">Virksomhed</label>
                    <input type="text" id="company" name="company" autoComplete="organization" className="form-field" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-sans font-medium text-navy mb-2">E-mail *</label>
                    <input type="email" id="email" name="email" required autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} className="form-field" />
                    {errors.email && <p id="email-error" className="text-red-700 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-sm font-sans font-medium text-navy mb-2">Hjemmeside</label>
                    <input type="url" id="website" name="website" placeholder="https://" autoComplete="url" className="form-field" />
                  </div>
                </div>

                <div>
                  <label htmlFor="help" className="block text-sm font-sans font-medium text-navy mb-2">Hvad ønsker du hjælp til?</label>
                  <select id="help" name="help" className="form-field">
                    <option value="">Vælg...</option>
                    {helpOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-sans font-medium text-navy mb-2">Besked *</label>
                  <textarea id="message" name="message" rows={5} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} className="form-field resize-y" />
                  {errors.message && <p id="message-error" className="text-red-700 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide px-8 py-4 text-base bg-navy text-off-white hover:bg-navy-2 border border-navy hover:border-navy-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? <><Loader size={18} className="animate-spin" aria-hidden="true" /> Sender...</> : 'Send besked'}
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
