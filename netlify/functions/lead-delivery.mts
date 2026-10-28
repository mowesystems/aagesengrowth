import type { Config, Context } from '@netlify/functions';
import { deliveryConfig, deliverQueued, queueStore, type QueuedLead } from '../lead-engine/queue.ts';

export default async (_req: Request, context: Context) => {
  if (context.deploy.context !== 'production') return;
  const store = queueStore(context.deploy);
  const config = deliveryConfig();
  if (!config.url || !config.key || !config.secret) { console.warn('lead-delivery: integration is not configured'); return; }
  let attempted = 0;
  for await (const page of store.list({ prefix: 'received/', paginate: true })) {
    for (const blob of page.blobs) {
      const id = blob.key.slice('received/'.length);
      if (await store.get(`delivered/${id}`)) continue;
      const queued = await store.get(blob.key, { type: 'json' }) as QueuedLead | null;
      if (!queued) continue;
      if (!(await deliverQueued(queued.lead, config, store, true))) {
        // Avoid hammering a paused database; try again on the next scheduled run.
        console.warn('lead-delivery: destination unavailable; enquiry retained'); return;
      }
      if (++attempted >= 20) return;
    }
  }
};
export const config: Config = { schedule: '*/10 * * * *' };
