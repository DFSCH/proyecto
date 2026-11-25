// Ejecuta con npm run test:mysql. Crea y elimina SOLO sus filas prefijadas de prueba.
import {test} from 'node:test';import assert from 'node:assert/strict';import request from 'supertest';import {randomUUID} from 'node:crypto';
import {createDb} from '../src/db.js';import {createApp} from '../src/app.js';import {configFromEnv} from '../src/config.js';
test('MySQL real: auth, 6 endpoints, roles, KM Verde y propiedad de solicitudes',async()=>{
 const config=configFromEnv(),db=createDb(config.db),app=createApp(db,config),suffix=randomUUID().slice(0,8),password='Test-Segura-123!',email=`it-${suffix}@example.com`,other=`it-other-${suffix}@example.com`;let productId,requestId;
 const p={codigo:`IT-${suffix}`,nombre:'Prueba integración',categoria:'Motor',marca:'NGK',modelo:'Universal',anos:'2026',descripcion:'Fila temporal.',precio:85000,stock:12,stock_minimo:5,imagen:''};
 try{
  let r=await request(app).post('/api/auth/registro').send({nombre:'Test',email,password});assert.equal(r.status,201);const uid=r.body.id;
  const [hashes]=await db.execute('SELECT password_hash FROM usuarios WHERE id=?',[uid]);assert.match(hashes[0].password_hash,/^\$2[aby]\$/);assert.notEqual(hashes[0].password_hash,password);
  assert.equal((await request(app).post('/api/auth/registro').send({nombre:'Duplicado',email,password})).status,400);
  assert.equal((await request(app).post('/api/auth/login').send({email,password:'ClaveEquivocada'})).status,401);
  r=await request(app).post('/api/auth/login').send({email,password});assert.equal(r.status,200);const token=r.body.token,auth={Authorization:'Bearer '+token};
  assert.equal((await request(app).post('/api/repuestos').set(auth).send(p)).status,403);
  await db.execute("UPDATE usuarios SET rol='admin' WHERE id=?",[uid]);
  r=await request(app).post('/api/repuestos').set(auth).send(p);assert.equal(r.status,201);productId=r.body.id;
  assert.equal((await request(app).get('/api/repuestos')).status,200);
  assert.equal((await request(app).get(`/api/repuestos/${productId}`)).body.precio,85000);
  r=await request(app).put(`/api/repuestos/${productId}`).set(auth).send({...p,nombre:'Actualizado'});assert.equal(r.status,200);assert.equal(r.body.nombre,'Actualizado');
  r=await request(app).patch(`/api/repuestos/${productId}`).set(auth).send({stock:10});assert.equal(r.status,200);assert.equal(r.body.stock,10);assert.equal(r.body.nombre,'Actualizado');
  r=await request(app).put(`/api/repuestos/${productId}`).set(auth).send({nombre:''});assert.equal(r.status,400);assert.ok(r.body.errors.nombre);assert.ok(r.body.errors.precio);
  const second=await request(app).post('/api/repuestos').set(auth).send({...p,codigo:p.codigo+'-D'});const deleted=await request(app).delete(`/api/repuestos/${second.body.id}`).set(auth);assert.equal(deleted.status,204);assert.equal(deleted.text,'');assert.equal((await request(app).get(`/api/repuestos/${second.body.id}`)).status,404);
  r=await request(app).post('/api/km-verde').set(auth).send({repuesto_usado:'Pastillas usadas',descripcion:'Desgaste moderado',entrega:'taller',producto_id:productId});assert.equal(r.status,201);requestId=r.body.id;
  assert.equal((await request(app).get(`/api/km-verde/${requestId}/cotizacion`).set(auth)).status,400);
  r=await request(app).patch(`/api/km-verde/${requestId}/validacion`).set(auth).send({estado:'aprobada',condicion:'Desgaste moderado',descuento:90000,observaciones:'Inspeccionada'});assert.equal(r.status,400);assert.ok(r.body.errors.descuento);
  r=await request(app).patch(`/api/km-verde/${requestId}/validacion`).set(auth).send({estado:'aprobada',condicion:'Desgaste moderado',descuento:15000,observaciones:'Inspeccionada'});assert.equal(r.status,200);
  r=await request(app).get(`/api/km-verde/${requestId}/cotizacion`).set(auth);assert.equal(r.status,200);assert.equal(r.body.restante,70000);
  assert.equal((await request(app).patch(`/api/km-verde/${requestId}/validacion`).set(auth).send({estado:'aprobada',condicion:'Bueno',descuento:1000,observaciones:'Otra valoración'})).status,400);
  await request(app).post('/api/auth/registro').send({nombre:'Otro',email:other,password});const login=await request(app).post('/api/auth/login').send({email:other,password});const otherAuth={Authorization:'Bearer '+login.body.token};assert.equal((await request(app).get('/api/km-verde').set(otherAuth)).body.length,0);assert.equal((await request(app).get(`/api/km-verde/${requestId}/cotizacion`).set(otherAuth)).status,404);
  await db.execute("UPDATE usuarios SET rol='cliente' WHERE id=?",[uid]);assert.equal((await request(app).delete(`/api/repuestos/${productId}`).set(auth)).status,403);
 }finally{if(requestId)await db.execute('DELETE FROM solicitudes_km WHERE id=?',[requestId]);await db.execute('DELETE FROM repuestos WHERE codigo LIKE ?',[`IT-${suffix}%`]);await db.execute('DELETE FROM usuarios WHERE email IN (?,?)',[email,other]);await db.end();}
});
