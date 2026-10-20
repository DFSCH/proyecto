/* ==========================================================
   UTILIDADES: leer y llenar formularios por el atributo name
   ========================================================== */
function leerFormulario(form) {
  const datos = {};

  [...form.elements]
    .filter((campo) => campo.name)
    .forEach((campo) => { datos[campo.name] = campo.value.trim(); });

  return datos;
}

function llenarFormulario(form, datos) {
  Object.keys(datos).forEach((nombre) => {
    const campo = form.elements[nombre];
    if (campo) campo.value = datos[nombre];
  });
}