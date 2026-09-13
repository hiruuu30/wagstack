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
