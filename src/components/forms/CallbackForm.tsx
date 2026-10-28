import { captureLead } from '@/lib/leadCapture';
import { LeadIntentFields } from '@/components/forms/LeadIntentFields';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { AlertCircle, ArrowRight, CheckCircle, Loader } from 'lucide-react';
import company from '@/config/company';
import { useLocale } from '@/i18n/useLocale';
import { track } from '@/lib/analytics';

/**
 * The Netlify form name. The static declaration in index.html must use the
 * same name and the same field names, or Netlify drops the fields.
 */
export const CALLBACK_FORM_NAME = 'callback';

/** Where every callback request goes. Configured as a form notification in Netlify. */
export const CALLBACK_RECIPIENT = 'kontakt@aagesengrowth.dk';

interface CallbackFormProps {
  /** Where the form sits: `scan-result`, `pricing`, `booking`, `faq`, ... */
  source: string;
  /** The scanned URL, when the form was opened from a Growth Scan result. */
  scanUrl?: string;
  /** The Growth Scan id, so the request links to its internal report. */
  scanId?: string;
  /** Rendered above the fields. */
  heading?: string;
  body?: string;
  /** Paper (default) or ink ground. */
  tone?: 'paper' | 'ink';
  className?: string;
  idPrefix?: string;
  /** One column at every width, for narrow sidebars. */
  compact?: boolean;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * "Bliv ringet op": the short callback request.
 *
 * Name, company and phone are required; email and a message are optional.
 * The submission goes to Netlify Forms with the context a reply needs
 * (timestamp, page, source and the scanned URL), and Netlify emails it to
 * kontakt@aagesengrowth.dk. A `subject` field sets the email subject, so a
 * callback is recognisable in the inbox without opening it.
 */
const CallbackForm: React.FC<CallbackFormProps> = ({
  source,
  scanUrl = '',
  scanId = '',
  heading,
  body,
  tone = 'paper',
  className = '',
  idPrefix = 'callback',
  compact = false,
}) => {
  const { t } = useLocale();
  const copy = t.callback;
  const location = useLocation();
  const [intakeId] = React.useState(() => crypto.randomUUID());
  const [status, setStatus] = React.useState<Status>('idle');
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const formRef = React.useRef<HTMLFormElement>(null);
  const feedbackRef = React.useRef<HTMLDivElement>(null);
  const lit = tone === 'ink';

  React.useEffect(() => {
    if (status === 'success' || status === 'error') feedbackRef.current?.focus();
  }, [status]);

  const validate = (data: FormData) => {
    const found: Record<string, string> = {};
    const name = String(data.get('name') ?? '').trim();
    const companyName = String(data.get('company') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    if (!name) found.name = copy.errors.name;
    if (!companyName) found.company = copy.errors.company;
    if (!phone) found.phone = copy.errors.phone;
    else if (phone.replace(/\D/g, '').length < 8) found.phone = copy.errors.phoneInvalid;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) found.email = copy.errors.emailInvalid;
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    return Object.keys(found).length === 0;
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!validate(data)) return;

    // Stamped at submission, not at render: a form left open for an hour
    // should still carry the time the visitor actually asked.
    const submittedAt = new Date();
    data.set('submitted-at', `${submittedAt.toISOString()} (${submittedAt.toLocaleString('da-DK', { timeZone: 'Europe/Copenhagen' })})`);
    data.set('page', `${window.location.origin}${location.pathname}${location.search}`);
    data.set(
      'subject',
      `Bliv ringet op: ${String(data.get('company') ?? '').trim()} (${source})`
    );

    setStatus('loading');
    try {
      await captureLead(data, intakeId);
      setStatus('success');
      track('callback_requested', { source, fromScan: Boolean(scanUrl) });
    } catch {
      setStatus('error');
    }
  };

  const field = (
    name: 'name' | 'company' | 'phone' | 'email',
    label: string,
    opts: { type?: string; autoComplete?: string; optional?: boolean; inputMode?: 'tel' | 'email' }
  ) => {
    const id = `${idPrefix}-${name}`;
    const error = errors[name];
    return (
      <div>
        <label htmlFor={id} className={`field-label ${lit ? 'text-paper' : ''}`}>
          {label}
          {opts.optional && <span className={`ml-1.5 font-normal ${lit ? 'text-muted-lit' : 'text-muted'}`}>({copy.optional})</span>}
        </label>
        <input
          id={id}
          name={name}
          type={opts.type ?? 'text'}
          inputMode={opts.inputMode}
          autoComplete={opts.autoComplete}
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
          {copy.successHeading}
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      name={CALLBACK_FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={submit}
      noValidate
      className={className}
    >
      <input type="hidden" name="form-name" value={CALLBACK_FORM_NAME} />
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="scan-url" value={scanUrl} />
      <input type="hidden" name="scan-id" value={scanId} />
      <p hidden>
        <label>
          Bot field <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      {(heading || body) && (
        <div className="mb-6">
          {heading && <h3 className={`h-section text-balance ${lit ? 'text-paper' : ''}`}>{heading}</h3>}
          {body && <p className={`mt-3 max-w-measure text-[0.95rem] leading-relaxed ${lit ? 'text-muted-lit' : 'text-muted'}`}>{body}</p>}
        </div>
      )}

      <div className={`grid gap-5 ${compact ? '' : 'sm:grid-cols-2'}`}>
        {field('name', copy.name, { autoComplete: 'name' })}
        {field('company', copy.company, { autoComplete: 'organization' })}
        {field('phone', copy.phone, { type: 'tel', inputMode: 'tel', autoComplete: 'tel' })}
        {field('email', copy.email, { type: 'email', inputMode: 'email', autoComplete: 'email', optional: true })}
        <div className={compact ? '' : 'sm:col-span-2'}>
          <label htmlFor={`${idPrefix}-message`} className={`field-label ${lit ? 'text-paper' : ''}`}>
            {copy.message}
            <span className={`ml-1.5 font-normal ${lit ? 'text-muted-lit' : 'text-muted'}`}>({copy.optional})</span>
          </label>
          <textarea
            id={`${idPrefix}-message`}
            name="message"
            rows={3}
            placeholder={copy.messagePlaceholder}
            className="field min-h-[6.5rem] resize-y py-3"
          />
        </div>
      </div>

      <div className={lit ? '[&_.field-label]:text-paper [&_.text-muted]:text-muted-lit' : ''}>
        <LeadIntentFields idPrefix={idPrefix} />
      </div>
      <input type="hidden" name="preferred_channel" value="phone" />

      {status === 'error' && (
        <div ref={feedbackRef} tabIndex={-1} role="alert" className="mt-5 border border-critical/40 bg-critical-tint p-4">
          <p className="flex items-center gap-2.5 font-medium text-critical">
            <AlertCircle size={16} aria-hidden="true" />
            {copy.errorHeading}
          </p>
          <p className="mt-1.5 text-sm text-muted">
            {copy.errorBody}{' '}
            <a href={`mailto:${company.email}`} className="underline">
              {company.email}
            </a>
          </p>
        </div>
      )}

      <div className={`mt-6 flex flex-col gap-4 ${compact ? '' : 'sm:flex-row sm:items-center sm:justify-between'}`}>
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`btn ${lit ? 'btn-lit' : 'btn-primary'} btn-lg w-full disabled:opacity-70 ${compact ? '' : 'sm:w-auto'}`}
        >
          {status === 'loading' ? (
            <>
              <Loader size={16} className="animate-spin" aria-hidden="true" />
              {copy.sending}
            </>
          ) : (
            <>
              {copy.submit}
              <ArrowRight size={16} aria-hidden="true" />
            </>
          )}
        </button>
        <p className={`text-xs ${lit ? 'text-muted-lit' : 'text-muted'}`}>{copy.privacy}</p>
      </div>
    </form>
  );
};

export default CallbackForm;
