import { getStore } from '@netlify/blobs';
import { deliverLead, type DeliveryConfig } from './delivery.ts';
import { intakeDigest, type LeadIntake } from './intake.ts';

declare const Netlify: { env: { get(key: string): string | undefined } };
export const queueStore = (deploy: { context: string; id: string }) => {
  const production = deploy.context === 'production';
  return getStore({ name: production ? 'growth-lead-intake' : `growth-leads-preview-${deploy.id || 'local'}`, consistency: 'strong' });
};
export const deliveryConfig = (): DeliveryConfig => ({
  url: Netlify.env.get('GROWTH_SUPABASE_URL'),
  key: Netlify.env.get('GROWTH_SUPABASE_PUBLISHABLE_KEY'),
  secret: Netlify.env.get('GROWTH_INGEST_SECRET'),
});
export interface QueuedLead { lead: LeadIntake; digest: string }

export async function enqueueLead(lead: LeadIntake, store: ReturnType<typeof queueStore>) {
  const digest = intakeDigest(lead);
  const key = `received/${lead.intake_id}`;
  const result = await store.setJSON(key, { lead, digest }, { onlyIfNew: true });
  if (!result.modified) {
    const existing = await store.get(key, { type: 'json' }) as QueuedLead | null;
    if (!existing || existing.digest !== digest) throw new Error('intake_conflict');
  }
  return lead.intake_id;
}

export async function deliverQueued(lead: LeadIntake, config: DeliveryConfig, store: ReturnType<typeof queueStore>, production: boolean) {
  // Previews never forward test enquiries into the production database.
  if (!production) return false;
  const marker = `delivered/${lead.intake_id}`;
  if (await store.get(marker)) return true;
  if (!(await deliverLead(lead, config))) return false;
  await store.set(marker, new Date().toISOString());
  return true;
}
