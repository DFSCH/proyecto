import { invalid } from './errors.js';
const own = (o,k) => Object.hasOwn(o,k);
const object = b => b !== null && typeof b === 'object' && !Array.isArray(b);
function base(body, allowed) { const e={}; if (!object(body)) return {_form:'Envía un objeto JSON.'}; for (const k of Object.keys(body)) if (!allowed.includes(k)) e[k]='Campo no permitido.'; return e; }
function text(b,k,max,e,required=true) { if (!own(b,k) && !required) return; if (typeof b[k]!=='string' || !b[k].trim() || b[k].trim().length>max) e[k]=`Escribe entre 1 y ${max} caracteres.`; }
export function authData(body, register=false) {
  const allowed=register?['nombre','email','password']:['email','password'], e=base(body,allowed); body=object(body)?body:{};
  if(register)text(body,'nombre',100,e);
  if(typeof body.email!=='string'||body.email.length>150||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) e.email='Ingresa un correo válido.';
  if(typeof body.password!=='string'||body.password.length<8||Buffer.byteLength(body.password,'utf8')>72) e.password='Usa al menos 8 caracteres y un máximo de 72 bytes.';
  invalid(e);return {...(register?{nombre:body.nombre.trim()}:{}),email:body.email.trim().toLowerCase(),password:body.password};
}
export const productFields=['codigo','nombre','categoria','marca','modelo','anos','descripcion','precio','stock','stock_minimo','imagen'];
export function productData(body, partial=false) {
  const e=base(body,productFields); body=object(body)?body:{};
  if(partial && !Object.keys(body).length)e._form='Envía al menos un campo.';
  for(const [k,max] of Object.entries({codigo:30,nombre:150,categoria:80,marca:80,modelo:100,anos:40,descripcion:2000})) if(!partial||own(body,k))text(body,k,max,e);
  if(own(body,'codigo')&&typeof body.codigo==='string'&&!/^[A-Za-z0-9_-]+$/.test(body.codigo))e.codigo='Usa letras, números, guiones o guion bajo.';
  for(const k of ['precio','stock','stock_minimo']) if(!partial||own(body,k)) {
    const v=body[k];if(typeof v!=='number'||!Number.isFinite(v)||v<0||(k!=='precio'&&!Number.isInteger(v))||v>(k==='precio'?99999999.99:1000000))e[k]=k==='precio'?'Ingresa un precio entre 0 y 99.999.999,99.':'Ingresa un entero entre 0 y 1.000.000.';
    if(k==='precio'&&typeof v==='number'&&Math.abs(v*100-Math.round(v*100))>0.00001)e[k]='Usa máximo dos decimales.';
  }
  if(!partial||own(body,'imagen')) { const v=body.imagen; if(typeof v!=='string'||v.length>500||!(v===''||/^assets\/img\/[A-Za-z0-9_.-]+\.(jpg|jpeg|png|webp)$/i.test(v)))e.imagen='Usa una ruta assets/img/archivo.jpg o deja el campo vacío.'; }
  invalid(e);return Object.fromEntries(Object.entries(body).map(([k,v])=>[k,typeof v==='string'?v.trim():v]));
}
export function requestData(body) {
  const e=base(body,['repuesto_usado','descripcion','entrega','producto_id']); body=object(body)?body:{};text(body,'repuesto_usado',150,e);text(body,'descripcion',1500,e);
  if(!['taller','envio'].includes(body.entrega))e.entrega='Selecciona taller o envío.';
  if(!Number.isSafeInteger(body.producto_id)||body.producto_id<1)e.producto_id='Selecciona un repuesto nuevo.';
  invalid(e);return {repuesto_usado:body.repuesto_usado.trim(),descripcion:body.descripcion.trim(),entrega:body.entrega,producto_id:body.producto_id};
}
export function reviewData(body) {
  const e=base(body,['estado','condicion','descuento','observaciones']);body=object(body)?body:{};
  if(!['aprobada','rechazada'].includes(body.estado))e.estado='Selecciona aprobada o rechazada.';
  if(!['Bueno','Desgaste moderado','Muy deteriorado','No apto'].includes(body.condicion))e.condicion='Selecciona el estado inspeccionado.';
  text(body,'observaciones',1500,e);
  if(typeof body.descuento!=='number'||!Number.isFinite(body.descuento)||body.descuento<0||body.descuento>99999999.99||Math.abs(body.descuento*100-Math.round(body.descuento*100))>0.00001)e.descuento='Ingresa un valor válido con máximo dos decimales.';
  if(body.estado==='aprobada'&&!(body.descuento>0))e.descuento='El descuento aprobado debe ser mayor que cero.';
  if(body.estado==='rechazada'&&body.descuento!==0)e.descuento='Una solicitud rechazada debe tener descuento cero.';
  invalid(e);return {...body,observaciones:body.observaciones.trim()};
}
