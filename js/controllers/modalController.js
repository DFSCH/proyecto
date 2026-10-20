/* ==========================================================
  CONTROLADOR: abrir y cerrar ventanas modales.
  Usa un solo escuchador de clics para toda la página
  (delegación de eventos), así funciona con cualquier ventana.
   ========================================================== */
const ModalController = {

  cerrarYLimpiar(modal) {
    ModalView.cerrar(modal);

    const form = modal.querySelector('form');
    if (form) FormView.limpiarForm(form);
  },

  manejarClic(evento) {
    const botonAbrir = evento.target.closest('[data-open]');
    if (botonAbrir) {
      ModalView.abrir(botonAbrir.dataset.open);
      return;
    }

    const botonCerrar = evento.target.closest('[data-close]');
    if (botonCerrar) {
      ModalController.cerrarYLimpiar(botonCerrar.closest('.modal'));
      return;
    }

    // Clic en el fondo oscuro (fuera de la ventana)
    const esFondo = evento.target.classList.contains('modal') && evento.target.id;
    if (esFondo) ModalController.cerrarYLimpiar(evento.target);
  },

  manejarTecla(evento) {
    if (evento.key !== 'Escape') return;

    // Solo las ventanas con id; el diálogo de confirmar maneja su propia respuesta
    document.querySelectorAll('.modal.open[id]').forEach(ModalController.cerrarYLimpiar);
  },

  init() {
    document.addEventListener('click', ModalController.manejarClic);
    document.addEventListener('keydown', ModalController.manejarTecla);
  }
};