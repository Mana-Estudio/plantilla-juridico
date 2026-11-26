// Tests de las calculadoras: npm run probar. Casos calculados a mano.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  fecha, mesesPeriodo, indemnizacionDespido, legitima, pascua, sumarHabiles, calcularPlazo,
  interesesDemora, cancelacionAntecedentes, presupuesto, cuotaIguala, euros, aInput,
} from '../src/lib/calculos.ts';

const cerca = (a: number, b: number, d = 0.01) => assert.ok(Math.abs(a - b) < d, `${a} ≠ ${b}`);

test('meses: la fracción de mes cuenta como mes completo', () => {
  assert.equal(mesesPeriodo(fecha(2020, 3, 1), fecha(2021, 2, 28)), 12);
  assert.equal(mesesPeriodo(fecha(2020, 3, 1), fecha(2021, 3, 1)), 13);
  assert.equal(mesesPeriodo(fecha(2024, 1, 15), fecha(2024, 1, 20)), 1);
});

test('despido improcedente posterior a 2012: 33 días por año', () => {
  const r = indemnizacionDespido({ inicio: fecha(2015, 1, 1), fin: fecha(2025, 12, 31), salarioAnual: 30000, tipo: 'improcedente' });
  assert.equal(r.tramos[0].meses, 132);
  cerca(r.dias, 363);
  cerca(r.importe, 29835.62);
  assert.equal(r.topeAplicado, false);
});

test('despido improcedente que cruza 2012: 45 + 33 días y tope de 720', () => {
  const r = indemnizacionDespido({ inicio: fecha(2005, 3, 1), fin: fecha(2025, 2, 28), salarioAnual: 36500, tipo: 'improcedente' });
  assert.equal(r.tramos[0].meses, 84);
  cerca(r.tramos[0].dias, 315);
  assert.equal(r.tramos[1].meses, 157);
  cerca(r.tramos[1].dias, 431.75);
  cerca(r.dias, 720);
  cerca(r.importe, 72000);
  assert.equal(r.topeAplicado, true);
});

test('despido con antigüedad muy larga: el tramo anterior a 2012 fija el tope', () => {
  const r = indemnizacionDespido({ inicio: fecha(1985, 1, 1), fin: fecha(2025, 12, 31), salarioAnual: 36500, tipo: 'improcedente' });
  assert.equal(r.tramos[0].meses, 326);
  cerca(r.dias, 1222.5);
});

test('despido objetivo: 20 días por año, máximo 12 mensualidades', () => {
  const r = indemnizacionDespido({ inicio: fecha(2016, 1, 1), fin: fecha(2025, 12, 31), salarioAnual: 36500, tipo: 'objetivo' });
  cerca(r.dias, 200);
  const largo = indemnizacionDespido({ inicio: fecha(1990, 1, 1), fin: fecha(2025, 12, 31), salarioAnual: 36500, tipo: 'objetivo' });
  cerca(largo.dias, 360);
});

test('legítima con hijos y cónyuge', () => {
  const r = legitima({ valor: 300000, hijos: 2, conyuge: true, padres: false });
  assert.equal(r.caso, 'hijos');
  cerca(r.partes[0].valor, 100000);
  cerca(r.porHijo ?? 0, 50000);
  cerca(r.usufructoConyuge?.sobre ?? 0, 100000);
});

test('legítima de los padres con cónyuge: un tercio, y usufructo de la mitad', () => {
  const r = legitima({ valor: 300000, hijos: 0, conyuge: true, padres: true });
  cerca(r.partes[0].valor, 100000);
  cerca(r.usufructoConyuge?.sobre ?? 0, 150000);
});

test('pascua', () => {
  assert.equal(aInput(pascua(2026)), '2026-04-05');
  assert.equal(aInput(pascua(2027)), '2027-03-28');
});

test('despido: 20 días hábiles con los festivos de diciembre', () => {
  // Despido el viernes 27/11/2026: no cuentan fines de semana, 8, 24 y 25 de diciembre.
  assert.equal(aInput(sumarHabiles(fecha(2026, 11, 27), 20)), '2026-12-30');
  const r = calcularPlazo('despido', fecha(2026, 11, 27), fecha(2026, 11, 27));
  assert.equal(r.estado, 'a-tiempo');
});

test('plazos por años y meses, de fecha a fecha', () => {
  assert.equal(aInput(calcularPlazo('salarios', fecha(2026, 2, 28)).limite), '2027-02-28');
  assert.equal(aInput(calcularPlazo('sucesiones', fecha(2026, 8, 31)).limite), '2027-02-28');
  assert.equal(calcularPlazo('trafico', fecha(2020, 1, 1), fecha(2026, 1, 1)).estado, 'vencido');
});

test('intereses de demora y 40 € por factura', () => {
  const r = interesesDemora({ importe: 10000, vencimiento: fecha(2026, 1, 1), hasta: fecha(2026, 4, 11), tipo: 10.15, facturas: 2 });
  assert.equal(r.dias, 100);
  cerca(r.intereses, 278.08);
  assert.equal(r.compensacion, 80);
});

test('cancelación de antecedentes', () => {
  const r = cancelacionAntecedentes('hasta12', fecha(2024, 3, 10), fecha(2026, 1, 1));
  assert.equal(aInput(r.fechaCancelacion), '2026-03-11');
  assert.equal(r.yaPuede, false);
});

test('presupuesto de una herencia sin testamento con 4 herederos', () => {
  const p = presupuesto({ area: 'herencias', asunto: 'herencia', tramo: 1, herederos: 4, testamento: false });
  assert.deepEqual(p?.rango, [1850, 3200]);
});

test('presupuesto por porcentaje con importe estimado', () => {
  const p = presupuesto({ area: 'laboral', asunto: 'despido', importe: 20000 });
  assert.equal(p?.tipo, 'porcentaje');
  assert.deepEqual(p?.estimado, [2000, 3000]);
});

test('cuota mensual de empresa', () => {
  const c = cuotaIguala({ tamano: 'micro', servicios: ['laboral', 'contratos'] });
  assert.deepEqual(c.planes.map((p) => p.precio), [250, 400, 625]);
  assert.equal(c.recomendado, 1);
});

test('formato de euros con separador de miles', () => {
  assert.match(euros(1500), /^1\.500\s€$/);
});
