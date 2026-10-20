/* ==========================================================
   VISTA: listado y resumen de categorías
   ========================================================== */
const CategoriasView = {

  fila(categoria) {
    const icono = crearElemento('span', { clase: 'ico' });
    icono.innerHTML = Icons.svg('tag'); // SVG fijo, sin datos del usuario

    return crearElemento('div', { clase: 'cat-row' },
      icono,
      crearElemento('div', { clase: 'grow' },
        crearElemento('strong', { texto: categoria.nombre }),
        crearElemento('small', { texto: categoria.descripcion })),
      crearElemento('span', { clase: 'num', texto: categoria.cantidad }),
      crearBotonAccion('Editar', 'editar', categoria.id),
      crearBotonAccion('Eliminar', 'eliminar', categoria.id));
  },

  pintarLista(categorias) {
    document.getElementById('listaCategorias').replaceChildren(...categorias.map(CategoriasView.fila));
    document.getElementById('catTotal').textContent = `${categorias.length} categorías encontradas`;
    Icons.aplicar();
  },

  pintarResumen({ activas, mayor, cantidadMayor, sinClasificar }) {
    document.getElementById('catActivas').textContent = activas;
    document.getElementById('catMayor').textContent = mayor;
    document.getElementById('catMayorCantidad').textContent = `${cantidadMayor} repuestos registrados`;
    document.getElementById('catSinClasificar').textContent = sinClasificar;
  }
};