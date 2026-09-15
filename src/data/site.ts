// Centrale site-configuratie. Eén bron van waarheid voor NAP, nav en contact.
export const site = {
  naam: 'Maghreb Estates',
  url: 'https://maghreb-estates.com',
  tagline: 'International real estate advisory in Morocco — buying, investment, management and sales.',
  telefoon: '+31 6 83 49 87 15',
  telefoonHref: '+31683498715',
  email: 'a.douider@maghreb-estates.com',
  whatsapp: '31683498715',
  land: 'NL',
  // TODO: replace logo with transparent-background version from Canva.
  logo: '/images/logo.png',
  ogImage: '/images/villa5.jpg',
  // Entity SEO: vul social-/profiel-URL's aan zodra beschikbaar (Instagram, LinkedIn,
  // Facebook, YouTube, Google Business Profile). Leeg laten is beter dan verzinnen.
  sameAs: [] as string[],
  oprichting: 2024,
  // Bedrijfsgegevens — officiële Marokkaanse inschrijving (SARL, ingeschreven bij de
  // rechtbank van Rabat, geïmmatriculeerd 03-05-2026). Leeg = niet tonen (geen nepdata).
  vestigingsplaats: 'Rabat, Marokko',
  adres: 'N°48 Appt 1, Avenue Fal Ouled Oumeir, Agdal', // straat + wijk (Rabat)
  rechtsvorm: 'SARL', // Société à Responsabilité Limitée (besloten vennootschap)
  activiteit: 'Agence immobilière',
  rc: '199575',            // Registre de Commerce (Tribunal de Commerce, Rabat)
  ice: '003968179000032',  // Identifiant Commun de l'Entreprise
  kapitaal: '100.000 MAD',
};

// WhatsApp-linkhelper (optioneel voorgevuld bericht).
export const waLink = (bericht = '', nummer = site.whatsapp) =>
  `https://wa.me/${nummer}${bericht ? `?text=${encodeURIComponent(bericht)}` : ''}`;

// Team — vast aanspreekpunt. Rol bewust internationaal geformuleerd.
// TODO: LinkedIn-URL toevoegen zodra bekend.
// Het portret staat op 900x1350 (2:3). Het origineel op volle resolutie staat
// in ../fotos-aangeleverd/portretten-origineel/.
export const team = [
  {
    naam: 'Ayoub Douider',
    rol: 'Founder & Real Estate Advisor',
    foto: '/images/ayoub.jpg',
    telefoon: '+31 6 83 49 87 15',
    telefoonHref: '+31683498715',
    whatsapp: '31683498715',
    email: 'a.douider@maghreb-estates.com',
    linkedin: '',
    bio: 'Ayoub is founder van Maghreb Estates en begeleidt klanten bij aankoopstrategie, objectanalyse en investeringskeuzes. Zijn focus ligt op structuur, transparantie en datagedreven besluitvorming.',
  },
];

// Tekst onder het teamprofiel — benoemt het bredere netwerk achter het vaste
// aanspreekpunt (homepage + over-ons gebruiken dezelfde formulering).
export const teamNetwerk =
  'Naast onze vaste aanspreekpunten werken wij met lokale partners en specialisten voor onder meer bezichtigingen, dossiercontrole, notariële afstemming, beheer en projectopvolging.';

// De 7 prominente steden (rijke pagina's + footer).
export const prominenteSteden = [
  { naam: 'Tanger', slug: 'tanger' },
  { naam: 'Casablanca', slug: 'casablanca' },
  { naam: 'Rabat', slug: 'rabat' },
  { naam: 'Marrakech', slug: 'marrakech' },
  { naam: 'Agadir', slug: 'agadir' },
  { naam: 'Nador', slug: 'nador' },
  { naam: 'Al Hoceima', slug: 'al-hoceima' },
];

// De 5 markten die we in de hoofdbeleving tonen (homepage + footer). Bewust kort:
// de volledige stedenlijst leeft op /vastgoed-marokko/ en in de sitemap.
export const homeMarkten = prominenteSteden.slice(0, 5);

// Hoofdnavigatie — bewust rustig, als een advieskantoor en niet als een
// SEO-kennisbank. Vier routes, maximaal 2 submenu-items per route.
// Ondersteunende en long-tail SEO-pagina's (kennisbank, stadspagina's,
// juridische gidsen, vastgoedbeheer) blijven volledig indexeerbaar en zijn
// bereikbaar via de footer, "Verder lezen"-blokken, /vastgoed-marokko/ en de
// sitemap — maar niet via het hoofdmenu.
// Beheer & verhuur staat bewust niet in het menu zolang die dienst nog niet
// operationeel is; zie /vastgoedbeheer-marokko/.
export const nav = [
  {
    label: 'Vastgoed kopen',
    href: '/aankoopbegeleiding-vastgoed-marokko/',
    children: [
      { label: 'Aankoopbegeleiding', href: '/aankoopbegeleiding-vastgoed-marokko/' },
      { label: 'Nieuwbouw & off-plan', href: '/nieuwbouw-vastgoed-marokko/' },
    ],
  },
  {
    label: 'Investeren',
    href: '/investeren-vastgoed-marokko/',
    children: [
      { label: 'Investeringsadvies', href: '/investeren-vastgoed-marokko/' },
      { label: 'Steden & markt', href: '/beste-stad-investeren-vastgoed-marokko/' },
    ],
  },
  { label: 'Over ons', href: '/over-ons/' },
  { label: 'Contact', href: '/contact/' },
];

// Juridische pagina's (footer).
export const legal = [
  { label: 'Privacybeleid', href: '/privacybeleid/' },
  { label: 'Algemene voorwaarden', href: '/algemene-voorwaarden/' },
  { label: 'Disclaimer', href: '/disclaimer/' },
];

// CTA-varianten. Twee vaste routes, sitebreed consistent:
//   1. Adviesgesprek → /adviesgesprek/ (kalender + tijdslot)
//   2. Objectanalyse → /contact/ (woninglink, project of documenten sturen)
export const ctas = {
  advies: { label: 'Plan adviesgesprek', href: '/adviesgesprek/' },
  controle: { label: 'Laat een object analyseren', href: '/contact/?doel=objectanalyse' },
  checklist: { label: 'Ontvang de checklist', href: '/checklist-vastgoed-marokko/' },
  analyse: { label: 'Vraag investeringsanalyse aan', href: '/contact/?doel=investeringsanalyse' },
};
