/* ---------- Escritorio ---------- */
const KIND={carta:"Carta",rumor:"Chisme",aviso:"Aviso de palacio",oblig:"Obligación",gazette:"Gaceta",plan:"Plan"};
const FILTROS=[["rumor","Chismes"],["aviso","Avisos"],["gazette","Gacetas"],["carta","Cartas"],["oblig","Obligaciones"]];
let deskState=store.get("vg_docs",{}); // id -> {x,y,r,z,arch}
let filtro=new Set(FILTROS.map(f=>f[0]));
let zTop=10;
function docState(d,i){
  if(!deskState[d.id]){const cols=4;deskState[d.id]={x:1.5+(i%cols)*23+Math.random()*2,y:3+Math.floor(i/cols)*31+Math.random()*3,r:(Math.random()*6-3).toFixed(1),z:i+1,arch:false}}
  return deskState[d.id];
}
function saveDesk(){store.set("vg_docs",deskState)}
/* Nube de cómic: elipse de arcos hacia fuera + dos burbujas de pensamiento. */
function cloudSVG(seed){
  const svgNS="http://www.w3.org/2000/svg", s=document.createElementNS(svgNS,"svg");
  s.setAttribute("class","cloud"); s.setAttribute("viewBox","0 0 200 130"); s.setAttribute("preserveAspectRatio","none"); s.setAttribute("aria-hidden","true");
  const N=12, cx=100, cy=56, rx=95, ry=53; let rnd=seed; const r=()=>(rnd=(rnd*9301+49297)%233280)/233280;
  const pts=[...Array(N)].map((_,i)=>{const a=i/N*2*Math.PI+0.3;return [cx+rx*Math.cos(a),cy+ry*Math.sin(a)]});
  let d=`M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  pts.forEach((p,i)=>{const q=pts[(i+1)%N], dist=Math.hypot(q[0]-p[0],q[1]-p[1]), rad=(dist*(0.55+r()*0.12)).toFixed(1);d+=` A${rad} ${rad} 0 0 1 ${q[0].toFixed(1)} ${q[1].toFixed(1)}`});
  const path=document.createElementNS(svgNS,"path"); path.setAttribute("d",d+"Z"); s.append(path);
  [[38,114,7],[24,126,4]].forEach(([x,y,rr])=>{const c=document.createElementNS(svgNS,"circle");c.setAttribute("cx",x);c.setAttribute("cy",y);c.setAttribute("r",rr);s.append(c)});
  return s;
}
function plainText(t){return t.replace(/\[\[[\w-]+\|([^\]]+)\]\]/g,"$1").replace(/\[\[([\w-]+)\]\]/g,(m,id)=>glById[id]?.termino||id)}
function drawDesk(){
  const desk=$("#desk"); desk.querySelectorAll(".doc").forEach(n=>n.remove());
  DOCS.forEach((d,i)=>{
    const s=docState(d,i); if(s.arch||!filtro.has(d.tipo))return;
    zTop=Math.max(zTop,s.z);
    const card=el("div",{class:"doc "+d.tipo+(d.impresa?" impresa":"")+(d.urg?" urg":""),tabindex:0,role:"button","aria-label":KIND[d.tipo]+": "+d.tit},
      d.tipo==="rumor"?cloudSVG(i*37+11):null,
      el("span",{class:"k"},d.tipo==="gazette"?(d.impresa?"Gaceta impresa":"Gaceta manuscrita"):d.tipo==="aviso"?d.formula||"Avis":KIND[d.tipo]),el("b",{},d.tit),el("span",{class:"from"},d.de));
    card.style.left=s.x+"%"; card.style.top=s.y+"%"; card.style.transform=`rotate(${s.r}deg)`; card.style.zIndex=s.z;
    let drag=null;
    card.addEventListener("pointerdown",e=>{
      if(matchMedia("(max-width:640px)").matches)return;
      const r=desk.getBoundingClientRect(), c=card.getBoundingClientRect();
      drag={dx:e.clientX-c.left,dy:e.clientY-c.top,r,moved:false,sx:e.clientX,sy:e.clientY};
      card.setPointerCapture(e.pointerId); s.z=++zTop; card.style.zIndex=s.z;
    });
    card.addEventListener("pointermove",e=>{
      if(!drag)return;
      if(Math.abs(e.clientX-drag.sx)+Math.abs(e.clientY-drag.sy)>5)drag.moved=true;
      if(!drag.moved)return;
      const x=Math.min(Math.max(e.clientX-drag.r.left-drag.dx,0),drag.r.width-card.offsetWidth);
      const y=Math.min(Math.max(e.clientY-drag.r.top-drag.dy,0),drag.r.height-card.offsetHeight);
      s.x=x/drag.r.width*100; s.y=y/drag.r.height*100; card.style.left=s.x+"%"; card.style.top=s.y+"%";
    });
    card.addEventListener("pointerup",()=>{const m=drag?.moved;drag=null;saveDesk();if(!m)openDoc(d)});
    card.addEventListener("click",e=>{if(matchMedia("(max-width:640px)").matches)openDoc(d)});
    card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openDoc(d)}});
    desk.append(card);
  });
  drawFilters(); drawArchive();
}
function drawFilters(){
  const f=$("#filters"); f.innerHTML="";
  FILTROS.forEach(([t,label])=>{
    const n=DOCS.filter(d=>d.tipo===t&&!docState(d,0).arch).length;
    f.append(el("button",{"aria-pressed":String(filtro.has(t)),onclick:()=>{filtro.has(t)?filtro.delete(t):filtro.add(t);drawDesk()}},label+" · "+n));
  });
}
function drawArchive(){
  const a=$("#archivo"); a.innerHTML="";
  const arch=DOCS.filter(d=>deskState[d.id]?.arch);
  if(!arch.length){a.append(el("li",{class:"note",style:"list-style:none;margin-left:-1.1rem"},"Nada archivado todavía."));return}
  arch.forEach(d=>a.append(el("li",{},el("button",{onclick:()=>openDoc(d)},d.tit))));
}
function closeLectern(){$("#lectern").hidden=true}
function openDoc(d){
  const L=$("#lectern"); L.innerHTML="";
  const s=deskState[d.id];
  const acts=el("div",{class:"acts"},
    s.arch?el("button",{class:"btn primary",onclick:()=>{s.arch=false;saveDesk();closeLectern();drawDesk()}},"Devolver al escritorio")
          :el("button",{class:"btn primary",onclick:()=>{s.arch=true;saveDesk();closeLectern();drawDesk()}},"Archivar"),
    el("button",{class:"btn",onclick:closeLectern},"Cerrar"));
  let sheet;
  if(d.tipo==="gazette"){
    const cols=el("div",{class:"gz-cols"});
    d.arts.forEach(a=>cols.append(el("article",{class:"gz-art"},el("span",{class:"where"},a.where),el("h3",{},a.h),el("p",{},a.t))));
    sheet=el("article",{class:"letter",role:"dialog","aria-label":d.tit},
      el("header",{class:"gz-mast"},el("span",{class:"k"},d.impresa?"Gaceta impresa · con privilegio del rey":"Gaceta manuscrita · circula de mano en mano"),el("h2",{},d.tit),el("span",{class:"k"},d.de)),cols,acts);
    if(!d.impresa)unlock("nouvelles");
  } else {
    sheet=el("article",{class:"letter "+d.tipo,role:"dialog","aria-label":d.tit},
      d.sello?el("span",{class:"seal","aria-hidden":"true"},d.sello):null,
      d.formula?el("span",{class:"formula"},d.formula):null,
      el("span",{class:"k"},(d.tipo==="rumor"?"Se dice que…":KIND[d.tipo])+" · "+d.de),el("h2",{},d.tit),el("p",{class:"body"},rich(d.txt)),
      d.firma?el("span",{class:"sign"},d.firma):null,acts);
  }
  L.append(sheet); L.hidden=false; sheet.querySelector(".acts .btn").focus();
}
$("#lectern").addEventListener("click",e=>{if(e.target.id==="lectern")closeLectern()});
function drawObjetos(){const b=$("#objetos");b.innerHTML="";OBJETOS.forEach(([n,c,d])=>b.append(el("div",{class:"obj"},el("span",{},n),el("span",{class:"note"},c),el("span",{class:"d"},d))))}
