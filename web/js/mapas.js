const NS="http://www.w3.org/2000/svg";
const sv=(t,a={},txt)=>{const e=document.createElementNS(NS,t);for(const[k,v]of Object.entries(a))e.setAttribute(k,v);if(txt)e.textContent=txt;return e};

/* Orientación de ambos planos, como en los planos de época: jardines (oeste) arriba, ciudad y avenidas abajo;
   sur a la izquierda (aposentos de la reina), norte a la derecha (Grandes Aposentos del Rey).
   Tupla: [id, nombre, etiqueta corta, x, y, w, h, clase, descripción]  ·  polígono: x = "puntos", y = [lx,ly] posición de la etiqueta. */
const PALACIO = [
 // Patios (se dibujan primero)
 ["royale","Patio Real","Patio Real",165,280,275,425,"open","Entrada de carrozas desde la Plaza de Armas. El acceso en carroza es privilegio de rango."],
 ["marbre","Patio de Mármol","Patio de Mármol",255,130,135,150,"open","Patio de honor ante la Cámara del Rey."],
 // Fachada de los jardines
 ["paix","Salón de la Paz","Paz",55,40,55,55,"","Extremo sur de la Galería; da paso a los aposentos de la reina."],
 ["galerie","Galería de los Espejos","Galería de los Espejos",110,40,370,55,"","Terminada en 1684. Paso diario de la corte hacia los aposentos del rey: aquí se ve y se es visto."],
 ["guerre","Salón de la Guerra","Guerra",480,40,55,55,"","Extremo norte de la Galería; abre los Grandes Aposentos del Rey."],
 // Aposentos de la Reina (sur)
 ["chreine","Cámara de la Reina","Cámara de la Reina",55,95,95,55,"","Sin reina en 1722: el rey está prometido a una infanta de cuatro años."],
 ["nobles","Gran Gabinete de la Reina","Gran Gabinete",55,150,95,60,"","Sala de audiencias de la reina."],
 ["antreine","Antecámara de la Reina","Antecámara",55,210,95,65,"","Antecámara de los aposentos de la reina."],
 ["gardesreine","Sala de Guardias de la Reina","Guardias Reina",55,275,95,60,"","Guardia de los aposentos de la reina."],
 ["grandegardes","Gran Sala de Guardias","Gran Sala de Guardias",55,335,110,70,"","Sala principal de guardias, en lo alto de la Escalera de la Reina."],
 ["cabreine","Gabinetes interiores de la Reina","Gabinetes",150,95,60,170,"","Pequeños gabinetes y patio interior: la vida privada de los aposentos."],
 ["escreine","Escalera de la Reina","Escalera Reina",165,265,55,60,"","Subida habitual desde el Patio de Mármol hacia los aposentos del rey y de la reina."],
 // Aposentos del Rey (centro)
 ["gardesroi","Sala de Guardias del Rey","Guardias",210,195,45,70,"","Primera sala del rey tras la Escalera de la Reina."],
 ["premiere","Primera Antecámara","1ª Antecámara",210,130,45,65,"","Antecámara donde el rey come en público."],
 ["oeil","Antecámara del Œil-de-Bœuf","Œil-de-Bœuf",210,95,85,35,"","Antecámara con ventana ovalada. Aquí esperan los cortesanos antes del lever; aquí nacen los rumores."],
 ["chambre","Cámara del Rey","Cámara",295,95,45,35,"","Centro ceremonial del palacio: aquí se celebran el lever y el coucher."],
 ["conseil","Gabinete del Consejo","Consejo",340,95,50,35,"","Donde el rey reúne a sus consejos."],
 ["cabroi","Gabinetes interiores del Rey","Gabinetes del Rey",390,95,80,190,"","Gabinetes, patio interior y piezas privadas. Solo entra quien es llamado."],
 ["ambassadeurs","Escalera de los Embajadores","Escalera Embajadores",390,285,80,75,"","Escalera monumental de acceso a los Grandes Aposentos del Rey."],
 // Grandes Aposentos del Rey (norte)
 ["apollon","Salón de Apolo","Apolo",470,95,70,50,"","Sala del trono."],
 ["mercure","Salón de Mercurio","Mercurio",470,145,70,50,"","Antigua cámara de aparato."],
 ["mars","Salón de Marte","Marte",470,195,70,55,"","Sala de guardias y de conciertos."],
 ["diane","Salón de Diana","Diana",470,250,70,50,"","Sala del billar en las veladas de corte."],
 ["venus","Salón de Venus","Venus",470,300,70,50,"","Colaciones durante las veladas de corte."],
 ["abondance","Salón de la Abundancia","Abundancia",470,350,70,40,"","Antesala del gabinete de curiosidades del rey."],
 ["hercule","Antigua capilla","Antigua capilla",470,390,85,50,"","Capilla de 1682 a 1710, en obras desde entonces. Paso hacia la nueva Capilla Real y el ala norte."],
 // Alas del Patio Real
 ["aile-s","Ala sur del Patio Real","Alojamientos",55,405,95,300,"","Alojamientos de cortesanos y oficiales. Un apartamento aquí se disputa durante años."],
 ["aile-n","Ala norte del Patio Real","Alojamientos",440,440,95,265,"","Alojamientos de cortesanos y oficiales."]
];
const DOMINIO = [
 // Agua y jardines
 ["canal","Gran Canal","Gran Canal","285,40 315,40 315,120 460,120 460,145 315,145 315,285 285,285 285,145 140,145 140,120 285,120","water","Paseos en góndola en verano. Sus brazos llevan al Trianon y a la Ménagerie.",[300,70]],
 ["trianon","Gran Trianon","Trianon",470,95,85,60,"","Palacio de mármol rosa al extremo norte del canal. Retiro del rey."],
 ["menagerie","Ménagerie","Ménagerie",45,95,85,60,"","Colección de animales exóticos al extremo sur del canal."],
 ["apolo","Fuente de Apolo","Apolo",270,285,60,18,"water","Cabecera del canal."],
 ["bosquets","Bosquetes","Bosquetes",150,305,300,110,"green","Salones de verdor y fuentes entre setos: lugares para hablar sin testigos."],
 ["parterres","Parterres","Parterres",215,415,170,55,"green","Parterres de agua frente a la Galería."],
 ["suisses","Estanque de los Suizos","Suizos",20,300,120,45,"water","Gran estanque al sur, excavado por un regimiento suizo."],
 ["orangerie","Orangerie","Orangerie",95,410,115,45,"","Naranjos y palmeras en cajones; se sacan al sol en verano."],
 ["potager","Huerto del Rey","Huerto",20,470,85,70,"green","Frutas y hortalizas para la mesa del rey."],
 // Palacio
 ["midi","Ala Sur (de los Príncipes)","Ala Sur",110,480,130,32,"","Alojamientos de los príncipes de la sangre."],
 ["corps","Cuerpo central","Palacio",240,470,120,60,"","Aposentos del rey y de la reina y Galería de los Espejos. Ver la pestaña Palacio."],
 ["nord","Ala Norte y Capilla Real","Ala Norte",360,480,130,32,"","Alojamientos de cortesanos; la Capilla Real, consagrada en 1710, junto al cuerpo central."],
 ["commun","Gran Común","Gran Común",160,530,75,50,"","Cocinas y alojamiento de oficiales y servidumbre de la casa del rey."],
 ["patios","Patio Real y de Mármol","Patios",255,530,90,60,"open","Entrada al palacio desde la Plaza de Armas."],
 ["armes","Plaza de Armas","Plaza de Armas","220,590 380,590 400,640 200,640","open","Explanada donde convergen las tres avenidas.",[300,620]],
 ["gecurie","Gran Caballeriza","Gran Caballeriza",335,648,80,42,"","Caballos de silla, pajes, picadero."],
 ["pecurie","Pequeña Caballeriza","Pequeña Caballeriza",185,648,80,42,"","Caballos de tiro y carrozas."],
 // Avenidas (la «pata de oca»)
 ["av-paris","Avenida de París","Av. de París","292,640 308,640 318,760 282,760","road","Hacia París, a unas cuatro leguas. Por aquí llegan las cartas, los acreedores y las noticias.",[300,735]],
 ["av-stcloud","Avenida de Saint-Cloud","Av. de Saint-Cloud","318,640 332,640 575,752 548,760","road","Hacia Saint-Cloud, residencia de la casa de Orleans.",[470,710]],
 ["av-sceaux","Avenida de Sceaux","Av. de Sceaux","268,640 282,640 52,760 25,752","road","Hacia Sceaux, donde la duquesa de Maine tiene su propia corte.",[130,710]],
 // Ciudad
 ["ville-n","Barrio de Notre-Dame","Barrio Notre-Dame",440,530,145,110,"","Mercado, parroquia y hôtels de la nobleza al norte de la ciudad."],
 ["ville-s","Barrio de Saint-Louis","Barrio Saint-Louis",15,560,150,80,"","El «Viejo Versalles» al sur: posadas, artesanos, el parque de los ciervos."]
];
const CIUDADES = [ // lon, lat, ciudad, provincia, nota
 [2.35,48.86,"París","Île-de-France","Sede del Parlamento; el Palais-Royal del Regente."],
 [4.03,49.26,"Reims","Champagne","Ciudad de la consagración de los reyes."],
 [3.06,50.63,"Lille","Flandre","Plaza fuerte de la frontera norte."],
 [1.10,49.44,"Ruan","Normandie","Parlamento de Normandía."],
 [-1.68,48.11,"Rennes","Bretagne","Estados de Bretaña; ciudad devastada por el incendio de 1720."],
 [-0.58,44.84,"Burdeos","Guyenne","Puerto del vino y del comercio con las Antillas."],
 [1.44,43.60,"Toulouse","Languedoc","Parlamento de Toulouse."],
 [3.88,43.61,"Montpellier","Languedoc","Facultad de medicina de gran prestigio."],
 [5.37,43.30,"Marsella","Provence","Sale de la gran peste de 1720."],
 [4.84,45.76,"Lyon","Lyonnais","Sedas y banca."],
 [5.04,47.32,"Dijon","Bourgogne","Estados de Borgoña."],
 [7.75,48.58,"Estrasburgo","Alsace","Ciudad del Rin, francesa desde 1681."],
 [5.72,45.19,"Grenoble","Dauphiné","Parlamento del Delfinado."],
 [6.02,47.24,"Besanzón","Franche-Comté","Provincia francesa desde 1678."]
];
/* Grandes caminos desde París (esquemáticos): índices en CIUDADES, con paradas intermedias. */
const CAMINOS = [[0,1],[0,2],[0,3],[0,4],[0,10,9,8],[9,12],[0,6],[0,5],[6,7,8],[0,11],[10,13]];
const CONTORNO = [[2.37,51.03],[1.6,50.7],[1.6,50.2],[1.08,49.92],[0.1,49.49],[-1.2,49.35],[-1.9,49.7],[-1.5,48.64],[-2.0,48.65],[-3.0,48.8],[-4.5,48.4],[-4.7,48.04],[-3.37,47.75],[-2.2,47.27],[-1.15,46.16],[-1.03,45.62],[-1.17,44.66],[-1.47,43.49],[-1.78,43.36],[-0.5,42.8],[0.7,42.7],[1.7,42.5],[3.17,42.43],[3.05,42.7],[3.1,43.1],[3.7,43.4],[4.6,43.4],[5.37,43.3],[5.93,43.12],[6.7,43.4],[7.2,43.7],[6.9,44.4],[6.9,45.1],[6.2,45.4],[5.8,45.7],[5.95,46.2],[6.1,46.4],[6.8,47.3],[7.5,47.6],[7.8,48.5],[8.2,48.97],[6.9,49.2],[6.0,49.5],[4.9,49.8],[4.2,49.95],[3.6,50.4],[2.6,50.8]];

let mapSel=null;
function mapInfo(titulo,texto,extra){
  const b=$("#map-info"); b.innerHTML="";
  b.append(el("h3",{},titulo),el("p",{},texto)); if(extra)b.append(extra);
}
function pickable(node,svg,n,d){
  const pick=()=>{svg.querySelectorAll(".zone").forEach(z=>z.classList.remove("sel"));node.classList.add("sel");mapInfo(n,d,el("div",{class:"note"},"Nadie a la vista por ahora. Los presentes aparecerán aquí conforme avance la partida."))};
  node.setAttribute("tabindex",0); node.setAttribute("role","button"); node.setAttribute("aria-label",n);
  node.addEventListener("click",pick); node.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();pick()}});
}
function drawRooms(svg,rooms){
  const labels=[];
  rooms.forEach(r=>{
    if(typeof r[3]==="string"){ // polígono
      const [id,n,short,pts,cls,d,[lx,ly]]=r;
      const poly=sv("polygon",{points:pts,class:"zone "+cls}); pickable(poly,svg,n,d); svg.append(poly);
      labels.push(sv("text",{x:lx,y:ly,"text-anchor":"middle",class:"mlabel s"},short));
      return;
    }
    const [id,n,short,x,y,w,h,cls,d]=r;
    const rect=sv("rect",{x,y,width:w,height:h,class:"zone "+cls}); pickable(rect,svg,n,d); svg.append(rect);
    const vertical=h>w*1.8&&w<60, size=Math.min(vertical?h:w,200);
    if(size<38)return;
    const t=sv("text",{x:x+w/2,y:y+h/2+4,"text-anchor":"middle",class:"mlabel"+(size<90||cls==="open"?" s":"")},short);
    if(vertical)t.setAttribute("transform",`rotate(-90 ${x+w/2} ${y+h/2})`);
    labels.push(t);
  });
  labels.forEach(t=>svg.append(t)); // etiquetas encima de las zonas
}
function note(svg,x,y,txt,anchor="middle"){svg.append(sv("text",{x,y,"text-anchor":anchor,class:"compass"},txt))}
function drawMap(kind){
  const box=$("#map-box"); box.innerHTML="";
  const svg=sv("svg",{role:"img"});
  if(kind==="palacio"){
    svg.setAttribute("aria-label","Plano del primer piso del cuerpo central del palacio");
    svg.setAttribute("viewBox","0 0 600 760");
    note(svg,300,24,"↑ Jardines (oeste)");
    drawRooms(svg,PALACIO);
    note(svg,52,470,"← Ala Sur","end"); note(svg,560,420,"Capilla y Ala Norte →","start");
    svg.setAttribute("viewBox","-60 0 720 760");
    note(svg,300,740,"↓ Plaza de Armas · avenidas de París, Saint-Cloud y Sceaux");
    note(svg,-50,24,"Sur ←  · Primer piso","start");
    mapInfo("Palacio · primer piso","Cuerpo central como en los planos de época: la Galería sobre los jardines, los aposentos de la reina al sur y los Grandes Aposentos del Rey al norte. Toca una estancia.");
  } else if(kind==="dominio"){
    svg.setAttribute("aria-label","Plano del dominio de Versalles");
    svg.setAttribute("viewBox","0 0 600 770");
    note(svg,300,24,"↑ Oeste · sur a la izquierda, norte a la derecha");
    drawRooms(svg,DOMINIO);
    note(svg,300,768,"↓ París");note(svg,590,744,"Saint-Cloud ↘","end");note(svg,10,744,"↙ Sceaux","start");
    mapInfo("El dominio","Jardines y canal arriba, el palacio en el centro y, abajo, las tres avenidas que salen de la Plaza de Armas hacia París, Saint-Cloud y Sceaux. Toca un lugar.");
  } else {
    drawProvinces(box);
    return;
  }
  box.append(svg);
}

/* ---------- Francia: mapa de provincias al estilo Clausewitz ----------
   mapa/provinces.png: un color RGB exacto por provincia. Se lee píxel a píxel para saber
   qué provincia hay bajo el dedo y para trazar fronteras donde cambia el color. */
const PROV_DEF = __PROVDEF__;
const PROV_PNG = "__PROVPNG__";
const GEO = {lon0:-5.2, lon1:8.6, lat1:51.3, k:Math.cos(46.5*Math.PI/180)};
let provState=null, provSel=-1;
async function loadProvinces(){
  if(provState)return provState;
  const img=new Image(); img.src=PROV_PNG; await img.decode();
  const w=img.width,h=img.height,c=document.createElement("canvas"); c.width=w;c.height=h;
  const x=c.getContext("2d",{willReadFrequently:true}); x.drawImage(img,0,0);
  const px=x.getImageData(0,0,w,h).data, key=new Map(PROV_DEF.map((r,i)=>[(r.r<<16)|(r.g<<8)|r.b,i]));
  const ids=new Int16Array(w*h); for(let i=0;i<w*h;i++){const k=(px[i*4]<<16)|(px[i*4+1]<<8)|px[i*4+2];ids[i]=key.has(k)?key.get(k):-1}
  const edge=new Uint8Array(w*h); for(let y=0;y<h;y++)for(let x2=0;x2<w;x2++){const i=y*w+x2,a=ids[i];if((x2+1<w&&ids[i+1]!==a)||(y+1<h&&ids[i+w]!==a))edge[i]=1}
  const s=w/((GEO.lon1-GEO.lon0)*GEO.k);
  provState={w,h,ids,edge,P:([lo,la])=>[(lo-GEO.lon0)*GEO.k*s,(GEO.lat1-la)*s]};
  return provState;
}
function tokenRGB(name){const v=getComputedStyle(document.documentElement).getPropertyValue(name).trim();const m=v.match(/^#([0-9a-f]{6})$/i);if(m){const n=parseInt(m[1],16);return [n>>16,(n>>8)&255,n&255]}return [128,128,128]}
const mix=(a,b,t)=>a.map((v,i)=>Math.round(v*(1-t)+b[i]*t));
function renderProvinces(canvas){
  const {w,h,ids,edge,P}=provState, ctx=canvas.getContext("2d"), im=ctx.createImageData(w,h), d=im.data;
  const chip=tokenRGB("--chip"),line=tokenRGB("--line"),muted=tokenRGB("--muted"),gilt=tokenRGB("--gilt"),paper=tokenRGB("--paper"),ink=tokenRGB("--ink");
  const fills=PROV_DEF.map((r,i)=>r.tipo==="reino"?mix(chip,line,[0,.35,.7][i%3]):r.tipo==="extranjero"?paper:null);
  for(let i=0;i<w*h;i++){
    const id=ids[i]; let c=id>=0?fills[id]:null, a=255;
    if(!c){a=0;c=paper}
    else{
      if(PROV_DEF[id].tipo==="extranjero"&&((i%w)+Math.floor(i/w))%9<2)c=line;
      if(id===provSel)c=mix(c,gilt,.45);
      if(edge[i])c=muted;
    }
    const o=i*4; d[o]=c[0];d[o+1]=c[1];d[o+2]=c[2];d[o+3]=a;
  }
  ctx.putImageData(im,0,0);
  ctx.save(); ctx.strokeStyle=`rgb(${gilt})`; ctx.lineWidth=2; ctx.setLineDash([7,5]);
  CAMINOS.forEach(path=>{ctx.beginPath();path.forEach((ci,j)=>{const [x,y]=P(CIUDADES[ci]);j?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke()});
  ctx.restore();
  ctx.font=`20px ${getComputedStyle(document.body).fontFamily}`; ctx.fillStyle=`rgb(${ink})`;
  CIUDADES.forEach(c=>{const [x,y]=P(c);ctx.beginPath();ctx.arc(x,y,6,0,7);ctx.fill();const tw=ctx.measureText(c[2]).width;ctx.fillText(c[2],x+10+tw>w?x-10-tw:x+10,y+6)});
  const [vx,vy]=P([2.13,48.80]); ctx.fillStyle=`rgb(${gilt})`; ctx.beginPath(); ctx.arc(vx,vy,5,0,7); ctx.fill();
}
function provInfo(i){
  provSel=i; const r=PROV_DEF[i];
  const ciudades=CIUDADES.filter(c=>{const [x,y]=provState.P(c);return provState.ids[Math.round(y)*provState.w+Math.round(x)]===i}).map(c=>c[2]);
  mapInfo(r.nombre,(r.tipo==="extranjero"?"Fuera del reino en 1722. ":"")+(r.capital?"Capital: "+r.capital+". ":"")+(r.nota||""),
    el("div",{class:"note"},(ciudades.length?"Ciudades en el mapa: "+ciudades.join(", ")+". ":"")+"Fronteras provisionales: el mapa se corregirá a mano."));
}
async function drawProvinces(box){
  mapInfo("Reino de Francia","Cargando provincias…");
  try{await loadProvinces()}catch(e){mapInfo("Reino de Francia","No se pudo cargar el mapa de provincias.");return}
  const {w,h}=provState;
  const canvas=el("canvas",{width:w,height:h,role:"img","aria-label":"Mapa de provincias de Francia en 1722",style:"display:block;width:100%;height:auto;cursor:pointer"});
  const sel=el("select",{id:"prov-sel","aria-label":"Ir a una provincia",style:"margin:8px;max-width:calc(100% - 16px)"},el("option",{value:""},"Ir a una provincia…"),
    ...PROV_DEF.map((r,i)=>r.tipo==="fuera"?null:el("option",{value:i},r.nombre+(r.tipo==="extranjero"?" (no francés)":""))).filter(Boolean));
  box.append(canvas,sel);
  const pick=i=>{if(i<0||PROV_DEF[i].tipo==="fuera")return;provInfo(i);renderProvinces(canvas);sel.value=String(i)};
  canvas.addEventListener("click",e=>{const r=canvas.getBoundingClientRect();const x=Math.floor((e.clientX-r.left)*w/r.width),y=Math.floor((e.clientY-r.top)*h/r.height);pick(provState.ids[y*w+x])});
  sel.onchange=()=>{if(sel.value!=="")pick(+sel.value)};
  renderProvinces(canvas);
  if(provSel>=0)provInfo(provSel); else mapInfo("Reino de Francia","Gobiernos generales en 1722, en un mapa provisional generado a partir de sus capitales. Las zonas rayadas no eran francesas: la Lorena, el principado de Dombes y el Condado Venesino. Toca una provincia.");
}
