/* ==========================================================
  MODELO GENÉRICO: CRUD reutilizable para cualquier entidad
   ========================================================== */
function generarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function contieneTexto(item, texto, campos) {
  const buscado = texto.trim().toLowerCase();
  return campos.some((campo) => String(item[campo]).toLowerCase().includes(buscado));
}

function crearRepositorio(clave, datosIniciales) {

  const listar = () => {
    const guardados = AlmacenLocal.leer(clave);
    if (guardados !== null) return guardados;

    AlmacenLocal.guardar(clave, datosIniciales);
    return [...datosIniciales];
  };

  const guardarLista = (lista) => AlmacenLocal.guardar(clave, lista);

  const buscarPorId = (id) => listar().find((item) => item.id === id) || null;

  const crear = (item) => {
    guardarLista([...listar(), item]);
    return item;
  };

  const actualizar = (id, cambios) => {
    guardarLista(listar().map((item) => (item.id === id ? { ...item, ...cambios } : item)));
  };

  const eliminar = (id) => {
    guardarLista(listar().filter((item) => item.id !== id));
  };

  return { listar, buscarPorId, crear, actualizar, eliminar };
}