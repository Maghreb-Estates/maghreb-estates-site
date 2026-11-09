// Maakt het kaartje Marokko–Europa voor het netwerkblok op de verkooppagina
// (VerkoopPagina.astro): landsgrenzen als SVG-paden in dezelfde projectie als
// de punten en bogen. Schrijft src/data/kaartNetwerk.json.
//
// Bron: Natural Earth 1:50m (publiek domein), via het npm-pakket world-atlas.
// Eenmalig draaien, bv.:
//   npm i --no-save world-atlas@2.0.2
//   node scripts/kaart-netwerk.mjs node_modules/world-atlas/countries-50m.json
//
// Het kader loopt van 16,5° W tot 14,1° O en van 55,5° N tot 28,85° N. De
// onderrand ligt bewust boven 27,67° N: zo valt de grenslijn met de Sahara
// buiten beeld.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Projectie: lengte- en breedtegraad lineair, x geschaald met ±cos(42°).
const KADER = { lonMin: -16.5, latMax: 55.5, kx: 11.1, ky: 15, breedte: 340, hoogte: 400 };
const MAROKKO = '504';
const DIASPORA = new Set(['250', '056', '528']); // Frankrijk, België, Nederland

const project = ([lon, lat]) => [(lon - KADER.lonMin) * KADER.kx, (KADER.latMax - lat) * KADER.ky];

const bron = process.argv[2];
if (!bron) {
  console.error('Gebruik: node scripts/kaart-netwerk.mjs <pad naar countries-50m.json>');
  process.exit(1);
}
const topo = JSON.parse(readFileSync(bron, 'utf8'));
const [sx, sy] = topo.transform.scale;
const [tx, ty] = topo.transform.translate;

// TopoJSON-bogen: gekwantiseerd en delta-gecodeerd; een negatieve index = omgekeerd.
const bogen = topo.arcs.map((boog) => {
  let x = 0, y = 0;
  return boog.map(([dx, dy]) => [(x += dx) * sx + tx, (y += dy) * sy + ty]);
});
const boog = (i) => (i < 0 ? [...bogen[~i]].reverse() : bogen[i]);
const ring = (indices) => indices.flatMap((i, n) => (n === 0 ? boog(i) : boog(i).slice(1)));

// Sutherland–Hodgman: een ring knippen tegen het (convexe) kader.
function knip(punten) {
  const randen = [
    (p) => p[0] >= 0, (p) => p[0] <= KADER.breedte, (p) => p[1] >= 0, (p) => p[1] <= KADER.hoogte,
  ];
  const snij = (a, b, k) => {
    const [x1, y1] = a, [x2, y2] = b;
    if (k < 2) { const x = k === 0 ? 0 : KADER.breedte; return [x, y1 + ((y2 - y1) * (x - x1)) / (x2 - x1)]; }
    const y = k === 2 ? 0 : KADER.hoogte; return [x1 + ((x2 - x1) * (y - y1)) / (y2 - y1), y];
  };
  let uit = punten;
  randen.forEach((binnen, k) => {
    const in_ = uit; uit = [];
    in_.forEach((p, i) => {
      const vorig = in_[(i + in_.length - 1) % in_.length];
      if (binnen(p)) { if (!binnen(vorig)) uit.push(snij(vorig, p, k)); uit.push(p); }
      else if (binnen(vorig)) uit.push(snij(vorig, p, k));
    });
  });
  return uit;
}

// Punten die minder dan 1 eenheid van het vorige punt liggen, vallen weg.
function vereenvoudig(punten) {
  const uit = [];
  punten.forEach((p) => {
    const l = uit[uit.length - 1];
    if (!l || Math.hypot(p[0] - l[0], p[1] - l[1]) >= 1) uit.push(p);
  });
  return uit;
}

const oppervlak = (p) => Math.abs(p.reduce((s, [x, y], i) => { const [x2, y2] = p[(i + 1) % p.length]; return s + x * y2 - x2 * y; }, 0)) / 2;
const getal = (n) => String(Math.round(n * 10) / 10);

function pad(geometrie) {
  const polygonen = geometrie.type === 'Polygon' ? [geometrie.arcs] : geometrie.type === 'MultiPolygon' ? geometrie.arcs : [];
  return polygonen.flatMap((poly) => poly.map((r) => vereenvoudig(knip(ring(r).map(project)))))
    .filter((p) => p.length >= 3 && oppervlak(p) >= 3)
    .map((p) => `M${p.map(([x, y]) => `${getal(x)} ${getal(y)}`).join(' ')}Z`)
    .join('');
}

const groepen = { overig: '', diaspora: '', marokko: '' };
topo.objects.countries.geometries.forEach((g) => {
  const d = pad(g);
  if (!d) return;
  const groep = g.id === MAROKKO ? 'marokko' : DIASPORA.has(g.id) ? 'diaspora' : 'overig';
  groepen[groep] += d;
});

const doel = fileURLToPath(new URL('../src/data/kaartNetwerk.json', import.meta.url));
writeFileSync(doel, JSON.stringify({ bron: 'Natural Earth 1:50m (world-atlas 2.0.2)', kader: KADER, ...groepen }) + '\n');
console.log(doel, Object.fromEntries(Object.entries(groepen).map(([k, v]) => [k, `${(v.length / 1024).toFixed(1)} KB`])));
