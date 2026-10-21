/* ==========================================================
   CONTROLADOR: subir imagen (clic o arrastrar y soltar).
   Guarda la imagen reducida en memoria hasta que se guarda
   el formulario.
   ========================================================== */
const UploadController = {

  tiposValidos: ['image/png', 'image/jpeg', 'image/webp'],
  maxBytes: 5 * 1024 * 1024, // 5 MB

  imagenNueva: null,      // imagen lista para guardar (texto)
  imagenQuitada: false,   // true si el usuario pulsó la X

  async procesar(archivo) {
    if (!archivo) return;

    if (!UploadController.tiposValidos.includes(archivo.type)) {
      UploadView.error('Formato no válido. Usa una imagen PNG, JPG o WEBP.');
      return;
    }

    if (archivo.size > UploadController.maxBytes) {
      UploadView.error('La imagen pesa más de 5 MB. Elige una más liviana.');
      return;
    }

    try {
      const imagen = await redimensionarImagen(archivo);

      UploadController.imagenNueva = imagen;
      UploadController.imagenQuitada = false;
      UploadView.mostrarPrevia(imagen, archivo.name);
    } catch (error) {
      UploadView.error('No se pudo leer la imagen. Prueba con otra.');
    }
  },

  quitar() {
    UploadController.imagenNueva = null;
    UploadController.imagenQuitada = true;
    UploadView.limpiar();
  },

  // Lo llaman Registrar y Editar cuando el formulario ya es válido
  aplicarAlGuardar(codigo) {
    if (UploadController.imagenNueva) {
      const cupo = FotosModel.guardar(codigo, UploadController.imagenNueva);
      if (!cupo) FormView.toast('La imagen no cabe en el almacenamiento. Usa una más pequeña.');
    } else if (UploadController.imagenQuitada) {
      FotosModel.eliminar(codigo);
    }
  },

  conectarZona(zona, input) {
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

    zona.addEventListener('drop', (evento) => UploadController.procesar(evento.dataTransfer.files[0]));
    input.addEventListener('change', () => UploadController.procesar(input.files[0]));
  },

  init() {
    const zona = document.getElementById('zonaImagen');
    if (!zona) return;

    const input = document.getElementById('archivoImagen');

    UploadController.conectarZona(zona, input);
    document.getElementById('quitarImagen').addEventListener('click', UploadController.quitar);

    // Al limpiar el formulario también se descarta la imagen pendiente
    input.closest('form').addEventListener('reset', () => {
      UploadController.imagenNueva = null;
      UploadController.imagenQuitada = false;
      UploadView.limpiar();
      UploadView.error('');
    });
  }
};