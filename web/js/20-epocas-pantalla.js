/* ---------- Épocas: pantalla ---------- */
function buildEras(){
  const g=$("#eras"); g.innerHTML="";
  EPOCAS.forEach(e=>g.append(e.jugable
    ?el("button",{class:"era",onclick:()=>{epoca=e;store.set("vg_epoca",e.id);show(player?"game":"selector")}},el("span",{class:"st"},e.etapa),el("span",{class:"yr"},String(e.año)),el("p",{},e.ev))
    :el("div",{class:"era off","aria-disabled":"true"},el("span",{class:"st"},e.etapa),el("span",{class:"yr"},String(e.año)),el("p",{},e.ev),el("span",{class:"soon"},"En preparación"))));
}
$("#b-epocas").onclick=()=>show("epocas");
