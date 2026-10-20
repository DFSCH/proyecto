/* ==========================================================
   CONTROLADOR: página de proveedores
   ========================================================== */
const ProveedoresController = {

  pintar() {
    ProveedoresView.pintarLista(ProveedoresModel.listarConConteo());
    ProveedoresView.pintarResumen(ProveedoresModel.resumen());
  },

  init() {
    if (!document.getElementById('listaProveedores')) return;

    CrudModalController.iniciar({
      modelo: ProveedoresModel,
      pintar: ProveedoresController.pintar,
      idModal: 'modalProveedor',
      idBoton: 'btnNuevo',
      idLista: 'listaProveedores',
      titulos: { nuevo: 'Registrar proveedor', editar: 'Editar proveedor' },
      etiqueta: (proveedor) => proveedor.empresa,
      porDefecto: { estado: 'Activo' },
      alActualizar: (anterior, nuevo) => RepuestosModel.reasignar('proveedor', anterior.empresa, nuevo.empresa)
    });
  }
};