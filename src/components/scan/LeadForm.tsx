import { captureLead } from '@/lib/leadCapture';
import { LeadIntentFields } from '@/components/forms/LeadIntentFields';
import React from 'react';
import { AlertCircle, ArrowRight, CheckCircle, Loader } from 'lucide-react';
import { track, type AnalyticsEvent } from '@/lib/analytics';
import { useLocale } from '@/i18n/useLocale';

export const LEAD_FORM_NAME = 'growth-review';

interface LeadFormProps {
  /** Pre-filled from the scan. */
  website?: string;
  /** Free-text context stored with the submission: score, findings, source. */
  context?: Record<string, string>;
  /** The conversion event fired on success. */
  event: AnalyticsEvent;
  source: string;
  heading?: string;
  body?: string;
  submitLabel?: string;
  /** Shown instead of the form after a successful submission. */
  successHeading?: string;
  successBody?: string;
  className?: string;
  idPrefix?: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * The one lead form.
 *
 * Four fields plus an optional phone; the website is carried over from the
 * scan. Posts to Netlify Forms with the field names declared statically in
 * index.html — the two must not drift. Scan context travels as hidden fields
 * so the submission in the Netlify dashboard (and, later, the Command Center)
 * carries the score and the findings the visitor saw.
 */
const LeadForm: React.FC<LeadFormProps> = ({
  website = '',
  context = {},
  event,
  source,
  heading,
  body,
  submitLabel,
  successHeading,
  successBody,
  className = '',
  idPrefix = 'lead',
}) => {
  const { t } = useLocale();
  const copy = t.scan.lead;
  const [intakeId] = React.useState(() => crypto.randomUUID());
  const [status, setStatus] = React.useState<Status>('idle');
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const formRef = React.useRef<HTMLFormElement>(null);
  const feedbackRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (status === 'success' || status === 'error') feedbackRef.current?.focus();
  }, [status]);

  const validate = (data: FormData) => {
    const found: Record<string, string> = {};
    const name = String(data.get('name') ?? '').trim();
    const company = String(data.get('company') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    if (!name) found.name = copy.errors.name;
    if (!company) found.company = copy.errors.company;
    if (!email) found.email = copy.errors.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) found.email = copy.errors.emailInvalid;
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    return Object.keys(found).length === 0;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!validate(data)) return;
    setStatus('loading');
    try {
      await captureLead(data, intakeId);
      setStatus('success');
      track(event, { source, founder: context.founder === 'yes' });
    } catch {
      setStatus('error');
    }
  };

  const field = (
    name: 'name' | 'company' | 'email' | 'phone' | 'website',
    label: string,
    opts: { type?: string; autoComplete?: string; optional?: boolean; inputMode?: 'tel' | 'email' | 'url'; defaultValue?: string }
  ) => {
    const id = `${idPrefix}-${name}`;
    const error = errors[name];
    return (
      <div>
        <label htmlFor={id} className="field-label">
          {label}
          {opts.optional && <span className="ml-1.5 font-normal text-muted">({copy.optional})</span>}
        </label>
        <input
          id={id}
          name={name}
          type={opts.type ?? 'text'}
          inputMode={opts.inputMode}
          autoComplete={opts.autoComplete}
          defaultValue={opts.defaultValue}
          className="field"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {error && (
          <p id={`${id}-error`} className="field-error">
            <AlertCircle size={13} aria-hidden="true" />
            {error}
          </p>
        )}
      </div>
    );
  };

  if (status === 'success') {
    return (
      <div
        ref={feedbackRef}
        tabIndex={-1}
        role="status"
        className={`border border-brand/30 bg-brand-tint p-6 sm:p-8 ${className}`}
      >
        <p className="flex items-center gap-3 font-sans text-title font-semibold text-ink">
          <CheckCircle size={20} aria-hidden="true" className="shrink-0 text-brand" />
          {successHeading ?? copy.successHeading}
        </p>
        <p className="mt-3 max-w-measure leading-relaxed text-muted">{successBody ?? copy.successBody}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      name={LEAD_FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={submit}
      noValidate
      className={className}
    >
      <input type="hidden" name="form-name" value={LEAD_FORM_NAME} />
      <input type="hidden" name="source" value={source} />
      {Object.entries(context).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}
      <p hidden>
        <label>
          Bot field <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      {(heading || body) && (
        <div className="mb-6">
          {heading && <h3 className="h-section text-balance">{heading}</h3>}
          {body && <p className="mt-3 max-w-measure text-[0.95rem] leading-relaxed text-muted">{body}</p>}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {field('name', copy.name, { autoComplete: 'name' })}
        {field('company', copy.company, { autoComplete: 'organization' })}
        {field('email', copy.email, { type: 'email', inputMode: 'email', autoComplete: 'email' })}
        {field('phone', copy.phone, { type: 'tel', inputMode: 'tel', autoComplete: 'tel', optional: true })}
        {!website && (
          <div className="sm:col-span-2">
            {field('website', copy.website, { inputMode: 'url', autoComplete: 'url', optional: true })}
          </div>
        )}
      </div>
      {website && <input type="hidden" name="website" value={website} />}

      <LeadIntentFields idPrefix={idPrefix} />

      {status === 'error' && (
        <div
          ref={feedbackRef}
          tabIndex={-1}
          role="alert"
          className="mt-5 border border-critical/40 bg-critical-tint p-4"
        >
          <p className="flex items-center gap-2.5 font-medium text-critical">
            <AlertCircle size={16} aria-hidden="true" />
            {copy.errorHeading}
          </p>
          <p className="mt-1.5 text-sm text-muted">{copy.errorBody}</p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn btn-primary btn-lg w-full disabled:opacity-70 sm:w-auto"
        >
          {status === 'loading' ? (
            <>
              <Loader size={16} className="animate-spin" aria-hidden="true" />
              {copy.sending}
            </>
          ) : (
            <>
              {submitLabel ?? copy.submit}
              <ArrowRight size={16} aria-hidden="true" />
            </>
          )}
        </button>
        <p className="text-xs text-muted">{copy.privacy}</p>
      </div>
    </form>
  );
};

export default LeadForm;
