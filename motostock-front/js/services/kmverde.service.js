import {pedir} from './http.service.js';
export const listarSolicitudes=()=>pedir('/km-verde',{protected:true});
export const solicitar=data=>pedir('/km-verde',{method:'POST',data,protected:true});
export const validar=(id,data)=>pedir(`/km-verde/${encodeURIComponent(id)}/validacion`,{method:'PATCH',data,protected:true});
export const cotizar=id=>pedir(`/km-verde/${encodeURIComponent(id)}/cotizacion`,{protected:true});
