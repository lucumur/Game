/* ---------- Planes ---------- */
let planes=store.get("vg_planes",null)||[PLAN_EJEMPLO];
function nameOf(id){return PERSONAJES.find(p=>p.id===id)?.nombre||"—"}
function drawPlans(){
  const b=$("#plans"); b.innerHTML="";
  planes.forEach(p=>{
    const risk=el("span",{class:"risk","aria-label":"Riesgo "+["bajo","medio","alto"][p.riesgo]});for(let i=0;i<3;i++)risk.append(el("i",{class:i<=p.riesgo?"on":null}));
    const steps=el("div",{class:"steps"},...PASOS.map((s,i)=>el("span",{class:"step"+(i<p.paso?" done":"")},el("i",{}),s)));
    const dl=el("dl",{});
    [["Objetivo",p.obj?nameOf(p.obj):"—"],["Meta",p.meta||"—"],["Cómplices",p.cons.length?p.cons.map(nameOf).join(", "):"Ninguno"],["Medios",p.medios.length?p.medios.join(", "):"Ninguno"]].forEach(([k,v])=>dl.append(el("dt",{},k),el("dd",{},v)));
    dl.append(el("dt",{},"Riesgo"),el("dd",{},risk," ",el("span",{class:"note",style:"color:var(--sheet-muted)"},"tu estimación")));
    b.append(el("article",{class:"scheme"},
      el("span",{class:"label",style:"color:var(--sheet-muted)"},p.tipo+(p.ejemplo?" · ejemplo":"")),el("h3",{},p.meta||p.tipo),dl,steps,
      el("span",{class:"note",style:"color:var(--sheet-muted)"},"El avance lo marca el narrador según lo que ocurra en la partida."),
      el("div",{style:"display:flex;justify-content:flex-end"},el("button",{class:"btn sm",style:"border-color:var(--sheet-ink);color:var(--sheet-ink)",onclick:()=>{planes=planes.filter(x=>x!==p);store.set("vg_planes",planes);drawPlans()}},"Abandonar"))));
  });
  if(!planes.length)b.append(el("p",{class:"note"},"No tienes planes en marcha. Crea uno con «Nuevo plan»."));
}
function newPlanForm(){
  const f=$("#new-plan"); f.innerHTML="";
  const tipo=el("select",{id:"np-tipo"},...TIPOS_PLAN.map(t=>el("option",{},t)));
  const obj=el("select",{id:"np-obj"},el("option",{value:""},"Sin objetivo concreto"),...PERSONAJES.map(p=>el("option",{value:p.id},p.nombre)));
  const meta=el("input",{id:"np-meta",placeholder:"Qué quieres conseguir"});
  const riesgo=el("select",{id:"np-riesgo"},el("option",{value:0},"Bajo"),el("option",{value:1},"Medio"),el("option",{value:2},"Alto"));
  const medios=el("div",{class:"chips"},...OBJETOS.map(([n],i)=>el("label",{},el("input",{type:"checkbox",value:n,id:"np-m"+i}),n)));
  const cons=el("select",{id:"np-cons",multiple:"",size:4},...PERSONAJES.filter(p=>p.presencia_versalles!=="ausente").map(p=>el("option",{value:p.id},p.nombre)));
  f.append(el("div",{class:"pane-h"},el("h2",{},"Nuevo plan")),
    el("div",{class:"row"},el("div",{class:"field"},el("label",{class:"label",for:"np-tipo"},"Tipo"),tipo),el("div",{class:"field"},el("label",{class:"label",for:"np-obj"},"Objetivo"),obj)),
    el("div",{class:"field"},el("label",{class:"label",for:"np-meta"},"Meta"),meta),
    el("div",{class:"row"},el("div",{class:"field"},el("label",{class:"label",for:"np-cons"},"Cómplices"),cons),el("div",{class:"field"},el("span",{class:"label"},"Medios"),medios,el("label",{class:"label",for:"np-riesgo",style:"margin-top:8px"},"Riesgo estimado"),riesgo)),
    el("div",{style:"display:flex;gap:8px"},el("button",{class:"btn primary",onclick:()=>{
      planes=planes.filter(p=>!p.ejemplo);
      planes.push({id:"p"+Date.now(),tipo:tipo.value,obj:obj.value,meta:meta.value.trim(),cons:[...cons.selectedOptions].map(o=>o.value),medios:[...medios.querySelectorAll("input:checked")].map(i=>i.value),riesgo:+riesgo.value,paso:0});
      store.set("vg_planes",planes);f.hidden=true;drawPlans()}},"Poner en marcha"),el("button",{class:"btn",onclick:()=>{f.hidden=true}},"Cancelar")));
  f.hidden=false; tipo.focus();
}
$("#b-newplan").onclick=newPlanForm;
