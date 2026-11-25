// ============================================================================
// AANBOD VAN PARTNER GROUPE ALLALI (Mohammedia, Mansouria, Zenata, Casablanca)
// — samenwerking sinds november 2026.
//
// Wordt in projecten.ts achter de eigen projecten gevoegd; zelfde Project-model,
// dus hub, stadspagina's, detailpagina's, sitemap en schema werken automatisch.
// Vertalingen (EN/FR/AR) staan in projectenVertalingAllali.ts.
//
// Bron: allali.ma (projectdata zoals hun eigen projectpagina's die laden,
// peildatum 25-11-2026). Weggelaten: Natura Living en Le Joyau du Parc (bij de
// bron "Entièrement commercialisé", dus uitverkocht) en Fdala Business Center
// (staat bij de bron verborgen). Oppervlakten zijn de voorbeeldunits die de
// bron per type toont; waar de brondata niet eenduidig is (Rosa Parc) zijn ze
// weggelaten. Geen prijzen gepubliceerd door de bron → "Op aanvraag".
// Teksten zijn eigen herschrijvingen, geen vertaling van de bron.
// Beelden zijn renders/foto's van Allali, lokaal gehost.
// De naam van de partner wordt bewust niet publiek getoond (geen developer-veld).
// ============================================================================

import type { ImageMetadata } from 'astro';
import type { Project, ProjectFoto } from './projecten';

const beelden = import.meta.glob<{ default: ImageMetadata }>('../assets/aanbod/*/*.jpg', { eager: true });

/** Foto uit src/assets/aanbod/<map>/<bestand>; faalt de build als het bestand ontbreekt. */
const foto = (pad: string, alt: string): ProjectFoto => {
  const mod = beelden[`../assets/aanbod/${pad}`];
  if (!mod) throw new Error(`Aanbodfoto ontbreekt: ${pad}`);
  return { src: mod.default, alt };
};

const bron = (slug: string) => `https://www.allali.ma/${slug}`;

export const allaliProjecten: Project[] = [
  // ── TANGERINE — Mohammedia, Mansouria ─────────────────────────────────────
  (() => {
    const g = [
      foto('tangerine/tangerine-mansouria-zwembad-waterpark.jpg', 'Zwembaden en waterpark tussen de appartementsgebouwen van Tangerine in Mansouria'),
      foto('tangerine/tangerine-mansouria-lagunezwembad.jpg', 'Lagunezwembad met ligweide in de residentie Tangerine'),
      foto('tangerine/tangerine-mansouria-gevel-straatbeeld.jpg', 'Straatgevel van Tangerine met handelsruimten op de begane grond'),
      foto('tangerine/tangerine-mansouria-residentie-avond.jpg', 'Residentie Tangerine in Mansouria bij avond'),
      foto('tangerine/tangerine-mansouria-woonkamer.jpg', 'Woonkamer van een appartement in Tangerine'),
      foto('tangerine/tangerine-mansouria-slaapkamer.jpg', 'Ouderslaapkamer met toegang tot het terras in Tangerine'),
      foto('tangerine/tangerine-mansouria-terras.jpg', 'Ruim terras met loungemeubels bij een appartement in Tangerine'),
    ];
    return {
      slug: 'tangerine',
      naam: 'Tangerine',
      stad: 'mohammedia',
      stadNaam: 'Mohammedia',
      regio: 'Casablanca-Settat',
      wijk: 'Mansouria',
      types: ['Appartementen', 'Handelsruimten'],
      kort: 'Beveiligde residentie in de kustplaats Mansouria bij Mohammedia, met zeven zwembaden, een waterpark, padel en een kids club — appartementen met 1 tot 3 slaapkamers.',
      intro:
        'Tangerine is een afgesloten en beveiligde woonresidentie in El Mansouria, de kustplaats tussen Mohammedia en Bouznika. Het project bestaat uit gebouwen van vier bouwlagen (R+3) rond een groot binnenterrein met zwembaden, lagunes en een waterpark. Maghreb Estates begeleidt u bij de keuze van een appartement, de dossiercontrole en de aankoop.',
      omschrijving: [
        'De residentie is opgezet als een groen woondomein met een uitgebreid pakket aan voorzieningen: zeven zwembaden met twee lagunes en een fontein, een waterpark, vier fitnessruimtes, een padelbaan, een coworkingruimte, een wandelcircuit, een kids club en gebedsruimtes. Er is een ondergrondse parkeergarage en het terrein is dag en nacht beveiligd.',
        'De appartementen hebben één tot drie slaapkamers en worden afgewerkt met een ingerichte keuken, parket in de slaapkamers, een inloopdouche en thermische en geluidsisolatie. Opvallend zijn de terrassen: van circa 15 m² bij een appartement met één slaapkamer tot circa 64 m² bij een appartement met drie slaapkamers. Daarnaast omvat het project handelsruimten.',
        'Volgens de ontwikkelaar start de oplevering vanaf de zomer van 2026. Mansouria profiteert van de nabijheid van Mohammedia en van het toekomstige Grand Stade Hassan II bij Benslimane. Tangerine kan interessant zijn als tweede woning aan de kust of als gezinswoning; wij controleren vóór aankoop de eigendomstitel, het koopcontract en de betalingsroute.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'Mohammedia (Mansouria)' },
        { label: 'Type', waarde: 'Appartementen — 1 tot 3 slaapkamers' },
        { label: 'Woonoppervlak', waarde: 'Circa 48–117 m² + terras' },
        { label: 'Gebouwen', waarde: 'R+3, afgesloten residentie' },
        { label: 'Oplevering', waarde: 'Vanaf zomer 2026 (volgens de ontwikkelaar)' },
        { label: 'Prijs', waarde: 'Op aanvraag' },
      ],
      voorzieningen: [
        'Zeven zwembaden met twee lagunes en een fontein',
        'Waterpark',
        'Vier fitnessruimtes en een padelbaan',
        'Coworkingruimte en wandelcircuit',
        'Kids club, speelplaatsen en groenzones',
        'Gebedsruimtes',
        'Ondergrondse parkeergarage en ruime liften',
        'Ingerichte keukens, parket in de slaapkamers en inloopdouche',
        'Thermische en geluidsisolatie',
        'Beveiliging 24/7',
      ],
      woningtypen: [
        { type: 'Appartement — 1 slaapkamer (F2)', details: '1 badkamer, circa 48 m² + terras van circa 15 m²' },
        { type: 'Appartement — 2 slaapkamers (F3)', details: '2 badkamers, circa 82 m² + terras van circa 24 m²' },
        { type: 'Appartement — 3 slaapkamers (F4)', details: '2 badkamers, circa 117 m² + terras van circa 64 m²' },
        { type: 'Handelsruimte', details: 'Oppervlakte en beschikbaarheid op aanvraag' },
      ],
      ligging:
        'Tangerine ligt in El Mansouria, aan de kust tussen Mohammedia en Bouznika. Winkels, scholen en vervoersverbindingen liggen in de omgeving, en het toekomstige Grand Stade Hassan II bij Benslimane ligt op enkele kilometers. Via Mohammedia zijn Casablanca en Rabat goed bereikbaar.',
      mapsQuery: '33.7245768,-7.3341049',
      bron: bron('tangerine'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),

  // ── LIFE CITY — Zenata Eco-Cité (Mohammedia) ──────────────────────────────
  (() => {
    const g = [
      foto('life-city/life-city-zenata-gebouwen.jpg', 'Appartementsgebouwen van Life City in Zenata Eco-Cité'),
      foto('life-city/life-city-zenata-gevel-avond.jpg', 'Gevel van Life City Zenata bij schemering'),
      foto('life-city/life-city-zenata-zwembad.jpg', 'Zwembad tussen de gebouwen van Life City in Zenata'),
      foto('life-city/life-city-zenata-woonkamer.jpg', 'Woonkamer van een modelappartement in Life City'),
      foto('life-city/life-city-zenata-keuken.jpg', 'Ingerichte keuken met balkondeur in Life City'),
      foto('life-city/life-city-zenata-slaapkamer.jpg', 'Ouderslaapkamer in een appartement van Life City'),
      foto('life-city/life-city-zenata-kinderkamer.jpg', 'Kinderkamer in een appartement van Life City'),
    ];
    return {
      slug: 'life-city',
      naam: 'Life City Zenata',
      stad: 'mohammedia',
      stadNaam: 'Mohammedia',
      regio: 'Casablanca-Settat',
      wijk: 'Zenata Eco-Cité',
      types: ['Appartementen', 'Handelsruimten'],
      kort: 'Groene residentie in de nieuwe Eco-Cité Zenata tussen Casablanca en Mohammedia, met zwembaden, padel en een kids club — appartementen met 1 tot 4 slaapkamers.',
      intro:
        'Life City ligt in het hart van Zenata Eco-Cité, de nieuwe duurzame stad aan de kust tussen Casablanca en Mohammedia. De residentie combineert appartementen in vier formaten met zwembaden, sportvoorzieningen en veel groen, op enkele minuten van zee. Maghreb Estates begeleidt u bij de keuze van een appartement, de dossiercontrole en de aankoop.',
      omschrijving: [
        'Zenata Eco-Cité is opgezet als een duurzame nieuwe stad met meer dan 400 hectare parken en groenzones, op de as Casablanca–Rabat. Life City sluit daarop aan: een beveiligde residentie met groen, zwembaden met waterspelen, een speelplaats, een padelbaan, een sportzaal, een kids club en een ondergrondse parkeergarage.',
        'De appartementen hebben één tot vier slaapkamers, met een woonoppervlak van circa 37 tot 108 m² plus een terras van circa 11 tot 45 m². De afwerking omvat wit marmer, parket in de slaapkamers, een ingerichte keuken, hoogwaardig sanitair, een inloopdouche, houten en aluminium schrijnwerk, thermische en geluidsisolatie en glasvezel. Daarnaast zijn er handelsruimten van circa 32 tot 86 m².',
        'Volgens de ontwikkelaar wordt Life City gefaseerd opgeleverd vanaf de zomer van 2025. Door de ligging tussen Casablanca en Mohammedia kan het project interessant zijn voor eigen gebruik en voor langetermijnverhuur. Wij controleren de actuele beschikbaarheid, de eigendomstitel en het contract voordat u beslist.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'Zenata Eco-Cité (tussen Casablanca en Mohammedia)' },
        { label: 'Type', waarde: 'Appartementen — 1 tot 4 slaapkamers' },
        { label: 'Woonoppervlak', waarde: 'Circa 37–108 m² + terras' },
        { label: 'Handelsruimten', waarde: 'Circa 32–86 m²' },
        { label: 'Oplevering', waarde: 'Gefaseerd vanaf zomer 2025 (volgens de ontwikkelaar)' },
        { label: 'Prijs', waarde: 'Op aanvraag' },
      ],
      voorzieningen: [
        'Zwembaden met waterspelen',
        'Padelbaan en sportzaal',
        'Kids club en speelplaats',
        'Groenzones binnen de residentie',
        'Ondergrondse parkeergarage en ruime liften',
        'Wit marmer, parket in de slaapkamers en inloopdouche',
        'Ingerichte keukens en hoogwaardig sanitair',
        'Thermische en geluidsisolatie',
        'Glasvezelaansluiting',
        'Beveiliging 24/7',
      ],
      woningtypen: [
        { type: 'Appartement — 1 slaapkamer (F2)', details: 'circa 37–53 m² + terras van circa 11–17 m²' },
        { type: 'Appartement — 2 slaapkamers (F3)', details: '2 badkamers, circa 68–70 m² + terras van circa 21 m²' },
        { type: 'Appartement — 2 of 3 slaapkamers (F4)', details: '2 badkamers, circa 83–89 m² + terras van circa 32 m²' },
        { type: 'Appartement — 4 slaapkamers (F5)', details: '2 badkamers, circa 107–108 m² + terras van circa 25–45 m²' },
        { type: 'Handelsruimte', details: 'circa 32 tot 86 m²' },
      ],
      ligging:
        'Life City ligt in de wijk La Ferme aan de kustweg (route côtière 322) in Zenata Eco-Cité, tussen Casablanca en Mohammedia. De zee ligt op enkele minuten en de nieuwe stad telt ruim 400 hectare parken en groenzones. Casablanca en Mohammedia zijn snel bereikbaar.',
      mapsQuery: '33.6545362,-7.4721145',
      bron: bron('life-city'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),

  // ── M’OCEAN — Mohammedia, Mannesmann ──────────────────────────────────────
  (() => {
    const g = [
      foto('mocean/mocean-mohammedia-gevel.jpg', 'Gevel van de residentie M’Ocean in Mohammedia'),
      foto('mocean/mocean-mohammedia-woonkamer.jpg', 'Woon- en eetkamer van een appartement in M’Ocean'),
      foto('mocean/mocean-mohammedia-woon-eetkamer.jpg', 'Lichte woonkamer met eethoek in M’Ocean'),
      foto('mocean/mocean-mohammedia-slaapkamer.jpg', 'Slaapkamer met balkon en zicht richting zee in M’Ocean'),
      foto('mocean/mocean-mohammedia-keuken.jpg', 'Ingerichte keuken in een appartement van M’Ocean'),
      foto('mocean/mocean-mohammedia-badkamer.jpg', 'Badkamer in een appartement van M’Ocean'),
    ];
    return {
      slug: 'mocean',
      naam: 'M’Ocean',
      stad: 'mohammedia',
      stadNaam: 'Mohammedia',
      regio: 'Casablanca-Settat',
      wijk: 'Mannesmann',
      types: ['Appartementen', 'Handelsruimten'],
      kort: 'Direct leverbare residentie in Mohammedia, op twee minuten van het strand van Mannesmann, met zwembad en sportzaal — appartementen met 1 tot 3 slaapkamers.',
      intro:
        'M’Ocean is een beveiligde woonresidentie in Mohammedia, op ongeveer twee minuten van het strand van Mannesmann. Volgens de ontwikkelaar zijn de appartementen direct leverbaar. Maghreb Estates begeleidt u bij de keuze van een appartement, de dossiercontrole en de overdracht.',
      omschrijving: [
        'De residentie beschikt over een buitenzwembad, tuinen, een speel- en ontspanningsruimte en een goed uitgeruste sportzaal, in een groene omgeving met 24-uursbeveiliging. Er is een ondergrondse parkeergarage en het beheer ligt bij een professionele syndicus.',
        'De appartementen hebben één tot drie slaapkamers, met een woonoppervlak van circa 52 tot 111 m², een ingerichte keuken en een afwerking in het hogere segment. De ontwikkelaar vermeldt zeezicht; in hoeverre dat geldt, verschilt per verdieping en oriëntatie. Daarnaast zijn er handelsruimten van circa 27 tot 46 m².',
        'Omdat de appartementen direct leverbaar zijn, ziet u wat u koopt en kunt u het appartement snel gebruiken of verhuren. De ligging bij het strand maakt M’Ocean interessant voor eigen gebruik, een zomerverblijf of verhuur. Wij controleren vooraf de eigendomstitel per appartement, het koopcontract en de kosten van de syndicus.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'Mohammedia (Mannesmann)' },
        { label: 'Type', waarde: 'Appartementen — 1 tot 3 slaapkamers' },
        { label: 'Woonoppervlak', waarde: 'Circa 52–111 m²' },
        { label: 'Status', waarde: 'Direct leverbaar' },
        { label: 'Strand', waarde: 'Circa 2 minuten (Mannesmann)' },
        { label: 'Prijs', waarde: 'Op aanvraag' },
      ],
      voorzieningen: [
        'Buitenzwembad en tuinen',
        'Sportzaal',
        'Speel- en ontspanningsruimte',
        'Op circa 2 minuten van het strand van Mannesmann',
        'Ingerichte keukens',
        'Ondergrondse parkeergarage',
        'Professionele syndicus',
        'Beveiliging 24/7',
      ],
      woningtypen: [
        { type: 'Appartement — 1 slaapkamer', details: 'circa 52–58 m²' },
        { type: 'Appartement — 2 slaapkamers', details: 'circa 58–80 m²' },
        { type: 'Appartement — 3 slaapkamers', details: 'circa 92–111 m²' },
        { type: 'Handelsruimte', details: 'circa 27,5 tot 46 m²' },
      ],
      ligging:
        'M’Ocean ligt in de wijk Mannesmann in Mohammedia, op ongeveer twee minuten van het strand. Het centrum van Mohammedia met winkels en voorzieningen ligt dichtbij, en Casablanca is goed bereikbaar.',
      mapsQuery: '33.707648,-7.373687',
      bron: bron('mocean'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),

  // ── ROSA PARC — Mohammedia, centrum ───────────────────────────────────────
  (() => {
    const g = [
      foto('rosa-parc/rosa-parc-mohammedia-gevel-straat.jpg', 'Gevel van Rosa Parc met handelsruimten in het centrum van Mohammedia'),
      foto('rosa-parc/rosa-parc-mohammedia-hoekgebouw.jpg', 'Hoekgebouw van de residentie Rosa Parc in Mohammedia'),
      foto('rosa-parc/rosa-parc-mohammedia-woonkamer.jpg', 'Woonkamer van een appartement in Rosa Parc'),
      foto('rosa-parc/rosa-parc-mohammedia-slaapkamer.jpg', 'Ouderslaapkamer in Rosa Parc'),
      foto('rosa-parc/rosa-parc-mohammedia-keuken.jpg', 'Ingerichte keuken in een appartement van Rosa Parc'),
      foto('rosa-parc/rosa-parc-mohammedia-eetkamer.jpg', 'Eethoek in een appartement van Rosa Parc'),
    ];
    return {
      slug: 'rosa-parc',
      naam: 'Rosa Parc',
      stad: 'mohammedia',
      stadNaam: 'Mohammedia',
      regio: 'Casablanca-Settat',
      wijk: 'Centrum',
      types: ['Appartementen', 'Handelsruimten'],
      kort: 'Direct leverbare woon- en winkelresidentie in het centrum van Mohammedia, bij het Parc Floral — appartementen met 1 tot 3 slaapkamers en handelsruimten.',
      intro:
        'Rosa Parc is een gemengde woon- en winkelresidentie aan de Place Mohammed V, in het centrum van Mohammedia en vlak bij het Parc Floral. Volgens de ontwikkelaar zijn de appartementen direct leverbaar. Maghreb Estates begeleidt u bij de keuze, de dossiercontrole en de overdracht.',
      omschrijving: [
        'Het complex combineert appartementen met handelsruimten op straatniveau, in een moderne en sobere architectuur. De afwerking omvat marmeren vloeren, parket in de slaapkamers, een ingerichte keuken, een inloopdouche, hoogwaardig sanitair, houten schrijnwerk, decoratief schilderwerk en thermische en geluidsisolatie.',
        'Er zijn appartementen met één slaapkamer (F2), twee slaapkamers (F3) en drie slaapkamers met twee badkamers (F4). De residentie heeft een ondergrondse parkeergarage, 24-uursbeveiliging en een professionele syndicus. De exacte oppervlakten en beschikbaarheid per type vragen wij voor u op bij de ontwikkelaar.',
        'Door de centrale ligging, met winkels, voorzieningen en de corniche dichtbij, past Rosa Parc als stadsappartement voor eigen gebruik of voor langetermijnverhuur. De handelsruimten kunnen interessant zijn voor wie een zaak wil starten of in commercieel vastgoed wil investeren. Wij controleren vooraf de eigendomstitel, het contract en de syndicuskosten.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'Mohammedia (centrum)' },
        { label: 'Type', waarde: 'Appartementen (1–3 slaapkamers) en handelsruimten' },
        { label: 'Status', waarde: 'Direct leverbaar' },
        { label: 'Ligging', waarde: 'Place Mohammed V, bij het Parc Floral' },
        { label: 'Parkeren', waarde: 'Ondergrondse parkeergarage' },
        { label: 'Prijs', waarde: 'Op aanvraag' },
      ],
      voorzieningen: [
        'Centrale ligging, dicht bij het strand aan de corniche',
        'Marmeren vloeren en parket in de slaapkamers',
        'Ingerichte keukens, inloopdouche en hoogwaardig sanitair',
        'Houten schrijnwerk en decoratief schilderwerk',
        'Thermische en geluidsisolatie',
        'Ondergrondse parkeergarage',
        'Professionele syndicus',
        'Beveiliging 24/7',
      ],
      woningtypen: [
        { type: 'Appartement — 1 slaapkamer (F2)', details: '1 badkamer; oppervlakte op aanvraag' },
        { type: 'Appartement — 2 slaapkamers (F3)', details: '1 badkamer; oppervlakte op aanvraag' },
        { type: 'Appartement — 3 slaapkamers (F4)', details: '2 badkamers; oppervlakte op aanvraag' },
        { type: 'Handelsruimte', details: 'circa 57 tot 126 m²' },
      ],
      ligging:
        'Rosa Parc ligt aan de Place Mohammed V in het centrum van Mohammedia, vlak bij het Parc Floral. Winkels, horeca en voorzieningen liggen op loopafstand, en het strand aan de corniche is dichtbij.',
      mapsQuery: '33.704833,-7.394315',
      bron: bron('rosa-parc'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),

  // ── EVERGREEN — Casablanca, Californie ────────────────────────────────────
  (() => {
    const g = [
      foto('evergreen/evergreen-casablanca-zwembad-residentie.jpg', 'Zwembad en binnentuin tussen de gebouwen van Evergreen in Casablanca'),
      foto('evergreen/evergreen-casablanca-woonkamer.jpg', 'Woonkamer van het modelappartement in Evergreen'),
      foto('evergreen/evergreen-casablanca-slaapkamer.jpg', 'Ouderslaapkamer in het modelappartement van Evergreen'),
      foto('evergreen/evergreen-casablanca-slaapkamer-2.jpg', 'Slaapkamer met inbouwkasten in Evergreen'),
      foto('evergreen/evergreen-casablanca-keuken.jpg', 'Ingerichte keuken in het modelappartement van Evergreen'),
      foto('evergreen/evergreen-casablanca-badkamer.jpg', 'Badkamer met inloopdouche in Evergreen'),
      foto('evergreen/evergreen-casablanca-terras.jpg', 'Terras met beplanting bij een appartement in Evergreen'),
    ];
    return {
      slug: 'evergreen',
      naam: 'Evergreen',
      stad: 'casablanca',
      stadNaam: 'Casablanca',
      regio: 'Casablanca-Settat',
      wijk: 'Californie',
      types: ['Appartementen'],
      kort: 'Groene, beveiligde residentie in de wijk Californie in Casablanca, met zwembad en fitness — appartementen met 1 tot 3 slaapkamers, in aanbouw.',
      intro:
        'Evergreen is een afgesloten en beveiligde residentie in het hogere segment in Californie, een gewilde woonwijk in het zuiden van Casablanca. Het project bestaat uit gebouwen van vijf en zeven bouwlagen (R+4 en R+6) rond een groene binnentuin met zwembad. Maghreb Estates begeleidt u bij de keuze van een appartement, de dossiercontrole en de aankoop.',
      omschrijving: [
        'Het ontwerp draait om groen: de gebouwen staan rond aangelegde tuinen met een zwembad, speelplekken voor kinderen en een fitnessruimte. De residentie is dag en nacht beveiligd en heeft ruime liften.',
        'De appartementen hebben één tot drie slaapkamers, met een woonoppervlak van circa 36 tot 113 m² plus terras. Ze worden opgeleverd met een ingerichte keuken en parket in de slaapkamers; de beelden van het modelappartement tonen een warme, moderne afwerking.',
        'Evergreen is in aanbouw. Californie ligt dicht bij winkels, scholen en openbaar vervoer en op enkele minuten van het stadscentrum, wat het project interessant maakt voor gezinnen en voor langetermijnverhuur in de grootste woningmarkt van Marokko. Wij controleren de opleverplanning, de betalingsvoorwaarden en het contract voordat u tekent.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'Casablanca (Californie)' },
        { label: 'Type', waarde: 'Appartementen — 1 tot 3 slaapkamers' },
        { label: 'Woonoppervlak', waarde: 'Circa 36–113 m² + terras' },
        { label: 'Gebouwen', waarde: 'R+4 en R+6, afgesloten residentie' },
        { label: 'Status', waarde: 'In aanbouw' },
        { label: 'Prijs', waarde: 'Op aanvraag' },
      ],
      voorzieningen: [
        'Zwembad',
        'Fitnessruimte',
        'Speelplekken en groenzones',
        'Ingerichte keukens en parket in de slaapkamers',
        'Ruime liften',
        'Beveiliging 24/7',
      ],
      woningtypen: [
        { type: 'Appartement — 1 slaapkamer (F2)', details: 'circa 36 m² + terras van circa 5 m²' },
        { type: 'Appartement — 2 slaapkamers (F3)', details: '2 badkamers, circa 80 m² + terras van circa 15 m²' },
        { type: 'Appartement — 3 slaapkamers (F4)', details: '2 badkamers, circa 113 m² + terras van circa 20 m²' },
      ],
      ligging:
        'Evergreen ligt in Californie, een gewilde woonwijk in het zuiden van Casablanca. Winkels, scholen en openbaar vervoer liggen in de directe omgeving, en het stadscentrum is in enkele minuten bereikbaar.',
      mapsQuery: '33.5099922,-7.6190285',
      bron: bron('evergreen'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),
];
