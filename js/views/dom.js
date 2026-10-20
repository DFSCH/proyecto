/* ==========================================================
   VISTA BASE: crea elementos con textContent (seguro)
   ========================================================== */
function crearElemento(etiqueta, atributos = {}, ...hijos) {
  const elemento = document.createElement(etiqueta);

  Object.entries(atributos).forEach(([nombre, valor]) => {
    if (nombre === 'texto') elemento.textContent = valor;
    else if (nombre === 'clase') elemento.className = valor;
    else if (nombre === 'datos') Object.assign(elemento.dataset, valor);
    else elemento.setAttribute(nombre, valor);
  });

  hijos.forEach((hijo) => {
    const esContenidoValido =
      hijo instanceof Node || typeof hijo === 'string' || typeof hijo === 'number';

    if (esContenidoValido) {
      elemento.append(hijo);
    } else if (window.avisarProblema) {
      window.avisarProblema(`<${etiqueta}> recibió un objeto como contenido. Revisa los paréntesis de esa llamada.`);
    }
  });

  return elemento;
}

// Botón de icono (el SVG lo pone Icons.aplicar según el aria-label)
function crearBotonAccion(etiqueta, accion, id) {
  return crearElemento('button', {
    clase: 'icon-btn', type: 'button', 'aria-label': etiqueta, datos: { accion, id }
  });
}