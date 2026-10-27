// Meertaligheid — configuratie en URL-structuur.
//
// Nederlands blijft op de root staan (/, /huis-kopen-marokko/, ...). Dat is
// bewust: die URL's zijn geïndexeerd en gelinkt, en verplaatsen naar /nl/ zou
// alle bestaande posities weggooien voor niets.
//
// De vertalingen leven onder een taalprefix: /en/, /fr/ en /ar/.
//
// Vertaald wordt de commerciële kern — wat een internationale koper nodig heeft
// om te begrijpen wat wij doen en contact op te nemen. De Nederlandse
// long-tailpagina's (kopen vanuit Nederland, begrippenlijst, stadspagina's,
// kennisbank) blijven Nederlandstalig: die bestaan om op Nederlandse
// zoekopdrachten te ranken en hebben in het Frans, Engels of Arabisch geen
// zoekvolume dat de vertaling rechtvaardigt.

export const talen = ['nl', 'en', 'fr', 'ar'] as const;
export type Taal = (typeof talen)[number];

export const standaardTaal: Taal = 'nl';

/** Talen die van rechts naar links lezen. */
export const rtlTalen: Taal[] = ['ar'];
export const isRtl = (taal: Taal) => rtlTalen.includes(taal);

/** Waarde voor <html lang> en voor hreflang. */
export const htmlLang: Record<Taal, string> = {
  nl: 'nl',
  en: 'en',
  fr: 'fr',
  ar: 'ar',
};

/** Label in de taalwisselaar — altijd in de eigen taal geschreven. */
export const taalNaam: Record<Taal, string> = {
  nl: 'Nederlands',
  en: 'English',
  fr: 'Français',
  ar: 'العربية',
};

/** Korte code voor de compacte wisselaar. */
export const taalCode: Record<Taal, string> = {
  nl: 'NL',
  en: 'EN',
  fr: 'FR',
  ar: 'AR',
};

/**
 * Paginaregister: per pagina het pad in elke taal.
 *
 * De sleutel is taalonafhankelijk en verbindt de vertalingen met elkaar. Dat is
 * precies wat hreflang nodig heeft: zoekmachines moeten weten dat /en/about/ en
 * /over-ons/ dezelfde pagina in een andere taal zijn.
 *
 * Slugs zijn per taal betekenisvol (Frans en Engels). Onder /ar/ gebruiken we
 * bewust Latijnse slugs in plaats van Arabisch schrift: Arabische URL's worden
 * percent-encoded, wat ze onleesbaar maakt in analytics, sitemaps en gedeelde
 * links. De paginatitels en de volledige inhoud zijn uiteraard wel Arabisch.
 */
export const paginas = {
  home: {
    nl: '/',
    en: '/en/',
    fr: '/fr/',
    ar: '/ar/',
  },
  aankoopbegeleiding: {
    nl: '/aankoopbegeleiding-vastgoed-marokko/',
    en: '/en/buying-guidance/',
    fr: '/fr/accompagnement-achat/',
    ar: '/ar/buying-guidance/',
  },
  investeren: {
    nl: '/investeren-vastgoed-marokko/',
    en: '/en/property-investment/',
    fr: '/fr/investissement-immobilier/',
    ar: '/ar/property-investment/',
  },
  nieuwbouw: {
    nl: '/nieuwbouw-vastgoed-marokko/',
    en: '/en/new-build-off-plan/',
    fr: '/fr/neuf-et-vefa/',
    ar: '/ar/new-build-off-plan/',
  },
  kopen: {
    nl: '/huis-kopen-marokko/',
    en: '/en/buying-property-in-morocco/',
    fr: '/fr/acheter-un-bien-au-maroc/',
    ar: '/ar/buying-property-in-morocco/',
  },
  kosten: {
    nl: '/kosten-huis-kopen-marokko/',
    en: '/en/purchase-costs/',
    fr: '/fr/frais-d-acquisition/',
    ar: '/ar/purchase-costs/',
  },
  overOns: {
    nl: '/over-ons/',
    en: '/en/about-us/',
    fr: '/fr/a-propos/',
    ar: '/ar/about-us/',
  },
  contact: {
    nl: '/contact/',
    en: '/en/contact/',
    fr: '/fr/contact/',
    ar: '/ar/contact/',
  },
  adviesgesprek: {
    nl: '/adviesgesprek/',
    en: '/en/consultation/',
    fr: '/fr/rendez-vous-conseil/',
    ar: '/ar/consultation/',
  },
  verkopen: {
    nl: '/huis-verkopen-marokko/',
    en: '/en/sell-your-property/',
    fr: '/fr/vendre-votre-bien/',
    ar: '/ar/sell-your-property/',
  },
} as const;

export type PaginaSleutel = keyof typeof paginas;

/** Alle vertalingen van een pagina, voor hreflang en de taalwisselaar. */
export const alternatieven = (sleutel: PaginaSleutel) => paginas[sleutel];

/** Zoek de paginasleutel bij een pad. Nodig om hreflang op de NL-pagina's te zetten. */
export function sleutelVoorPad(pad: string): PaginaSleutel | undefined {
  return (Object.keys(paginas) as PaginaSleutel[]).find((s) =>
    (Object.values(paginas[s]) as string[]).includes(pad),
  );
}

/** De niet-Nederlandse talen; gebruikt in getStaticPaths. */
export const vertaalTalen = talen.filter((t) => t !== standaardTaal) as Exclude<Taal, 'nl'>[];
