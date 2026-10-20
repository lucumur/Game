/* ---------- Diario y glosario ---------- */
let glCat="Todas";
function drawBook(){
  const b=$("#book"); b.innerHTML="";
  const mine=store.get("vg_diario",[]);
  [...DIARIO.map(e=>({...e,mine:false})),...mine.map(e=>({...e,mine:true}))].forEach(e=>
    b.append(el("div",{class:"entry"+(e.mine?" mine":"")},el("span",{class:"d"},e.d),el("p",{},rich(e.t)))));
  const ta=el("textarea",{id:"diario-nuevo",placeholder:"Escribe en tu diario…"});
  const add=el("button",{class:"btn sm",style:"border-color:var(--sheet-ink);color:var(--sheet-ink)",onclick:()=>{const t=ta.value.trim();if(!t)return;mine.push({d:"Nota de "+(player||EJEMPLO).nombre.split(" ")[0],t});store.set("vg_diario",mine);drawBook()}},"Añadir al diario");
  b.append(el("div",{class:"write",style:"display:grid;gap:6px"},ta,add));
  drawGlossary();
}
function drawGlossary(hl){
  const cats=["Todas",...new Set(GLOSARIO.map(g=>g.cat))];
  const t=$("#gl-tabs"); t.innerHTML="";
  cats.forEach(c=>t.append(el("button",{role:"tab","aria-selected":String(c===glCat),onclick:()=>{glCat=c;drawGlossary()}},c)));
  const box=$("#glossary"); box.innerHTML="";
  const items=GLOSARIO.filter(g=>glCat==="Todas"||g.cat===glCat).sort((a,b)=>(unlocked.has(b.id)-unlocked.has(a.id))||a.termino.localeCompare(b.termino));
  items.forEach(g=>{
    const open=unlocked.has(g.id);
    box.append(el("div",{class:"gl-item"+(open?"":" locked")+(hl===g.id?" hl":""),id:"gl-"+g.id},
      el("h3",{},open?g.termino:"· · ·"),el("span",{class:"label"},g.cat),open?el("p",{},g.def):el("p",{class:"note"},"Aún no has dado con este término.")));
  });
  $("#gl-count").textContent=unlocked.size+" de "+GLOSARIO.length+" entradas";
}
function showGloss(id){glCat="Todas";drawGlossary(id);document.getElementById("gl-"+id)?.scrollIntoView({block:"center"})}
