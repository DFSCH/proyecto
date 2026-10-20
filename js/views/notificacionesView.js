/* ==========================================================
  VISTA: dibuja la campana y el panel de notificaciones
   ========================================================== */
const NotificacionesView = {

  contenedor: null,
  raiz: '',
  abierto: false,

  iniciar(contenedor, raiz) {
    NotificacionesView.contenedor = contenedor;
    NotificacionesView.raiz = raiz;
    NotificacionesView.pintar();
  },

  pintar() {
    const sinLeer = NotificacionesModel.hayNoLeidas();
    const abierto = NotificacionesView.abierto;

    const items = NotificacionesModel.lista.map((n) => `
      <li class="notif-item ${n.leida ? 'leida' : ''}">
        <span class="ico ${n.color}">${Icons.svg(n.icono)}</span>
        <div>
          <strong>${n.titulo}</strong>
          <small>${n.texto}</small>
        </div>
      </li>`).join('');

    NotificacionesView.contenedor.innerHTML = `
      <button type="button" class="bell ${sinLeer ? 'con-aviso' : ''}" data-campana
              aria-label="Notificaciones" aria-haspopup="true" aria-expanded="${abierto}">
        ${Icons.svg('bell', 20)}
      </button>

      <div class="notif-panel" ${abierto ? '' : 'hidden'}>
        <div class="notif-head">
          <h2>Notificaciones</h2>
          <button type="button" data-marcar ${sinLeer ? '' : 'disabled'}>Marcar como leídas</button>
        </div>

        <ul class="notif-lista">${items}</ul>

        <a class="notif-pie" href="${NotificacionesView.raiz}html/configuracion.html#notificaciones">
          Configurar notificaciones
        </a>
      </div>`;
  },

  abrir() {
    NotificacionesView.abierto = true;
    NotificacionesView.contenedor.querySelector('.notif-panel').hidden = false;
    NotificacionesView.contenedor.querySelector('[data-campana]').setAttribute('aria-expanded', 'true');
  },

  cerrar() {
    NotificacionesView.abierto = false;
    NotificacionesView.contenedor.querySelector('.notif-panel').hidden = true;
    NotificacionesView.contenedor.querySelector('[data-campana]').setAttribute('aria-expanded', 'false');
  },

  alternar() {
    if (NotificacionesView.abierto) {
      NotificacionesView.cerrar();
    } else {
      NotificacionesView.abrir();
    }
  }
};