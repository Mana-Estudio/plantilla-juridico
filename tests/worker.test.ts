// Tests del Worker de formularios (sin wrangler): validación, antispam y envío simulado.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../worker/index.ts';

const env = { ASSETS: { fetch: async () => new Response('estatico') } } as never;
const enviar = (campos: Record<string, string>, extra: RequestInit = {}) => {
  const body = new FormData();
  for (const [k, v] of Object.entries(campos)) body.set(k, v);
  return worker.fetch(new Request('https://despacho.example/api/formulario', { method: 'POST', body, ...extra }), env);
};
const BASE = { tipo: 'llamada', nombre: 'Ana Prueba', telefono: '600 111 222', privacidad: 'si', inicio: String(Date.now() - 10000) };

test('una llamada válida se envía (simulada sin clave de Resend)', async () => {
  const r = await enviar(BASE);
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), { ok: true, simulado: true });
});

test('sin consentimiento no se envía', async () => {
  const r = await enviar({ ...BASE, privacidad: '' });
  assert.equal(r.status, 400);
  assert.match((await r.json()).mensaje, /protección de datos/);
});

test('una cita sin fecha ni hora no pasa', async () => {
  const r = await enviar({ ...BASE, tipo: 'cita', modalidad: 'En el despacho' });
  assert.equal(r.status, 400);
  assert.match((await r.json()).mensaje, /fecha, hora/);
});

test('el campo trampa contesta ok sin enviar', async () => {
  const r = await enviar({ ...BASE, web: 'spam' });
  assert.deepEqual(await r.json(), { ok: true });
});

test('otro origen queda fuera', async () => {
  const r = await enviar(BASE, { headers: { Origin: 'https://otro.example' } });
  assert.equal(r.status, 403);
});

test('GET no está permitido y el resto lo sirven los estáticos', async () => {
  const r = await worker.fetch(new Request('https://despacho.example/api/formulario'), env);
  assert.equal(r.status, 405);
  const s = await worker.fetch(new Request('https://despacho.example/areas/'), env);
  assert.equal(await s.text(), 'estatico');
});
