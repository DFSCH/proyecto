/* ==========================================================
    CONTROLADOR: botones Ver (👁) y Editar (✎) de cada fila.

    Cómo funciona:
    - Cada dato de una fila se marca con data-campo="nombre".
    - "Ver" copia esos datos a una ventana (data-mostrar="nombre").
    - "Editar" copia esos datos a los inputs (name="nombre"),
    y al guardar escribe los valores de vuelta en la fila.
   ========================================================== */
const RowController = {

filaActual: null,

  // Lee todos los data-campo de una fila y los devuelve como objeto
    leerCampos(fila) {
    const datos = {};
    fila.querySelectorAll('[data-campo]').forEach((elemento) => {
    datos[elemento.dataset.campo] = elemento.textContent.trim();
    });
    return datos;
},

  // "85000" -> "85.000"
    formatearPrecio(valor) {
    const numero = Number(String(valor).replace(/\D/g, ''));
    return numero.toLocaleString('es-CO');
},

    /* ---------- VER: lleva a la página de detalle ---------- */
  abrirVer(boton) {
    const fila = boton.closest('[data-item]');
    const codigo = fila.querySelector('[data-campo="codigo"]').textContent.trim();

    window.location.href = `detalle.html?id=${encodeURIComponent(codigo)}`;
  },

    /* ---------- EDITAR ---------- */
  abrirEditar(boton) {
    const fila = boton.closest('[data-item]');

    // Repuestos: lleva a la página completa de edición
    if (boton.dataset.editar === 'modalEditar') {
      const codigo = fila.querySelector('[data-campo="codigo"]').textContent.trim();
      window.location.href = `editar.html?id=${encodeURIComponent(codigo)}`;
      return;
    }

    // Categorías y proveedores: ventana con el formulario
    const datos = RowController.leerCampos(fila);
    const modal = document.getElementById(boton.dataset.editar);
    const form = modal.querySelector('form');

    RowController.filaActual = fila;
    FormView.limpiarForm(form);

    Object.keys(datos).forEach((nombre) => {
      const campo = form.elements[nombre];
      if (!campo) return;

      campo.value = nombre === 'precio'
        ? datos[nombre].replace(/\./g, '')
        : datos[nombre];
    });

    ModalView.abrir(boton.dataset.editar);
  },

  // Se ejecuta cuando el formulario de edición pasó la validación
    guardar(form) {
    const fila = RowController.filaActual;
    if (!fila) return;

    [...form.elements]
    .filter((campo) => campo.name)
    .forEach((campo) => {
        const destino = fila.querySelector(`[data-campo="${campo.name}"]`);
        if (!destino) return;

        destino.textContent = campo.name === 'precio'
        ? RowController.formatearPrecio(campo.value)
        : campo.value.trim();
    });

    // Solo en la tabla de repuestos: actualizar filtros y estado
    if (fila.dataset.cat !== undefined) {
    fila.dataset.cat = form.elements.categoria.value;
    RowController.actualizarEstado(fila);
    }
},

  // 0 = Agotado, 1 a 3 = Bajo stock, más de 3 = Disponible
    actualizarEstado(fila) {
        const existencias = Number(
        fila.querySelector('[data-campo="existencias"]').textContent
    );

    const estados = {
        agot: { clase: 'bad',  texto: 'Agotado' },
        bajo: { clase: 'warn', texto: 'Bajo stock' },
        disp: { clase: 'ok',   texto: 'Disponible' }
    };

    let clave = 'disp';
    if (existencias === 0) clave = 'agot';
    else if (existencias <= 3) clave = 'bajo';

    const etiqueta = fila.querySelector('[data-campo="estado"]');
    etiqueta.className = `badge ${estados[clave].clase}`;
    etiqueta.textContent = estados[clave].texto;
    fila.dataset.estado = clave;
},

    init() {
        document.querySelectorAll('[data-ver]').forEach((boton) => {
        boton.addEventListener('click', () => RowController.abrirVer(boton));
    });

        document.querySelectorAll('[data-editar]').forEach((boton) => {
        boton.addEventListener('click', () => RowController.abrirEditar(boton));
    });

    // El FormController avisa con el evento "valido" cuando no hay errores
        document.querySelectorAll('form[data-edit]').forEach((form) => {
        form.addEventListener('valido', () => RowController.guardar(form));
    });
    }
};