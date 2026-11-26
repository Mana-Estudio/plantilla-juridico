// Piezas comunes de las calculadoras.
import { whatsappCon, esc } from './envio';
export { esc };

/** Recalcula al cambiar cualquier campo del formulario (y una vez al cargar). */
export function alCambiar(form: HTMLFormElement, fn: () => void) {
  form.addEventListener('input', fn);
  form.addEventListener('change', fn);
  form.addEventListener('submit', (e) => { e.preventDefault(); fn(); });
  fn();
}

/** Botones del resultado: que un abogado lo revise (WhatsApp con el cálculo), pedir cita e imprimir. */
export function acciones(texto: string, area: string): string {
  return `<div class="acciones no-imprimir">
    <a class="boton" href="${esc(whatsappCon(texto))}" data-evento="calc-whatsapp">Que un abogado revise mi caso</a>
    <a class="boton boton-linea" href="/contacto/?area=${encodeURIComponent(area)}#cita" data-evento="calc-cita">Pedir cita</a>
    <button class="boton boton-linea" type="button" data-imprimir>Imprimir o guardar en PDF</button>
  </div>`;
}

document.addEventListener('click', (e) => { if ((e.target as Element).closest('[data-imprimir]')) print(); });

export const num = (form: HTMLFormElement, nombre: string) => {
  // Los campos son type="number": el navegador ya da el valor con punto decimal.
  const v = String(new FormData(form).get(nombre) ?? '').replace(',', '.');
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};
export const txt = (form: HTMLFormElement, nombre: string) => String(new FormData(form).get(nombre) ?? '');
export const dmy = (f: Date) => f.toLocaleDateString('es-ES');
