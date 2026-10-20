/* ==========================================================
  VISTA: tabla y paginación de repuestos (se crean con el DOM)
   ========================================================== */
const RepuestosView = {

  miniatura(repuesto, raiz) {
    const foto = crearElemento('img', { clase: 'prod-foto', alt: '', loading: 'lazy' });

    ImagenView.cargar(foto, repuesto.codigo, raiz, () => {
      foto.replaceWith(crearElemento('span', {
        clase: 'prod-foto prod-foto-vacio', texto: ImagenView.iniciales(repuesto.nombre)
      }));
    });

    return foto;
  },

  acciones(repuesto) {
    const ver = crearElemento('a', {
      clase: 'icon-btn', 'aria-label': 'Ver detalle', href: `detalle.html?id=${encodeURIComponent(repuesto.id)}`
    });
    const editar = crearElemento('a', {
      clase: 'icon-btn', 'aria-label': 'Editar', href: `editar.html?id=${encodeURIComponent(repuesto.id)}`
    });

    return crearElemento('div', { clase: 'actions' }, ver, editar, crearBotonAccion('Eliminar', 'eliminar', repuesto.id));
  },

  fila(repuesto, raiz) {
    const estado = RepuestosModel.estado(repuesto);

    return crearElemento('tr', {},
      crearElemento('td', {},
        crearElemento('div', { clase: 'prod-cell' },
          RepuestosView.miniatura(repuesto, raiz),
          crearElemento('div', {},
            crearElemento('strong', { texto: repuesto.nombre }),
            crearElemento('small', { texto: repuesto.codigo })))),
      crearElemento('td', { texto: repuesto.categoria }),
      crearElemento('td', { texto: repuesto.marca }),
      crearElemento('td', {}, crearElemento('strong', { texto: formatearDinero(repuesto.precio) })),
      crearElemento('td', { texto: `${repuesto.existencias} unidades` }),
      crearElemento('td', {}, crearElemento('span', { clase: `badge ${estado.clase}`, texto: estado.texto })),
      crearElemento('td', {}, RepuestosView.acciones(repuesto)));
  },

  pintarTabla(repuestos, raiz) {
    document.getElementById('tablaRepuestos').replaceChildren(
      ...repuestos.map((repuesto) => RepuestosView.fila(repuesto, raiz))
    );
    Icons.aplicar();
  },

  pintarResumen({ total, desde, hasta }) {
    document.getElementById('total').textContent = total;
    document.getElementById('vacio').hidden = total > 0;
    document.getElementById('pagInfo').textContent =
      total === 0 ? 'Sin resultados' : `Mostrando ${desde}-${hasta} de ${total}`;
  },

  pintarPaginacion({ pagina, paginas }) {
    const crearBoton = (texto, destino, { activo = false, deshabilitado = false } = {}) => {
      const boton = crearElemento('button', {
        type: 'button', texto, clase: activo ? 'on' : '', datos: { ir: destino }, 'aria-label': `Página ${texto}`
      });
      boton.disabled = deshabilitado;
      return boton;
    };

    const numeros = Array.from({ length: paginas }, (_, posicion) =>
      crearBoton(posicion + 1, posicion + 1, { activo: posicion + 1 === pagina }));

    document.getElementById('pagBotones').replaceChildren(
      crearBoton('‹', pagina - 1, { deshabilitado: pagina === 1 }),
      ...numeros,
      crearBoton('›', pagina + 1, { deshabilitado: pagina === paginas })
    );
  }
};