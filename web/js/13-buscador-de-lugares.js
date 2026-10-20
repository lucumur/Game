/* ---------- Buscador de lugares (palacio, los tres pisos, dominio y señoríos de Francia) ---------- */
const normTxt=t=>String(t||"").replace(/[œŒ]/g,"oe").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
function lugaresIndex(){
  const out=[];
  Object.entries(ESTNOM).forEach(([id,e])=>{
    const oc=(typeof ocupantes==="function"?ocupantes(id):[]).map(o=>o[0]).filter(n=>n&&n!=="Vacante");
    out.push({tipo:"palacio",id,n:e.n,code:e.s&&e.s.length<=4?e.s:"",d:e.d||"",pisos:e.p.slice().sort(),sector:sectorOf(id),oc});
  });
  DOMINIO.forEach(r=>{
    const [id,n,short]=r; const d=typeof r[3]==="string"?r[5]:r[8];
    const oc=(typeof ocupantes==="function"?ocupantes(id):[]).map(o=>o[0]).filter(x=>x&&x!=="Vacante");
    out.push({tipo:"dominio",id,n,code:"",alias:short,d:d||"",pisos:[],sector:sectorOf(id),oc});
  });
  if(typeof FEUDOS!=="undefined"){
    FEUDOS.forEach((f,fi)=>{
      out.push({tipo:"francia",subMapa:"ducados",id:f.id,feudoIdx:fi,n:f.nombre,code:"",alias:f.corto,d:f.rentas+" "+f.nota,pisos:[],sector:"Mapa 1 · Ducados y Señoríos",oc:[f.titular,f.casa].filter(Boolean)});
    });
  }
  if(typeof PARLAMENTOS_LIST!=="undefined"){
    PARLAMENTOS_LIST.forEach(p=>{
      out.push({tipo:"francia",subMapa:"parlamentos",id:p.id,n:p.n,code:"",alias:p.corto,d:p.ressort+" "+p.actitud,pisos:[],sector:"Mapa 2 · Los Parlamentos",oc:[p.titular,p.cargo].filter(Boolean)});
    });
  }
  if(typeof DIOCESIS_LIST!=="undefined"){
    DIOCESIS_LIST.forEach(d=>{
      out.push({tipo:"francia",subMapa:"diocesis",id:d.id,n:d.n,code:"",alias:d.corto,d:d.rentas+" "+d.nota,pisos:[],sector:"Mapa 3 · Las Diócesis",oc:[d.titular,d.cargo].filter(Boolean)});
    });
  }
  if(typeof APANAJES_LIST!=="undefined"){
    APANAJES_LIST.forEach(a=>{
      out.push({tipo:"francia",subMapa:"apanajes",id:a.id,n:a.n,code:"",alias:a.corto,d:a.dominios+" "+a.rentas,pisos:[],sector:"Mapa 4 · Apanajes de la Sangre",oc:[a.titular,a.cargo].filter(Boolean)});
    });
  }
  return out;
}
function buscarLugares(q){
  const t=normTxt(q).trim(); if(!t)return [];
  const words=t.split(/\s+/);
  const res=[];
  lugaresIndex().forEach(L=>{
    const nn=normTxt(L.n), cc=normTxt(L.code), al=normTxt(L.alias), dd=normTxt(L.d), ss=normTxt(L.sector), oo=L.oc.map(normTxt);
    const hay=[nn,cc,al,dd,ss,...oo].join(" | ");
    if(!words.every(w=>hay.includes(w)))return;
    let sc=0, porOc=null;
    if(cc&&cc===t)sc+=100;
    if(nn===t)sc+=90; else if(nn.startsWith(t))sc+=60; else if(nn.includes(t))sc+=40;
    if(al&&al.includes(t))sc+=30;
    const io=oo.findIndex(o=>words.every(w=>o.includes(w)));
    if(io>=0){sc+=35;porOc=L.oc[io]}
    if(words.every(w=>nn.includes(w)))sc+=20;
    if(L.tipo==="palacio"&&!/alojamiento|crujia|patio interior|galeria (alta|baja) del/.test(nn))sc+=8;
    res.push({...L,sc,porOc});
  });
  return res.sort((a,b)=>b.sc-a.sc||a.n.localeCompare(b.n,"es"));
}
async function irALugar(L){
  const tabs=$("#map-tabs");
  [...tabs.children].forEach(x=>x.setAttribute("aria-selected",String(x.dataset.map===L.tipo)));
  if(L.tipo==="palacio"){
    if(!L.pisos.includes(PISO_PAL))PISO_PAL=L.pisos.includes(2)?2:L.pisos[0];
    mapSel=null; drawMap("palacio");
  } else if(L.tipo==="dominio"){
    if(typeof CAM_DOM!=="undefined")CAM_DOM="todo";
    drawMap("dominio");
  } else if(L.tipo==="francia"){
    if(L.subMapa){
      capaFrancia=L.subMapa;
      if(L.subMapa==="ducados"&&L.feudoIdx!=null) selDucado=L.feudoIdx;
      else if(L.subMapa==="parlamentos") selParl=L.id;
      else if(L.subMapa==="diocesis") selDioc=L.id;
      else if(L.subMapa==="apanajes") selApanaje=L.id;
    }
    drawMap("francia");
    return;
  }
  const z=document.querySelector('#map-box .zone[data-id="'+L.id+'"]');
  if(z){z.dispatchEvent(new MouseEvent("click",{bubbles:true}));z.focus({preventScroll:true});
    const bb=z.getBoundingClientRect(); if(bb.top<80||bb.bottom>innerHeight)z.scrollIntoView({block:"center",behavior:"smooth"})}
}
(function(){
  const inp=$("#msearch"), ul=$("#msearch-res"); if(!inp)return;
  let items=[], act=-1; const MAX=14;
  const cerrar=()=>{ul.hidden=true;inp.setAttribute("aria-expanded","false");inp.removeAttribute("aria-activedescendant");act=-1};
  const marcar=i=>{act=i;[...ul.querySelectorAll("li[role=option]")].forEach((li,k)=>{li.setAttribute("aria-selected",String(k===i));if(k===i){li.scrollIntoView({block:"nearest"});inp.setAttribute("aria-activedescendant",li.id)}})};
  const elegir=i=>{const L=items[i];if(!L)return;inp.value=L.n;cerrar();irALugar(L)};
  const pintar=()=>{
    const q=inp.value; ul.innerHTML=""; if(!q.trim()){cerrar();return}
    const all=buscarLugares(q); items=all.slice(0,MAX);
    if(!items.length)ul.append(el("li",{class:"vacio"},"Ningún lugar coincide."));
    items.forEach((L,i)=>{
      const donde=L.tipo==="palacio"?[L.code||null,L.pisos.map(p=>"Piso "+p).join(" / "),L.sector].filter(Boolean).join(" · "):L.tipo==="francia"?"Francia · "+L.sector:L.sector||"Dominio";
      const sub=el("span",{class:"sub"},donde);
      if(L.porOc)sub.append(" · ",el("em",{},L.porOc));
      else if(L.oc.length)sub.append(" · "+L.oc.slice(0,2).join(", ")+(L.oc.length>2?"…":""));
      ul.append(el("li",{role:"option",id:"ms-o"+i,"aria-selected":"false",onmousedown:e=>{e.preventDefault();elegir(i)}},el("b",{},L.n),sub));
    });
    if(all.length>MAX)ul.append(el("li",{class:"mas"},"y "+(all.length-MAX)+" más; afina la búsqueda"));
    ul.hidden=false; inp.setAttribute("aria-expanded","true"); act=-1; if(items.length)marcar(0);
  };
  inp.addEventListener("input",pintar);
  inp.addEventListener("focus",()=>{if(inp.value.trim())pintar()});
  inp.addEventListener("blur",()=>setTimeout(cerrar,120));
  inp.addEventListener("keydown",e=>{
    if(e.key==="ArrowDown"&&items.length){e.preventDefault();if(ul.hidden)pintar();marcar((act+1)%items.length)}
    else if(e.key==="ArrowUp"&&items.length){e.preventDefault();marcar((act-1+items.length)%items.length)}
    else if(e.key==="Enter"){if(!ul.hidden&&act>=0){e.preventDefault();elegir(act)}}
    else if(e.key==="Escape"){if(!ul.hidden){e.preventDefault();cerrar()}else inp.value=""}
  });
})();
