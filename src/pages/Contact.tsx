import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  Loader,
  Mail,
  Phone,
  X,
} from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import company, { hasBooking } from '@/config/company';
import services from '@/data/services';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface ReviewHandoff {
  message?: string;
  website?: string;
  source?: string;
}

const helpOptions = [...services.map((service) => service.title), 'Ved ikke endnu / andet'];

const nextSteps = [
  'I får en kvittering på skærmen med det samme.',
  'Vi læser henvendelsen og kigger selv på jeres side, hvis I har oplyst den.',
  'I får et konkret svar — enten et par opklarende spørgsmål eller et forslag til en kort samtale.',
];

const noneOfThis = [
  'Ingen automatiske mailsekvenser',
  'Ingen opfølgende salgsopkald',
  'Oplysningerne bruges kun til at svare jer',
];

const Contact: React.FC = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Carried over from the website check, so nobody has to retype what they
  // already told us.
  const handoff = (location.state ?? {}) as ReviewHandoff;
  const [message, setMessage] = useState(handoff.message ?? '');
  const [website, setWebsite] = useState(handoff.website ?? '');

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

    if (!name) found.name = 'Skriv dit navn';
    if (!email) found.email = 'Skriv din e-mail, så vi kan svare';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      found.email = 'E-mailadressen ser ikke rigtig ud';
    if (!body) found.message = 'Skriv kort, hvad I gerne vil have hjælp til';

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
        setMessage('');
        setWebsite('');
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
      { '@type': 'ListItem', position: 1, name: 'Forside', item: `${company.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Kontakt', item: `${company.domain}/kontakt` },
    ],
  };

  return (
    <>
      <SEOHead
        title="Kontakt"
        description="Skriv til Aagesen Growth om jeres website, synlighed eller annoncering. I får et konkret svar fra den, der ville lave arbejdet."
        canonical="/kontakt"
        schema={breadcrumbSchema}
      />

      <PageHero
        eyebrow="Kontakt"
        title="Fortæl hvad der ikke virker."
        lead="Jo mere konkret, jo bedre svar. I behøver ikke have en færdig opgave — det er ofte det, samtalen handler om."
      />

      <section className="bg-ink py-18 lg:py-26">
        <div className="frame">
          <div className="grid grid-cols-4 gap-x-6 gap-y-14 lg:grid-cols-12 lg:gap-x-10">
            {/* ---------------------------------------------------- form */}
            <div className="col-span-4 lg:col-span-7">
              <div ref={feedbackRef} tabIndex={-1} aria-live="polite" className="outline-none">
                {status === 'success' && (
                  <div className="relative mb-9 flex items-start gap-4 border border-cyan/40 bg-ink-2 p-6">
                    <span aria-hidden="true" className="iris-rule absolute inset-x-0 top-0 h-px" />
                    <CheckCircle
                      size={20}
                      className="mt-0.5 shrink-0 text-cyan"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-sans font-medium text-paper">Tak — beskeden er sendt.</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        Vi kigger på den og vender tilbage med et konkret svar. Der kommer ingen
                        automatiske mails i mellemtiden.
                      </p>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div
                    role="alert"
                    className="mb-9 flex items-start gap-4 border border-magenta/50 bg-ink-2 p-6"
                  >
                    <AlertCircle
                      size={20}
                      className="mt-0.5 shrink-0 text-magenta"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-sans font-medium text-paper">Beskeden blev ikke sendt</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        Prøv igen om et øjeblik.
                        {company.email && (
                          <>
                            {' '}
                            Virker det stadig ikke, så skriv direkte til{' '}
                            <a
                              href={`mailto:${company.email}`}
                              className="underline underline-offset-4 hover:text-paper"
                            >
                              {company.email}
                            </a>
                            .
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {handoff.source === 'website-tjek' && status === 'idle' && (
                <p className="mb-8 border-l border-cyan/50 pl-5 text-sm leading-relaxed text-muted">
                  Jeres website-tjek er skrevet ind i beskeden herunder. Ret gerne i det, eller
                  tilføj det, der mangler.
                </p>
              )}

              {/*
                The field names here must stay exactly in step with the static
                form declaration in index.html — that is what Netlify's build
                crawler reads. Renaming one without the other silently drops
                submissions.
              */}
              <form
                ref={formRef}
                name="contact"
                method="POST"
                action="/kontakt"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden" aria-hidden="true">
                  <label>
                    Udfyld ikke dette felt
                    <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <p className="font-mono text-xs text-muted">
                  Felter markeret med <span aria-hidden="true">*</span> er påkrævede.
                </p>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="field-label">
                      Navn <span aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className="field"
                    />
                    {errors.name && (
                      <p id="name-error" className="field-error">
                        <AlertCircle size={12} aria-hidden="true" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="company" className="field-label">
                      Virksomhed <span className="font-normal text-muted">(valgfrit)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      autoComplete="organization"
                      className="field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="field-label">
                      E-mail <span aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className="field"
                    />
                    {errors.email && (
                      <p id="email-error" className="field-error">
                        <AlertCircle size={12} aria-hidden="true" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="website" className="field-label">
                      Jeres website <span className="font-normal text-muted">(valgfrit)</span>
                    </label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      inputMode="url"
                      autoComplete="url"
                      placeholder="virksomhed.dk"
                      value={website}
                      onChange={(event) => setWebsite(event.target.value)}
                      className="field"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="help" className="field-label">
                    Hvad handler det om? <span className="font-normal text-muted">(valgfrit)</span>
                  </label>
                  <select id="help" name="help" className="field" defaultValue="">
                    <option value="">Vælg…</option>
                    {helpOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="field-label">
                    Besked <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={8}
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error message-help' : 'message-help'}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="field resize-y"
                  />
                  {errors.message && (
                    <p id="message-error" className="field-error">
                      <AlertCircle size={12} aria-hidden="true" />
                      {errors.message}
                    </p>
                  )}
                  <p id="message-help" className="mt-2 text-xs leading-relaxed text-muted">
                    Skriv gerne hvad der driller, og hvad I gerne vil opnå. Det behøver ikke være en
                    færdig opgavebeskrivelse.
                  </p>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn btn-primary btn-lg w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader size={16} className="animate-spin" aria-hidden="true" />
                        Sender…
                      </>
                    ) : (
                      <>
                        Send besked
                        <ArrowRight size={16} aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <p className="mt-5 text-xs leading-relaxed text-muted">
                    Ved at sende accepterer I, at vi behandler oplysningerne for at kunne svare. Se{' '}
                    <Link
                      to="/privatlivspolitik"
                      className="underline underline-offset-4 hover:text-paper"
                    >
                      privatlivspolitikken
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>

            {/* ------------------------------------------------- sidebar */}
            <div className="col-span-4 lg:col-span-4 lg:col-start-9">
              <Reveal delay={80} className="lg:sticky lg:top-28">
                <div className="relative border border-paper/15 bg-ink-2 p-7 sm:p-8">
                  <span aria-hidden="true" className="iris-rule absolute inset-x-0 top-0 h-px" />

                  <h2 className="meta-lit">Sådan foregår det</h2>
                  <ol className="rule mt-7">
                    {nextSteps.map((step, index) => (
                      <li key={step} className="rule-row flex gap-5 py-5">
                        <span className="index-mark mt-0.5 shrink-0 text-cyan/80">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm leading-relaxed text-muted">{step}</span>
                      </li>
                    ))}
                  </ol>

                  {hasBooking && (
                    <div className="mt-9 border-t border-paper/12 pt-8">
                      <h2 className="meta">Hellere tale sammen?</h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        Book et uforpligtende møde på 30 minutter direkte i kalenderen.
                      </p>
                      <a
                        href={company.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline mt-5 w-full"
                      >
                        Se ledige tider
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    </div>
                  )}

                  {(company.email || company.phone) && (
                    <div className="mt-9 border-t border-paper/12 pt-8">
                      <h2 className="meta mb-3">Direkte</h2>
                      {company.email && (
                        <a
                          href={`mailto:${company.email}`}
                          className="flex min-h-11 items-center gap-3 text-sm text-paper transition-colors hover:text-cyan"
                        >
                          <Mail size={15} aria-hidden="true" />
                          {company.email}
                        </a>
                      )}
                      {company.phone && (
                        <a
                          href={`tel:${company.phone.replace(/\s/g, '')}`}
                          className="flex min-h-11 items-center gap-3 text-sm text-paper transition-colors hover:text-cyan"
                        >
                          <Phone size={15} aria-hidden="true" />
                          {company.phone}
                        </a>
                      )}
                    </div>
                  )}

                  {/* Always present, because it is the part of the answer people
                      are actually worried about before they write. */}
                  <div className="mt-9 border-t border-paper/12 pt-8">
                    <h2 className="meta">Hvad der ikke sker</h2>
                    <ul className="mt-4 space-y-3">
                      {noneOfThis.map((entry) => (
                        <li
                          key={entry}
                          className="flex gap-3 text-sm leading-relaxed text-muted"
                        >
                          <X size={14} className="mt-1 shrink-0 opacity-60" aria-hidden="true" />
                          {entry}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {(company.address || company.cvr) && (
                    <address className="mt-8 border-t border-paper/12 pt-7 not-italic text-xs leading-relaxed text-muted">
                      <span className="block">{company.legalName}</span>
                      {company.address && <span className="block">{company.address}</span>}
                      {company.cvr && <span className="block">CVR {company.cvr}</span>}
                    </address>
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

export default Contact;
