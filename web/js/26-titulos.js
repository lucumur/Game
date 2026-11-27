/* ---------- Títulos (sección Mundo): fichas de títulos y fichas de tipos ---------- */
let TITULOS=[], TIPOS_TITULO=[], TITULO_BY_ID={}, TIPO_TITULO_BY_ID={}, titulosVista="grid", titulosInit=false;
const CAT_TIT={
  soberano:"Soberano",
  noble:"Nobleza territorial",
  eclesiastico:"Eclesiástico (Paría)",
  cargo:"Cargo / Oficio",
  honorifico:"Honorífico",
  tecnico:"Técnico (clasificación)"
};
const CONF_TIT={confirmado:"Confirmado",probable:"Probable",dudoso:"Dudoso"};
function confBadgeEl(conf){
  if(conf==="confirmado")return el("span",{class:"conf-ok",title:"Confirmado","aria-label":"Confirmado"},"✅");
  return el("span",{class:"tag"},CONF_TIT[conf]||conf||"Por verificar");
}

function setTitulosData(data){
  TIPOS_TITULO=Array.isArray(data?.tipos)?data.tipos:[];
  TITULOS=Array.isArray(data?.titulos)?data.titulos:[];
  TIPO_TITULO_BY_ID=Object.fromEntries(TIPOS_TITULO.map(t=>[t.id,t]));
  TITULO_BY_ID=Object.fromEntries(TITULOS.map(t=>[t.id,t]));
  const sel=$("#t-tipo");
  if(sel){
    const prev=sel.value; sel.innerHTML="";
    sel.append(el("option",{value:""},"Todos los tipos"));
    TIPOS_TITULO.forEach(tp=>sel.append(el("option",{value:tp.id},tp.nombre)));
    sel.value=prev;
  }
  drawTiposBar();
}

/* Reutiliza SVG de sedes, escudos.json (ESCUDOS_DB) o renderEscudoSVG del mapa de Francia. */
function emblemaTituloEl(t,grande=false){
  const box=el("div",{class:"titulo-emb"+(grande?" grande":"")});
  const sSlug=t.dioc_id?t.dioc_id.replace(/^dioc-/,""):"";
  if(sSlug&&typeof SEDES_PROPIOS!=="undefined"&&SEDES_PROPIOS[sSlug]){
    box.append(el("img",{class:"titulo-emb-img",src:SEDES_PROPIOS[sSlug],alt:"Escudo de "+t.nombre}));
    return box;
  }
  const eid=t.escudo_key||t.feudo_id||"";
  if(typeof ESCUDOS_DUCADOS!=="undefined"&&eid&&ESCUDOS_DUCADOS[eid]){
    box.append(el("img",{class:"titulo-emb-img",src:ESCUDOS_DUCADOS[eid],alt:"Escudo de "+t.nombre}));
    return box;
  }
  if(t.emblema){
    box.append(el("img",{class:"titulo-emb-img",src:t.emblema,alt:"Emblema de "+t.nombre}));
    return box;
  }
  if(typeof ESCUDOS_DB!=="undefined"&&eid&&ESCUDOS_DB.src?.[eid]){
    box.append(el("img",{class:"titulo-emb-img",src:ESCUDOS_DB.src[eid],alt:"Escudo de "+t.nombre,title:ESCUDOS_DB.commons?.[eid]||""}));
    return box;
  }
  if(t.feudo_id&&typeof FEUDOS!=="undefined"&&typeof renderEscudoSVG==="function"){
    const f=FEUDOS.find(x=>x.id===t.feudo_id);
    if(f&&f.escudo){
      const wrap=renderEscudoSVG(f.escudo,"ducados",f.id);
      if(wrap){box.append(wrap);return box}
    }
  }
  if(t.id==="corona-francia"&&typeof renderEscudoSVG==="function"){
    box.append(renderEscudoSVG({bg:"#1c386b",fg:"#e0ba54",acc:"#f0ede4",pat:"lis"},"ducados","ap-corona"));
    return box;
  }
  box.append(el("span",{class:"titulo-emb-ph"},t.es_tecnico?"⚙":"⚜"));
  return box;
}

function personajeDeTitulo(t){
  if(!t?.titular_id)return {L:null,p:null};
  const L=LIBRO?.find(c=>c.id===t.titular_id||c.escritorio_id===t.titular_id)||null;
  const p=PERSONAJES.find(x=>x.id===t.titular_id)||null;
  return {L,p};
}
function titulosDePersonaje(c){
  if(!c||!TITULOS.length)return [];
  return TITULOS.filter(t=>t.titular_id&&(t.titular_id===c.id||(c.escritorio_id&&t.titular_id===c.escritorio_id)));
}
function subordinadosDe(t){
  const ids=new Set(t.subordinados_ids||[]);
  TITULOS.forEach(x=>{if(x.superior_id===t.id)ids.add(x.id)});
  return [...ids].map(id=>TITULO_BY_ID[id]).filter(Boolean);
}

function portadorBtn(t){
  const {L,p}=personajeDeTitulo(t), txt=t.titular_nombre||"Vacante / por verificar";
  if(L)return el("button",{type:"button",class:"btn sm link-ficha",onclick:e=>{e.stopPropagation();openFichaL(L)}},txt);
  if(p)return el("button",{type:"button",class:"btn sm link-ficha",onclick:e=>{e.stopPropagation();openFicha(p)}},txt);
  return el("span",{},txt);
}
function tipoBtn(tpId,conStop=true){
  const tp=TIPO_TITULO_BY_ID[tpId];
  if(!tp)return el("span",{class:"tag"},tpId||"Sin tipo");
  return el("button",{type:"button",class:"tipo-btn",title:"Ver ficha del tipo: "+tp.nombre,onclick:e=>{if(conStop)e.stopPropagation();openFichaTipoTitulo(tp.id)}},tp.nombre);
}

function drawTiposBar(){
  const bar=$("#titulos-tipos-bar"); if(!bar)return;
  bar.innerHTML="";
  TIPOS_TITULO.forEach(tp=>{
    const n=TITULOS.filter(t=>t.tipo_id===tp.id).length;
    bar.append(el("button",{type:"button",class:"chip"+(tp.es_tecnico?" tech":""),onclick:()=>openFichaTipoTitulo(tp.id)},
      tp.nombre,el("span",{class:"chip-n"},n?` (${n})`:"")));
  });
}

function verEnMapaFrancia(t){
  if(t.feudo_id&&typeof FEUDOS!=="undefined"){
    const fi=FEUDOS.findIndex(f=>f.id===t.feudo_id);
    if(fi>=0){capaFrancia="ducados";selDucado=fi;go("francia");return}
  }
  if(t.dioc_id&&typeof DIOCESIS_LIST!=="undefined"){
    capaFrancia="diocesis";selDioc=t.dioc_id;go("francia");return;
  }
  go("francia");
}

function drawTitulos(){
  if(!titulosInit){
    titulosInit=true;
    $("#t-q")?.addEventListener("input",drawTitulos);
    $("#t-cat")?.addEventListener("change",drawTitulos);
    $("#t-tipo")?.addEventListener("change",drawTitulos);
    $("#t-v-grid")?.addEventListener("click",()=>{titulosVista="grid";drawTitulos()});
    $("#t-v-tabla")?.addEventListener("click",()=>{titulosVista="tabla";drawTitulos()});
    if(typeof loadEscudosDB==="function")loadEscudosDB().then(()=>{if(!$("#game").hidden&&current==="titulos")drawTitulos()});
  }
  $("#t-v-grid")?.setAttribute("aria-pressed",String(titulosVista==="grid"));
  $("#t-v-tabla")?.setAttribute("aria-pressed",String(titulosVista==="tabla"));

  const q=normTxt($("#t-q")?.value||"").trim(), fc=$("#t-cat")?.value||"", ft=$("#t-tipo")?.value||"";
  const words=q?q.split(/\s+/):[];
  const list=TITULOS.filter(t=>{
    if(fc&&t.categoria!==fc)return false;
    if(ft&&t.tipo_id!==ft)return false;
    if(!words.length)return true;
    const tpObj=TIPO_TITULO_BY_ID[t.tipo_id];
    const hay=normTxt([t.nombre,tpObj?.nombre,tpObj?.nombre_fr,CAT_TIT[t.categoria],t.titular_nombre,t.casa,t.provincia,t.posesiones,t.otorga,t.nota].join(" "));
    return words.every(w=>hay.includes(w));
  });

  const cnt=$("#titulos-count");
  if(cnt)cnt.textContent=list.length+" de "+TITULOS.length+" títulos";
  const box=$("#titulos-box"); if(!box)return; box.innerHTML="";
  if(!TITULOS.length){box.append(el("p",{class:"note"},"Cargando títulos…"));return}
  if(!list.length){box.append(el("p",{class:"note"},"Ningún título coincide con el filtro."));return}

  if(titulosVista==="tabla"){
    const tbl=el("table",{class:"titulos-table"},
      el("thead",{},el("tr",{},
        el("th",{},"Emblema"),el("th",{},"Título"),el("th",{},"Tipo"),el("th",{},"Categoría"),
        el("th",{},"Portador"),el("th",{},"Localización"),el("th",{},"Superior"),el("th",{},"Confianza")
      )),
      el("tbody",{},...list.map(t=>{
        const sup=t.superior_id?TITULO_BY_ID[t.superior_id]:null;
        return el("tr",{},
          el("td",{class:"td-emb"},emblemaTituloEl(t)),
          el("td",{},el("button",{type:"button",class:"btn sm link-ficha",onclick:()=>openFichaTitulo(t.id)},t.nombre)),
          el("td",{},tipoBtn(t.tipo_id)),
          el("td",{},CAT_TIT[t.categoria]||t.categoria,t.es_tecnico?" · Técnico":""),
          el("td",{},portadorBtn(t)),
          el("td",{},t.provincia||"—"),
          el("td",{},sup?el("button",{type:"button",class:"btn sm link-ficha",onclick:()=>openFichaTitulo(sup.id)},sup.nombre):"—"),
          el("td",{},confBadgeEl(t.confianza))
        );
      }))
    );
    box.append(el("div",{class:"titulos-table-wrap"},tbl));
    return;
  }

  const grid=el("div",{class:"titulos-grid"});
  list.forEach(t=>{
    const card=el("div",{class:"titulo-card",tabindex:"0",role:"button","aria-label":t.nombre,
      onclick:()=>openFichaTitulo(t.id),
      onkeydown:e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openFichaTitulo(t.id)}}},
      el("div",{class:"titulo-card-top"},emblemaTituloEl(t),
        el("div",{class:"titulo-card-tags"},tipoBtn(t.tipo_id),
          t.es_tecnico?el("span",{class:"tag ej"},"Técnico"):null,
          confBadgeEl(t.confianza))),
      el("h3",{},t.nombre),
      el("p",{class:"titulo-card-port"},t.titular_nombre||"Por verificar"),
      el("p",{class:"note"},[t.provincia,t.casa].filter(Boolean).join(" · "))
    );
    grid.append(card);
  });
  box.append(grid);
}

function listaFicha(items){
  if(!items||!items.length)return el("p",{class:"note"},"Por verificar.");
  return el("ul",{class:"ficha-list"},...items.map(x=>el("li",{},x)));
}

function fichaNavOrClose(){
  return typeof fichaNavBar==="function"?fichaNavBar():el("button",{class:"x","aria-label":"Cerrar",onclick:()=>{$("#ficha").hidden=true}},"×");
}
function openFichaTitulo(id,reset=false){
  const t=TITULO_BY_ID[id]; if(!t)return;
  const run=()=>{
    const f=$("#ficha"); f.innerHTML="";
    const sup=t.superior_id?TITULO_BY_ID[t.superior_id]:null;
    const subs=subordinadosDe(t);
    const coord=(t.lat!=null&&t.lon!=null)?`${t.lat.toFixed(2)}° N, ${t.lon.toFixed(2)}° E`:"Por verificar";
    const creacion=t.creacion;
    const fechaCreacion=creacion?.fecha?el("div",{},
      el("strong",{},creacion.fecha),
      creacion.confianza==="confirmado"?null:el("span",{class:"note"}," · "+(CONF_TIT[creacion.confianza]||"Por verificar")),
      creacion.detalle?el("div",{class:"note"},creacion.detalle):null,
      creacion.fuentes?.length?el("div",{class:"note"},...creacion.fuentes.flatMap(({nombre,url},i)=>[
        i?" · ":"",el("a",{href:url,target:"_blank",rel:"noopener noreferrer"},nombre)
      ])):null
    ):"Por verificar";
    const dl=el("dl",{});
    [
      ["Tipo",tipoBtn(t.tipo_id,false)],
      ["Categoría",(CAT_TIT[t.categoria]||t.categoria)+(t.es_tecnico?" · Técnico":"")],
      ["Fecha de creación",fechaCreacion],
      ["Portador",portadorBtn(t)],
      ["Casa",t.casa||"—"],
      ["Localización",t.provincia||"Por verificar"],
      ["Coordenadas",coord],
      ["Extensión",t.extension||"Por verificar"]
    ].forEach(([k,v])=>dl.append(el("dt",{},k),el("dd",{},v instanceof Node?v:String(v))));

    const jer=el("div",{class:"jerarquia-list"});
    jer.append(el("div",{class:"jer-row"},el("span",{class:"label"},"Título superior: "),
      sup?el("button",{type:"button",class:"btn sm link-ficha",onclick:()=>openFichaTitulo(sup.id)},sup.nombre)
         :el("span",{class:"note"},t.superior_id===null?"Ninguno (título raíz)":"Por verificar")));
    const subBox=el("div",{class:"jer-subs"});
    if(subs.length){
      subs.slice(0,40).forEach(s=>subBox.append(el("button",{type:"button",class:"btn sm",onclick:()=>openFichaTitulo(s.id)},s.nombre)));
      if(subs.length>40)subBox.append(el("span",{class:"note"},`y ${subs.length-40} más…`));
    } else subBox.append(el("span",{class:"note"},"Ninguno registrado todavía."));
    jer.append(el("div",{},el("span",{class:"label"},"Títulos subordinados ("+subs.length+")"),subBox));

    f.append(
      fichaNavOrClose(),
      el("span",{class:"label"},"Ficha de título"),
      el("div",{class:"ficha-emb"},emblemaTituloEl(t,true)),
      el("h2",{},t.nombre),
      el("div",{class:"row"},
        confBadgeEl(t.confianza),
        t.es_tecnico?el("span",{class:"tag ej"},"Técnico"):null,
        (t.feudo_id||t.dioc_id)?el("button",{type:"button",class:"btn sm",onclick:()=>{if(typeof fichaCerrar==="function")fichaCerrar();else f.hidden=true;verEnMapaFrancia(t)}},"Ver en el mapa de Francia →"):null
      ),
      el("div",{class:"rule"}),
      dl,
      el("span",{class:"label"},"Jerarquía"),jer,
      el("span",{class:"label"},"Qué posee"),el("p",{},t.posesiones||"Por verificar."),
      el("span",{class:"label"},"Qué otorga"),el("p",{},t.otorga||"Por verificar."),
      el("span",{class:"label"},"Derechos"),listaFicha(t.derechos),
      el("span",{class:"label"},"Obligaciones"),listaFicha(t.obligaciones),
      t.nota?el("span",{class:"label"},"Notas"):null,t.nota?el("p",{},t.nota):null,
      el("span",{class:"note"},"Fuente: "+(t.fuente||"Por verificar"))
    );
    f.hidden=false; f.querySelector(".x")?.focus();
  };
  if(typeof fichaIr==="function")fichaIr(run,reset); else run();
}

function openFichaTipoTitulo(tipoId,reset=false){
  const tp=TIPO_TITULO_BY_ID[tipoId]; if(!tp)return;
  const run=()=>{
    const f=$("#ficha"); f.innerHTML="";
    const titulosDeTipo=TITULOS.filter(t=>t.tipo_id===tipoId);
    const lista=el("div",{class:"jer-subs"});
    if(titulosDeTipo.length)titulosDeTipo.forEach(t=>lista.append(el("button",{type:"button",class:"btn sm",onclick:()=>openFichaTitulo(t.id)},t.nombre)));
    else lista.append(el("span",{class:"note"},"Aún no hay títulos cargados de este tipo."));

    f.append(
      fichaNavOrClose(),
      el("span",{class:"label"},"Tipo de título"),
      el("h2",{},tp.nombre),
      tp.nombre_fr?el("p",{class:"tipo-fr"},el("em",{},tp.nombre_fr)):null,
      el("div",{class:"row"},
        el("span",{class:"tag"},CAT_TIT[tp.categoria]||tp.categoria),
        tp.es_tecnico?el("span",{class:"tag ej"},"Técnico (clasificatorio)"):null,
        confBadgeEl(tp.confianza)
      ),
      el("div",{class:"rule"}),
      el("span",{class:"label"},"Definición"),el("p",{},tp.definicion||"—"),
      el("span",{class:"label"},"Aclaraciones"),el("p",{},tp.aclaraciones||"—"),
      el("span",{class:"label"},"Historia y evolución"),el("p",{},tp.historia||"—"),
      el("span",{class:"label"},"Derechos generales"),listaFicha(tp.derechos_generales),
      el("span",{class:"label"},"Obligaciones generales"),listaFicha(tp.obligaciones_generales),
      el("span",{class:"label"},"Títulos de este tipo ("+titulosDeTipo.length+")"),lista,
      el("span",{class:"note"},"Fuente: "+(tp.fuente||"Por verificar"))
    );
    f.hidden=false; f.querySelector(".x")?.focus();
  };
  if(typeof fichaIr==="function")fichaIr(run,reset); else run();
}
