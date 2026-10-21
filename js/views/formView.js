/* ==========================================================
   VISTA: errores de formulario y mensajes (sin alert)
   ========================================================== */
const FormView = {

  // Devuelve el contenedor .field del campo, o null si no tiene
  contenedorDe(input) {
    return input.closest('.field');
  },

  mostrarError(input, mensaje) {
    const campo = FormView.contenedorDe(input);
    if (!campo) return;

    let aviso = campo.querySelector('.error');

    if (!aviso) {
      aviso = document.createElement('small');
      aviso.className = 'error';
      aviso.setAttribute('role', 'alert');
      campo.append(aviso);
    }

    aviso.textContent = mensaje;
    campo.classList.add('invalid');
  },

  limpiarError(input) {
    const campo = FormView.contenedorDe(input);
    if (!campo) return; // por ejemplo, el campo oculto de la imagen

    campo.classList.remove('invalid');

    const aviso = campo.querySelector('.error');
    if (aviso) aviso.remove();
  },

  limpiarForm(form) {
    form.reset();

    form
      .querySelectorAll('input, select, textarea')
      .forEach((campo) => FormView.limpiarError(campo));
  },

  toast(texto) {
    const mensaje = document.createElement('div');
    mensaje.className = 'toast';
    mensaje.textContent = texto;
    document.body.append(mensaje);

    setTimeout(() => mensaje.remove(), 3000);
  }
};