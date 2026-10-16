/* ==========================================================
   CONTROLADOR: pestañas, interruptores y prueba de notificación
   ========================================================== */
const ConfigController = {

  init() {
    const pestanas = [...document.querySelectorAll('[data-tab]')];
    if (pestanas.length === 0) return;

    const paneles = [...document.querySelectorAll('.panel')];
    const validas = pestanas.map((p) => p.dataset.tab);

    const mostrar = (id) => {
      pestanas.forEach((p) => p.classList.toggle('active', p.dataset.tab === id));
      paneles.forEach((p) => { p.hidden = p.id !== `panel-${id}`; });
    };

    pestanas.forEach((pestana) => {
      pestana.addEventListener('click', (evento) => {
        evento.preventDefault();
        history.replaceState(null, '', `#${pestana.dataset.tab}`);
        mostrar(pestana.dataset.tab);
      });
    });

    // Abre la pestaña indicada en la URL (#notificaciones) o la primera
    const inicial = window.location.hash.slice(1);
    mostrar(validas.includes(inicial) ? inicial : validas[0]);

    // Botón "Enviar prueba"
    document.getElementById('enviarPrueba').addEventListener('click', () => {
      FormView.toast('Así se verá una alerta: Kit de arrastre 428H tiene stock bajo.');
    });

    // Interruptor "Vista compacta": cambia la tabla de repuestos en vivo
    const compacta = document.querySelector('[data-pref="compacta"]');
    compacta.checked = localStorage.getItem('compacta') === '1';
    document.body.classList.toggle('compacta', compacta.checked);

    compacta.addEventListener('change', () => {
      document.body.classList.toggle('compacta', compacta.checked);
      localStorage.setItem('compacta', compacta.checked ? '1' : '0');
    });
  }
};