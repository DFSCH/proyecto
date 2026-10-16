/* ==========================================================
   CONTROLADOR: página de detalle (lee ?id=RP-002 de la URL)
   ========================================================== */
const DetalleController = {

  init() {
    if (!document.getElementById('detalle')) return;

    const id = new URLSearchParams(window.location.search).get('id');
    const repuesto = RepuestosModel.buscar(id);

    if (!repuesto) {
      DetalleView.noEncontrado();
      return;
    }

    DetalleView.render(repuesto);

    document.getElementById('btnEliminar').addEventListener('click', async () => {
      const acepto = await ModalView.confirmar(`Se eliminará "${repuesto.nombre}" del inventario.`);

      if (acepto) {
        FormView.toast('Repuesto eliminado');
        setTimeout(() => { window.location.href = 'repuestos.html'; }, 900);
      }
    });
  }
};