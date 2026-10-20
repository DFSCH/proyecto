/* ==========================================================
   MODELO: categorías
   ========================================================== */
const CategoriasModel = (() => {

  const repositorio = crearRepositorio('motostock_categorias', CATEGORIAS_INICIALES);

  const listarConConteo = () =>
    repositorio.listar().map((categoria) => ({
      ...categoria,
      cantidad: RepuestosModel.listar().filter((r) => r.categoria === categoria.nombre).length
    }));

  const resumen = () => {
    const lista = listarConConteo();
    const mayor = [...lista].sort((a, b) => b.cantidad - a.cantidad)[0];
    const nombres = lista.map((c) => c.nombre);

    return {
      activas: lista.length,
      mayor: mayor ? mayor.nombre : '-',
      cantidadMayor: mayor ? mayor.cantidad : 0,
      sinClasificar: RepuestosModel.listar().filter((r) => !nombres.includes(r.categoria)).length
    };
  };

  return { ...repositorio, listarConConteo, resumen };
})();