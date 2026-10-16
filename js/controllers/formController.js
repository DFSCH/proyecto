/* ==========================================================
  CONTROLADOR: une los formularios [data-validate]
  con el modelo (Validator) y la vista (FormView)
   ========================================================== */
const FormController = {

  revisarCampo(campo) {
    const mensaje = Validator.validar(campo.value, campo.dataset.rules);

    if (mensaje) {
      FormView.mostrarError(campo, mensaje);
    } else {
      FormView.limpiarError(campo);
    }
    return mensaje === '';
  },

  init() {
    document.querySelectorAll('form[data-validate]').forEach((form) => {
      const campos = [...form.querySelectorAll('[data-rules]')];

      campos.forEach((campo) => {
        campo.addEventListener('blur', () => FormController.revisarCampo(campo));

        campo.addEventListener('input', () => {
          if (campo.closest('.invalid')) FormController.revisarCampo(campo);
        });
      });

      form.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const resultados = campos.map((c) => FormController.revisarCampo(c));
        const primerError = resultados.indexOf(false);

        if (primerError !== -1) {
          campos[primerError].focus();
          return;
        }

        // Avisa que el formulario es válido (lo usa RowController al editar)
        form.dispatchEvent(new CustomEvent('valido'));

        FormView.toast(form.dataset.ok || 'Guardado correctamente');
        if (!form.hasAttribute('data-keep')) FormView.limpiarForm(form);

        const modal = form.closest('.modal');
        if (modal) ModalView.cerrar(modal);
      });

      form.addEventListener('reset', () => {
        setTimeout(() => campos.forEach((c) => FormView.limpiarError(c)));
      });
    });
  }
};