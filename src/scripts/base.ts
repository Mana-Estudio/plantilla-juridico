// Comportamiento común: cabecera que se marca al bajar, menú del móvil, desplegable de áreas y barra de lectura.
const cabecera = document.getElementById('cabecera');
let pedido = false;
const marcar = () => {
  pedido = false;
  cabecera?.classList.toggle('compacta', scrollY > 24);
  const barra = document.querySelector<HTMLElement>('.barra-lectura');
  if (barra) {
    const total = document.documentElement.scrollHeight - innerHeight;
    barra.style.transform = `scaleX(${total > 0 ? Math.min(scrollY / total, 1) : 0})`;
  }
};
addEventListener('scroll', () => { if (!pedido) { pedido = true; requestAnimationFrame(marcar); } }, { passive: true });
marcar();

// Menú del móvil
const boton = document.querySelector<HTMLButtonElement>('.menu-boton');
const menu = document.getElementById('menu-movil');
const cerrarMenu = () => { if (menu && boton) { menu.hidden = true; boton.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; } };
boton?.addEventListener('click', () => {
  if (!menu) return;
  const abrir = menu.hidden;
  menu.hidden = !abrir;
  boton.setAttribute('aria-expanded', String(abrir));
  document.body.style.overflow = abrir ? 'hidden' : '';
});
menu?.addEventListener('click', (e) => { if ((e.target as Element).closest('a')) cerrarMenu(); });

// Desplegable de áreas: se cierra al hacer clic fuera o con Escape.
const desplegable = document.querySelector<HTMLDetailsElement>('.nav details');
document.addEventListener('click', (e) => { if (desplegable?.open && !desplegable.contains(e.target as Node)) desplegable.open = false; });
addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (desplegable?.open) { desplegable.open = false; desplegable.querySelector('summary')?.focus(); }
  if (menu && !menu.hidden) { cerrarMenu(); boton?.focus(); }
});
