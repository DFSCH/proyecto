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

  elemento.append(...hijos);
  return elemento;
}

// Botón de icono (el SVG lo pone Icons.aplicar según el aria-label)
function crearBotonAccion(etiqueta, accion, id) {
  return crearElemento('button', {
    clase: 'icon-btn', type: 'button', 'aria-label': etiqueta, datos: { accion, id }
  });
}