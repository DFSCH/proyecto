/* ==========================================================
   PUNTO DE ENTRADA: arranca todo según la página actual
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const { page, root } = document.body.dataset;

  ShellView.render(page, root);

  // Miniaturas en la tabla de repuestos (si la página las tiene)
  if (typeof ImagenView !== 'undefined') {
    ImagenView.aplicarTabla(root);
  }

  ShellController.init();
  ModalController.init();
  FormController.init();
  RepuestosController.init();

  // Solo se inician los controladores que esa página cargó
  if (typeof RowController !== 'undefined')     RowController.init();
  if (typeof DetalleController !== 'undefined') DetalleController.init();
  if (typeof UploadController !== 'undefined')  UploadController.init();
  if (typeof ConfigController !== 'undefined')  ConfigController.init();
  if (typeof EditarController !== 'undefined')  EditarController.init();
});