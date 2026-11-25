# MotoStock Front — proyecto final

Front-end HTML, CSS y JavaScript para **motostock-api**. Incluye registro/login, CRUD administrativo, catálogo de clientes y valoración de repuestos usados en KM Verde. Mantiene la identidad naranja/verde de MotoStock y las imágenes del proyecto original.

## Ejecutar

1. Importa el SQL, configura `.env` y enciende el back-end siguiendo su README. Por defecto escucha en `http://localhost:3000/api`.
2. En esta carpeta ejecuta:

```powershell
npm start
```

3. Abre `http://localhost:5500` en el navegador. El servidor estático usa Node.js 22+, sin dependencias de ejecución. También puedes usar Live Server con puerto 5500.

**No abras los HTML con doble clic.** Los módulos de JavaScript necesitan un servidor HTTP.

La URL de la API se configura en **js/config.js**. Si cambias puerto, equipo u origen, ajusta también `FRONT_ORIGINS` en el `.env` del back-end. En un despliegue HTTPS usa una API HTTPS para evitar contenido mixto.

## Probar como administrador

Registra tu cuenta desde `index.html`. Las cuentas nuevas son clientes. En la carpeta del back-end ejecuta:

```powershell
npm run admin -- tu-correo@ejemplo.com
```

Inicia sesión: el administrador abre `app.html`. Los clientes van a `cliente.html`. La API verifica los permisos; ocultar botones no es el control de seguridad.

En inventario puedes crear (POST), ver lista (GET), consultar un detalle (GET por id), editar el formulario completo (PUT), cambiar solo existencias (PATCH) y borrar con confirmación (DELETE). Cada error que envía la API se pinta debajo de su campo con el DOM; los mensajes generales se muestran en `role="status"`. Los botones se deshabilitan durante el envío y los errores de conexión se explican en la página.

## Pantallas

| Archivo | Uso |
| --- | --- |
| `index.html` | Login y registro |
| `app.html` | CRUD completo de repuestos, solo admin |
| `cliente.html` | Catálogo público, filtros, detalle y carrito temporal |
| `km-verde.html` | Solicitudes propias del cliente o validaciones del admin |

KM Verde permite presentar una pieza usada y seleccionar la nueva. El personal asigna un descuento tras inspeccionarla. «Ver descuento y restante» consulta la cotización en el servidor. Ejemplo: precio $85.000, descuento $15.000, restante $70.000. No procesa pagos ni envíos, no consume un descuento como venta y todavía no admite fotos adjuntas. La cotización cubre una unidad del repuesto seleccionado.

## Estructura exigida

```text
index.html
app.html
cliente.html
km-verde.html
css/site.css
assets/img/
js/
  config.js
  sesion.js
  pages/
    auth.page.js
    repuestos.page.js
    cliente.page.js
    kmverde.page.js
    ui.js
  services/
    http.service.js
    auth.service.js
    repuestos.service.js
    kmverde.service.js
```

Todos los `fetch` están en `services` (centralizados en `http.service.js`). Las páginas solo llaman servicios y actualizan el DOM. `sesion.js` es el único archivo que usa `localStorage`, exclusivamente para el JWT. Productos, perfiles y solicitudes vienen de la API/MySQL. El carrito vive en memoria, se vacía al recargar y comprueba precios/existencias al abrirlo. No hay copia de los productos en localStorage.

El token se envía como `Authorization: Bearer ...` en las rutas protegidas. Un 401 en una petición protegida borra el token y vuelve al login. Un 403 no destruye la sesión: informa que faltan permisos.

## Pruebas

Para instalar las dependencias **de prueba** y ejecutar los tests:

```powershell
npm ci
npm test
```

Se verifican los seis métodos HTTP, el encabezado Bearer, respuesta 204, errores individuales y cierre por 401. Las pruebas DOM verifican mensajes bajo cada campo. No se requiere MySQL para estos tests. Las pruebas reales de la API con MySQL están en el repositorio del back-end.

Prueba manual recomendada: registrar un cliente; promover otra cuenta a admin; crear/editar/PATCH/borrar un repuesto; enviar varios campos inválidos; presentar una solicitud KM Verde como cliente; validarla como admin; volver como cliente y comprobar el descuento. El front-end no guarda cambios si la API rechaza la petición.

## Publicación y entrega

Sube **esta carpeta** a `motostock-front`, separada de `motostock-api`. No subas `node_modules` ni archivos `.env`. Incluye el lockfile si usas las pruebas. En el README de tu entrega puedes añadir los dos enlaces de GitHub una vez creados; no se han inventado URLs de repositorios.

El front-end puede alojarse como sitio estático, pero la API y MySQL necesitan su propio servidor; GitHub Pages no ejecuta Node.js ni MySQL. Antes de probar desde otro equipo, configura la dirección de la API y CORS.
