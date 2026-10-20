/* ==========================================================
  VISTA: contadores del menú lateral
   ========================================================== */
const ContadoresView = {

  actualizar() {
    const { total, bajoStock } = RepuestosModel.resumen();

    document.querySelectorAll('.nav .count').forEach((el) => { el.textContent = total; });
    document.querySelectorAll('.alert-box strong').forEach((el) => {
      el.textContent = `${bajoStock} productos con stock bajo`;
    });
  }
};