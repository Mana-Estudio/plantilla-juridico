// Worker de Cloudflare: solo atiende /api/formulario (run_worker_first en wrangler.jsonc). El resto del sitio
// lo sirve Cloudflare como archivos estáticos desde ./dist.
import { validar, resumenEnvio, TIPOS } from '../src/lib/formulario.ts';
import { enviarMail } from '../src/lib/mail.ts';

interface Env {
  ASSETS: Fetcher;
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET?: string;
  MAIL_TO?: string;
  MAIL_FROM?: string;
}

const CABECERAS = { 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'Cache-Control': 'no-store' };
const json = (datos: unknown, status = 200) =>
  new Response(JSON.stringify(datos), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CABECERAS } });

async function humano(token: string, secreto: string, ip: string | null): Promise<boolean> {
  const cuerpo = new FormData();
  cuerpo.append('secret', secreto);
  cuerpo.append('response', token);
  if (ip) cuerpo.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: cuerpo });
  return res.ok && ((await res.json()) as { success?: boolean }).success === true;
}

async function formulario(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const origen = request.headers.get('Origin');
  if (origen && new URL(origen).host !== url.host) return json({ ok: false, mensaje: 'Origen no permitido.' }, 403);
  if (!/multipart\/form-data|application\/x-www-form-urlencoded/.test(request.headers.get('Content-Type') ?? '')) {
    return json({ ok: false, mensaje: 'Formato no admitido.' }, 415);
  }
  const form = await request.formData();
  const datos = Object.fromEntries([...form.entries()].map(([k, v]) => [k, typeof v === 'string' ? v : '']));

  // Campo trampa y tiempo mínimo: a un robot se le contesta que sí y no se envía nada.
  const inicio = Number(datos.inicio || 0);
  if (datos.web || (inicio && Date.now() - inicio < 2500)) return json({ ok: true });

  if (env.TURNSTILE_SECRET) {
    const token = datos['cf-turnstile-response'] ?? '';
    if (!token || !(await humano(token, env.TURNSTILE_SECRET, request.headers.get('CF-Connecting-IP')))) {
      return json({ ok: false, mensaje: 'No pudimos completar la verificación antispam. Vuelve a intentarlo.' }, 403);
    }
  }

  const v = validar(datos);
  if (!v.ok) return json({ ok: false, mensaje: `Revisa estos campos: ${v.errores.join(', ')}.` }, 400);

  const e = v.envio;
  const envio = await enviarMail(env, {
    asunto: `Web · ${TIPOS[e.tipo]}${e.area ? ` · ${e.area}` : ''} · ${e.nombre}`,
    texto: resumenEnvio(e),
    responderA: e.email,
  });
  if (!envio.ok) {
    console.error(envio.error);
    return json({ ok: false, mensaje: 'No pudimos enviar tu mensaje. Llámanos o escríbenos por WhatsApp.' }, 502);
  }
  return json({ ok: true, simulado: envio.simulado ?? false });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.replace(/\/$/, '') === '/api/formulario') {
      if (request.method !== 'POST') return json({ ok: false, mensaje: 'Método no permitido.' }, 405);
      try {
        return await formulario(request, env);
      } catch (error) {
        console.error(error);
        return json({ ok: false, mensaje: 'Error inesperado.' }, 500);
      }
    }
    if (url.pathname.startsWith('/api/')) return json({ ok: false, mensaje: 'No encontrado.' }, 404);
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
