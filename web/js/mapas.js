const NS="http://www.w3.org/2000/svg";
const sv=(t,a={},txt)=>{const e=document.createElementNS(NS,t);for(const[k,v]of Object.entries(a))e.setAttribute(k,v);if(txt)e.textContent=txt;return e};
const PALACIO = [
 // id, nombre, x,y,w,h, clase, descripción
 ["galerie","Galería de los Espejos",200,150,16,120,"","Terminada en 1684. Paso diario de la corte hacia los aposentos del rey: aquí se ve y se es visto."],
 ["gar","Grandes Aposentos del Rey",216,150,114,24,"","Salones de aparato (Abundancia, Venus, Diana, Marte, Mercurio, Apolo). Recepciones y veladas de corte."],
 ["gareine","Aposentos de la Reina",216,246,114,24,"","Sin reina en 1722: el rey está prometido a una infanta de cuatro años."],
 ["interieur","Aposentos interiores y Œil-de-Bœuf",216,174,30,72,"","Gabinetes y antecámaras alrededor del Patio de Mármol. En la antecámara del Œil-de-Bœuf esperan los cortesanos."],
 ["chambre","Cámara del Rey",246,196,16,28,"","Centro ceremonial del palacio: aquí se celebran el lever y el coucher."],
 ["marbre","Patio de Mármol",262,182,68,56,"open","Patio de honor ante la Cámara del Rey."],
 ["nord","Ala Norte",200,40,36,110,"","Alojamientos de cortesanos."],
 ["chapelle","Capilla Real",236,104,42,40,"","Consagrada en 1710. Misa diaria del rey: asistir es dejarse ver."],
 ["midi","Ala Sur (de los Príncipes)",200,270,36,110,"","Alojamientos de los príncipes de la sangre."],
 ["ministres-n","Ala de los Ministros (norte)",330,150,70,18,"","Secretarías de Estado."],
 ["ministres-s","Ala de los Ministros (sur)",330,252,70,18,"","Secretarías de Estado."],
 ["royale","Patio Real",330,168,70,84,"open","Entrada de carrozas; el acceso en carroza es privilegio de rango."],
 ["commun","Gran Común",262,300,66,58,"","Cocinas y alojamiento de oficiales y servidumbre de la casa del rey."],
 ["gecurie","Gran Caballeriza",500,96,80,64,"","Caballos de silla, pajes, picadero."],
 ["pecurie","Pequeña Caballeriza",500,260,80,64,"","Caballos de tiro y carrozas."],
 ["armes","Plaza de Armas",410,150,84,120,"open","Explanada entre el palacio y las caballerizas."]
];
const DOMINIO = [
 ["chateau","Palacio",300,170,40,70,"","El palacio, con la ciudad a su espalda y los jardines al frente."],
 ["parterres","Parterres y Orangerie",230,165,70,80,"green","Parterres de agua, del norte y del mediodía; la Orangerie al sur."],
 ["bosquets","Bosquetes",150,120,80,170,"green","Salones de verdor y fuentes: lugares para hablar sin testigos."],
 ["canal","Gran Canal",30,195,120,20,"water","Paseos en góndola en verano."],
 ["canaln","Brazo del Trianon",85,95,14,100,"water","Brazo norte del canal."],
 ["trianon","Gran Trianon",62,55,60,36,"","Palacio de mármol rosa, retiro del rey."],
 ["canals","Brazo de la Ménagerie",85,215,14,100,"water","Brazo sur del canal."],
 ["menagerie","Ménagerie",62,318,60,36,"","Colección de animales exóticos."],
 ["ville","Ciudad de Versalles",380,120,150,170,"","Posadas, hôtels de la nobleza, mercados y la avenida de París."],
 ["avparis","Avenida de París",530,195,60,20,"open","Camino a París, a unas cuatro leguas."]
];
const CIUDADES = [ // lon, lat, ciudad, provincia
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
const CONTORNO = [[2.37,51.03],[1.6,50.7],[1.6,50.2],[1.08,49.92],[0.1,49.49],[-1.2,49.35],[-1.9,49.7],[-1.5,48.64],[-2.0,48.65],[-3.0,48.8],[-4.5,48.4],[-4.7,48.04],[-3.37,47.75],[-2.2,47.27],[-1.15,46.16],[-1.03,45.62],[-1.17,44.66],[-1.47,43.49],[-1.78,43.36],[-0.5,42.8],[0.7,42.7],[1.7,42.5],[3.17,42.43],[3.05,42.7],[3.1,43.1],[3.7,43.4],[4.6,43.4],[5.37,43.3],[5.93,43.12],[6.7,43.4],[7.2,43.7],[6.9,44.4],[6.9,45.1],[6.2,45.4],[5.8,45.7],[5.95,46.2],[6.1,46.4],[6.8,47.3],[7.5,47.6],[7.8,48.5],[8.2,48.97],[6.9,49.2],[6.0,49.5],[4.9,49.8],[4.2,49.95],[3.6,50.4],[2.6,50.8]];

let mapSel=null;
function mapInfo(titulo,texto,extra){
  const b=$("#map-info"); b.innerHTML="";
  b.append(el("h3",{},titulo),el("p",{},texto)); if(extra)b.append(extra);
}
function drawRooms(svg,rooms,vb){
  svg.setAttribute("viewBox",vb);
  rooms.forEach(r=>{
    const [id,n,x,y,w,h,cls,d]=r;
    const rect=sv("rect",{x,y,width:w,height:h,class:"zone "+cls,tabindex:0,role:"button","aria-label":n});
    const pick=()=>{svg.querySelectorAll(".zone").forEach(z=>z.classList.remove("sel"));rect.classList.add("sel");mapSel=id;mapInfo(n,d,el("div",{class:"note"},"Nadie a la vista por ahora. Los presentes aparecerán aquí conforme avance la partida."))};
    rect.addEventListener("click",pick); rect.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();pick()}});
    svg.append(rect);
    if(w>40||h>40){const t=sv("text",{x:x+w/2,y:y+h/2+4,"text-anchor":"middle",class:"mlabel"+(w<60?" s":"")},n.split(" (")[0]);if(h>w*1.6&&w<50){t.setAttribute("transform",`rotate(-90 ${x+w/2} ${y+h/2})`)}svg.append(t)}
  });
}
function drawMap(kind){
  const box=$("#map-box"); box.innerHTML="";
  const svg=sv("svg",{role:"img"});
  if(kind==="palacio"){
    svg.setAttribute("aria-label","Plano esquemático del palacio");
    svg.append(sv("text",{x:100,y:215,"text-anchor":"middle",class:"mlabel s"},"← Jardines"));
    drawRooms(svg,PALACIO,"0 0 600 400");
    svg.append(sv("text",{x:16,y:24,class:"compass"},"N ↑ · Oeste a la izquierda"));
    mapInfo("Palacio de Versalles","Toca una estancia para ver qué es y quién suele estar en ella.");
  } else if(kind==="dominio"){
    svg.setAttribute("aria-label","Plano esquemático del dominio");
    drawRooms(svg,DOMINIO,"0 0 600 400");
    svg.append(sv("text",{x:16,y:24,class:"compass"},"N ↑"));
    mapInfo("El dominio","Jardines, canal, Trianon y ciudad. Los bosquetes son buenos para hablar sin testigos.");
  } else {
    svg.setAttribute("aria-label","Mapa aproximado de Francia");
    const W=600,H=520, lon0=-5.2,lon1=8.6,lat0=42.2,lat1=51.3, k=Math.cos(46.5*Math.PI/180);
    const sx=W/((lon1-lon0)*k), sy=H/(lat1-lat0), s=Math.min(sx,sy);
    const P=([lo,la])=>[((lo-lon0)*k*s).toFixed(1),((lat1-la)*s).toFixed(1)];
    svg.setAttribute("viewBox",`0 0 ${W} ${H}`);
    svg.append(sv("polygon",{points:CONTORNO.map(p=>P(p).join(",")).join(" "),class:"coast"}));
    CIUDADES.forEach(c=>{
      const [x,y]=P(c); const dot=sv("circle",{cx:x,cy:y,r:5,class:"city",tabindex:0,role:"button","aria-label":c[2]});
      const pick=()=>{svg.querySelectorAll(".city").forEach(z=>z.classList.remove("sel"));dot.classList.add("sel");mapInfo(c[2]+" · "+c[3],c[4],el("div",{class:"note"},"Sin noticias de esta provincia todavía."))};
      dot.addEventListener("click",pick);dot.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();pick()}});
      svg.append(dot, sv("text",{x:+x+8,y:+y+4,class:"mlabel s"},c[2]));
    });
    const [vx,vy]=P([2.13,48.80]); svg.append(sv("circle",{cx:vx,cy:vy,r:3.5,fill:"var(--gilt)"}));
    mapInfo("Reino de Francia","Contorno aproximado de 1722 (incluye la Lorena, que aún no era francesa). Toca una ciudad para ver su provincia.");
  }
  box.append(svg);
}

