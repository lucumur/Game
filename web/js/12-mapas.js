/* ---------- Mapas (Geometría unificada + grabado Bâtiments du Roi + grafo visual) ---------- */
const NS="http://www.w3.org/2000/svg";
const sv=(t,a={},txt)=>{const e=document.createElementNS(NS,t);for(const[k,v]of Object.entries(a))if(v!=null)e.setAttribute(k,v);if(txt)e.textContent=txt;return e};

/* Piso 2 · Planta noble (1er étage) */
const PALACIO = [
 ["royale","Patio Real","Patio Real","905,380 1055,380 1055,530 1110,530 1110,860 840,860 840,530 905,530","open","Entrada de carrozas desde la Plaza de Armas. El acceso en carroza es privilegio de rango.",[975,700]],
 ["marbre","Patio de Mármol","Patio de Mármol",955,275,100,105,"open","Patio de honor ante la Cámara del Rey."],
 // Fachada del jardín
 ["paix","Salón de la Paz","S1",760,185,100,55,"","Extremo sur de la Galería; da paso a los aposentos de la reina."],
 ["galerie","Galería de los Espejos","Galería de los Espejos",860,185,240,50,"","Terminada en 1684. Paso diario de la corte hacia la capilla: aquí se ve y se es visto."],
 ["guerre","Salón de la Guerra","N1",1100,185,90,55,"","Extremo norte de la Galería; abre los Grandes Aposentos del Rey."],
 // Aposentos de la Reina (brazo sur)
 ["chreine","Cámara de la Reina","S2",760,240,100,55,"","Desde junio de 1722 vive aquí la infanta Mariana Victoria, de cuatro años, prometida del rey."],
 ["nobles","Gran Gabinete de la Reina","S3",760,295,100,55,"","Sala de audiencias de la reina."],
 ["antreine","Antecámara de la Reina","S4",760,350,100,50,"","Antecámara del Gran Cubierto de la Reina."],
 ["gardesreine","Sala de Guardias de la Reina","S5",760,400,100,45,"","Guardia de los aposentos de la reina."],
 ["grandegardes","Gran Sala de Guardias","S6",760,445,100,85,"","Sala principal de guardias, en lo alto de la Escalera de la Reina."],
 ["cabreine","Gabinetes interiores de la Reina","S7",860,235,45,145,"","Piezas privadas y el «paso del rey»."],
 ["escreine","Escalera de la Reina","E1",860,380,45,80,"","La escalera más transitada del palacio."],
 // Aposento del Rey (centro)
 ["oeil","Antecámara del Œil-de-Bœuf","M1",905,235,50,40,"","Aquí esperan los cortesanos antes del lever."],
 ["premiere","Primera Antecámara","M4",905,275,50,55,"","Antecámara donde el rey come en público."],
 ["gardesroi","Sala de Guardias del Rey","M5",905,330,50,50,"","Primera sala del rey tras la Escalera de la Reina."],
 ["chambre","Cámara del Rey","M2",955,235,55,40,"","Centro ceremonial del palacio: lever y coucher."],
 ["conseil","Gabinete del Consejo","M3",1010,235,45,40,"","Donde el rey reúne a sus consejos."],
 ["cabroi","Gabinetes interiores del Rey","M6",1055,235,45,95,"","Gabinetes y piezas privadas. Solo entra quien es llamado."],
 ["medailles","Gabinete de las Medallas","M7",1055,330,45,60,"","Gabinete de curiosidades de Luis XIV."],
 ["ambassadeurs","Escalera de los Embajadores","E2",1055,390,45,140,"","Escalera de aparato del Gran Aposento."],
 // Grandes Aposentos del Rey (brazo norte)
 ["apollon","Salón de Apolo","N2",1100,240,90,45,"","Sala del trono."],
 ["mercure","Salón de Mercurio","N3",1100,285,90,45,"","Antigua cámara de aparato."],
 ["mars","Salón de Marte","N4",1100,330,90,45,"","Sala de guardias y de conciertos."],
 ["diane","Salón de Diana","N5",1100,375,90,45,"","Sala del billar en las veladas de corte."],
 ["venus","Salón de Venus","N6",1100,420,90,45,"","Colaciones durante las veladas de corte."],
 ["abondance","Salón de la Abundancia","N7",1100,465,90,35,"","Antesala del gabinete de curiosidades."],
 ["hercule","Antigua capilla (Salón de Hércules en obras)","N8",1110,500,80,40,"","Capilla de 1682 a 1710, en obras."],
 ["tribune","Capilla Real (tribuna)","Capilla Real","1190,540 1290,540 1290,760 1240,800 1190,760","","Tribuna real: desde aquí el rey oye la misa diaria.",[1240,670]],
 // Alas del Patio Real
 ["maintenon","Antiguo aposento de Madame de Maintenon","S8",780,560,60,80,"","Vacío desde 1715, en lo alto de la Escalera de la Reina."],
 ["aile-s","Ala sur del Patio Real","A1",780,640,60,160,"","Alojamientos de cortesanos y oficiales."],
 ["antin","Aposento del duque de Antin","N9",1110,560,60,80,"","Director general de los Edificios del Rey."],
 ["aile-n","Ala norte del Patio Real","A2",1110,640,60,160,"","Alojamientos de cortesanos y oficiales."]
];

function genAla(lista,a){
  const ids=[]; a.filaJ=[]; a.filaC=[]; a.transIds=[]; a.patioIds=[];
  const add=(id,nom,lab,x,y,w,h,cls,d,arr)=>{lista.push([id,nom,lab,x,y,w,h,cls,d]);ids.push(id);if(arr)arr.push(id)};
  const fila=(n,y,h,lado,letra,apts)=>{const w=(a.x1-a.x0)/n,arr=letra==="J"?a.filaJ:a.filaC;let u=0,k=0;
    (apts||[]).forEach(([id,nom,units,d])=>{k++;add(id,nom,`${a.k}${letra}${k}`,Math.round(a.x0+u*w),y,Math.round(units*w),h,"",d,arr);u+=units});
    while(u<n){k++;add(`${a.p}-${letra}${String(k).padStart(2,"0")}`,`${a.n} · alojamiento ${a.k}${letra}${k} (${lado})`,`${a.k}${letra}${k}`,Math.round(a.x0+u*w),y,Math.round(w),h,"",`Alojamiento del lado ${lado}.`,arr);u++}};
  fila(a.jard,555,70,"jardín","J",a.apts);
  add(`${a.p}-gal`,`Galería ${a.galNom||"alta"} del ${a.n}`,"Galería",a.x0,625,a.x1-a.x0,15,"","Corredor que recorre el ala y une todos sus alojamientos.");
  fila(a.calle,740,60,"calle","C",a.aptsC);
  a.trans.forEach(([x0,x1],i)=>add(`${a.p}-t${i+1}`,`${a.n} · crujía transversal ${i+1}`,`${a.k}T${i+1}`,x0,640,x1-x0,100,"","Alojamiento en la crujía que separa los patios del ala.",a.transIds));
  for(let i=0;i<a.trans.length-1;i++){const x0=a.trans[i][1],x1=a.trans[i+1][0];
    add(`${a.pp}-p${i+1}`,`Patio interior ${i+1} del ${a.n}`,"Patio",x0,640,x1-x0,100,"open","Patio de luces y de servicio.",a.patioIds)}
  a.ids=ids; return a;
}

const ALAS_NOBLE=[
 genAla(PALACIO,{p:"n-ms",pp:"b-ms",k:"S",n:"Ala del Mediodía",x0:45,x1:760,jard:11,calle:11,trans:[[45,100],[380,430],[705,760]],o:"Hardouin-Mansart, 1679-1682.",u:"Primer piso del Ala de los Príncipes: aposentos de los príncipes de la sangre y de sus casas.",
  apts:[["midi-orleans","Aposento de Madame y de la duquesa de Orleans",3,"Cabeza del Ala de los Príncipes."],["midi-chartres","Aposento del duque de Chartres",1,"Hijo del Regente."],["midi-bourbon","Aposento de Monsieur le Duc",2,"Casa de Condé."],["midi-conti","Aposento de los príncipes de Conti",2,"Casa de Conti."],["midi-charolais","Antiguo aposento de los Maine",2,"Pasa a los Condé en 1722."]]}),
 genAla(PALACIO,{p:"n-mn",pp:"b-mn",k:"N",n:"Ala Norte",x0:1290,x1:1870,jard:9,calle:9,trans:[[1290,1340],[1560,1610],[1815,1870]],o:"Hardouin-Mansart, 1685-1689.",u:"Primer piso del Ala Norte: alojamientos de grandes cargos, prelados y cortesanos.",
  apts:[["n-nord","Aposentos junto a la capilla (Rohan, Noailles)",2,"Grandes cargos y prelados."]]})
];

/* Piso 1 · Planta baja (rez-de-chaussée) */
const PALACIO_BAJA = [
 ["royale","Patio Real","Patio Real","905,380 1055,380 1055,530 1110,530 1110,860 840,860 840,530 905,530","open","Entrada de carrozas desde la Plaza de Armas. El acceso en carroza es privilegio de rango.",[975,700]],
 ["marbre","Patio de Mármol","Patio de Mármol",955,275,100,105,"open","Patio de honor ante la Cámara del Rey."],
 ["b-galbasse","Galería Baja","Galería Baja",860,185,240,50,"","Bajo la Galería de los Espejos: paso abovedado entre los dos extremos del palacio, con salida al Parterre de Agua."],
 ["b-reg-cab","Gabinete del Regente","S1",760,185,100,55,"","Esquina sobre el Parterre del Mediodía. El duque de Orleans despacha aquí a puerta cerrada."],
 ["b-reg-ch","Cámara del Regente","S2",760,240,100,55,"","Antiguo aposento del Gran Delfín. Desde junio de 1722 lo ocupa el duque de Orleans."],
 ["b-reg-gc","Gran Gabinete del Regente","S3",760,295,100,55,"","Donde el Regente recibe a ministros y secretarios de Estado."],
 ["b-reg-ant","Antecámaras del Regente","S4",760,350,100,50,"","Quien quiere algo del gobierno espera aquí."],
 ["b-reg-int","Piezas interiores del Regente","S5",860,235,45,145,"","Guardarropa, retretes y escalera privada."],
 ["b-sud","Vestíbulo del Mediodía","S6",760,400,100,30,"","Paso hacia el Ala de los Príncipes."],
 ["b-gouverneur","Aposento del Gobernador del Rey","S7",760,430,100,50,"","Villeroy, luego Charost."],
 ["b-fleury","Aposento del preceptor","S8",760,480,100,50,"","El obispo de Fréjus, preceptor del rey."],
 ["b-escreine","Vestíbulo de la Escalera de la Reina","E1",860,380,45,80,"","Arranque de la Escalera de la Reina."],
 ["b-capitaine","Aposento del Capitán de Guardias","M1",905,235,50,145,"","Al pie de los aposentos del rey."],
 ["b-marbre","Vestíbulo de Mármol","M2",955,235,55,40,"","Bajo la Cámara del Rey: del Patio de Mármol a los jardines."],
 ["b-servicio","Oficios de la Cámara","M3",1010,235,45,40,"","Servidores de la Cámara del Rey."],
 ["b-interiores","Alojamientos interiores","M4",1055,235,45,65,"","Servidumbre íntima del rey."],
 ["b-blouin","Alojamiento de Louis Blouin","M5",1055,300,45,60,"","Intendente del palacio."],
 ["b-hoquetons","Sala de los Hoquetons","M6",1055,360,45,60,"","Guardias de la prebostería."],
 ["b-ambassadeurs","Vestíbulo de la Escalera de los Embajadores","E2",1055,420,45,110,"","Pie de la gran escalera de mármol."],
 ["b-tou-cab","Gabinete del Conde de Toulouse","N1",1100,185,90,55,"","Esquina norte sobre los jardines."],
 ["b-tou-ch","Cámara del Conde de Toulouse","N2",1100,240,90,55,"","Antiguo Aposento de los Baños de Luis XIV."],
 ["b-tou-oct","Gabinete octogonal","N3",1100,295,90,50,"","Antiguo gabinete de los Baños."],
 ["b-tou-bains","Antigua Sala de los Baños","N4",1100,345,90,50,"","Pieza de aparato del conde."],
 ["b-tou-ant","Antecámaras del Conde de Toulouse","N5",1100,395,90,45,"","Antiguo aposento de Montespan."],
 ["b-norte","Pasaje del Norte","N6",1100,440,90,40,"","Hacia la Capilla y el Ala Norte."],
 ["b-oldchapel","Antigua capilla (nivel bajo)","N7",1110,480,80,50,"","Capilla de 1682, desafectada."],
 ["b-chapelle","Capilla Real (nave)","Capilla Real","1190,540 1290,540 1290,760 1240,800 1190,760","","Consagrada en 1710. La corte oye misa en la nave.",[1240,670]],
 ["b-aile-s","Ala sur del Patio Real (planta baja)","A1",780,560,60,240,"","Oficios de boca y alojamientos modestos."],
 ["b-aile-n","Ala norte del Patio Real (planta baja)","A2",1110,560,60,240,"","Oficios del Gobelet y alojamientos modestos."]
];

const ALAS_BAJA = [
 genAla(PALACIO_BAJA,{p:"b-ms",pp:"b-ms",galNom:"baja",k:"S",n:"Ala del Mediodía",x0:45,x1:760,jard:11,calle:11,trans:[[45,100],[380,430],[705,760]],o:"Hardouin-Mansart, 1679-1682.",u:"Ala de los Príncipes: los alojamientos de planta baja son de damas, oficiales y gentilhombres de las casas de Orleans, Condé y Conti."}),
 genAla(PALACIO_BAJA,{p:"b-mn",pp:"b-mn",galNom:"baja",k:"N",n:"Ala Norte",x0:1290,x1:1870,jard:9,calle:9,trans:[[1290,1340],[1560,1610],[1815,1870]],o:"Hardouin-Mansart, 1685-1689.",u:"Alojamientos de cortesanos y de oficiales de la casa del rey."})
];

/* Piso 3 · Ático y desvanes (2e étage / attique) — mismas coordenadas 20 150 1870 740 */
const PALACIO_ATICO = [
 ["royale","Patio Real","Patio Real","905,380 1055,380 1055,530 1110,530 1110,860 840,860 840,530 905,530","open","Entrada de carrozas desde la Plaza de Armas.",[975,700]],
 ["marbre","Patio de Mármol","Patio de Mármol",955,275,100,105,"open","Patio de honor ante la Cámara del Rey."],
 ["a-boveda","Trasdós de la bóveda de la Galería","Bóveda Galería",860,185,240,50,"open","Espacio ocupado por la gran bóveda pintada por Le Brun; sin piso habitable."],
 ["a-sud","Ático del Mediodía (sobre la Reina)","Ático Sur",760,185,100,275,"","Alojamientos de primeros gentilhombres y damas (Mortemart, Saint-Aignan) sobre el aposento de la Reina."],
 ["a-escreine","Rellano alto de la Escalera de la Reina","E1",860,380,45,80,"","Último tramo de la Escalera de la Reina que desemboca en el ático meridional."],
 ["a-salle-gardes","Ático sobre la Gran Sala de Guardias","S6",760,460,145,70,"","Alojamientos anexos al rellano alto de la Escalera de la Reina."],
 ["a-centro","Desvanes y entresuelos sobre la Cámara del Rey","Desvanes Rey",905,235,150,40,"","Alojamientos de los primeros ayudas de cámara, guardarropas y criados de cámara."],
 ["a-gardes-att","Desvanes sobre las Antecámaras del Rey","M4-M5",905,275,50,105,"","Servicio interior de la Cámara y guardarropa real."],
 ["a-roi","Ático del Rey (Gabinete de Cuadros y Petits Appartements)","Ático del Rey",1055,235,45,155,"","Galería de cuadros de Luis XIV y primeras piezas privadas de recreo habilitadas para el joven Luis XV desde junio de 1722."],
 ["a-grand","Ático sobre el Gran Aposento del Rey","Ático Norte",1100,185,90,355,"","Alojamientos de cortesanos sobre los salones de Apolo, Mercurio, Marte, Diana y Venus."],
 ["a-chapelle-voute","Bóveda alta de la Capilla Real","Techo Capilla","1190,540 1290,540 1290,760 1240,800 1190,760","open","Cubierta y armadura de la Capilla Real de 1710.",[1240,670]],
 ["a-aile-s","Ático del ala sur del Patio Real","A1",780,560,60,240,"","Alojamientos modestos bajo mansarda sobre el Patio Real."],
 ["a-aile-n","Ático del ala norte del Patio Real","A2",1110,560,60,240,"","Alojamientos modestos bajo mansarda sobre el Patio Real."]
];

const ALAS_ATICO = [
 genAla(PALACIO_ATICO,{p:"a-ms",pp:"b-ms",galNom:"del ático",k:"S",n:"Ala del Mediodía",x0:45,x1:760,jard:11,calle:11,trans:[[45,100],[380,430],[705,760]],o:"Hardouin-Mansart, 1679-1682.",u:"Segundo piso (ático) del Ala de los Príncipes: alojamientos de gentilhombres y oficiales de las casas de Orleans, Condé y Conti.",
  apts:[["a-midi","Aposentos altos de las casas de Orleans y Condé",4,"Gentilhombres de cámara y damas de las princesas."]]}),
 genAla(PALACIO_ATICO,{p:"a-mn",pp:"b-mn",galNom:"del ático",k:"N",n:"Ala Norte",x0:1290,x1:1870,jard:9,calle:9,trans:[[1290,1340],[1560,1610],[1815,1870]],o:"Hardouin-Mansart, 1685-1689.",u:"Ático del Ala Norte sobre el jardín y la calle: alojamientos codiciados de duques y cortesanos.",
  apts:[["a-nord","Aposentos de los duques de Chaulnes, Luxemburgo y Rochechouart",3,"Alojamientos de gracia en el ático sobre el jardín."]]})
];

const DOMINIO = [
 // Parque y Gran Canal (Oeste, parte superior)
 ["stcyr","Casa Real de Saint-Cyr","Saint-Cyr",18,32,108,52,"","Fundación de Madame de Maintenon (1686) al oeste del parque: colegio de doscientas cincuenta jóvenes nobles pobres."],
 ["canal","Gran Canal","Gran Canal","285,40 315,40 315,120 460,120 460,145 315,145 315,285 285,285 285,145 140,145 140,120 285,120","water","Paseos en góndola en verano. Sus brazos llevan al Trianon y a la Ménagerie.",[300,70]],
 ["trianon","Gran Trianon","Trianon",470,95,95,60,"","Palacio de mármol rosa al extremo norte del canal. Retiro del rey."],
 ["menagerie","Ménagerie","Ménagerie",35,95,95,60,"","Colección de animales exóticos y pabellón octogonal al extremo sur del canal."],
 ["apolo","Fuente de Apolo","Apolo",270,285,60,18,"water","Cabecera del canal: el carro del Sol emergiendo de las aguas."],
 ["bosquets","Bosquetes","Bosquetes",150,305,300,105,"green","Salones de verdor y fuentes entre setos: lugares para hablar sin testigos."],
 ["parterres","Parterres","Parterres",215,412,170,53,"green","Parterres de agua y del Mediodía frente a la Galería de los Espejos."],
 ["suisses","Estanque de los Suizos","Suizos",18,300,122,48,"water","Gran estanque al sur, excavado por un regimiento suizo."],
 ["orangerie","Orangerie","Orangerie",95,412,115,46,"","Galería abovedada de Hardouin-Mansart para naranjos y palmeras en cajones."],
 // Palacio y Patios (Centro)
 ["potager","Huerto del Rey","Huerto",15,468,85,62,"green","Treinta jardines murados de La Quintinie: frutas y hortalizas para la mesa del rey."],
 ["midi","Ala Sur (de los Príncipes)","Ala Sur",110,480,130,32,"","Alojamientos de los príncipes de la sangre (Orleans, Condé, Conti)."],
 ["corps","Cuerpo central","Palacio",240,470,120,60,"","Aposentos del rey, de la reina y del Regente, y Galería de los Espejos. Ver la pestaña Palacio."],
 ["nord","Ala Norte y Capilla Real","Ala Norte",360,480,130,32,"","Alojamientos de cortesanos; la Capilla Real, consagrada en 1710, junto al cuerpo central."],
 ["patios","Patio Real y de Mármol","Patios",252,530,96,60,"open","Entrada al palacio desde la Plaza de Armas tras la Grille Royale."],
 ["armes","Plaza de Armas","Plaza de Armas","220,590 380,590 398,642 202,642","open","Explanada donde convergen las tres avenidas y esperan las carrozas.",[300,620]],
 // Ciudad de Versalles · Barrio Sur (Saint-Louis, Vieux Versailles y Gran Común)
 ["commun","Gran Común","Gran Común",162,526,84,54,"","Mole de ladrillo y piedra de Mansart: cocinas de boca y alojamiento de centenares de oficiales de la casa del rey."],
 ["cocheras","Cocheras y Juego de Palma","Cocheras",162,584,56,52,"","Remesas de carrozas de servicio, postas y trinquete del Real Juego de Palma en el Viejo Versalles."],
 ["vieux-versailles","Vieux Versailles (Viejo Versalles)","Viejo Versalles",86,536,72,72,"","El burgo medieval original: posadas abarrotadas en junio de 1722, prestamistas, sastres y pretendientes sin cuarto."],
 ["ville-s","Barrio de Saint-Louis","Barrio Saint-Louis",14,536,68,72,"","Barrio meridional fundacional: casas de servidores de palacio, artesanos y pequeños oficiales."],
 ["stlouis-iglesia","Parroquia de Saint-Louis","Iglesia St-Louis",14,612,72,42,"","Iglesia parroquial del barrio sur, centro espiritual de los criados y vecinos del mediodía."],
 ["parc-aux-cerfs","Parc aux Cerfs (Parque de los Ciervos)","Parc aux Cerfs",90,612,88,48,"green","Antiguo coto de caza de Luis XIII al sur del Viejo Versalles, que empieza a parcelarse en discretas casitas con jardín."],
 ["pecurie","Pequeña Caballeriza","Peq. Caballeriza",184,648,80,44,"","Caballos de tiro, carrozas del rey y sillas de manos bajo el Primer Escudero."],
 // Ciudad de Versalles · Barrio Norte (Notre-Dame, Mercado, Hôtels y Perrera)
 ["chenil","Perrera Real y Cocheras del Norte (Chenil)","Chenil y Cocheras",354,526,76,56,"","Jaurías de caza del rey, oficiales de la Vénerie y cocheras de gala detrás de la Gran Caballeriza."],
 ["nd-parroquia","Parroquia Real de Notre-Dame","Iglesia Notre-Dame",436,520,76,46,"","Parroquia del palacio (Hardouin-Mansart, 1686): aquí se bautiza, casa y entierra a los cortesanos."],
 ["nd-marche","Mercado de Notre-Dame","Mercado N.-Dame",516,520,72,46,"","Plaza de los cuatro pabellones de abasto: pescaderías, carnicerías y posadas del barrio norte."],
 ["ville-n","Barrio de Notre-Dame y Hôtels","Barrio Notre-Dame",436,570,152,72,"","Barrio norte trazado a cordel: Hôtels de Noailles, Beauvillier, Contades, Chancillería y mansiones de la nobleza."],
 ["gecurie","Gran Caballeriza","Gran Caballeriza",336,648,80,44,"","Caballos de silla y caza, escuela de pajes y picadero bajo el Gran Escudero de Francia."],
 // Las Tres Avenidas y el trayecto hacia el Sena
 ["av-paris","Avenida de París","Av. de París","292,642 308,642 316,835 284,835","road","Gran calzada real hacia Viroflay, Chaville, Sèvres y París (4 leguas). Por aquí llegan cartas, acreedores y ministros.",[300,745]],
 ["av-stcloud","Avenida de Saint-Cloud","Av. de Saint-Cloud","318,642 332,642 522,768 498,778","road","Calzada arbolada del noreste hacia Montreuil, Ville-d'Avray y el palacio de Saint-Cloud.",[432,718]],
 ["av-sceaux","Avenida de Sceaux","Av. de Sceaux","268,642 282,642 102,778 78,768","road","Calzada del sureste hacia los bosques de Meudon y la corte de la duquesa de Maine en Sceaux.",[168,718]],
 ["chaville","Valle de Chaville y Viroflay","Chaville",198,718,80,48,"green","Posta intermedia y antiguo dominio de Louvois entre Versalles y el puente de Sèvres."],
 // Enclaves de la Línea del Sena (Sceaux, Meudon, Sèvres, Saint-Cloud, Boulogne)
 ["sceaux","Palacio y Corte de Sceaux","Sceaux",14,782,115,62,"","A tres leguas al sureste: feudo del duque y la duquesa de Maine; salón literario y foco de oposición a la Regencia."],
 ["meudon","Palacio Real de Meudon","Meudon",140,782,125,62,"","Sobre la gran terraza que domina el Sena. Antigua residencia del Gran Delfín; retiro del duque de Saint-Simon en 1722."],
 ["stcloud","Palacio de Saint-Cloud","Saint-Cloud",455,775,132,68,"","Residencia veraniega de la Casa de Orleans sobre la cascada y el Sena. Morada de Madame Palatina."],
 ["sevres","Puente y Posta de Sèvres","Puente de Sèvres",252,838,96,48,"","Cruce obligado sobre el Sena a dos leguas de Versalles: posta de caballos, embarcadero de la galiote y posadas."],
 ["sena","Línea del Río Sena","Río Sena","14,892 252,886 348,886 586,852 586,878 348,912 252,912 14,918","water","El gran meandro del Sena que enlaza París con Meudon, Sèvres y Saint-Cloud.",[145,906]],
 ["boulogne","Bosque de Boulogne y Longchamp","Bois de Boulogne",415,896,170,48,"green","Bosque real entre el puente de Saint-Cloud y las puertas de París: paseos de carruajes, citas y duelos furtivos."],
 // Llegada a París y los Hôtels
 ["barriere-conference","Barrière de la Conférence y Cours-la-Reine","Barrière Conférence",236,948,136,44,"","Puerta occidental de París junto al Sena: registro de carruajes, aduana del octroi y paseo del Cours-la-Reine."],
 ["paris-hotels","Faubourg Saint-Germain y Hôtels de París","Hôtels (St-Germain)",14,960,210,84,"","Orilla izquierda y Marais: Palais-Bourbon, Hôtel de Condé, Hôtel de Toulouse y grandes casas de la nobleza."],
 ["tuileries","Palacio de las Tullerías y el Louvre","Tullerías y Louvre",236,998,136,52,"","Residencia de Luis XV y de la infanta en París hasta su mudanza a Versalles el 15 de junio de 1722."],
 ["palais-royal","Palais-Royal (Sede del Regente)","Palais-Royal (París)",382,956,204,92,"","Sede de Felipe de Orleans en París: despachos de Dubois, la Ópera, finanzas y las cenas nocturnas de los roués."],
 ["paris-parlement","Île de la Cité, Parlamento y Rue Quincampoix","Parlamento de París",236,1056,350,52,"","El Palais de la Cité (sede del Parlamento de París), Notre-Dame y la vecina calle Quincampoix."]
];

const CIUDADES = [
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
const CAMINOS = [[0,1],[0,2],[0,3],[0,4],[0,10,9,8],[9,12],[0,6],[0,5],[6,7,8],[0,11],[10,13]];

const INFO_EST = {
 royale:{u:"Patio de llegada. Solo entran en carroza hasta aquí quienes tienen los «honores del Louvre»; los demás bajan en la Plaza de Armas y cruzan a pie. Lacayos, sillas de manos y guardias suizos a toda hora.",o:"Hardouin-Mansart, 1679-1682: cierre con la reja dorada y unificación de las alas.",c:["marbre","b-escreine","b-ambassadeurs","b-sud","b-aile-s","b-aile-n"]},
 marbre:{u:"Patio de honor ante la Cámara del Rey. El balcón dorado del primer piso lo domina: es la cara del palacio que mira a la ciudad.",o:"Hardouin-Mansart, 1679-1680: pavimento de mármol blanco y negro sobre el patio de Luis XIII.",c:["royale","b-marbre","b-escreine"]},
 paix:{u:"Pertenece al aposento de la reina. En 1722 sirve de sala de música y juegos anexa al aposento de la pequeña infanta Mariana Victoria.",o:"Hardouin-Mansart y Le Brun, 1680-1686: techo de Le Brun sobre la Paz de Nimega.",c:["galerie","chreine","midi-orleans"]},
 galerie:{u:"La calle principal del palacio. El rey la cruza cada mañana hacia la capilla y la corte se apiña a los lados para verlo pasar y pedirle algo. El 15 de junio de 1722 Luis XV se tumbó en el parqué para mirar la bóveda.",o:"Hardouin-Mansart, 1678-1684; bóveda pintada por Le Brun (1681-1684).",c:["paix","guerre","oeil","conseil"]},
 guerre:{u:"Antesala del Gran Aposento del Rey desde la Galería. En las veladas de corte se llena de quienes pasan de un salón a otro.",o:"Hardouin-Mansart y Le Brun, 1678-1686; medallón de Luis XIV a caballo por Coysevox.",c:["galerie","apollon"]},
 chreine:{u:"Desde el 15 de junio de 1722 es la cámara de la infanta Mariana Victoria, prometida del rey, que tiene cuatro años. Antes la ocupó la delfina María Adelaida de Saboya, madre de Luis XV, que murió aquí en 1712.",o:"Hardouin-Mansart, hacia 1680, para la reina María Teresa.",c:["paix","nobles","cabreine"]},
 nobles:{u:"Sala de audiencias de la reina. En 1722 recibe el círculo de damas presentadas a la pequeña infanta.",o:"Hacia 1671-1680, decoración de la época de María Teresa; techo de Michel II Corneille.",c:["chreine","antreine","cabreine"]},
 antreine:{u:"Antecámara del Gran Cubierto de la Reina, donde los reyes comían en público. En 1722 es antesala del séquito de la infanta.",o:"Hacia 1680, época de María Teresa.",c:["nobles","gardesreine"]},
 gardesreine:{u:"Guardias de corps de servicio. Es el umbral: quien no tiene derecho de entrada se queda aquí.",o:"1676-1681. Es la única sala del aposento que conserva su decoración del siglo XVII.",c:["antreine","escreine","grandegardes"]},
 grandegardes:{u:"Cuerpo de guardia principal, en lo alto de la Escalera de la Reina. El Jueves Santo el rey lava aquí los pies a trece niños pobres.",o:"Hardouin-Mansart, 1682, sobre la antigua capilla del palacio.",c:["gardesreine","escreine","aile-s","midi-charolais","n-ms-gal"]},
 cabreine:{u:"Piezas privadas donde se instala la duquesa de Ventadour, gobernanta de la infanta, para vigilarla día y noche. Un pasillo interior, el «paso del rey», las une con el Œil-de-Bœuf.",o:"Hardouin-Mansart, década de 1680.",c:["chreine","nobles","oeil"]},
 escreine:{u:"La escalera más usada del palacio: sube a los aposentos del rey y de la reina. Aquí se cruzan cortesanos, guardias, criados y peticionarios.",o:"Hardouin-Mansart, 1679-1681: revestimiento de mármoles de colores.",c:["gardesreine","gardesroi","grandegardes","maintenon","b-escreine","a-escreine"]},
 gardesroi:{u:"Guardias de corps del rey. Primer filtro de su aposento; las armas quedan aquí.",o:"Hardouin-Mansart, 1684.",c:["escreine","premiere"]},
 premiere:{u:"Antecámara del Gran Cubierto: el rey come en público ante quien pueda entrar. A los doce años, Luis XV come aquí bajo la mirada de la corte.",o:"Hardouin-Mansart, 1684.",c:["gardesroi","oeil"]},
 oeil:{u:"Segunda antecámara. Aquí esperan los cortesanos admitidos al lever y al coucher, de pie, a veces durante horas. Es la mejor sala del palacio para enterarse de todo.",o:"Hardouin-Mansart, 1701: une la antigua cámara del rey y una antecámara; friso de niños jugando de Van Clève.",c:["premiere","chambre","galerie","cabreine"]},
 chambre:{u:"Luis XV duerme aquí, en la cama de su bisabuelo, desde el 15 de junio de 1722. Cada mañana se celebra el lever: entran primero la familia, luego las «grandes entradas» y al final la corte.",o:"Hardouin-Mansart, 1701: la cámara pasa al centro del palacio; relieve de Nicolas Coustou sobre la cama.",c:["oeil","conseil"]},
 conseil:{u:"Aquí se reúnen los consejos de gobierno con el rey presente. En 1722 manda el Regente, pero las decisiones se firman en nombre del niño.",o:"Decoración de 1701, de la época de Luis XIV.",c:["chambre","galerie","cabroi"]},
 cabroi:{u:"Gabinetes privados de Luis XIV: el de las pelucas, la pequeña galería de Mignard y las piezas sobre la Cour des Cerfs. Aquí estudia Luis XV con el preceptor Fleury.",o:"Hardouin-Mansart, 1684-1701.",c:["conseil","medailles","apollon","b-interiores","a-roi"]},
 medailles:{u:"Medallas, gemas talladas y piezas raras de la colección real. Se enseñan a visitantes distinguidos como favor especial.",o:"Hardouin-Mansart, 1683-1686.",c:["cabroi","abondance"]},
 ambassadeurs:{u:"Escalera de aparato del Gran Aposento. Por aquí suben los embajadores en sus audiencias solemnes y la corte en las noches de «aposento».",o:"Le Vau y d'Orbay, 1672-1679; pinturas de Le Brun.",c:["venus","diane","antin","b-ambassadeurs"]},
 apollon:{u:"Sala del trono: aquí se dan las audiencias ordinarias. En las veladas de corte se convierte en sala de baile.",o:"1671-1681; techo de Charles de La Fosse.",c:["guerre","mercure","cabroi"]},
 mercure:{u:"Antigua cámara de aparato. En las veladas de «aposento» se ponen mesas de juego.",o:"1671-1681; techo de Jean-Baptiste de Champaigne.",c:["apollon","mars"]},
 mars:{u:"Antigua sala de guardias. En las veladas, música y baile.",o:"1671-1681; techo de Audran, Jouvenet y Houasse.",c:["mercure","diane"]},
 diane:{u:"En las veladas se pone el billar, con gradas para el público. Luis XIV era muy hábil en ese juego.",o:"1671-1680; techo de Gabriel Blanchard.",c:["mars","venus","ambassadeurs"]},
 venus:{u:"Vestíbulo del Gran Aposento al llegar por la Escalera de los Embajadores. En las veladas se sirven colaciones.",o:"1671-1680; techo de René-Antoine Houasse.",c:["diane","abondance","ambassadeurs"]},
 abondance:{u:"Antesala del Gabinete de las Medallas. En las veladas se sirven bebidas: café, vinos y licores.",o:"Hardouin-Mansart, 1683; techo de Houasse.",c:["venus","medailles","hercule"]},
 hercule:{u:"Andamios y polvo: la vieja capilla de 1682 está a medio convertir en salón bajo dirección de Robert de Cotte. Paso hacia la nueva Capilla Real.",o:"Robert de Cotte empezó las obras en 1712 y quedaron detenidas en 1715. Se terminarán en 1736.",c:["abondance","tribune","antin","aile-n"]},
 tribune:{u:"Tribuna real de la capilla. El 15 de junio de 1722 a las cinco de la tarde fue el primer lugar que visitó Luis XV al bajar de la carroza.",o:"Hardouin-Mansart y Robert de Cotte, 1689-1710.",c:["hercule","n-nord","n-mn-gal","b-chapelle"]},
 "aile-s":{u:"Alojamientos de cortesanos y oficiales sobre el Patio Real.",o:"Le Vau, década de 1660; adaptada por Hardouin-Mansart hacia 1680.",c:["grandegardes","maintenon","b-aile-s","a-aile-s"]},
 "aile-n":{u:"Alojamientos de cortesanos y oficiales sobre el Patio Real.",o:"Le Vau, década de 1660; adaptada por Hardouin-Mansart hacia 1680.",c:["hercule","antin","b-aile-n","a-aile-n"]},
 "b-galbasse":{u:"Paso fresco y abovedado, a resguardo de la lluvia, entre los dos extremos del palacio a ras de jardín. Lugar de cruces y de conversaciones a media voz.",o:"Hardouin-Mansart, 1678-1684, al mismo tiempo que la Galería de los Espejos.",c:["b-reg-cab","b-marbre","b-tou-cab"]},
 "b-reg-cab":{u:"Despacho del Regente, abierto al jardín del Mediodía. Aquí trabaja con Dubois y aquí morirá de apoplejía el 2 de diciembre de 1723 junto a la duquesa de Phalaris.",o:"Decorado para el Gran Delfín, 1684-1693.",c:["b-reg-ch","b-galbasse"]},
 "b-reg-ch":{u:"Dormitorio del duque de Orleans desde junio de 1722. A sus cenas privadas solo entran sus íntimos.",o:"Para el Gran Delfín, 1684-1693.",c:["b-reg-cab","b-reg-gc","b-reg-int"]},
 "b-reg-gc":{u:"Gabinete de trabajo y de audiencias del Regente: ministros, embajadores, financieros.",o:"Para el Gran Delfín, 1684-1693.",c:["b-reg-ch","b-reg-ant","b-reg-int"]},
 "b-reg-ant":{u:"Antesala llena desde primera hora: solicitantes de cargos, pensiones y favores. El mejor sitio para saber quién sube y quién cae.",o:"Para el Gran Delfín, 1684-1693.",c:["b-reg-gc","b-sud","b-gouverneur"]},
 "b-reg-int":{u:"Guardarropa, retretes y escalerilla privada. Por aquí entran y salen las visitas que no deben verse.",o:"Para el Gran Delfín, década de 1680.",c:["b-reg-ch","b-reg-gc"]},
 "b-sud":{u:"Paso entre el cuerpo central, el Patio Real y el Ala de los Príncipes.",o:"Hardouin-Mansart, década de 1680.",c:["b-reg-ant","b-escreine","b-gouverneur","b-ms-gal","royale"]},
 "b-escreine":{u:"Vestíbulo de la escalera más transitada. Es punto de encuentro, de espera y de recados.",o:"Hardouin-Mansart, 1679-1681.",c:["escreine","marbre","royale","b-sud","b-capitaine","b-fleury"]},
 "b-capitaine":{u:"Aposento del capitán de guardias de corps de cuartel, que responde de la persona del rey día y noche. Duerme a una escalera de él.",o:"Hardouin-Mansart, década de 1680.",c:["b-escreine","b-marbre","cabroi"]},
 "b-marbre":{u:"Paso directo del Patio de Mármol a los jardines, bajo la Cámara del Rey.",o:"Hardouin-Mansart, 1679: columnas y pilastras de mármol de Rance.",c:["marbre","b-galbasse","b-capitaine","b-servicio"]},
 "b-servicio":{u:"Ayudas de cámara, barberos y guardarropa: el personal que debe estar al alcance del rey en todo momento.",o:"Década de 1680.",c:["b-marbre","b-interiores"]},
 "b-interiores":{u:"Alojamientos de la servidumbre más cercana al rey, en torno a los patios interiores. El Petit Degré du Roi sube directo a los gabinetes reales.",o:"Hardouin-Mansart, 1684-1701.",c:["b-servicio","b-blouin","b-hoquetons","cabroi"]},
 "b-hoquetons":{u:"Guardias de la prebostería del palacio, con su casaca bordada (hoqueton). Vigilan el interior y detienen a ladrones y alborotadores.",o:"Decoración terminada en 1672.",c:["b-interiores","b-blouin","b-ambassadeurs","b-tou-ant"]},
 "b-ambassadeurs":{u:"Pie de la escalera de aparato. Aquí se recibe a los embajadores al bajar de la carroza.",o:"Le Vau y d'Orbay, 1672-1679.",c:["ambassadeurs","royale","b-hoquetons"]},
 "b-tou-cab":{u:"Gabinete del almirante de Francia, sobre el parterre del Norte. Un conde discreto y apreciado, apartado de las intrigas de su hermano Maine.",o:"Adaptado para Madame de Montespan en 1685 (Hardouin-Mansart).",c:["b-tou-ch","b-galbasse"]},
 "b-tou-ch":{u:"Dormitorio del conde de Toulouse, quien mantuvo el Aposento de los Baños tanto en 1715 como en 1722 y 1732.",o:"Baños de Luis XIV, 1671-1680, adaptados en 1685 para Montespan.",c:["b-tou-cab","b-tou-oct"]},
 "b-tou-oct":{u:"Salón del conde.",o:"Gabinete octogonal de los Baños, hacia 1675.",c:["b-tou-ch","b-tou-bains"]},
 "b-tou-bains":{u:"Pieza de aparato del conde, donde recibe.",o:"Sala de las pilas de los Baños, 1671-1680; convertida en 1685.",c:["b-tou-oct","b-tou-ant"]},
 "b-tou-ant":{u:"Antecámaras del aposento: criados de librea, visitas en espera, oficiales de la Marina.",o:"Hardouin-Mansart, 1685, para Madame de Montespan.",c:["b-tou-bains","b-hoquetons","b-norte"]},
 "b-norte":{u:"Corredor hacia la capilla y los alojamientos del Ala Norte.",o:"Década de 1680.",c:["b-tou-ant","b-oldchapel"]},
 "b-oldchapel":{u:"Nivel bajo de la vieja capilla, sin uso y en obras.",o:"Capilla de 1682. Desafectada en 1710, cuando se consagró la nueva.",c:["b-norte","b-chapelle"]},
 "b-chapelle":{u:"Nave de la Capilla Real. La corte oye la misa diaria del rey y canta la música de la Capilla.",o:"Hardouin-Mansart y Robert de Cotte, 1689-1710.",c:["tribune","b-oldchapel","b-aile-n","b-mn-gal"]},
 "b-aile-s":{u:"Oficios de boca, Argentier y alojamientos modestos.",o:"Le Vau, década de 1660.",c:["b-sud","b-fleury","royale","aile-s"]},
 "b-aile-n":{u:"Oficios del Gobelet y alojamientos modestos.",o:"Le Vau, década de 1660.",c:["royale","b-chapelle","aile-n"]},
 maintenon:{u:"Seis o siete años cerrado tras el retiro de Mme de Maintenon a Saint-Cyr en 1715 y su muerte en 1719. Es uno de los alojamientos más codiciados del palacio.",o:"Hardouin-Mansart, 1682-1684.",c:["grandegardes","escreine","aile-s","n-ms-gal"]},
 antin:{u:"Alojamiento y despacho del duque de Antin, director de los Edificios del Rey en 1715, 1722 y 1732: aquí se deciden obras, reparaciones y asignaciones.",o:"Década de 1680.",c:["ambassadeurs","aile-n","hercule","n-mn-gal"]},
 "midi-orleans":{u:"Cabeza del Ala de los Príncipes, sobre los jardines del Mediodía. Lo conservan Madame Palatina y la duquesa de Orleans, aunque Madame vive sobre todo en Saint-Cloud, donde muere el 8 de diciembre de 1722.",o:"Hardouin-Mansart, 1682-1684.",c:["midi-chartres","paix","n-ms-gal"]},
 "midi-chartres":{u:"El heredero de los Orleans (18 años), llegado en la carroza del Rey el 15 de junio de 1722.",o:"Hardouin-Mansart, década de 1680.",c:["midi-orleans","midi-bourbon","n-ms-gal"]},
 "midi-bourbon":{u:"La casa de Condé, rival de los Orleans. Monsieur le Duc es superintendente de la educación del rey en junio de 1722.",o:"Hardouin-Mansart, década de 1680.",c:["midi-chartres","midi-conti","n-ms-gal"]},
 "midi-conti":{u:"Los príncipes de Conti, la rama menor de los Borbón-Condé.",o:"Hardouin-Mansart, década de 1680.",c:["midi-bourbon","midi-charolais","n-ms-gal"]},
 "midi-charolais":{u:"Antiguo aposento de los duques de Maine (apartados tras la conspiración de Cellamare de 1718). Pasa a los Condé (conde y Mlle de Charolais).",o:"Hardouin-Mansart, década de 1680.",c:["midi-conti","grandegardes","n-ms-gal"]},
 "n-nord":{u:"Primer piso del Ala Norte: el cardenal de Rohan (Gran Limosnero de 1713 a 1749) y el duque de Noailles, cerca de la capilla.",o:"Hardouin-Mansart, 1685-1689.",c:["tribune","hercule","n-mn-gal"]},
 "b-gouverneur":{u:"Alojamiento del gobernador del rey. El 15 de junio de 1722 se instala Villeroy; el 10 de agosto de 1722 es arrestado y desterrado a Lyon, pasando al duque de Charost.",o:"Hardouin-Mansart, década de 1680.",c:["b-sud","b-fleury","b-reg-ant"]},
 "b-fleury":{u:"Antiguo aposento de los Hijos de Francia, ocupado desde junio de 1722 por André-Hercule de Fleury, preceptor de Luis XV.",o:"Hardouin-Mansart, 1689-1699.",c:["b-gouverneur","b-escreine","b-aile-s"]},
 "b-blouin":{u:"Louis Blouin, primer ayuda de cámara e intendente de Versalles: custodió el palacio durante los siete años de ausencia en París (1715-1722).",o:"Década de 1680.",c:["b-interiores","b-hoquetons"]},
 "a-chapelle-voute":{u:"Sin piso habitable: armadura y cubierta sobre la bóveda pintada de la Capilla Real.",o:"Hardouin-Mansart y Robert de Cotte, 1689-1710.",c:["tribune"]},
 "a-boveda":{u:"No hay piso habitable: aquí sube el trasdós de la gran bóveda pintada de la Galería de los Espejos.",o:"Hardouin-Mansart y Le Brun, 1678-1684.",c:[]},
 "a-sud":{u:"Alojamientos de gentilhombres y damas sobre los aposentos de la reina (duque de Mortemart, duque de Saint-Aignan).",o:"Le Vau, 1668-1670; subdivisiones posteriores.",c:["a-escreine","a-salle-gardes","a-centro"]},
 "a-salle-gardes":{u:"Ático meridional contiguo a la Escalera de la Reina.",o:"Hardouin-Mansart, 1682.",c:["a-escreine","a-sud","a-aile-s","a-ms-gal"]},
 "a-centro":{u:"Desvanes y entresuelos sobre la Cámara del Rey: primeros ayudas de cámara, guardarropas y criados de cámara.",o:"Núcleo de Luis XIII, rehecho por Hardouin-Mansart en 1701.",c:["a-sud","a-gardes-att","a-roi"]},
 "a-gardes-att":{u:"Entresuelos y desvanes de servicio sobre las antecámaras reales.",o:"Hardouin-Mansart, 1701.",c:["a-centro","a-escreine"]},
 "a-roi":{u:"Sobre los gabinetes del rey. Desde junio de 1722 se habilitan aquí las primeras piezas privadas de recreo de Luis XV junto al Gabinete de Cuadros.",o:"Le Vau y Hardouin-Mansart; nuevas piezas desde 1722.",c:["a-centro","a-grand","cabroi"]},
 "a-grand":{u:"Ático sobre el Gran Aposento del Rey: alojamientos de cortesanos y oficiales.",o:"Le Vau, 1668-1670.",c:["a-roi","a-aile-n","a-mn-gal"]},
 "a-escreine":{u:"Último tramo de la Escalera de la Reina, que sube hasta los alojamientos del ático.",o:"Hardouin-Mansart, 1679-1681.",c:["escreine","a-sud","a-salle-gardes","a-gardes-att"]},
 "a-midi":{u:"Ático del Ala de los Príncipes: gentilhombres y damas de las casas de Orleans, Condé y Conti.",o:"Hardouin-Mansart, 1679-1682.",c:["a-ms-gal","midi-orleans"]},
 "a-nord":{u:"Ático del Ala Norte: alojamientos de los duques de Chaulnes, Luxemburgo y Rochechouart.",o:"Hardouin-Mansart, 1685-1689.",c:["a-mn-gal","n-nord"]},
 "a-aile-s":{u:"Ático del ala sur del Patio Real: alojamientos modestos, muy disputados.",o:"Le Vau, década de 1660.",c:["a-salle-gardes","aile-s"]},
 "a-aile-n":{u:"Ático del ala norte del Patio Real: alojamientos modestos.",o:"Le Vau, década de 1660.",c:["a-grand","aile-n"]},
 // Dominio, Ciudad de Versalles (1722) y Trayecto hasta París
 stcyr:{u:"Doscientas cincuenta señoritas de la nobleza pobre educadas por las Damas de San Luis. Aquí reposa Madame de Maintenon desde abril de 1719; sigue siendo un centro de influencia devota y de casamientos concertados por la corona.",o:"Hardouin-Mansart, 1685-1686.",c:["canal","menagerie"]},
 canal:{u:"Eje hidráulico del parque. En verano navegan las góndolas venecianas y las chalupas armadas del rey.",o:"Le Nôtre, 1668-1679.",c:["apolo","trianon","menagerie","stcyr"]},
 trianon:{u:"Palacio de recreo de pórfido y mármol de Languedoc. Durante el verano de 1722 se prepara para meriendas de la corte y paseos del joven Luis XV.",o:"Hardouin-Mansart y Robert de Cotte, 1687-1688.",c:["canal","bosquets"]},
 menagerie:{u:"Patios radiantes con aves acuáticas, avestruces y fieras. El pabellón octogonal fue el refugio predilecto de la difunta duquesa de Borgoña, madre de Luis XV.",o:"Le Vau, 1663; remodelado por Mansart en 1698.",c:["canal","suisses","stcyr"]},
 apolo:{u:"Estanque del carro del Sol; punto de reunión en los paseos del jardín antes de bajar al canal.",o:"Tuby sobre dibujo de Le Brun, 1668-1671.",c:["canal","bosquets"]},
 bosquets:{u:"Salones de verdor entre empalizadas de carpe (la Salle de Bal, la Colonnade, los Bains d'Apollon): único lugar del dominio donde dos cortesanos pueden hablar a cubierto de oídos ajenos.",o:"Le Nôtre y Hardouin-Mansart, 1670-1704.",c:["parterres","apolo","trianon","orangerie"]},
 parterres:{u:"Terrazas frente a la Galería de los Espejos. Al caer la tarde la corte baja por la gran escalinata de Latona.",o:"Le Nôtre y Mansart, 1672-1685.",c:["corps","bosquets","orangerie"]},
 suisses:{u:"Gran espejo de agua al pie de las colinas de Satory, bordeado por el paseo de los guardias.",o:"Excavado por el regimiento de guardias suizos, 1678-1682.",c:["orangerie","potager","menagerie"]},
 orangerie:{u:"Más de mil naranjos en cajones de plata y madera; paseo abrigado del viento del norte.",o:"Hardouin-Mansart, 1684-1686 (Escalera de los Cien Peldaños).",c:["parterres","midi","potager","suisses"]},
 potager:{u:"Huerta amurallada con microclimas para dar higos en junio y fresas en primavera a la mesa real.",o:"Jean-Baptiste de La Quintinie, 1678-1683.",c:["orangerie","ville-s","stlouis-iglesia"]},
 midi:{u:"Ala de los Príncipes (Orleans, Condé y Conti) sobre el Parterre del Mediodía.",o:"Hardouin-Mansart, 1679-1682.",c:["corps","orangerie","commun"]},
 corps:{u:"Núcleo ceremonial de la monarquía: Cámara del Rey, Galería de los Espejos y despacho del Regente.",o:"Le Vau y Hardouin-Mansart, 1668-1701.",c:["patios","parterres","midi","nord"]},
 nord:{u:"Ala Norte y Capilla Real consagrada en 1710; alojamientos de grandes cargos y prelados.",o:"Hardouin-Mansart y Robert de Cotte, 1685-1710.",c:["corps","chenil","nd-parroquia"]},
 patios:{u:"Sucesión ascendente del Patio de los Ministros, el Patio Real (reservado a las carrozas con honores del Louvre) y el Patio de Mármol.",o:"Hardouin-Mansart, 1679-1682.",c:["corps","armes","commun","chenil"]},
 armes:{u:"Explanada de llegada ante la Reja Real: aquí se agolpan carrozas doradas, sillas de manos de alquiler («bleus»), guardias franceses y peticionarios.",o:"Le Nôtre y Hardouin-Mansart, hacia 1680.",c:["patios","gecurie","pecurie","av-paris","av-stcloud","av-sceaux"]},
 commun:{u:"El estómago de Versalles: cocinas del Grand y Petit Commun, panadería, cava y más de cien cuartos donde se alojan gentilhombres, médicos y oficiales de boca.",o:"Hardouin-Mansart, 1682-1684.",c:["patios","midi","cocheras","vieux-versailles"]},
 cocheras:{u:"Remesas de carruajes de servicio y el célebre trinquete del Juego de Palma del Viejo Versalles, frecuentado por jóvenes nobles y oficiales.",o:"Construcciones de servicio, década de 1680.",c:["commun","pecurie","vieux-versailles","parc-aux-cerfs"]},
 "vieux-versailles":{u:"El antiguo burgo al sur del Gran Común. En junio de 1722 sus posadas (*Au Juste*, *L'Image Notre-Dame*) han triplicado los alquileres ante el regreso repentino de la corte.",o:"Núcleo medieval remodelado bajo Luis XIII y Luis XIV.",c:["commun","cocheras","ville-s","parc-aux-cerfs"]},
 "ville-s":{u:"Barrio meridional poblado por servidores de palacio, artesanos de lujo, lavanderas y pequeños oficiales de pluma.",o:"Trazado urbano del mediodía, 1673-1715.",c:["vieux-versailles","stlouis-iglesia","potager"]},
 "stlouis-iglesia":{u:"Capilla parroquial del barrio sur (embrión de la futura catedral de Saint-Louis): aquí se leen las amonestaciones y se reparte la limosna a los criados.",o:"Primera parroquia meridional de Versalles, fines del s. XVII.",c:["ville-s","parc-aux-cerfs","potager"]},
 "parc-aux-cerfs":{u:"Antiguo cercado de ciervos de la época de Luis XIII. En 1722 comienza a parcelarse en discretos jardines tapiados y casitas apartadas de las miradas del palacio.",o:"Coto real de caza convertido en arrabal tranquilo.",c:["vieux-versailles","stlouis-iglesia","cocheras","av-sceaux"]},
 pecurie:{u:"Bajo el mando del Primer Escudero (el «Monsieur le Premier», de la casa de Beringhen): carrozas de cuerpo del rey, berlinas de viaje y sillas de posta.",o:"Hardouin-Mansart, 1679-1682.",c:["armes","cocheras","av-sceaux","av-paris"]},
 gecurie:{u:"Bajo el mando del Gran Escudero de Francia («Monsieur le Grand», príncipe Carlos de Lorena): caballos de guerra y caza, picadero real y escuela de los Pajes de la Gran Caballeriza.",o:"Hardouin-Mansart, 1679-1682.",c:["armes","chenil","ville-n","av-paris","av-stcloud"]},
 chenil:{u:"La Vénerie y el Grand Chenil: jaurías de perros para la caza del ciervo, picadores y cocheras de gala detrás del Ala Norte.",o:"Hardouin-Mansart, década de 1680.",c:["nord","patios","gecurie","nd-parroquia"]},
 "nd-parroquia":{u:"Parroquia real de Versalles, servida por los Lazaristas (Padres de la Misión). Sus libros parroquiales guardan el secreto de cada bautismo y matrimonio de la corte.",o:"Hardouin-Mansart, consagrada en 1686.",c:["nord","chenil","nd-marche","ville-n"]},
 "nd-marche":{u:"Gran plaza cuadrada con cuatro pabellones(las «Baraques»): pescado de mar traído a galope desde Dieppe, carnes, granos y rumores del pueblo.",o:"Trazado de Le Nôtre y Mansart, década de 1680.",c:["nd-parroquia","ville-n"]},
 "ville-n":{u:"El barrio noble de la ciudad nueva, sujeto a la servidumbre de altura y piedra blanca de Luis XIV: Hôtels de Noailles, de Beauvillier, de Contades, de Toulouse y la Chancillería.",o:"Pabellones y hôtels particulares, 1671-1722.",c:["nd-parroquia","nd-marche","gecurie","av-stcloud"]},
 "av-paris":{u:"La arteria vital del reino en junio de 1722: día y noche ruedan por su empedrado las carrozas de seis caballos de los ministros, los correos de gabinete y los carromatos con muebles desde París.",o:"Le Nôtre, década de 1670: 90 metros de anchura y cuatro hileras de olmos.",c:["armes","pecurie","gecurie","chaville","sevres"]},
 "av-stcloud":{u:"El camino de los Orleans: une la Plaza de Armas con Montreuil, Ville-d'Avray y el palacio de Saint-Cloud.",o:"Le Nôtre, década de 1670.",c:["armes","gecurie","ville-n","stcloud"]},
 "av-sceaux":{u:"El camino del sur a través de los bosques de Velizy hacia Meudon y la corte opositora de Sceaux.",o:"Le Nôtre, década de 1670.",c:["armes","pecurie","parc-aux-cerfs","meudon","sceaux"]},
 chaville:{u:"Garganta boscosa entre colinas y parada de refresco de los tiros antes de bajar la cuesta empinada hacia el puente de Sèvres.",o:"Antiguo dominio del marqués de Louvois.",c:["av-paris","sevres","meudon"]},
 sevres:{u:"Cuello de botella del trayecto entre Versalles y París: su puente sobre el Sena, su posta de caballos, sus posadas y el embarcadero de la galiote ven pasar a todo espía, correo o acreedor.",o:"Puente real sobre el Sena y posta de la corona.",c:["av-paris","chaville","sena","stcloud","meudon","barriere-conference"]},
 stcloud:{u:"Palacio de recreo de la Casa de Orleans sobre el Sena y su gran cascada. Aquí reside Madame Palatina (madre del Regente), que aborrece el bullicio de Versalles y morirá aquí el 8 de diciembre de 1722.",o:"Le Pautre y Hardouin-Mansart para Monsieur (1677-1695); jardines de Le Nôtre.",c:["av-stcloud","sevres","sena","boulogne"]},
 meudon:{u:"Antigua corte del Gran Delfín sobre la terraza que domina París y el Sena. El Regente ha cedido aquí alojamiento al duque de Saint-Simon, quien se retira a rumiar su despecho contra Dubois y el traslado a Versalles.",o:"Le Vau y Hardouin-Mansart (Château-Neuf de Meudon, 1706).",c:["av-sceaux","chaville","sevres","sceaux","sena"]},
 sceaux:{u:"La pequeña corte rebelde de Ana Luisa Benedicta de Borbón, duquesa de Maine, devuelta del exilio en 1720 tras la conspiración de Cellamare: comedias nocturnas, abates literatos y epigramas contra el Regente.",o:"Perrault y Le Nôtre para Colbert; ampliado por los duques de Maine desde 1700.",c:["av-sceaux","meudon"]},
 sena:{u:"La gran cinta fluvial de la Île-de-France: las barcazas («coches d'eau» y la galiote de Sèvres) transportan muebles, vinos de Borgoña, leña y viajeros sin prisa entre el Louvre y el puente de Sèvres.",o:"Curso navegable regulado por el Preboste de los Mercaderes de París.",c:["sevres","stcloud","meudon","boulogne","barriere-conference","tuileries","paris-parlement"]},
 boulogne:{u:"Bosque real a las puertas de París: lugar de paseo de las carrozas elegantes, de retiro espiritual en la abadía de Longchamp y de duelos al amanecer lejos de los guardias.",o:"Coto real cerrado de muros bajo Francisco I y Luis XIV.",c:["stcloud","sena","barriere-conference"]},
 "barriere-conference":{u:"Puerta fiscal y policial en el extremo oeste de París, al final del Cours-la-Reine. Los comisarios del teniente de policía d'Argenson / Baudry anotan las carrozas ilustres y registran los fardos en busca de libelos jansenistas.",o:"Barrera de los Fermiers Généraux junto al Sena.",c:["sevres","boulogne","sena","tuileries","paris-hotels","palais-royal"]},
 "paris-hotels":{u:"Los grandes hôtels particulares del Faubourg Saint-Germain y del Marais (Hôtel de Condé, Palais-Bourbon en construcción para Madame la Duchesse, Hôtel de Toulouse, Hôtel de Soubise): aquí siguen los intendentes, los archivos familiares y los acreedores.",o:"Mansart, Bullet, Boffrand y Germain Boffrand (1700-1722).",c:["barriere-conference","tuileries","palais-royal","paris-parlement"]},
 tuileries:{u:"Sede del gobierno y residencia de Luis XV desde diciembre de 1715 hasta el 15 de junio de 1722. Quedan allí las Academias, la casa de la pequeña infanta en el Louvre y los salones vacíos tras la partida a Versalles.",o:"Philibert Delorme, Le Vau y Le Nôtre.",c:["barriere-conference","palais-royal","paris-hotels","paris-parlement","sena"]},
 "palais-royal":{u:"El verdadero centro neurálgico de París: residencia de Felipe II de Orleans, galerías de pintura, la Ópera real al costado y los comedores privados donde el Regente celebra sus cenas con los «roués» y la marquesa de Parabère.",o:"Palacio Cardinal de Richelieu, reformado por Oppenord para el Regente (1715-1720).",c:["barriere-conference","tuileries","paris-hotels","paris-parlement"]},
 "paris-parlement":{u:"La Île de la Cité con el Palais de Justice (sede del Parlamento de París, que regresó en diciembre de 1720 de su destierro en Pontoise), la catedral de Notre-Dame del cardenal de Noailles y, en la orilla derecha, la rue Quincampoix aún marcada por la quiebra de Law.",o:"Palais de la Cité y Grand'Chambre del Parlamento.",c:["tuileries","palais-royal","paris-hotels","sena"]}
};

const OCUP = {
 chambre:[["Luis XV","luis-xv","a","Duerme en la cama de Luis XIV desde el 15 de junio."]],
 chreine:[["Mariana Victoria, infanta de España","mariana-victoria","a","Prometida del rey, cuatro años."]],
 cabreine:[["Duquesa de Ventadour",null,"a","Gobernanta de la infanta (antes, del rey)."]],
 "b-reg-ch":[["Felipe II de Orleans, el Regente","felipe-ii-orleans","a","Morirá en su gabinete contiguo el 2 de diciembre de 1723."]],
 "b-reg-cab":[["Felipe II de Orleans, el Regente","felipe-ii-orleans","a","Despacho privado del Regente."]],
 "b-gouverneur":[["Mariscal duque de Villeroy",null,"a","Gobernador del rey en junio de 1722; arrestado el 10 de agosto."],["Duque de Charost",null,"a","Sustituye a Villeroy desde el 14 de agosto de 1722."]],
 "b-fleury":[["André-Hercule de Fleury",null,"a","Antiguo obispo de Fréjus, preceptor del rey (ocupa el antiguo aposento de los Hijos de Francia)."]],
 "b-tou-ch":[["Conde de Toulouse","comte-de-toulouse","a","Hijo legitimado de Luis XIV; conserva el Aposento de los Baños en 1715, 1722 y 1732."]],
 "b-capitaine":[["Capitán de guardias de corps de cuartel",null,"a","Rotan por trimestre (Noailles, Villeroy, Charost, Harcourt)."]],
 "b-blouin":[["Louis Blouin",null,"a","Primer ayuda de cámara e intendente de Versalles (m. 1729)."]],
 maintenon:[["Vacante",null,"a","Mme de Maintenon se retiró a Saint-Cyr en 1715 y murió en 1719; inventariado en 1722."]],
 antin:[["Duque de Antin",null,"a","Director general de los Edificios del Rey; mismo ocupante en 1715 y 1732."]],
 "midi-orleans":[["Madame, princesa palatina","liselotte","a","Madre del Regente; muere en Saint-Cloud el 8 de diciembre de 1722."],["Duquesa de Orleans","francoise-marie-blois","a","Esposa del Regente."]],
 "midi-chartres":[["Duque de Chartres","luis-orleans-chartres","a","Hijo del Regente, 18 años."]],
 "midi-bourbon":[["Monsieur le Duc","luis-enrique-borbon","a","Superintendente de la educación del rey desde 1718."],["Madame la Duchesse (viuda)","louise-francoise-duchesse","m","Madre de Monsieur le Duc."]],
 "midi-conti":[["Príncipe de Conti","louis-armand-conti","a","Mismo aposento familiar entre 1715 y 1732."],["Princesa de Conti","louise-elisabeth-conti","a",""]],
 "midi-charolais":[["Conde de Charolais","charles-charolais","m","Antiguo aposento del duque de Maine (desgraciado tras Cellamare)."],["Mademoiselle de Charolais","louise-anne-charolais","m",""]],
 "n-nord":[["Cardenal de Rohan",null,"a","Gran Limosnero de Francia (1713-1749), alojado junto a la Capilla."],["Duque de Noailles",null,"m","Capitán de la 1.ª compañía de Guardias de Corps."]],
 "a-roi":[["Luis XV (Petits Cabinets y Cuadros)","luis-xv","a","Primeras piezas de recreo acondicionadas en el ático al volver en junio de 1722."]],
 "a-sud":[["Duque de Mortemart",null,"m","Primer gentilhombre de la Cámara."],["Duque de Saint-Aignan",null,"m","Medio hermano de Beauvillier."]],
 "a-nord":[["Duques de Chaulnes, Luxemburgo y Rochechouart",null,"b","Cortesanos del ático del Ala Norte."]],
 // Ocupantes y figuras clave del Dominio y de París en junio de 1722
 stcloud:[["Madame, princesa palatina","liselotte","a","Reside en Saint-Cloud de primavera a otoño; fallece aquí el 8 de diciembre de 1722."],["Felipe II de Orleans, el Regente","felipe-ii-orleans","a","Visita a su madre casi cada semana desde Versalles o París."]],
 meudon:[["Duque de Saint-Simon",null,"a","Disfruta del palacio de Meudon por gracia del Regente; aquí redacta sus notas y recibe en secreto."]],
 sceaux:[["Duquesa de Maine","duchesse-du-maine","a","Tiene corte literaria y política propia en Sceaux tras su liberación en 1720."],["Duque de Maine","duc-du-maine","a","Retirado en Sceaux y Clagny, reconciliado solo en apariencia."]],
 "palais-royal":[["Felipe II de Orleans, el Regente","felipe-ii-orleans","a","Sede parisiense de la casa de Orleans y de sus cenas privadas."],["Cardenal Dubois",null,"a","Despacha el correo extranjero y las finanzas de la Regencia."]],
 "paris-hotels":[["Madame la Duchesse (viuda)","louise-francoise-duchesse","a","Hace construir el Palais-Bourbon frente a los Campos Elíseos."],["Conde de Toulouse","comte-de-toulouse","a","Hôtel de Toulouse (junto a la Place des Victoires)."],["Príncipe de Conti","louis-armand-conti","a","Hôtel de Conti (Quai Malaquais)."]],
 "paris-parlement":[["Jean-Antoine de Mesmes, primer presidente",null,"a","Cabeza del Parlamento de París."],["Cardenal de Noailles, arzobispo de París",null,"a","Arzobispado junto a Notre-Dame; líder de los apelantes de la bula Unigenitus."]],
 gecurie:[["Príncipe Carlos de Lorena (Monsieur le Grand)",null,"a","Gran Escudero de Francia."]],
 pecurie:[["Marqués de Beringhen (Monsieur le Premier)",null,"a","Primer Escudero del Rey."]],
 "ville-n":[["Canciller d'Aguesseau / Guarda de los Sellos Armenonville",null,"a","Chancillería y hôtels ministeriales del barrio de Notre-Dame."]]
};

/* Enlaces automáticos de las alas: vecinos de fila, galería, crujías y patios (sin duplicar) */
const enlazar=(id,...otros)=>{const c=INFO_EST[id].c;otros.forEach(o=>{if(o&&o!==id&&!c.includes(o))c.push(o)})};
[ALAS_BAJA,ALAS_NOBLE,ALAS_ATICO].forEach(grupo=>grupo.forEach(a=>{
  const gal=a.p+"-gal", base=c=>({u:a.u,o:a.o,c}), gen=/-[JC]\d+$/;
  [a.filaJ,a.filaC].forEach(L=>L.forEach((id,i)=>{
    if(INFO_EST[id]){enlazar(id,L[i-1],L[i+1],gal);return}
    INFO_EST[id]=base([L[i-1],L[i+1],gal].filter(Boolean));
  }));
  a.transIds.forEach(id=>{INFO_EST[id]??=base([gal])});
  a.patioIds.forEach(id=>{INFO_EST[id]??=base([])});
  if(a.p.startsWith("b-")){ // los patios solo tienen puertas a planta baja
    a.transIds.forEach((id,i)=>enlazar(id,a.patioIds[i-1],a.patioIds[i]));
    a.patioIds.forEach((id,i)=>enlazar(id,a.transIds[i],a.transIds[i+1]));
  }
  INFO_EST[gal]??=base([]);
  enlazar(gal,...a.filaJ.filter(id=>!gen.test(id)),a.filaJ.find(id=>gen.test(id)),...a.filaC.filter(id=>!gen.test(id)),a.filaC[0],...a.transIds);
}));
enlazar("n-ms-gal","grandegardes","maintenon","b-ms-gal","a-ms-gal");
enlazar("n-mn-gal","tribune","antin","b-mn-gal","a-mn-gal");
enlazar("b-ms-gal","b-sud","b-aile-s","n-ms-gal");
enlazar("b-mn-gal","b-chapelle","b-aile-n","n-mn-gal");
enlazar("a-ms-gal","a-salle-gardes","n-ms-gal");
enlazar("a-mn-gal","a-grand","n-mn-gal");

let OCUP_DB={};
const CATS={real:"Familia real",hombre:"Hombre de corte",mujer:"Mujer de corte",cargo:"Lugar de un cargo"};
const CAT_PJ={"luis-xv":"real","mariana-victoria":"real","felipe-ii-orleans":"real","liselotte":"real","francoise-marie-blois":"real","luis-orleans-chartres":"real","luis-enrique-borbon":"real","louise-francoise-duchesse":"real","louis-armand-conti":"real","louise-elisabeth-conti":"real","charles-charolais":"real","louise-anne-charolais":"real","comte-de-toulouse":"real"};
const CAT_EST={"b-gouverneur":"cargo","b-fleury":"cargo","b-capitaine":"cargo","b-blouin":"cargo","b-hoquetons":"cargo","b-servicio":"cargo",cabreine:"mujer",antin:"cargo"};
function ocupantes(id){
  const d=OCUP_DB[id]; if(d&&Array.isArray(d.lista))return d.lista.map(o=>[o.n,o.pid||null,o.conf||"m",o.nota||"",o.cat||"hombre"]);
  return (OCUP[id]||[]).map(o=>[o[0],o[1],o[2],o[3],o[1]&&CAT_PJ[o[1]]?CAT_PJ[o[1]]:(CAT_EST[id]||"hombre")]);
}
function catCls(id){const L=ocupantes(id).filter(o=>o[0]!=="Vacante");return L.length?" cat-"+L[0][4]:""}
function ocupEditor(id){
  const L=ocupantes(id).map(o=>({n:o[0],pid:o[1],conf:o[2],nota:o[3],cat:o[4]}));
  const msg=el("span",{class:"note","aria-live":"polite"});
  const guardar=async lista=>{msg.textContent="Guardando…";try{await db.doc("ocupantes/"+id).set({lista});OCUP_DB[id]={lista};goRoom(id)}catch(e){msg.textContent="No se pudo guardar."}};
  const nom=el("input",{type:"text",placeholder:"Nombre del ocupante","aria-label":"Nombre del ocupante"});
  const cat=el("select",{"aria-label":"Categoría"}); Object.entries(CATS).forEach(([k,v])=>{const o=el("option",{value:k},v);if(k==="hombre")o.selected=true;cat.append(o)});
  const conf=el("select",{"aria-label":"Confianza"}); [["a","confirmado"],["m","probable"],["b","dudoso"]].forEach(([k,v])=>{const o=el("option",{value:k},v);if(k==="m")o.selected=true;conf.append(o)});
  const nota=el("input",{type:"text",placeholder:"Nota o fuente (opcional)","aria-label":"Nota"});
  return el("div",{class:"ocup-ed"},
    el("div",{class:"row"},nom,cat,conf),nota,
    el("div",{class:"row"},el("button",{class:"btn sm",onclick:()=>{if(!nom.value.trim())return;const pj=typeof PERSONAJES!=="undefined"?PERSONAJES.find(p=>p.nombre.toLowerCase()===nom.value.trim().toLowerCase()):null;
      guardar([...L,{n:nom.value.trim(),cat:cat.value,conf:conf.value,nota:nota.value.trim(),pid:pj?pj.id:null}])}},"Añadir ocupante"),
      L.length?el("button",{class:"btn sm danger",onclick:()=>guardar(L.slice(0,-1))},"Quitar el último"):"",msg));
}

let mapSel=null, PISO_PAL=2, CAM_PAL="todo", CALCO_PAL=false, CAM_DOM="todo";
const CAMERAS_PAL = {
  todo:    {vb:"20 150 1870 740", label:"Palacio completo", zoom:false},
  central: {vb:"720 155 600 690", label:"Cuerpo central", zoom:true},
  midi:    {vb:"25 490 770 350",  label:"Ala del Mediodía", zoom:true},
  nord:    {vb:"1170 490 720 350",label:"Ala Norte y Capilla", zoom:true}
};
const CAMERAS_DOM = {
  todo:      {vb:"0 0 600 1125",   label:"De Versalles a París", zoom:false},
  versalles: {vb:"0 455 600 250",  label:"Ciudad de Versalles (1722)", zoom:true},
  sena:      {vb:"0 635 600 315",  label:"Línea del Sena y Enclaves", zoom:true},
  paris:     {vb:"0 875 600 250",  label:"París y Palais-Royal", zoom:true}
};

const ESTNOM={}, DOMNOM={};
[[PALACIO,2],[PALACIO_BAJA,1],[PALACIO_ATICO,3]].forEach(([L,p])=>L.forEach(r=>{
  const cx=typeof r[3]==="string"?r[6][0]:r[3]+r[5]/2;
  const cy=typeof r[3]==="string"?r[6][1]:r[4]+r[6]/2;
  const o=ESTNOM[r[0]]||(ESTNOM[r[0]]={n:r[1],s:r[2],d:typeof r[3]==="string"?r[5]:r[8],p:[],cx,cy});
  if(!o.p.includes(p))o.p.push(p);
}));
DOMINIO.forEach(r=>{
  const cx=typeof r[3]==="string"?r[6][0]:r[3]+r[5]/2;
  const cy=typeof r[3]==="string"?r[6][1]:r[4]+r[6]/2;
  DOMNOM[r[0]]={n:r[1],s:r[2],d:typeof r[3]==="string"?r[5]:r[8],p:[0],cx,cy};
});

/* ---------- Mecánica de Viaje y Tiempos (De Versalles a la Línea del Sena y París) ---------- */
const VIAJES_DOM = {
  "palais-royal": {
    dest:"Palais-Royal (Sede del Regente en París)",
    dist:"4 leguas y cuarto (por Sèvres y la Barrière de la Conférence)",
    ruta:"Plaza de Armas → Av. de París → Chaville → Puente de Sèvres → Cours-la-Reine → Rue Saint-Honoré",
    control:"Guardia del Regente en el patio de las columnas y registro de carruajes en la Barrière de la Conférence.",
    tiempos:{
      posta:  {n:"Carroza de seis caballos con posta en Sèvres", t:"1 h 45 min", coste:"18 libras (relevo real)", nota:"Cruzas el puente de Sèvres al trote largo; los guardias de la barrera se descubren al ver tu tiro."},
      berlina:{n:"Berlina ordinaria de cuatro caballos", t:"2 h 40 min", coste:"8 libras", nota:"El empedrado de Chaville sacude los ejes; llegas a la rue Saint-Honoré con los caballos cubiertos de espuma."},
      silla:  {n:"Caballo de silla / Postillón a galope", t:"1 h 15 min", coste:"4 libras", nota:"Rápido y discreto para llevar un pliego urgente antes de que cierre el despacho de Dubois, pero llegas salpicado de barro."},
      galiote:{n:"Carroza hasta Sèvres y Galiote por el Sena", t:"3 h 50 min", coste:"30 sueldos", nota:"Desembarcas junto a las Tullerías tras compartir barcaza con abates, mercaderes y espías de policía."}
    },
    espera:[
      {tipo:"rumor", tit:"Las cenas de los roués y la salud del Regente", de:"Antecámara del Palais-Royal",
       txt:"En las galerías del [[regencia|Palais-Royal]] se murmura que el duque de Orleans tiene el rostro cada vez más encendido y pesado tras sus cenas nocturnas con Nocé, Broglie y Mme de Parabère. El médico Chirac le ha prohibido los licores fuertes, pero nadie se atreve a quitarle la copa."},
      {tipo:"carta", tit:"Pliego reservado del gabinete del cardenal Dubois", de:"Galería de los Despachos · París",
       txt:"Aunque la corte se instaló en Versalles el 15 de junio, los correos de Londres y Madrid siguen pasando primero por los escribientes de Dubois en París. Un oficial de secretaría ofrece dejarte ver la lista de pensiones eclesiásticas vacantes antes de que suba al [[oeil-de-boeuf|Œil-de-Bœuf]]."},
      {tipo:"oblig", tit:"Pagarés de la rue Quincampoix en manos de un banquero", de:"Arcadas de la Rue de Richelieu",
       txt:"Un síndico de la liquidación del [[sistema-law|Sistema de Law]] te aguarda a la salida de la Ópera: afirma haber comprado un viejo billete firmado por tu casa en [[quincampoix|Quincampoix]] y ofrece canjearlo por una recomendación en Versalles."}
    ]
  },
  tuileries: {
    dest:"Palacio de las Tullerías y el Louvre",
    dist:"4 leguas (por el Cours-la-Reine)",
    ruta:"Av. de París → Puente de Sèvres → Passy → Barrière de la Conférence → Jardín de las Tullerías",
    control:"Guardias suizos del Louvre y conserjería de los Edificios del Rey.",
    tiempos:{
      posta:  {n:"Carroza de seis caballos con posta", t:"1 h 40 min", coste:"16 libras", nota:"Entras directamente por el patio de las Tullerías donde hace apenas unos días formaban los mosqueteros."},
      berlina:{n:"Berlina de cuatro caballos", t:"2 h 30 min", coste:"7 libras", nota:"Recorres la orilla derecha del Sena; el jardín de las Tullerías sigue lleno de paseantes que echan de menos al joven rey."},
      silla:  {n:"Caballo de posta", t:"1 h 10 min", coste:"4 libras", nota:"Atajas por el camino de sirga del Sena desde el puente de Sèvres."},
      galiote:{n:"Galiote real desde el puente de Sèvres", t:"3 h 30 min", coste:"25 sueldos", nota:"La barcaza atraca al pie mismo del Pont Royal, entre las Tullerías y el Louvre."}
    },
    espera:[
      {tipo:"aviso", tit:"Muebles olvidados y cofres en la mudanza real", de:"Conserjería de las Tullerías",
       txt:"Tras la partida de Luis XV y de la pequeña infanta hacia Versalles el 15 de junio, han quedado en los entresuelos del Louvre baúles sin reclamar y papeles de la casa del mariscal de Villeroy que sus criados buscan con nerviosismo."},
      {tipo:"rumor", tit:"Las quejas de las damas de París por el abandono de las Tullerías", de:"Gran paseo de los castaños",
       txt:"En los jardines de las Tullerías no se habla de otra cosa: los comerciantes de la rue Saint-Honoré temen la ruina ahora que el rey duerme en Versalles, y las [[nouvelles|nouvelles à la main]] aseguran que Villeroy y el Regente chocan cada día por el control del niño."}
    ]
  },
  "barriere-conference": {
    dest:"Barrière de la Conférence y Cours-la-Reine",
    dist:"3 leguas y tres cuartos (entrada occidental de París)",
    ruta:"Av. de París → Chaville → Puente de Sèvres → Auteuil → Passy → Barrière de la Conférence",
    control:"Aduaneros de la Ferme Générale (octroi) e inspectores de librería y policía.",
    tiempos:{
      posta:  {n:"Carroza con librea de corte", t:"1 h 35 min", coste:"15 libras", nota:"Los comisarios del octroi apenas asoman la cabeza al ver las armas pintadas en la portezuela."},
      berlina:{n:"Berlina o coche de alquiler", t:"2 h 20 min", coste:"6 libras", nota:"Te detienen diez minutos en la barrera para palpar los cofres buscando vino de contrabando o panfletos."},
      silla:  {n:"A caballo por Passy", t:"1 h 05 min", coste:"3 libras", nota:"Cruzas la barrera entre los correos del gabinete y los labradores que entran a París."},
      galiote:{n:"Barcaza del Sena (embarcadero de la Conférence)", t:"3 h 20 min", coste:"20 sueldos", nota:"Los guardias registran las cestas de mimbre al desembarcar junto a la reja del Cours-la-Reine."}
    },
    espera:[
      {tipo:"rumor", tit:"Fardos de libelos jansenistas confiscados en la barrera", de:"Garita de la Barrière de la Conférence",
       txt:"Los guardias han detenido esta mañana una berlina procedente de Sèvres con doscientos ejemplares impresos en Holanda contra la bula [[unigenitus|Unigenitus]]. El nombre del destinatario en Versalles ha sido tachado del acta por orden superior."},
      {tipo:"carta", tit:"Encuentro furtivo bajo los olmos del Cours-la-Reine", de:"Paseo de carrozas junto al Sena",
       txt:"Quien no quiere ser visto ni en el [[patio-real|Patio Real]] ni en el Palais-Royal da cita a su carroza al atardecer en el Cours-la-Reine, con las cortinillas echadas mientras las filas de coches desfilan junto al río."}
    ]
  },
  "paris-hotels": {
    dest:"Faubourg Saint-Germain y Hôtels de la Nobleza",
    dist:"4 leguas y cuarto (cruzando por el Pont Royal)",
    ruta:"Av. de París → Puente de Sèvres → Barrière de la Conférence → Pont Royal → Rue de l'Université / Rue de Varenne",
    control:"Suizos porteros con alabarda y bandolera en la portada de cada Hôtel particular.",
    tiempos:{
      posta:  {n:"Carroza de seis caballos", t:"1 h 50 min", coste:"18 libras", nota:"Los portones cocheros de la rue Saint-Dominique y la rue de Varenne se abren de par en par al golpe del postillón."},
      berlina:{n:"Berlina discreta de cuatro caballos", t:"2 h 45 min", coste:"8 libras", nota:"Cruzas el Pont Royal hacia los jardines del Palais-Bourbon aún llenos de canteros y andamios."},
      silla:  {n:"Caballo de silla", t:"1 h 20 min", coste:"4 libras", nota:"Ideal para entrar por la puerta falsa del jardín de un hôtel sin que los suizos de la calle anoten tu nombre."},
      galiote:{n:"Galiote hasta la Grenouillère (Quai d'Orsay)", t:"3 h 40 min", coste:"25 sueldos", nota:"Desembarcas frente a los muelles de piedra del Faubourg Saint-Germain."}
    },
    espera:[
      {tipo:"oblig", tit:"Intendentes, notarios y acreedores en los Hôtels de familia", de:"Faubourg Saint-Germain",
       txt:"Mientras los señores disputan un taburete o una bujía en Versalles, en las antecámaras de sus hôtels de París esperan los tapiceros, los carroceros y los notarios con las hipotecas en [[libra|libras tornesas]]."},
      {tipo:"rumor", tit:"Las obras fastuosas del Palais-Bourbon", de:"Orilla izquierda · Pré-aux-Clercs",
       txt:"Todo París comenta el lujo insolente con que [[monsieur-le-duc|Monsieur le Duc]] y su madre Madame la Duchesse levantan el Palais-Bourbon y embellecen Chantilly con los millones sacados a tiempo del [[sistema-law|papel de Law]]."}
    ]
  },
  "paris-parlement": {
    dest:"Île de la Cité, Parlamento de París y Rue Quincampoix",
    dist:"4 leguas y media (corazón judicial de la capital)",
    ruta:"Av. de París → Sèvres → Pont-Neuf → Palais de la Cité y Grand'Chambre",
    control:"Ujieres de la Grand'Chambre, arqueros del Châtelet y guardias de la prebostería.",
    tiempos:{
      posta:  {n:"Carroza de aparato", t:"2 h 00 min", coste:"18 libras", nota:"El atasco en el Pont-Neuf y la rue de la Harpe obliga a los lacayos a abrir paso a voces hasta la escalinata de la Sainte-Chapelle."},
      berlina:{n:"Berlina de toga o de pleiteante", t:"2 h 55 min", coste:"8 libras", nota:"Te apeas al pie de la Galerie des Merciers, atestada de procuradores, litigantes y libreros."},
      silla:  {n:"Caballo de silla", t:"1 h 25 min", coste:"4 libras", nota:"Cruzas rápido entre los puestos del Pont-Neuf hasta el patio del Mai."},
      galiote:{n:"Barcaza por el Sena hasta el Pont-Neuf", t:"4 h 00 min", coste:"30 sueldos", nota:"Navegas hasta la estatua de Enrique IV en la punta de la Île de la Cité."}
    },
    espera:[
      {tipo:"carta", tit:"Memorial de un pleito de tierras en la Grand'Chambre", de:"Galería de los Mercaderes · Palais de la Cité",
       txt:"Un relator del [[parlamento|Parlamento de París]] te hace saber que el pleito por los derechos señoriales y las deudas de tu familia entrará en turno esta semana; un obsequio de especias o una palabra de un duque y par inclinarían la balanza."},
      {tipo:"rumor", tit:"Sermones apelantes en las parroquias de la Cité", de:"Claustro de Notre-Dame",
       txt:"Bajo la protección tácita del anciano cardenal de Noailles, los curas de Saint-Séverin y Saint-Étienne-du-Mont siguen predicando el [[jansenismo|rigorismo]] y negándose a suscribir sin reservas la bula [[unigenitus|Unigenitus]]."}
    ]
  },
  stcloud: {
    dest:"Palacio de Saint-Cloud (Residencia de los Orleans)",
    dist:"2 leguas y media (por Montreuil y Ville-d'Avray)",
    ruta:"Plaza de Armas → Av. de Saint-Cloud → Bosque de Fausses-Reposes → Ville-d'Avray → Saint-Cloud",
    control:"Guardias de la casa del duque de Orleans y suizos de Madame Palatina.",
    tiempos:{
      posta:  {n:"Carroza de seis caballos por Ville-d'Avray", t:"1 h 05 min", coste:"10 libras", nota:"Subes y bajas la cuesta arbolada de Ville-d'Avray; desde la terraza de Saint-Cloud se divisa todo París al fondo."},
      berlina:{n:"Berlina de cuatro caballos", t:"1 h 35 min", coste:"5 libras", nota:"Un trayecto ameno a la sombra de los bosques antes de desembocar sobre la gran cascada."},
      silla:  {n:"Caballo de silla", t:"45 min", coste:"2 libras", nota:"El camino más corto para traer un recado entre el gabinete del Regente en Versalles y la cámara de su madre."},
      galiote:{n:"Carroza a Sèvres y chalupa por el Sena", t:"1 h 50 min", coste:"20 sueldos", nota:"Bajas a Sèvres y remontas el corto tramo del río hasta el puente de Saint-Cloud."}
    },
    espera:[
      {tipo:"carta", tit:"Las cartas alemanas de Madame Palatina", de:"Gabinete de Madame en Saint-Cloud",
       txt:"[[madame|Madame]], de setenta años y piernas hinchadas, escribe sin descanso a sus parientes de Alemania con su franqueza brutal: dice que en Versalles todo es mentira, que Dubois es un bribón consumado y que teme no ver el invierno."},
      {tipo:"rumor", tit:"Paseos por la Gran Cascada y la Galería de Apolo", de:"Jardines de Saint-Cloud",
       txt:"Quienes buscan el favor de la casa de Orleans sin exponerse a la multitud de la [[galeria|Galería de los Espejos]] acuden a Saint-Cloud a cortejar a las damas de la duquesa de Orleans."}
    ]
  },
  sevres: {
    dest:"Puente y Posta Real de Sèvres",
    dist:"2 leguas (a mitad de camino entre Versalles y París)",
    ruta:"Plaza de Armas → Av. de París → Viroflay → Chaville → Cuesta y Puente de Sèvres",
    control:"Maestro de postas del rey, guardias del puente y bateleros de la galiote.",
    tiempos:{
      posta:  {n:"Carroza de seis caballos", t:"50 min", coste:"8 libras", nota:"Aquí cambian tiro los ministros y príncipes que van a París; los caballos frescos esperan ya enjaezados."},
      berlina:{n:"Berlina ordinaria", t:"1 h 15 min", coste:"4 libras", nota:"La bajada del valle de Chaville obliga a echar el calzo a las ruedas antes de entrar en Sèvres."},
      silla:  {n:"Caballo de silla", t:"35 min", coste:"1 libra", nota:"Un galope corto por la Avenida de París; en media hora estás junto al Sena."},
      galiote:{n:"Embarcadero de la Galiote de Sèvres", t:"55 min (hasta el río)", coste:"15 sueldos", nota:"Punto donde los viajeros modestos dejan el coche de mimbre para embarcarse rumbo a las Tullerías."}
    },
    espera:[
      {tipo:"rumor", tit:"El libro de postas y los correos interceptados", de:"Casa de la Posta de Sèvres",
       txt:"El maestro de postas de Sèvres sabe antes que nadie quién ha pedido caballos a medianoche para huir a París, qué embajador ha despachado un correo extraordinario y quién viaja en berlina sin escudos."},
      {tipo:"carta", tit:"Vinos sin impuesto en las tabernas del puente", de:"Orilla del Sena en Sèvres",
       txt:"En los reservados de las posadas de Sèvres se reúnen los agentes de bolsa arruinados por el [[sistema-law|Sistema de Law]] y los criados que venden copias de las [[nouvelles|nouvelles à la main]] recién traídas de París."}
    ]
  },
  meudon: {
    dest:"Palacio Real de Meudon (Retiro de Saint-Simon)",
    dist:"2 leguas (sobre las alturas del Sena)",
    ruta:"Plaza de Armas → Av. de Sceaux → Bosque de Meudon → Gran Terraza de Meudon",
    control:"Conserje real de Meudon y criados de librea del duque de Saint-Simon.",
    tiempos:{
      posta:  {n:"Carroza de seis caballos por el bosque", t:"55 min", coste:"9 libras", nota:"Atraviesas la avenida monumental del bosque de Meudon hasta la explanada que domina todo el valle del Sena."},
      berlina:{n:"Berlina de cuatro caballos", t:"1 h 20 min", coste:"4 libras", nota:"La subida final a la terraza exige buenos caballos de tiro."},
      silla:  {n:"A caballo por las veredas de caza", t:"40 min", coste:"2 libras", nota:"Cruzas por los senderos de caza que unen Chaville con el parque alto de Meudon."}
    },
    espera:[
      {tipo:"carta", tit:"El duque de Saint-Simon encerrado entre legajos", de:"Château-Neuf de Meudon",
       txt:"El duque de Saint-Simon, furioso por el ascenso de Dubois al capelo cardenalicio y por la reconciliación de los [[legitimados|legitimados]], pasa los días en Meudon tomando notas venenosas sobre las genealogías, los taburetes usurpados y la decadencia de los duques y pares."},
      {tipo:"rumor", tit:"Fantasmas del Gran Delfín en las galerías de Meudon", de:"Terraza de Meudon",
       txt:"Los viejos servidores de Meudon aún recuerdan cuando el padre de Felipe V y abuelo de Luis XV tenía aquí su corte paralela antes de morir de viruelas en 1711."}
    ]
  },
  sceaux: {
    dest:"Palacio y Corte de Sceaux (Los Duques de Maine)",
    dist:"3 leguas (al sureste, más allá de Meudon)",
    ruta:"Plaza de Armas → Av. de Sceaux → Vélizy → Plessis-Piquet → Sceaux",
    control:"Suizos y gentilhombres de la casa del duque y la duquesa de Maine.",
    tiempos:{
      posta:  {n:"Carroza de seis caballos", t:"1 h 25 min", coste:"14 libras", nota:"Es prudente que los espías de Dubois no anoten tu librea entrando en el patio de honor de Sceaux."},
      berlina:{n:"Berlina sin armas pintadas", t:"2 h 00 min", coste:"6 libras", nota:"El medio preferido por quienes van a rendir pleitesía en secreto a la duquesa de Maine."},
      silla:  {n:"Caballo de silla por los bosques de Vélizy", t:"55 min", coste:"3 libras", nota:"Rápido y discreto a través de las alamedas del sur."}
    },
    espera:[
      {tipo:"rumor", tit:"La Orden de la Abeja y los epigramas contra la Regencia", de:"Pabellón de la Aurora · Sceaux",
       txt:"Perdonada a regañadientes tras la conspiración española de Cellamare, la duquesa de Maine ha vuelto a reunir en Sceaux a poetas, abates y descontentos. Se recitan versos satíricos contra el [[regencia|Regente]] mientras el duque de Maine finge ocuparse solo de sus jardines y de su principado de Dombes."},
      {tipo:"carta", tit:"Memorial sobre el rango de los príncipes legitimados", de:"Gabinete del duque de Maine",
       txt:"Los juristas de Sceaux preparan un memorial para que el rey, en cuanto cumpla la mayoría de edad en febrero de 1723, devuelva al duque de Maine y al conde de Eu los honores que el Parlamento les recortó."}
    ]
  },
  stcyr: {
    dest:"Casa Real de San Luis en Saint-Cyr",
    dist:"1 legua escasa (al oeste del Gran Canal)",
    ruta:"Plaza de Armas → Borde del Parque → Puerta de Saint-Cyr",
    control:"Torno y locutorio de las Damas de San Luis; solo se entra con permiso del obispo de Chartres o de la superiora.",
    tiempos:{
      posta:  {n:"Carroza de corte", t:"25 min", coste:"4 libras", nota:"Un paseo breve bordeando la muralla del parque real tras la Ménagerie."},
      berlina:{n:"Berlina o silla de manos", t:"35 min", coste:"2 libras", nota:"Camino llano por la llanura de Versalles hacia el oeste."},
      silla:  {n:"Caballo de silla", t:"15 min", coste:"1 libra", nota:"Apenas un cuarto de hora de trote desde las caballerizas."}
    },
    espera:[
      {tipo:"carta", tit:"Pruebas de cuatro cuartos de nobleza y dotes reales", de:"Locutorio de Saint-Cyr",
       txt:"Las familias de provincias de la nobleza de espada empobrecida suplican una plaza en Saint-Cyr para sus hijas: el genealogista del rey exige probar ciento cuarenta años de nobleza sin tacha, pero quien sale de aquí lleva mil escudos de dote de la corona."},
      {tipo:"rumor", tit:"La sombra de Madame de Maintenon en el coro", de:"Iglesia de Saint-Cyr",
       txt:"Ante la losa negra donde yace Mme de Maintenon desde 1719 aún acuden en silencio el mariscal de Villeroy, el duque de Noailles y los viejos devotos de la corte de Luis XIV."}
    ]
  }
};

function comitivaSegunRango(){
  if(typeof player==="undefined"||!player){
    return {
      tit:"Cortesano en Versalles (sin personaje activo)",
      tren:"Berlina de cuatro caballos con dos lacayos de librea en la trasera.",
      escolta:"Un gentilhombre o criado de confianza a caballo; hachas de viento si regresas de noche por el bosque de Chaville.",
      protocolo:"Salir hacia París recién instalado el rey en Versalles hace murmurar en el Œil-de-Bœuf: conviene dejarse ver antes en el lever o en la misa de la Capilla Real."
    };
  }
  const pos=typeof POS_ID!=="undefined"&&player.posicion?POS_ID[player.posicion]:null;
  const cuna=player.cuna||"espada", din=player.destino?.dinero||"holgada", sexo=player.sexo||"M";
  const rico=din==="rica"||din==="enriquecida_law", pobre=din==="ruina"||din==="arruinada_law"||din==="menos";
  if(player.posicion==="duque"||player.posicion==="duquesa"){
    return {
      tit:`${pos?pos.n:"Duque y par"} (${DINERO_N?.[din]||din})`,
      tren:pobre?"Carroza ducal de seis caballos con los dorados deslucidos por las deudas, pero con paño carmesí e insignias de paría para no ceder el paso en el puente de Sèvres."
               :"Carroza de gala de seis caballos con derecho de entrada al Patio Real (honores del Louvre), forrada de terciopelo con flecos de oro.",
      escolta:"Dos pajes en el estribo delantero, cuatro lacayos de librea en la trasera, correo adelantado para prevenir la posta en Sèvres y seis hachas de viento si cae la noche.",
      protocolo:"Tu ausencia se nota al instante en el lever y en la cena del rey: no conviene dormir en París sin haber prevenido al Regente o al duque de Borbón."
    };
  }
  if(cuna==="espada"){
    return {
      tit:`Nobleza de espada · ${pos?pos.n:(sexo==="F"?"Dama de calidad":"Gentilhombre")}`,
      tren:rico?"Berlina charolada de seis caballos con tiro propio y armas pintadas en las portezuelas."
          :pobre?"Asiento pedido de favor en la carroza de un pariente rico o berlina alquilada de dos caballos con un solo criado de librea remendada."
          :"Berlina de cuatro caballos de la posta real con escudo familiar en la portezuela.",
      escolta:sexo==="F"?"Doncella de compañía en el interior, escudero a caballo junto a la portezuela y dos lacayos con espada."
                        :"Criado de cámara con las pistolas de arzón y dos lacayos de librea en la trasera.",
      protocolo:"Si sirves en la Casa del Rey o de una princesa, necesitas licencia de tu jefe de cuartel antes de cruzar la Plaza de Armas."
    };
  }
  if(cuna==="toga"){
    return {
      tit:`Nobleza de toga · ${pos?pos.n:"Magistrado"}`,
      tren:"Berlina oscura de cuatro caballos, de muelles suaves y sin ostentación militar, cargada con sacos de terciopelo llenos de autos y memoriales.",
      escolta:"Un escribiente o secretario en el asiento delantero y dos criados de librea sobria.",
      protocolo:"En la Barrière de la Conférence los comisarios respetan el carruaje de un magistrado del Parlamento o del Consejo, pero los espías de Dubois toman nota si vienes de Sceaux o de ver al cardenal de Noailles."
    };
  }
  if(pos&&pos.g==="Clero"){
    return {
      tit:`Estado eclesiástico · ${pos.n}`,
      tren:player.posicion==="obispo"||player.posicion==="abadesa"
        ?"Carroza morada de cuatro o seis mulas con cruz pectoral en el escudo y cortinillas de tafetán."
        :"Berlina compartida o coche de posta con breviario y pliegos sellados bajo el manteo.",
      escolta:player.posicion==="obispo"||player.posicion==="abadesa"?"Capellán secretario, paje de caudatario y dos lacayos."
        :"Un criado discreto o viaje en compañía de otros clérigos para ahorrar postas.",
      protocolo:"Cuidado con los fardos que traes de París: en la barrera registran las cajas buscando impresos jansenistas o apelaciones contra la bula Unigenitus."
    };
  }
  return {
    tit:`${pos?pos.n:"Oficial / Servicio de la Corte"} (${CUNA_N?.[cuna]||cuna})`,
    tren:rico?"Berlina propia de cuatro caballos pagada al contado con buenas monedas o ganancias de Law."
             :"Carruaje público de mimbre de cuatro plazas («pot-de-chambre» de Versalles), furgón de los oficios del Rey o caballo de posta.",
    escolta:"Sin escolta propia: viajas junto a otros oficiales de boca, correos de gabinete y mercaderes armados contra los salteadores del bosque de Boulogne.",
    protocolo:"Un salvoconducto con el sello del Gran Común o de una secretaría de Estado te permite pasar el puente de Sèvres sin pagar peaje ni sufrir demoras."
  };
}

function openViajeModal(id){
  const V=VIAJES_DOM[id]; if(!V)return;
  const L=$("#lectern"); if(!L)return; L.innerHTML="";
  const modos=Object.entries(V.tiempos);
  let modoAct=modos[0][0];
  const com=comitivaSegunRango();
  const tBox=el("div",{class:"viaje-tbox"});
  const pintarModo=k=>{
    modoAct=k; const m=V.tiempos[k]; tBox.innerHTML="";
    tBox.append(
      el("div",{class:"viaje-stat"},el("span",{class:"label"},"Duración del trayecto"),el("b",{class:"viaje-big"},m.t)),
      el("div",{class:"viaje-stat"},el("span",{class:"label"},"Coste de posta / carruaje"),el("b",{},m.coste)),
      el("p",{class:"note",style:"grid-column:1/-1"},m.nota)
    );
  };
  const mBar=el("div",{class:"sectores-bar",role:"group","aria-label":"Medio de transporte"});
  modos.forEach(([k,m])=>{
    const b=el("button",{class:"btn sm","aria-pressed":String(k===modoAct),onclick:()=>{
      [...mBar.children].forEach(x=>x.setAttribute("aria-pressed","false"));
      b.setAttribute("aria-pressed","true"); pintarModo(k);
    }},m.n);
    mBar.append(b);
  });
  pintarModo(modoAct);

  const espList=el("div",{class:"viaje-espera"});
  V.espera.forEach(e=>{
    const tagCls=e.tipo==="rumor"?"Chisme en destino":e.tipo==="carta"?"Pliego / Carta":e.tipo==="oblig"?"Deuda / Asunto":"Aviso";
    espList.append(el("div",{class:"viaje-card"},
      el("div",{class:"pane-h"},el("b",{},e.tit),el("span",{class:"tag ej"},tagCls)),
      el("span",{class:"note"},e.de),
      el("p",{},typeof rich==="function"?rich(e.txt):e.txt)
    ));
  });

  const statusMsg=el("span",{class:"note","aria-live":"polite"});
  const btnViajar=el("button",{class:"btn primary",onclick:()=>{
    const docId="viaje-"+id;
    const prim=V.espera[0];
    if(typeof DOCS!=="undefined"&&prim&&!DOCS.some(x=>x.id===docId)){
      DOCS.unshift({id:docId,tipo:prim.tipo||"carta",tit:prim.tit,de:prim.de+" ("+V.dest+")",txt:prim.txt,firma:V.dest});
      if(typeof drawDesk==="function")drawDesk();
      statusMsg.textContent="✓ Has emprendido el viaje ("+V.tiempos[modoAct].t+"): el pliego «"+prim.tit+"» ha quedado sobre tu escritorio.";
    } else {
      statusMsg.textContent="✓ Carroza despachada a "+V.dest+" ("+V.tiempos[modoAct].t+"). Los informes ya constan en tu escritorio.";
    }
    btnViajar.disabled=true;
  }},"Mandar enganchar y recoger pliegos del viaje");

  const acts=el("div",{class:"acts"},btnViajar,el("button",{class:"btn",onclick:closeLectern},"Cerrar"),statusMsg);
  const sheet=el("article",{class:"letter",role:"dialog","aria-label":"Viaje a "+V.dest},
    el("span",{class:"seal","aria-hidden":"true"},"⚜"),
    el("span",{class:"k"},"Itinerario y Posta Real · Junio de 1722 · "+V.dist),
    el("h2",{},"Viaje a "+V.dest),
    el("p",{class:"note"},"Ruta: "+V.ruta+" · Control: "+V.control),
    el("div",{class:"rule"}),
    el("span",{class:"label"},"I. ¿Cuánto tardas en llegar desde la Plaza de Armas?"),
    mBar, tBox,
    el("span",{class:"label"},"II. Comitiva y escolta requerida según tu rango"),
    el("div",{class:"viaje-comitiva"},
      el("p",{},el("b",{},"Tu condición: "),com.tit),
      el("p",{},el("b",{},"Carruaje y tiro: "),com.tren),
      el("p",{},el("b",{},"Escolta y librea: "),com.escolta),
      el("p",{class:"note"},com.protocolo)
    ),
    el("span",{class:"label"},"III. Chismes, cartas y pleitos que te esperan al llegar"),
    espList,
    acts
  );
  L.append(sheet); L.hidden=false; btnViajar.focus();
}

function goRoom(id){
  if(DOMNOM[id]&&!ESTNOM[id]){
    drawMap("dominio");
    const z=document.querySelector('#map-box .zone[data-id="'+id+'"]');
    if(z){z.dispatchEvent(new MouseEvent("click",{bubbles:true}));z.focus({preventScroll:true})}
    return;
  }
  const e=ESTNOM[id]; if(!e)return;
  if(!e.p.includes(PISO_PAL))PISO_PAL=e.p[0];
  drawMap("palacio");
  const z=document.querySelector('#map-box .zone[data-id="'+id+'"]');
  if(z){z.dispatchEvent(new MouseEvent("click",{bubbles:true}));z.focus({preventScroll:true})}
}
function mapInfo(titulo,texto,extra){
  const b=$("#map-info"); b.innerHTML="";
  b.append(el("h3",{},titulo),el("p",{},texto)); if(extra)b.append(extra);
}
let OWNER=false,ESTANCIAS={};
function achicarImg(f,max){return new Promise((ok,ko)=>{const u=URL.createObjectURL(f),i=new Image();
  i.onload=()=>{const k=Math.min(1,max/Math.max(i.naturalWidth,i.naturalHeight)),c=document.createElement("canvas");c.width=Math.round(i.naturalWidth*k);c.height=Math.round(i.naturalHeight*k);
    let w=c.width,h=c.height,q=.8,out;URL.revokeObjectURL(u);
    for(let t=0;t<12;t++){c.width=w;c.height=h;c.getContext("2d").drawImage(i,0,0,w,h);out=c.toDataURL("image/jpeg",q);
      if(out.length<=150000)break; if(q>.55)q-=.1; else{w=Math.round(w*.85);h=Math.round(h*.85)}}
    ok(out)};
  i.onerror=()=>{URL.revokeObjectURL(u);ko(new Error("No se pudo leer la imagen"))};i.src=u})}

function sectorOf(id){
  if(DOMNOM[id]&&!ESTNOM[id]){
    if(["palais-royal","tuileries","barriere-conference","paris-hotels","paris-parlement"].includes(id))return "París (a 4 leguas)";
    if(["sevres","stcloud","meudon","sceaux","sena","boulogne","chaville"].includes(id))return "Línea del Sena y Enclaves";
    if(["ville-n","nd-parroquia","nd-marche","chenil","gecurie"].includes(id))return "Ciudad de Versalles · Barrio Notre-Dame (Norte)";
    if(["ville-s","vieux-versailles","stlouis-iglesia","parc-aux-cerfs","commun","cocheras","pecurie"].includes(id))return "Ciudad de Versalles · Barrio Saint-Louis (Sur)";
    return "Dominio y Parque de Versalles";
  }
  if(/^(b-ms-|n-ms-|a-ms-|a-midi|midi-)/.test(id))return "Ala del Mediodía";
  if(/^(b-mn-|n-mn-|a-mn-|n-nord|a-nord)/.test(id))return "Ala Norte";
  if(/^(b-reg-|b-sud|b-gouverneur|b-fleury|b-escreine|a-sud|a-escreine|a-salle-gardes)/.test(id)||["paix","chreine","nobles","antreine","gardesreine","grandegardes","cabreine","escreine"].includes(id))return "Cuerpo central · lado sur (Reina / Regente)";
  if(["guerre","apollon","mercure","mars","diane","venus","abondance","hercule","a-grand"].includes(id))return "Cuerpo central · lado norte (Grandes Aposentos)";
  if(["oeil","premiere","gardesroi","chambre","conseil","cabroi","medailles","a-centro","a-roi","a-gardes-att"].includes(id))return "Cuerpo central · aposento del Rey";
  if(id==="maintenon"||/aile-s/.test(id))return "Ala sur del Patio Real";
  if(id==="antin"||/aile-n/.test(id))return "Ala norte del Patio Real";
  if(/^(b-tou-|b-norte|b-oldchapel|b-chapelle)/.test(id))return "Cuerpo central · lado norte";
  return "Cuerpo central";
}
function setHead(id,n){
  const h=document.getElementById("map-head"); if(!h)return; h.innerHTML="";
  const e=ESTNOM[id]||DOMNOM[id]||{}, oc=ocupantes(id).filter(o=>o[0]!=="Vacante");
  const pisoTxt=ESTNOM[id]?"Piso "+PISO_PAL:null;
  const sub=[e.s&&e.s.length<=4?e.s:null,sectorOf(id),pisoTxt,oc.length?oc.map(o=>o[0]).join(", "):null].filter(Boolean).join(" · ");
  h.append(el("h3",{},n),el("span",{class:"note"},sub));
}

/* Arcos de comunicación (puertas, escaleras y caminos) sobre el SVG al seleccionar una estancia o enclave */
function drawConnectionsOverlay(svg,id){
  svg.querySelectorAll(".conn-overlay").forEach(n=>n.remove());
  svg.querySelectorAll(".zone.vecina").forEach(n=>n.classList.remove("vecina"));
  const I=INFO_EST[id], orig=ESTNOM[id]||DOMNOM[id], esDom=Boolean(DOMNOM[id]&&!ESTNOM[id]);
  if(!I||!I.c||!orig)return;
  const g=sv("g",{class:"conn-overlay"});
  I.c.forEach(cid=>{
    const dest=esDom?DOMNOM[cid]:ESTNOM[cid]; if(!dest)return;
    const z=svg.querySelector('.zone[data-id="'+cid+'"]');
    if(z)z.classList.add("vecina");
    if(esDom||dest.p.includes(PISO_PAL)){
      g.append(sv("line",{x1:orig.cx,y1:orig.cy,x2:dest.cx,y2:dest.cy,class:"conn-line"}));
      g.append(sv("circle",{cx:dest.cx,cy:dest.cy,r:4.5,class:"conn-node"}));
    }
  });
  g.append(sv("circle",{cx:orig.cx,cy:orig.cy,r:6,class:"conn-node"}));
  svg.append(g);
}

function showRoom(id,n,d,fromClick=false){
  setHead(id,n);
  const svg=document.querySelector("#map-box svg");
  if(svg)drawConnectionsOverlay(svg,id);
  const b=$("#map-info"); b.innerHTML=""; b.append(roomInfo(id,n,d));
  if(fromClick&&VIAJES_DOM[id])openViajeModal(id);
}

function roomInfo(id,n,d){
  const grid=el("div",{class:"room-grid"}), izq=el("div",{class:"room-img"}), box=el("div",{class:"room-txt"});
  grid.append(izq,box);
  const src=ESTANCIAS[id];
  if(src){const im=el("img",{alt:n});im.src=src;izq.append(im)} else izq.append(el("div",{class:"room-ph"},"Sin imagen de este lugar"));
  box.append(el("h3",{},n),el("p",{},d));
  if(VIAJES_DOM[id]){
    const V=VIAJES_DOM[id];
    const vCard=el("div",{class:"viaje-inline"},
      el("div",{class:"pane-h"},el("b",{},"Trayecto desde Versalles: "+V.dist),el("span",{class:"tag ej"},V.tiempos.posta.t+" en carroza")),
      el("p",{class:"note"},V.ruta),
      el("button",{class:"btn primary sm",onclick:()=>openViajeModal(id)},"Abrir modal de viaje (tiempos, comitiva y chismes en destino) →")
    );
    box.append(vCard);
  }
  const I=INFO_EST[id];
  if(I){
    if(I.u)box.append(el("span",{class:"label"},"En junio de 1722"),el("p",{},I.u));
    if(I.o)box.append(el("span",{class:"label"},"Historia y arquitectura"),el("p",{},I.o));
  }
  const OC=ocupantes(id);
  if(OC.length){
    const CF={a:"confirmado (alta)",m:"probable (media)",b:"dudoso (baja)"};
    const ul=el("div",{class:"ocup"});
    OC.forEach(([nom,pid,cf,nota,cat])=>{
      const p=pid&&typeof PERSONAJES!=="undefined"?PERSONAJES.find(x=>x.id===pid):null;
      const nm=p?el("button",{class:"btn sm",onclick:()=>openFicha(p)},nom):el("b",{},nom);
      ul.append(el("div",{class:"oc"},el("i",{class:"dot cat-"+cat,title:CATS[cat]||""}),nm,el("span",{class:"tag"+(cf==="a"?" ej":"")},CF[cf]||cf),nota?el("span",{class:"note"},nota):""));
    });
    box.append(el("span",{class:"label"},"Residentes y figuras clave en junio de 1722"),ul);
  }
  if(I&&I.c&&I.c.length){
    const row=el("div",{class:"conecta"});
    const esDom=Boolean(DOMNOM[id]&&!ESTNOM[id]);
    I.c.forEach(c=>{
      const e=esDom?DOMNOM[c]:ESTNOM[c]; if(!e)return;
      const otro=!esDom&&!e.p.includes(PISO_PAL);
      row.append(el("button",{class:"btn sm",onclick:()=>goRoom(c)},(e.s&&e.s.length<=4?e.s+" · ":"")+e.n+(otro?(e.p[0]>PISO_PAL?" ↑ (Piso "+e.p[0]+")":" ↓ (Piso "+e.p[0]+")"):"")));
    });
    box.append(el("span",{class:"label"},esDom?"Caminos y lugares contiguos":"Puertas y escaleras contiguas"),row);
  }
  if(OWNER&&db&&ESTNOM[id])box.append(el("span",{class:"label"},"Asignar ocupantes (solo tú)"),ocupEditor(id));
  box.append(el("span",{class:"label"},"Presentes ahora"),el("div",{class:"note"},"Nadie a la vista. Aparecerán aquí conforme avance la partida."));
  if(OWNER&&db){
    const msg=el("span",{class:"note","aria-live":"polite"});
    const inp=el("input",{type:"file",accept:"image/*",hidden:""});
    inp.onchange=async()=>{const f=inp.files[0];inp.value="";if(!f)return;msg.textContent="Guardando imagen…";
      try{const img=await achicarImg(f,1100);await db.doc("estancias/"+id).set({img});msg.textContent="Imagen guardada."}catch(e){msg.textContent="No se pudo guardar: "+(e&&e.message||e)}};
    const row=el("div",{style:"display:flex;gap:8px;flex-wrap:wrap;align-items:center"},inp,
      el("button",{class:"btn sm",onclick:()=>inp.click()},src?"Cambiar imagen":"Agregar imagen"));
    if(src)row.append(el("button",{class:"btn sm danger",onclick:async()=>{try{await db.doc("estancias/"+id).delete();msg.textContent="Imagen quitada."}catch(e){msg.textContent="No se pudo quitar."}}},"Quitar"));
    row.append(msg); izq.append(row);
  }
  return grid;
}

function pickable(node,svg,n,d,id){
  const pick=e=>{svg.querySelectorAll(".zone").forEach(z=>z.classList.remove("sel"));node.classList.add("sel");mapSel={id,n,d};showRoom(id,n,d,Boolean(e&&e.isTrusted))};
  node.setAttribute("tabindex",0); node.setAttribute("role","button"); node.setAttribute("aria-label",n);
  node.addEventListener("click",pick); node.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();pick(e)}});
}

/* Ornamentación de época (Bâtiments du Roi): parterres, damero de mármol y reja. Se dibuja ENCIMA de las estancias. */
function drawArchContext(svg,piso){
  const g=sv("g",{class:"arch-detail"});
  // Estanques del Parterre d'Eau frente a la Galería de los Espejos
  g.append(sv("rect",{x:875,y:154,width:95,height:22,rx:4,class:"parterre-agua"}));
  g.append(sv("rect",{x:990,y:154,width:95,height:22,rx:4,class:"parterre-agua"}));
  // Damero del Patio de Mármol (955,275,100,105)
  for(let x=955;x<1055;x+=20)g.append(sv("line",{x1:x,y1:275,x2:x,y2:380,stroke:"var(--line)","stroke-width":.7}));
  for(let y=275;y<380;y+=21)g.append(sv("line",{x1:955,y1:y,x2:1055,y2:y,stroke:"var(--line)","stroke-width":.7}));
  // Reja Real (Grille Royale) cerrando el Patio Real (y=860)
  g.append(sv("line",{x1:840,y1:860,x2:1110,y2:860,stroke:"var(--gilt)","stroke-width":3,"stroke-dasharray":"6 3"}));
  svg.append(g);
}

/* Ornamentación cartográfica del Dominio: hileras de olmos en las tres avenidas, caminos postales, puentes sobre el Sena y trama de los barrios */
function drawDominioContext(svg){
  const g=sv("g",{class:"arch-detail"});
  // Cuatro pabellones del Marché Notre-Dame
  [[522,525,26,16],[556,525,26,16],[522,545,26,16],[556,545,26,16]].forEach(([x,y,w,h])=>
    g.append(sv("rect",{x,y,width:w,height:h,fill:"none",stroke:"var(--muted)","stroke-width":.8})));
  // Parcelas ajardinadas en el Parc aux Cerfs
  for(let px=108;px<168;px+=20)g.append(sv("line",{x1:px,y1:614,x2:px,y2:658,stroke:"var(--gilt)","stroke-width":.6,"stroke-dasharray":"2 2"}));
  // Hileras de olmos de las tres avenidas (Place d'Armes)
  for(let t=0;t<=1;t+=0.14){
    const yP=646+t*180;
    g.append(sv("circle",{cx:286-t*2,cy:yP,r:2.2,fill:"var(--gilt)",opacity:.55}));
    g.append(sv("circle",{cx:314+t*2,cy:yP,r:2.2,fill:"var(--gilt)",opacity:.55}));
    g.append(sv("circle",{cx:328+t*185,cy:646+t*122,r:2,fill:"var(--gilt)",opacity:.5}));
    g.append(sv("circle",{cx:272-t*175,cy:646+t*122,r:2,fill:"var(--gilt)",opacity:.5}));
  }
  // Rutas de posta punteadas desde Sèvres y Saint-Cloud hasta la Barrière de la Conférence y el Palais-Royal
  ["M300,886 L300,948", "M515,843 L515,896 L350,948", "M200,844 L265,860", "M72,844 L140,820", "M304,992 L304,998", "M372,970 L382,970"].forEach(d=>
    g.append(sv("path",{d,class:"road-line"})));
  // Puentes sobre el Sena (Puente de Sèvres, Puente de Saint-Cloud y Pont Royal en París)
  [[286,884,28,30],[505,856,22,28],[285,910,24,18]].forEach(([x,y,w,h])=>
    g.append(sv("rect",{x,y,width:w,height:h,fill:"var(--sheet)",stroke:"var(--ink)","stroke-width":1.4})));
  // Divisor histórico de escalas (Ciudad de Versalles / Línea del Sena / París)
  g.append(sv("line",{x1:14,y1:938,x2:586,y2:938,stroke:"var(--gilt)","stroke-width":1,"stroke-dasharray":"6 4",opacity:.65}));
  svg.append(g);
}

function drawArchRoomDetails(svg,rooms){
  const g=sv("g",{class:"arch-detail"});
  rooms.forEach(r=>{
    const id=r[0];
    // Peldaños en las escaleras
    if(["escreine","b-escreine","a-escreine","ambassadeurs","b-ambassadeurs"].includes(id)&&typeof r[3]==="number"){
      const [, , ,x,y,w,h]=r;
      for(let py=y+8;py<y+h-6;py+=7)g.append(sv("line",{x1:x+4,y1:py,x2:x+w-4,y2:py,stroke:"var(--muted)","stroke-width":1}));
    }
    // Bóvedas en cruz en la Galería y la Galería Baja
    if(["galerie","b-galbasse"].includes(id)){
      const [, , ,x,y,w,h]=r;
      for(let px=x;px<x+w;px+=40){
        g.append(sv("line",{x1:px,y1:y,x2:px+40,y2:y+h,stroke:"var(--muted)","stroke-width":.6,"stroke-dasharray":"2 2"}));
        g.append(sv("line",{x1:px+40,y1:y,x2:px,y2:y+h,stroke:"var(--muted)","stroke-width":.6,"stroke-dasharray":"2 2"}));
      }
    }
  });
  svg.append(g);
}

/* Orden de capas: estancias → detalles → capaMedia (contexto, calco) → etiquetas */
function drawRooms(svg,rooms,capaMedia){
  const labels=[];
  rooms.forEach(r=>{
    if(typeof r[3]==="string"){
      const [id,n,short,pts,cls,d,[lx,ly]]=r;
      const poly=sv("polygon",{points:pts,class:"zone "+cls+catCls(id)+(VIAJES_DOM[id]?" viaje-zone":""),"data-id":id}); pickable(poly,svg,n,d,id); svg.append(poly);
      labels.push(sv("text",{x:lx,y:ly,"text-anchor":"middle",class:"mlabel s"},short));
      return;
    }
    const [id,n,short,x,y,w,h,cls,d]=r;
    const rect=sv("rect",{x,y,width:w,height:h,class:"zone "+cls+catCls(id)+(VIAJES_DOM[id]?" viaje-zone":""),"data-id":id}); pickable(rect,svg,n,d,id); svg.append(rect);
    const corto=short.length<=4, vertical=!corto&&h>w*1.8&&w<60, size=Math.min(vertical?h:w,200);
    if(size<36)return;
    const t=sv("text",{x:x+w/2,y:y+h/2+4,"text-anchor":"middle",class:"mlabel"+((size<90&&!corto)||cls==="open"?" s":"")+(corto?" code":"")},short);
    if(vertical)t.setAttribute("transform",`rotate(-90 ${x+w/2} ${y+h/2})`);
    labels.push(t);
  });
  drawArchRoomDetails(svg,rooms);
  if(capaMedia)capaMedia(svg);
  labels.forEach(t=>svg.append(t));
}

function note(svg,x,y,txt,anchor="middle"){svg.append(sv("text",{x,y,"text-anchor":anchor,class:"compass"},txt))}

function drawMap(kind){
  const box=$("#map-box"); box.innerHTML="";
  document.querySelector(".map-layout").classList.toggle("ancho",kind==="palacio");
  const svg=sv("svg",{role:"img"});
  if(kind==="palacio"){
    const bajo=PISO_PAL===1, atico=PISO_PAL===3;
    const tb=el("div",{class:"map-toolbar"});
    const tg=el("div",{class:"pisos",role:"group","aria-label":"Piso"});
    [[1,"Piso 1 · Planta baja"],[2,"Piso 2 · Planta noble"],[3,"Piso 3 · Ático"]].forEach(([p,t])=>tg.append(el("button",{class:"btn sm","aria-pressed":String(PISO_PAL===p),onclick:()=>{PISO_PAL=p;drawMap("palacio");if(mapSel&&ESTNOM[mapSel.id]?.p.includes(p))goRoom(mapSel.id)}},t)));
    const sc=el("div",{class:"sectores-bar",role:"group","aria-label":"Enfoque del plano"});
    Object.entries(CAMERAS_PAL).forEach(([k,v])=>sc.append(el("button",{class:"btn sm","aria-pressed":String(CAM_PAL===k),onclick:()=>{CAM_PAL=k;drawMap("palacio");if(mapSel)goRoom(mapSel.id)}},v.label)));
    sc.append(el("button",{class:"btn sm","aria-pressed":String(CALCO_PAL),title:"Superponer en filigrana la planta noble/baja",onclick:()=>{CALCO_PAL=!CALCO_PAL;drawMap("palacio");if(mapSel)goRoom(mapSel.id)}},"Calco"));
    tb.append(tg,sc); box.append(tb);

    const cam=CAMERAS_PAL[CAM_PAL]||CAMERAS_PAL.todo;
    svg.setAttribute("viewBox",cam.vb);
    svg.classList.add(cam.zoom?"zoomed":"ancho");
    svg.setAttribute("aria-label",bajo?"Plano de la planta baja del palacio":atico?"Plano del ático del palacio":"Plano de la planta noble del palacio");

    drawRooms(svg,bajo?PALACIO_BAJA:atico?PALACIO_ATICO:PALACIO,s=>{
      drawArchContext(s,PISO_PAL);
      if(CALCO_PAL){
        const g=sv("g",{});
        (PISO_PAL===2?PALACIO_BAJA:PALACIO).forEach(r=>{if(typeof r[3]==="number")g.append(sv("rect",{x:r[3],y:r[4],width:r[5],height:r[6],class:"ghost-room"}))});
        s.append(g);
      }
    });
    note(svg,1200,170,"↑ Jardines (Oeste) · Parterre de Agua","start");
    note(svg,400,542,"← Ala del Mediodía (de los Príncipes) · Parterre del Mediodía");
    note(svg,1580,542,"Ala Norte · Parterre del Norte →");
    note(svg,975,882,"↓ Plaza de Armas · Grille Royale");
    note(svg,45,172,"Sur ← · Piso "+PISO_PAL,"start");

    const lg=el("div",{class:"leyenda-map"});
    Object.entries(CATS).forEach(([k,v])=>lg.append(el("span",{},el("i",{class:"dot cat-"+k}),v)));
    lg.append(el("span",{},el("i",{class:"dot"}),"Sin identificar / servicio"));
    box.append(lg);

    if(atico)mapInfo("Palacio · piso 3, ático y desvanes","Bajo los tejados planos y la balaustrada: alojamientos de cortesanos (Mortemart, Saint-Aignan, Chaulnes), desvanes de criados de cámara y, desde junio de 1722, las primeras piezas privadas de Luis XV junto al Gabinete de Cuadros.");
    else if(bajo)mapInfo("Palacio · piso 1, planta baja","A ras de los jardines. En el cuerpo central vive el poder efectivo de junio de 1722: el Regente Felipe de Orleans al sur (junto a Villeroy y Fleury) y el conde de Toulouse al norte.");
    else mapInfo("Palacio · piso 2, planta noble","La Galería de los Espejos sobre los jardines, los aposentos de la reina (ocupados por la infanta española de 4 años y Mme de Ventadour) al sur, el aposento de Luis XV en torno al Patio de Mármol y los Grandes Aposentos al norte.");
  } else if(kind==="dominio"){
    const tb=el("div",{class:"map-toolbar"});
    const sc=el("div",{class:"sectores-bar",role:"group","aria-label":"Enfoque del dominio"});
    Object.entries(CAMERAS_DOM).forEach(([k,v])=>sc.append(el("button",{class:"btn sm","aria-pressed":String(CAM_DOM===k),onclick:()=>{CAM_DOM=k;drawMap("dominio")}},v.label)));
    tb.append(sc); box.append(tb);

    const cam=CAMERAS_DOM[CAM_DOM]||CAMERAS_DOM.todo;
    svg.setAttribute("aria-label","Plano del dominio de Versalles, línea del Sena y París");
    svg.setAttribute("viewBox",cam.vb);
    if(cam.zoom)svg.classList.add("zoomed");
    note(svg,300,22,"↑ Oeste (Jardines y Saint-Cyr) · Sur a la izquierda (Saint-Louis), Norte a la derecha (Notre-Dame)");
    drawRooms(svg,DOMINIO,s=>drawDominioContext(s));
    note(svg,300,932,"— Línea del Sena (2 leguas) y Puertas de París (4 leguas) —");
    note(svg,300,1118,"↓ París · Île de la Cité y Palais-Royal");
    note(svg,588,768,"Saint-Cloud ↘","end");
    note(svg,12,768,"↙ Meudon y Sceaux","start");
    mapInfo("De Versalles a París (Dominio, Barrios de 1722 y Línea del Sena)","Arriba el Gran Canal y el parque; en el centro el Palacio flanqueado por los dos barrios históricos de 1722 (Saint-Louis con el Viejo Versalles, el Gran Común y el Parc aux Cerfs al sur; Notre-Dame con su parroquia, mercado y hôtels al norte); abajo, las tres avenidas hacia Meudon, Sceaux, el puente de Sèvres, Saint-Cloud y la entrada a París por la Barrière de la Conférence hasta las Tullerías y el Palais-Royal. Toca París, Saint-Cloud, Sèvres, Meudon o Sceaux para abrir el modal de viaje.");
  } else {
    drawProvinces(box);
    return;
  }
  if(kind==="palacio"||kind==="dominio")box.append(el("div",{class:"map-head",id:"map-head"},el("h3",{},"Ningún lugar seleccionado"),el("span",{class:"note"},kind==="dominio"?"Toca un barrio de Versalles o un enclave del Sena/París (abre el modal de viaje en carroza).":"Toca una estancia del plano o usa los botones de enfoque (Cuerpo central, Ala del Mediodía, Ala Norte).")));
  box.append(svg);
}
