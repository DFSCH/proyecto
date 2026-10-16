/* ==========================================================
   MODELO: datos de ejemplo de los repuestos (para detalle.html)
   ========================================================== */
const RepuestosModel = {

  datos: {
    'RP-001': {
      codigo: 'RP-001', nombre: 'Pastillas de freno delanteras', categoria: 'Frenos', marca: 'Brembo', spec: 'P08',
      precio: 85000, compra: 62000, existencias: 12, minimo: 5,
      proveedor: 'MotoPartes Colombia', ubicacion: 'Estante A-02',
      compat: ['Yamaha FZ 2.0', 'Modelos 2016-2024'],
      descripcion: 'Pastillas de alto rendimiento para freno de disco delantero. Mayor mordida y menor desgaste del disco.',
      creado: '15 de enero de 2026', actualizado: '3 de marzo de 2026'
    },
    'RP-002': {
      codigo: 'RP-002', nombre: 'Kit de arrastre 428H', categoria: 'Transmisión', marca: 'DID', spec: '428H',
      precio: 190000, compra: 145000, existencias: 3, minimo: 5,
      proveedor: 'MotoPartes Colombia', ubicacion: 'Estante B-04',
      compat: ['Yamaha FZ 2.0', 'Modelos 2018-2024'],
      descripcion: 'Kit de cadena y piñones de alto rendimiento para motocicleta. Excelente resistencia al desgaste y conducción más suave.',
      creado: '08 de enero de 2026', actualizado: '12 de marzo de 2026'
    },
    'RP-003': {
      codigo: 'RP-003', nombre: 'Filtro de aceite', categoria: 'Motor', marca: 'K&N', spec: 'HF204',
      precio: 42000, compra: 29000, existencias: 0, minimo: 4,
      proveedor: 'Repuestos del Motor', ubicacion: 'Estante C-01',
      compat: ['Honda CB 190R', 'Modelos 2017-2024'],
      descripcion: 'Filtro de aceite de alta eficiencia. Retiene impurezas y protege el motor durante más kilómetros.',
      creado: '20 de enero de 2026', actualizado: '1 de marzo de 2026'
    },
    'RP-004': {
      codigo: 'RP-004', nombre: 'Bombillo LED H4', categoria: 'Eléctrico', marca: 'Osram', spec: 'H4',
      precio: 55000, compra: 38000, existencias: 8, minimo: 5,
      proveedor: 'Distribuciones Internacionales', ubicacion: 'Estante D-03',
      compat: ['Universal', 'Faros H4'],
      descripcion: 'Bombillo LED de luz blanca intensa, bajo consumo y larga vida útil.',
      creado: '2 de febrero de 2026', actualizado: '9 de marzo de 2026'
    },
    'RP-005': {
      codigo: 'RP-005', nombre: 'Espejo retrovisor universal', categoria: 'Accesorios', marca: 'Genérico', spec: '10mm',
      precio: 38000, compra: 24000, existencias: 5, minimo: 3,
      proveedor: 'Moto Accesorios SAS', ubicacion: 'Estante E-02',
      compat: ['Universal', 'Rosca 10 mm'],
      descripcion: 'Espejo retrovisor ajustable con rosca estándar de 10 mm. Cabe en la mayoría de las motos.',
      creado: '10 de febrero de 2026', actualizado: '5 de marzo de 2026'
    },
    'RP-006': {
      codigo: 'RP-006', nombre: 'Disco de freno trasero', categoria: 'Frenos', marca: 'Brembo', spec: '220mm',
      precio: 120000, compra: 88000, existencias: 7, minimo: 4,
      proveedor: 'MotoPartes Colombia', ubicacion: 'Estante A-03',
      compat: ['Yamaha FZ 2.0', 'Modelos 2016-2024'],
      descripcion: 'Disco de freno trasero de acero inoxidable con excelente disipación de calor.',
      creado: '18 de febrero de 2026', actualizado: '6 de marzo de 2026'
    },
    'RP-007': {
      codigo: 'RP-007', nombre: 'Cadena de transmisión 520', categoria: 'Transmisión', marca: 'DID', spec: '520',
      precio: 98000, compra: 70000, existencias: 2, minimo: 4,
      proveedor: 'MotoPartes Colombia', ubicacion: 'Estante B-02',
      compat: ['Honda CB 190R', 'Modelos 2017-2024'],
      descripcion: 'Cadena reforzada de 120 eslabones, resistente al desgaste y de bajo ruido.',
      creado: '20 de febrero de 2026', actualizado: '8 de marzo de 2026'
    },
    'RP-008': {
      codigo: 'RP-008', nombre: 'Bujía iridium', categoria: 'Motor', marca: 'NGK', spec: 'CR8E',
      precio: 35000, compra: 22000, existencias: 15, minimo: 5,
      proveedor: 'Repuestos del Motor', ubicacion: 'Estante C-02',
      compat: ['Universal', 'Motores 4 tiempos'],
      descripcion: 'Bujía de iridio que mejora el encendido y reduce el consumo de combustible.',
      creado: '22 de febrero de 2026', actualizado: '2 de marzo de 2026'
    },
    'RP-009': {
      codigo: 'RP-009', nombre: 'Batería 12V 9Ah', categoria: 'Eléctrico', marca: 'Yuasa', spec: '9Ah',
      precio: 210000, compra: 160000, existencias: 0, minimo: 3,
      proveedor: 'Distribuciones Internacionales', ubicacion: 'Estante D-01',
      compat: ['Yamaha FZ 2.0', 'Modelos 2016-2024'],
      descripcion: 'Batería sellada libre de mantenimiento con alto rendimiento de arranque.',
      creado: '25 de febrero de 2026', actualizado: '10 de marzo de 2026'
    },
    'RP-010': {
      codigo: 'RP-010', nombre: 'Manubrio deportivo', categoria: 'Accesorios', marca: 'Genérico', spec: '22mm',
      precio: 76000, compra: 52000, existencias: 4, minimo: 3,
      proveedor: 'Moto Accesorios SAS', ubicacion: 'Estante E-03',
      compat: ['Universal', 'Diámetro 22 mm'],
      descripcion: 'Manubrio de aluminio con acabado negro mate, ligero y resistente.',
      creado: '27 de febrero de 2026', actualizado: '4 de marzo de 2026'
    },
    'RP-011': {
      codigo: 'RP-011', nombre: 'Pastillas de freno traseras', categoria: 'Frenos', marca: 'Brembo', spec: 'P09',
      precio: 72000, compra: 51000, existencias: 9, minimo: 4,
      proveedor: 'MotoPartes Colombia', ubicacion: 'Estante A-02',
      compat: ['Yamaha FZ 2.0', 'Modelos 2016-2024'],
      descripcion: 'Pastillas traseras de compuesto semimetálico con frenado progresivo.',
      creado: '1 de marzo de 2026', actualizado: '9 de marzo de 2026'
    },
    'RP-012': {
      codigo: 'RP-012', nombre: 'Piñón de salida 14T', categoria: 'Transmisión', marca: 'DID', spec: '14T',
      precio: 45000, compra: 31000, existencias: 3, minimo: 4,
      proveedor: 'Repuestos del Motor', ubicacion: 'Estante B-05',
      compat: ['Honda CB 190R', 'Modelos 2017-2024'],
      descripcion: 'Piñón de acero templado de 14 dientes para cadena 520.',
      creado: '3 de marzo de 2026', actualizado: '11 de marzo de 2026'
    }
  },
  
  buscar(id) {
    return RepuestosModel.datos[id] || null;
  },

  // 0 = Agotado, igual o menor al mínimo = Bajo stock, si no Disponible
  estado(p) {
    if (p.existencias === 0) return { clase: 'bad', texto: 'Agotado' };
    if (p.existencias <= p.minimo) return { clase: 'warn', texto: 'Bajo stock' };
    return { clase: 'ok', texto: 'Disponible' };
  },

  margen(p) {
    return Math.round(((p.precio - p.compra) / p.precio) * 100);
  }
};