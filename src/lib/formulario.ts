// Formularios del sitio: una sola definición para la web (qué se pide) y el Worker (qué se acepta).
// Tipos: consulta (valoración del caso), cita (reserva), llamada (te llamamos) y presupuesto (resultado del cotizador).
// Sin dependencias: lo importan las páginas, el Worker y los tests.

export const TIPOS = {
  consulta: 'Valoración del caso',
  cita: 'Solicitud de cita',
  llamada: 'Te llamamos',
  presupuesto: 'Presupuesto',
} as const;
export type TipoFormulario = keyof typeof TIPOS;

export const MODALIDADES = ['En el despacho', 'Por videollamada', 'Por teléfono'] as const;
export const FRANJAS = ['Por la mañana (9–14 h)', 'Por la tarde (16–19 h)', 'Cuanto antes'] as const;
export const URGENCIAS = ['Tengo una fecha o un plazo cerca', 'Quiero actuar pronto', 'Solo quiero informarme'] as const;

export interface Envio {
  tipo: TipoFormulario;
  nombre: string;
  telefono: string;
  email?: string;
  area?: string;
  mensaje?: string;
  modalidad?: string;
  fecha?: string;
  hora?: string;
  franja?: string;
  urgencia?: string;
  resumen?: string;
  pagina?: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEFONO = /^[+()\d\s.-]{9,20}$/;
const FECHA = /^\d{4}-\d{2}-\d{2}$/;
const HORA = /^\d{1,2}:\d{2}$/;

const limpio = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').trim().slice(0, max) : '';

export type Validacion = { ok: true; envio: Envio } | { ok: false; errores: string[] };

export function validar(datos: Record<string, unknown>): Validacion {
  const errores: string[] = [];
  const tipo = limpio(datos.tipo, 20) as TipoFormulario;
  const envio: Envio = {
    tipo,
    nombre: limpio(datos.nombre, 100),
    telefono: limpio(datos.telefono, 25),
    email: limpio(datos.email, 160).toLowerCase() || undefined,
    area: limpio(datos.area, 60) || undefined,
    mensaje: limpio(datos.mensaje, 2000) || undefined,
    modalidad: limpio(datos.modalidad, 40) || undefined,
    fecha: limpio(datos.fecha, 10) || undefined,
    hora: limpio(datos.hora, 5) || undefined,
    franja: limpio(datos.franja, 40) || undefined,
    urgencia: limpio(datos.urgencia, 60) || undefined,
    resumen: limpio(datos.resumen, 3000) || undefined,
    pagina: limpio(datos.pagina, 200) || undefined,
  };
  if (!(tipo in TIPOS)) errores.push('tipo');
  if (envio.nombre.length < 2) errores.push('nombre');
  if (!TELEFONO.test(envio.telefono)) errores.push('teléfono');
  if (envio.email && !EMAIL.test(envio.email)) errores.push('email');
  if (tipo === 'presupuesto' && !envio.email) errores.push('email');
  if (tipo === 'cita') {
    if (!envio.fecha || !FECHA.test(envio.fecha)) errores.push('fecha');
    if (!envio.hora || !HORA.test(envio.hora)) errores.push('hora');
    if (!envio.modalidad || !(MODALIDADES as readonly string[]).includes(envio.modalidad)) errores.push('modalidad');
  }
  if (datos.privacidad !== 'si') errores.push('protección de datos');
  return errores.length ? { ok: false, errores } : { ok: true, envio };
}

/** Texto del mail que recibe el despacho. */
export function resumenEnvio(e: Envio): string {
  const filas: [string, string | undefined][] = [
    ['Tipo', TIPOS[e.tipo]],
    ['Nombre', e.nombre],
    ['Teléfono', e.telefono],
    ['Email', e.email],
    ['Área', e.area],
    ['Urgencia', e.urgencia],
    ['Modalidad', e.modalidad],
    ['Fecha pedida', e.fecha && e.hora ? `${e.fecha} a las ${e.hora}` : undefined],
    ['Cuándo llamar', e.franja],
    ['Mensaje', e.mensaje],
    ['Detalle', e.resumen],
    ['Enviado desde', e.pagina],
  ];
  return filas.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n');
}
