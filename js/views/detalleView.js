/* ==========================================================
  VISTA: dibuja la página de detalle de un repuesto
   ========================================================== */
const DetalleView = {

  dinero: (n) => '$' + n.toLocaleString('es-CO'),

  // Ilustración de respaldo (se usa si no existe la foto)
  ilustracion(p) {
    return `
      <svg class="det-art" viewBox="0 0 300 300" role="img" aria-label="Ilustración de ${p.nombre}">
        <circle cx="140" cy="130" r="72" fill="none" stroke="#373a38" stroke-width="14" stroke-dasharray="26 12"/>
        <circle cx="195" cy="192" r="40" fill="none" stroke="#373a38" stroke-width="14" stroke-dasharray="18 10"/>
        <text x="140" y="140" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="30" fill="#ff5a1f">${p.marca}</text>
        <text x="262" y="46" text-anchor="end" font-family="Barlow Condensed" font-weight="700" font-size="20" fill="#7a7e7a">${p.codigo}</text>
      </svg>`;
  },

  aviso(p, estado) {
    if (estado.clase === 'bad') {
      return `<div class="aviso bad">${Icons.svg('alert')}<div><strong>Producto agotado</strong><small>Haz un pedido al proveedor para reponerlo.</small></div></div>`;
    }
    if (estado.clase === 'warn') {
      return `<div class="aviso warn">${Icons.svg('alert')}<div><strong>Solo quedan ${p.existencias} unidades</strong><small>El stock mínimo configurado es de ${p.minimo} unidades.</small></div></div>`;
    }
    return `<div class="aviso ok">${Icons.svg('check')}<div><strong>Stock saludable</strong><small>Tienes ${p.existencias} unidades, por encima del mínimo de ${p.minimo}.</small></div></div>`;
  },

  render(p) {
    const estado = RepuestosModel.estado(p);

    document.getElementById('detalle').innerHTML = `
      <p class="subtitle"><a href="repuestos.html">‹ Volver al inventario</a></p>

      <div class="det-head">
        <div>
          <span class="badge ${estado.clase}">${estado.texto}</span>
          <h1 style="margin-top:10px">${p.nombre}</h1>
          <p class="subtitle">${p.codigo} · ${p.categoria} · ${p.marca}</p>
        </div>
        <div class="acciones">
          <button class="btn" id="btnEliminar" data-icon="trash">Eliminar</button>
          <a class="btn btn-primary" id="btnEditar" href="editar.html?id=${encodeURIComponent(p.codigo)}" data-icon="edit">Editar repuesto</a>
        </div>
      </div>

      <div class="det-grid">

        <div class="det-img">
          <div class="det-foto" id="detFoto"></div>
          <div class="thumbs">
            <span class="thumb on" id="thumbFoto">${p.marca}</span>
            <span class="thumb">${p.codigo}</span>
          </div>
        </div>

        <div>
          <section class="card det-info">
            <small class="eyebrow" style="color:var(--suave)">Precio de venta</small>
            <p class="precio">${DetalleView.dinero(p.precio)}</p>
            <small class="subtitle">Compra: ${DetalleView.dinero(p.compra)} · Margen ${RepuestosModel.margen(p)}%</small>

            ${DetalleView.aviso(p, estado)}

            <h3>Información del producto</h3>
            <dl class="detalle" style="margin:0">
              <div><dt>Categoría</dt><dd>${p.categoria}</dd></div>
              <div><dt>Marca</dt><dd>${p.marca}</dd></div>
              <div><dt>Proveedor</dt><dd>${p.proveedor}</dd></div>
              <div><dt>Ubicación</dt><dd>${p.ubicacion}</dd></div>
            </dl>

            <h3>Compatibilidad</h3>
            <div class="chips">${[p.modelo, 'Modelos ' + p.anos].map((c) => `<span class="chip">${c}</span>`).join('')}</div>

            <h3>Descripción</h3>
            <p class="subtitle" style="margin-top:0">${p.descripcion}</p>
          </section>

          <p class="det-pie">Creado el ${formatearFecha(p.creado)} · Última actualización: ${formatearFecha(p.actualizado)}</p>
        </div>

      </div>`;

    Icons.aplicar();

    // Carga la foto del repuesto (assets/img/RP-001.jpg, etc.)
    ImagenView.montarDetalle(p, document.body.dataset.root);
  },

  noEncontrado() {
    document.getElementById('detalle').innerHTML = `
      <div class="card empty">
        <h2>No encontramos ese repuesto</h2>
        <p class="subtitle">Vuelve al inventario y elige uno de la lista.</p>
        <a class="btn btn-primary" href="repuestos.html" style="margin-top:16px">Ir al inventario</a>
      </div>`;
  }
};