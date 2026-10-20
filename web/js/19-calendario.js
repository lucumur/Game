/* ---------- Calendario ---------- */
function drawCal(){
  const y=calMes.getUTCFullYear(), m=calMes.getUTCMonth(), fe=feasts(y);
  $("#cal-title").textContent=MESES[m]+" de "+y;
  const g=$("#cal"); g.innerHTML="";
  ["lu","ma","mi","ju","vi","sá","do"].forEach(d=>g.append(el("span",{class:"dow"},d)));
  const first=new Date(Date.UTC(y,m,1)), pad=(first.getUTCDay()+6)%7, days=new Date(Date.UTC(y,m+1,0)).getUTCDate();
  for(let i=0;i<pad;i++)g.append(el("span",{}));
  for(let d=1;d<=days;d++){
    const k=iso(new Date(Date.UTC(y,m,d)));
    const cls=[fe[k]?"fe":"",CITAS[k]?"ev":"",k===iso(hoy)?"today":"",k===calSel?"sel":"",k<iso(hoy)?"past":""].filter(Boolean).join(" ");
    g.append(el("button",{class:cls||null,"aria-label":d+" de "+MESES[m]+(fe[k]?", "+fe[k]:"")+(CITAS[k]?", "+CITAS[k]:""),onclick:()=>{calSel=k;drawCal()}},String(d)));
  }
  const L=$("#cal-list"); L.innerHTML="";
  const monthKeys=[...new Set([...Object.keys(fe),...Object.keys(CITAS)])].filter(k=>k.startsWith(y+"-"+String(m+1).padStart(2,"0"))).sort();
  const keys=calSel?[calSel]:monthKeys.filter(k=>k>=iso(hoy)||!monthKeys.some(x=>x>=iso(hoy))).slice(0,5);
  keys.forEach(k=>{const dd=D(k).getUTCDate();if(fe[k])L.append(el("span",{class:"f"},dd+" · "+fe[k]));if(CITAS[k])L.append(el("span",{},dd+" · "+CITAS[k]))});
  if(!L.children.length)L.append(el("span",{class:"note"},calSel?"Nada señalado ese día.":"Nada señalado este mes."));
}
$("#cal-prev").onclick=()=>{calMes=new Date(Date.UTC(calMes.getUTCFullYear(),calMes.getUTCMonth()-1,1));calSel=null;drawCal()};
$("#cal-next").onclick=()=>{calMes=new Date(Date.UTC(calMes.getUTCFullYear(),calMes.getUTCMonth()+1,1));calSel=null;drawCal()};
