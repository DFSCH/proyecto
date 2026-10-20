/* ==========================================================
   CONTROLADOR: maneja eventos de apertura/cierre de modales
   ========================================================== */
const ModalController = {
  init() {
    // Escucha clics globales para abrir/cerrar modales por data-attributes
    document.addEventListener('click', (evento) => {
      const botonAbrir = evento.target.closest('[data-modal]');
      if (botonAbrir) {
        ModalView.abrir(botonAbrir.dataset.modal);
        return;
      }

      const botonCerrar = evento.target.closest('[data-cerrar]');
      if (botonCerrar) {
        const modal = botonCerrar.closest('.modal');
        if (modal) ModalView.cerrar(modal);
      }
    });
  }
};