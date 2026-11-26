// Opiniones de EJEMPLO, con el formato de las reseñas de Google. En un cliente se reemplazan por sus reseñas
// reales (nombre como aparece en Google, fecha y texto sin cambios), con su permiso. Nunca inventarlas.
// Sin detalles del caso que puedan identificar a nadie (secreto profesional).

export interface Opinion { nombre: string; fecha: string; nota: number; area: string; texto: string }

export const opiniones: Opinion[] = [
  { nombre: 'Marta G.', fecha: '2026-10-14', nota: 5, area: 'laboral', texto: 'Me explicaron desde el primer día qué podía pasar y cuánto me iba a costar. Llegamos a un acuerdo en la conciliación y no hizo falta juicio.' },
  { nombre: 'Andrés P.', fecha: '2026-09-30', nota: 5, area: 'herencias', texto: 'La herencia de mis padres llevaba meses parada. En la primera reunión nos dieron la lista de pasos y en cinco semanas estaba todo firmado.' },
  { nombre: 'Laura M.', fecha: '2026-09-02', nota: 5, area: 'familia', texto: 'Un divorcio nunca es fácil, pero Elena lo hizo todo con mucho tacto. Siempre me contestó el mismo día.' },
  { nombre: 'Carlos R.', fecha: '2026-08-21', nota: 5, area: 'trafico', texto: 'La aseguradora me ofrecía muy poco. Revisaron la oferta con un perito y la reclamación siguió adelante. Muy claros con los porcentajes.' },
  { nombre: 'Sofía L.', fecha: '2026-07-11', nota: 5, area: 'penal', texto: 'Llamé un domingo por la noche y a la hora estaban en comisaría. No lo olvidaré.' },
  { nombre: 'Pablo V.', fecha: '2026-06-28', nota: 4, area: 'empresas', texto: 'Llevan los contratos de mi empresa desde hace dos años. Responden rápido; a veces me gustaría más detalle en las facturas.' },
  { nombre: 'Irene C.', fecha: '2026-05-19', nota: 5, area: 'laboral', texto: 'Me ayudaron con la reducción de jornada cuando nació mi hija. Todo por escrito y sin sorpresas.' },
  { nombre: 'Miguel Á. T.', fecha: '2026-04-03', nota: 5, area: 'herencias', texto: 'Nos aclararon lo del impuesto de sucesiones, que nos tenía preocupados. Pagamos mucho menos de lo que pensábamos.' },
  { nombre: 'Nuria F.', fecha: '2026-03-15', nota: 5, area: 'familia', texto: 'Hicimos el divorcio de mutuo acuerdo ante notario. Rápido, sencillo y con un presupuesto cerrado desde el principio.' },
  { nombre: 'Javier B.', fecha: '2026-02-08', nota: 5, area: 'empresas', texto: 'Recuperamos tres facturas que dábamos por perdidas con un monitorio. Nos explicaron cada paso.' },
  { nombre: 'Elena S.', fecha: '2026-01-22', nota: 5, area: 'trafico', texto: 'Me atropellaron yendo en bici. Se ocuparon de todo mientras yo me recuperaba.' },
  { nombre: 'Raúl D.', fecha: '2025-12-10', nota: 5, area: 'penal', texto: 'Profesionales y discretos. Me explicaron mis opciones sin dramatizar ni prometer nada.' },
];

/** Reparto de notas para el resumen (de ejemplo, coherente con 4,9 sobre 127). */
export const repartoNotas = [
  { estrellas: 5, total: 118 },
  { estrellas: 4, total: 7 },
  { estrellas: 3, total: 1 },
  { estrellas: 2, total: 0 },
  { estrellas: 1, total: 1 },
];
