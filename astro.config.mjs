import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// De verkooppagina's krijgen in de sitemap een lastmod die alleen verschuift bij
// een echte inhoudelijke wijziging: de laatste prijsupdate (src/data/marktprijzen.json)
// of de laatste tekstwijziging hieronder. Pas die datum aan als de tekst van de
// verkooppagina inhoudelijk verandert.
const verkoopTekstGewijzigd = '2026-10-27';
const prijzenBijgewerkt = JSON.parse(
  readFileSync(new URL('./src/data/marktprijzen.json', import.meta.url), 'utf8'),
).bijgewerkt;
const verkoopLastmod = [verkoopTekstGewijzigd, prijzenBijgewerkt].sort().at(-1);
const verkoopPaginas = new Set(
  ['/huis-verkopen-marokko/', '/en/sell-your-property/', '/fr/vendre-votre-bien/', '/ar/sell-your-property/']
    .map((p) => new URL(p, 'https://maghreb-estates.com').href),
);

// Live domein — bepaalt absolute URL's in sitemap, canonicals en structured data.

// 301-redirects van samengevoegde/opgeschoonde pagina's naar hun sterkere hoofdpagina.
// Op een statische host (GitHub Pages) rendert Astro deze als een redirect-HTML met
// meta-refresh + canonical naar de bestemming — de best mogelijke 301-benadering zonder
// server. Verhuizen naar Netlify/Cloudflare? Dan wordt dit een echte 301 (_redirects).
const redirects = {
  // Kopen → samengevoegd in /nieuwbouw-vastgoed-marokko/
  '/nieuwbouwprojecten-marokko/': '/nieuwbouw-vastgoed-marokko/',
  '/off-plan-vastgoed-marokko/': '/nieuwbouw-vastgoed-marokko/',
  '/appartement-marokko-kopen-in-termijnen/': '/nieuwbouw-vastgoed-marokko/',
  // Investeren → samengevoegd in /investeren-vastgoed-marokko/
  '/rendement-vastgoed-marokko/': '/investeren-vastgoed-marokko/',
  '/huur-rendement-marokko/': '/investeren-vastgoed-marokko/',
  '/huurrendement-marokko/': '/investeren-vastgoed-marokko/',
  // Beheer → samengevoegd in /vastgoedbeheer-marokko/
  '/woningbeheer-marokko/': '/vastgoedbeheer-marokko/',
  '/sleutelbeheer-marokko/': '/vastgoedbeheer-marokko/',
  '/verhuurbeheer-marokko/': '/vastgoedbeheer-marokko/',
  // Kennisbank → secties toegevoegd aan de sterkere hoofdpagina
  '/verborgen-kosten-huis-kopen-marokko/': '/kosten-huis-kopen-marokko/',
  '/oplichting-vastgoed-marokko-voorkomen/': '/risicos-huis-kopen-marokko/',
  // Volmacht → kerninformatie opgenomen als sectie in de juridische documenten
  '/volmacht-huis-kopen-marokko/': '/juridische-documenten-vastgoed-marokko/',
  // Dubbele pagina opgeschoond (duplicate content)
  '/beste-stad-vastgoed-investeren-marokko/': '/beste-stad-investeren-vastgoed-marokko/',
};

// URL's die niet in de sitemap horen: de geredirecte oude URL's (voorkomt dat
// zoekmachines redirect-pagina's indexeren) en pure conversie-/bedankpagina's.
const sitemapUitsluiten = new Set(
  [
    ...Object.keys(redirects),
    '/checklist-vastgoed-marokko/',
  ].map((p) => new URL(p, 'https://maghreb-estates.com').href),
);

export default defineConfig({
  site: 'https://maghreb-estates.com',
  trailingSlash: 'always',
  redirects,
  build: {
    format: 'directory', // schone URL's: /huis-kopen-marokko/ i.p.v. .html
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !sitemapUitsluiten.has(page),
      serialize: (item) =>
        verkoopPaginas.has(item.url) ? { ...item, lastmod: new Date(verkoopLastmod).toISOString() } : item,
    }),
  ],
});
