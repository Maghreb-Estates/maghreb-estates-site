// Gedeelde interface-teksten per taal: navigatie, footer, formulieren en CTA's.
// Paginacontent staat apart in ./content/.
import type { Taal } from './config';
import { paginas } from './config';

export interface UiStrings {
  nav: { kopen: string; investeren: string; nieuwbouw: string; overOns: string; contact: string; cta: string; menu: string; taalKiezen: string };
  cta: { advies: string; objectanalyse: string; meer: string };
  footer: {
    tagline: string; contact: string; services: string; insights: string; markets: string;
    aankoop: string; investering: string; nieuwbouw: string; verkoop: string;
    kosten: string; juridisch: string; kennisbank: string; alleMarkten: string;
    rechten: string; whatsapp: string;
    // Verwijst naar de Nederlandstalige gidsen; expliciet gelabeld zodat een
    // anderstalige bezoeker weet dat hij naar Nederlandse inhoud klikt.
    nlLabel: string;
  };
  formulier: {
    naam: string; naamPlaceholder: string;
    telefoon: string; telefoonPlaceholder: string;
    email: string; emailPlaceholder: string;
    doel: string; doelKies: string;
    stad: string; stadPlaceholder: string;
    budget: string; budgetPlaceholder: string;
    link: string;
    bericht: string; berichtPlaceholder: string;
    optioneel: string;
    viaWhatsapp: string; viaEmail: string;
    validatie: string;
    doelen: { kopen: string; investeren: string; analyse: string; nieuwbouw: string; verkoop: string; beheer: string; anders: string };
  };
  booking: {
    datum: string; tijdslot: string; kiesMoment: string; kiesMomentSub: string;
    doelGesprek: string; validatie: string;
  };
  breadcrumb: { home: string };
  faqTitel: string;
  trust: { data: string; dataSub: string; lokaal: string; lokaalSub: string; dd: string; ddSub: string; talen: string; talenSub: string };
}

export const ui: Record<Taal, UiStrings> = {
  nl: {
    nav: { kopen: 'Vastgoed kopen', investeren: 'Investeren', nieuwbouw: 'Nieuwbouw & off-plan', overOns: 'Over ons', contact: 'Contact', cta: 'Plan adviesgesprek', menu: 'Menu openen', taalKiezen: 'Taal kiezen' },
    cta: { advies: 'Plan adviesgesprek', objectanalyse: 'Laat een object analyseren', meer: 'Lees meer' },
    footer: {
      tagline: 'International real estate advisory in Morocco.',
      contact: 'Contact', services: 'Services', insights: 'Insights', markets: 'Markets',
      aankoop: 'Aankoopbegeleiding', investering: 'Investeringsadvies', nieuwbouw: 'Nieuwbouw & off-plan', verkoop: 'Verkoopbegeleiding',
      kosten: 'Kosten bij aankoop', juridisch: 'Juridische documenten', kennisbank: 'Kennisbank', alleMarkten: 'Alle markten',
      rechten: 'Alle rechten voorbehouden.', whatsapp: 'WhatsApp', nlLabel: '',
    },
    formulier: {
      naam: 'Naam', naamPlaceholder: 'Uw volledige naam',
      telefoon: 'Telefoon / WhatsApp', telefoonPlaceholder: '+31 6 00 00 00 00',
      email: 'E-mailadres', emailPlaceholder: 'uw@email.com',
      doel: 'Wat is uw doel?', doelKies: 'Selecteer een optie',
      stad: 'Stad of regio in Marokko', stadPlaceholder: 'Bijv. Tanger, Rabat, Marrakech…',
      budget: 'Budgetindicatie', budgetPlaceholder: 'Bijv. € 80.000 – € 150.000',
      link: 'Link naar woning of project',
      bericht: 'Bericht', berichtPlaceholder: 'Vertel kort over uw situatie, wensen of vragen…',
      optioneel: '(optioneel)',
      viaWhatsapp: 'Via WhatsApp', viaEmail: 'Via e-mail',
      validatie: 'Vul uw naam, telefoonnummer, doel en bericht in.',
      doelen: { kopen: 'Vastgoed kopen', investeren: 'Investeren / rendement', analyse: 'Object laten analyseren', nieuwbouw: 'Nieuwbouw / off-plan', verkoop: 'Woning verkopen', beheer: 'Beheer & verhuur', anders: 'Anders' },
    },
    booking: {
      datum: 'Gewenste datum', tijdslot: 'Gewenst tijdslot',
      kiesMoment: 'Kies een moment', kiesMomentSub: 'Selecteer een datum en tijdslot. Wij bevestigen uw afspraak zo snel mogelijk via WhatsApp of telefoon.',
      doelGesprek: 'Doel van gesprek',
      validatie: 'Kies een datum en tijdslot en vul uw naam, telefoonnummer en het doel van het gesprek in.',
    },
    breadcrumb: { home: 'Home' },
    faqTitel: 'Veelgestelde vragen',
    trust: { data: 'Datagedreven analyse', dataSub: 'Prijsvergelijking, marktdata en objectbeoordeling.', lokaal: 'Lokale aanwezigheid', lokaalSub: 'Ter plaatse in Marokko, met een lokaal netwerk.', dd: 'Due diligence vóór aankoop', ddSub: 'Documenten, eigendom en contract eerst beoordeeld.', talen: 'Meertalige begeleiding', talenSub: 'Nederlands, Engels, Frans en Arabisch/Darija.' },
  },

  en: {
    nav: { kopen: 'Buying property', investeren: 'Investment', nieuwbouw: 'New-build & off-plan', overOns: 'About us', contact: 'Contact', cta: 'Book a consultation', menu: 'Open menu', taalKiezen: 'Choose language' },
    cta: { advies: 'Book a consultation', objectanalyse: 'Have a property analysed', meer: 'Read more' },
    footer: {
      tagline: 'International real estate advisory in Morocco.',
      contact: 'Contact', services: 'Services', insights: 'Insights', markets: 'Markets',
      aankoop: 'Buying guidance', investering: 'Investment advice', nieuwbouw: 'New-build & off-plan', verkoop: 'Selling guidance',
      kosten: 'Purchase costs', juridisch: 'Legal documents', kennisbank: 'Knowledge base', alleMarkten: 'All markets',
      rechten: 'All rights reserved.', whatsapp: 'WhatsApp', nlLabel: ' (in Dutch)',
    },
    formulier: {
      naam: 'Name', naamPlaceholder: 'Your full name',
      telefoon: 'Phone / WhatsApp', telefoonPlaceholder: '+44 7000 000000',
      email: 'Email address', emailPlaceholder: 'you@email.com',
      doel: 'What is your goal?', doelKies: 'Select an option',
      stad: 'City or region in Morocco', stadPlaceholder: 'E.g. Tangier, Rabat, Marrakech…',
      budget: 'Indicative budget', budgetPlaceholder: 'E.g. € 80,000 – € 150,000',
      link: 'Link to a property or project',
      bericht: 'Message', berichtPlaceholder: 'Tell us briefly about your situation, plans or questions…',
      optioneel: '(optional)',
      viaWhatsapp: 'Via WhatsApp', viaEmail: 'Via email',
      validatie: 'Please enter your name, phone number, goal and message.',
      doelen: { kopen: 'Buying property', investeren: 'Investment / returns', analyse: 'Property analysis', nieuwbouw: 'New-build / off-plan', verkoop: 'Selling a property', beheer: 'Management & rental', anders: 'Something else' },
    },
    booking: {
      datum: 'Preferred date', tijdslot: 'Preferred time slot',
      kiesMoment: 'Choose a time', kiesMomentSub: 'Select a date and time slot. We will confirm your appointment as soon as possible via WhatsApp or phone.',
      doelGesprek: 'Purpose of the call',
      validatie: 'Please choose a date and time slot and enter your name, phone number and the purpose of the call.',
    },
    breadcrumb: { home: 'Home' },
    faqTitel: 'Frequently asked questions',
    trust: { data: 'Data-driven analysis', dataSub: 'Price comparison, market data and property assessment.', lokaal: 'Local presence', lokaalSub: 'On the ground in Morocco, with a local network.', dd: 'Due diligence before purchase', ddSub: 'Documents, ownership and contract reviewed first.', talen: 'Multilingual guidance', talenSub: 'English, French, Dutch and Arabic/Darija.' },
  },

  fr: {
    nav: { kopen: 'Acheter', investeren: 'Investir', nieuwbouw: 'Neuf & VEFA', overOns: 'À propos', contact: 'Contact', cta: 'Prendre rendez-vous', menu: 'Ouvrir le menu', taalKiezen: 'Choisir la langue' },
    cta: { advies: 'Prendre rendez-vous', objectanalyse: 'Faire analyser un bien', meer: 'En savoir plus' },
    footer: {
      tagline: 'International real estate advisory in Morocco.',
      contact: 'Contact', services: 'Services', insights: 'Ressources', markets: 'Marchés',
      aankoop: 'Accompagnement à l’achat', investering: 'Conseil en investissement', nieuwbouw: 'Neuf & VEFA', verkoop: 'Accompagnement à la vente',
      kosten: 'Frais d’acquisition', juridisch: 'Documents juridiques', kennisbank: 'Base de connaissances', alleMarkten: 'Tous les marchés',
      rechten: 'Tous droits réservés.', whatsapp: 'WhatsApp', nlLabel: ' (en néerlandais)',
    },
    formulier: {
      naam: 'Nom', naamPlaceholder: 'Votre nom complet',
      telefoon: 'Téléphone / WhatsApp', telefoonPlaceholder: '+33 6 00 00 00 00',
      email: 'Adresse e-mail', emailPlaceholder: 'vous@email.com',
      doel: 'Quel est votre objectif ?', doelKies: 'Sélectionnez une option',
      stad: 'Ville ou région au Maroc', stadPlaceholder: 'Ex. Tanger, Rabat, Marrakech…',
      budget: 'Budget indicatif', budgetPlaceholder: 'Ex. 80 000 € – 150 000 €',
      link: 'Lien vers un bien ou un projet',
      bericht: 'Message', berichtPlaceholder: 'Décrivez brièvement votre situation, vos projets ou vos questions…',
      optioneel: '(facultatif)',
      viaWhatsapp: 'Via WhatsApp', viaEmail: 'Par e-mail',
      validatie: 'Merci d’indiquer votre nom, téléphone, objectif et message.',
      doelen: { kopen: 'Acheter un bien', investeren: 'Investissement / rendement', analyse: 'Analyse d’un bien', nieuwbouw: 'Neuf / VEFA', verkoop: 'Vendre un bien', beheer: 'Gestion & location', anders: 'Autre' },
    },
    booking: {
      datum: 'Date souhaitée', tijdslot: 'Créneau souhaité',
      kiesMoment: 'Choisissez un créneau', kiesMomentSub: 'Sélectionnez une date et un créneau. Nous confirmons votre rendez-vous dans les meilleurs délais par WhatsApp ou par téléphone.',
      doelGesprek: 'Objet de l’entretien',
      validatie: 'Merci de choisir une date et un créneau, et d’indiquer votre nom, téléphone et l’objet de l’entretien.',
    },
    breadcrumb: { home: 'Accueil' },
    faqTitel: 'Questions fréquentes',
    trust: { data: 'Analyse fondée sur les données', dataSub: 'Comparaison des prix, données de marché et évaluation du bien.', lokaal: 'Présence locale', lokaalSub: 'Sur place au Maroc, avec un réseau local.', dd: 'Due diligence avant l’achat', ddSub: 'Documents, propriété et contrat examinés en amont.', talen: 'Accompagnement multilingue', talenSub: 'Français, anglais, néerlandais et arabe/darija.' },
  },

  ar: {
    nav: { kopen: 'شراء العقارات', investeren: 'الاستثمار', nieuwbouw: 'مشاريع جديدة', overOns: 'من نحن', contact: 'اتصل بنا', cta: 'احجز استشارة', menu: 'فتح القائمة', taalKiezen: 'اختر اللغة' },
    cta: { advies: 'احجز استشارة', objectanalyse: 'اطلب تحليل عقار', meer: 'اقرأ المزيد' },
    footer: {
      tagline: 'استشارات عقارية دولية في المغرب.',
      contact: 'اتصل بنا', services: 'خدماتنا', insights: 'موارد', markets: 'الأسواق',
      aankoop: 'مرافقة الشراء', investering: 'استشارات الاستثمار', nieuwbouw: 'مشاريع جديدة', verkoop: 'مرافقة البيع',
      kosten: 'تكاليف الشراء', juridisch: 'الوثائق القانونية', kennisbank: 'قاعدة المعرفة', alleMarkten: 'جميع الأسواق',
      rechten: 'جميع الحقوق محفوظة.', whatsapp: 'واتساب', nlLabel: ' (بالهولندية)',
    },
    formulier: {
      naam: 'الاسم', naamPlaceholder: 'اسمك الكامل',
      telefoon: 'الهاتف / واتساب', telefoonPlaceholder: '+212 6 00 00 00 00',
      email: 'البريد الإلكتروني', emailPlaceholder: 'you@email.com',
      doel: 'ما هو هدفك؟', doelKies: 'اختر خياراً',
      stad: 'المدينة أو المنطقة في المغرب', stadPlaceholder: 'مثال: طنجة، الرباط، مراكش…',
      budget: 'الميزانية التقريبية', budgetPlaceholder: 'مثال: 80.000 – 150.000 يورو',
      link: 'رابط العقار أو المشروع',
      bericht: 'رسالتك', berichtPlaceholder: 'أخبرنا باختصار عن وضعك أو خططك أو أسئلتك…',
      optioneel: '(اختياري)',
      viaWhatsapp: 'عبر واتساب', viaEmail: 'عبر البريد',
      validatie: 'يرجى إدخال الاسم ورقم الهاتف والهدف والرسالة.',
      doelen: { kopen: 'شراء عقار', investeren: 'الاستثمار / العائد', analyse: 'تحليل عقار', nieuwbouw: 'مشروع جديد', verkoop: 'بيع عقار', beheer: 'الإدارة والتأجير', anders: 'شيء آخر' },
    },
    booking: {
      datum: 'التاريخ المفضل', tijdslot: 'الوقت المفضل',
      kiesMoment: 'اختر موعداً', kiesMomentSub: 'اختر تاريخاً ووقتاً. سنؤكد موعدك في أقرب وقت عبر واتساب أو الهاتف.',
      doelGesprek: 'موضوع الاستشارة',
      validatie: 'يرجى اختيار تاريخ ووقت وإدخال الاسم ورقم الهاتف وموضوع الاستشارة.',
    },
    breadcrumb: { home: 'الرئيسية' },
    faqTitel: 'الأسئلة الشائعة',
    trust: { data: 'تحليل قائم على البيانات', dataSub: 'مقارنة الأسعار وبيانات السوق وتقييم العقار.', lokaal: 'حضور محلي', lokaalSub: 'على الأرض في المغرب، مع شبكة محلية.', dd: 'العناية الواجبة قبل الشراء', ddSub: 'مراجعة الوثائق والملكية والعقد أولاً.', talen: 'مرافقة متعددة اللغات', talenSub: 'العربية/الدارجة والفرنسية والإنجليزية والهولندية.' },
  },
};

/** Menu-items met het juiste pad voor de gekozen taal. */
export const navVoorTaal = (taal: Taal) => {
  const t = ui[taal];
  // "Aanbod" (de concrete projectlistings) staat vooraan als eigen route — het is
  // de transactionele kern nu er daadwerkelijk projecten zijn. Het aanbod is
  // Nederlandstalig (net als de stad- en marktpagina's) en verschijnt daarom
  // alleen in de Nederlandse navigatie; anderstalige bezoekers bereiken het via
  // de commerciële kernpagina's en de footer.
  const aanbodItem = taal === 'nl'
    ? [{ label: 'Aanbod', href: '/aanbod/', children: [
        { label: 'Alle projecten', href: '/aanbod/' },
        { label: 'Marrakech', href: '/aanbod/marrakech/' },
        { label: 'Tanger', href: '/aanbod/tanger/' },
      ] }]
    : [];
  return [
    ...aanbodItem,
    { label: t.nav.kopen, href: paginas.aankoopbegeleiding[taal], children: [
      { label: t.footer.aankoop, href: paginas.aankoopbegeleiding[taal] },
      { label: t.nav.nieuwbouw, href: paginas.nieuwbouw[taal] },
    ] },
    { label: t.nav.investeren, href: paginas.investeren[taal], children: [
      { label: t.footer.investering, href: paginas.investeren[taal] },
      { label: t.footer.kosten, href: paginas.kosten[taal] },
    ] },
    { label: t.nav.overOns, href: paginas.overOns[taal] },
    { label: t.nav.contact, href: paginas.contact[taal] },
  ];
};
