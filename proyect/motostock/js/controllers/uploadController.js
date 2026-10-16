/* ==========================================================
   CONTROLADOR: subir imagen (clic o arrastrar y soltar)
   ========================================================== */
const UploadController = {

  tiposValidos: ['image/png', 'image/jpeg', 'image/webp'],
  maxBytes: 5 * 1024 * 1024, // 5 MB

  procesar(archivo) {
    if (!archivo) return;

    if (!UploadController.tiposValidos.includes(archivo.type)) {
      UploadView.error('Formato no válido. Usa una imagen PNG, JPG o WEBP.');
      return;
    }

    if (archivo.size > UploadController.maxBytes) {
      UploadView.error('La imagen pesa más de 5 MB. Elige una más liviana.');
      return;
    }

    UploadView.mostrarPrevia(URL.createObjectURL(archivo), archivo.name);
  },

  init() {
    const zona = document.getElementById('zonaImagen');
    if (!zona) return;

    const input = document.getElementById('archivoImagen');

    zona.addEventListener('click', () => input.click());

    zona.addEventListener('keydown', (evento) => {
      if (evento.key === 'Enter' || evento.key === ' ') {
        evento.preventDefault();
        input.click();
      }
    });

    ['dragenter', 'dragover'].forEach((nombre) => {
      zona.addEventListener(nombre, (evento) => {
        evento.preventDefault();
        zona.classList.add('arrastrando');
      });
    });

    ['dragleave', 'drop'].forEach((nombre) => {
      zona.addEventListener(nombre, (evento) => {
        evento.preventDefault();
        zona.classList.remove('arrastrando');
      });
    });

    zona.addEventListener('drop', (evento) => {
      UploadController.procesar(evento.dataTransfer.files[0]);
    });

    input.addEventListener('change', () => UploadController.procesar(input.files[0]));

    document.getElementById('quitarImagen').addEventListener('click', () => {
      UploadView.limpiar();
    });

    // Al limpiar o restablecer el formulario, también se quita la imagen
    input.closest('form').addEventListener('reset', () => {
      UploadView.limpiar();
      UploadView.error('');
    });
  }
};