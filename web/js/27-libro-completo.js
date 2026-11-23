/* ---------- Libro de caras unificado (Casas, Símbolos, Habilidades, Ficha con 5 pestañas e historial) ---------- */
const fichaHist=[];
let fichaActual=null, perSubVista="per", facFiltro="Todas", fichaTab="resumen", guiaHab="erudicion", SIM_LOCAL={};

function fichaIr(renderFn,reset=false){
  const f=$("#ficha");
  if(reset)fichaHist.length=0;
  else if(f&&!f.hidden&&fichaActual)fichaHist.push({fn:fichaActual,scroll:f.scrollTop});
  fichaActual=renderFn;
  renderFn();
  if(f)f.scrollTop=0;
}
function fichaCerrar(){
  const f=$("#ficha"); if(f)f.hidden=true;
  fichaHist.length=0; fichaActual=null;
}
function fichaNavBar(){
  const row=el("div",{class:"ficha-nav"});
  if(fichaHist.length){
    row.append(el("button",{type:"button",class:"btn sm",onclick:()=>{
      const prev=fichaHist.pop(); if(!prev)return;
      fichaActual=prev.fn; prev.fn(); $("#ficha").scrollTop=prev.scroll||0;
    }},"← Volver"));
  }
  row.append(el("button",{type:"button",class:"x","aria-label":"Cerrar",onclick:fichaCerrar},"×"));
  return row;
}

const RES_FULL={
  residente_palacio:"Residente en Versalles (palacio, por gracia del rey)",
  habitante_versalles:"Habitante de Versalles (ciudad)",
  habitante_ile:"Habitante de l'Île (cercanías de la corte)",
  habitante_paris:"Habitante de París (visita Versalles)",
  provinciano:"Provinciano (vive en su provincia)",
  extranjero:"Extranjero (fuera del reino)",
  por_verificar:"Por verificar"
};
const HAB=[["intriga","Intriga"],["diplomacia","Diplomacia"],["armas","Armas"],["erudicion","Erudición"],["devocion","Devoción"],["galanteria","Galantería"]];
const HAB_ESCALA={
  erudicion:[
    "Rural analfabeto, sin letras ni nociones.",
    "Sabe comportarse, es analfabeto/a.",
    "Sabe leer, no escribe casi nada; no conoce autores, no estudió.",
    "Sabe leer y escribir, como adolescente; conoce de la Biblia.",
    "Lee la Biblia, conoce autores, lee panfletos.",
    "Nivel adecuado: sabe un poco de otro idioma y un poquito de latín.",
    "Sobre la media: sabe latín o 2 idiomas extra; escribe mucho.",
    "Tiene pequeña biblioteca en casa, ha escrito alguna obra o sobresale como profesor.",
    "Es escritor o profesor importante; su cargo y su nivel son sobresalientes.",
    "Es famoso, escritor, reconocido por su sabiduría; especialista en algo único.",
    "El más famoso, el mejor escritor, el más erudito, el mejor profesor."
  ],
  intriga:[
    "Inocencia total (niño o quien dice todo sin filtro).",
    "Calla lo básico por educación, pero no detecta maquinaciones.",
    "Nota chismes y favoritos, pero cae en engaños simples.",
    "Lee alianzas visibles de su entorno y guarda un secreto propio.",
    "Usa un rumor, devuelve un desaire con disimulo y evita trampas obvias.",
    "Nivel adecuado: maneja confidentes o criados y lee el tablero de la corte.",
    "Sobre la media: coordina maniobras entre varios bandos sin dejar rastro directo.",
    "Tiende trampas políticas o de alcoba y coloca piezas en casas ajenas.",
    "Mueve ministros, parlamentos o confesores sin mostrar la mano.",
    "Maestro de camarillas enteras (Prie, Richelieu, Mesmes).",
    "Artífice en la sombra a escala de Estado (Dubois)."
  ],
  diplomacia:[
    "Torpeza absoluta; ofende rangos y rompe cualquier trato.",
    "Sabe las reverencias básicas; cede o choca en cuanto hay conflicto.",
    "Sostiene conversación formal en asuntos menores sin capacidad de pacto.",
    "Cortesía firme ante iguales y superiores; pide favores sin insolencia.",
    "Maneja precedencias, mediaciones familiares y compromisos locales.",
    "Nivel adecuado: negocia acuerdos estables y representa con solvencia a su casa.",
    "Sobre la media: desactiva choques graves de etiqueta o intereses sin ruptura.",
    "Negociador de confianza en Estados provinciales, Parlamentos o legaciones.",
    "Embajador de peso o mediador entre príncipes y potencias.",
    "Gran diplomático del reino (Dubois, Beauvau).",
    "Artífice histórico de tratados europeos y equilibrio entre coronas."
  ],
  armas:[
    "Nunca ha empuñado arma (niño, clérigo, civil ajeno a la milicia).",
    "Porte básico de espada de gala o defensa instintiva, sin instrucción.",
    "Monta y esgrime lo elemental de joven caballero, sin campaña real.",
    "Academia o campaña menor; conoce el mando de compañía o un duelo formal.",
    "Oficial fogueado; ha visto fuego y sostiene tropa o guardia.",
    "Nivel adecuado: oficial competente de línea o guardia; domina táctica y duelo.",
    "Sobre la media: jefe de regimiento o brigadier probado en combate.",
    "Oficial general experimentado; dirige sitios, marchas y fronteras.",
    "Teniente general victorioso en grandes campañas.",
    "Mariscal de Francia de gran prestigio (Berwick).",
    "El mayor capitán vivo del reino, vencedor de batallas decisivas (Villars)."
  ],
  devocion:[
    "Irreligioso o impío abierto; ni siquiera finge las formas.",
    "Cumple lo mínimo por apariencia social (Orleans, Dubois, Richelieu, Charolais).",
    "Oye misa por costumbre de corte, sin lectura ni disciplina.",
    "Practicante regular de sacramentos y ayunos corrientes.",
    "Piedad sincera o austera; frecuenta sermones y dirección espiritual.",
    "Nivel adecuado: observancia sólida y respetada; conoce liturgia y doctrina común.",
    "Sobre la media: piedad ejemplar o militante (devoto, jansenista o jesuita activo).",
    "Predica, escribe o dirige conciencias con autoridad reconocida.",
    "Referente espiritual de una diócesis, orden o partido religioso.",
    "Piedad extrema que rige su vida y gobierno (Felipe V, Colbert de Montpellier).",
    "Autoridad espiritual venerada en todo el reino (Noailles, Soanen, Belsunce)."
  ],
  galanteria:[
    "Desabrido o apartado por voto/edad de todo comercio mundano (Linières).",
    "Grave, seco o torpe en salón; ajeno a los cumplidos de corte.",
    "Etiqueta fría y correcta, sin chispa ni atractivo social.",
    "Sostiene un cumplido, baila el minué y resulta agradable sin destacar.",
    "Soltura de salón, conversación amena y buena presencia.",
    "Nivel adecuado: cortesano pulido; domina el esprit, los madrigales y las veladas.",
    "Sobre la media: seductor o anfitriona brillante cuya compañía se disputa.",
    "Árbitro del gusto y del encanto en círculos selectos.",
    "Célebre en la corte por sus conquistas, ingenio y magnetismo.",
    "Figura mítica de la Regencia en salones y alcobas (Orleans, Prie, Parabère).",
    "El seductor/encantador legendario de su siglo (Richelieu)."
  ]
};
const INN=[["temperamento","Temperamento"],["salud","Salud"],["aspecto","Aspecto"],["intelecto","Intelecto"]];
const RAS=[["soc","Sociabilidad","Retraído","Gregario"],["hos","Hospitalidad","Frío","Anfitrión"],["tem","Templanza","Colérico","Imperturbable"],["com","Competitividad","Conformista","Debe ser el primero"],["amb","Ambición","Satisfecho","Insaciable"],["dis","Discreción","Indiscreto","Tumba"],["van","Vanidad","Modesto","Vanidoso"],["org","Orgullo de sangre","Llano","Obsesionado con el rango"],["cer","Ceremonia","Desenvuelto","Puntilloso"],["ren","Rencor","Olvida","Nunca perdona"],["gen","Generosidad","Avaro","Pródigo con otros"],["gas","Gasto","Austero","Derrochador"],["cre","Credulidad","Desconfiado","Crédulo"],["val","Valor","Cobarde","Temerario"],["pru","Prudencia","Impulsivo","Calculador"],["pie","Piedad","Libertino","Devoto"],["sen","Sensualidad","Casto","Voluptuoso"],["esp","Esprit","Torpe","Ingenioso"],["hum","Humor","Grave","Burlón"],["lea","Lealtad","Veleta","Fiel hasta caer"],["fra","Franqueza","Taimado","Sincero"],["cmp","Compasión","Cruel","Compasivo"],["ani","Ánimo","Melancólico","Optimista"],["lab","Laboriosidad","Indolente","Infatigable"],["cur","Curiosidad","Indiferente","Curioso"],["cst","Constancia","Voluble","Constante"],["cel","Celos","Confiado","Celoso"],["obe","Obediencia","Rebelde","Sumiso"]];
const CUAL=[["belleza","Belleza"],["constitucion","Constitución"],["fertilidad","Fertilidad"],["intelecto","Intelecto"],["memoria","Memoria"],["voz","Voz"],["oido","Oído musical"],["estatura","Estatura"],["marcas","Marcas"],["taras","Taras"]];
const nacAnio=c=>{const m=String(c.anio||"").match(/\d{4}/);return m?+m[0]:9999};
const ORD_KEY={riqueza:c=>+c.riqueza||0,edad:c=>-nacAnio(c),rango:c=>+c.rango||0};
const ORD_VAL={riqueza:c=>"Fortuna "+(c.riqueza??"?")+"/10",edad:c=>(c.edad||"?")+" años",rango:c=>c.estatus_familia||""};

function docMark(){return el("span",{class:"doc",title:"Documentado en fuentes"},"◆ doc.")}
function dotsEl(v,word,doc){
  const w=el("div",{class:"dots","aria-label":v+" de 5"+(word?", "+word:"")});
  for(let i=1;i<=5;i++)w.append(el("i",{class:i<=v?"on":null}));
  if(word)w.append(el("span",{},word));
  if(doc)w.append(docMark());
  return w;
}
function nivelBarEl(x){
  const w=el("div",{class:"bar"+(x.v>=6?" elite":""),"aria-label":x.n+": "+x.v+" de 10"});
  const fill=el("i"); fill.style.width=(x.v*10)+"%";
  w.append(fill,el("b",{},String(x.v)),x.doc?docMark():null);
  return w;
}
function dlPair(dl,k,v){
  if(v==null||v===""||v==="—")return;
  dl.append(el("dt",{},k),el("dd",{},v instanceof Node?v:String(v)));
}

/* ---------- Guía de habilidades (0–10) ---------- */
function renderGuiaHab(){
  const tabs=$("#guia-tabs"), list=$("#guia-list"); if(!tabs||!list)return;
  tabs.innerHTML="";
  HAB.forEach(([k,l])=>tabs.append(el("button",{type:"button",class:"chip","aria-pressed":String(k===guiaHab),onclick:()=>{guiaHab=k;renderGuiaHab()}},l)));
  list.innerHTML="";
  (HAB_ESCALA[guiaHab]||[]).forEach((txt,n)=>list.append(el("li",{class:n>=6?"elite":null},el("b",{},String(n)),el("span",{},txt))));
}
function abrirGuiaHab(k){if(k)guiaHab=k;renderGuiaHab();$("#guia-modal").hidden=false;$("#guia-close").focus()}
function cerrarGuiaHab(){const m=$("#guia-modal");if(m)m.hidden=true}

/* ---------- Subpestañas de Personajes (solo Mundo) ---------- */
function setPerSubVista(v){
  perSubVista=v;
  if($("#vista-per"))$("#vista-per").hidden=v!=="per";
  if($("#vista-casas"))$("#vista-casas").hidden=v!=="cas";
  if($("#vista-simbolos"))$("#vista-simbolos").hidden=v!=="sim";
  $("#sub-per")?.setAttribute("aria-selected",String(v==="per"));
  $("#sub-cas")?.setAttribute("aria-selected",String(v==="cas"));
  $("#sub-sim")?.setAttribute("aria-selected",String(v==="sim"));
  if(v==="per")drawFaces();
  if(v==="cas")renderCasas();
  if(v==="sim")renderSimbolos();
}

/* ---------- Filtros y vista de Casas ---------- */
function renderCasaFiltros(){
  if(typeof Heraldica!=="undefined"&&LIBRO)Heraldica.poblarSelect($("#f-casa"),LIBRO,"Toda casa");
  const cc=$("#ccat"), ce=$("#cest");
  if(cc&&cc.options.length<=1&&typeof Heraldica!=="undefined")Object.entries(Heraldica.CATEGORIAS).forEach(([k,v])=>cc.append(el("option",{value:k},v)));
  if(ce&&ce.options.length<=1&&typeof Heraldica!=="undefined")Object.entries(Heraldica.ESTADOS).forEach(([k,v])=>ce.append(el("option",{value:k},v)));
}
function renderCasas(){
  const wrap=$("#cas-wrap"); if(!wrap)return; wrap.innerHTML="";
  if(typeof Heraldica==="undefined"){wrap.append(el("p",{class:"note"},"Cargando catálogo de casas…"));return}
  const all=Heraldica.all(), chars=LIBRO||[];
  if(!all.length){$("#ccount").textContent="";wrap.append(el("p",{class:"note"},"Cargando catálogo de casas…"));return}
  const q=normTxt($("#qc")?.value||"").trim(), ccat=$("#ccat")?.value||"", cest=$("#cest")?.value||"";
  const vis=all.filter(c=>(!ccat||c.categoria===ccat)&&(!cest||c.escudo_estado===cest)&&(!q||normTxt([c.nombre,c.id,c.rama_de||"",c.blason||"",c.fuente||""].join(" ")).includes(q)));
  $("#ccount").textContent=`${vis.length} de ${all.length} casas`;
  const ordenCat=["real","principe_extranjero","noble_alta","noble_espada","toga","finanzas","servicio_ennoblecido","extranjera","plebeya"];
  ordenCat.forEach(cat=>{
    const items=vis.filter(c=>c.categoria===cat).sort((a,b)=>{
      const ga=Heraldica.personajesDeCasa(a.id,chars).todos.length, gb=Heraldica.personajesDeCasa(b.id,chars).todos.length;
      return gb-ga||a.nombre.localeCompare(b.nombre,"es");
    });
    if(!items.length)return;
    const grid=el("div",{class:"casa-grid"});
    items.forEach(cas=>{
      const g=Heraldica.personajesDeCasa(cas.id,chars), partes=[];
      if(g.pat.length)partes.push(g.pat.length+" pat.");
      if(g.mat.length)partes.push(g.mat.length+" mat.");
      if(g.ali.length)partes.push(g.ali.length+" al.");
      const sub=(partes.length?partes.join(" · "):"0 vínculos")+" · "+(Heraldica.ESTADOS[cas.escudo_estado]||cas.escudo_estado);
      grid.append(el("button",{type:"button",class:"casa-card",onclick:()=>openFichaCasa(cas.id)},
        el("div",{class:"casa-emblema"},Heraldica.escudoEl(cas.id,{size:78})),
        el("div",{class:"casa-card-meta"},el("span",{class:"casa-card-nom"},cas.nombre),el("span",{class:"casa-card-sub"},sub))));
    });
    wrap.append(el("div",{class:"rama"},el("h3",{},(Heraldica.CATEGORIAS[cat]||cat)+" ",el("span",{class:"note"},items.length+" casas")),grid));
  });
  if(!vis.length)wrap.append(el("p",{class:"note"},"Ninguna casa coincide con el filtro."));
}

function openFichaCasa(cid,reset=false){
  if(typeof Heraldica==="undefined")return;
  const cas=Heraldica.get(cid); if(!cas)return;
  fichaIr(()=>{
    const f=$("#ficha"); f.innerHTML="";
    const chars=esPartida()?(LIBRO||[]).filter(caraConocida):(LIBRO||[]);
    const subCat=Heraldica.CATEGORIAS[cas.categoria]||cas.categoria||"Casa";
    const metaTop=subCat+(cas.rama_de?" · "+Heraldica.ramaNombre(cas.rama_de):"");
    const dl=el("dl",{});
    if(cas.blason)dlPair(dl,"Blasonamiento",el("p",{class:"casa-blason"},cas.blason));
    dlPair(dl,"Estado del escudo",Heraldica.ESTADOS[cas.escudo_estado]||cas.escudo_estado||"");
    if(cas.escudo_estado==="plebeya_generico"&&cas.plebeya_diseno){
      const PAT_LAB={partido_horizontal:"partido horizontal",partido_vertical:"partido vertical",grid_2x2:"grid 2×2",rayas_horizontales:"rayas horizontales",rayas_verticales:"rayas verticales",moteado:"moteado",grid_2x2_tricolor:"grid 2×2 (dos oscuros)",tres_bandas:"tres bandas"};
      dlPair(dl,"Diseño",PAT_LAB[cas.plebeya_diseno.patron]||cas.plebeya_diseno.patron.replace(/_/g," "));
      if(cas.plebeya_diseno.lectura)dlPair(dl,"Lectura del emblema",cas.plebeya_diseno.lectura);
    }
    dlPair(dl,"Fuente",cas.fuente);

    f.append(
      fichaNavBar(),
      el("span",{class:"label"},metaTop),
      el("div",{class:"sim-ficha-cabecera"},Heraldica.escudoEl(cas.id,{size:78}),
        el("div",{},el("h2",{},cas.nombre),
          el("div",{class:"row"},
            typeof confBadgeEl==="function"?confBadgeEl(cas.confianza):null,
            !esPartida()?el("button",{type:"button",class:"btn sm",onclick:()=>{fichaCerrar();$("#f-casa").value=cas.id;setPerSubVista("per")}},"Filtrar en Personajes →"):null))),
      el("div",{class:"rule"}),
      dl
    );

    if(cas.rama_de){
      const hermanas=Heraldica.all().filter(x=>x.rama_de===cas.rama_de&&x.id!==cas.id);
      if(hermanas.length){
        f.append(el("span",{class:"label"},"Otras ramas del tronco ("+Heraldica.ramaNombre(cas.rama_de)+")"),
          el("div",{class:"jer-subs"},...hermanas.map(h=>el("button",{type:"button",class:"btn sm",onclick:()=>openFichaCasa(h.id)},h.nombre))));
      }
    }

    const grupos=Heraldica.personajesDeCasa(cas.id,chars);
    const secGrupo=(tit,lista)=>{
      if(!lista.length)return;
      const g=el("div",{class:"sim-personas"});
      lista.forEach(p=>g.append(el("button",{type:"button",class:"plate",onclick:()=>openFichaL(p)},plateFaceEl(p,!esPartida()),el("span",{class:"nm"},p.nombre_nac||p.nombre))));
      f.append(el("span",{class:"label"},tit+" ("+lista.length+")"),g);
    };
    if(!grupos.todos.length)f.append(el("p",{class:"note"},esPartida()?"Aún no conoces a nadie de esta casa.":"Ningún personaje cargado está vinculado todavía a esta casa."));
    else{secGrupo("Casa paterna / nacimiento",grupos.pat);secGrupo("Línea materna",grupos.mat);secGrupo("Alianza marital",grupos.ali)}

    if(!esPartida()&&typeof TITULOS!=="undefined"&&TITULOS.length){
      const patIds=new Set();
      grupos.pat.forEach(p=>{patIds.add(p.id);if(p.escritorio_id)patIds.add(p.escritorio_id)});
      const nomLow=cas.nombre.toLowerCase();
      const ts=TITULOS.filter(t=>(t.titular_id&&patIds.has(t.titular_id))||(t.casa&&t.casa.toLowerCase().includes(nomLow)));
      if(ts.length){
        f.append(el("span",{class:"label"},"Títulos vinculados ("+ts.length+")"),
          el("div",{class:"jer-subs"},...ts.map(t=>el("button",{type:"button",class:"btn sm",onclick:()=>openFichaTitulo(t.id)},t.nombre))));
      }
    }
    f.hidden=false; f.querySelector(".x")?.focus();
  },reset);
}

/* ---------- Símbolos: catálogo y ficha ---------- */
function renderSimFilter(){
  const fs=$("#f-sim"); if(!fs)return;
  const cur=fs.value; fs.innerHTML="";
  fs.append(el("option",{value:""},"Todo símbolo"));
  (SIMBOLOS||[]).forEach(s=>fs.append(el("option",{value:s.id},s.nombre)));
  fs.value=cur;
}
function simIcoEl(id){
  const s=(SIMBOLOS||[]).find(x=>x.id===id)||{id,nombre:id,desc:""};
  const sp=el("span",{class:"sim-ico",title:s.desc?s.nombre+" — "+s.desc:s.nombre});
  const imgSrc=SIM_LOCAL[id]||SIM_IMG[id];
  if(imgSrc)sp.append(el("img",{src:imgSrc,alt:s.nombre}));
  else{const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");svg.setAttribute("viewBox","0 0 24 24");svg.setAttribute("aria-hidden","true");svg.innerHTML=s.svg||"<circle cx='12' cy='12' r='6'/>";sp.append(svg)}
  return sp;
}
function simPillsFichaEl(c){
  const ids=c?.simbolos||[]; if(!ids.length)return null;
  const w=el("div",{class:"sims-row"});
  ids.forEach(id=>{
    const s=(SIMBOLOS||[]).find(x=>x.id===id)||{id,nombre:id,desc:""};
    w.append(el("button",{type:"button",class:"sim-pill",title:s.desc||"",onclick:e=>{e.stopPropagation();openFichaSimbolo(id)}},simIcoEl(id),el("span",{},s.nombre)));
  });
  return w;
}
function achicarSimboloImg(f){return new Promise((ok,ko)=>{const u=URL.createObjectURL(f),i=new Image();
  i.onload=()=>{const n=Math.max(i.naturalWidth,i.naturalHeight),c=document.createElement("canvas");c.width=c.height=256;
    const x=c.getContext("2d"),w=i.naturalWidth/n*256,h=i.naturalHeight/n*256;
    x.drawImage(i,(256-w)/2,(256-h)/2,w,h);URL.revokeObjectURL(u);ok(c.toDataURL("image/png"))};
  i.onerror=()=>{URL.revokeObjectURL(u);ko(new Error("No se pudo leer la imagen"))};i.src=u})}
async function subirSimboloImg(id,f){
  if(!f)return;
  if(!/^image\//.test(f.type)){$("#smsg").textContent="Ese archivo no es una imagen.";return}
  if(f.size>10*1024*1024){$("#smsg").textContent="La imagen pesa demasiado.";return}
  try{
    const img=await achicarSimboloImg(f);
    if(OWNER&&(db||GH?.tiene())){
      $("#smsg").textContent="Subiendo símbolo "+id+"…";
      await (db||GH).doc("simbolos/"+id).set({img});
      delete SIM_LOCAL[id]; SIM_IMG[id]=img;
      $("#smsg").textContent="Símbolo "+id+" guardado.";
    } else {
      SIM_LOCAL[id]=img;
      $("#smsg").textContent="Vista previa local para "+id+" (sin llave activa: se perderá al recargar).";
    }
    renderSimbolos(); drawFaces();
  }catch(err){$("#smsg").textContent="No se pudo procesar: "+(err&&err.message||err)}
}
function renderSimbolos(){
  const wrap=$("#sim-wrap"); if(!wrap)return; wrap.innerHTML="";
  if($("#sim-gh-st"))$("#sim-gh-st").textContent=db?"Conectado con Claude.":OWNER?"Llave de GitHub activa: los cambios se guardan en el repositorio.":"Sin llave activa: solo consulta y vista previa local.";
  if(!(SIMBOLOS||[]).length){wrap.append(el("p",{class:"note"},"No hay símbolos cargados."));return}
  const grupos=[...new Set(SIMBOLOS.map(s=>s.grupo||"Otros"))];
  grupos.forEach(g=>{
    const grid=el("div",{class:"sim-grid"});
    SIMBOLOS.filter(s=>(s.grupo||"Otros")===g).forEach(s=>{
      const cur=SIM_LOCAL[s.id]||SIM_IMG[s.id];
      const inp=el("input",{type:"file",accept:"image/*",hidden:""});
      inp.onchange=e=>{const f=e.target.files[0];e.target.value="";if(f)subirSimboloImg(s.id,f)};
      const box=el("span",{class:"sim-box","aria-hidden":"true"},cur?el("img",{src:cur,alt:s.nombre}):simIcoEl(s.id));
      const openBtn=el("button",{type:"button",class:"sim-open",onclick:()=>openFichaSimbolo(s.id)},box,
        el("span",{class:"sim-meta"},el("b",{},s.nombre),el("code",{},"datos/simbolos/"+s.id+".png"),el("span",{class:"sim-desc"},s.desc||"")));
      const nUsos=(LIBRO||[]).filter(c=>(c.simbolos||[]).includes(s.id)).length;
      const acts=el("div",{class:"sim-acts"},
        el("button",{type:"button",class:"btn sm",onclick:()=>{$("#f-sim").value=s.id;setPerSubVista("per")}},nUsos+" personajes"),
        el("button",{type:"button",class:"btn sm",onclick:()=>inp.click()},cur?"Cambiar imagen":"Subir imagen"));
      if(OWNER&&SIM_IMG[s.id]){
        acts.append(el("button",{type:"button",class:"btn sm danger",onclick:async()=>{try{await (db||GH).doc("simbolos/"+s.id).delete();delete SIM_IMG[s.id];delete SIM_LOCAL[s.id];$("#smsg").textContent="Símbolo "+s.id+" quitado.";renderSimbolos();drawFaces()}catch(e){$("#smsg").textContent="No se pudo quitar."}}},"Quitar"));
      }
      grid.append(el("div",{class:"sim-card"},openBtn,inp,acts));
    });
    wrap.append(el("div",{class:"rama"},el("h3",{},g),grid));
  });
}
function openFichaSimbolo(sid,reset=false){
  const s=(SIMBOLOS||[]).find(x=>x.id===sid); if(!s)return;
  fichaIr(()=>{
    const f=$("#ficha"); f.innerHTML="";
    const data=s.ficha||{};
    const ico=simIcoEl(s.id); ico.classList.add("grande");
    f.append(
      fichaNavBar(),
      el("span",{class:"label"},s.grupo||"Símbolo"),
      el("div",{class:"sim-ficha-cabecera"},ico,el("div",{},el("h2",{},s.nombre),s.desc?el("p",{class:"note"},s.desc):null)),
      el("div",{class:"rule"})
    );
    const bloque=(tit,cont)=>{if(!cont)return;f.append(el("span",{class:"label"},tit),typeof cont==="string"?el("p",{},cont):cont)};
    bloque("Qué significa",data.significado);
    bloque("El símbolo",data.motivo);
    if(data.color){
      const p=el("p");
      if(/^#[0-9a-f]{6}$/i.test(data.color.muestra||"")){
        const m=el("span",{class:"sim-muestra","aria-hidden":"true"}); m.style.backgroundColor=data.color.muestra; p.append(m);
      }
      p.append(el("b",{},data.color.nombre),data.color.texto?". "+data.color.texto:"");
      bloque("Color asociado",p);
    }
    bloque("Contexto",data.contexto);
    if(data.fuentes?.length){
      const ul=el("ul",{class:"ficha-list"});
      data.fuentes.forEach(({nombre,url})=>{if(/^https:\/\//i.test(url))ul.append(el("li",{},el("a",{href:url,target:"_blank",rel:"noopener noreferrer"},nombre)))});
      if(ul.childElementCount)bloque("Fuentes",ul);
    }
    const port=(LIBRO||[]).filter(c=>(c.simbolos||[]).includes(s.id));
    if(!port.length)f.append(el("span",{class:"label"},"Personajes (0)"),el("p",{class:"note"},"Ninguna ficha lleva este símbolo."));
    else{
      const g=el("div",{class:"sim-personas"});
      port.forEach(c=>g.append(el("button",{type:"button",class:"plate",onclick:()=>openFichaL(c)},plateFaceEl(c,!esPartida()),el("span",{class:"nm"},c.nombre_nac||c.nombre))));
      f.append(el("span",{class:"label"},"Personajes ("+port.length+")"),g);
    }
    f.hidden=false; f.querySelector(".x")?.focus();
  },reset);
}

/* ---------- Ficha de personaje unificada: 5 pestañas en Mundo ---------- */
function renderFichaPersonaje5Tabs(c,container){
  const TABS=[["resumen","Resumen"],["familia","Familia"],["corte","Corte"],["perfil","Perfil"],["notas","Notas"]];
  const bar=el("div",{class:"tabs ficha-tabs",role:"tablist","aria-label":"Secciones de la ficha"});
  const body=el("div",{class:"ficha-tab-body"});

  const pintarTab=t=>{
    fichaTab=t;
    [...bar.children].forEach(b=>b.setAttribute("aria-selected",String(b.dataset.tab===t)));
    body.innerHTML="";
    if(t==="resumen"){
      const dl=el("dl",{});
      const rs=Array.isArray(c.residencia)?c.residencia:c.residencia?[c.residencia]:[];
      if((c.rangos||[]).length)dlPair(dl,"Rango",rangosEl(c.rangos));
      dlPair(dl,"Título",c.titulo_nob||c.titulo);
      dlPair(dl,"Puesto",c.puesto||c.cargo);
      dlPair(dl,"Nació",c.nacimiento);
      dlPair(dl,"Muere",c.muerte);
      if(c.edad)dlPair(dl,"Edad",c.edad+" años");
      if(rs.length)dlPair(dl,"Residencia",rs.map(r=>RES_FULL[r]||r).join(" · "));
      dlPair(dl,"Facción",c.faccion);
      dlPair(dl,"Con el rey",c.relacion_rey);
      dlPair(dl,"Datos",c.estatus);
      if(dl.childElementCount)body.append(dl);
      const fcEl=fichaCasasEl(c);
      if(fcEl)body.append(el("span",{class:"label"},"Casas y heráldica"),fcEl);
      else if(c.casa)body.append(el("span",{class:"label"},"Casa"),el("p",{},c.casa));
      const sp=simPillsFichaEl(c);
      if(sp)body.append(el("span",{class:"label"},"Símbolos"),sp);
      if(typeof titulosDePersonaje==="function"){
        const ts=titulosDePersonaje(c);
        if(ts.length)body.append(el("span",{class:"label"},"Títulos que porta"),el("div",{class:"jer-subs"},...ts.map(ti=>el("button",{type:"button",class:"btn sm",onclick:()=>openFichaTitulo(ti.id)},ti.nombre))));
      }
      if(c.apelaciones?.length){
        const adl=el("dl",{});
        c.apelaciones.forEach(a=>{
          const line=el("div",{class:"ap-line"},el("span",{class:"ap-nom"+(a.estado==="vigente"?" vig":a.estado==="futura"?" fut":"")},"«"+a.texto+"»"));
          if(a.estado==="vigente")line.append(el("span",{class:"ap-tag vig"},"1722"));
          else if(a.estado==="futura")line.append(el("span",{class:"ap-tag fut"},"futura"));
          if(a.conf&&a.conf!=="confirmado")line.append(el("span",{class:"ap-tag conf",title:"Confianza histórica: "+a.conf},a.conf));
          dlPair(adl,a.fecha||"—",el("div",{class:"ap-dd"},line,a.nota?el("div",{class:"ap-nota"},a.nota):null));
        });
        body.append(el("span",{class:"label"},"Apelaciones"),adl);
      }
      return;
    }
    if(t==="familia"){
      const dl=el("dl",{});
      [["Rango familiar",c.estatus_familia],["Casa",c.casa],["Padre",c.padre],["Madre",c.madre],["Lugar en la familia",c.lugar_familia],["Cónyuge",c.conyuge],["Hijos",c.hijos]]
        .forEach(([k,v])=>dlPair(dl,k,v));
      if(dl.childElementCount)body.append(dl);
      if(c.escritorio_id&&LINAJE.padres)body.append(el("span",{class:"label"},"Árbol genealógico"),familyBlock(c.escritorio_id));
      else if(!dl.childElementCount)body.append(el("p",{class:"note"},"Sin datos familiares registrados."));
      return;
    }
    if(t==="corte"){
      const dl=el("dl",{});
      [["Presencia",PRES[c.presencia_versalles]||""],["Dónde vive",c.ubicacion],["En la corte",c.llegada_corte],["Estudios",c.educacion],["Vocación",c.vocacion],["Religión",c.religion],["Lengua",c.lengua],["Riqueza",c.riqueza!=null?c.riqueza+"/10":""],["Favor",c.favor!=null?String(c.favor):""],["Quiere",c.quiere],["Oculta",c.oculta],["1722–23",c.hitos]]
        .forEach(([k,v])=>dlPair(dl,k,v));
      body.append(dl.childElementCount?dl:el("p",{class:"note"},"Sin datos cortesanos registrados."));
      return;
    }
    if(t==="perfil"){
      let algo=false;
      if(c.habilidades){
        algo=true;
        const hdl=el("dl",{});
        HAB.forEach(([k,l])=>{
          const n=+c.habilidades[k]||0, esc=(HAB_ESCALA[k]||[])[n]||"";
          const w=el("div",{class:"bar"+(n>=6?" elite":""),title:esc?n+": "+esc:"","aria-label":l+": "+n+" de 10"});
          const fill=el("i"); fill.style.width=(n*10)+"%";
          w.append(fill,el("b",{},String(n)));
          dlPair(hdl,l,w);
        });
        body.append(el("div",{class:"pane-h"},el("span",{class:"label"},"Habilidades (0–10)"),el("button",{type:"button",class:"btn sm",onclick:()=>abrirGuiaHab("erudicion")},"? Guía 0–10")),hdl);
      }
      if(c.rasgos&&Object.keys(c.rasgos).length){
        const rdl=el("dl",{}), rd=c.rasgos_doc||[];
        RAS.forEach(([k,n,a,b])=>{const v=+c.rasgos[k];if(!v||v===3)return;dlPair(rdl,n,dotsEl(v,v<3?a:b,rd.includes(k)))});
        if(rdl.childElementCount){algo=true;body.append(el("span",{class:"label"},"Rasgos (1–5 · los demás, neutros)"),rdl)}
      }
      if(c.cualidades){
        const cd=c.cualidades_doc||[], cdl=el("dl",{});
        CUAL.forEach(([k,l])=>{
          const v=c.cualidades[k]; if(v==null||v==="")return;
          if(typeof v==="number")dlPair(cdl,l,dotsEl(v,"",cd.includes(k)));
          else dlPair(cdl,l,el("span",{},v===true?"Sí":String(v),cd.includes(k)?docMark():null));
        });
        if(cdl.childElementCount){algo=true;body.append(el("span",{class:"label"},"Cualidades innatas"),cdl)}
      }
      if(c.innatos){
        const idl=el("dl",{}); INN.forEach(([k,l])=>dlPair(idl,l,c.innatos[k]));
        if(idl.childElementCount){algo=true;body.append(el("span",{class:"label"},"Innatos (resumen)"),idl)}
      }
      [["aficiones","Aficiones"],["talentos","Talentos"],["idiomas","Idiomas"]].forEach(([k,tit])=>{
        const xs=c[k]||[]; if(!xs.length)return; algo=true;
        const ldl=el("dl",{}); xs.forEach(x=>dlPair(ldl,x.n,nivelBarEl(x)));
        body.append(el("span",{class:"label"},tit),ldl);
      });
      if(!algo)body.append(el("p",{class:"note"},"Sin perfil de habilidades ni rasgos cargado."));
      return;
    }
    if(t==="notas"){
      const key=c.escritorio_id||c.id, notas=store.get("vg_notas",{});
      const ta=el("textarea",{id:"nota-"+key,placeholder:"Lo que piensas de esta persona. Solo tú lo ves."}); ta.value=notas[key]||"";
      ta.addEventListener("input",()=>{const n=store.get("vg_notas",{});n[key]=ta.value;store.set("vg_notas",n)});
      body.append(el("label",{class:"label",for:"nota-"+key},"Tus notas"),ta);
      if(OWNER){
        const msg=el("span",{class:"note","aria-live":"polite"});
        const cp=el("button",{type:"button",class:"btn sm",onclick:async()=>{
          try{await navigator.clipboard.writeText(c.prompt||"");msg.textContent="Prompt copiado."}
          catch{msg.textContent="Copia manual desde el recuadro."}
        }},"Copiar prompt");
        body.append(el("div",{class:"pane-h"},el("span",{class:"label"},"Prompt del retrato"),cp),msg,el("div",{class:"prompt"},c.prompt||"Sin prompt."));
      }
    }
  };

  TABS.forEach(([k,tit])=>bar.append(el("button",{type:"button",role:"tab","data-tab":k,"aria-selected":String(k===fichaTab),onclick:()=>pintarTab(k)},tit)));
  container.append(bar,body);
  pintarTab(TABS.some(([k])=>k===fichaTab)?fichaTab:"resumen");
}

/* ---------- Listeners del libro unificado ---------- */
$("#sub-per")?.addEventListener("click",()=>setPerSubVista("per"));
$("#sub-cas")?.addEventListener("click",()=>setPerSubVista("cas"));
$("#sub-sim")?.addEventListener("click",()=>setPerSubVista("sim"));
$("#b-guia-hab")?.addEventListener("click",()=>abrirGuiaHab("erudicion"));
$("#guia-close")?.addEventListener("click",cerrarGuiaHab);
$("#guia-modal")?.addEventListener("click",e=>{if(e.target.id==="guia-modal")cerrarGuiaHab()});
$("#qc")?.addEventListener("input",renderCasas);
$("#ccat")?.addEventListener("change",renderCasas);
$("#cest")?.addEventListener("change",renderCasas);
$("#f-orden")?.addEventListener("change",drawFaces);
$("#f-res")?.addEventListener("change",drawFaces);
$("#f-sim")?.addEventListener("change",drawFaces);
$("#ns-gen")?.addEventListener("click",()=>{
  const id=$("#ns-id").value.trim().toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-|-$/g,"");
  const nom=$("#ns-nom").value.trim(), grp=$("#ns-grp").value.trim()||"Papel en la corte", desc=$("#ns-desc").value.trim();
  const out=$("#ns-out"); if(!out)return; out.hidden=false;
  if(!id||!nom){out.textContent="Escribe al menos un id y un nombre.";return}
  out.textContent="Añade esta entrada a web/datos/simbolos.json y guarda tu imagen en web/datos/simbolos/"+id+".png:\n\n"+JSON.stringify({id,nombre:nom,grupo:grp,desc:desc||nom},null,2);
});
