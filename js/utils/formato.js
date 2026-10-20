/* ==========================================================
  UTILIDADES: formato de dinero, fechas y texto seguro
   ========================================================== */
const formatearDinero = (valor) => '$' + Number(valor).toLocaleString('es-CO');

const formatearFecha = (fechaIso) =>
  new Date(fechaIso).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });

// Evita que un texto escrito por el usuario se interprete como HTML
const escaparHtml = (texto) =>
  texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const escaparTextos = (objeto) =>
  Object.fromEntries(
    Object.entries(objeto).map(([clave, valor]) => [clave, typeof valor === 'string' ? escaparHtml(valor) : valor])
  );