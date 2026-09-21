import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useScan, type ScanSource } from '@/components/scan/ScanContext';
import { normaliseUrl } from '@/lib/growthScan/client';
import { track } from '@/lib/analytics';
import { useLocale } from '@/i18n/useLocale';

interface ScanInputProps {
  source: ScanSource;
  /** The id of the scanner instance that should render the result. */
  anchorId: string;
  /** Larger type for the hero. */
  size?: 'md' | 'lg';
  autoFocusOnHash?: boolean;
  className?: string;
}

/**
 * The URL field and the primary call to action of the entire site.
 *
 * Validation is forgiving on the way in (a bare "firma.dk" is fine) and strict
 * on the way out (the backend only ever sees a normalised https URL).
 */
const ScanInput: React.FC<ScanInputProps> = ({
  source,
  anchorId,
  size = 'md',
  autoFocusOnHash = false,
  className = '',
}) => {
  const { t } = useLocale();
  const { run } = useScan();
  const [value, setValue] = React.useState('');
  const [invalid, setInvalid] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const errorId = `${anchorId}-error`;

  // The header CTA links to the hero scanner and expects the field focused.
  React.useEffect(() => {
    if (!autoFocusOnHash) return;
    const focusIfTargeted = () => {
      if (window.location.hash === `#${anchorId}`) {
        window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 350);
      }
    };
    focusIfTargeted();
    window.addEventListener('hashchange', focusIfTargeted);
    return () => window.removeEventListener('hashchange', focusIfTargeted);
  }, [anchorId, autoFocusOnHash]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!normaliseUrl(value)) {
      setInvalid(true);
      inputRef.current?.focus();
      return;
    }
    setInvalid(false);
    track('primary_cta_clicked', { source, cta: 'run_scan' });
    run(value, source, anchorId);
  };

  return (
    <form onSubmit={submit} noValidate className={className} aria-label={t.scan.cta}>
      <label htmlFor={`${anchorId}-input`} className="sr-only">
        {t.scan.label}
      </label>
      <div className="scan-frame" data-invalid={invalid}>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted sm:block"
        >
          URL
        </span>
        <input
          ref={inputRef}
          id={`${anchorId}-input`}
          type="text"
          inputMode="url"
          autoComplete="url"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          placeholder={t.scan.placeholder}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            if (invalid) setInvalid(false);
          }}
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
          // Some virtual keyboards and automation send Enter without the
          // keypress that triggers implicit submission; submit explicitly.
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
          className={`scan-input sm:pl-14 ${size === 'lg' ? 'sm:text-[1.25rem]' : ''}`}
        />
        <button
          type="submit"
          className={`btn btn-primary ${size === 'lg' ? 'btn-lg' : ''} w-full sm:w-auto sm:shrink-0`}
        >
          {t.scan.cta}
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
          {t.scan.micro}
        </p>
        {invalid && (
          <p id={errorId} role="alert" className="text-sm font-medium text-critical">
            {t.scan.invalid}
          </p>
        )}
      </div>
    </form>
  );
};

export default ScanInput;
