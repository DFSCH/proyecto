/* ==========================================================
   VISTA: iconos SVG + barra lateral y barra superior
   ========================================================== */
const Icons = {

  rutas: {
    grid:   '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    box:    '<path d="M21 8l-9-5-9 5v8l9 5 9-5V8z"/><path d="M3 8l9 5 9-5"/><path d="M12 13v8"/>',
    tag:    '<path d="M20 12l-8 8-9-9V3h8l9 9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    truck:  '<path d="M1 4h13v12H1z"/><path d="M14 8h4l4 4v4h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
    gear:   '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/>',
    bell:   '<path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    logout: '<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',
    menu:   '<path d="M3 6h18M3 12h18M3 18h18"/>',
    plus:   '<path d="M12 5v14M5 12h14"/>',
    check:  '<path d="M20 6L9 17l-5-5"/>',
    alert:  '<path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    x:      '<path d="M18 6L6 18M6 6l12 12"/>',
    upload: '<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/>',
    back:   '<path d="M15 18l-6-6 6-6"/>',
    eye:    '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    edit:   '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>',
    trash:  '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/>'
  },

  svg(nombre, tam = 18) {
    return `<svg class="icon" width="${tam}" height="${tam}" viewBox="0 0 24 24" aria-hidden="true">${Icons.rutas[nombre]}</svg>`;
  },

  // Pone los iconos en la página (se puede llamar varias veces sin duplicar)
  aplicar() {
    // 1. Botones de tabla según su aria-label
    const botones = { 'Ver detalle': 'eye', 'Ver': 'eye', 'Editar': 'edit', 'Eliminar': 'trash' };
    document.querySelectorAll('.icon-btn').forEach((b) => {
      const nombre = botones[b.getAttribute('aria-label')];
      if (nombre && !b.querySelector('svg')) b.innerHTML = Icons.svg(nombre);
    });

    // 2. Elementos con data-icon="nombre"
    document.querySelectorAll('[data-icon]').forEach((el) => {
      if (!el.querySelector('svg')) el.insertAdjacentHTML('afterbegin', Icons.svg(el.dataset.icon));
    });

    // 3. Etiqueta de categoría (🏷) -> icono
    document.querySelectorAll('.ico').forEach((el) => {
      if (el.textContent.trim() === '🏷') el.innerHTML = Icons.svg('tag');
    });

    // 4. Símbolos al inicio de botones y avisos: + ✓ ⚠ ‹
    const simbolos = { '+': 'plus', '✓': 'check', '⚠': 'alert', '‹': 'back' };
    document.querySelectorAll('.btn, .notice, .subtitle a').forEach((el) => {
      const nodo = el.firstChild;
      if (!nodo || nodo.nodeType !== 3) return;

      const texto = nodo.textContent.trim();
      const nombre = simbolos[texto[0]];
      if (!nombre) return;

      nodo.textContent = ' ' + texto.slice(1).trim();
      el.insertAdjacentHTML('afterbegin', Icons.svg(nombre, 16));
    });
  }
};

const ShellView = {

  render(pagina, raiz) {
    const { items, usuario } = MenuModel;

    const crearEnlace = (item) => `
      <a href="${raiz}${item.ruta}" class="${item.id === pagina ? 'active' : ''}">
        ${Icons.svg(item.icono)}
        ${item.texto}
        ${item.contador ? '<span class="count">0</span>' : ''}
      </a>`;

    document.getElementById('sidebar').innerHTML = `
      <div class="logo"><b>MS</b>MOTO<em>STOCK</em></div>

      <nav class="nav">
        <div class="nav-title">Menú principal</div>
        ${items.map(crearEnlace).join('')}

        <div class="nav-title">Sistema</div>
        <a href="${raiz}html/configuracion.html"
           class="${pagina === 'configuracion' ? 'active' : ''}">
          ${Icons.svg('gear')}Configuración
        </a>
      </nav>

      <div class="sidebar-bottom">
        <div class="alert-box">
          <small>${Icons.svg('alert', 14)} Atención</small>
          <strong>0 productos con stock bajo</strong>
          <a href="${raiz}html/repuestos.html">Revisar inventario ›</a>
        </div>
        <nav class="nav">
          <a href="${raiz}index.html">${Icons.svg('logout')}Cerrar sesión</a>
        </nav>
      </div>`;

    document.getElementById('topbar').innerHTML = `
      <button class="menu-btn" id="menuBtn" aria-label="Abrir menú">${Icons.svg('menu', 24)}</button>
      ${Icons.svg('search')}
      <input type="search" placeholder="Buscar en MotoStock..." aria-label="Buscar">
            <div class="notif" id="notif"></div>
      <div class="user">
        <span class="avatar">${usuario.iniciales}</span>
        <div>
          <strong>${usuario.nombre}</strong>
          <small>${usuario.rol}</small>
        </div>
      </div>`;

    Icons.aplicar();
  }
};