/** Capture only the context of the enquiry, without cross-visit tracking cookies. */
export async function captureLead(data: FormData, intakeId: string) {
  const payload: Record<string, string> = { intake_id: intakeId, page: `${location.origin}${location.pathname}`, referrer: document.referrer };
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
    const value = new URLSearchParams(location.search).get(key);
    if (value) payload[key] = value.slice(0, 250);
  }
  data.forEach((value, key) => { if (typeof value === 'string') payload[key] = value; });
  payload.page = `${location.origin}${location.pathname}`;
  const response = await fetch('/api/lead-capture', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  if (!response.ok) throw new Error('The enquiry could not be saved.');
  const result = await response.json();
  if (!result.received) throw new Error('The enquiry was not acknowledged.');
  // Preserve the existing Netlify Forms archive and configured notifications.
  // A failure here must not turn an already safely saved enquiry into an error.
  const archive = new URLSearchParams();
  Object.entries(payload).forEach(([key, value]) => archive.set(key, value));
  void fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: archive.toString(), keepalive: true }).catch(() => undefined);
}
