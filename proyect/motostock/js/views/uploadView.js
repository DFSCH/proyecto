/* ==========================================================
   VISTA: zona de subida de imagen (vista previa y errores)
   ========================================================== */
const UploadView = {

  el: (id) => document.getElementById(id),

  mostrarPrevia(url, nombre) {
    UploadView.el('zonaImagen').hidden = true;

    const previa = UploadView.el('vistaPrevia');
    previa.hidden = false;
    previa.querySelector('img').src = url;
    previa.querySelector('img').alt = nombre;

    UploadView.error('');
  },

  limpiar() {
    UploadView.el('zonaImagen').hidden = false;
    UploadView.el('vistaPrevia').hidden = true;
    UploadView.el('archivoImagen').value = '';
  },

  error(mensaje) {
    const aviso = UploadView.el('errorImagen');
    aviso.textContent = mensaje;
    aviso.hidden = !mensaje;
  }
};