// ============================================================================
// AANBOD VAN PARTNER GROUPE AAFER IMMOBILIER (Tanger, Tétouan, M'diq,
// Cabo Negro, Martil, Marrakech) — samenwerking sinds oktober 2026.
//
// Wordt in projecten.ts achter de eigen projecten gevoegd; zelfde Project-model,
// dus hub, stadspagina's, detailpagina's, sitemap en schema werken automatisch.
// Vertalingen (EN/FR/AR) staan in projectenVertalingAafer.ts.
//
// Bron: aaferimmobilier.com (projectdata uit hun WordPress/Houzez-API, peildatum
// 12-10-2026). Alleen projecten die daar NIET als "Sold Out" staan zijn
// opgenomen. Woningtypen die bij de bron als "épuisé" (uitverkocht) staan, zijn
// weggelaten. Teksten zijn eigen herschrijvingen, geen vertaling van de bron.
// Beelden zijn renders/foto's van Aafer (met hun watermerk), lokaal gehost.
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

const bron = (slug: string) => `https://aaferimmobilier.com/projet/${slug}/`;

export const aaferProjecten: Project[] = [
  // ── RÉSIDENCE OCEANA — Tanger, Achakar ────────────────────────────────────
  (() => {
    const g = [
      foto('oceana/oceana-tanger-zwembad-residentie.jpg', 'Zwembad en appartementsgebouwen van Résidence Oceana in Achakar, Tanger'),
      foto('oceana/oceana-tanger-zwembad-tuin.jpg', 'Zwembad met ligbedden en tropische beplanting in Résidence Oceana'),
      foto('oceana/oceana-tanger-luchtfoto-blokken.jpg', 'Luchtbeeld van de laagbouwblokken van Résidence Oceana tussen het groen'),
      foto('oceana/oceana-tanger-luchtfoto-groen.jpg', 'Overzicht van Résidence Oceana in de groene omgeving van Achakar'),
      foto('oceana/oceana-tanger-zwembad-avond.jpg', 'Résidence Oceana in Tanger bij avond, met verlicht zwembad'),
      foto('oceana/oceana-tanger-luchtfoto-avond.jpg', 'Luchtbeeld van Résidence Oceana bij avond'),
    ];
    return {
      slug: 'oceana',
      naam: 'Résidence Oceana',
      stad: 'tanger',
      stadNaam: 'Tanger',
      regio: 'Tanger-Tetouan-Al Hoceima',
      wijk: 'Achakar',
      types: ['Appartementen'],
      kort: 'Kustresidentie in Achakar, tussen Cap Spartel en de Grotten van Hercules: 232 appartementen in laagbouw met zes zwembaden, padel en fitness.',
      intro:
        'Résidence Oceana is een resortachtige woonresidentie in Achakar, het kustgebied ten westen van Tanger tussen Cap Spartel en de Grotten van Hercules. Het project bestaat uit vijftien laagbouwblokken met appartementen en een hotelresidentie, verspreid over een groen terrein met zes zwembaden. Maghreb Estates begeleidt kopers bij de keuze van een appartement, de dossiercontrole en de aankoop.',
      omschrijving: [
        'De residentie telt 232 appartementen in vijftien gebouwen van maximaal drie bouwlagen (R+1 en R+2), aangevuld met een hotelresidentie in R+3. Door de lage bebouwing en de ruime tussenruimtes blijft het terrein open en groen; de gebouwen zijn gegroepeerd rond zwembaden en aangelegde tuinen.',
        'Voor bewoners zijn er zes zwembaden (waaronder een kinderbad), een padel- en tennisbaan, een voetbalveld, een fitnessruimte, speelruimte voor kinderen en een restaurant met café. De residentie is beveiligd, beschikt over een conciërge en een ondergrondse parkeergarage. De appartementen hebben twee of drie slaapkamers, een ingerichte keuken en centrale airconditioning.',
        'Achakar is een van de meest gewilde kustzones van Tanger, met het strand op enkele minuten. Dat maakt Oceana interessant als tweede woning aan zee of als verhuurobject in het zomerseizoen. Wij bekijken met u welk woningtype bij uw doel past en controleren vóór aankoop de eigendomstitel, het contract en de betalingsroute.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'Tanger (Achakar)' },
        { label: 'Type', waarde: 'Appartementen — 2 of 3 slaapkamers' },
        { label: 'Woonoppervlak', waarde: 'Circa 60–126 m²' },
        { label: 'Omvang', waarde: '232 appartementen in 15 gebouwen' },
        { label: 'Oplevering', waarde: 'Gepland december 2027' },
        { label: 'Prijsindicatie', waarde: 'Vanaf 1.380.000 MAD' },
      ],
      voorzieningen: [
        'Zes zwembaden, waaronder een kinderbad',
        'Padel-/tennisbaan en voetbalveld',
        'Fitnessruimte en speelruimte voor kinderen',
        'Restaurant en café op het terrein',
        'Beveiligde residentie met conciërge',
        'Ondergrondse parkeergarage',
        'Centrale airconditioning en geluids- en warmte-isolatie',
      ],
      woningtypen: [
        { type: 'Appartement — 2 slaapkamers', details: '1 of 2 badkamers, vanaf circa 60 m²' },
        { type: 'Appartement — 3 slaapkamers', details: '2 badkamers, tot circa 126 m²' },
      ],
      ligging:
        'Résidence Oceana ligt aan de toegangsweg Mediouna–Achakar, in het kustgebied ten westen van Tanger. Het strand van Achakar, Cap Spartel en de Grotten van Hercules liggen op enkele minuten rijden; het centrum van Tanger is goed bereikbaar via de kustweg.',
      mapsQuery: '35.764870,-5.923954',
      prijsVanaf: { bedrag: 1380000, valuta: 'MAD', tekst: 'Vanaf 1.380.000 MAD' },
      bron: bron('residence-oceana'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),

  // ── ARCHIPEL — Tanger, corniche ───────────────────────────────────────────
  (() => {
    const g = [
      foto('archipel/archipel-tanger-toren-dag.jpg', 'Woontoren Archipel aan de corniche van Tanger'),
      foto('archipel/archipel-tanger-toren-avond.jpg', 'Archipel in Tanger bij avond, met verlichte gevel'),
      foto('archipel/archipel-tanger-balkon-zeezicht.jpg', 'Balkon met glazen balustrade en zicht op de baai van Tanger'),
      foto('archipel/archipel-tanger-woonkamer.jpg', 'Woonkamer van een modelappartement in Archipel'),
      foto('archipel/archipel-tanger-keuken.jpg', 'Ingerichte keuken met toegang tot het balkon in Archipel'),
      foto('archipel/archipel-tanger-slaapkamer.jpg', 'Slaapkamer van een appartement in Archipel, Tanger'),
      foto('archipel/archipel-tanger-badkamer.jpg', 'Badkamer met inloopdouche in Archipel'),
    ];
    return {
      slug: 'archipel',
      naam: 'Archipel',
      stad: 'tanger',
      stadNaam: 'Tanger',
      regio: 'Tanger-Tetouan-Al Hoceima',
      wijk: 'Corniche',
      types: ['Appartementen'],
      kort: 'Woontoren van negentien verdiepingen vlak bij de corniche van Tanger, met appartementen van één tot drie slaapkamers en zicht op zee.',
      intro:
        'Archipel is een woontoren in R+18 op enkele stappen van de corniche van Tanger. Het gebouw heeft vier vrije gevels, waardoor de appartementen veel daglicht en — afhankelijk van verdieping en oriëntatie — zicht op de baai krijgen. Maghreb Estates begeleidt u bij de keuze van een appartement en de aankoop van begin tot eind.',
      omschrijving: [
        'De toren telt 121 appartementen boven een plint met winkels en kantoren. De appartementen hebben één tot drie slaapkamers en worden afgewerkt met domotica, een verbonden videofoon, dubbele beglazing, centrale airconditioning en geluids- en warmte-isolatie. Het modelappartement laat een strak, eigentijds interieur zien met een ingerichte keuken.',
        'De ligging is een van de sterkste punten: de corniche, de jachthaven Tanger Marina Bay, winkelcentra en restaurants liggen op loopafstand. Dat maakt Archipel geschikt als stadsappartement voor eigen gebruik, maar ook voor verhuur aan professionals en bezoekers van de stad.',
        'De winkels en kantoorvloeren in het gebouw zijn volgens de ontwikkelaar verkocht; voor de appartementen zijn nog meerdere typen beschikbaar. Wij controleren de actuele beschikbaarheid, het koopcontract en de betalingsroute voordat u een keuze maakt.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'Tanger (corniche)' },
        { label: 'Type', waarde: 'Appartementen — 1 tot 3 slaapkamers' },
        { label: 'Woonoppervlak', waarde: 'Circa 65–110 m² (beschikbare typen)' },
        { label: 'Gebouw', waarde: 'Woontoren R+18, 121 appartementen' },
        { label: 'Oplevering', waarde: 'Gepland 2027' },
        { label: 'Prijsindicatie', waarde: 'Vanaf 2.660.000 MAD' },
      ],
      voorzieningen: [
        'Op één minuut van de corniche',
        'Zicht op zee vanaf een deel van de appartementen',
        'Domotica en verbonden videofoon',
        'Centrale airconditioning en dubbele beglazing',
        'Geluids- en warmte-isolatie',
        'Liften en parkeerplaats',
      ],
      woningtypen: [
        { type: 'Appartement — 1 slaapkamer', details: 'circa 65 m², 1 badkamer' },
        { type: 'Appartement — 2 slaapkamers', details: 'circa 70, 95, 100 of 110 m², 2 badkamers' },
      ],
      ligging:
        'Archipel ligt aan de Rue des Zenata, op één minuut van de corniche van Tanger. De jachthaven Tanger Marina Bay, winkelcentra, hotels en restaurants liggen in de directe omgeving, en het treinstation Tanger Ville (hogesnelheidslijn Al Boraq) is dichtbij.',
      mapsQuery: '35.774035,-5.791326',
      prijsVanaf: { bedrag: 2660000, valuta: 'MAD', tekst: 'Vanaf 2.660.000 MAD' },
      bron: bron('archipel'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),

  // ── RÉSIDENCE ALPINIA — Tanger, Avenue d'Espagne ──────────────────────────
  (() => {
    const g = [
      foto('alpinia/alpinia-tanger-toren-avond.jpg', 'Woontoren Résidence Alpinia aan de Avenue d’Espagne in Tanger bij avond'),
      foto('alpinia/alpinia-tanger-toren-gevel.jpg', 'Gevel van Résidence Alpinia met verlichte balkons'),
      foto('alpinia/alpinia-tanger-woonkamer.jpg', 'Woonkamer van het modelappartement in Résidence Alpinia'),
      foto('alpinia/alpinia-tanger-keuken.jpg', 'Ingerichte keuken in Résidence Alpinia'),
      foto('alpinia/alpinia-tanger-slaapkamer.jpg', 'Slaapkamer met twee bedden in Résidence Alpinia'),
      foto('alpinia/alpinia-tanger-badkamer.jpg', 'Badkamer met inloopdouche in Résidence Alpinia'),
      foto('alpinia/alpinia-tanger-domotica.jpg', 'Domotica-bedieningspaneel in een appartement van Résidence Alpinia'),
    ];
    return {
      slug: 'alpinia',
      naam: 'Résidence Alpinia',
      stad: 'tanger',
      stadNaam: 'Tanger',
      regio: 'Tanger-Tetouan-Al Hoceima',
      wijk: 'Avenue d’Espagne',
      types: ['Appartementen', 'Penthouses'],
      kort: 'Woontoren aan de Avenue d’Espagne, vlak bij de corniche en het station: studio’s, appartementen en penthouses met een zwembad op het dak.',
      intro:
        'Résidence Alpinia is een woontoren van zestien bouwlagen aan de Avenue d’Espagne, tegenover de rotonde bij het Centre d’accueil van Tanger. De corniche, het station van de hogesnelheidslijn en een groot winkelcentrum liggen op een minuut. Bijzonder is het gemeenschappelijke zwembad op het dak, op de vijftiende verdieping. Maghreb Estates begeleidt u bij selectie, controle en aankoop.',
      omschrijving: [
        'Het gebouw heeft drie gevels en telt 62 woningen, van studio’s en appartementen tot penthouses, boven twee verdiepingen met kantoren en twee ondergrondse parkeerlagen. De afwerking is van hoog niveau: domotica, centrale airconditioning, dubbele beglazing, houten en aluminium schrijnwerk, isolatie en een videofoon. Het modelappartement toont een warm interieur in hout en lichte tinten.',
        'Vanaf de hogere verdiepingen is er zicht op zee en op de omliggende tuinen. Het daktuinzwembad is toegankelijk voor alle bewoners. Door de ligging in het hart van de moderne stad — dicht bij station, corniche, Tanger Marina Bay en Villa Harris — leent Alpinia zich zowel voor eigen gebruik als voor verhuur.',
        'Een groot deel van de standaardtypen is volgens de ontwikkelaar al verkocht. Beschikbaar zijn onder meer appartementen met twee slaapkamers van circa 80 m² en de grotere units op de bovenste verdiepingen. Wij vragen de actuele beschikbaarheid op en controleren contract en betalingsroute voor u.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'Tanger (Avenue d’Espagne)' },
        { label: 'Type', waarde: 'Appartementen en penthouses' },
        { label: 'Woonoppervlak', waarde: 'Circa 50–210 m²' },
        { label: 'Gebouw', waarde: 'Woontoren R+15, 62 woningen' },
        { label: 'Oplevering', waarde: 'Gepland 2027' },
        { label: 'Prijsindicatie', waarde: 'Vanaf 2.000.000 MAD' },
      ],
      voorzieningen: [
        'Zwembad op het dak (15e verdieping)',
        'Op één minuut van corniche, station en winkelcentrum',
        'Domotica en videofoon',
        'Centrale airconditioning en dubbele beglazing',
        'Twee ondergrondse parkeerlagen',
        'Beveiligde residentie met liften',
      ],
      woningtypen: [
        { type: 'Appartement — 2 slaapkamers', details: 'circa 80 m², 2 badkamers' },
        { type: 'Grotere appartementen en penthouses', details: 'op de bovenste verdiepingen, tot circa 210 m² — beschikbaarheid op aanvraag' },
      ],
      ligging:
        'Alpinia ligt aan de Avenue d’Espagne, tegenover de rotonde bij het Centre d’accueil van Tanger. Volgens de ontwikkelaar liggen de corniche, het station van de hogesnelheidslijn en het winkelcentrum op een minuut, en Villa Harris, Malabata Playpark en Tanger Marina Bay op ongeveer vijf minuten.',
      mapsQuery: '35.772606,-5.790257',
      prijsVanaf: { bedrag: 2000000, valuta: 'MAD', tekst: 'Vanaf 2.000.000 MAD' },
      bron: bron('residence-alpinia'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),

  // ── BORJ AL ANDALOUS III — Tanger, Tanja Balia ────────────────────────────
  (() => {
    const g = [
      foto('borj-al-andalous-3/borj-al-andalous-3-tanger-toren-straatbeeld.jpg', 'Woontoren Borj Al Andalous III aan de weg naar Tanja Balia in Tanger'),
      foto('borj-al-andalous-3/borj-al-andalous-3-tanger-toren-gevel.jpg', 'Gevel van Borj Al Andalous III met winkelplint'),
      foto('borj-al-andalous-3/borj-al-andalous-3-tanger-toren-vooraanzicht.jpg', 'Vooraanzicht van de torens van Borj Al Andalous'),
      foto('borj-al-andalous-3/borj-al-andalous-3-tanger-toren-skyline.jpg', 'Borj Al Andalous III in de skyline van Tanger'),
    ];
    return {
      slug: 'borj-al-andalous-3',
      naam: 'Borj Al Andalous III',
      stad: 'tanger',
      stadNaam: 'Tanger',
      regio: 'Tanger-Tetouan-Al Hoceima',
      wijk: 'Tanja Balia',
      types: ['Appartementen'],
      kort: 'Derde woontoren van het Borj Al Andalous-ensemble in Tanger, vlak bij het Al Boraq-station en grote hotels, met appartementen van één en twee slaapkamers.',
      intro:
        'Borj Al Andalous III is de derde toren binnen het Borj Al Andalous-ensemble, op hetzelfde adres als Borj Al Andalous II aan de weg naar Tanja Balia. De toren van zeventien bouwlagen ligt dicht bij hotels, restaurants, een winkelcentrum en het station van de hogesnelheidslijn Al Boraq. Maghreb Estates begeleidt u bij de aankoop en de dossiercontrole.',
      omschrijving: [
        'Het gebouw (R+16) telt 102 appartementen boven een plint met vijf winkels en tien kantoorvloeren. De appartementen hebben één of twee slaapkamers; op de derde verdieping zijn er units met een groot terras, en op de vijftiende verdieping grotere woningen tot circa 210 m².',
        'De eerste twee torens van het ensemble zijn opgeleverd en uitverkocht, wat iets zegt over de vraag op deze locatie. De ligging bij het station en de hotelzone maakt de appartementen ook interessant voor verhuur aan zakelijke bezoekers.',
        'De meeste standaardtypen zijn volgens de ontwikkelaar inmiddels verkocht; er resteren onder meer een appartement van 85 m² met twee slaapkamers, appartementen met één slaapkamer van circa 65 m² en de terras- en topverdiepingen. Wij vragen de actuele stand op en controleren het dossier voordat u beslist.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'Tanger (Tanja Balia)' },
        { label: 'Type', waarde: 'Appartementen — 1 of 2 slaapkamers' },
        { label: 'Woonoppervlak', waarde: 'Circa 60–85 m², terras- en topunits groter' },
        { label: 'Gebouw', waarde: 'Woontoren R+16, 102 appartementen' },
        { label: 'Oplevering', waarde: 'Gepland 2027' },
        { label: 'Prijsindicatie', waarde: 'Vanaf 1.860.000 MAD' },
      ],
      voorzieningen: [
        'Dicht bij het Al Boraq-station (hogesnelheidslijn)',
        'Hotels, restaurants en winkelcentrum in de omgeving',
        'Winkelplint en kantoorvloeren in het gebouw',
        'Units met groot terras op de derde verdieping',
        'Grotere woningen op de vijftiende verdieping',
      ],
      woningtypen: [
        { type: 'Appartement — 1 slaapkamer', details: 'circa 65 m², 1 badkamer' },
        { type: 'Appartement — 2 slaapkamers', details: 'circa 85 m², 2 badkamers (laatste unit van dit type)' },
        { type: 'Terras- en topverdieping', details: '3e verdieping met terras; 15e verdieping circa 45–210 m² — op aanvraag' },
      ],
      ligging:
        'Borj Al Andalous III ligt aan de weg naar Tanja Balia in Tanger, op hetzelfde adres als Borj Al Andalous II. Het station van de hogesnelheidslijn Al Boraq, grote hotels, restaurants en een winkelcentrum liggen in de directe omgeving.',
      mapsQuery: '35.771772,-5.782797',
      prijsVanaf: { bedrag: 1860000, valuta: 'MAD', tekst: 'Vanaf 1.860.000 MAD' },
      bron: bron('borj-al-andalous-3'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),

  // ── PERLA — Tanger, Tanja Balia ───────────────────────────────────────────
  (() => {
    const g = [
      foto('perla/perla-tanger-residentie-gevels.jpg', 'Appartementsgebouwen van residentie Perla in Tanja Balia, Tanger'),
      foto('perla/perla-tanger-zwembad-binnentuin.jpg', 'Zwembad in de groene binnentuin van Perla'),
      foto('perla/perla-tanger-gebouw-straatzijde.jpg', 'Gebouw van Perla aan de straatzijde'),
      foto('perla/perla-tanger-binnentuin.jpg', 'Aangelegde binnentuin tussen de gebouwen van Perla'),
      foto('perla/perla-tanger-woonkamer.jpg', 'Woonkamer en eethoek in een appartement van Perla'),
      foto('perla/perla-tanger-slaapkamer.jpg', 'Slaapkamer in een appartement van Perla, Tanger'),
      foto('perla/perla-tanger-badkamer.jpg', 'Badkamer met verlichte spiegel in Perla'),
    ];
    return {
      slug: 'perla',
      naam: 'Perla',
      stad: 'tanger',
      stadNaam: 'Tanger',
      regio: 'Tanger-Tetouan-Al Hoceima',
      wijk: 'Tanja Balia',
      types: ['Appartementen'],
      kort: 'Groene woonresidentie in Tanja Balia met 295 appartementen in zeven gebouwen, drie zwembaden en 24-uursbeveiliging, op korte afstand van het centrum.',
      intro:
        'Perla is een grote woonresidentie in Tanja Balia, een groeiende woonwijk aan de Rocade des Deux Mers in Tanger. Zeven gebouwen staan rond aangelegde binnentuinen met drie zwembaden. De residentie biedt studio’s en appartementen met één tot drie slaapkamers. Maghreb Estates begeleidt u bij de keuze en de aankoop.',
      omschrijving: [
        'Het project omvat 295 woningen verdeeld over zeven gebouwen van zeven bouwlagen (R+6). Tussen de gebouwen liggen ruime groene binnenhoven met zwembaden en beplanting; de residentie wordt 24 uur per dag bewaakt. De appartementen krijgen centrale airconditioning, geluids- en warmte-isolatie en een moderne afwerking.',
        'Tanja Balia ligt tussen het centrum en de oostkust van Tanger en ontwikkelt zich snel tot een complete woonwijk. Voorzieningen voor het dagelijks leven liggen dichtbij, en het centrum is snel bereikbaar. Volgens de ontwikkelaar is begeleiding bij de financiering mogelijk.',
        'Perla wordt in fasen verkocht. Gebouw 3 en de standaardverdiepingen van gebouw 4 zijn uitverkocht; in de gebouwen 5 tot en met 9 zijn nog appartementen beschikbaar. Wij vragen voor u de actuele plattegronden en prijzen op en controleren het contract en de betalingsroute.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'Tanger (Tanja Balia)' },
        { label: 'Type', waarde: 'Studio’s en appartementen — 1 tot 3 slaapkamers' },
        { label: 'Woonoppervlak', waarde: 'Circa 80–135 m²' },
        { label: 'Omvang', waarde: '295 woningen in 7 gebouwen (R+6)' },
        { label: 'Oplevering', waarde: 'Gepland 2027' },
        { label: 'Prijsindicatie', waarde: 'Vanaf 1.600.000 MAD' },
      ],
      voorzieningen: [
        'Drie zwembaden in groene binnentuinen',
        '24-uursbeveiliging',
        'Centrale airconditioning',
        'Geluids- en warmte-isolatie',
        'Parkeergelegenheid',
        'Begeleiding bij financiering via de ontwikkelaar',
      ],
      ligging:
        'Perla ligt aan de Rocade des Deux Mers in Tanja Balia, een opkomende woonwijk van Tanger tussen het centrum en de oostkust. Winkels en dagelijkse voorzieningen liggen in de buurt; het stadscentrum is snel bereikbaar.',
      mapsQuery: '35.757923,-5.755554',
      prijsVanaf: { bedrag: 1600000, valuta: 'MAD', tekst: 'Vanaf 1.600.000 MAD' },
      bron: bron('perla'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),

  // ── RÉSIDENCE ENNASEEM — Tanger, Route de Rabat ───────────────────────────
  (() => {
    const g = [
      foto('ennaseem/ennaseem-tanger-luchtfoto-complex.jpg', 'Luchtbeeld van Résidence Ennaseem aan de route de Rabat in Tanger'),
      foto('ennaseem/ennaseem-tanger-gebouw-gevel.jpg', 'Gevel van een woongebouw van Résidence Ennaseem'),
      foto('ennaseem/ennaseem-tanger-gebouw-hoek.jpg', 'Hoekaanzicht van Résidence Ennaseem met balkons'),
      foto('ennaseem/ennaseem-tanger-showroom.jpg', 'Showroom en woongebouwen van Résidence Ennaseem'),
    ];
    return {
      slug: 'ennaseem',
      naam: 'Résidence Ennaseem',
      stad: 'tanger',
      stadNaam: 'Tanger',
      regio: 'Tanger-Tetouan-Al Hoceima',
      wijk: 'Route de Rabat',
      types: ['Appartementen'],
      kort: 'Kleinschalige residentie aan de route de Rabat in Tanger: 84 appartementen in drie gebouwen met twee zwembaden, speelruimte en ondergrondse parking.',
      intro:
        'Résidence Ennaseem ligt aan de nationale weg N1 (route de Rabat) in Tanger en bestaat uit drie woongebouwen en een showroom. Met 84 appartementen is het een overzichtelijke residentie, met twee zwembaden, groenvoorzieningen en een beveiligde speelruimte. Maghreb Estates begeleidt u bij de aankoop en de dossiercontrole.',
      omschrijving: [
        'De drie gebouwen tellen zes bouwlagen (R+5) en bieden studio’s en appartementen met één tot drie slaapkamers. De woningen hebben balkons die uitkijken op de groenzones, een ingerichte keuken en centrale airconditioning. Onder het complex ligt een parkeergarage.',
        'De ligging aan de route de Rabat is praktisch: het vliegveld Ibn Battouta, de vrijhandelszone, de industriezone, het busstation en supermarkten liggen in de omgeving. Daarmee is Ennaseem vooral interessant voor wie in Tanger werkt of verhuur aan werknemers in de economische zones overweegt.',
        'Wij bekijken met u welk woningtype aansluit bij uw plannen, vragen de actuele beschikbaarheid op en controleren vóór aankoop de eigendomstitel, het contract en de betalingsroute.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'Tanger (route de Rabat)' },
        { label: 'Type', waarde: 'Studio’s en appartementen — 1 tot 3 slaapkamers' },
        { label: 'Woonoppervlak', waarde: 'Circa 70–115 m²' },
        { label: 'Omvang', waarde: '84 appartementen in 3 gebouwen (R+5)' },
        { label: 'Oplevering', waarde: 'Gepland 2027' },
        { label: 'Prijsindicatie', waarde: 'Vanaf 1.400.000 MAD' },
      ],
      voorzieningen: [
        'Twee zwembaden',
        'Groenzones en beveiligde speelruimte',
        'Balkons en terrassen',
        'Centrale airconditioning',
        'Liften en ondergrondse parkeergarage',
      ],
      ligging:
        'Résidence Ennaseem ligt aan de nationale weg N1, de route de Rabat, ten zuiden van het centrum van Tanger. Het vliegveld Ibn Battouta, de vrijhandelszone, de industriezone, het busstation en supermarkten liggen in de omgeving.',
      mapsQuery: '35.729724,-5.875541',
      prijsVanaf: { bedrag: 1400000, valuta: 'MAD', tekst: 'Vanaf 1.400.000 MAD' },
      bron: bron('residence-ennaseem'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),

  // ── DAHLIA — Tanger, Avenue Moulay Slimane ────────────────────────────────
  (() => {
    const g = [
      foto('dahlia/dahlia-tanger-gebouw-dag.jpg', 'Residentie Dahlia aan de Avenue Moulay Slimane in Tanger'),
      foto('dahlia/dahlia-tanger-gebouw-avond.jpg', 'Residentie Dahlia in Tanger bij avond'),
    ];
    return {
      slug: 'dahlia',
      naam: 'Dahlia',
      stad: 'tanger',
      stadNaam: 'Tanger',
      regio: 'Tanger-Tetouan-Al Hoceima',
      wijk: 'Avenue Moulay Slimane',
      types: ['Appartementen'],
      kort: 'Ruime appartementen met drie slaapkamers en terras aan de Avenue Moulay Slimane, centraal in Tanger — de laatste beschikbare units.',
      intro:
        'Dahlia is een residentie van tien bouwlagen aan de Avenue Moulay Slimane, een centrale verkeersader van Tanger met snelle verbindingen naar de route de Rabat en de route de Tétouan. Het gebouw is opgeleverd; er zijn nog enkele ruime appartementen beschikbaar. Maghreb Estates begeleidt u bij de aankoop.',
      omschrijving: [
        'Het gebouw (R+9) telt 70 appartementen en vier winkels. De woningen zijn ruim opgezet, met veel daglicht en een afwerking die is afgestemd op wie comfort zoekt: liften, twee ondergrondse parkeerlagen, centrale airconditioning en geluids- en warmte-isolatie.',
        'Vanuit Dahlia bent u binnen een minuut op de route de Rabat richting vrijhandelszone, vliegveld en snelweg, en binnen twee minuten op de route de Tétouan. De jachthaven van Tanger ligt op minder dan tien minuten.',
        'Volgens de ontwikkelaar zijn bijna alle typen verkocht; beschikbaar zijn nog appartementen met drie slaapkamers van circa 112–113 m², op de eerste verdieping met een terras van 36 m². Omdat het gebouw is opgeleverd, kunt u het appartement zelf bezichtigen voordat u beslist.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'Tanger (Avenue Moulay Slimane)' },
        { label: 'Type', waarde: 'Appartementen — 3 slaapkamers' },
        { label: 'Woonoppervlak', waarde: 'Circa 112–113 m² (+ terras)' },
        { label: 'Gebouw', waarde: 'R+9, 70 appartementen' },
        { label: 'Status', waarde: 'Opgeleverd, laatste units' },
        { label: 'Prijsindicatie', waarde: 'Vanaf 1.350.000 MAD' },
      ],
      voorzieningen: [
        'Centrale ligging aan de Avenue Moulay Slimane',
        'Twee ondergrondse parkeerlagen',
        'Liften',
        'Centrale airconditioning',
        'Geluids- en warmte-isolatie',
      ],
      woningtypen: [
        { type: 'Appartement — 3 slaapkamers (1e verdieping)', details: 'circa 113 m² + 36 m² terras, 2 badkamers' },
        { type: 'Appartement — 3 slaapkamers', details: 'circa 112 m², 2 badkamers' },
      ],
      ligging:
        'Dahlia ligt aan de Avenue Moulay Slimane in Tanger: op één minuut van de route de Rabat (vrijhandelszone, vliegveld Ibn Battouta en snelweg), op twee minuten van de route de Tétouan en op minder dan tien minuten van de jachthaven.',
      mapsQuery: '35.765745,-5.814074',
      prijsVanaf: { bedrag: 1350000, valuta: 'MAD', tekst: 'Vanaf 1.350.000 MAD' },
      bron: bron('dahlia'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),

  // ── LE LOTUS — Tanger, Avenue Idriss 1er ──────────────────────────────────
  (() => {
    const g = [
      foto('le-lotus/le-lotus-tanger-gebouw-gevel.jpg', 'Residentie Le Lotus aan de Avenue Idriss 1er in Tanger'),
      foto('le-lotus/le-lotus-tanger-woonkamer.jpg', 'Woonkamer met open keuken in Le Lotus'),
      foto('le-lotus/le-lotus-tanger-keuken.jpg', 'Ingerichte keuken in een appartement van Le Lotus'),
      foto('le-lotus/le-lotus-tanger-slaapkamer.jpg', 'Slaapkamer in Le Lotus, Tanger'),
      foto('le-lotus/le-lotus-tanger-badkamer.jpg', 'Badkamer met inloopdouche in Le Lotus'),
    ];
    return {
      slug: 'le-lotus',
      naam: 'Le Lotus',
      stad: 'tanger',
      stadNaam: 'Tanger',
      regio: 'Tanger-Tetouan-Al Hoceima',
      wijk: 'Avenue Idriss 1er',
      types: ['Appartementen'],
      kort: 'Opgeleverde residentie aan de Avenue Idriss 1er met uitzicht op 7.000 m² tuinen, dicht bij scholen en Tanger Marina Bay — laatste appartement met binnenplaats.',
      intro:
        'Le Lotus is een opgeleverde residentie aan de Avenue Idriss 1er in Tanger, met vrij uitzicht op tuinen van circa 7.000 m². De ligging dicht bij bekende scholen maakt het gebouw geliefd bij gezinnen. Er is nog een beperkt aanbod beschikbaar. Maghreb Estates begeleidt u bij de bezichtiging en de aankoop.',
      omschrijving: [
        'Het gebouw (R+9) telt 60 appartementen en drie winkels en is ontworpen door een bekende architect. De afwerking omvat domotica, centrale airconditioning, dubbele beglazing, houten en aluminium schrijnwerk, isolatie en een verlichte gevel. Onder het gebouw ligt een parkeergarage.',
        'De appartementen profiteren van veel zon en een open uitzicht over de tuinen. Een moskee ligt op een minuut, Tanger Marina Bay op ongeveer vijf minuten, en in de omgeving zijn meerdere gerenommeerde scholen.',
        'Volgens de ontwikkelaar is nog één type beschikbaar: een appartement met twee slaapkamers van circa 87 m² met een binnenplaats van 28 m². Omdat het gebouw is opgeleverd, kunt u het appartement direct bezichtigen; wij regelen de controle van titel en contract.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'Tanger (Avenue Idriss 1er)' },
        { label: 'Type', waarde: 'Appartement — 2 slaapkamers' },
        { label: 'Woonoppervlak', waarde: 'Circa 87 m² + 28 m² binnenplaats' },
        { label: 'Gebouw', waarde: 'R+9, 60 appartementen' },
        { label: 'Status', waarde: 'Opgeleverd, laatste unit' },
        { label: 'Prijsindicatie', waarde: 'Vanaf 1.035.000 MAD' },
      ],
      voorzieningen: [
        'Uitzicht op circa 7.000 m² tuinen',
        'Domotica en centrale airconditioning',
        'Dubbele beglazing en isolatie',
        'Ondergrondse parkeergarage',
        'Gerenommeerde scholen in de omgeving',
        'Op circa vijf minuten van Tanger Marina Bay',
      ],
      woningtypen: [
        { type: 'Appartement — 2 slaapkamers', details: 'circa 87 m² + 28 m² binnenplaats, 2 badkamers' },
      ],
      ligging:
        'Le Lotus ligt aan de Avenue Idriss 1er in Tanger, met een moskee op een minuut, meerdere bekende scholen in de buurt en Tanger Marina Bay op ongeveer vijf minuten.',
      mapsQuery: '35.771328,-5.800042',
      prijsVanaf: { bedrag: 1035000, valuta: 'MAD', tekst: 'Vanaf 1.035.000 MAD' },
      bron: bron('le-lotus'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),

  // ── CAVALI — Tanger, Avenue d'Espagne (binnenkort) ────────────────────────
  (() => {
    const g = [
      foto('cavali/cavali-tanger-toren-gevel.jpg', 'Impressie van woontoren Cavali aan de Avenue d’Espagne in Tanger'),
      foto('cavali/cavali-tanger-keuken.jpg', 'Impressie van een keuken met kookeiland in Cavali'),
      foto('cavali/cavali-tanger-slaapkamer.jpg', 'Impressie van een slaapkamer in Cavali'),
      foto('cavali/cavali-tanger-badkamer.jpg', 'Impressie van een badkamer in Cavali'),
      foto('cavali/cavali-tanger-kinderkamer.jpg', 'Impressie van een kinderkamer in Cavali'),
    ];
    return {
      slug: 'cavali',
      binnenkort: true,
      naam: 'Cavali',
      stad: 'tanger',
      stadNaam: 'Tanger',
      regio: 'Tanger-Tetouan-Al Hoceima',
      wijk: 'Avenue d’Espagne',
      types: ['Appartementen'],
      kort: 'Nieuwe woontoren van 25 bouwlagen aan de Avenue d’Espagne, naast het station en het City Center — binnenkort in verkoop.',
      intro:
        'Cavali is een nieuw torenproject aan de Avenue d’Espagne in Tanger, op een minuut van de corniche, het station van de hogesnelheidslijn en winkelcentrum City Center. Het project komt binnenkort in verkoop. Via Maghreb Estates kunt u zich nu al laten informeren over prijzen en beschikbaarheid zodra die bekend zijn.',
      omschrijving: [
        'De toren (R+24) krijgt 132 appartementen met één tot drie slaapkamers, boven drie winkels en zes kantoorvloeren. De afwerking omvat domotica, centrale airconditioning, isolatie en een ingerichte keuken; onder het gebouw komt een parkeergarage.',
        'Door de ligging midden in het nieuwe zakencentrum van Tanger — station, corniche, City Center en hotels op loopafstand — mikt het project nadrukkelijk ook op verhuur. Het is een van de hoogste woontorens in deze zone.',
        'Prijzen en de definitieve verkoopvoorwaarden zijn nog niet gepubliceerd. Laat uw interesse vooraf weten; wij informeren u zodra de verkoop start en beoordelen het project dan samen met u.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'Tanger (Avenue d’Espagne)' },
        { label: 'Type', waarde: 'Appartementen — 1 tot 3 slaapkamers' },
        { label: 'Woonoppervlak', waarde: 'Circa 52–176 m²' },
        { label: 'Gebouw', waarde: 'Woontoren R+24, 132 appartementen' },
        { label: 'Status', waarde: 'Binnenkort in verkoop' },
      ],
      voorzieningen: [
        'Op één minuut van corniche, station en City Center',
        'Domotica',
        'Centrale airconditioning en isolatie',
        'Ingerichte keuken',
        'Ondergrondse parkeergarage',
      ],
      ligging:
        'Cavali ligt aan de Avenue d’Espagne in Tanger, volgens de ontwikkelaar op een minuut van de corniche, het station van de hogesnelheidslijn en winkelcentrum City Center, met hotels en restaurants in de directe omgeving.',
      mapsQuery: '35.772687,-5.788363',
      bron: bron('cavali'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),

  // ── RÉSIDENCE OSCAR — M'diq ───────────────────────────────────────────────
  (() => {
    const g = [
      foto('oscar/oscar-mdiq-luchtfoto-zee.jpg', 'Luchtfoto van Résidence Oscar in M’diq met zicht op zee'),
      foto('oscar/oscar-mdiq-luchtfoto-residentie.jpg', 'Luchtfoto van de gebouwen en zwembaden van Résidence Oscar'),
      foto('oscar/oscar-mdiq-zwembad-tuin.jpg', 'Zwembad en tuin in Résidence Oscar, M’diq'),
      foto('oscar/oscar-mdiq-zwembad.jpg', 'Zwembad gezien vanaf een terras in Résidence Oscar'),
      foto('oscar/oscar-mdiq-woonkamer.jpg', 'Woonkamer van een opgeleverd appartement in Résidence Oscar'),
      foto('oscar/oscar-mdiq-keuken.jpg', 'Open keuken in een appartement van Résidence Oscar'),
      foto('oscar/oscar-mdiq-slaapkamer.jpg', 'Slaapkamer in Résidence Oscar, M’diq'),
    ];
    return {
      slug: 'oscar',
      naam: 'Résidence Oscar',
      stad: 'mdiq',
      stadNaam: 'M’diq',
      regio: 'Tanger-Tetouan-Al Hoceima',
      wijk: 'Avenue Ibn Nafis',
      types: ['Appartementen'],
      kort: 'Opgeleverde, gesloten residentie in M’diq tussen zee en bergen: 324 appartementen in 27 gebouwen met zes zwembaden, op vijf minuten van het strand.',
      intro:
        'Résidence Oscar is een gesloten en beveiligde residentie in M’diq, op de heuvels tussen zee en bergen. Het complex is opgeleverd en telt 27 gebouwen met zes zwembaden en aangelegde tuinen. Er zijn nog appartementen beschikbaar, die u ter plaatse kunt bezichtigen. Maghreb Estates begeleidt u bij de keuze en de aankoop.',
      omschrijving: [
        'De residentie omvat 324 appartementen in gebouwen van drie bouwlagen (R+2), verspreid over een glooiend terrein. Er zijn zes zwembaden met een glijbaan, speelruimte voor kinderen, groenzones, een minimarkt en een conciërge. Een deel van de appartementen heeft een privéterras en zicht op zee of de zwembaden.',
        'Het witte, mediterrane architectuurbeeld past bij M’diq, een van de meest verzorgde badplaatsen van het noorden. Dat maakt Oscar geschikt als vakantiewoning en voor verhuur in het zomerseizoen, maar ook voor wie het hele jaar aan de kust wil wonen.',
        'Omdat het project is opgeleverd, ziet u precies wat u koopt. Wij plannen de bezichtiging, vragen de actuele beschikbaarheid op en controleren de eigendomstitel en het contract.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'M’diq' },
        { label: 'Type', waarde: 'Appartementen' },
        { label: 'Woonoppervlak', waarde: 'Circa 67–255 m²' },
        { label: 'Omvang', waarde: '324 appartementen in 27 gebouwen (R+2)' },
        { label: 'Status', waarde: 'Opgeleverd' },
        { label: 'Prijsindicatie', waarde: 'Vanaf 1.139.000 MAD' },
      ],
      voorzieningen: [
        'Zes zwembaden, waaronder een kinderbad met glijbaan',
        'Gesloten en beveiligde residentie met conciërge',
        'Groenzones en speelruimte voor kinderen',
        'Minimarkt op het terrein',
        'Privéterrassen en zicht op zee bij een deel van de woningen',
        'Parkeergelegenheid',
      ],
      ligging:
        'Résidence Oscar ligt aan de Avenue Ibn Nafis in M’diq. Volgens de ontwikkelaar ligt het strand op vijf minuten, het centrum van M’diq op twee minuten, Fnideq op vijftien minuten, Ceuta op twintig minuten en het vliegveld Tétouan-Saniat R’mel op vijftien minuten.',
      mapsQuery: '35.676324,-5.326427',
      prijsVanaf: { bedrag: 1139000, valuta: 'MAD', tekst: 'Vanaf 1.139.000 MAD' },
      bron: bron('residence-oscar'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),

  // ── RÉSIDENCE OSCAR II — M'diq ────────────────────────────────────────────
  (() => {
    const g = [
      foto('oscar-ii/oscar-ii-mdiq-zwembad-terrassen.jpg', 'Impressie van Résidence Oscar II in M’diq met zwembad en terrassen'),
      foto('oscar-ii/oscar-ii-mdiq-gevel-dag.jpg', 'Impressie van de gevels van Résidence Oscar II'),
      foto('oscar-ii/oscar-ii-mdiq-gevel-avond.jpg', 'Impressie van Résidence Oscar II bij avond'),
    ];
    return {
      slug: 'oscar-ii',
      naam: 'Résidence Oscar II',
      stad: 'mdiq',
      stadNaam: 'M’diq',
      regio: 'Tanger-Tetouan-Al Hoceima',
      wijk: 'Avenue Ibn Rochd',
      types: ['Appartementen'],
      kort: 'Vervolg op Résidence Oscar in M’diq: 378 appartementen in vijftien gebouwen met vijf zwembaden, in een gesloten complex op enkele minuten van het strand.',
      intro:
        'Résidence Oscar II is het nieuwe vervolg op de opgeleverde Résidence Oscar in M’diq. Het project ligt tussen zee en bergen, op enkele minuten van het strand, en wordt een gesloten, groen complex met vijf zwembaden. Maghreb Estates begeleidt u bij de selectie van een appartement en de aankoop op plan.',
      omschrijving: [
        'Het complex krijgt 378 appartementen in vijftien gebouwen van drie bouwlagen (R+2). De woningen zijn compact en functioneel ingedeeld, met één of twee slaapkamers en circa 57 tot 71 m² woonoppervlak, en kijken uit op de zwembaden of de tuinen. Een deel heeft zicht op zee.',
        'Bewoners krijgen vijf zwembaden, een kinderbad, aangelegde groenzones, een ondergrondse parkeergarage, beveiligde toegang en een conciërge. De afwerking omvat centrale airconditioning, een ingerichte keuken en luxe sanitair; een school ligt op twee minuten.',
        'Met zijn compacte woningen is Oscar II interessant als betaalbare instap aan de kust van M’diq, voor eigen gebruik in de zomer of voor verhuur. Bij aankoop op plan controleren wij extra zorgvuldig het contract, de betalingsschijven en de opleveringsgaranties.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'M’diq' },
        { label: 'Type', waarde: 'Appartementen — 1 of 2 slaapkamers' },
        { label: 'Woonoppervlak', waarde: 'Circa 57–71 m²' },
        { label: 'Omvang', waarde: '378 appartementen in 15 gebouwen (R+2)' },
        { label: 'Oplevering', waarde: 'Gepland 2027' },
        { label: 'Prijsindicatie', waarde: 'Vanaf 1.900.000 MAD' },
      ],
      voorzieningen: [
        'Vijf zwembaden en een kinderbad',
        'Gesloten complex met beveiligde toegang en conciërge',
        'Groenzones met zicht op tuin, zwembad of zee',
        'Ondergrondse parkeergarage',
        'Centrale airconditioning en ingerichte keuken',
        'School op twee minuten',
      ],
      woningtypen: [
        { type: 'Appartement — 2 slaapkamers', details: 'circa 57, 67 of 71 m², 2 badkamers' },
      ],
      ligging:
        'Résidence Oscar II ligt aan de Avenue Ibn Rochd in M’diq, vlak bij de eerste Résidence Oscar. Het strand ligt op enkele minuten, een school op twee minuten, en het centrum van M’diq en de jachthaven zijn dichtbij.',
      mapsQuery: '35.674625,-5.328899',
      prijsVanaf: { bedrag: 1900000, valuta: 'MAD', tekst: 'Vanaf 1.900.000 MAD' },
      bron: bron('residence-oscar-ii'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),

  // ── CABO GOLF — M'diq · Cabo Negro ────────────────────────────────────────
  (() => {
    const g = [
      foto('cabo-golf/cabo-golf-mdiq-residentie-zwembad.jpg', 'Impressie van residentie Cabo Golf in Cabo Negro met zwembad'),
      foto('cabo-golf/cabo-golf-mdiq-gevel-zwembad.jpg', 'Impressie van een gebouw van Cabo Golf aan het zwembad'),
      foto('cabo-golf/cabo-golf-mdiq-lounge-zwembad.jpg', 'Lounge onder pergola met zicht op de zwembaden van Cabo Golf'),
      foto('cabo-golf/cabo-golf-mdiq-luchtfoto-complex.jpg', 'Luchtbeeld van het complex Cabo Golf in Cabo Negro'),
      foto('cabo-golf/cabo-golf-mdiq-blok-zwembad.jpg', 'Gebouw met terrassen rond een zwembad in Cabo Golf'),
      foto('cabo-golf/cabo-golf-mdiq-zwembad-ligbedden.jpg', 'Zwembad met ligbedden in Cabo Golf'),
      foto('cabo-golf/cabo-golf-mdiq-speelplaats.jpg', 'Speel- en sportplaats in de residentie Cabo Golf'),
    ];
    return {
      slug: 'cabo-golf',
      naam: 'Cabo Golf',
      stad: 'mdiq',
      stadNaam: 'M’diq',
      regio: 'Tanger-Tetouan-Al Hoceima',
      wijk: 'Cabo Negro',
      types: ['Appartementen'],
      kort: 'Mediterrane residentie in Cabo Negro met 228 appartementen, tuinappartementen en overloopzwembaden in een gesloten, groen complex.',
      intro:
        'Cabo Golf is een nieuwe residentie in Cabo Negro, de badplaats tussen M’diq en Martil. Het project combineert tuinappartementen op de begane grond met appartementen op de verdiepingen die uitkijken op de zwembaden en de aangelegde tuinen. Maghreb Estates begeleidt u bij de keuze en de aankoop op plan.',
      omschrijving: [
        'De residentie omvat 228 appartementen in negen gebouwen van vier bouwlagen (R+3), in een gesloten complex. De woningen hebben één tot drie slaapkamers. Tuinappartementen bieden directe toegang tot een privéterras en het groen; de hogere verdiepingen kijken uit over de turquoise zwembaden en de mediterrane beplanting.',
        'Bewoners krijgen overloopzwembaden in aangelegde tuinen, lounges aan het water, een strandbar (chiringuito) en speelruimte voor kinderen. De appartementen worden afgewerkt met centrale airconditioning, isolatie, een ingerichte keuken en liften; onder het complex ligt een parkeergarage.',
        'Cabo Negro is een van de populairste kustbestemmingen van het noorden, met golf, stranden en een levendig zomerseizoen. Cabo Golf is daarmee interessant als vakantiewoning of verhuurobject. Wij controleren voor u het contract, de betalingsschijven en de opleveringsplanning.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'Cabo Negro (M’diq)' },
        { label: 'Type', waarde: 'Appartementen en tuinappartementen — 1 tot 3 slaapkamers' },
        { label: 'Woonoppervlak', waarde: 'Circa 60–155 m²' },
        { label: 'Omvang', waarde: '228 appartementen in 9 gebouwen (R+3)' },
        { label: 'Oplevering', waarde: 'Gepland 2027' },
        { label: 'Prijsindicatie', waarde: 'Vanaf 2.100.000 MAD' },
      ],
      voorzieningen: [
        'Overloopzwembaden in aangelegde tuinen, plus kinderbad',
        'Tuinappartementen met privéterras',
        'Strandbar (chiringuito) en lounges aan het zwembad',
        'Speelruimte voor kinderen',
        'Gesloten complex met ondergrondse parkeergarage',
        'Centrale airconditioning, isolatie en liften',
      ],
      ligging:
        'Cabo Golf ligt in Cabo Negro, de badplaats tussen M’diq en Martil aan de Middellandse Zeekust. Winkels en voorzieningen liggen in de buurt, net als de stranden van Cabo Negro; Tétouan en het vliegveld Saniat R’mel zijn goed bereikbaar.',
      mapsQuery: '35.660068,-5.292312',
      prijsVanaf: { bedrag: 2100000, valuta: 'MAD', tekst: 'Vanaf 2.100.000 MAD' },
      bron: bron('cabo-golf'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),

  // ── CABO HILLS — M'diq · Cabo Negro ───────────────────────────────────────
  (() => {
    const g = [
      foto('cabo-hills/cabo-hills-mdiq-zwembad-residentie.jpg', 'Zwembad en gebouwen van residentie Cabo Hills in Cabo Negro'),
      foto('cabo-hills/cabo-hills-mdiq-zwembad-gebouwen.jpg', 'Impressie van de zwembaden en gebouwen van Cabo Hills'),
      foto('cabo-hills/cabo-hills-mdiq-gevel-zwembad.jpg', 'Impressie van een gebouw van Cabo Hills aan het zwembad'),
      foto('cabo-hills/cabo-hills-mdiq-entree.jpg', 'Impressie van de entree van Résidence Cabo Hills'),
      foto('cabo-hills/cabo-hills-mdiq-woonkamer.jpg', 'Woonkamer van het modelappartement in Cabo Hills'),
      foto('cabo-hills/cabo-hills-mdiq-slaapkamer.jpg', 'Slaapkamer van het modelappartement in Cabo Hills'),
      foto('cabo-hills/cabo-hills-mdiq-keuken.jpg', 'Keuken en eethoek in een appartement van Cabo Hills'),
    ];
    return {
      slug: 'cabo-hills',
      naam: 'Cabo Hills',
      stad: 'mdiq',
      stadNaam: 'M’diq',
      regio: 'Tanger-Tetouan-Al Hoceima',
      wijk: 'Cabo Negro',
      types: ['Appartementen'],
      kort: 'Gesloten residentie in Cabo Negro met 239 appartementen, drie zwembaden en een fitnessruimte — oplevering gepland in 2026.',
      intro:
        'Cabo Hills is een residentie in Cabo Negro die moderne architectuur combineert met een mediterraan, ontspannen karakter. Het gesloten complex is ingericht rond drie zwembaden met waterspelen en ligt dicht bij de voorzieningen van de badplaats. Maghreb Estates begeleidt u bij de selectie en de aankoop.',
      omschrijving: [
        'Het project telt 239 appartementen in negen gebouwen van vier bouwlagen (R+3), van studio’s tot appartementen met twee slaapkamers. Het modelappartement toont een verzorgd interieur met warme materialen, een volledig ingerichte keuken en een badkamer met inloopdouche.',
        'Voor bewoners zijn er drie zwembaden en een kinderbad, twee speelplaatsen, een fitnessruimte, groenzones en een conciërge. Het complex is beveiligd, met liften en een ondergrondse parkeergarage; de appartementen hebben airconditioning.',
        'De oplevering staat gepland voor 2026, waardoor Cabo Hills een van de eerstvolgende opleveringen in Cabo Negro is. Dat is interessant voor wie op korte termijn een vakantiewoning of verhuurobject aan de kust zoekt. Wij controleren de bouwstatus, het contract en de betalingsroute.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'Cabo Negro (M’diq)' },
        { label: 'Type', waarde: 'Studio’s en appartementen — 1 of 2 slaapkamers' },
        { label: 'Woonoppervlak', waarde: 'Circa 45–170 m²' },
        { label: 'Omvang', waarde: '239 appartementen in 9 gebouwen (R+3)' },
        { label: 'Oplevering', waarde: 'Gepland 2026' },
        { label: 'Prijsindicatie', waarde: 'Vanaf 1.350.000 MAD' },
      ],
      voorzieningen: [
        'Drie zwembaden met waterspelen en een kinderbad',
        'Fitnessruimte',
        'Twee speelplaatsen en groenzones',
        'Gesloten, beveiligde residentie met conciërge',
        'Liften en ondergrondse parkeergarage',
        'Airconditioning en ingerichte keuken',
      ],
      ligging:
        'Cabo Hills ligt in Cabo Negro, naast het project Cabo Golf, tussen M’diq en Martil. Winkels, restaurants en de stranden van Cabo Negro liggen in de buurt; Tétouan en het vliegveld Saniat R’mel zijn goed bereikbaar.',
      mapsQuery: '35.660103,-5.290925',
      prijsVanaf: { bedrag: 1350000, valuta: 'MAD', tekst: 'Vanaf 1.350.000 MAD' },
      bron: bron('cabo-hills'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),

  // ── HÔTEL TAMUDA BEACH — M'diq · Tamuda Bay ───────────────────────────────
  (() => {
    const g = [
      foto('tamuda-beach-hotel/tamuda-beach-hotel-mdiq-zwembad.jpg', 'Zwembad met ligbedden van Hôtel Tamuda Beach in Tamuda Bay'),
      foto('tamuda-beach-hotel/tamuda-beach-hotel-mdiq-entree.jpg', 'Entree van Hôtel Tamuda Beach bij avond'),
      foto('tamuda-beach-hotel/tamuda-beach-hotel-mdiq-zwembad-ligbedden.jpg', 'Zwembad en parasols bij Hôtel Tamuda Beach'),
      foto('tamuda-beach-hotel/tamuda-beach-hotel-mdiq-hotelkamer.jpg', 'Hotelkamer met terras in Hôtel Tamuda Beach'),
      foto('tamuda-beach-hotel/tamuda-beach-hotel-mdiq-suite.jpg', 'Suite met zithoek in Hôtel Tamuda Beach'),
      foto('tamuda-beach-hotel/tamuda-beach-hotel-mdiq-terras.jpg', 'Terras van het restaurant van Hôtel Tamuda Beach'),
      foto('tamuda-beach-hotel/tamuda-beach-hotel-mdiq-restaurant.jpg', 'Restaurant van Hôtel Tamuda Beach'),
    ];
    return {
      slug: 'tamuda-beach-hotel',
      naam: 'Hôtel Tamuda Beach',
      stad: 'mdiq',
      stadNaam: 'M’diq',
      regio: 'Tanger-Tetouan-Al Hoceima',
      wijk: 'Tamuda Bay',
      types: ['Hotelvastgoed'],
      kort: 'Viersterrenhotel in exploitatie aan de kust van Tamuda Bay: 82 kamers, circa 11.671 m² vloeroppervlak op een terrein van circa 15.029 m² — een investeringsobject.',
      intro:
        'Hôtel Tamuda Beach is een viersterrenhotel aan de Middellandse Zeekust van Tamuda Bay, aan de weg tussen M’diq en Fnideq. Het hotel is sinds 2015 in exploitatie en wordt als geheel aangeboden. Dit is een object voor investeerders en hotelpartijen; Maghreb Estates begeleidt de oriëntatie, de informatie-uitwisseling en de due diligence.',
      omschrijving: [
        'Het hotel heeft 82 kamers en suites van circa 34 tot 55 m², verdeeld over vijf niveaus (souterrain, begane grond en drie verdiepingen) met drie liften. Het totale vloeroppervlak bedraagt circa 11.671 m², op een terrein van circa 15.029 m², met 95 parkeerplaatsen.',
        'De faciliteiten omvatten een buitenzwembad en kinderbad, een wellnesscentrum met sauna en fitness, restaurants en terrassen, een patio, kantoren en een boetiek. Het gebouw is toegankelijk voor mindervaliden en is afgewerkt met onder meer marmeren vloeren en centrale airconditioning.',
        'De jachthaven Kabila Marina ligt op circa 500 meter en het strand op loop- of rijafstand. Prijs, exploitatiecijfers en de verkoopstructuur worden alleen op aanvraag en onder voorwaarden gedeeld. Wij helpen u bij het opvragen en beoordelen van deze gegevens en bij de juridische en technische controle.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'M’diq (Tamuda Bay)' },
        { label: 'Type', waarde: 'Viersterrenhotel in exploitatie' },
        { label: 'Kamers', waarde: '82 kamers en suites (circa 34–55 m²)' },
        { label: 'Vloeroppervlak', waarde: 'Circa 11.671 m²' },
        { label: 'Terrein', waarde: 'Circa 15.029 m²' },
        { label: 'In exploitatie sinds', waarde: '2015' },
      ],
      voorzieningen: [
        'Buitenzwembad en kinderbad',
        'Wellnesscentrum met sauna en fitness',
        'Restaurants, café en terrassen',
        '95 parkeerplaatsen, deels ondergronds',
        'Drie liften en toegankelijk voor mindervaliden',
        'Op circa 500 meter van Kabila Marina',
      ],
      ligging:
        'Hôtel Tamuda Beach ligt aan de Route de Sebta (km 13) in Tamuda Bay, M’diq. Volgens de ontwikkelaar ligt Kabila Marina op circa 500 meter, Smir Aqua Park op 3,7 km, Fnideq op 14 km, het vliegveld Tétouan-Saniat R’mel op 19 km, de haven Tanger Med op 39 km en Tétouan op circa 20 km.',
      mapsQuery: '35.723939,-5.341051',
      bron: bron('hotel-tamuda-beach'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),

  // ── PUERTA DE TETUÁN — Martil, route de Martil ────────────────────────────
  (() => {
    const g = [
      foto('puerta-de-tetuan/puerta-de-tetuan-martil-villas-straatbeeld.jpg', 'Impressie van de villa’s van Puerta de Tetuán bij Martil'),
      foto('puerta-de-tetuan/puerta-de-tetuan-martil-binnenhof-zonsondergang.jpg', 'Impressie van de autovrije binnenhof van Puerta de Tetuán bij zonsondergang'),
      foto('puerta-de-tetuan/puerta-de-tetuan-martil-villa-gevel.jpg', 'Impressie van een villagevel met grote ramen in Puerta de Tetuán'),
      foto('puerta-de-tetuan/puerta-de-tetuan-martil-luchtfoto-complex.jpg', 'Luchtbeeld van het villacomplex Puerta de Tetuán'),
      foto('puerta-de-tetuan/puerta-de-tetuan-martil-villas-avond.jpg', 'Impressie van Puerta de Tetuán bij avond'),
      foto('puerta-de-tetuan/puerta-de-tetuan-martil-voetgangersstraat.jpg', 'Impressie van de voetgangerszone tussen de villa’s'),
    ];
    return {
      slug: 'puerta-de-tetuan',
      naam: 'Puerta de Tetuán',
      stad: 'martil',
      stadNaam: 'Martil',
      regio: 'Tanger-Tetouan-Al Hoceima',
      wijk: 'Route de Martil',
      types: ["Villa's"],
      kort: 'Exclusief complex van 17 eigentijdse villa’s met privézwembad rond een autovrije binnenhof, tussen Tétouan en Martil — oplevering eind 2027.',
      intro:
        'Puerta de Tetuán is een kleinschalig villacomplex aan de route van Tétouan naar Martil. Zeventien eigentijdse villa’s met witte gevels en grote glaspartijen staan rond een autovrije, groen aangelegde binnenhof. Elke villa heeft een eigen zwembad. Maghreb Estates begeleidt u bij de keuze van een villa en de aankoop op plan.',
      omschrijving: [
        'De villa’s hebben circa 348 tot 395 m² woonoppervlak, drie slaapkamers, drie tot vier badkamers en meerdere woonruimtes. Grote ramen zorgen voor een vloeiende overgang tussen binnen en buiten; elke villa krijgt een eigen zwembad en terrassen. Er zijn vijf villatypen.',
        'Het complex is afgesloten en beveiligd, met een ondergrondse parkeergarage die direct toegang geeft tot de woningen (twee tot vier parkeerplaatsen per villa) en een speelvoorziening voor kinderen. Aan de entree komt een gebouw met vier winkels en zeven kantoren.',
        'De ligging tussen Tétouan en de kust van Martil combineert de voorzieningen van de stad met de stranden op korte afstand. Met slechts zeventien villa’s is het aanbod beperkt. Wij controleren de plattegronden, het contract, de betalingsschijven en de opleveringsplanning voor u.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'Martil (route de Martil)' },
        { label: 'Type', waarde: 'Villa’s — 3 slaapkamers, privézwembad' },
        { label: 'Woonoppervlak', waarde: 'Circa 348–395 m²' },
        { label: 'Omvang', waarde: '17 villa’s' },
        { label: 'Oplevering', waarde: 'Gepland eind 2027' },
        { label: 'Prijs', waarde: 'Op aanvraag' },
      ],
      voorzieningen: [
        'Privézwembad bij elke villa',
        'Autovrije, groen aangelegde binnenhof',
        'Ondergrondse parking met directe toegang tot de woning',
        'Gesloten complex met beveiligde toegang',
        'Speelvoorziening voor kinderen',
        'Winkels en kantoren aan de entree',
      ],
      woningtypen: [
        { type: 'Villa type 1 en 2', details: 'circa 348 m², 3 slaapkamers, 4 badkamers' },
        { type: 'Villa type 3 en 4', details: 'circa 395 m², 3 slaapkamers, 4 badkamers' },
        { type: 'Villa type 5', details: 'circa 395 m², 3 slaapkamers, 3 badkamers' },
      ],
      ligging:
        'Puerta de Tetuán ligt op circa 4 km aan de route van Tétouan naar Martil, tussen de stad en de kust. Een school ligt op twee minuten; de stranden van Martil en het centrum van Tétouan zijn snel bereikbaar.',
      mapsQuery: '35.584032,-5.329790',
      bron: bron('puerta-de-tetuan'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),

  // ── AL BOUSTANE — Tétouan ─────────────────────────────────────────────────
  (() => {
    const g = [
      foto('al-boustane/al-boustane-tetouan-gevel.jpg', 'Gevel van residentie Al Boustane in Tétouan'),
      foto('al-boustane/al-boustane-tetouan-luchtfoto.jpg', 'Luchtfoto van residentie Al Boustane in het centrum van Tétouan'),
      foto('al-boustane/al-boustane-tetouan-gevel-balkons.jpg', 'Balkons aan de gevel van Al Boustane'),
      foto('al-boustane/al-boustane-tetouan-woonkamer.jpg', 'Woonkamer van een appartement in Al Boustane'),
      foto('al-boustane/al-boustane-tetouan-slaapkamer.jpg', 'Slaapkamer van een appartement in Al Boustane'),
      foto('al-boustane/al-boustane-tetouan-keuken.jpg', 'Ingerichte keuken in Al Boustane, Tétouan'),
      foto('al-boustane/al-boustane-tetouan-badkamer.jpg', 'Badkamer in een appartement van Al Boustane'),
    ];
    return {
      slug: 'al-boustane',
      naam: 'Al Boustane',
      stad: 'tetouan',
      stadNaam: 'Tetouan',
      regio: 'Tanger-Tetouan-Al Hoceima',
      wijk: 'Avenue Haj Mohamed Bennouna',
      types: ['Appartementen'],
      kort: 'Opgeleverde residentie in het centrum van Tétouan met ruime, lichte appartementen van twee en drie slaapkamers, vanaf 890.000 MAD.',
      intro:
        'Al Boustane is een opgeleverde woonresidentie in het centrum van Tétouan, aan de Avenue Haj Mohamed Bennouna. Het project biedt ruime appartementen met veel daglicht tegen een toegankelijk prijsniveau voor dit segment. Maghreb Estates begeleidt u bij de bezichtiging, de controle en de aankoop.',
      omschrijving: [
        'De residentie bestaat uit vier woongebouwen van vijf bouwlagen (R+4) met in totaal 109 appartementen en twintig winkels in de plint. De appartementen hebben twee of drie slaapkamers en twee badkamers, met woonoppervlakten tussen circa 89 en 195 m².',
        'De gebouwen zijn voorzien van moderne liften en een ondergrondse parkeergarage, en de residentie is beveiligd. De appartementen worden opgeleverd met een ingerichte keuken; de foto’s tonen een ingericht modelappartement.',
        'Omdat het project al is opgeleverd, kunt u direct bezichtigen en is er geen bouwrisico. Al Boustane is daarmee interessant voor wie een ruime stadswoning in Tétouan zoekt, voor eigen gebruik of langjarige verhuur. Wij controleren de eigendomstitel en het contract voor u.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'Tétouan (centrum)' },
        { label: 'Type', waarde: 'Appartementen — 2 of 3 slaapkamers' },
        { label: 'Woonoppervlak', waarde: 'Circa 89–195 m²' },
        { label: 'Omvang', waarde: '109 appartementen in 4 gebouwen (R+4)' },
        { label: 'Status', waarde: 'Opgeleverd' },
        { label: 'Prijsindicatie', waarde: 'Vanaf 890.000 MAD' },
      ],
      voorzieningen: [
        'Centrale ligging in Tétouan',
        'Beveiligde residentie',
        'Moderne liften',
        'Ondergrondse parkeergarage',
        'Ingerichte keuken',
        'Winkels in de plint',
      ],
      ligging:
        'Al Boustane ligt aan de Avenue Haj Mohamed Bennouna, in het centrum van Tétouan. Winkels en dagelijkse voorzieningen liggen in de directe omgeving; de kust van Martil is op korte afstand.',
      mapsQuery: '35.592260,-5.352450',
      prijsVanaf: { bedrag: 890000, valuta: 'MAD', tekst: 'Vanaf 890.000 MAD' },
      bron: bron('al-boustane'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),

  // ── LOTISSEMENT ANDALOUS — Tétouan, Malalienne ────────────────────────────
  (() => {
    const g = [
      foto('lotissement-andalous/lotissement-andalous-tetouan-situatie-luchtfoto.jpg', 'Situatiekaart van Lotissement Andalous in Malalienne, Tétouan'),
      foto('lotissement-andalous/lotissement-andalous-tetouan-verkavelingsplan.jpg', 'Verkavelingsplan van Lotissement Andalous met kavels, villa’s en voorzieningen'),
      foto('lotissement-andalous/lotissement-andalous-tetouan-ligging-omgeving.jpg', 'Ligging van Lotissement Andalous ten opzichte van de omgeving'),
    ];
    return {
      slug: 'lotissement-andalous',
      naam: 'Lotissement Andalous',
      stad: 'tetouan',
      stadNaam: 'Tetouan',
      regio: 'Tanger-Tetouan-Al Hoceima',
      wijk: 'Malalienne',
      types: ['Bouwkavels', 'Villakavels'],
      kort: 'Verkaveling in Malalienne, Tétouan: 92 bouwkavels (R+2) en 16 villakavels (R+1) in een groene omgeving, vanaf 650.000 MAD.',
      intro:
        'Lotissement Andalous is een nieuwe verkaveling in Malalienne, Tétouan, met kavels voor appartementsgebouwen en villa’s. De verkaveling ligt in een groene, heuvelachtige omgeving dicht bij scholen en winkels, en krijgt een eigen moskee, parkeerplaatsen en buurtvoorzieningen. Maghreb Estates begeleidt u bij de keuze en de controle van een kavel.',
      omschrijving: [
        'De verkaveling omvat 92 kavels voor gebouwen tot drie bouwlagen (R+2) en zestien villakavels (R+1): zes voor twee-onder-een-kapvilla’s en tien voor rijvilla’s. De kavels zijn circa 100 tot 450 m² groot en de verkaveling heeft drie straatzijden.',
        'Volgens de ontwikkelaar worden de kavels aangesloten op water, riolering, elektriciteit en telecom, en zijn ze ontsloten via aangelegde wegen. Rondom liggen groenzones; supermarkten, scholen en de Marjane-hypermarkt van Tétouan zijn in de buurt.',
        'Een kavel kopen vraagt een andere controle dan een appartement: wij kijken met u naar de eigendomstitel, de stedenbouwkundige voorschriften per kavel, de stand van de nutsaansluitingen en het bouwtraject daarna.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'Tétouan (Malalienne)' },
        { label: 'Type', waarde: 'Bouwkavels en villakavels' },
        { label: 'Kavelgrootte', waarde: 'Circa 100–450 m²' },
        { label: 'Omvang', waarde: '92 kavels R+2 en 16 villakavels R+1' },
        { label: 'Prijsindicatie', waarde: 'Vanaf 650.000 MAD' },
      ],
      voorzieningen: [
        'Kavels voor gebouwen tot R+2',
        'Kavels voor twee-onder-een-kap- en rijvilla’s (R+1)',
        'Aansluiting op water, riolering, elektriciteit en telecom',
        'Moskee, parkeerplaatsen en buurtwinkels in de verkaveling',
        'Groenzones rondom',
        'Scholen en supermarkten in de omgeving',
      ],
      woningtypen: [
        { type: 'Bouwkavel R+2', details: '92 kavels voor kleine appartementsgebouwen' },
        { type: 'Villakavel R+1 (twee-onder-een-kap)', details: '6 kavels' },
        { type: 'Villakavel R+1 (rijvilla)', details: '10 kavels' },
      ],
      ligging:
        'Lotissement Andalous ligt in Malalienne, aan de rand van Tétouan, in een groene omgeving met uitzicht op de omliggende heuvels. Scholen, winkels en de Marjane-hypermarkt liggen in de buurt.',
      mapsQuery: '35.608875,-5.341093',
      prijsVanaf: { bedrag: 650000, valuta: 'MAD', tekst: 'Vanaf 650.000 MAD' },
      bron: bron('lotissement-andalous'),
      hero: g[0], thumb: g[1], galerij: g,
    };
  })(),

  // ── ARYANO — Marrakech (binnenkort) ───────────────────────────────────────
  (() => {
    const g = [
      foto('aryano/aryano-marrakech-villas-gevel.jpg', 'Impressie van de villa’s van Aryano in Marrakech'),
      foto('aryano/aryano-marrakech-villas-straatbeeld.jpg', 'Impressie van het straatbeeld van Aryano in Marrakech'),
      foto('aryano/aryano-marrakech-villa-entree.jpg', 'Impressie van villa-entrees in Aryano'),
      foto('aryano/aryano-marrakech-villa-dakterras.jpg', 'Impressie van een villa met dakterras in Aryano'),
      foto('aryano/aryano-marrakech-vrijstaande-villa.jpg', 'Impressie van een vrijstaande villa in Aryano'),
      foto('aryano/aryano-marrakech-clubhouse-restaurant.jpg', 'Impressie van het clubhouse met restaurant in Aryano'),
      foto('aryano/aryano-marrakech-luchtfoto-villas.jpg', 'Luchtbeeld van de villa’s van Aryano in Marrakech'),
    ];
    return {
      slug: 'aryano',
      binnenkort: true,
      naam: 'Aryano',
      stad: 'marrakech',
      stadNaam: 'Marrakech',
      regio: 'Marrakech-Safi',
      types: ["Villa's"],
      kort: 'Nieuwe collectie privévilla’s in het hogere segment in Marrakech, met clubhouse en restaurant — binnenkort in verkoop.',
      intro:
        'Aryano is een nieuw villaproject in Marrakech: een collectie privévilla’s in het hogere segment. De impressies tonen eigentijdse villa’s in warme aardetinten met dakterrassen, aangelegde tuinen en een clubhouse met restaurant. Het project komt binnenkort in verkoop.',
      omschrijving: [
        'De villa’s zijn ontworpen in een moderne architectuur met strakke volumes, grote glaspartijen en houten accenten, passend bij het licht en de kleuren van Marrakech. Een deel van de villa’s heeft een dakterras met zwembad of lounge.',
        'Op het terrein is een clubhouse met restaurant en terrassen voorzien, omringd door palmen en groen. Prijzen, plattegronden en de exacte verkoopvoorwaarden zijn nog niet gepubliceerd.',
        'Wilt u als een van de eersten informatie ontvangen? Laat uw interesse via Maghreb Estates weten. Zodra de verkoop start, sturen wij u de projectinformatie en beoordelen wij samen met u het project, de ligging en het contract.',
      ],
      kenmerken: [
        { label: 'Stad', waarde: 'Marrakech' },
        { label: 'Type', waarde: 'Privévilla’s' },
        { label: 'Status', waarde: 'Binnenkort in verkoop' },
        { label: 'Prijs', waarde: 'Op aanvraag' },
      ],
      voorzieningen: [
        'Privévilla’s in het hogere segment',
        'Dakterrassen bij een deel van de villa’s',
        'Clubhouse met restaurant en terrassen',
        'Aangelegde tuinen en palmen',
      ],
      ligging:
        'Aryano ligt in Marrakech; de ligging is op de kaart aangegeven. Meer details over de omgeving en de bereikbaarheid delen wij zodra de projectinformatie beschikbaar is.',
      mapsQuery: '31.580094,-7.992555',
      bron: bron('aryano-marrakech'),
      hero: g[0], thumb: g[0], galerij: g,
    };
  })(),
];
