/* ==========================================================
  MODELO: repuestos (reglas de negocio sobre los datos)
   ========================================================== */
const RepuestosModel = (() => {

  const repositorio = crearRepositorio('motostock_repuestos', REPUESTOS_INICIALES);
  const CAMPOS_BUSQUEDA = ['nombre', 'codigo', 'marca', 'categoria'];

  const ahora = () => new Date().toISOString();

  // El formulario entrega todo como texto: aquí se convierten los números
  const convertirNumeros = (datos) => ({
    ...datos,
    existencias: Number(datos.existencias),
    minimo: Number(datos.minimo),
    compra: Number(datos.compra),
    precio: Number(datos.precio)
  });

  // 0 = Agotado, igual o menor al mínimo = Bajo stock, si no Disponible
  const estado = (repuesto) => {
    if (repuesto.existencias === 0) return { clave: 'agot', clase: 'bad', texto: 'Agotado' };
    if (repuesto.existencias <= repuesto.minimo) return { clave: 'bajo', clase: 'warn', texto: 'Bajo stock' };
    return { clave: 'disp', clase: 'ok', texto: 'Disponible' };
  };

  const margen = (repuesto) => Math.round(((repuesto.precio - repuesto.compra) / repuesto.precio) * 100);

  const existeCodigo = (codigo) =>
    repositorio.listar().some((r) => r.codigo.toLowerCase() === codigo.trim().toLowerCase());

  const filtrar = ({ texto = '', categoria = '', estado: claveEstado = '' }) =>
    repositorio.listar().filter((repuesto) =>
      contieneTexto(repuesto, texto, CAMPOS_BUSQUEDA) &&
      (!categoria || repuesto.categoria === categoria) &&
      (!claveEstado || estado(repuesto).clave === claveEstado)
    );


  // Al eliminar un repuesto también se borra su foto subida
  const eliminar = (id) => {
    repositorio.eliminar(id);
    FotosModel.eliminar(id);
  };

  const crear = (datos) =>
    repositorio.crear({ ...convertirNumeros(datos), id: datos.codigo, creado: ahora(), actualizado: ahora() });

  const editar = (id, datos) =>
    repositorio.actualizar(id, { ...convertirNumeros(datos), actualizado: ahora() });



  // Si se renombra una categoría o proveedor, sus repuestos se actualizan
  const reasignar = (campo, valorAnterior, valorNuevo) => {
    repositorio.listar()
      .filter((repuesto) => repuesto[campo] === valorAnterior)
      .forEach((repuesto) => repositorio.actualizar(repuesto.id, { [campo]: valorNuevo }));
  };

  const resumen = () => {
    const lista = repositorio.listar();
    const cuantos = (clave) => lista.filter((r) => estado(r).clave === clave).length;

    return { total: lista.length, disponibles: cuantos('disp'), bajoStock: cuantos('bajo'), agotados: cuantos('agot') };
  };

  // Los 3 repuestos con más urgencia (agotados primero)
  const alertas = () =>
    repositorio.listar()
      .filter((r) => estado(r).clave !== 'disp')
      .sort((a, b) => a.existencias - b.existencias)
      .slice(0, 3);

  // Top 3 categorías + "Otros", con su porcentaje
  const distribucionPorCategoria = () => {
    const lista = repositorio.listar();
    if (lista.length === 0) return [];

    const conteo = {};
    lista.forEach((r) => { conteo[r.categoria] = (conteo[r.categoria] || 0) + 1; });

    const ordenadas = Object.entries(conteo).sort((a, b) => b[1] - a[1]);
    const principales = ordenadas.slice(0, 3);
    const otros = ordenadas.slice(3).reduce((suma, [, cantidad]) => suma + cantidad, 0);
    if (otros > 0) principales.push(['Otros', otros]);

    return principales.map(([nombre, cantidad]) => ({
      nombre,
      porcentaje: Math.round((cantidad * 100) / lista.length)
    }));
  };

    return {
    ...repositorio, crear, editar, eliminar, estado, margen, existeCodigo,
    filtrar, reasignar, resumen, alertas, distribucionPorCategoria
  };
})();