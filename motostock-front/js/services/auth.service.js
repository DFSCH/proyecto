import {pedir} from './http.service.js';
export const registrar=data=>pedir('/auth/registro',{method:'POST',data});
export const ingresar=data=>pedir('/auth/login',{method:'POST',data});
export const miPerfil=()=>pedir('/auth/me',{protected:true});
