/* ==========================================================
   MODELO: fotos subidas por el usuario (código → imagen)
   ========================================================== */
const FotosModel = (() => {

  const CLAVE = 'motostock_fotos';

  const todas = () => AlmacenLocal.leer(CLAVE, {});

  const obtener = (codigo) => todas()[codigo] || null;

  // Devuelve false si no cupo en el almacenamiento
  const guardar = (codigo, imagen) => AlmacenLocal.guardar(CLAVE, { ...todas(), [codigo]: imagen });

  const eliminar = (codigo) => {
    const restantes = { ...todas() };
    delete restantes[codigo];
    AlmacenLocal.guardar(CLAVE, restantes);
  };

  return { obtener, guardar, eliminar };
})();