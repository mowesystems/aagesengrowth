import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Info, RotateCcw } from 'lucide-react';
import { buildPlan, symptoms } from '@/data/review';
import services from '@/data/services';

/**
 * The website check.
 *
 * Deliberately not a "score my site" widget: it makes no measurement and
 * therefore invents no numbers. It takes what the visitor already knows is
 * wrong and returns the order the work should happen in — including the
 * dependencies they would not have thought of. That sequencing judgement is
 * the product, so the tool is a demonstration rather than a decoration.
 */
const WebsiteReview: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [site, setSite] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { plan, autoAdded } = useMemo(() => buildPlan(selected), [selected]);

  const toggle = (id: string) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
    setSubmitted(false);
  };

  const show = () => {
    setSubmitted(true);
    window.requestAnimationFrame(() => {
      resultRef.current?.focus({ preventScroll: true });
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  };

  const reset = () => {
    setSelected([]);
    setSite('');
    setSubmitted(false);
  };

  const sendAsEnquiry = () => {
    const lines = [
      site.trim() ? `Vores side: ${site.trim()}` : null,
      '',
      'Det vi genkender:',
      ...selected.map((id) => `- ${symptoms.find((s) => s.id === id)?.label ?? ''}`),
      '',
      'Foreslået rækkefølge fra website-tjekket:',
      ...plan.map((rec, index) => `${index + 1}. ${rec.title}`),
    ].filter((line) => line !== null);

    navigate('/kontakt', {
      state: { message: lines.join('\n'), website: site.trim(), source: 'website-tjek' },
    });
  };

  const serviceFor = (serviceId: string) => services.find((s) => s.id === serviceId);

  return (
    <div className="grid grid-cols-1 gap-px bg-cream/12 lg:grid-cols-2">
      {/* ---------------------------------------------------------- input */}
      <div className="bg-ink p-6 sm:p-9 lg:p-10">
        <fieldset>
          <legend className="font-serif text-2xl leading-tight text-cream sm:text-3xl">
            Hvad genkender I?
          </legend>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-dim">
            Vælg det, der passer. Der er ingen forkerte svar — og ingen felter, der skal udfyldes,
            før I får noget at vide.
          </p>

          <ul className="mt-7 space-y-px">
            {symptoms.map((symptom) => {
              const isOn = selected.includes(symptom.id);
              return (
                <li key={symptom.id}>
                  <label
                    className={`flex cursor-pointer items-start gap-3.5 border p-3.5 transition-colors sm:p-4 ${
                      isOn
                        ? 'border-cream bg-cream text-ink'
                        : 'border-cream/15 bg-ink-2 text-cream hover:border-cream/40'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isOn}
                      onChange={() => toggle(symptom.id)}
                    />
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors ${
                        isOn ? 'border-gold bg-gold text-cream' : 'border-cream/35'
                      }`}
                    >
                      {isOn && <Check size={13} strokeWidth={3} />}
                    </span>
                    <span className="text-sm leading-snug">{symptom.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <div className="mt-7">
          <label htmlFor="review-site" className="field-label">
            Jeres website <span className="font-normal text-dim">(valgfrit)</span>
          </label>
          <input
            id="review-site"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="virksomhed.dk"
            value={site}
            onChange={(event) => setSite(event.target.value)}
            className="field"
          />
          <p className="mt-2.5 flex items-start gap-2 text-xs leading-relaxed text-dim">
            <Info size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
            Der køres ingen automatisk scanning. Adressen bruges kun, hvis I sender tjekket til os —
            så kigger vi selv på siden, før vi svarer.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={show}
            disabled={selected.length === 0}
            className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Vis rækkefølgen
            <ArrowRight size={15} aria-hidden="true" />
          </button>
          {selected.length > 0 && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center gap-2 px-1 font-sans text-sm font-medium text-dim transition-colors hover:text-cream"
            >
              <RotateCcw size={14} aria-hidden="true" />
              Start forfra
            </button>
          )}
        </div>
      </div>

      {/* --------------------------------------------------------- output */}
      <div
        ref={resultRef}
        tabIndex={-1}
        aria-live="polite"
        className="bg-cream p-6 text-ink outline-none sm:p-9 lg:p-10 on-light"
      >
        {!submitted || plan.length === 0 ? (
          <div className="flex h-full min-h-[22rem] flex-col justify-center">
            <p className="meta-on-light">Jeres plan</p>
            <p className="mt-5 max-w-sm font-serif text-2xl leading-snug text-ink/45 sm:text-[1.75rem]">
              Vælg det, I genkender — så viser vi den rækkefølge, vi ville gribe det an i.
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-dim-ink">
              Rækkefølgen er ikke tilfældig. Nogle ting skal være på plads, før andre overhovedet kan
              måles eller betale sig.
            </p>
          </div>
        ) : (
          <div className="animate-rise">
            <p className="meta-on-light">
              Foreslået rækkefølge{site.trim() ? ` · ${site.trim()}` : ''}
            </p>
            <h3 className="mt-4 font-serif text-2xl leading-tight text-ink sm:text-3xl">
              {plan.length === 1 ? 'Ét sted at starte.' : `${plan.length} skridt, i denne rækkefølge.`}
            </h3>

            {/* The steps arrive one at a time and a rule draws down between
                them. The sequence is the whole point of the tool, so the
                motion states the argument rather than decorating it. */}
            <ol className="mt-8">
              {plan.map((rec, index) => {
                const service = serviceFor(rec.serviceId);
                const wasAdded = autoAdded.has(rec.id);
                const isLast = index === plan.length - 1;
                const appear = 90 + index * 260;

                return (
                  <li
                    key={rec.id}
                    className="relative animate-rise pb-7 pl-11 last:pb-0"
                    style={{ animationDelay: `${appear}ms` }}
                  >
                    {/* connector */}
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="draw-rule absolute bottom-2 left-[0.92rem] top-9 w-px bg-ink/25"
                        style={{ animationDelay: `${appear + 180}ms` }}
                      />
                    )}

                    {/* step marker */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center border border-ink/30 bg-cream font-mono text-[0.66rem] text-ink"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <h4 className="font-serif text-xl leading-tight text-ink sm:text-2xl">
                        {rec.title}
                      </h4>
                      {wasAdded && (
                        <span className="border border-gold-ink/50 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-gold-ink">
                          Forudsætning
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-dim-ink">{rec.rationale}</p>
                    {service && (
                      <p className="mt-2.5 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-ink/45">
                        {service.title}
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>

            <div className="mt-8">
              <button type="button" onClick={sendAsEnquiry} className="btn btn-invert btn-lg w-full">
                Send som forespørgsel
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <p className="mt-3.5 text-xs leading-relaxed text-ink/50">
                Planen følger med i beskeden, så I ikke skal skrive det hele igen. Ingen automatiske
                mails, ingen opfølgende salgsopkald.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteReview;
