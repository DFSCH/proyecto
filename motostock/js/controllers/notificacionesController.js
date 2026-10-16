/* ==========================================================
   CONTROLADOR: abrir/cerrar el panel y marcar como leídas
   ========================================================== */
const NotificacionesController = {

  init() {
    const contenedor = document.getElementById('notif');
    if (!contenedor) return;

    NotificacionesModel.cargar();
    NotificacionesView.iniciar(contenedor, document.body.dataset.root);

    // Clics dentro del contenedor (campana y "Marcar como leídas")
    contenedor.addEventListener('click', (evento) => {
      if (evento.target.closest('[data-campana]')) {
        NotificacionesView.alternar();
        return;
      }

      if (evento.target.closest('[data-marcar]')) {
        NotificacionesModel.marcarTodas();
        NotificacionesView.pintar();
        FormView.toast('Notificaciones marcadas como leídas');
      }
    });

    // Clic fuera del panel: se cierra
    // (composedPath sirve aunque el botón pulsado ya se haya redibujado)
    document.addEventListener('click', (evento) => {
      if (!evento.composedPath().includes(contenedor)) {
        NotificacionesView.cerrar();
      }
    });

    // Tecla Esc: se cierra y el foco vuelve a la campana
    document.addEventListener('keydown', (evento) => {
      if (evento.key === 'Escape' && NotificacionesView.abierto) {
        NotificacionesView.cerrar();
        contenedor.querySelector('[data-campana]').focus();
      }
    });
  }
};