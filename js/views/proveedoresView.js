/* ==========================================================
  VISTA: tarjetas y resumen de proveedores
   ========================================================== */
const ProveedoresView = {

  tarjeta(proveedor) {
    const clase = proveedor.estado === 'Activo' ? 'ok' : 'bad';

    const iniciales = crearElemento('span', {
      clase: 'ico',
      style: 'background:var(--oscuro);color:#fff',
      texto: ImagenView.iniciales(proveedor.empresa)
    });

    const estado = crearElemento('span', { clase: `badge ${clase}`, texto: proveedor.estado });

    const botones = crearElemento('span', { clase: 'actions' },
      crearBotonAccion('Editar', 'editar', proveedor.id),
      crearBotonAccion('Eliminar', 'eliminar', proveedor.id));

    const cantidad = crearElemento('span', {},
      crearElemento('strong', { texto: proveedor.cantidad }),
      ' productos');

    return crearElemento('article', { clase: 'card prov' },
      crearElemento('div', { clase: 'prov-top' }, iniciales, estado),
      crearElemento('h2', { texto: proveedor.empresa }),
      crearElemento('small', { texto: `Contacto: ${proveedor.contacto}` }),
      crearElemento('div', { clase: 'data' }, proveedor.telefono, crearElemento('br'), proveedor.correo),
      crearElemento('div', { clase: 'prov-foot' }, cantidad, botones));
  },

  pintarLista(proveedores) {
    const contenedor = document.getElementById('listaProveedores');

    if (proveedores.length === 0) {
      contenedor.replaceChildren(crearElemento('p', {
        clase: 'empty', style: 'grid-column:1/-1', texto: 'No hay proveedores con esa búsqueda.'
      }));
      return;
    }

    contenedor.replaceChildren(...proveedores.map((proveedor) => ProveedoresView.tarjeta(proveedor)));
    Icons.aplicar();
  },

  pintarResumen({ activos, productos, pendientes }) {
    document.getElementById('provActivos').textContent = activos;
    document.getElementById('provProductos').textContent = productos;
    document.getElementById('provPendientes').textContent = pendientes;
  }
};