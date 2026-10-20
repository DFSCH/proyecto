/* ==========================================================
CONTROLADOR: aplica las preferencias guardadas en cada página
   ========================================================== */
const PreferenciasController = {

    aplicar() {
    const { compacta } = ConfiguracionModel.obtener().preferencias;
    document.body.classList.toggle('compacta', compacta);
},

    init() {
    PreferenciasController.aplicar();
    }
};