/* ---------- Gabinete (sección Mundo): estructura compartimental por niveles ---------- */
let GAB_DATA=null, GAB_BY_ID={}, GAB_RAMA_BY_ID={};
let gabRamaActual="consejos", gabActualPorRama={}, gabInit=false;

function natLabel(k){
  return GAB_DATA?.naturalezas?.[k]||k||"Sin especificar";
}

function setGabineteData(data){
  GAB_DATA=data||null;
  const gabs=Array.isArray(data?.gabinetes)?data.gabinetes:[];
  const ramas=Array.isArray(data?.ramas)?data.ramas:[];
  GAB_BY_ID=Object.fromEntries(gabs.map(g=>[g.id,g]));
  GAB_RAMA_BY_ID=Object.fromEntries(ramas.map(r=>[r.id,r]));
  ramas.forEach(r=>{if(!gabActualPorRama[r.id]||!GAB_BY_ID[gabActualPorRama[r.id]])gabActualPorRama[r.id]=r.raiz_id});
  if(!GAB_RAMA_BY_ID[gabRamaActual]&&ramas[0])gabRamaActual=ramas[0].id;
  const sel=$("#gab-nat");
  if(sel){
    const prev=sel.value; sel.innerHTML="";
    sel.append(el("option",{value:""},"Toda naturaleza"));
    Object.entries(data?.naturalezas||{}).forEach(([k,v])=>sel.append(el("option",{value:k},v)));
    sel.value=prev;
  }
}

function rutaDeGabinete(gabId){
  const ruta=[]; let cur=GAB_BY_ID[gabId]; const vistos=new Set();
  while(cur&&!vistos.has(cur.id)){
    vistos.add(cur.id);
    ruta.unshift(cur);
    cur=cur.padre_id?GAB_BY_ID[cur.padre_id]:null;
  }
  return ruta;
}

function contarDescendientes(gabId,vistos=new Set()){
  const g=GAB_BY_ID[gabId]; if(!g||vistos.has(gabId))return {directos:0,total:0};
  vistos.add(gabId);
  const directos=(g.asientos||[]).length;
  let total=directos;
  (g.asientos||[]).forEach(a=>{
    if(a.subgabinete_id)total+=contarDescendientes(a.subgabinete_id,vistos).total;
  });
  return {directos,total};
}

function setGabRama(ramaId,gabIdOpt=null){
  if(!GAB_RAMA_BY_ID[ramaId])return;
  gabRamaActual=ramaId;
  if(gabIdOpt&&GAB_BY_ID[gabIdOpt])gabActualPorRama[ramaId]=gabIdOpt;
  else if(!gabActualPorRama[ramaId])gabActualPorRama[ramaId]=GAB_RAMA_BY_ID[ramaId].raiz_id;
  document.querySelectorAll("#gab-subtabs [role=tab]").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.rama===ramaId)));
  drawGabinete();
}

function abrirGabinete(gabId){
  const g=GAB_BY_ID[gabId]; if(!g)return;
  setGabRama(g.rama,g.id);
}

function gabConfBadge(conf){
  if(conf==="confirmado")return el("span",{class:"conf-ok",title:"Confirmado (1722)","aria-label":"Confirmado"},"✅");
  if(!conf)return null;
  const lbl=conf==="probable"?"Probable":conf==="dudoso"?"Dudoso":conf;
  return el("span",{class:"tag"},lbl);
}

function gabRetratoEl(id,nombre,grande=false){
  const box=el("span",{class:"gab-av"+(grande?" grande":"")});
  const src=typeof RETR!=="undefined"&&id?RETR[id]:null;
  if(src){
    box.append(el("img",{class:"pt",src:src,alt:"Retrato de "+(nombre||id)}));
  }else if(typeof bust==="function"){
    box.append(bust());
  }
  return box;
}

function gabPersonaBtn(id,nombre,grande=false){
  const L=typeof LIBRO!=="undefined"?LIBRO.find(c=>c.id===id||c.escritorio_id===id):null;
  const p=typeof PERSONAJES!=="undefined"?PERSONAJES.find(x=>x.id===id):null;
  const txt=nombre||L?.nombre||p?.nombre||id;
  const img=gabRetratoEl(L?.id||id,txt,grande);
  if(L&&typeof openFichaL==="function")return el("button",{type:"button",class:"btn sm link-ficha gab-pers-btn",onclick:e=>{e.stopPropagation();openFichaL(L)}},img,el("span",{},txt));
  if(p&&typeof openFicha==="function")return el("button",{type:"button",class:"btn sm link-ficha gab-pers-btn",onclick:e=>{e.stopPropagation();openFicha(p)}},img,el("span",{},txt));
  return el("span",{class:"gab-pers-btn"},img,el("span",{},txt));
}

function gabPortadorEl(a,compacto=true){
  const tits=Array.isArray(a.titulares)?a.titulares:[];
  const grande=!compacto;
  if(tits.length){
    const box=el("div",{class:"gab-titulares"});
    const mostrar=compacto?tits.slice(0,3):tits;
    mostrar.forEach(t=>{
      box.append(el("div",{class:"gab-tit-item"},
        gabPersonaBtn(t.id,t.nombre,grande),
        gabConfBadge(t.confianza),
        t.nota?el("span",{class:"gab-tit-nota"},t.nota):null
      ));
    });
    if(compacto&&tits.length>3){
      box.append(el("span",{class:"note"},`y ${tits.length-3} más en Ficha…`));
    }
    return box;
  }
  if(a.titular_id){
    return el("div",{class:"gab-titulares"},el("div",{class:"gab-tit-item"},gabPersonaBtn(a.titular_id,a.titular_nombre,grande)));
  }
  if(a.tipo_asiento==="colectivo"){
    return el("span",{class:"gab-colectivo"},a.escalafon||a.plazas||"Cuerpo colectivo");
  }
  return el("span",{class:"gab-vacante"},a.titular_nombre||"Por verificar (1722)");
}

function irMapaDesdeGabinete(capa){
  if(!capa)return;
  if(typeof capaFrancia!=="undefined")capaFrancia=capa;
  if(typeof go==="function")go("francia");
}

function tarjetaAsientoEl(g,a,rutaLabel=null){
  const sub=a.subgabinete_id?GAB_BY_ID[a.subgabinete_id]:null;
  const enl=a.enlace_gabinete_id?GAB_BY_ID[a.enlace_gabinete_id]:null;
  const subN=sub?(sub.asientos||[]).length:0;
  const card=el("div",{class:"gab-card",tabindex:"0",role:"button","aria-label":a.nombre,
    onclick:()=>openFichaAsiento(g.id,a.id),
    onkeydown:e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openFichaAsiento(g.id,a.id)}}},
    el("div",{class:"gab-card-top"},
      el("span",{class:"gab-num"},"#"+a.num),
      el("span",{class:"tag"},natLabel(a.naturaleza))
    ),
    rutaLabel?el("div",{class:"gab-ruta-tag"},rutaLabel):null,
    el("h3",{},a.nombre),
    a.nombre_fr?el("p",{class:"gab-fr"},el("em",{},a.nombre_fr)):null,
    el("div",{class:"gab-meta"},
      a.plazas?el("span",{class:"note"},a.plazas):null,
      gabPortadorEl(a,true)
    ),
    a.resumen?el("p",{class:"gab-desc"},a.resumen):null,
    el("div",{class:"gab-acts"},
      el("button",{type:"button",class:"btn sm",onclick:e=>{e.stopPropagation();openFichaAsiento(g.id,a.id)}},"Ficha"),
      sub?el("button",{type:"button",class:"btn sm gab-btn-sub",onclick:e=>{e.stopPropagation();abrirGabinete(sub.id)}},`▸ Abrir gabinete (${subN})`):null,
      enl?el("button",{type:"button",class:"btn sm",onclick:e=>{e.stopPropagation();abrirGabinete(enl.id)}},`↗ ${enl.codigo} · ${enl.nombre}`):null,
      a.enlace_mapa?.capa?el("button",{type:"button",class:"btn sm",onclick:e=>{e.stopPropagation();irMapaDesdeGabinete(a.enlace_mapa.capa)}},"Mapa de Francia →"):null
    )
  );
  return card;
}

function drawIndiceRama(rama,gabActualId){
  const wrap=$("#gab-indice"); if(!wrap)return;
  wrap.innerHTML="";
  const gabsRama=(GAB_DATA?.gabinetes||[]).filter(g=>g.rama===rama.id);
  const det=el("details",{class:"leyenda-pleb gab-indice"},
    el("summary",{},`Índice completo de ${rama.nombre} `,el("span",{},`(${gabsRama.length} gabinetes · salto rápido)`)),
    el("div",{class:"gab-indice-list"},
      ...gabsRama.map(g=>{
        const act=g.id===gabActualId;
        return el("button",{type:"button",class:"gab-idx-btn"+(act?" cur":""),"data-nivel":String(g.nivel),onclick:()=>abrirGabinete(g.id)},
          el("span",{class:"gab-idx-cod"},g.codigo),
          el("span",{class:"gab-idx-nom"},g.nombre),
          el("span",{class:"note"},`${(g.asientos||[]).length} asientos`)
        );
      })
    )
  );
  wrap.append(det);
}

function drawGabinete(){
  if(!gabInit){
    gabInit=true;
    $("#gab-q")?.addEventListener("input",drawGabinete);
    $("#gab-nat")?.addEventListener("change",drawGabinete);
    $("#gab-subtabs")?.addEventListener("click",e=>{
      const b=e.target.closest("[role=tab][data-rama]");
      if(b)setGabRama(b.dataset.rama);
    });
    $("#gab-btn-raiz")?.addEventListener("click",()=>{
      const r=GAB_RAMA_BY_ID[gabRamaActual];
      if(r)abrirGabinete(r.raiz_id);
    });
  }

  const crumb=$("#gab-crumb"), head=$("#gab-head"), seats=$("#gab-seats"), indice=$("#gab-indice"), subEl=$("#gab-rama-sub");
  if(!GAB_DATA||!seats)return;
  const rama=GAB_RAMA_BY_ID[gabRamaActual]||GAB_DATA.ramas?.[0];
  if(!rama)return;
  if(subEl)subEl.textContent=rama.subtitulo||"";
  document.querySelectorAll("#gab-subtabs [role=tab]").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.rama===rama.id)));

  const q=(typeof normTxt==="function"?normTxt($("#gab-q")?.value||""):($("#gab-q")?.value||"").toLowerCase()).trim();
  const fnat=$("#gab-nat")?.value||"";
  const words=q?q.split(/\s+/):[];
  const gabId=gabActualPorRama[rama.id]||rama.raiz_id;
  const gab=GAB_BY_ID[gabId]||GAB_BY_ID[rama.raiz_id];

  if(crumb)crumb.innerHTML="";
  if(head)head.innerHTML="";
  seats.innerHTML="";

  /* Si hay búsqueda o filtro por naturaleza, busca en todos los niveles de la rama actual */
  if(words.length||fnat){
    const gabsRama=(GAB_DATA.gabinetes||[]).filter(g=>g.rama===rama.id);
    const hits=[];
    gabsRama.forEach(g=>{
      (g.asientos||[]).forEach(a=>{
        if(fnat&&a.naturaleza!==fnat)return;
        if(words.length){
          const titTxt=(a.titulares||[]).map(t=>`${t.nombre} ${t.nota||""}`).join(" ");
          const hayStr=[a.nombre,a.nombre_fr,natLabel(a.naturaleza),a.plazas,a.escalafon,a.resumen,a.titular_nombre,titTxt,g.nombre,g.codigo].join(" ");
          const hay=typeof normTxt==="function"?normTxt(hayStr):hayStr.toLowerCase();
          if(!words.every(w=>hay.includes(w)))return;
        }
        hits.push({g,a});
      });
    });
    if(head){
      head.append(
        el("div",{class:"gab-head-top"},
          el("span",{class:"tag ej"},`Búsqueda en ${rama.nombre}`),
          el("span",{class:"note"},`${hits.length} asiento${hits.length===1?"":"s"} encontrado${hits.length===1?"":"s"}`)
        )
      );
    }
    if(!hits.length){
      seats.append(el("p",{class:"note"},"Ningún asiento coincide con el filtro en esta rama."));
    } else {
      const grid=el("div",{class:"gab-grid"});
      hits.forEach(({g,a})=>{
        const ruta=rutaDeGabinete(g.id).map(x=>`${x.codigo} ${x.nombre}`).join(" › ");
        grid.append(tarjetaAsientoEl(g,a,ruta));
      });
      seats.append(grid);
    }
    drawIndiceRama(rama,gab?.id);
    return;
  }

  if(!gab){
    seats.append(el("p",{class:"note"},"Cargando gabinete…"));
    if(indice)indice.innerHTML="";
    return;
  }

  /* 1. Migas de pan */
  const ruta=rutaDeGabinete(gab.id);
  if(crumb){
    ruta.forEach((n,i)=>{
      if(i>0)crumb.append(el("span",{class:"gab-sep","aria-hidden":"true"},"›"));
      const ultimo=i===ruta.length-1;
      crumb.append(el("button",{
        type:"button",
        class:"gab-crumb-btn"+(ultimo?" cur":""),
        "aria-current":ultimo?"location":null,
        onclick:()=>{if(!ultimo)abrirGabinete(n.id)}
      },`${n.codigo}. ${n.nombre}`));
    });
  }

  /* 2. Cabecera del gabinete abierto */
  const padre=gab.padre_id?GAB_BY_ID[gab.padre_id]:null;
  const counts=contarDescendientes(gab.id);
  const subCount=(gab.asientos||[]).filter(a=>a.subgabinete_id).length;
  if(head){
    head.append(
      el("div",{class:"gab-head-top"},
        el("div",{class:"gab-head-tags"},
          el("span",{class:"tag ej"},`Gabinete ${gab.codigo}`),
          el("span",{class:"tag"},`Nivel ${gab.nivel}`),
          el("span",{class:"note"},`${counts.directos} directos`+(counts.total>counts.directos?` · ${counts.total} con subgabinetes`:"")+(subCount?` · ${subCount} con gabinete propio`:""))
        ),
        padre?el("button",{type:"button",class:"btn sm",onclick:()=>abrirGabinete(padre.id)},`↑ Subir a ${padre.codigo}. ${padre.nombre}`):null
      ),
      el("h2",{},gab.nombre),
      el("p",{class:"gab-preside"},el("span",{class:"label"},"Preside: "),gab.preside||"—"),
      gab.nota?el("p",{class:"note"},gab.nota):null
    );
  }

  /* 3. Rejilla compartimental de asientos directos */
  const grid=el("div",{class:"gab-grid"});
  (gab.asientos||[]).forEach(a=>grid.append(tarjetaAsientoEl(gab,a)));
  seats.append(grid);

  /* 4. Índice plegable de la rama */
  drawIndiceRama(rama,gab.id);
}

function openFichaAsiento(gabId,asientoId,reset=false){
  const g=GAB_BY_ID[gabId];
  const a=g?.asientos?.find(x=>x.id===asientoId);
  if(!g||!a)return;
  const run=()=>{
    const f=$("#ficha"); if(!f)return; f.innerHTML="";
    const sub=a.subgabinete_id?GAB_BY_ID[a.subgabinete_id]:null;
    const enl=a.enlace_gabinete_id?GAB_BY_ID[a.enlace_gabinete_id]:null;
    const rama=GAB_RAMA_BY_ID[g.rama];
    const ruta=rutaDeGabinete(g.id);

    const dl=el("dl",{});
    [
      ["Rama",rama?.nombre||g.rama],
      ["Gabinete",`${g.codigo} · ${g.nombre}`],
      ["Preside el gabinete",g.preside||"—"],
      ["Naturaleza",natLabel(a.naturaleza)],
      ["Plazas / alcance",a.plazas||"—"],
      [a.tipo_asiento==="colectivo"?"Escalafón / plazas":"Titular (1722)",gabPortadorEl(a,false)]
    ].forEach(([k,v])=>dl.append(el("dt",{},k),el("dd",{},v instanceof Node?v:String(v))));

    const rutaBtns=el("div",{class:"jer-subs"});
    ruta.forEach(n=>rutaBtns.append(el("button",{type:"button",class:"btn sm",onclick:()=>{abrirGabinete(n.id);if(typeof fichaCerrar==="function")fichaCerrar();else f.hidden=true}},`${n.codigo}. ${n.nombre}`)));

    let subBox=null;
    if(sub){
      subBox=el("div",{class:"jerarquia-list"},
        el("div",{class:"jer-row"},
          el("button",{type:"button",class:"btn sm gab-btn-sub",onclick:()=>{abrirGabinete(sub.id);if(typeof fichaCerrar==="function")fichaCerrar();else f.hidden=true}},`▸ Abrir gabinete ${sub.codigo} · ${sub.nombre}`)
        ),
        el("div",{class:"jer-subs"},...(sub.asientos||[]).map(s=>el("button",{type:"button",class:"btn sm",onclick:()=>openFichaAsiento(sub.id,s.id)},`#${s.num} ${s.nombre}`)))
      );
    }

    const fuentes=[...new Set((a.titulares||[]).map(t=>t.fuente).filter(Boolean))];
    f.append(
      typeof fichaNavBar==="function"?fichaNavBar():el("button",{class:"x","aria-label":"Cerrar",onclick:()=>{f.hidden=true}},"×"),
      el("span",{class:"label"},`Asiento #${a.num} · Gabinete ${g.codigo}`),
      el("h2",{},a.nombre),
      a.nombre_fr?el("p",{class:"tipo-fr"},el("em",{},a.nombre_fr)):null,
      el("div",{class:"row"},
        el("span",{class:"tag"},natLabel(a.naturaleza)),
        sub?el("button",{type:"button",class:"btn sm gab-btn-sub",onclick:()=>{abrirGabinete(sub.id);if(typeof fichaCerrar==="function")fichaCerrar();else f.hidden=true}},`▸ Subgabinete (${(sub.asientos||[]).length})`):null,
        enl?el("button",{type:"button",class:"btn sm",onclick:()=>{abrirGabinete(enl.id);if(typeof fichaCerrar==="function")fichaCerrar();else f.hidden=true}},`↗ Ir a ${enl.codigo}`):null,
        a.enlace_mapa?.capa?el("button",{type:"button",class:"btn sm",onclick:()=>{if(typeof fichaCerrar==="function")fichaCerrar();else f.hidden=true;irMapaDesdeGabinete(a.enlace_mapa.capa)}},"Ver en el mapa de Francia →"):null
      ),
      el("div",{class:"rule"}),
      dl,
      el("span",{class:"label"},"Competencias y función"),el("p",{},a.resumen||"—"),
      el("span",{class:"label"},"Ruta jerárquica"),rutaBtns,
      sub?el("span",{class:"label"},`Subgabinete directo (${(sub.asientos||[]).length} asientos)`):null,
      subBox,
      fuentes.length?el("span",{class:"note"},"Fuente: "+fuentes.join(" · ")):null
    );
    f.hidden=false; f.querySelector(".x")?.focus();
  };
  if(typeof fichaIr==="function")fichaIr(run,reset); else run();
}
