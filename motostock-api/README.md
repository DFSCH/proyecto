# MotoStock API — proyecto final

API REST de repuestos y valoraciones KM Verde. Node.js + Express 5 + MySQL 8 + `mysql2/promise`, contraseñas hasheadas con `bcrypt` y sesiones JWT. El front-end está en el repositorio separado **motostock-front**.

## Requisitos

- Node.js 22 o posterior, npm y MySQL 8.0.16 o posterior.
- MySQL encendido. MySQL Workbench o la consola para importar el SQL.

## Ejecutar

1. Abre **motostock.sql** en Workbench y ejecútalo. Crea `motostock_final`, las tablas y 12 repuestos. No crea usuarios ni contiene contraseñas.
2. Abre una terminal en esta carpeta:

```powershell
npm ci
Copy-Item .env.example .env
```

En Linux/macOS usa `cp .env.example .env`. Edita `.env` con tu usuario y contraseña de MySQL. Usa `DB_NAME=motostock_final`; si deseas otro nombre cambia también el SQL. Genera una clave JWT y copia el resultado en `JWT_SECRET`:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Los valores del archivo de ejemplo son solo una plantilla. La API rechaza la clave de ejemplo y no arranca si no puede conectarse a MySQL.

```powershell
npm start
```

API: `http://localhost:3000/api`. Comprueba `GET /api/salud` (200, JSON). Para desarrollo: `npm run dev`.

## Primera cuenta y permisos

1. Enciende el front-end (`npm start` en su carpeta), abre `http://localhost:5500` y registra tu cuenta.
2. En otra terminal de **este back-end**, asigna el rol administrador a esa cuenta:

```powershell
npm run admin -- tu-correo@ejemplo.com
```

3. Inicia sesión. Los administradores van a `app.html`; los clientes al catálogo. Una cuenta nueva **siempre** es cliente: no puede elegir su propio rol.

Solo el administrador crea, modifica, elimina y valida KM Verde. Los clientes consultan el catálogo y crean/consultan sus solicitudes. No hay credenciales fijas ni un primer administrador automático.

## Endpoints

Todas las respuestas con contenido son JSON. Los errores usan `{ "message": "...", "errors": { "campo": "mensaje" } }`.

| Método | URL desde `/api` | Resultado | Acceso |
| --- | --- | --- | --- |
| POST | `/auth/registro` | 201, usuario sin contraseña | Público |
| POST | `/auth/login` | 200, `{token, usuario}` | Público |
| GET | `/auth/me` | 200, perfil y rol actual | JWT |
| GET | `/repuestos` | 200, lista | Público |
| GET | `/repuestos/:id` | 200, repuesto | Público |
| POST | `/repuestos` | 201, repuesto y cabecera Location | JWT + admin |
| PUT | `/repuestos/:id` | 200, reemplazo completo | JWT + admin |
| PATCH | `/repuestos/:id` | 200, actualización parcial | JWT + admin |
| DELETE | `/repuestos/:id` | 204, sin cuerpo | JWT + admin |
| POST | `/km-verde` | 201, solicitud propia | JWT |
| GET | `/km-verde` | 200, propias o todas si es admin | JWT |
| PATCH | `/km-verde/:id/validacion` | 200, valoración definitiva | JWT + admin |
| GET | `/km-verde/:id/cotizacion` | 200, precio/descuento/restante | Dueño o admin |

400: datos inválidos, duplicados o reglas del negocio; 401: token ausente/inválido/vencido o login incorrecto; 403: usuario sin permiso; 404: recurso inexistente o solicitud ajena; 500: fallo interno. El PDF incluye 403 para roles; se conserva además de los códigos mínimos del enunciado.

Ejemplo de POST o PUT completo:

```json
{
  "codigo": "RP-020",
  "nombre": "Bujía de ejemplo",
  "categoria": "Motor",
  "marca": "NGK",
  "modelo": "Universal",
  "anos": "2026",
  "descripcion": "Repuesto de demostración.",
  "precio": 35000,
  "stock": 10,
  "stock_minimo": 3,
  "imagen": "assets/img/RP-008.jpeg"
}
```

PUT exige todos esos campos, incluida `imagen` (puede ser `""`). PATCH acepta un subconjunto no vacío, por ejemplo `{ "stock": 4 }`. IDs y fechas los genera MySQL; no se aceptan en el body.

Ejemplo de error simultáneo:

```json
{
  "message": "Revisa los campos del formulario.",
  "errors": {
    "nombre": "Escribe entre 1 y 150 caracteres.",
    "precio": "Ingresa un precio entre 0 y 99.999.999,99.",
    "stock": "Ingresa un entero entre 0 y 1.000.000."
  }
}
```

## JWT, SQL y CORS

En cada petición protegida:

```http
Authorization: Bearer TU_TOKEN
```

El token dura una hora; el cierre de sesión elimina el token del navegador. Se validan algoritmo, emisor y audiencia. El middleware obtiene el usuario y **su rol actual desde MySQL en cada petición** (reto 1 completado). Cambiar `rol` en la base tiene efecto incluso con un JWT emitido antes. Borrar un usuario también invalida su acceso.

Las consultas usan parámetros `?`; las columnas editables proceden de una lista fija. El registro no permite `rol`, no devuelve hashes y verifica el límite de 72 bytes de bcrypt. El precio es DECIMAL y el descuento se calcula en el servidor.

`FRONT_ORIGINS` admite una lista separada por comas. Incluye el origen exacto del front-end, por ejemplo `http://localhost:5500` y `http://127.0.0.1:5500`. CORS no sustituye la autenticación. Si cambias de puerto añade el nuevo origen y reinicia la API.

Se usa SQL con mysql2 como en la actividad 6. El reto opcional de ORM **no está implementado**.

## KM Verde

El cliente presenta la pieza y selecciona un repuesto nuevo; el personal recibe e inspecciona físicamente la pieza y aprueba o rechaza el descuento con motivo y estado. La aprobación se guarda en una transacción con bloqueo para impedir dos validaciones simultáneas. El descuento debe ser positivo y no superar el precio actual; las solicitudes rechazadas llevan cero. La cotización aprobada devuelve `restante = precio actual − descuento aplicado`, sin valores negativos ni saldo a favor. Si baja el precio, el descuento aplicado se limita al nuevo precio. Una solicitud ajena devuelve 404.

Esta versión registra solicitudes y cotizaciones, **no cobros, envíos, ventas ni consumo de cupones**. No permite subir fotos todavía; la inspección se hace al recibir la pieza. El carrito del catálogo es temporal. Un repuesto con solicitudes asociadas no puede eliminarse: se devuelve 400 para preservar el historial.

## Organización

```text
src/
  server.js                   arranque y conexión
  app.js                      routers y middlewares
  config.js / db.js            entorno y pool mysql2
  validaciones.js / errors.js  validaciones por campo
  routes/                     auth, repuestos, KM Verde
  middlewares/                JWT/rol y errores
scripts/admin.js              promoción explícita de una cuenta
test/                         validaciones, HTTP y MySQL
postman/                      colección importable
motostock.sql
.env.example
```

## Pruebas y Postman

```powershell
npm test
npm run test:mysql
```

`npm test` ejecuta pruebas de validación, JWT, consulta de rol y CORS sin necesitar MySQL. `test:mysql` requiere `.env` y el SQL importado. Crea filas con prefijo `IT-`/`it-` y elimina solo esas filas al terminar. Verifica registro/hash/login, los seis endpoints, códigos, cambio de rol, acceso entre usuarios y el cálculo 85.000 − 15.000 = 70.000 contra MySQL real. No lo ejecutes con datos de producción.

Importa `postman/MotoStock.postman_collection.json`. Cambia `email` y `password` en las variables de la colección. Ejecuta 01 (registro), promueve esa cuenta desde la terminal, después 02 (login) y el resto en orden. El login guarda `token`, POST guarda `id`, y la solicitud guarda `solicitud_id`. Las comprobaciones de Postman están incluidas; ejecutarlas en Postman en tu equipo deja la evidencia de tu entrega. Se verificaron los mismos endpoints mediante pruebas HTTP automatizadas, no con la aplicación Postman.

## Entrega en GitHub

Publica **esta carpeta** como repositorio `motostock-api` y la carpeta del front como otro repositorio. Incluye código, SQL, colección, README, `.env.example` y `package-lock.json`. `.gitignore` excluye `.env`, claves y `node_modules`. En GitHub crea un repo vacío y usa sus comandos «push an existing repository». Los enlaces de ambos repositorios son los que debes entregar.

## Referencias

- Material adjunto de clase: *APIs y REST*, Laura Fernanda García Molina, actividades 3–6.
- https://expressjs.com/en/guide/error-handling/
- https://sidorares.github.io/node-mysql2/docs/documentation/promise-wrapper
- https://github.com/kelektiv/node.bcrypt.js
