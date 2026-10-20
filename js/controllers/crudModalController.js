/* ==========================================================
   CONTROLADOR GENÉRICO: crear, editar y eliminar con una
   ventana modal. Lo usan Categorías y Proveedores (DRY).
   ========================================================== */
const CrudModalController = {

  iniciar({ modelo, pintar, idModal, idBoton, idLista, titulos, etiqueta, alActualizar, porDefecto = {} }) {
    const modal = document.getElementById(idModal);
    const form = modal.querySelector('form');
    let idEnEdicion = null;

    const abrirFormulario = (item) => {
      idEnEdicion = item ? item.id : null;

      FormView.limpiarForm(form);
      if (item) llenarFormulario(form, item);

      modal.querySelector('h2').textContent = item ? titulos.editar : titulos.nuevo;
      ModalView.abrir(idModal);
    };

    const eliminar = async (item) => {
      const confirmado = await ModalView.confirmar(`Se eliminará "${etiqueta(item)}" de forma permanente.`);
      if (!confirmado) return;

      modelo.eliminar(item.id);
      pintar();
      FormView.toast('Elemento eliminado');
    };

    const guardar = (datos) => {
      if (idEnEdicion) {
        const anterior = modelo.buscarPorId(idEnEdicion);
        modelo.actualizar(idEnEdicion, datos);
        if (alActualizar) alActualizar(anterior, datos);
      } else {
        modelo.crear({ ...porDefecto, ...datos, id: generarId() });
      }
      pintar();
    };

    document.getElementById(idBoton).addEventListener('click', () => abrirFormulario(null));

    document.getElementById(idLista).addEventListener('click', (evento) => {
      const boton = evento.target.closest('[data-accion]');
      if (!boton) return;

      const item = modelo.buscarPorId(boton.dataset.id);
      if (boton.dataset.accion === 'editar') abrirFormulario(item);
      else eliminar(item);
    });

    form.addEventListener('guardar', (evento) => guardar(evento.detail));

    pintar();
  }
};