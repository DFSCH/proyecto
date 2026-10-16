/* ==========================================================
   MODELO: qué imagen corresponde a cada repuesto.

   Por defecto el archivo se llama igual que el código:
   assets/img/RP-001.jpg

   Si tu archivo se llama distinto, cambia el texto de la
   derecha (sin la extensión). Ejemplo:
   'RP-001': 'pastillas-freno'
   ========================================================== */
const ImagenesModel = {

  archivos: {
    'RP-001': 'RP-001',
    'RP-002': 'RP-002',
    'RP-003': 'RP-003',
    'RP-004': 'RP-004',
    'RP-005': 'RP-005'
  },

  // Se prueban en este orden hasta encontrar el archivo
  extensiones: ['jpg', 'jpeg', 'png', 'webp', 'avif'],

  ruta(codigo, raiz, indice) {
    const nombre = ImagenesModel.archivos[codigo] || codigo;
    return `${raiz}assets/img/${nombre}.${ImagenesModel.extensiones[indice]}`;
  }
};