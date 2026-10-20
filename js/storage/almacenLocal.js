/* ==========================================================
  ALMACÉN: único archivo que habla con localStorage
   ========================================================== */
const AlmacenLocal = {

  leer(clave, valorPorDefecto = null) {
    try {
      const texto = localStorage.getItem(clave);
      return texto === null ? valorPorDefecto : JSON.parse(texto);
    } catch (error) {
      return valorPorDefecto;
    }
  },

  guardar(clave, valor) {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
      return true;
    } catch (error) {
      return false;
    }
  }
};