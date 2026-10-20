/* ==========================================================
  VISTA: tarjetas, alertas y donut de la página de inicio
   ========================================================== */
const InicioView = {

  COLORES: ['#ff5a1f', '#1c1f1d', '#7a7e7a', '#d4d4cf'],

  pintarEstadisticas({ total, disponibles, bajoStock, agotados }) {
    document.getElementById('statTotal').textContent = total;
    document.getElementById('statDisp').textContent = disponibles;
    document.getElementById('statBajo').textContent = bajoStock;
    document.getElementById('statAgot').textContent = agotados;
  },

  pintarAlertas(repuestos) {
    const filas = repuestos.map((repuesto) => {
      const estado = RepuestosModel.estado(repuesto);

      return crearElemento('div', { clase: 'list-row' },
        crearElemento('span', { clase: 'ico', texto: ImagenView.iniciales(repuesto.nombre) }),
        crearElemento('div', { clase: 'grow' },
          crearElemento('strong', { texto: repuesto.nombre }),
          crearElemento('small', { texto: `${repuesto.codigo} · ${repuesto.marca}` })),
        crearElemento('div', { clase: 'der' },
          crearElemento('strong', { texto: `${repuesto.existencias} un.` }),
          crearElemento('span', { clase: `badge ${estado.clase}`, texto: estado.texto })));
    });

    const contenedor = document.getElementById('listaAlertas');
    if (filas.length === 0) {
      contenedor.replaceChildren(crearElemento('p', { clase: 'empty', texto: 'Todo el inventario está en orden.' }));
      return;
    }
    contenedor.replaceChildren(...filas);
  },

  pintarDonut(distribucion, total) {
    const donut = document.getElementById('donut');
    document.getElementById('donutTotal').textContent = total;

    if (distribucion.length === 0) {
      donut.style.background = '#e4e4dc';
      return;
    }

    let acumulado = 0;
    const tramos = distribucion.map((parte, posicion) => {
      const inicio = acumulado;
      acumulado += parte.porcentaje;
      const fin = posicion === distribucion.length - 1 ? 100 : acumulado;
      return `${InicioView.COLORES[posicion]} ${inicio}% ${fin}%`;
    });
    donut.style.background = `conic-gradient(${tramos.join(', ')})`;

    document.getElementById('leyenda').replaceChildren(
      ...distribucion.map((parte, posicion) =>
        crearElemento('li', {},
          crearElemento('i', { style: `background:${InicioView.COLORES[posicion]}` }),
          parte.nombre,
          crearElemento('b', { texto: `${parte.porcentaje}%` })))
    );
  }
};