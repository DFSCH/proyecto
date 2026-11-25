import { Router } from 'express';
import { productData,productFields } from '../validaciones.js';
import { idParam,ApiError } from '../errors.js';
import { soloAdmin } from '../middlewares/auth.middleware.js';
export function repuestosRoutes(db,authenticate) {
  const r=Router();
  const find=async id=>{const [rows]=await db.execute('SELECT * FROM repuestos WHERE id=?',[id]);if(!rows.length)throw new ApiError(404,'Repuesto no encontrado.');return rows[0];};
  r.get('/',async(req,res)=>{const [rows]=await db.execute('SELECT * FROM repuestos ORDER BY id DESC');res.json(rows);});
  r.get('/:id',async(req,res)=>res.json(await find(idParam(req.params.id))));
  r.post('/',authenticate,soloAdmin,async(req,res)=>{const d=productData(req.body);const [result]=await db.execute(`INSERT INTO repuestos (${productFields.join(',')}) VALUES (${productFields.map(()=>'?').join(',')})`,productFields.map(k=>d[k]));res.status(201).location(`/api/repuestos/${result.insertId}`).json(await find(result.insertId));});
  async function update(req,res,partial){const id=idParam(req.params.id),d=productData(req.body,partial);await find(id);const keys=Object.keys(d);await db.execute(`UPDATE repuestos SET ${keys.map(k=>`${k}=?`).join(',')} WHERE id=?`,[...keys.map(k=>d[k]),id]);res.json(await find(id));}
  r.put('/:id',authenticate,soloAdmin,(req,res)=>update(req,res,false));
  r.patch('/:id',authenticate,soloAdmin,(req,res)=>update(req,res,true));
  r.delete('/:id',authenticate,soloAdmin,async(req,res)=>{const [result]=await db.execute('DELETE FROM repuestos WHERE id=?',[idParam(req.params.id)]);if(!result.affectedRows)throw new ApiError(404,'Repuesto no encontrado.');res.status(204).end();});return r;
}
