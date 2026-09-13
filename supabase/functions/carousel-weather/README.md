# Quezon City carousel weather

Only the existing dashboard carousel is changed. Card, viewport and slide dimensions remain inherited from the existing styles.

The adoption illustration is an original image generated from the supplied pencil/watercolor reference, then compressed to a 600 × 600 WebP (about 31 KB). It is contained inside the existing 44% image area, so no animal is cropped.

## Automatic weather

`carousel-weather` is a Supabase Edge Function invoked by pg_cron every ten minutes, at minutes 7/17/27/37/47/57. It continues without an open browser. MET Norway Locationforecast supplies hourly forecast estimates for 14.6760, 121.0437, Quezon City. This is not real-time observation, PAGASA warnings, or a lightning detector. Upstream forecast refreshes can lag actual weather. MET Norway allows commercial reuse under CC BY 4.0; attribution is linked in the card.

The worker caches the forecast, honors Expires and If-Modified-Since, and uses one shared location for all visitors. It publishes one initial card, then republishes only when:

- Rain starts or increases between dry / rain / heavy rain (≥4 mm/h) / thunderstorm forecast.
- Wind crosses 35 km/h (clears below 25 km/h).
- Temperature crosses 32°C (clears below 30°C), or moves at least 3°C within about one hour.
- A less severe condition persists across two checks at least nine minutes apart.

Routine small changes, cloud cover, and day/night changes do not republish. These are editorial update thresholds, not official weather alert categories. Card values are the forecast at the timestamp shown as “Last change,” not a continuously refreshed current reading. A delayed worker check (>90 minutes) or stale provider model (>12 hours) displays a stale-state note while keeping the last card.

The frontend checks the shared published record every ten minutes while visible, and on returning to the app. Its SVG image is regenerated only when the publication timestamp or rendered slide size changes. No AI image API is called. This uses existing Supabase free allowances; 4,320 scheduled invocations per 30 days before visitors, and no weather API subscription is required.

## Security and operations

Apply setup.sql once through Supabase migrations, deploy index.ts and logic.mjs as `carousel-weather`, then apply schedule.sql. The setup generates a random job token in Vault and stores only its SHA-256 digest in the private worker table. Gateway JWT verification is disabled because the function performs its own job-token authentication. Neither the Vault token, digest, provider cache nor service-role key is readable by clients. Public roles can only select the published weather table.

Check `cron.job`, `cron.job_run_details`, `net._http_response`, and `weather_carousel_posts.last_checked_at`. Do not log or return Vault contents. To pause, run `select cron.unschedule('wagstack-quezon-city-weather');`. Existing pet/user tables are unaffected.

Verification: `node tests/weather.mjs`. Documentation: https://api.met.no/doc/TermsOfService and https://supabase.com/docs/guides/functions/schedule-functions.
