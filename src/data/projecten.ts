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

// -- Golf City (Prestigia, Marrakech) ---------------------------------------
import gcGolf from '../assets/aanbod/golf-city/golf-city-marrakech-golf-zwembad.jpg';
import gcOverzicht from '../assets/aanbod/golf-city/golf-city-marrakech-overzicht.jpg';
import gcProject1 from '../assets/aanbod/golf-city/golf-city-marrakech-project-01.jpg';
import gcProject2 from '../assets/aanbod/golf-city/golf-city-marrakech-project-02.jpg';

// -- Projet Or (Vaneau, Marrakech · Agdal) ----------------------------------
import orA1 from '../assets/aanbod/projet-or/projet-or-marrakech-agdal-01.jpg';
import orA2 from '../assets/aanbod/projet-or/projet-or-marrakech-agdal-02.jpg';
import orA3 from '../assets/aanbod/projet-or/projet-or-marrakech-agdal-03.jpg';
import orA4 from '../assets/aanbod/projet-or/projet-or-marrakech-agdal-04.jpg';
import orA5 from '../assets/aanbod/projet-or/projet-or-marrakech-agdal-05.jpg';
import orA6 from '../assets/aanbod/projet-or/projet-or-marrakech-agdal-06.jpg';
import orA7 from '../assets/aanbod/projet-or/projet-or-marrakech-agdal-07.jpg';

// -- Nest (Tanger · Route de Rabat) -----------------------------------------
import nestGevel from '../assets/aanbod/nest/nest-tanger-gevel-schemering.jpg';
import nestStraat from '../assets/aanbod/nest/nest-tanger-straatbeeld-schemering.jpg';
import nestTuinZwembad from '../assets/aanbod/nest/nest-tanger-binnentuin-zwembad.jpg';
import nestZwembad from '../assets/aanbod/nest/nest-tanger-zwembad.jpg';
import nestTuinLucht from '../assets/aanbod/nest/nest-tanger-binnentuin-luchtfoto.jpg';
import nestMasterplan from '../assets/aanbod/nest/nest-tanger-masterplan-luchtfoto.jpg';

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
  /** URL-slug binnen de stad, bv. "golf-city" → /aanbod/marrakech/golf-city/. */
  slug: string;
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
  // ── PROJET OR — Marrakech, Agdal ──────────────────────────────────────────
  {
    slug: 'projet-or',
    naam: 'Projet Or',
    stad: 'marrakech',
    stadNaam: 'Marrakech',
    regio: 'Marrakech-Safi',
    wijk: 'Agdal',
    types: ['Appartementen'],
    kort: 'Moderne, beveiligde appartementenresidentie in Agdal met twee zwembaden, spa en fitness, op minder dan 15 minuten van de luchthaven.',
    intro:
      'Projet Or is een moderne appartementenresidentie in Agdal, een van de meest gewilde woonwijken van Marrakech. Het beveiligde complex combineert ruime buitenruimte — twee zwembaden, tuinen en een dakterras met panoramisch uitzicht — met voorzieningen als een spa en fitness. Maghreb Estates begeleidt u bij de selectie, de dossiercontrole en de aankoop van een appartement in dit project.',
    omschrijving: [
      'Het project omvat 348 appartementen in een gesloten, bewaakte residentie. De architectuur is modern en verzorgd, met veel aandacht voor gemeenschappelijke buitenruimte en groen. Twee buitenzwembaden en aangelegde tuinen vormen het hart van het complex; op het dak is een terras met panoramisch uitzicht over de omgeving.',
      'Binnen de residentie zijn een spa en een fitnessruimte aanwezig, en het geheel is beveiligd met gecontroleerde toegang. Door de ligging in Agdal liggen winkelcentra, restaurants, meerdere golfbanen en zorgvoorzieningen op korte afstand, en is de luchthaven van Marrakech in minder dan een kwartier bereikbaar.',
      'Wij bekijken met u welke woningtypen aansluiten bij uw doel — eigen gebruik, tweede woning of verhuur — en controleren vóór aankoop de eigendomstitel, het koopcontract en de betalingsroute. De begeleiding kan volledig op afstand, in het Nederlands, Engels, Frans of Arabisch.',
    ],
    kenmerken: [
      { label: 'Stad', waarde: 'Marrakech (Agdal)' },
      { label: 'Type', waarde: 'Appartementen' },
      { label: 'Aantal woningen', waarde: '348 appartementen' },
      { label: 'Prijsindicatie', waarde: 'Vanaf 1,4 miljoen MAD' },
    ],
    voorzieningen: [
      'Twee buitenzwembaden',
      'Aangelegde tuinen en groenzones',
      'Spa',
      'Fitnessruimte',
      'Beveiligde residentie met gecontroleerde toegang',
      'Dakterras met panoramisch uitzicht',
    ],
    ligging:
      'Projet Or ligt in Agdal, een centrale en gewilde woonwijk van Marrakech. Winkelcentra, restaurants, meerdere golfbanen en zorgvoorzieningen bevinden zich in de directe omgeving; de luchthaven Marrakech-Menara is in minder dan 15 minuten bereikbaar.',
    mapsQuery: 'Agdal, Marrakech, Marokko',
    prijsVanaf: { bedrag: 1400000, valuta: 'MAD', tekst: 'Vanaf 1,4 miljoen MAD' },
    bron: 'https://www.vaneau-maroc.com/en/node/640',
    hero: { src: orA1, alt: 'Modern appartementencomplex Projet Or in Agdal, Marrakech' },
    thumb: { src: orA1, alt: 'Projet Or, appartementenresidentie in Agdal, Marrakech' },
    galerij: [
      { src: orA1, alt: 'Gevelaanzicht van Projet Or in Agdal, Marrakech' },
      { src: orA2, alt: 'Buitenzwembad en tuinen bij Projet Or in Marrakech' },
      { src: orA3, alt: 'Gemeenschappelijke buitenruimte van Projet Or in Marrakech' },
      { src: orA4, alt: 'Appartementen met balkons in Projet Or, Agdal' },
      { src: orA5, alt: 'Groenzones binnen de residentie Projet Or in Marrakech' },
      { src: orA6, alt: 'Detail van de architectuur van Projet Or in Marrakech' },
      { src: orA7, alt: 'Overzicht van de residentie Projet Or in Agdal, Marrakech' },
    ],
  },

  // ── MARRAKECH GOLF CITY — Prestigia ───────────────────────────────────────
  {
    slug: 'golf-city',
    naam: 'Marrakech Golf City',
    stad: 'marrakech',
    stadNaam: 'Marrakech',
    regio: 'Marrakech-Safi',
    wijk: 'Avenue Mohammed VI',
    developer: 'Prestigia',
    types: ['Appartementen', "Villa's"],
    kort: 'Grootschalige golfresort-wijk van Prestigia aan de Avenue Mohammed VI, rond de 18-holes Montgomerie-golfbaan, met appartementen en villa’s.',
    intro:
      'Marrakech Golf City is een grootschalige, gemengde woonwijk van ontwikkelaar Prestigia, gelegen aan de Avenue Mohammed VI nabij Hivernage. Het project is opgebouwd rond een 18-holes golfbaan (The Montgomerie) en combineert appartementen en villa’s met een clubhouse, winkelcentrum en hotelvoorzieningen. Maghreb Estates begeleidt u bij de oriëntatie op dit project en bij een eventuele aankoop.',
    omschrijving: [
      'Golf City is een van de bekendste golfresort-ontwikkelingen van Marrakech. De wijk beslaat een groot terrein en is aangelegd rond de door Colin Montgomerie ontworpen 18-holes golfbaan. Naast het groen bevat het project een clubhouse met restaurants, een winkelcentrum, hotelfaciliteiten en recreatieve voorzieningen.',
      'Het woningaanbod is gemengd: appartementen met twee of drie slaapkamers en verschillende villatypes, van geschakelde tot vrijstaande woningen. De architectuur en het parkachtige stratenplan geven de wijk een rustige, residentiële uitstraling op korte afstand van het centrum van Marrakech.',
      'Omdat de beschikbaarheid en de voorwaarden per fase en per woningtype verschillen, controleren wij die altijd actueel bij de bron voordat u een keuze maakt. Wij helpen u bij de objectselectie, de dossiercontrole en de begeleiding tot en met de overdracht — ook volledig op afstand.',
    ],
    kenmerken: [
      { label: 'Stad', waarde: 'Marrakech (Avenue Mohammed VI)' },
      { label: 'Type', waarde: "Appartementen en villa's" },
      { label: 'Ontwikkelaar', waarde: 'Prestigia' },
      { label: 'Bijzonder', waarde: '18-holes golfbaan (The Montgomerie)' },
    ],
    voorzieningen: [
      '18-holes golfbaan (The Montgomerie Marrakech)',
      'Clubhouse met restaurants',
      'Winkelcentrum',
      'Hotelvoorzieningen',
      'Parkachtige, residentiële omgeving',
    ],
    woningtypen: [
      { type: 'Appartement — 2 slaapkamers', details: 'vanaf circa 75 m²' },
      { type: 'Appartement — 3 slaapkamers', details: 'vanaf circa 95 m²' },
      { type: 'Villa (geschakeld / vrijstaand)', details: 'circa 300–500 m² grondoppervlak' },
    ],
    ligging:
      'Marrakech Golf City ligt aan de Avenue Mohammed VI, in het verlengde van de wijk Hivernage, op korte afstand van het centrum van Marrakech. De wijk zelf is opgezet rond de golfbaan en heeft eigen voorzieningen.',
    mapsQuery: 'Marrakech Golf City, Avenue Mohammed VI, Marrakech, Marokko',
    bron: 'https://prestigia-morocco.com/en/programmes-immobilier/marrakech-golf-city/',
    hero: { src: gcGolf, alt: 'Golfbaan en zwembad in Marrakech Golf City' },
    thumb: { src: gcOverzicht, alt: 'Woningen en groen in Marrakech Golf City' },
    galerij: [
      { src: gcGolf, alt: 'Golfbaan met zwembad in Marrakech Golf City' },
      { src: gcOverzicht, alt: 'Overzicht van de woonwijk Marrakech Golf City' },
      { src: gcProject1, alt: 'Woningen langs de golfbaan in Marrakech Golf City' },
      { src: gcProject2, alt: 'Straatbeeld in de residentiële wijk Marrakech Golf City' },
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
