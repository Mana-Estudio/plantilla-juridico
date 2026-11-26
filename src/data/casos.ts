// Casos de EJEMPLO, anonimizados. En un cliente: solo casos reales, sin datos que identifiquen a nadie y con
// permiso del cliente (Código Deontológico, art. 6: no se nombra a clientes sin su autorización ni se revela
// nada amparado por el secreto profesional). Cada caso es distinto: nunca presentarlos como promesa.

export interface Caso { area: string; titulo: string; situacion: string; hicimos: string; resultado: string; plazo: string }

export const casos: Caso[] = [
  {
    area: 'laboral',
    titulo: 'Despido de una dependienta tras 11 años',
    situacion: 'Despido disciplinario por bajo rendimiento, sin hechos concretos en la carta.',
    hicimos: 'Papeleta de conciliación en el SMAC con el cálculo de la indemnización por tramos (antes y después de 2012).',
    resultado: 'Acuerdo en conciliación: la empresa reconoció la improcedencia.',
    plazo: '5 semanas',
  },
  {
    area: 'herencias',
    titulo: 'Herencia de tres hermanos sin testamento',
    situacion: 'Un piso en Chamberí, cuentas en dos bancos y un hermano que vive en Francia.',
    hicimos: 'Declaración de herederos ante notario, inventario y cuaderno particional, impuesto con la bonificación del 99 %.',
    resultado: 'Escritura de adjudicación firmada; el hermano firmó con poder notarial desde Francia.',
    plazo: '4 meses',
  },
  {
    area: 'familia',
    titulo: 'Custodia compartida tras un divorcio contencioso',
    situacion: 'Padre con custodia exclusiva de la madre y cambio de trabajo que le permitía más tiempo con sus hijos.',
    hicimos: 'Demanda de modificación de medidas con un plan de parentalidad detallado.',
    resultado: 'Acuerdo de custodia compartida homologado por el juzgado antes del juicio.',
    plazo: '7 meses',
  },
  {
    area: 'trafico',
    titulo: 'Ciclista atropellada en una rotonda',
    situacion: 'Fractura de muñeca y una oferta de la aseguradora que no tenía en cuenta las secuelas.',
    hicimos: 'Informe de un perito médico independiente y reclamación con el baremo actualizado.',
    resultado: 'Nueva oferta de la aseguradora que incluía las secuelas, aceptada sin juicio.',
    plazo: '6 meses',
  },
  {
    area: 'penal',
    titulo: 'Detención por una pelea a la salida de un bar',
    situacion: 'Joven sin antecedentes detenido de madrugada; los vídeos de la calle no eran concluyentes.',
    hicimos: 'Asistencia en comisaría esa misma noche y petición de las grabaciones del local.',
    resultado: 'Sobreseimiento de la causa al no quedar acreditada su participación.',
    plazo: '3 meses',
  },
  {
    area: 'empresas',
    titulo: 'Facturas impagadas de una agencia de diseño',
    situacion: 'Cuatro facturas vencidas de un cliente que dejó de contestar.',
    hicimos: 'Requerimiento con intereses de demora y 40 € por factura, y petición de monitorio.',
    resultado: 'Pago completo, con intereses, tras el requerimiento del juzgado.',
    plazo: '10 semanas',
  },
];

export const avisoCasos = 'Casos reales anonimizados y publicados con permiso. Cada asunto es distinto: los resultados anteriores no garantizan resultados futuros.';
