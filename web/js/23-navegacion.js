/* ---------- Navegación ---------- */
const VIEWS=[["escritorio","Escritorio"],["mapa","Mapa"],["caras","Caras"],["diario","Diario"],["planes","Planes"],["bio","Biografía"],["rel","Relaciones"]];
let current="escritorio";
function go(v){
  current=v;
  document.querySelectorAll("[data-view]").forEach(s=>s.hidden=s.dataset.view!==v);
  document.querySelectorAll("#views button,#mnav button").forEach(b=>b.setAttribute("aria-current",String(b.dataset.go===v)));
  if(v==="escritorio"){drawDesk();drawCal()} if(v==="mapa")drawMap(document.querySelector("#map-tabs [aria-selected=true]").dataset.map);
  if(v==="caras"){drawUnknown();drawFaces()} if(v==="diario")drawBook(); if(v==="planes")drawPlans(); if(v==="bio")drawBio(); if(v==="rel")drawRel();
  try{location.hash=v}catch(e){}
}
function buildNav(){for(const id of ["#views","#mnav"]){const n=$(id);n.innerHTML="";VIEWS.forEach(([k,t])=>n.append(el("button",{"data-go":k,onclick:()=>{go(k);window.scrollTo(0,0)}},t)))}}
function show(v){
  if(!epoca&&v!=="epocas")v="epocas";
  $("#epocas").hidden=v!=="epocas"; $("#selector").hidden=v!=="selector"; $("#game").hidden=v!=="game"; $("#mnav").hidden=v!=="game";
  if(epoca){hoy=D(store.get("vg_fecha",epoca.fecha));calMes=new Date(Date.UTC(hoy.getUTCFullYear(),hoy.getUTCMonth(),1))}
  if(v==="epocas"){buildEras();window.scrollTo(0,0);return}
  if(v==="selector"){$("#sel-label").textContent="Versalles · "+MESES[hoy.getUTCMonth()]+" de "+hoy.getUTCFullYear();$("#sel-sub").textContent=epoca.ev}
  if(v==="game"){buildBar();buildNav();drawObjetos();const h=(location.hash||"").slice(1);go(VIEWS.some(x=>x[0]===h)?h:"escritorio")} else buildSelector();
  window.scrollTo(0,0);
}
$("#map-tabs").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;[...e.currentTarget.children].forEach(x=>x.setAttribute("aria-selected",String(x===b)));drawMap(b.dataset.map)});
$("#q").addEventListener("input",drawFaces); $("#f-pres").addEventListener("change",drawFaces);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){$("#ficha").hidden=true;closeLectern();closeMenu()}});
show(player?"game":"selector");
