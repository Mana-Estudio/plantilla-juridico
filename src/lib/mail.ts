// Envío de mails aislado: cambiar de proveedor es tocar solo este archivo.
// Por defecto Resend (https://resend.com) con RESEND_API_KEY como secreto del Worker.
// Sin clave (desarrollo) no envía nada: deja el mail en el log y devuelve ok con simulado: true.

export interface EntornoMail { RESEND_API_KEY?: string; MAIL_TO?: string; MAIL_FROM?: string }
export interface Mensaje { asunto: string; texto: string; responderA?: string }
export type ResultadoMail = { ok: true; simulado?: boolean } | { ok: false; error: string };

export async function enviarMail(env: EntornoMail, mensaje: Mensaje): Promise<ResultadoMail> {
  const para = env.MAIL_TO ?? 'hola@riosyasociados.example';
  const de = env.MAIL_FROM ?? 'Web <web@riosyasociados.example>';
  if (!env.RESEND_API_KEY) {
    console.log(`[mail simulado] Para: ${para}\nAsunto: ${mensaje.asunto}\n\n${mensaje.texto}`);
    return { ok: true, simulado: true };
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: de, to: [para], subject: mensaje.asunto, text: mensaje.texto, ...(mensaje.responderA ? { reply_to: mensaje.responderA } : {}) }),
  });
  if (!res.ok) return { ok: false, error: `Resend respondió ${res.status}: ${(await res.text().catch(() => '')).slice(0, 200)}` };
  return { ok: true };
}
