# edrone.me — Astro Website

Replacement for WordPress-based edrone.me. Built with Astro 6 + Node.js SSR adapter. Designed to be maintained by the marketing team using **Claude Code**.

## Status

**Phase 1 DONE** — All roi.edrone.me landing pages migrated from Express+static HTML to Astro (14 pages, production-ready).

**Phase 2 TODO** — Build edrone.me main site (homepage, pricing, features, shared nav/footer).

### Currently deployed pages (Phase 1)

| URL Path | Description | Lang |
|----------|-------------|------|
| `/` | Geo-redirect (IP-based → PL/BR/MX) | — |
| `/pl/` | ROI Calculator | PL |
| `/br/` | ROI Calculator | PT-BR |
| `/mx/` | ROI Calculator | ES-MX |
| `/br/cases_brasil/` | Cases de Sucesso hub (42 cases) | PT-BR |
| `/br/cases/use-hitzz/` | Use Hitzz case study | PT-BR |
| `/br/cases/origgo/` | Origgo case study | PT-BR |
| `/br/cases/sapato-retro/` | Sapato Retro case study | PT-BR |
| `/br/framework/Neuro-Vendas-em-B2b-2026/` | Neuro-Vendas B2B framework | PT-BR |
| `/mx/shopify/` | Shopify MX landing page | ES-MX |
| `/revenue-check/pl/` | Revenue Check tool | PL |
| `/revenue-check/mx/` | Revenue Check tool | ES-MX |
| `/ebook-shoper/` | Ebook LP (Inter/Tailwind) | PL |
| `/shoper-automatyzacja/` | Ebook LP (edrone.me style) | PL |
| `/state-of-automation-pl/` | State of Automation report LP | PL |

---

## Phase 2: edrone.me Main Site (TODO)

### MVP Pages

| Page | WP URL | Notes |
|------|--------|-------|
| Homepage | edrone.me/pl/ | Hero, client logos, features carousel, 3 pillars, channel metrics, social proof |
| Pricing | edrone.me/pl/cennik | Interactive calculator (contacts+SMS sliders), feature list, FAQ accordion |
| Marketing Automation | edrone.me/pl/platforma/automatyzacja-marketingu | Feature deep-dive with dashboard screenshots |
| CRM | edrone.me/pl/platforma/system-crm | CRM features |
| Growth Tools | edrone.me/pl/platforma/rozwijaj-sklep-online | Newsletters, SMS, web push |

### Components to Build

| Component | Purpose |
|-----------|---------|
| `Nav.astro` | Sticky header: logo, dropdown menus (Platforma/Wiedza/Firma), language switcher, CTAs |
| `Footer.astro` | 5-column: Features, Firma, Wiedza, Prawne, Social+apps |
| `TopBanner.astro` | Yellow promo strip ("Ratuj porzucone koszyki od 0 zl...") |
| `ClientLogos.astro` | Scrolling logo marquee (12+ brands) |
| `CtaButton.astro` | Black/yellow button with arrow → control.edrone.me/register |
| `FeatureCard.astro` | Carousel card with screenshot |
| `SectionHeader.astro` | Outline + bold text headline pattern |

### Phase 3 (Later)
Integrations, Blog, Case Studies, About, Contact, Features, vs Klaviyo/SALESmanago/GetResponse pages.

---

## Architecture

```
src/
  components/
    Head.astro            # GTM (GTM-PPKX7B9), GA4 (G-HT31C5LL2Q), OG, fonts
    GtmNoscript.astro     # GTM noscript fallback
  layouts/
    BaseLayout.astro      # Standard HTML shell
    LandingLayout.astro   # Standalone pages (no shared nav — used by Phase 1 pages)
  middleware.ts            # Geo-IP: "/" → /pl/ or /br/ or /mx/
  styles/
    global.css             # edrone Design System (brand fonts, CSS vars, reset)
  pages/
    index.astro            # Root geo-redirect
    pl/index.astro         # ROI Calculator PL
    br/...                 # Brazilian pages
    mx/...                 # Mexican pages
    ...                    # Landing pages
public/
  fonts/web/               # Sans Pro Bold + Sans Pro Outline Bold (woff2)
  favicon-*.png
  state-of-automation-pl/charts/
```

### Key Decisions

- **Hybrid SSR:** `output: 'server'` for geo-IP middleware, all pages `prerender = true` for static build
- **No shared nav/footer yet:** Landing pages have inline headers. Phase 2 adds shared `Nav`/`Footer` via `BaseLayout`
- **Image CDN:** References `wp.edrone.me` for screenshots. Migrate to own hosting later
- **Per-page CSS vars:** Each page overrides `:root` locally for page-specific theming
- **Scripts:** All JS uses `<script is:inline>` (no Astro bundling)

---

## Design System (edrone Brandbook 2025)

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Neapolitan Yellow | `#FFFF8C` | CTAs, highlights, hero backgrounds |
| Tuatara/Jet | `#2E2E29` | Text, dark backgrounds |
| Turquoise Blue | `#00FFE9` | Badges, accents |
| Pastel Pink | `#FECACC` | Decorative |
| Lavender | `#A583D5` | Decorative |
| Ghost White | `#F5F3F6` | Secondary backgrounds |
| Emerald | `#54B767` | Success states |

### Typography
- **Body:** Roboto (Google Fonts, 300-900)
- **Display headlines:** Sans Pro Bold (custom woff2 in `/public/fonts/web/`)
- **Outline headlines:** Sans Pro Outline Bold (custom woff2)
- **CSS classes:** `.outline-text`, `.outline-text-white`, `.bold-text`

### WordPress Visual Patterns (to match in Phase 2)
- Yellow `#FFFF8C` background sections + outline text headlines
- Black CTAs with `→` arrow icon
- Sticky header with glassmorphism blur
- Client logo bar (grayscale, hover → color)
- Feature cards: yellow bg + white card interior
- Dark sections for social proof

---

## Development

```bash
npm install
npm run dev        # localhost:3002
npm run build      # Production → dist/
```

### Deploy (Railway)
- Auto-deploys from `main` branch
- Config: `nixpacks.toml` → Node 22 + `node dist/server/entry.mjs`
- **Maciek (@macserafin) must approve deploys** in Railway dashboard

---

## Working with Claude Code

This repo is designed for Claude Code maintenance. No CMS. All copy in `.astro` files, tracked in git.

### Typical workflows

**Edit copy:** "Change the headline on /pl/ to XYZ" → Claude reads file, edits, rebuilds

**Add landing page:**
1. Create `src/pages/<slug>/index.astro`
2. Import `LandingLayout`, set `prerender = true`
3. Add page-specific styles in `<style>`
4. Use `:root` overrides for custom colors
5. Wrap JS in `<script is:inline>`

**Preview:** Claude uses `preview_start` → localhost:3002

**Deploy:** Commit + push → Railway auto-deploys → Maciek approves

---

## WordPress Reference (for Phase 2 builders)

### Navigation
```
Platforma ▾
  Automatyzacja marketingu, System CRM, Rozwijaj sklep online, Integracje, Wsparcie
Cennik
Wiedza i pomoc ▾
  Blog, Poradniki, Podcast, YouTube, Szkolenia, Case Study, Help Center, Funkcjonalnosci
Firma ▾
  O nas, Kariera, Kontakt, Partnerzy
[Zaloz darmowe konto] → control.edrone.me/register
Logowanie → control.edrone.me/login
Polska ▾ (PL / BR / MX)
```

### Homepage Sections
1. Top promo banner (yellow bg)
2. Hero: "Czy automatyzacja sie oplaca?" + "7x ROI do 3. miesiaca" + CTA
3. Client logos marquee (12+ brands)
4. "Wykorzystaj potege danych" + ChatGPT/Perplexity buttons
5. Features carousel (8 cards: Reviews, SMS, AI Newsletters, WhatsApp, Orders, Mobile app...)
6. "Sprawdzisz to z AI"
7. Three pillars: Automatyzuj / Buduj relacje / Rozwijaj sie
8. Channel metrics: Email / WhatsApp (4.87 PLN/msg) / SMS (4 PLN/msg)
9. Platform integrations grid
10. Social proof (G2 + case studies)
11. Final CTA
12. Footer

### Pricing Page
- Interactive calculator: contacts slider (200-10,000+) + SMS slider → price
- Free tier at 0 PLN, "50% TANIEJ" badge on paid
- Features by category (Automatyzuj / Buduj relacje / Rozwijaj sie)
- FAQ accordion (10 questions)
- Enterprise CTA + sticky bottom bar

### Key Stats
- 7x ROI in 3 months | 1,000+ stores | 10M+ orders/year | 25+ countries
- 51% open rate on abandoned cart | 30% cart recovery rate | 22.4% revenue boost

### Reference Clients
Rylko, Xiaomi, Mosquito, Organique, O bag, Bielenda, reporter young, Abra, PolarSport, iSpot, Primamoda, Swiss, Decathlon, Sneaker Studio, Prosto
