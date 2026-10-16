/* ==========================================================
   CONTROLADOR: filtros y paginación de la tabla de repuestos
   ========================================================== */
const RepuestosController = {

  porPagina: 5,
  pagina: 1,

  // Se consultan en vivo, así funcionan después de editar o eliminar
  filas() {
    return [...document.querySelectorAll('tbody tr[data-item]')];
  },

  // Filas que cumplen búsqueda + categoría + estado
  coincidentes() {
    const buscar = document.getElementById('buscar').value.toLowerCase();
    const categoria = document.getElementById('fCategoria').value;
    const estado = document.getElementById('fEstado').value;

    return RepuestosController.filas().filter((fila) => {
      const coincideTexto = fila.textContent.toLowerCase().includes(buscar);
      const coincideCategoria = !categoria || fila.dataset.cat === categoria;
      const coincideEstado = !estado || fila.dataset.estado === estado;

      return coincideTexto && coincideCategoria && coincideEstado;
    });
  },

  // Muestra solo las filas de la página actual y dibuja los botones
  actualizar() {
    if (!document.getElementById('buscar')) return; // otra página

    const lista = RepuestosController.coincidentes();
    const total = lista.length;
    const porPagina = RepuestosController.porPagina;
    const paginas = Math.max(1, Math.ceil(total / porPagina));

    if (RepuestosController.pagina > paginas) RepuestosController.pagina = paginas;

    const inicio = (RepuestosController.pagina - 1) * porPagina;
    const fin = Math.min(inicio + porPagina, total);

    RepuestosController.filas().forEach((fila) => { fila.hidden = true; });
    lista.slice(inicio, fin).forEach((fila) => { fila.hidden = false; });

    document.getElementById('total').textContent = total;
    document.getElementById('vacio').hidden = total > 0;
    document.getElementById('pagInfo').textContent =
      total === 0 ? 'Sin resultados' : `Mostrando ${inicio + 1}-${fin} de ${total}`;

    RepuestosController.dibujarBotones(paginas);
  },

  dibujarBotones(paginas) {
    const actual = RepuestosController.pagina;
    let html = `<button data-ir="${actual - 1}" aria-label="Página anterior" ${actual === 1 ? 'disabled' : ''}>‹</button>`;

    for (let n = 1; n <= paginas; n++) {
      html += `<button data-ir="${n}" class="${n === actual ? 'on' : ''}" aria-label="Página ${n}"
                       ${n === actual ? 'aria-current="page"' : ''}>${n}</button>`;
    }

    html += `<button data-ir="${actual + 1}" aria-label="Página siguiente" ${actual === paginas ? 'disabled' : ''}>›</button>`;

    document.getElementById('pagBotones').innerHTML = html;
  },

  init() {
    const buscar = document.getElementById('buscar');
    if (!buscar) return; // esta página no tiene tabla de repuestos

    const categoria = document.getElementById('fCategoria');
    const estado = document.getElementById('fEstado');

    // Al cambiar un filtro se vuelve a la página 1
    [buscar, categoria, estado].forEach((control) => {
      control.addEventListener('input', () => {
        RepuestosController.pagina = 1;
        RepuestosController.actualizar();
      });
    });

    document.getElementById('limpiar').addEventListener('click', () => {
      buscar.value = '';
      categoria.value = '';
      estado.value = '';
      RepuestosController.pagina = 1;
      RepuestosController.actualizar();
    });

    // Clic en los botones de paginación
    document.getElementById('pagBotones').addEventListener('click', (evento) => {
      const boton = evento.target.closest('button[data-ir]');
      if (!boton || boton.disabled) return;

      RepuestosController.pagina = Number(boton.dataset.ir);
      RepuestosController.actualizar();
    });

    RepuestosController.actualizar();
  }
};