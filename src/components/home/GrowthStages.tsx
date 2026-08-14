import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { growthStages, pillars } from '@/data/services';

const pillarById = (id: string) => pillars.find((pillar) => pillar.id === id);

/**
 * The growth system.
 *
 * Eight services is what can be bought; four stages is what a customer
 * actually moves through. Each stage opens to show the pillars underneath it
 * and what they concretely cover — the full scope, with every inclusion and
 * exclusion, stays on /ydelser, which each panel links into.
 *
 * The statement column is sticky on desktop so the argument stays present
 * while the stages are read; on mobile the whole thing collapses to stacked
 * disclosure panels with no sticky behaviour at all.
 */
const GrowthStages: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(growthStages[0]?.id ?? null);

  return (
    <div className="grid grid-cols-4 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-x-10">
      <div className="col-span-4 lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <p className="meta-lit">Systemet</p>
          <h2 className="mt-6 max-w-measure font-display text-section text-paper text-balance">
            Fire trin fra at blive fundet til at blive valgt.
          </h2>
          <p className="mt-6 max-w-measure text-[0.95rem] leading-relaxed text-muted text-pretty">
            De fleste virksomheder har ikke et markedsføringsproblem, men et rækkefølgeproblem. Her
            er den rækkefølge, arbejdet giver mening i — og hvad hvert trin dækker.
          </p>
          <Link to="/ydelser" className="link-line mt-8">
            Se hvad hver ydelse indeholder — og ikke indeholder
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="col-span-4 lg:col-span-8">
        <div className="rule">
          {growthStages.map((stage, index) => {
            const isOpen = openId === stage.id;
            const panelId = `stage-panel-${stage.id}`;
            const buttonId = `stage-button-${stage.id}`;

            return (
              <Reveal key={stage.id} delay={index * 60} className="rule-row block">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : stage.id)}
                    className="group flex w-full items-start justify-between gap-6 py-7 text-left lg:py-9"
                  >
                    <span className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-7">
                      <span className="index-mark shrink-0 text-cyan/80">
                        {stage.index} <span className="text-paper/50">—</span> {stage.label}
                      </span>
                      <span
                        className={`font-display text-display uppercase leading-[0.9] transition-colors duration-300 ${
                          isOpen ? 'text-paper' : 'text-paper/70 group-hover:text-paper'
                        }`}
                      >
                        {stage.title}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className={`mt-2 flex h-7 w-7 shrink-0 items-center justify-center border transition-colors ${
                        isOpen
                          ? 'border-paper bg-paper text-ink'
                          : 'border-paper/25 text-paper group-hover:border-paper'
                      }`}
                    >
                      {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                    </span>
                  </button>
                </h3>

                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
                  <div className="pb-9 lg:pb-10">
                    <p className="max-w-prose text-[0.95rem] leading-relaxed text-muted text-pretty">
                      {stage.body}
                    </p>

                    {/* Rules rather than a gap-filled background grid: a stage
                        with one pillar would otherwise leave a lit empty cell
                        where the second one would have been. */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2">
                      {stage.pillarIds.map((pillarId) => {
                        const pillar = pillarById(pillarId);
                        if (!pillar) return null;
                        return (
                          <div
                            key={pillar.id}
                            className="border-t border-paper/12 py-6 sm:border-l sm:border-t-0 sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
                          >
                            <p className="font-sans text-[0.95rem] font-medium text-paper">
                              {pillar.title}
                            </p>
                            {pillar.explainer && (
                              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-cyan/80">
                                {pillar.explainer}
                              </p>
                            )}
                            <ul className="mt-4 flex flex-wrap gap-x-2.5 gap-y-1.5">
                              {pillar.covers.map((entry) => (
                                <li
                                  key={entry}
                                  className="border border-paper/12 px-2.5 py-1 text-xs text-muted"
                                >
                                  {entry}
                                </li>
                              ))}
                            </ul>
                            <Link to={pillar.href} className="link-line mt-4">
                              Se ydelsen
                              <ArrowRight size={13} aria-hidden="true" />
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GrowthStages;
