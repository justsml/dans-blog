# Paper atelier shell verification

Implementation: `96113aae4`; contact-state and theme-import repair: `28baa5278`.

## Verified on the local integration server

- All 16 sampled ordinary routes returned HTTP 200 and included the migrated
  masthead, theme picker, and full footer. Samples covered home, category index
  and AI category, About, Contact, Consulting landing and all six services,
  Open Source Journal, challenges, Arabic home and Arabic Contact.
- `/404` returned the expected HTTP 404 with the migrated shell and error sheet.
- All 15 owned Astro templates compiled with `@astrojs/compiler` without errors.
- Native T3 browser inspection: home in desktop dark and mobile light; Consulting
  in mobile light/dark and desktop dark; category, About, Contact, and AI service
  desktop dark. Arabic home and Contact were inspected in desktop light.
- Theme picker can select Dark using native keyboard typeahead (`d`, Enter).
- Arabic layouts mirror the collage and navigation and retain native RTL form
  alignment. Contact was checked after restoring its hidden initial statuses and
  honeypot; no real submission was made.
- One lightweight local screenshot is retained at
  `output/paper-atelier-verification/home-mobile-light.png`.

Native T3 viewport presets were 390 × 844 and 1440 × 900. The desktop host's
image scaling sometimes reports different screenshot pixel dimensions; these
captures are visual inspection evidence, not independent CSS overflow measurements.

## Findings corrected

- Vite retained a failed relative ThemePicker import after the new file appeared.
  Using the repository alias in Header resolved the cached failure; home returned
  HTTP 200 afterward.
- Removing the old global CSS exposed the contact form's honeypot, loading icon,
  success text, and error text together. Explicit local selectors now control
  default/loading/success/failure states and paper form framing.

## Remaining verification

Full production build, Pagefind, form runtime states, exact-width overflow checks,
all locale/theme combinations, complete menu keyboard behavior, and deployed
preview checks belong to the integration acceptance matrix. Native preview
connectivity ended during the final resize; this report does not claim those
checks passed. Initial Vite dependency-optimization 504s and unavailable local
reCAPTCHA configuration were observed and are not production validation.
