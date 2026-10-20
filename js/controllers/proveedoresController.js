/* ==========================================================
  CONTROLADOR: página de proveedores (listar, buscar, CRUD)
   ========================================================== */
const ProveedoresController = {

  textoBuscado() {
    const buscador = document.getElementById('buscarProveedor');
    return buscador ? buscador.value : '';
  },

    // Si se llegó desde la búsqueda general (?buscar=Frenos), se rellena el buscador
  aplicarBusquedaDeLaUrl() {
    const texto = new URLSearchParams(window.location.search).get('buscar');
    if (texto) document.getElementById('buscarProveedor').value = texto;
  },

  pintar() {
    ProveedoresView.pintarLista(ProveedoresModel.buscar(ProveedoresController.textoBuscado()));
    ProveedoresView.pintarResumen(ProveedoresModel.resumen());
  },

  init() {
    if (document.body.dataset.page !== 'proveedores') return;

    if (!document.getElementById('listaProveedores')) {
      window.avisarProblema('Falta el elemento con id="listaProveedores" en proveedores.html');
      return;
    }

    ProveedoresController.aplicarBusquedaDeLaUrl();

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

    // El listado se filtra mientras se escribe
    document.getElementById('buscarProveedor').addEventListener('input', ProveedoresController.pintar);
  }
};