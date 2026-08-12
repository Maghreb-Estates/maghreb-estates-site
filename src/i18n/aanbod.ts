// Meertaligheid voor het vastgoedaanbod (/aanbod/ en /{lang}/properties/).
//
// URL's: Nederlands blijft op /aanbod/ (geïndexeerd, ongewijzigd). EN/FR/AR
// delen bewust het segment "properties" onder hun taalprefix, zodat er per
// niveau precies één dynamische route nodig is (hub, stad, project) i.p.v. een
// eigen mappenboom per taal. De inhoud is uiteraard wél volledig vertaald.

import { htmlLang, standaardTaal, talen, type Taal } from './config';
import { site } from '../data/site';

export const aanbodBasis: Record<Taal, string> = {
  nl: '/aanbod',
  en: '/en/properties',
  fr: '/fr/properties',
  ar: '/ar/properties',
};

export const aanbodHubPad = (taal: Taal) => `${aanbodBasis[taal]}/`;
export const aanbodStadPad = (taal: Taal, stad: string) => `${aanbodBasis[taal]}/${stad}/`;
export const aanbodProjectPad = (taal: Taal, stad: string, slug: string) =>
  `${aanbodBasis[taal]}/${stad}/${slug}/`;

type Soort =
  | { soort: 'hub' }
  | { soort: 'stad'; stad: string }
  | { soort: 'project'; stad: string; slug: string };

/** hreflang-alternates + x-default (naar het Nederlands) voor een aanbod-pagina. */
export function aanbodAlternates(s: Soort) {
  const pad = (t: Taal) =>
    s.soort === 'hub'
      ? aanbodHubPad(t)
      : s.soort === 'stad'
        ? aanbodStadPad(t, s.stad)
        : aanbodProjectPad(t, s.stad, s.slug);
  return {
    alternates: talen.map((t) => ({ lang: htmlLang[t], href: new URL(pad(t), site.url).href })),
    xDefault: new URL(pad(standaardTaal), site.url).href,
  };
}

// ---------------------------------------------------------------------------
// UI-chrome per taal (labels, koppen, knoppen). Projecttekst staat apart in
// ../data/projectenVertaling.ts.
// ---------------------------------------------------------------------------

export interface AanbodUi {
  land: string;                         // "Marokko" / "Morocco" / "Maroc" / "المغرب"
  aanbod: string;                       // nav-/breadcrumblabel
  alleProjecten: string;
  bekijkProject: string;
  prijsOpAanvraag: string;
  vanaf: string;                        // "Vanaf" / "From" / "À partir de" / "ابتداءً من"
  bekijkAlleFotos: string;
  fotos: string;                        // "foto's" / "photos" / "photos" / "صور"
  openGalerij: string;
  vorige: string;
  volgende: string;
  sluiten: string;
  toonKaartVan: string;                 // "Toon kaart van"
  kaartSub: string;
  openInMaps: string;
  ligging: string;
  voorzieningen: string;
  projectomschrijving: string;
  woningtypen: string;
  over: string;                         // "Over" / "About" / "À propos de" / "عن"
  vraagProjectinfo: string;
  directWhatsapp: string;
  developerNote: (dev: string) => string;
  interesseIn: (naam: string) => string;
  meerAanbod: string;
  bekijkOokProjecten: string;
  filterAlle: string;
  filterAria: string;
  veegProjecten: string;                // slider-hint

  // Hub
  hub: {
    title: string; description: string; eyebrow: string; h1: string; sub: string;
    intro1: string; intro2: string;
    projectenEyebrow: string; projectenTitel: string; projectenSub: string;
    bekijkAlleInStad: (stad: string) => string;
    contextTitel: string; contextTekst: string;
    faqs: { q: string; a: string }[];
    faqTitel: string;
  };

  // Stad
  stad: {
    title: (stad: string) => string; description: (stad: string, projecten: string) => string;
    eyebrowRegio: (regio: string) => string; h1: (stad: string) => string;
    sub: (invalshoek: string, aantal: string, stad: string) => string;
    projectenTitel: (stad: string) => string;
    achtergrond: (stad: string) => string;         // link naar informatie-pagina (alleen NL)
    specifiekObject: (stad: string) => string;
    specifiekObjectTekst: string;
    stuurObject: string;
    faqTitel: (stad: string) => string;
    ditProject: string; dezeProjecten: (n: number) => string;
  };

  // Detail
  detail: {
    title: (naam: string, stad: string) => string;
    ctaTekst: (naam: string) => string;
    slotTitel: string; slotTekst: string;
  };

  // Afsluitende CTA-band (vervangt LeadCta op vertaalde pagina's)
  slotCtaTitel: string;
  slotCtaTekst: string;
  planAdvies: string;
  laatBeoordelen: string;
}

const nl: AanbodUi = {
  land: 'Marokko',
  aanbod: 'Aanbod', alleProjecten: 'Alle projecten', bekijkProject: 'Bekijk project',
  prijsOpAanvraag: 'Prijs op aanvraag', vanaf: 'Vanaf',
  bekijkAlleFotos: "Bekijk alle foto's", fotos: "foto's", openGalerij: 'open galerij',
  vorige: 'Vorige foto', volgende: 'Volgende foto', sluiten: 'Galerij sluiten',
  toonKaartVan: 'Toon kaart van', kaartSub: 'Google Maps laadt na een klik',
  openInMaps: 'Open de locatie in Google Maps',
  ligging: 'Ligging', voorzieningen: 'Voorzieningen', projectomschrijving: 'Projectomschrijving',
  woningtypen: 'Woningtypen', over: 'Over', vraagProjectinfo: 'Vraag projectinformatie aan',
  directWhatsapp: 'Direct via WhatsApp',
  developerNote: (dev) => `Projectinformatie op basis van gegevens van ontwikkelaar ${dev}. Prijzen, oppervlakten en beschikbaarheid bevestigen wij per woningtype bij de bron voordat u een keuze maakt.`,
  interesseIn: (n) => `Interesse in ${n}? Wij sturen u vrijblijvend de beschikbare projectinformatie en beantwoorden uw vragen.`,
  meerAanbod: 'Meer aanbod', bekijkOokProjecten: 'Bekijk ook deze projecten',
  filterAlle: 'Alle projecten', filterAria: 'Filter op stad', veegProjecten: 'Veeg voor meer projecten',
  hub: {
    title: 'Vastgoedaanbod in Marokko | Projecten in Marrakech & Tanger | Maghreb Estates',
    description: "Ontdek geselecteerde vastgoedprojecten van Maghreb Estates in Marrakech en Tanger. Bekijk foto's, ligging en projectinformatie en vraag vrijblijvend meer informatie aan.",
    eyebrow: 'Vastgoedaanbod', h1: 'Vastgoed te koop<br /><em>in Marokko</em>',
    sub: 'Een selectie van vastgoedprojecten die wij begeleiden in Marrakech en Tanger. Van oriëntatie tot overdracht staat Maghreb Estates naast u — onafhankelijk en meertalig.',
    intro1: 'Maghreb Estates begeleidt de aankoop van geselecteerde vastgoedprojecten in Marokko. Wij zijn geen projectontwikkelaar, maar uw onafhankelijke aanspreekpunt: wij verzamelen projecten van betrouwbare lokale ontwikkelaars, controleren de gegevens en begeleiden u van de eerste oriëntatie tot en met de overdracht bij de notaris.',
    intro2: 'Ons aanbod is bewust compact en groeit stap voor stap. Elk project beoordelen wij op locatie, prijs, papieren en verhuurbaarheid. Hieronder vindt u de projecten die wij op dit moment begeleiden, in Marrakech en Tanger.',
    projectenEyebrow: 'Beschikbare projecten', projectenTitel: 'Onze <em>projecten</em> in Marokko',
    projectenSub: "Filter op stad of bekijk alle projecten. Klik een project aan voor foto's, ligging en volledige informatie.",
    bekijkAlleInStad: (s) => `Bekijk alle projecten in ${s}`,
    contextTitel: 'Vastgoed kopen in Marokko met begeleiding',
    contextTekst: 'De Marokkaanse markt is lokaal en versnipperd: prijzen, kwaliteit en juridische situatie verschillen sterk per stad, wijk en ontwikkelaar. Juist bij nieuwbouw- en projectwoningen voegt onafhankelijke begeleiding waarde toe. Wij helpen u de juiste vragen te stellen: klopt de prijs met de markt, zijn de papieren in orde en hoe realistisch is de verhuurpotentie?',
    faqTitel: 'Veelgestelde vragen over ons vastgoedaanbod',
    faqs: [
      { q: 'Welke vastgoedprojecten biedt Maghreb Estates aan?', a: 'Wij begeleiden op dit moment de aankoop van geselecteerde projecten in Marrakech en Tanger. Ons aanbod groeit doordat wij samenwerken met lokale ontwikkelaars.' },
      { q: 'Kan ik als buitenlandse koper een appartement in deze projecten kopen?', a: 'Ja. Buitenlandse kopers kunnen vrijwel overal in Marokko kopen, ook op afstand met een volmacht. Wij controleren de eigendomstitel, het koopcontract en de betalingsroute.' },
      { q: 'Zijn de getoonde prijzen definitief?', a: 'Prijzen en beschikbaarheid verschillen per woningtype en fase en kunnen wijzigen. Waar wij een prijs tonen, komt die van de ontwikkelaar; wij bevestigen die altijd voordat u een keuze maakt.' },
    ],
  },
  stad: {
    title: (s) => `Vastgoed te koop in ${s} | Projecten | Maghreb Estates`,
    description: (s, p) => `Bekijk het vastgoedaanbod van Maghreb Estates in ${s}: ${p}. Foto's, ligging en projectinformatie, met onafhankelijke begeleiding.`,
    eyebrowRegio: (r) => `Aanbod in ${r}`, h1: (s) => `Vastgoed te koop<br /><em>in ${s}</em>`,
    sub: (inv, aantal, s) => `${inv} Bekijk ${aantal} die wij in ${s} begeleiden.`,
    projectenTitel: (s) => s,
    achtergrond: (s) => `vastgoed kopen in ${s}`,
    specifiekObject: (s) => `Een specifiek object in ${s} op het oog?`,
    specifiekObjectTekst: 'Ook buiten ons eigen aanbod helpen wij u. Stuur ons de link of documenten, dan controleren wij het dossier en de prijs.',
    stuurObject: 'Stuur een object ter controle',
    faqTitel: (s) => `Veelgestelde vragen over vastgoed in ${s}`,
    ditProject: 'dit project', dezeProjecten: (n) => `deze ${n} projecten`,
  },
  detail: {
    title: (n, s) => `${n} in ${s} | Vastgoed | Maghreb Estates`,
    ctaTekst: (n) => `Interesse in ${n}? Wij sturen u vrijblijvend de beschikbare projectinformatie en beantwoorden uw vragen.`,
    slotTitel: '', slotTekst: '',
  },
  slotCtaTitel: 'Klaar voor de volgende stap?',
  slotCtaTekst: 'Plan een vrijblijvend adviesgesprek of laat een object beoordelen door Maghreb Estates.',
  planAdvies: 'Plan adviesgesprek', laatBeoordelen: 'Laat een object beoordelen',
};

const en: AanbodUi = {
  land: 'Morocco',
  aanbod: 'Properties', alleProjecten: 'All properties', bekijkProject: 'View project',
  prijsOpAanvraag: 'Price on request', vanaf: 'From',
  bekijkAlleFotos: 'View all photos', fotos: 'photos', openGalerij: 'open gallery',
  vorige: 'Previous photo', volgende: 'Next photo', sluiten: 'Close gallery',
  toonKaartVan: 'Show map of', kaartSub: 'Google Maps loads after a click',
  openInMaps: 'Open the location in Google Maps',
  ligging: 'Location', voorzieningen: 'Amenities', projectomschrijving: 'Project description',
  woningtypen: 'Unit types', over: 'About', vraagProjectinfo: 'Request project information',
  directWhatsapp: 'Directly via WhatsApp',
  developerNote: (dev) => `Project information based on data from developer ${dev}. We confirm prices, areas and availability per unit type with the source before you decide.`,
  interesseIn: (n) => `Interested in ${n}? We will send you the available project information without obligation and answer your questions.`,
  meerAanbod: 'More properties', bekijkOokProjecten: 'You may also like these projects',
  filterAlle: 'All properties', filterAria: 'Filter by city', veegProjecten: 'Swipe for more projects',
  hub: {
    title: 'Property for sale in Morocco | Projects in Marrakech & Tangier | Maghreb Estates',
    description: 'Discover selected property projects by Maghreb Estates in Marrakech and Tangier. View photos, location and project information and request more details without obligation.',
    eyebrow: 'Our properties', h1: 'Property for sale<br /><em>in Morocco</em>',
    sub: 'A selection of property projects we guide in Marrakech and Tangier. From orientation to transfer, Maghreb Estates stands beside you — independent and multilingual.',
    intro1: 'Maghreb Estates guides the purchase of selected property projects in Morocco. We are not a developer, but your independent point of contact: we gather projects from reliable local developers, verify the details and guide you from the first orientation through to the transfer at the notary.',
    intro2: 'Our selection is deliberately compact and grows step by step. We assess every project on location, price, paperwork and rentability. Below are the projects we currently guide, in Marrakech and Tangier.',
    projectenEyebrow: 'Available projects', projectenTitel: 'Our <em>projects</em> in Morocco',
    projectenSub: 'Filter by city or view all projects. Select a project for photos, location and full information.',
    bekijkAlleInStad: (s) => `View all projects in ${s}`,
    contextTitel: 'Buying property in Morocco with guidance',
    contextTekst: 'The Moroccan market is local and fragmented: prices, quality and legal status vary greatly by city, district and developer. With new-build and off-plan projects in particular, independent guidance adds value. We help you ask the right questions: is the price in line with the market, is the paperwork in order and how realistic is the rental potential?',
    faqTitel: 'Frequently asked questions about our properties',
    faqs: [
      { q: 'Which property projects does Maghreb Estates offer?', a: 'We currently guide the purchase of selected projects in Marrakech and Tangier. Our range grows as we work with local developers.' },
      { q: 'Can I buy an apartment in these projects as a foreign buyer?', a: 'Yes. Foreign buyers can purchase almost anywhere in Morocco, including remotely with a power of attorney. We verify the title deed, the purchase contract and the payment route.' },
      { q: 'Are the prices shown final?', a: 'Prices and availability vary by unit type and phase and may change. Where we show a price, it comes from the developer; we always confirm it before you make a decision.' },
    ],
  },
  stad: {
    title: (s) => `Property for sale in ${s} | Projects | Maghreb Estates`,
    description: (s, p) => `View the Maghreb Estates property offer in ${s}: ${p}. Photos, location and project information, with independent guidance.`,
    eyebrowRegio: (r) => `Properties in ${r}`, h1: (s) => `Property for sale<br /><em>in ${s}</em>`,
    sub: (inv, aantal, s) => `${inv} View ${aantal} we guide in ${s}.`,
    projectenTitel: (s) => s,
    achtergrond: (s) => `buying property in ${s}`,
    specifiekObject: (s) => `Have a specific property in ${s} in mind?`,
    specifiekObjectTekst: 'We also help you beyond our own listings. Send us the link or documents and we will check the file and the price.',
    stuurObject: 'Send a property for review',
    faqTitel: (s) => `Frequently asked questions about property in ${s}`,
    ditProject: 'the project', dezeProjecten: (n) => `the ${n} projects`,
  },
  detail: {
    title: (n, s) => `${n} in ${s} | Property | Maghreb Estates`,
    ctaTekst: (n) => `Interested in ${n}? We will send you the available project information without obligation.`,
    slotTitel: '', slotTekst: '',
  },
  slotCtaTitel: 'Ready for the next step?',
  slotCtaTekst: 'Book a no-obligation consultation or have a property reviewed by Maghreb Estates.',
  planAdvies: 'Book a consultation', laatBeoordelen: 'Have a property reviewed',
};

const fr: AanbodUi = {
  land: 'Maroc',
  aanbod: 'Biens', alleProjecten: 'Tous les biens', bekijkProject: 'Voir le projet',
  prijsOpAanvraag: 'Prix sur demande', vanaf: 'À partir de',
  bekijkAlleFotos: 'Voir toutes les photos', fotos: 'photos', openGalerij: 'ouvrir la galerie',
  vorige: 'Photo précédente', volgende: 'Photo suivante', sluiten: 'Fermer la galerie',
  toonKaartVan: 'Afficher la carte de', kaartSub: 'Google Maps se charge après un clic',
  openInMaps: 'Ouvrir la localisation dans Google Maps',
  ligging: 'Emplacement', voorzieningen: 'Prestations', projectomschrijving: 'Description du projet',
  woningtypen: 'Types de logements', over: 'À propos de', vraagProjectinfo: 'Demander les informations du projet',
  directWhatsapp: 'Directement via WhatsApp',
  developerNote: (dev) => `Informations projet d’après les données du promoteur ${dev}. Nous confirmons les prix, surfaces et disponibilités par type de logement auprès de la source avant toute décision.`,
  interesseIn: (n) => `Intéressé par ${n} ? Nous vous envoyons sans engagement les informations disponibles et répondons à vos questions.`,
  meerAanbod: 'Autres biens', bekijkOokProjecten: 'Découvrez aussi ces projets',
  filterAlle: 'Tous les biens', filterAria: 'Filtrer par ville', veegProjecten: 'Faites glisser pour voir plus',
  hub: {
    title: 'Immobilier à vendre au Maroc | Projets à Marrakech & Tanger | Maghreb Estates',
    description: 'Découvrez une sélection de projets immobiliers de Maghreb Estates à Marrakech et Tanger. Photos, emplacement et informations, et demandez plus de détails sans engagement.',
    eyebrow: 'Nos biens', h1: 'Immobilier à vendre<br /><em>au Maroc</em>',
    sub: 'Une sélection de projets immobiliers que nous accompagnons à Marrakech et Tanger. De l’orientation à la remise des clés, Maghreb Estates est à vos côtés — indépendant et multilingue.',
    intro1: 'Maghreb Estates accompagne l’achat de projets immobiliers sélectionnés au Maroc. Nous ne sommes pas promoteur, mais votre interlocuteur indépendant : nous réunissons des projets de promoteurs locaux fiables, vérifions les données et vous accompagnons de la première orientation jusqu’à la signature chez le notaire.',
    intro2: 'Notre sélection est volontairement compacte et s’étoffe progressivement. Nous évaluons chaque projet sur l’emplacement, le prix, les documents et le potentiel locatif. Voici les projets que nous accompagnons actuellement, à Marrakech et Tanger.',
    projectenEyebrow: 'Projets disponibles', projectenTitel: 'Nos <em>projets</em> au Maroc',
    projectenSub: 'Filtrez par ville ou voyez tous les projets. Cliquez sur un projet pour les photos, l’emplacement et toutes les informations.',
    bekijkAlleInStad: (s) => `Voir tous les projets à ${s}`,
    contextTitel: 'Acheter un bien au Maroc avec accompagnement',
    contextTekst: 'Le marché marocain est local et fragmenté : les prix, la qualité et la situation juridique varient fortement selon la ville, le quartier et le promoteur. Pour le neuf et la VEFA en particulier, un accompagnement indépendant fait la différence. Nous vous aidons à poser les bonnes questions : le prix est-il conforme au marché, les documents sont-ils en règle et le potentiel locatif est-il réaliste ?',
    faqTitel: 'Questions fréquentes sur nos biens',
    faqs: [
      { q: 'Quels projets immobiliers Maghreb Estates propose-t-il ?', a: 'Nous accompagnons actuellement l’achat de projets sélectionnés à Marrakech et Tanger. Notre offre s’élargit grâce à notre travail avec des promoteurs locaux.' },
      { q: 'Puis-je acheter un appartement dans ces projets en tant qu’acheteur étranger ?', a: 'Oui. Les acheteurs étrangers peuvent acheter presque partout au Maroc, y compris à distance avec une procuration. Nous vérifions le titre foncier, le contrat et le circuit de paiement.' },
      { q: 'Les prix affichés sont-ils définitifs ?', a: 'Les prix et disponibilités varient selon le type de logement et la phase et peuvent évoluer. Lorsque nous affichons un prix, il provient du promoteur ; nous le confirmons toujours avant toute décision.' },
    ],
  },
  stad: {
    title: (s) => `Immobilier à vendre à ${s} | Projets | Maghreb Estates`,
    description: (s, p) => `Découvrez l’offre immobilière de Maghreb Estates à ${s} : ${p}. Photos, emplacement et informations, avec un accompagnement indépendant.`,
    eyebrowRegio: (r) => `Biens dans la région ${r}`, h1: (s) => `Immobilier à vendre<br /><em>à ${s}</em>`,
    sub: (inv, aantal, s) => `${inv} Découvrez ${aantal} que nous accompagnons à ${s}.`,
    projectenTitel: (s) => s,
    achtergrond: (s) => `acheter un bien à ${s}`,
    specifiekObject: (s) => `Un bien précis en vue à ${s} ?`,
    specifiekObjectTekst: 'Nous vous aidons aussi au-delà de notre propre offre. Envoyez-nous le lien ou les documents, nous vérifions le dossier et le prix.',
    stuurObject: 'Envoyer un bien à vérifier',
    faqTitel: (s) => `Questions fréquentes sur l’immobilier à ${s}`,
    ditProject: 'ce projet', dezeProjecten: (n) => `ces ${n} projets`,
  },
  detail: {
    title: (n, s) => `${n} à ${s} | Immobilier | Maghreb Estates`,
    ctaTekst: (n) => `Intéressé par ${n} ? Nous vous envoyons sans engagement les informations disponibles.`,
    slotTitel: '', slotTekst: '',
  },
  slotCtaTitel: 'Prêt pour la prochaine étape ?',
  slotCtaTekst: 'Prenez rendez-vous sans engagement ou faites évaluer un bien par Maghreb Estates.',
  planAdvies: 'Prendre rendez-vous', laatBeoordelen: 'Faire évaluer un bien',
};

const ar: AanbodUi = {
  land: 'المغرب',
  aanbod: 'العقارات', alleProjecten: 'جميع العقارات', bekijkProject: 'عرض المشروع',
  prijsOpAanvraag: 'السعر عند الطلب', vanaf: 'ابتداءً من',
  bekijkAlleFotos: 'عرض جميع الصور', fotos: 'صور', openGalerij: 'فتح المعرض',
  vorige: 'الصورة السابقة', volgende: 'الصورة التالية', sluiten: 'إغلاق المعرض',
  toonKaartVan: 'عرض خريطة', kaartSub: 'تُحمَّل خرائط جوجل بعد النقر',
  openInMaps: 'افتح الموقع في خرائط جوجل',
  ligging: 'الموقع', voorzieningen: 'المرافق', projectomschrijving: 'وصف المشروع',
  woningtypen: 'أنواع الوحدات', over: 'عن', vraagProjectinfo: 'اطلب معلومات المشروع',
  directWhatsapp: 'مباشرة عبر واتساب',
  developerNote: (dev) => `معلومات المشروع بناءً على بيانات المطوّر ${dev}. نؤكّد الأسعار والمساحات والتوافر لكل نوع وحدة من المصدر قبل اتخاذ القرار.`,
  interesseIn: (n) => `مهتم بـ ${n}؟ سنرسل لك المعلومات المتاحة دون أي التزام ونجيب عن أسئلتك.`,
  meerAanbod: 'المزيد من العقارات', bekijkOokProjecten: 'قد تعجبك هذه المشاريع أيضاً',
  filterAlle: 'جميع العقارات', filterAria: 'تصفية حسب المدينة', veegProjecten: 'اسحب لعرض المزيد',
  hub: {
    title: 'عقارات للبيع في المغرب | مشاريع في مراكش وطنجة | Maghreb Estates',
    description: 'اكتشف مشاريع عقارية مختارة من Maghreb Estates في مراكش وطنجة. صور، موقع ومعلومات المشروع، واطلب مزيداً من التفاصيل دون التزام.',
    eyebrow: 'عقاراتنا', h1: 'عقارات للبيع<br /><em>في المغرب</em>',
    sub: 'مجموعة مختارة من المشاريع العقارية التي نرافقها في مراكش وطنجة. من التوجيه إلى نقل الملكية، تقف Maghreb Estates إلى جانبك — مستقلة ومتعددة اللغات.',
    intro1: 'ترافق Maghreb Estates شراء مشاريع عقارية مختارة في المغرب. لسنا مطوّراً عقارياً، بل جهة اتصالك المستقلة: نجمع مشاريع من مطوّرين محليين موثوقين، ونتحقق من البيانات ونرافقك من التوجيه الأول حتى نقل الملكية لدى الموثّق.',
    intro2: 'مجموعتنا مركّزة عن قصد وتنمو خطوة بخطوة. نقيّم كل مشروع من حيث الموقع والسعر والوثائق وإمكانية التأجير. فيما يلي المشاريع التي نرافقها حالياً في مراكش وطنجة.',
    projectenEyebrow: 'المشاريع المتاحة', projectenTitel: '<em>مشاريعنا</em> في المغرب',
    projectenSub: 'صفِّ حسب المدينة أو اعرض جميع المشاريع. اختر مشروعاً لعرض الصور والموقع والمعلومات الكاملة.',
    bekijkAlleInStad: (s) => `عرض جميع المشاريع في ${s}`,
    contextTitel: 'شراء عقار في المغرب مع مرافقة',
    contextTekst: 'السوق المغربي محلي ومتشعّب: تختلف الأسعار والجودة والوضع القانوني كثيراً حسب المدينة والحي والمطوّر. وفي مشاريع البناء الجديد والبيع على التصميم خصوصاً، تضيف المرافقة المستقلة قيمة. نساعدك على طرح الأسئلة الصحيحة: هل السعر يتوافق مع السوق، وهل الوثائق سليمة، وما مدى واقعية إمكانية التأجير؟',
    faqTitel: 'أسئلة شائعة حول عقاراتنا',
    faqs: [
      { q: 'ما المشاريع العقارية التي تقدّمها Maghreb Estates؟', a: 'نرافق حالياً شراء مشاريع مختارة في مراكش وطنجة. تتوسّع مجموعتنا بفضل تعاوننا مع مطوّرين محليين.' },
      { q: 'هل يمكنني كمشترٍ أجنبي شراء شقة في هذه المشاريع؟', a: 'نعم. يمكن للمشترين الأجانب الشراء في معظم أنحاء المغرب، بما في ذلك عن بُعد بموجب وكالة. نتحقق من الرسم العقاري والعقد ومسار الدفع.' },
      { q: 'هل الأسعار المعروضة نهائية؟', a: 'تختلف الأسعار والتوافر حسب نوع الوحدة والمرحلة وقد تتغيّر. حيثما نعرض سعراً فهو من المطوّر، ونؤكّده دائماً قبل اتخاذ القرار.' },
    ],
  },
  stad: {
    title: (s) => `عقارات للبيع في ${s} | مشاريع | Maghreb Estates`,
    description: (s, p) => `اطّلع على عروض Maghreb Estates العقارية في ${s}: ${p}. صور وموقع ومعلومات المشروع، مع مرافقة مستقلة.`,
    eyebrowRegio: (r) => `عقارات في ${r}`, h1: (s) => `عقارات للبيع<br /><em>في ${s}</em>`,
    sub: (inv, aantal, s) => `${inv} اطّلع على ${aantal} التي نرافقها في ${s}.`,
    projectenTitel: (s) => s,
    achtergrond: (s) => `شراء عقار في ${s}`,
    specifiekObject: (s) => `هل لديك عقار محدّد في ${s}؟`,
    specifiekObjectTekst: 'نساعدك أيضاً خارج عروضنا الخاصة. أرسل لنا الرابط أو الوثائق وسنتحقق من الملف والسعر.',
    stuurObject: 'أرسل عقاراً للمراجعة',
    faqTitel: (s) => `أسئلة شائعة حول العقارات في ${s}`,
    ditProject: 'هذا المشروع', dezeProjecten: (n) => `هذه المشاريع الـ${n}`,
  },
  detail: {
    title: (n, s) => `${n} في ${s} | عقارات | Maghreb Estates`,
    ctaTekst: (n) => `مهتم بـ ${n}؟ سنرسل لك المعلومات المتاحة دون أي التزام.`,
    slotTitel: '', slotTekst: '',
  },
  slotCtaTitel: 'جاهز للخطوة التالية؟',
  slotCtaTekst: 'احجز استشارة دون التزام أو اطلب تقييم عقار من Maghreb Estates.',
  planAdvies: 'احجز استشارة', laatBeoordelen: 'اطلب تقييم عقار',
};

export const aanbodUi: Record<Taal, AanbodUi> = { nl, en, fr, ar };
