# SPARQ — All Prompts

> Reconstructed prompts: written to match how this project was likely built. Not the original wording.

---

# 01 — Initial Brief


Build a **Futuristic Car Theme Website** (brief #5).

- Fictional electric-car brand called **SPARQ**, tagline "Ignite the road.", for the Pakistani market.
- Static HTML, CSS and vanilla JavaScript only. No framework, backend or build step. Must deploy to Vercel as-is.
- Hero section with a car carousel, big SPARQ wordmark, model name, bio, range and 0-100 specs.
- Sections: model collection, performance stats, configurator, savings calculator (EV vs petrol, PKR), test-drive form, footer.
- Dark and light theme.
- Mobile first, accessible, no console errors.
- Keep prices in PKR and make all data clearly sample data.

---

# 02 — Car Image Generation


Generate 7 original, photorealistic, transparent-background concept car renders for SPARQ: Aero (ice-blue sedan), Terra (emerald SUV), Pulse (coral hatchback), Apex (violet hypercar), Rosso (scarlet supercar), Prisma (graphite sports sedan), Classica GT (champagne grand tourer).

Rules for every image: near-side profile with a slight front three-quarter angle, car facing right, whole vehicle and wheels visible, centered, 3:2 landscape, studio softbox lighting, transparent background, no text, logos, badges or watermarks, and no copies of real production cars.

Save as assets/car-1.webp to car-7.webp.

---

# 03 — Hero and Carousel


Rebuild the hero as an immersive scene around the car: a large SPARQ wordmark behind the cars, a spotlight, a perspective floor grid, a light sweep and subtle particles.

The carousel must wrap around all seven cars, with side cars shown smaller and faded, arrow buttons, left/right keys when the hero is visible, and swipe on touch. The page accent color changes with the active car. On desktop the cars tilt slightly with the mouse. Respect reduced-motion.

---

# 04 — Theme and Design System


Add a tokenized dark/light theme. Default to the system preference, save the user's choice, and switch smoothly. Every surface (cards, build card, swatches, footer) must follow the theme. Keep text at WCAG AA contrast in both themes.

Use self-hosted Anton for display type and Inter for body. Use one floating pill navbar tinted by the active car color, with a rounded dropdown menu on mobile.

---

# 05 — Sections and Features


Organize the page into story chapters with a fixed chapter rail.

- **Find your frequency:** cards for all seven models with a description, "best for" line and key numbers revealed on hover, tap or Enter.
- **Performance:** all seven cars on a showroom background with a selectable strip and spec bars.
- **Configurator:** choose model, finish and Long Range battery (+16% range, +PKR 1.2M). Show a live build summary.
- **Compare:** pick two models to open a comparison table. Escape closes it.
- **Drive:** savings calculator and test-drive form side by side, stacking on phones. The form validates but sends nothing.
- **City:** road photo background in dark mode only.

---

# 06 — Polish and QA


Fix any startup crash in script.js. Make sure there is no horizontal overflow from 360px to 1920px, one h1, visible focus states, lazy-loaded images and an SVG fallback if an image fails. Check both themes with no console errors. Update the README with what changed, AI tools used and a manual test checklist.

---

# 07 — Wordmark Position


Don't change anything else. Just move the SPARQ wordmark to the top right corner, right under the navbar, as fast as possible.
