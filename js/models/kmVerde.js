/* Prototipo local compartido: las validaciones se realizan desde el panel del personal. */
const KmVerde = (() => {
  const key='motostock_km_verde';
  const list=()=>AlmacenLocal.leer(key,[]);
  const save=rows=>{if(!AlmacenLocal.guardar(key,rows))throw Error('No se pudo guardar. Libera espacio en el navegador e intenta otra vez.');};
  const create=data=>{if(!data.customer.trim()||!data.part.trim()||!data.description.trim())throw Error('Completa tus datos y la descripción del repuesto.');if(!RepuestosModel.buscarPorId(data.product))throw Error('Selecciona un repuesto nuevo.');const row={id:'KV-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,6),...data,status:'pending',discount:0,created:new Date().toISOString()};save([...list(),row]);return row;};
  const review=(id,status,condition,discount,notes)=>{const rows=list(),r=rows.find(x=>x.id===id);if(!r||r.status!=='pending')throw Error('Esta solicitud ya fue revisada o no existe.');if(!['approved','rejected'].includes(status)||!condition||!notes.trim())throw Error('Indica el estado y el motivo de la validación.');const p=RepuestosModel.buscarPorId(r.product);discount=Number(discount);if(status==='approved'&&(!p||p.existencias<=0||!Number.isFinite(discount)||discount<=0||discount>Number(p.precio)))throw Error('El descuento debe ser mayor que cero y no superar el precio del repuesto disponible.');Object.assign(r,{status,condition,discount:status==='approved'?discount:0,notes,reviewed:new Date().toISOString()});save(rows);return r;};
  const quote=id=>{const r=list().find(x=>x.id===id),p=r&&RepuestosModel.buscarPorId(r.product);if(!r||r.status!=='approved'||!p||p.existencias<=0)return null;const price=Number(p.precio),discount=Math.min(price,r.discount);return {request:r,product:p,price,discount,remaining:Math.max(0,price-discount)};};
  return {list,create,review,quote};
})();
