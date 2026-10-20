/* ==========================================================
  CONTROLADOR: detalle de un repuesto (Read) y su eliminación
   ========================================================== */
const DetalleController = {

  async eliminar(repuesto) {
    const confirmado = await ModalView.confirmar(`Se eliminará "${repuesto.nombre}" del inventario.`);
    if (!confirmado) return;

    RepuestosModel.eliminar(repuesto.id);
    FormView.toast('Repuesto eliminado');
    setTimeout(() => { window.location.href = 'repuestos.html'; }, 900);
  },

  init() {
    if (!document.getElementById('detalle')) return;

    const id = new URLSearchParams(window.location.search).get('id');
    const repuesto = RepuestosModel.buscarPorId(id);

    if (!repuesto) {
      DetalleView.noEncontrado();
      return;
    }

    DetalleView.render(escaparTextos(repuesto));

    document.getElementById('btnEliminar').addEventListener('click', () => DetalleController.eliminar(repuesto));
  }
};