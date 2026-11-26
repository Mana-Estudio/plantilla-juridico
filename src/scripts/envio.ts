// Envío de formularios a /api/formulario (Worker). Si no hay servidor (una demo estática o sin conexión),
// devuelve fallback y el formulario ofrece mandar lo mismo por WhatsApp o email: nunca se pierde una consulta.
export interface RespuestaEnvio { ok: boolean; mensaje?: string; simulado?: boolean; sinServidor?: boolean }

export async function enviar(form: HTMLFormElement, extra: Record<string, string> = {}): Promise<RespuestaEnvio> {
  const datos = new FormData(form);
  for (const [k, v] of Object.entries(extra)) datos.set(k, v);
  datos.set('pagina', location.pathname);
  try {
    const res = await fetch('/api/formulario', { method: 'POST', body: datos, headers: { Accept: 'application/json' } });
    if (res.status === 404 || res.status === 405) return { ok: false, sinServidor: true };
    const json = (await res.json().catch(() => ({}))) as RespuestaEnvio;
    return { ok: res.ok && json.ok !== false, mensaje: json.mensaje, simulado: json.simulado };
  } catch {
    return { ok: false, sinServidor: true };
  }
}

/** Escapa texto para meterlo en HTML. */
export const esc = (t: unknown) => String(t ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

/** Marca de tiempo para el filtro antispam (tiempo mínimo antes de enviar). */
export function marcarInicio(form: HTMLFormElement) {
  let campo = form.querySelector<HTMLInputElement>('input[name="inicio"]');
  if (!campo) {
    campo = document.createElement('input');
    campo.type = 'hidden';
    campo.name = 'inicio';
    form.append(campo);
  }
  campo.value = String(Date.now());
}

const WA = document.querySelector<HTMLAnchorElement>('.barra-movil a[href*="wa.me"]')?.href ?? '';
/** Link de WhatsApp del despacho con un texto (parte del link de la barra móvil, para no repetir el número). */
export function whatsappCon(texto: string): string {
  try {
    const u = new URL(WA);
    u.searchParams.set('text', texto);
    return u.toString();
  } catch {
    return '#';
  }
}

/** Valida los campos visibles de un contenedor y marca el primero con error. */
export function validarCampos(contenedor: Element, error: HTMLElement): boolean {
  const campos = [...contenedor.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input,textarea,select')].filter((c) => !c.closest('.trampa') && c.type !== 'hidden');
  const grupos = new Set<string>();
  for (const c of campos) {
    c.removeAttribute('aria-invalid');
    if (c instanceof HTMLInputElement && (c.type === 'radio' || c.type === 'checkbox') && c.name && c.required) {
      if (grupos.has(c.name)) continue;
      grupos.add(c.name);
      const marcado = contenedor.querySelector(`input[name="${c.name}"]:checked`);
      if (!marcado) {
        error.textContent = c.type === 'checkbox' && c.name === 'privacidad' ? 'Para enviar, acepta la información sobre protección de datos.' : 'Elige una opción para seguir.';
        error.hidden = false;
        c.focus();
        return false;
      }
      continue;
    }
    if (!c.checkValidity()) {
      const etiqueta = contenedor.querySelector(`label[for="${c.id}"]`)?.firstChild?.textContent?.trim() || c.name;
      error.textContent = `Revisa el campo «${etiqueta}».`;
      error.hidden = false;
      c.setAttribute('aria-invalid', 'true');
      c.focus();
      return false;
    }
  }
  error.hidden = true;
  return true;
}
