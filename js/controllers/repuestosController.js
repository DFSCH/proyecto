/* ==========================================================
  CONTROLADOR: listado de repuestos (buscar, filtrar, paginar, eliminar)
   ========================================================== */
const RepuestosController = {

  porPagina: 5,
  pagina: 1,

  leerFiltros() {
    return {
      texto: document.getElementById('buscar').value,
      categoria: document.getElementById('fCategoria').value,
      estado: document.getElementById('fEstado').value
    };
  },

  actualizar() {
    const filtrados = RepuestosModel.filtrar(RepuestosController.leerFiltros());
    const paginado = paginar(filtrados, RepuestosController.pagina, RepuestosController.porPagina);

    RepuestosController.pagina = paginado.pagina;
    RepuestosView.pintarTabla(paginado.items, document.body.dataset.root);
    RepuestosView.pintarResumen(paginado);
    RepuestosView.pintarPaginacion(paginado);
    ContadoresView.actualizar();
  },

  // Al cambiar un filtro se vuelve a la página 1
  filtrarDesdeInicio() {
    RepuestosController.pagina = 1;
    RepuestosController.actualizar();
  },

  limpiarFiltros() {
    ['buscar', 'fCategoria', 'fEstado'].forEach((id) => { document.getElementById(id).value = ''; });
    RepuestosController.filtrarDesdeInicio();
  },

  async eliminar(id) {
    const repuesto = RepuestosModel.buscarPorId(id);
    const confirmado = await ModalView.confirmar(`Se eliminará "${repuesto.nombre}" del inventario.`);
    if (!confirmado) return;

    RepuestosModel.eliminar(id);
    FormView.toast('Repuesto eliminado');
    RepuestosController.actualizar();
  },

  conectarEventos() {
    ['buscar', 'fCategoria', 'fEstado'].forEach((id) => {
      document.getElementById(id).addEventListener('input', RepuestosController.filtrarDesdeInicio);
    });

    document.getElementById('limpiar').addEventListener('click', RepuestosController.limpiarFiltros);

    document.getElementById('pagBotones').addEventListener('click', (evento) => {
      const boton = evento.target.closest('button[data-ir]');
      if (!boton || boton.disabled) return;

      RepuestosController.pagina = Number(boton.dataset.ir);
      RepuestosController.actualizar();
    });

    document.getElementById('tablaRepuestos').addEventListener('click', (evento) => {
      const boton = evento.target.closest('[data-accion="eliminar"]');
      if (boton) RepuestosController.eliminar(boton.dataset.id);
    });
  },

  init() {
    if (!document.getElementById('tablaRepuestos')) return;

    OpcionesView.llenar(
      document.getElementById('fCategoria'),
      CategoriasModel.listar().map((categoria) => categoria.nombre),
      'Todas las categorías'
    );

    RepuestosController.conectarEventos();
    RepuestosController.actualizar();
  }
};