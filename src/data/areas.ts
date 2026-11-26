// Áreas de práctica: cada una genera su página (/areas/<slug>/), su tarjeta y sus opciones en los formularios.
// Los plazos y datos legales son los generales de la normativa española vigente (revisados el 2026-11-26).
// Para un cliente: quitar las áreas que no lleve, ajustar textos y responsables. Nunca prometer resultados
// (Código Deontológico de la Abogacía Española, art. 6).

export type Herramienta = 'despido' | 'divorcio' | 'legitima' | 'plazos' | 'antecedentes' | 'intereses';

export interface Area {
  slug: string;
  clave: 'laboral' | 'familia' | 'herencias' | 'trafico' | 'penal' | 'empresas';
  nombre: string;
  corto: string;
  /** Lo que escribe la persona: "Me han despedido". Para el selector de la portada. */
  problema: string;
  foto: string;
  titulo: string;
  bajada: string;
  resumen: string;
  situaciones: { titulo: string; texto: string }[];
  servicios: { nombre: string; texto: string }[];
  proceso: { titulo: string; texto: string }[];
  plazos: { asunto: string; plazo: string; nota: string }[];
  documentos: string[];
  herramienta: Herramienta;
  preguntas: { p: string; r: string }[];
  responsable: string;
  whatsapp: string;
  urgente?: { titulo: string; texto: string };
  seo: { title: string; description: string };
}

export const areas: Area[] = [
  {
    slug: 'derecho-laboral',
    clave: 'laboral',
    nombre: 'Derecho laboral',
    corto: 'Laboral',
    problema: 'Me han despedido o me deben dinero',
    foto: 'trabajadores-de-espaldas',
    titulo: 'Abogados laboralistas en Madrid',
    bajada: 'Despidos, salarios que no te pagan, sanciones e incapacidades. Revisamos tu caso y te decimos qué puedes reclamar y en qué plazo.',
    resumen: 'Despidos, reclamación de salarios, sanciones, incapacidades y acoso laboral.',
    situaciones: [
      { titulo: 'Me han despedido', texto: 'Disciplinario, objetivo o sin carta. Hay 20 días hábiles para impugnarlo.' },
      { titulo: 'Me deben nóminas o el finiquito', texto: 'Salarios, horas extra o vacaciones sin pagar: hay un año para reclamarlos.' },
      { titulo: 'Me han cambiado el horario o el sueldo', texto: 'Una modificación sustancial se puede impugnar en 20 días hábiles.' },
      { titulo: 'Estoy de baja o me deniegan una incapacidad', texto: 'Incapacidad temporal y permanente, y recursos ante la Seguridad Social.' },
      { titulo: 'Sufro acoso en el trabajo', texto: 'Te ayudamos a documentarlo y a actuar con prudencia.' },
      { titulo: 'Soy empresa y tengo que despedir', texto: 'Te acompañamos para hacerlo bien y evitar una improcedencia.' },
    ],
    servicios: [
      { nombre: 'Despidos', texto: 'Disciplinarios, objetivos y colectivos: impugnación, conciliación y juicio.' },
      { nombre: 'Reclamación de cantidades', texto: 'Salarios, horas extra, finiquitos y vacaciones no disfrutadas.' },
      { nombre: 'Modificación de condiciones', texto: 'Cambios de horario, de sueldo o de centro de trabajo.' },
      { nombre: 'Incapacidades', texto: 'Bajas, incapacidad permanente y recursos ante el INSS.' },
      { nombre: 'Acoso y derechos fundamentales', texto: 'Acoso laboral, discriminación y vulneración de derechos.' },
      { nombre: 'Accidentes de trabajo', texto: 'Prestaciones, recargo y responsabilidad de la empresa.' },
      { nombre: 'Conciliación familiar', texto: 'Reducción de jornada, adaptación del horario y permisos.' },
      { nombre: 'Laboral para empresas', texto: 'Despidos, ERTE, contratos e inspecciones de trabajo.' },
    ],
    proceso: [
      { titulo: 'Revisamos tu carta y tus nóminas', texto: 'Calculamos la indemnización y vemos si el despido se sostiene.' },
      { titulo: 'Papeleta de conciliación', texto: 'La presentamos en el SMAC de la Comunidad de Madrid dentro de plazo.' },
      { titulo: 'Acto de conciliación', texto: 'Muchas veces el asunto se cierra aquí, con un acuerdo.' },
      { titulo: 'Demanda y juicio', texto: 'Si no hay acuerdo, demandamos ante el Juzgado de lo Social y te acompañamos al juicio.' },
    ],
    plazos: [
      { asunto: 'Impugnar un despido', plazo: '20 días hábiles', nota: 'Desde el día siguiente al despido. No cuentan sábados, domingos ni festivos.' },
      { asunto: 'Reclamar salarios o el finiquito', plazo: '1 año', nota: 'Desde el día en que debieron pagarse.' },
      { asunto: 'Impugnar una sanción', plazo: '20 días hábiles', nota: 'Desde que te la comunican por escrito.' },
      { asunto: 'Modificación sustancial de condiciones', plazo: '20 días hábiles', nota: 'Desde la notificación de la empresa.' },
    ],
    documentos: [
      'Carta de despido o la comunicación de la empresa',
      'Contrato de trabajo y sus prórrogas',
      'Nóminas de los últimos 12 meses',
      'Informe de vida laboral',
      'El finiquito, si te lo han dado',
      'Mensajes o emails que tengan que ver con el despido',
    ],
    herramienta: 'despido',
    preguntas: [
      { p: '¿Firmo el finiquito?', r: 'Puedes firmarlo como recibido añadiendo «no conforme»: así no renuncias a reclamar. Si dudas, consúltanos antes.' },
      { p: '¿Cuánto me corresponde si el despido es improcedente?', r: '33 días de salario por año trabajado, con un máximo de 24 mensualidades. Si tu contrato es anterior al 12 de febrero de 2012, ese tiempo se calcula a 45 días por año. Prueba la calculadora de esta página.' },
      { p: '¿Hay que pasar por la conciliación?', r: 'En la mayoría de los casos, sí: es obligatoria antes de la demanda. En Madrid se presenta en el SMAC.' },
      { p: '¿Cuánto cuesta?', r: 'En despidos y reclamaciones solemos cobrar un porcentaje de lo que se consiga, sin adelantos. Te lo damos por escrito antes de empezar.' },
    ],
    responsable: 'javier-ortega',
    whatsapp: 'Hola, quería consultar un tema laboral.',
    seo: {
      title: 'Abogados laboralistas en Madrid · Despidos y reclamaciones',
      description: 'Abogados laboralistas en Chamberí. Despidos, salarios, sanciones e incapacidades. Calcula tu indemnización y te decimos qué puedes reclamar.',
    },
  },
  {
    slug: 'familia',
    clave: 'familia',
    nombre: 'Derecho de familia',
    corto: 'Familia',
    problema: 'Quiero divorciarme o cambiar la custodia',
    foto: 'familia-pasarela',
    titulo: 'Abogados de familia en Madrid',
    bajada: 'Divorcios, custodia y pensiones, con discreción. Buscamos el acuerdo siempre que se pueda y defendemos tu posición cuando no.',
    resumen: 'Divorcios, custodia, pensiones, modificación de medidas y mediación.',
    situaciones: [
      { titulo: 'Queremos divorciarnos de mutuo acuerdo', texto: 'El camino más rápido y barato. Sin hijos menores, incluso ante notario.' },
      { titulo: 'Mi pareja no quiere el divorcio', texto: 'No hace falta su conformidad: se puede pedir igualmente.' },
      { titulo: 'Quiero la custodia compartida', texto: 'Preparamos tu propuesta con el interés de los hijos en el centro.' },
      { titulo: 'No me pagan la pensión', texto: 'Se puede reclamar en el juzgado lo que se deba.' },
      { titulo: 'Han cambiado las circunstancias', texto: 'Un cambio de trabajo, de ciudad o de ingresos permite modificar las medidas.' },
      { titulo: 'Somos pareja de hecho y nos separamos', texto: 'Hijos, vivienda y bienes comunes, también sin matrimonio.' },
    ],
    servicios: [
      { nombre: 'Divorcio de mutuo acuerdo', texto: 'En el juzgado o ante notario si no hay hijos menores.' },
      { nombre: 'Divorcio contencioso', texto: 'Cuando no hay acuerdo sobre hijos, vivienda o pensiones.' },
      { nombre: 'Custodia y visitas', texto: 'Compartida o exclusiva, y régimen de visitas.' },
      { nombre: 'Pensiones', texto: 'De alimentos para los hijos y compensatoria.' },
      { nombre: 'Modificación de medidas', texto: 'Cuando cambian las circunstancias que se tuvieron en cuenta.' },
      { nombre: 'Liquidación de gananciales', texto: 'Reparto de la vivienda, las cuentas y las deudas.' },
      { nombre: 'Parejas de hecho', texto: 'Medidas sobre los hijos y reparto de bienes.' },
      { nombre: 'Mediación familiar', texto: 'Con una mediadora inscrita en el registro del Ministerio de Justicia.' },
    ],
    proceso: [
      { titulo: 'Primera reunión', texto: 'Escuchamos tu situación y te explicamos los caminos posibles.' },
      { titulo: 'Propuesta de convenio', texto: 'Redactamos el convenio regulador y lo negociamos con la otra parte.' },
      { titulo: 'Firma y ratificación', texto: 'En el juzgado, o ante notario si no hay hijos menores.' },
      { titulo: 'Sentencia o escritura', texto: 'Y seguimiento si más adelante hay que modificar o ejecutar medidas.' },
    ],
    plazos: [
      { asunto: 'Pedir el divorcio', plazo: '3 meses', nota: 'Desde la boda, salvo riesgo para la vida o la integridad del cónyuge o de los hijos.' },
      { asunto: 'Reclamar pensiones impagadas', plazo: '5 años', nota: 'Cada mensualidad, desde que debió pagarse.' },
      { asunto: 'Recurrir una sentencia', plazo: '20 días hábiles', nota: 'Desde la notificación (recurso de apelación).' },
    ],
    documentos: [
      'Libro de familia o certificado de matrimonio',
      'DNI de los dos',
      'Certificados de empadronamiento',
      'Nóminas y última declaración de la renta',
      'Escrituras y préstamo de la vivienda',
      'Gastos de los hijos: colegio, actividades, salud',
    ],
    herramienta: 'divorcio',
    preguntas: [
      { p: '¿Podemos divorciarnos ante notario?', r: 'Sí, si es de mutuo acuerdo y no hay hijos menores de edad ni hijos mayores con medidas de apoyo. Hace falta abogado igualmente.' },
      { p: '¿Cuánto tarda un divorcio de mutuo acuerdo?', r: 'En Madrid, entre uno y tres meses según el juzgado. Ante notario puede resolverse en unas semanas.' },
      { p: '¿Cómo se calcula la pensión de alimentos?', r: 'No hay una cifra fija: depende de los ingresos de cada progenitor y de las necesidades de los hijos. El CGPJ publica unas tablas orientativas que usamos de referencia.' },
      { p: '¿Podemos tener un solo abogado para los dos?', r: 'En un divorcio de mutuo acuerdo, sí: un mismo abogado puede llevarlo para los dos.' },
    ],
    responsable: 'elena-rios',
    whatsapp: 'Hola, quería consultar un tema de familia.',
    seo: {
      title: 'Abogados de familia en Madrid · Divorcios y custodia',
      description: 'Abogados de familia en Chamberí: divorcio de mutuo acuerdo o contencioso, custodia y pensiones. Calcula el presupuesto de tu divorcio en un minuto.',
    },
  },
  {
    slug: 'herencias',
    clave: 'herencias',
    nombre: 'Herencias y sucesiones',
    corto: 'Herencias',
    problema: 'Tengo que resolver una herencia',
    foto: 'caja-antigua-llave',
    titulo: 'Abogados de herencias en Madrid',
    bajada: 'Aceptación y reparto, testamentos, impuesto de sucesiones y desacuerdos entre herederos. Te decimos qué hacer, en qué orden y cuánto cuesta.',
    resumen: 'Aceptación y reparto, testamentos, impuesto de sucesiones y conflictos entre herederos.',
    situaciones: [
      { titulo: 'Ha fallecido un familiar y no sé por dónde empezar', texto: 'Te damos la lista de pasos y nos ocupamos de los trámites.' },
      { titulo: 'No hay testamento', texto: 'Hace falta una declaración de herederos, normalmente ante notario.' },
      { titulo: 'Los herederos no nos ponemos de acuerdo', texto: 'Negociamos el reparto y, si no hay salida, pedimos la división judicial.' },
      { titulo: 'Quiero hacer testamento', texto: 'Para dejar las cosas claras y evitar problemas a tu familia.' },
      { titulo: 'Me preocupa el impuesto de sucesiones', texto: 'En Madrid, hijos, cónyuge y padres tienen una bonificación del 99 %.' },
      { titulo: 'Hay bienes en otro país', texto: 'Herencias internacionales y certificado sucesorio europeo.' },
    ],
    servicios: [
      { nombre: 'Aceptación y reparto', texto: 'Inventario, cuaderno particional y escritura de adjudicación.' },
      { nombre: 'Declaración de herederos', texto: 'Cuando no hay testamento.' },
      { nombre: 'Testamentos', texto: 'Redacción y planificación de la herencia.' },
      { nombre: 'Impuestos', texto: 'Sucesiones en la Comunidad de Madrid y plusvalía municipal.' },
      { nombre: 'División judicial', texto: 'Cuando los herederos no llegan a un acuerdo.' },
      { nombre: 'Legítimas y desheredación', texto: 'Defensa de la parte que la ley reserva a la familia.' },
      { nombre: 'Renuncia o beneficio de inventario', texto: 'Para no responder de las deudas del fallecido.' },
      { nombre: 'Herencias internacionales', texto: 'Bienes o herederos en otros países.' },
    ],
    proceso: [
      { titulo: 'Documentación', texto: 'Defunción, últimas voluntades y seguros; testamento o declaración de herederos.' },
      { titulo: 'Inventario y valoración', texto: 'Bienes, cuentas y deudas, con su valor a la fecha del fallecimiento.' },
      { titulo: 'Impuestos', texto: 'Sucesiones en la Comunidad de Madrid y plusvalía municipal, dentro de plazo.' },
      { titulo: 'Escritura y registros', texto: 'Firma ante notario y cambio de titularidad en el Registro y en los bancos.' },
    ],
    plazos: [
      { asunto: 'Impuesto de sucesiones', plazo: '6 meses', nota: 'Desde el fallecimiento. Se puede pedir una prórroga de otros 6 dentro de los 5 primeros meses.' },
      { asunto: 'Plusvalía municipal', plazo: '6 meses', nota: 'Desde el fallecimiento; prorrogable hasta un año si se pide a tiempo.' },
      { asunto: 'Certificado de últimas voluntades', plazo: '15 días hábiles', nota: 'Es lo que hay que esperar desde el fallecimiento para pedirlo.' },
    ],
    documentos: [
      'Certificado de defunción',
      'Certificados de últimas voluntades y de seguros de vida',
      'Testamento o declaración de herederos',
      'Escrituras de los inmuebles y recibos del IBI',
      'Saldos bancarios a la fecha del fallecimiento',
      'DNI de los herederos',
    ],
    herramienta: 'legitima',
    preguntas: [
      { p: '¿Qué pasa si no hay testamento?', r: 'Hay que hacer una declaración de herederos. Si heredan hijos, padres o el cónyuge, se tramita ante notario.' },
      { p: '¿Cuánto se paga de impuesto de sucesiones en Madrid?', r: 'Hijos, cónyuge y padres tienen una bonificación del 99 % en la cuota, así que suelen pagar muy poco. Para otros parientes depende del caso: lo calculamos contigo.' },
      { p: '¿Puedo renunciar a una herencia con deudas?', r: 'Sí. También se puede aceptar «a beneficio de inventario», para responder de las deudas solo con lo heredado.' },
      { p: '¿Qué es la legítima?', r: 'La parte de la herencia que la ley reserva a hijos, padres o cónyuge. Con hijos, dos tercios de la herencia. Prueba la calculadora de esta página.' },
    ],
    responsable: 'elena-rios',
    whatsapp: 'Hola, quería consultar sobre una herencia.',
    seo: {
      title: 'Abogados de herencias en Madrid · Sucesiones y testamentos',
      description: 'Abogados de herencias en Chamberí: aceptación y reparto, testamentos, impuesto de sucesiones y conflictos. Calcula el reparto de una herencia.',
    },
  },
  {
    slug: 'accidentes-de-trafico',
    clave: 'trafico',
    nombre: 'Accidentes de tráfico',
    corto: 'Tráfico',
    problema: 'He tenido un accidente de tráfico',
    foto: 'calle-alcala-mojada',
    titulo: 'Abogados de accidentes de tráfico en Madrid',
    bajada: 'Reclamamos a la aseguradora la indemnización que te corresponde por lesiones y daños, con informe pericial cuando hace falta.',
    resumen: 'Reclamaciones a aseguradoras por lesiones y daños, atropellos y secuelas.',
    situaciones: [
      { titulo: 'La aseguradora no responde', texto: 'Tiene 3 meses para hacer una oferta o explicar por qué no paga.' },
      { titulo: 'La oferta me parece baja', texto: 'La revisamos con el baremo antes de que la aceptes.' },
      { titulo: 'Me atropellaron a pie, en bici o en patinete', texto: 'Reclamamos al seguro del vehículo responsable.' },
      { titulo: 'Fue yendo al trabajo', texto: 'Es un accidente laboral «in itinere», con sus propias prestaciones.' },
      { titulo: 'Me han quedado secuelas', texto: 'Las valoramos con un perito médico independiente.' },
      { titulo: 'Me acusan de un delito de tráfico', texto: 'Alcoholemia, velocidad o conducción sin permiso.' },
    ],
    servicios: [
      { nombre: 'Lesiones', texto: 'Días de baja, secuelas y perjuicios, según el baremo.' },
      { nombre: 'Daños materiales', texto: 'Reparación del vehículo, pérdida total y gastos.' },
      { nombre: 'Atropellos, bicis y patinetes', texto: 'Peatones y vehículos de movilidad personal.' },
      { nombre: 'Accidentes in itinere', texto: 'De camino al trabajo o de vuelta.' },
      { nombre: 'Peritaje médico', texto: 'Informe independiente para no depender del de la aseguradora.' },
      { nombre: 'Delitos de tráfico', texto: 'Defensa en alcoholemia, velocidad y otros delitos viales.' },
    ],
    proceso: [
      { titulo: 'Parte y primeras pruebas', texto: 'Atestado o parte amistoso, fotos, testigos e informes médicos desde el primer día.' },
      { titulo: 'Reclamación a la aseguradora', texto: 'Que tiene 3 meses para hacer una oferta motivada o dar una respuesta motivada.' },
      { titulo: 'Valoración médica', texto: 'Revisamos la oferta con el baremo y, si hace falta, con un perito médico.' },
      { titulo: 'Acuerdo o demanda', texto: 'Si la oferta no es justa, reclamamos en el juzgado.' },
    ],
    plazos: [
      { asunto: 'Reclamar lesiones o daños', plazo: '1 año', nota: 'Desde el alta médica o desde que se estabilizan las secuelas.' },
      { asunto: 'Respuesta de la aseguradora', plazo: '3 meses', nota: 'Para hacer una oferta motivada o explicar por qué no paga.' },
      { asunto: 'Recurrir una multa de tráfico', plazo: '20 días naturales', nota: 'Desde la notificación de la denuncia.' },
    ],
    documentos: [
      'Atestado policial o parte amistoso',
      'Informes médicos, de urgencias al alta',
      'Fotos del lugar y de los vehículos',
      'Datos de los testigos',
      'Facturas de gastos: taxis, farmacia, fisioterapia',
      'Cartas y emails de las aseguradoras',
    ],
    herramienta: 'plazos',
    preguntas: [
      { p: '¿Cuánto cuesta reclamar?', r: 'Solemos trabajar con un porcentaje de la indemnización que se obtenga, sin adelantos. Te lo damos por escrito antes de empezar.' },
      { p: 'La aseguradora ya me ofrece algo, ¿necesito abogado?', r: 'No es obligatorio, pero conviene revisar la oferta antes de aceptarla: una vez firmada, no se puede reclamar más.' },
      { p: '¿Cómo se calcula la indemnización?', r: 'Con el baremo de tráfico, que fija importes por días de baja, secuelas y perjuicios. Los importes se actualizan cada año.' },
      { p: '¿Y si el culpable no tenía seguro?', r: 'Paga el Consorcio de Compensación de Seguros, y se le reclama igual.' },
    ],
    responsable: 'lucia-navarro',
    whatsapp: 'Hola, quería consultar sobre un accidente de tráfico.',
    seo: {
      title: 'Abogados de accidentes de tráfico en Madrid · Indemnizaciones',
      description: 'Reclamamos a la aseguradora tu indemnización por lesiones y daños. Comprueba si estás a tiempo de reclamar y cuánto cuesta.',
    },
  },
  {
    slug: 'derecho-penal',
    clave: 'penal',
    nombre: 'Derecho penal',
    corto: 'Penal',
    problema: 'Han detenido a un familiar o me han citado',
    foto: 'tribunal-supremo-atardecer',
    titulo: 'Abogados penalistas en Madrid',
    bajada: 'Asistencia al detenido las 24 horas, defensa en juicio y acusación particular. Si es urgente, llama ahora.',
    resumen: 'Asistencia al detenido 24 horas, defensa en juicio y acusación particular.',
    urgente: { titulo: '¿Han detenido a alguien de tu familia?', texto: 'Guardia penal las 24 horas. Vamos a comisaría o al juzgado de guardia.' },
    situaciones: [
      { titulo: 'Han detenido a un familiar', texto: 'Llama a la guardia: vamos a comisaría o al juzgado.' },
      { titulo: 'Me han citado como investigado', texto: 'Prepara la declaración con tu abogado antes de ir.' },
      { titulo: 'Tengo un juicio rápido', texto: 'Se celebra en pocos días: hay que moverse ya.' },
      { titulo: 'He sido víctima de un delito', texto: 'Te representamos como acusación particular.' },
      { titulo: 'Violencia de género', texto: 'Protección de la víctima y defensa, con la máxima discreción.' },
      { titulo: 'Quiero cancelar mis antecedentes', texto: 'Comprueba cuándo puedes pedirlo con la calculadora.' },
    ],
    servicios: [
      { nombre: 'Asistencia al detenido', texto: 'En comisaría y en el juzgado de guardia, las 24 horas.' },
      { nombre: 'Defensa en juicio', texto: 'Delitos leves, juicio rápido, procedimiento abreviado y sumario.' },
      { nombre: 'Acusación particular', texto: 'Para víctimas de delitos.' },
      { nombre: 'Violencia de género', texto: 'Órdenes de protección, defensa y acusación.' },
      { nombre: 'Seguridad vial', texto: 'Alcoholemia, velocidad, conducción sin permiso.' },
      { nombre: 'Delitos económicos', texto: 'Estafas, apropiación indebida y delitos societarios.' },
      { nombre: 'Recursos', texto: 'Apelación y casación.' },
      { nombre: 'Antecedentes penales', texto: 'Cancelación cuando se cumplen los plazos.' },
    ],
    proceso: [
      { titulo: 'Primera llamada', texto: 'Si hay una detención, vamos a comisaría o al juzgado de guardia.' },
      { titulo: 'Estudio del caso', texto: 'Atestado, diligencias y pruebas: te explicamos qué puede pasar.' },
      { titulo: 'Estrategia', texto: 'Declarar o no, conformidad, pruebas a tu favor.' },
      { titulo: 'Juicio y recursos', texto: 'Te defendemos en el juicio y, si hace falta, recurrimos.' },
    ],
    plazos: [
      { asunto: 'Duración máxima de una detención', plazo: '72 horas', nota: 'Después, libertad o puesta a disposición del juez (Constitución, art. 17).' },
      { asunto: 'Recurso de apelación en el procedimiento abreviado', plazo: '10 días', nota: 'Desde la notificación de la sentencia.' },
      { asunto: 'Cancelar antecedentes penales', plazo: 'De 6 meses a 10 años', nota: 'Según la pena, desde el día siguiente a que se extinguió.' },
    ],
    documentos: [
      'Citación o cédula del juzgado',
      'Atestado o denuncia, si los tienes',
      'Documento de identidad',
      'Pruebas a tu favor: mensajes, testigos, vídeos',
      'Sentencias anteriores, si las hay',
      'Informes médicos, si hubo lesiones',
    ],
    herramienta: 'antecedentes',
    preguntas: [
      { p: '¿Puedo elegir abogado si me detienen?', r: 'Sí. Tienes derecho a designar abogado; si no lo haces, te asignan uno de oficio.' },
      { p: '¿Tengo que declarar?', r: 'No. Tienes derecho a no declarar, a no hacerlo contra ti mismo y a no confesarte culpable. Habla antes con tu abogado.' },
      { p: '¿Qué es un juicio rápido?', r: 'Un procedimiento para delitos sencillos en el que el juicio se celebra en pocos días. Si hay conformidad en el juzgado de guardia, la pena se reduce en un tercio.' },
      { p: '¿Cuánto cuesta?', r: 'Depende del procedimiento. La asistencia al detenido tiene un precio cerrado: lo ves en honorarios.' },
    ],
    responsable: 'lucia-navarro',
    whatsapp: 'Hola, necesito un abogado penalista.',
    seo: {
      title: 'Abogados penalistas en Madrid · Asistencia al detenido 24 h',
      description: 'Abogados penalistas en Madrid: guardia 24 horas para detenidos, defensa en juicio y acusación particular. Llama ahora si es urgente.',
    },
  },
  {
    slug: 'empresas',
    clave: 'empresas',
    nombre: 'Empresas y autónomos',
    corto: 'Empresas',
    problema: 'Un cliente no me paga o necesito un contrato',
    foto: 'castellana-desde-arriba',
    titulo: 'Abogados para empresas y autónomos en Madrid',
    bajada: 'Contratos, impagos, sociedades y laboral. Un despacho que conoce tu negocio, con una cuota mensual clara.',
    resumen: 'Impagos, contratos, sociedades, laboral para empresas y asesoría mensual.',
    situaciones: [
      { titulo: 'Un cliente no me paga', texto: 'Reclamamos la deuda con intereses y 40 € por cada factura.' },
      { titulo: 'Necesito un contrato', texto: 'Lo redactamos o revisamos antes de que firmes.' },
      { titulo: 'Vamos a crear una sociedad', texto: 'Constitución, estatutos y pacto de socios.' },
      { titulo: 'Tengo que despedir o hacer un ERTE', texto: 'Para hacerlo bien y evitar una improcedencia.' },
      { titulo: 'No puedo pagar mis deudas', texto: 'Concurso de acreedores y segunda oportunidad.' },
      { titulo: 'Protección de datos', texto: 'Adaptación al RGPD, contratos y registro de actividades.' },
    ],
    servicios: [
      { nombre: 'Reclamación de deudas', texto: 'Monitorio, juicio y ejecución.' },
      { nombre: 'Contratos mercantiles', texto: 'Distribución, servicios, confidencialidad, compraventa.' },
      { nombre: 'Sociedades', texto: 'Constitución, juntas, ampliaciones y pactos de socios.' },
      { nombre: 'Laboral para empresas', texto: 'Contratos, despidos, ERTE e inspecciones.' },
      { nombre: 'Insolvencia', texto: 'Concurso de acreedores y segunda oportunidad.' },
      { nombre: 'Protección de datos', texto: 'RGPD, contratos de encargado y políticas.' },
      { nombre: 'Marcas', texto: 'Registro y defensa de marcas y nombres comerciales.' },
      { nombre: 'Asesoría mensual', texto: 'Una iguala con consultas y horas incluidas.' },
    ],
    proceso: [
      { titulo: 'Diagnóstico', texto: 'Revisamos tu situación y te decimos qué hace falta y qué no.' },
      { titulo: 'Propuesta', texto: 'Precio cerrado por asunto o una cuota mensual.' },
      { titulo: 'Ejecución', texto: 'Contratos, reclamaciones o trámites, con plazos claros.' },
      { titulo: 'Seguimiento', texto: 'Un abogado de referencia que conoce tu empresa.' },
    ],
    plazos: [
      { asunto: 'Reclamar una deuda de un contrato', plazo: '5 años', nota: 'Para las acciones personales sin plazo especial (Código Civil, art. 1964).' },
      { asunto: 'Plazo de pago entre empresas', plazo: '60 días', nota: 'Máximo legal, sin que se pueda alargar por acuerdo (Ley 3/2004).' },
      { asunto: 'Intereses por retraso', plazo: 'Desde el vencimiento', nota: 'Se devengan solos, sin necesidad de reclamarlos (Ley 3/2004).' },
    ],
    documentos: [
      'Facturas y albaranes',
      'Contratos o pedidos firmados',
      'Emails o mensajes con el cliente',
      'Escrituras de la sociedad',
      'Últimas cuentas anuales, si hay deudas o concurso',
    ],
    herramienta: 'intereses',
    preguntas: [
      { p: '¿Qué es un monitorio?', r: 'Un procedimiento rápido para reclamar deudas de dinero que estén documentadas. Si el deudor no se opone, se pasa directamente a la ejecución.' },
      { p: '¿Qué incluye la asesoría mensual?', r: 'Consultas, revisión de contratos y un número de horas al mes, según el plan. Calcula la tuya en esta página.' },
      { p: '¿Lleváis también lo laboral de la empresa?', r: 'Sí: contratos, despidos, ERTE e inspecciones de trabajo.' },
      { p: '¿Trabajáis con autónomos?', r: 'Sí. Buena parte de nuestros clientes de empresa son autónomos y pymes.' },
    ],
    responsable: 'javier-ortega',
    whatsapp: 'Hola, quería consultar un tema de mi empresa.',
    seo: {
      title: 'Abogados para empresas y autónomos en Madrid',
      description: 'Impagos, contratos, sociedades y laboral para pymes y autónomos. Calcula los intereses de una deuda y tu cuota mensual de asesoría.',
    },
  },
];

export const areaPorClave = (clave: string) => areas.find((a) => a.clave === clave);
export const areaPorSlug = (slug: string) => areas.find((a) => a.slug === slug);
