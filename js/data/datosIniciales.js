/* ==========================================================
   DATOS INICIALES: se usan solo la primera vez que se abre la app
   ========================================================== */
const FECHA_INICIAL = '2026-01-15T00:00:00.000Z';

const REPUESTOS_INICIALES = [
  ['RP-001', 'Pastillas de freno delanteras', 'Frenos', 'Brembo', 12, 5, 85000, 62000, 'MotoPartes Colombia', 'Estante A-02', 'Yamaha FZ 2.0', '2016-2024', 'Pastillas de alto rendimiento para freno de disco delantero.'],
  ['RP-002', 'Kit de arrastre 428H', 'Transmisión', 'DID', 3, 5, 190000, 145000, 'MotoPartes Colombia', 'Estante B-04', 'Yamaha FZ 2.0', '2018-2024', 'Kit de cadena y piñones de alto rendimiento para motocicleta.'],
  ['RP-003', 'Filtro de aceite', 'Motor', 'K&N', 0, 4, 42000, 29000, 'Repuestos del Motor', 'Estante C-01', 'Honda CB 190R', '2017-2024', 'Filtro de alta eficiencia que protege el motor.'],
  ['RP-004', 'Bombillo LED H4', 'Eléctrico', 'Osram', 8, 5, 55000, 38000, 'Distribuciones Internacionales', 'Estante D-03', 'Universal', '2015-2024', 'Bombillo LED de luz blanca, bajo consumo y larga vida.'],
  ['RP-005', 'Espejo retrovisor universal', 'Accesorios', 'Genérico', 5, 3, 38000, 24000, 'Moto Accesorios SAS', 'Estante E-02', 'Universal', '2010-2024', 'Espejo ajustable con rosca estándar de 10 mm.'],
  ['RP-006', 'Disco de freno trasero', 'Frenos', 'Brembo', 7, 4, 120000, 88000, 'MotoPartes Colombia', 'Estante A-03', 'Yamaha FZ 2.0', '2016-2024', 'Disco de acero inoxidable con excelente disipación de calor.'],
  ['RP-007', 'Cadena de transmisión 520', 'Transmisión', 'DID', 2, 4, 98000, 70000, 'MotoPartes Colombia', 'Estante B-02', 'Honda CB 190R', '2017-2024', 'Cadena reforzada de 120 eslabones de bajo ruido.'],
  ['RP-008', 'Bujía iridium', 'Motor', 'NGK', 15, 5, 35000, 22000, 'Repuestos del Motor', 'Estante C-02', 'Universal', '2012-2024', 'Bujía de iridio que mejora el encendido.'],
  ['RP-009', 'Batería 12V 9Ah', 'Eléctrico', 'Yuasa', 0, 3, 210000, 160000, 'Distribuciones Internacionales', 'Estante D-01', 'Yamaha FZ 2.0', '2016-2024', 'Batería sellada libre de mantenimiento.'],
  ['RP-010', 'Manubrio deportivo', 'Accesorios', 'Genérico', 4, 3, 76000, 52000, 'Moto Accesorios SAS', 'Estante E-03', 'Universal', '2010-2024','Manubrio de aluminio negro mate de 22 mm.'],
  ['RP-011', 'Pastillas de freno traseras', 'Frenos', 'Brembo', 9, 4, 72000, 51000, 'MotoPartes Colombia', 'Estante A-02', 'Yamaha FZ 2.0', '2016-2024', 'Pastillas traseras semimetálicas de frenado progresivo.'],
  ['RP-012', 'Piñón de salida 14T', 'Transmisión', 'DID', 3, 4, 45000, 31000, 'Repuestos del Motor', 'Estante B-05', 'Honda CB 190R', '2017-2024', 'Piñón de acero templado de 14 dientes.']
].map(([codigo, nombre, categoria, marca, existencias, minimo, precio, compra, proveedor, ubicacion, modelo, anos, descripcion]) => ({
  id: codigo, codigo, nombre, categoria, marca, existencias, minimo, precio, compra,
  proveedor, ubicacion, modelo, anos, descripcion,
  creado: FECHA_INICIAL, actualizado: FECHA_INICIAL
}));

const CATEGORIAS_INICIALES = [
  ['Motor', 'Filtros, empaques y componentes internos'],
  ['Frenos', 'Pastillas, discos y sistemas hidráulicos'],
  ['Eléctrico', 'Bombillos, baterías y cableado'],
  ['Transmisión', 'Cadenas, piñones y kits de arrastre'],
  ['Accesorios', 'Espejos, soportes y protección']
].map(([nombre, descripcion], posicion) => ({ id: `cat-${posicion + 1}`, nombre, descripcion }));

const PROVEEDORES_INICIALES = [
  ['MotoPartes Colombia', 'Laura Gómez', '+57 310 458 2090', 'ventas@motopartes.co', 'Activo'],
  ['Repuestos del Motor', 'Carlos Ruiz', '+57 315 220 1844', 'pedidos@repuestosmotor.co', 'Activo'],
  ['Distribuciones Internacionales', 'Sofía Méndez', '+57 300 801 1092', 'comercial@dint.co', 'Activo'],
  ['Moto Accesorios SAS', 'Diego León', '+57 321 441 7800', 'info@motoaccesorios.co', 'Inactivo']
].map(([empresa, contacto, telefono, correo, estado], posicion) => ({ id: `prov-${posicion + 1}`, empresa, contacto, telefono, correo, estado }));