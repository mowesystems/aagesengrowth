import { createHash } from 'node:crypto';

export interface LeadIntake {
  intake_id: string;
  company: string;
  contact_person: string;
  email: string | null;
  phone: string | null;
  website: string | null;
  source: string;
  form_name: 'callback' | 'growth-review';
  need: string;
  timeline: string;
  budget: string;
  preferred_channel: 'phone' | 'email';
  message: string | null;
  scan_id: string | null;
  page: string | null;
  attribution: Record<string, string>;
  score: number;
  tier: 'gold' | 'silver' | 'bronze';
  score_reasons: string[];
  next_action: string;
  received_at: string;
}

export class IntakeError extends Error {}
const text = (v: unknown, max: number) => typeof v === 'string' ? v.trim().slice(0, max) : '';
const choice = (v: unknown, values: string[], fallback = 'unknown') => values.includes(String(v)) ? String(v) : fallback;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function qualify(lead: Pick<LeadIntake, 'need' | 'timeline' | 'budget' | 'form_name' | 'preferred_channel'>) {
  let score = 30;
  const reasons = ['Har selv bedt om kontakt (+30)'];
  if (['new_website', 'redesign'].includes(lead.need)) {
    score += 25; reasons.push('Har udtrykt behov for et website (+25)');
  } else if (lead.need === 'more_leads') {
    score += 15; reasons.push('Har udtrykt behov for flere kunder (+15)');
  }
  if (lead.timeline === 'month') { score += 25; reasons.push('Ønsker at starte inden for en måned (+25)'); }
  if (lead.timeline === 'quarter') { score += 10; reasons.push('Ønsker at starte inden for tre måneder (+10)'); }
  if (['10000_25000', '25000_plus'].includes(lead.budget)) { score += 15; reasons.push('Har oplyst et budget fra 10.000 kr. (+15)'); }
  const tier = score >= 80 ? 'gold' : score >= 50 ? 'silver' : 'bronze';
  const next_action = lead.preferred_channel === 'phone'
    ? 'Ring om henvendelsen. Afklar behov, beslutningstager og et konkret næste skridt.'
    : 'Svar personligt på e-mail. Henvis til henvendelsen og foreslå en kort afklaring.';
  return { score, tier, score_reasons: reasons, next_action } as const;
}

export function normalizeIntake(body: Record<string, unknown>, now = new Date()): LeadIntake | null {
  if (text(body['bot-field'], 500)) return null;
  const form_name = choice(body['form-name'], ['callback', 'growth-review']);
  if (form_name === 'unknown') throw new IntakeError('Unknown form.');
  const intake_id = text(body.intake_id, 40);
  if (!UUID.test(intake_id)) throw new IntakeError('Invalid request identifier.');
  const company = text(body.company, 200);
  const contact_person = text(body.name, 150);
  const email = text(body.email, 254).toLowerCase() || null;
  const phone = text(body.phone, 40) || null;
  if (!company || !contact_person) throw new IntakeError('Name and company are required.');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new IntakeError('Invalid email.');
  if (phone && !/^[+\d\s().-]{6,40}$/.test(phone)) throw new IntakeError('Invalid phone.');
  if (form_name === 'callback' && (!phone || phone.replace(/\D/g, '').length < 8)) throw new IntakeError('Phone is required.');
  if (form_name === 'growth-review' && !email) throw new IntakeError('Email is required.');
  const safeUrl = (value: unknown) => {
    const raw = text(value, 2048);
    if (!raw) return null;
    try {
      const url = new URL(raw.includes('://') ? raw : `https://${raw}`);
      if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return null;
      return `${url.origin}${url.pathname}`;
    } catch { return null; }
  };
  const preferred_channel: LeadIntake['preferred_channel'] = form_name === 'callback' || body.preferred_channel === 'phone' ? 'phone' : 'email';
  if (preferred_channel === 'phone' && !phone) throw new IntakeError('A phone number is required for a call.');
  const facts = {
    need: choice(body.need, ['new_website', 'redesign', 'more_leads', 'not_sure']),
    timeline: choice(body.timeline, ['month', 'quarter', 'research']),
    budget: choice(body.budget, ['under_10000', '10000_25000', '25000_plus', 'not_sure']),
    form_name: form_name as LeadIntake['form_name'], preferred_channel,
  };
  const attribution: Record<string, string> = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'referrer']) {
    const value = text(body[key], 250);
    if (value) attribution[key] = key === 'referrer' ? safeUrl(value) ?? '' : value;
  }
  return {
    intake_id, company, contact_person, email, phone, ...facts,
    website: safeUrl(body.website || body['scan-url']),
    source: text(body.source, 100) || 'website',
    message: text(body.message, 5000) || null,
    scan_id: UUID.test(String(body['scan-id'])) ? String(body['scan-id']) : null,
    page: safeUrl(body.page), attribution,
    ...qualify(facts), received_at: now.toISOString(),
  };
}

export const intakeDigest = (lead: LeadIntake) => {
  const stable: Partial<LeadIntake> = { ...lead };
  delete stable.received_at;
  return createHash('sha256').update(JSON.stringify(stable)).digest('hex');
};
