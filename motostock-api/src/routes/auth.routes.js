import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authData } from '../validaciones.js';
import { ApiError } from '../errors.js';
export function authRoutes(db,secret,authenticate) {
  const r=Router();
  r.post('/registro',async(req,res)=>{const d=authData(req.body,true);const hash=await bcrypt.hash(d.password,12);let result;
    try{[result]=await db.execute('INSERT INTO usuarios(nombre,email,password_hash,rol) VALUES(?,?,?,?)',[d.nombre,d.email,hash,'cliente']);}catch(e){if(e.code==='ER_DUP_ENTRY')throw new ApiError(400,'Correo registrado.',{email:'Ya hay una cuenta con este correo.'});throw e;}
    res.status(201).json({id:result.insertId,nombre:d.nombre,email:d.email,rol:'cliente'});
  });
  r.post('/login',async(req,res)=>{const d=authData(req.body);const [rows]=await db.execute('SELECT * FROM usuarios WHERE email=?',[d.email]);const u=rows[0];
    if(!u||!await bcrypt.compare(d.password,u.password_hash))throw new ApiError(401,'Correo o contraseña incorrectos.');
    const token=jwt.sign({rol:u.rol},secret,{subject:String(u.id),expiresIn:'1h',algorithm:'HS256',issuer:'motostock-api',audience:'motostock-front'});
    res.json({token,usuario:{id:u.id,nombre:u.nombre,email:u.email,rol:u.rol}});
  });
  r.get('/me',authenticate,(req,res)=>res.json(req.usuario));return r;
}
