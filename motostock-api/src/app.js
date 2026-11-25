import express from 'express';
import cors from 'cors';
import { auth } from './middlewares/auth.middleware.js';
import { errores } from './middlewares/error.middleware.js';
import { authRoutes } from './routes/auth.routes.js';
import { repuestosRoutes } from './routes/repuestos.routes.js';
import { kmRoutes } from './routes/kmverde.routes.js';
export function createApp(db,config){
 const app=express();app.disable('x-powered-by');
 app.use(cors({origin:(origin,callback)=>callback(null,!origin||config.origins.includes(origin)),methods:['GET','POST','PUT','PATCH','DELETE','OPTIONS'],allowedHeaders:['Content-Type','Authorization']}));
 app.use(express.json({limit:'1mb'}));const authenticate=auth(db,config.secret);
 app.get('/api/salud',async(req,res)=>{await db.execute('SELECT 1');res.json({estado:'ok',baseDeDatos:'mysql'});});
 app.use('/api/auth',authRoutes(db,config.secret,authenticate));
 app.use('/api/repuestos',repuestosRoutes(db,authenticate));app.use('/api/km-verde',kmRoutes(db,authenticate));
 app.use((req,res)=>res.status(404).json({message:'Ruta no encontrada.',errors:{}}));app.use(errores);return app;
}
