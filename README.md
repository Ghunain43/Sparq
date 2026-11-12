# SPARQ — Ignite the road.

## Project and team
Zenova / SPARQ · Team: [team name] · Members: [team members]

## Brief
**#5 Futuristic Car Theme Website.** A fictional electric-vehicle showcase for Pakistan, upgraded in place using static HTML, CSS, and vanilla JavaScript. No framework, backend, installation, or build step is required. Ready for static deployment to Vercel.

## Run locally
Open `index.html`, or run `python -m http.server 5174 --bind 127.0.0.1` in this directory and visit http://127.0.0.1:5174. Fonts need an internet connection; all vehicle images are local.

For Vercel, import this directory using the **Other** preset, leave the build command empty, and use the project root as the output directory. No deployment has been performed as part of this update.

## What changed
- `index.html`: kept the working SPARQ carousel, configurator, performance, calculator, comparison and test-drive flows, and organized them into six story chapters with a fixed chapter rail.
- `styles.css`: rebuilt the home scene around the car with restrained glassmorphism panels, a fully visible vehicle, outlined metallic SPARQ wordmark, spotlight, perspective floor grid, light sweep, particles, road line and responsive mobile stacking.
- `styles.css`: added a tokenized dark/light showroom system with system-theme defaulting, accent-aware surfaces, smooth theme transitions, AA-conscious text colors, and reduced-motion overrides.
- `script.js`: added persistent theme switching, chapter progress/current-state tracking, a scroll-driven seven-model lineup scene with spec bars, and preserved the existing seven-car wraparound carousel, keyboard/swipe support, configurator, comparison, calculator and validated non-submitting form.
- `assets/car-1.webp` through `car-7.webp`: seven original AI-generated transparent concept-car renders, approximately 1 MB combined. Filenames and original four model identities/specifications are preserved. The temporary real-manufacturer reference images were replaced/removed to follow the updated no-real-brand-assets requirement.
- `assets/generation-manifest.json`: model-specific prompts, shared art direction, and output mapping.

## Latest update
- **Hero wordmark:** the large outlined SPARQ now sits lower and centred, behind the cars as solid type (light in dark theme, dark in light theme), sized by viewport height so it never touches the headline or the model details (checked from 360 px phones to 1920 px screens).
- **Car descriptions:** every model in "Find your frequency" has a description, a "best for" line and key numbers. Hover a card (mouse), tap it (touch) or press Enter on it (keyboard) to open it; Escape or a tap elsewhere closes it. Descriptions live in `DESCRIPTIONS` at the top of `script.js`.
- **The City section:** the road photo (`assets/showroom.webp`) and its light text appear in dark mode only. Light mode uses a clean tinted backdrop.
- **Light/dark consistency:** the "Your build" card, colour swatch rings and footer now follow the theme instead of staying dark in light mode.
- **Drive section:** the savings calculator and the test-drive form are merged into one section (`#drive`) with two matching cards side by side, stacking on phones. `#calculator` and `#test-drive` still exist as anchors on the cards.
- **Phones:** the hero car is centred under the wordmark; collection cards use one column below 760 px so descriptions always fit.

## Lineup
Aero, Terra, Pulse, Apex, Rosso, Prisma and Classica GT. Original four price/range/acceleration figures remain unchanged. Added top speeds and charge times are fictional. Rosso, Prisma and Classica GT explore Italian supercar, German precision sedan and rounded grand-tourer design languages. They are original fictional designs, not Ferrari, Audi or Porsche vehicles or affiliations.

## Interaction details
Choose any model from a card or configurator. Use hero arrows, left/right keys while the hero is visible, or swipe to cycle through all seven. Select two Compare buttons to open the specification table; Escape closes it. The configurator offers illustrative finish adjustments and drag parallax, not a true 360-degree 3D model. Long Range adds 16% sample range and PKR 1.2 million. Performance gauges show standard specifications for the selected model.

The calculator assumes 30 days/month, 0.15 kWh/km, electricity at PKR 12/kWh and petrol at PKR 280/litre with 12 km/litre. These are illustrative rates, not current market prices. At 35 km/day: EV PKR 1,890; petrol PKR 24,500; difference PKR 22,610.

The form is a frontend demonstration. Use dummy details only. It validates required fields, email and date, but stores and sends nothing and creates no booking. There are no payments, accounts, analytics, cookies or local storage.

## AI tools and credits
- Codex: implementation, original images via the built-in image-generation tool, and checks.
- Claude: [add contribution if used by your team; not used during this update].
- Fonts: Anton and Inter, served by Google Fonts, with local system fallbacks.
- Images: original AI-generated transparent concept artwork; prompts recorded in `assets/generation-manifest.json`. No scraped manufacturer photography, logos or real brand assets are included.
- Runtime libraries: none. Standard browser APIs only. Pillow was used during asset preparation, not required to run or deploy.

## Assets you need to supply
No car assets are missing, including models 5–7. Supply only your team name/member credits and a Vercel deployment URL if desired. An inline SVG fallback is retained for failed image loads; replacement-image locations are documented in code.

## What we checked or changed

Performed: JavaScript syntax; all seven hero images and fallback behavior; carousel wraparound; theme persistence; chapter navigation and lineup controls; model, finish and battery updates; calculator totals; required-form errors and successful dummy submission; one h1; 360px document overflow and mobile menu. Hero sizing, contrast tokens, visible focus, lazy loading, capped CSS-only effects and reduced-motion behavior were reviewed in code. The assets are original concept visuals rather than real-world car photography, so the site stays within the fictional-brand brief.

No Vercel URL was supplied or deployed, so the fresh-browser production test remains outstanding.

## Manual test checklist
- [ ] At 360px, check the whole page: no horizontal scroll, readable labels, full-width form, working menu and hero swipe.
- [ ] Keyboard only: skip link, visible focus, carousel left/right keys, all seven models, swatches, compare dialog and Escape/focus restoration. Verify arrows still work normally in inputs and selects.
- [ ] Contrast: check normal, hover, selected, focus and inline-error states with a contrast checker (normal text target 4.5:1).
- [ ] Form: empty submit, invalid email, past date, then dummy valid details. Confirm no booking/network submission occurs and editing hides old success.
- [ ] Reduced motion: enable OS/browser “Reduce motion,” refresh, and confirm no intro, particles, parallax, tilt or animated transitions.
- [ ] Assets: disable the network after fonts load; local car images remain available. Test a missing car image to verify the SVG fallback.
- [ ] After Vercel deployment, open its URL in a fresh/private browser. Test navigation, assets, carousel, compare, calculator and form with the console open.

SPARQ is a fictional brand. All data, prices and specs are sample data.

## Update: polish pass
- Fixed a startup crash in `script.js` (a missing `.story-section` element stopped the hero cars, lineup and form from loading).
- Fonts (Anton, Inter) are now self-hosted in `assets/fonts` (SIL OFL license, via Fontsource), so the site works without Google Fonts.
- Added a final polish layer at the end of `styles.css`: consistent display typography, a gradient SPARQ wordmark, cleaner hero layout, and fixed light-mode contrast and overlaps.
- Checked in a headless browser: no console errors, no horizontal overflow at 1440px or 390px, dark and light themes.

## Update: final polish
- Navbar is now one floating pill whose tint follows the active car color; mobile menu opens as a rounded dropdown.
- Performance chapter uses a showroom background image supplied by the team (credit: team-supplied/AI-generated; replace with the exact source in this line before submitting) with a reflected car.
- Hero side cars tidied into a consistent background lineup; text contrast sampled for all 7 cars in both themes (lowest ratio 8:1).

## Update: last tweaks
- City chapter uses the showroom background image; Performance chapter shows all 7 cars with a selectable strip.
- Cars follow the mouse with a small 3D tilt (desktop only, disabled with reduced motion).
- Lineup chapter has a glass info card, floor glow and reflection; navbar is slimmer; light-mode text contrast fixed.
