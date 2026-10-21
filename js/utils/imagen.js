/* ==========================================================
   UTILIDADES: reducir una imagen para poder guardarla
   ========================================================== */
const LADO_MAXIMO_IMAGEN = 800;   // píxeles del lado más largo
const CALIDAD_IMAGEN = 0.8;       // calidad JPG de 0 a 1

function leerArchivoComoUrl(archivo) {
  return new Promise((resolver, rechazar) => {
    const lector = new FileReader();
    lector.onload = () => resolver(lector.result);
    lector.onerror = rechazar;
    lector.readAsDataURL(archivo);
  });
}

function cargarImagenDesdeUrl(url) {
  return new Promise((resolver, rechazar) => {
    const imagen = new Image();
    imagen.onload = () => resolver(imagen);
    imagen.onerror = rechazar;
    imagen.src = url;
  });
}

// Devuelve una imagen JPG reducida como texto (data URL)
async function redimensionarImagen(archivo) {
  const imagen = await cargarImagenDesdeUrl(await leerArchivoComoUrl(archivo));

  const escala = Math.min(1, LADO_MAXIMO_IMAGEN / Math.max(imagen.width, imagen.height));
  const ancho = Math.round(imagen.width * escala);
  const alto = Math.round(imagen.height * escala);

  const lienzo = document.createElement('canvas');
  lienzo.width = ancho;
  lienzo.height = alto;

  const contexto = lienzo.getContext('2d');
  contexto.fillStyle = '#ffffff'; // fondo blanco para los PNG con transparencia
  contexto.fillRect(0, 0, ancho, alto);
  contexto.drawImage(imagen, 0, 0, ancho, alto);

  return lienzo.toDataURL('image/jpeg', CALIDAD_IMAGEN);
}