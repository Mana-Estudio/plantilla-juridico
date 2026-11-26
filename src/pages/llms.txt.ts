// /llms.txt: resumen del despacho y enlaces clave para asistentes de IA.
import type { APIRoute } from 'astro';
import { despacho, nombreCompleto } from '../data/despacho';
import { areas } from '../data/areas';
import { calculadoras } from '../data/calculadoras';

export const GET: APIRoute = ({ site }) => {
  const url = (r: string) => new URL(r, site).href;
  const texto = `# ${nombreCompleto}

> ${despacho.descripcion}

Dirección: ${despacho.direccion.calle}, ${despacho.direccion.cp} ${despacho.direccion.ciudad}. Teléfono: ${despacho.contacto.telefono}. Email: ${despacho.contacto.email}. ${despacho.colegio}.

## Áreas
${areas.map((a) => `- [${a.nombre}](${url(`/areas/${a.slug}/`)}): ${a.resumen}`).join('\n')}

## Herramientas
${calculadoras.map((c) => `- [${c.nombre}](${url(c.href)}): ${c.texto}`).join('\n')}

## Más
- [Honorarios](${url('/honorarios/')})
- [El despacho y el equipo](${url('/despacho/')})
- [Opiniones y casos](${url('/opiniones/')})
- [Contacto y cita](${url('/contacto/')})
`;
  return new Response(texto, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
