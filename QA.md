# WagStack interface QA — September 12, 2026

Scope: dark palette, rendering performance, Add Pet placement, responsive navigation, shop and Updates imagery.

## Verification

121 local Chromium checks passed, with no uncaught JavaScript errors:

- Nine customer routes, two themes, six viewport widths: 320, 390, 768, 900, 1024 and 1440 pixels.
- No page or main-content horizontal overflow; no broken loaded images.
- Exactly one Add Pet launcher on My Pets, after the pet switch buttons; none on other pages.
- Add Pet persists after reload and preserves existing pets; Escape closes the dialog and restores focus.
- Bottom navigation, More dialog and secondary destinations work.
- Profile editor retains name, breed, age, weight and photo fields.
- Shop filtering, item selection, checkout product/price resolution and cart persistence across routes.
- Both grooming and hotel request flows persist in local test state.
- Updates carousel controls and booking CTA navigation.
- No observed DOM mutations during a 1.2-second settled idle sample.

Screenshots inspected: desktop home, mobile dark home, mobile pet profile and mobile dark shop.

## Performance changes

- Replaced multiple UI MutationObservers with one scheduled update pass, disconnected during its own DOM writes.
- Made repeated title/icon/guest-label updates conditional.
- Removed the obsolete customer-side admin module that recreated the Admin link while another module deleted it.
- Restored the original flowing contour background through a deferred module, capped at 20 frames per second with lower pixel density; rendering pauses in hidden tabs and for reduced motion. The shared UI loop fixes remain in place.
- Removed full-document SVG styling scans and nested backdrop blur on main content surfaces.
- Served eight matching product images and one Updates image as local WebP assets (approximately 124 KB combined on disk).

## Limits

QA used isolated local browser state and blocked outbound service requests. No authenticated Supabase writes, payments, real orders, emails or AI avatar calls were made. Cloud sign-in/sync and AI avatar generation require separate integration verification. Conversion improvement has not been measured; banner copy now includes direct booking and shop actions.

Generated catalog and banner visuals are illustrative assets for the existing concept shop; they are not photographs of verified physical inventory.

## Motion and compact-banner correction

- Restored automatic grooming reel movement at 320, 390, 768 and 1440 pixels; hover/focus pauses it and reduced motion disables it.
- Updates banner reduced from 244 to 188 pixels on desktop, and 266 to 204 pixels on mobile, retaining imagery and direct CTAs.
- Re-ran all 121 local QA checks successfully after these corrections.

## Visual QA corrections — September 13, 2026

- Pet insight cards use one column on phones, with complete metrics and dates. The photo action no longer overlaps the active-pet heading.
- Dashboard Health labels wrap without clipping; mid-size desktop layouts use two columns and cards grow with their content.
- Dark hotel badges, shop labels and rewards summaries use readable foreground and surface colors.
- Mobile More includes all six destination icons plus the existing Sign in and Accessibility controls. Accessibility expands within the sheet, and Sign in closes the sheet before opening its dialog.
- 42 focused local Chromium checks passed with no uncaught JavaScript errors: Home, My Pets and Hotel at 320, 390, 620, 768, 1024 and 1440 pixels in both themes, plus menu controls, grooming motion, reduced motion and desktop control restoration.
- Screenshots used the site's actual Poppins font and were inspected for dark desktop Home, phone pet cards, More and expanded Accessibility. Existing compact Updates dimensions and background animation are retained.
- Authentication dialog opening was verified without submitting credentials. The integration limits above still apply.

## Accessibility, rail and Updates refinement — September 13, 2026

- Removed the text-size control and its event handlers. Accessibility now offers High contrast, Reduce motion and Underline links.
- High contrast uses stronger light/dark border tokens and two-pixel card/control edges instead of a whole-page contrast filter. Reset restores the default borders.
- Constrained desktop rail content to its available width so both rounded ends remain visible.
- Reused the local Phosphor duotone scissors for grooming navigation, dashboard, mobile Book/More, pet history and Full Grooming service selection.
- Aligned the desktop Updates and WagStack cards at 174 pixels high, preserving the mobile Updates height.
- 40 focused browser checks passed across both themes and 320, 390, 768, 1024 and 1440 pixels. Verified border/reset behavior, removed text controls, rail bounds, card alignment and consistent grooming icons, with no uncaught JavaScript errors.
- Also checked the Full Grooming selector and Updates controls with high contrast enabled. Inspected desktop and mobile screenshots, including expanded Accessibility.

## Dashboard hover motion and centering — September 13, 2026

- Updates label and arrow controls overlay the slide; the image fills its side of the card from top to bottom.
- Grooming rests still and scrolls only on hover or visible keyboard focus. Its two-booking window is vertically centered on desktop and stacked below the heading on small phones.
- Restored two Health marquee rows moving in opposite directions on hover. Repeated visual copies are hidden from assistive technology, with one accessible category summary.
- Both effects pause on pointer exit, stay still on touch devices and respect reduced motion.
- Equal desktop columns and shared minimum heights keep Health & Care and My Pets the same size. The pet fan is centered in its available content area.
- 18 focused checks passed across six widths and both themes, covering dimensions, centering, overlay bounds, hover/start/stop behavior, opposing directions, reduced motion and the Updates next control. A separate touch-emulated check confirmed paused motion. No uncaught JavaScript errors were observed.

## Account confirmation — September 13, 2026

- Signup and resend requests explicitly target the production confirmation page.
- Added a standalone callback with click-to-confirm token verification, expired-link recovery, resend throttling and validated legacy signup sessions. Credentials are removed from the address bar. A second link opened in the same tab is handled correctly.
- Added a branded, responsive Confirm signup email template and documented the required hosted sender, template and redirect settings in `emails/README.md`.
- `tests/auth-confirm.cjs` passed with intercepted Auth responses: successful and expired tokens, server errors, rate limiting, unsupported types, invalid session rejection, root callback forwarding, signup/resend parameters and the resend UI. No real accounts or emails were created.
- Inspected the email at 320 and 600 pixels and the callback in light/dark themes at 320, 390 and 900 pixels, with no horizontal overflow or uncaught JavaScript errors. This is browser rendering QA, not Gmail/Outlook inbox rendering verification.
- Hosted Supabase sender/template/URL settings and real email delivery still require an authenticated dashboard session and the authorized SMTP provider configuration. Repository changes alone do not change those settings.
