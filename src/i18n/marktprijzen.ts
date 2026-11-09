// Marktprijzenpagina (/vastgoedprijzen-marokko/ en /{lang}/…): alle tekst per taal.
// Opmaak: src/components/MarktprijzenPagina.astro. Cijfers: src/data/marktprijzen.json
// (scripts/marktprijzen.py), opgemaakt via src/data/prijsOpmaak.ts.
//
// Placeholders: {steden}, {datum}, {van}, {n}, {min}, {prijzen}.
//
// Afspraak (november 2026): geen namen van portals of andere bronnen op de pagina.
// Wel altijd: datum, steekproef, methode en het label "vraagprijs, geen verkoopprijs".

import type { Taal } from './config';

export interface MarktprijzenTekst {
  meta: { title: string; description: string };
  kruimel: string;
  eyebrow: string; titel: string; intro: string;
  kern: { bijgewerkt: string; advertenties: string; letOp: string; letOpTekst: string };
  tabelTitel: string;
  kolomStad: string; kolomType: string; kolomMediaan: string; kolomBereik: string; kolomN: string;
  types: { appartement: string; villa: string };
  eenheid: string;
  wijkenTitel: string; wijkenIntro: string; kolomWijk: string;
  methodeKop: string; methode: string[];
  faqTitel: string; faqs: { q: string; a: string }[];
  /** Afsluitende CTA: verkopers naar de verkooppagina, kopers naar het adviesgesprek. */
  cta: { titel: string; tekst: string; verkopen: string; kopen: string };
  /** Eén stad in de opsomming {prijzen}, bv. "{prijs} à {stad}". */
  inStad: string;
  /** Dataset-schema: naam en gemeten grootheid. */
  dataset: { naam: string; variabele: string };
  /** Wijknamen in eigen schrift (alleen Arabisch); anders de Latijnse naam. */
  wijkNamen?: Record<string, string>;
}

export const marktprijzenTekst: Record<Taal, MarktprijzenTekst> = {
  // ---------------------------------------------------------------- NEDERLANDS
  nl: {
    meta: {
      title: 'Vastgoedprijzen in Marokko per m² | Maghreb Estates',
      description: 'Mediane vraagprijs per m² voor appartementen en villa’s in {steden}, per stad en per wijk. Met datum, steekproef en methode.',
    },
    kruimel: 'Vastgoedprijzen in Marokko',
    eyebrow: 'Marktanalyse',
    titel: 'Vastgoedprijzen in Marokko: prijs per m² per stad en per wijk',
    intro: 'Wat vragen verkopers per vierkante meter? Hieronder staan de mediane vraagprijzen uit verkoopadvertenties voor appartementen, villa’s en huizen in {steden}, berekend door Maghreb Estates op basis van een eigen verzameling advertenties.',
    kern: { bijgewerkt: 'Bijgewerkt', advertenties: 'Geanalyseerde advertenties', letOp: 'Let op', letOpTekst: 'vraagprijs ≠ verkoopprijs' },
    tabelTitel: 'Mediane vraagprijs per stad en type woning',
    kolomStad: 'Stad', kolomType: 'Type', kolomMediaan: 'Mediane vraagprijs', kolomBereik: 'Middelste helft van de advertenties', kolomN: 'Advertenties',
    types: { appartement: 'Appartement', villa: 'Villa / huis' },
    eenheid: 'MAD/m²',
    wijkenTitel: 'Appartementen per wijk',
    wijkenIntro: 'Alleen wijken met minstens {min} advertenties.',
    kolomWijk: 'Wijk',
    methodeKop: 'Methode',
    methode: [
      'Deze cijfers zijn vraagprijzen uit advertenties, niet de definitieve verkoopprijzen bij de notaris. De prijs waarvoor een woning echt verkocht wordt, ligt vaak lager.',
      'Bron: openbare vastgoedadvertenties van de grote Marokkaanse portals, die Maghreb Estates elke week verzamelt. Voor deze cijfers tellen alleen koopadvertenties in dirham van appartementen, villa’s en huizen in {steden} die tussen {van} en {datum} online stonden. Dubbele advertenties tellen één keer. Advertenties zonder oppervlakte of met een onwaarschijnlijke prijs per m² (onder 500 of boven 150.000 MAD) tellen niet mee.',
      'Steekproef: {n} advertenties. De mediaan is de middelste waarde: de helft van de advertenties vraagt meer, de helft minder. De oppervlakte is die uit de advertentie; bij een villa kan dat ook het perceel zijn.',
      'Wij werken deze cijfers regelmatig bij. De datum bovenaan is altijd die van de getoonde cijfers.',
    ],
    faqTitel: 'Veelgestelde vragen over vastgoedprijzen',
    faqs: [
      { q: 'Wat is de prijs per m² van een appartement in Marokko?', a: 'Volgens de {n} advertenties die wij tot en met {datum} analyseerden, is de mediane vraagprijs voor een appartement {prijzen}. Dat zijn vraagprijzen, geen verkoopprijzen bij de notaris.' },
      { q: 'Zijn dit de echte verkoopprijzen?', a: 'Nee. Het zijn de prijzen die in advertenties gevraagd worden. De uiteindelijke verkoopprijs bij de notaris ligt vaak lager en verschilt sterk per wijk, verdieping, staat en eigendomstitel. Voor een concrete woning vergelijkt een waardebepaling uw woning met soortgelijke woningen in dezelfde wijk.' },
    ],
    cta: {
      titel: 'Verkoopt of koopt u in Marokko?',
      tekst: 'Wij vertalen deze cijfers naar een concrete prijs voor uw woning, of naar een realistisch bod op de woning die u op het oog hebt.',
      verkopen: 'Laat mijn woning waarderen',
      kopen: 'Plan een adviesgesprek',
    },
    inStad: '{prijs} in {stad}',
    dataset: { naam: 'Mediane vraagprijs per m² voor woningen in Marokko', variabele: 'Mediane vraagprijs per m² (MAD)' },
  },

  // ------------------------------------------------------------------- ENGLISH
  en: {
    meta: {
      title: 'Property prices in Morocco per m² | Maghreb Estates',
      description: 'Median asking price per m² for apartments and villas in {steden}, by city and by neighbourhood. With date, sample and method.',
    },
    kruimel: 'Property prices in Morocco',
    eyebrow: 'Market analysis',
    titel: 'Property prices in Morocco: price per m² by city and neighbourhood',
    intro: 'What do sellers ask per square metre? Below are the median asking prices in sale listings for apartments, villas and houses in {steden}, calculated by Maghreb Estates from its own collection of listings.',
    kern: { bijgewerkt: 'Last updated', advertenties: 'Listings analysed', letOp: 'Important', letOpTekst: 'asking price ≠ sale price' },
    tabelTitel: 'Median asking price by city and property type',
    kolomStad: 'City', kolomType: 'Type', kolomMediaan: 'Median asking price', kolomBereik: 'Middle half of listings', kolomN: 'Listings',
    types: { appartement: 'Apartment', villa: 'Villa / house' },
    eenheid: 'MAD/m²',
    wijkenTitel: 'Apartments by neighbourhood',
    wijkenIntro: 'Only neighbourhoods with at least {min} listings.',
    kolomWijk: 'Neighbourhood',
    methodeKop: 'Method',
    methode: [
      'These figures are asking prices from listings, not final sale prices at the notary. The price a property actually sells for is often lower.',
      'Source: public property listings from the major Moroccan portals, collected every week by Maghreb Estates. For these figures we only count sale listings in dirhams for apartments, villas and houses in {steden} that were online between {van} and {datum}. Duplicate listings count once. Listings without a floor area or with an implausible price per m² (below 500 or above 150,000 MAD) are left out.',
      'Sample: {n} listings. The median is the middle value: half of the listings ask more, half ask less. The floor area is the one stated in the listing; for a villa, it may include the plot.',
      'We update these figures regularly. The date above is always the date of the figures shown.',
    ],
    faqTitel: 'Frequently asked questions about prices',
    faqs: [
      { q: 'What is the price per m² of an apartment in Morocco?', a: 'Based on the {n} listings we analysed up to {datum}, the median asking price for an apartment is {prijzen}. These are asking prices, not sale prices at the notary.' },
      { q: 'Are these the actual sale prices?', a: 'No. They are the prices asked in listings. The final sale price at the notary is often lower and varies a lot by neighbourhood, floor, condition and title deed. For a specific property, a valuation compares it with similar homes in the same neighbourhood.' },
    ],
    cta: {
      titel: 'Selling or buying in Morocco?',
      tekst: 'We translate these figures into a concrete price for your property, or into a realistic offer for the property you have in mind.',
      verkopen: 'Get my property valued',
      kopen: 'Book a consultation',
    },
    inStad: '{prijs} in {stad}',
    dataset: { naam: 'Median asking price per m² of homes in Morocco', variabele: 'Median asking price per m² (MAD)' },
  },

  // -------------------------------------------------------------------- FRANÇAIS
  fr: {
    meta: {
      title: 'Prix de l’immobilier au Maroc au m² | Maghreb Estates',
      description: 'Prix médian demandé au m² pour les appartements et les villas à {steden}, par ville et par quartier. Avec date, échantillon et méthodologie.',
    },
    kruimel: 'Prix de l’immobilier au Maroc',
    eyebrow: 'Analyse du marché',
    titel: 'Prix de l’immobilier au Maroc : prix au m² par ville et par quartier',
    intro: 'Combien demandent les vendeurs au mètre carré ? Voici les prix médians demandés dans les annonces de vente d’appartements, de villas et de maisons à {steden}, calculés par Maghreb Estates à partir de sa propre collecte d’annonces.',
    kern: { bijgewerkt: 'Dernière mise à jour', advertenties: 'Annonces analysées', letOp: 'Important', letOpTekst: 'prix demandés ≠ prix de transaction' },
    tabelTitel: 'Prix médian demandé par ville et type de bien',
    kolomStad: 'Ville', kolomType: 'Type', kolomMediaan: 'Prix médian demandé', kolomBereik: 'La moitié des annonces entre', kolomN: 'Annonces',
    types: { appartement: 'Appartement', villa: 'Villa / maison' },
    eenheid: 'MAD/m²',
    wijkenTitel: 'Appartements par quartier',
    wijkenIntro: 'Uniquement les quartiers comptant au moins {min} annonces.',
    kolomWijk: 'Quartier',
    methodeKop: 'Méthodologie',
    methode: [
      'Ces chiffres sont des prix demandés dans les annonces, et non les prix de vente définitifs chez le notaire. Le prix auquel un bien se vend réellement est souvent plus bas.',
      'Source : annonces immobilières publiques des grands portails marocains, collectées chaque semaine par Maghreb Estates. Pour ces chiffres, nous retenons uniquement les annonces de vente en dirhams d’appartements, de villas et de maisons à {steden}, en ligne entre le {van} et le {datum}. Les doublons ne comptent qu’une fois. Les annonces sans surface ou avec un prix au m² invraisemblable (moins de 500 ou plus de 150 000 MAD) sont écartées.',
      'Échantillon : {n} annonces. La médiane est la valeur centrale : la moitié des annonces demande plus, l’autre moitié moins. La surface est celle indiquée dans l’annonce ; pour une villa, elle peut inclure le terrain.',
      'Nous actualisons ces chiffres régulièrement. La date indiquée est toujours celle des données affichées.',
    ],
    faqTitel: 'Questions fréquentes sur les prix',
    faqs: [
      { q: 'Quel est le prix au m² d’un appartement au Maroc ?', a: 'D’après les {n} annonces analysées jusqu’au {datum}, le prix médian demandé pour un appartement est de {prijzen}. Ce sont des prix demandés, pas des prix de vente chez le notaire.' },
      { q: 'Ces prix sont-ils les prix de vente réels ?', a: 'Non. Ce sont les prix demandés dans les annonces. Le prix de vente final chez le notaire est souvent plus bas et varie fortement selon le quartier, l’étage, l’état et le titre de propriété. Pour un bien précis, une estimation compare votre bien aux biens similaires de votre quartier.' },
    ],
    cta: {
      titel: 'Vous vendez ou vous achetez au Maroc ?',
      tekst: 'Nous traduisons ces chiffres en un prix concret pour votre bien, ou en une offre réaliste pour le bien que vous visez.',
      verkopen: 'Faire estimer mon bien',
      kopen: 'Prendre rendez-vous',
    },
    inStad: '{prijs} à {stad}',
    dataset: { naam: 'Prix médian demandé au m² des logements au Maroc', variabele: 'Prix médian demandé au m² (MAD)' },
  },

  // -------------------------------------------------------------------- العربية
  ar: {
    meta: {
      title: 'أسعار العقار في المغرب للمتر المربع | Maghreb Estates',
      description: 'السعر الوسيط المطلوب للمتر المربع للشقق والفيلات في {steden}، حسب المدينة والحي. مع التاريخ والعينة والمنهجية.',
    },
    kruimel: 'أسعار العقار في المغرب',
    eyebrow: 'تحليل السوق',
    titel: 'أسعار العقار في المغرب: سعر المتر المربع حسب المدينة والحي',
    intro: 'كم يطلب البائعون للمتر المربع؟ فيما يلي الأسعار الوسيطة المطلوبة في إعلانات بيع الشقق والفيلات والمنازل في {steden}، تحسبها Maghreb Estates انطلاقاً من الإعلانات التي تجمعها بنفسها.',
    kern: { bijgewerkt: 'آخر تحديث', advertenties: 'الإعلانات المحللة', letOp: 'تنبيه', letOpTekst: 'السعر المطلوب ليس سعر البيع الفعلي' },
    tabelTitel: 'السعر الوسيط المطلوب حسب المدينة ونوع العقار',
    kolomStad: 'المدينة', kolomType: 'النوع', kolomMediaan: 'السعر الوسيط المطلوب', kolomBereik: 'نصف الإعلانات بين', kolomN: 'الإعلانات',
    types: { appartement: 'شقة', villa: 'فيلا / منزل' },
    eenheid: 'درهم/م²',
    wijkenTitel: 'الشقق حسب الحي',
    wijkenIntro: 'فقط الأحياء التي تضم {min} إعلاناً على الأقل.',
    kolomWijk: 'الحي',
    methodeKop: 'المنهجية',
    methode: [
      'هذه الأرقام أسعار مطلوبة في الإعلانات، وليست أسعار البيع النهائية لدى الموثق. وغالباً ما يكون السعر الذي يُباع به العقار فعلاً أقل.',
      'المصدر: إعلانات عقارية عامة من أكبر المنصات المغربية، تجمعها Maghreb Estates كل أسبوع. ولهذه الأرقام نحتسب فقط إعلانات بيع الشقق والفيلات والمنازل بالدرهم في {steden} التي كانت منشورة بين {van} و{datum}. تُحتسب الإعلانات المكررة مرة واحدة، وتُستبعد الإعلانات التي لا تذكر المساحة أو التي يكون فيها سعر المتر غير معقول (أقل من 500 أو أكثر من 150.000 درهم).',
      'العينة: {n} إعلاناً. الوسيط هو القيمة الوسطى: نصف الإعلانات يطلب أكثر والنصف الآخر أقل. المساحة هي المذكورة في الإعلان، وفي حالة الفيلا قد تشمل الأرض.',
      'نحدّث هذه الأرقام بانتظام. والتاريخ المذكور هو دائماً تاريخ البيانات المعروضة.',
    ],
    faqTitel: 'أسئلة شائعة حول الأسعار',
    faqs: [
      { q: 'كم ثمن المتر المربع للشقة في المغرب؟', a: 'حسب {n} إعلاناً حللناها حتى {datum}، يبلغ السعر الوسيط المطلوب للشقة {prijzen}. هذه أسعار مطلوبة وليست أسعار بيع لدى الموثق.' },
      { q: 'هل هذه أسعار البيع الفعلية؟', a: 'لا. إنها الأسعار المطلوبة في الإعلانات. وغالباً ما يكون سعر البيع النهائي لدى الموثق أقل، ويختلف كثيراً حسب الحي والطابق والحالة وسند الملكية. وبالنسبة لعقار محدد، يقارن التقييم عقارك بعقارات مماثلة في نفس الحي.' },
    ],
    cta: {
      titel: 'هل تبيع أو تشتري في المغرب؟',
      tekst: 'نحوّل هذه الأرقام إلى سعر ملموس لعقارك، أو إلى عرض واقعي للعقار الذي تستهدفه.',
      verkopen: 'اطلب تقييم عقاري',
      kopen: 'احجز موعداً استشارياً',
    },
    inStad: '{prijs} في {stad}',
    dataset: { naam: 'السعر الوسيط المطلوب للمتر المربع للمساكن في المغرب', variabele: 'السعر الوسيط المطلوب للمتر المربع (درهم)' },
    wijkNamen: {
      'Agdal': 'أكدال', 'Hay Riad': 'حي الرياض', 'Souissi': 'السويسي',
      'Maârif': 'المعاريف', 'Gauthier': 'غوتييه', 'Racine': 'راسين', 'Aïn Diab': 'عين الذئاب',
      'Les Hôpitaux': 'حي المستشفيات', 'Belvédère': 'بلفيدير', 'Oulfa': 'الألفة',
      'Malabata': 'مالاباطا', 'Tanja Balia': 'طنجة البالية', 'Ibéria': 'إيبيريا', 'Castilla': 'كاستيا', 'Marjane': 'مرجان',
      'Guéliz': 'جليز', 'Hivernage': 'الحي الشتوي', 'Camp El Ghoul': 'كامب الغول', 'Targa': 'تاركة', 'M’hamid': 'المحاميد',
      'Hay Mohammadi': 'الحي المحمدي', 'Hay Salam': 'حي السلام', 'Hay Houda': 'حي الهدى', 'Anza': 'أنزا',
    },
  },
};
