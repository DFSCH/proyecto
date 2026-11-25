import jwt from 'jsonwebtoken';
import { ApiError } from '../errors.js';
export function auth(db,secret) { return async (req,res,next) => {
  const match=/^Bearer ([^\s]+)$/.exec(req.headers.authorization || '');
  if(!match)throw new ApiError(401,'Inicia sesión para continuar.');
  let payload;try {payload=jwt.verify(match[1],secret,{algorithms:['HS256'],issuer:'motostock-api',audience:'motostock-front'});}catch{throw new ApiError(401,'Token inválido o vencido.');}
  // Reto 1: el rol y la existencia del usuario se consultan SIEMPRE en MySQL.
  const [rows]=await db.execute('SELECT id,nombre,email,rol FROM usuarios WHERE id=?',[payload.sub]);
  if(!rows.length)throw new ApiError(401,'El usuario ya no existe.');
  req.usuario=rows[0];next();
}; }
export function soloAdmin(req,res,next) { if(req.usuario.rol!=='admin')throw new ApiError(403,'Esta acción requiere el rol administrador.');next(); }
