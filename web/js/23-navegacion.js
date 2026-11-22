/* ---------- Navegación ----------
   Dos modos sobre la misma app:
   · Mundo   (appMode="mundo")   — base de datos completa, mapas, libro de caras, glosario y mecánicas; sin personaje.
   · Partida (appMode="partida") — un solo personaje; solo ve lo que descubre.
   El hash lleva el modo: #mundo/<vista> o #partida/<vista>. Sin hash se muestra la portada con las dos puertas. */
const MAP_VIEWS=[["palacio","Palacio"],["dominio","Dominio"],["francia","Francia"]];
const VIEWS_MUNDO=[...MAP_VIEWS,["personajes","Personajes"],["titulos","Títulos"],["glosario","Glosario"],["mecanicas","Mecánicas"]];
const VIEWS_PARTIDA=[["escritorio","Escritorio"],["palacio","Palacio"],["dominio","Dominio"],["personajes","Personajes"],["diario","Diario"],["planes","Planes"],["bio","Biografía"],["rel","Relaciones"]];
const activeViews=()=>appMode==="mundo"?VIEWS_MUNDO:VIEWS_PARTIDA;
let current="escritorio";
function go(v,replaceHash=false){
  if(!activeViews().some(([id])=>id===v))v=activeViews()[0][0];
  const isMap=MAP_VIEWS.some(([id])=>id===v);
  if(isMap&&current!==v)mapSel=null;
  current=v;
  document.querySelectorAll("[data-view]").forEach(s=>s.hidden=s.dataset.view!==v);
  $("#map-view").hidden=!isMap;
  document.querySelectorAll("#views button,#mnav button").forEach(b=>b.setAttribute("aria-current",String(b.dataset.go===v)));
  $("#mnav button[aria-current=true]")?.scrollIntoView({block:"nearest",inline:"nearest"});
  if(v==="escritorio"){drawDesk();drawCal()}
  if(isMap)drawMap(v);
  if(v==="personajes"){const pu=$("#pane-unknown");if(pu)pu.hidden=appMode!=="partida";if(appMode==="partida")drawUnknown();drawFaces()}
  if(v==="diario")drawBook(); if(v==="planes")drawPlans(); if(v==="bio")drawBio(); if(v==="rel")drawRel();
  if(v==="glosario")drawGlossaryMundo(); if(v==="mecanicas")drawMecanicas(); if(v==="titulos")drawTitulos();
  try{
    const h="#"+appMode+"/"+v;
    if(location.hash!==h){
      if(replaceHash)history.replaceState(history.state,"",h);
      else location.hash=h;
    }
  }catch(e){}
}
/* Hash → {mode, view}. Admite los hashes antiguos (#mapa, #caras, #palacio…). */
function parseHash(){
  const h=location.hash.slice(1);
  if(!h||h==="portada")return {mode:null,view:null};
  const alias={mapa:"palacio",caras:"personajes"};
  const [a,b]=h.split("/");
  if(a==="mundo"||a==="partida")return {mode:a,view:alias[b]||b||null};
  const v=alias[a]||a;
  if(["palacio","dominio","francia","personajes","titulos","glosario","mecanicas"].includes(v))return {mode:"mundo",view:v};
  if(VIEWS_PARTIDA.some(([id])=>id===v))return {mode:"partida",view:v};
  return {mode:null,view:null};
}
function buildNav(){for(const id of ["#views","#mnav"]){const n=$(id);n.innerHTML="";activeViews().forEach(([k,t])=>n.append(el("button",{"data-go":k,onclick:()=>{go(k);window.scrollTo(0,0)}},t)))}}
function show(v,targetView=null){
  if((v==="game"||v==="selector")&&!epoca)v="epocas";
  if(v==="game"&&!player)v="selector";
  $("#ficha").hidden=true; closeLectern(); closeMenu();
  const enJuego=v==="game"||v==="mundo";
  $("#portada").hidden=v!=="portada"; $("#epocas").hidden=v!=="epocas"; $("#selector").hidden=v!=="selector"; $("#game").hidden=!enJuego; $("#mnav").hidden=!enJuego;
  if(epoca){hoy=D(store.get("vg_fecha",epoca.fecha));calMes=new Date(Date.UTC(hoy.getUTCFullYear(),hoy.getUTCMonth(),1))}
  if(v==="portada"){
    delete document.body.dataset.mode;
    $("#portada-partida-st").textContent=player?"En curso: "+player.nombre+(epoca?" · "+epoca.año:""):"";
    try{if(location.hash)history.replaceState(history.state,"",location.pathname+location.search)}catch(e){}
    window.scrollTo(0,0);return;
  }
  if(v==="mundo"){
    appMode="mundo"; document.body.dataset.mode="mundo";
    $("#bar-mundo").hidden=false; $("#bar-partida").hidden=true;
    buildNav(); go(targetView||"palacio",true);
    window.scrollTo(0,0);return;
  }
  appMode="partida";
  if(v==="epocas"){buildEras();window.scrollTo(0,0);return}
  if(v==="selector"){$("#sel-label").textContent="Versalles · "+MESES[hoy.getUTCMonth()]+" de "+hoy.getUTCFullYear();$("#sel-sub").textContent=epoca.ev}
  if(v==="game"){
    document.body.dataset.mode="partida";
    $("#bar-mundo").hidden=true; $("#bar-partida").hidden=false;
    buildBar();buildNav();drawObjetos();go(targetView||"escritorio",true);
  } else buildSelector();
  window.scrollTo(0,0);
}
/* Entrar en un modo desde portada, botones o hash. */
function entrar(modo,vista=null){
  if(modo==="mundo")return show("mundo",vista);
  show(!epoca?"epocas":!player?"selector":"game",vista);
}
window.addEventListener("hashchange",()=>{
  const h=parseHash(), enJuego=!$("#game").hidden;
  if(!h.mode){if(enJuego)show("portada");return}
  if(enJuego&&h.mode===appMode){if(h.view&&h.view!==current)go(h.view,true);return}
  entrar(h.mode,h.view);
});
$("#btn-entrar-mundo").onclick=()=>entrar("mundo");
$("#btn-entrar-partida").onclick=()=>entrar("partida");
$("#b-ir-mundo").onclick=()=>entrar("mundo");
$("#b-mundo-partida").onclick=()=>entrar("partida");
for(const id of ["#b-back","#b-mundo-portada","#b-epocas-portada","#b-sel-portada"])$(id).onclick=()=>show("portada");
$("#b-mundo-edicion").onclick=()=>openMenu("edicion");
$("#q").addEventListener("input",drawFaces); $("#f-pres").addEventListener("change",drawFaces); $("#f-casa")?.addEventListener("change",drawFaces);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){$("#ficha").hidden=true;closeLectern();closeMenu()}});
{const h0=parseHash(); if(h0.mode)entrar(h0.mode,h0.view); else show("portada");}
