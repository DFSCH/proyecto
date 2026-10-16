/* ==========================================================
  VISTA: errores de formulario y mensajes (sin alert)
   ========================================================== */
const FormView = {

  mostrarError(input, mensaje) {
    const campo = input.closest('.field');
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
    const campo = input.closest('.field');
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