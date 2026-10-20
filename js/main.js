/* ==========================================================
  PUNTO DE ENTRADA: cada paso se ejecuta por separado, así un
  error en uno no detiene a los demás
   ========================================================== */
function ejecutar(nombre, accion) {
  try {
    accion();
  } catch (error) {
    console.error(`[${nombre}]`, error);
    if (window.avisarProblema) window.avisarProblema(`Falló ${nombre}: ${error.message}`);
  }
}

function iniciarAplicacion() {
  const { page, root } = document.body.dataset;

  // Si el menú no está escrito en el HTML, se dibuja con JavaScript
  ejecutar('Menú', () => {
    if (document.getElementById('sidebar').children.length === 0) ShellView.render(page, root);
  });

  ejecutar('Iconos', () => Icons.aplicar());
  ejecutar('Contadores', () => ContadoresView.actualizar());

  const controladores = {
    Menú: ShellController,
    Notificaciones: NotificacionesController,
    Ventanas: ModalController,
    Formularios: FormController,
    Imagen: UploadController,
    Configuración: ConfigController,
    Preferencias: PreferenciasController,
    Inicio: InicioController,
    Repuestos: RepuestosController,
    Detalle: DetalleController,
    Registrar: RegistrarController,
    Editar: EditarController,
    Categorías: CategoriasController,
    Proveedores: ProveedoresController,
    Búsqueda: BusquedaController
  };

  Object.entries(controladores).forEach(([nombre, controlador]) => {
    ejecutar(nombre, () => controlador.init());
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciarAplicacion);
} else {
  iniciarAplicacion();
}