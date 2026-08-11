import { site } from './site';
import type { Project } from './projecten';
import { projectPad } from './projecten';

// Herbruikbare JSON-LD builders. Pagina's geven de output door aan BaseLayout `schema`.

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a.replace(/<[^>]+>/g, '') },
    })),
  };
}

export function serviceSchema(opts: { naam: string; beschrijving: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.naam,
    description: opts.beschrijving,
    url: new URL(opts.path, site.url).href,
    areaServed: { '@type': 'Country', name: 'Marokko' },
    provider: { '@id': site.url + '/#organization' },
    serviceType: 'Vastgoedbegeleiding Marokko',
  };
}

// Vastgoedproject → Residence/ApartmentComplex (het fysieke object) plus,
// uitsluitend wanneer de ontwikkelaar een echte prijs noemt, een gekoppelde
// Offer. Geen verzonnen prijs, beschikbaarheid of rating.
export function projectSchema(p: Project) {
  const url = new URL(projectPad(p), site.url).href;
  const abs = (path: string) => new URL(path, site.url).href;
  const images = [p.hero, ...p.galerij.filter((g) => g.src.src !== p.hero.src.src)]
    .slice(0, 6)
    .map((f) => abs(f.src.src));

  // Alleen-appartementen → ApartmentComplex, anders de bredere Residence.
  const type = p.types.length === 1 && p.types[0] === 'Appartementen' ? 'ApartmentComplex' : 'Residence';

  const residence: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': url + '#residence',
    name: p.naam,
    url,
    description: p.kort,
    image: images,
    address: {
      '@type': 'PostalAddress',
      ...(p.wijk ? { streetAddress: p.wijk } : {}),
      addressLocality: p.stadNaam,
      addressRegion: p.regio,
      addressCountry: 'MA',
    },
    containedInPlace: { '@type': 'Place', name: `${p.stadNaam}, Marokko` },
    amenityFeature: p.voorzieningen.map((v) => ({
      '@type': 'LocationFeatureSpecification',
      name: v,
      value: true,
    })),
  };

  const nodes: object[] = [residence];

  // Offer alleen bij een concrete, uit de bron bekende vanaf-prijs.
  if (p.prijsVanaf) {
    nodes.push({
      '@context': 'https://schema.org',
      '@type': 'Offer',
      '@id': url + '#offer',
      itemOffered: { '@id': url + '#residence' },
      priceCurrency: p.prijsVanaf.valuta,
      price: p.prijsVanaf.bedrag,
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: p.prijsVanaf.bedrag,
        priceCurrency: p.prijsVanaf.valuta,
        valueAddedTaxIncluded: false,
      },
      seller: { '@id': site.url + '/#organization' },
      url,
    });
  }

  return nodes;
}

export function articleSchema(opts: { titel: string; beschrijving: string; path: string; image?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.titel,
    description: opts.beschrijving,
    image: new URL(opts.image ?? site.ogImage, site.url).href,
    mainEntityOfPage: new URL(opts.path, site.url).href,
    author: { '@id': site.url + '/#organization' },
    publisher: { '@id': site.url + '/#organization' },
    inLanguage: 'nl-NL',
  };
}
