// Cálculos de las calculadoras y cotizadores. Funciones puras, sin DOM: las usan las páginas y los tests
// (npm run probar). Todo es ORIENTATIVO: cada página lo dice y ofrece que un abogado revise el caso.
import { asuntos, tramosHerencia, herenciaPorHeredero, herenciaSinTestamento, iguala, IVA, type Rango } from '../data/honorarios.ts';

const DIA = 86400000;
/** Fecha local a medianoche, sin horas (evita líos de zona horaria). */
export const fecha = (a: number, m: number, d: number) => new Date(a, m - 1, d);
export const sumarDias = (f: Date, n: number) => new Date(f.getFullYear(), f.getMonth(), f.getDate() + n);
export const sumarMeses = (f: Date, n: number) => {
  const r = new Date(f.getFullYear(), f.getMonth() + n, 1);
  const ultimo = new Date(r.getFullYear(), r.getMonth() + 1, 0).getDate();
  r.setDate(Math.min(f.getDate(), ultimo));
  return r;
};
export const diasEntre = (a: Date, b: Date) => Math.round((fecha(b.getFullYear(), b.getMonth() + 1, b.getDate()).getTime() - fecha(a.getFullYear(), a.getMonth() + 1, a.getDate()).getTime()) / DIA);

/* ---------- Indemnización por despido (ET art. 56, 52 y 49.1.c; DT 11.ª) ---------- */

export type TipoDespido = 'improcedente' | 'objetivo' | 'temporal';
export const REFORMA_2012 = fecha(2012, 2, 12);

/** Meses de un periodo (fin incluido); la fracción de mes cuenta como mes completo (prorrateo por meses). */
export function mesesPeriodo(inicio: Date, fin: Date): number {
  if (fin < inicio) return 0;
  const finExclusivo = sumarDias(fin, 1);
  let meses = (finExclusivo.getFullYear() - inicio.getFullYear()) * 12 + (finExclusivo.getMonth() - inicio.getMonth());
  if (finExclusivo.getDate() < inicio.getDate()) meses -= 1;
  const base = sumarMeses(inicio, meses);
  if (base < finExclusivo) meses += 1;
  return Math.max(meses, 0);
}

export interface Tramo { desde: Date; hasta: Date; meses: number; diasPorAno: number; dias: number }
export interface ResultadoDespido { salarioDia: number; tramos: Tramo[]; dias: number; diasSinTope: number; tope: number; importe: number; topeAplicado: boolean }

export function indemnizacionDespido(o: { inicio: Date; fin: Date; salarioAnual: number; tipo: TipoDespido }): ResultadoDespido {
  const salarioDia = o.salarioAnual / 365;
  const tramo = (desde: Date, hasta: Date, diasPorAno: number): Tramo => {
    const meses = mesesPeriodo(desde, hasta);
    return { desde, hasta, meses, diasPorAno, dias: (meses * diasPorAno) / 12 };
  };
  let tramos: Tramo[];
  let tope: number;
  if (o.tipo === 'improcedente') {
    if (o.inicio < REFORMA_2012 && o.fin >= REFORMA_2012) {
      const t1 = tramo(o.inicio, sumarDias(REFORMA_2012, -1), 45);
      const t2 = tramo(REFORMA_2012, o.fin, 33);
      tramos = [t1, t2];
      // Máximo 720 días, salvo que el tramo anterior a 2012 ya pase de 720: entonces ese, con un máximo de 42 mensualidades.
      tope = t1.dias > 720 ? Math.min(t1.dias, 1260) : 720;
    } else if (o.fin < REFORMA_2012) {
      tramos = [tramo(o.inicio, o.fin, 45)];
      tope = 1260;
    } else {
      tramos = [tramo(o.inicio, o.fin, 33)];
      tope = 720;
    }
  } else if (o.tipo === 'objetivo') {
    tramos = [tramo(o.inicio, o.fin, 20)];
    tope = 360; // 12 mensualidades
  } else {
    tramos = [tramo(o.inicio, o.fin, 12)];
    tope = Infinity;
  }
  const diasSinTope = tramos.reduce((s, t) => s + t.dias, 0);
  const dias = Math.min(diasSinTope, tope);
  return { salarioDia, tramos, dias, diasSinTope, tope, importe: dias * salarioDia, topeAplicado: diasSinTope > tope };
}

/* ---------- Legítimas (Código Civil, régimen común: arts. 806–808, 809, 834, 837, 838) ---------- */

export interface ResultadoLegitima {
  caso: 'hijos' | 'padres' | 'conyuge' | 'libre';
  partes: { nombre: string; valor: number; texto: string }[];
  porHijo?: number;
  usufructoConyuge?: { sobre: number; texto: string };
}

export function legitima(o: { valor: number; hijos: number; conyuge: boolean; padres: boolean }): ResultadoLegitima {
  const v = Math.max(o.valor, 0);
  if (o.hijos > 0) {
    const tercio = v / 3;
    return {
      caso: 'hijos',
      partes: [
        { nombre: 'Legítima estricta', valor: tercio, texto: `A partes iguales entre los ${o.hijos === 1 ? 'el hijo' : `${o.hijos} hijos`}.` },
        { nombre: 'Tercio de mejora', valor: tercio, texto: 'Para hijos o nietos, como decida el testamento.' },
        { nombre: 'Libre disposición', valor: tercio, texto: 'Para quien quiera el testador.' },
      ],
      porHijo: tercio / o.hijos,
      usufructoConyuge: o.conyuge ? { sobre: tercio, texto: 'El cónyuge viudo tiene el usufructo del tercio de mejora.' } : undefined,
    };
  }
  if (o.padres) {
    const parte = o.conyuge ? v / 3 : v / 2;
    return {
      caso: 'padres',
      partes: [
        { nombre: 'Legítima de los padres', valor: parte, texto: o.conyuge ? 'Un tercio, porque concurren con el cónyuge viudo.' : 'La mitad de la herencia.' },
        { nombre: 'Libre disposición', valor: v - parte, texto: 'Para quien quiera el testador.' },
      ],
      usufructoConyuge: o.conyuge ? { sobre: v / 2, texto: 'El cónyuge viudo tiene el usufructo de la mitad de la herencia.' } : undefined,
    };
  }
  if (o.conyuge) {
    return {
      caso: 'conyuge',
      partes: [{ nombre: 'Libre disposición', valor: v, texto: 'Sin hijos ni padres, el testador decide sobre toda la propiedad.' }],
      usufructoConyuge: { sobre: (v * 2) / 3, texto: 'El cónyuge viudo tiene el usufructo de dos tercios de la herencia.' },
    };
  }
  return { caso: 'libre', partes: [{ nombre: 'Libre disposición', valor: v, texto: 'Sin herederos forzosos: el testador decide sobre todo.' }] };
}

/* ---------- Plazos para reclamar ---------- */

/** Domingo de Pascua (algoritmo gregoriano anónimo). */
export function pascua(ano: number): Date {
  const a = ano % 19, b = Math.floor(ano / 100), c = ano % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31), dia = ((h + l - 7 * m + 114) % 31) + 1;
  return fecha(ano, mes, dia);
}

/** Días inhábiles a efectos judiciales en la ciudad de Madrid (aprox.): fiestas nacionales, de la Comunidad y locales, y 24 y 31 de diciembre. */
export function inhabilesMadrid(ano: number): Set<string> {
  const p = pascua(ano);
  const dias = [
    fecha(ano, 1, 1), fecha(ano, 1, 6), sumarDias(p, -3), sumarDias(p, -2), fecha(ano, 5, 1), fecha(ano, 5, 2), fecha(ano, 5, 15),
    fecha(ano, 8, 15), fecha(ano, 10, 12), fecha(ano, 11, 1), fecha(ano, 11, 9), fecha(ano, 12, 6), fecha(ano, 12, 8), fecha(ano, 12, 24), fecha(ano, 12, 25), fecha(ano, 12, 31),
  ];
  return new Set(dias.map(clave));
}
const clave = (f: Date) => `${f.getFullYear()}-${f.getMonth() + 1}-${f.getDate()}`;
export const esHabil = (f: Date) => f.getDay() !== 0 && f.getDay() !== 6 && !inhabilesMadrid(f.getFullYear()).has(clave(f));

/** Suma n días hábiles (empieza a contar el día siguiente). En despidos, agosto es hábil. */
export function sumarHabiles(f: Date, n: number): Date {
  let d = f;
  let cuenta = 0;
  while (cuenta < n) {
    d = sumarDias(d, 1);
    if (esHabil(d)) cuenta++;
  }
  return d;
}

export const PLAZOS = {
  despido: { nombre: 'Impugnar un despido', desde: 'Fecha del despido', regla: { habiles: 20 }, ley: 'Estatuto de los Trabajadores, art. 59.3', nota: 'Días hábiles: no cuentan sábados, domingos ni festivos. Presentar la papeleta de conciliación suspende el plazo.' },
  sancion: { nombre: 'Impugnar una sanción laboral', desde: 'Fecha en que te la comunicaron', regla: { habiles: 20 }, ley: 'Ley reguladora de la jurisdicción social, art. 114', nota: 'Días hábiles.' },
  salarios: { nombre: 'Reclamar salarios o el finiquito', desde: 'Fecha en que debieron pagarte', regla: { anos: 1 }, ley: 'Estatuto de los Trabajadores, art. 59.2', nota: 'Una reclamación escrita interrumpe el plazo.' },
  trafico: { nombre: 'Reclamar por un accidente de tráfico', desde: 'Fecha del alta médica (o del accidente si no hubo lesiones)', regla: { anos: 1 }, ley: 'Código Civil, art. 1968', nota: 'Una reclamación a la aseguradora interrumpe el plazo.' },
  multa: { nombre: 'Recurrir una multa de tráfico', desde: 'Fecha de notificación', regla: { dias: 20 }, ley: 'Ley de Tráfico, art. 95', nota: 'Días naturales. Si pagas en ese plazo, tienes un 50 % de descuento pero ya no puedes recurrir.' },
  sucesiones: { nombre: 'Presentar el impuesto de sucesiones', desde: 'Fecha del fallecimiento', regla: { meses: 6 }, ley: 'Reglamento del impuesto sobre sucesiones, art. 67', nota: 'Se puede pedir una prórroga de otros 6 meses dentro de los 5 primeros.' },
  deuda: { nombre: 'Reclamar una deuda (contratos)', desde: 'Fecha de vencimiento', regla: { anos: 5 }, ley: 'Código Civil, art. 1964.2', nota: 'Una reclamación fehaciente (burofax) interrumpe el plazo.' },
} as const;
export type TipoPlazo = keyof typeof PLAZOS;

export interface ResultadoPlazo { limite: Date; restantes: number; estado: 'a-tiempo' | 'urgente' | 'vencido'; unidad: string }

export function calcularPlazo(tipo: TipoPlazo, desde: Date, hoy = new Date()): ResultadoPlazo {
  const r = PLAZOS[tipo].regla as { habiles?: number; anos?: number; meses?: number; dias?: number };
  let limite: Date;
  let unidad: string;
  if (r.habiles) { limite = sumarHabiles(desde, r.habiles); unidad = `${r.habiles} días hábiles`; }
  else if (r.anos) { limite = sumarMeses(desde, r.anos * 12); unidad = r.anos === 1 ? '1 año' : `${r.anos} años`; }
  else if (r.meses) { limite = sumarMeses(desde, r.meses); unidad = `${r.meses} meses`; }
  else { limite = sumarDias(desde, r.dias ?? 0); unidad = `${r.dias} días naturales`; }
  const restantes = diasEntre(hoy, limite);
  return { limite, restantes, unidad, estado: restantes < 0 ? 'vencido' : restantes <= 10 ? 'urgente' : 'a-tiempo' };
}

/* ---------- Intereses de demora entre empresas (Ley 3/2004) ---------- */

/** Tipo de interés de demora en operaciones comerciales (BCE + 8 puntos). Se publica cada semestre en el BOE: actualizarlo. */
export const TIPO_DEMORA = { porcentaje: 10.15, vigencia: 'segundo semestre de 2025', nota: 'Tipo de ejemplo: actualízalo con la resolución del Ministerio de Hacienda de cada semestre.' };

export function interesesDemora(o: { importe: number; vencimiento: Date; hasta: Date; tipo: number; facturas: number }) {
  const dias = Math.max(diasEntre(o.vencimiento, o.hasta), 0);
  const intereses = (o.importe * (o.tipo / 100) * dias) / 365;
  const compensacion = 40 * Math.max(o.facturas, 0);
  return { dias, intereses, compensacion, total: o.importe + intereses + compensacion };
}

/* ---------- Cancelación de antecedentes penales (Código Penal, art. 136.2) ---------- */

export const PENAS = {
  leve: { nombre: 'Pena leve (por ejemplo, un delito leve)', meses: 6 },
  hasta12: { nombre: 'Pena de hasta 12 meses, o por un delito imprudente', meses: 24 },
  menos3: { nombre: 'Pena menos grave de más de 12 meses y menos de 3 años', meses: 36 },
  menosMas3: { nombre: 'Pena menos grave de 3 años o más (hasta 5)', meses: 60 },
  grave: { nombre: 'Pena grave (más de 5 años de prisión)', meses: 120 },
} as const;
export type TipoPena = keyof typeof PENAS;

export function cancelacionAntecedentes(tipo: TipoPena, extincion: Date, hoy = new Date()) {
  const meses = PENAS[tipo].meses;
  const desde = sumarDias(extincion, 1);
  const fechaCancelacion = sumarMeses(desde, meses);
  const restantes = diasEntre(hoy, fechaCancelacion);
  return { meses, fechaCancelacion, restantes, yaPuede: restantes <= 0 };
}

/* ---------- Presupuesto de honorarios ---------- */

export interface Presupuesto { tipo: 'cerrado' | 'porcentaje'; rango: Rango; porcentaje?: Rango; minimo?: number; estimado?: Rango; incluye: string[]; nombre: string }

export function presupuesto(o: { area: string; asunto: string; extras?: string[]; tramo?: number; herederos?: number; testamento?: boolean; importe?: number }): Presupuesto | null {
  const a = (asuntos[o.area] ?? []).find((x) => x.id === o.asunto);
  if (!a) return null;
  const extras = (a.extras ?? []).filter((e) => o.extras?.includes(e.id));
  const sumaExtras = extras.reduce<Rango>((s, e) => [s[0] + e.suma[0], s[1] + e.suma[1]], [0, 0]);
  if (a.precio.tipo === 'porcentaje') {
    const [pMin, pMax] = a.precio.rango;
    const estimado: Rango | undefined = o.importe && o.importe > 0 ? [Math.max(o.importe * pMin / 100, a.precio.minimo), Math.max(o.importe * pMax / 100, a.precio.minimo)] : undefined;
    return { tipo: 'porcentaje', rango: [a.precio.minimo, a.precio.minimo], porcentaje: a.precio.rango, minimo: a.precio.minimo, estimado, incluye: a.incluye, nombre: a.nombre };
  }
  let rango: Rango;
  if (a.precio.tipo === 'herencia') {
    const t = tramosHerencia[Math.min(Math.max(o.tramo ?? 0, 0), tramosHerencia.length - 1)];
    const extraHerederos = Math.max((o.herederos ?? 1) - 2, 0);
    rango = [t.rango[0] + extraHerederos * herenciaPorHeredero[0], t.rango[1] + extraHerederos * herenciaPorHeredero[1]];
    if (o.testamento === false) rango = [rango[0] + herenciaSinTestamento[0], rango[1] + herenciaSinTestamento[1]];
  } else {
    rango = a.precio.rango;
  }
  return { tipo: 'cerrado', rango: [rango[0] + sumaExtras[0], rango[1] + sumaExtras[1]], incluye: [...a.incluye, ...extras.map((e) => e.nombre)], nombre: a.nombre };
}

export const conIva = (n: number) => n * (1 + IVA);

/* ---------- Cuota mensual para empresas ---------- */

export function cuotaIguala(o: { tamano: string; servicios: string[] }) {
  const base = iguala.tamanos.find((t) => t.id === o.tamano)?.base ?? iguala.tamanos[0].base;
  const extra = iguala.servicios.filter((s) => o.servicios.includes(s.id)).reduce((s, x) => s + x.suma, 0);
  const factores = [1, 1.6, 2.5];
  const redondear = (n: number) => Math.round(n / 5) * 5;
  const planes = iguala.planes.map((p, i) => ({ ...p, precio: redondear((base + extra) * factores[i]) }));
  const recomendado = o.servicios.length >= 4 ? 2 : o.servicios.length >= 2 ? 1 : 0;
  return { planes, recomendado };
}

/* ---------- Formato ---------- */

export const euros = (n: number, decimales = 0) =>
  n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: decimales, maximumFractionDigits: decimales, useGrouping: 'always' });
export const numero = (n: number, decimales = 0) => n.toLocaleString('es-ES', { minimumFractionDigits: decimales, maximumFractionDigits: decimales, useGrouping: 'always' });
export const fechaLarga = (f: Date) => f.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
export const deInput = (v: string): Date | null => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  return m ? fecha(+m[1], +m[2], +m[3]) : null;
};
export const aInput = (f: Date) => `${f.getFullYear()}-${String(f.getMonth() + 1).padStart(2, '0')}-${String(f.getDate()).padStart(2, '0')}`;
