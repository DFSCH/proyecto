/* ==========================================================
  UTILIDADES: dividir una lista en páginas
   ========================================================== */
function paginar(lista, pagina, porPagina) {
  const paginas = Math.max(1, Math.ceil(lista.length / porPagina));
  const actual = Math.min(Math.max(pagina, 1), paginas);
  const inicio = (actual - 1) * porPagina;

  return {
    items: lista.slice(inicio, inicio + porPagina),
    total: lista.length,
    pagina: actual,
    paginas,
    desde: lista.length === 0 ? 0 : inicio + 1,
    hasta: Math.min(inicio + porPagina, lista.length)
  };
}