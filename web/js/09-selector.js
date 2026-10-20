/* ---------- Selector ---------- */
function opts(sel,items){const s=$(sel);s.innerHTML="";items.forEach(([v,t])=>s.append(el("option",{value:v},t)))}
let draft=null;
function freshDraft(){const d={nombre:"",nombreManual:false,sexo:"M",proc:"provincia",region:"Languedoc",cuna:"burguesia",destino:null,pos:null};d.nombre=generarNombre(d);return d}
/* Dos entradas: un personaje real de la corte o un recién llegado. */
const RANGOS=[["sang","Du sang"],["legitime","Légitimés"],["etranger","Princes étrangers"],["epee","Épée"],["robe","Robe"],["eglise","Église"],["service","Service du Roi"],["ambassade","Ambassades"]];
const RANGO_N=Object.fromEntries(RANGOS);
const EDADES=[["m18","Menos de 18",0,17],["18","18–25",18,25],["26","26–40",26,40],["41","41–60",41,60],["61","61 o más",61,999]];
let modo=null, elegido=null; const fx={sexo:"",edad:"",rango:""};
function edadPj(c){const n=parseInt(c.edad,10);if(!isNaN(n))return n;const y=parseInt(String(c.anio).replace(/\D/g,""),10);return isNaN(y)?null:AÑO()-y}
function chipsFx(id,key,items){const box=$(id);box.innerHTML="";
  [["","Todos"],...items].forEach(([v,t])=>box.append(el("button",{type:"button","aria-pressed":String(fx[key]===v),onclick:()=>{fx[key]=v;elegido=null;chipsFx(id,key,items);renderExistentes()}},t)))}
function filtrarCorte(){const E=EDADES.find(e=>e[0]===fx.edad);
  return (LIBRO||[]).filter(c=>(!fx.sexo||c.sexo===fx.sexo)&&(!fx.rango||(c.rangos||[]).includes(fx.rango))&&(!E||((a=>a!=null&&a>=E[2]&&a<=E[3])(edadPj(c)))))}
function renderExistentes(){
  const box=$("#fx-lista"); if(!box)return; box.innerHTML="";
  if(!LIBRO){$("#fx-cuenta").textContent="Cargando la corte…";$("#b-entrar").disabled=true;return}
  const xs=filtrarCorte(); if(!xs.some(c=>c.id===elegido))elegido=null;
  $("#fx-cuenta").textContent=xs.length?xs.length+(xs.length===1?" persona":" personas")+" de la corte":"Nadie en la corte con ese perfil.";
  xs.forEach(c=>{const a=edadPj(c);box.append(el("button",{type:"button",class:"pos-opt pj","aria-pressed":String(elegido===c.id),onclick:()=>{elegido=c.id;renderExistentes()}},
    retratoEl(c),el("b",{},c.nombre),el("span",{class:"mv"},c.cargo||c.titulo||""),el("span",{class:"mv"},[a!=null?a+" años":"",(c.rangos||[]).map(r=>RANGO_N[r]).join(" · "),c.ubicacion||""].filter(Boolean).join(" · "))))});
  $("#b-entrar").disabled=!elegido;
}
function setModo(m){modo=m;
  document.querySelectorAll("#modos .modo").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.modo===m)));
  $("#modo-existente").hidden=m!=="existente"; $("#modo-nuevo").hidden=m!=="nuevo";
  $("#b-reset").hidden=!m;
  if(m==="existente"){chipsFx("#fx-sexo","sexo",[["M","Hombre"],["F","Mujer"]]);chipsFx("#fx-edad","edad",EDADES.map(e=>[e[0],e[1]]));chipsFx("#fx-rango","rango",RANGOS);renderExistentes()}
  else if(m==="nuevo")renderDestino(); else $("#b-entrar").disabled=true;
}
function entrarExistente(){const c=(LIBRO||[]).find(x=>x.id===elegido);if(!c)return;
  player={existente:c.id,nombre:c.nombre,sexo:c.sexo||"M",cargo:c.cargo||c.titulo||""};store.set("vg_player",player);show("game")}
function buildSelector(){
  document.querySelectorAll("#modos .modo").forEach(b=>b.onclick=()=>setModo(b.dataset.modo));
  draft = player&&typeof player.pos==="string" ? JSON.parse(JSON.stringify(player)) : freshDraft();
  opts("#f-cuna",CUNAS);
  const regiones=()=>draft.proc==="provincia"?PROV_DEF.filter(r=>r.tipo==="reino").map(r=>[r.nombre,r.nombre]).sort((a,b)=>a[0].localeCompare(b[0])):draft.proc==="extranjero"?EXTRANJEROS.map(e=>[e,e]):[];
  const syncRegion=()=>{const r=regiones();$("#w-region").hidden=!r.length;opts("#f-region",r);if(r.length&&!r.some(x=>x[0]===draft.region))draft.region=r[0][0];$("#f-region").value=draft.region||""};
  const renombrar=()=>{if(!draft.nombreManual){draft.nombre=generarNombre(draft);$("#f-nombre").value=draft.nombre}};
  const sync=()=>{$("#f-nombre").value=draft.nombre;$("#f-sexo").value=draft.sexo;$("#f-proc").value=draft.proc;$("#f-cuna").value=draft.cuna;syncRegion()};
  sync();
  $("#f-nombre").oninput=e=>{draft.nombre=e.target.value;draft.nombreManual=true};
  $("#b-dado").onclick=e=>{draft.nombreManual=false;renombrar();e.currentTarget.classList.remove("roll");void e.currentTarget.offsetWidth;e.currentTarget.classList.add("roll")};
  $("#f-sexo").onchange=e=>{draft.sexo=e.target.value;renombrar()};
  $("#f-proc").onchange=e=>{draft.proc=e.target.value;if(draft.proc==="paris")draft.region="";syncRegion();renombrar()};
  $("#f-region").onchange=e=>{draft.region=e.target.value;renombrar()};
  $("#f-cuna").onchange=e=>{draft.cuna=e.target.value;renombrar()};
  $("#b-tirar").onclick=()=>{if(draft.destino)return;draft.destino=tirarDestino(draft);renderDestino()};
  $("#b-reset").onclick=()=>{if(modo==="existente"){elegido=null;fx.sexo=fx.edad=fx.rango="";setModo("existente")}else{draft=freshDraft();sync();renderDestino()}};
  $("#b-entrar").onclick=()=>{if(modo==="existente")return entrarExistente();if(!draft.pos)return;draft.nombre=draft.nombre.trim()||generarNombre(draft);draft.familia=generarFamilia(draft);player=draft;store.set("vg_player",player);show("game")};
  renderDestino();
  if(player?.existente)elegido=player.existente;
  setModo(player?.existente?"existente":player?"nuevo":null);
}
function renderDestino(){
  const d=draft.destino, locked=!!d;
  document.querySelectorAll("#elegible select").forEach(x=>x.disabled=locked);
  $("#b-tirar").disabled=locked; $("#b-tirar").textContent=locked?"El destino está echado":"Echar los dados del destino";
  const f=$("#fate"); f.innerHTML="";
  if(d){
    [["Filiación",FIL_N[d.filiacion]],["Educación",EDUCACIONES[d.edu]],["Fortuna",DINERO_N[d.dinero]],["Condición",CONDICION_N[d.condicion]],["Lugar en la familia",LUGAR_N[d.lugar]],["Confesión",CONF_N[d.confesion]]]
      .forEach(([k,v])=>f.append(el("div",{class:"card"},el("span",{class:"label"},k),el("b",{},v))));
  }
  $("#step3").hidden=!locked; renderPosiciones();
}
function renderPosiciones(){
  const box=$("#pos-list"); box.innerHTML=""; if(!draft.destino){$("#b-entrar").disabled=true;return}
  const list=posibles(draft); if(!list.some(q=>q.id===draft.pos))draft.pos=null;
  const grupos={}; list.forEach(q=>(grupos[q.g] ||= []).push(q));
  for(const[g,qs]of Object.entries(grupos)){
    const o=el("div",{class:"pos-opts"});
    qs.forEach(q=>{const t=tensiones(draft,q);o.append(el("button",{type:"button",class:"pos-opt","aria-pressed":String(draft.pos===q.id),onclick:()=>{draft.pos=q.id;renderPosiciones()}},el("b",{},q.n),el("span",{class:"mv"},q.m),...t.map(w=>el("span",{class:"warn"},"⚠ "+w))))});
    box.append(el("div",{class:"pos-group"},el("h3",{},g),o));
  }
  if(!list.length)box.append(el("p",{class:"note"},"Ninguna posición encaja con este perfil. Empieza de nuevo con otra cuna o procedencia."));
  $("#b-entrar").disabled=!draft.pos;
}
