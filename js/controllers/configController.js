/* ==========================================================
  CONTROLADOR: Configuración (pestañas, guardado y restablecer)
   ========================================================== */
const ConfigController = {

  mostrarPestana(id) {
    document.querySelectorAll('[data-tab]').forEach((pestana) => {
      pestana.classList.toggle('active', pestana.dataset.tab === id);
    });
    document.querySelectorAll('.panel').forEach((panel) => { panel.hidden = panel.id !== `panel-${id}`; });
  },

  conectarPestanas() {
    const pestanas = [...document.querySelectorAll('[data-tab]')];
    const validas = pestanas.map((pestana) => pestana.dataset.tab);

    pestanas.forEach((pestana) => {
      pestana.addEventListener('click', (evento) => {
        evento.preventDefault();
        history.replaceState(null, '', `#${pestana.dataset.tab}`);
        ConfigController.mostrarPestana(pestana.dataset.tab);
      });
    });

    const inicial = window.location.hash.slice(1);
    ConfigController.mostrarPestana(validas.includes(inicial) ? inicial : validas[0]);
  },

  // Llena un formulario con lo que hay guardado de su sección
  llenarDesdeGuardado(form) {
    llenarFormulario(form, ConfiguracionModel.obtener()[form.dataset.seccion]);
  },

  conectarFormulario(form) {
    ConfigController.llenarDesdeGuardado(form);

    form.addEventListener('guardar', (evento) => {
      ConfiguracionModel.guardarSeccion(form.dataset.seccion, evento.detail);
      PreferenciasController.aplicar();
    });

    // "Restablecer" vuelve a lo último que se guardó
    form.addEventListener('reset', () => {
      setTimeout(() => ConfigController.llenarDesdeGuardado(form), 0);
    });
  },

  init() {
    if (!document.querySelector('[data-tab]')) return;

    ConfigController.conectarPestanas();
    document.querySelectorAll('form[data-seccion]').forEach(ConfigController.conectarFormulario);

    document.getElementById('enviarPrueba').addEventListener('click', () => {
      FormView.toast('Así se verá una alerta: Kit de arrastre 428H tiene stock bajo.');
    });
  }
};