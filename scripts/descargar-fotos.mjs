// Descarga las fotos de ejemplo de src/data/fotos.json a src/assets/fotos/<slug>.jpg (2000 px de ancho).
//   npm run fotos
// Son fotos de Wikimedia Commons con licencia libre (CC o dominio público): de relleno hasta tener las del despacho.
// Sus créditos salen solos en /creditos/ y en el pie. Para un cliente: reemplazar los archivos (mismo nombre) o
// cambiar fotos.json y volver a correr esto.
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const raiz = new URL('../', import.meta.url);
const fotos = JSON.parse(readFileSync(new URL('src/data/fotos.json', raiz), 'utf8'));
const ANCHO = 2000;
const UA = 'mana-plantilla-juridico/1.0 (descarga de fotos de ejemplo)';

for (const f of fotos) {
  const destino = new URL(`src/assets/fotos/${f.slug}.jpg`, raiz);
  if (existsSync(destino)) { console.log('ya está', f.slug); continue; }
  const nombre = decodeURIComponent(f.fuente.split('/File:')[1]);
  const ancho = Math.min(ANCHO, f.ancho);
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(nombre)}?width=${ancho}`;
  let ok = false;
  // Wikimedia limita las descargas seguidas (HTTP 429): una pausa entre fotos y reintentos cada vez más espaciados.
  for (let i = 0; i < 4 && !ok; i++) {
    try {
      // Si la miniatura a medida no sale (Wikimedia limita los tamaños no estándar), se baja el original.
      const r = await fetch(i < 1 ? url : f.url, { headers: { 'User-Agent': UA } });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      writeFileSync(destino, Buffer.from(await r.arrayBuffer()));
      ok = true;
      console.log('descargada', f.slug, `${ancho}px`);
    } catch (e) {
      console.warn('reintento', f.slug, e.message);
      await new Promise((s) => setTimeout(s, 5000 * 2 ** i));
    }
  }
  await new Promise((s) => setTimeout(s, 1500));
  if (!ok) { console.error('no se pudo bajar', f.slug, fileURLToPath(destino)); process.exitCode = 1; }
}
