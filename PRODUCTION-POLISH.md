# WagStack production polish — 19 September 2026

Baseline: `5bec193` on `main`. This pass preserves the static application, existing routes, Supabase schema, dashboard layout, carousel dimensions, typography family, and established light/dark direction.

## Implemented

- Password reset request, one-use recovery callback, expired-link recovery, password matching, production redirects, and a branded reset email template. Recovery links are not consumed automatically on page load.
- Sign-in keyboard focus, focus trapping, Escape, Enter submission, input validation, and duplicate-submit protection. Account actions use customer-facing wording.
- Refresh-token requests share one in-flight operation. Temporary server/network failures do not silently discard the session. Late refresh responses cannot restore a logged-out session. Logout clears the active account cache and guest state, including across tabs.
- Fresh signed-in workspaces start empty. Initial hydration is gated so empty browser defaults cannot overwrite existing cloud records. Account confirmation avoids carrying another account's cache forward.
- Customer hydration and reconciliation explicitly filter by owner, including for an account with administrator read permissions. The customer adapter does not run on the admin route.
- Saves made during an in-flight save are queued. Failed edits retain an account-specific pending marker; initialization retries those edits before reading cloud state. Connection failures provide a Retry action.
- Hydrated hotel/grooming types match the application's expected labels. Hotel timestamps parse the actual check-in/check-out times in Philippine time instead of falling back to the current time. Cart synchronization accepts live product UUIDs as well as legacy keys.
- Empty pet routes render without throwing. Repeated pet names are rejected during Add Pet because health records are currently keyed by name. Booking submissions require an existing pet and valid dates. Empty health summaries no longer claim vaccinations are current.
- Adoption/weather content and pagination are restored after in-app navigation. Shared content is cached between route changes and refreshed on return to the visible tab. Carousel dimensions are retained. Weather uses consistent interface icons, a last-checked timestamp, stale-data wording, and dark-mode colors.
- Shop loading, failure/retry, and empty states replace fallback inventory on failed live requests. Product images use lazy loading, asynchronous decoding, and reserved dimensions.
- Removed the storage monkey-patch that used JavaScript stack inspection to simulate an authenticated guest. Guest browsing is now explicit in the public-page guard.
- Removed initial sample admin metrics. Fixed the customer script crash on the separate admin document. Admin reload preserves the selected tab; status controls have accessible labels; failures offer Retry. Mobile tables scroll within their container and navigation remains within the viewport.
- Shared custom-dialog keyboard behavior, visible focus indicators, larger mobile form inputs, dark admin form surfaces, and dynamic dashboard pet/reward summaries.

## Verification

The browser suites intercept service traffic. They exercise real application JavaScript with controlled API responses; they do not create production users, bookings, orders, or send emails.

`tests/auth-confirm.cjs` checks confirmation success, expiration, rate limiting, server failures, unsupported token types, validated legacy links, production signup/resend redirects, and mobile/dark callback layouts.

`tests/production-polish.cjs` checks password recovery and update, mismatched passwords, expired-link reissue, modal keyboard handling, sign-in failure/retry, empty account hydration, concurrent refresh, queued/failed saves, account-scoped queries, admin access/error states, admin refresh, catalog retry, carousel restoration and dimensions, and 144 route/theme/viewport combinations:

- Home, My Pets, Health, Grooming, Hotel, Rewards, Shop, Profile.
- Light and dark.
- 360, 375, 390, 430, 768, 1280, 1366, 1440, 1920 pixels.

Additional admin layout checks cover light/dark at 390 and 1440 pixels. Screenshots were inspected for the customer dashboard, pet profile, sign-in dialog, weather card, and admin tables/navigation. Browser test output records assertions and uncaught JavaScript errors.

Run with Playwright installed:

```sh
node tests/auth-confirm.cjs
node tests/production-polish.cjs
```

Optional `PLAYWRIGHT_MODULE`, `CHROMIUM_PATH`, and `QA_OUTPUT` select an existing browser runtime and a screenshot/report directory.

Read-only production database inspection confirmed RLS is enabled on all 17 public tables and the weather worker has an active ten-minute cron schedule. No production schema or data was changed. RLS being enabled is not equivalent to validating every business rule.

## Release requirements and remaining limits

This branch is a reviewable polish change set, not a declaration that every production integration is certified.

1. Apply and verify Supabase sender, redirect allowlist, confirmation and reset templates as documented in `emails/README.md`. The intended sender is `hello@brickand.bond`. Repository edits do not update hosted SMTP settings. No real inbox delivery was tested.
2. Verify authenticated cloud writes with designated test accounts before release. Browser fixtures establish client behavior; they do not prove SMTP delivery, RLS enforcement under every role, payment settlement, real booking availability, or AI avatar availability.
3. Existing rewards, membership and order behavior still allows client-driven values. Live policies permit owners to update their own wallets/orders. Server-side validation of amounts, fulfillment/status transitions, entitlement and reward awards is a release requirement before relying on these for paid business operations. This pass does not invent replacement reward rules or loosen any policy.
4. Messages, notes and some document/photo interactions retain their existing browser-local architecture. A booking-request save does not establish transactional email delivery or a confirmed appointment. These require end-to-end backend work and business rules beyond visual refinement.
5. Pet health collections are still keyed by pet name. Add Pet now prevents duplicates; a future ID-based migration needs careful handling of existing records and rename paths.
6. The frontend reports weather freshness; the existence of an active cron job alone does not prove every scheduled execution succeeds. The worker was not redeployed.

Production `main` is intentionally unchanged; review and integration verification should precede promotion.
