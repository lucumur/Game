/* ---------- Caras ---------- */
const PRES={reside:"Reside en el palacio",frecuenta:"Frecuenta la corte",ocasional:"Visitas ocasionales",ausente:"Fuera de Versalles","por verificar":"Presencia sin confirmar"};
function bust(){
  const NS="http://www.w3.org/2000/svg", s=document.createElementNS(NS,"svg"); s.setAttribute("viewBox","0 0 76 92"); s.setAttribute("aria-hidden","true");
  s.innerHTML='<ellipse class="bust-frame" cx="38" cy="46" rx="35" ry="43"/><circle class="bust" cx="38" cy="36" r="13"/><path class="bust" d="M14 80c2-16 12-24 24-24s22 8 24 24z"/><path class="bust" d="M25 30c2-12 24-12 26 0 0-8-6-14-13-14s-13 6-13 14z" opacity=".6"/>';
  return s;
}
let guesses=store.get("vg_guess",{});
function drawUnknown(){
  const b=$("#unknown"); b.innerHTML="";
  const vivos=PERSONAJES.filter(p=>p.presencia_versalles!=="ausente").sort((a,b)=>a.nombre.localeCompare(b.nombre));
  DESCONOCIDOS.forEach(u=>{
    const sel=el("select",{id:"g-"+u.id,"aria-label":"¿Quién es?"},el("option",{value:""},"¿Quién es?"),...vivos.map(p=>el("option",{value:p.id},p.nombre)),el("option",{value:"otro"},"Alguien que no conozco"));
    sel.value=guesses[u.id]||"";
    const st=el("span",{class:"state "+(guesses[u.id]?"guess":"unk")},guesses[u.id]?"Conjetura":"Sin nombre");
    sel.onchange=()=>{guesses[u.id]=sel.value;if(!sel.value)delete guesses[u.id];store.set("vg_guess",guesses);drawUnknown()};
    b.append(el("div",{class:"plate"},bust(),el("span",{class:"tt"},u.desc),el("span",{class:"tt"},"Visto en: "+u.donde),sel,st));
  });
  const n=Object.keys(guesses).length;
  $("#guess-count").textContent=n+" conjetura"+(n===1?"":"s")+" pendiente"+(n===1?"":"s")+(n>=3?" · ya hay suficientes para pedir confirmación al narrador":" · faltan "+(3-n%3)+" para la próxima confirmación");
}
let LIBRO=null,RETR={};
const libroDe=id=>LIBRO&&LIBRO.find(c=>c.escritorio_id===id);
function retratoEl(c){const s=RETR[c.id];if(!s)return bust();const i=el("img",{class:"pt",alt:"Retrato de "+(c.nombre_nac||c.nombre)});i.src=s;return i}
function drawFaces(){
  if(LIBRO&&LIBRO.length)return drawFacesLibro();
  const q=$("#q").value.trim().toLowerCase(), fp=$("#f-pres").value;
  const list=PERSONAJES.filter(p=>(!fp||p.presencia_versalles===fp)&&(!q||(p.nombre+" "+p.titulo).toLowerCase().includes(q)));
  $("#faces-count").textContent=list.length+" de "+PERSONAJES.length+" personas";
  const b=$("#faces"); b.innerHTML="";
  const ramas={}; list.forEach(p=>(ramas[p.rama.split(" / ")[0]] ||= []).push(p));
  for(const[r,ps]of Object.entries(ramas)){
    const g=el("div",{class:"plates"});
    ps.forEach(p=>g.append(el("button",{class:"plate"+(p.presencia_versalles==="ausente"?" away":""),onclick:()=>openFicha(p)},bust(),el("span",{class:"nm"},p.nombre),el("span",{class:"tt"},p.titulo),el("span",{class:"state ok"},"Identificado"))));
    b.append(el("div",{class:"rama"},el("h3",{},"Casa de "+r.replace("Real","Francia")),g));
  }
  if(!list.length)b.append(el("p",{class:"note"},"Nadie coincide con la búsqueda."));
}
function drawFacesLibro(){
  const q=$("#q").value.trim().toLowerCase();
  $("#f-pres").hidden=true;
  const list=LIBRO.filter(c=>!q||[c.nombre,c.nombre_nac,(c.apodos||[]).join(" "),c.titulo_nob,c.puesto].join(" ").toLowerCase().includes(q));
  $("#faces-count").textContent=list.length+" de "+LIBRO.length+" personas";
  const b=$("#faces"); b.innerHTML="";
  const grupos={}; list.forEach(c=>(grupos[c.faccion||"Sin facción"] ||= []).push(c));
  for(const[g,cs]of Object.entries(grupos)){
    const box=el("div",{class:"plates"});
    cs.forEach(c=>box.append(el("button",{class:"plate",onclick:()=>openFichaL(c)},retratoEl(c),el("span",{class:"nm"},c.nombre_nac||c.nombre),el("span",{class:"tt"},c.titulo_nob||c.titulo||""),el("span",{class:"tt"},c.puesto||c.cargo||""))));
    b.append(el("div",{class:"rama"},el("h3",{},g),box));
  }
  if(!list.length)b.append(el("p",{class:"note"},"Nadie coincide con la búsqueda."));
}
function openFichaL(c){
  const f=$("#ficha"); f.innerHTML="";
  const key=c.escritorio_id||c.id, notas=store.get("vg_notas",{});
  const ta=el("textarea",{id:"nota-"+key,placeholder:"Lo que piensas de esta persona. Solo tú lo ves."}); ta.value=notas[key]||"";
  ta.addEventListener("input",()=>{const n=store.get("vg_notas",{});n[key]=ta.value;store.set("vg_notas",n)});
  const dl=el("dl",{});
  [["Título",c.titulo_nob||c.titulo],["Puesto",c.puesto||c.cargo],["Nació",c.nacimiento],["Edad",c.edad?c.edad+" años":""],["Casa",c.casa],["Cónyuge",c.conyuge],["Facción",c.faccion],["Dónde vive",c.ubicacion],["Con el rey",c.relacion_rey]]
    .forEach(([k,v])=>{if(v&&v!=="—")dl.append(el("dt",{},k),el("dd",{},String(v)))});
  const nom=(c.nombre_nac||c.nombre)+((c.apodos||[]).length?" «"+c.apodos.join("» «")+"»":"");
  f.append(el("button",{class:"x","aria-label":"Cerrar",onclick:()=>{f.hidden=true}},"×"),
    el("span",{class:"label"},"Libro de caras"),retratoEl(c));
  if(OWNER&&(db||GH_OK)){ /* Solo el dueño: subir o cambiar el retrato desde la ficha */
    const msg=el("span",{class:"note","aria-live":"polite"}), inp=el("input",{type:"file",accept:"image/*",hidden:""});
    inp.onchange=async()=>{const fl=inp.files[0];inp.value="";if(!fl)return;msg.textContent="Guardando retrato…";
      try{const img=await achicarImg(fl,700);await (db||GH).doc("retratos/"+c.id).set({img});RETR[c.id]=img;openFichaL(c);try{drawFaces()}catch(e){}}
      catch(e){msg.textContent="No se pudo guardar: "+(e&&e.message||e)}};
    f.append(el("div",{class:"ficha-up"},inp,el("button",{class:"btn sm",onclick:()=>inp.click()},RETR[c.id]?"Cambiar retrato":"Subir retrato"),msg));
  }
  f.append(el("h2",{},nom),el("div",{class:"rule"}),dl);
  if(c.escritorio_id&&LINAJE.padres)f.append(el("span",{class:"label"},"Familia"),familyBlock(c.escritorio_id));
  f.append(el("span",{class:"label"},"Lo que sabes"),el("p",{class:"note"},"Todavía no has observado nada de esta persona."),
    el("label",{class:"label",for:"nota-"+key},"Tus notas"),ta,
    el("a",{class:"note",href:"libro.html#"+c.id,style:"color:inherit"},"Ver la ficha completa en el libro →"));
  f.hidden=false; f.querySelector(".x").focus();
}
