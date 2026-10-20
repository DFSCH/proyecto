/* ==========================================================
    MODELO: búsqueda general (repuestos, categorías y proveedores)
   ========================================================== */
const BusquedaModel = (() => {

    const MAXIMO_POR_GRUPO = 4;

    const buscarRepuestos = (texto) =>
    RepuestosModel.listar()
        .filter((repuesto) => contieneTexto(repuesto, texto, ['nombre', 'codigo', 'marca', 'categoria']))
        .slice(0, MAXIMO_POR_GRUPO)
        .map((repuesto) => ({
        titulo: repuesto.nombre,
        detalle: `${repuesto.codigo} · ${repuesto.marca}`,
        destino: `html/detalle.html?id=${encodeURIComponent(repuesto.id)}`
    }));

    const buscarCategorias = (texto) =>
    CategoriasModel.listar()
        .filter((categoria) => contieneTexto(categoria, texto, ['nombre', 'descripcion']))
        .slice(0, MAXIMO_POR_GRUPO)
        .map((categoria) => ({
        titulo: categoria.nombre,
        detalle: categoria.descripcion,
        destino: `html/categorias.html?buscar=${encodeURIComponent(categoria.nombre)}`
    }));

    const buscarProveedores = (texto) =>
    ProveedoresModel.listar()
        .filter((proveedor) => contieneTexto(proveedor, texto, ['empresa', 'contacto']))
        .slice(0, MAXIMO_POR_GRUPO)
        .map((proveedor) => ({
        titulo: proveedor.empresa,
        detalle: `Contacto: ${proveedor.contacto}`,
        destino: `html/proveedores.html?buscar=${encodeURIComponent(proveedor.empresa)}`
        }));

  // Devuelve solo los grupos que tienen resultados
    const buscar = (texto) => {
    if (texto.trim() === '') return [];

    return [
        { titulo: 'Repuestos', resultados: buscarRepuestos(texto) },
        { titulo: 'Categorías', resultados: buscarCategorias(texto) },
        { titulo: 'Proveedores', resultados: buscarProveedores(texto) }
    ].filter((grupo) => grupo.resultados.length > 0);
};

    return { buscar };
})();