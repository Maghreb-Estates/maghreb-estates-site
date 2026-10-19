# Maghreb Estates — SEO- & bouwplan

Dit document is de blauwdruk voor de multi-page SEO-site. Stack: **Astro** (static site
generator) → statische HTML op **GitHub Pages** (domein `maghreb-estates.com`).

## Aannames (gedocumenteerd)
- **NL-first.** Alle SEO-landingspagina's eerst in het Nederlands (daar zit het zoekvolume/intent). Meertalige structuur (`/en/`, `/fr/`, `/ar/`) later.
- **Parallel gebouwd** in `site/`; de oude single-page site in `website/` blijft live tot fase 1 is gecontroleerd en overgezet.
- **Contactformulier** via Web3Forms (gratis) — access key nog invullen in `src/pages/contact.astro`. Telefoon/WhatsApp/e-mail werken direct.
- Merk/stijl (groen #1C2E1D + crème #F5F1E8, Cormorant Garamond + Jost) overgenomen uit de bestaande stijlgids.

## 1. Technische structuur
```
site/
├─ astro.config.mjs      # site-url, trailingSlash, sitemap-integratie
├─ public/               # robots.txt, CNAME, images/  (1:1 gekopieerd)
├─ src/
│  ├─ data/              # site.ts (NAP/nav/CTA), steden.ts (18 steden), schema.ts (JSON-LD builders)
│  ├─ layouts/           # BaseLayout.astro  (SEO-head: title, meta, canonical, OG, JSON-LD)
│  ├─ components/        # Nav, Footer, Hero, Breadcrumbs, Faq, CtaBand  (herbruikbaar)
│  └─ pages/             # elke .astro = 1 URL; [stad].astro genereert 18 stadspagina's
```
**SEO ingebouwd:** unieke title/description/H1 per pagina, canonical, Open Graph/Twitter,
BreadcrumbList + FAQPage + Service + Organization (RealEstateAgent) JSON-LD, automatische
`sitemap-index.xml`, `robots.txt` met AI-crawlers toegestaan, schone URL's met trailing slash.

## 2. Sitemap & URL-structuur (schoon, Nederlands)
| URL | Type | Fase |
|-----|------|------|
| `/` | Homepage | ✅ 1 |
| `/vastgoed-marokko/` | Pillar/hub | ✅ 1 |
| `/huis-kopen-marokko/` | Landing | ✅ 1 |
| `/investeren-vastgoed-marokko/` | Landing | ✅ 1 |
| `/aankoopbegeleiding-vastgoed-marokko/` | Landing | ✅ 1 |
| `/vastgoedbeheer-marokko/` | Landing | ✅ 1 |
| `/contact/` | Conversie | ✅ 1 |
| `/vastgoed/{stad}/` ×18 | Stadspagina's | ✅ 1 |
| `/huis-kopen-marokko-vanuit-nederland/` | Landing | ✅ 2 |
| `/appartement-kopen-marokko/` | Landing | ✅ 2 |
| `/nieuwbouwprojecten-marokko/` | Landing | ✅ 2 |
| `/rendement-vastgoed-marokko/` | Landing | ✅ 2 |
| `/beste-steden-investeren-marokko/` | Landing | ✅ 2 |
| `/huis-verhuren-marokko/` | Landing | ✅ 2 |
| `/airbnb-beheer-marokko/` | Landing | ✅ 2 |
| `/huis-verkopen-marokko/` | Landing | ✅ 2 |
| `/gids/risicos-huis-kopen-marokko/` | Gids/Article | ✅ 2 |
| `/gids/kosten-huis-kopen-marokko/` | Gids/Article | ✅ 2 |
| `/gids/notaris-marokko-vastgoed/` | Gids/Article | ✅ 2 |
| `/gids/titre-foncier-marokko/` | Gids/Article | ✅ 2 |
| `/gids/volmacht-huis-kopen-marokko/` | Gids/Article | ✅ 2 |

## 3. Keyword-map (keyword → pagina)
**Homepage `/`** — vastgoed Marokko, betrouwbaar vastgoed Marokko, Nederlandse makelaar Marokko, Nederlands sprekende makelaar Marokko
**`/vastgoed-marokko/`** — vastgoed Marokko, vastgoed kopen in Marokko, vastgoed adviseur Marokko
**`/huis-kopen-marokko/`** — huis kopen Marokko, veilig huis kopen Marokko, huis kopen in Marokko
**`/huis-kopen-marokko-vanuit-nederland/`** — huis/woning kopen Marokko vanuit Nederland, vastgoed kopen Marokko op afstand
**`/appartement-kopen-marokko/`** — appartement kopen Marokko, appartement Marokko kopen in termijnen
**`/nieuwbouwprojecten-marokko/`** — nieuwbouwproject Marokko controleren, off-plan vastgoed Marokko, betrouwbare projectontwikkelaar Marokko
**`/investeren-vastgoed-marokko/`** — investeren in vastgoed Marokko, vastgoed Marokko ROI
**`/rendement-vastgoed-marokko/`** — rendement vastgoed Marokko, huur rendement Marokko
**`/beste-steden-investeren-marokko/`** — beste stad investeren vastgoed Marokko
**`/aankoopbegeleiding-vastgoed-marokko/`** — aankoopbegeleiding vastgoed Marokko, vastgoed adviseur Marokko
**`/vastgoedbeheer-marokko/`** — vastgoedbeheer Marokko, woningbeheer Marokko, verhuurbeheer Marokko
**`/huis-verhuren-marokko/`** — huis verhuren Marokko vanuit Nederland
**`/airbnb-beheer-marokko/`** — Airbnb beheer Marokko
**`/huis-verkopen-marokko/`** — huis verkopen Marokko vanuit Nederland, vastgoed verkoopbegeleiding Marokko
**`/gids/risicos-huis-kopen-marokko/`** — risico's huis kopen Marokko, oplichting vastgoed Marokko voorkomen, verborgen kosten huis kopen Marokko
**`/gids/kosten-huis-kopen-marokko/`** — kosten huis kopen Marokko, notariskosten Marokko vastgoed, koopcontract/compromis de vente Marokko
**`/gids/notaris-marokko-vastgoed/`** — notaris Marokko huis kopen, advocaat huis kopen Marokko
**`/gids/titre-foncier-marokko/`** — titre foncier Marokko, kadaster Marokko vastgoed
**`/gids/volmacht-huis-kopen-marokko/`** — huis kopen Marokko met volmacht
**Fiscaal (later, eigen gids):** vastgoed Marokko belasting Nederland, tweede woning Marokko belasting
**Stadspagina's `/vastgoed/{stad}/`** — "vastgoed kopen {stad}", "huis kopen {stad}" ×18 steden

## 4. Bouwvolgorde (advies)
1. **Fase 1 (nu klaar):** homepage, nav, footer, BaseLayout, 4 kernlanding­pagina's + hub + contact + 18 stadspagina's.
2. **Fase 2 (klaar):** overige diensten­pagina's (kopen-vanuit-NL, appartement, nieuwbouw, rendement, beste steden, verhuren, Airbnb, verkopen) + juridische gidsen (risico's, kosten, notaris, titre foncier, volmacht). Alle intern gelinkt, geen dode links meer.
3. **Fase 3:** fiscale gids (belasting NL/tweede woning), `/gids/`-indexpagina, blog/kennisbank, meertaligheid (EN/FR/AR), koppeling live vastgoedaanbod (Supabase-data uit de scraper).

## 5. Openstaande acties (status 2026-07-10)
- [x] ~~Web3Forms access key~~ — **achterhaald**: contactformulier loopt via WhatsApp/mailto, geen key nodig.
- [x] Mailbox — `a.douider@` en `info@maghreb-estates.com` bestaan en ontvangen mail (one.com). Mailto-route veilig.
- [x] **Site is live** op maghreb-estates.com (nieuwe Astro-site via repo `maghreb-estates-site`, GitHub Pages). Sitemap (53 URL's), robots.txt en JSON-LD staan live.
- [x] Google Search Console — verificatie-tag staat sinds 2026-07-10 in `BaseLayout.astro` (niet verwijderen). Nog nalopen: is `sitemap-index.xml` ingediend?
- [x] Google Analytics 4 (`G-4DY7YZK059`) — laadt pas na toestemming via de cookiemelding (`CookieConsent.astro`). Gebeurtenissen: `contact_click` en `generate_lead`.
- [x] Microsoft Clarity (`z07kb3h2jq`) — heatmaps + opnames, zelfde toestemming als GA4. Masking in het Clarity-dashboard op "Strict" zetten.
- [ ] Unieke OG-afbeelding(en) per hoofdpagina (nu 1 gedeelde: villa5.jpg).
- [ ] Overweeg node_modules/dist buiten iCloud-sync (grote map, sync-conflicten).
