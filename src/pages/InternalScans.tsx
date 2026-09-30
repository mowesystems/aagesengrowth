import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Copy, ExternalLink, FileText, Image as ImageIcon, Lock } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { fileUrl } from '@/lib/growthScan/client';
import type { InternalFinding, ScanListItem, ScanRecord } from '@/lib/growthScan/types';

/**
 * The internal Growth Scan view — for Marius, not for customers.
 *
 * Everything the customer report leaves out: every finding with its evidence,
 * sources and confidence, the pages the browser opened, the raw signals, the
 * Growth Engine tasks the scan points to and a suggested opening line for a
 * personal conversation. Protected by SCAN_ADMIN_TOKEN (entered once, kept in
 * this browser), never linked from the site and never indexed.
 */

const TOKEN_KEY = 'ag-scan-admin-token';
const AREA: Record<string, string> = {
  website: 'Website',
  google: 'Google',
  gbp: 'Anmeldelser/Google-profil',
  contact: 'Kontakt/booking',
  followup: 'Opfølgning',
};
const CONFIDENCE: Record<string, string> = { high: 'Høj', medium: 'Middel', low: 'Lav' };

const readToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY) ?? '';
  } catch {
    return '';
  }
};

const useAdmin = <T,>(path: string, token: string) => {
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<string>('');
  React.useEffect(() => {
    if (!token) return;
    let live = true;
    setError('');
    fetch(`/api/growth-scan-admin${path}`, { headers: { 'x-admin-token': token }, cache: 'no-store' })
      .then(async (res) => {
        if (!live) return;
        if (res.status === 401) return setError('Forkert token.');
        if (res.status === 503) return setError('SCAN_ADMIN_TOKEN er ikke sat på Netlify.');
        if (!res.ok) return setError(`Fejl ${res.status}`);
        setData((await res.json()) as T);
      })
      .catch(() => live && setError('Kunne ikke hente data.'));
    return () => {
      live = false;
    };
  }, [path, token]);
  return { data, error };
};

const TokenGate: React.FC<{ onToken: (t: string) => void; error?: string }> = ({ onToken, error }) => {
  const [value, setValue] = React.useState('');
  return (
    <form
      className="instrument max-w-md p-6"
      onSubmit={(e) => {
        e.preventDefault();
        try {
          localStorage.setItem(TOKEN_KEY, value.trim());
        } catch {
          /* session only */
        }
        onToken(value.trim());
      }}
    >
      <p className="meta-brand flex items-center gap-2">
        <Lock size={12} aria-hidden="true" /> Intern adgang
      </p>
      <label htmlFor="admin-token" className="field-label mt-4">
        Admin-token
      </label>
      <input id="admin-token" type="password" autoComplete="off" className="field" value={value} onChange={(e) => setValue(e.target.value)} />
      {error && <p className="field-error mt-2">{error}</p>}
      <button type="submit" className="btn btn-primary mt-5">
        Åbn
      </button>
    </form>
  );
};

const fmt = (iso?: string) =>
  iso ? new Date(iso).toLocaleString('da-DK', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '';

const ScanList: React.FC<{ token: string; onBadToken: () => void }> = ({ token, onBadToken }) => {
  const { data, error } = useAdmin<{ scans: ScanListItem[] }>('', token);
  React.useEffect(() => {
    if (error === 'Forkert token.') onBadToken();
  }, [error, onBadToken]);
  if (error) return <p className="text-critical">{error}</p>;
  if (!data) return <p className="text-muted">Henter …</p>;
  if (!data.scans.length) return <p className="text-muted">Ingen scanninger endnu.</p>;
  return (
    <ul className="rule">
      {data.scans.map((s) => (
        <li key={s.id} className="rule-row">
          <Link to={`/intern/scans/${s.id}`} className="flex min-h-12 items-center justify-between gap-4 py-3 hover:text-brand">
            <span className="font-semibold">{s.domain}</span>
            <span className="font-mono text-[0.7rem] text-muted">{fmt(s.createdAt)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const FindingRow: React.FC<{ f: InternalFinding }> = ({ f }) => (
  <li className="rule-row py-5">
    <div className="flex flex-wrap items-center gap-2">
      <span className={`chip ${f.shown ? 'chip-opportunity' : 'chip-pending'}`}>
        {f.shown ? 'I rapporten' : f.public ? 'Kunne vises' : 'Kun internt'}
      </span>
      <span className="chip chip-pending">{AREA[f.area] ?? f.area}</span>
      <span className="chip chip-pending">Sikkerhed: {CONFIDENCE[f.confidence]}</span>
      <span className="font-mono text-[0.62rem] text-muted">
        {f.id} · score {f.score}
        {f.structural ? ' · strukturel' : ''}
      </span>
    </div>
    <p className="mt-3 font-semibold leading-snug">{f.observed}</p>
    <p className="mt-1 text-[0.92rem] text-muted">{f.opportunity}</p>
    <p className="mt-3 text-[0.9rem]">
      <span className="font-semibold">Growth Engine-opgave:</span> {f.task}
    </p>
    <ul className="mt-2 space-y-1">
      {f.evidence.map((e) => (
        <li key={e} className="font-mono text-[0.68rem] leading-relaxed text-muted">
          ↳ {e}
        </li>
      ))}
    </ul>
    {f.sources.length > 0 && (
      <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[0.75rem]">
        {f.sources.map((s) => (
          <a key={s} href={s} target="_blank" rel="noopener noreferrer" className="link-inline">
            {s.replace(/^https?:\/\//, '')}
          </a>
        ))}
      </p>
    )}
  </li>
);

const ScanDetail: React.FC<{ id: string; token: string }> = ({ id, token }) => {
  const { data: r, error } = useAdmin<ScanRecord>(`/${id}`, token);
  const [copied, setCopied] = React.useState(false);
  if (error) return <p className="text-critical">{error}</p>;
  if (!r) return <p className="text-muted">Henter …</p>;
  const report = r.report?.da;
  const internal = r.internal;
  const tasks = internal ? [...new Set(internal.findings.filter((f) => f.public || f.score >= 3).map((f) => f.task))] : [];

  return (
    <div className="space-y-12">
      <div>
        <p className="meta-brand">
          {r.status} · {fmt(r.createdAt)} · {r.locale.toUpperCase()}
          {internal ? ` · ${Math.round(internal.durationMs / 1000)} s` : ''}
        </p>
        <h1 className="h-section mt-3">{r.domain}</h1>
        <div className="mt-4 flex flex-wrap gap-4 text-[0.9rem]">
          <a href={r.finalUrl ?? r.url} target="_blank" rel="noopener noreferrer" className="link-line">
            <ExternalLink size={13} aria-hidden="true" /> Åbn website
          </a>
          {r.files?.pdf && (
            <a href={fileUrl(r.id, 'pdf')} className="link-line">
              <FileText size={13} aria-hidden="true" /> PDF
            </a>
          )}
          {r.files?.png && (
            <a href={fileUrl(r.id, 'png')} className="link-line">
              <ImageIcon size={13} aria-hidden="true" /> Billede
            </a>
          )}
        </div>
        {r.error && <p className="mt-4 text-critical">Fejl: {r.error.error} · {r.error.message}</p>}
      </div>

      {internal && (
        <section className="instrument p-6">
          <p className="meta-brand">Samtaleåbner (sendes aldrig automatisk)</p>
          <p className="mt-3 max-w-prose leading-relaxed">{internal.conversationStarter}</p>
          <button
            type="button"
            className="btn btn-outline mt-4"
            onClick={() => {
              void navigator.clipboard?.writeText(internal.conversationStarter).then(() => setCopied(true));
            }}
          >
            {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
            {copied ? 'Kopieret' : 'Kopiér'}
          </button>
        </section>
      )}

      {report && (
        <section>
          <p className="meta">Kundens rapport (dansk)</p>
          <p className="mt-3 text-[1.2rem] font-semibold">{report.headline}</p>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-[0.95rem]">
            {report.opportunities.map((o) => (
              <li key={o.id}>{o.observed}</li>
            ))}
          </ol>
          <p className="mt-3 text-[0.9rem] text-muted">
            Anbefaling ({report.recommendation.kind}): {report.recommendation.text}
          </p>
          {r.websiteJustified && internal && (
            <p className="mt-2 text-[0.9rem]">Nyt website begrundet af: {internal.websiteReasons.join(', ')}</p>
          )}
        </section>
      )}

      {tasks.length > 0 && (
        <section>
          <p className="meta">Mulige Growth Engine-opgaver</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-[0.95rem]">
            {tasks.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      )}

      {internal && (
        <section>
          <p className="meta">Alle fund ({internal.findings.length})</p>
          <ul className="mt-2 rule">
            {internal.findings.map((f) => (
              <FindingRow key={f.id} f={f} />
            ))}
          </ul>
        </section>
      )}

      {internal && (
        <section>
          <p className="meta">Sider åbnet i browseren</p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-[0.82rem]">
              <thead className="font-mono text-[0.62rem] uppercase text-muted">
                <tr>
                  <th className="py-2">Side</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Tekst</th>
                  <th>CTA i indhold</th>
                  <th>tel:</th>
                  <th>Formularer</th>
                </tr>
              </thead>
              <tbody>
                {internal.pages.map((p) => (
                  <tr key={p.url} className="border-t" style={{ borderColor: 'var(--line)' }}>
                    <td className="py-2 pr-3">
                      <a href={p.finalUrl} target="_blank" rel="noopener noreferrer" className="link-inline">
                        {new URL(p.finalUrl).pathname}
                      </a>
                    </td>
                    <td>{p.kind}</td>
                    <td>{p.status}</td>
                    <td>{p.textLength}</td>
                    <td>{p.bodyCtas}</td>
                    <td>{p.telLinks}</td>
                    <td>{p.forms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {internal.notes.length > 0 && (
            <ul className="mt-4 space-y-1 text-[0.85rem] text-muted">
              {internal.notes.map((n) => (
                <li key={n}>Note: {n}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {internal && (
        <details>
          <summary className="meta cursor-pointer">Rå signaler</summary>
          <pre className="mt-3 max-h-[480px] overflow-auto bg-paper-3 p-4 text-[0.7rem] leading-relaxed">
            {JSON.stringify(internal.signals, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
};

const InternalScans: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [token, setToken] = React.useState(readToken);
  const clear = React.useCallback(() => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* ignore */
    }
    setToken('');
  }, []);

  return (
    <>
      <SEOHead title="Growth Scan · intern" description="Intern visning." noindex />
      <section className="frame pb-24 pt-32 lg:pt-40">
        <div className="mb-10 flex items-center justify-between gap-4">
          {id ? (
            <Link to="/intern/scans" className="link-line">
              <ArrowLeft size={14} aria-hidden="true" /> Alle scanninger
            </Link>
          ) : (
            <h1 className="h-section">Growth Scan · intern</h1>
          )}
          {token && (
            <button type="button" onClick={clear} className="link-line text-[0.8rem] text-muted">
              Log ud
            </button>
          )}
        </div>
        {!token ? <TokenGate onToken={setToken} /> : id ? <ScanDetail id={id} token={token} /> : <ScanList token={token} onBadToken={clear} />}
      </section>
    </>
  );
};

export default InternalScans;
