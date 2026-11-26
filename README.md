# Plantilla jurídica de Maná

Sitio completo para un despacho de abogados en España, pensado para conseguir clientes y para ser la base de todas las webs del rubro. El despacho del ejemplo, **Ríos & Asociados** (Chamberí, Madrid), no existe: todos sus datos son de ejemplo.

Astro 7 estático + un Worker de Cloudflare para los formularios. Sin cookies, sin scripts de terceros, sin Google Fonts.

## Qué trae

**29 páginas**
- Inicio · índice de áreas · 6 áreas (laboral, familia, herencias, tráfico, penal y empresas)
- Centro de calculadoras y 5 calculadoras con página propia · presupuesto · honorarios
- El despacho y el equipo · opiniones y casos · blog (3 artículos)
- Contacto · aviso legal, privacidad, cookies y créditos de fotos · gracias · 404 · `llms.txt`

**Cotizadores y calculadoras** (todo en `src/lib/calculos.ts`, con tests)
- **Presupuesto de honorarios** por área y asunto, con extras, herencias por tramos, porcentaje de lo obtenido, IVA opcional, y envío por email o WhatsApp.
- **Indemnización por despido**: improcedente, objetivo y fin de contrato, con el tramo anterior a 2012, los topes y el prorrateo por meses.
- **Reparto de una herencia**: legítima, mejora, libre disposición y usufructo del cónyuge (Código Civil común).
- **¿Estoy a tiempo de reclamar?**: 7 plazos, con días hábiles y festivos de Madrid.
- **Intereses por impago** entre empresas (Ley 3/2004) y 40 € por factura.
- **Cancelación de antecedentes penales** (Código Penal, art. 136).
- **Cuota mensual de asesoría** para empresas, con tres planes y el recomendado.
- **Comparador de divorcio**: notario, mutuo acuerdo o contencioso.

**Captación**
- **Reserva de primera consulta**: modalidad, área, próximos 10 días laborables y hora.
- **Valoración del caso** en 4 pantallas, con resumen editable.
- **Te llamamos**, con franja horaria.
- **WhatsApp con texto** según la página, el área o el resultado de cada calculadora.
- **Barra fija en el móvil**: WhatsApp · Llamar · Pedir cita.
- **Franja de guardia 24 h** en Penal.
- **Selector "¿qué necesitas resolver?"**, que lleva al área según el problema.
- Si el Worker no responde (por ejemplo, en una demo estática), cada formulario ofrece mandarlo por WhatsApp con todo ya escrito.

**Validación social**: opiniones de Google con reparto de notas y filtro por área · casos anonimizados · cifras · compromisos · credenciales · equipo con n.º de colegiado · responsable de cada área.

**SEO y técnica**
- JSON-LD: `LegalService`, `Service`, `FAQPage`, `BreadcrumbList`, `BlogPosting` y `WebApplication`.
- Sitemap, Open Graph por página, `llms.txt` y CSP estricta.
- `noindex` automático en staging, fotos AVIF/WebP con srcset.
- Lo que no se puede promocionar como promesa (resultados, casos) va con su aviso.

## Comandos
```
npm install
npm run dev          # http://localhost:4321
npm run build        # dist/ (staging, con noindex). Producción: ENTORNO=produccion npm run build
npm run probar       # 22 tests: calculadoras y Worker
npm run check        # tipos de Astro y del Worker
npm run fotos        # baja las fotos de src/data/fotos.json
npm run deploy       # build + wrangler deploy
```
npm 11 puede bloquear los scripts de instalación de `esbuild` y `workerd` (`npm install-scripts approve esbuild workerd`). Sin aprobarlos, el build funciona; `wrangler dev` no.

## Adaptarla a otro despacho
Casi todo está en `src/data/`:

| Archivo | Qué tiene |
|---|---|
| `despacho.ts` | Nombre, datos legales (NIF, colegio, registro), contacto, dirección, horario, agenda de citas, cifras, compromisos, credenciales y equipo |
| `areas.ts` | Las áreas: textos, situaciones, servicios, proceso, plazos, documentos, preguntas, herramienta y responsable. Quitar las que no lleve. |
| `honorarios.ts` | Primera consulta, formas de cobro y precios (alimentan el presupuestador y las tablas) |
| `opiniones.ts` | Opiniones de Google (las reales del despacho, con permiso) |
| `casos.ts` | Casos anonimizados y con permiso |
| `fotos.json` | Fotos: reemplazar los archivos de `src/assets/fotos/` (mismo nombre) o cambiar la lista |
| `calculadoras.ts` | Qué calculadoras se muestran |

- **Color de marca:** `--lacre` y sus tonos en `src/styles/global.css`. Si su logo lo pide, cambiar la fuente de títulos (`public/fonts/` y `--titulos`).
- **Blog:** un `.md` por artículo en `src/content/blog/`.
- **Formularios:** en `wrangler.jsonc`, `MAIL_TO` y `MAIL_FROM`; secretos con `wrangler secret put RESEND_API_KEY` (y `TURNSTILE_SECRET` si se activa Turnstile, con su clave pública en `despacho.ts`).
- **Tipo de demora:** `TIPO_DEMORA` en `src/lib/calculos.ts` (se publica cada semestre en el BOE).

### Antes de publicar la web de un cliente
- [ ] Todos sus datos reales, y nada de ejemplo: cifras, opiniones, casos, credenciales, n.º de colegiado, NIF.
- [ ] Opiniones reales de Google y casos con permiso. Nunca inventarlos ni prometer resultados (Código Deontológico, art. 6).
- [ ] Fotos reales del equipo y del despacho. Las de ejemplo son de Wikimedia Commons; nunca poner caras de stock como si fueran el equipo.
- [ ] Precios: solo si el despacho acepta publicarlos.
- [ ] Textos legales revisados por el propio despacho (aviso legal con los datos de la LSSI, privacidad).
- [ ] `SITE_URL` y `ENTORNO=produccion` en el build, dominio en `astro.config.mjs` y `public/robots.txt`.

## taste-skill
- **Textos (`copy-lint`):** 0 fallos en las páginas principales. Queda un aviso por la franja de cifras, que se deja porque es validación social.
- **Chequeo visual:** se corrigió el contraste del botón sobre foto, el desborde del hero en el móvil, el escalado de fotos y la escala de títulos.
- **Desvíos a propósito:**
  - secciones sin foto: texto, calculadoras y casos;
  - la hoja de encargo inclinada;
  - dirección con número: en un despacho van los datos reales completos, por la LSSI;
  - grilla y alturas propias de la línea de la casa, no las del starter de taste-skill.

## Fotos
17 fotos de Wikimedia Commons (CC BY, CC BY-SA, CC0), sin caras reconocibles ni carteles de otros negocios. Créditos en `/creditos/` y en el pie. Son de relleno: en un cliente, sus fotos.
