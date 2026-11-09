// Verkooppagina (/huis-verkopen-marokko/ en /{lang}/…): alle tekst per taal.
// De opmaak staat in src/components/VerkoopPagina.astro. Elke taal heeft
// dezelfde vorm (VerkoopTekst), dus een ontbrekende vertaling valt op.
//
// Placeholders: {steden} = "Rabat, Casablanca, … en Agadir", {stedenOf} = "… of
// Agadir", {stad} = één stad (keuzelijst in het formulier). In het prijsblok en de
// FAQ: {datum}, {n}, {prijzen} (zie VerkoopPagina.astro).
//
// Opbouw (redesign november 2026, documenten/analyses/verkooppagina-redesign-2026-11/):
// hero → kort formulier → waarom → werkwijze → netwerk → prijzen (vijf stadskaarten
// en een link naar de marktprijzenpagina) → FAQ → afsluitende CTA. De volledige
// tabellen staan op die aparte pagina (src/i18n/marktprijzen.ts). Bronnamen
// (portals) staan nergens op de pagina.
//
// SEO-afspraak (documenten/analyses/seo-verkooppagina-marokko-2026-10/): verkopen
// is een nevendienst. "Agence immobilière" alleen in de lopende tekst, niet in de
// title of H1. Geen stadspagina's voor verkopers zolang Search Console daar geen
// vraag naar laat zien. Geen "Réponse sous 24 h" zolang die belofte niet vaststaat.

import type { Taal } from './config';

/** Werkgebied: alleen deze vijf steden en hun directe omgeving. De Latijnse
 *  naam is ook de waarde die het formulier meestuurt. */
export const werkgebied = ['Rabat', 'Casablanca', 'Tanger', 'Marrakech', 'Agadir'] as const;
export type WerkgebiedStad = (typeof werkgebied)[number];

interface Item { titel: string; tekst: string }
type Vier<T> = [T, T, T, T];

export interface VerkoopTekst {
  meta: { title: string; description: string; dienst: string; dienstBeschrijving: string };
  steden: Record<WerkgebiedStad, string>;
  /** Opsomming: scheidingsteken en voegwoorden, inclusief spaties. */
  lijst: { komma: string; en: string; of: string };
  /** Knop 1 opent het formulier, knop 2 WhatsApp. Daaronder vier korte
   *  vertrouwenspunten. */
  hero: { eyebrow: string; titel: string; sub: string; estimatie: string; whatsapp: string; waBericht: string; trust: Vier<string> };
  kruimel: string;
  aanmelden: {
    eyebrow: string; titel: string; intro: string;
    werkgebiedTitel: string; werkgebiedTekst: string;
    voordelen: string[];
    direct: string; directWa: string; directBel: string;
  };
  /** Kort formulier: vier verplichte velden, de rest achter "Details toevoegen". */
  form: {
    naam: string; naamPh: string; telefoon: string; telefoonPh: string;
    stad: string; stadKies: string; stadOptie: string;
    type: string; kies: string; types: string[];
    meer: string; optioneel: string;
    wijk: string; wijkPh: string; oppervlak: string; oppervlakPh: string;
    prijs: string; prijsPh: string; email: string; emailPh: string;
    bericht: string; berichtPh: string;
    verplicht: string; verstuur: string; bezig: string;
    /** {link} wordt de link naar het privacybeleid (bestaat alleen in het Nederlands). */
    privacy: string; privacyLink: string; privacyTaal: string;
    validatie: string;
    bedankt: { titel: string; tekst: string; wa: string };
    fout: { tekst: string; wa: string };
  };
  /** Regels van het WhatsApp-bericht dat het formulier opstelt als opslaan mislukt. */
  bericht: {
    kop: string; naam: string; telefoon: string; email: string; type: string;
    stad: string; wijk: string; oppervlak: string; prijs: string; toelichting: string;
  };
  waarom: { eyebrow: string; titel: string; intro: string; kaarten: Vier<Item> };
  werkwijze: { eyebrow: string; titel: string; stappen: Item[] };
  netwerk: {
    eyebrow: string; titel: string; tekst: string;
    groepen: [Item, Item, Item];
    /** Toegankelijke naam en labels van het kaartje Marokko–Europa. */
    kaartLabel: string; marokko: string; europa: string;
  };
  /** Vraagprijzen per m² uit src/data/marktprijzen.json: vijf stadskaarten. De
   *  volledige tabellen staan op de marktprijzenpagina (src/i18n/marktprijzen.ts).
   *  Geen bronnamen (portals) op de pagina. */
  prijzen: {
    eyebrow: string; titel: string; intro: string;
    kaartType: string; kaartN: string; eenheid: string;
    disclaimer: string; bijgewerkt: string;
    /** Link naar de marktprijzenpagina. */
    analyse: string;
    knop: string;
    /** Eén stad in de FAQ-opsomming, bv. "{prijs} à {stad}". */
    inStad: string;
  };
  /** Eén subtiele regel op de homepage, onderaan. Niet in de hero. */
  homeBlok: { vraag: string; link: string };
  faqTitel: string;
  faqs: { q: string; a: string }[];
  slot: { titel: string; tekst: string; knop: string; wa: string };
}

export const verkoopTekst: Record<Taal, VerkoopTekst> = {
  // ---------------------------------------------------------------- NEDERLANDS
  nl: {
    meta: {
      title: 'Huis verkopen in Marokko | Maghreb Estates',
      description: 'Verkoop uw appartement, huis of villa in Marokko met Maghreb Estates. Waardebepaling, professionele presentatie en begeleiding tot en met de notaris.',
      dienst: 'Verkoopbegeleiding van woningen in Marokko',
      dienstBeschrijving: 'Volledige verkoopbegeleiding van woningen in {steden} en directe omgeving: waardebepaling, fotografie en video, presentatie, klantcontact, bezichtigingen, onderhandeling en overdracht bij de notaris.',
    },
    steden: { Tanger: 'Tanger', Rabat: 'Rabat', Casablanca: 'Casablanca', Marrakech: 'Marrakech', Agadir: 'Agadir' },
    lijst: { komma: ', ', en: ' en ', of: ' of ' },
    hero: {
      eyebrow: 'Uw woning verkopen in Marokko',
      titel: 'Uw huis in Marokko verkopen, <em>met een gerust gevoel.</em>',
      sub: 'Van de waardebepaling tot de akte bij de notaris: Maghreb Estates begeleidt u bij elke stap van de verkoop, of u nu in Marokko woont of in het buitenland.',
      estimatie: 'Laat mijn woning waarderen',
      whatsapp: 'Chat via WhatsApp',
      waBericht: 'Hallo Maghreb Estates, ik wil mijn woning in Marokko verkopen.',
      trust: ['Onderbouwde waardebepaling', 'Professionele foto’s en video', 'Kopers in Marokko en Europa', 'Begeleiding tot de notaris'],
    },
    kruimel: 'Woning verkopen',
    aanmelden: {
      eyebrow: 'Waardebepaling en verkoop',
      titel: 'Vertel ons over uw woning',
      intro: 'Overweegt u uw appartement, huis of villa te verkopen? Deel een paar gegevens en wij nemen contact met u op om de mogelijkheden te bespreken.',
      werkgebiedTitel: 'Onze steden',
      werkgebiedTekst: 'Wij begeleiden de verkoop van woningen in deze vijf steden en hun directe omgeving.',
      voordelen: [
        'Vrijblijvend tot u een verkoopopdracht tekent',
        'Honorarium vooraf schriftelijk vastgelegd',
        'In het Darija, Frans, Arabisch, Amazigh, Nederlands of Engels',
      ],
      direct: 'Liever direct contact?',
      directWa: 'WhatsApp ons',
      directBel: 'of bel',
    },
    form: {
      naam: 'Naam', naamPh: 'Uw naam',
      telefoon: 'Telefoon / WhatsApp', telefoonPh: '+31 6 … of +212 6 …',
      stad: 'Stad van de woning', stadKies: 'Kies de stad', stadOptie: '{stad} en omgeving',
      type: 'Type woning', kies: 'Kies',
      types: ['Appartement', 'Huis / dar', 'Villa', 'Riad', 'Grond', 'Bedrijfspand', 'Anders'],
      meer: 'Details toevoegen', optioneel: '(optioneel)',
      wijk: 'Wijk', wijkPh: 'Bijv. Agdal, Malabata, Gauthier…',
      oppervlak: 'Oppervlakte, ongeveer (m²)', oppervlakPh: 'Bijv. 110',
      prijs: 'Gewenste prijs', prijsPh: 'Bijv. 1.500.000 MAD',
      email: 'E-mailadres', emailPh: 'u@voorbeeld.nl',
      bericht: 'Aanvullende informatie', berichtPh: 'Staat van de woning, verdieping, wanneer u wilt verkopen…',
      verplicht: 'Verplichte velden',
      verstuur: 'Verstuur mijn aanvraag', bezig: 'Bezig met versturen…',
      privacy: 'Wij gebruiken uw gegevens alleen om contact met u op te nemen over uw woning. Lees ons {link}.',
      privacyLink: 'privacybeleid', privacyTaal: '',
      validatie: 'Vul uw naam, telefoonnummer, de stad en het type woning in.',
      bedankt: {
        titel: 'Dank u, uw aanvraag is verstuurd.',
        tekst: 'Wij nemen contact met u op om uw woning en de verkoopmogelijkheden te bespreken.',
        wa: 'Heeft u al foto’s of documenten? Stuur ze ons via WhatsApp.',
      },
      fout: {
        tekst: 'Uw aanvraag kon niet worden verstuurd. Controleer uw verbinding en probeer het opnieuw, of stuur hem via WhatsApp.',
        wa: 'Verstuur via WhatsApp',
      },
    },
    bericht: {
      kop: 'Verkoopaanvraag via maghreb-estates.com', naam: 'Naam', telefoon: 'Telefoon / WhatsApp', email: 'E-mail',
      type: 'Type woning', stad: 'Stad', wijk: 'Wijk', oppervlak: 'Oppervlakte (m²)', prijs: 'Gewenste prijs', toelichting: 'Toelichting',
    },
    waarom: {
      eyebrow: 'Waarom Maghreb Estates',
      titel: 'Waarom verkopen via Maghreb Estates?',
      intro: 'Maghreb Estates is een vastgoedkantoor, ingeschreven in Rabat. Wij nemen de hele verkoop uit handen; u houdt elke beslissing.',
      kaarten: [
        { titel: 'Een onderbouwde waardebepaling', tekst: 'Wij analyseren vergelijkbare woningen en marktdata om een realistische prijsstrategie te bepalen.' },
        { titel: 'Een professionele presentatie', tekst: 'Foto’s, video en verzorgde advertenties die uw woning op haar best laten zien.' },
        { titel: 'Internationale zichtbaarheid', tekst: 'Wij presenteren uw woning aan kopers in Marokko en aan ons netwerk in Europa.' },
        { titel: 'Volledige begeleiding', tekst: 'Eén vast aanspreekpunt voor bezichtigingen, onderhandeling en de afstemming tot en met de notaris.' },
      ],
    },
    werkwijze: {
      eyebrow: 'Onze werkwijze',
      titel: 'Hoe verloopt de verkoop?',
      stappen: [
        { titel: 'Eerste contact', tekst: 'U vertelt ons over uw woning en uw doelen.' },
        { titel: 'Waardebepaling en voorbereiding', tekst: 'Wij analyseren de markt, de prijs en de benodigde documenten.' },
        { titel: 'In de verkoop', tekst: 'Wij verzorgen foto’s, video en advertenties om uw woning te presenteren.' },
        { titel: 'Bezichtigingen en onderhandeling', tekst: 'Wij spreken met kopers, organiseren bezichtigingen en leggen u de biedingen voor.' },
        { titel: 'Akte bij de notaris', tekst: 'Wij begeleiden u bij de afronding van de verkoop.' },
      ],
    },
    netwerk: {
      eyebrow: 'Ons netwerk',
      titel: 'Uw woning zichtbaar in Marokko en Europa',
      tekst: 'Dankzij onze aanwezigheid in Marokko en ons internationale netwerk kunnen wij uw woning presenteren aan kopers in Marokko én aan Marokkanen en investeerders die in Europa wonen.',
      groepen: [
        { titel: 'Kopers in Marokko', tekst: 'Via de grote Marokkaanse vastgoedportals en ons lokale netwerk.' },
        { titel: 'Marokkanen in Europa', tekst: 'In Nederland, België, Frankrijk en elders, op zoek naar een woning in Marokko.' },
        { titel: 'Internationale investeerders', tekst: 'Die bij ons aankloppen om in Marokko te kopen of te investeren.' },
      ],
      kaartLabel: 'Kaart: kopers in Marokko en Europa', marokko: 'Marokko', europa: 'Europa',
    },
    prijzen: {
      eyebrow: 'Vastgoedprijzen in Marokko',
      titel: 'Wat is uw woning waard in Marokko?',
      intro: 'De prijs van een woning hangt af van veel factoren: de stad, de wijk, de ligging, de oppervlakte en de staat van de woning. Wij gebruiken marktdata om u te helpen een realistische verkoopprijs te bepalen.',
      kaartType: 'Appartement · mediane vraagprijs', kaartN: '{n} advertenties', eenheid: 'MAD/m²',
      disclaimer: 'Indicatieve prijzen uit vastgoedadvertenties, geen definitieve verkoopprijzen.',
      bijgewerkt: 'Bijgewerkt: {datum} · {n} verkoopadvertenties geanalyseerd.',
      analyse: 'Bekijk onze analyse van de vastgoedmarkt',
      knop: 'Laat mijn woning waarderen',
      inStad: '{prijs} in {stad}',
    },
    homeBlok: { vraag: 'Bent u eigenaar en wilt u uw woning in Marokko verkopen?', link: 'Bekijk onze verkoopbegeleiding' },
    faqTitel: 'Veelgestelde vragen over verkopen',
    faqs: [
      { q: 'Hoe verkoop ik een appartement in Marokko?', a: 'In vijf stappen: een realistische prijs op basis van vergelijkbare woningen, een dossier op orde (eigendomstitel, plattegrond, stukken van de syndic), een verzorgde presentatie met foto’s en video, bezichtigingen met serieuze kopers, en tot slot de onderhandeling en de akte bij de notaris. Wij nemen die stappen voor u uit handen in {steden}.' },
      { q: 'In welke steden bent u actief?', a: 'In {steden} en hun directe omgeving. Die markten kennen wij en daar zijn wij snel ter plaatse. Woningen buiten dit gebied nemen wij niet in de verkoop.' },
      { q: 'Hoe bepaal ik de waarde van mijn woning?', a: 'Wij vergelijken uw woning met soortgelijke woningen in uw wijk: oppervlakte, verdieping, staat, uitzicht en eigendomstitel. Daarbij gebruiken wij de advertenties die wij verzamelen op de grote Marokkaanse portals. Ter indicatie: de mediane vraagprijs voor een appartement is {prijzen} (advertenties tot en met {datum}). Dat zijn vraagprijzen, geen verkoopprijzen bij de notaris; de waardebepaling van uw woning houdt rekening met dat verschil.' },
      { q: 'Wat kost verkopen via Maghreb Estates?', a: 'Dat hangt af van de woning en van wat u ons toevertrouwt. U krijgt vooraf een schriftelijk voorstel met ons honorarium en wat het omvat, en wij beginnen pas met uw akkoord. Begeleiden wij ook de koper, dan melden wij dat vooraf aan beide partijen en leggen wij schriftelijk vast wie ons betaalt.' },
      { q: 'Kan ik verkopen als ik in het buitenland woon?', a: 'Ja. Wij regelen ter plaatse de foto’s, de bezichtigingen en het contact met kopers, en houden u op afstand op de hoogte. Voor de ondertekening kunt u meestal een volmacht geven aan iemand die u vertrouwt. Hoe die volmacht eruit moet zien (notaris, consulaat, legalisatie) hangt af van uw situatie en laat u bevestigen door de notaris die de verkoop afhandelt.' },
      { q: 'Welke documenten zijn nodig om te verkopen?', a: 'Meestal: uw identiteitsbewijs, de eigendomstitel (bij een woning met titre foncier een recent certificat de propriété), de plattegrond en bij een appartement de stukken van de syndic. De notaris vraagt ook fiscale verklaringen, zoals het bewijs dat de gemeentelijke belasting (taxe de services communaux) betaald is, en waar nodig de opheffing van een hypotheek. De precieze lijst hangt af van de woning; wij lopen hem met u door vóór de verkoop.' },
      { q: 'Hoe lang duurt een verkoop?', a: 'Dat hangt af van de prijs, de ligging, de staat van de woning en het dossier. Wij beloven geen termijn. Is er een koper, reken dan meestal op enkele weken tot enkele maanden voor de voorlopige koopovereenkomst, de documenten en de akte bij de notaris. Wij houden u bij elke stap op de hoogte.' },
      { q: 'Kan ik een woning zonder titre foncier verkopen?', a: 'Vaak wel, maar het vraagt meer voorbereiding. Een woning met een melkia of met een lopende réquisition kan in principe verkocht worden. De voorwaarden, de doorlooptijd en het effect op de prijs hangen af van het dossier en moeten bevestigd worden door een notaris of adoul. Wij bekijken uw dossier met u vóór de verkoop.' },
    ],
    slot: {
      titel: 'Overweegt u uw woning te verkopen?',
      tekst: 'Laten we het over uw plannen hebben. Wij bekijken uw woning en leggen uit hoe wij u bij de verkoop kunnen begeleiden.',
      knop: 'Bied mijn woning aan',
      wa: 'Neem contact op via WhatsApp',
    },
  },

  // ------------------------------------------------------------------- ENGLISH
  en: {
    meta: {
      title: 'Sell a property in Morocco | Maghreb Estates',
      description: 'Sell your apartment, house or villa in Morocco with Maghreb Estates. Valuation, professional presentation and support all the way to the notary.',
      dienst: 'Property sales support in Morocco',
      dienstBeschrijving: 'Full sales support for properties in {steden} and their immediate surroundings: valuation, photography and video, presentation, buyer contact, viewings, negotiation and transfer at the notary.',
    },
    steden: { Tanger: 'Tangier', Rabat: 'Rabat', Casablanca: 'Casablanca', Marrakech: 'Marrakech', Agadir: 'Agadir' },
    lijst: { komma: ', ', en: ' and ', of: ' or ' },
    hero: {
      eyebrow: 'Sell your property in Morocco',
      titel: 'Sell your property in Morocco, <em>with confidence.</em>',
      sub: 'From valuation to signing at the notary, Maghreb Estates supports you at every step of the sale, whether you live in Morocco or abroad.',
      estimatie: 'Get my property valued',
      whatsapp: 'Chat on WhatsApp',
      waBericht: 'Hello Maghreb Estates, I would like to sell my property in Morocco.',
      trust: ['Evidence-based valuation', 'Professional photos and video', 'Buyers in Morocco and Europe', 'Support up to the notary'],
    },
    kruimel: 'Sell your property',
    aanmelden: {
      eyebrow: 'Valuation and sale',
      titel: 'Tell us about your property',
      intro: 'Thinking of selling your apartment, house or villa? Share a few details and we will get back to you to discuss the options.',
      werkgebiedTitel: 'Our cities',
      werkgebiedTekst: 'We handle property sales in these five cities and their immediate surroundings.',
      voordelen: [
        'No obligation until you sign a sales mandate',
        'Fees agreed in writing in advance',
        'In Darija, French, Arabic, Amazigh, Dutch or English',
      ],
      direct: 'Prefer to talk directly?',
      directWa: 'WhatsApp us',
      directBel: 'or call',
    },
    form: {
      naam: 'Name', naamPh: 'Your name',
      telefoon: 'Phone / WhatsApp', telefoonPh: '+44 7 … or +212 6 …',
      stad: 'City of the property', stadKies: 'Choose the city', stadOptie: '{stad} and surroundings',
      type: 'Property type', kies: 'Choose',
      types: ['Apartment', 'House / dar', 'Villa', 'Riad', 'Land', 'Commercial property', 'Other'],
      meer: 'Add details', optioneel: '(optional)',
      wijk: 'Neighbourhood', wijkPh: 'E.g. Agdal, Malabata, Gauthier…',
      oppervlak: 'Approximate floor area (m²)', oppervlakPh: 'E.g. 110',
      prijs: 'Desired price', prijsPh: 'E.g. 1,500,000 MAD',
      email: 'Email address', emailPh: 'you@example.com',
      bericht: 'Additional information', berichtPh: 'Condition, floor, when you would like to sell…',
      verplicht: 'Required fields',
      verstuur: 'Send my request', bezig: 'Sending…',
      privacy: 'We only use your details to contact you about your property. See our {link}.',
      privacyLink: 'Privacy Policy', privacyTaal: ' (in Dutch)',
      validatie: 'Please enter your name, phone number, the city and the property type.',
      bedankt: {
        titel: 'Thank you, your request has been sent.',
        tekst: 'We will get back to you to discuss your property and the options for selling it.',
        wa: 'Do you have photos or documents? Send them to us on WhatsApp.',
      },
      fout: {
        tekst: 'Your request could not be sent. Check your connection and try again, or send it to us on WhatsApp.',
        wa: 'Send via WhatsApp',
      },
    },
    bericht: {
      kop: 'Sale request via maghreb-estates.com', naam: 'Name', telefoon: 'Phone / WhatsApp', email: 'Email',
      type: 'Property type', stad: 'City', wijk: 'Neighbourhood', oppervlak: 'Floor area (m²)', prijs: 'Desired price', toelichting: 'Details',
    },
    waarom: {
      eyebrow: 'Why Maghreb Estates',
      titel: 'Why entrust your sale to Maghreb Estates?',
      intro: 'Maghreb Estates is a real estate agency registered in Rabat. We handle the entire sale; you keep every decision.',
      kaarten: [
        { titel: 'An evidence-based valuation', tekst: 'We analyse comparable properties and market data to set a realistic pricing strategy.' },
        { titel: 'A professional presentation', tekst: 'Photos, video and carefully written listings that show your property at its best.' },
        { titel: 'International visibility', tekst: 'We present your property to buyers in Morocco and to our network in Europe.' },
        { titel: 'Full support', tekst: 'One dedicated contact for viewings, negotiation and coordination all the way to the notary.' },
      ],
    },
    werkwijze: {
      eyebrow: 'How we work',
      titel: 'How does the sale work?',
      stappen: [
        { titel: 'First contact', tekst: 'You tell us about your property and your goals.' },
        { titel: 'Valuation and preparation', tekst: 'We analyse the market, the price and the documents you need.' },
        { titel: 'Listing', tekst: 'We prepare the photos, video and listings to present your property.' },
        { titel: 'Viewings and negotiation', tekst: 'We talk to buyers, organise viewings and present the offers to you.' },
        { titel: 'Signing at the notary', tekst: 'We support you in completing the sale.' },
      ],
    },
    netwerk: {
      eyebrow: 'Our network',
      titel: 'Your property visible in Morocco and Europe',
      tekst: 'Thanks to our local presence and our international network, we can present your property to buyers in Morocco as well as to Moroccans and investors based in Europe.',
      groepen: [
        { titel: 'Buyers in Morocco', tekst: 'Through the major Moroccan property portals and our local network.' },
        { titel: 'Moroccans living in Europe', tekst: 'In France, Belgium, the Netherlands and elsewhere, looking for a home in Morocco.' },
        { titel: 'International investors', tekst: 'Who come to us to buy or invest in Morocco.' },
      ],
      kaartLabel: 'Map: buyers in Morocco and Europe', marokko: 'Morocco', europa: 'Europe',
    },
    prijzen: {
      eyebrow: 'Property prices in Morocco',
      titel: 'What is your property worth in Morocco?',
      intro: 'The price of a property depends on many factors: the city, the neighbourhood, the location, the floor area and the condition of the home. We use market data to help you set a consistent asking price.',
      kaartType: 'Apartment · median asking price', kaartN: '{n} listings', eenheid: 'MAD/m²',
      disclaimer: 'Indicative prices from property listings, not final sale prices.',
      bijgewerkt: 'Updated: {datum} · {n} sale listings analysed.',
      analyse: 'View our property market analysis',
      knop: 'Get my property valued',
      inStad: '{prijs} in {stad}',
    },
    homeBlok: { vraag: 'Do you own a property in Morocco and want to sell it?', link: 'Discover our sales service' },
    faqTitel: 'Frequently asked questions about selling',
    faqs: [
      { q: 'How do I sell an apartment in Morocco?', a: 'In five steps: a realistic price based on comparable properties, a file in order (title deed, floor plan, syndic documents), a careful presentation with photos and video, viewings with serious buyers, and finally the negotiation and the deed at the notary. We take care of these steps for you in {steden}.' },
      { q: 'Which cities do you work in?', a: '{steden} and their immediate surroundings. We know these markets and can be on site quickly. We do not take on properties outside this area.' },
      { q: 'How do I estimate the value of my property?', a: 'We compare your property with similar homes in your neighbourhood: floor area, floor, condition, view and title deed. We use the listings we collect on the major Moroccan portals. As a guide, the median asking price for an apartment is {prijzen} (listings up to {datum}). These are asking prices, not sale prices at the notary; the valuation of your property takes that gap into account.' },
      { q: 'What are Maghreb Estates’ fees?', a: 'They depend on the property and on what you entrust to us. You receive a written proposal in advance with our fees and what they cover, and we only start with your agreement. If we also support the buyer, we tell both parties in advance and state in writing who pays us.' },
      { q: 'Can I sell my property if I live abroad?', a: 'Yes. We handle the photos, the viewings and buyer contact on site, and keep you informed remotely. For the signing, you can usually give a power of attorney to someone you trust. Its exact form (notary, consulate, legalisation) depends on your situation and should be confirmed by the notary handling the sale.' },
      { q: 'Which documents do I need to sell?', a: 'Usually: your ID, the title deed (for a titled property, a recent certificat de propriété), the floor plan and, for an apartment, the syndic documents. The notary also asks for tax certificates, such as proof that the municipal services tax has been paid, and where relevant the release of a mortgage. The exact list depends on the property; we go through it with you before the sale.' },
      { q: 'How long does a property sale take?', a: 'It depends on the price, the location, the condition of the property and the file. We do not promise a timeframe. Once a buyer is found, allow usually a few weeks to a few months for the preliminary sale agreement, the documents and the signing at the notary. We keep you informed at every step.' },
      { q: 'Can I sell a property without a titre foncier?', a: 'Often yes, but it takes more preparation. A property held under a melkia or with a pending réquisition can in principle be sold. The conditions, the timeline and the effect on the price depend on the file and must be confirmed by a notary or adoul. We review your file with you before the sale.' },
    ],
    slot: {
      titel: 'Thinking of selling your property?',
      tekst: 'Let’s talk about your plans. We review your property and explain how we can support you with the sale.',
      knop: 'Offer my property',
      wa: 'Contact us on WhatsApp',
    },
  },

  // -------------------------------------------------------------------- FRANÇAIS
  fr: {
    meta: {
      title: 'Vendre votre bien immobilier au Maroc | Maghreb Estates',
      description: 'Vendez votre appartement, maison ou villa au Maroc avec Maghreb Estates. Estimation, présentation professionnelle et accompagnement jusqu’au notaire.',
      dienst: 'Accompagnement à la vente immobilière au Maroc',
      dienstBeschrijving: 'Accompagnement complet à la vente de biens à {steden} et dans leurs environs immédiats : estimation, photos et vidéo, mise en valeur, contacts acheteurs, visites, négociation et signature chez le notaire.',
    },
    steden: { Tanger: 'Tanger', Rabat: 'Rabat', Casablanca: 'Casablanca', Marrakech: 'Marrakech', Agadir: 'Agadir' },
    lijst: { komma: ', ', en: ' et ', of: ' ou ' },
    hero: {
      eyebrow: 'Vendre votre bien au Maroc',
      titel: 'Vendez votre bien immobilier au Maroc, <em>en toute confiance.</em>',
      sub: 'De l’estimation à la signature chez le notaire, Maghreb Estates vous accompagne à chaque étape de la vente, au Maroc comme depuis l’étranger.',
      estimatie: 'Faire estimer mon bien',
      whatsapp: 'Discuter sur WhatsApp',
      waBericht: 'Bonjour Maghreb Estates, je souhaite vendre mon bien au Maroc.',
      trust: ['Estimation argumentée', 'Photos et vidéo professionnelles', 'Acheteurs au Maroc et en Europe', 'Accompagnement jusqu’au notaire'],
    },
    kruimel: 'Vendre votre bien',
    aanmelden: {
      eyebrow: 'Estimation et mise en vente',
      titel: 'Parlez-nous de votre bien',
      intro: 'Vous envisagez de vendre votre appartement, maison ou villa ? Partagez quelques informations et nous vous recontactons pour discuter des possibilités.',
      werkgebiedTitel: 'Nos villes',
      werkgebiedTekst: 'Nous accompagnons la vente de biens dans ces cinq villes et leurs environs immédiats.',
      voordelen: [
        'Sans engagement tant qu’aucun mandat de vente n’est signé',
        'Honoraires fixés par écrit à l’avance',
        'En darija, français, arabe, amazigh, néerlandais ou anglais',
      ],
      direct: 'Vous préférez en parler directement ?',
      directWa: 'Écrivez-nous sur WhatsApp',
      directBel: 'ou appelez le',
    },
    form: {
      naam: 'Nom', naamPh: 'Votre nom',
      telefoon: 'Téléphone / WhatsApp', telefoonPh: '+212 6 … ou +33 6 …',
      stad: 'Ville du bien', stadKies: 'Choisissez la ville', stadOptie: '{stad} et environs',
      type: 'Type de bien', kies: 'Choisissez',
      types: ['Appartement', 'Maison / dar', 'Villa', 'Riad', 'Terrain', 'Local commercial', 'Autre'],
      meer: 'Ajouter des détails', optioneel: '(facultatif)',
      wijk: 'Quartier', wijkPh: 'Ex. Agdal, Malabata, Gauthier…',
      oppervlak: 'Surface approximative (m²)', oppervlakPh: 'Ex. 110',
      prijs: 'Prix souhaité', prijsPh: 'Ex. 1 500 000 MAD',
      email: 'Adresse e-mail', emailPh: 'vous@exemple.com',
      bericht: 'Informations complémentaires', berichtPh: 'État du bien, étage, délai de vente souhaité…',
      verplicht: 'Champs obligatoires',
      verstuur: 'Envoyer ma demande', bezig: 'Envoi en cours…',
      privacy: 'Vos coordonnées servent uniquement à vous recontacter au sujet de votre bien. Consultez notre {link}.',
      privacyLink: 'politique de confidentialité', privacyTaal: ' (en néerlandais)',
      validatie: 'Merci d’indiquer votre nom, votre téléphone, la ville et le type de bien.',
      bedankt: {
        titel: 'Merci, votre demande a bien été envoyée.',
        tekst: 'Nous vous recontactons pour parler de votre bien et des possibilités de vente.',
        wa: 'Vous avez des photos ou des documents ? Envoyez-les-nous sur WhatsApp.',
      },
      fout: {
        tekst: 'Votre demande n’a pas pu être envoyée. Vérifiez votre connexion et réessayez, ou envoyez-la-nous sur WhatsApp.',
        wa: 'Envoyer sur WhatsApp',
      },
    },
    bericht: {
      kop: 'Demande de vente via maghreb-estates.com', naam: 'Nom', telefoon: 'Téléphone / WhatsApp', email: 'E-mail',
      type: 'Type de bien', stad: 'Ville', wijk: 'Quartier', oppervlak: 'Surface (m²)', prijs: 'Prix souhaité', toelichting: 'Précisions',
    },
    waarom: {
      eyebrow: 'Pourquoi Maghreb Estates',
      titel: 'Pourquoi confier votre vente à Maghreb Estates ?',
      intro: 'Maghreb Estates est une agence immobilière enregistrée à Rabat. Nous prenons en charge toute la vente ; vous gardez chaque décision.',
      kaarten: [
        { titel: 'Une estimation argumentée', tekst: 'Nous analysons les biens comparables et les données du marché pour définir une stratégie de prix réaliste.' },
        { titel: 'Une présentation professionnelle', tekst: 'Photos, vidéos et annonces soignées pour mettre en valeur votre propriété.' },
        { titel: 'Une visibilité internationale', tekst: 'Nous présentons votre bien aux acheteurs au Maroc et à notre réseau en Europe.' },
        { titel: 'Un accompagnement complet', tekst: 'Un interlocuteur dédié pour les visites, la négociation et la coordination jusqu’au notaire.' },
      ],
    },
    werkwijze: {
      eyebrow: 'Notre méthode',
      titel: 'Comment se déroule la vente ?',
      stappen: [
        { titel: 'Premier contact', tekst: 'Vous nous présentez votre bien et vos objectifs.' },
        { titel: 'Estimation et préparation', tekst: 'Nous analysons le marché, le prix et les documents nécessaires.' },
        { titel: 'Mise en vente', tekst: 'Nous préparons les photos, vidéos et annonces pour présenter votre bien.' },
        { titel: 'Visites et négociation', tekst: 'Nous échangeons avec les acheteurs, organisons les visites et vous présentons les offres.' },
        { titel: 'Signature chez le notaire', tekst: 'Nous vous accompagnons dans la finalisation de la vente.' },
      ],
    },
    netwerk: {
      eyebrow: 'Notre réseau',
      titel: 'Votre bien visible au Maroc et en Europe',
      tekst: 'Grâce à notre présence locale et à notre réseau international, nous pouvons présenter votre bien à des acheteurs au Maroc ainsi qu’à des Marocains et investisseurs établis en Europe.',
      groepen: [
        { titel: 'Acheteurs au Maroc', tekst: 'Via les grands portails immobiliers marocains et notre réseau local.' },
        { titel: 'Marocains résidant en Europe', tekst: 'En France, en Belgique, aux Pays-Bas et ailleurs, à la recherche d’un logement au Maroc.' },
        { titel: 'Investisseurs internationaux', tekst: 'Qui nous consultent pour acheter ou investir au Maroc.' },
      ],
      kaartLabel: 'Carte : acheteurs au Maroc et en Europe', marokko: 'Maroc', europa: 'Europe',
    },
    prijzen: {
      eyebrow: 'Prix immobiliers au Maroc',
      titel: 'Combien vaut votre bien au Maroc ?',
      intro: 'Le prix d’un bien immobilier dépend de nombreux facteurs : la ville, le quartier, l’emplacement, la superficie et l’état du logement. Nous utilisons des données de marché pour vous aider à définir un prix de vente cohérent.',
      kaartType: 'Appartement · prix médian demandé', kaartN: '{n} annonces', eenheid: 'MAD/m²',
      disclaimer: 'Prix indicatifs issus d’annonces immobilières, et non des prix de vente définitifs.',
      bijgewerkt: 'Mise à jour : {datum} · {n} annonces de vente analysées.',
      analyse: 'Consulter notre analyse du marché immobilier',
      knop: 'Faire estimer mon bien',
      inStad: '{prijs} à {stad}',
    },
    homeBlok: { vraag: 'Vous êtes propriétaire et souhaitez vendre votre bien ?', link: 'Découvrir notre accompagnement à la vente' },
    faqTitel: 'Questions fréquentes sur la vente',
    faqs: [
      { q: 'Comment vendre un appartement au Maroc ?', a: 'En cinq étapes : fixer un prix réaliste à partir de biens comparables, mettre le dossier en ordre (titre de propriété, plan, documents du syndic), présenter le bien avec de bonnes photos et une vidéo, organiser des visites avec des acheteurs sérieux, puis négocier et signer l’acte chez le notaire. Nous prenons ces étapes en charge pour vous à {steden}.' },
      { q: 'Dans quelles villes intervenez-vous ?', a: 'À {steden}, et dans leurs environs immédiats. Nous connaissons ces marchés et pouvons être sur place rapidement. Nous ne prenons pas en vente les biens situés en dehors de cette zone.' },
      { q: 'Comment estimer le prix de mon bien ?', a: 'Nous comparons votre bien aux biens similaires de votre quartier : surface, étage, état, vue et titre de propriété. Nous nous appuyons sur les annonces que nous collectons sur les grands portails marocains. À titre indicatif, le prix médian demandé pour un appartement est de {prijzen} (annonces analysées jusqu’au {datum}). Ce sont des prix demandés, pas des prix de vente chez le notaire : l’estimation de votre bien tient compte de cet écart.' },
      { q: 'Quels sont les honoraires de Maghreb Estates ?', a: 'Ils dépendent du bien et de ce que vous nous confiez. Vous recevez à l’avance une proposition écrite avec nos honoraires et ce qu’ils couvrent, et nous ne commençons qu’avec votre accord. Si nous accompagnons aussi l’acheteur, nous le signalons aux deux parties à l’avance et précisons par écrit qui nous rémunère.' },
      { q: 'Puis-je vendre mon bien si je vis à l’étranger ?', a: 'Oui. Nous organisons sur place les photos, les visites et les échanges avec les acheteurs, et nous vous tenons informé à distance. Pour la signature, il est en général possible de donner une procuration à une personne de confiance. Sa forme exacte (notaire, consulat, légalisation) dépend de votre situation et doit être validée par le notaire chargé de la vente.' },
      { q: 'Quels documents sont nécessaires pour vendre ?', a: 'En général : votre pièce d’identité, le titre de propriété (pour un bien titré, un certificat de propriété récent), le plan et, pour un appartement, les documents du syndic. Le notaire demande aussi des attestations fiscales, comme le paiement de la taxe de services communaux, et le cas échéant la mainlevée d’hypothèque. La liste exacte dépend du bien : nous la vérifions avec vous avant la mise en vente.' },
      { q: 'Combien de temps prend une vente immobilière ?', a: 'Cela dépend du prix, de l’emplacement, de l’état du bien et du dossier. Nous ne promettons pas de délai. Une fois l’acheteur trouvé, comptez en général de quelques semaines à quelques mois pour le compromis, les documents et la signature chez le notaire. Nous vous tenons informé à chaque étape.' },
      { q: 'Puis-je vendre un bien sans titre foncier ?', a: 'Souvent oui, mais cela demande plus de préparation. Un bien sous melkia ou avec une réquisition en cours peut en principe être vendu. Les conditions, les délais et l’effet sur le prix dépendent du dossier et doivent être confirmés par un notaire ou un adoul. Nous examinons votre dossier avec vous avant la mise en vente.' },
    ],
    slot: {
      titel: 'Vous envisagez de vendre votre bien ?',
      tekst: 'Parlons de votre projet. Nous étudions votre bien et vous expliquons comment nous pouvons vous accompagner dans sa vente.',
      knop: 'Proposer mon bien',
      wa: 'Nous contacter sur WhatsApp',
    },
  },

  // -------------------------------------------------------------------- العربية
  ar: {
    meta: {
      title: 'بيع عقار في المغرب | Maghreb Estates',
      description: 'بِع شقتك أو منزلك أو فيلتك في المغرب مع Maghreb Estates: تقييم، وعرض احترافي، ومرافقة حتى التوقيع لدى الموثق.',
      dienst: 'مرافقة بيع العقارات في المغرب',
      dienstBeschrijving: 'مرافقة كاملة لبيع العقارات في {steden} ونواحيها القريبة: التقييم، التصوير والفيديو، العرض، التواصل مع المشترين، الزيارات، التفاوض ونقل الملكية لدى الموثق.',
    },
    steden: { Tanger: 'طنجة', Rabat: 'الرباط', Casablanca: 'الدار البيضاء', Marrakech: 'مراكش', Agadir: 'أكادير' },
    lijst: { komma: '، ', en: ' و', of: ' أو ' },
    hero: {
      eyebrow: 'بيع عقارك في المغرب',
      titel: 'بِع عقارك في المغرب <em>بكل ثقة.</em>',
      sub: 'من التقييم حتى التوقيع لدى الموثق، ترافقك Maghreb Estates في كل مرحلة من مراحل البيع، سواء كنت في المغرب أو خارجه.',
      estimatie: 'اطلب تقييم عقاري',
      whatsapp: 'تحدث معنا على واتساب',
      waBericht: 'السلام عليكم Maghreb Estates، أرغب في بيع عقاري في المغرب.',
      trust: ['تقييم مبني على بيانات السوق', 'صور وفيديو احترافية', 'مشترون في المغرب وأوروبا', 'مرافقة حتى الموثق'],
    },
    kruimel: 'بيع عقارك',
    aanmelden: {
      eyebrow: 'التقييم وعرض العقار للبيع',
      titel: 'حدّثنا عن عقارك',
      intro: 'هل تفكر في بيع شقتك أو منزلك أو فيلتك؟ شاركنا بعض المعلومات وسنتواصل معك لمناقشة الإمكانيات المتاحة.',
      werkgebiedTitel: 'مدننا',
      werkgebiedTekst: 'نرافق بيع العقارات في هذه المدن الخمس ونواحيها القريبة.',
      voordelen: [
        'دون أي التزام ما لم توقّع عقد تفويض البيع',
        'أتعاب محددة كتابياً مسبقاً',
        'بالدارجة أو الفرنسية أو العربية أو الأمازيغية أو الهولندية أو الإنجليزية',
      ],
      direct: 'تفضل التواصل المباشر؟',
      directWa: 'راسلنا على واتساب',
      directBel: 'أو اتصل على',
    },
    form: {
      naam: 'الاسم', naamPh: 'اسمك',
      telefoon: 'الهاتف / واتساب', telefoonPh: '+212 6 …',
      stad: 'مدينة العقار', stadKies: 'اختر المدينة', stadOptie: '{stad} ونواحيها',
      type: 'نوع العقار', kies: 'اختر',
      types: ['شقة', 'منزل / دار', 'فيلا', 'رياض', 'أرض', 'محل تجاري', 'آخر'],
      meer: 'إضافة تفاصيل', optioneel: '(اختياري)',
      wijk: 'الحي', wijkPh: 'مثال: أكدال، مالاباطا، المعاريف…',
      oppervlak: 'المساحة التقريبية (م²)', oppervlakPh: 'مثال: 110',
      prijs: 'السعر المرغوب', prijsPh: 'مثال: 1.500.000 درهم',
      email: 'البريد الإلكتروني', emailPh: 'you@email.com',
      bericht: 'معلومات إضافية', berichtPh: 'حالة العقار، الطابق، متى ترغب في البيع…',
      verplicht: 'حقول إلزامية',
      verstuur: 'أرسل طلبي', bezig: 'جارٍ الإرسال…',
      privacy: 'نستخدم معلوماتك فقط للتواصل معك بشأن عقارك. اطّلع على {link}.',
      privacyLink: 'سياسة الخصوصية', privacyTaal: ' (بالهولندية)',
      validatie: 'يرجى إدخال الاسم ورقم الهاتف والمدينة ونوع العقار.',
      bedankt: {
        titel: 'شكراً، تم إرسال طلبك.',
        tekst: 'سنتواصل معك لمناقشة عقارك وإمكانيات بيعه.',
        wa: 'لديك صور أو وثائق؟ أرسلها إلينا عبر واتساب.',
      },
      fout: {
        tekst: 'تعذّر إرسال طلبك. تحقق من اتصالك وأعد المحاولة، أو أرسله إلينا عبر واتساب.',
        wa: 'أرسل عبر واتساب',
      },
    },
    bericht: {
      kop: 'طلب بيع عبر maghreb-estates.com', naam: 'الاسم', telefoon: 'الهاتف / واتساب', email: 'البريد',
      type: 'نوع العقار', stad: 'المدينة', wijk: 'الحي', oppervlak: 'المساحة (م²)', prijs: 'السعر المرغوب', toelichting: 'ملاحظات',
    },
    waarom: {
      eyebrow: 'لماذا Maghreb Estates',
      titel: 'لماذا تعهد ببيع عقارك إلى Maghreb Estates؟',
      intro: 'Maghreb Estates وكالة عقارية مسجلة في الرباط. نتكفل بعملية البيع كاملة، ويبقى القرار لك في كل خطوة.',
      kaarten: [
        { titel: 'تقييم مبني على بيانات السوق', tekst: 'نحلل العقارات المماثلة وبيانات السوق لتحديد استراتيجية سعر واقعية.' },
        { titel: 'عرض احترافي', tekst: 'صور وفيديو وإعلانات متقنة تُبرز عقارك في أفضل صورة.' },
        { titel: 'حضور دولي', tekst: 'نعرض عقارك على المشترين في المغرب وعلى شبكتنا في أوروبا.' },
        { titel: 'مرافقة كاملة', tekst: 'مخاطَب واحد للزيارات والتفاوض والتنسيق حتى التوقيع لدى الموثق.' },
      ],
    },
    werkwijze: {
      eyebrow: 'طريقة عملنا',
      titel: 'كيف تتم عملية البيع؟',
      stappen: [
        { titel: 'أول تواصل', tekst: 'تعرّفنا على عقارك وأهدافك.' },
        { titel: 'التقييم والتحضير', tekst: 'نحلل السوق والسعر والوثائق اللازمة.' },
        { titel: 'عرض العقار للبيع', tekst: 'نُعدّ الصور والفيديو والإعلانات لعرض عقارك.' },
        { titel: 'الزيارات والتفاوض', tekst: 'نتواصل مع المشترين، وننظم الزيارات، ونعرض عليك العروض.' },
        { titel: 'التوقيع لدى الموثق', tekst: 'نرافقك في إتمام عملية البيع.' },
      ],
    },
    netwerk: {
      eyebrow: 'شبكتنا',
      titel: 'عقارك معروض في المغرب وأوروبا',
      tekst: 'بفضل حضورنا المحلي وشبكتنا الدولية، نستطيع عرض عقارك على مشترين في المغرب، وعلى مغاربة ومستثمرين مقيمين في أوروبا.',
      groepen: [
        { titel: 'مشترون في المغرب', tekst: 'عبر أكبر المنصات العقارية المغربية وشبكتنا المحلية.' },
        { titel: 'مغاربة مقيمون في أوروبا', tekst: 'في فرنسا وبلجيكا وهولندا وغيرها، يبحثون عن مسكن في المغرب.' },
        { titel: 'مستثمرون دوليون', tekst: 'يستشيروننا للشراء أو الاستثمار في المغرب.' },
      ],
      kaartLabel: 'خريطة: مشترون في المغرب وأوروبا', marokko: 'المغرب', europa: 'أوروبا',
    },
    prijzen: {
      eyebrow: 'أسعار العقار في المغرب',
      titel: 'كم يساوي عقارك في المغرب؟',
      intro: 'يتوقف سعر العقار على عوامل كثيرة: المدينة، والحي، والموقع، والمساحة، وحالة المسكن. نعتمد على بيانات السوق لنساعدك على تحديد سعر بيع منطقي.',
      kaartType: 'شقة · السعر الوسيط المطلوب', kaartN: '{n} إعلاناً', eenheid: 'درهم/م²',
      disclaimer: 'أسعار تقريبية مأخوذة من إعلانات عقارية، وليست أسعار بيع نهائية.',
      bijgewerkt: 'آخر تحديث: {datum} · {n} إعلان بيع محلَّل.',
      analyse: 'اطّلع على تحليلنا لسوق العقار',
      knop: 'اطلب تقييم عقاري',
      inStad: '{prijs} في {stad}',
    },
    homeBlok: { vraag: 'هل أنت مالك وترغب في بيع عقارك؟', link: 'اكتشف خدمة مرافقة البيع' },
    faqTitel: 'أسئلة شائعة حول البيع',
    faqs: [
      { q: 'كيف أبيع شقة في المغرب؟', a: 'في خمس مراحل: تحديد سعر واقعي انطلاقاً من عقارات مماثلة، وتنظيم الملف (سند الملكية، التصميم، وثائق السانديك)، وعرض العقار بصور وفيديو جيدة، وتنظيم زيارات مع مشترين جادين، ثم التفاوض وتوقيع العقد لدى الموثق. نتكفل بهذه المراحل نيابة عنك في {steden}.' },
      { q: 'في أي مدن تعملون؟', a: 'في {steden} ونواحيها القريبة. نعرف هذه الأسواق جيداً ونستطيع الحضور بسرعة. لا نقبل بيع عقارات خارج هذه المنطقة.' },
      { q: 'كيف أقدّر سعر عقاري؟', a: 'نقارن عقارك بعقارات مماثلة في حيّك: المساحة، والطابق، والحالة، والإطلالة، وسند الملكية، ونعتمد على الإعلانات التي نجمعها من أكبر المنصات المغربية. على سبيل الإشارة، يبلغ السعر الوسيط المطلوب للشقة {prijzen} (إعلانات محللة حتى {datum}). هذه أسعار مطلوبة وليست أسعار بيع لدى الموثق، ويأخذ تقييم عقارك هذا الفرق بعين الاعتبار.' },
      { q: 'ما هي أتعاب Maghreb Estates؟', a: 'تتوقف على العقار وعلى ما تفوّضه لنا. تتلقى مسبقاً عرضاً مكتوباً بالأتعاب وما تشمله، ولا نبدأ إلا بعد موافقتك. وإذا كنا نرافق المشتري أيضاً، نُخبر الطرفين بذلك مسبقاً ونحدد كتابياً من يدفع لنا.' },
      { q: 'هل يمكنني بيع عقاري إذا كنت أقيم خارج المغرب؟', a: 'نعم. ننظم في عين المكان التصوير والزيارات والتواصل مع المشترين، ونطلعك على كل شيء عن بُعد. وللتوقيع يمكن في الغالب منح وكالة لشخص تثق به. ويتوقف شكلها (لدى موثق أو قنصلية، مع المصادقة) على وضعك، ويجب أن يؤكده الموثق المكلف بالبيع.' },
      { q: 'ما هي الوثائق اللازمة للبيع؟', a: 'في الغالب: بطاقة التعريف، وسند الملكية (شهادة ملكية حديثة بالنسبة لعقار محفّظ)، والتصميم، ووثائق السانديك بالنسبة للشقة. ويطلب الموثق أيضاً شهادات ضريبية، منها ما يثبت أداء الرسم على الخدمات الجماعية، وعند الاقتضاء رفع اليد عن الرهن. تختلف اللائحة حسب العقار، ونراجعها معك قبل عرضه للبيع.' },
      { q: 'كم تستغرق عملية بيع العقار؟', a: 'يتوقف ذلك على السعر والموقع وحالة العقار والملف، ولا نَعِد بمدة محددة. بعد العثور على المشتري، احسب في الغالب من بضعة أسابيع إلى بضعة أشهر للوعد بالبيع والوثائق والتوقيع لدى الموثق. ونطلعك على كل مرحلة.' },
      { q: 'هل يمكنني بيع عقار بدون رسم عقاري؟', a: 'في الغالب نعم، لكن ذلك يتطلب تحضيراً أكثر. يمكن مبدئياً بيع عقار بعقد ملكية أو بمطلب تحفيظ قيد الإنجاز، لكن الشروط والآجال وأثر ذلك على السعر تتوقف على الملف، ويجب أن يؤكدها موثق أو عدول. ندرس ملفك معك قبل عرض العقار للبيع.' },
    ],
    slot: {
      titel: 'هل تفكر في بيع عقارك؟',
      tekst: 'لنتحدث عن مشروعك. ندرس عقارك ونشرح لك كيف يمكننا مرافقتك في بيعه.',
      knop: 'اعرض عقاري',
      wa: 'تواصل معنا على واتساب',
    },
  },
};
