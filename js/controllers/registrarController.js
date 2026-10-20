/* ==========================================================
  CONTROLADOR: registrar un repuesto nuevo (Create)
   ========================================================== */
const RegistrarController = {

  init() {
    const form = document.getElementById('formRegistrar');
    if (!form) return;

    OpcionesView.llenar(form.elements.categoria, CategoriasModel.listar().map((c) => c.nombre), 'Selecciona una categoría');
    OpcionesView.llenar(form.elements.proveedor, ProveedoresModel.listar().map((p) => p.empresa), 'Selecciona un proveedor');

    form.elements.minimo.value = ConfiguracionModel.obtener().preferencias.minimo;

    form.addEventListener('guardar', (evento) => {
      const datos = evento.detail;

      if (RepuestosModel.existeCodigo(datos.codigo)) {
        FormView.mostrarError(form.elements.codigo, 'Ya existe un repuesto con ese código.');
        evento.preventDefault();
        return;
      }

      RepuestosModel.crear(datos);
      setTimeout(() => { window.location.href = 'repuestos.html'; }, 900);
    });
  }
};