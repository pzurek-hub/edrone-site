# edrone.me — Astro Website

## What is this

Astro 6 website replacing WordPress-based edrone.me. Currently serves roi.edrone.me landing pages (Phase 1 complete). Phase 2 will add the main edrone.me marketing site (homepage, pricing, features).

## Commands

```bash
npm run dev        # Dev server on localhost:3002
npm run build      # Production build → dist/
```

## Project Structure

- `src/pages/` — All routes. Each `.astro` file = one page. Nested folders = URL path
- `src/components/Head.astro` — SEO/GTM/GA4/OG tags. Used by all layouts
- `src/components/GtmNoscript.astro` — GTM noscript fallback
- `src/layouts/LandingLayout.astro` — For standalone landing pages (no shared nav/footer)
- `src/layouts/BaseLayout.astro` — For main site pages (will include Nav + Footer)
- `src/middleware.ts` — Geo-IP redirect: "/" → /pl/ or /br/ or /mx/
- `src/styles/global.css` — Brand design system: fonts, CSS vars, reset
- `public/fonts/web/` — Sans Pro Bold + Sans Pro Outline Bold (woff2)

## Key Patterns

### Adding a new page
1. Create `src/pages/<path>/index.astro`
2. Add `export const prerender = true;` in frontmatter
3. Import `LandingLayout` (standalone) or `BaseLayout` (main site with nav/footer)
4. Pass title, description, lang, googleFont props
5. Page-specific styles go in `<style>` block
6. Override CSS vars with `:root { --var: value; }` in page style
7. JavaScript goes in `<script is:inline>` blocks

### Brand design system
- Colors: `--yellow` (#FFFF8C), `--dark` (#2E2E29), `--turquoise` (#00FFE9), `--pink` (#FECACC), `--ghost` (#F5F3F6)
- Fonts: Roboto (body), Sans Pro Bold (headlines), Sans Pro Outline Bold (decorative)
- CSS classes: `.outline-text`, `.bold-text`, `.container`
- Max width: 1200px

### Images
Currently referencing wp.edrone.me CDN for screenshots/mockups. Keep this pattern until we migrate image hosting.

## Deploy

- **Platform:** Railway
- **Config:** `nixpacks.toml` → Node 22 + `node dist/server/entry.mjs`
- **Auto-deploys** on push to `main` branch
- **Maciek (@macserafin) must approve** every deploy in Railway dashboard

## Conventions

- Polish is the primary language, but pages exist in PT-BR and ES-MX too
- All CTAs point to `https://control.edrone.me/register`
- Login links go to `https://control.edrone.me/login`
- GTM ID: `GTM-PPKX7B9`, GA4 ID: `G-HT31C5LL2Q` (both in Head.astro)
- Do NOT create documentation files unless asked
- Keep CSS simple — use CSS vars, no Tailwind, no CSS-in-JS
