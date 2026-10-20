/* ==========================================================
  MODELO: datos del menú y del usuario
   ========================================================== */
const MenuModel = {
  items: [
    { id: 'inicio',      texto: 'Inicio',      icono: 'grid',  ruta: 'index.html' },
    { id: 'repuestos',   texto: 'Repuestos',   icono: 'box',   ruta: 'html/repuestos.html', contador: true },
    { id: 'categorias',  texto: 'Categorías',  icono: 'tag',   ruta: 'html/categorias.html' },
    { id: 'proveedores', texto: 'Proveedores', icono: 'truck', ruta: 'html/proveedores.html' }
  ],

  usuario: {
    nombre: 'Juan Martínez',
    rol: 'Administrador',
    iniciales: 'JM'
  }
};