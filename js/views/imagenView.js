/* ==========================================================
  VISTA: pone las fotos en la tabla y en el detalle
   ========================================================== */
const ImagenView = {

  // Carga una imagen probando cada extensión.
  // Si ninguna existe, ejecuta alFallar().
  cargar(img, codigo, raiz, alFallar) {
    let intento = 0;

    img.onerror = () => {
      intento++;

      if (intento < ImagenesModel.extensiones.length) {
        img.src = ImagenesModel.ruta(codigo, raiz, intento);
      } else {
        img.onerror = null;
        alFallar();
      }
    };

    img.src = ImagenesModel.ruta(codigo, raiz, 0);
  },

  iniciales(nombre) {
    return nombre
      .split(' ')
      .filter((palabra) => palabra.length > 0)
      .slice(0, 2)
      .map((palabra) => palabra[0].toUpperCase())
      .join('');
  },

  /* ---------- Tabla de repuestos ---------- */
  aplicarTabla(raiz) {
    document.querySelectorAll('tbody tr[data-item]').forEach((fila) => {
      const celda = fila.cells[0];
      const codigoEl = celda.querySelector('[data-campo="codigo"]');
      const nombreEl = celda.querySelector('[data-campo="nombre"]');

      if (!codigoEl || !nombreEl || celda.querySelector('.prod-cell')) return;

      const codigo = codigoEl.textContent.trim();

      // Agrupa el texto original (nombre y código) en una columna
      const texto = document.createElement('div');
      texto.append(...celda.childNodes);

      const foto = document.createElement('img');
      foto.className = 'prod-foto';
      foto.alt = '';
      foto.loading = 'lazy';

      ImagenView.cargar(foto, codigo, raiz, () => {
        const vacio = document.createElement('span');
        vacio.className = 'prod-foto prod-foto-vacio';
        vacio.textContent = ImagenView.iniciales(nombreEl.textContent);
        foto.replaceWith(vacio);
      });

      const contenedor = document.createElement('div');
      contenedor.className = 'prod-cell';
      contenedor.append(foto, texto);
      celda.append(contenedor);
    });
  },

  /* ---------- Página de detalle ---------- */
  montarDetalle(p, raiz) {
    const zona = document.getElementById('detFoto');
    const miniatura = document.getElementById('thumbFoto');
    if (!zona || !miniatura) return;

    const principal = document.createElement('img');
    principal.className = 'det-foto-img';
    principal.alt = p.nombre;

    const mini = document.createElement('img');
    mini.alt = '';

    // Si no hay foto, se queda la ilustración de respaldo
    ImagenView.cargar(principal, p.codigo, raiz, () => {
      principal.remove();
      zona.innerHTML = DetalleView.ilustracion(p);
      miniatura.textContent = p.marca;
    });

    principal.addEventListener('load', () => {
      mini.src = principal.currentSrc;
      miniatura.textContent = '';
      miniatura.append(mini);
    });

    zona.textContent = '';
    zona.append(principal);
  }
};