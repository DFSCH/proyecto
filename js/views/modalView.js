/* ==========================================================
   VISTA: abrir/cerrar modales y ventana de confirmación
   ========================================================== */
const ModalView = {

  abrir(id) {
    const modal = document.getElementById(id);
    modal.classList.add('open');

    const primerCampo = modal.querySelector('input');
    if (primerCampo) primerCampo.focus();
  },

  cerrar(modal) {
    modal.classList.remove('open');
  },

  // Devuelve una promesa: true si confirma, false si cancela
  confirmar(mensaje) {
    return new Promise((resolver) => {
      const modal = document.createElement('div');
      modal.className = 'modal open';
      modal.innerHTML = `
        <div class="modal-box" role="dialog" aria-modal="true">
          <h2>¿Estás seguro?</h2>
          <p></p>
          <div class="modal-actions">
            <button class="btn" data-respuesta="no">Cancelar</button>
            <button class="btn btn-danger" data-respuesta="si">Sí, eliminar</button>
          </div>
        </div>`;

      modal.querySelector('p').textContent = mensaje;

      modal.addEventListener('click', (evento) => {
        const respuesta = evento.target.dataset.respuesta;
        if (respuesta) {
          modal.remove();
          resolver(respuesta === 'si');
        }
      });

      document.body.append(modal);
    });
  }
};