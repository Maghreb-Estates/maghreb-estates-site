// EN/FR/AR-vertalingen van het aanbod van partner Groupe AAFER Immobilier
// (zie projectenAafer.ts voor de Nederlandse bron en de gegevensregels).
// Per taal een eigen bestand in ./aafer/; hier samengevoegd per projectslug en
// in projectenVertaling.ts gecombineerd met de overige vertalingen.

import type { ProjectVertaling } from './projectenVertaling';
import { en } from './aafer/en';
import { fr } from './aafer/fr';
import { ar } from './aafer/ar';

type Talen = { en: ProjectVertaling; fr: ProjectVertaling; ar: ProjectVertaling };

export const aaferVertaling: Record<string, Talen> = Object.fromEntries(
  Object.keys(en).map((slug) => {
    if (!fr[slug] || !ar[slug]) throw new Error(`Vertaling ontbreekt voor ${slug}`);
    return [slug, { en: en[slug], fr: fr[slug], ar: ar[slug] }];
  }),
);
