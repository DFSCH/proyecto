/* ==========================================================
  CONTROLADOR: página de categorías (listar, buscar, CRUD)
   ========================================================== */
const CategoriasController = {

  textoBuscado() {
    const buscador = document.getElementById('buscarCategoria');
    return buscador ? buscador.value : '';
  },

    // Si se llegó desde la búsqueda general (?buscar=Frenos), se rellena el buscador
  aplicarBusquedaDeLaUrl() {
    const texto = new URLSearchParams(window.location.search).get('buscar');
    if (texto) document.getElementById('buscarCategoria').value = texto;
  },

  pintar() {
    CategoriasView.pintarLista(CategoriasModel.buscar(CategoriasController.textoBuscado()));
    CategoriasView.pintarResumen(CategoriasModel.resumen());
  },

  init() {
    if (document.body.dataset.page !== 'categorias') return;

    if (!document.getElementById('listaCategorias')) {
      window.avisarProblema('Falta el elemento con id="listaCategorias" en categorias.html');
      return;
    }

    CategoriasController.aplicarBusquedaDeLaUrl();

    CrudModalController.iniciar({
      modelo: CategoriasModel,
      pintar: CategoriasController.pintar,
      idModal: 'modalCategoria',
      idBoton: 'btnNueva',
      idLista: 'listaCategorias',
      titulos: { nuevo: 'Nueva categoría', editar: 'Editar categoría' },
      etiqueta: (categoria) => categoria.nombre,
      alActualizar: (anterior, nuevo) => RepuestosModel.reasignar('categoria', anterior.nombre, nuevo.nombre)
    });

    // El listado se filtra mientras se escribe
    document.getElementById('buscarCategoria').addEventListener('input', CategoriasController.pintar);
  }
};