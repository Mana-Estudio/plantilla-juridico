// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFile, writeFile } from 'node:fs/promises';

// La URL pública del despacho (canonical, sitemap, Open Graph). En la web de un cliente: su dominio.
const SITE = process.env.SITE_URL ?? 'https://www.riosyasociados.example';
// Todo build es de staging (noindex) salvo ENTORNO=produccion.
const PRODUCCION = process.env.ENTORNO === 'produccion';

/** En staging suma X-Robots-Tag: noindex DENTRO del bloque /* de _headers (dos bloques /*: el segundo pisa al primero). */
function noindexEnStaging() {
  return {
    name: 'mana:noindex-staging',
    hooks: {
      /** @param {{ dir: URL, logger: import('astro').AstroIntegrationLogger }} opciones */
      'astro:build:done': async ({ dir, logger }) => {
        if (PRODUCCION) return logger.info('ENTORNO=produccion: sin noindex');
        const archivo = new URL('_headers', dir);
        const actual = await readFile(archivo, 'utf8').catch(() => '');
        const linea = '  X-Robots-Tag: noindex, nofollow';
        const nuevo = /^\/\*\s*$/m.test(actual) ? actual.replace(/^\/\*\s*$/m, `/*\n${linea}`) : `${actual}\n/*\n${linea}\n`;
        await writeFile(archivo, nuevo);
        logger.info('staging: X-Robots-Tag noindex en _headers');
      },
    },
  };
}

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'never' },
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  image: { responsiveStyles: false },
  integrations: [
    sitemap({ filter: (pagina) => !/\/(gracias|404)\/?$/.test(pagina) }),
    noindexEnStaging(),
  ],
  // Nada de scripts ni estilos en línea: la CSP solo permite 'self'.
  vite: { build: { assetsInlineLimit: 0 } },
});
