/* ==========================================================
   MODELO: reglas de validación (no toca el DOM)
   ========================================================== */
const Validator = {

  reglas: {
    required: (valor) =>
      valor.trim() !== '' || 'Este campo es obligatorio.',

    email: (valor) =>
      valor === '' ||
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor) ||
      'Escribe un correo válido (ej. correo@empresa.com).',

    phone: (valor) =>
      valor === '' ||
      /^\+?[\d\s]{7,15}$/.test(valor) ||
      'Escribe un teléfono válido (7 a 15 dígitos).',

    number: (valor) =>
      valor === '' ||
      (!isNaN(valor) && Number(valor) >= 0) ||
      'Debe ser un número igual o mayor a 0.',

    min: (valor, cantidad) =>
      valor === '' ||
      valor.trim().length >= Number(cantidad) ||
      `Debe tener al menos ${cantidad} caracteres.`
  },

  // Recibe el valor y una lista como "required|min:3".
  // Devuelve el primer error o '' si todo está bien.
  validar(valor, listaReglas) {
    for (const regla of listaReglas.split('|')) {
      const [nombre, argumento] = regla.split(':');
      const resultado = Validator.reglas[nombre](valor, argumento);

      if (resultado !== true) {
        return resultado;
      }
    }
    return '';
  }
};