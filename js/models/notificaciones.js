/* ==========================================================
  MODELO: notificaciones de ejemplo y su estado (leídas)
   ========================================================== */
const NotificacionesModel = {

  clave: 'motostock_notificaciones_leidas',

  lista: [
    {
      id: 1,
      icono: 'alert',
      color: 'ambar',
      titulo: 'Stock bajo',
      texto: 'Kit de arrastre 428H llegó a 3 unidades.',
      leida: false
    },
    {
      id: 2,
      icono: 'truck',
      color: 'verde',
      titulo: 'Pedido actualizado',
      texto: 'MotoPartes Colombia confirmó el despacho.',
      leida: false
    }
  ],

  // Recupera si ya se marcaron como leídas (para que no vuelvan al cambiar de página)
  cargar() {
    const yaLeidas = AlmacenLocal.leer(NotificacionesModel.clave, false);
    if (yaLeidas) NotificacionesModel.lista.forEach((notificacion) => { notificacion.leida = true; });
  },

  marcarTodas() {
    NotificacionesModel.lista.forEach((notificacion) => { notificacion.leida = true; });
    AlmacenLocal.guardar(NotificacionesModel.clave, true);
  },

  hayNoLeidas() {
    return NotificacionesModel.lista.some((notificacion) => !notificacion.leida);
  }
};