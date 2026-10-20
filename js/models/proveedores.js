/* ==========================================================
  MODELO: proveedores
   ========================================================== */
const ProveedoresModel = (() => {

  const PEDIDOS_PENDIENTES = 5; // dato fijo: la app aún no maneja pedidos
  const CAMPOS_BUSQUEDA = ['empresa', 'contacto', 'telefono', 'correo', 'estado'];
  const repositorio = crearRepositorio('motostock_proveedores', PROVEEDORES_INICIALES);

  const listarConConteo = () =>
    repositorio.listar().map((proveedor) => ({
      ...proveedor,
      cantidad: RepuestosModel.listar().filter((r) => r.proveedor === proveedor.empresa).length
    }));

  const buscar = (texto) =>
    listarConConteo().filter((proveedor) => contieneTexto(proveedor, texto, CAMPOS_BUSQUEDA));

  const resumen = () => {
    const lista = listarConConteo();

    return {
      activos: lista.filter((p) => p.estado === 'Activo').length,
      productos: lista.reduce((suma, p) => suma + p.cantidad, 0),
      pendientes: PEDIDOS_PENDIENTES
    };
  };

  return { ...repositorio, listarConConteo, buscar, resumen };
})();