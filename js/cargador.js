/* ==========================================================
  CARGADOR: carga todos los scripts en orden desde un solo lugar.
  Calcula la ruta sola, así sirve igual en index.html y en html/.
  Si falta un archivo o hay un error, lo muestra en pantalla.
   ========================================================== */
(function () {

  const RUTA_BASE = document.currentScript.src.replace(/cargador\.js.*$/, '');

  const ARCHIVOS = [
    // Datos y almacenamiento
    'data/datosIniciales.js',
    'storage/almacenLocal.js',

    // Modelos
    'models/validator.js',
    'models/menu.js',
    'models/imagenes.js',
    'models/fotos.js',
    'models/notificaciones.js',
    'models/repositorio.js',
    'models/repuestos.js',
    'models/categorias.js',
    'models/proveedores.js',
    'models/configuracion.js',
    'models/busqueda.js', 

    // Utilidades
    'utils/formulario.js',
    'utils/formato.js',
    'utils/paginacion.js',
    'utils/imagen.js', 

    // Vistas
    'views/dom.js',
    'views/shellView.js',
    'views/formView.js',
    'views/modalView.js',
    'views/imagenView.js',
    'views/uploadView.js',
    'views/opcionesView.js',
    'views/contadoresView.js',
    'views/notificacionesView.js',
    'views/repuestosView.js',
    'views/detalleView.js',
    'views/categoriasView.js',
    'views/proveedoresView.js',
    'views/inicioView.js',
    'views/busquedaView.js',

    // Controladores
    'controllers/shellController.js',
    'controllers/notificacionesController.js',
    'controllers/formController.js',
    'controllers/modalController.js',
    'controllers/crudModalController.js',
    'controllers/uploadController.js',
    'controllers/configController.js',
    'controllers/preferenciasController.js',
    'controllers/inicioController.js',
    'controllers/repuestosController.js',
    'controllers/detalleController.js',
    'controllers/registrarController.js',
    'controllers/editarController.js',
    'controllers/categoriasController.js',
    'controllers/proveedoresController.js',
    'controllers/busquedaController.js',

    // Arranque (siempre al final)
    'main.js'
  ];

  // Franja roja con los problemas encontrados
  function avisarProblema(texto) {
    let franja = document.getElementById('avisoProblemas');

    if (!franja) {
      franja = document.createElement('div');
      franja.id = 'avisoProblemas';
      franja.style.cssText =
        'position:fixed;left:12px;bottom:12px;z-index:999;max-width:480px;padding:12px 16px;' +
        'border-radius:10px;background:#d63a3a;color:#fff;font:13px/1.4 sans-serif;';
      document.body.append(franja);
    }

    const linea = document.createElement('div');
    linea.textContent = texto;
    franja.append(linea);
  }

  window.avisarProblema = avisarProblema;

  ARCHIVOS.forEach((ruta) => {
    const etiqueta = document.createElement('script');
    etiqueta.src = RUTA_BASE + ruta;
    etiqueta.async = false; // conserva el orden de la lista
    etiqueta.onerror = () => avisarProblema(`No se encontró el archivo: js/${ruta}`);
    document.body.append(etiqueta);
  });

  window.addEventListener('error', (evento) => avisarProblema(`Error: ${evento.message}`));
})();