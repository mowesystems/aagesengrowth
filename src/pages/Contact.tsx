import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle, Loader, Mail, Phone } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import company from '@/config/company';
import services from '@/data/services';
import { useLocale } from '@/i18n/useLocale';

type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * The contact page.
 *
 * Posts to Netlify Forms with the exact field names declared in the static
 * form in index.html — the build-time crawler reads them from there, so the
 * two must not drift. Validation runs before the request so a missing name
 * never costs a round trip, and the result region takes focus so a screen
 * reader user is told what happened.
 */
const Contact: React.FC = () => {
  const { t, path } = useLocale();
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const c = t.pages.contact;
  const helpOptions = [...services.map((service) => t.services[service.id].name), c.helpOther];

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      feedbackRef.current?.focus();
    }
  }, [status]);

  const validate = (data: FormData) => {
    const found: Record<string, string> = {};
    const name = (data.get('name') as string)?.trim();
    const email = (data.get('email') as string)?.trim();
    const body = (data.get('message') as string)?.trim();

    if (!name) found.name = c.errors.name;
    if (!email) found.email = c.errors.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) found.email = c.errors.emailInvalid;
    if (!body) found.message = c.errors.message;

    setErrors(found);

    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
    }

    return Object.keys(found).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (!validate(data)) return;

    setStatus('loading');
    try {
      const body = new URLSearchParams();
      data.forEach((value, key) => {
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

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: c.title,
    url: `${company.domain}${path('contact')}`,
  };

  const fieldError = (key: string) =>
    errors[key] ? (
      <p id={`${key}-error`} className="field-error">
        <AlertCircle size={13} aria-hidden="true" />
        {errors[key]}
      </p>
    ) : null;

  return (
    <>
      <SEOHead title={c.title} description={c.description} schema={schema} />

      <PageHero eyebrow={t.nav.contact} title={c.heading} lead={c.lead} />

      <section className="py-18 lg:py-24">
        <div className="frame">
          <div className="grid gap-x-14 gap-y-14 lg:grid-cols-12">
            {/* ----------------------------------------------------- form */}
            <div className="lg:col-span-7">
              <h2 className="meta">{c.formHeading}</h2>

              {status === 'success' ? (
                <div
                  ref={feedbackRef}
                  tabIndex={-1}
                  role="status"
                  className="mt-6 border border-brand/30 bg-brand-tint p-8"
                >
                  <p className="flex items-center gap-3 font-sans text-title font-semibold">
                    <CheckCircle size={20} aria-hidden="true" className="text-brand" />
                    {c.successHeading}
                  </p>
                  <p className="mt-3 max-w-measure leading-relaxed text-muted">{c.successBody}</p>
                </div>
              ) : (
                <form
                  ref={formRef}
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-6 space-y-6"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p hidden>
                    <label>
                      Bot field <input name="bot-field" tabIndex={-1} autoComplete="off" />
                    </label>
                  </p>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="field-label">
                        {c.name} <span className="text-muted">({c.required})</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        className="field"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {fieldError('name')}
                    </div>

                    <div>
                      <label htmlFor="company" className="field-label">
                        {c.company} <span className="text-muted">({c.optional})</span>
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        className="field"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="field-label">
                        {c.email} <span className="text-muted">({c.required})</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="field"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {fieldError('email')}
                    </div>

                    <div>
                      <label htmlFor="website" className="field-label">
                        {c.website} <span className="text-muted">({c.optional})</span>
                      </label>
                      <input
                        id="website"
                        name="website"
                        type="text"
                        inputMode="url"
                        autoComplete="url"
                        className="field"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="help" className="field-label">
                      {c.help} <span className="text-muted">({c.optional})</span>
                    </label>
                    <select id="help" name="help" className="field" defaultValue="">
                      <option value="">{c.helpPlaceholder}</option>
                      {helpOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="field-label">
                      {c.message} <span className="text-muted">({c.required})</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder={c.messagePlaceholder}
                      className="field resize-y"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {fieldError('message')}
                  </div>

                  {status === 'error' && (
                    <div
                      ref={feedbackRef}
                      tabIndex={-1}
                      role="alert"
                      className="border border-[#B3261E]/40 bg-[#B3261E]/[0.06] p-5"
                    >
                      <p className="flex items-center gap-2.5 font-medium text-[#B3261E]">
                        <AlertCircle size={16} aria-hidden="true" />
                        {c.errorHeading}
                      </p>
                      <p className="mt-2 text-sm text-muted">{c.errorBody}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn btn-primary btn-lg w-full disabled:opacity-70 sm:w-auto"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader size={16} aria-hidden="true" className="animate-spin" />
                        {c.sending}
                      </>
                    ) : (
                      <>
                        {c.submit}
                        <ArrowRight size={16} aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* ----------------------------------------------------- aside */}
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal>
                <h2 className="meta">{c.nextHeading}</h2>
                <ol className="mt-5 rule">
                  {c.next.map((step, index) => (
                    <li key={step} className="flex gap-4 rule-row py-4">
                      <span className="index-mark shrink-0 pt-1 opacity-60">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[0.95rem] leading-relaxed text-muted">{step}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal delay={80}>
                <h2 className="meta mt-10">{c.noneHeading}</h2>
                <ul className="mt-4 space-y-2">
                  {c.none.map((entry) => (
                    <li key={entry} className="text-[0.95rem] text-muted">
                      {entry}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {(company.email || company.phone) && (
                <Reveal delay={120}>
                  <h2 className="meta mt-10">{c.directHeading}</h2>
                  <ul className="mt-4 space-y-1">
                    {company.email && (
                      <li>
                        <a href={`mailto:${company.email}`} className="link-line">
                          <Mail size={14} aria-hidden="true" />
                          {company.email}
                        </a>
                      </li>
                    )}
                    {company.phone && (
                      <li>
                        <a
                          href={`tel:${company.phone.replace(/\s/g, '')}`}
                          className="link-line"
                        >
                          <Phone size={14} aria-hidden="true" />
                          {company.phone}
                        </a>
                      </li>
                    )}
                  </ul>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
