// ============================================================================
// VASTGOEDAANBOD — schaalbare bron voor alle projectpagina's onder /aanbod/.
//
// Nieuw project toevoegen? Voeg één object toe aan de array hieronder en zet de
// foto's in src/assets/aanbod/<slug>/. De overzichtspagina, stadspagina,
// detailpagina, sitemap-entry, breadcrumbs, schema en interne links worden dan
// automatisch gegenereerd. Er is geen aparte template per project.
//
// GEGEVENSREGEL: alleen publiceren wat betrouwbaar uit de developer-bron blijkt.
// Ontbrekende velden gewoon weglaten (leeg = niet tonen), niets verzinnen —
// geen prijzen, oppervlakten, opleverdata, rendementen of beschikbaarheid.
// De foto's zijn projectvisuals/renders van de ontwikkelaar, lokaal gehost en
// via astro:assets geoptimaliseerd (webp + srcset). Vervang ze door eigen
// fotografie door de bestanden in src/assets/aanbod/<slug>/ te overschrijven.
// ============================================================================

import type { ImageMetadata } from 'astro';
import { aaferProjecten } from './projectenAafer';

// -- Nest (Tanger · Route de Rabat) -----------------------------------------
import nestGevel from '../assets/aanbod/nest/nest-tanger-gevel-schemering.jpg';
import nestStraat from '../assets/aanbod/nest/nest-tanger-straatbeeld-schemering.jpg';
import nestTuinZwembad from '../assets/aanbod/nest/nest-tanger-binnentuin-zwembad.jpg';
import nestZwembad from '../assets/aanbod/nest/nest-tanger-zwembad.jpg';
import nestTuinLucht from '../assets/aanbod/nest/nest-tanger-binnentuin-luchtfoto.jpg';
import nestMasterplan from '../assets/aanbod/nest/nest-tanger-masterplan-luchtfoto.jpg';

// -- Le Domaine d'Achakar (Tanger · Achakar) --------------------------------
import daLucht from '../assets/aanbod/domaine-achakar/domaine-achakar-tanger-luchtfoto-kust.jpg';
import daVillaZwembad from '../assets/aanbod/domaine-achakar/domaine-achakar-tanger-villa-zwembad-oceaan.jpg';
import daInterieur from '../assets/aanbod/domaine-achakar/domaine-achakar-tanger-interieur.jpg';
import daVillasVrij from '../assets/aanbod/domaine-achakar/domaine-achakar-tanger-villas-vrijstaand.jpg';
import daResidentie from '../assets/aanbod/domaine-achakar/domaine-achakar-tanger-residentie-toegang.jpg';
import daStrand from '../assets/aanbod/domaine-achakar/domaine-achakar-tanger-strand-achakar.jpg';

export interface ProjectFoto {
  src: ImageMetadata;
  alt: string;
}

/** Eén kenmerk in de kerninformatie-strook (label + waarde). */
export interface Kenmerk {
  label: string;
  waarde: string;
}

export interface Project {
  /** URL-slug binnen de stad, bv. "aryano" → /aanbod/marrakech/aryano/. */
  slug: string;
  /** Nog niet in verkoop: grijze waas + label "Binnenkort beschikbaar" over de foto's. */
  binnenkort?: boolean;
  /** Officiële projectnaam (eigennaam, blijft in elke taal gelijk). */
  naam: string;
  /** Stad-slug; moet overeenkomen met een slug in steden.ts voor de kruislinks. */
  stad: string;
  stadNaam: string;
  regio: string;
  /** Wijk/gebied binnen de stad, indien bekend. */
  wijk?: string;
  /** Ontwikkelaar, alleen tonen als betrouwbaar bekend. */
  developer?: string;
  /** Woning-/projecttype(n). */
  types: string[];
  /** Korte omschrijving (1–2 regels) voor de card en meta description. */
  kort: string;
  /** Introparagraaf op de detailpagina (uniek geschreven voor Maghreb Estates). */
  intro: string;
  /** Volledige projectomschrijving, per alinea. */
  omschrijving: string[];
  /** Kerninformatie-strook onder de hero (alleen bekende feiten). */
  kenmerken: Kenmerk[];
  /** Voorzieningen, alleen wat de bron vermeldt. */
  voorzieningen: string[];
  /** Woningtypen/units, alleen als beschikbaar. */
  woningtypen?: { type: string; details: string }[];
  /** Ligging-tekst: wat we feitelijk over de omgeving weten. */
  ligging: string;
  /** Zoekterm voor de Google Maps-facade (gebied, geen verzonnen coördinaat). */
  mapsQuery: string;
  /** "Vanaf"-prijs, ALLEEN als de ontwikkelaar een actuele prijs noemt. */
  prijsVanaf?: { bedrag: number; valuta: string; tekst: string };
  /** Richtprijs per m², alleen als de bron dit vermeldt. */
  prijsPerM2?: { tekst: string };
  /** Bron-URL van de ontwikkelaar (interne referentie, niet publiek getoond). */
  bron: string;
  /** Hero-/LCP-beeld. */
  hero: ProjectFoto;
  /** Card-thumbnail (mag gelijk zijn aan hero). */
  thumb: ProjectFoto;
  /** Volledige galerij (hero mag hierin herhaald worden of niet). */
  galerij: ProjectFoto[];
}

export const projecten: Project[] = [
  // ── LE DOMAINE D'ACHAKAR — Tanger, Achakar ────────────────────────────────
  {
    slug: 'domaine-achakar',
    naam: "Le Domaine d'Achakar",
    stad: 'tanger',
    stadNaam: 'Tanger',
    regio: 'Tanger-Tetouan-Al Hoceima',
    wijk: 'Achakar',
    types: ['Bouwgrond'],
    kort: 'Zeldzaam perceel van 39.051 m² in Achakar, aan de Atlantische kust van Tanger — getitelde grond in woonzone A2 met 17.180 m² bebouwbaar en twee ontwikkelscenario’s.',
    intro:
      "Le Domaine d'Achakar is een uitzonderlijk perceel van bijna vier hectare aaneengesloten grond in Achakar, een van de meest gewilde zones aan de Atlantische rand van Tanger. Het terrein heeft een volledig gezekerde eigendomstitel (titre foncier) en ligt in woonzone A2, met 17.180 m² bebouwbare oppervlakte. Maghreb Estates begeleidt kopers en investeerders bij de beoordeling, de dossiercontrole en de aankoop van dit foncier.",
    omschrijving: [
      "Het perceel ligt op korte afstand van de Atlantische Oceaan, tegenover de Royal Club Équestre Détroit en op enkele minuten van de Grotten van Hercules. Met een totale oppervlakte van 39.051 m² is dit een van de laatste grote grondkansen in het noorden van Tanger, in een gebied dat snel verstedelijkt maar zijn residentiële, laagdichte karakter behoudt.",
      'Het terrein valt volledig onder het bestemmingsplan van de Agence Urbaine de Tanger, in zone A2 (vrijstaande individuele villa’s): bebouwingscoëfficiënt (COS) maximaal 0,5, vloeroppervlaktecoëfficiënt (CUS) maximaal 25% en een bouwhoogte tot R+1. Een deel van het perceel (zone V313) is aangemerkt als beschermde groenzone van circa 3.800 m², wat het landschap borgt en bebouwing recht tegenover het domein uitsluit.',
      'De grond bestaat uit drie afzonderlijke bebouwbare kavels — west (2.770 m²), midden (5.470 m²) en oost (8.940 m², met dubbele straatzijde) — samen goed voor 17.180 m² bebouwbare oppervlakte. De aangrenzende verkeersas TM 431 (een weg van 30 meter) opent daarnaast de mogelijkheid tot een R+2-classificatie binnen een gesloten-complexproject.',
      'Het domein leent zich voor twee ontwikkelscenario’s. In het eerste scenario ontstaat een vrijstaand landgoed van 27 individuele villa’s (R+1) op kavels van circa 510 m², elk met privézwembad. In het tweede scenario komt er een beveiligde residentie van 40 geschakelde villa’s (R+1) van circa 215 m² met zwembad, in een gesloten complex met één toegang en 24/7-bewaking. Per scenario is een uitgebreid dossier beschikbaar.',
      'Wij bekijken met u welk scenario aansluit bij uw doel — vermogensopbouw, eigen ontwikkeling of doorverkoop — en controleren vóór aankoop de eigendomstitel, de stedenbouwkundige status en het aankooptraject. De begeleiding kan volledig op afstand, in het Nederlands, Engels, Frans of Arabisch.',
    ],
    kenmerken: [
      { label: 'Stad', waarde: 'Tanger (Achakar)' },
      { label: 'Type', waarde: 'Bouwgrond' },
      { label: 'Totale oppervlakte', waarde: '39.051 m²' },
      { label: 'Bebouwbaar', waarde: '17.180 m²' },
      { label: 'Bestemming', waarde: 'Zone A2 · R+1' },
      { label: 'Eigendom', waarde: 'Titre foncier' },
    ],
    voorzieningen: [
      'Volledig getitelde eigendom (titre foncier)',
      'Bijna vier hectare aaneengesloten grond',
      'Drie afzonderlijke bebouwbare kavels in zone A2',
      'Beschermde groenzone (V313) van circa 3.800 m²',
      'Op loopafstand van het strand van Achakar',
      'Tegenover de Royal Club Équestre Détroit',
    ],
    woningtypen: [
      { type: 'Scenario 1 — vrijstaand landgoed', details: '27 vrijstaande villa’s (R+1) op kavels van ± 510 m², elk met privézwembad' },
      { type: 'Scenario 2 — beveiligde residentie', details: '40 geschakelde villa’s (R+1) van ± 215 m² met zwembad, gesloten complex met 24/7-bewaking' },
    ],
    ligging:
      "Le Domaine d'Achakar ligt in het woongebied van Achakar, aan de Atlantische rand van Tanger: op loopafstand van het strand van Achakar, tegenover de Royal Club Équestre Détroit, op vijf minuten van de Grotten van Hercules en op ongeveer vijftien minuten van zowel de internationale luchthaven van Tanger als het Grand Stade de Tanger (WK 2030). De ligging van het perceel is op de kaart aangegeven; kadastrale details en perceelgrenzen bespreken wij graag persoonlijk.",
    mapsQuery: '35.741795,-5.934159',
    bron: 'https://domaine-achakar.lovable.app',
    hero: { src: daLucht, alt: "Luchtfoto van Le Domaine d'Achakar en de Atlantische kust bij Tanger" },
    thumb: { src: daVillaZwembad, alt: 'Villa met zwembad en zicht op de oceaan bij Achakar, Tanger' },
    galerij: [
      { src: daLucht, alt: "Luchtfoto van het perceel Le Domaine d'Achakar aan de kust van Tanger" },
      { src: daVillaZwembad, alt: 'Villa met zwembad en zicht op de Atlantische Oceaan' },
      { src: daInterieur, alt: 'Villa-interieur in Marokkaanse stijl, open naar de tuin' },
      { src: daVillasVrij, alt: "Impressie van een vrijstaand landgoed met individuele villa's" },
      { src: daResidentie, alt: 'Impressie van de toegang tot een beveiligde residentie' },
      { src: daStrand, alt: 'Strand van Achakar aan de Atlantische kust van Tanger' },
    ],
  },

  // ── NEST — Tanger, Route de Rabat ─────────────────────────────────────────
  {
    slug: 'nest',
    naam: 'Nest',
    stad: 'tanger',
    stadNaam: 'Tanger',
    regio: 'Tanger-Tetouan-Al Hoceima',
    wijk: 'Route de Rabat',
    types: ['Appartementen'],
    kort: 'Moderne appartementen met twee slaapkamers aan de Route de Rabat in Tanger, in een beveiligde residentie met binnentuin, zwembad en ondergrondse parking.',
    intro:
      'Nest is een moderne appartementenresidentie aan de Route de Rabat in Tanger. De opzet is die van een gesloten, beveiligde wooncampus met aangelegde binnentuinen, een zwembad en ondergrondse parking. De appartementen hebben twee slaapkamers en twee badkamers. Maghreb Estates begeleidt internationale kopers bij de aankoop en de dossiercontrole van dit project.',
    omschrijving: [
      'Het project bestaat uit meerdere gebouwen in een R+4/R+5-opzet, gegroepeerd rond groene binnentuinen met een zwembad en een apart kinderbad. De architectuur is strak en eigentijds, met balkons aan de appartementen en veel aandacht voor de gemeenschappelijke buitenruimte.',
      'De residentie is beveiligd met gecontroleerde toegang en bewakingscamera’s, en beschikt over een conciërge, een lift en een ondergrondse parkeergarage. De appartementen tellen twee slaapkamers en twee badkamers, met woonoppervlakten tussen circa 68 en 82 m².',
      'Tanger is een van de snelst groeiende steden van Marokko en sterk verbonden met de diaspora uit het noorden. Wij helpen u bij de keuze van het juiste appartement, controleren de eigendomstitel en het contract, en begeleiden de overdracht — ook volledig op afstand.',
    ],
    kenmerken: [
      { label: 'Stad', waarde: 'Tanger (Route de Rabat)' },
      { label: 'Type', waarde: 'Appartementen — 2 slaapkamers, 2 badkamers' },
      { label: 'Woonoppervlak', waarde: 'Circa 68–82 m²' },
      { label: 'Opzet', waarde: 'Beveiligde residentie, R+4/R+5' },
    ],
    voorzieningen: [
      'Beveiligde residentie met gecontroleerde toegang',
      'Bewakingscamera’s en conciërge',
      'Aangelegde binnentuinen en groenzones',
      'Zwembad en apart kinderbad',
      'Ondergrondse parkeergarage',
      'Lift en balkon',
    ],
    woningtypen: [
      { type: 'Appartement — 2 slaapkamers', details: '2 badkamers, circa 68–82 m², met balkon' },
    ],
    ligging:
      'Nest ligt aan de Route de Rabat in Tanger, een uitvalsweg met veel nieuwbouwontwikkeling ten zuiden van het centrum. De exacte ligging binnen de wijk bespreken wij graag persoonlijk.',
    mapsQuery: 'Route de Rabat, Tanger, Marokko',
    prijsPerM2: { tekst: 'Richtprijs vanaf circa 11.000 MAD per m² (volgens de ontwikkelaar)' },
    bron: 'https://tangerestates.com/aanbod/koop/route-de-rabat/moderne-appartementen-te-koop-tanger/',
    hero: { src: nestGevel, alt: 'Moderne gevel van appartementenproject Nest in Tanger bij schemering' },
    thumb: { src: nestGevel, alt: 'Appartementenproject Nest aan de Route de Rabat in Tanger' },
    galerij: [
      { src: nestGevel, alt: 'Gevel van Nest in Tanger bij schemering' },
      { src: nestStraat, alt: 'Straatbeeld van de residentie Nest in Tanger' },
      { src: nestTuinZwembad, alt: 'Binnentuin met zwembad bij Nest in Tanger' },
      { src: nestZwembad, alt: 'Zwembad in de binnentuin van Nest in Tanger' },
      { src: nestTuinLucht, alt: 'Luchtfoto van de binnentuin en het zwembad van Nest in Tanger' },
      { src: nestMasterplan, alt: 'Overzicht van de volledige residentie Nest in Tanger' },
    ],
  },

  // ── PARTNER GROUPE AAFER IMMOBILIER — zie projectenAafer.ts ───────────────
  ...aaferProjecten,
];

// -- Afgeleide helpers -------------------------------------------------------

/** Alle steden met minstens één project, in de volgorde waarin ze voorkomen. */
export const stedenMetAanbod = (() => {
  const gezien = new Map<string, { stad: string; stadNaam: string; regio: string; aantal: number }>();
  for (const p of projecten) {
    const bestaand = gezien.get(p.stad);
    if (bestaand) bestaand.aantal += 1;
    else gezien.set(p.stad, { stad: p.stad, stadNaam: p.stadNaam, regio: p.regio, aantal: 1 });
  }
  return [...gezien.values()];
})();

/** Uitgelicht op de homepage (alle talen), in deze volgorde. Pas hier de slugs aan. */
const uitgelichteSlugs = ['puerta-de-tetuan', 'archipel', 'cabo-golf'];
export const uitgelichteProjecten = uitgelichteSlugs.map((slug) => {
  const p = projecten.find((x) => x.slug === slug);
  if (!p) throw new Error(`Uitgelicht project ontbreekt: ${slug}`);
  return p;
});

/** Projecten van één stad. */
export const projectenVoorStad = (stad: string) => projecten.filter((p) => p.stad === stad);

/** Eén project op basis van stad + slug. */
export const projectVoorSlug = (stad: string, slug: string) =>
  projecten.find((p) => p.stad === stad && p.slug === slug);

/** Gerelateerde projecten: eerst dezelfde stad, aangevuld met andere steden. */
export const gerelateerdeProjecten = (huidige: Project, max = 2) => {
  const zelfdeStad = projecten.filter((p) => p.stad === huidige.stad && p.slug !== huidige.slug);
  const andere = projecten.filter((p) => p.stad !== huidige.stad);
  return [...zelfdeStad, ...andere].slice(0, max);
};

/** Pad naar een project of stad binnen /aanbod/. */
export const projectPad = (p: Project) => `/aanbod/${p.stad}/${p.slug}/`;
export const stadPad = (stad: string) => `/aanbod/${stad}/`;
