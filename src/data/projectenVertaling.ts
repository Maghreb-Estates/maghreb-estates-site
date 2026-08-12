// Vertaalde proj/stad-teksten voor het aanbod. Het Nederlands blijft in
// projecten.ts / steden.ts (bron); hier staan de EN/FR/AR-versies. De
// structurele velden (foto's, coördinaten, prijsbedragen voor schema) komen
// altijd uit projecten.ts en worden niet gedupliceerd.

import type { Taal } from '../i18n/config';
import type { Project, Kenmerk } from './projecten';
import { steden, type Stad } from './steden';

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
  // ── PROJET OR ─────────────────────────────────────────────────────────────
  'projet-or': {
    en: {
      kort: 'Modern, secure apartment residence in Agdal with two pools, a spa and fitness, less than 15 minutes from the airport.',
      intro: 'Projet Or is a modern apartment residence in Agdal, one of the most sought-after neighbourhoods in Marrakech. The secure complex combines generous outdoor space — two pools, gardens and a rooftop terrace with panoramic views — with amenities such as a spa and fitness. Maghreb Estates guides you through the selection, the due diligence and the purchase of an apartment in this project.',
      omschrijving: [
        'The project comprises 348 apartments in a gated, guarded residence. The architecture is modern and refined, with a strong focus on shared outdoor space and greenery. Two outdoor pools and landscaped gardens form the heart of the complex; on the roof there is a terrace with panoramic views over the surroundings.',
        'Inside the residence there is a spa and a fitness area, and the whole is secured with controlled access. Thanks to its location in Agdal, shopping centres, restaurants, several golf courses and healthcare facilities are close by, and Marrakech airport is reachable in under fifteen minutes.',
        'We review with you which unit types suit your goal — own use, a second home or rental — and check the title deed, the purchase contract and the payment route before you buy. Guidance can be entirely remote, in Dutch, English, French or Arabic.',
      ],
      kenmerken: [
        { label: 'City', waarde: 'Marrakech (Agdal)' },
        { label: 'Type', waarde: 'Apartments' },
        { label: 'Units', waarde: '348 apartments' },
        { label: 'Guide price', waarde: 'From 1.4 million MAD' },
      ],
      voorzieningen: ['Two outdoor pools', 'Landscaped gardens and green areas', 'Spa', 'Fitness area', 'Gated residence with controlled access', 'Rooftop terrace with panoramic views'],
      ligging: 'Projet Or lies in Agdal, a central and sought-after residential district of Marrakech. Shopping centres, restaurants, several golf courses and healthcare facilities are in the immediate vicinity; Marrakech-Menara airport is reachable in under 15 minutes.',
      prijsVanafTekst: 'From 1.4 million MAD',
    },
    fr: {
      kort: 'Résidence d’appartements moderne et sécurisée à Agdal, avec deux piscines, spa et fitness, à moins de 15 minutes de l’aéroport.',
      intro: 'Projet Or est une résidence d’appartements moderne à Agdal, l’un des quartiers les plus recherchés de Marrakech. Le complexe sécurisé associe de généreux espaces extérieurs — deux piscines, des jardins et une terrasse en toiture avec vue panoramique — à des prestations telles qu’un spa et une salle de fitness. Maghreb Estates vous accompagne dans la sélection, la vérification du dossier et l’achat d’un appartement dans ce projet.',
      omschrijving: [
        'Le projet compte 348 appartements dans une résidence fermée et gardée. L’architecture est moderne et soignée, avec une grande attention portée aux espaces extérieurs communs et à la verdure. Deux piscines extérieures et des jardins paysagers forment le cœur du complexe ; en toiture, une terrasse offre une vue panoramique sur les environs.',
        'La résidence dispose d’un spa et d’un espace fitness, et l’ensemble est sécurisé par un accès contrôlé. Grâce à sa situation à Agdal, centres commerciaux, restaurants, plusieurs golfs et établissements de santé sont à proximité, et l’aéroport de Marrakech est accessible en moins d’un quart d’heure.',
        'Nous examinons avec vous les types de logements adaptés à votre objectif — usage personnel, résidence secondaire ou location — et vérifions le titre foncier, le contrat et le circuit de paiement avant l’achat. L’accompagnement peut se faire entièrement à distance, en néerlandais, anglais, français ou arabe.',
      ],
      kenmerken: [
        { label: 'Ville', waarde: 'Marrakech (Agdal)' },
        { label: 'Type', waarde: 'Appartements' },
        { label: 'Logements', waarde: '348 appartements' },
        { label: 'Prix indicatif', waarde: 'À partir de 1,4 million MAD' },
      ],
      voorzieningen: ['Deux piscines extérieures', 'Jardins paysagers et espaces verts', 'Spa', 'Espace fitness', 'Résidence fermée à accès contrôlé', 'Terrasse en toiture avec vue panoramique'],
      ligging: 'Projet Or se situe à Agdal, un quartier résidentiel central et recherché de Marrakech. Centres commerciaux, restaurants, plusieurs golfs et établissements de santé se trouvent à proximité immédiate ; l’aéroport Marrakech-Ménara est accessible en moins de 15 minutes.',
      prijsVanafTekst: 'À partir de 1,4 million MAD',
    },
    ar: {
      kort: 'إقامة سكنية عصرية ومؤمّنة في أكدال مع مسبحين وسبا وقاعة لياقة، على بُعد أقل من 15 دقيقة من المطار.',
      intro: 'Projet Or إقامة سكنية عصرية في حي أكدال، أحد أكثر أحياء مراكش رواجاً. يجمع المجمّع المؤمّن بين مساحات خارجية واسعة — مسبحين وحدائق وسطح مع إطلالة بانورامية — ومرافق مثل السبا وقاعة اللياقة. ترافقك Maghreb Estates في الاختيار والتحقق من الملف وشراء شقة في هذا المشروع.',
      omschrijving: [
        'يضم المشروع 348 شقة في إقامة مغلقة وحُرّاسة. الطراز المعماري عصري وأنيق، مع اهتمام كبير بالمساحات الخارجية المشتركة والمساحات الخضراء. يشكّل مسبحان خارجيان وحدائق منسّقة قلب المجمّع، وفي السطح شرفة بإطلالة بانورامية على المحيط.',
        'تضم الإقامة سبا وقاعة لياقة، والمجمّع مؤمّن بدخول مُراقَب. وبفضل موقعها في أكدال، تقع مراكز التسوق والمطاعم وعدة ملاعب غولف والمرافق الصحية على مقربة، والمطار على بُعد أقل من ربع ساعة.',
        'نراجع معك أنواع الوحدات المناسبة لهدفك — سكن شخصي أو منزل ثانٍ أو تأجير — ونتحقق من الرسم العقاري والعقد ومسار الدفع قبل الشراء. يمكن أن تتم المرافقة كلياً عن بُعد، بالهولندية أو الإنجليزية أو الفرنسية أو العربية.',
      ],
      kenmerken: [
        { label: 'المدينة', waarde: 'مراكش (أكدال)' },
        { label: 'النوع', waarde: 'شقق' },
        { label: 'عدد الوحدات', waarde: '348 شقة' },
        { label: 'السعر التقريبي', waarde: 'ابتداءً من 1.4 مليون درهم' },
      ],
      voorzieningen: ['مسبحان خارجيان', 'حدائق منسّقة ومساحات خضراء', 'سبا', 'قاعة لياقة', 'إقامة مغلقة بدخول مُراقَب', 'شرفة سطح بإطلالة بانورامية'],
      ligging: 'يقع Projet Or في أكدال، حي سكني مركزي ومرغوب في مراكش. تقع مراكز التسوق والمطاعم وعدة ملاعب غولف والمرافق الصحية في المحيط المباشر، ومطار مراكش-المنارة على بُعد أقل من 15 دقيقة.',
      prijsVanafTekst: 'ابتداءً من 1.4 مليون درهم',
    },
  },

  // ── MARRAKECH GOLF CITY ───────────────────────────────────────────────────
  'golf-city': {
    en: {
      kort: 'Large golf-resort district by Prestigia on Avenue Mohammed VI, around the 18-hole Montgomerie golf course, with apartments and villas.',
      intro: 'Marrakech Golf City is a large, mixed residential district by developer Prestigia, located on Avenue Mohammed VI near Hivernage. The project is built around an 18-hole golf course (The Montgomerie) and combines apartments and villas with a clubhouse, shopping centre and hotel facilities. Maghreb Estates guides you through the orientation on this project and a possible purchase.',
      omschrijving: [
        'Golf City is one of the best-known golf-resort developments in Marrakech. The district covers a large area and is laid out around the 18-hole golf course designed by Colin Montgomerie. Besides the greenery, the project includes a clubhouse with restaurants, a shopping centre, hotel facilities and recreational amenities.',
        'The housing mix is varied: apartments with two or three bedrooms and different villa types, from semi-detached to detached homes. The architecture and the park-like street plan give the district a calm, residential character a short distance from the centre of Marrakech.',
        'Because availability and terms differ by phase and unit type, we always verify them with the source before you decide. We assist with unit selection, the due diligence and guidance through to the transfer — entirely remotely if needed.',
      ],
      kenmerken: [
        { label: 'City', waarde: 'Marrakech (Avenue Mohammed VI)' },
        { label: 'Type', waarde: 'Apartments and villas' },
        { label: 'Developer', waarde: 'Prestigia' },
        { label: 'Highlight', waarde: '18-hole golf course (The Montgomerie)' },
      ],
      voorzieningen: ['18-hole golf course (The Montgomerie Marrakech)', 'Clubhouse with restaurants', 'Shopping centre', 'Hotel facilities', 'Park-like, residential setting'],
      woningtypen: [
        { type: 'Apartment — 2 bedrooms', details: 'from approx. 75 m²' },
        { type: 'Apartment — 3 bedrooms', details: 'from approx. 95 m²' },
        { type: 'Villa (semi-detached / detached)', details: 'approx. 300–500 m² plot' },
      ],
      ligging: 'Marrakech Golf City lies on Avenue Mohammed VI, an extension of the Hivernage district, a short distance from the centre of Marrakech. The district itself is laid out around the golf course and has its own amenities.',
    },
    fr: {
      kort: 'Grand quartier golfique de Prestigia sur l’Avenue Mohammed VI, autour du parcours de golf 18 trous The Montgomerie, avec appartements et villas.',
      intro: 'Marrakech Golf City est un grand quartier résidentiel mixte du promoteur Prestigia, situé Avenue Mohammed VI, près de l’Hivernage. Le projet s’organise autour d’un parcours de golf 18 trous (The Montgomerie) et associe appartements et villas à un clubhouse, un centre commercial et des équipements hôteliers. Maghreb Estates vous accompagne dans l’orientation sur ce projet et un éventuel achat.',
      omschrijving: [
        'Golf City est l’un des développements golfiques les plus connus de Marrakech. Le quartier couvre une vaste superficie et s’organise autour du parcours 18 trous dessiné par Colin Montgomerie. Outre les espaces verts, le projet comprend un clubhouse avec restaurants, un centre commercial, des équipements hôteliers et des installations de loisirs.',
        'L’offre de logements est variée : appartements de deux ou trois chambres et différents types de villas, du jumelé à l’individuel. L’architecture et le plan de rues paysager confèrent au quartier un caractère résidentiel et paisible, à faible distance du centre de Marrakech.',
        'La disponibilité et les conditions variant selon la phase et le type de logement, nous les vérifions toujours à la source avant votre décision. Nous vous assistons dans la sélection, la vérification du dossier et l’accompagnement jusqu’à la signature — entièrement à distance si nécessaire.',
      ],
      kenmerken: [
        { label: 'Ville', waarde: 'Marrakech (Avenue Mohammed VI)' },
        { label: 'Type', waarde: 'Appartements et villas' },
        { label: 'Promoteur', waarde: 'Prestigia' },
        { label: 'Atout', waarde: 'Golf 18 trous (The Montgomerie)' },
      ],
      voorzieningen: ['Parcours de golf 18 trous (The Montgomerie Marrakech)', 'Clubhouse avec restaurants', 'Centre commercial', 'Équipements hôteliers', 'Cadre résidentiel et paysager'],
      woningtypen: [
        { type: 'Appartement — 2 chambres', details: 'à partir d’env. 75 m²' },
        { type: 'Appartement — 3 chambres', details: 'à partir d’env. 95 m²' },
        { type: 'Villa (jumelée / individuelle)', details: 'env. 300–500 m² de terrain' },
      ],
      ligging: 'Marrakech Golf City se situe Avenue Mohammed VI, dans le prolongement du quartier de l’Hivernage, à faible distance du centre de Marrakech. Le quartier est organisé autour du golf et dispose de ses propres équipements.',
    },
    ar: {
      kort: 'حي غولف كبير من Prestigia على شارع محمد السادس، حول ملعب غولف من 18 حفرة (The Montgomerie)، مع شقق وفيلات.',
      intro: 'Marrakech Golf City حي سكني كبير ومتنوّع من المطوّر Prestigia، يقع على شارع محمد السادس قرب حي الهايفرناج. يتمحور المشروع حول ملعب غولف من 18 حفرة (The Montgomerie) ويجمع بين الشقق والفيلات مع نادٍ ومركز تجاري ومرافق فندقية. ترافقك Maghreb Estates في التعرّف على هذا المشروع وفي الشراء المحتمل.',
      omschrijving: [
        'يُعدّ Golf City من أشهر مشاريع منتجعات الغولف في مراكش. يمتد الحي على مساحة واسعة ويتمحور حول ملعب الغولف من 18 حفرة الذي صمّمه كولين مونتغومري. إلى جانب المساحات الخضراء، يضم المشروع نادياً به مطاعم ومركزاً تجارياً ومرافق فندقية ومنشآت ترفيهية.',
        'تشكيلة السكن متنوّعة: شقق بغرفتين أو ثلاث غرف نوم وأنواع فيلات مختلفة، من المتلاصقة إلى المنفصلة. يمنح الطراز المعماري وتخطيط الشوارع الحديقي الحيَّ طابعاً سكنياً هادئاً على مسافة قصيرة من وسط مراكش.',
        'ولأن التوافر والشروط تختلف حسب المرحلة ونوع الوحدة، نتحقق منها دائماً من المصدر قبل قرارك. نساعدك في اختيار الوحدة والتحقق من الملف والمرافقة حتى نقل الملكية — كلياً عن بُعد عند الحاجة.',
      ],
      kenmerken: [
        { label: 'المدينة', waarde: 'مراكش (شارع محمد السادس)' },
        { label: 'النوع', waarde: 'شقق وفيلات' },
        { label: 'المطوّر', waarde: 'Prestigia' },
        { label: 'ميزة', waarde: 'ملعب غولف من 18 حفرة (The Montgomerie)' },
      ],
      voorzieningen: ['ملعب غولف من 18 حفرة (The Montgomerie Marrakech)', 'نادٍ به مطاعم', 'مركز تجاري', 'مرافق فندقية', 'محيط سكني ذو طابع حديقي'],
      woningtypen: [
        { type: 'شقة — غرفتا نوم', details: 'ابتداءً من نحو 75 م²' },
        { type: 'شقة — ثلاث غرف نوم', details: 'ابتداءً من نحو 95 م²' },
        { type: 'فيلا (متلاصقة / منفصلة)', details: 'نحو 300–500 م² أرض' },
      ],
      ligging: 'يقع Marrakech Golf City على شارع محمد السادس، امتداداً لحي الهايفرناج، على مسافة قصيرة من وسط مراكش. الحي نفسه منظّم حول ملعب الغولف وله مرافقه الخاصة.',
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
};

/** Resolved stadsteksten (NL uit steden.ts, anders vertaald). */
export function stadContent(stadSlug: string, taal: Taal): { invalshoek: string; intro: string; verhuur: string } {
  const s = steden.find((x) => x.slug === stadSlug) as Stad;
  if (taal === 'nl') return { invalshoek: s.invalshoek, intro: s.intro, verhuur: s.verhuur };
  const v = stadVertaling[stadSlug][taal];
  return { invalshoek: v.invalshoek, intro: v.intro, verhuur: v.verhuur };
}
