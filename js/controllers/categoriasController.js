/* ==========================================================
   CONTROLADOR: página de categorías
   ========================================================== */
const CategoriasController = {

  pintar() {
    CategoriasView.pintarLista(CategoriasModel.listarConConteo());
    CategoriasView.pintarResumen(CategoriasModel.resumen());
  },

  init() {
    if (!document.getElementById('listaCategorias')) return;

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
  }
};