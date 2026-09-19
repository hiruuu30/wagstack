# Your Brand — Pet-care client demo

Isolated clone of the verified customer application. Production baseline content matches release f3deae1ae528bd6b8fbbf924aa815dbddfb355eb. The production branch and deployment are not part of this demo's release workflow.

## Demo features

- Original customer layout, profiles, health records, grooming, hotel, rewards, shop and local checkout.
- Separate browser-only sample workspace, rolling appointment dates, reset control.
- Customer/Owner perspective switch with shared local appointment status and orders.
- Optional six-step guided story with skip/replay and sample request shortcut.
- Business name, logo HTTPS URL, accent, client attribution and personalized share links.
- Private inquiry collection and anonymous event reporting using a dedicated PRIVATE Vercel Blob store.
- Presenter-mode analytics exclusion, optional owner IP exclusions, Do Not Track support.
- Inquiry error recovery with a user-opened email draft; no false success when backend unavailable.

## Separate Vercel project

Import repository branch `demo/client-showcase` into a NEW project named `pet-care-client-demo`. Set its production branch to `demo/client-showcase`, root to repository root, framework Other. The build and output directory are in vercel.json. Attach `demo.brickand.bond` only to this new project.

Connect a new PRIVATE Vercel Blob store to this demo project. Supply `BLOB_READ_WRITE_TOKEN`, a random `DEMO_ADMIN_KEY` of at least 24 characters, and optional `DEMO_EXCLUDED_IPS`. Never copy production account or database secrets into this project. Redeploy after setting environment variables. Requests are collected in the private report; no automatic email notification is sent.

Open `/?presenter=1` on the presenter's browser before reviewing. Personalize & share copies prospect links without presenter mode. `/reports.html` requires the report key; it is never stored in browser storage. Analytics distinguish anonymous browsers, not identified people. Events are deduplicated by browser, event, step and minute; reports use UTC dates. Protect public POST endpoints with Vercel Firewall rate limits before high-volume outreach.

## Isolation

No source application account or database connections remain. Customer records, bookings and shop orders are local demo data. Browser CSP restricts fetch connections to this origin. Only dedicated event/inquiry/report APIs exist. Public pages never expose lead records. AI image generation is deliberately disconnected; demo says so. Weather is labeled sample data.

`npm run dev` serves the demo locally; APIs return an explicit unavailable response locally. `npm run build` emits only runtime assets into dist, excluding docs, server source, git files and secrets.

## Verification

Local verification passed 32 route/viewport combinations at 360, 390, 768, and 1440 pixels with no horizontal overflow or uncaught script errors. Also checked: full grooming request → owner confirmation → customer status, guided-tour request handoff and skip, shop checkout → owner fulfillment, presenter tracking exclusion, and inquiry failure recovery. Server guards reject cross-origin submissions, unconfigured storage, and unauthenticated reporting. Live inquiry delivery and reporting require the new private storage connection before they can be verified.
