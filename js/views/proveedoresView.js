/* ==========================================================
   VISTA: tarjetas y resumen de proveedores
   ========================================================== */
const ProveedoresView = {

  tarjeta(proveedor) {
    const clase = proveedor.estado === 'Activo' ? 'ok' : 'bad';

    return crearElemento('article', { clase: 'card prov' },
      crearElemento('div', { clase: 'prov-top' },
        crearElemento('span', { clase: 'actions' }, { 
          clase: 'ico', style: 'background:var(--oscuro);color:#fff', texto: ImagenView.iniciales(proveedor.empresa)
        }),
        crearElemento('span', { clase: `badge ${clase}`, texto: proveedor.estado })),
      crearElemento('h2', { texto: proveedor.empresa }),
      crearElemento('small', { texto: `Contacto: ${proveedor.contacto}` }),
      crearElemento('div', { clase: 'data' }, proveedor.telefono, crearElemento('br'), proveedor.correo),
      crearElemento('div', { clase: 'prov-foot' },
        crearElemento('span', {}, crearElemento('strong', { texto: proveedor.cantidad }), ' productos'),
        crearElemento('span', {},
          crearBotonAccion('Editar', 'editar', proveedor.id),
          crearBotonAccion('Eliminar', 'eliminar', proveedor.id))));
  },

  pintarLista(proveedores) {
    document.getElementById('listaProveedores').replaceChildren(...proveedores.map(ProveedoresView.tarjeta));
    Icons.aplicar();
  },

  pintarResumen({ activos, productos, pendientes }) {
    document.getElementById('provActivos').textContent = activos;
    document.getElementById('provProductos').textContent = productos;
    document.getElementById('provPendientes').textContent = pendientes;
  }
};