/* ==========================================================
MODELO: configuración del taller, notificaciones y preferencias
   ========================================================== */
const ConfiguracionModel = (() => {

    const CLAVE = 'motostock_configuracion';

    const VALORES_INICIALES = {
    taller: {
    nombre: 'MotoStock Taller',
    nit: '901.234.567-8',
    telefono: '+57 310 555 0198',
    correo: 'admin@motostock.co',
    direccion: 'Calle 32 # 18-45, Medellín'
    },
    notificaciones: { stockBajo: true, pedidos: true, resumen: false, enApp: true, porCorreo: true },
    preferencias: {
        moneda: 'Peso colombiano (COP)',
        fecha: 'DD/MM/YYYY',
        zona: 'Bogotá (GMT-5)',
        minimo: 5,
        compacta: false,
        confirmar: true,
        estadoAuto: true
    }
    };

  // Lo guardado se combina con los valores iniciales para no perder campos
    const obtener = () => {
    const guardada = AlmacenLocal.leer(CLAVE, {});

    return {
    taller: { ...VALORES_INICIALES.taller, ...guardada.taller },
    notificaciones: { ...VALORES_INICIALES.notificaciones, ...guardada.notificaciones },
    preferencias: { ...VALORES_INICIALES.preferencias, ...guardada.preferencias }
    };
};

    const guardarSeccion = (seccion, datos) => {
    const actual = obtener();
    const datosConvertidos = seccion === 'preferencias' ? { ...datos, minimo: Number(datos.minimo) } : datos;

    AlmacenLocal.guardar(CLAVE, { ...actual, [seccion]: { ...actual[seccion], ...datosConvertidos } });
};

    return { obtener, guardarSeccion };
})();