/* ==========================================================
   CONTROLADOR: página de editar repuesto (lee ?id=RP-002).
   Rellena el formulario con los datos del repuesto y carga
   su foto actual en la zona de imagen.
   ========================================================== */
const EditarController = {

  init() {
    const form = document.getElementById('formEditar');
    if (!form) return;

    const id = new URLSearchParams(window.location.search).get('id');
    const p = RepuestosModel.buscar(id);

    // Si el código no existe, se avisa y se ofrece volver
    if (!p) {
      form.innerHTML = `
        <div class="card empty">
          <h2>No encontramos ese repuesto</h2>
          <p class="subtitle">Vuelve al inventario y elige uno de la lista.</p>
          <a class="btn btn-primary" href="repuestos.html" style="margin-top:16px">Ir al inventario</a>
        </div>`;
      return;
    }

    // 1. Rellenar los campos (cada clave coincide con el name del input)
    const valores = {
      codigo: p.codigo,
      nombre: p.nombre,
      categoria: p.categoria,
      marca: p.marca,
      descripcion: p.descripcion,
      existencias: p.existencias,
      minimo: p.minimo,
      ubicacion: p.ubicacion,
      compra: p.compra,
      precio: p.precio,
      proveedor: p.proveedor,
      modelo: p.compat[0] || '',
      anos: (p.compat[1] || '').replace('Modelos ', '')
    };

    Object.keys(valores).forEach((nombre) => {
      form.elements[nombre].value = valores[nombre];
    });

    // 2. "Cancelar" vuelve al detalle de este repuesto
    document.getElementById('btnCancelar').href = `detalle.html?id=${encodeURIComponent(p.codigo)}`;

    // 3. Mostrar la foto actual en la zona de imagen (si existe)
    const foto = new Image();
    foto.addEventListener('load', () => UploadView.mostrarPrevia(foto.src, p.nombre));
    ImagenView.cargar(foto, p.codigo, document.body.dataset.root, () => {});

    // 4. Al guardar con éxito, regresa al detalle
    form.addEventListener('valido', () => {
      setTimeout(() => {
        window.location.href = `detalle.html?id=${encodeURIComponent(p.codigo)}`;
      }, 900);
    });
  }
};