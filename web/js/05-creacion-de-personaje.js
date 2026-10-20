/* ---------- Creación de personaje ----------
   Elegible: sexo, procedencia, cuna (el nombre se propone según el perfil y es editable).
   Fortuito (una sola tirada): filiación, educación, fortuna, condición, lugar en la familia, confesión.
   Después: posición compatible con el perfil, con avisos de tensión. */
const EXTRANJEROS = ["Saboya","Lorena","Dombes","Aviñón y Condado Venesino","Génova","Toscana","Venecia","Milán","Nápoles","Estados Pontificios","España","Portugal","Suiza (cantones)","Estados alemanes","Provincias Unidas","Países Bajos austríacos","Principado de Lieja","Inglaterra","Irlanda (jacobita)","Escocia (jacobita)","Polonia","Suecia","Dinamarca","Rusia"];
const CUNAS = [["espada","Nobleza de espada"],["toga","Nobleza de toga"],["nuevo","Hombre nuevo (recién ennoblecido)"],["burguesia","Burguesía"],["pueblo","Pueblo"]];
const FILIACIONES = [["directa","Legítimo, por línea paterna"],["materna","Legítimo, apellido y bienes por vía materna"],["bastardo","Bastardo reconocido"]];
const EDUCACIONES = ["Colegio jesuita","Oratorianos (tendencia jansenista)","Facultad de medicina de Montpellier","Facultad de medicina de París","Facultad de derecho","Academia militar o paje de una gran casa","Convento (educación de señorita)","Taller o aprendizaje de oficio","Autodidacta de salones","Sin estudios"];
const CUNA_N = Object.fromEntries(CUNAS), FIL_N = Object.fromEntries(FILIACIONES);

const pick = w => { const t = w.reduce((a,[,p])=>a+p,0); let r = Math.random()*t; for (const [k,p] of w) { if ((r -= p) <= 0) return k; } return w[w.length-1][0]; };
const DINERO_N = {ruina:"En la ruina",menos:"Venida a menos",holgada:"Holgada",rica:"Rica",arruinada_law:"Arruinada por Law",enriquecida_law:"Enriquecida por Law"};
const DINERO_W = { // pesos de juego, no estadística histórica
  espada:   [["ruina",14],["menos",30],["holgada",30],["rica",14],["arruinada_law",9],["enriquecida_law",3]],
  toga:     [["ruina",5],["menos",20],["holgada",44],["rica",20],["arruinada_law",7],["enriquecida_law",4]],
  nuevo:    [["ruina",5],["menos",10],["holgada",34],["rica",28],["arruinada_law",9],["enriquecida_law",14]],
  burguesia:[["ruina",10],["menos",20],["holgada",38],["rica",14],["arruinada_law",9],["enriquecida_law",9]],
  pueblo:   [["ruina",55],["menos",25],["holgada",15],["rica",2],["arruinada_law",1],["enriquecida_law",2]]
};
const CONDICION_N = {ninguna:"Ninguna",no_reconocido:"Bastardo no reconocido",exposito:"Expósito",huerfano:"Huérfano"};
const LUGAR_N = {primogenito:"Primogénito",segundon:"Segundón",primogenita:"Hija con dote",sin_dote:"Hija sin dote",viudo:"Viudo",viuda:"Viuda",huerfano:"Huérfano",huerfana:"Huérfana",benjamin:"Hijo menor",benjamina:"Hija menor",unico:"Hijo único",unica:"Hija única"};
const CONF_N = {catolico:"Católica",jansenista:"Familia jansenista",convertido:"Protestante convertido",secreto:"Protestante en secreto",declarado:"Protestante declarado (extranjero)",judio:"Judía"};
const PROT_REG = ["Languedoc","Poitou","Saintonge y Angoumois","Delfinado","Guyena y Gascuña","Bearne y Navarra","Aunis"];
const JUD_REG = ["Alsacia","Metz y Verdún (Tres Obispados)","Guyena y Gascuña","Condado Venesino y Aviñón"];
const PROT_EXT = ["Suiza (cantones)","Estados alemanes","Provincias Unidas","Inglaterra"];

const EDU_W = { // índices de EDUCACIONES
  F:{espada:[[6,60],[8,30],[9,10]],toga:[[6,60],[8,25],[9,15]],nuevo:[[6,55],[8,25],[9,20]],burguesia:[[6,45],[8,10],[9,35],[7,10]],pueblo:[[9,65],[6,15],[7,20]]},
  M:{espada:[[0,45],[5,35],[1,10],[8,10]],toga:[[0,40],[1,25],[4,30],[8,5]],nuevo:[[0,35],[4,20],[1,15],[3,10],[2,5],[8,15]],
     burguesia:[[0,25],[1,15],[4,15],[2,8],[3,7],[7,20],[8,10]],pueblo:[[9,55],[7,35],[0,5],[8,5]]}
};
const SUR = ["Languedoc","Provenza","Guyena y Gascuña","Rosellón","Condado de Foix","Delfinado","Bearne y Navarra"];
function tirarDestino(p){
  const d = {};
  d.filiacion = pick({espada:[["directa",88],["materna",5],["bastardo",7]],toga:[["directa",92],["materna",5],["bastardo",3]],nuevo:[["directa",90],["materna",6],["bastardo",4]],burguesia:[["directa",92],["materna",6],["bastardo",2]],pueblo:[["directa",85],["materna",12],["bastardo",3]]}[p.cuna]);
  let ew = EDU_W[p.sexo==="F"?"F":"M"][p.cuna].map(x=>[...x]);
  if (p.proc==="provincia" && SUR.includes(p.region)) ew = ew.map(([k,w])=>[k, k===2?w*2.5:k===3?w*0.4:w]);
  d.edu = +pick(ew);
  d.dinero = pick(DINERO_W[p.cuna]);
  d.condicion = pick([["ninguna",90],...(d.filiacion==="bastardo"?[]:[["no_reconocido",3]]),["exposito",2],["huerfano",5]]);
  const orf = d.condicion==="huerfano" ? 0 : 1; // si ya es huérfano por condición, el lugar es otro
  d.lugar = p.sexo==="F" ? pick([["primogenita",28],["sin_dote",32],["benjamina",15],["unica",6],["viuda",12],["huerfana",7*orf]])
    : pick([["primogenito",28],["segundon",36],["benjamin",16],["unico",7],["viudo",7],["huerfano",6*orf]]);
  let w = {catolico:89.5,jansenista:6,convertido:3,secreto:1,judio:.5,declarado:0};
  if (p.proc==="paris") w.jansenista *= 1.8;
  if (p.proc==="provincia" && PROT_REG.includes(p.region)) { w.convertido *= 3; w.secreto *= 3; }
  if (p.proc==="provincia" && JUD_REG.includes(p.region)) w.judio *= 4;
  if (p.proc==="extranjero") {
    if (PROT_EXT.includes(p.region)) { w.declarado = 45; w.convertido = 4; }
    if (/jacobita|España|Portugal|Polonia|Estados Pontificios/.test(p.region)) { w.convertido = 0; w.secreto = 0; w.jansenista = 2; }
  }
  if (p.cuna==="espada"||p.cuna==="toga") w.judio = 0;
  d.confesion = pick(Object.entries(w));
  return d;
}

/* Posiciones: g grupo · n nombre · m movimientos propios · c cunas admitidas · s sexo · x extranjero (true o lista) · f filiación exigida */
const ALL = ["espada","toga","nuevo","burguesia","pueblo"];
const POSICIONES2 = [
 {id:"duque",g:"Espada",n:"Duque y par",m:"Reclamar precedencia; proteger o hundir con su sola presencia",c:["espada"],s:"M",f:"directa"},
 {id:"duquesa",g:"Espada",n:"Duquesa",m:"Derecho al taburete; abrir o cerrar un salón",c:["espada"],s:"F"},
 {id:"cortesano",g:"Espada",n:"Cortesano sin cargo",m:"Asistir a todo; tejer y vender presentaciones",c:["espada","toga","nuevo"],s:"M"},
 {id:"dama-palacio",g:"Espada",n:"Dama de una princesa",m:"Estar en la intimidad femenina; llevar mensajes; concertar matrimonios",c:["espada","toga","nuevo"],s:"F"},
 {id:"guardia-corps",g:"Espada",n:"Oficial de la guardia de corps",m:"Controlar quién pasa por una puerta; ver quién entra de noche",c:["espada","nuevo"],s:"M"},
 {id:"mosquetero",g:"Espada",n:"Mosquetero del rey",m:"Escoltar, batirse, enterarse de todo en los cuerpos de guardia",c:["espada","nuevo","toga"],s:"M"},
 {id:"paje",g:"Espada",n:"Paje de la Gran Caballeriza",m:"Correr recados por todo el palacio; nadie se fija en un muchacho",c:["espada"],s:"M"},
 {id:"gentilhombre",g:"Espada",n:"Gentilhombre ordinario de la casa del rey",m:"Llevar órdenes y pésames en nombre del rey",c:["espada","nuevo"],s:"M"},
 {id:"cent-suisses",g:"Espada",n:"Oficial de los Cent-Suisses",m:"Guardar los aposentos; hablar alemán delante de quien no lo entiende",c:["espada","nuevo"],s:"M",x:["Suiza (cantones)"]},
 {id:"jacobita",g:"Espada",n:"Oficial jacobita en el exilio",m:"Conspirar por el rey Estuardo; pedir dinero y favores a Francia",c:["espada","nuevo"],s:"M",x:["Irlanda (jacobita)","Escocia (jacobita)"]},
 {id:"parlamento",g:"Toga",n:"Consejero del Parlamento de París",m:"Retrasar o registrar un edicto; desaparecer un expediente",c:["toga","nuevo"],s:"M"},
 {id:"maitre-requetes",g:"Toga",n:"Maître des requêtes",m:"Instruir asuntos ante el Consejo; informes que deciden carreras",c:["toga"],s:"M"},
 {id:"consejero-estado",g:"Toga",n:"Consejero de Estado",m:"Opinar en el Consejo; proteger a los suyos en los nombramientos",c:["toga"],s:"M"},
 {id:"intendente-prov",g:"Toga",n:"Intendente de provincia, de paso en la corte",m:"Traer noticias y quejas de provincias; repartir cargas",c:["toga","nuevo"],s:"M"},
 {id:"commis",g:"Toga",n:"Primer escribiente de una secretaría de Estado",m:"Copiar y leer los despachos antes que nadie",c:["toga","nuevo","burguesia"],s:"M"},
 {id:"abogado",g:"Toga",n:"Abogado en el Parlamento",m:"Redactar memoriales; conocer los pleitos de las grandes casas",c:["toga","burguesia"],s:"M"},
 {id:"obispo",g:"Clero",n:"Obispo cortesano",m:"Predicar ante el rey; otorgar beneficios",c:["espada","toga"],s:"M"},
 {id:"abate",g:"Clero",n:"Abate de salón",m:"Circular libremente; difundir ideas y libelos",c:["espada","toga","nuevo","burguesia"],s:"M"},
 {id:"confesor",g:"Clero",n:"Confesor de una gran dama",m:"Oír secretos; condicionar la absolución",c:ALL,s:"M"},
 {id:"capellan",g:"Clero",n:"Capellán de la capilla real",m:"Estar en la misa diaria del rey; ver quién asiste y quién falta",c:["toga","nuevo","burguesia"],s:"M"},
 {id:"canonigo",g:"Clero",n:"Canónigo con beneficio",m:"Rentas eclesiásticas y tiempo libre para la intriga",c:["toga","nuevo","burguesia"],s:"M"},
 {id:"abadesa",g:"Clero",n:"Abadesa de visita en la corte",m:"Acoger a hijas incómodas; guardar secretos de familia",c:["espada","toga"],s:"F"},
 {id:"religiosa",g:"Clero",n:"Religiosa al servicio de una princesa",m:"Rezar, cuidar enfermos y escuchar confidencias",c:ALL,s:"F"},
 {id:"medico",g:"Casa del rey",n:"Médico de la corte",m:"Diagnosticar u ocultar un diagnóstico; acceso a los cuerpos",c:["burguesia","nuevo","toga"],s:"M"},
 {id:"cirujano",g:"Casa del rey",n:"Cirujano de la casa del rey",m:"Sangrar, operar y callar lo que ve",c:["burguesia","pueblo"],s:"M"},
 {id:"boticario",g:"Casa del rey",n:"Boticario de la casa",m:"Preparar remedios… y saber quién pide qué",c:["burguesia"],s:"M"},
 {id:"ayuda-camara",g:"Casa del rey",n:"Ayuda de cámara del rey",m:"Presente en el lever y el coucher; oír",c:["burguesia","nuevo"],s:"M"},
 {id:"ujier",g:"Casa del rey",n:"Ujier de cámara",m:"Decidir quién pasa la puerta y a qué hora",c:["burguesia","pueblo"],s:"M"},
 {id:"aposentador",g:"Casa del rey",n:"Aposentador",m:"Repartir los alojamientos con tiza en las puertas",c:["burguesia"],s:"M"},
 {id:"menus",g:"Casa del rey",n:"Intendente de los Menus-Plaisirs",m:"Organizar fiestas: decidir quién luce y quién no",c:["burguesia","nuevo","toga"],s:"M"},
 {id:"oficial-boca",g:"Casa del rey",n:"Oficial de boca",m:"Cocinas del rey: banquetes, catas… y venenos",c:["burguesia","pueblo"],s:"M"},
 {id:"relojero",g:"Casa del rey",n:"Relojero del rey",m:"Entrar en los gabinetes para dar cuerda a los relojes",c:["burguesia","pueblo"],s:"M"},
 {id:"jardinero",g:"Casa del rey",n:"Jardinero de los jardines reales",m:"Conocer cada bosquete y quién se cita en él",c:["pueblo","burguesia"],s:"M"},
 {id:"lencera",g:"Casa del rey",n:"Lencera de la casa",m:"La ropa blanca de los grandes delata todo",c:["burguesia","pueblo"],s:"F"},
 {id:"lacayo",g:"Servicio",n:"Lacayo de librea",m:"Escoltar, llevar cartas, escuchar detrás de las sillas",c:["pueblo"],s:"M"},
 {id:"silletero",g:"Servicio",n:"Silletero",m:"Saber quién fue a dónde de noche",c:["pueblo"],s:"M"},
 {id:"suizo-portero",g:"Servicio",n:"Suizo portero de un gran señor",m:"Abrir o cerrar la puerta de una casa",c:["pueblo","burguesia"],s:"M",x:["Suiza (cantones)"]},
 {id:"frotteur",g:"Servicio",n:"Encerador de suelos",m:"Entrar en las habitaciones al amanecer, antes que nadie",c:["pueblo"],s:"M"},
 {id:"cochero",g:"Servicio",n:"Cochero",m:"Llevar a los amos y oír lo que hablan en la carroza",c:["pueblo"],s:"M"},
 {id:"mozo-cuadra",g:"Servicio",n:"Mozo de cuadra",m:"Caballerizas: apuestas, contrabando y chismes",c:["pueblo"],s:"M"},
 {id:"doncella",g:"Servicio",n:"Doncella de una dama",m:"Vestir y desvestir; ver cartas, joyas y cuerpo",c:["pueblo","burguesia"],s:"F"},
 {id:"lavandera",g:"Servicio",n:"Lavandera",m:"La ropa delata embarazos, sangre e infidelidades",c:["pueblo"],s:"F"},
 {id:"cocinera",g:"Servicio",n:"Ayudante de cocina",m:"Ver entrar y salir los platos y a quién van",c:["pueblo"],s:"F"},
 {id:"financiero",g:"Fuera de jerarquía",n:"Arrendador de impuestos",m:"Prestar; comprar deudas ajenas y cobrarlas en favores",c:["burguesia","nuevo"],s:"M"},
 {id:"banquero",g:"Fuera de jerarquía",n:"Banquero",m:"Cambios, letras y créditos a los grandes",c:["burguesia","nuevo"],s:"M"},
 {id:"proveedor",g:"Fuera de jerarquía",n:"Proveedor de la corte",m:"Telas, vinos o velas: entrar en todas las casas por la puerta de servicio",c:["burguesia","pueblo"],s:null},
 {id:"pintor",g:"Fuera de jerarquía",n:"Pintor de las obras reales",m:"Retratar: intimidad y halago",c:["burguesia","pueblo","nuevo"],s:"M"},
 {id:"musico",g:"Fuera de jerarquía",n:"Músico de la cámara o de la capilla",m:"Tocar en las veladas; ver sin ser visto",c:["burguesia","pueblo"],s:"M"},
 {id:"actriz",g:"Fuera de jerarquía",n:"Actriz o bailarina de la Ópera",m:"Seducir protectores; entrar donde nadie de tu cuna entra",c:["pueblo","burguesia"],s:"F"},
 {id:"escritor",g:"Fuera de jerarquía",n:"Escritor y libelista",m:"Elogiar o hundir reputaciones con la pluma",c:ALL,s:"M"},
 {id:"embajador",g:"Fuera de jerarquía",n:"Embajador extranjero",m:"Correo diplomático; inmunidad; pagar informantes",c:["espada","nuevo"],s:"M",x:true},
 {id:"secretario-emb",g:"Fuera de jerarquía",n:"Secretario de embajada",m:"Cifrar despachos; frecuentar a quien el embajador no puede",c:["toga","burguesia","nuevo","espada"],s:"M",x:true},
 {id:"agente",g:"Fuera de jerarquía",n:"Agente secreto de una potencia",m:"Doble vida: nadie debe saber para quién escribes",c:ALL,s:null}
];
const POS_ID = Object.fromEntries(POSICIONES2.map(p=>[p.id,p]));

function posibles(p){
  return POSICIONES2.filter(q=>q.c.includes(p.cuna)&&(!q.s||q.s===p.sexo)&&(!q.f||q.f===(p.destino?.filiacion||"directa"))
    &&(!q.x||(p.proc==="extranjero"&&(q.x===true||q.x.includes(p.region)))));
}
function tensiones(p,q){
  const t=[], d=p.destino||{}, cl=q.g==="Clero";
  if(cl&&(d.confesion==="secreto"||d.confesion==="judio"))t.push("Tendrás que fingir tu fe a diario: si se descubre, es la ruina.");
  if(cl&&d.confesion==="declarado")t.push("Un protestante declarado no puede ejercer en la Iglesia sin convertirse.");
  if(d.confesion==="convertido"&&(cl||q.g==="Toga"))t.push("Familia de conversos: vigilarán tu ortodoxia.");
  if(d.confesion==="jansenista"&&["obispo","confesor","capellan"].includes(q.id))t.push("Tu familia jansenista choca con la bula Unigenitus: los jesuitas te vigilarán.");
  const MED=[2,3];
  if(["medico"].includes(q.id)&&!MED.includes(d.edu))t.push("Sin estudios de medicina: tendrás que fingir el título o comprarlo.");
  if(["parlamento","abogado","maitre-requetes","consejero-estado"].includes(q.id)&&d.edu!==4)t.push("Sin estudios de derecho: dependerás de tus secretarios.");
  if(q.g==="Clero"&&[7,9].includes(d.edu)&&["obispo","abate","canonigo","capellan","confesor"].includes(q.id))t.push("Sin estudios: un clérigo ignorante será objeto de burla.");
  if(d.filiacion==="bastardo"&&q.g==="Espada")t.push("Rango discutido: algunos te negarán la precedencia.");
  if(d.condicion==="exposito"&&["espada","toga"].includes(p.cuna))t.push("Nadie conoce tu cuna: tu nobleza es una sospecha que tendrás que probar.");
  if(d.condicion==="no_reconocido")t.push("Tu padre no te reconoce: un secreto que otros pueden usar.");
  if(["ruina","arruinada_law"].includes(d.dinero)&&["duque","duquesa","embajador","cortesano","dama-palacio"].includes(q.id))t.push("Mantener el rango te endeudará.");
  if(d.lugar==="sin_dote"&&["dama-palacio","duquesa"].includes(q.id))t.push("Sin dote: tu futuro depende de un protector.");
  if(p.proc==="extranjero"&&!q.x&&["Toga","Casa del rey"].includes(q.g))t.push("Extranjero en un cargo francés: necesitarás cartas de naturalización o un protector.");
  if(d.lugar==="benjamin"&&["duque","cortesano"].includes(q.id))t.push("Hijo menor: lo normal habría sido la Iglesia o un regimiento.");
  if(d.lugar==="segundon"&&q.id==="duque")t.push("Eres segundón: el título debería ser de tu hermano mayor. ¿Qué pasó con él?");
  return t;
}
function posName(p){if(p?.existente)return p.cargo||"";return POS_ID[p?.pos]?.n||"Sin posición"}
