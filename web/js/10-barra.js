/* ---------- Barra ---------- */
/* Indicadores (1–5). Personaje de la corte: de su ficha. Recién llegado: de su destino y su cuna. */
function indicadores(p){
  const k=(v,a,b)=>Math.max(a,Math.min(b,Math.round(v)));
  if(p?.existente){const c=(LIBRO||[]).find(x=>x.id===p.existente);
    if(c)return [["Favor real",k(c.favor||1,1,5)],["Dinero",k(Math.ceil((c.riqueza||2)/2),1,5)],["Reputación",k(1+Math.floor((c.rango||0)/25),1,5)],["Salud",k((c.cualidades||{}).constitucion||3,1,5)]]}
  const d=p?.destino;
  if(d)return [["Favor real",1],["Dinero",{ruina:1,arruinada_law:1,menos:2,holgada:3,rica:4,enriquecida_law:4}[d.dinero]||2],
    ["Reputación",{espada:2,toga:2,nuevo:1,burguesia:1,pueblo:1}[p.cuna]||1],["Salud",4]];
  return [["Favor real",1],["Dinero",2],["Reputación",2],["Salud",4]];
}
function buildBar(){
  const p=player||EJEMPLO;
  $("#who").innerHTML=""; $("#who").append(p.nombre," ",el("small",{},posName(p)));
  const pr=$("#portrait"), src=store.get("vg_retrato",null)||(p.existente&&RETR[p.existente])||null; pr.innerHTML="";
  pr.append(src?el("img",{src,alt:""}):bust());
  $("#fecha").textContent=fmtFr(hoy)+" · "+(epoca.lugar||"Versalles");
  const c=$("#clock"); c.innerHTML=""; JORNADA.forEach((j,i)=>c.append(el("span",{class:i===4?"now":null},j)));
  const g=$("#gauges"); g.innerHTML="";
  indicadores(p).forEach(([n,v])=>{const pips=el("span",{class:"pips","aria-label":n+": "+v+" de 5"});for(let i=0;i<5;i++)pips.append(el("i",{class:i<v?"on":null}));g.append(el("span",{class:"gauge"},n,pips))});
}

/* Retrato: se recorta a 180×225 y se guarda como JPEG ligero dentro de la partida. */
$("#portrait").onclick=()=>$("#portrait-file").click();
$("#portrait-file").onchange=async e=>{
  const f=e.target.files[0]; e.target.value=""; if(!f)return;
  try{
    const img=new Image(); img.src=URL.createObjectURL(f); await img.decode();
    const W=180,H=225,c=document.createElement("canvas"); c.width=W;c.height=H;
    const r=Math.max(W/img.width,H/img.height), w=img.width*r, h=img.height*r;
    c.getContext("2d").drawImage(img,(W-w)/2,(H-h)/2*0.6,w,h);
    store.set("vg_retrato",c.toDataURL("image/jpeg",0.82)); URL.revokeObjectURL(img.src); buildBar();
  }catch(err){}
};
