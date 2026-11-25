// EN/FR/AR-vertalingen van het aanbod van partner Groupe Allali
// (zie projectenAllali.ts voor de Nederlandse bron en de gegevensregels).
// Per taal een eigen bestand in ./allali/; hier samengevoegd per projectslug en
// in projectenVertaling.ts gecombineerd met de overige vertalingen.

import type { ProjectVertaling } from './projectenVertaling';
import { en } from './allali/en';
import { fr } from './allali/fr';
import { ar } from './allali/ar';

type Talen = { en: ProjectVertaling; fr: ProjectVertaling; ar: ProjectVertaling };

export const allaliVertaling: Record<string, Talen> = Object.fromEntries(
  Object.keys(en).map((slug) => {
    if (!fr[slug] || !ar[slug]) throw new Error(`Vertaling ontbreekt voor ${slug}`);
    return [slug, { en: en[slug], fr: fr[slug], ar: ar[slug] }];
  }),
);
