import {test} from 'node:test';import assert from 'node:assert/strict';
import {authData,productData,reviewData} from '../src/validaciones.js';
test('Devuelve errores independientes por cada campo',()=>{assert.throws(()=>productData({nombre:'',precio:-1,stock:-2}),e=>e.status===400&&!!e.errors.nombre&&!!e.errors.precio&&!!e.errors.stock&&!!e.errors.codigo);});
test('PATCH permite un campo, PUT exige todos',()=>{assert.deepEqual(productData({stock:2},true),{stock:2});assert.throws(()=>productData({stock:2}),e=>e.status===400&&!!e.errors.nombre);assert.throws(()=>productData({},true),e=>!!e.errors._form);});
test('Impide modificar campos no autorizados y números inválidos',()=>{for(const d of [{id:8},{stock:1.5},{stock:null},{precio:'500'},{precio:1.001}])assert.throws(()=>productData(d,true),e=>e.status===400);});
test('No permite registrar un rol admin ni truncar contraseñas bcrypt',()=>{assert.throws(()=>authData({nombre:'Juan',email:'juan@example.com',password:'Password123',rol:'admin'},true),e=>!!e.errors.rol);assert.throws(()=>authData({nombre:'Juan',email:'mal',password:'😀'.repeat(20)},true),e=>!!e.errors.password&&!!e.errors.email);});
test('La valoración rechazada no otorga descuento',()=>{assert.throws(()=>reviewData({estado:'rechazada',condicion:'No apto',descuento:100,observaciones:'No sirve.'}),e=>!!e.errors.descuento);});
