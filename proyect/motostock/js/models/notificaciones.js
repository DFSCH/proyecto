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
    try {
      if (localStorage.getItem(NotificacionesModel.clave) === '1') {
        NotificacionesModel.lista.forEach((n) => { n.leida = true; });
      }
    } catch (error) {
      // Si el navegador bloquea el almacenamiento, se sigue sin guardar
    }
  },

  marcarTodas() {
    NotificacionesModel.lista.forEach((n) => { n.leida = true; });

    try {
      localStorage.setItem(NotificacionesModel.clave, '1');
    } catch (error) {
      // Sin almacenamiento: el cambio solo dura en esta página
    }
  },

  hayNoLeidas() {
    return NotificacionesModel.lista.some((n) => !n.leida);
  }
};