// Verkooppagina (/huis-verkopen-marokko/ en /{lang}/…): alle tekst per taal.
// De opmaak staat in src/components/VerkoopPagina.astro. Elke taal heeft
// dezelfde vorm (VerkoopTekst), dus een ontbrekende vertaling valt op.
//
// Placeholders: {steden} = "Tanger, Rabat, … en Agadir", {stedenOf} = "… of
// Agadir", {stad} = één stad (keuzelijst in het formulier).

import type { Taal } from './config';

/** Werkgebied: alleen deze vijf steden en hun directe omgeving. De Latijnse
 *  naam is ook de waarde die het formulier meestuurt. */
export const werkgebied = ['Tanger', 'Rabat', 'Casablanca', 'Marrakech', 'Agadir'] as const;
export type WerkgebiedStad = (typeof werkgebied)[number];

// TODO: vervang de voorbeeldcase (`case` per taal hieronder) door het echte
// huis en zet `voorbeeld` op false. Zolang het true is, staat er een label
// "Voorbeeldcase" bij. Foto's: zie src/assets/verkopen/case/LEESMIJ.md.
export const verkoopcase = {
  voorbeeld: true,
  // Pad naar een mp4 in public/, bv. '/video/case-rabat.mp4'. Leeg = vak "Video-rondleiding volgt".
  video: '',
};

interface Item { titel: string; tekst: string }
interface Punt { kop: string; tekst: string }

export interface VerkoopTekst {
  meta: { title: string; description: string; dienst: string; dienstBeschrijving: string };
  steden: Record<WerkgebiedStad, string>;
  /** Opsomming: scheidingsteken en voegwoorden, inclusief spaties. */
  lijst: { komma: string; en: string; of: string };
  hero: { eyebrow: string; titel: string; sub: string; aanmelden: string; case: string; trust: string[] };
  kruimel: string;
  aanmelden: {
    eyebrow: string; titel: string; intro: string;
    werkgebiedTitel: string; werkgebiedTekst: string;
    voordelen: string[];
    direct: string; directWa: string; directBel: string; waBericht: string;
  };
  form: {
    naam: string; naamPh: string; telefoon: string; telefoonPh: string;
    email: string; emailPh: string; optioneel: string;
    stad: string; stadKies: string; stadOptie: string; wijk: string; wijkPh: string;
    type: string; kies: string; types: string[];
    woont: string; woonOpties: string[];
    oppervlak: string; oppervlakHint: string; oppervlakPh: string; kamers: string; kamersPh: string;
    titel: string; titelOnbekend: string; titels: string[];
    prijs: string; prijsPh: string; bericht: string; berichtPh: string;
    viaWhatsapp: string; viaEmail: string; bevestiging: string; validatie: string;
  };
  /** Regels van het WhatsApp-/e-mailbericht dat het formulier opstelt. */
  bericht: {
    kop: string; naam: string; telefoon: string; email: string; woont: string; type: string;
    stad: string; wijk: string; oppervlak: string; kamers: string; titel: string; prijs: string; toelichting: string;
  };
  waarom: {
    eyebrow: string; titel: string; desc: string; kolomAnders: string; kolomWij: string;
    rijen: { onderwerp: string; anders: string; wij: string }[];
  };
  diensten: { eyebrow: string; titel: string; desc: string; items: (Item & { icon: string })[] };
  netwerk: {
    eyebrow: string; titel: string; p1: string; p2: string;
    punten: Punt[]; transparant: Punt;
  };
  werkwijze: { eyebrow: string; titel: string; desc: string; stap: string; stappen: Item[] };
  case: {
    eyebrow: string; em: string; label: string;
    situatieKop: string; aanpakKop: string; eigenaarKop: string; locatie: string;
    videoVolgt: string; fotoVolgt: string; galerij: string; legeVakken: string[];
    titel: string; locatieWaarde: string;
    specs: { label: string; waarde: string }[];
    situatie: string; aanpak: Item[]; eigenaar: string;
  };
  faqTitel: string;
  faqs: { q: string; a: string }[];
  slot: { titel: string; tekst: string; knop: string; wa: string };
}

const icons = ['grafiek', 'titel', 'camera', 'taal', 'chat', 'sleutel', 'weegschaal', 'notaris'];
const metIcons = (items: Item[]) => items.map((it, i) => ({ ...it, icon: icons[i] }));

export const verkoopTekst: Record<Taal, VerkoopTekst> = {
  // ---------------------------------------------------------------- NEDERLANDS
  nl: {
    meta: {
      title: 'Huis verkopen in Marokko: wij nemen het uit handen | Maghreb Estates',
      description: "Verkoop uw woning in {stedenOf} via een professioneel bedrijf. Waardebepaling met marktdata, foto's en video, al het klantcontact en kopers in Marokko en Europa.",
      dienst: 'Woning verkopen in Marokko',
      dienstBeschrijving: 'Volledige verkoopbegeleiding van woningen in {steden} en directe omgeving: waardebepaling, fotografie en video, presentatie, klantcontact, bezichtigingen, onderhandeling en overdracht bij de notaris.',
    },
    steden: { Tanger: 'Tanger', Rabat: 'Rabat', Casablanca: 'Casablanca', Marrakech: 'Marrakech', Agadir: 'Agadir' },
    lijst: { komma: ', ', en: ' en ', of: ' of ' },
    hero: {
      eyebrow: 'Woning verkopen',
      titel: 'Uw woning verkopen?<br /><em>Wij nemen het volledig uit handen</em>',
      sub: 'In {steden}. Van de waardebepaling tot de akte bij de notaris, met één professioneel bedrijf in plaats van een willekeurige tussenpersoon. Of u nu in Marokko woont of in het buitenland.',
      aanmelden: 'Meld uw woning aan',
      case: 'Bekijk een case',
      trust: ['Professionele foto’s en video', 'Kopers in Marokko én Europa', 'Eén vast aanspreekpunt', 'Tot en met de notaris'],
    },
    kruimel: 'Woning verkopen',
    aanmelden: {
      eyebrow: 'Woning aanmelden',
      titel: 'Meld uw woning aan',
      intro: 'Vertel ons kort over de woning. Wij nemen binnen 24 uur contact op. Vrijblijvend: u zit nergens aan vast tot u een verkoopopdracht tekent.',
      werkgebiedTitel: 'Ons werkgebied',
      werkgebiedTekst: 'Wij verkopen alleen woningen in deze vijf steden en hun directe omgeving. Daar kennen wij de markt en zijn wij snel ter plaatse.',
      voordelen: [
        'Vrijblijvende kennismaking en prijsindicatie',
        'Vergoeding vooraf schriftelijk vastgelegd',
        'U woont in Marokko of in het buitenland',
        'In het Darija, Frans, Arabisch, Amazigh, Nederlands of Engels',
      ],
      direct: 'Liever direct contact?',
      directWa: 'WhatsApp ons',
      directBel: 'of bel',
      waBericht: 'Hallo Maghreb Estates, ik wil mijn woning in Marokko verkopen.',
    },
    form: {
      naam: 'Naam', naamPh: 'Uw volledige naam',
      telefoon: 'Telefoon / WhatsApp', telefoonPh: '+212 6 … of +31 6 …',
      email: 'E-mailadres', emailPh: 'uw@email.com', optioneel: '(optioneel)',
      stad: 'Waar staat de woning?', stadKies: 'Kies uw stad', stadOptie: '{stad} en omgeving',
      wijk: 'Wijk', wijkPh: 'Bijv. Agdal, Malabata, Gauthier…',
      type: 'Type woning', kies: 'Kies',
      types: ['Appartement', 'Villa', 'Huis / dar', 'Riad', 'Grond', 'Bedrijfspand', 'Anders'],
      woont: 'U woont', woonOpties: ['In Marokko', 'In Nederland', 'In België', 'Elders in Europa', 'Elders'],
      oppervlak: 'Oppervlakte', oppervlakHint: '(m²)', oppervlakPh: 'Bijv. 110',
      kamers: 'Slaapkamers', kamersPh: 'Bijv. 3',
      titel: 'Eigendomstitel', titelOnbekend: 'Weet ik niet', titels: ['Titre foncier', 'Melkia', 'Réquisition (in behandeling)'],
      prijs: 'Gewenste vraagprijs', prijsPh: 'Bijv. 1.500.000 MAD',
      bericht: 'Toelichting', berichtPh: 'Staat van de woning, verdieping, wanneer u wilt verkopen…',
      viaWhatsapp: 'Via WhatsApp', viaEmail: 'Via e-mail',
      bevestiging: 'Bedankt voor uw aanmelding bij Maghreb Estates. Wij nemen binnen 24 uur contact met u op voor een kennismaking. Heeft u al foto’s of documenten van de woning? Die kunt u in hetzelfde WhatsApp- of e-mailgesprek meesturen.',
      validatie: 'Vul uw naam, telefoonnummer, stad, type woning en woonplaats in.',
    },
    bericht: {
      kop: 'Woning aangemeld via maghreb-estates.com', naam: 'Naam', telefoon: 'Telefoon / WhatsApp', email: 'E-mail',
      woont: 'Woont', type: 'Type woning', stad: 'Stad', wijk: 'Wijk', oppervlak: 'Oppervlakte (m²)', kamers: 'Slaapkamers',
      titel: 'Eigendomstitel', prijs: 'Gewenste vraagprijs', toelichting: 'Toelichting',
    },
    waarom: {
      eyebrow: 'Waarom Maghreb Estates',
      titel: 'Een professioneel bedrijf,<br /><em>geen willekeurige tussenpersoon</em>',
      desc: 'De meeste woningen in Marokko worden verkocht via een simsar of een advertentie op Avito. Dat kan goed gaan, maar vaak blijft de woning maanden staan: de foto’s overtuigen niet, de prijs is niet onderbouwd en u weet niet wie er met kopers praat. Bij ons ligt de hele verkoop bij één bedrijf dat u kunt aanspreken.',
      kolomAnders: 'Losse tussenpersoon',
      kolomWij: 'Maghreb Estates',
      rijen: [
        { onderwerp: 'Presentatie', anders: 'Een paar foto’s met de telefoon en een korte advertentie.', wij: 'Professionele foto’s, een video-rondleiding en een complete verkoopbrochure.' },
        { onderwerp: 'Vraagprijs', anders: 'Een inschatting op gevoel, of de prijs die de buren vragen.', wij: 'Onderbouwd met marktdata en vergelijkbare woningen in uw wijk.' },
        { onderwerp: 'Kopers', anders: 'Vooral lokaal: de eigen kring en Avito.', wij: 'Kopers in Marokko én Marokkanen in Europa, via de portals en ons eigen netwerk.' },
        { onderwerp: 'Bezichtigingen', anders: 'U doet zelf de deur open, ook voor wie niet serieus is.', wij: 'Wij doen de bezichtigingen, alleen met kopers die wij vooraf gesproken hebben.' },
        { onderwerp: 'Contact', anders: 'Wisselende personen, vaak alleen telefonisch.', wij: 'Eén vast aanspreekpunt en vaste updates per WhatsApp of e-mail.' },
        { onderwerp: 'Talen', anders: 'Meestal alleen Darija of Frans. Kopers in Europa haken af.', wij: 'Darija, Frans, Arabisch, Amazigh, Nederlands en Engels.' },
        { onderwerp: 'Dossier', anders: 'Wordt pas bij de notaris bekeken.', wij: 'Gecontroleerd voordat de woning in de verkoop gaat.' },
        { onderwerp: 'Afspraken', anders: 'Mondeling. Wie wat betaalt is vaak onduidelijk.', wij: 'Een schriftelijke verkoopopdracht met een vooraf vastgelegde vergoeding.' },
      ],
    },
    diensten: {
      eyebrow: 'Volledig uit handen',
      titel: 'Alles wat nodig is om<br /><em>uw woning te verkopen</em>',
      desc: 'U geeft de verkoop aan ons over en houdt zelf de beslissingen. Wij doen het werk ertussen.',
      items: metIcons([
        { titel: 'Waardebepaling met marktdata', tekst: 'Wij vergelijken uw woning met het actuele aanbod: elke week ruim 60.000 advertenties van de grote Marokkaanse portals. U krijgt een vraagprijs met onderbouwing.' },
        { titel: 'Dossier op orde', tekst: 'Eigendomstitel, plattegrond, syndicus en de stukken die een koper en de notaris vragen. Gecontroleerd vóór de verkoop, niet erna.' },
        { titel: 'Foto’s en video', tekst: 'Een professionele fotoshoot, een video-rondleiding en waar nodig een plattegrond. Uw woning zoals een koper hem wil zien.' },
        { titel: 'Presentatie in vier talen', tekst: 'Een verkoopbrochure en advertenties in het Frans, Arabisch, Nederlands en Engels, op de Marokkaanse portals en in ons netwerk in Europa.' },
        { titel: 'Al het klantcontact', tekst: 'Wij beantwoorden elke vraag en filteren de serieuze kopers eruit. U krijgt geen telefoontjes van onbekenden meer.' },
        { titel: 'Bezichtigingen', tekst: 'Door ons of een vaste lokale partner, alleen met serieuze kopers. Kopers in het buitenland krijgen een live videorondleiding.' },
        { titel: 'Onderhandeling', tekst: 'Wij voeren de gesprekken namens u en leggen elk bod met onze inschatting aan u voor. U beslist.' },
        { titel: 'Notaris en overdracht', tekst: 'Wij begeleiden het traject tot en met de akte. Woont u in het buitenland? Met een volmacht hoeft u niet naar Marokko te komen.' },
      ]),
    },
    netwerk: {
      eyebrow: 'Ons netwerk',
      titel: 'Kopers die een gewone<br /><em>tussenpersoon niet bereikt</em>',
      p1: 'Een simsar of lokale makelaar bereikt vooral kopers in de eigen stad. Maar veel kopers van Marokkaans vastgoed wonen in Europa: Marokkanen in Nederland, België, Frankrijk en daarbuiten die een woning zoeken voor de vakantie, voor later of als investering. Zij scrollen niet door lokale advertenties en kopen niet van iemand die ze niet kennen.',
      p2: 'Wij hebben veel contacten buiten Marokko. Daarmee bereiken wij voor u een groep kopers die een particuliere verkoper of een lokale makelaar niet bereikt, naast de kopers in Marokko zelf.',
      punten: [
        { kop: 'Kopers in Marokko', tekst: 'via de grote Marokkaanse portals en ons lokale netwerk.' },
        { kop: 'Marokkanen in Europa', tekst: 'die een tweede woning of een woning voor later zoeken.' },
        { kop: 'Europese kopers en investeerders', tekst: 'die via onze aankoopbegeleiding een woning zoeken.' },
        { kop: 'In hun eigen taal,', tekst: 'met video en een compleet dossier, zodat kopers in het buitenland op afstand durven te beslissen.' },
      ],
      transparant: { kop: 'Transparant over onze rol.', tekst: 'Brengen wij een koper aan die wij ook begeleiden, dan zeggen wij dat vooraf tegen beide partijen. Schriftelijk, met wie ons betaalt.' },
    },
    werkwijze: {
      eyebrow: 'Werkwijze',
      titel: 'Zo verloopt de verkoop',
      desc: 'Vijf stappen, met één aanspreekpunt van het eerste gesprek tot de overdracht.',
      stap: 'Stap',
      stappen: [
        { titel: 'Woning aanmelden', tekst: 'Via het formulier bovenaan deze pagina of WhatsApp. U hoort binnen 24 uur van ons.' },
        { titel: 'Kennismaking en waardebepaling', tekst: 'Wij bespreken uw situatie, bekijken het dossier en adviseren een vraagprijs met onderbouwing.' },
        { titel: 'Fotoshoot en presentatie', tekst: 'Foto’s, video en verkoopbrochure. Daarna gaat de woning de markt op, in Marokko en in Europa.' },
        { titel: 'Kopers en bezichtigingen', tekst: 'Wij voeren alle gesprekken, doen de bezichtigingen en houden u op de hoogte van elke reactie.' },
        { titel: 'Onderhandeling en notaris', tekst: 'Een bod dat u accepteert, begeleiden wij tot en met de akte bij de notaris.' },
      ],
    },
    case: {
      eyebrow: 'Case',
      em: 'van stilstand naar een sterke presentatie',
      label: 'Voorbeeldcase · gegevens en foto’s volgen',
      situatieKop: 'De situatie', aanpakKop: 'Wat wij deden', eigenaarKop: 'Wat de eigenaar zelf deed',
      locatie: 'Locatie', videoVolgt: 'Video-rondleiding volgt', fotoVolgt: 'Foto volgt', galerij: 'Fotovakken voor de case',
      legeVakken: ['Woonkamer', 'Keuken', 'Slaapkamer', 'Badkamer', 'Uitzicht'],
      titel: 'Appartement in Rabat',
      locatieWaarde: 'Rabat',
      specs: [
        { label: 'Type', waarde: 'Appartement' },
        { label: 'Woonoppervlak', waarde: '110 m²' },
        { label: 'Slaapkamers', waarde: '3' },
        { label: 'Eigendomstitel', waarde: 'Titre foncier' },
        { label: 'Eigenaar woont in', waarde: 'Rabat' },
        { label: 'Status', waarde: 'In de verkoop' },
        { label: 'Vraagprijs', waarde: 'Op aanvraag' },
      ],
      situatie: 'De eigenaar woont in Rabat en wil verhuizen naar een grotere woning. Het appartement stond maanden te koop via een simsar en op Avito. Dat leverde veel telefoontjes en bezichtigingen op, maar geen serieus bod. De foto’s waren met de telefoon gemaakt, de vraagprijs was niet onderbouwd en de eigenaar moest steeds zelf vrij nemen om de deur open te doen.',
      aanpak: [
        { titel: 'Waardebepaling', tekst: 'We legden het appartement naast vergelijkbaar aanbod in dezelfde wijk uit onze marktdata. Zo kwam er een vraagprijs met een onderbouwing die ook een koper overtuigt.' },
        { titel: 'Dossier op orde', tekst: 'Titre foncier, plattegrond en de stukken van de syndicus gecontroleerd voordat de woning opnieuw in de verkoop ging.' },
        { titel: 'Fotoshoot en video', tekst: 'Een professionele fotoshoot bij daglicht en een video-rondleiding, zodat ook een koper in het buitenland de woning echt kan beoordelen.' },
        { titel: 'Presentatie in vier talen', tekst: 'Eén verkoopbrochure en advertentie in het Frans, Arabisch, Nederlands en Engels.' },
        { titel: 'Kopers bereiken', tekst: 'Op de grote Marokkaanse portals én bij ons netwerk van Marokkanen in Nederland, België en Frankrijk.' },
        { titel: 'Bezichtigingen', tekst: 'Door ons, alleen met kopers die wij vooraf gesproken hebben. Kopers in het buitenland kregen een live videorondleiding.' },
      ],
      eigenaar: 'Eén kennismakingsgesprek, de verkoopopdracht tekenen en straks de akte bij de notaris. Alle telefoontjes en bezichtigingen lopen via ons.',
    },
    faqTitel: 'Veelgestelde vragen over verkopen',
    faqs: [
      { q: 'In welke steden zijn jullie actief?', a: 'Alleen in {steden}, en hun directe omgeving. Daar kennen wij de markt en zijn wij snel ter plaatse. Woningen buiten dit gebied nemen wij niet in verkoop.' },
      { q: 'Wat kost het om mijn woning via Maghreb Estates te verkopen?', a: 'Dat hangt af van de woning en van wat u uit handen geeft. U ontvangt vooraf een schriftelijk voorstel met de vergoeding en wat daaronder valt. Wij beginnen pas als u daarmee akkoord bent.' },
      { q: 'Ik woon in Marokko. Waarom niet gewoon een simsar?', a: 'Een simsar kan een koper vinden in uw eigen stad. Wij doen meer: een onderbouwde vraagprijs, professionele foto’s en video, een gecontroleerd dossier en kopers in Europa die een lokale tussenpersoon niet bereikt. U heeft één aanspreekpunt, schriftelijke afspraken, en wij doen de bezichtigingen.' },
      { q: 'Ik woon niet in Marokko. Kan ik toch verkopen?', a: 'Ja. Wij regelen de fotoshoot, de bezichtigingen en het contact met kopers ter plaatse. Voor de akte bij de notaris kunt u een volmacht geven, zodat u ook voor de overdracht niet hoeft te reizen.' },
      { q: 'Mijn woning heeft geen titre foncier. Kan ik toch verkopen?', a: 'Vaak wel, maar het vraagt meer voorbereiding. Bij een woning met een melkia of een lopende réquisition bekijken wij eerst wat er nodig is en wat dat betekent voor de prijs en voor het soort koper. Dat bespreken wij eerlijk met u voordat de woning in de verkoop gaat.' },
      { q: 'Hoe snel is mijn woning verkocht?', a: 'Dat hangt af van prijs, locatie, staat en dossier. Wij beloven geen termijn. Wel een realistische vraagprijs, een presentatie die serieuze kopers trekt en vaste updates over reacties en bezichtigingen.' },
      { q: 'Jullie begeleiden ook kopers. Is dat geen belangenconflict?', a: 'Wij zijn daar open over. Brengen wij een koper aan die wij ook begeleiden, dan melden wij dat vooraf aan beide partijen en leggen wij schriftelijk vast voor wie wij werken en wie ons betaalt.' },
    ],
    slot: {
      titel: 'Klaar om uw woning te verkopen?',
      tekst: 'Woning in {stedenOf}? Meld hem aan of stuur ons een WhatsApp. Wij nemen binnen 24 uur contact op.',
      knop: 'Meld uw woning aan',
      wa: 'WhatsApp ons',
    },
  },

  // ------------------------------------------------------------------- ENGLISH
  en: {
    meta: {
      title: 'Sell your property in Morocco: we handle everything | Maghreb Estates',
      description: 'Sell your home in {stedenOf} through a professional company. Valuation based on market data, photos and video, all buyer contact, and buyers in Morocco and Europe.',
      dienst: 'Property sales in Morocco',
      dienstBeschrijving: 'Full sales service for homes in {steden} and their immediate surroundings: valuation, photography and video, marketing, buyer contact, viewings, negotiation and transfer at the notary.',
    },
    steden: { Tanger: 'Tangier', Rabat: 'Rabat', Casablanca: 'Casablanca', Marrakech: 'Marrakech', Agadir: 'Agadir' },
    lijst: { komma: ', ', en: ' and ', of: ' or ' },
    hero: {
      eyebrow: 'Sell your property',
      titel: 'Selling your property?<br /><em>We take care of everything</em>',
      sub: 'In {steden}. From the valuation to the deed at the notary, with one professional company instead of a random middleman. Whether you live in Morocco or abroad.',
      aanmelden: 'Register your property',
      case: 'See a case',
      trust: ['Professional photos and video', 'Buyers in Morocco and Europe', 'One point of contact', 'Through to the notary'],
    },
    kruimel: 'Sell your property',
    aanmelden: {
      eyebrow: 'Register your property',
      titel: 'Register your property',
      intro: 'Tell us briefly about the property. We will contact you within 24 hours. No obligation: you are not committed to anything until you sign a sales mandate.',
      werkgebiedTitel: 'Where we work',
      werkgebiedTekst: 'We only sell properties in these five cities and their immediate surroundings. We know these markets and can be on site quickly.',
      voordelen: [
        'Free introduction and price indication',
        'Fee agreed in writing upfront',
        'Whether you live in Morocco or abroad',
        'In Darija, French, Arabic, Amazigh, Dutch or English',
      ],
      direct: 'Prefer direct contact?',
      directWa: 'WhatsApp us',
      directBel: 'or call',
      waBericht: 'Hello Maghreb Estates, I would like to sell my property in Morocco.',
    },
    form: {
      naam: 'Name', naamPh: 'Your full name',
      telefoon: 'Phone / WhatsApp', telefoonPh: '+212 6 … or +44 7 …',
      email: 'Email address', emailPh: 'you@email.com', optioneel: '(optional)',
      stad: 'Where is the property?', stadKies: 'Choose your city', stadOptie: '{stad} and surroundings',
      wijk: 'Neighbourhood', wijkPh: 'e.g. Agdal, Malabata, Gauthier…',
      type: 'Property type', kies: 'Choose',
      types: ['Apartment', 'Villa', 'House / dar', 'Riad', 'Land', 'Commercial property', 'Other'],
      woont: 'You live', woonOpties: ['In Morocco', 'In the Netherlands', 'In Belgium', 'In France', 'Elsewhere in Europe', 'Elsewhere'],
      oppervlak: 'Floor area', oppervlakHint: '(m²)', oppervlakPh: 'e.g. 110',
      kamers: 'Bedrooms', kamersPh: 'e.g. 3',
      titel: 'Title deed', titelOnbekend: 'I don’t know', titels: ['Titre foncier', 'Melkia', 'Réquisition (in progress)'],
      prijs: 'Desired asking price', prijsPh: 'e.g. 1,500,000 MAD',
      bericht: 'Notes', berichtPh: 'Condition of the property, floor, when you want to sell…',
      viaWhatsapp: 'Via WhatsApp', viaEmail: 'Via email',
      bevestiging: 'Thank you for registering your property with Maghreb Estates. We will contact you within 24 hours to introduce ourselves. Do you already have photos or documents of the property? You can send them in the same WhatsApp or email conversation.',
      validatie: 'Please enter your name, phone number, city, property type and where you live.',
    },
    bericht: {
      kop: 'Property registered via maghreb-estates.com', naam: 'Name', telefoon: 'Phone / WhatsApp', email: 'Email',
      woont: 'Lives', type: 'Property type', stad: 'City', wijk: 'Neighbourhood', oppervlak: 'Floor area (m²)', kamers: 'Bedrooms',
      titel: 'Title deed', prijs: 'Desired asking price', toelichting: 'Notes',
    },
    waarom: {
      eyebrow: 'Why Maghreb Estates',
      titel: 'A professional company,<br /><em>not a random middleman</em>',
      desc: 'Most homes in Morocco are sold through a simsar or an ad on Avito. That can work, but often the property sits on the market for months: the photos don’t convince, the price isn’t backed up and you don’t know who is talking to buyers. With us, the entire sale is handled by one company you can hold to account.',
      kolomAnders: 'Informal middleman',
      kolomWij: 'Maghreb Estates',
      rijen: [
        { onderwerp: 'Presentation', anders: 'A few phone photos and a short ad.', wij: 'Professional photos, a video tour and a complete sales brochure.' },
        { onderwerp: 'Asking price', anders: 'A gut feeling, or what the neighbours are asking.', wij: 'Backed by market data and comparable homes in your neighbourhood.' },
        { onderwerp: 'Buyers', anders: 'Mostly local: personal contacts and Avito.', wij: 'Buyers in Morocco and Moroccans in Europe, through the portals and our own network.' },
        { onderwerp: 'Viewings', anders: 'You open the door yourself, even for people who aren’t serious.', wij: 'We handle the viewings, only with buyers we have spoken to first.' },
        { onderwerp: 'Contact', anders: 'Changing people, often by phone only.', wij: 'One point of contact and regular updates by WhatsApp or email.' },
        { onderwerp: 'Languages', anders: 'Usually only Darija or French. Buyers in Europe drop out.', wij: 'Darija, French, Arabic, Amazigh, Dutch and English.' },
        { onderwerp: 'Paperwork', anders: 'Only checked at the notary.', wij: 'Checked before the property goes on the market.' },
        { onderwerp: 'Agreements', anders: 'Verbal. Who pays what is often unclear.', wij: 'A written sales mandate with a fee agreed upfront.' },
      ],
    },
    diensten: {
      eyebrow: 'Fully handled',
      titel: 'Everything it takes<br /><em>to sell your property</em>',
      desc: 'You hand the sale over to us and keep the decisions. We do the work in between.',
      items: metIcons([
        { titel: 'Valuation with market data', tekst: 'We compare your property with what is on the market today: more than 60,000 listings from the major Moroccan portals every week. You get an asking price with a clear rationale.' },
        { titel: 'Paperwork in order', tekst: 'Title deed, floor plan, syndic and the documents a buyer and the notary will ask for. Checked before the sale, not after.' },
        { titel: 'Photos and video', tekst: 'A professional photo shoot, a video tour and a floor plan where needed. Your property the way a buyer wants to see it.' },
        { titel: 'Marketing in four languages', tekst: 'A sales brochure and listings in French, Arabic, Dutch and English, on the Moroccan portals and in our network in Europe.' },
        { titel: 'All buyer contact', tekst: 'We answer every question and filter out the serious buyers. No more calls from strangers.' },
        { titel: 'Viewings', tekst: 'By us or a trusted local partner, only with serious buyers. Buyers abroad get a live video tour.' },
        { titel: 'Negotiation', tekst: 'We negotiate on your behalf and present every offer to you with our assessment. You decide.' },
        { titel: 'Notary and transfer', tekst: 'We guide the process through to the deed. Living abroad? With a power of attorney you don’t need to travel to Morocco.' },
      ]),
    },
    netwerk: {
      eyebrow: 'Our network',
      titel: 'Buyers an ordinary<br /><em>middleman can’t reach</em>',
      p1: 'A simsar or local agent mainly reaches buyers in their own city. But many buyers of Moroccan property live in Europe: Moroccans in the Netherlands, Belgium, France and beyond who are looking for a holiday home, a home for later or an investment. They don’t scroll through local listings and don’t buy from someone they don’t know.',
      p2: 'We have many contacts outside Morocco. That lets us reach a group of buyers for you that a private seller or a local agent cannot reach, alongside buyers in Morocco itself.',
      punten: [
        { kop: 'Buyers in Morocco', tekst: 'through the major Moroccan portals and our local network.' },
        { kop: 'Moroccans in Europe', tekst: 'looking for a second home or a home for later.' },
        { kop: 'European buyers and investors', tekst: 'searching for a property through our buying service.' },
        { kop: 'In their own language,', tekst: 'with video and a complete file, so buyers abroad feel confident deciding from a distance.' },
      ],
      transparant: { kop: 'Transparent about our role.', tekst: 'If we bring in a buyer we also advise, we tell both parties upfront. In writing, including who pays us.' },
    },
    werkwijze: {
      eyebrow: 'How it works',
      titel: 'How the sale works',
      desc: 'Five steps, with one point of contact from the first conversation to the transfer.',
      stap: 'Step',
      stappen: [
        { titel: 'Register your property', tekst: 'Through the form at the top of this page or WhatsApp. You will hear from us within 24 hours.' },
        { titel: 'Introduction and valuation', tekst: 'We discuss your situation, review the paperwork and advise an asking price with a clear rationale.' },
        { titel: 'Photo shoot and marketing', tekst: 'Photos, video and a sales brochure. Then the property goes on the market, in Morocco and in Europe.' },
        { titel: 'Buyers and viewings', tekst: 'We handle all conversations, carry out the viewings and keep you informed of every response.' },
        { titel: 'Negotiation and notary', tekst: 'Once you accept an offer, we guide the process through to the deed at the notary.' },
      ],
    },
    case: {
      eyebrow: 'Case',
      em: 'from standstill to a strong presentation',
      label: 'Example case · details and photos to follow',
      situatieKop: 'The situation', aanpakKop: 'What we did', eigenaarKop: 'What the owner did',
      locatie: 'Location', videoVolgt: 'Video tour to follow', fotoVolgt: 'Photo to follow', galerij: 'Photo slots for the case',
      legeVakken: ['Living room', 'Kitchen', 'Bedroom', 'Bathroom', 'View'],
      titel: 'Apartment in Rabat',
      locatieWaarde: 'Rabat',
      specs: [
        { label: 'Type', waarde: 'Apartment' },
        { label: 'Floor area', waarde: '110 m²' },
        { label: 'Bedrooms', waarde: '3' },
        { label: 'Title deed', waarde: 'Titre foncier' },
        { label: 'Owner lives in', waarde: 'Rabat' },
        { label: 'Status', waarde: 'For sale' },
        { label: 'Asking price', waarde: 'On request' },
      ],
      situatie: 'The owner lives in Rabat and wants to move to a larger home. The apartment had been for sale for months through a simsar and on Avito. That brought plenty of calls and viewings, but no serious offer. The photos were taken with a phone, the asking price wasn’t backed up and the owner kept having to take time off to open the door.',
      aanpak: [
        { titel: 'Valuation', tekst: 'We compared the apartment with similar listings in the same neighbourhood from our market data. The result was an asking price with a rationale that convinces buyers too.' },
        { titel: 'Paperwork in order', tekst: 'Titre foncier, floor plan and syndic documents checked before the property went back on the market.' },
        { titel: 'Photo shoot and video', tekst: 'A professional daylight photo shoot and a video tour, so that a buyer abroad can properly judge the property too.' },
        { titel: 'Marketing in four languages', tekst: 'One sales brochure and listing in French, Arabic, Dutch and English.' },
        { titel: 'Reaching buyers', tekst: 'On the major Moroccan portals and with our network of Moroccans in the Netherlands, Belgium and France.' },
        { titel: 'Viewings', tekst: 'By us, only with buyers we had spoken to first. Buyers abroad got a live video tour.' },
      ],
      eigenaar: 'One introductory meeting, signing the sales mandate and, at the end, the deed at the notary. All calls and viewings go through us.',
    },
    faqTitel: 'Frequently asked questions about selling',
    faqs: [
      { q: 'Which cities do you work in?', a: 'Only in {steden}, and their immediate surroundings. We know these markets and can be on site quickly. We do not take on properties outside this area.' },
      { q: 'What does it cost to sell my property through Maghreb Estates?', a: 'That depends on the property and how much you hand over to us. You receive a written proposal upfront with the fee and what it covers. We only start once you agree.' },
      { q: 'I live in Morocco. Why not just use a simsar?', a: 'A simsar can find a buyer in your own city. We do more: a well-founded asking price, professional photos and video, checked paperwork and buyers in Europe that a local middleman can’t reach. You have one point of contact and written agreements, and we handle the viewings.' },
      { q: 'I don’t live in Morocco. Can I still sell?', a: 'Yes. We arrange the photo shoot, the viewings and all contact with buyers on site. For the deed at the notary you can give a power of attorney, so you don’t need to travel for the transfer either.' },
      { q: 'My property has no titre foncier. Can I still sell?', a: 'Often yes, but it takes more preparation. For a property with a melkia or a pending réquisition, we first look at what is needed and what that means for the price and the type of buyer. We discuss this honestly with you before the property goes on the market.' },
      { q: 'How quickly will my property sell?', a: 'That depends on price, location, condition and paperwork. We don’t promise a timeframe. We do promise a realistic asking price, a presentation that attracts serious buyers and regular updates on responses and viewings.' },
      { q: 'You also advise buyers. Isn’t that a conflict of interest?', a: 'We are open about it. If we bring in a buyer we also advise, we tell both parties upfront and put in writing who we work for and who pays us.' },
    ],
    slot: {
      titel: 'Ready to sell your property?',
      tekst: 'Property in {stedenOf}? Register it or send us a WhatsApp. We will contact you within 24 hours.',
      knop: 'Register your property',
      wa: 'WhatsApp us',
    },
  },

  // -------------------------------------------------------------------- FRANÇAIS
  fr: {
    meta: {
      title: 'Vendre votre bien au Maroc : nous nous occupons de tout | Maghreb Estates',
      description: 'Vendez votre bien à {stedenOf} avec une société professionnelle. Estimation fondée sur les données du marché, photos et vidéo, gestion des contacts et acheteurs au Maroc et en Europe.',
      dienst: 'Vente immobilière au Maroc',
      dienstBeschrijving: 'Accompagnement complet à la vente de biens à {steden} et dans leurs environs immédiats : estimation, photos et vidéo, mise en valeur, contacts acheteurs, visites, négociation et signature chez le notaire.',
    },
    steden: { Tanger: 'Tanger', Rabat: 'Rabat', Casablanca: 'Casablanca', Marrakech: 'Marrakech', Agadir: 'Agadir' },
    lijst: { komma: ', ', en: ' et ', of: ' ou ' },
    hero: {
      eyebrow: 'Vendre votre bien',
      titel: 'Vous vendez votre bien ?<br /><em>Nous nous occupons de tout</em>',
      sub: 'À {steden}. De l’estimation à l’acte chez le notaire, avec une seule société professionnelle au lieu d’un intermédiaire quelconque. Que vous viviez au Maroc ou à l’étranger.',
      aanmelden: 'Proposer votre bien',
      case: 'Voir un exemple',
      trust: ['Photos et vidéo professionnelles', 'Acheteurs au Maroc et en Europe', 'Un interlocuteur unique', 'Jusqu’au notaire'],
    },
    kruimel: 'Vendre votre bien',
    aanmelden: {
      eyebrow: 'Proposer votre bien',
      titel: 'Proposez votre bien',
      intro: 'Présentez-nous brièvement le bien. Nous vous contactons sous 24 heures. Sans engagement : vous n’êtes lié à rien tant que vous n’avez pas signé de mandat de vente.',
      werkgebiedTitel: 'Notre zone d’intervention',
      werkgebiedTekst: 'Nous vendons uniquement des biens dans ces cinq villes et leurs environs immédiats. Nous connaissons ces marchés et pouvons être sur place rapidement.',
      voordelen: [
        'Premier échange et estimation indicative sans engagement',
        'Honoraires fixés par écrit à l’avance',
        'Que vous viviez au Maroc ou à l’étranger',
        'En darija, français, arabe, amazigh, néerlandais ou anglais',
      ],
      direct: 'Vous préférez un contact direct ?',
      directWa: 'Écrivez-nous sur WhatsApp',
      directBel: 'ou appelez le',
      waBericht: 'Bonjour Maghreb Estates, je souhaite vendre mon bien au Maroc.',
    },
    form: {
      naam: 'Nom', naamPh: 'Votre nom complet',
      telefoon: 'Téléphone / WhatsApp', telefoonPh: '+212 6 … ou +33 6 …',
      email: 'Adresse e-mail', emailPh: 'vous@email.com', optioneel: '(facultatif)',
      stad: 'Où se trouve le bien ?', stadKies: 'Choisissez votre ville', stadOptie: '{stad} et environs',
      wijk: 'Quartier', wijkPh: 'Ex. Agdal, Malabata, Gauthier…',
      type: 'Type de bien', kies: 'Choisir',
      types: ['Appartement', 'Villa', 'Maison / dar', 'Riad', 'Terrain', 'Local commercial', 'Autre'],
      woont: 'Vous vivez', woonOpties: ['Au Maroc', 'En France', 'En Belgique', 'Aux Pays-Bas', 'Ailleurs en Europe', 'Ailleurs'],
      oppervlak: 'Surface', oppervlakHint: '(m²)', oppervlakPh: 'Ex. 110',
      kamers: 'Chambres', kamersPh: 'Ex. 3',
      titel: 'Titre de propriété', titelOnbekend: 'Je ne sais pas', titels: ['Titre foncier', 'Melkia', 'Réquisition (en cours)'],
      prijs: 'Prix de vente souhaité', prijsPh: 'Ex. 1 500 000 MAD',
      bericht: 'Précisions', berichtPh: 'État du bien, étage, quand vous souhaitez vendre…',
      viaWhatsapp: 'Via WhatsApp', viaEmail: 'Par e-mail',
      bevestiging: 'Merci d’avoir proposé votre bien à Maghreb Estates. Nous vous contactons sous 24 heures pour faire connaissance. Vous avez déjà des photos ou des documents du bien ? Vous pouvez les envoyer dans la même conversation WhatsApp ou e-mail.',
      validatie: 'Merci d’indiquer votre nom, votre téléphone, la ville, le type de bien et votre lieu de résidence.',
    },
    bericht: {
      kop: 'Bien proposé via maghreb-estates.com', naam: 'Nom', telefoon: 'Téléphone / WhatsApp', email: 'E-mail',
      woont: 'Réside', type: 'Type de bien', stad: 'Ville', wijk: 'Quartier', oppervlak: 'Surface (m²)', kamers: 'Chambres',
      titel: 'Titre de propriété', prijs: 'Prix souhaité', toelichting: 'Précisions',
    },
    waarom: {
      eyebrow: 'Pourquoi Maghreb Estates',
      titel: 'Une société professionnelle,<br /><em>pas un intermédiaire quelconque</em>',
      desc: 'La plupart des biens au Maroc se vendent par un samsar ou une annonce sur Avito. Cela peut fonctionner, mais souvent le bien reste des mois sur le marché : les photos ne convainquent pas, le prix n’est pas justifié et vous ne savez pas qui parle aux acheteurs. Chez nous, toute la vente est confiée à une seule société, responsable devant vous.',
      kolomAnders: 'Samsar / intermédiaire',
      kolomWij: 'Maghreb Estates',
      rijen: [
        { onderwerp: 'Présentation', anders: 'Quelques photos au téléphone et une courte annonce.', wij: 'Photos professionnelles, visite vidéo et brochure de vente complète.' },
        { onderwerp: 'Prix demandé', anders: 'Une estimation au feeling, ou le prix des voisins.', wij: 'Justifié par les données du marché et des biens comparables dans votre quartier.' },
        { onderwerp: 'Acheteurs', anders: 'Surtout locaux : l’entourage et Avito.', wij: 'Acheteurs au Maroc et Marocains d’Europe, via les portails et notre propre réseau.' },
        { onderwerp: 'Visites', anders: 'Vous ouvrez vous-même la porte, même à ceux qui ne sont pas sérieux.', wij: 'Nous assurons les visites, uniquement avec des acheteurs déjà qualifiés.' },
        { onderwerp: 'Contact', anders: 'Des interlocuteurs qui changent, souvent par téléphone uniquement.', wij: 'Un interlocuteur unique et des points réguliers par WhatsApp ou e-mail.' },
        { onderwerp: 'Langues', anders: 'Souvent darija ou français uniquement. Les acheteurs en Europe décrochent.', wij: 'Darija, français, arabe, amazigh, néerlandais et anglais.' },
        { onderwerp: 'Dossier', anders: 'Examiné seulement chez le notaire.', wij: 'Vérifié avant la mise en vente.' },
        { onderwerp: 'Engagements', anders: 'À l’oral. Qui paie quoi reste souvent flou.', wij: 'Un mandat de vente écrit, avec des honoraires fixés à l’avance.' },
      ],
    },
    diensten: {
      eyebrow: 'Clé en main',
      titel: 'Tout ce qu’il faut<br /><em>pour vendre votre bien</em>',
      desc: 'Vous nous confiez la vente et gardez les décisions. Nous faisons tout le travail entre les deux.',
      items: metIcons([
        { titel: 'Estimation fondée sur les données', tekst: 'Nous comparons votre bien à l’offre actuelle : chaque semaine plus de 60 000 annonces des grands portails marocains. Vous obtenez un prix de vente argumenté.' },
        { titel: 'Dossier en ordre', tekst: 'Titre de propriété, plan, syndic et pièces que l’acheteur et le notaire demanderont. Vérifiés avant la vente, pas après.' },
        { titel: 'Photos et vidéo', tekst: 'Un shooting photo professionnel, une visite vidéo et un plan si nécessaire. Votre bien tel qu’un acheteur veut le voir.' },
        { titel: 'Annonce en quatre langues', tekst: 'Une brochure de vente et des annonces en français, arabe, néerlandais et anglais, sur les portails marocains et dans notre réseau en Europe.' },
        { titel: 'Tous les contacts acheteurs', tekst: 'Nous répondons à chaque question et identifions les acheteurs sérieux. Fini les appels d’inconnus.' },
        { titel: 'Visites', tekst: 'Par nous ou un partenaire local de confiance, uniquement avec des acheteurs sérieux. Les acheteurs à l’étranger ont une visite vidéo en direct.' },
        { titel: 'Négociation', tekst: 'Nous négocions en votre nom et vous présentons chaque offre avec notre avis. Vous décidez.' },
        { titel: 'Notaire et transfert', tekst: 'Nous vous accompagnons jusqu’à l’acte. Vous vivez à l’étranger ? Avec une procuration, vous n’avez pas besoin de venir au Maroc.' },
      ]),
    },
    netwerk: {
      eyebrow: 'Notre réseau',
      titel: 'Des acheteurs qu’un intermédiaire<br /><em>ordinaire n’atteint pas</em>',
      p1: 'Un samsar ou une agence locale touche surtout les acheteurs de sa propre ville. Or beaucoup d’acheteurs de biens au Maroc vivent en Europe : des Marocains en France, en Belgique, aux Pays-Bas et ailleurs, qui cherchent un logement pour les vacances, pour plus tard ou pour investir. Ils ne parcourent pas les annonces locales et n’achètent pas à quelqu’un qu’ils ne connaissent pas.',
      p2: 'Nous avons de nombreux contacts hors du Maroc. Nous touchons ainsi pour vous un groupe d’acheteurs qu’un particulier ou une agence locale n’atteint pas, en plus des acheteurs au Maroc.',
      punten: [
        { kop: 'Acheteurs au Maroc', tekst: 'via les grands portails marocains et notre réseau local.' },
        { kop: 'Marocains d’Europe', tekst: 'qui cherchent une résidence secondaire ou un logement pour plus tard.' },
        { kop: 'Acheteurs et investisseurs européens', tekst: 'qui cherchent un bien via notre accompagnement à l’achat.' },
        { kop: 'Dans leur propre langue,', tekst: 'avec vidéo et dossier complet, pour que les acheteurs à l’étranger osent décider à distance.' },
      ],
      transparant: { kop: 'Transparents sur notre rôle.', tekst: 'Si nous présentons un acheteur que nous accompagnons aussi, nous le disons aux deux parties à l’avance. Par écrit, en précisant qui nous rémunère.' },
    },
    werkwijze: {
      eyebrow: 'Notre méthode',
      titel: 'Comment se déroule la vente',
      desc: 'Cinq étapes, avec un interlocuteur unique du premier échange jusqu’au transfert.',
      stap: 'Étape',
      stappen: [
        { titel: 'Proposer votre bien', tekst: 'Via le formulaire en haut de cette page ou WhatsApp. Nous revenons vers vous sous 24 heures.' },
        { titel: 'Premier échange et estimation', tekst: 'Nous faisons le point sur votre situation, examinons le dossier et proposons un prix argumenté.' },
        { titel: 'Shooting et mise en vente', tekst: 'Photos, vidéo et brochure. Le bien est ensuite mis sur le marché, au Maroc et en Europe.' },
        { titel: 'Acheteurs et visites', tekst: 'Nous gérons tous les échanges, assurons les visites et vous tenons informé de chaque retour.' },
        { titel: 'Négociation et notaire', tekst: 'Une fois l’offre acceptée, nous vous accompagnons jusqu’à l’acte chez le notaire.' },
      ],
    },
    case: {
      eyebrow: 'Exemple',
      em: 'de l’impasse à une présentation solide',
      label: 'Exemple · données et photos à venir',
      situatieKop: 'La situation', aanpakKop: 'Ce que nous avons fait', eigenaarKop: 'Ce que le propriétaire a fait',
      locatie: 'Emplacement', videoVolgt: 'Visite vidéo à venir', fotoVolgt: 'Photo à venir', galerij: 'Emplacements photo de l’exemple',
      legeVakken: ['Salon', 'Cuisine', 'Chambre', 'Salle de bain', 'Vue'],
      titel: 'Appartement à Rabat',
      locatieWaarde: 'Rabat',
      specs: [
        { label: 'Type', waarde: 'Appartement' },
        { label: 'Surface', waarde: '110 m²' },
        { label: 'Chambres', waarde: '3' },
        { label: 'Titre de propriété', waarde: 'Titre foncier' },
        { label: 'Le propriétaire vit à', waarde: 'Rabat' },
        { label: 'Statut', waarde: 'En vente' },
        { label: 'Prix', waarde: 'Sur demande' },
      ],
      situatie: 'Le propriétaire vit à Rabat et veut déménager dans un logement plus grand. L’appartement était en vente depuis des mois via un samsar et sur Avito. Beaucoup d’appels et de visites, mais aucune offre sérieuse. Les photos avaient été prises au téléphone, le prix n’était pas justifié et le propriétaire devait sans cesse se libérer pour ouvrir la porte.',
      aanpak: [
        { titel: 'Estimation', tekst: 'Nous avons comparé l’appartement aux biens similaires du même quartier dans nos données de marché. Résultat : un prix argumenté qui convainc aussi l’acheteur.' },
        { titel: 'Dossier en ordre', tekst: 'Titre foncier, plan et documents du syndic vérifiés avant la remise en vente.' },
        { titel: 'Shooting et vidéo', tekst: 'Un shooting professionnel à la lumière du jour et une visite vidéo, pour qu’un acheteur à l’étranger puisse lui aussi vraiment juger le bien.' },
        { titel: 'Annonce en quatre langues', tekst: 'Une brochure et une annonce en français, arabe, néerlandais et anglais.' },
        { titel: 'Toucher les acheteurs', tekst: 'Sur les grands portails marocains et auprès de notre réseau de Marocains aux Pays-Bas, en Belgique et en France.' },
        { titel: 'Visites', tekst: 'Par nous, uniquement avec des acheteurs déjà qualifiés. Les acheteurs à l’étranger ont eu une visite vidéo en direct.' },
      ],
      eigenaar: 'Un premier rendez-vous, la signature du mandat de vente et, à la fin, l’acte chez le notaire. Tous les appels et toutes les visites passent par nous.',
    },
    faqTitel: 'Questions fréquentes sur la vente',
    faqs: [
      { q: 'Dans quelles villes intervenez-vous ?', a: 'Uniquement à {steden}, et dans leurs environs immédiats. Nous connaissons ces marchés et pouvons être sur place rapidement. Nous ne prenons pas en vente les biens situés en dehors de cette zone.' },
      { q: 'Combien coûte la vente de mon bien avec Maghreb Estates ?', a: 'Cela dépend du bien et de ce que vous nous confiez. Vous recevez à l’avance une proposition écrite avec nos honoraires et ce qu’ils couvrent. Nous ne commençons qu’avec votre accord.' },
      { q: 'J’habite au Maroc. Pourquoi ne pas passer simplement par un samsar ?', a: 'Un samsar peut trouver un acheteur dans votre ville. Nous allons plus loin : un prix argumenté, des photos et une vidéo professionnelles, un dossier vérifié et des acheteurs en Europe qu’un intermédiaire local n’atteint pas. Vous avez un interlocuteur unique et des engagements écrits, et nous assurons les visites.' },
      { q: 'Je n’habite pas au Maroc. Puis-je quand même vendre ?', a: 'Oui. Nous organisons le shooting, les visites et tous les contacts avec les acheteurs sur place. Pour l’acte chez le notaire, vous pouvez donner une procuration : vous n’avez pas besoin de vous déplacer, même pour le transfert.' },
      { q: 'Mon bien n’a pas de titre foncier. Puis-je quand même vendre ?', a: 'Souvent oui, mais cela demande plus de préparation. Pour un bien sous melkia ou avec une réquisition en cours, nous examinons d’abord ce qui est nécessaire et ce que cela implique pour le prix et le type d’acheteur. Nous en parlons franchement avec vous avant la mise en vente.' },
      { q: 'En combien de temps mon bien sera-t-il vendu ?', a: 'Cela dépend du prix, de l’emplacement, de l’état et du dossier. Nous ne promettons pas de délai. Nous promettons un prix réaliste, une présentation qui attire des acheteurs sérieux et des points réguliers sur les retours et les visites.' },
      { q: 'Vous accompagnez aussi des acheteurs. N’est-ce pas un conflit d’intérêts ?', a: 'Nous sommes transparents à ce sujet. Si nous présentons un acheteur que nous accompagnons aussi, nous le signalons aux deux parties à l’avance et précisons par écrit pour qui nous travaillons et qui nous rémunère.' },
    ],
    slot: {
      titel: 'Prêt à vendre votre bien ?',
      tekst: 'Un bien à {stedenOf} ? Proposez-le ou écrivez-nous sur WhatsApp. Nous vous contactons sous 24 heures.',
      knop: 'Proposer votre bien',
      wa: 'WhatsApp',
    },
  },

  // -------------------------------------------------------------------- العربية
  ar: {
    meta: {
      title: 'بيع عقارك في المغرب: نتكفل بكل شيء | Maghreb Estates',
      description: 'بِع عقارك في {stedenOf} مع شركة محترفة. تقييم مبني على بيانات السوق، صور وفيديو احترافية، تواصل كامل مع المشترين، ومشترون في المغرب وأوروبا.',
      dienst: 'بيع العقارات في المغرب',
      dienstBeschrijving: 'مرافقة كاملة لبيع العقارات في {steden} ونواحيها القريبة: التقييم، التصوير والفيديو، العرض، التواصل مع المشترين، الزيارات، التفاوض ونقل الملكية لدى الموثق.',
    },
    steden: { Tanger: 'طنجة', Rabat: 'الرباط', Casablanca: 'الدار البيضاء', Marrakech: 'مراكش', Agadir: 'أكادير' },
    lijst: { komma: '، ', en: ' و', of: ' أو ' },
    hero: {
      eyebrow: 'بيع عقارك',
      titel: 'تريد بيع عقارك؟<br /><em>نتكفل بكل شيء</em>',
      sub: 'في {steden}. من التقييم إلى توقيع العقد لدى الموثق، مع شركة محترفة واحدة بدل وسيط عشوائي. سواء كنت تقيم في المغرب أو في الخارج.',
      aanmelden: 'اعرض عقارك',
      case: 'شاهد مثالاً',
      trust: ['صور وفيديو احترافية', 'مشترون في المغرب وأوروبا', 'مخاطَب واحد', 'حتى التوقيع لدى الموثق'],
    },
    kruimel: 'بيع عقارك',
    aanmelden: {
      eyebrow: 'اعرض عقارك',
      titel: 'اعرض عقارك للبيع',
      intro: 'أخبرنا باختصار عن العقار، وسنتواصل معك خلال 24 ساعة. دون أي التزام: لا يلزمك شيء قبل توقيع عقد تفويض البيع.',
      werkgebiedTitel: 'منطقة عملنا',
      werkgebiedTekst: 'نبيع العقارات فقط في هذه المدن الخمس ونواحيها القريبة. نعرف هذه الأسواق جيداً ونستطيع الحضور بسرعة.',
      voordelen: [
        'لقاء تعارف وتقدير أولي للسعر دون التزام',
        'أتعاب محددة كتابياً مسبقاً',
        'سواء كنت تقيم في المغرب أو في الخارج',
        'بالدارجة أو الفرنسية أو العربية أو الأمازيغية أو الهولندية أو الإنجليزية',
      ],
      direct: 'تفضل التواصل المباشر؟',
      directWa: 'راسلنا على واتساب',
      directBel: 'أو اتصل على',
      waBericht: 'السلام عليكم Maghreb Estates، أرغب في بيع عقاري في المغرب.',
    },
    form: {
      naam: 'الاسم', naamPh: 'اسمك الكامل',
      telefoon: 'الهاتف / واتساب', telefoonPh: '+212 6 …',
      email: 'البريد الإلكتروني', emailPh: 'you@email.com', optioneel: '(اختياري)',
      stad: 'أين يوجد العقار؟', stadKies: 'اختر مدينتك', stadOptie: '{stad} ونواحيها',
      wijk: 'الحي', wijkPh: 'مثال: أكدال، مالاباطا، المعاريف…',
      type: 'نوع العقار', kies: 'اختر',
      types: ['شقة', 'فيلا', 'منزل / دار', 'رياض', 'أرض', 'محل تجاري', 'آخر'],
      woont: 'مكان إقامتك', woonOpties: ['في المغرب', 'في فرنسا', 'في بلجيكا', 'في هولندا', 'في بلد أوروبي آخر', 'في بلد آخر'],
      oppervlak: 'المساحة', oppervlakHint: '(م²)', oppervlakPh: 'مثال: 110',
      kamers: 'غرف النوم', kamersPh: 'مثال: 3',
      titel: 'سند الملكية', titelOnbekend: 'لا أعرف', titels: ['رسم عقاري (titre foncier)', 'عقد ملكية (melkia)', 'مطلب تحفيظ قيد الإنجاز (réquisition)'],
      prijs: 'سعر البيع المرغوب', prijsPh: 'مثال: 1.500.000 درهم',
      bericht: 'ملاحظات', berichtPh: 'حالة العقار، الطابق، متى ترغب في البيع…',
      viaWhatsapp: 'عبر واتساب', viaEmail: 'عبر البريد',
      bevestiging: 'شكراً لعرض عقارك على Maghreb Estates. سنتواصل معك خلال 24 ساعة للتعارف. هل لديك صور أو وثائق للعقار؟ يمكنك إرسالها في نفس محادثة واتساب أو البريد الإلكتروني.',
      validatie: 'يرجى إدخال الاسم ورقم الهاتف والمدينة ونوع العقار ومكان إقامتك.',
    },
    bericht: {
      kop: 'عقار معروض عبر maghreb-estates.com', naam: 'الاسم', telefoon: 'الهاتف / واتساب', email: 'البريد',
      woont: 'الإقامة', type: 'نوع العقار', stad: 'المدينة', wijk: 'الحي', oppervlak: 'المساحة (م²)', kamers: 'غرف النوم',
      titel: 'سند الملكية', prijs: 'السعر المرغوب', toelichting: 'ملاحظات',
    },
    waarom: {
      eyebrow: 'لماذا Maghreb Estates',
      titel: 'شركة محترفة،<br /><em>لا وسيط عشوائي</em>',
      desc: 'تُباع أغلب العقارات في المغرب عن طريق سمسار أو إعلان على أفيتو. قد ينجح ذلك، لكن غالباً ما يبقى العقار معروضاً لأشهر: الصور غير مقنعة، والسعر غير مبرر، ولا تعرف من يتحدث مع المشترين. معنا، تتولى شركة واحدة عملية البيع كاملة، وتكون مسؤولة أمامك.',
      kolomAnders: 'سمسار / وسيط',
      kolomWij: 'Maghreb Estates',
      rijen: [
        { onderwerp: 'العرض', anders: 'بضع صور بالهاتف وإعلان قصير.', wij: 'صور احترافية وجولة بالفيديو وكتيّب بيع كامل.' },
        { onderwerp: 'سعر البيع', anders: 'تقدير عشوائي أو سعر الجيران.', wij: 'مبني على بيانات السوق وعقارات مماثلة في حيّك.' },
        { onderwerp: 'المشترون', anders: 'محليون في الغالب: المعارف وأفيتو.', wij: 'مشترون في المغرب ومغاربة في أوروبا، عبر المنصات وشبكتنا الخاصة.' },
        { onderwerp: 'الزيارات', anders: 'تفتح الباب بنفسك، حتى لغير الجادين.', wij: 'نتولى الزيارات، فقط مع مشترين تحدثنا معهم مسبقاً.' },
        { onderwerp: 'التواصل', anders: 'أشخاص يتغيرون، وغالباً عبر الهاتف فقط.', wij: 'مخاطَب واحد وتحديثات منتظمة عبر واتساب أو البريد.' },
        { onderwerp: 'اللغات', anders: 'غالباً الدارجة أو الفرنسية فقط، فيبتعد المشترون في أوروبا.', wij: 'الدارجة والفرنسية والعربية والأمازيغية والهولندية والإنجليزية.' },
        { onderwerp: 'الملف', anders: 'لا يُراجع إلا لدى الموثق.', wij: 'يُراجع قبل عرض العقار للبيع.' },
        { onderwerp: 'الاتفاق', anders: 'شفهي، ومن يدفع ماذا غالباً غير واضح.', wij: 'عقد تفويض بيع مكتوب بأتعاب محددة مسبقاً.' },
      ],
    },
    diensten: {
      eyebrow: 'نتكفل بكل شيء',
      titel: 'كل ما يلزم<br /><em>لبيع عقارك</em>',
      desc: 'تسلّمنا عملية البيع وتحتفظ أنت بالقرار، ونحن نقوم بكل العمل بينهما.',
      items: metIcons([
        { titel: 'تقييم مبني على بيانات السوق', tekst: 'نقارن عقارك بالعرض الحالي: أكثر من 60.000 إعلان أسبوعياً من أكبر المنصات المغربية. تحصل على سعر بيع مُبرَّر.' },
        { titel: 'ملف منظم', tekst: 'سند الملكية والتصميم ووثائق السانديك وكل ما سيطلبه المشتري والموثق. نراجعها قبل البيع، لا بعده.' },
        { titel: 'صور وفيديو', tekst: 'جلسة تصوير احترافية وجولة بالفيديو وتصميم للعقار عند الحاجة. عقارك كما يريد المشتري أن يراه.' },
        { titel: 'عرض بأربع لغات', tekst: 'كتيّب بيع وإعلانات بالفرنسية والعربية والهولندية والإنجليزية، على المنصات المغربية وفي شبكتنا بأوروبا.' },
        { titel: 'كل التواصل مع المشترين', tekst: 'نجيب عن كل سؤال ونفرز المشترين الجادين. لا مزيد من مكالمات الغرباء.' },
        { titel: 'الزيارات', tekst: 'نتولاها نحن أو شريك محلي موثوق، فقط مع المشترين الجادين. ويحصل المشترون في الخارج على جولة مباشرة بالفيديو.' },
        { titel: 'التفاوض', tekst: 'نتفاوض نيابة عنك ونعرض عليك كل عرض مع تقييمنا له. والقرار لك.' },
        { titel: 'الموثق ونقل الملكية', tekst: 'نرافقك حتى توقيع العقد. تقيم في الخارج؟ بوكالة لن تحتاج إلى السفر إلى المغرب.' },
      ]),
    },
    netwerk: {
      eyebrow: 'شبكتنا',
      titel: 'مشترون لا يصل إليهم<br /><em>الوسيط العادي</em>',
      p1: 'يصل السمسار أو الوكيل المحلي في الغالب إلى المشترين في مدينته فقط. لكن كثيراً من مشتري العقارات في المغرب يقيمون في أوروبا: مغاربة في فرنسا وبلجيكا وهولندا وغيرها، يبحثون عن مسكن للعطلة أو للمستقبل أو للاستثمار. هؤلاء لا يتصفحون الإعلانات المحلية، ولا يشترون ممن لا يعرفونه.',
      p2: 'لدينا علاقات كثيرة خارج المغرب، ونصل بها نيابة عنك إلى فئة من المشترين لا يصل إليها البائع العادي ولا الوكيل المحلي، إضافة إلى المشترين داخل المغرب.',
      punten: [
        { kop: 'مشترون في المغرب', tekst: 'عبر أكبر المنصات المغربية وشبكتنا المحلية.' },
        { kop: 'مغاربة العالم', tekst: 'الذين يبحثون عن مسكن ثانٍ أو مسكن للمستقبل.' },
        { kop: 'مشترون ومستثمرون أوروبيون', tekst: 'يبحثون عن عقار عبر خدمة مرافقة الشراء لدينا.' },
        { kop: 'بلغتهم،', tekst: 'مع فيديو وملف كامل، ليتخذ المشترون في الخارج قرارهم عن بُعد بثقة.' },
      ],
      transparant: { kop: 'شفافية في دورنا.', tekst: 'إذا قدّمنا مشترياً نرافقه أيضاً، نُخبر الطرفين بذلك مسبقاً. كتابياً، مع توضيح من يدفع لنا.' },
    },
    werkwijze: {
      eyebrow: 'طريقة عملنا',
      titel: 'كيف تتم عملية البيع',
      desc: 'خمس مراحل، مع مخاطَب واحد من أول لقاء حتى نقل الملكية.',
      stap: 'المرحلة',
      stappen: [
        { titel: 'اعرض عقارك', tekst: 'عبر الاستمارة في أعلى هذه الصفحة أو عبر واتساب. نتواصل معك خلال 24 ساعة.' },
        { titel: 'التعارف والتقييم', tekst: 'نناقش وضعك ونراجع الملف ونقترح سعر بيع مُبرَّراً.' },
        { titel: 'التصوير والعرض', tekst: 'صور وفيديو وكتيّب بيع، ثم يُعرض العقار في السوق، في المغرب وأوروبا.' },
        { titel: 'المشترون والزيارات', tekst: 'نتولى كل المحادثات ونقوم بالزيارات ونطلعك على كل تجاوب.' },
        { titel: 'التفاوض والموثق', tekst: 'عند قبولك عرضاً، نرافقك حتى توقيع العقد لدى الموثق.' },
      ],
    },
    case: {
      eyebrow: 'مثال',
      em: 'من الجمود إلى عرض قوي',
      label: 'مثال توضيحي · التفاصيل والصور قريباً',
      situatieKop: 'الوضع', aanpakKop: 'ما قمنا به', eigenaarKop: 'ما قام به المالك',
      locatie: 'الموقع', videoVolgt: 'جولة الفيديو قريباً', fotoVolgt: 'صورة قريباً', galerij: 'أماكن صور المثال',
      legeVakken: ['الصالون', 'المطبخ', 'غرفة النوم', 'الحمام', 'الإطلالة'],
      titel: 'شقة في الرباط',
      locatieWaarde: 'الرباط',
      specs: [
        { label: 'النوع', waarde: 'شقة' },
        { label: 'المساحة', waarde: '110 م²' },
        { label: 'غرف النوم', waarde: '3' },
        { label: 'سند الملكية', waarde: 'رسم عقاري' },
        { label: 'يقيم المالك في', waarde: 'الرباط' },
        { label: 'الحالة', waarde: 'معروضة للبيع' },
        { label: 'السعر', waarde: 'عند الطلب' },
      ],
      situatie: 'يقيم المالك في الرباط ويريد الانتقال إلى مسكن أكبر. ظلت الشقة معروضة لأشهر عبر سمسار وعلى أفيتو. كثير من المكالمات والزيارات، لكن دون عرض جدي. الصور مأخوذة بالهاتف، والسعر غير مبرر، وكان على المالك أن يتفرغ في كل مرة ليفتح الباب.',
      aanpak: [
        { titel: 'التقييم', tekst: 'قارنّا الشقة بعقارات مماثلة في نفس الحي من بيانات السوق لدينا، فخرجنا بسعر مُبرَّر يقنع المشتري أيضاً.' },
        { titel: 'ملف منظم', tekst: 'راجعنا الرسم العقاري والتصميم ووثائق السانديك قبل إعادة عرض العقار.' },
        { titel: 'التصوير والفيديو', tekst: 'جلسة تصوير احترافية في ضوء النهار وجولة بالفيديو، ليتمكن المشتري في الخارج أيضاً من تقييم العقار فعلاً.' },
        { titel: 'عرض بأربع لغات', tekst: 'كتيّب وإعلان واحد بالفرنسية والعربية والهولندية والإنجليزية.' },
        { titel: 'الوصول إلى المشترين', tekst: 'على أكبر المنصات المغربية ولدى شبكتنا من المغاربة في هولندا وبلجيكا وفرنسا.' },
        { titel: 'الزيارات', tekst: 'تولّيناها بأنفسنا، فقط مع مشترين تحدثنا معهم مسبقاً. وحصل المشترون في الخارج على جولة مباشرة بالفيديو.' },
      ],
      eigenaar: 'لقاء تعارف واحد، وتوقيع عقد تفويض البيع، وفي النهاية العقد لدى الموثق. كل المكالمات والزيارات تمر عبرنا.',
    },
    faqTitel: 'أسئلة شائعة حول البيع',
    faqs: [
      { q: 'في أي مدن تعملون؟', a: 'فقط في {steden} ونواحيها القريبة. نعرف هذه الأسواق جيداً ونستطيع الحضور بسرعة. لا نقبل بيع عقارات خارج هذه المنطقة.' },
      { q: 'كم تكلف عملية بيع عقاري مع Maghreb Estates؟', a: 'يتوقف ذلك على العقار وعلى ما تفوّضه لنا. تتلقى مسبقاً عرضاً مكتوباً بالأتعاب وما تشمله، ولا نبدأ إلا بعد موافقتك.' },
      { q: 'أقيم في المغرب. لماذا لا ألجأ ببساطة إلى سمسار؟', a: 'يستطيع السمسار أن يجد مشترياً في مدينتك. نحن نقدم أكثر: سعراً مُبرَّراً، وصوراً وفيديو احترافية، وملفاً مُراجعاً، ومشترين في أوروبا لا يصل إليهم الوسيط المحلي. ولديك مخاطَب واحد واتفاق مكتوب، ونتولى نحن الزيارات.' },
      { q: 'لا أقيم في المغرب. هل يمكنني البيع رغم ذلك؟', a: 'نعم. ننظم التصوير والزيارات وكل التواصل مع المشترين في عين المكان. ولتوقيع العقد لدى الموثق يمكنك منح وكالة، فلا تحتاج إلى السفر حتى لنقل الملكية.' },
      { q: 'عقاري ليس له رسم عقاري. هل يمكنني بيعه؟', a: 'في الغالب نعم، لكن ذلك يتطلب تحضيراً أكثر. بالنسبة لعقار بعقد ملكية أو بمطلب تحفيظ قيد الإنجاز، ننظر أولاً فيما يلزم وما يعنيه ذلك للسعر ولنوع المشتري، ونناقش ذلك معك بصراحة قبل عرض العقار للبيع.' },
      { q: 'متى سيُباع عقاري؟', a: 'يتوقف ذلك على السعر والموقع والحالة والملف. لا نَعِد بمدة محددة، لكننا نَعِد بسعر واقعي، وعرض يجذب مشترين جادين، وتحديثات منتظمة حول التجاوب والزيارات.' },
      { q: 'ترافقون المشترين أيضاً. أليس هذا تضارباً في المصالح؟', a: 'نحن واضحون في ذلك. إذا قدّمنا مشترياً نرافقه أيضاً، نُخبر الطرفين مسبقاً ونحدد كتابياً لمن نعمل ومن يدفع لنا.' },
    ],
    slot: {
      titel: 'مستعد لبيع عقارك؟',
      tekst: 'عقار في {stedenOf}؟ اعرضه علينا أو راسلنا على واتساب. نتواصل معك خلال 24 ساعة.',
      knop: 'اعرض عقارك',
      wa: 'واتساب',
    },
  },
};
