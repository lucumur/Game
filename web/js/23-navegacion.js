/* ---------- Navegación ---------- */
const MAP_VIEWS=[["palacio","Palacio"],["dominio","Dominio"],["francia","Francia"]];
const VIEWS=[["escritorio","Escritorio"],...MAP_VIEWS,["personajes","Personajes"],["diario","Diario"],["planes","Planes"],["bio","Biografía"],["rel","Relaciones"]];
let current="escritorio";
function go(v,replaceHash=false){
  const isMap=MAP_VIEWS.some(([id])=>id===v);
  if(isMap&&current!==v)mapSel=null;
  current=v;
  document.querySelectorAll("[data-view]").forEach(s=>s.hidden=s.dataset.view!==v);
  $("#map-view").hidden=!isMap;
  document.querySelectorAll("#views button,#mnav button").forEach(b=>b.setAttribute("aria-current",String(b.dataset.go===v)));
  $("#mnav button[aria-current=true]").scrollIntoView({block:"nearest",inline:"nearest"});
  if(v==="escritorio"){drawDesk();drawCal()}
  if(isMap)drawMap(v);
  if(v==="personajes"){drawUnknown();drawFaces()} if(v==="diario")drawBook(); if(v==="planes")drawPlans(); if(v==="bio")drawBio(); if(v==="rel")drawRel();
  try{
    if(location.hash!=="#"+v){
      if(replaceHash)history.replaceState(history.state,"","#"+v);
      else location.hash="#"+v;
    }
  }catch(e){}
}
function viewFromHash(){
  const h=location.hash.slice(1);
  if(h==="mapa")return "palacio";
  if(h==="caras")return "personajes";
  return VIEWS.some(([id])=>id===h)?h:"escritorio";
}
function buildNav(){for(const id of ["#views","#mnav"]){const n=$(id);n.innerHTML="";VIEWS.forEach(([k,t])=>n.append(el("button",{"data-go":k,onclick:()=>{go(k);window.scrollTo(0,0)}},t)))}}
function show(v){
  if(!epoca&&v!=="epocas")v="epocas";
  $("#epocas").hidden=v!=="epocas"; $("#selector").hidden=v!=="selector"; $("#game").hidden=v!=="game"; $("#mnav").hidden=v!=="game";
  if(epoca){hoy=D(store.get("vg_fecha",epoca.fecha));calMes=new Date(Date.UTC(hoy.getUTCFullYear(),hoy.getUTCMonth(),1))}
  if(v==="epocas"){buildEras();window.scrollTo(0,0);return}
  if(v==="selector"){$("#sel-label").textContent="Versalles · "+MESES[hoy.getUTCMonth()]+" de "+hoy.getUTCFullYear();$("#sel-sub").textContent=epoca.ev}
  if(v==="game"){buildBar();buildNav();drawObjetos();go(viewFromHash(),true)} else buildSelector();
  window.scrollTo(0,0);
}
window.addEventListener("hashchange",()=>{
  if(!$("#game").hidden&&location.hash!=="#"+current)go(viewFromHash(),true);
});
$("#q").addEventListener("input",drawFaces); $("#f-pres").addEventListener("change",drawFaces); $("#f-casa")?.addEventListener("change",drawFaces);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){$("#ficha").hidden=true;closeLectern();closeMenu()}});
show(player?"game":"selector");
