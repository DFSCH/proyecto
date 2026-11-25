export function errores(err,req,res,next) {
  if(res.headersSent)return next(err);
  if(err.type==='entity.parse.failed')return res.status(400).json({message:'JSON inválido.',errors:{_form:'Revisa el formato JSON.'}});
  if(err.type==='entity.too.large')return res.status(413).json({message:'La petición supera el límite de 1 MB.',errors:{_form:'Reduce el tamaño de la petición.'}});
  if(err.code==='ER_DUP_ENTRY')return res.status(400).json({message:'El valor ya está registrado.',errors:{[req.baseUrl.includes('auth')||req.path.includes('auth')?'email':'codigo']:'Este valor ya existe.'}});
  if(err.code==='ER_ROW_IS_REFERENCED_2')return res.status(400).json({message:'Este repuesto tiene solicitudes KM Verde asociadas.',errors:{_form:'No se puede borrar un repuesto usado en una solicitud.'}});
  if(err.code==='ER_NO_REFERENCED_ROW_2')return res.status(400).json({message:'El recurso asociado no existe.',errors:{producto_id:'Selecciona un repuesto existente.'}});
  if(err.status)return res.status(err.status).json({message:err.message,errors:err.errors||{}});
  console.error('Error API:',err.code||err.name);
  res.status(500).json({message:'No fue posible procesar la petición. Revisa la conexión con MySQL.',errors:{}});
}
