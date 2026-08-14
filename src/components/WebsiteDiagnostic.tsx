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
 * the product, so the tool demonstrates the service rather than illustrating
 * it. No email address is required to see the result, and the result is
 * useful whether or not anyone ever gets in touch.
 */
const WebsiteDiagnostic: React.FC = () => {
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
    <div className="relative border border-paper/12">
      <span aria-hidden="true" className="iris-rule absolute inset-x-0 top-0 h-px" />

      <div className="grid grid-cols-1 gap-px bg-paper/10 lg:grid-cols-2">
        {/* -------------------------------------------------------- input */}
        <div className="bg-ink p-6 sm:p-9 lg:p-11">
          <fieldset>
            <legend className="font-display text-display uppercase leading-[0.9] text-paper">
              Hvad genkender I?
            </legend>
            <p className="mt-5 max-w-measure text-sm leading-relaxed text-muted">
              Vælg det, der passer. Der er ingen forkerte svar — og ingen felter, der skal udfyldes,
              før I får noget at vide.
            </p>

            <ul className="mt-8 space-y-px">
              {symptoms.map((symptom, index) => {
                const isOn = selected.includes(symptom.id);
                return (
                  <li key={symptom.id}>
                    <label
                      className={`flex cursor-pointer items-start gap-4 border p-4 transition-colors ${
                        isOn
                          ? 'border-paper bg-paper text-ink'
                          : 'border-paper/12 bg-ink-2 text-paper hover:border-paper/35'
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
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border font-mono text-[0.55rem] transition-colors ${
                          isOn ? 'border-ink bg-ink text-paper' : 'border-paper/30 text-muted'
                        }`}
                      >
                        {isOn ? (
                          <Check size={12} strokeWidth={3} />
                        ) : (
                          String(index + 1).padStart(2, '0')
                        )}
                      </span>
                      <span className="text-sm leading-snug">{symptom.label}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>

          <div className="mt-8">
            <label htmlFor="review-site" className="field-label">
              Jeres website <span className="font-normal text-muted">(valgfrit)</span>
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
            <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-muted">
              <Info size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
              Der køres ingen automatisk scanning. Adressen bruges kun, hvis I sender tjekket til os
              — så kigger vi selv på siden, før vi svarer.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
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
                className="inline-flex min-h-11 items-center gap-2 px-1 font-sans text-sm font-medium text-muted transition-colors hover:text-paper"
              >
                <RotateCcw size={14} aria-hidden="true" />
                Start forfra
              </button>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------- output */}
        <div
          ref={resultRef}
          tabIndex={-1}
          aria-live="polite"
          className="bg-ink-2 p-6 outline-none sm:p-9 lg:p-11"
        >
          {!submitted || plan.length === 0 ? (
            <div className="flex h-full min-h-[22rem] flex-col justify-center">
              <p className="meta">Jeres plan</p>
              <p className="mt-6 max-w-measure font-display text-display uppercase leading-[0.92] text-paper/50">
                Vælg det, I genkender
              </p>
              <p className="mt-6 max-w-measure text-sm leading-relaxed text-muted">
                Rækkefølgen er ikke tilfældig. Nogle ting skal være på plads, før andre overhovedet
                kan måles eller betale sig — og det er dér, de fleste penge går tabt.
              </p>
            </div>
          ) : (
            <div className="animate-rise">
              <p className="meta-lit">
                Foreslået rækkefølge{site.trim() ? ` · ${site.trim()}` : ''}
              </p>
              <h3 className="mt-5 font-display text-display uppercase leading-[0.9] text-paper">
                {plan.length === 1 ? 'Ét sted at starte.' : `${plan.length} skridt, i rækkefølge.`}
              </h3>

              {/* The steps arrive one at a time and a rule draws down between
                  them. The sequence is the whole point of the tool, so the
                  motion states the argument rather than decorating it. */}
              <ol className="mt-9">
                {plan.map((rec, index) => {
                  const service = serviceFor(rec.serviceId);
                  const wasAdded = autoAdded.has(rec.id);
                  const isLast = index === plan.length - 1;
                  const appear = 80 + index * 240;

                  return (
                    <li
                      key={rec.id}
                      className="animate-rise relative pb-8 pl-12 last:pb-0"
                      style={{ animationDelay: `${appear}ms` }}
                    >
                      {!isLast && (
                        <span
                          aria-hidden="true"
                          className="draw-rule absolute bottom-2 left-[0.97rem] top-10 w-px bg-paper/20"
                          style={{ animationDelay: `${appear + 160}ms` }}
                        />
                      )}

                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-0.5 flex h-8 w-8 items-center justify-center border border-paper/25 bg-ink font-mono text-[0.62rem] text-cyan"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <h4 className="font-display text-title uppercase text-paper">{rec.title}</h4>
                        {wasAdded && (
                          <span className="border border-cyan/45 px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-cyan">
                            Forudsætning
                          </span>
                        )}
                      </div>
                      <p className="mt-2.5 max-w-measure text-sm leading-relaxed text-muted">
                        {rec.rationale}
                      </p>
                      {service && (
                        <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                          {service.title}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ol>

              <div className="mt-10">
                <button type="button" onClick={sendAsEnquiry} className="btn btn-primary btn-lg w-full">
                  Send som forespørgsel
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
                <p className="mt-4 text-xs leading-relaxed text-muted">
                  Planen følger med i beskeden, så I ikke skal skrive det hele igen. Ingen
                  automatiske mails, ingen opfølgende salgsopkald.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteDiagnostic;
