import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeIntake, intakeDigest, IntakeError } from '../netlify/lead-engine/intake.ts';
import { deliverLead } from '../netlify/lead-engine/delivery.ts';
import { enqueueLead } from '../netlify/lead-engine/queue.ts';
const raw = { intake_id: '79c173d0-f1ab-4d8f-a1bd-4dcc864b89f3', 'form-name': 'growth-review', name: 'Test', company: 'TEST — Growth Engine', email: 'kontakt@aagesengrowth.dk' };

test('missing website and score fields never invent buying intent', () => {
  const lead = normalizeIntake({ ...raw, score: 100, tier: 'gold', brand_slug: 'another-company', 'scan-score': '10' });
  assert.equal(lead.tier, 'bronze'); assert.equal(lead.score, 30); assert.equal(lead.need, 'unknown'); assert.equal(lead.website, null);
  assert.equal('brand_slug' in lead, false);
});
test('explicit need and urgency qualify gold; research alone stays bronze', () => {
  assert.equal(normalizeIntake({ ...raw, need: 'new_website', timeline: 'month' }).tier, 'gold');
  assert.equal(normalizeIntake({ ...raw, need: 'redesign', timeline: 'quarter' }).tier, 'silver');
  assert.equal(normalizeIntake({ ...raw, timeline: 'research' }).tier, 'bronze');
  assert.equal(normalizeIntake({ ...raw, need: 'redesign', timeline: 'month', budget: '25000_plus' }).score, 95);
});
test('validates actual required contact data and ignores honeypot bots', () => {
  assert.throws(() => normalizeIntake({ ...raw, email: 'wrong' }), IntakeError);
  assert.throws(() => normalizeIntake({ ...raw, 'form-name': 'callback', phone: '' }), IntakeError);
  assert.throws(() => normalizeIntake({ ...raw, company: '' }), IntakeError);
  assert.throws(() => normalizeIntake({ ...raw, preferred_channel: 'phone' }), IntakeError);
  assert.equal(normalizeIntake({ ...raw, 'bot-field': 'filled by bot' }), null);
});
test('sanitizes URLs and preserves campaign context without query strings', () => {
  const lead = normalizeIntake({ ...raw, website: 'javascript:alert(1)', page: 'https://aagesengrowth.com/hjemmesider?email=private@example.com', referrer: 'https://google.com/?q=private', utm_campaign: 'website-search' });
  assert.equal(lead.website, null); assert.equal(lead.page, 'https://aagesengrowth.com/hjemmesider');
  assert.equal(lead.attribution.referrer, 'https://google.com/'); assert.equal(lead.attribution.utm_campaign, 'website-search');
});
test('idempotent intake digest excludes receipt timestamp, but detects changed details', () => {
  const a = normalizeIntake(raw, new Date('2026-10-28T10:00:00Z'));
  const b = normalizeIntake(raw, new Date('2026-10-28T11:00:00Z'));
  assert.equal(intakeDigest(a), intakeDigest(b));
  assert.notEqual(intakeDigest(a), intakeDigest({ ...b, company: 'different' }));
});
test('queue retains one immutable enquiry and rejects mismatched retries', async () => {
  const map = new Map();
  const store = { async setJSON(k, v) { if (map.has(k)) return { modified: false }; map.set(k, v); return { modified: true }; }, async get(k) { return map.get(k) || null; } };
  const lead = normalizeIntake(raw);
  await enqueueLead(lead, store); await enqueueLead(lead, store);
  assert.equal(map.size, 1);
  await assert.rejects(enqueueLead({ ...lead, company: 'changed' }, store), /intake_conflict/);
});
test('delivery acknowledges only a real destination id, and keeps failures retryable', async () => {
  const lead = normalizeIntake(raw);
  const config = { url: 'https://test.supabase.co', key: 'test-key', secret: 'test-secret' };
  let calls = 0;
  const send = async (url, init) => { calls++; assert.match(url, /rpc\/ingest_growth_lead$/); assert.equal(JSON.parse(init.body).ingest_secret, 'test-secret'); return Response.json(raw.intake_id); };
  assert.equal(await deliverLead(lead, config, send), true); assert.equal(calls, 1);
  assert.equal(await deliverLead(lead, config, async () => new Response('paused', { status: 503 })), false);
  assert.equal(await deliverLead(lead, config, async () => Response.json({ success: true })), false);
  assert.equal(await deliverLead(lead, {}, send), false);
  assert.equal(await deliverLead(lead, { ...config, url: 'https://malicious.example.com' }, send), false);
  assert.equal(calls, 1);
});
