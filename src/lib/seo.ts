// Datos estructurados (schema.org) que se repiten en varias páginas.
import { despacho } from '../data/despacho';

export function migasJsonld(items: { nombre: string; href?: string }[], ruta: string) {
  const lista = [{ nombre: 'Inicio', href: '/' }, ...items];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: lista.map((i, n) => ({ '@type': 'ListItem', position: n + 1, name: i.nombre, item: new URL(i.href ?? ruta, despacho.url).href })),
  };
}

export const faqJsonld = (preguntas: { p: string; r: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: preguntas.map((q) => ({ '@type': 'Question', name: q.p, acceptedAnswer: { '@type': 'Answer', text: q.r } })),
});

export const servicioJsonld = (nombre: string, descripcion: string, ruta: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: nombre,
  description: descripcion,
  url: new URL(ruta, despacho.url).href,
  provider: { '@id': `${despacho.url}/#despacho` },
  areaServed: { '@type': 'City', name: 'Madrid' },
});

export const herramientaJsonld = (nombre: string, descripcion: string, ruta: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: nombre,
  description: descripcion,
  url: new URL(ruta, despacho.url).href,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  provider: { '@id': `${despacho.url}/#despacho` },
});
