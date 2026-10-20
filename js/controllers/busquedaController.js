/* ==========================================================
CONTROLADOR: barra de búsqueda general de la barra superior
   ========================================================== */
    const BusquedaController = {

  // Envuelve la barra existente para poder ubicar el panel debajo
    prepararContenedor(entrada) {
    const envoltura = crearElemento('div', { clase: 'busqueda-global' });
    const panel = crearElemento('div', { clase: 'busqueda-panel', hidden: '' });

    entrada.replaceWith(envoltura);
    envoltura.append(entrada, panel);

    return { envoltura, panel };
    },

    buscar(entrada, panel, raiz) {
    const grupos = BusquedaModel.buscar(entrada.value);

    if (entrada.value.trim() === '') {
    BusquedaView.cerrar(panel);
    return;
    }

    BusquedaView.pintar(panel, grupos, raiz);
    BusquedaView.abrir(panel);
    },

    abrirPrimerResultado(panel) {
    const primero = panel.querySelector('a');
    if (primero) window.location.href = primero.href;
    },

    init() {
    const entrada = document.querySelector('.topbar input[type="search"]');
    if (!entrada) return;

    const raiz = document.body.dataset.root;
    const { envoltura, panel } = BusquedaController.prepararContenedor(entrada);

    entrada.addEventListener('input', () => BusquedaController.buscar(entrada, panel, raiz));
    entrada.addEventListener('focus', () => BusquedaController.buscar(entrada, panel, raiz));

    entrada.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') BusquedaView.cerrar(panel);
        if (evento.key === 'Enter') BusquedaController.abrirPrimerResultado(panel);
    });

    // Clic fuera de la barra: se cierra el panel
    document.addEventListener('click', (evento) => {
        if (!envoltura.contains(evento.target)) BusquedaView.cerrar(panel);
        });
    }
};