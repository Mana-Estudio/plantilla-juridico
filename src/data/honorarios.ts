// Honorarios de EJEMPLO. Alimentan el presupuestador (/presupuesto/), la página de honorarios y los
// precios de cada área. Para un cliente: sus precios reales, y solo si acepta publicarlos. Todo sin IVA.
// La cuota litis (porcentaje de lo que se obtenga) está permitida en España; siempre por escrito.

export const IVA = 0.21;

export const primeraConsulta = {
  precio: 60,
  duracion: '45 minutos',
  texto: 'Se descuenta del presupuesto si nos encargas el asunto.',
};

export const modalidades = [
  { nombre: 'Precio cerrado', texto: 'Un importe fijo por todo el asunto. Lo habitual en divorcios de mutuo acuerdo, herencias o contratos.' },
  { nombre: 'Por fases', texto: 'Un precio para cada etapa (negociación, demanda, juicio). Pagas solo las fases que se usan.' },
  { nombre: 'Porcentaje de lo obtenido', texto: 'Un porcentaje de lo que se cobre al final, sin adelantos. En despidos, reclamaciones y accidentes.' },
  { nombre: 'Cuota mensual', texto: 'Una iguala para empresas y autónomos, con consultas y horas incluidas.' },
];

export const noIncluye = [
  { nombre: 'Procurador', texto: 'Obligatorio en la mayoría de juicios civiles y penales. Su arancel lo fija la ley y te lo decimos antes.' },
  { nombre: 'Peritos', texto: 'Médicos, tasadores o caligráficos, solo si el caso lo necesita.' },
  { nombre: 'Notaría y registros', texto: 'En herencias, divorcios ante notario o sociedades.' },
  { nombre: 'Tasas e impuestos', texto: 'Como el impuesto de sucesiones o la plusvalía municipal.' },
];

export type Rango = [number, number];

export interface Extra { id: string; nombre: string; suma: Rango }
export interface Asunto {
  id: string;
  nombre: string;
  detalle?: string;
  /** Precio cerrado [mínimo, máximo] o porcentaje de lo obtenido. */
  precio: { tipo: 'cerrado'; rango: Rango } | { tipo: 'porcentaje'; rango: Rango; minimo: number } | { tipo: 'herencia' };
  incluye: string[];
  extras?: Extra[];
}

export const asuntos: Record<string, Asunto[]> = {
  laboral: [
    { id: 'despido', nombre: 'Reclamar un despido', detalle: 'Conciliación y, si hace falta, juicio', precio: { tipo: 'porcentaje', rango: [10, 15], minimo: 300 }, incluye: ['Cálculo de la indemnización', 'Papeleta y acto de conciliación', 'Demanda y juicio si no hay acuerdo'] },
    { id: 'cantidades', nombre: 'Reclamar salarios o finiquito', precio: { tipo: 'porcentaje', rango: [10, 15], minimo: 250 }, incluye: ['Reclamación previa', 'Conciliación', 'Demanda si no pagan'] },
    { id: 'incapacidad', nombre: 'Incapacidad permanente', detalle: 'Reclamación y juicio', precio: { tipo: 'cerrado', rango: [900, 1600] }, incluye: ['Reclamación previa al INSS', 'Demanda y juicio', 'Coordinación con el perito médico'] },
    { id: 'empresa-despido', nombre: 'Soy empresa: despido o sanción', precio: { tipo: 'cerrado', rango: [350, 900] }, incluye: ['Carta de despido o sanción', 'Cálculo de la indemnización', 'Conciliación'] },
  ],
  familia: [
    { id: 'divorcio-notario', nombre: 'Divorcio de mutuo acuerdo ante notario', detalle: 'Sin hijos menores', precio: { tipo: 'cerrado', rango: [600, 900] }, incluye: ['Convenio regulador', 'Coordinación con la notaría', 'Inscripción en el Registro Civil'], extras: [{ id: 'gananciales', nombre: 'Liquidación de gananciales', suma: [300, 700] }] },
    { id: 'divorcio-mutuo', nombre: 'Divorcio de mutuo acuerdo en el juzgado', detalle: 'Con hijos menores', precio: { tipo: 'cerrado', rango: [900, 1300] }, incluye: ['Convenio regulador con medidas para los hijos', 'Demanda y ratificación', 'Seguimiento hasta la sentencia'], extras: [{ id: 'gananciales', nombre: 'Liquidación de gananciales', suma: [300, 700] }] },
    { id: 'divorcio-contencioso', nombre: 'Divorcio contencioso', detalle: 'Sin acuerdo', precio: { tipo: 'cerrado', rango: [1800, 3500] }, incluye: ['Demanda o contestación', 'Medidas provisionales', 'Juicio'], extras: [{ id: 'gananciales', nombre: 'Liquidación de gananciales', suma: [600, 1500] }, { id: 'custodia', nombre: 'Disputa por la custodia', suma: [400, 900] }] },
    { id: 'modificacion', nombre: 'Modificación de medidas', detalle: 'Custodia, visitas o pensiones', precio: { tipo: 'cerrado', rango: [900, 1800] }, incluye: ['Demanda de modificación', 'Juicio o acuerdo'] },
    { id: 'pareja-hecho', nombre: 'Ruptura de pareja de hecho', detalle: 'Con hijos', precio: { tipo: 'cerrado', rango: [800, 1400] }, incluye: ['Convenio o demanda de medidas', 'Seguimiento hasta la resolución'] },
  ],
  herencias: [
    { id: 'herencia', nombre: 'Aceptación y reparto de una herencia', detalle: 'Con todos los trámites', precio: { tipo: 'herencia' }, incluye: ['Inventario y cuaderno particional', 'Impuesto de sucesiones y plusvalía', 'Coordinación con la notaría y el Registro'] },
    { id: 'testamento', nombre: 'Testamento', detalle: 'Redacción y planificación', precio: { tipo: 'cerrado', rango: [250, 500] }, incluye: ['Reunión de planificación', 'Borrador para el notario'] },
    { id: 'division', nombre: 'División judicial de la herencia', detalle: 'Sin acuerdo entre herederos', precio: { tipo: 'cerrado', rango: [2500, 6000] }, incluye: ['Demanda de división', 'Inventario judicial', 'Juicio'] },
  ],
  trafico: [
    { id: 'lesiones', nombre: 'Reclamar lesiones', detalle: 'Amistosa o en el juzgado', precio: { tipo: 'porcentaje', rango: [12, 18], minimo: 300 }, incluye: ['Reclamación a la aseguradora', 'Revisión de la oferta con el baremo', 'Demanda si no hay acuerdo'] },
    { id: 'danos', nombre: 'Reclamar solo daños materiales', precio: { tipo: 'porcentaje', rango: [12, 15], minimo: 200 }, incluye: ['Reclamación a la aseguradora', 'Demanda si no pagan'] },
    { id: 'multa', nombre: 'Recurrir una multa', precio: { tipo: 'cerrado', rango: [90, 200] }, incluye: ['Alegaciones', 'Recurso de reposición'] },
  ],
  penal: [
    { id: 'detenido', nombre: 'Asistencia al detenido', detalle: 'Comisaría y juzgado de guardia', precio: { tipo: 'cerrado', rango: [300, 500] }, incluye: ['Asistencia en la declaración', 'Entrevista reservada', 'Comparecencia en el juzgado de guardia'] },
    { id: 'leve', nombre: 'Juicio por delito leve', precio: { tipo: 'cerrado', rango: [400, 700] }, incluye: ['Estudio del caso', 'Juicio'] },
    { id: 'rapido', nombre: 'Juicio rápido', precio: { tipo: 'cerrado', rango: [800, 1500] }, incluye: ['Asistencia en el juzgado de guardia', 'Negociación de la conformidad', 'Juicio si no hay conformidad'] },
    { id: 'abreviado', nombre: 'Procedimiento abreviado', detalle: 'Delitos con penas de hasta 9 años', precio: { tipo: 'cerrado', rango: [1800, 3500] }, incluye: ['Instrucción', 'Escrito de defensa', 'Juicio'] },
    { id: 'acusacion', nombre: 'Acusación particular', detalle: 'Si eres víctima', precio: { tipo: 'cerrado', rango: [1200, 3000] }, incluye: ['Personación', 'Instrucción', 'Juicio'] },
    { id: 'antecedentes', nombre: 'Cancelar antecedentes penales', precio: { tipo: 'cerrado', rango: [150, 250] }, incluye: ['Solicitud ante el Ministerio de Justicia', 'Seguimiento'] },
  ],
  empresas: [
    { id: 'monitorio', nombre: 'Reclamar una deuda', detalle: 'Monitorio', precio: { tipo: 'cerrado', rango: [300, 600] }, incluye: ['Requerimiento de pago', 'Petición de monitorio', 'Ejecución si no paga'], extras: [{ id: 'juicio', nombre: 'Si el deudor se opone (juicio)', suma: [600, 1500] }] },
    { id: 'contrato', nombre: 'Contrato mercantil', detalle: 'Redacción o revisión', precio: { tipo: 'cerrado', rango: [250, 900] }, incluye: ['Reunión para entender la operación', 'Redacción o revisión', 'Una ronda de cambios'] },
    { id: 'sociedad', nombre: 'Constituir una sociedad limitada', precio: { tipo: 'cerrado', rango: [450, 800] }, incluye: ['Estatutos', 'Coordinación con notaría y registro', 'Alta en Hacienda'], extras: [{ id: 'pacto', nombre: 'Pacto de socios', suma: [600, 1500] }] },
    { id: 'segunda-oportunidad', nombre: 'Ley de segunda oportunidad', detalle: 'Particulares y autónomos', precio: { tipo: 'cerrado', rango: [1500, 3000] }, incluye: ['Estudio de viabilidad', 'Solicitud de concurso', 'Exoneración de deudas'] },
  ],
};

/** Herencias: por valor del caudal, más un suplemento por heredero y si no hay testamento. */
export const tramosHerencia = [
  { hasta: 150000, nombre: 'Hasta 150.000 €', rango: [900, 1400] as Rango },
  { hasta: 400000, nombre: 'De 150.000 a 400.000 €', rango: [1400, 2400] as Rango },
  { hasta: 1000000, nombre: 'De 400.000 € a 1 millón', rango: [2400, 4000] as Rango },
  { hasta: Infinity, nombre: 'Más de 1 millón', rango: [4000, 7000] as Rango },
];
export const herenciaPorHeredero: Rango = [100, 200]; // a partir del tercero
export const herenciaSinTestamento: Rango = [250, 400];

/** Asesoría mensual para empresas (calculadora de iguala). */
export const iguala = {
  tamanos: [
    { id: 'autonomo', nombre: 'Autónomo sin empleados', base: 90 },
    { id: 'micro', nombre: 'De 1 a 5 empleados', base: 150 },
    { id: 'pequena', nombre: 'De 6 a 20 empleados', base: 250 },
    { id: 'mediana', nombre: 'De 21 a 50 empleados', base: 400 },
  ],
  servicios: [
    { id: 'laboral', nombre: 'Laboral: contratos, nóminas en disputa, despidos', suma: 60 },
    { id: 'contratos', nombre: 'Contratos y clientes', suma: 40 },
    { id: 'impagos', nombre: 'Reclamación de impagos', suma: 40 },
    { id: 'datos', nombre: 'Protección de datos', suma: 30 },
  ],
  planes: [
    { nombre: 'Esencial', horas: 1, texto: 'Consultas por teléfono y email, y 1 hora al mes.' },
    { nombre: 'Profesional', horas: 3, texto: 'Consultas, revisión de contratos y 3 horas al mes.' },
    { nombre: 'Integral', horas: 6, texto: 'Todo lo anterior, 6 horas al mes y prioridad en juicios.' },
  ],
};

/** Precio "desde" de cada área, para las tarjetas. */
export function desdeArea(clave: string): string {
  const lista = asuntos[clave] ?? [];
  const cerrados = lista.flatMap((a) => (a.precio.tipo === 'cerrado' ? [a.precio.rango[0]] : a.precio.tipo === 'herencia' ? [tramosHerencia[0].rango[0]] : []));
  const porcentaje = lista.find((a) => a.precio.tipo === 'porcentaje');
  if (porcentaje && porcentaje.precio.tipo === 'porcentaje') return `${porcentaje.precio.rango[0]} % de lo obtenido`;
  return cerrados.length ? `desde ${Math.min(...cerrados).toLocaleString('es-ES', { useGrouping: 'always' })} €` : 'a medida';
}
