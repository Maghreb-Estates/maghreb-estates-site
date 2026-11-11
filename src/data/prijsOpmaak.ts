// Opmaak van de vraagprijzen uit src/data/marktprijzen.json per taal: getallen,
// datums, stadsnamen en de placeholders. Gedeeld door de verkooppagina (vijf
// stadskaarten) en de marktprijzenpagina (volledige tabellen).
//
// Placeholders in teksten: {steden}, {datum}, {van}, {n}, {min} en {prijzen}
// (de mediane appartementsprijs per stad, als opsomming).
import marktprijzen from './marktprijzen.json';
import type { Taal } from '../i18n/config';
import { verkoopTekst, werkgebied, type WerkgebiedStad } from '../i18n/verkopen';

const locales: Record<Taal, string> = { nl: 'nl-NL', en: 'en-GB', fr: 'fr-FR', ar: 'ar-MA' };

export function prijsOpmaak(taal: Taal, opties: { eenheid: string; inStad: string; wijkNamen?: Record<string, string> }) {
  const { steden: stadNaam, lijst } = verkoopTekst[taal];
  const locale = locales[taal];
  const opsomming = (namen: string[], voegwoord = lijst.en) =>
    `${namen.slice(0, -1).join(lijst.komma)}${voegwoord}${namen[namen.length - 1]}`;
  const getal = (n: number) => new Intl.NumberFormat(locale).format(n);
  const datum = (iso: string) =>
    new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));
  const m2 = (n: number) => `${getal(n)} ${opties.eenheid}`;

  const steden = marktprijzen.steden.map((s) => ({ ...s, naam: stadNaam[s.stad as WerkgebiedStad] }));
  const stadKaarten = steden.flatMap((s) => (s.types.appartement ? [{ naam: s.naam, ...s.types.appartement }] : []));
  const wijken = steden.flatMap((s) =>
    s.wijken.map((w) => ({ ...w, naam: opties.wijkNamen?.[w.naam] ?? w.naam, stad: s.naam })));

  const vul = (tekst: string) => tekst
    .replaceAll('{steden}', opsomming(werkgebied.map((s) => stadNaam[s])))
    .replaceAll('{datum}', datum(marktprijzen.bijgewerkt))
    .replaceAll('{van}', datum(marktprijzen.periode.van))
    .replaceAll('{n}', getal(marktprijzen.advertenties))
    .replaceAll('{min}', getal(marktprijzen.minWijk))
    .replaceAll('{prijzen}', opsomming(
      stadKaarten.map((s) => opties.inStad.replace('{prijs}', m2(s.mediaan)).replace('{stad}', s.naam)),
    ));

  return { data: marktprijzen, getal, datum, m2, steden, stadKaarten, wijken, vul };
}
