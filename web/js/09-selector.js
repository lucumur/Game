/* ---------- Selector ---------- */
function opts(sel,items){const s=$(sel);s.innerHTML="";items.forEach(([v,t])=>s.append(el("option",{value:v},t)))}
let draft=null;
function freshDraft(){const d={nombre:"",nombreManual:false,sexo:"M",proc:"provincia",region:"Languedoc",cuna:"burguesia",destino:null,pos:null};d.nombre=generarNombre(d);return d}
function buildSelector(){
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
  $("#b-reset").onclick=()=>{draft=freshDraft();sync();renderDestino()};
  $("#b-entrar").onclick=()=>{if(!draft.pos)return;draft.nombre=draft.nombre.trim()||generarNombre(draft);draft.familia=generarFamilia(draft);player=draft;store.set("vg_player",player);show("game")};
  renderDestino();
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
