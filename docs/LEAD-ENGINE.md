# Lead Engine v1

The website captures an enquiry at `/api/lead-capture`, saves an immutable private
receipt in Netlify Blobs, and calls Supabase's `ingest_growth_lead` RPC. A brand's
server-only intake secret chooses the brand. The browser cannot choose another
brand or submit its own score. The public/publishable Supabase key alone cannot
read or write leads. No service-role key is used by this integration.

Production receipts use `growth-lead-intake`. Previews use a store named for their
deploy id and never forward to the production database. A scheduled function
retries pending production receipts every ten minutes. A duplicate intake id in
the same brand returns the existing lead without overwriting human edits.

Both website forms keep the Netlify Forms archive and the existing configured
email notification as a secondary delivery path. The primary receipt is saved
before the browser submits that archive. Notification delivery is therefore
best-effort from the browser; the admin lead and retry queue are independent of
email delivery. Check Netlify Forms against the admin pipeline during the pilot.

## Qualification

An enquiry starts at 30 for requesting contact. Explicit first-website/redesign
need adds 25; more-enquiries need adds 15. Starting within a month adds 25, within
three months adds 10. A stated budget of at least DKK 10,000 adds 15.
Gold is 80+, Silver is 50+, Bronze is below 50. Unknown information adds nothing.
Scan scores do not establish buying intent. This score is separate from the
legacy opportunity score and sales probability. Newly ingested leads have zero
estimated revenue until a human qualifies a deal.

## Privacy and operations

Only submitted details and submission-page campaign parameters are recorded.
No private search history, cross-visit tracking cookie or anonymous visitor
identity is collected. Receipts are private and not exposed by a public read API.
No messages are automatically sent to prospects. Review and remove enquiry data
and its receipt when a deletion request is handled; the queue does not silently
delete an undelivered enquiry. During the pilot, reconcile pending receipts daily
and follow the website's retention policy for concluded enquiries.

## Validation

`npm test` covers validation, deterministic qualification, duplicate receipts,
failed delivery and destination restrictions. `npm run typecheck:functions`
checks both lead functions. The admin repository has the SQL migration, brand
isolation tests and operating instructions.


## Growth Scan delivery to admin

Every queued, running, completed or failed scan is forwarded server-side through
`ingest_growth_scan` using the existing brand intake secret. The scanner keeps its
original Blob record before attempting delivery. `scan-delivery` retries changed
or undelivered reports every ten minutes, including reports from before the
integration. A digest prevents unchanged report deliveries; database receipts
provide idempotency and prevent stale state from replacing a completed report.
Deploy previews never deliver into production.

The existing authenticated scan-admin endpoint accepts POST to retry the same
bounded delivery batch (20 records maximum). It uses SCAN_ADMIN_TOKEN and creates
no new scan or paid AI request. Run it again if pending remains true. No key is
exposed in browser code. Contact forms carry the public scan id so admin can link
the enquiry to its report in either arrival order.
