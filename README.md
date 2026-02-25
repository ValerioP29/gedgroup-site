# GED Group Site (Astro + Tailwind)

## Comandi rapidi
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Motion system (riuso rapido)
- Reveal blocco: `data-reveal="fade-up|fade-left|fade-right"` oppure classi `.motion-reveal-up|left|right`.
- Stagger figli: parent `data-stagger="nome"` (o `.motion-stagger`) + child `data-stagger-item` (o `.motion-stagger-item`).
- Zoom immagini hover: aggiungi `.motion-zoom` su `<img>` o wrapper media.
- Link underline elegante: aggiungi `.motion-link` su `<a>`.
- Timing/easing principali: `src/lib/motion.ts` (`MOTION`, `EASE_STANDARD`).
- Transizione pagina: attiva globalmente in `src/layouts/Layout.astro` con `<ViewTransitions />`.
- Accessibilità: `prefers-reduced-motion` disattiva/reduce animazioni via `src/lib/motion.ts` + `src/styles/global.css`.
