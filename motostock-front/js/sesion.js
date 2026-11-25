const CLAVE='motostock_token';
export const obtenerToken=()=>localStorage.getItem(CLAVE);
export const guardarToken=token=>localStorage.setItem(CLAVE,token);
export const borrarToken=()=>localStorage.removeItem(CLAVE);
export function cerrarSesion(){borrarToken();location.href='index.html';}
