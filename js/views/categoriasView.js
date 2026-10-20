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
    const contenedor = document.getElementById('listaCategorias');
    document.getElementById('catTotal').textContent = `${categorias.length} categorías encontradas`;

    if (categorias.length === 0) {
      contenedor.replaceChildren(crearElemento('p', { clase: 'empty', texto: 'No hay categorías con ese nombre.' }));
      return;
    }

    contenedor.replaceChildren(...categorias.map((categoria) => CategoriasView.fila(categoria)));
    Icons.aplicar();
  },

  pintarResumen({ activas, mayor, cantidadMayor, sinClasificar }) {
    document.getElementById('catActivas').textContent = activas;
    document.getElementById('catMayor').textContent = mayor;
    document.getElementById('catMayorCantidad').textContent = `${cantidadMayor} repuestos registrados`;
    document.getElementById('catSinClasificar').textContent = sinClasificar;
  }
};