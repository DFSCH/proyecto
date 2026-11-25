import {miPerfil} from '../services/auth.service.js';
import {cerrarSesion} from '../sesion.js';
export const $=s=>document.querySelector(s);
export const money=n=>new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:2}).format(n);
export const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const picture=p=>/^assets\/img\/[A-Za-z0-9_.-]+\.(jpg|jpeg|png|webp)$/i.test(p.imagen||'')?p.imagen:'assets/img/sin-imagen.svg';
export function limpiar(form){form.querySelectorAll('[data-error]').forEach(n=>n.textContent='');form.querySelectorAll('[aria-invalid]').forEach(n=>n.removeAttribute('aria-invalid'));const msg=form.querySelector('[data-message]');if(msg)msg.textContent='';}
export function errores(form,err){limpiar(form);for(const [field,message] of Object.entries(err.errors||{})){const slot=[...form.querySelectorAll('[data-error]')].find(n=>n.dataset.error===field);if(slot)slot.textContent=message;const input=form.elements.namedItem(field);if(input)input.setAttribute('aria-invalid','true');}const msg=form.querySelector('[data-message]');if(msg)msg.textContent=err.message;const first=form.querySelector('[aria-invalid]');if(first)first.focus();}
export function mensaje(text){const n=$('#page-message');if(n)n.textContent=text;}
export async function perfil(admin=false){try{const u=await miPerfil();if(admin&&u.rol!=='admin'){location.replace('cliente.html');return null;}const name=$('#user-name');if(name)name.textContent=`${u.nombre} · ${u.rol}`;document.querySelectorAll('[data-admin]').forEach(n=>n.hidden=u.rol!=='admin');return u;}catch(e){if(e.status===401)location.replace('index.html');else mensaje(e.message);return null;}}
document.querySelectorAll('[data-logout]').forEach(b=>b.onclick=cerrarSesion);
window.addEventListener('sesion-expirada',()=>location.replace('index.html'));
document.addEventListener('click',e=>{const b=e.target.closest('[data-close]');if(b)document.getElementById(b.dataset.close).close();});
document.addEventListener('error',e=>{if(e.target.tagName==='IMG'&&!e.target.dataset.failed){e.target.dataset.failed='true';e.target.src='assets/img/sin-imagen.svg';}},true);
