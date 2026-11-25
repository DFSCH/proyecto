import {pedir} from './http.service.js';
export const listar=()=>pedir('/repuestos');
export const obtener=id=>pedir(`/repuestos/${encodeURIComponent(id)}`);
export const crear=data=>pedir('/repuestos',{method:'POST',data,protected:true});
export const reemplazar=(id,data)=>pedir(`/repuestos/${encodeURIComponent(id)}`,{method:'PUT',data,protected:true});
export const actualizar=(id,data)=>pedir(`/repuestos/${encodeURIComponent(id)}`,{method:'PATCH',data,protected:true});
export const eliminar=id=>pedir(`/repuestos/${encodeURIComponent(id)}`,{method:'DELETE',protected:true});
