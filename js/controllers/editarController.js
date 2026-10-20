/* ==========================================================
  CONTROLADOR: editar un repuesto (Update). Lee ?id=RP-002
   ========================================================== */
const EditarController = {

  mostrarNoEncontrado(form) {
    const aviso = crearElemento('div', { clase: 'card empty' },
      crearElemento('h2', { texto: 'No encontramos ese repuesto' }),
      crearElemento('a', { clase: 'btn btn-primary', href: 'repuestos.html', texto: 'Ir al inventario' }));
    form.replaceChildren(aviso);
  },

  cargarFoto(repuesto) {
    const foto = new Image();
    foto.addEventListener('load', () => UploadView.mostrarPrevia(foto.src, repuesto.nombre));
    ImagenView.cargar(foto, repuesto.codigo, document.body.dataset.root, () => {});
  },

  init() {
    const form = document.getElementById('formEditar');
    if (!form) return;

    const id = new URLSearchParams(window.location.search).get('id');
    const repuesto = RepuestosModel.buscarPorId(id);

    if (!repuesto) {
      EditarController.mostrarNoEncontrado(form);
      return;
    }

    OpcionesView.llenar(form.elements.categoria, CategoriasModel.listar().map((c) => c.nombre), 'Selecciona una categoría');
    OpcionesView.llenar(form.elements.proveedor, ProveedoresModel.listar().map((p) => p.empresa), 'Selecciona un proveedor');

    llenarFormulario(form, repuesto);
    form.elements.codigo.readOnly = true; // el código identifica al repuesto
    document.getElementById('btnCancelar').href = `detalle.html?id=${encodeURIComponent(id)}`;
    EditarController.cargarFoto(repuesto);

    form.addEventListener('guardar', (evento) => {
      RepuestosModel.editar(id, evento.detail);
      setTimeout(() => { window.location.href = `detalle.html?id=${encodeURIComponent(id)}`; }, 900);
    });
  }
};