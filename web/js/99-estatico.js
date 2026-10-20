/* ---------- Modo estático (GitHub Pages / archivo local) ----------
   Fuera de Claude no hay base de datos en vivo: se cargan los personajes,
   retratos e imágenes de estancias desde la carpeta datos/. Edición desactivada. */
ready.then(async()=>{
  if(db)return;
  try{
    const [per,idx]=await Promise.all([fetch("datos/personajes.json").then(r=>r.json()),fetch("datos/indice.json").then(r=>r.json())]);
    LIBRO=per;
    RETR={};(idx.retratos||[]).forEach(f=>{RETR[f.replace(/\.\w+$/,"")]="datos/retratos/"+f});
    ESTANCIAS={};(idx.estancias||[]).forEach(f=>{ESTANCIAS[f.replace(/\.\w+$/,"")]="datos/estancias/"+f});
    try{drawFaces()}catch(e){}
    try{if(!$("#selector").hidden&&modo==="existente")renderExistentes();if(!$("#game").hidden&&player?.existente)buildBar()}catch(e){}
  }catch(e){console.warn("Modo estático: no se pudieron cargar los datos",e)}
});
