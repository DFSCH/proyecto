/* ==========================================================
  CONTROLADOR: modales y confirmación antes de eliminar
   ========================================================== */
const ModalController = {

  init() {
    // Botones que abren un modal: data-open="idDelModal"
    document.querySelectorAll('[data-open]').forEach((boton) => {
      boton.addEventListener('click', () => ModalView.abrir(boton.dataset.open));
    });

    // Cierre: botón Cancelar, clic fuera o tecla Esc
    document.querySelectorAll('.modal').forEach((modal) => {
      const cerrarYLimpiar = () => {
        ModalView.cerrar(modal);
        const form = modal.querySelector('form');
        if (form) FormView.limpiarForm(form);
      };

      modal.querySelectorAll('[data-close]').forEach((boton) => {
        boton.addEventListener('click', cerrarYLimpiar);
      });

      modal.addEventListener('click', (evento) => {
        if (evento.target === modal) cerrarYLimpiar();
      });

      document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && modal.classList.contains('open')) {
          cerrarYLimpiar();
        }
      });
    });

    // Botones de eliminar: pide confirmación usando el nombre actual
    document.querySelectorAll('[data-confirm]').forEach((boton) => {
      boton.addEventListener('click', async () => {
        const fila = boton.closest('[data-item]');
        const titulo = fila.querySelector('[data-campo="nombre"], [data-campo="empresa"]');

        const mensaje = titulo
          ? `Se eliminará "${titulo.textContent}" de forma permanente.`
          : boton.dataset.confirm;

        const acepto = await ModalView.confirmar(mensaje);

        if (acepto) {
          fila.remove();
          FormView.toast('Elemento eliminado');

          // Recalcula las páginas si estamos en la tabla de repuestos
          RepuestosController.actualizar();
        }
      });
    });
  }
};