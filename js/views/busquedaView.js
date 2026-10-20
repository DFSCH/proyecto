/* ==========================================================
    VISTA: panel de resultados de la búsqueda general
   ========================================================== */
const BusquedaView = {

    resultado(item, raiz) {
    return crearElemento('a', { clase: 'busqueda-item', href: raiz + item.destino },
        crearElemento('strong', { texto: item.titulo }),
        crearElemento('small', { texto: item.detalle }));
    },

    grupo(grupo, raiz) {
    return crearElemento('div', { clase: 'busqueda-grupo' },
        crearElemento('h3', { texto: grupo.titulo }),
        ...grupo.resultados.map((item) => BusquedaView.resultado(item, raiz)));
    },

    pintar(panel, grupos, raiz) {
    if (grupos.length === 0) {
        panel.replaceChildren(crearElemento('p', { clase: 'busqueda-vacio', texto: 'No encontramos resultados.' }));
        return;
    }

    panel.replaceChildren(...grupos.map((grupo) => BusquedaView.grupo(grupo, raiz)));
    },

    abrir(panel) { panel.hidden = false; },
    cerrar(panel) { panel.hidden = true; }
};