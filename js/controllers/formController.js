/* ==========================================================
  CONTROLADOR: valida los formularios [data-validate].
  Si todo es válido lanza el evento "guardar" (cancelable) con
  los datos; cada página decide qué hacer con ellos.
   ========================================================== */
const FormController = {

  revisarCampo(campo) {
    const mensaje = Validator.validar(campo.value, campo.dataset.rules);

    if (mensaje) FormView.mostrarError(campo, mensaje);
    else FormView.limpiarError(campo);

    return mensaje === '';
  },

  validarTodo(campos) {
    const resultados = campos.map((campo) => FormController.revisarCampo(campo));
    const primerError = resultados.indexOf(false);

    if (primerError === -1) return true;

    campos[primerError].focus();
    return false;
  },

  // Devuelve false si alguien canceló el guardado (ej. código repetido)
  avisarGuardado(form) {
    const evento = new CustomEvent('guardar', { detail: leerFormulario(form), cancelable: true });
    return form.dispatchEvent(evento);
  },

  terminarGuardado(form) {
    FormView.toast(form.dataset.ok || 'Guardado correctamente');

    if (!form.hasAttribute('data-keep')) FormView.limpiarForm(form);

    const modal = form.closest('.modal');
    if (modal) ModalView.cerrar(modal);
  },

  conectar(form) {
    const campos = [...form.querySelectorAll('[data-rules]')];

    campos.forEach((campo) => {
      campo.addEventListener('blur', () => FormController.revisarCampo(campo));
      campo.addEventListener('input', () => {
        if (campo.closest('.invalid')) FormController.revisarCampo(campo);
      });
    });

    form.addEventListener('submit', (evento) => {
      evento.preventDefault();

      if (!FormController.validarTodo(campos)) return;
      if (!FormController.avisarGuardado(form)) return;

      FormController.terminarGuardado(form);
    });

    form.addEventListener('reset', () => {
      setTimeout(() => campos.forEach((campo) => FormView.limpiarError(campo)));
    });
  },

  init() {
    document.querySelectorAll('form[data-validate]').forEach(FormController.conectar);
  }
};