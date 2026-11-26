// Datos del despacho. TODO lo que cambia de un despacho a otro está acá (y en areas.ts, honorarios.ts,
// opiniones.ts y casos.ts). Los de esta plantilla son de EJEMPLO: Ríos & Asociados no existe.
// Para un cliente: reemplazar todo con sus datos reales y verificados. Nunca publicar cifras, reseñas,
// casos ni credenciales que el despacho no haya confirmado.

export const despacho = {
  nombre: 'Ríos & Asociados',
  sufijo: 'Abogados',
  /** Iniciales del sello de la hoja de encargo. */
  iniciales: 'R&A',
  lema: 'Abogados en Madrid para particulares y empresas',
  descripcion:
    'Despacho de abogados en Chamberí (Madrid). Laboral, familia, herencias, accidentes de tráfico, penal y empresas. Presupuesto por escrito antes de empezar.',
  url: 'https://www.riosyasociados.example',

  // Datos legales (aviso legal, LSSI art. 10).
  razonSocial: 'Ríos & Asociados Abogados, S.L.P.',
  nif: 'B-00000000',
  registro: 'Registro Mercantil de Madrid, tomo 00000, folio 000, hoja M-000000',
  colegio: 'Ilustre Colegio de la Abogacía de Madrid (ICAM)',
  colegioUrl: 'https://web.icam.es/',
  seguroRc: 'Seguro de responsabilidad civil profesional suscrito según exige el Estatuto General de la Abogacía Española',

  contacto: {
    telefono: '+34 910 000 100',
    telefonoHref: 'tel:+34910000100',
    whatsapp: '34910000100',
    email: 'hola@riosyasociados.example',
    urgencias: '+34 600 000 100',
    urgenciasHref: 'tel:+34600000100',
  },
  direccion: {
    calle: 'Calle de Fuencarral 120, 3.º izquierda',
    cp: '28010',
    ciudad: 'Madrid',
    barrio: 'Chamberí',
    metro: 'Metro Quevedo (L2) a 3 minutos · Bilbao (L1 y L4) a 6 minutos',
    aparcamiento: 'Aparcamiento público en la calle de Fuencarral, a 150 m',
    accesible: 'Portal y ascensor accesibles en silla de ruedas',
    mapa: 'https://www.google.com/maps/search/?api=1&query=Calle%20de%20Fuencarral%20120%2C%20Madrid',
    geo: { lat: 40.4318, lng: -3.7029 },
  },
  horario: [
    { dias: 'Lunes a jueves', horas: '9:00 – 19:00' },
    { dias: 'Viernes', horas: '9:00 – 15:00' },
    { dias: 'Guardia penal', horas: '24 horas, todos los días' },
  ],
  /** Para la reserva de cita: franjas que se ofrecen (la cita se confirma siempre por teléfono o email). */
  agenda: {
    dias: [1, 2, 3, 4, 5], // lunes a viernes
    franjas: { 1: ['9:30', '11:00', '12:30', '16:00', '17:30'], 2: ['9:30', '11:00', '12:30', '16:00', '17:30'], 3: ['9:30', '11:00', '12:30', '16:00', '17:30'], 4: ['9:30', '11:00', '12:30', '16:00', '17:30'], 5: ['9:30', '11:00', '12:30'] } as Record<number, string[]>,
    diasVista: 10,
    duracion: '45 minutos',
  },

  // Validación social. Ejemplos: en un cliente, solo datos verificables.
  cifras: [
    { valor: '18', unidad: 'años', texto: 'ejerciendo en Madrid desde 2008' },
    { valor: '1.900', unidad: 'asuntos', texto: 'llevados de principio a fin' },
    { valor: '4,9', unidad: 'sobre 5', texto: 'en 127 opiniones de Google' },
    { valor: '3', unidad: 'idiomas', texto: 'español, inglés y francés' },
  ],
  google: { nota: 4.9, total: 127, url: 'https://www.google.com/maps/search/?api=1&query=R%C3%ADos%20%26%20Asociados%20Abogados%20Madrid' },
  compromisos: [
    { titulo: 'Respuesta en 24 horas', texto: 'Cada consulta se contesta en un día laborable como máximo.' },
    { titulo: 'Presupuesto por escrito', texto: 'Hoja de encargo con honorarios y costes antes de empezar.' },
    { titulo: 'Un abogado responsable', texto: 'Sabes siempre quién lleva tu asunto y cómo localizarlo.' },
    { titulo: 'Información de cada paso', texto: 'Te avisamos de cada notificación, plazo y novedad.' },
  ],
  credenciales: [
    'Abogados colegiados en el Ilustre Colegio de la Abogacía de Madrid',
    'Mediadora inscrita en el Registro de Mediadores del Ministerio de Justicia',
    'Turno de oficio penal y de violencia de género del ICAM',
    'Profesores asociados de Derecho del Trabajo y de Derecho Civil',
  ],
  idiomas: ['Español', 'Inglés', 'Francés'],
  redes: [
    { nombre: 'LinkedIn', url: 'https://www.linkedin.com/' },
  ],

  /** Turnstile (antispam de Cloudflare): vacío = solo campo trampa + tiempo mínimo. */
  turnstileSiteKey: '',
} as const;

export type Despacho = typeof despacho;

/** WhatsApp con un texto ya escrito. */
export const whatsapp = (texto = 'Hola, quería hacer una consulta.') =>
  `https://wa.me/${despacho.contacto.whatsapp}?text=${encodeURIComponent(texto)}`;

export const nombreCompleto = `${despacho.nombre} ${despacho.sufijo}`;

export const navegacion = [
  { nombre: 'Áreas', href: '/areas/' },
  { nombre: 'Calculadoras', href: '/calculadoras/' },
  { nombre: 'Honorarios', href: '/honorarios/' },
  { nombre: 'El despacho', href: '/despacho/' },
  { nombre: 'Opiniones', href: '/opiniones/' },
  { nombre: 'Blog', href: '/blog/' },
  { nombre: 'Contacto', href: '/contacto/' },
];

export const equipo = [
  {
    slug: 'elena-rios',
    nombre: 'Elena Ríos Martín',
    cargo: 'Socia fundadora',
    areas: ['herencias', 'familia'],
    colegiada: 'ICAM n.º 00.001',
    desde: 2008,
    idiomas: ['Español', 'Inglés'],
    formacion: 'Licenciada en Derecho (Universidad Complutense de Madrid). Mediadora familiar.',
    texto: 'Lleva herencias y asuntos de familia buscando siempre el acuerdo antes que el juzgado.',
  },
  {
    slug: 'javier-ortega',
    nombre: 'Javier Ortega Sanz',
    cargo: 'Socio',
    areas: ['laboral', 'empresas'],
    colegiada: 'ICAM n.º 00.002',
    desde: 2010,
    idiomas: ['Español', 'Francés'],
    formacion: 'Licenciado en Derecho (Universidad Autónoma de Madrid). Profesor asociado de Derecho del Trabajo.',
    texto: 'Defiende a trabajadores en despidos y asesora a pymes en contratos y plantillas.',
  },
  {
    slug: 'lucia-navarro',
    nombre: 'Lucía Navarro Gil',
    cargo: 'Abogada penalista',
    areas: ['penal', 'trafico'],
    colegiada: 'ICAM n.º 00.003',
    desde: 2014,
    idiomas: ['Español', 'Inglés'],
    formacion: 'Grado en Derecho (Universidad Carlos III de Madrid). Máster de Acceso a la Abogacía.',
    texto: 'Atiende la guardia penal y las reclamaciones por accidentes de tráfico.',
  },
];
