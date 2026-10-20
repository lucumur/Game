/* ---------- Linaje (CK-style) ---------- */
function who(id){
  if(!id)return null;
  const c=PERSONAJES.find(x=>x.id===id); if(c)return {id,nombre:c.nombre,nac:c.nacimiento.slice(0,4),muerte:null,canon:c,nota:c.titulo};
  const r=LINAJE.referencias[id]; return r?{id,nombre:r.nombre,nac:r.nacimiento,muerte:r.muerte,canon:null,nota:r.nota}:null;
}
const parentsOf=id=>LINAJE.padres[id]||[null,null];
const byBirth=(a,b)=>(who(a)?.nac||"").localeCompare(who(b)?.nac||"");
function kin(id,role,extra){
  const w=who(id);
  if(!w)return el("span",{class:"kin empty"},role,el("small",{},"Desconocido"));
  const yrs=w.muerte?`${w.nac}–${w.muerte} †`:`n. ${w.nac}`;
  const kids=[role?el("small",{},role):"",w.nombre,el("small",{},yrs+(extra?" · "+extra:""))];
  return w.canon?el("button",{class:"kin"+(w.muerte?" dead":""),onclick:()=>openFicha(w.canon),title:w.nota},...kids)
               :el("span",{class:"kin"+(w.muerte?" dead":""),title:w.nota},...kids);
}
function familyBlock(id){
  const [f,m]=parentsOf(id);
  const [ff,fm]=parentsOf(f), [mf,mm]=parentsOf(m);
  const tree=el("div",{class:"tree"},
    el("div",{class:"trow g4"},kin(ff,"Abuelo paterno"),kin(fm,"Abuela paterna"),kin(mf,"Abuelo materno"),kin(mm,"Abuela materna")),
    el("div",{class:"trow g2"},kin(f,"Padre"),kin(m,"Madre")),
    el("div",{class:"trow me"},el("span",{class:"kin self"},who(id).nombre)));
  const out=el("div",{class:"kgroup"},tree);
  const group=(title,items)=>{if(items.length)out.append(el("span",{class:"label"},title),el("div",{class:"kgrid"},...items))};
  const cons=LINAJE.consortes.filter(c=>c.a===id||c.b===id).sort((x,y)=>x.desde.localeCompare(y.desde));
  const EST={vigente:"desde "+"{d}",prometidos:"prometidos desde {d}",viudez:"{d}–{h}",muerte:"{d}–{h}"};
  group("Consortes",cons.map(c=>kin(c.a===id?c.b:c.a,c.estado==="vigente"||c.estado==="prometidos"?(c.estado==="prometidos"?"Prometida/o":"Consorte"):"Consorte anterior",EST[c.estado].replace("{d}",c.desde).replace("{h}",c.hasta||""))));
  const sibs=Object.entries(LINAJE.padres).filter(([k,v])=>k!==id&&((f&&v[0]===f)||(m&&v[1]===m))).map(([k,v])=>[k,v[0]===f&&v[1]===m]);
  group("Hermanos",sibs.sort((a,b)=>byBirth(a[0],b[0])).map(([k,full])=>kin(k,"",full?"":"medio hermano")));
  group("Hijos",Object.entries(LINAJE.padres).filter(([k,v])=>v.includes(id)).map(([k])=>k).sort(byBirth).map(k=>kin(k)));
  group("Relaciones conocidas",LINAJE.especiales.filter(e=>e.de===id).map(e=>kin(e.a,e.tipo)));
  return out;
}

function openFicha(p){
  const L=libroDe(p.id); if(L)return openFichaL(L);
  const f=$("#ficha"); f.innerHTML="";
  const notas=store.get("vg_notas",{});
  const ta=el("textarea",{id:"nota-"+p.id,placeholder:"Lo que piensas de esta persona. Solo tú lo ves."}); ta.value=notas[p.id]||"";
  ta.addEventListener("input",()=>{const n=store.get("vg_notas",{});n[p.id]=ta.value;store.set("vg_notas",n)});
  const dl=el("dl",{});
  [["Título",p.titulo],["Edad",p.edad_jun_1722+" años (n. "+p.nacimiento.split("-").reverse().join("/")+")"],["Parentesco",p.parentesco],["Situación",p.situacion_1722||"—"],["Presencia",PRES[p.presencia_versalles]],["Notas",p.notas||"—"]].forEach(([k,v])=>dl.append(el("dt",{},k),el("dd",{},v)));
  f.append(el("button",{class:"x","aria-label":"Cerrar",onclick:()=>{f.hidden=true}},"×"),
    el("span",{class:"label"},"Libro de caras"),el("h2",{},p.nombre),el("div",{class:"rule"}),dl,
    el("span",{class:"label"},"Familia"),familyBlock(p.id),
    el("span",{class:"label"},"Lo que sabes"),el("p",{class:"note"},"Todavía no has observado nada de esta persona."),
    el("label",{class:"label",for:"nota-"+p.id},"Tus notas"),ta,
    el("span",{class:p.verificacion==="verificado"?"tag":"tag ej"},p.verificacion==="verificado"?"Datos verificados":"Datos por verificar"));
  f.hidden=false; f.querySelector(".x").focus();
}
