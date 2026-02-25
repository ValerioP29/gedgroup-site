# UI Restyle Notes (Handoff)

## A) Design system

### Font
- Primary font stack: `Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif`.

### Palette (CSS vars in `src/styles/global.css`)
- `--bg`: page background
- `--surface`: alternate section background
- `--panel` / `--card`: card/panel backgrounds
- `--text`: heading/high-contrast text
- `--muted`: body/supporting text
- `--border`: shared border color
- `--accent`: primary action color
- `--accent-foreground`: primary button text
- `--accent-soft`: soft accent mix for hover/border transitions

### Key tokens
- Containers: `--container`, `--container-wide`
- Vertical rhythm: `--section-y`
- Radii: `--radius-sm`, `--radius-md`, `--radius-lg`
- Shadows: `--shadow-soft`, `--shadow-elevated`
- Type scale: `--h1-size`, `--h2-size`, `--h3-size`, `--body-size`

---

## B) Primitive UI

### Buttons
- Base: `.btn`
- Variants:
  - `.btn-primary`
  - `.btn-secondary`
  - `.btn-ghost`
  - `.btn-whatsapp`
- Mobile tappable helper: `.tap-target`

### Cards & surfaces
- Base card wrapper: `.card-base`
- Elevated content panel: `.panel`
- KPI tile: `.kpi-card`
- Hover interaction: `.card-hover`
- Gradient treatment: `.gradient-card`

### Section wrappers
- Constrained section: `.site-container`
- Wide section: `.site-container-wide`
- Vertical spacing: `.section-y`
- Alternate background section: `.surface-section`

### Section headings
- Component: `src/components/SectionHeader.astro`
- Supports: `eyebrow`, `title`, `subtitle`, optional `align="center"`

---

## C) Layout patterns

### Homepage pattern
1. Hero (`data-hero` + hero elements)
2. Services overview grid
3. Process/trust block
4. Case studies proof block
5. FAQ/support
6. Final conversion block with form CTA

Reference: `src/pages/index.astro`.

### Internal pages pattern
1. Internal page hero (`InternalPageHero`)
2. Main content block (split/grid/stack)
3. Support/trust block (FAQ, KPIs, process, compliance)
4. Final CTA band (`FinalCtaBand`)

References:
- `src/components/InternalPageHero.astro`
- `src/components/FinalCtaBand.astro`
- `src/pages/servizi/index.astro`
- `src/pages/servizi/[slug].astro`
- `src/pages/contatti.astro`

---

## D) Motion system

### Where logic lives
- Motion core: `src/lib/motion.ts`
- Orchestrator bootstrap: `src/components/GsapInit.astro`

### Supported data attributes
- Reveal: `[data-reveal="fade-up|fade-left|fade-right|scale-in"]`
- Stagger groups: `[data-stagger]` and children `[data-stagger-item]`
- Hero timeline: `[data-hero]` + `[data-hero-el="badge|title|subtitle|ctas|visual|float"]`
- Parallax: `[data-parallax]` (desktop only)

### How to add motion in new sections
1. Add `data-reveal="fade-up"` on any section/card wrapper for scroll reveal.
2. For list/grid animation, add `data-stagger` on container and `data-stagger-item` on each item.
3. For optional parallax, add `data-parallax="-4"` (or another numeric yPercent), avoid heavy use.
4. Do not write ad-hoc GSAP in page files: extend `src/lib/motion.ts` if needed.

### Accessibility/performance constraints
- `prefers-reduced-motion` is respected (motion init skipped)
- Motion cleanup is handled on Astro client navigation lifecycle
- Parallax is disabled on mobile

---

## E) Fastest way to change look globally

### Colors
- Edit CSS vars in `:root` within `src/styles/global.css`:
  - `--bg`, `--surface`, `--text`, `--muted`, `--border`, `--accent`

### Typography
- Edit scale vars in `src/styles/global.css`:
  - `--h1-size`, `--h2-size`, `--h3-size`, `--body-size`

### Spacing/layout
- Edit:
  - `--section-y`
  - `--container`, `--container-wide`

### Radius/shadows
- Edit:
  - `--radius-sm`, `--radius-md`, `--radius-lg`
  - `--shadow-soft`, `--shadow-elevated`

### Motion tuning
- Edit constants in `src/lib/motion.ts`:
  - reveal/stagger/hero/parallax/hover timing and amplitudes

---

## F) Layout audit (photo-first refactor)

### Duplicazioni rilevate prima del refactor
- Home e pagine interne ripetevano blocchi simili: processo operativo, trust/value proposition, CTA finale con copy quasi identica.
- Hero interni prevalentemente testuali senza media dedicata.
- Home con densità elevata (hero + servizi + processo + trust + FAQ + form) e overlap informativo con pagine interne.

### Gerarchia adottata
- **Home = overview**: hero visuale, servizi sintetici, perché noi, mini-gallery risultati/cantieri, CTA finale.
- **Interne = dettaglio**: hero specifica con immagine coerente, 2/3 sezioni approfondimento, processo sintetico, CTA finale.

### Photo slots consigliati
- Hero: ratio `16:9`.
- Card servizi / gallery / split visuals: ratio `4:3`.
- Mobile: layout in stack; immagini con `object-fit: cover` + `aspect-ratio` per evitare CLS.
- Loading: solo hero home in preload/eager; immagini sotto la fold in lazy.
