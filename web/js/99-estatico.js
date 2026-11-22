/* ---------- Modo estático (GitHub Pages / archivo local) ----------
   Fuera de Claude no hay base de datos en vivo: se cargan los personajes,
   retratos e imágenes de estancias desde la carpeta datos/. Edición desactivada. */
ready.then(async()=>{
  if(db)return;
  try{
    const [per,idx,sim,ocu,cas,tit]=await Promise.all([
      fetch("datos/personajes.json").then(r=>r.json()),
      fetch("datos/indice.json").then(r=>r.json()),
      fetch("datos/simbolos.json").then(r=>r.ok?r.json():[]).catch(()=>[]),
      fetch("datos/ocupantes.json").then(r=>r.ok?r.json():{}).catch(()=>({})),
      fetch("datos/casas.json").then(r=>r.ok?r.json():[]).catch(()=>[]),
      fetch("datos/titulos.json").then(r=>r.ok?r.json():null).catch(()=>null)
    ]);
    LIBRO=per;
    SIMBOLOS=Array.isArray(sim)?sim:[];
    OCUP_DB=ocu||{};
    if(tit&&typeof setTitulosData==="function"){setTitulosData(tit);if(!$("#game").hidden&&current==="titulos")drawTitulos()}
    if(typeof Heraldica!=="undefined"){Heraldica.setCasas(Array.isArray(cas)?cas:[]);Heraldica.poblarSelect($("#f-casa"),LIBRO,"Toda casa")}
    RETR={};(idx.retratos||[]).forEach(f=>{RETR[f.replace(/\.\w+$/,"")]="datos/retratos/"+f});
    ESTANCIAS={};(idx.estancias||[]).forEach(f=>{ESTANCIAS[f.replace(/\.\w+$/,"")]="datos/estancias/"+f});
    SIM_IMG={};(idx.simbolos||[]).forEach(f=>{SIM_IMG[f.replace(/\.\w+$/,"")]="datos/simbolos/"+f});
    try{drawFaces()}catch(e){}
    fetch("datos/escudos.json").then(r=>r.ok?r.json():null).then(esc=>{
      if(esc&&esc.files&&typeof Heraldica!=="undefined"){
        Heraldica.setEscudos(esc.files);
        try{if(!$("#game").hidden&&current==="personajes")drawFaces();if(typeof refrescarFichaCasa==="function")refrescarFichaCasa()}catch(e){}
      }
    }).catch(()=>{});
    try{if(!$("#selector").hidden&&modo==="existente")renderExistentes();if(!$("#game").hidden&&appMode==="partida"&&player?.existente){buildBar();if(current==="bio")drawBio()}}catch(e){}
    try{
      if(!$("#game").hidden&&(current==="palacio"||current==="dominio")){
        if(mapSel)goRoom(mapSel.id);
        else drawMap(current);
      }
    }catch(e){}
    activarEditorGH();
  }catch(e){console.warn("Modo estático: no se pudieron cargar los datos",e)}
});

/* Edición con llave de GitHub: subir retratos, imágenes de estancias y ocupantes al repositorio. */
async function activarEditorGH(){
  const st=$("#p-llave-st");
  if(db){st.textContent="En Claude se edita con tu cuenta de Claude; la llave no hace falta aquí.";return}
  if(!GH.tiene()){GH_OK=OWNER=false;st.textContent="Sin llave: solo lectura.";return}
  st.textContent="Comprobando la llave…";
  GH_OK=OWNER=await GH.comprobar();
  st.textContent=GH_OK?"Llave válida: puedes subir imágenes y asignar ocupantes. Los cambios tardan unos minutos en verse en otros dispositivos.":GH.error();
  if(mapSel&&mapSel.id&&document.querySelector(".zone.sel"))showRoom(mapSel.id,mapSel.n,mapSel.d);
}
window.ghCambio=(col,id,d)=>{
  if(col==="retratos"){if(d)RETR[id]=d.img;else delete RETR[id];try{drawFaces()}catch(e){}}
  if(col==="simbolos"){if(d)SIM_IMG[id]=d.img;else delete SIM_IMG[id];try{drawFaces()}catch(e){}}
  if(col==="estancias"){if(d)ESTANCIAS[id]=d.img;else delete ESTANCIAS[id]}
  if(col==="ocupantes"){if(d)OCUP_DB[id]=d;else delete OCUP_DB[id]}
  if(col!=="retratos"&&!$("#game").hidden&&!$("#map-view").hidden&&$("#map-box .zone.sel")){
    if(col==="ocupantes"&&current==="palacio")goRoom(mapSel.id);
    else showRoom(mapSel.id,mapSel.n,mapSel.d);
  }
};
$("#p-llave-ok").onclick=()=>{const v=$("#p-llave").value.trim();if(!v)return;GH.guardar(v);$("#p-llave").value="";activarEditorGH()};
$("#p-llave-x").onclick=()=>{GH.quitar();activarEditorGH()};
