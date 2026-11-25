// Vertaalde proj/stad-teksten voor het aanbod. Het Nederlands blijft in
// projecten.ts / steden.ts (bron); hier staan de EN/FR/AR-versies. De
// structurele velden (foto's, coördinaten, prijsbedragen voor schema) komen
// altijd uit projecten.ts en worden niet gedupliceerd.

import type { Taal } from '../i18n/config';
import type { Project, Kenmerk } from './projecten';
import { steden, type Stad } from './steden';
import { aaferVertaling } from './projectenVertalingAafer';
import { allaliVertaling } from './projectenVertalingAllali';

type VertaalTaal = Exclude<Taal, 'nl'>;

export interface ProjectVertaling {
  kort: string;
  intro: string;
  omschrijving: string[];
  kenmerken: Kenmerk[];
  voorzieningen: string[];
  woningtypen?: { type: string; details: string }[];
  ligging: string;
  prijsVanafTekst?: string;
  prijsPerM2Tekst?: string;
}

const projectVertaling: Record<string, Record<VertaalTaal, ProjectVertaling>> = {
  // ── LE DOMAINE D'ACHAKAR ──────────────────────────────────────────────────
  'domaine-achakar': {
    en: {
      kort: 'Rare 39,051 m² plot in Achakar, on the Atlantic coast of Tangier — titled land in residential zone A2 with 17,180 m² buildable and two development scenarios.',
      intro:
        "Le Domaine d'Achakar is an exceptional plot of nearly four hectares of contiguous land in Achakar, one of the most sought-after areas on the Atlantic edge of Tangier. The land has a fully secured title deed (titre foncier) and lies in residential zone A2, with 17,180 m² of buildable surface. Maghreb Estates guides buyers and investors through the assessment, the due diligence and the purchase of this land.",
      omschrijving: [
        'The plot lies a short distance from the Atlantic Ocean, opposite the Royal Club Équestre Détroit and a few minutes from the Caves of Hercules. With a total surface of 39,051 m², this is one of the last large land opportunities in the north of Tangier, in an area that is urbanising fast while keeping its low-density, residential character.',
        'The land falls entirely under the development plan of the Agence Urbaine de Tanger, in zone A2 (detached individual villas): a ground-coverage ratio (COS) of up to 0.5, a floor-area ratio (CUS) of up to 25% and a building height up to R+1. Part of the plot (zone V313) is designated protected green space of about 3,800 m², which safeguards the landscape and rules out construction directly opposite the domain.',
        'The land consists of three separate buildable lots — west (2,770 m²), centre (5,470 m²) and east (8,940 m², with a double frontage) — together good for 17,180 m² of buildable surface. The adjacent TM 431 road axis (a 30-metre road) also opens the possibility of an R+2 classification within a gated-community project.',
        'The domain lends itself to two development scenarios. In the first, a private estate of 27 individual villas (R+1) on plots of about 510 m², each with a private pool. In the second, a secure residence of 40 semi-detached villas (R+1) of about 215 m² with a pool, in a gated complex with a single entrance and 24/7 security. A detailed dossier is available for each scenario.',
        'We review with you which scenario suits your goal — wealth building, your own development or resale — and check the title deed, the planning status and the purchase process before you buy. Guidance can be entirely remote, in Dutch, English, French or Arabic.',
      ],
      kenmerken: [
        { label: 'City', waarde: 'Tangier (Achakar)' },
        { label: 'Type', waarde: 'Building land' },
        { label: 'Total surface', waarde: '39,051 m²' },
        { label: 'Buildable', waarde: '17,180 m²' },
        { label: 'Zoning', waarde: 'Zone A2 · R+1' },
        { label: 'Ownership', waarde: 'Titre foncier' },
      ],
      voorzieningen: [
        'Fully titled ownership (titre foncier)',
        'Nearly four hectares of contiguous land',
        'Three separate buildable lots in zone A2',
        'Protected green space (V313) of about 3,800 m²',
        'Walking distance from Achakar beach',
        'Opposite the Royal Club Équestre Détroit',
      ],
      woningtypen: [
        { type: 'Scenario 1 — private estate', details: '27 detached villas (R+1) on plots of ± 510 m², each with a private pool' },
        { type: 'Scenario 2 — secure residence', details: '40 semi-detached villas (R+1) of ± 215 m² with a pool, gated complex with 24/7 security' },
      ],
      ligging:
        "Le Domaine d'Achakar lies in the residential area of Achakar, on the Atlantic edge of Tangier: within walking distance of Achakar beach, opposite the Royal Club Équestre Détroit, five minutes from the Caves of Hercules and about fifteen minutes from both Tangier international airport and the Grand Stade de Tanger (2030 World Cup). The location of the plot is shown on the map; cadastral details and plot boundaries we are happy to discuss in person.",
    },
    fr: {
      kort: 'Terrain rare de 39 051 m² à Achakar, sur la côte atlantique de Tanger — foncier titré en zone résidentielle A2, 17 180 m² constructibles et deux scénarios de valorisation.',
      intro:
        "Le Domaine d'Achakar est un terrain exceptionnel de près de quatre hectares d'un seul tenant à Achakar, l'un des secteurs les plus prisés de la façade atlantique de Tanger. Le terrain bénéficie d'un titre foncier pleinement sécurisé et se situe en zone résidentielle A2, avec 17 180 m² de surface constructible. Maghreb Estates accompagne les acquéreurs et les investisseurs dans l'évaluation, la vérification du dossier et l'achat de ce foncier.",
      omschrijving: [
        "Le terrain se trouve à faible distance de l'océan Atlantique, face au Royal Club Équestre Détroit et à quelques minutes des Grottes d'Hercule. Avec une surface totale de 39 051 m², c'est l'une des dernières grandes opportunités foncières du nord de Tanger, dans un secteur qui s'urbanise rapidement tout en conservant son caractère résidentiel et sa faible densité.",
        "Le terrain est intégralement régi par le plan d'aménagement de l'Agence Urbaine de Tanger, en zone A2 (villas individuelles isolées) : coefficient d'occupation du sol (COS) de 0,5 maximum, coefficient d'utilisation du sol (CUS) de 25 % maximum et une hauteur jusqu'à R+1. Une partie du terrain (zone V313) est classée espace vert protégé d'environ 3 800 m², ce qui préserve le paysage et exclut toute construction en vis-à-vis du domaine.",
        "Le foncier se compose de trois lots constructibles distincts — ouest (2 770 m²), centre (5 470 m²) et est (8 940 m², à double façade) — totalisant 17 180 m² de surface constructible. L'axe routier TM 431 (voie de 30 mètres) attenant ouvre par ailleurs la possibilité d'un classement R+2 dans le cadre d'un projet de cité fermée.",
        "Le domaine se prête à deux scénarios de valorisation. Dans le premier, un domaine patrimonial de 27 villas individuelles (R+1) sur des parcelles d'environ 510 m², chacune avec piscine privée. Dans le second, une résidence sécurisée de 40 villas jumelées (R+1) d'environ 215 m² avec piscine, en cité fermée à entrée unique et gardiennage 24/7. Un dossier détaillé est disponible pour chaque scénario.",
        "Nous examinons avec vous le scénario adapté à votre objectif — constitution de patrimoine, développement propre ou revente — et vérifions le titre foncier, la situation urbanistique et le processus d'achat avant l'acquisition. L'accompagnement peut se faire entièrement à distance, en néerlandais, anglais, français ou arabe.",
      ],
      kenmerken: [
        { label: 'Ville', waarde: 'Tanger (Achakar)' },
        { label: 'Type', waarde: 'Terrain à bâtir' },
        { label: 'Surface totale', waarde: '39 051 m²' },
        { label: 'Constructible', waarde: '17 180 m²' },
        { label: 'Zonage', waarde: 'Zone A2 · R+1' },
        { label: 'Propriété', waarde: 'Titre foncier' },
      ],
      voorzieningen: [
        'Propriété entièrement titrée (titre foncier)',
        "Près de quatre hectares d'un seul tenant",
        'Trois lots constructibles distincts en zone A2',
        'Espace vert protégé (V313) d’environ 3 800 m²',
        "À distance de marche de la plage d'Achakar",
        'Face au Royal Club Équestre Détroit',
      ],
      woningtypen: [
        { type: 'Scénario 1 — domaine patrimonial', details: "27 villas individuelles (R+1) sur parcelles d'environ 510 m², chacune avec piscine privée" },
        { type: 'Scénario 2 — résidence sécurisée', details: "40 villas jumelées (R+1) d'environ 215 m² avec piscine, cité fermée à gardiennage 24/7" },
      ],
      ligging:
        "Le Domaine d'Achakar se situe dans le secteur résidentiel d'Achakar, sur la façade atlantique de Tanger : à distance de marche de la plage d'Achakar, face au Royal Club Équestre Détroit, à cinq minutes des Grottes d'Hercule et à environ quinze minutes de l'aéroport international de Tanger comme du Grand Stade de Tanger (Mondial 2030). L'emplacement du terrain est indiqué sur la carte ; les détails cadastraux et les limites de la parcelle, nous en discutons volontiers en personne.",
    },
    ar: {
      kort: 'أرض نادرة مساحتها 39.051 م² في أشقار، على الساحل الأطلسي لطنجة — أرض محفّظة في المنطقة السكنية A2 مع 17.180 م² قابلة للبناء وسيناريوهان للتطوير.',
      intro:
        'Le Domaine d’Achakar أرض استثنائية تقارب أربعة هكتارات متّصلة في أشقار، أحد أكثر أحياء الواجهة الأطلسية لطنجة طلباً. تتمتّع الأرض بسند ملكية محفّظ بالكامل (تيتر فونسييه) وتقع في المنطقة السكنية A2، مع 17.180 م² قابلة للبناء. ترافق Maghreb Estates المشترين والمستثمرين في التقييم والتحقّق من الملف وشراء هذه الأرض.',
      omschrijving: [
        'تقع الأرض على مسافة قصيرة من المحيط الأطلسي، مقابل النادي الملكي للفروسية «الديترويت» وعلى بُعد دقائق من مغارة هرقل. بمساحة إجمالية تبلغ 39.051 م²، تُعدّ من آخر الفرص العقارية الكبيرة في شمال طنجة، في منطقة تشهد تحضّراً سريعاً مع احتفاظها بطابعها السكني ومنخفض الكثافة.',
        'تخضع الأرض بالكامل لتصميم التهيئة الخاص بالوكالة الحضرية لطنجة، في المنطقة A2 (فيلات فردية منفصلة): معامل تغطية الأرض (COS) 0,5 كحدّ أقصى، ومعامل استغلال الأرض (CUS) 25% كحدّ أقصى، وارتفاع حتى R+1. وقد صُنّف جزء من الأرض (المنطقة V313) مساحةً خضراء محميّة تبلغ نحو 3.800 م²، ما يصون المشهد ويمنع أيّ بناء مقابل الأرض مباشرة.',
        'تتكوّن الأرض من ثلاث قطع قابلة للبناء منفصلة — غرب (2.770 م²) ووسط (5.470 م²) وشرق (8.940 م² بواجهتين) — بمجموع 17.180 م² قابلة للبناء. كما يفتح المحور الطرقي TM 431 المجاور (طريق بعرض 30 متراً) إمكانية تصنيف R+2 ضمن مشروع إقامة مغلقة.',
        'تصلح الأرض لسيناريوهين للتطوير. في الأول، ضيعة راقية من 27 فيلا فردية (R+1) على قطع تبلغ نحو 510 م²، لكلٍّ منها مسبح خاص. وفي الثاني، إقامة مؤمّنة من 40 فيلا متلاصقة (R+1) بنحو 215 م² مع مسبح، ضمن إقامة مغلقة بمدخل واحد وحراسة على مدار الساعة. ويتوفّر ملف مفصّل لكل سيناريو.',
        'ندرس معكم السيناريو الملائم لهدفكم — بناء الثروة أو التطوير الذاتي أو إعادة البيع — ونتحقّق من سند الملكية والوضع العمراني ومسار الشراء قبل الاقتناء. ويمكن أن تتمّ المرافقة عن بُعد بالكامل، بالهولندية أو الإنجليزية أو الفرنسية أو العربية.',
      ],
      kenmerken: [
        { label: 'المدينة', waarde: 'طنجة (أشقار)' },
        { label: 'النوع', waarde: 'أرض للبناء' },
        { label: 'المساحة الإجمالية', waarde: '39.051 م²' },
        { label: 'القابلة للبناء', waarde: '17.180 م²' },
        { label: 'التصميم', waarde: 'المنطقة A2 · R+1' },
        { label: 'الملكية', waarde: 'تيتر فونسييه' },
      ],
      voorzieningen: [
        'ملكية محفّظة بالكامل (تيتر فونسييه)',
        'ما يقارب أربعة هكتارات من الأرض المتّصلة',
        'ثلاث قطع قابلة للبناء منفصلة في المنطقة A2',
        'مساحة خضراء محميّة (V313) بنحو 3.800 م²',
        'على مسافة مشي من شاطئ أشقار',
        'مقابل النادي الملكي للفروسية «الديترويت»',
      ],
      woningtypen: [
        { type: 'السيناريو 1 — ضيعة راقية', details: '27 فيلا فردية (R+1) على قطع بنحو 510 م²، لكلٍّ مسبح خاص' },
        { type: 'السيناريو 2 — إقامة مؤمّنة', details: '40 فيلا متلاصقة (R+1) بنحو 215 م² مع مسبح، إقامة مغلقة بحراسة على مدار الساعة' },
      ],
      ligging:
        'يقع Le Domaine d’Achakar في حي أشقار السكني على الواجهة الأطلسية لطنجة: على مسافة مشي من شاطئ أشقار، مقابل النادي الملكي للفروسية «الديترويت»، وعلى خمس دقائق من مغارة هرقل، ونحو خمس عشرة دقيقة من مطار طنجة الدولي ومن الملعب الكبير بطنجة (مونديال 2030). وموقع الأرض مبيَّن على الخريطة؛ ويسعدنا مناقشة التفاصيل العقارية وحدود القطعة شخصياً.',
    },
  },

  // ── NEST ──────────────────────────────────────────────────────────────────
  nest: {
    en: {
      kort: 'Modern two-bedroom apartments on Route de Rabat in Tangier, in a secure residence with landscaped courtyards, a pool and underground parking.',
      intro: 'Nest is a modern apartment residence on Route de Rabat in Tangier. It is designed as a gated, secure residential campus with landscaped courtyards, a pool and underground parking. The apartments have two bedrooms and two bathrooms. Maghreb Estates guides international buyers through the purchase and the due diligence of this project.',
      omschrijving: [
        'The project consists of several buildings in an R+4/R+5 layout, grouped around green courtyards with a pool and a separate children’s pool. The architecture is clean and contemporary, with balconies on the apartments and a strong focus on the shared outdoor space.',
        'The residence is secured with controlled access and surveillance cameras, and has a concierge, a lift and an underground parking garage. The apartments have two bedrooms and two bathrooms, with living areas between roughly 68 and 82 m².',
        'Tangier is one of the fastest-growing cities in Morocco and strongly connected to the northern diaspora. We help you choose the right apartment, verify the title deed and the contract, and guide the transfer — entirely remotely if needed.',
      ],
      kenmerken: [
        { label: 'City', waarde: 'Tangier (Route de Rabat)' },
        { label: 'Type', waarde: 'Apartments — 2 bedrooms, 2 bathrooms' },
        { label: 'Living area', waarde: 'Approx. 68–82 m²' },
        { label: 'Layout', waarde: 'Secure residence, R+4/R+5' },
      ],
      voorzieningen: ['Secure residence with controlled access', 'Surveillance cameras and concierge', 'Landscaped courtyards and green areas', 'Pool and separate children’s pool', 'Underground parking garage', 'Lift and balcony'],
      woningtypen: [{ type: 'Apartment — 2 bedrooms', details: '2 bathrooms, approx. 68–82 m², with balcony' }],
      ligging: 'Nest lies on Route de Rabat in Tangier, an arterial road with substantial new development south of the centre. We are happy to discuss the exact position within the district in person.',
      prijsPerM2Tekst: 'Guide price from approx. 11,000 MAD per m² (according to the developer)',
    },
    fr: {
      kort: 'Appartements modernes de deux chambres route de Rabat à Tanger, dans une résidence sécurisée avec patios paysagers, piscine et parking souterrain.',
      intro: 'Nest est une résidence d’appartements moderne route de Rabat à Tanger. Elle est conçue comme un campus résidentiel fermé et sécurisé, avec des patios paysagers, une piscine et un parking souterrain. Les appartements comptent deux chambres et deux salles de bains. Maghreb Estates accompagne les acheteurs internationaux dans l’achat et la vérification du dossier de ce projet.',
      omschrijving: [
        'Le projet se compose de plusieurs bâtiments en R+4/R+5, regroupés autour de patios verdoyants avec une piscine et une pataugeoire séparée. L’architecture est épurée et contemporaine, avec des balcons aux appartements et une grande attention portée aux espaces extérieurs communs.',
        'La résidence est sécurisée par un accès contrôlé et des caméras de surveillance, et dispose d’un concierge, d’un ascenseur et d’un parking souterrain. Les appartements comptent deux chambres et deux salles de bains, avec des surfaces habitables comprises entre environ 68 et 82 m².',
        'Tanger est l’une des villes à la croissance la plus rapide du Maroc, fortement liée à la diaspora du nord. Nous vous aidons à choisir le bon appartement, vérifions le titre foncier et le contrat, et accompagnons la transaction — entièrement à distance si nécessaire.',
      ],
      kenmerken: [
        { label: 'Ville', waarde: 'Tanger (route de Rabat)' },
        { label: 'Type', waarde: 'Appartements — 2 chambres, 2 salles de bains' },
        { label: 'Surface habitable', waarde: 'Env. 68–82 m²' },
        { label: 'Configuration', waarde: 'Résidence sécurisée, R+4/R+5' },
      ],
      voorzieningen: ['Résidence sécurisée à accès contrôlé', 'Caméras de surveillance et concierge', 'Patios paysagers et espaces verts', 'Piscine et pataugeoire séparée', 'Parking souterrain', 'Ascenseur et balcon'],
      woningtypen: [{ type: 'Appartement — 2 chambres', details: '2 salles de bains, env. 68–82 m², avec balcon' }],
      ligging: 'Nest se situe route de Rabat à Tanger, un axe en fort développement au sud du centre. Nous évoquons volontiers la localisation exacte au sein du quartier lors d’un échange.',
      prijsPerM2Tekst: 'Prix indicatif à partir d’environ 11 000 MAD/m² (selon le promoteur)',
    },
    ar: {
      kort: 'شقق عصرية بغرفتَي نوم في طريق الرباط بطنجة، ضمن إقامة مؤمّنة بأفنية منسّقة ومسبح ومرآب تحت الأرض.',
      intro: 'Nest إقامة سكنية عصرية في طريق الرباط بطنجة. صُمّمت كمجمّع سكني مغلق ومؤمّن، بأفنية منسّقة ومسبح ومرآب تحت الأرض. تضم الشقق غرفتَي نوم وحمّامين. ترافق Maghreb Estates المشترين الدوليين في شراء هذا المشروع والتحقق من ملفه.',
      omschrijving: [
        'يتكوّن المشروع من عدة مبانٍ بنظام R+4/R+5، مجمّعة حول أفنية خضراء بها مسبح ومسبح منفصل للأطفال. الطراز المعماري نظيف وعصري، بشرفات في الشقق واهتمام كبير بالمساحات الخارجية المشتركة.',
        'الإقامة مؤمّنة بدخول مُراقَب وكاميرات مراقبة، وبها حارس ومصعد ومرآب تحت الأرض. تضم الشقق غرفتَي نوم وحمّامين، بمساحات سكنية بين نحو 68 و82 م².',
        'طنجة من أسرع مدن المغرب نمواً وترتبط بقوة بجالية الشمال. نساعدك في اختيار الشقة المناسبة، ونتحقق من الرسم العقاري والعقد، ونرافق نقل الملكية — كلياً عن بُعد عند الحاجة.',
      ],
      kenmerken: [
        { label: 'المدينة', waarde: 'طنجة (طريق الرباط)' },
        { label: 'النوع', waarde: 'شقق — غرفتا نوم، حمّامان' },
        { label: 'المساحة السكنية', waarde: 'نحو 68–82 م²' },
        { label: 'التصميم', waarde: 'إقامة مؤمّنة، R+4/R+5' },
      ],
      voorzieningen: ['إقامة مؤمّنة بدخول مُراقَب', 'كاميرات مراقبة وحارس', 'أفنية منسّقة ومساحات خضراء', 'مسبح ومسبح منفصل للأطفال', 'مرآب تحت الأرض', 'مصعد وشرفة'],
      woningtypen: [{ type: 'شقة — غرفتا نوم', details: 'حمّامان، نحو 68–82 م²، مع شرفة' }],
      ligging: 'يقع Nest في طريق الرباط بطنجة، محور يشهد تطويراً كبيراً جنوب المركز. يسعدنا مناقشة الموقع الدقيق داخل الحي شخصياً.',
      prijsPerM2Tekst: 'سعر تقريبي ابتداءً من نحو 11.000 درهم للمتر المربع (حسب المطوّر)',
    },
  },

  // Partner Groupe AAFER Immobilier — zie projectenVertalingAafer.ts
  ...aaferVertaling,
  ...allaliVertaling,
};

// Resolved projectinhoud in de gevraagde taal (NL uit projecten.ts, anders vertaald).
export function projectContent(p: Project, taal: Taal) {
  if (taal === 'nl') {
    return {
      kort: p.kort, intro: p.intro, omschrijving: p.omschrijving,
      kenmerken: p.kenmerken, voorzieningen: p.voorzieningen, woningtypen: p.woningtypen,
      ligging: p.ligging,
      prijsVanafTekst: p.prijsVanaf?.tekst, prijsPerM2Tekst: p.prijsPerM2?.tekst,
    };
  }
  const v = projectVertaling[p.slug][taal];
  return {
    kort: v.kort, intro: v.intro, omschrijving: v.omschrijving,
    kenmerken: v.kenmerken, voorzieningen: v.voorzieningen, woningtypen: v.woningtypen,
    ligging: v.ligging, prijsVanafTekst: v.prijsVanafTekst, prijsPerM2Tekst: v.prijsPerM2Tekst,
  };
}

// ── Stadsteksten (alleen de steden mét aanbod) ─────────────────────────────
interface StadVertaling { invalshoek: string; intro: string; verhuur: string }

const stadVertaling: Record<string, Record<VertaalTaal, StadVertaling>> = {
  marrakech: {
    en: {
      invalshoek: 'Morocco’s premier tourist destination, with a strong market for holiday rentals and riads.',
      intro: 'Marrakech is known worldwide and attracts tourists all year round. From riads in the historic medina to villas in the Palmeraie and apartments in Guéliz, the city has a distinctly international market. For those aiming at holiday rentals, Marrakech is one of the most interesting cities.',
      verhuur: 'The potential for holiday rentals in Marrakech is generally high, but varies with season and occupancy. For a realistic picture you should factor in costs, vacancy and management.',
    },
    fr: {
      invalshoek: 'La première destination touristique du Maroc, avec un marché solide pour la location saisonnière et les riads.',
      intro: 'Marrakech est mondialement connue et attire des touristes toute l’année. Des riads de la médina historique aux villas de la Palmeraie et aux appartements de Guéliz, la ville a un marché résolument international. Pour qui vise la location saisonnière, Marrakech est l’une des villes les plus intéressantes.',
      verhuur: 'Le potentiel de location saisonnière à Marrakech est généralement élevé, mais varie selon la saison et le taux d’occupation. Pour une vision réaliste, il faut intégrer les coûts, la vacance et la gestion.',
    },
    ar: {
      invalshoek: 'الوجهة السياحية الأولى في المغرب، بسوق قوي للتأجير السياحي والرياض.',
      intro: 'مراكش مدينة معروفة عالمياً وتجذب السياح طوال العام. من الرياض في المدينة العتيقة إلى الفيلات في النخيل والشقق في كيليز، تتمتع المدينة بسوق دولي بامتياز. ولمن يستهدف التأجير السياحي، تُعدّ مراكش من أكثر المدن جاذبية.',
      verhuur: 'إمكانية التأجير السياحي في مراكش مرتفعة عموماً، لكنها تتغيّر حسب الموسم ونسبة الإشغال. للحصول على صورة واقعية ينبغي احتساب التكاليف وفترات الشغور والإدارة.',
    },
  },
  tanger: {
    en: {
      invalshoek: 'One of the fastest-growing cities in Morocco, with strong value growth and rentals to expats and business tenants.',
      intro: 'Tangier is the gateway between Europe and Africa and one of Morocco’s most dynamic cities. The Tanger Med port, a growing economy and a large diaspora with roots in the north drive sustained demand for property. The city is developing fast, from the modern bay to the historic medina.',
      verhuur: 'Tangier has a mixed rental market: long-term lets to workers and expats, and seasonal rentals in summer. The potential depends strongly on district and type and should be assessed per property.',
    },
    fr: {
      invalshoek: 'L’une des villes à la croissance la plus rapide du Maroc, avec une forte valorisation et de la location aux expatriés et locataires professionnels.',
      intro: 'Tanger est la porte entre l’Europe et l’Afrique et l’une des villes les plus dynamiques du Maroc. Le port Tanger Med, une économie en croissance et une importante diaspora enracinée dans le nord entretiennent une demande soutenue. La ville se développe vite, de la baie moderne à la médina historique.',
      verhuur: 'Tanger connaît un marché locatif mixte : locations longue durée aux actifs et expatriés, et location saisonnière l’été. Le potentiel dépend fortement du quartier et du type, et s’évalue bien par bien.',
    },
    ar: {
      invalshoek: 'من أسرع مدن المغرب نمواً، بنموّ قوي في القيمة وتأجير للمغتربين والمستأجرين المهنيين.',
      intro: 'طنجة بوابة بين أوروبا وإفريقيا ومن أكثر مدن المغرب حيوية. يدفع ميناء طنجة المتوسط واقتصاد نامٍ وجالية كبيرة متجذّرة في الشمال طلباً مستمراً على العقارات. تتطوّر المدينة بسرعة، من الخليج العصري إلى المدينة العتيقة.',
      verhuur: 'تشهد طنجة سوقاً تأجيرية متنوّعة: تأجير طويل الأمد للعاملين والمغتربين، وتأجير موسمي صيفاً. تعتمد الإمكانية بقوة على الحي والنوع وتُقيَّم لكل عقار على حدة.',
    },
  },
  tetouan: {
    en: {
      invalshoek: 'Cultural city with a UNESCO medina, close to the popular seaside towns of Martil and M’diq.',
      intro: 'Tétouan, the “white dove”, lies against the Rif mountains and close to the coast. Its UNESCO-listed medina gives the city character, while Martil and M’diq bring the coast within easy reach. Entry prices are often lower than directly by the sea.',
      verhuur: 'Letting can be interesting to students and workers (long-term) and in summer via the nearby coast. Potential should be assessed per district and property.',
    },
    fr: {
      invalshoek: 'Ville de culture à la médina classée par l’UNESCO, proche des stations balnéaires prisées de Martil et M’diq.',
      intro: 'Tétouan, la « colombe blanche », s’adosse au Rif, à deux pas de la côte. Sa médina classée par l’UNESCO lui donne du caractère, tandis que Martil et M’diq mettent la mer à portée de main. Les prix d’entrée sont souvent plus bas qu’en front de mer.',
      verhuur: 'La location peut intéresser étudiants et actifs (longue durée) et, l’été, la clientèle de la côte voisine. Le potentiel s’évalue par quartier et par bien.',
    },
    ar: {
      invalshoek: 'مدينة ثقافية بمدينة عتيقة مصنّفة من اليونسكو، قرب المنتجعين الساحليين مرتيل والمضيق.',
      intro: 'تطوان، «الحمامة البيضاء»، تستند إلى جبال الريف وتقع قرب الساحل. تمنح المدينة العتيقة المصنّفة من اليونسكو طابعاً خاصاً، بينما يجعل قرب مرتيل والمضيق البحر في المتناول. وغالباً ما تكون أسعار الدخول أقل من الواجهة البحرية.',
      verhuur: 'قد يكون التأجير مجدياً للطلبة والعاملين (طويل الأمد)، وصيفاً عبر الساحل القريب. تُقيَّم الإمكانية حسب الحي والعقار.',
    },
  },
  martil: {
    en: {
      invalshoek: 'Popular seaside town near Tétouan with a busy summer season — strong for seasonal letting.',
      intro: 'Martil is a beloved seaside town right next to Tétouan, with a long promenade and a lively summer season. It is popular with the diaspora for summer stays and for letting in the peak months.',
      verhuur: 'Rental potential is concentrated in the summer months and can be attractive then. For a realistic annual return, factor in the lower occupancy outside the season.',
    },
    fr: {
      invalshoek: 'Station balnéaire prisée près de Tétouan, à la saison estivale animée — idéale pour la location saisonnière.',
      intro: 'Martil est une station balnéaire appréciée tout près de Tétouan, avec une longue corniche et une saison estivale animée. La diaspora l’apprécie pour les séjours d’été et la location en haute saison.',
      verhuur: 'Le potentiel locatif se concentre sur les mois d’été, où il peut être attractif. Pour un rendement annuel réaliste, il faut intégrer l’occupation plus faible hors saison.',
    },
    ar: {
      invalshoek: 'منتجع ساحلي محبوب قرب تطوان بموسم صيفي نشيط — مناسب للتأجير الموسمي.',
      intro: 'مرتيل منتجع ساحلي محبوب بجوار تطوان، بكورنيش طويل وموسم صيفي حيوي. تفضّله الجالية للإقامة الصيفية وللتأجير في أشهر الذروة.',
      verhuur: 'تتركّز إمكانية التأجير في أشهر الصيف وقد تكون مجزية حينها. وللحصول على عائد سنوي واقعي ينبغي احتساب انخفاض الإشغال خارج الموسم.',
    },
  },
  mdiq: {
    en: {
      invalshoek: 'Well-kept, modern seaside town with a marina — focused on quality coastal property, including Cabo Negro and Tamuda Bay.',
      intro: 'M’diq lies between Tétouan and Fnideq and is regarded as one of the best-kept seaside towns in the north, with a marina and high-quality new developments. The area also includes the resorts of Cabo Negro and Tamuda Bay, and attracts buyers looking for quality by the sea.',
      verhuur: 'M’diq has an attractive holiday-rental market in the quality segment. Achievable occupancy and returns should be assessed per property.',
    },
    fr: {
      invalshoek: 'Station balnéaire moderne et soignée avec marina — axée sur l’immobilier côtier de qualité, Cabo Negro et Tamuda Bay compris.',
      intro: 'M’diq se situe entre Tétouan et Fnideq et passe pour l’une des stations balnéaires les plus soignées du Nord, avec une marina et des programmes neufs de qualité. Le secteur comprend aussi Cabo Negro et Tamuda Bay et attire les acquéreurs en quête de qualité en bord de mer.',
      verhuur: 'M’diq offre un marché de location de vacances attractif dans le segment qualitatif. L’occupation et le rendement atteignables s’évaluent bien par bien.',
    },
    ar: {
      invalshoek: 'مدينة ساحلية عصرية وأنيقة بمارينا — تركّز على العقار الساحلي عالي الجودة، بما في ذلك كابو نيغرو وتمودة باي.',
      intro: 'تقع المضيق بين تطوان والفنيدق وتُعدّ من أكثر المدن الساحلية أناقة في الشمال، بمارينا ومشاريع جديدة عالية الجودة. وتشمل المنطقة أيضاً منتجعَي كابو نيغرو وتمودة باي، وتجذب المشترين الباحثين عن الجودة على البحر.',
      verhuur: 'تتمتع المضيق بسوق جذابة للتأجير السياحي في الفئة الراقية. تُقيَّم نسبة الإشغال والعائد الممكنين لكل عقار على حدة.',
    },
  },
  casablanca: {
    en: {
      invalshoek: 'The economic capital, with the largest and most liquid property market in Morocco — strong for stable, business-driven letting.',
      intro: 'Casablanca is Morocco’s economic engine and has the country’s largest property market. From modern apartments in Anfa to large-scale new developments, the supply is diverse and demand is steady. For those looking for liquidity and long-term value, Casablanca is often a logical choice.',
      verhuur: 'Rental demand in Casablanca is generally steady thanks to business activity. Long-term letting is the norm; the net return differs per district and property and should be calculated individually.',
    },
    fr: {
      invalshoek: 'La capitale économique, avec le marché immobilier le plus grand et le plus liquide du Maroc — solide pour une location stable et professionnelle.',
      intro: 'Casablanca est le moteur économique du Maroc et possède le plus grand marché immobilier du pays. Des appartements modernes d’Anfa aux grands programmes neufs, l’offre est variée et la demande stable. Pour qui recherche liquidité et valeur à long terme, Casablanca est souvent un choix logique.',
      verhuur: 'La demande locative à Casablanca est généralement constante grâce à l’activité économique. La location longue durée est la norme ; le rendement net varie selon le quartier et le bien et doit être calculé au cas par cas.',
    },
    ar: {
      invalshoek: 'العاصمة الاقتصادية، بأكبر سوق عقارية وأكثرها سيولة في المغرب — قوية للتأجير المستقر والمهني.',
      intro: 'الدار البيضاء هي المحرّك الاقتصادي للمغرب وتضم أكبر سوق عقارية في البلاد. من الشقق العصرية في أنفا إلى مشاريع البناء الجديدة الكبرى، العرض متنوّع والطلب مستقر. ولمن يبحث عن السيولة والقيمة على المدى الطويل، كثيراً ما تكون الدار البيضاء خياراً منطقياً.',
      verhuur: 'الطلب على الإيجار في الدار البيضاء ثابت عموماً بفضل النشاط الاقتصادي. التأجير طويل الأمد هو السائد؛ ويختلف العائد الصافي حسب الحي والعقار ويجب حسابه لكل حالة على حدة.',
    },
  },
  mohammedia: {
    en: {
      invalshoek: 'Coastal city between Casablanca and Rabat, with beaches, a calmer pace and growing new-build supply in and around town.',
      intro: 'Mohammedia lies on the Atlantic coast, about 25 kilometres from Casablanca and on the road to Rabat. The city combines beaches and a compact centre with its own port and economic activity. New developments are appearing in and around the city, including in Zenata Eco-City and the coastal town of Mansouria. For those who want to live or invest close to Casablanca, but by the sea and in calmer surroundings, Mohammedia can be interesting.',
      verhuur: 'Mohammedia mainly has long-term rentals to families and workers in the Casablanca region, complemented by summer rentals on the coast. The potential differs per district and should be assessed per property.',
    },
    fr: {
      invalshoek: 'Ville côtière entre Casablanca et Rabat, avec des plages, un rythme plus calme et une offre neuve croissante en ville et alentour.',
      intro: 'Mohammedia se situe sur la côte atlantique, à environ 25 kilomètres de Casablanca et sur l’axe de Rabat. La ville associe plages et centre à taille humaine, avec son propre port et une activité économique. De nouveaux programmes voient le jour en ville et alentour, notamment à Zenata Éco-Cité et dans la station balnéaire de Mansouria. Pour qui veut vivre ou investir près de Casablanca, mais au bord de la mer et dans un cadre plus calme, Mohammedia peut être intéressante.',
      verhuur: 'Mohammedia connaît surtout la location longue durée aux familles et aux actifs de la région de Casablanca, complétée par la location estivale sur la côte. Le potentiel varie selon le quartier et s’évalue bien par bien.',
    },
    ar: {
      invalshoek: 'مدينة ساحلية بين الدار البيضاء والرباط، بشواطئ وإيقاع أهدأ وعرض متزايد من المشاريع الجديدة داخل المدينة وحولها.',
      intro: 'تقع المحمدية على الساحل الأطلسي، على بعد نحو 25 كيلومتراً من الدار البيضاء وعلى الطريق نحو الرباط. تجمع المدينة بين الشواطئ ومركز متوسط الحجم، مع ميناء خاص بها ونشاط اقتصادي. وتظهر مشاريع جديدة داخل المدينة وحولها، منها في مدينة زناتة الإيكولوجية وفي المنصورية الساحلية. ولمن يريد السكن أو الاستثمار قرب الدار البيضاء، لكن على البحر وفي محيط أهدأ، قد تكون المحمدية خياراً مثيراً للاهتمام.',
      verhuur: 'تعرف المحمدية أساساً التأجير طويل الأمد للأسر والعاملين في جهة الدار البيضاء، إلى جانب التأجير الصيفي على الساحل. وتختلف الإمكانية حسب الحي وتُقيَّم لكل عقار على حدة.',
    },
  },
};

/** Resolved stadsteksten (NL uit steden.ts, anders vertaald). */
export function stadContent(stadSlug: string, taal: Taal): { invalshoek: string; intro: string; verhuur: string } {
  const s = steden.find((x) => x.slug === stadSlug) as Stad;
  if (taal === 'nl') return { invalshoek: s.invalshoek, intro: s.intro, verhuur: s.verhuur };
  const v = stadVertaling[stadSlug][taal];
  return { invalshoek: v.invalshoek, intro: v.intro, verhuur: v.verhuur };
}
