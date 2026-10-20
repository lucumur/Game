/* ---------- Partidas: guardar, cargar, exportar ---------- */
const KEYS=["vg_retrato","vg_epoca","vg_player","vg_docs","vg_notas","vg_guess","vg_planes","vg_diario","vg_glosario","vg_fecha"];
let db=null, downloads=null, sesion=store.get("vg_sesion",null);
const ready=(async()=>{try{if(window.claude?.use){[db,downloads]=await Promise.all([claude.use("db").catch(()=>null),claude.use("downloads").catch(()=>null)])}}catch(e){}})();
ready.then(()=>{if(!db)return;
  const redraw=()=>{try{drawFaces()}catch(e){};try{if(!$("#selector").hidden&&modo==="existente")renderExistentes();if(!$("#game").hidden&&player?.existente)buildBar()}catch(e){}};
  db.collection("personajes").onSnapshot(s=>{LIBRO=s.docs.filter(d=>d.exists).map(d=>({id:d.id,...d.data()})).sort((a,b)=>(a.orden||0)-(b.orden||0));redraw()},()=>{});
  db.collection("estancias").onSnapshot(s=>{ESTANCIAS={};s.docs.forEach(d=>{if(d.exists){const v=d.data();if(v&&v.img)ESTANCIAS[d.id]=v.img}});
    if(mapSel&&mapSel.id&&document.querySelector(".zone.sel"))showRoom(mapSel.id,mapSel.n,mapSel.d)},()=>{});
  claude.use("user").then(async u=>{try{OWNER=!!(u&&await u.isOwner())}catch(e){OWNER=false}
    if(OWNER&&mapSel&&mapSel.id&&document.querySelector(".zone.sel"))showRoom(mapSel.id,mapSel.n,mapSel.d)}).catch(()=>{});
  db.collection("ocupantes").onSnapshot(s=>{OCUP_DB={};s.docs.forEach(d=>{if(d.exists)OCUP_DB[d.id]=d.data()});
    const v=document.querySelector('.view[data-view="mapa"]');if(v&&!v.hidden&&document.querySelector('#map-tabs [aria-selected=true]').dataset.map==="palacio"){const keep=mapSel&&mapSel.id;drawMap("palacio");if(keep)goRoom(keep)}},()=>{});
  db.collection("retratos").onSnapshot(s=>{RETR={};s.docs.forEach(d=>{if(d.exists){const v=d.data();if(v&&v.img)RETR[d.id]=v.img}});redraw()},()=>{});
});
function snapshot(){const o={};KEYS.forEach(k=>o[k]=store.get(k,null));
  o.vg_epoca=epoca?.id||null;o.vg_player=player;o.vg_docs=deskState;o.vg_guess=guesses;o.vg_planes=planes;o.vg_glosario=[...unlocked];return o}
function restore(o){
  KEYS.forEach(k=>store.set(k,o[k]));
  epoca=EPOCAS.find(e=>e.id===o.vg_epoca)||null; player=o.vg_player||null; deskState=o.vg_docs||{}; guesses=o.vg_guess||{};
  planes=o.vg_planes||[PLAN_EJEMPLO]; unlocked=new Set(o.vg_glosario||[]);
}
function defaultName(){return (player||EJEMPLO).nombre.split(" ").slice(-1)[0]+" · "+(epoca?.año||"")}
async function listSaves(){
  await ready;
  if(db){try{const q=await db.collection("partidas").orderBy("guardado","desc").limit(50).get();return q.docs.map(d=>({id:d.id,...d.data()}))}catch(e){setStatus("No se pudo leer la lista de partidas ("+(e.code||"error")+").");return []}}
  return store.get("vg_partidas",[]);
}
function setStatus(t){$("#p-status").textContent=t}
async function saveSession(){
  await ready;
  const id=sesion||("p"+Date.now().toString(36));
  const doc={nombre:$("#p-nombre").value.trim()||defaultName(),epoca:epoca?.id||null,personaje:(player||EJEMPLO).nombre,fecha_juego:iso(hoy),guardado:new Date().toISOString(),estado:snapshot()};
  try{
    if(db)await db.collection("partidas").doc(id).set(doc);
    else{const l=store.get("vg_partidas",[]).filter(s=>s.id!==id);l.unshift({id,...doc});store.set("vg_partidas",l)}
    sesion=id;store.set("vg_sesion",id);setStatus("Guardada: "+doc.nombre+(db?" · en tu cuenta":" · solo en este navegador"));drawSaves();
  }catch(e){setStatus(e.code==="quota_exceeded"?"No queda espacio para más partidas: borra alguna antigua y vuelve a guardar.":e.code==="not_granted"?"Sin permiso para guardar en tu cuenta. Revisa los permisos del artifact.":"No se pudo guardar ("+(e.code||e.message)+").")}
}
async function drawSaves(){
  const ul=$("#p-list"); ul.innerHTML=""; const list=await listSaves();
  if(!list.length){ul.append(el("li",{class:"note"},"Aún no hay partidas guardadas."));return}
  list.forEach(s=>{
    const ep=EPOCAS.find(e=>e.id===s.epoca), when=new Date(s.guardado);
    const del=el("button",{class:"btn sm danger",onclick:async()=>{
      if(del.dataset.armed!=="1"){del.dataset.armed="1";del.textContent="¿Borrar?";return}
      try{if(db)await db.collection("partidas").doc(s.id).delete();else store.set("vg_partidas",store.get("vg_partidas",[]).filter(x=>x.id!==s.id));if(sesion===s.id){sesion=null;store.set("vg_sesion",null)}drawSaves()}catch(e){setStatus("No se pudo borrar ("+(e.code||e.message)+").")}
    }},"Borrar");
    ul.append(el("li",{class:"save"+(s.id===sesion?" cur":"")},el("b",{},s.nombre),
      el("span",{class:"meta"},(ep?ep.año+" · ":"")+s.personaje+" · día "+s.fecha_juego.split("-").reverse().join("/")+" · guardada el "+when.toLocaleDateString("es")+" "+when.toLocaleTimeString("es",{hour:"2-digit",minute:"2-digit"})),
      el("span",{class:"acts"},el("button",{class:"btn sm",onclick:()=>{restore(s.estado);sesion=s.id;store.set("vg_sesion",s.id);closeMenu();show(epoca?(player?"game":"selector"):"epocas")}},"Cargar"),del)));
  });
}
function openMenu(){$("#p-nombre").value=defaultName();setStatus(db?"Las partidas se guardan en tu cuenta de Claude.":"Las partidas se guardan en este navegador.");$("#partida").hidden=false;drawSaves();$("#p-save").focus()}
function closeMenu(){$("#partida").hidden=true}
$("#b-partida").onclick=openMenu; $("#p-close").onclick=closeMenu; $("#p-save").onclick=saveSession;
$("#partida").addEventListener("click",e=>{if(e.target.id==="partida")closeMenu()});
$("#b-back").onclick=()=>show("epocas");
$("#p-epocas").onclick=()=>{closeMenu();show("epocas")};
$("#p-perso").onclick=()=>{closeMenu();show("selector")};
$("#p-new").onclick=e=>{const b=e.currentTarget;if(b.dataset.armed!=="1"){b.dataset.armed="1";b.textContent="¿Empezar de cero? Lo no guardado se pierde";return}
  b.dataset.armed="";b.textContent="Nueva partida";restore({});sesion=null;store.set("vg_sesion",null);closeMenu();show("epocas")};
$("#p-export").onclick=async()=>{
  await ready; const data=JSON.stringify({formato:"versalles-partida",version:1,nombre:$("#p-nombre").value.trim()||defaultName(),estado:snapshot()},null,1);
  if(!downloads){setStatus("Exportar no está disponible en esta vista.");return}
  try{const r=await downloads.save({filename:"versalles-"+defaultName().replace(/[^\w]+/g,"-")+".json",data});setStatus(r==="saved"||r?.status==="saved"?"Archivo exportado.":"Exportación cancelada.")}catch(e){setStatus("No se pudo exportar ("+(e.code||e.message)+").")}
};
$("#p-import").onchange=async e=>{const f=e.target.files[0];if(!f)return;
  try{const o=JSON.parse(await f.text());if(o.formato!=="versalles-partida")throw new Error("no es un archivo de partida");restore(o.estado);sesion=null;store.set("vg_sesion",null);closeMenu();show(epoca?(player?"game":"selector"):"epocas")}
  catch(err){setStatus("No se pudo importar: "+err.message)} e.target.value=""};
