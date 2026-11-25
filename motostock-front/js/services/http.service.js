import {API_URL} from '../config.js';
import {obtenerToken,borrarToken} from '../sesion.js';
export class ApiError extends Error{constructor(status,message,errors={}){super(message);this.status=status;this.errors=errors;}}
export async function pedir(ruta,{method='GET',data,protected:privado=false}={}){
 const headers={};if(data!==undefined)headers['Content-Type']='application/json';
 if(privado){const token=obtenerToken();if(!token)throw new ApiError(401,'Inicia sesión para continuar.');headers.Authorization=`Bearer ${token}`;}
 let response;try{response=await fetch(API_URL+ruta,{method,headers,...(data!==undefined?{body:JSON.stringify(data)}:{})});}catch{throw new ApiError(0,'No hay conexión con la API. Comprueba que el back-end esté encendido y CORS permita este origen.');}
 if(response.status===204)return null;
 let body;try{body=await response.json();}catch{throw new ApiError(response.status,'La API devolvió una respuesta que no es JSON.');}
 if(!response.ok){if(response.status===401&&privado){borrarToken();window.dispatchEvent(new CustomEvent('sesion-expirada'));}throw new ApiError(response.status,body.message||'La petición no pudo completarse.',body.errors||{});}
 return body;
}
