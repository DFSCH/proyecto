import {registrar,ingresar} from '../services/auth.service.js';
import {guardarToken} from '../sesion.js';
import {$,errores,limpiar} from './ui.js';
function mode(register){$('#login').hidden=register;$('#register').hidden=!register;$('#show-login').classList.toggle('selected',!register);$('#show-register').classList.toggle('selected',register);}
$('#show-login').onclick=()=>mode(false);$('#show-register').onclick=()=>mode(true);
for(const id of ['login','register'])$('#'+id).onsubmit=async e=>{e.preventDefault();const f=e.currentTarget,b=e.submitter;limpiar(f);b.disabled=true;try{const d=Object.fromEntries(new FormData(f));if(id==='register'){await registrar(d);mode(false);$('#login').elements.email.value=d.email;$('#login [data-message]').textContent='Cuenta creada. Ahora puedes iniciar sesión.';f.reset();}else{const result=await ingresar(d);guardarToken(result.token);location.href=result.usuario.rol==='admin'?'app.html':'cliente.html';}}catch(err){errores(f,err);}finally{b.disabled=false;}};
