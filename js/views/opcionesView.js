/* ==========================================================
  VISTA: llena los <select> con datos reales
   ========================================================== */
const OpcionesView = {

  llenar(select, textos, textoInicial) {
    const opciones = textos.map((texto) => crearElemento('option', { texto, value: texto }));
    select.replaceChildren(crearElemento('option', { texto: textoInicial, value: '' }), ...opciones);
  }
};