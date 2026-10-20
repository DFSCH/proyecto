/* ==========================================================
   CONTROLADOR: página de inicio (datos reales del inventario)
   ========================================================== */
const InicioController = {

  init() {
    if (!document.getElementById('statTotal')) return;

    const resumen = RepuestosModel.resumen();

    InicioView.pintarEstadisticas(resumen);
    InicioView.pintarAlertas(RepuestosModel.alertas());
    InicioView.pintarDonut(RepuestosModel.distribucionPorCategoria(), resumen.total);
  }
};