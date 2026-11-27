/* ---------- Francia: mapa de provincias al estilo Clausewitz ----------
   mapa/provinces.png: un color RGB exacto por provincia. Se lee píxel a píxel para saber
   qué provincia hay bajo el dedo y para trazar fronteras donde cambia el color. */
const PROV_DEF = [{"id": "fuera", "r": 0, "g": 0, "b": 0, "nombre": "Fuera del reino", "tipo": "fuera", "capital": "", "nota": ""}, {"id": "ile-de-france", "r": 93, "g": 137, "b": 191, "nombre": "Île-de-France", "tipo": "reino", "capital": "París", "nota": "Gobierno de la capital y de Versalles."}, {"id": "picardie", "r": 146, "g": 234, "b": 142, "nombre": "Picardía", "tipo": "reino", "capital": "Amiens", "nota": ""}, {"id": "flandre", "r": 199, "g": 131, "b": 93, "nombre": "Flandes y Henao", "tipo": "reino", "capital": "Lille", "nota": "Frontera norte, plazas fuertes."}, {"id": "artois", "r": 52, "g": 228, "b": 44, "nombre": "Artois", "tipo": "reino", "capital": "Arras", "nota": ""}, {"id": "champagne", "r": 105, "g": 125, "b": 195, "nombre": "Champaña", "tipo": "reino", "capital": "Troyes", "nota": "Reims, ciudad de la consagración."}, {"id": "trois-eveches", "r": 158, "g": 222, "b": 146, "nombre": "Metz y Verdún (Tres Obispados)", "tipo": "reino", "capital": "Metz", "nota": "Enclaves franceses dentro de la Lorena."}, {"id": "lorraine", "r": 211, "g": 119, "b": 97, "nombre": "Ducado de Lorena", "tipo": "extranjero", "capital": "Nancy", "nota": "Ducado soberano. Francés solo desde 1766."}, {"id": "alsace", "r": 64, "g": 216, "b": 48, "nombre": "Alsacia", "tipo": "reino", "capital": "Estrasburgo", "nota": "Francesa desde el siglo XVII."}, {"id": "normandie", "r": 117, "g": 113, "b": 199, "nombre": "Normandía", "tipo": "reino", "capital": "Ruan", "nota": ""}, {"id": "bretagne", "r": 170, "g": 210, "b": 150, "nombre": "Bretaña", "tipo": "reino", "capital": "Rennes", "nota": "Estados provinciales propios."}, {"id": "maine", "r": 223, "g": 107, "b": 101, "nombre": "Maine y Perche", "tipo": "reino", "capital": "Le Mans", "nota": ""}, {"id": "anjou", "r": 76, "g": 204, "b": 52, "nombre": "Anjou", "tipo": "reino", "capital": "Angers", "nota": ""}, {"id": "touraine", "r": 129, "g": 101, "b": 203, "nombre": "Turena", "tipo": "reino", "capital": "Tours", "nota": ""}, {"id": "orleanais", "r": 182, "g": 198, "b": 154, "nombre": "Orleanesado", "tipo": "reino", "capital": "Orleans", "nota": ""}, {"id": "berry", "r": 235, "g": 95, "b": 105, "nombre": "Berry", "tipo": "reino", "capital": "Bourges", "nota": ""}, {"id": "nivernais", "r": 88, "g": 192, "b": 56, "nombre": "Nivernés", "tipo": "reino", "capital": "Nevers", "nota": ""}, {"id": "bourgogne", "r": 141, "g": 89, "b": 207, "nombre": "Borgoña", "tipo": "reino", "capital": "Dijon", "nota": "Estados de Borgoña."}, {"id": "dombes", "r": 194, "g": 186, "b": 158, "nombre": "Principado de Dombes", "tipo": "extranjero", "capital": "Trévoux", "nota": "Principado soberano del duque de Maine."}, {"id": "franche-comte", "r": 47, "g": 83, "b": 109, "nombre": "Franco Condado", "tipo": "reino", "capital": "Besanzón", "nota": "Francés desde 1678."}, {"id": "poitou", "r": 100, "g": 180, "b": 60, "nombre": "Poitou", "tipo": "reino", "capital": "Poitiers", "nota": ""}, {"id": "aunis", "r": 153, "g": 77, "b": 211, "nombre": "Aunis", "tipo": "reino", "capital": "La Rochelle", "nota": ""}, {"id": "saintonge", "r": 206, "g": 174, "b": 162, "nombre": "Saintonge y Angoumois", "tipo": "reino", "capital": "Saintes", "nota": ""}, {"id": "limousin", "r": 59, "g": 71, "b": 113, "nombre": "Lemosín", "tipo": "reino", "capital": "Limoges", "nota": ""}, {"id": "marche", "r": 112, "g": 168, "b": 64, "nombre": "La Marche", "tipo": "reino", "capital": "Guéret", "nota": ""}, {"id": "bourbonnais", "r": 165, "g": 65, "b": 215, "nombre": "Borbonés", "tipo": "reino", "capital": "Moulins", "nota": ""}, {"id": "auvergne", "r": 218, "g": 162, "b": 166, "nombre": "Auvernia", "tipo": "reino", "capital": "Clermont", "nota": ""}, {"id": "lyonnais", "r": 71, "g": 59, "b": 117, "nombre": "Lionesado", "tipo": "reino", "capital": "Lyon", "nota": "Sedas y banca."}, {"id": "dauphine", "r": 124, "g": 156, "b": 68, "nombre": "Delfinado", "tipo": "reino", "capital": "Grenoble", "nota": ""}, {"id": "guyenne", "r": 177, "g": 53, "b": 219, "nombre": "Guyena y Gascuña", "tipo": "reino", "capital": "Burdeos", "nota": "El gobierno más extenso del reino."}, {"id": "bearn", "r": 230, "g": 150, "b": 170, "nombre": "Bearne y Navarra", "tipo": "reino", "capital": "Pau", "nota": ""}, {"id": "foix", "r": 83, "g": 47, "b": 121, "nombre": "Condado de Foix", "tipo": "reino", "capital": "Foix", "nota": ""}, {"id": "roussillon", "r": 136, "g": 144, "b": 72, "nombre": "Rosellón", "tipo": "reino", "capital": "Perpiñán", "nota": "Francés desde 1659."}, {"id": "languedoc", "r": 189, "g": 41, "b": 223, "nombre": "Languedoc", "tipo": "reino", "capital": "Toulouse", "nota": "Estados de Languedoc; Montpellier y su facultad."}, {"id": "comtat", "r": 42, "g": 138, "b": 174, "nombre": "Condado Venesino y Aviñón", "tipo": "extranjero", "capital": "Aviñón", "nota": "Territorio del papa."}, {"id": "provence", "r": 95, "g": 235, "b": 125, "nombre": "Provenza", "tipo": "reino", "capital": "Aix", "nota": "Sale de la peste de 1720."}];
const PROV_PNG = "data:image/png;base64,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";
const GEO = {lon0:-5.2, lon1:8.6, lat1:51.3, k:Math.cos(46.5*Math.PI/180)};
let provState=null, capaFrancia="ducados";
let selDucado=0, selParl="paris", selDioc="dioc-paris", selApanaje="ap-orleans", selGob="gob-ile-de-france", selInt="int-paris";

const CAPAS_FRANCIA = {
  ducados:      {num:"1", label:"Ducados y Señoríos",    ico:"🛡", sub:"Mapa feudal de Francia (1722): Ducados-Parías, Condados, Marquesados y Baronías, separados de los gobiernos provinciales."},
  parlamentos:  {num:"2", label:"Los Parlamentos",       ico:"⚖", sub:"Las 13 jurisdicciones soberanas de la Toga (Parlamentos y Consejos Soberanos), cada una con su emblema judicial y su Primer Presidente."},
  diocesis:     {num:"3", label:"Las Diócesis",          ico:"✚", sub:"Las 18 provincias metropolitanas (arzobispados) del reino y 18 obispados clave (pares eclesiásticos, apelantes y sedes cortesanas) ante la bula Unigenitus."},
  apanajes:     {num:"4", label:"Apanajes y Patrimonios", ico:"⚜", sub:"Separación estricta: único Apanaje real vigente (Orleans), Principado soberano de Dombes, patrimonios señoriales de las ramas borbónicas y Dominio Real. Los gobiernos figuran aparte en el Mapa 5."},
  gobiernos:    {num:"5", label:"Gobiernos Militares",   ico:"⚔", sub:"Los 32 gobiernos provinciales y militares del Reino en junio de 1722, con su Gobernador titular, nivel de confianza y fuente (distintos de los feudos y de las intendencias)."},
  intendencias: {num:"6", label:"Intendencias",          ico:"📜", sub:"Las 30 intendencias reales (31–32 generalidades) de 1722 clasificadas por régimen fiscal: Pays d'élections, Pays d'États y Pays d'imposition."}
};

/* ---------- 1. MAPA DE DUCADOS Y SEÑORÍOS (Cada uno con su escudo y su líder) ---------- */
const FEUDOS = [
  // Île-de-France y centro
  {id:"montfort", prov:"ile-de-france", lon:1.78, lat:48.78, corto:"D. de Luynes / Montfort", nombre:"Condado de Montfort-l'Amaury y Ducado de Chevreuse", rango:"Ducado-Paría y Condado",
   casa:"Casa d'Albert de Luynes", clan:"ducal", pid:"charles-philippe-luynes", titular:"Charles-Philippe d'Albert, IV Duque de Luynes",
   escudo:{bg:"#1f3a68",fg:"#d8b258",acc:"#b3322e",pat:"luynes",crown:"ducal",blason:"Cuartelado: 1 y 4 de oro con león rampante de gules coronado (Albert); 2 y 3 de gules con nueve macles de oro (Rohan-Montbazon); sobre el todo, palo de azur."},
   rentas:"Bosques, censos señoriales y bailía entre Versalles, Dampierre y Dreux; más de 90.000 libras de renta.",
   nota:"Cambiado con Luis XIV por el antiguo ducado de Chevreuse para ampliar el Gran Parque de Versalles."},
  {id:"dammartin", prov:"ile-de-france", lon:2.62, lat:49.08, corto:"C. de Dammartin y Chantilly", nombre:"Condado de Dammartin y Señorío de Chantilly", rango:"Señorío Principesco y Condado",
   casa:"Casa de Borbón-Condé", clan:"conde", pid:"luis-enrique-borbon", titular:"Luis Enrique de Borbón-Condé, «Monsieur le Duc»",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"conde",crown:"principe",blason:"De azur con tres flores de lis de oro y bastón recortado de gules en abismo (armas de Borbón-Condé)."},
   rentas:"Rentas agrarias inmensas, bosques de caza y ferias al noreste de París, multiplicadas en 1720 con las ganancias del Sistema de Law.",
   nota:"Chantilly es la verdadera corte rival de Versalles donde gobierna Monsieur le Duc junto a la marquesa de Prie."},
  {id:"maintenon", prov:"ile-de-france", lon:1.52, lat:48.56, corto:"M. de Maintenon", nombre:"Marquesado de Maintenon", rango:"Marquesado",
   casa:"Casa de Noailles", clan:"ducal", pid:"noailles", titular:"Adrien-Maurice, III Duque de Noailles",
   escudo:{bg:"#a82828",fg:"#ddb650",acc:"#1f3a68",pat:"noailles",crown:"ducal",blason:"De gules con banda de oro (armas plenas de la Casa de Noailles)."},
   rentas:"Tierras regadas por el Eure, molinos y señorío libre de deudas gracias a la dote dispuesta por Luis XIV en 1698.",
   nota:"Heredado en 1719 a la muerte de Madame de Maintenon por su sobrina Françoise-Charlotte d'Aubigné, esposa del Duque de Noailles."},
  {id:"rambouillet", prov:"ile-de-france", lon:1.83, lat:48.62, corto:"D. de Rambouillet", nombre:"Ducado-Paría de Rambouillet", rango:"Ducado-Paría (1711)",
   casa:"Casa de Borbón-Toulouse", clan:"toulouse", pid:"comte-de-toulouse", titular:"Luis Alejandro de Borbón, Conde de Toulouse",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"toulouse",crown:"principe",blason:"De azur con tres flores de lis de oro y barra recortada de gules, acolado del ancla de Gran Almirante de Francia."},
   rentas:"Uno de los señoríos mejor administrados del reino, adquirido en 1706 y erigido en Ducado-Paría en 1711.",
   nota:"Residencia predilecta del Conde de Toulouse, Almirante de Francia, que supo mantenerse al margen de la Conspiración de Cellamare."},
  {id:"villeroy", prov:"ile-de-france", lon:2.46, lat:48.52, corto:"D. de Villeroy", nombre:"Ducado-Paría de Villeroy", rango:"Ducado-Paría (1651)",
   casa:"Casa de Neufville de Villeroy", clan:"ducal", pid:"villeroy", titular:"François de Neufville, II Duque y Mariscal de Villeroy",
   escudo:{bg:"#1f3a68",fg:"#ddb650",acc:"#e8e4d8",pat:"villeroy",crown:"ducal",blason:"De azur con cabrio de oro acompañado de tres cruces ancoradas de lo mismo (Neufville de Villeroy)."},
   rentas:"Rentas señoriales en Mennecy y Corbeil, sumadas a las enormes pensiones del Gobierno del Lionesado.",
   nota:"Solar del anciano Gobernador de Luis XV; aquí será confinado en primera instancia cuando el Regente lo destierre en agosto de 1722."},
  {id:"isle-adam", prov:"ile-de-france", lon:2.20, lat:49.13, corto:"B. de L'Isle-Adam", nombre:"Baronía de L'Isle-Adam y Señorío de Pontoise", rango:"Baronía Principesca",
   casa:"Casa de Borbón-Conti", clan:"conti", pid:"louis-armand-conti", titular:"Luis Armando II de Borbón, Príncipe de Conti",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"conti",crown:"principe",blason:"De azur con tres flores de lis de oro, bastón de gules y bordura de gules (armas de Borbón-Conti)."},
   rentas:"Peajes fluviales sobre el Oise y bosques de caza al norte de París.",
   nota:"Enclave estratégico de los Conti junto a Pontoise, donde estuvo desterrado el Parlamento de París en 1720."},

  // Champaña y Nivernés
  {id:"rethel", prov:"champagne", lon:4.38, lat:49.52, corto:"D. de Rethel-Mazarin", nombre:"Ducado-Paría de Rethel-Mazarin", rango:"Ducado-Paría",
   casa:"Casa de La Porte-Mazarin", clan:"ducal", pid:"paul-jules-mazarin", titular:"Paul-Jules de La Porte, Duque de Rethel-Mazarin",
   escudo:{bg:"#1e3f73",fg:"#e0ba54",acc:"#b82d2d",pat:"mazarin",crown:"ducal",blason:"De azur con segur consular romana de plata rodeada de haces de oro y faja de gules cargada de tres estrellas de oro (Mazarino)."},
   rentas:"Más de treinta parroquias, herrerías y bosques en las Ardenas champañesas en la ruta hacia Reims.",
   nota:"Comprado por el cardenal Mazarino a los Gonzaga-Nevers y rebautizado Ducado-Paría de Mazarin."},
  {id:"joinville", prov:"champagne", lon:5.14, lat:48.44, corto:"P. de Joinville", nombre:"Principado de Joinville", rango:"Principado y Baronía",
   casa:"Casa de Orleans", clan:"orleans", pid:"felipe-ii-orleans", titular:"Felipe II de Orleans, Duque de Orleans y Regente",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#f0eee6",pat:"orleans",crown:"principe",blason:"De azur con tres flores de lis de oro y lambel de tres pendientes de plata en jefe (armas de la Casa de Orleans)."},
   rentas:"Rentas forestales, forjas metalúrgicas y derechos señoriales en la frontera con Lorena.",
   nota:"Antiguo feudo de los Guisa pasado a la Grande Mademoiselle y heredado por el Duque de Orleans."},
  {id:"chateau-thierry", prov:"champagne", lon:3.40, lat:49.05, corto:"D. de Château-Thierry", nombre:"Ducado-Paría de Château-Thierry", rango:"Ducado-Paría",
   casa:"Casa de La Tour d'Auvergne (Bouillon)", clan:"ducal", pid:"emmanuel-theodose-bouillon", titular:"Emmanuel-Théodose de La Tour d'Auvergne, Duque de Bouillon",
   escudo:{bg:"#b02a2a",fg:"#e6e2d6",acc:"#ddb650",pat:"bouillon",crown:"principe",blason:"De gules con faja de plata y torre de oro, cuartelado con el gonfalón de Auvernia y las flores de lis de Albret."},
   rentas:"Viñedos del Marne, peajes fluviales hacia París y bailía ducal entregada a los Bouillon a cambio del principado soberano de Sedán.",
   nota:"Sostén de la Casa de Bouillon, que goza del rango de Príncipes Extranjeros y del cargo de Gran Chambelán de Francia."},
  {id:"reims-paria", prov:"champagne", lon:4.03, lat:49.26, corto:"Arz.-D. de Reims", nombre:"Arzobispado-Ducado de Reims", rango:"Primer Par Eclesiástico de Francia",
   casa:"Casa de Rohan-Guémené (Iglesia)", clan:"ducal", pid:"armand-jules-rohan", titular:"Armand-Jules de Rohan-Guémené, Arzobispo-Duque de Reims",
   escudo:{bg:"#1d3969",fg:"#e0ba54",acc:"#b02a2a",pat:"rohan",crown:"ecles",blason:"Partido de Francia (sembrado de lises con cruz de gules de Reims) y de Rohan (de gules con nueve macles de oro)."},
   rentas:"Más de 80.000 libras de renta anual, señorío temporal sobre Reims y privilegio de consagrar al Rey de Francia.",
   nota:"Nombrado arzobispo-duque el 2 de junio de 1722 (confirmado en julio y consagrado obispo el 23 de agosto) para ungir a Luis XV en octubre."},
  {id:"nevers", prov:"nivernais", lon:3.16, lat:46.99, corto:"D. de Nevers", nombre:"Ducado de Nevers y de Donzy", rango:"Ducado Feudal",
   casa:"Casa Mancini-Mazarini", clan:"ducal", pid:"philippe-jules-mancini", titular:"Philippe-Jules-François Mancini, Duque de Nevers",
   escudo:{bg:"#1f3d70",fg:"#e0ba54",acc:"#d9d5c8",pat:"mazarin",crown:"ducal",blason:"De azur con dos peces (lucios) adosados de plata en palo (Mancini) cuartelado con las haces consulares de oro de Mazarino."},
   rentas:"Rentas de fundiciones, bosques, loza de Nevers y peajes sobre el Loira.",
   nota:"Sobrino nieto de Mazarino; gobierna el Nivernés con amplia autonomía señorial."},

  // Normandía y Picardía
  {id:"eu", prov:"normandie", lon:1.42, lat:50.05, corto:"C. de Eu", nombre:"Condado-Paría de Eu", rango:"Condado-Paría",
   casa:"Casa de Borbón-Maine", clan:"maine", pid:"comte-d-eu", titular:"Luis Carlos de Borbón, Conde de Eu (hijo del Duque del Maine)",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"maine",crown:"principe",blason:"De azur con tres flores de lis de oro y barra recortada de gules (armas de los príncipes legitimados de Maine)."},
   rentas:"Puerto de Tréport, bosques de vidrierías y ricas tierras cerealistas en la frontera normando-picarda.",
   nota:"Arrancado a la Grande Mademoiselle para dotar a la Casa de Maine; da título a su hijo segundo, el Conde de Eu."},
  {id:"longueville", prov:"normandie", lon:1.05, lat:49.78, corto:"D. de Longueville", nombre:"Ducado de Longueville", rango:"Ducado en Litigio Sucesorio",
   casa:"Casas de Condé, Conti y Luynes", clan:"conde", pid:"charles-charolais", titular:"Carlos de Borbón-Condé, Conde de Charolais (coheredero)",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#e6e2d6",pat:"orleans",crown:"ducal",blason:"De azur con tres flores de lis de oro, lambel de plata de tres pendientes y bastón de plata (Orleans-Longueville)."},
   rentas:"Diezmos y señoríos en el País de Caux, objeto de los pleitos más enconados en los Parlamentos de Ruan y París.",
   nota:"Extinta la rama de Longueville con Marie de Nemours, sus tierras enfrentan a Condé, Conti y Luynes."},
  {id:"tancarville", prov:"normandie", lon:0.46, lat:49.48, corto:"C. de Tancarville y Évreux", nombre:"Condados de Évreux y de Tancarville", rango:"Condados Normandos",
   casa:"Casa de La Tour d'Auvergne (Évreux)", clan:"ducal", pid:"henri-louis-evreux", titular:"Henri-Louis de La Tour d'Auvergne, Conde de Évreux",
   escudo:{bg:"#b02a2a",fg:"#ddb650",acc:"#e8e4d8",pat:"bouillon",crown:"conde",blason:"De gules con escudete de plata angulado de estrellas de oro (Tancarville) y torre de oro de Auvernia."},
   rentas:"Derechos de barcaje en el estuario del Sena y rentas condales de Évreux.",
   nota:"El Conde de Évreux compró Tancarville y construyó el Hôtel d'Évreux en París con las ganancias fabulosas del Sistema de Law."},
  {id:"harcourt", prov:"normandie", lon:-0.45, lat:49.15, corto:"D. de Harcourt", nombre:"Ducado-Paría de Harcourt (Thury)", rango:"Ducado-Paría (1709)",
   casa:"Casa d'Harcourt", clan:"ducal", pid:"francois-harcourt", titular:"François d'Harcourt, II Duque de Harcourt",
   escudo:{bg:"#b02828",fg:"#e0ba54",acc:"#b02828",pat:"harcourt",crown:"ducal",blason:"De gules con dos fajas de oro (el célebre blasón milenario de los barones y duques normandos de Harcourt)."},
   rentas:"Tierras ganaderas, manzanos y señoríos en la Baja Normandía al sur de Caen.",
   nota:"Su titular es Capitán de los Guardias de Corps del Rey, custodiando en persona las puertas de la alcoba de Luis XV."},
  {id:"chaulnes", prov:"picardie", lon:2.80, lat:49.82, corto:"D. de Chaulnes", nombre:"Ducado-Paría de Chaulnes y Vidamato de Amiens", rango:"Ducado-Paría (1711)",
   casa:"Casa d'Albert d'Ailly de Chaulnes", clan:"ducal", pid:"louis-auguste-chaulnes", titular:"Louis-Auguste d'Albert d'Ailly, Duque de Chaulnes",
   escudo:{bg:"#b02828",fg:"#e8e4d8",acc:"#ddb650",pat:"luynes",crown:"ducal",blason:"De gules con jefe ajedrezado de plata y azur de tres órdenes (Ailly) partido con el león coronado de Albert de Luynes."},
   rentas:"Señoríos cerealistas en el Santerre, baronía de Picquigny y derechos del Vidamato de Amiens.",
   nota:"Manda la prestigiosa compañía de Caballos Ligeros de la Guardia Real en Versalles."},
  {id:"st-simon-feudo", prov:"picardie", lon:3.18, lat:49.70, corto:"D. de Saint-Simon", nombre:"Ducado-Paría de Saint-Simon (Vermandois)", rango:"Ducado-Paría (1635)",
   casa:"Casa de Rouvroy de Saint-Simon", clan:"ducal", pid:"saint-simon", titular:"Louis de Rouvroy, II Duque de Saint-Simon",
   escudo:{bg:"#22252a",fg:"#e8e4d8",acc:"#b82d2d",pat:"stsimon",crown:"ducal",blason:"De sable con cruz de plata cargada de cinco veneras (conchas) de gules (Rouvroy), cuartelado con el jaquelado de oro y azur de Vermandois."},
   rentas:"Señorío de Saint-Simon en Picardía y de La Ferté-Vidame en el Perche, aunque cargado de deudas tras su embajada en Madrid.",
   nota:"Cuna de la paría que obsesiona al memorialista Duque de Saint-Simon."},

  // Bretaña, Poitou, Turena, Berry y Angoumois
  {id:"rohan", prov:"bretagne", lon:-2.95, lat:48.06, corto:"D. de Rohan y Guémené", nombre:"Ducado de Rohan y Principado de Guémené", rango:"Ducado-Paría y Principado",
   casa:"Casa de Rohan", clan:"ducal", pid:"rohan-guemene", titular:"Charles III de Rohan, Príncipe de Guémené y Duque de Montbazon",
   escudo:{bg:"#b02828",fg:"#e0ba54",acc:"#f0ede4",pat:"rohan",crown:"principe",blason:"De gules con nueve macles de oro puestos 3, 3 y 3 (divisa: «Roi ne puis, duc ne daigne, Rohan suis»)."},
   rentas:"Inmensos dominios bretones en Pontivy, Guémené y Léon.",
   nota:"Cabeza primogénita de la Casa de Rohan, que disputa todo precedente a los Duques y Pares ordinarios."},
  {id:"penthievre", prov:"bretagne", lon:-2.35, lat:48.52, corto:"D. de Penthièvre", nombre:"Ducado-Paría de Penthièvre", rango:"Ducado-Paría (1697)",
   casa:"Casa de Borbón-Toulouse", clan:"toulouse", pid:"comte-de-toulouse", titular:"Luis Alejandro de Borbón, Conde de Toulouse y Gobernador de Bretaña",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#f0ede4",pat:"toulouse",crown:"principe",blason:"Armas de Borbón-Toulouse acoladas con el sembrado de armiños de Bretaña."},
   rentas:"Rentas marítimas, almirantazgo y tierras costeras de Saint-Brieuc a Lamballe.",
   nota:"Base territorial del Conde de Toulouse como Gobernador General de Bretaña."},
  {id:"vitre", prov:"bretagne", lon:-1.21, lat:48.12, corto:"B. de Vitré / Thouars", nombre:"Baronía de Vitré y Ducado de Thouars", rango:"Ducado-Paría y Primera Baronía",
   casa:"Casa de La Trémoille", clan:"ducal", pid:"la-tremoille", titular:"Charles-Armand-René, Duque de La Trémoille y de Thouars",
   escudo:{bg:"#e0ba54",fg:"#b02828",acc:"#1f3a68",pat:"tremoille",crown:"ducal",blason:"De oro con cabrio de gules acompañado de tres águilas de azur picadas y membradas de gules (La Trémoille)."},
   rentas:"Comercio de lienzos de Vitré y vasto ducado de Thouars en el Poitou.",
   nota:"Da derecho a presidir la nobleza en los Estados de Bretaña alternando con los Rohan."},
  {id:"soubise", prov:"poitou", lon:-0.65, lat:46.25, corto:"D. de Rohan-Rohan (Frontenay)", nombre:"Ducado-Paría de Rohan-Rohan y Principado de Soubise", rango:"Ducado-Paría (1714)",
   casa:"Casa de Rohan-Soubise", clan:"ducal", pid:"hercule-meriadec-rohan", titular:"Hercule-Mériadec de Rohan, Duque de Rohan-Rohan y Príncipe de Soubise",
   escudo:{bg:"#b02828",fg:"#e0ba54",acc:"#e8e4d8",pat:"rohan",crown:"principe",blason:"Partido de Bretaña (armiños) y de Rohan (de gules con nueve macles de oro)."},
   rentas:"Señoríos de Frontenay en Poitou y Soubise en Saintonge, unidos al Gobierno de Champaña.",
   nota:"Hermano mayor del Cardenal de Rohan y yerno de Madame de Ventadour."},
  {id:"mortemart", prov:"limousin", lon:0.96, lat:46.04, corto:"D. de Mortemart", nombre:"Ducado-Paría de Mortemart", rango:"Ducado-Paría (1650)",
   casa:"Casa de Rochechouart de Mortemart", clan:"ducal", pid:"louis-mortemart", titular:"Louis II de Rochechouart, IV Duque de Mortemart",
   escudo:{bg:"#e8e4d8",fg:"#b02828",acc:"#ddb650",pat:"mortemart",crown:"ducal",blason:"Ondado de plata y de gules de seis piezas en faja (el antiquísimo blasón de los Rochechouart-Mortemart, casa de Mme de Montespan)."},
   rentas:"Tierras señoriales en el alto Poitou, la Marche y el Lemosín, más el principado de Tonnay-Charente.",
   nota:"Su titular es Primer Gentilhombre de la Cámara del Rey Luis XV."},
  {id:"la-rochefoucauld", prov:"saintonge", lon:0.38, lat:45.74, corto:"D. de La Rochefoucauld", nombre:"Ducado-Paría de La Rochefoucauld", rango:"Ducado-Paría (1622)",
   casa:"Casa de La Rochefoucauld", clan:"ducal", pid:"francois-la-rochefoucauld", titular:"François VIII, IV Duque de La Rochefoucauld",
   escudo:{bg:"#1f3a68",fg:"#e8e4d8",acc:"#b02828",pat:"larochefoucauld",crown:"ducal",blason:"Fajado de diez piezas de plata y azur, con tres cabrios de gules brochantes sobre el todo, el primero despuntado."},
   rentas:"Señoríos en Angoumois y Saintonge, sumados al ducado de La Roche-Guyon sobre el Sena.",
   nota:"El Duque de La Rochefoucauld es Gran Montero de Francia y Maestro del Guardarropa de Luis XV."},
  {id:"orleans-ap", prov:"orleanais", lon:1.90, lat:47.90, corto:"Apanaje de Orleans y Chartres", nombre:"Ducados de Orleans, Chartres y Blois (Gran Apanaje)", rango:"Ducados del Gran Apanaje Real",
   casa:"Casa de Orleans", clan:"orleans", pid:"luis-orleans-chartres", titular:"Luis de Orleans, Duque de Chartres (heredero del Regente)",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#f0ede4",pat:"orleans",crown:"principe",blason:"De azur con tres flores de lis de oro y lambel de plata de tres pendientes (Casa Ducal de Orleans)."},
   rentas:"Peajes del Loira, bosques de Orleans, trigales de Beauce y canal de Orleans; más de 600.000 libras anuales.",
   nota:"Núcleo del único apanaje real vigente en 1722 (véase también Mapa 4); da su título al joven Duque de Chartres, hijo único varón del Regente."},
  {id:"saint-aignan", prov:"berry", lon:1.37, lat:47.26, corto:"D. de Saint-Aignan", nombre:"Ducado-Paría de Saint-Aignan", rango:"Ducado-Paría (1663)",
   casa:"Casa de Beauvilliers", clan:"ducal", pid:"paul-hippolyte-st-aignan", titular:"Paul-Hippolyte de Beauvilliers, Duque de Saint-Aignan",
   escudo:{bg:"#e8e4d8",fg:"#2d6a3e",acc:"#b02828",pat:"harcourt",crown:"ducal",blason:"Fajado de plata y de sinople de seis piezas, las fajas de plata cargadas de seis merletas de gules (Beauvilliers)."},
   rentas:"Viñedos del Cher, tierras en Berry y Turena y gobierno de El Havre.",
   nota:"Hermano del difunto Duque de Beauvilliers (gobernador del padre de Luis XV) y miembro del Consejo de Regencia."},
  {id:"charost", prov:"berry", lon:2.10, lat:46.99, corto:"D. de Charost", nombre:"Ducado-Paría de Charost", rango:"Ducado-Paría (1672)",
   casa:"Casa de Béthune-Charost", clan:"ducal", pid:"charost", titular:"Armand de Béthune, II Duque de Charost",
   escudo:{bg:"#e8e4d8",fg:"#b02828",acc:"#ddb650",pat:"harcourt",crown:"ducal",blason:"De plata con faja de gules (el histórico escudo de la Casa de Béthune, duques de Sully y de Charost)."},
   rentas:"Señoríos en el Berry y baronía de Ancenis en Bretaña.",
   nota:"Elegido en secreto por el Regente y el Cardenal Dubois para sustituir al Mariscal de Villeroy como Gobernador de Luis XV en agosto de 1722."},

  // Borgoña, Lionesado, Brie y Provenza
  {id:"borbon-conde-gob", prov:"bourgogne", lon:4.28, lat:46.43, corto:"C. de Charolais y Borbón", nombre:"Condado de Charolais y Ducado de Borbón", rango:"Ducado engagiste y Condado Patrimonial",
   casa:"Casa de Borbón-Condé", clan:"conde", pid:"luis-enrique-borbon", titular:"Luis Enrique de Borbón-Condé, «Monsieur le Duc»",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"conde",crown:"principe",blason:"Armas de Borbón-Condé acoladas con las de Borbón moderno y Charolais."},
   rentas:"Tierras patrimoniales y forjas del Charolais (en Borgoña) y ducado engagiste del Borbonés (cedido en 1661 al Gran Condé a cambio de Albret).",
   nota:"Patrimonio señorial de los Borbón-Condé, distinto del gobierno militar borgoñón (véase Mapa 5 · Gobiernos Militares)."},
  {id:"dombes-feudo", prov:"dombes", lon:4.95, lat:46.00, corto:"P. Soberano de Dombes", nombre:"Principado Soberano de Dombes", rango:"Principado Soberano",
   casa:"Casa de Borbón-Maine", clan:"maine", pid:"duc-du-maine", titular:"Luis Augusto de Borbón, Duque del Maine y Príncipe de Dombes",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"maine",crown:"principe",blason:"De azur con tres flores de lis de oro y barra recortada de gules (Príncipes Soberanos de Dombes)."},
   rentas:"Impuestos soberanos, acuñación de moneda y privilegios de imprenta libre en Trévoux.",
   nota:"Único territorio donde el Duque del Maine reina como soberano independiente; su hijo primogénito lleva el título de Príncipe de Dombes."},
  {id:"villars-prov", prov:"ile-de-france", lon:2.71, lat:48.56, corto:"D. de Villars (Vaux)", nombre:"Ducado-Paría de Villars (Vaux-Villars)", rango:"Ducado-Paría (1705/1709)",
   casa:"Casa de Villars", clan:"ducal", pid:"villars", titular:"Claude-Louis-Hector, Duque y Mariscal de Villars",
   escudo:{bg:"#e0ba54",fg:"#b02828",acc:"#1f3a68",pat:"villars",crown:"ducal",blason:"De oro con tres cabrios de gules y jefe de azur cargado de un león pasante de plata (Duque y Mariscal de Villars)."},
   rentas:"Dominio de Vaux-le-Vicomte en Brie, comprado por el mariscal en 1705 y erigido en Ducado-Paría de Villars.",
   nota:"Asiento feudal real del mariscal de Villars en Brie —distinto del gobierno militar provenzal (Mapa 5), sin mezcla con señoríos provenzales como el marquesado monegasco homónimo."},
  {id:"brancas-villars", prov:"provence", lon:5.41, lat:43.92, corto:"D. de Villars-Brancas", nombre:"Ducado-Paría de Villars-Brancas", rango:"Ducado-Paría (1652)",
   casa:"Casa de Brancas", clan:"ducal", pid:null, titular:"Louis-Antoine de Brancas, IV Duque de Villars-Brancas",
   escudo:{bg:"#1f3a68",fg:"#e0ba54",acc:"#b02828",pat:"luynes",crown:"ducal",blason:"De azur con palo de plata cargado de tres torres de gules y flanqueado de cuatro piernas de león de oro (Brancas)."},
   rentas:"Señoríos provenzales en Villars, Céreste y el valle del Apt.",
   nota:"Ducado provenzal de la Casa de Brancas (homónimo pero distinto del ducado de Vaux-Villars del mariscal de Villars).",
   conf:"a", fuente:"Père Anselme; Almanach royal 1722"},

  // Languedoc y Guyena
  {id:"ales-pezenas", prov:"languedoc", lon:3.65, lat:43.82, corto:"C. de Alès y Pézenas", nombre:"Condado de Alès y Baronías de Pézenas y Bagnols", rango:"Condado y Baronías",
   casa:"Casa de Borbón-Conti", clan:"conti", pid:"louis-armand-conti", titular:"Luis Armando II de Borbón, Príncipe de Conti",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"conti",crown:"principe",blason:"De azur con tres flores de lis de oro, bastón de gules y bordura de gules (Borbón-Conti)."},
   rentas:"Minas de las Cévennes, ferias pañeras de Pézenas y rentas señoriales en el Bajo Languedoc.",
   nota:"Otorga a la Casa de Conti una poderosa clientela propia en los Estados de Languedoc."},
  {id:"uzes", prov:"languedoc", lon:4.42, lat:44.08, corto:"D. de Uzès (1er Par)", nombre:"Ducado-Paría de Uzès", rango:"Primer Ducado-Paría Laico de Francia",
   casa:"Casa de Crussol d'Uzès", clan:"ducal", pid:"jean-charles-uzes", titular:"Jean-Charles de Crussol, VII Duque de Uzès",
   escudo:{bg:"#b02828",fg:"#e0ba54",acc:"#1f3a68",pat:"uzes",crown:"ducal",blason:"Cuartelado: 1 y 4 fajado de oro y de sinople (Crussol); 2 y 3 de oro con tres cabrios de gules (Lévis); sobre el todo de gules con tres bandas de oro (Uzès)."},
   rentas:"Señoríos en el Gard y las Cévennes, con precedencia sobre todos los duques del Reino.",
   nota:"Vizcondado erigido en ducado (1565) y en ducado-paría (1572). Al extinguirse parías anteriores del siglo XVI, Uzès quedó como la paría laica más antigua del reino: da asiento y firma en primer lugar en el Parlamento y precede a todos los Pares laicos (inmediatamente tras la sangre real) en el Sacre de Reims."},
  {id:"baronias-lang", prov:"languedoc", lon:2.35, lat:43.45, corto:"M. de Castries y Baronías", nombre:"Marquesado de Castries y Baronías de los Estados de Languedoc", rango:"Marquesado y Baronía de Estados",
   casa:"Casa de La Croix de Castries", clan:"ducal", pid:"joseph-castries", titular:"Joseph-François de La Croix, Marqués de Castries",
   escudo:{bg:"#1f3a68",fg:"#e0ba54",acc:"#1f3a68",pat:"castries",crown:"conde",blason:"De azur con cruz de oro (el célebre blasón parlante de los La Croix, marqueses de Castries y barones del Languedoc)."},
   rentas:"Derecho de asiento y voto en los Estados de Languedoc en Montpellier y gobierno del puerto de Sète.",
   nota:"El Marqués de Castries enlaza la corte del Palais-Royal (como caballero de honor de Mme d'Orléans) con la nobleza languedociana."},
  {id:"turenne", prov:"guyenne", lon:1.62, lat:44.96, corto:"V. de Turenne", nombre:"Vizcondado Soberano de Turenne y Ducado de Albret", rango:"Vizcondado Cuasi-Soberano y Ducado-Paría",
   casa:"Casa de La Tour d'Auvergne (Bouillon)", clan:"ducal", pid:"emmanuel-theodose-bouillon", titular:"Emmanuel-Théodose de La Tour d'Auvergne, Duque de Bouillon",
   escudo:{bg:"#b02828",fg:"#e0ba54",acc:"#e8e4d8",pat:"bouillon",crown:"principe",blason:"Cotizado de oro y de gules (Vizcondado de Turenne) cuartelado con las armas de Bouillon y de Albret."},
   rentas:"Más de cien parroquias entre el Quercy y el Lemosín exentas de la talla real, que votan sus propios impuestos.",
   nota:"Un auténtico Estado dentro del Estado en manos de la Casa de Bouillon."},
  {id:"fronsac", prov:"guyenne", lon:-0.25, lat:44.95, corto:"D. de Fronsac y Richelieu", nombre:"Ducado-Paría de Fronsac y de Richelieu", rango:"Ducado-Paría",
   casa:"Casa de Vignerot du Plessis de Richelieu", clan:"ducal", pid:"armand-richelieu", titular:"Louis-François-Armand, III Duque de Richelieu y de Fronsac",
   escudo:{bg:"#f0ede4",fg:"#b02828",acc:"#ddb650",pat:"richelieu",crown:"ducal",blason:"De plata con tres cabrios de gules (las armas inmortales del Gran Cardenal-Duque de Richelieu)."},
   rentas:"Viñedos bordeleses, peajes sobre el Dordoña y rentas ducales de Richelieu en Poitou.",
   nota:"Feudo del joven e incorregible Duque de Richelieu, ídolo de las damas de la corte y recién salido de la Bastilla."},
  {id:"antin", prov:"guyenne", lon:0.25, lat:43.33, corto:"D. de Antin y Montespan", nombre:"Ducado-Paría de Antin y Marquesado de Montespan", rango:"Ducado-Paría (1711)",
   casa:"Casa de Pardaillan de Gondrin", clan:"ducal", pid:"antin", titular:"Louis-Antoine de Pardaillan de Gondrin, I Duque de Antin",
   escudo:{bg:"#e8e4d8",fg:"#1f3a68",acc:"#b02828",pat:"antin",crown:"ducal",blason:"De plata con tres fajas ondadas de azur (Pardaillan) cuartelado con el castillo de oro sobre gules de Antin."},
   rentas:"Señoríos gascones y pirenaicos en Bigorra, unidos a la Surintendencia de los Edificios del Rey.",
   nota:"Hijo legítimo de Madame de Montespan y medio hermano de la Duquesa de Orleans, del Duque del Maine y del Conde de Toulouse."},
  {id:"gramont", prov:"bearn", lon:-1.14, lat:43.48, corto:"D. de Gramont y Bidache", nombre:"Ducado-Paría de Gramont y Soberanía de Bidache", rango:"Ducado-Paría y Principado Soberano",
   casa:"Casa de Gramont", clan:"ducal", pid:"antoine-gramont", titular:"Antoine V de Gramont, Duque de Gramont y de Guiche",
   escudo:{bg:"#e0ba54",fg:"#1f3a68",acc:"#b02828",pat:"gramont",crown:"ducal",blason:"De oro con león rampante de azur armado y lampasado de gules (Gramont), partido de gules con tres flechas de oro."},
   rentas:"Peajes pirenaicos, soberanía de Bidache y gobiernos hereditarios de Navarra, Bearn y Bayona.",
   nota:"Guardián militar de la frontera española por donde acaba de entrar en Francia la infanta Mariana Victoria."}
];

/* ---------- 2. MAPA DE LOS 13 PARLAMENTOS (Con sus emblemas judiciales y Primeros Presidentes) ---------- */
const PARLAMENTOS_LIST = [
  {id:"paris", n:"Parlamento de París", corto:"Parl. de París", sede:[2.35,48.86], color:[168,54,54],
   pid:"jean-antoine-mesmes", titular:"Jean-Antoine de Mesmes, Conde d'Avaux", cargo:"Primer Presidente del Parlamento de París",
   emblema:{bg:"#1b3668",fg:"#e0ba54",acc:"#a83636",pat:"parl-paris",lema:"«Justitia et Pax osculatae sunt» · Gran Cámara de San Luis"},
   ressort:"Cubre casi la mitad del Reino: Île-de-France, Orleanesado, Champaña, Picardía, Anjou, Maine, Turena, Berry, Nivernés, Borbonés, Auvernia, Lionesado, Poitou, Aunis y La Marche.",
   actitud:"Galicano ardiente, enemigo mortal del Cardenal Dubois y del Sistema de Law. Regresa humillado de su destierro en Pontoise (1720), pero sigue siendo el único tribunal donde se sientan los Duques y Pares.",
   uso:"Imprescindible para registrar edictos reales, casar testamentos regios (como en 1715), juzgar a un Par de Francia o dirimir pleitos sucesorios de las grandes casas."},
  {id:"toulouse", n:"Parlamento de Toulouse", corto:"Parl. de Toulouse", sede:[1.44,43.60], color:[186,88,48],
   pid:"francois-berty", titular:"François de Bertier de Montrabe", cargo:"Primer Presidente del Parlamento de Toulouse",
   emblema:{bg:"#a82a2a",fg:"#e0ba54",acc:"#f0ede4",pat:"parl-toulouse",lema:"Cruz pometeada de oro de Toulouse · Derecho Romano Escrito"},
   ressort:"Languedoc, Quercy, Rouergue, Condado de Foix y parte oriental de Gascuña.",
   actitud:"Segundo parlamento de Francia por antigüedad (1443). Rigorista en derecho romano escrito y severísimo contra los protestantes de las Cévennes.",
   uso:"Jurisdicción clave para los señoríos de Conti, Uzès y Castries y los pleitos con los Estados de Languedoc."},
  {id:"rouen", n:"Parlamento de Normandía (Ruan)", corto:"Parl. de Ruan", sede:[1.09,49.44], color:[54,108,168],
   pid:"nicolas-pontcarre", titular:"Nicolas-Pierre Camus de Pontcarré", cargo:"Primer Presidente del Parlamento de Ruan",
   emblema:{bg:"#b02828",fg:"#e0ba54",acc:"#1f3a68",pat:"parl-rouen",lema:"Dos leopardos de oro sobre gules · Antiguo Échiquier de Normandía"},
   ressort:"Toda la provincia de Alta y Baja Normandía.",
   actitud:"Defensor celoso de la Coutume de Normandie y la Charte aux Normands; hostil a los impuestos extraordinarios de París.",
   uso:"Decide todos los litigios de los condados normandos (Eu, Longueville, Tancarville, Évreux, Harcourt) y del comercio marítimo del Canal."},
  {id:"bordeaux", n:"Parlamento de Burdeos", corto:"Parl. de Burdeos", sede:[-0.57,44.84], color:[138,68,148],
   pid:"joseph-gillet-lacaze", titular:"Joseph de Gillet, Marqués de La Caze", cargo:"Primer Presidente del Parlamento de Burdeos",
   emblema:{bg:"#7a2244",fg:"#e0ba54",acc:"#1f3a68",pat:"parl-bordeaux",lema:"Creciente de plata y leopardo de oro de Aquitania"},
   ressort:"Guyena, Gascuña occidental, Saintonge y Lemosín.",
   actitud:"Orgullosa nobleza de toga vinícola y mercantil; recelosa de los intendentes reales y de las aduanas interiores.",
   uso:"Tribunal de apelación para los feudos de Richelieu (Fronsac), Bouillon (Turenne), Antin y Saint-Simon (Blaye)."},
  {id:"rennes", n:"Parlamento de Bretaña (Rennes)", corto:"Parl. de Rennes", sede:[-1.68,48.11], color:[48,136,124],
   pid:"pierre-brilhac", titular:"Pierre de Brilhac de Nouzières", cargo:"Primer Presidente del Parlamento de Bretaña",
   emblema:{bg:"#1f3a68",fg:"#f0ede4",acc:"#e0ba54",pat:"parl-rennes",lema:"Sembrado de armiños de Bretaña · «Potius mori quam foedari»"},
   ressort:"Todo el Ducado y Gobierno de Bretaña.",
   actitud:"Conmocionado por la represión de la Conspiración de Pontcallec (1720) y por el gran incendio de Rennes de diciembre de 1720.",
   uso:"Vital en los conflictos entre los Estados de Bretaña, el gobernador (Conde de Toulouse) y los feudos de Rohan y La Trémoille."},
  {id:"dijon", n:"Parlamento de Borgoña (Dijon)", corto:"Parl. de Dijon", sede:[5.04,47.32], color:[168,128,44],
   pid:"philippe-berbisey", titular:"Jean de Berbisey", cargo:"Primer Presidente del Parlamento de Dijon",
   emblema:{bg:"#1f3a68",fg:"#e0ba54",acc:"#b02828",pat:"parl-dijon",lema:"Bandado de oro y de azur de seis piezas con bordura de gules"},
   ressort:"Ducado de Borgoña, Bresse, Bugey, Valromey y País de Gex.",
   actitud:"Rica dinastía de magistrados eruditos muy vinculada a la Casa de Borbón-Condé, gobernadores perpetuos de la provincia.",
   uso:"Controla los registros fiscales de una provincia de Estados controlada por Monsieur le Duc."},
  {id:"grenoble", n:"Parlamento del Delfinado (Grenoble)", corto:"Parl. de Grenoble", sede:[5.72,45.19], color:[76,138,76],
   pid:"pierre-grammont", titular:"Pierre-Joseph de Grammont de Montferrand", cargo:"Primer Presidente del Parlamento de Grenoble",
   emblema:{bg:"#e0ba54",fg:"#1f3a68",acc:"#b02828",pat:"parl-grenoble",lema:"Delfín de azur crestado de gules sobre oro · Estatuto Delfinés"},
   ressort:"Todo el Delfinado y el Principado de Orange.",
   actitud:"En ausencia del Gobernador (el Duque de Chartres), el Primer Presidente ejerce por fuero histórico el mando militar y civil de la provincia.",
   uso:"Vigila la frontera con el Reino de Cerdeña-Piamonte (Saboya) y los pasos alpinos."},
  {id:"aix", n:"Parlamento de Provenza (Aix)", corto:"Parl. de Aix", sede:[5.45,43.53], color:[190,110,70],
   pid:"cardin-lebret", titular:"Cardin Le Bret, Conde de Selles", cargo:"Primer Presidente del Parlamento de Aix e Intendente de Provenza",
   emblema:{bg:"#1f3a68",fg:"#e0ba54",acc:"#b02828",pat:"parl-aix",lema:"Flor de lis de oro bajo lambel de tres pendientes de gules de Anjou-Provenza"},
   ressort:"Condado de Provenza, Marsella, Arlés y tierras adyacentes.",
   actitud:"Acaba de salir del bloqueo sanitario por la Gran Peste de Marsella y Aix (1720-1722); su Primer Presidente es a la vez Intendente Real.",
   uso:"Arbitra los pleitos marítimos con Levante y las disputas entre el obispo aceptante de Marsella (Belsunce) y el apelante de Senez (Soanen)."},
  {id:"pau", n:"Parlamento de Navarra (Pau)", corto:"Parl. de Pau", sede:[-0.37,43.30], color:[142,96,72],
   pid:"charles-fenellon-pau", titular:"Gui de Fenoyl", cargo:"Primer Presidente del Parlamento de Navarra en Pau",
   emblema:{bg:"#b02828",fg:"#e0ba54",acc:"#f0ede4",pat:"parl-pau",lema:"Cadenas de oro de Navarra y dos vacas de gules de Bearn"},
   ressort:"Reino de Baja Navarra, Vizcondado de Bearn y país de Soule.",
   actitud:"Guardián de los Fors de Béarn y de la corona separada de Navarra («Rey de Francia y de Navarra»).",
   uso:"Jurisdicción fronteriza con España estrechamente ligada al Duque de Gramont."},
  {id:"metz", n:"Parlamento de Metz", corto:"Parl. de Metz", sede:[6.18,49.12], color:[92,118,154],
   pid:"charles-antoine-metz", titular:"Pierre de Chasot de Congy", cargo:"Primer Presidente del Parlamento de Metz",
   emblema:{bg:"#22252a",fg:"#f0ede4",acc:"#e0ba54",pat:"parl-metz",lema:"Partido de sable y de plata (Ciudad Imperial y Obispado de Metz)"},
   ressort:"Los Tres Obispados (Metz, Toul y Verdún) y el Principado de Sedán.",
   actitud:"Corte estratégica de juristas expertos en derecho feudal germánico frente a los enclaves del Ducado soberano de Lorena.",
   uso:"Resuelve los litigios fronterizos con el Duque Leopoldo de Lorena (cuñado del Regente)."},
  {id:"douai", n:"Parlamento de Flandes (Douai)", corto:"Parl. de Douai", sede:[3.08,50.37], color:[156,112,58],
   pid:"charles-pollinchove", titular:"Charles-Joseph de Pollinchove", cargo:"Primer Presidente del Parlamento de Flandes",
   emblema:{bg:"#e0ba54",fg:"#22252a",acc:"#b02828",pat:"parl-douai",lema:"León rampante de sable sobre campo de oro de Flandes"},
   ressort:"Flandes francés (Lille, Douai, Dunkerque), Henao (Valenciennes) y Cambrésis (Cambrai).",
   actitud:"Leal a la Corona pero celoso de las costumbres flamencas capituladas con Luis XIV.",
   uso:"Cubre también el Arzobispado de Cambrai, sede titular del todopoderoso Cardenal Dubois."},
  {id:"besancon", n:"Parlamento de Besançon", corto:"Parl. de Besançon", sede:[6.02,47.24], color:[84,132,148],
   pid:"jobelot-montureux", titular:"Jean-Ferdinand Jobelot de Montureux", cargo:"Primer Presidente del Parlamento de Besançon",
   emblema:{bg:"#1f3a68",fg:"#e0ba54",acc:"#f0ede4",pat:"parl-besancon",lema:"Sembrado de billetes de oro con león rampante coronado del Franco Condado"},
   ressort:"Todo el Franco Condado de Borgoña.",
   actitud:"Antiguo parlamento hispano-borgoñón trasladado de Dole a Besançon; conserva tradiciones jurídicas de origen imperial.",
   uso:"Controla los feudos comtois y la frontera con los cantones suizos y el condado de Montbéliard."},
  {id:"colmar", n:"Consejo Soberano de Alsacia (Colmar)", corto:"C. Sob. de Colmar", sede:[7.36,48.08], color:[98,148,92],
   pid:"nicolas-corberon", titular:"Nicolas de Corberon, Marqués de Torvilliers", cargo:"Primer Presidente del Consejo Soberano de Alsacia",
   emblema:{bg:"#b02828",fg:"#e0ba54",acc:"#f0ede4",pat:"parl-colmar",lema:"Banda de plata bordada de encaje de oro con seis coronas de Alsacia"},
   ressort:"Alta y Baja Alsacia, Sundgau, Belfort y la Decápolis.",
   actitud:"Tribunal bilingüe (francés y alemán) que aplica las estipulaciones de los Tratados de Westfalia y Ryswick.",
   uso:"Jurisdicción secular que convive en Alsacia con el inmenso poder temporal del Cardenal-Príncipe de Rohan en Estrasburgo."}
];

const PROV_PARL = {
  "ile-de-france":"paris","picardie":"paris","champagne":"paris","maine":"paris","anjou":"paris",
  "touraine":"paris","orleanais":"paris","berry":"paris","nivernais":"paris","poitou":"paris",
  "aunis":"paris","marche":"paris","bourbonnais":"paris","auvergne":"paris","lyonnais":"paris","artois":"paris",
  "normandie":"rouen","bretagne":"rennes","flandre":"douai","trois-eveches":"metz","alsace":"colmar",
  "franche-comte":"besancon","bourgogne":"dijon","dauphine":"grenoble","provence":"aix",
  "languedoc":"toulouse","foix":"toulouse","roussillon":"toulouse",
  "guyenne":"bordeaux","saintonge":"bordeaux","limousin":"bordeaux","bearn":"pau","dombes":"dijon"
};

/* ---------- 3. MAPA DE LAS DIÓCESIS (Con sus emblemas episcopales/cardenalicios y su Obispo/Arzobispo) ---------- */
const DIOCESIS_PARTIDOS = {
  apelante:  {n:"Bastión Apelante (Jansenista / Galicano)", color:[58,118,176],
              desc:"Diócesis cuyos prelados y cabildos rechazan o apelan la bula papal Unigenitus ante un Concilio General, defendiendo las libertades galicanas."},
  aceptante: {n:"Bastión Aceptante (Ultramontano / Constitución)", color:[186,122,44],
              desc:"Diócesis fieles a Roma, a los jesuitas y al Cardenal Dubois, que exigen la sumisión sin reservas a la bula Unigenitus como ley del Reino."},
  moderado:  {n:"Sedes Moderadas o Regalianas (Partido del Silencio)", color:[112,148,108],
              desc:"Diócesis que acatan la declaración de silencio de 1720 del Regente para evitar un cisma abierto en la Iglesia de Francia."}
};

const DIOCESIS_LIST = [
  // ---------- LAS 18 METRÓPOLIS (ARZOBISPADOS DEL REINO EN 1722) ----------
  {id:"dioc-paris", n:"Arzobispado de París (Ducado de Saint-Cloud)", corto:"Arz. de París", lon:2.35, lat:48.86,
   metropoli:true, sufraganeas:"Chartres, Meaux, Orleans, Blois",
   partido:"apelante", galero:"cardenal", par:true, parSacre:false, pid:"louis-antoine-noailles",
   titular:"Cardenal Louis-Antoine de Noailles", cargo:"Arzobispo de París, Duque de Saint-Cloud y Par de Francia",
   emblema:{bg:"#a82828",fg:"#e0ba54",acc:"#1f3a68",galero:"cardenal",pat:"noailles",lema:"Capelo cardenalicio de 30 borlas · Banda de oro sobre gules (Noailles)"},
   rentas:"Más de 120.000 libras anuales y el Ducado-Paría de Saint-Cloud.",
   nota:"Corazón de la resistencia galicana: el Cardenal de Noailles cuenta con el fervor de los párrocos de París, la Sorbona y el Parlamento frente a las presiones de Dubois.",
   conf:"a", fuente:"Gallia Christiana; Almanach royal 1722"},
  {id:"dioc-reims", n:"Arzobispado-Ducado de Reims", corto:"Arz.-D. de Reims", lon:4.03, lat:49.26,
   metropoli:true, sufraganeas:"Soissons, Châlons, Laon, Senlis, Beauvais, Amiens, Noyon, Boulogne",
   partido:"aceptante", galero:"arzobispo", par:true, parSacre:true, pid:"armand-jules-rohan",
   titular:"Armand-Jules de Rohan-Guémené", cargo:"Arzobispo-Duque de Reims, Primer Par Eclesiástico de Francia",
   emblema:{bg:"#1c386b",fg:"#e0ba54",acc:"#b02828",galero:"arzobispo",pat:"rohan",lema:"Manto ducal, cruz arzobispal de doble travesaño y macles de oro de Rohan"},
   rentas:"80.000 libras de renta y primacía sobre todos los Pares de Francia en la consagración real.",
   nota:"Sede de la Santa Ampolla. Nombrado arzobispo-duque el 2 de junio de 1722 (confirmado en julio y consagrado obispo el 23 de agosto) para que un prelado de la Casa de Rohan corone a Luis XV el 25 de octubre.",
   conf:"a", fuente:"Gallia Christiana; Diario de Marais"},
  {id:"dioc-sens", n:"Arzobispado de Sens", corto:"Arz. de Sens", lon:3.28, lat:48.20,
   metropoli:true, sufraganeas:"Troyes, Auxerre, Nevers, Bethléem (Clamecy)",
   partido:"aceptante", galero:"arzobispo", par:false, pid:null,
   titular:"Denis-François Bouthillier de Chavigny", cargo:"Arzobispo de Sens, Primado de las Galias y de Germania (1716–1730)",
   emblema:{bg:"#1f3a68",fg:"#e0ba54",acc:"#f0ede4",galero:"arzobispo",pat:"lis",lema:"Cruz arzobispal · Báculo y tres llaves o cruces de Sens"},
   rentas:"Unas 60.000 libras anuales sobre el valle del Yonne y el Sénonais.",
   nota:"Metrópoli tradicional vecina de París hasta 1622; Chavigny sostiene la Constitución Unigenitus frente a su combativo sufragáneo jansenista de Auxerre (Caylus).",
   conf:"a", fuente:"Gallia Christiana; Almanach royal 1722"},
  {id:"dioc-cambrai", n:"Arzobispado-Ducado de Cambrai", corto:"Arz. de Cambrai", lon:3.23, lat:50.18,
   metropoli:true, sufraganeas:"Arras, Saint-Omer (y en Países Bajos Austriacos: Tournai, Namur)",
   partido:"aceptante", galero:"cardenal", par:false, pid:"dubois",
   titular:"Cardenal Guillaume Dubois", cargo:"Arzobispo-Duque de Cambrai, Príncipe del Sacro Imperio y Primer Ministro de facto",
   emblema:{bg:"#1f3a68",fg:"#e0ba54",acc:"#b02828",galero:"cardenal",pat:"lis",lema:"Capelo rojo cardenalicio (1721) · Silla del antiguo Fénelon"},
   rentas:"Más de 150.000 libras anuales sumadas a siete grandes abadías comendatarias (más de un millón de libras en total).",
   nota:"Ordenado en una sola mañana de 1720 para recibir la riquísima sede de Cambrai; forzó el registro de la bula Unigenitus a cambio de su capelo romano.",
   conf:"a", fuente:"Saint-Simon; Almanach royal 1722"},
  {id:"dioc-rouen", n:"Arzobispado de Ruan (Primado de Normandía)", corto:"Arz. de Ruan", lon:1.09, lat:49.44,
   metropoli:true, sufraganeas:"Bayeux, Avranches, Évreux, Sées, Lisieux, Coutances",
   partido:"moderado", galero:"arzobispo", par:false, pid:null, escudoId:"_vec_rouen",
   refPid:"claude-st-georges-rouen", refLabel:"Futuro arzobispo (oct. 1723): Tressan, hoy obispo de Nantes",
   titular:"Sede vacante (fallecido Armand Bazin de Bezons, 8 oct. 1721)", cargo:"Arzobispado de Ruan · Regimiento provisional por el cabildo en junio de 1722",
   emblema:{bg:"#1f3a68",fg:"#f0ede4",acc:"#e0ba54",galero:"arzobispo",pat:"lis",lema:"Galero arzobispal de 20 borlas verdes · Sede metropolitana vacante en 1722"},
   rentas:"80.000 libras de renta (en régale durante la vacante) y el palacio de Gaillon en Normandía.",
   nota:"Sede vacante en junio de 1722 tras la muerte de Armand Bazin de Bezons (8 oct. 1721). Louis de La Vergne de Tressan, hoy obispo de Nantes y primer limosnero del Regente, será nombrado arzobispo de Ruan en octubre de 1723.",
   conf:"a", fuente:"Gallia Christiana; Almanach royal 1722"},
  {id:"dioc-tours", n:"Arzobispado de Tours", corto:"Arz. de Tours", lon:0.69, lat:47.39,
   metropoli:true, sufraganeas:"Le Mans, Angers, Rennes, Nantes, Quimper, Vannes, Léon, Tréguier, Saint-Brieuc, Saint-Malo, Dol",
   partido:"moderado", galero:"arzobispo", par:false, pid:null,
   titular:"François Blouet de Camilly", cargo:"Arzobispo de Tours (1721–1723)",
   emblema:{bg:"#1f3a68",fg:"#e0ba54",acc:"#f0ede4",galero:"arzobispo",pat:"lis",lema:"Cruz arzobispal de doble travesaño sobre el sembrado de Turena"},
   rentas:"Unas 45.000 libras de renta y jurisdicción metropolitana sobre toda Turena, Anjou, Maine y los nueve obispados de Bretaña.",
   nota:"Prelado moderado promovido en 1721 bajo la Regencia; encabeza la vasta provincia eclesiástica que abarca todo el noroeste bretón y del Loira.",
   conf:"a", fuente:"Gallia Christiana; Almanach royal 1722"},
  {id:"dioc-bourges", n:"Arzobispado de Bourges (Primado de las Aquitanias)", corto:"Arz. de Bourges", lon:2.40, lat:47.08,
   metropoli:true, sufraganeas:"Clermont, Limoges, Le Puy, Tulle, Saint-Flour",
   partido:"aceptante", galero:"cardenal", par:false, pid:null,
   titular:"Cardenal Léon Potier de Gesvres", cargo:"Cardenal-Arzobispo de Bourges, Patriarca y Primado de las Aquitanias (1694–1729)",
   emblema:{bg:"#b02828",fg:"#e0ba54",acc:"#1f3a68",galero:"cardenal",pat:"harcourt",lema:"Capelo cardenalicio (1719) y armas de los Potier de Gesvres"},
   rentas:"Unas 50.000 libras de renta del arzobispado más abadías reales; miembro de la poderosa casa cortesana de Gesvres.",
   nota:"Creado cardenal en 1719 pese a tensiones previas; en 1722 refuerza el peso del partido constitucionalista en el Berry y el Macizo Central.",
   conf:"a", fuente:"Gallia Christiana; Almanach royal 1722"},
  {id:"dioc-lyon", n:"Arzobispado de Lyon (Primado de las Galias)", corto:"Arz. de Lyon", lon:4.83, lat:45.76,
   metropoli:true, sufraganeas:"Autun, Langres, Mâcon, Chalon-sur-Saône",
   partido:"moderado", galero:"arzobispo", par:false, pid:"francois-paul-neufville",
   titular:"François-Paul de Neufville de Villeroy", cargo:"Arzobispo y Conde de Lyon, Primado de las Galias",
   emblema:{bg:"#1f3a68",fg:"#e0ba54",acc:"#b02828",galero:"arzobispo",pat:"villeroy",lema:"Primado de las Galias · Cabrio de oro y cruces ancoradas de Villeroy"},
   rentas:"70.000 libras del Arzobispado de Lyon y de la gran Abadía normanda de Fécamp.",
   nota:"Hijo segundo del Mariscal de Villeroy; gracias a él, la familia Villeroy domina tanto el gobierno militar como la mitra primada de Lyon.",
   conf:"a", fuente:"Gallia Christiana; Almanach royal 1722"},
  {id:"dioc-besancon", n:"Arzobispado de Besanzón", corto:"Arz. de Besanzón", lon:6.02, lat:47.24,
   metropoli:true, sufraganeas:"Belley (y en el Imperio/Suiza: Basilea, Lausana)",
   partido:"moderado", galero:"arzobispo", par:false, pid:null,
   titular:"Sede vacante (fallecido René de Mornay en mayo de 1721)", cargo:"Arzobispado de Besanzón · Príncipe del Sacro Imperio (Grimaldi nombrado en 1723)",
   emblema:{bg:"#b02828",fg:"#e0ba54",acc:"#f0ede4",galero:"arzobispo",pat:"lis",lema:"Cruz arzobispal · Águila imperial y columnas del cabildo de Besanzón"},
   rentas:"Unas 36.000 libras anuales y asiento preeminente en los antiguos Estados comtois.",
   nota:"Tras la muerte de René de Mornay (mayo de 1721), la sede comtoise aguarda la provisión que recaerá en François-Honoré de Grimaldi (1723).",
   conf:"a", fuente:"Gallia Christiana; Archivos del Doubs"},
  {id:"dioc-vienne", n:"Arzobispado de Vienne y Abadía de Cluny", corto:"Arz. de Vienne", lon:4.87, lat:45.52,
   metropoli:true, sufraganeas:"Grenoble, Valence, Die, Viviers, Ginebra-Annecy, Maurienne",
   partido:"aceptante", galero:"arzobispo", par:false, pid:"henri-oswald-auvergne",
   titular:"Henri-Oswald de La Tour d'Auvergne", cargo:"Arzobispo y Conde de Vienne, Abad General de Cluny",
   emblema:{bg:"#b02828",fg:"#e0ba54",acc:"#f0ede4",galero:"arzobispo",pat:"bouillon",lema:"Primado de los Primados · Llaves cruzadas de Cluny y torre de Bouillon"},
   rentas:"Más de 100.000 libras sumando la metrópoli del Delfinado y la Abadía madre de Cluny en Borgoña.",
   nota:"Primo del Duque de Bouillon; corteja asiduamente a Dubois y a los Rohan para obtener el capelo de cardenal.",
   conf:"a", fuente:"Gallia Christiana; Almanach royal 1722"},
  {id:"dioc-bordeaux", n:"Arzobispado de Burdeos (Primado de Aquitania)", corto:"Arz. de Burdeos", lon:-0.57, lat:44.84,
   metropoli:true, sufraganeas:"Agen, Angoulême, Saintes, Poitiers, Périgueux, Condom, Sarlat, La Rochelle, Luçon",
   partido:"moderado", galero:"arzobispo", par:false, pid:"francois-elie-voyer-argenson",
   titular:"François-Élie de Voyer de Paulmy d'Argenson", cargo:"Arzobispo de Burdeos y Primado de Aquitania",
   emblema:{bg:"#1f3a68",fg:"#e0ba54",acc:"#b02828",galero:"arzobispo",pat:"luynes",lema:"León de San Marcos de Venecia y leopardos de oro de Paulmy d'Argenson"},
   rentas:"65.000 libras de renta sobre los diezmos de Guyena y el Médoc.",
   nota:"Hermano del difunto Guarda de los Sellos Marc-René d'Argenson; mantiene la paz religiosa en Aquitania siguiendo las órdenes del Regente.",
   conf:"a", fuente:"Gallia Christiana; Almanach royal 1722"},
  {id:"dioc-auch", n:"Arzobispado de Auch", corto:"Arz. de Auch", lon:0.59, lat:43.65,
   metropoli:true, sufraganeas:"Dax, Lectoure, Comminges, Couserans, Aire, Bazas, Tarbes, Oloron, Lescar, Bayona",
   partido:"aceptante", galero:"arzobispo", par:false, pid:null,
   titular:"Jacques Desmarets", cargo:"Arzobispo de Auch (1713–1725)",
   emblema:{bg:"#1f3a68",fg:"#e0ba54",acc:"#b02828",galero:"arzobispo",pat:"lis",lema:"Galero arzobispal de 20 borlas verdes · Metrópoli de Gascuña y los Pirineos"},
   rentas:"Una de las mitras más ricas del reino (más de 90.000 libras anuales sobre Gascuña y Armagnac).",
   nota:"Sobrino de Colbert y hermano del antiguo Contralor General Nicolas Desmarets; gobierna diez diócesis gasconas, bearnesas y vascas.",
   conf:"a", fuente:"Gallia Christiana; Almanach royal 1722"},
  {id:"dioc-toulouse", n:"Arzobispado de Toulouse", corto:"Arz. de Toulouse", lon:1.44, lat:43.60,
   metropoli:true, sufraganeas:"Montauban, Mirepoix, Lavaur, Rieux, Lombez, Saint-Papoul, Pamiers",
   partido:"moderado", galero:"arzobispo", par:false, pid:null,
   titular:"Henri de Nesmond", cargo:"Arzobispo de Toulouse (confirmado 14 ene. 1722–1727) · Académico Francés",
   emblema:{bg:"#a82a2a",fg:"#e0ba54",acc:"#f0ede4",galero:"arzobispo",pat:"lis",lema:"Cruz arzobispal · Armas del arzobispado de Toulouse"},
   rentas:"Unas 60.000 libras anuales y gran autoridad en el Alto Languedoc y los Estados de la provincia.",
   nota:"Trasladado desde Albi y preconizado para Toulouse en enero de 1722; orador celebrado que apoya la política de apaciguamiento civil.",
   conf:"a", fuente:"Gallia Christiana; CNRS"},
  {id:"dioc-albi", n:"Arzobispado de Albi", corto:"Arz. de Albi", lon:2.15, lat:43.93,
   metropoli:true, sufraganeas:"Castres, Mende, Cahors, Rodez, Vabres",
   partido:"moderado", galero:"arzobispo", par:false, pid:null,
   titular:"Armand-Pierre de La Croix de Castries", cargo:"Arzobispo de Albi (nom. 1719 / conf. 1722–1747)",
   emblema:{bg:"#1f3a68",fg:"#e0ba54",acc:"#f0ede4",galero:"arzobispo",pat:"castries",lema:"Cruz de oro de La Croix de Castries bajo galero arzobispal"},
   rentas:"Unas 95.000 libras anuales, una de las rentas episcopales más cuantiosas del Mediodía.",
   nota:"Trasladado de Tours a Albi (bulas confirmadas en 1722); miembro de la poderosa casa languedociana de Castries y hermano del caballero de honor de Mme d'Orléans.",
   conf:"a", fuente:"Gallia Christiana; Diócesis de Albi"},
  {id:"dioc-narbonne", n:"Arzobispado de Narbona", corto:"Arz. de Narbona", lon:3.00, lat:43.18,
   metropoli:true, sufraganeas:"Carcassonne, Alet, Béziers, Agde, Lodève, Montpellier, Nîmes, Uzès, Saint-Pons, Alès, Elna-Perpiñán",
   partido:"moderado", galero:"arzobispo", par:false, pid:"rene-francois-beaupoil",
   titular:"René-François de Beauvau du Rivau", cargo:"Arzobispo y Primado de Narbona, Presidente de los Estados de Languedoc",
   emblema:{bg:"#f0ede4",fg:"#b02828",acc:"#e0ba54",galero:"arzobispo",pat:"tremoille",lema:"Cuatro leones rampantes de gules armados y coronados de oro (Beauvau)"},
   rentas:"110.000 libras anuales y presidencia nata de los Estados Generales del Languedoc.",
   nota:"Verdadero virrey civil y fiscal del Mediodía; negocia cada año en Montpellier los millones que la provincia entrega al Tesoro Real.",
   conf:"a", fuente:"Gallia Christiana; Almanach royal 1722"},
  {id:"dioc-aix", n:"Arzobispado de Aix", corto:"Arz. de Aix", lon:5.45, lat:43.53,
   metropoli:true, sufraganeas:"Apt, Riez, Fréjus, Gap, Sisteron",
   partido:"aceptante", galero:"arzobispo", par:false, pid:null,
   titular:"Charles-Gaspard-Guillaume de Vintimille du Luc", cargo:"Arzobispo de Aix-en-Provence (1708–1729)",
   emblema:{bg:"#a82a2a",fg:"#e0ba54",acc:"#1f3a68",galero:"arzobispo",pat:"lis",lema:"Cruz arzobispal · Armas de Vintimille du Luc"},
   rentas:"Unas 40.000 libras de renta y presidencia espiritual de la asamblea de los Estados/Comunidades de Provenza.",
   nota:"En 1722 dirige con Cardin Le Bret la reconstrucción administrativa y moral de Provenza tras la Gran Peste; será arzobispo de París en 1729.",
   conf:"a", fuente:"Gallia Christiana; Estados de Provenza 1722"},
  {id:"dioc-arles", n:"Arzobispado de Arlés", corto:"Arz. de Arlés", lon:4.63, lat:43.68,
   metropoli:true, sufraganeas:"Marsella, Saint-Paul-Trois-Châteaux, Tolón, Orange",
   partido:"aceptante", galero:"arzobispo", par:false, pid:null,
   titular:"Jacques II de Forbin-Janson", cargo:"Arzobispo de Arlés, Primado (1711–1741)",
   emblema:{bg:"#1f3a68",fg:"#e0ba54",acc:"#b02828",galero:"arzobispo",pat:"villeroy",lema:"Galero arzobispal · Cabrio de oro y cabezas de leopardo de Forbin-Janson"},
   rentas:"Unas 42.000 libras de renta en la Camarga y el Bajo Ródano.",
   nota:"Firme defensor de la bula Unigenitus en Provenza; hermano y sobrino de diplomáticos cercanos a Roma.",
   conf:"a", fuente:"Gallia Christiana; Almanach royal 1722"},
  {id:"dioc-embrun", n:"Arzobispado-Principado de Embrun", corto:"Arz. de Embrun", lon:6.50, lat:44.56,
   metropoli:true, sufraganeas:"Digne, Grasse, Vence, Glandèves, Senez (y Niza)",
   partido:"aceptante", galero:"arzobispo", par:false, pid:null,
   titular:"Jean-François-Gabriel de Hénin-Liétard", cargo:"Arzobispo-Príncipe de Embrun (1719–1724; toma posesión personal el 28 jun. 1722)",
   emblema:{bg:"#b02828",fg:"#e0ba54",acc:"#f0ede4",galero:"arzobispo",pat:"noailles",lema:"Cruz arzobispal · Banda de oro de Hénin-Liétard"},
   rentas:"Unas 25.000 libras de renta en los Altos Alpes y jurisdicción sobre las sedes provenzales orientales.",
   nota:"Toma posesión solemne el 28 de junio de 1722; su muerte en 1724 abrirá la puerta a Guérin de Tencin y al célebre Concilio de Embrun (1727) contra Soanen.",
   conf:"a", fuente:"Gallia Christiana; Catálogo Hyacinthe Rigaud"},

  // ---------- 18 OBISPADOS CLAVE (PARES ECLESIÁSTICOS, APELANTES Y SEDES CORTESANAS) ----------
  {id:"dioc-laon", n:"Obispado-Ducado de Laon", corto:"Ob.-D. de Laon", lon:3.62, lat:49.56,
   metropoli:false, provinciaEcl:"Reims",
   partido:"moderado", galero:"obispo", par:true, parSacre:true, pid:null,
   titular:"Charles de Saint-Albin", cargo:"Obispo-Duque de Laon (consagrado 26 abr. 1722) · Par Eclesiástico de Francia",
   emblema:{bg:"#1c386b",fg:"#e0ba54",acc:"#f0ede4",galero:"obispo",pat:"orleans",lema:"Manto ducal, galero episcopal y lises brisadas de Saint-Albin (Orleans)"},
   rentas:"Unas 30.000 libras de renta y el rango de segundo par eclesiástico del reino.",
   nota:"Hijo natural del Regente Felipe de Orleans; consagrado expresamente en la primavera de 1722 para llevar la Santa Ampolla en el Sacre de Reims.",
   conf:"a", fuente:"Gallia Christiana; Diario de Barbier"},
  {id:"dioc-langres", n:"Obispado-Ducado de Langres", corto:"Ob.-D. de Langres", lon:5.33, lat:47.86,
   metropoli:false, provinciaEcl:"Lyon",
   partido:"aceptante", galero:"obispo", par:true, parSacre:true, pid:null,
   titular:"François-Louis de Clermont-Tonnerre", cargo:"Obispo-Duque de Langres (1695–1724) · Par Eclesiástico de Francia",
   emblema:{bg:"#b02828",fg:"#e0ba54",acc:"#f0ede4",galero:"obispo",pat:"bouillon",lema:"Llaves cruzadas de plata de Clermont-Tonnerre y galero episcopal"},
   rentas:"Unas 35.000 libras de renta y el privilegio tradicional de portar el cetro real en la consagración.",
   nota:"Tercer par eclesiástico de Francia; combina el espíritu de gran señor con su lealtad constitucionalista.",
   conf:"a", fuente:"Gallia Christiana; Almanach royal 1722"},
  {id:"dioc-beauvais", n:"Obispado-Condado de Beauvais", corto:"Ob.-C. de Beauvais", lon:2.08, lat:49.43,
   metropoli:false, provinciaEcl:"Reims",
   partido:"aceptante", galero:"obispo", par:true, parSacre:true, pid:null,
   titular:"François-Honoré-Antoine de Beauvilliers de Saint-Aignan", cargo:"Obispo-Conde de Beauvais (1713–1728) · Par Eclesiástico de Francia",
   emblema:{bg:"#e8e4d8",fg:"#2d6a3e",acc:"#b02828",galero:"obispo",pat:"harcourt",lema:"Fajas de plata y sinople con merletas de Beauvilliers · Manto condal"},
   rentas:"Unas 55.000 libras anuales; pariente cercano del duque de Saint-Aignan.",
   nota:"Cuarto par eclesiástico (primero de los obispos-condes); porta el manto real en el Sacre de Reims.",
   conf:"a", fuente:"Gallia Christiana; Almanach royal 1722"},
  {id:"dioc-chalons", n:"Obispado-Condado de Châlons-sur-Marne", corto:"Ob.-C. de Châlons", lon:4.36, lat:48.96,
   metropoli:false, provinciaEcl:"Reims",
   partido:"aceptante", galero:"obispo", par:true, parSacre:true, pid:null,
   titular:"Nicolas-Charles de Saulx-Tavannes", cargo:"Obispo-Conde de Châlons (1721–1733) · Par Eclesiástico de Francia",
   emblema:{bg:"#1f3a68",fg:"#e0ba54",acc:"#b02828",galero:"obispo",pat:"lis",lema:"León coronado de oro de Saulx-Tavannes · Manto de Par del Reino"},
   rentas:"Unas 30.000 libras de renta y rango de quinto par eclesiástico.",
   nota:"Nombrado en 1721 para suceder al fallecido hermano del duque de Noailles; portará el anillo real en Reims (octubre de 1722).",
   conf:"a", fuente:"Gallia Christiana; Sacre de Louis XV (1722)"},
  {id:"dioc-noyon", n:"Obispado-Condado de Noyon", corto:"Ob.-C. de Noyon", lon:3.00, lat:49.58,
   metropoli:false, provinciaEcl:"Reims",
   partido:"aceptante", galero:"obispo", par:true, parSacre:true, pid:null,
   titular:"Charles-François de Châteauneuf de Rochebonne", cargo:"Obispo-Conde de Noyon (1707–1731) · Par Eclesiástico de Francia",
   emblema:{bg:"#b02828",fg:"#e0ba54",acc:"#1f3a68",galero:"obispo",pat:"harcourt",lema:"Tres castillos de oro de Rochebonne · Sexto Par Eclesiástico"},
   rentas:"Unas 32.000 libras de renta y rango de sexto par eclesiástico del reino.",
   nota:"Porta el tahalí real en la ceremonia de Reims; firme sostén de la Constitución Unigenitus.",
   conf:"a", fuente:"Gallia Christiana; Almanach royal 1722"},
  {id:"dioc-estrasburgo", n:"Principado-Obispado de Estrasburgo", corto:"Ob. de Estrasburgo", lon:7.75, lat:48.58,
   metropoli:false, provinciaEcl:"Maguncia (diócesis imperial en suelo francés)",
   partido:"aceptante", galero:"cardenal", par:false, pid:"cardenal-rohan",
   titular:"Cardenal Armand-Gaston-Maximilien de Rohan", cargo:"Príncipe-Obispo de Estrasburgo y Gran Limosnero de Francia",
   emblema:{bg:"#b02828",fg:"#e0ba54",acc:"#f0ede4",galero:"cardenal",pat:"rohan",lema:"Capelo cardenalicio, banda de plata de Estrasburgo y nueve macles de Rohan"},
   rentas:"Más de 400.000 libras de renta entre el Principado-Obispado del Rin y la Abadía de Saint-Vaast.",
   nota:"El prelado más magnífico y poderoso de Versalles; como Gran Limosnero dirige la Capilla Real y lidera el partido aceptante en el Consejo de Conciencia.",
   conf:"a", fuente:"Gallia Christiana; Saint-Simon"},
  {id:"dioc-meaux", n:"Obispado de Meaux", corto:"Ob. de Meaux", lon:2.88, lat:48.96,
   metropoli:false, provinciaEcl:"París",
   partido:"aceptante", galero:"cardenal", par:false, pid:"henri-thiard-bissy",
   titular:"Cardenal Henri-Pons de Thiard de Bissy", cargo:"Cardenal y Obispo de Meaux, Abad de Saint-Germain-des-Prés",
   emblema:{bg:"#e0ba54",fg:"#1f3a68",acc:"#b02828",galero:"cardenal",pat:"castries",lema:"Capelo cardenalicio · Tres cangrejos de gules sobre oro (Thiard de Bissy)"},
   rentas:"Obispado de Meaux en Brie y las rentas inmensas de la Abadía Real de Saint-Germain-des-Prés en París.",
   nota:"Sucesor del gran Bossuet en Meaux y martillo implacable de Roma contra los jansenistas y contra el Cardenal de Noailles.",
   conf:"a", fuente:"Gallia Christiana; Almanach royal 1722"},
  {id:"dioc-montpellier", n:"Obispado de Montpellier", corto:"Ob. de Montpellier", lon:3.87, lat:43.61,
   metropoli:false, provinciaEcl:"Narbona",
   partido:"apelante", galero:"obispo", par:false, pid:"charles-joachim-colbert",
   titular:"Charles-Joachim Colbert de Croissy", cargo:"Obispo de Montpellier y Conde de Melgueil",
   emblema:{bg:"#e0ba54",fg:"#1f3a68",acc:"#2d6a3e",galero:"obispo",pat:"antin",lema:"Sierpe (víbora) ondulante de azur en palo sobre campo de oro (Colbert)"},
   rentas:"35.000 libras de renta y autoridad sobre la célebre Universidad de Montpellier.",
   nota:"Sobrino del gran Colbert y uno de los Cuatro Obispos Apelantes de 1717; su Catecismo jansenista desafía abiertamente a Roma.",
   conf:"a", fuente:"Gallia Christiana; Almanach royal 1722"},
  {id:"dioc-senez", n:"Obispado de Senez", corto:"Ob. de Senez", lon:6.41, lat:43.91,
   metropoli:false, provinciaEcl:"Embrun",
   partido:"apelante", galero:"obispo", par:false, pid:"jean-soanen",
   titular:"Jean Soanen", cargo:"Obispo y Señor de Senez · Decano de los Cuatro Obispos Apelantes",
   emblema:{bg:"#1f3a68",fg:"#f0ede4",acc:"#e0ba54",galero:"obispo",pat:"castries",lema:"Perro azul sobre oro y puente de plata sobre rojo"},
   rentas:"Diócesis montañosa y pobre de apenas 10.000 libras en los Alpes de Provenza.",
   nota:"Venerado como un santo padre de la Iglesia primitiva por los jansenistas; ni las amenazas de destierro de Dubois logran doblar su pluma.",
   conf:"a", fuente:"Gallia Christiana; Gazettes 1722"},
  {id:"dioc-boulogne", n:"Obispado de Boulogne-sur-Mer", corto:"Ob. de Boulogne", lon:1.75, lat:50.45,
   metropoli:false, provinciaEcl:"Reims",
   partido:"apelante", galero:"obispo", par:false, pid:null,
   titular:"Pierre de Langle", cargo:"Obispo de Boulogne (1698–1724) · Uno de los Cuatro Obispos Apelantes",
   emblema:{bg:"#1f3a68",fg:"#e0ba54",acc:"#f0ede4",galero:"obispo",pat:"lis",lema:"Galero episcopal verde de 12 borlas · Sede apelante del Boulonnais"},
   rentas:"Unas 20.000 libras anuales en la costa del Canal frente a Inglaterra.",
   nota:"Junto con Soanen (Senez) y Colbert (Montpellier), es uno de los tres obispos apelantes originarios de 1717 aún vivos en junio de 1722.",
   conf:"a", fuente:"Gallia Christiana; BnF"},
  {id:"dioc-auxerre", n:"Obispado de Auxerre", corto:"Ob. de Auxerre", lon:3.57, lat:47.80,
   metropoli:false, provinciaEcl:"Sens",
   partido:"apelante", galero:"obispo", par:false, pid:null,
   titular:"Charles-Daniel-Gabriel de Caylus", cargo:"Obispo de Auxerre (1704–1754) · Referente apelante en Borgoña",
   emblema:{bg:"#1f3a68",fg:"#e0ba54",acc:"#b02828",galero:"obispo",pat:"castries",lema:"Galero episcopal verde · Blasón de Tubières-Grimoard de Caylus"},
   rentas:"Unas 35.000 libras de renta entre Champaña y Borgoña.",
   nota:"Gran señor convertido al rigorismo agustiniano; convierte Auxerre en refugio de sacerdotes perseguidos y seminario del partido apelante.",
   conf:"a", fuente:"Gallia Christiana; Archivos de Yonne"},
  {id:"dioc-marseille", n:"Obispado de Marsella", corto:"Ob. de Marsella", lon:5.38, lat:43.36,
   metropoli:false, provinciaEcl:"Arlés",
   partido:"aceptante", galero:"obispo", par:false, pid:"henri-belsunce",
   titular:"Henri-François-Xavier de Belsunce de Castelmoron", cargo:"Obispo de Marsella",
   emblema:{bg:"#f0ede4",fg:"#1f3a68",acc:"#b02828",galero:"obispo",pat:"larochefoucauld",lema:"Sagrado Corazón de Marsella (1720) y vacas de gules de Belsunce"},
   rentas:"30.000 libras de renta en el gran puerto mediterráneo.",
   nota:"Héroe de la Peste de Marsella (1720-1722); antiguo jesuita y campeón ardiente de la bula Unigenitus frente a su vecino apelante de Senez.",
   conf:"a", fuente:"Gallia Christiana; Memorias de 1720–1722"},
  {id:"dioc-frejus", n:"Obispado de Fréjus (Antiguo feudo espiritual de Fleury)", corto:"Ob. de Fréjus", lon:6.73, lat:43.43,
   metropoli:false, provinciaEcl:"Aix",
   partido:"aceptante", galero:"obispo", par:false, pid:null, escudoId:"dioc-frejus",
   refPid:"fleury", refLabel:"Antiguo obispo (1699–1715): André-Hercule de Fleury, Preceptor del Rey",
   titular:"Joseph-Pierre de Castellane", cargo:"Obispo de Fréjus (1715–1739)",
   emblema:{bg:"#f0ede4",fg:"#1f3a68",acc:"#e0ba54",galero:"obispo",pat:"villeroy",lema:"Armas de Rosset de Fleury (en recuerdo del Preceptor) · Sede regida por Castellane en 1722"},
   rentas:"Unas 20.000 libras de renta sobre el litoral oriental de Provenza.",
   nota:"En junio de 1722 la mitra pertenece a Joseph-Pierre de Castellane, elegido por mediación de André-Hercule de Fleury (preceptor de Luis XV, quien renunció en 1715).",
   conf:"a", fuente:"Gallia Christiana; Almanach royal 1722"},
  {id:"dioc-nantes", n:"Obispado de Nantes", corto:"Ob. de Nantes", lon:-1.55, lat:47.32,
   metropoli:false, provinciaEcl:"Tours",
   partido:"moderado", galero:"obispo", par:false, pid:"claude-st-georges-rouen", escudoId:"dioc-rouen",
   titular:"Louis de La Vergne de Tressan", cargo:"Obispo de Nantes (1717–1723) y Primer Limosnero del Regente",
   emblema:{bg:"#1f3a68",fg:"#f0ede4",acc:"#e0ba54",galero:"obispo",pat:"villeroy",lema:"Galero episcopal · Conchas de gules sobre ondas de plata de Tressan"},
   rentas:"Unas 40.000 libras anuales sobre el gran puerto bretón del Loira.",
   nota:"En junio de 1722 es titular efectivo de Nantes y hombre de confianza del Regente (consagró obispo a Dubois en 1720); en octubre de 1723 pasará a la sede vacante de Ruan.",
   conf:"a", fuente:"Gallia Christiana; Almanach royal 1722"},
  {id:"dioc-rennes", n:"Obispado de Rennes", corto:"Ob. de Rennes", lon:-1.68, lat:48.11,
   metropoli:false, provinciaEcl:"Tours",
   partido:"moderado", galero:"obispo", par:false, pid:null,
   titular:"Christophe-Louis Turpin de Crissé de Sanzay", cargo:"Obispo de Rennes (1712–1723)",
   emblema:{bg:"#1f3a68",fg:"#f0ede4",acc:"#e0ba54",galero:"obispo",pat:"lis",lema:"Armiños de Bretaña y lises de Turpin de Crissé"},
   rentas:"Unas 22.000 libras de renta y presidencia tradicional del clero en los Estados de Bretaña.",
   nota:"Colabora con las autoridades reales tras la Conspiración de Pontcallec y la reconstrucción de Rennes después del incendio de 1720.",
   conf:"a", fuente:"Gallia Christiana; Almanach royal 1722"},
  {id:"dioc-metz", n:"Principado-Obispado de Metz", corto:"Ob. de Metz", lon:6.18, lat:49.12,
   metropoli:false, provinciaEcl:"Tréveris (sufragánea imperial bajo soberanía francesa)",
   partido:"moderado", galero:"obispo", par:false, pid:null,
   titular:"Henri-Charles du Cambout, Duque de Coislin", cargo:"Príncipe-Obispo de Metz (1697–1732) y Primer Limosnero del Rey · Académico Francés",
   emblema:{bg:"#22252a",fg:"#f0ede4",acc:"#e0ba54",galero:"obispo",pat:"harcourt",lema:"Tres fajas ajedrezadas de oro y gules (Coislin) bajo galero episcopal"},
   rentas:"Más de 100.000 libras anuales y gran autoridad en los Tres Obispados frente al Ducado de Lorena.",
   nota:"Sobrino de Pierre de Coislin y dueño de una célebre biblioteca; pese a reservas iniciales ante la bula Unigenitus, evita la ruptura abierta con la Corona.",
   conf:"a", fuente:"Gallia Christiana; Académie française"},
  {id:"dioc-clermont", n:"Obispado de Clermont", corto:"Ob. de Clermont", lon:3.09, lat:45.78,
   metropoli:false, provinciaEcl:"Bourges",
   partido:"moderado", galero:"obispo", par:false, pid:null,
   titular:"Jean-Baptiste Massillon", cargo:"Obispo de Clermont (1717–1742) · Predicador del Petit Carême · Académico Francés",
   emblema:{bg:"#1f3a68",fg:"#e0ba54",acc:"#f0ede4",galero:"obispo",pat:"lis",lema:"Galero episcopal de 12 borlas verdes · Sede auvernesa de Massillon"},
   rentas:"Unas 28.000 libras de renta en Auvernia.",
   nota:"Antiguo oratoriano consagrado en presencia del joven Luis XV tras predicar el célebre Petit Carême en las Tullerías (1718); partidario de la paz religiosa.",
   conf:"a", fuente:"Gallia Christiana; Académie française"},
  {id:"dioc-mirepoix", n:"Obispado de Mirepoix", corto:"Ob. de Mirepoix", lon:1.87, lat:43.09,
   metropoli:false, provinciaEcl:"Toulouse",
   partido:"moderado", galero:"obispo", par:false, pid:null,
   titular:"François-Honoré de Casaubon de Maniban", cargo:"Obispo de Mirepoix (1721–1729)",
   emblema:{bg:"#a82a2a",fg:"#e0ba54",acc:"#f0ede4",galero:"obispo",pat:"lis",lema:"Galero episcopal verde · Antigua sede apelante de La Broue (m. 1720)"},
   rentas:"Unas 24.000 libras anuales en el Lauragais pirenaico.",
   nota:"Sucede al célebre jansenista Pierre de La Broue (uno de los Cuatro Obispos Apelantes de 1717, fallecido en sept. de 1720), marcando el giro hacia la moderación bajo la Regencia.",
   conf:"a", fuente:"Gallia Christiana; Archivos del Hérault"}
];

/* ---------- 4. MAPA DE APANAJES Y PATRIMONIOS DE LA SANGRE ---------- */
const APANAJES_LIST = [
  {id:"ap-orleans", n:"Casa Real de Orleans (Gran Apanaje)", corto:"Apanaje de Orleans", lon:1.90, lat:47.90,
   categoria:"Apanaje real (único vigente en 1722)",
   color:[126,96,192], pid:"felipe-ii-orleans", titular:"Felipe II de Orleans, Duque de Orleans y Regente del Reino",
   cargo:"Sobrino de Luis XIV, Primer Príncipe del Apanaje y Regente de Francia",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#f0ede4",pat:"orleans",crown:"principe",
           blason:"De azur con tres flores de lis de oro, brisado en jefe con un lambel de tres pendientes de plata (Casa Ducal de Orleans)."},
   dominios:"Ducados de Orleans, Chartres, Valois, Nemours y Montpensier; Condados de Blois, Dourdan, Romorantin y Gien; Principado de Joinville; Señoríos de Montargis y Beaujolais. (El Gobierno del Delfinado figura aparte en el Mapa 5).",
   rentas:"Más de 1.200.000 libras de renta apanajista y patrimonial, además del control supremo del Consejo de Regencia y del Palais-Royal.",
   nota:"El único apanaje real propiamente dicho vigente en 1722 (reverible a la Corona si se extinguiera la descendencia masculina); su heredero es Luis de Orleans, Duque de Chartres (18 años)."},
  {id:"ap-conde", n:"Casa de Borbón-Condé (Patrimonio señorial)", corto:"Patrimonio Borbón-Condé", lon:3.33, lat:46.57,
   categoria:"Patrimonio señorial y ducado engagiste (NO apanaje)",
   color:[56,116,188], pid:"luis-enrique-borbon", titular:"Luis Enrique de Borbón-Condé («Monsieur le Duc»)",
   cargo:"Príncipe de la Sangre, Jefe del Consejo de Regencia y Superintendente de la Educación del Rey",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"conde",crown:"principe",
           blason:"De azur con tres flores de lis de oro, brisado en abismo con un bastón recortado de gules puesto en banda (Casa de Borbón-Condé)."},
   dominios:"Ducado engagiste del Borbonés (cedido en 1661 a cambio de Albret), Ducados de Enghien (Chantilly) y Guisa; Condados de Charolais, Dammartin y Clermont-en-Beauvaisis. (El Gobierno de Borgoña figura aparte en el Mapa 5).",
   rentas:"Más de 1.800.000 libras anuales tras redimir todas sus deudas y multiplicar su fortuna especulando con las acciones de John Law.",
   nota:"Principal rival dinástico de la Casa de Orleans; desde Chantilly y el Palais-Bourbon prepara su asalto al puesto de Primer Ministro."},
  {id:"ap-conti", n:"Casa de Borbón-Conti (Patrimonio señorial)", corto:"Patrimonio Borbón-Conti", lon:4.08, lat:44.13,
   categoria:"Patrimonio señorial (NO apanaje)",
   color:[52,152,136], pid:"louis-armand-conti", titular:"Luis Armando II de Borbón, Príncipe de Conti",
   cargo:"Príncipe de la Sangre y Miembro del Consejo de Regencia",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"conti",crown:"principe",
           blason:"De azur con tres flores de lis de oro, brisado con un bastón recortado de gules en abismo y una bordura de gules (Casa de Borbón-Conti)."},
   dominios:"Principado de La Roche-sur-Yon, Baronía de L'Isle-Adam y Pontoise, Condado de Alès y Baronías de Pézenas y Bagnols. (El Gobierno del Poitou figura aparte en el Mapa 5).",
   rentas:"Unas 450.000 libras de rentas señoriales incrementadas con sacos de oro arrancados al Banco de Law antes de su quiebra.",
   nota:"Rama menor de los Condé emparentada por doble matrimonio cruzado con Monsieur le Duc."},
  {id:"ap-maine", n:"Casa de Borbón-Maine (Soberanía y Patrimonio)", corto:"Dombes y Patrimonio Maine", lon:4.92, lat:46.02,
   categoria:"Principado soberano y patrimonio señorial (Legitimados)",
   color:[198,136,48], pid:"duc-du-maine", titular:"Luis Augusto de Borbón, Duque del Maine",
   cargo:"Hijo legitimado de Luis XIV y Mme de Montespan · Príncipe Soberano de Dombes",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"maine",crown:"principe",
           blason:"De azur con tres flores de lis de oro, brisado en abismo con una barra (bastón siniestro) recortada de gules."},
   dominios:"Principado Soberano de Dombes (Trévoux, fuera del reino), Ducado-Paría de Aumale, Condado-Paría de Eu, Principado de Anet y Señorío de Sceaux. (El Gobierno del Languedoc figura aparte en el Mapa 5).",
   rentas:"Más de 800.000 libras de renta y soberanía propia en Dombes.",
   nota:"Degradado del rango de Príncipe de la Sangre en el Lit de Justice de agosto de 1718 y encarcelado tras la Conspiración de Cellamare; vive retirado entre Sceaux y Versalles."},
  {id:"ap-toulouse", n:"Casa de Borbón-Toulouse (Patrimonio señorial)", corto:"Patrimonio Toulouse", lon:-2.40, lat:48.20,
   categoria:"Patrimonio señorial (Legitimados)",
   color:[168,128,64], pid:"comte-de-toulouse", titular:"Luis Alejandro de Borbón, Conde de Toulouse",
   cargo:"Hijo legitimado menor de Luis XIV · Gran Almirante de Francia y Gobernador de Bretaña",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#c42b2b",pat:"toulouse",crown:"principe",
           blason:"De azur con tres flores de lis de oro y barra recortada de gules, puesto sobre las dos anclas cruzadas de Almirante de Francia."},
   dominios:"Ducados-Parías de Rambouillet, Penthièvre, Châteauvillain y Arc-en-Barrois. (El Gobierno de Bretaña figura aparte en el Mapa 5).",
   rentas:"Más de 900.000 libras anuales más los derechos de presa del Almirantazgo de Francia.",
   nota:"Por su prudencia y lealtad durante la Regencia, el Regente le conservó de por vida sus honores personales en la corte."},
  {id:"ap-corona", n:"Dominio Real Directo de la Corona", corto:"Dominio Real (Luis XV)", lon:2.13, lat:48.80,
   categoria:"Dominio inalienable de la Corona",
   color:[176,166,144], pid:"luis-xv", titular:"Luis XV, Rey de Francia y de Navarra",
   cargo:"Rey Cristianísimo (12 años · Consagración prevista en Reims en octubre de 1722)",
   escudo:{bg:"#1c386b",fg:"#e0ba54",acc:"#b02828",pat:"lis",crown:"real",
           blason:"Partido de Francia (de azur con tres flores de lis de oro) y de Navarra (de gules con cadenas de oro en cruz, aspa y orla), timbrado de la Corona Real cerrada."},
   dominios:"París, Versalles, Fontainebleau, Marly, Compiègne, Saint-Germain y las tierras realengas del Reino bajo administración directa de la Corona.",
   rentas:"Impuestos reales de la Talla, Capitación, Gabela de la sal y Granjas Generales del Reino.",
   nota:"Patrimonio inalienable de la Corona custodiado durante la minoría de edad por el Consejo de Regencia."}
];

const PROV_APANAJE = {
  "orleanais":"ap-orleans",
  "bourbonnais":"ap-conde",
  "dombes":"ap-maine"
};

/* ---------- 5. MAPA DE LOS 32 GOBIERNOS PROVINCIALES Y MILITARES (JUNIO DE 1722) ---------- */
const GOBIERNOS_TIPOS = {
  sangre:   {n:"Príncipes de la Sangre y Legitimados", color:[118,92,168]},
  mariscal: {n:"Mariscales de Francia",                color:[168,78,66]},
  nobleza:  {n:"Grandes Casas (Duques, Pares y Príncipes)", color:[74,116,158]}
};

const GOBIERNOS_LIST = [
  {id:"gob-ile-de-france", prov:"ile-de-france", n:"Gobierno de Île-de-France", corto:"Île-de-France", lon:2.62, lat:49.02,
   tipoGob:"nobleza", escudoId:"paris", pid:"henri-louis-evreux", titular:"Henri-Louis de La Tour d'Auvergne, Conde de Évreux",
   cargo:"Gobernador y Teniente General de Île-de-France (1719–1741) · Coronel General de la Caballería",
   nota:"Comprende los bailiazgos en torno a París (excepto la ciudad y vizcondado de París, gobierno propio en manos del duque de Tresmes/Gesvres).",
   conf:"a", fuente:"Almanach royal 1722; CRCV"},
  {id:"gob-picardie", prov:"picardie", n:"Gobierno de Picardía (y Artois)", corto:"Picardía", lon:2.23, lat:49.95,
   tipoGob:"nobleza", pid:null, titular:"Henri de Lorraine, IV Duque de Elbeuf",
   cargo:"Gobernador y Teniente General de Picardía, Boulonnais y Artois (1692–1748)",
   nota:"Gobierno militar de la frontera norte heredado en la casa de Lorena-Elbeuf desde 1692.",
   conf:"a", fuente:"Almanach royal 1722; Conseil du Roi"},
  {id:"gob-artois", prov:"artois", n:"Gobierno de Artois (unido a Picardía)", corto:"Artois", lon:2.37, lat:50.50,
   tipoGob:"nobleza", pid:null, titular:"Henri de Lorraine, IV Duque de Elbeuf",
   cargo:"Gobernador General de Picardía y Artois (hasta 1764)",
   nota:"Artois conserva sus propios Estados provinciales (Pays d'États), pero hasta 1764 comparte gobernador militar con Picardía.",
   conf:"a", fuente:"Almanach royal 1722; Historia de Artois"},
  {id:"gob-flandre", prov:"flandre", n:"Gobierno de Flandes y Henao", corto:"Flandes", lon:3.35, lat:50.23,
   tipoGob:"nobleza", escudoId:"douai", pid:null, titular:"Joseph-Marie de Boufflers, II Duque de Boufflers",
   cargo:"Gobernador General de Flandes y del Henao (1711–1747; menor de edad en 1722)",
   nota:"Heredado de su padre el célebre mariscal de Boufflers en 1711; la defensa efectiva recae en comandantes militares de plaza.",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"gob-champagne", prov:"champagne", n:"Gobierno de Champaña y Brie", corto:"Champaña", lon:4.23, lat:48.73,
   tipoGob:"nobleza", escudoId:"soubise", pid:"hercule-meriadec-rohan", titular:"Hercule-Mériadec de Rohan, Príncipe de Soubise",
   cargo:"Gobernador y Teniente General de Champaña y Brie (1712–1749)",
   nota:"Cargo clave en 1722 por albergar Reims, ciudad donde Luis XV será consagrado en octubre bajo la égida de los Rohan.",
   conf:"a", fuente:"Almanach royal 1722; Conseil du Roi"},
  {id:"gob-trois-eveches", prov:"trois-eveches", n:"Gobierno de los Tres Obispados (Metz, Toul y Verdún)", corto:"Tres Obispados", lon:5.89, lat:49.18,
   tipoGob:"nobleza", escudoId:"metz", pid:null, titular:"Louis de Harlay de Cély, Conde de Saillant",
   cargo:"Gobernador General del País Mesino y Verdunesado (oct. 1712–jul. 1723)",
   nota:"Plazas fuertes fronterizas enclavadas en el Ducado soberano de Lorena; Saillant reside y ejerce mando efectivo hasta su muerte en 1723.",
   conf:"a", fuente:"Almanach royal 1722; Archivos de Metz"},
  {id:"gob-alsace", prov:"alsace", n:"Gobierno General de Alsacia", corto:"Alsacia", lon:7.38, lat:48.32,
   tipoGob:"mariscal", escudoId:"colmar", pid:null, titular:"Mariscal Nicolas Du Blé, Marqués de Huxelles",
   cargo:"Gobernador General de Alta y Baja Alsacia y Estrasburgo (1713–1730)",
   nota:"El mariscal de Huxelles ostenta el gobierno titular en Versalles mientras el conde Léonor-Marie Du Bourg ejerce el mando militar sobre el terreno.",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"gob-normandie", prov:"normandie", n:"Gobierno de Normandía", corto:"Normandía", lon:0.12, lat:49.16,
   tipoGob:"nobleza", escudoId:"rouen", pid:null, titular:"Charles Ier-Frédéric de Montmorency-Luxembourg, Duque de Luxembourg",
   cargo:"Gobernador y Teniente General de Normandía (1691–1726)",
   nota:"Distinto de las tres generalidades fiscales de Ruan, Caen y Alençon; en 1726 le sucederá su hijo Charles II.",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"gob-bretagne", prov:"bretagne", n:"Gobierno de Bretaña", corto:"Bretaña", lon:-2.39, lat:48.07,
   tipoGob:"sangre", escudoId:"rennes", pid:"comte-de-toulouse", titular:"Luis Alejandro de Borbón, Conde de Toulouse",
   cargo:"Gobernador de Bretaña (1695–1737) y Gran Almirante de Francia",
   nota:"El mando militar tras la Conspiración de Pontcallec (1720) se coordina entre Toulouse en Versalles, el mariscal de Montesquiou y el Parlamento de Rennes.",
   conf:"a", fuente:"Almanach royal 1722; Saint-Simon"},
  {id:"gob-maine", prov:"maine", n:"Gobierno de Maine, Perche y Laval", corto:"Maine", lon:0.11, lat:48.05,
   tipoGob:"nobleza", pid:null, titular:"Anne-Jacques de Bullion, Marqués de Fervaques",
   cargo:"Gobernador de Maine, Perche y Condado de Laval (1714–1745)",
   nota:"Gobierno militar transmitido en la casa de Bullion desde principios del siglo XVIII.",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"gob-anjou", prov:"anjou", n:"Gobierno de Anjou", corto:"Anjou", lon:-0.53, lat:47.44,
   tipoGob:"nobleza", pid:null, titular:"Louis de Lorraine, Príncipe de Lambesc",
   cargo:"Gobernador y Teniente General de Anjou (1718–1743)",
   nota:"Sucedió en 1718 a su abuelo Louis de Lorraine, conde de Armagnac; primo del Gran Caballerizo Carlos de Lorena.",
   conf:"a", fuente:"Almanach royal 1722; Conseil du Roi"},
  {id:"gob-touraine", prov:"touraine", n:"Gobierno de Turena", corto:"Turena", lon:0.77, lat:47.36,
   tipoGob:"sangre", pid:"charles-charolais", titular:"Carlos de Borbón-Condé, Conde de Charolais",
   cargo:"Gobernador de Turena (1720–1760)",
   nota:"Nombrado en 1720 a la muerte del marqués de Dangeau; es el hermano menor de Monsieur le Duc.",
   conf:"a", fuente:"Almanach royal 1722; Diario de Marais"},
  {id:"gob-orleanais", prov:"orleanais", n:"Gobierno de Orleanesado, Blaisois y Chartrain", corto:"Orleanesado", lon:1.66, lat:48.07,
   tipoGob:"nobleza", escudoId:"antin", pid:"antin", titular:"Louis-Antoine de Pardaillan de Gondrin, Duque de Antin",
   cargo:"Gobernador y Teniente General de Orleanesado (1707–1736)",
   nota:"Aunque el Ducado de Orleans es apanaje del Regente (Mapa 4), el gobierno militar provincial pertenece desde 1707 al duque de Antin.",
   conf:"a", fuente:"Almanach royal 1722; Saint-Simon"},
  {id:"gob-berry", prov:"berry", n:"Gobierno de Berry", corto:"Berry", lon:2.23, lat:47.03,
   tipoGob:"nobleza", pid:null, titular:"Louis, Marqués de Arpajon",
   cargo:"Gobernador de Berry (ago. 1715–1736) · Teniente General de los Ejércitos",
   nota:"Adquirió el gobierno en agosto de 1715 al dimitir el duque de Noailles.",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"gob-nivernais", prov:"nivernais", n:"Gobierno de Nivernés", corto:"Nivernés", lon:3.40, lat:47.25,
   tipoGob:"nobleza", escudoId:"nevers", pid:"philippe-jules-mancini", titular:"Philippe-Jules-François Mancini, Duque de Nevers",
   cargo:"Gobernador del Nivernés (1707–1768)",
   nota:"Sobrino nieto de Mazarino; en el Nivernés coincide la autoridad señorial del ducado con su cargo de gobernador.",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"gob-bourgogne", prov:"bourgogne", n:"Gobierno de Borgoña y Bresse", corto:"Borgoña", lon:4.77, lat:47.02,
   tipoGob:"sangre", escudoId:"dijon", pid:"luis-enrique-borbon", titular:"Luis Enrique de Borbón-Condé, «Monsieur le Duc»",
   cargo:"Gobernador de Borgoña, Bresse, Bugey, Valromey y Gex (1710–1740)",
   nota:"Gobierno militar ejercido por los príncipes de Condé desde el siglo XVII (distinto de un apanaje real); preside las aperturas de los Estados de Borgoña.",
   conf:"a", fuente:"Almanach royal 1722; Estados de Borgoña"},
  {id:"gob-franche-comte", prov:"franche-comte", n:"Gobierno del Franco Condado de Borgoña", corto:"Franco Condado", lon:6.10, lat:47.18,
   tipoGob:"mariscal", escudoId:"besancon", pid:null, titular:"Mariscal Camille d'Hostun, Duque de Tallard",
   cargo:"Gobernador General del Franco Condado (1704–1728)",
   nota:"Su hijo Marie-Joseph obtuvo la futura sucesión (efectiva en 1728); la provincia guarda la frontera con Suiza y Montbéliard.",
   conf:"a", fuente:"Almanach royal 1722; Archivos de Besanzón"},
  {id:"gob-poitou", prov:"poitou", n:"Gobierno de Poitou", corto:"Poitou", lon:-0.18, lat:46.68,
   tipoGob:"sangre", escudoId:"ap-conti", pid:"louis-armand-conti", titular:"Luis Armando II de Borbón, Príncipe de Conti",
   cargo:"Gobernador de Alto y Bajo Poitou (jun. 1719–1727)",
   nota:"Cargo militar recibido bajo la Regencia en junio de 1719; independiente de sus escasos feudos propios en la provincia.",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"gob-aunis", prov:"aunis", n:"Gobierno de Aunis y La Rochelle", corto:"Aunis", lon:-0.85, lat:46.15,
   tipoGob:"nobleza", pid:null, titular:"Louis-Jean-Baptiste de Goyon de Matignon, Conde de Gacé",
   cargo:"Gobernador de Aunis, La Rochelle, Ré y Oléron (1710/1715–1747)",
   nota:"Heredado por dimisión de su padre el mariscal de Matignon; custodia las islas y los arsenales atlánticos cercanos a Rochefort.",
   conf:"a", fuente:"Almanach royal 1722; Wikimanche"},
  {id:"gob-saintonge", prov:"saintonge", n:"Gobierno de Saintonge y Angoumois", corto:"Saintonge", lon:-0.06, lat:45.63,
   tipoGob:"nobleza", escudoId:"uzes", pid:"jean-charles-uzes", titular:"Jean-Charles de Crussol, VII Duque de Uzès",
   cargo:"Gobernador de Saintonge y Angoumois (1692–1739)",
   nota:"Aunque su ducado-paría se ubica en Languedoc, su gobierno militar provincial radica entre Saintes y Angulema.",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"gob-limousin", prov:"limousin", n:"Gobierno de Lemosín", corto:"Lemosín", lon:1.27, lat:45.70,
   tipoGob:"mariscal", pid:"duc-de-berwick", titular:"Mariscal James Fitz-James, Duque de Berwick",
   cargo:"Gobernador de Alto y Bajo Lemosín (1707–1734)",
   nota:"El vencedor de Almansa acumula este gobierno titular mientras actúa como comandante en jefe de Guyena.",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"gob-marche", prov:"marche", n:"Gobierno de Alta y Baja Marche", corto:"La Marche", lon:1.93, lat:46.25,
   tipoGob:"nobleza", pid:null, titular:"Armand-Louis-François Foucault, Marqués de Saint-Germain-Beaupré",
   cargo:"Gobernador de la Marche (c. 1711–1752)",
   nota:"Cargo conservado de padres a hijos en la familia Foucault de Saint-Germain-Beaupré entre 1630 y 1752.",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"gob-bourbonnais", prov:"bourbonnais", n:"Gobierno del Borbonés", corto:"Borbonés", lon:3.25, lat:46.51,
   tipoGob:"nobleza", pid:null, titular:"Charles-François de La Baume Le Blanc, Marqués de La Vallière",
   cargo:"Gobernador del Borbonés (1698–1739; futuro duque en 1723)",
   nota:"Ejemplo perfecto de separación jurisdiccional: el duque engagiste es Condé (Mapa 4), pero el gobernador militar es La Vallière.",
   conf:"a", fuente:"Almanach royal 1722; Archivos del Allier"},
  {id:"gob-auvergne", prov:"auvergne", n:"Gobierno de Auvernia", corto:"Auvernia", lon:2.84, lat:45.42,
   tipoGob:"nobleza", escudoId:"chateau-thierry", pid:"emmanuel-theodose-bouillon", titular:"Emmanuel-Théodose de La Tour d'Auvergne, Duque de Bouillon",
   cargo:"Gobernador de Alta y Baja Auvernia (1718–1728) · Gran Chambelán de Francia",
   nota:"Patria ancestral de la casa de La Tour d'Auvergne; sucede en el cargo al duque de Bouillon su padre.",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"gob-lyonnais", prov:"lyonnais", n:"Gobierno de Lionesado, Forez y Beaujolais", corto:"Lionesado", lon:4.45, lat:45.61,
   tipoGob:"mariscal", escudoId:"villeroy", pid:"villeroy", titular:"Mariscal François de Neufville, Duque de Villeroy",
   cargo:"Gobernador del Lionesado, Forez y Beaujolais (1685–1730)",
   nota:"Bastión familiar donde los Villeroy controlan simultáneamente el gobierno militar (el Mariscal) y el arzobispado primado (su hijo).",
   conf:"a", fuente:"Almanach royal 1722; Saint-Simon"},
  {id:"gob-dauphine", prov:"dauphine", n:"Gobierno del Delfinado", corto:"Delfinado", lon:5.56, lat:44.96,
   tipoGob:"sangre", escudoId:"grenoble", pid:"luis-orleans-chartres", titular:"Luis de Orleans, Duque de Chartres",
   cargo:"Gobernador General del Delfinado (sept. 1719–1752)",
   nota:"Gobierno militar fronterizo frente a Saboya-Piamonte; en ausencia del gobernador, el Parlamento de Grenoble conserva prerrogativas de mando.",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"gob-guyenne", prov:"guyenne", n:"Gobierno de Guyena y Gascuña", corto:"Guyena", lon:0.33, lat:44.27,
   tipoGob:"sangre", escudoId:"bordeaux", pid:"comte-d-eu", titular:"Luis Carlos de Borbón, Conde de Eu",
   cargo:"Gobernador de Guyena y Gascuña (1712–1755) · Comandante en jefe: Berwick",
   nota:"El gobierno más extenso del reino; fue otorgado al hijo segundo del duque del Maine, aunque la comandancia efectiva está confiada al mariscal de Berwick.",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"gob-bearn", prov:"bearn", n:"Gobierno de Navarra y Bearne", corto:"Navarra y Bearne", lon:-0.61, lat:43.19,
   tipoGob:"nobleza", escudoId:"pau", pid:"antoine-gramont", titular:"Antoine V de Gramont, IV Duque de Gramont",
   cargo:"Gobernador de Navarra y Bearne (1720–1725) · Coronel de los Guardias Francesas",
   nota:"Llave militar de los Pirineos occidentales entre Pau, Saint-Jean-Pied-de-Port y Bayona.",
   conf:"a", fuente:"Almanach royal 1722; Saint-Simon"},
  {id:"gob-foix", prov:"foix", n:"Gobierno del País de Foix", corto:"País de Foix", lon:1.48, lat:42.86,
   tipoGob:"nobleza", pid:null, titular:"Henri-Joseph de Ségur, Marqués de Ségur",
   cargo:"Gobernador y Senescal del País de Foix, Donezan y Andorra (1704–1737)",
   nota:"Suegro de una hija legitimada del Regente; en 1737 le sucederá su hijo Henri-François de Ségur.",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"gob-roussillon", prov:"roussillon", n:"Gobierno del Rosellón", corto:"Rosellón", lon:2.62, lat:42.70,
   tipoGob:"nobleza", escudoId:"maintenon", pid:"noailles", titular:"Adrien-Maurice, III Duque de Noailles",
   cargo:"Gobernador del Rosellón y Ciudadela de Perpiñán (1708–1766; en exilio desde mayo de 1722)",
   nota:"Aunque desterrado de la corte en mayo de 1722 por oponerse a Dubois, conserva la propiedad titular de su gobierno catalán-francés.",
   conf:"a", fuente:"Almanach royal 1722; Saint-Simon"},
  {id:"gob-languedoc", prov:"languedoc", n:"Gobierno General del Languedoc", corto:"Languedoc", lon:3.09, lat:43.96,
   tipoGob:"sangre", escudoId:"toulouse", pid:"duc-du-maine", titular:"Luis Augusto de Borbón, Duque del Maine",
   cargo:"Gobernador General del Languedoc (1682–1736) · Comandante efectivo: Duque de Roquelaure",
   nota:"El Duque del Maine retiene el título de Gobernador, mientras el mariscal-duque de Roquelaure manda sobre el terreno las Cévennes y la provincia.",
   conf:"a", fuente:"Almanach royal 1722; Saint-Simon"},
  {id:"gob-provence", prov:"provence", n:"Gobierno de Provenza", corto:"Provenza", lon:6.10, lat:43.88,
   tipoGob:"mariscal", escudoId:"aix", pid:"villars", titular:"Mariscal Claude-Louis-Hector, Duque de Villars",
   cargo:"Gobernador de Provenza y Puertos del Levante (1712–1734)",
   nota:"Gobierno militar ejercido por el vencedor de Denain mientras el intendente Le Bret coordina el cordón sanitario de la peste (1720–1722).",
   conf:"a", fuente:"Almanach royal 1722"}
];

/* ---------- 6. MAPA DE LAS 30 INTENDENCIAS / GENERALIDADES DE 1722 ---------- */
const INTENDENCIA_REGIMENES = {
  elections:  {n:"Pays d'élections (talla repartida por élus)", color:[70,114,168],
               desc:"Generalidades del corazón del reino donde los oficiales fiscales (élus) reparten la talla bajo tutela estrecha del intendente."},
  etats:      {n:"Pays d'États (Estados provinciales)",          color:[66,144,104],
               desc:"Provincias que conservan sus Estados para votar el «don gratuit» anual y repartir sus propios impuestos."},
  imposition: {n:"Pays d'imposition (fronterizos / conquistados)", color:[182,110,62],
               desc:"Provincias integradas desde el siglo XVII donde el intendente fija y percibe directamente las contribuciones reales."}
};

const INTENDENCIAS_LIST = [
  {id:"int-paris", provs:["ile-de-france"], n:"Generalidad de París", corto:"Gen. París", lon:2.35, lat:48.86,
   regimen:"elections", pid:null, titular:"Armand-Roland Bignon de Blanzy", cargo:"Intendente de París (1709–1724)",
   nota:"Cubre la capital, Versalles y el valle medio del Sena; dividida en 22 elecciones fiscales.",
   conf:"a", fuente:"Almanach royal 1722; Archivos de París"},
  {id:"int-soissons", provs:["ile-de-france","picardie"], n:"Generalidad de Soissons", corto:"Gen. Soissons", lon:3.32, lat:49.38,
   regimen:"elections", pid:null, titular:"Philibert Orry", cargo:"Intendente de Soissons (1722–1726 · futuro Contralor General de 1730)",
   nota:"Abarca el Soissonnais, Valois y Laonnois entre el norte de Île-de-France y el sur de Picardía.",
   conf:"a", fuente:"Almanach royal 1722; Musée du Louvre"},
  {id:"int-amiens", provs:["picardie","artois"], n:"Intendencia de Picardía y Artois (Amiens)", corto:"Int. Amiens", lon:2.30, lat:49.89,
   regimen:"elections", pid:null, titular:"Bernard Chauvelin de Beauséjour", cargo:"Intendente de Picardía y Artois (1718–1731)",
   nota:"Combina las elecciones de Picardía con los Estados provinciales de Artois (agregados a Amiens hasta 1754).",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"int-chalons", provs:["champagne"], n:"Generalidad de Châlons (Champaña)", corto:"Gen. Châlons", lon:4.36, lat:48.96,
   regimen:"elections", pid:null, titular:"César-Charles de Lescalopier", cargo:"Intendente de Champaña en Châlons-sur-Marne (1720–1738)",
   nota:"Vigila las doce elecciones de Champaña, incluyendo el abastecimiento del próximo Sacre de Reims.",
   conf:"a", fuente:"Almanach royal 1722; Archivos de las Ardenas"},
  {id:"int-rouen", provs:["normandie"], n:"Generalidad de Ruan", corto:"Gen. Ruan", lon:1.09, lat:49.44,
   regimen:"elections", pid:null, titular:"Jean-Prosper Goujon de Gasville", cargo:"Intendente de Ruan (1715/1720–1733)",
   nota:"Primera de las tres generalidades en que se divide Normandía; administra el comercio del Sena y El Havre.",
   conf:"a", fuente:"Almanach royal 1722; Cairn"},
  {id:"int-caen", provs:["normandie"], n:"Generalidad de Caen", corto:"Gen. Caen", lon:-0.37, lat:49.18,
   regimen:"elections", pid:null, titular:"François Guynet d'Arthel (en transición hacia Richer d'Aube)", cargo:"Intendente de Caen (1711–1722)",
   nota:"Administra la Baja Normandía occidental (Cotentin, Bessin); en 1722–1723 releva Guynet por Richer d'Aube.",
   conf:"m", fuente:"Almanach royal 1722 (fecha exacta del relevo por verificar)"},
  {id:"int-alencon", provs:["normandie","maine"], n:"Generalidad de Alençon", corto:"Gen. Alençon", lon:0.09, lat:48.43,
   regimen:"elections", pid:null, titular:"Michel-Gervais-Robert de Pommereu", cargo:"Intendente de Alençon (ene. 1720–1726)",
   nota:"Generalidad normando-percherona que une la Normandía central con el Perche (en el gobierno de Maine).",
   conf:"a", fuente:"Almanach royal 1722; Perche-Gouët"},
  {id:"int-tours", provs:["touraine","anjou","maine"], n:"Generalidad de Tours", corto:"Gen. Tours", lon:0.69, lat:47.39,
   regimen:"elections", pid:null, titular:"René Hérault", cargo:"Intendente de Tours (nombrado 23 mar. 1722–1725 · futuro Teniente de Policía de París)",
   nota:"Gran intendencia del Loira medio que engloba Turena, Anjou y el grueso de Maine.",
   conf:"a", fuente:"Almanach royal 1722; SFHP"},
  {id:"int-orleans", provs:["orleanais"], n:"Generalidad de Orleans", corto:"Gen. Orleans", lon:1.90, lat:47.90,
   regimen:"elections", pid:null, titular:"Louis-Guillaume Jubert de Bouville", cargo:"Intendente de Orleans (feb. 1713–ago. 1731)",
   nota:"Supervisa las rentas reales junto a los bailíos del gran apanaje ducal de Orleans.",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"int-bourges", provs:["berry"], n:"Generalidad de Bourges", corto:"Gen. Bourges", lon:2.40, lat:47.08,
   regimen:"elections", pid:null, titular:"Jacques Barberie de Courteille", cargo:"Intendente de Berry en Bourges (1720–1728)",
   nota:"Cubre el centro agrícola y lanero del Berry.",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"int-moulins", provs:["bourbonnais","nivernais","marche"], n:"Generalidad de Moulins", corto:"Gen. Moulins", lon:3.33, lat:46.57,
   regimen:"elections", pid:null, titular:"Marc-Antoine Turgot de Saint-Clair", cargo:"Intendente de Moulins (1713–1723)",
   nota:"Reúne Borbonés, Nivernés y Alta Marche (el futuro economista Turgot nacerá de su linaje).",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"int-poitiers", provs:["poitou"], n:"Generalidad de Poitiers", corto:"Gen. Poitiers", lon:0.34, lat:46.58,
   regimen:"elections", pid:null, titular:"Jean-Baptiste Des Gallois de La Tour", cargo:"Intendente de Poitou (1716–1728)",
   nota:"Vasta circunscripción entre el Loira atlántico y el Marais poitevin.",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"int-larochelle", provs:["aunis","saintonge"], n:"Generalidad de La Rochelle", corto:"Gen. La Rochelle", lon:-1.15, lat:46.16,
   regimen:"elections", pid:null, titular:"Jean-Jacques Amelot de Chaillou", cargo:"Intendente de La Rochelle y de la Marina de Rochefort (1720–1726)",
   nota:"Intendencia clave del comercio atlántico, salinas y arsenal marítimo de Rochefort (cubre Aunis y parte de Saintonge).",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"int-limoges", provs:["limousin","marche","saintonge"], n:"Generalidad de Limoges", corto:"Gen. Limoges", lon:1.26, lat:45.83,
   regimen:"elections", pid:null, titular:"François-Victor Le Tonnelier de Breteuil", cargo:"Intendente de Limoges (mar. 1718–jul. 1723 · futuro Secretario de Guerra)",
   nota:"Cubre Lemosín, Angoumois y Baja Marche en el oeste del Macizo Central.",
   conf:"a", fuente:"Almanach royal 1722; Hyacinthe Rigaud"},
  {id:"int-riom", provs:["auvergne"], n:"Generalidad de Riom (Auvernia)", corto:"Gen. Riom", lon:3.11, lat:45.89,
   regimen:"elections", pid:null, titular:"Gilles Brunet d'Évry", cargo:"Intendente de Auvernia en Riom (1720–1723)",
   nota:"Administra la talla en las montañas de Auvernia; en 1723 pasará a Moulins.",
   conf:"a", fuente:"Almanach royal 1722; Archivos del Puy-de-Dôme"},
  {id:"int-lyon", provs:["lyonnais"], n:"Generalidad de Lyon", corto:"Gen. Lyon", lon:4.83, lat:45.76,
   regimen:"elections", pid:null, titular:"Pierre Poulletier de Nainville", cargo:"Intendente de Lyon (1717–1738)",
   nota:"Vigila los pagos cambiarios y gremios sederos de Lyon; en 1722 inicia el gran Grenier d'abondance.",
   conf:"a", fuente:"Almanach royal 1722; Academia de Lyon"},
  {id:"int-grenoble", provs:["dauphine"], n:"Generalidad de Grenoble (Delfinado)", corto:"Gen. Grenoble", lon:5.72, lat:45.19,
   regimen:"elections", pid:null, titular:"Louis Boucher d'Orsay", cargo:"Intendente del Delfinado en Grenoble (1716–1724)",
   nota:"Provincia de antiguos Estados suspendidos en el siglo XVII, convertida fiscalmente en país de elecciones alpino.",
   conf:"a", fuente:"Almanach royal 1722; MESHS"},
  {id:"int-bordeaux", provs:["guyenne"], n:"Generalidad de Burdeos", corto:"Gen. Burdeos", lon:-0.57, lat:44.84,
   regimen:"elections", pid:null, titular:"Claude Boucher", cargo:"Intendente de Burdeos (1720–1743)",
   nota:"Tras la creación de Auch (1716), conserva Bordelés, Périgord, Agenais y Bazas.",
   conf:"a", fuente:"Almanach royal 1722; PSL"},
  {id:"int-montauban", provs:["guyenne"], n:"Generalidad de Montauban", corto:"Gen. Montauban", lon:1.35, lat:44.02,
   regimen:"elections", pid:null, titular:"Louis-Basile de Bernage de Saint-Maurice", cargo:"Intendente de Montauban (1720–1725)",
   nota:"Cubre Quercy y Rouergue en la Alta Guyena; hijo del intendente de Languedoc.",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"int-auch", provs:["guyenne","bearn"], n:"Generalidad de Auch y Pau", corto:"Int. Auch y Pau", lon:0.59, lat:43.65,
   regimen:"etats", pid:null, titular:"Charles-Nicolas Leclerc de Lesseville", cargo:"Intendente de Auch y Bearne (1718–1731)",
   nota:"Creada en mayo de 1716 al desmembrar Burdeos y Montauban; combina elecciones de Gascuña (Auch) con Estados de Bearne, Navarra y Bigorra.",
   conf:"a", fuente:"Almanach royal 1722; FranceArchives"},
  {id:"int-rennes", provs:["bretagne"], n:"Intendencia de Bretaña (Rennes)", corto:"Int. Rennes", lon:-1.68, lat:48.11,
   regimen:"etats", pid:null, titular:"Paul-Esprit Feydeau de Brou", cargo:"Intendente de Bretaña (1716–1728)",
   nota:"Última provincia del reino en recibir intendente permanente (1689); negocia cada dos años el don gratuit con los combativos Estados de Bretaña y reconstruye Rennes tras el incendio de 1720.",
   conf:"a", fuente:"Almanach royal 1722; FranceArchives"},
  {id:"int-dijon", provs:["bourgogne"], n:"Intendencia de Borgoña (Dijon)", corto:"Int. Dijon", lon:5.04, lat:47.32,
   regimen:"etats", pid:null, titular:"Pierre Arnauld de La Briffe", cargo:"Intendente de Borgoña (1712–1740)",
   nota:"Cubre Borgoña, Bresse, Bugey y Gex coordinándose con los Estados de Borgoña y la casa de Condé.",
   conf:"a", fuente:"Almanach royal 1722; Cairn"},
  {id:"int-montpellier", provs:["languedoc"], n:"Intendencia de Languedoc (Montpellier y Toulouse)", corto:"Int. Languedoc", lon:3.87, lat:43.61,
   regimen:"etats", pid:null, titular:"Louis de Bernage de Saint-Maurice", cargo:"Intendente de Languedoc (1718–1725)",
   nota:"Un único intendente dirige las dos generalidades financieras de Montpellier y Toulouse, tratando anualmente con los Estados de Languedoc.",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"int-aix", provs:["provence"], n:"Intendencia de Provenza (Aix)", corto:"Int. Aix", lon:5.45, lat:43.53,
   regimen:"etats", pid:"cardin-lebret", titular:"Cardin Le Bret, Conde de Selles", cargo:"Intendente de Provenza (1704–1734) y Primer Presidente del Parlamento de Aix",
   nota:"Caso extraordinario de acumulación de la Toga parlamentaria y la Intendencia real; en 1720–1722 dirige los socorros y cuarentenas de la Gran Peste.",
   conf:"a", fuente:"Almanach royal 1722; Saint-Simon"},
  {id:"int-lille", provs:["flandre"], n:"Intendencia de Flandes (Lille)", corto:"Int. Lille", lon:3.08, lat:50.52,
   regimen:"imposition", pid:null, titular:"Antoine-François Méliand", cargo:"Intendente de Flandes Marítimo y Valón en Lille (1718–1730)",
   nota:"Administra las ciudades fortificadas flamencas, los diques, Dunkerque y las capitulaciones fiscales tras Utrecht.",
   conf:"a", fuente:"Almanach royal 1722; Cairn"},
  {id:"int-valenciennes", provs:["flandre"], n:"Intendencia del Henao (Valenciennes)", corto:"Int. Valenciennes", lon:3.52, lat:50.36,
   regimen:"imposition", pid:null, titular:"René-Louis de Voyer de Paulmy, Marqués d'Argenson", cargo:"Intendente del Henao y del País entre Sambre y Mosa (1720–1724)",
   nota:"Hijo del difunto Guarda de los Sellos y futuro Secretario de Asuntos Exteriores (y célebre memorialista).",
   conf:"a", fuente:"Almanach royal 1722; Cairn"},
  {id:"int-metz", provs:["trois-eveches"], n:"Generalidad de Metz (Tres Obispados)", corto:"Gen. Metz", lon:6.18, lat:49.12,
   regimen:"imposition", pid:null, titular:"Jean-François de Creil de Bournezeau", cargo:"Intendente de Metz y Fronteras de Champaña (1721–1754)",
   nota:"Abastece las guarniciones de Metz, Toul, Verdún, Sarrelouis y Sedán en los confines imperiales.",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"int-strasbourg", provs:["alsace"], n:"Intendencia de Alsacia (Estrasburgo)", corto:"Int. Estrasburgo", lon:7.75, lat:48.58,
   regimen:"imposition", pid:null, titular:"Nicolas-Prosper Bauyn d'Angervilliers", cargo:"Intendente de Alsacia (1715–1724 · futuro Secretario de Guerra)",
   nota:"Mantiene el orden fiscal y militar en Estrasburgo y las ciudades libres alsacianas junto al cardenal de Rohan.",
   conf:"a", fuente:"Almanach royal 1722"},
  {id:"int-besancon", provs:["franche-comte"], n:"Intendencia del Franco Condado (Besanzón)", corto:"Int. Besanzón", lon:6.02, lat:47.24,
   regimen:"imposition", pid:null, titular:"Charles Deschiens de La Neuville", cargo:"Intendente de Besanzón (abr. 1718–jul. 1734)",
   nota:"Gobierna las contribuciones de una provincia fronteriza que conserva el derecho de salinas propio tras la conquista de 1674.",
   conf:"a", fuente:"Almanach royal 1722; Archivos del Doubs"},
  {id:"int-perpignan", provs:["roussillon","foix"], n:"Intendencia del Rosellón y País de Foix (Perpiñán)", corto:"Int. Perpiñán", lon:2.90, lat:42.70,
   regimen:"imposition", pid:null, titular:"Jean-Baptiste-Louis Picon, Vizconde d'Andrezel", cargo:"Intendente del Rosellón, Cerdaña y País de Foix (oct. 1716–mar. 1724)",
   nota:"Intendencia militar pirenaica que desde 1716 integra también el Condado de Foix (país de Estados) y la vigilancia fronteriza con España.",
   conf:"a", fuente:"Almanach royal 1722"}
];

/* ---------- FUNCIONES HERÁLDICAS Y DE LÍDERES (SVG Y CANVAS) ---------- */
const CONF_LABELS = {a:"Confirmado", m:"Probable", b:"Dudoso"};

function confFuenteBox(conf, fuente){
  if(!conf&&!fuente)return null;
  const lbl=CONF_LABELS[conf]||conf||"";
  return el("div",{class:"fr-src"},
    lbl?el("span",{class:"tag"},lbl):null,
    fuente?el("span",{},"Fuente: "+fuente):null
  );
}

function buscarLider(pid){
  if(!pid)return {L:null,p:null};
  const L=(typeof LIBRO!=="undefined"&&LIBRO)?LIBRO.find(c=>c.escritorio_id===pid||c.id===pid):null;
  const p=(typeof PERSONAJES!=="undefined"&&PERSONAJES)?PERSONAJES.find(c=>c.id===pid):null;
  return {L,p};
}

function abrirFichaLider(pid){
  const {L,p}=buscarLider(pid);
  if(L&&typeof openFichaL==="function"){openFichaL(L);return}
  if(p&&typeof openFicha==="function"){openFicha(p);return}
}

function liderCard(pid, titularFallback, cargoFallback, extraRef=null){
  const {L,p}=buscarLider(pid);
  const ref=(extraRef&&extraRef.pid)?buscarLider(extraRef.pid):{L:null,p:null};
  const hasRef=Boolean(extraRef&&extraRef.pid&&(ref.L||ref.p));
  const nombre=L?(L.nombre_nac||L.nombre):p?p.nombre:titularFallback;
  const sub=L?(L.titulo_nob||L.titulo||cargoFallback):p?(p.titulo||cargoFallback):cargoFallback;
  const puesto=L?(L.puesto||L.cargo||""):p?(p.situacion_1722||""):"";
  const retratoNode=L&&typeof retratoEl==="function"?retratoEl(L):(typeof bust==="function"?bust():el("span",{},"👤"));

  return el("div",{class:"lider-card"},
    el("div",{class:"lider-av"},retratoNode),
    el("div",{class:"lider-body"},
      el("span",{class:"label"},"Líder / Titular en junio de 1722"),
      el("strong",{class:"lider-nm"},nombre),
      sub?el("div",{class:"note"},sub):null,
      puesto&&puesto!==sub?el("div",{class:"note"},puesto):null,
      hasRef?el("div",{class:"note"},extraRef.label||"Personaje relacionado en Versalles"):null,
      (L||p||hasRef)?el("div",{class:"lider-actions"},
        (L||p)?el("button",{class:"btn sm primary",onclick:()=>abrirFichaLider(pid)},"Abrir ficha en el Libro de Caras →"):null,
        hasRef?el("button",{class:"btn sm",onclick:()=>abrirFichaLider(extraRef.pid)},"Ver personaje relacionado →"):null
      ):null
    )
  );
}

const ARMAS_SEDES = {
  "dioc-boulogne": {
    "denominacion": "Motif du chapitre cathédral Notre-Dame de Boulogne",
    "blason": "El folio 118 del Armorial général de France (Picardía) documenta la Virgen con el Niño en una barca de plata sobre ondas de mar como motivo del cabildo. Para el mapa se representa la barca en oro sobre mar de plata en campo de azur, bajo el timbre uniforme de la sede.",
    "conf": "a",
    "fuente": "https://armorialdefrance.fr/documents/DH/BRUNEMBERT-62-02.JPG"
  },
  "dioc-paris": {
    "blason": "Sembrado de lises de oro sobre azul, con cruz roja.",
    "conf": "a",
    "fuente": "https://commons.wikimedia.org/wiki/File:Arms_of_the_Archdiocese_of_Paris.svg"
  },
  "dioc-reims": {
    "blason": "Cruz roja sobre el sembrado de lises de oro. Variante del armorial de los pares de Francia de 1633.",
    "conf": "a",
    "fuente": "https://commons.wikimedia.org/wiki/File:Blason_de_l%27archev%C3%AAch%C3%A9_de_Reims.svg",
    "autor": "Euryrel",
    "licencia": "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  "dioc-sens": {
    "denominacion": "Armas del Arzobispado de Sens",
    "blason": "De azur, un cabrio de plata acompañado de tres estrellas de espuela (molettes) de oro. Registrado en el Armorial général de France (1696) y en el fondo del arzobispado (AD Yonne, G 176).",
    "conf": "a",
    "fuente": "https://archives.yonne.fr/"
  },
  "dioc-tours": {
    "denominacion": "Armas del Cabildo catedralicio de Saint-Gatien de Tours",
    "blason": "De gules, una cruz patada de plata. Documentado en la heráldica monumental del cabildo metropolitano (claustro de la Psalette).",
    "conf": "a",
    "fuente": "https://saprat.fr/"
  },
  "dioc-lyon": {
    "denominacion": "Armas del Cabildo primacial (Canónigos-Condes de Lyon)",
    "blason": "De gules, un grifo de plata y un león de oro afrontados.",
    "conf": "a",
    "fuente": "https://fr.wikipedia.org/wiki/Chapitre_de_Lyon"
  },
  "dioc-besancon": {
    "denominacion": "Armas históricas de la ciudad y sede imperial de Besanzón",
    "blason": "De oro, un águila de sable sosteniendo en sus garras dos columnas de gules brochant sobre las alas. Registrado para Besanzón en el Armorial général de France (vol. VII, 1696) y asociado a la dignidad de príncipe del Sacro Imperio de su arzobispado.",
    "conf": "m",
    "fuente": "https://armorialdefrance.fr/page_blason.php?ville=1617"
  },
  "dioc-auch": {
    "denominacion": "Cuartel arzobispal de las armas históricas de Auch",
    "blason": "De gules, un cordero pascual de plata con la cabeza vuelta, llevando una bandera de azur cargada de una crucecita de plata (mitad eclesiástica del partido compartido con los condes de Armagnac).",
    "conf": "a",
    "fuente": "https://fr.wikipedia.org/wiki/Armorial_des_communes_du_Gers"
  },
  "dioc-toulouse": {
    "denominacion": "Armas del Cabildo catedralicio de Saint-Étienne de Toulouse",
    "blason": "Medio partido: 1.º de púrpura, cruz trebolada de plata cantonnée de doce piedras de oro; 2.º de gules, cruz de Tolosa vaciada y pometada de doce piezas de oro.",
    "conf": "a",
    "fuente": "https://www.lavieb-aile.com/"
  },
  "dioc-albi": {
    "denominacion": "Armas de la ciudad arzobispal de Albi",
    "blason": "De gules, castillo almenado de cuatro piezas de plata mazonado de sable y sumado de un leopardo de oro, brochant sobre una cruz arzobispal de oro en palo adestrada de un sol de oro y siniestrada de una luna menguante de plata. Registrado en el Armorial général de France (Languedoc, vol. XIV, fol. 305).",
    "conf": "a",
    "fuente": "https://armorialdefrance.fr/page_blason.php?ville=466"
  },
  "dioc-narbonne": {
    "denominacion": "Armas del Cabildo catedralicio de Saint-Just de Narbona",
    "blason": "De plata, una cruz de gules.",
    "conf": "a",
    "fuente": "https://fr.wikipedia.org/wiki/Cath%C3%A9drale_Saint-Just-et-Saint-Pasteur_de_Narbonne"
  },
  "dioc-aix": {
    "denominacion": "Armas del Cabildo catedralicio de Saint-Sauveur de Aix-en-Provence",
    "blason": "De gules, un cordero pascual de plata con nimbo de oro, sosteniendo una cruz larga de oro con estandarte de plata cargado de una crucecita de gules.",
    "conf": "a",
    "fuente": "https://sigilla.irht.cnrs.fr/"
  },
  "dioc-arles": {
    "denominacion": "Armas del Cabildo catedralicio de Saint-Trophime de Arlés",
    "blason": "De oro, un águila de sable al vuelo bajado y coronada de gules.",
    "conf": "a",
    "fuente": "https://commons.wikimedia.org/wiki/Category:Coats_of_arms_of_dioceses_of_France"
  },
  "dioc-embrun": {
    "denominacion": "Armas del Cabildo catedralicio de Embrun",
    "blason": "De gules, palio de plata cargado de cinco crucecitas de sable, acompañado a la diestra de una mitra de plata y a la siniestra de un báculo de oro.",
    "conf": "a",
    "fuente": "http://vexil.prov.free.fr/hautes%20alpes/embrun.html"
  },
  "dioc-laon": {
    "blason": "Escudo partido. A la derecha heráldica, dos llaves de plata y un escudete con lis. A la izquierda, una cruz de plata con báculo rojo sobre un sembrado de lises.",
    "conf": "a",
    "fuente": "https://commons.wikimedia.org/wiki/File:Arms_of_the_diocese_of_Laon.svg",
    "autor": "Euryrel",
    "licencia": "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  "dioc-noyon": {
    "blason": "Dos báculos de plata sobre un sembrado de lises de oro en campo azul.",
    "conf": "a",
    "fuente": "https://commons.wikimedia.org/wiki/File:Arms_of_the_diocese_of_Noyon.svg",
    "autor": "Euryrel",
    "licencia": "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  "dioc-chalons": {
    "blason": "Cruz de plata sobre azul con una lis de oro en cada cuartel.",
    "conf": "a",
    "fuente": "https://commons.wikimedia.org/wiki/File:Blason_Ev%C3%AAques_de_Ch%C3%A2lons-en-Champagne.svg",
    "autor": "Jimmy44",
    "licencia": "https://creativecommons.org/licenses/by/3.0/"
  },
  "dioc-senez": {
    "blason": "Cuartelado. Perro azul vuelto sobre oro y puente de plata de tres arcos sobre rojo.",
    "conf": "a",
    "fuente": "https://commons.wikimedia.org/wiki/File:Arms_of_the_diocese_of_Senez.svg",
    "autor": "Euryrel",
    "licencia": "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  "dioc-langres": {
    "blason": "Aspa roja sobre un sembrado de lises de oro en campo azul.",
    "conf": "a",
    "fuente": "https://www.e-periodica.ch/cntmng?pid=ahe-001%3A1912%3A26%3A%3A335"
  },
  "dioc-beauvais": {
    "blason": "Cruz roja sobre oro, acompañada de cuatro llaves rojas. Documentado en el manuscrito BnF, latin 13314, f. 2.",
    "conf": "a",
    "fuente": "https://bibale.irht.cnrs.fr/23577"
  },
  "dioc-frejus": {
    "blason": "Llave en campo rojo. El cabildo documenta el motivo y el campo. El dorado es una lectura probable de la miniatura.",
    "conf": "m",
    "fuente": "https://www.chapitre-frejus-toulon.fr/index.php/le-chapitre/son-blason"
  },
  "dioc-estrasburgo": {
    "blason": "Banda de plata sobre rojo, documentada en sellos del obispado.",
    "conf": "a",
    "fuente": "https://sigilla.irht.cnrs.fr/152929"
  },
  "dioc-clermont": {
    "blason": "Cruz roja perfilada de oro, con cuatro lises de oro sobre azul. Armas del poder temporal del obispo.",
    "conf": "a",
    "fuente": "https://www.armorialdefrance.fr/page_blason.php?ville=6166"
  },
  "dioc-cambrai": {
    "blason": "Tres leones azules sobre oro. Armas del condado episcopal de Cambrai recogidas en armoriales medievales.",
    "conf": "a",
    "fuente": "https://armorial.dk/ordinary/families20.pdf",
    "autor": "Thom.Lanaud (colores adaptados)",
    "original": "https://commons.wikimedia.org/wiki/File:Blason_pays_fr_Cambresis.svg",
    "licencia": "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  "dioc-meaux": {
    "denominacion": "Armas del Cabildo catedralicio de Saint-Étienne de Meaux",
    "blason": "De azur, una flor de lis de oro.",
    "conf": "a",
    "fuente": "https://www.geneanet.org/"
  },
  "dioc-auxerre": {
    "denominacion": "Armas del Cabildo catedralicio de Saint-Étienne de Auxerre",
    "blason": "De azur, tres piedras (cailloux) de plata en alusión al martirio de san Esteban.",
    "conf": "a",
    "fuente": "https://archives.yonne.fr/"
  },
  "dioc-nantes": {
    "denominacion": "Armas del Cabildo catedralicio de Saint-Pierre-et-Saint-Paul de Nantes",
    "blason": "De azur, una llave de oro y una espada de plata guarnecida de oro pasadas en aspa.",
    "conf": "a",
    "fuente": "https://fr.wikipedia.org/wiki/Dioc%C3%A8se_de_Nantes"
  },
  "dioc-rennes": {
    "denominacion": "Armas del Cabildo catedralicio de Saint-Pierre de Rennes",
    "blason": "De azur, dos llaves de plata pasadas en aspa.",
    "conf": "a",
    "fuente": "https://www.infobretagne.com/"
  },
  "dioc-metz": {
    "denominacion": "Armas del Principado-Obispado y diócesis de Metz",
    "blason": "De gules, un dextróquero de carnación vestido de azur moviente de una nube de plata empuñando una espada alta de plata guarnecida de oro, acostada de dos piedras (cailloux) de oro.",
    "conf": "a",
    "fuente": "https://fr.wikipedia.org/wiki/Principaut%C3%A9_%C3%A9piscopale_de_Metz"
  },
  "dioc-mirepoix": {
    "denominacion": "Armas del Cabildo catedralicio de Mirepoix",
    "blason": "De azur, tres peces de plata puestos en faja uno sobre otro. Registrado en el armorial de 1697.",
    "conf": "a",
    "fuente": "https://www.histariege.com/"
  }
};

const SEDES_RANGO_PAR = {
  "dioc-reims": "duque",
  "dioc-paris": "duque",
  "dioc-laon": "duque",
  "dioc-langres": "duque",
  "dioc-beauvais": "conde",
  "dioc-chalons": "conde",
  "dioc-noyon": "conde"
};

function renderSedeConCapelo(d, imgSrc, alt){
  const met = !!d.metropoli;
  const rango = SEDES_RANGO_PAR[d.id] || null;
  const borla = (bx, by) => `<g transform="translate(${bx} ${by})"><circle cx="0" cy="0" r="1.8" fill="#1f7a38" stroke="#134420" stroke-width="0.65"/><path d="M-1.3 1.4L-3.6 8.2H3.6L1.3 1.4Z" fill="#1f7a38" stroke="#134420" stroke-width="0.65" stroke-linejoin="round"/><line x1="-1.5" y1="8.2" x2="-1.8" y2="10.8" stroke="#134420" stroke-width="0.7"/><line x1="0" y1="8.2" x2="0" y2="11.1" stroke="#134420" stroke-width="0.7"/><line x1="1.5" y1="8.2" x2="1.8" y2="10.8" stroke="#134420" stroke-width="0.7"/></g>`;
  const borlas = met ? [
    [32,74],[24,95],[38,95],[16,116],[28,116],[40,116],[8,137],[19,137],[30,137],[41,137],
    [148,74],[142,95],[156,95],[140,116],[152,116],[164,116],[139,137],[150,137],[161,137],[172,137]
  ] : [
    [32,78],[23,102],[37,102],[14,126],[27,126],[40,126],
    [148,78],[143,102],[157,102],[140,126],[153,126],[166,126]
  ];
  const cordones = met
    ? `<path d="M58 49C44 58 35 64 32 74M32 74C28 84 25 89 24 95M32 74C35 84 37 89 38 95M24 95C20 105 17 110 16 116M24 95C27 105 28 110 28 116M38 95C39 105 40 110 40 116M16 116C12 126 9 131 8 137M16 116C18 126 19 131 19 137M28 116C29 126 30 131 30 137M40 116C41 126 41 131 41 137" fill="none" stroke="#1f7a38" stroke-width="1.35" stroke-linecap="round"/>
       <path d="M122 49C136 58 145 64 148 74M148 74C145 84 143 89 142 95M148 74C152 84 155 89 156 95M142 95C141 105 140 110 140 116M156 95C153 105 152 110 152 116M156 95C160 105 163 110 164 116M140 116C139 126 139 131 139 137M152 116C151 126 150 131 150 137M164 116C162 126 161 131 161 137M164 116C168 126 171 131 172 137" fill="none" stroke="#1f7a38" stroke-width="1.35" stroke-linecap="round"/>`
    : `<path d="M58 49C44 58 35 66 32 78M32 78C27 89 24 96 23 102M32 78C35 89 37 96 37 102M23 102C18 113 15 120 14 126M23 102C26 113 27 120 27 126M37 102C39 113 40 120 40 126" fill="none" stroke="#1f7a38" stroke-width="1.4" stroke-linecap="round"/>
       <path d="M122 49C136 58 145 66 148 78M148 78C145 89 143 96 143 102M148 78C153 89 156 96 157 102M143 102C141 113 140 120 140 126M157 102C154 113 153 120 153 126M157 102C162 113 165 120 166 126" fill="none" stroke="#1f7a38" stroke-width="1.4" stroke-linecap="round"/>`;
  const cruz = `<g fill="#d8ae42" stroke="#5c4512" stroke-width="1.05" stroke-linejoin="round">
    <rect x="87.5" y="7" width="5" height="72"/>
    <circle cx="90" cy="6.5" r="3.2"/>
    ${met ? `<rect x="74" y="15" width="32" height="4.4"/><circle cx="73.5" cy="17.2" r="2.6"/><circle cx="106.5" cy="17.2" r="2.6"/>
             <rect x="67" y="25" width="46" height="4.8"/><circle cx="66.5" cy="27.4" r="2.8"/><circle cx="113.5" cy="27.4" r="2.8"/>`
          : `<rect x="69" y="21" width="42" height="4.8"/><circle cx="68.5" cy="23.4" r="2.8"/><circle cx="111.5" cy="23.4" r="2.8"/>`}
  </g>`;
  const corona = rango === "duque"
    ? `<g fill="#e0ba54" stroke="#5c4512" stroke-width="1" stroke-linejoin="round">
        <path d="M62 69L59 58L66 63L74 55L81 63L90 54L99 63L106 55L114 63L121 58L118 69Z"/>
        <rect x="61" y="68" width="58" height="5.5" rx="1.4"/>
      </g>`
    : rango === "conde"
    ? `<g fill="#e0ba54" stroke="#5c4512" stroke-width="0.95" stroke-linejoin="round">
        <path d="M65 68L63 60M76 68L75 59M90 68V58M104 68L105 59M115 68L117 60" stroke="#5c4512" stroke-width="1.6"/>
        <circle cx="63" cy="59" r="2.5"/><circle cx="75" cy="58" r="2.5"/><circle cx="90" cy="57" r="2.7"/><circle cx="105" cy="58" r="2.5"/><circle cx="117" cy="59" r="2.5"/>
        <rect x="63" y="67.5" width="54" height="5.5" rx="1.4"/>
      </g>`
    : "";
  const capelo = `<g fill="#1f7a38" stroke="#134420" stroke-width="1.25" stroke-linejoin="round">
    <path d="M71 45C71 30 109 30 109 45Z"/>
    <path d="M43 45Q90 38 137 45C141 46 140 50 135 50Q90 45 45 50C40 50 39 46 43 45Z"/>
    <path d="M71 42Q90 40 109 42" fill="none" stroke="#134420" stroke-width="1.6"/>
  </g>`;
  const wrap = el("div", {class:"escudo-svg-wrap sede-timbre-wrap", style:"padding:4px"});
  const box = el("div", {style:"position:relative;width:90px;height:102px"});
  box.innerHTML = `<svg viewBox="0 0 180 185" width="90" height="102" style="position:absolute;inset:0;width:100%;height:100%" aria-hidden="true">
    ${cruz}
    ${cordones}
    ${borlas.map(([bx,by])=>borla(bx,by)).join("")}
    ${capelo}
    ${corona}
  </svg>`;
  const shieldBox = el("div", {style:"position:absolute;left:26.7%;top:40%;width:46.7%;height:52.4%;display:grid;place-items:center"});
  shieldBox.append(el("img", {src:imgSrc, alt}));
  box.append(shieldBox);
  wrap.append(box);
  return wrap;
}

let ESCUDOS_DB = {src:{}, commons:{}, imgs:{}};
const imagenesSedes = {};
const ESCUDOS_DUCADOS = {}, ESCUDOS_DUCADOS_IMG = {}, ESCUDOS_DUCADOS_LOCAL = {};
const SEDES_PROPIOS = {}, SEDES_LOCAL = {};
let cargaSedes;
async function cargarImgObj(src){
  if(!src)return null;
  const img=new Image();
  img.src=src;
  try{await img.decode();return img}
  catch(e){
    return new Promise(res=>{
      if(img.complete&&img.naturalWidth)return res(img);
      img.onload=()=>res(img);
      img.onerror=()=>res(null);
    });
  }
}
function refrescarFranciaUI(){
  const cv=document.querySelector("#map-box canvas");
  if(cv&&typeof current!=="undefined"&&current==="francia"&&!$("#game")?.hidden){
    renderProvinces(cv);
    showFranciaSelection();
  }
  if(typeof current!=="undefined"&&current==="titulos"&&!$("#game")?.hidden&&typeof drawTitulos==="function"){
    drawTitulos();
  }
  if(typeof refrescarFichaCasa==="function"&&!$("#ficha")?.hidden){
    refrescarFichaCasa();
  }
}
async function setEscudosDucados(mapObj){
  for(const k of Object.keys(ESCUDOS_DUCADOS)){delete ESCUDOS_DUCADOS[k];delete ESCUDOS_DUCADOS_IMG[k]}
  if(mapObj&&typeof mapObj==="object"){
    await Promise.all(Object.entries(mapObj).map(async([k,src])=>{
      if(!src)return;
      ESCUDOS_DUCADOS[k]=src;
      const im=await cargarImgObj(src);
      if(im&&ESCUDOS_DUCADOS[k]===src)ESCUDOS_DUCADOS_IMG[k]=im;
    }));
  }
  refrescarFranciaUI();
}
async function setEscudoDucadoPropio(id,src){
  if(!id)return;
  if(src){
    ESCUDOS_DUCADOS[id]=src;
    const im=await cargarImgObj(src);
    if(im&&ESCUDOS_DUCADOS[id]===src)ESCUDOS_DUCADOS_IMG[id]=im;
  }else{
    delete ESCUDOS_DUCADOS[id];
    delete ESCUDOS_DUCADOS_IMG[id];
  }
  refrescarFranciaUI();
}
async function setEscudosSedesPropios(mapObj){
  for(const k of Object.keys(SEDES_PROPIOS))delete SEDES_PROPIOS[k];
  if(mapObj&&typeof mapObj==="object"){
    await Promise.all(Object.entries(mapObj).map(async([slug,src])=>{
      if(!src)return;
      SEDES_PROPIOS[slug]=src;
      const im=await cargarImgObj(src);
      if(im&&SEDES_PROPIOS[slug]===src)imagenesSedes["dioc-"+slug]=im;
    }));
  }
  refrescarFranciaUI();
}
async function setEscudoSedePropio(slug,src){
  if(!slug)return;
  const fullId="dioc-"+slug;
  if(src){
    SEDES_PROPIOS[slug]=src;
    const im=await cargarImgObj(src);
    if(im&&SEDES_PROPIOS[slug]===src)imagenesSedes[fullId]=im;
  }else{
    delete SEDES_PROPIOS[slug];
    if(ARMAS_SEDES[fullId]){
      const im=await cargarImgObj("datos/sedes/"+slug+".svg");
      if(im&&!SEDES_PROPIOS[slug])imagenesSedes[fullId]=im;
      else if(!SEDES_PROPIOS[slug])delete imagenesSedes[fullId];
    }else{
      delete imagenesSedes[fullId];
    }
  }
  refrescarFranciaUI();
}
function cargarArmasSedes(){
  if(cargaSedes)return cargaSedes;
  cargaSedes=Promise.all([...Object.keys(ARMAS_SEDES), "dioc-pendiente"].map(async id=>{
    const slug=id.slice(5);
    if(SEDES_PROPIOS[slug])return;
    const img=new Image();
    img.src="datos/sedes/"+slug+".svg";
    try{await img.decode();if(!SEDES_PROPIOS[slug])imagenesSedes[id]=img}
    catch(e){console.warn("No se pudo cargar el escudo de la sede",id)}
  }));
  return cargaSedes;
}

async function loadEscudosDB(){
  if(Object.keys(ESCUDOS_DB.src).length) return;
  try{
    const r = await fetch("datos/escudos.json");
    if(!r.ok) return;
    const j = await r.json();
    const files = j.files || {}, map = j.map || {};
    const imgCache = {};
    await Promise.all(Object.entries(files).map(([cname, dataUri])=>{
      return new Promise(res=>{
        const im = new Image();
        im.onload = ()=>{imgCache[cname]=im; res()};
        im.onerror = ()=>res();
        im.src = dataUri;
      });
    }));
    Object.entries(map).forEach(([eid, cname])=>{
      ESCUDOS_DB.commons[eid] = cname;
      ESCUDOS_DB.src[eid] = files[cname];
      if(imgCache[cname]) ESCUDOS_DB.imgs[eid] = imgCache[cname];
    });
  }catch(e){}
}

function govEmblem(g){
  const col=GOBIERNOS_TIPOS[g.tipoGob]?.color||[74,116,158];
  const bg="#"+col.map(v=>Math.max(24,Math.round(v*0.58)).toString(16).padStart(2,"0")).join("");
  return {bg, fg:"#e0ba54", acc:"#f0ede4", pat:"gob"};
}

function intEmblem(it){
  const col=INTENDENCIA_REGIMENES[it.regimen]?.color||[70,114,168];
  const bg="#"+col.map(v=>Math.max(24,Math.round(v*0.58)).toString(16).padStart(2,"0")).join("");
  return {bg, fg:"#f0ede4", acc:"#e0ba54", pat:"int"};
}

function renderEscudoSVG(esc, tipoMapa="ducados", entityId=""){
  if(entityId && ESCUDOS_DUCADOS[entityId]){
    const wrap=el("div",{class:"escudo-svg-wrap"});
    wrap.append(el("img",{src:ESCUDOS_DUCADOS[entityId],alt:"Escudo propio de "+entityId,title:"Escudo propio (subido)",style:"width:68px;height:76px;object-fit:contain;display:block"}));
    return wrap;
  }
  if(entityId && ESCUDOS_DB.src[entityId]){
    const wrap=el("div",{class:"escudo-svg-wrap"});
    const cname=ESCUDOS_DB.commons[entityId]||"";
    const img=el("img",{src:ESCUDOS_DB.src[entityId],alt:"Escudo heráldico ("+cname+")",title:"Wikimedia Commons · Projet Blasons: "+cname,style:"width:68px;height:76px;object-fit:contain;display:block"});
    wrap.append(img);
    return wrap;
  }
  const bg=esc.bg||"#1c386b", fg=esc.fg||"#e0ba54", acc=esc.acc||"#b02828", pat=esc.pat||"lis";
  let charges="";
  if(tipoMapa==="gobiernos"||pat==="gob"){
    // Bastones de mando cruzados de Gobierno Provincial
    charges+=`<line x1="23" y1="21" x2="45" y2="43" stroke="${fg}" stroke-width="4.2" stroke-linecap="round"/>
              <line x1="45" y1="21" x2="23" y2="43" stroke="${fg}" stroke-width="4.2" stroke-linecap="round"/>
              <circle cx="34" cy="32" r="3.4" fill="${acc}" stroke="#222" stroke-width="0.6"/>`;
  } else if(tipoMapa==="intendencias"||pat==="int"){
    // Pergamino y pluma real de la Intendencia
    charges+=`<rect x="24" y="20" width="20" height="24" rx="2" fill="${fg}" stroke="#222" stroke-width="0.7"/>
              <path d="M28 26h12M28 31h12M28 36h8" stroke="${bg}" stroke-width="1.6"/>
              <circle cx="40" cy="40" r="3.2" fill="${acc}"/>`;
  } else if(pat==="lis"||pat==="orleans"||pat==="conde"||pat==="conti"||pat==="maine"||pat==="toulouse"){
    charges+=`<g fill="${fg}" stroke="#111" stroke-width="0.4">
      <path d="M24 22c0-4 2.2-6.5 2.2-6.5S28.4 18 28.4 22c2-1.8 4.4-1.2 4.4 1s-2.8 2.8-5.2 2.2l1.2 4h-5.2l1.2-4c-2.4.6-5.2 0-5.2-2.2s2.4-2.8 4.4-1z"/>
      <path d="M40 22c0-4 2.2-6.5 2.2-6.5S44.4 18 44.4 22c2-1.8 4.4-1.2 4.4 1s-2.8 2.8-5.2 2.2l1.2 4h-5.2l1.2-4c-2.4.6-5.2 0-5.2-2.2s2.4-2.8 4.4-1z"/>
      <path d="M32 37c0-4 2.2-6.5 2.2-6.5S36.4 33 36.4 37c2-1.8 4.4-1.2 4.4 1s-2.8 2.8-5.2 2.2l1.2 4h-5.2l1.2-4c-2.4.6-5.2 0-5.2-2.2s2.4-2.8 4.4-1z"/>
    </g>`;
    if(pat==="orleans") charges+=`<path d="M20 15h28v3h-4v4h-4v-4h-4v4h-4v-4h-4v4h-4v-4h-4z" fill="#f4f2ec" stroke="#222" stroke-width="0.5"/>`;
    if(pat==="conde") charges+=`<line x1="27" y1="24" x2="41" y2="38" stroke="#d42c2c" stroke-width="4" stroke-linecap="square"/>`;
    if(pat==="conti") charges+=`<line x1="27" y1="24" x2="41" y2="38" stroke="#d42c2c" stroke-width="3.6"/><path d="M17 14h34v18c0 12-17 20-17 20S17 44 17 32z" fill="none" stroke="#d42c2c" stroke-width="3"/>`;
    if(pat==="maine"||pat==="toulouse") charges+=`<line x1="41" y1="24" x2="27" y2="38" stroke="#d42c2c" stroke-width="4" stroke-linecap="square"/>`;
  } else if(pat==="rohan"){
    const pts=[[24,20],[34,20],[44,20],[24,30],[34,30],[44,30],[27,40],[34,40],[41,40]];
    charges+=pts.map(([x,y])=>`<polygon points="${x},${y-4} ${x+3.5},${y} ${x},${y+4} ${x-3.5},${y}" fill="none" stroke="${fg}" stroke-width="1.8"/>`).join("");
  } else if(pat==="bouillon"){
    charges+=`<path d="M17 28h34M34 14v38" stroke="${fg}" stroke-width="6"/><rect x="29" y="22" width="10" height="12" fill="${acc}" stroke="#222" stroke-width="0.7"/>`;
  } else if(pat==="mazarin"){
    charges+=`<rect x="32" y="16" width="4" height="28" fill="${fg}"/><path d="M36 18c6 0 7 6 0 7z" fill="#f0ede4"/><rect x="17" y="27" width="34" height="6" fill="${acc}"/><circle cx="24" cy="30" r="2" fill="${fg}"/><circle cx="34" cy="30" r="2" fill="${fg}"/><circle cx="44" cy="30" r="2" fill="${fg}"/>`;
  } else if(pat==="harcourt"||pat==="mortemart"){
    charges+=`<rect x="17" y="21" width="34" height="6" fill="${fg}"/><rect x="17" y="33" width="34" height="6" fill="${fg}"/>`;
  } else if(pat==="noailles"){
    charges+=`<polygon points="17,18 24,14 51,41 44,46" fill="${fg}"/>`;
  } else if(pat==="villeroy"||pat==="richelieu"||pat==="tremoille"||pat==="villars"||pat==="larochefoucauld"){
    charges+=`<path d="M19 36 L34 21 L49 36" fill="none" stroke="${fg}" stroke-width="4.5"/><path d="M21 44 L34 31 L47 44" fill="none" stroke="${acc}" stroke-width="3"/>`;
  } else if(pat==="stsimon"||pat==="castries"){
    charges+=`<path d="M17 29h34M34 14v38" stroke="${fg}" stroke-width="6.5"/>`;
  } else {
    charges+=`<path d="M34 18l4 9 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z" fill="${fg}" stroke="#222" stroke-width="0.6"/>`;
  }

  let timbre="";
  if(tipoMapa==="parlamentos"){
    timbre=`<rect x="21" y="3" width="26" height="8" rx="1.5" fill="#1b1d22" stroke="#e0ba54" stroke-width="1.5"/>
            <line x1="21" y1="6" x2="47" y2="6" stroke="#e0ba54" stroke-width="1.6"/>
            <path d="M24 28h20M34 19v18M25 28l-3 7h6zM43 28l-3 7h6z" stroke="#fff" stroke-width="1.5" fill="${fg}"/>`;
  } else if(tipoMapa==="diocesis"){
    const gCol=esc.galero==="cardenal"?"#b8242c":"#2b7a44";
    timbre=`<line x1="34" y1="1" x2="34" y2="14" stroke="#d4af37" stroke-width="2"/>
            <line x1="29" y1="4" x2="39" y2="4" stroke="#d4af37" stroke-width="1.8"/>
            ${esc.galero!=="obispo"?`<line x1="27" y1="7.5" x2="41" y2="7.5" stroke="#d4af37" stroke-width="1.8"/>`:""}
            <ellipse cx="34" cy="10" rx="16" ry="3.2" fill="${gCol}" stroke="#222" stroke-width="0.7"/>
            <path d="M24 10 A10 5 0 0 1 44 10" fill="${gCol}" stroke="#222" stroke-width="0.7"/>
            <circle cx="13" cy="18" r="2.2" fill="${gCol}"/><circle cx="11" cy="24" r="2.2" fill="${gCol}"/><circle cx="15" cy="24" r="2.2" fill="${gCol}"/>
            <circle cx="55" cy="18" r="2.2" fill="${gCol}"/><circle cx="53" cy="24" r="2.2" fill="${gCol}"/><circle cx="57" cy="24" r="2.2" fill="${gCol}"/>`;
  } else if(tipoMapa==="intendencias"){
    timbre=`<rect x="22" y="6" width="24" height="6" rx="2" fill="#e0ba54" stroke="#3a2a0a" stroke-width="0.9"/>
            <circle cx="34" cy="5" r="3" fill="#1c386b" stroke="#e0ba54" stroke-width="0.8"/>`;
  } else {
    timbre=`<path d="M20 12l2-6 6 4 6-6 6 6 6-4 2 6z" fill="#e0ba54" stroke="#3a2a0a" stroke-width="0.9"/>
            <rect x="20" y="11" width="28" height="2.8" rx="1" fill="#d4af37" stroke="#3a2a0a" stroke-width="0.7"/>`;
  }

  const wrap=el("div",{class:"escudo-svg-wrap"});
  wrap.innerHTML=`<svg viewBox="0 0 68 60" width="66" height="58" aria-hidden="true">
    <defs><clipPath id="sh-${pat}-${tipoMapa}"><path d="M17 14h34v18c0 13-17 21-17 21S17 45 17 32z"/></clipPath></defs>
    <path d="M17 14h34v18c0 13-17 21-17 21S17 45 17 32z" fill="${bg}"/>
    <g clip-path="url(#sh-${pat}-${tipoMapa})">${charges}</g>
    <path d="M17 14h34v18c0 13-17 21-17 21S17 45 17 32z" fill="none" stroke="#d4af37" stroke-width="2"/>
    ${timbre}
  </svg>`;
  return wrap;
}

/* Escala de escudos y nombres: el lienzo se dibuja a la resolución del mapa base y el navegador lo reduce;
   FR_K compensa para que se lean al tamaño en pantalla (se calcula en cada dibujo). */
let FR_K=1.6;
function drawEmblemCanvas(ctx, x, y, esc, tipoMapa, isSel, entityId=""){
  ctx.save();
  ctx.translate(x, y);
  const dense=tipoMapa==="gobiernos"||tipoMapa==="intendencias"||(tipoMapa==="diocesis"&&esc?.sub);
  const baseSc=dense?0.78:tipoMapa==="diocesis"?0.92:1.0;
  const sc=(isSel?1.28:baseSc)*FR_K;
  ctx.scale(sc, sc);

  if(isSel){
    ctx.beginPath(); ctx.arc(0,0,19,0,7);
    ctx.fillStyle="rgba(218,176,76,0.38)"; ctx.fill();
    ctx.strokeStyle="#9e2a28"; ctx.lineWidth=2.4; ctx.stroke();
  }

  const wikiImg = tipoMapa==="diocesis" ? (imagenesSedes[entityId]||imagenesSedes["dioc-pendiente"]) : (ESCUDOS_DUCADOS_IMG[entityId]||ESCUDOS_DB.imgs[entityId]);
  if(wikiImg){
    const iw=wikiImg.naturalWidth||100, ih=wikiImg.naturalHeight||115;
    if(tipoMapa==="diocesis"){
      const met=!!esc?.metropoli, rango=esc?.rangoPar||null;
      const targetH=25, targetW=Math.round(targetH*(iw/ih));
      const sy=3.5;
      // Cruz procesional dorada detrás del capelo y escudo
      ctx.strokeStyle="#5c4512"; ctx.fillStyle="#d8ae42";
      ctx.lineWidth=2.2; ctx.beginPath(); ctx.moveTo(0,-21); ctx.lineTo(0,-8); ctx.stroke();
      ctx.strokeStyle="#d8ae42"; ctx.lineWidth=1.4;
      ctx.beginPath(); ctx.moveTo(0,-21); ctx.lineTo(0,-8);
      if(met){
        ctx.moveTo(-4,-18.8); ctx.lineTo(4,-18.8);
        ctx.moveTo(-5.5,-16.4); ctx.lineTo(5.5,-16.4);
      }else{
        ctx.moveTo(-4.6,-17.6); ctx.lineTo(4.6,-17.6);
      }
      ctx.stroke();
      // Corona ducal o condal para los 7 Pares Eclesiásticos
      if(rango){
        ctx.fillStyle="#e0ba54"; ctx.strokeStyle="#4b380f"; ctx.lineWidth=0.65;
        ctx.fillRect(-7.5,-11.2,15,2.3); ctx.strokeRect(-7.5,-11.2,15,2.3);
        if(rango==="duque"){
          ctx.beginPath();
          ctx.moveTo(-7,-11.2); ctx.lineTo(-7.5,-13.8); ctx.lineTo(-4.5,-12.2);
          ctx.lineTo(0,-14.3); ctx.lineTo(4.5,-12.2); ctx.lineTo(7.5,-13.8); ctx.lineTo(7,-11.2);
          ctx.closePath(); ctx.fill(); ctx.stroke();
        }else{
          [-5.8,-2.9,0,2.9,5.8].forEach(px=>{
            ctx.beginPath(); ctx.arc(px,-12.4,1.15,0,7); ctx.fill(); ctx.stroke();
          });
        }
      }
      // Capelo verde y borlas (20 en arzobispados, 12 en obispados)
      const gy=rango?-15.2:-12.8;
      ctx.strokeStyle="#1f7a38"; ctx.lineWidth=0.95;
      ctx.beginPath();
      ctx.moveTo(-7.5,gy+0.8); ctx.quadraticCurveTo(-13,gy+4,-14.2,gy+9);
      ctx.moveTo(7.5,gy+0.8); ctx.quadraticCurveTo(13,gy+4,14.2,gy+9);
      ctx.stroke();
      const tiers=met?[-5.5,-2.3,0.9,4.1]:[-4.5,-0.8,2.9];
      ctx.fillStyle="#1f7a38";
      tiers.forEach((ty,ti)=>{
        const count=ti===0?1:ti===1?2:ti===2?2:3;
        for(let k=0;k<count;k++){
          const dx=12.2+(k-(count-1)/2)*2.3;
          ctx.beginPath(); ctx.arc(-dx,ty,1.05,0,7); ctx.fill();
          ctx.beginPath(); ctx.arc(dx,ty,1.05,0,7); ctx.fill();
        }
      });
      ctx.fillStyle="#1f7a38"; ctx.strokeStyle="#134420"; ctx.lineWidth=0.7;
      ctx.beginPath(); ctx.ellipse(0,gy,11.2,2.1,0,0,7); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(0,gy-0.3,4.8,Math.PI,0); ctx.fill(); ctx.stroke();
      // Escudo limpio debajo del timbre
      ctx.shadowColor="rgba(0,0,0,0.38)";
      ctx.shadowBlur=4;
      ctx.shadowOffsetY=1.5;
      ctx.drawImage(wikiImg, -targetW/2, -targetH/2+sy, targetW, targetH);
      ctx.restore();
      return;
    }
    const targetH = tipoMapa==="ducados" ? 28 : 31;
    const targetW = Math.round(targetH * (iw / ih));
    ctx.shadowColor="rgba(0,0,0,0.38)";
    ctx.shadowBlur=4;
    ctx.shadowOffsetY=1.5;
    ctx.drawImage(wikiImg, -targetW/2, -targetH/2, targetW, targetH);
    ctx.restore();
    return;
  }

  ctx.beginPath();
  ctx.moveTo(-10,-9); ctx.lineTo(10,-9); ctx.lineTo(10,2);
  ctx.bezierCurveTo(10,10, 0,14, 0,14);
  ctx.bezierCurveTo(0,14, -10,10, -10,2);
  ctx.closePath();
  ctx.fillStyle=esc?.bg||"#1c386b";
  ctx.fill();

  const fg=esc?.fg||"#e0ba54", acc=esc?.acc||"#b02828", pat=esc?.pat||"lis";
  ctx.save();
  ctx.clip();
  ctx.fillStyle=fg; ctx.strokeStyle=fg;
  if(tipoMapa==="gobiernos"||pat==="gob"){
    ctx.lineWidth=2.4; ctx.lineCap="round";
    ctx.beginPath(); ctx.moveTo(-6,-5); ctx.lineTo(6,7); ctx.moveTo(6,-5); ctx.lineTo(-6,7); ctx.stroke();
  } else if(tipoMapa==="intendencias"||pat==="int"){
    ctx.fillStyle=fg; ctx.fillRect(-5.5,-6,11,13);
    ctx.strokeStyle=esc?.bg||"#1c386b"; ctx.lineWidth=1.4;
    ctx.beginPath(); ctx.moveTo(-3,-2); ctx.lineTo(3,-2); ctx.moveTo(-3,1.5); ctx.lineTo(3,1.5); ctx.stroke();
  } else if(tipoMapa==="parlamentos"){
    ctx.lineWidth=1.8;
    ctx.beginPath(); ctx.moveTo(-6,0); ctx.lineTo(6,0); ctx.moveTo(0,-5); ctx.lineTo(0,8); ctx.stroke();
    ctx.beginPath(); ctx.arc(-5,4,2.2,0,Math.PI); ctx.arc(5,4,2.2,0,Math.PI); ctx.fill();
  } else if(tipoMapa==="diocesis"){
    ctx.lineWidth=2.2;
    ctx.beginPath(); ctx.moveTo(0,-7); ctx.lineTo(0,10); ctx.moveTo(-5,-2); ctx.lineTo(5,-2);
    if(esc?.galero!=="obispo"){ctx.moveTo(-4,3); ctx.lineTo(4,3);}
    ctx.stroke();
  } else if(pat==="rohan"){
    ctx.lineWidth=1.4;
    [[-4,-3],[4,-3],[0,4]].forEach(([cx,cy])=>{
      ctx.beginPath(); ctx.moveTo(cx,cy-3); ctx.lineTo(cx+2.5,cy); ctx.lineTo(cx,cy+3); ctx.lineTo(cx-2.5,cy); ctx.closePath(); ctx.stroke();
    });
  } else if(pat==="harcourt"||pat==="mortemart"){
    ctx.fillRect(-10,-5,20,3.2); ctx.fillRect(-10,2,20,3.2);
  } else if(pat==="noailles"){
    ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(-9,-8); ctx.lineTo(9,10); ctx.stroke();
  } else if(pat==="bouillon"||pat==="stsimon"||pat==="castries"){
    ctx.lineWidth=3.5; ctx.beginPath(); ctx.moveTo(-10,1); ctx.lineTo(10,1); ctx.moveTo(0,-9); ctx.lineTo(0,13); ctx.stroke();
  } else if(pat==="villeroy"||pat==="richelieu"||pat==="tremoille"||pat==="villars"||pat==="larochefoucauld"){
    ctx.lineWidth=2.6; ctx.beginPath(); ctx.moveTo(-8,6); ctx.lineTo(0,-3); ctx.lineTo(8,6); ctx.stroke();
  } else {
    [[-4.2,-3],[4.2,-3],[0,5]].forEach(([lx,ly])=>{
      ctx.beginPath(); ctx.arc(lx,ly,2.1,0,7); ctx.fill();
    });
    if(pat==="orleans"){ctx.fillStyle="#fff"; ctx.fillRect(-7,-7.5,14,2.2);}
    if(pat==="conde"||pat==="conti"){ctx.strokeStyle="#d62828"; ctx.lineWidth=2.4; ctx.beginPath(); ctx.moveTo(-4,-2); ctx.lineTo(4,5); ctx.stroke();}
    if(pat==="maine"||pat==="toulouse"){ctx.strokeStyle="#d62828"; ctx.lineWidth=2.4; ctx.beginPath(); ctx.moveTo(4,-2); ctx.lineTo(-4,5); ctx.stroke();}
  }
  ctx.restore();

  ctx.beginPath();
  ctx.moveTo(-10,-9); ctx.lineTo(10,-9); ctx.lineTo(10,2);
  ctx.bezierCurveTo(10,10, 0,14, 0,14);
  ctx.bezierCurveTo(0,14, -10,10, -10,2);
  ctx.closePath();
  ctx.strokeStyle=isSel?"#9e2a28":"#d8b254";
  ctx.lineWidth=isSel?2.2:1.6;
  ctx.stroke();

  if(tipoMapa==="parlamentos"){
    ctx.fillStyle="#181a20"; ctx.strokeStyle="#e0ba54"; ctx.lineWidth=1.2;
    ctx.fillRect(-7,-14,14,4.5); ctx.strokeRect(-7,-14,14,4.5);
  } else if(tipoMapa==="diocesis"){
    const gCol=esc?.galero==="cardenal"?"#c4242c":"#2b7a44";
    ctx.fillStyle=gCol;
    ctx.beginPath(); ctx.ellipse(0,-11.5,10,2.4,0,0,7); ctx.fill();
    ctx.beginPath(); ctx.arc(-11,-4,2,0,7); ctx.arc(11,-4,2,0,7); ctx.fill();
  } else if(tipoMapa==="intendencias"){
    ctx.fillStyle="#e0ba54"; ctx.strokeStyle="#3a2a0a"; ctx.lineWidth=0.9;
    ctx.fillRect(-7,-12.5,14,3.5); ctx.strokeRect(-7,-12.5,14,3.5);
  } else {
    ctx.fillStyle="#e0ba54"; ctx.strokeStyle="#3a2a0a"; ctx.lineWidth=0.9;
    ctx.beginPath();
    ctx.moveTo(-8,-9); ctx.lineTo(-7,-13.5); ctx.lineTo(-3.5,-11); ctx.lineTo(0,-14.5);
    ctx.lineTo(3.5,-11); ctx.lineTo(7,-13.5); ctx.lineTo(8,-9); ctx.closePath();
    ctx.fill(); ctx.stroke();
  }
  ctx.restore();
}

/* ---------- PREPROCESADO DEL MAPA DE FRANCIA EN SUS 6 DIVISIONES ---------- */
async function loadProvinces(){
  if(provState)return provState;
  await Promise.all([loadEscudosDB(),cargarArmasSedes()]);
  if(provState)return provState;
  const img=new Image(); img.src=PROV_PNG; await img.decode();
  const w=img.width,h=img.height,c=document.createElement("canvas"); c.width=w;c.height=h;
  const x=c.getContext("2d",{willReadFrequently:true}); x.drawImage(img,0,0);
  const px=x.getImageData(0,0,w,h).data, key=new Map(PROV_DEF.map((r,i)=>[(r.r<<16)|(r.g<<8)|r.b,i]));
  const ids=new Int16Array(w*h); for(let i=0;i<w*h;i++){const k=(px[i*4]<<16)|(px[i*4+1]<<8)|px[i*4+2];ids[i]=key.has(k)?key.get(k):-1}
  const edge=new Uint8Array(w*h); for(let y=0;y<h;y++)for(let x2=0;x2<w;x2++){const i=y*w+x2,a=ids[i];if((x2+1<w&&ids[i+1]!==a)||(y+1<h&&ids[i+w]!==a))edge[i]=1}
  const s=w/((GEO.lon1-GEO.lon0)*GEO.k);
  const P=([lo,la])=>[(lo-GEO.lon0)*GEO.k*s,(GEO.lat1-la)*s];

  const provIdxBySlug=Object.fromEntries(PROV_DEF.map((r,i)=>[r.id,i]));
  const feudoPts=FEUDOS.map(f=>{const [fx,fy]=P([f.lon,f.lat]);return {fx,fy,pi:provIdxBySlug[f.prov]??-1}});
  const parlPts=PARLAMENTOS_LIST.map(p=>{const [fx,fy]=P(p.sede);return {fx,fy}});
  const diocPts=DIOCESIS_LIST.map(d=>{const [fx,fy]=P([d.lon,d.lat]);return {fx,fy}});
  const apanPts=APANAJES_LIST.map(a=>{const [fx,fy]=P([a.lon,a.lat]);return {fx,fy}});
  const gobPts=GOBIERNOS_LIST.map(g=>{const [fx,fy]=P([g.lon,g.lat]);return {fx,fy,pi:provIdxBySlug[g.prov]??-1}});
  const intPts=INTENDENCIAS_LIST.map(it=>{const [fx,fy]=P([it.lon,it.lat]);return {fx,fy}});

  const parlIdxById=Object.fromEntries(PARLAMENTOS_LIST.map((p,i)=>[p.id,i]));
  const apanIdxById=Object.fromEntries(APANAJES_LIST.map((a,i)=>[a.id,i]));
  const gobIdxByProv=Object.fromEntries(GOBIERNOS_LIST.map((g,i)=>[g.prov,i]));

  const feudoIds=new Int16Array(w*h).fill(-1);
  const parlIds=new Int16Array(w*h).fill(-1);
  const diocIds=new Int16Array(w*h).fill(-1);
  const apanIds=new Int16Array(w*h).fill(-1);
  const gobIds=new Int16Array(w*h).fill(-1);
  const intIds=new Int16Array(w*h).fill(-1);

  const feudosByProv=PROV_DEF.map(()=>[]);
  feudoPts.forEach((pt,fi)=>{if(pt.pi>=0)feudosByProv[pt.pi].push(fi)});

  const intsByProv=PROV_DEF.map(()=>[]);
  INTENDENCIAS_LIST.forEach((it,ii)=>(it.provs||[]).forEach(pid=>{const pi=provIdxBySlug[pid];if(pi>=0)intsByProv[pi].push(ii)}));

  const nearest=(pts,pool,x2,y)=>{
    let best=pool[0], bestD=1e12;
    for(let k=0;k<pool.length;k++){
      const idx=pool[k], pt=pts[idx], dx=x2-pt.fx, dy=y-pt.fy, d2=dx*dx+dy*dy;
      if(d2<bestD){bestD=d2;best=idx}
    }
    return best;
  };
  const allFeudos=FEUDOS.map((_,k)=>k), allDiocs=DIOCESIS_LIST.map((_,k)=>k), allInts=INTENDENCIAS_LIST.map((_,k)=>k);

  for(let y=0;y<h;y++){
    const row=y*w;
    for(let x2=0;x2<w;x2++){
      const i=row+x2, pId=ids[i]; if(pId<=0)continue;
      const r=PROV_DEF[pId]; if(r.tipo==="fuera")continue;

      // 1. Ducado / Señorío más cercano (priorizando los de su misma provincia histórica)
      const cand=feudosByProv[pId];
      feudoIds[i]=cand&&cand.length===1?cand[0]:nearest(feudoPts,(cand&&cand.length)?cand:allFeudos,x2,y);

      // 2. Parlamento soberano de esa provincia
      const pk=PROV_PARL[r.id];
      if(pk!==undefined&&parlIdxById[pk]!==undefined) parlIds[i]=parlIdxById[pk];

      // 3. Diócesis / Provincia eclesiástica más cercana
      if(r.tipo==="reino") diocIds[i]=nearest(diocPts,allDiocs,x2,y);

      // 4. Apanaje o Patrimonio de la Sangre (separado de los gobiernos)
      const fClan=FEUDOS[feudoIds[i]]?.clan;
      const apSlug=fClan==="orleans"?"ap-orleans":fClan==="conde"?"ap-conde":fClan==="conti"?"ap-conti":
                   fClan==="maine"?"ap-maine":fClan==="toulouse"?"ap-toulouse":(PROV_APANAJE[r.id]||"ap-corona");
      apanIds[i]=apanIdxById[apSlug]??5;

      // 5. Gobierno provincial / militar (1:1 con provincias del reino)
      if(r.tipo==="reino"&&gobIdxByProv[r.id]!==undefined) gobIds[i]=gobIdxByProv[r.id];

      // 6. Intendencia / Generalidad (Voronoi restringido por provincia)
      if(r.tipo==="reino"){
        const ic=intsByProv[pId];
        intIds[i]=ic&&ic.length===1?ic[0]:nearest(intPts,(ic&&ic.length)?ic:allInts,x2,y);
      }
    }
  }

  const feudoEdge=new Uint8Array(w*h), parlEdge=new Uint8Array(w*h), diocEdge=new Uint8Array(w*h);
  const apanEdge=new Uint8Array(w*h), gobEdge=new Uint8Array(w*h), intEdge=new Uint8Array(w*h);
  const coastEdge=new Uint8Array(w*h);

  for(let y=0;y<h-1;y++){
    const row=y*w;
    for(let x2=0;x2<w-1;x2++){
      const i=row+x2, pA=ids[i], pR=ids[i+1], pD=ids[i+w];
      if((pA>0)!==(pR>0)||(pA>0)!==(pD>0)) coastEdge[i]=1;
      if(pA<=0)continue;
      if(pR>0&&feudoIds[i]!==feudoIds[i+1]||pD>0&&feudoIds[i]!==feudoIds[i+w]) feudoEdge[i]=1;
      if(pR>0&&parlIds[i]!==parlIds[i+1]||pD>0&&parlIds[i]!==parlIds[i+w]) parlEdge[i]=1;
      if(pR>0&&diocIds[i]!==diocIds[i+1]||pD>0&&diocIds[i]!==diocIds[i+w]) diocEdge[i]=1;
      if(pR>0&&apanIds[i]!==apanIds[i+1]||pD>0&&apanIds[i]!==apanIds[i+w]) apanEdge[i]=1;
      if(pR>0&&gobIds[i]!==gobIds[i+1]||pD>0&&gobIds[i]!==gobIds[i+w]) gobEdge[i]=1;
      if(pR>0&&intIds[i]!==intIds[i+1]||pD>0&&intIds[i]!==intIds[i+w]) intEdge[i]=1;
    }
  }

  provState={w,h,ids,edge,coastEdge,P,feudoIds,feudoEdge,feudoPts,parlIds,parlEdge,parlPts,diocIds,diocEdge,diocPts,apanIds,apanEdge,apanPts,gobIds,gobEdge,gobPts,intIds,intEdge,intPts};
  return provState;
}

function tokenRGB(name){const v=getComputedStyle(document.documentElement).getPropertyValue(name).trim();const m=v.match(/^#([0-9a-f]{6})$/i);if(m){const n=parseInt(m[1],16);return [n>>16,(n>>8)&255,n&255]}return [128,128,128]}
function hexRGB(hex){const m=String(hex||"").match(/^#([0-9a-f]{6})$/i);if(m){const n=parseInt(m[1],16);return [n>>16,(n>>8)&255,n&255]}return [140,120,90]}
const mix=(a,b,t)=>a.map((v,i)=>Math.round(v*(1-t)+b[i]*t));

function drawLabelSafe(ctx, text, x, y, w, h, offsetX, baseDy, isSel, placed, paper, ink){
  ctx.textAlign="left"; ctx.textBaseline="middle";
  const tw=ctx.measureText(text).width;
  const fh=parseFloat(ctx.font)||12*FR_K;
  const lx=x+offsetX+tw>w-8 ? x-offsetX-tw : x+offsetX;
  const shifts=isSel?[baseDy]:[baseDy, baseDy-fh*1.15, baseDy+fh*1.15];
  for(const dy of shifts){
    const ly=Math.max(fh*0.7, Math.min(h-fh*0.7, y+dy));
    const box={x0:lx-3, y0:ly-fh*0.58, x1:lx+tw+3, y1:ly+fh*0.58};
    const collide=placed.some(b=>!(box.x1<b.x0||box.x0>b.x1||box.y1<b.y0||box.y0>b.y1));
    if(isSel || !collide){
      ctx.strokeStyle=`rgba(${paper},.93)`; ctx.lineWidth=(isSel?3.8:3.1)*FR_K;
      ctx.strokeText(text,lx,ly);
      ctx.fillStyle=isSel?"#8b2020":`rgb(${ink})`;
      ctx.fillText(text,lx,ly);
      placed.push(box);
      return;
    }
  }
}

/* ---------- RENDERIZADO TOTALMENTE SEPARADO DE LOS 6 MAPAS DE FRANCIA ---------- */
function renderProvinces(canvas){
  const {w,h,ids,coastEdge,feudoIds,feudoEdge,feudoPts,parlIds,parlEdge,parlPts,diocIds,diocEdge,diocPts,apanIds,apanEdge,apanPts,gobIds,gobEdge,gobPts,intIds,intEdge,intPts}=provState;
  const ctx=canvas.getContext("2d"), im=ctx.createImageData(w,h), d=im.data;
  const chip=tokenRGB("--chip"),line=tokenRGB("--line"),muted=tokenRGB("--muted"),gilt=tokenRGB("--gilt"),paper=tokenRGB("--paper"),ink=tokenRGB("--ink");

  const feudoColors=FEUDOS.map((f,idx)=>mix(chip,hexRGB(f.escudo?.bg),.34+(idx%3)*0.06));
  const selParlIdx=PARLAMENTOS_LIST.findIndex(p=>p.id===selParl);
  const selDiocIdx=DIOCESIS_LIST.findIndex(x=>x.id===selDioc);
  const selApanIdx=APANAJES_LIST.findIndex(a=>a.id===selApanaje);
  const selGobIdx=GOBIERNOS_LIST.findIndex(g=>g.id===selGob);
  const selIntIdx=INTENDENCIAS_LIST.findIndex(it=>it.id===selInt);

  for(let i=0;i<w*h;i++){
    const id=ids[i];
    if(id<=0){d[i*4+3]=0;continue}
    const r=PROV_DEF[id], x2=i%w, y=(i/w)|0;
    let c=paper;

    if(r.tipo==="extranjero"){
      if(r.id==="dombes"&&(capaFrancia==="ducados"||capaFrancia==="apanajes")){
        const base=capaFrancia==="ducados"
          ?(feudoIds[i]>=0?feudoColors[feudoIds[i]]:chip)
          :(apanIds[i]>=0?mix(chip,APANAJES_LIST[apanIds[i]].color,.46):chip);
        c=(x2+y)%9<2?mix(line,base,.35):base;
        if((capaFrancia==="ducados"&&feudoIds[i]===selDucado)||(capaFrancia==="apanajes"&&apanIds[i]===selApanIdx)) c=mix(c,gilt,.50);
        if((capaFrancia==="ducados"&&feudoEdge[i])||(capaFrancia==="apanajes"&&apanEdge[i])) c=ink;
      } else {
        c=(x2+y)%9<2?line:paper;
      }
    } else if(capaFrancia==="ducados"){
      const fi=feudoIds[i];
      c=fi>=0?feudoColors[fi]:chip;
      if(fi===selDucado) c=mix(c,gilt,.55);
      if(feudoEdge[i]) c=(x2+y)%6<4?mix(ink,gilt,.25):c;
    } else if(capaFrancia==="parlamentos"){
      const pi=parlIds[i];
      c=pi>=0?mix(chip,PARLAMENTOS_LIST[pi].color,.46):chip;
      if(pi===selParlIdx) c=mix(c,gilt,.50);
      if(parlEdge[i]) c=ink;
    } else if(capaFrancia==="diocesis"){
      const di=diocIds[i];
      const part=di>=0?DIOCESIS_PARTIDOS[DIOCESIS_LIST[di].partido]:null;
      c=part?mix(chip,part.color,.40+(di%3)*0.05):chip;
      if(di===selDiocIdx) c=mix(c,gilt,.52);
      if(diocEdge[i]) c=(x2+y)%7<5?ink:c;
    } else if(capaFrancia==="apanajes"){
      const ai=apanIds[i];
      c=ai>=0?mix(chip,APANAJES_LIST[ai].color,.46):chip;
      if(ai===selApanIdx) c=mix(c,gilt,.50);
      if(apanEdge[i]) c=ink;
    } else if(capaFrancia==="gobiernos"){
      const gi=gobIds[i];
      const gt=gi>=0?GOBIERNOS_TIPOS[GOBIERNOS_LIST[gi].tipoGob]:null;
      c=gt?mix(chip,gt.color,.38+(gi%3)*0.07):chip;
      if(gi===selGobIdx) c=mix(c,gilt,.52);
      if(gobEdge[i]) c=ink;
    } else if(capaFrancia==="intendencias"){
      const ii=intIds[i];
      const rg=ii>=0?INTENDENCIA_REGIMENES[INTENDENCIAS_LIST[ii].regimen]:null;
      c=rg?mix(chip,rg.color,.40+(ii%3)*0.06):chip;
      if(ii===selIntIdx) c=mix(c,gilt,.52);
      if(intEdge[i]) c=ink;
    }

    if(coastEdge[i]) c=muted;
    const o=i*4; d[o]=c[0]; d[o+1]=c[1]; d[o+2]=c[2]; d[o+3]=255;
  }
  ctx.putImageData(im,0,0);

  const fam=getComputedStyle(document.body).fontFamily;
  {const cw=ctx.canvas.clientWidth||0; FR_K=Math.min(3.2,Math.max(1.4,cw?(w/cw)*1.05:1.8));}

  const paintMarkers=(items, pts, isSelFn, escFn, idFn, tipo, normPx, selPx, offPx, prioFn=()=>0)=>{
    const order=items.map((_,idx)=>idx).sort((a,b)=>(isSelFn(a)?100:prioFn(a))-(isSelFn(b)?100:prioFn(b)));
    // 1) Emblemas primero (no seleccionados -> seleccionado arriba)
    order.forEach(idx=>{
      const it=items[idx], {fx:x,fy:y}=pts[idx], isSel=isSelFn(idx);
      drawEmblemCanvas(ctx,x,y,escFn(it),tipo,isSel,idFn(it));
    });
    // 2) Etiquetas evitando colisiones (priorizando seleccionado y metrópolis)
    const placed=[];
    const labelOrder=order.slice().reverse();
    labelOrder.forEach(idx=>{
      const it=items[idx], {fx:x,fy:y}=pts[idx], isSel=isSelFn(idx);
      ctx.font=`${isSel?`700 ${(selPx*FR_K).toFixed(1)}px`:`600 ${(normPx*FR_K).toFixed(1)}px`} ${fam}`;
      const dy=tipo==="ducados"?(idx%2===0?-5:6)*FR_K:0;
      drawLabelSafe(ctx,it.corto,x,y,w,h,offPx*FR_K,dy,isSel,placed,paper,ink);
    });
  };

  if(capaFrancia==="ducados"){
    paintMarkers(FEUDOS, feudoPts, i=>i===selDucado, f=>f.escudo, f=>f.id, "ducados", 12.5, 15.5, 15);
  } else if(capaFrancia==="parlamentos"){
    paintMarkers(PARLAMENTOS_LIST, parlPts, i=>PARLAMENTOS_LIST[i].id===selParl, p=>p.emblema, p=>p.id, "parlamentos", 14.5, 16.5, 17);
  } else if(capaFrancia==="diocesis"){
    paintMarkers(
      DIOCESIS_LIST, diocPts, i=>DIOCESIS_LIST[i].id===selDioc,
      d=>({...d.emblema, sub:!d.metropoli, metropoli:!!d.metropoli, rangoPar:SEDES_RANGO_PAR[d.id]||null}), d=>d.id, "diocesis", 11.5, 15.5, 14,
      i=>DIOCESIS_LIST[i].metropoli?2:1
    );
  } else if(capaFrancia==="apanajes"){
    paintMarkers(APANAJES_LIST, apanPts, i=>APANAJES_LIST[i].id===selApanaje, a=>a.escudo, a=>a.id, "apanajes", 15, 17, 18);
  } else if(capaFrancia==="gobiernos"){
    paintMarkers(GOBIERNOS_LIST, gobPts, i=>GOBIERNOS_LIST[i].id===selGob, g=>govEmblem(g), g=>g.escudoId||g.id, "gobiernos", 11.5, 15.5, 13);
  } else if(capaFrancia==="intendencias"){
    paintMarkers(INTENDENCIAS_LIST, intPts, i=>INTENDENCIAS_LIST[i].id===selInt, it=>intEmblem(it), it=>it.escudoId||it.id, "intendencias", 11.5, 15.5, 13);
  }
}

/* ---------- PANELES DE DETALLE CON ESCUDO/EMBLEMA Y LÍDER ---------- */
function escudoFranciaActs(tipo,id){
  const esSede=tipo==="sedes";
  const tiene=esSede?Boolean(SEDES_PROPIOS[id]):Boolean(ESCUDOS_DUCADOS[id]);
  const esLocal=esSede?Boolean(SEDES_LOCAL[id]):Boolean(ESCUDOS_DUCADOS_LOCAL[id]);
  const puedeEditar=typeof OWNER!=="undefined"&&OWNER&&(db||GH?.tiene());
  const msgEl=el("span",{class:"status","aria-live":"polite"});
  const inp=el("input",{type:"file",accept:".svg,.png,image/svg+xml,image/png",hidden:""});
  inp.onchange=async e=>{
    const f=e.target.files[0];e.target.value="";if(!f)return;
    try{
      const img=await Heraldica.procesarArchivo(f);
      if(puedeEditar){
        msgEl.textContent="Subiendo escudo…";
        await (db||GH).doc(tipo+"/"+id).set({img});
        if(esSede){delete SEDES_LOCAL[id];await setEscudoSedePropio(id,img)}
        else{delete ESCUDOS_DUCADOS_LOCAL[id];await setEscudoDucadoPropio(id,img)}
      }else{
        if(esSede){SEDES_LOCAL[id]=img;await setEscudoSedePropio(id,img)}
        else{ESCUDOS_DUCADOS_LOCAL[id]=img;await setEscudoDucadoPropio(id,img)}
      }
    }catch(err){msgEl.textContent="No se pudo procesar: "+(err&&err.message||err)}
  };
  const row=el("div",{class:"fr-escudo-acts"},
    inp,
    el("button",{type:"button",class:"btn sm",onclick:()=>inp.click()},tiene?"Cambiar escudo (SVG/PNG)":"Subir escudo (SVG/PNG)")
  );
  if(tiene&&(esLocal||(typeof OWNER!=="undefined"&&OWNER))){
    row.append(el("button",{type:"button",class:"btn sm danger",onclick:async()=>{
      try{
        if(esLocal&&!puedeEditar){
          if(esSede){delete SEDES_LOCAL[id];await setEscudoSedePropio(id,null)}
          else{delete ESCUDOS_DUCADOS_LOCAL[id];await setEscudoDucadoPropio(id,null)}
        }else{
          msgEl.textContent="Quitando escudo…";
          await (db||GH).doc(tipo+"/"+id).delete();
          if(esSede){delete SEDES_LOCAL[id];await setEscudoSedePropio(id,null)}
          else{delete ESCUDOS_DUCADOS_LOCAL[id];await setEscudoDucadoPropio(id,null)}
        }
      }catch(err){msgEl.textContent="No se pudo quitar: "+(err&&err.message||err)}
    }},"Quitar escudo propio"));
  }
  if(esLocal&&!puedeEditar)msgEl.textContent="Vista previa local (sin llave activa: se perderá al recargar).";
  else if(!tiene&&!puedeEditar)msgEl.textContent="Sin llave de GitHub: vista previa local.";
  row.append(msgEl);
  return row;
}
function showFranciaSelection(){
  const wrap=el("div",{class:"fr-info-wrap"});
  if(capaFrancia==="ducados"){
    const f=FEUDOS[selDucado]||FEUDOS[0];
    const provObj=PROV_DEF.find(r=>r.id===f.prov);
    wrap.append(
      el("div",{class:"emblema-header"},
        renderEscudoSVG(f.escudo,"ducados",f.id),
        el("div",{class:"emblema-meta"},
          el("span",{class:"tag ej"},f.rango),
          el("div",{},el("b",{},"Casa señorial: "),f.casa),
          provObj?el("div",{class:"note"},"Provincia geográfica: "+provObj.nombre):null,
          el("div",{class:"note blason-txt"},el("b",{},"Blasón histórico: "),f.escudo.blason)
        )
      ),
      escudoFranciaActs("ducados",f.id),
      liderCard(f.pid, f.titular, f.rango+" · "+f.casa),
      el("span",{class:"label"},"Rentas, tierras y privilegios en 1722"),
      el("p",{},f.rentas),
      el("span",{class:"label"},"Peso político en la corte de Versalles"),
      el("p",{class:"note"},f.nota),
      confFuenteBox(f.conf, f.fuente)
    );
    mapInfo(f.nombre, "Mapa 1 · Los Ducados y Señoríos de Francia (feudos y casas nobiliarias, separados de los gobiernos militares).", wrap);
  } else if(capaFrancia==="parlamentos"){
    const p=PARLAMENTOS_LIST.find(x=>x.id===selParl)||PARLAMENTOS_LIST[0];
    wrap.append(
      el("div",{class:"emblema-header"},
        renderEscudoSVG(p.emblema,"parlamentos",p.id),
        el("div",{class:"emblema-meta"},
          el("span",{class:"tag"},"⚖ Corte Soberana de Justicia"),
          el("div",{},el("b",{},"Sede del Tribunal: "),p.n.replace("Parlamento de ","").replace("Consejo Soberano de ","")),
          el("div",{class:"note blason-txt"},el("b",{},"Armas de la jurisdicción: "),p.emblema.lema)
        )
      ),
      liderCard(p.pid, p.titular, p.cargo),
      el("span",{class:"label"},"Jurisdicción territorial (Ressort)"),
      el("p",{},p.ressort),
      el("span",{class:"label"},"Posición política en junio de 1722"),
      el("p",{},p.actitud),
      el("span",{class:"label"},"Uso en intrigas y pleitos"),
      el("p",{class:"note"},p.uso)
    );
    mapInfo(p.n, "Mapa 2 · Los 13 Parlamentos y Consejos Soberanos de Francia (con sus emblemas históricos y Primeros Presidentes).", wrap);
  } else if(capaFrancia==="diocesis"){
    const d=DIOCESIS_LIST.find(x=>x.id===selDioc)||DIOCESIS_LIST[0];
    const part=DIOCESIS_PARTIDOS[d.partido];
    const armas=ARMAS_SEDES[d.id];
    const denominacion=armas?.denominacion||"Armas de la sede";
    const escudo=imagenesSedes[d.id]||imagenesSedes["dioc-pendiente"];
    const extraRef=d.refPid?{pid:d.refPid,label:d.refLabel}:null;
    const titular=liderCard(d.pid,d.titular,d.cargo,extraRef);
    const armasPersonales=d.escudoId||d.id;
    if(ESCUDOS_DB.src[armasPersonales] && !["dioc-cambrai","dioc-senez","dioc-frejus"].includes(armasPersonales)){
      titular.querySelector(".lider-body").append(
        el("div",{class:"note"},"Armas del titular o de su casa"),
        renderEscudoSVG(d.emblema,"diocesis",armasPersonales)
      );
    }
    wrap.append(
      el("div",{class:"emblema-header"},
        escudo?renderSedeConCapelo(d,escudo.src,imagenesSedes[d.id]?denominacion+" · "+d.corto:"Marcador genérico de diócesis"):null,
        el("div",{class:"emblema-meta"},
          el("div",{style:"display:flex;flex-wrap:wrap;gap:6px"},
            el("span",{class:"tag"},part?part.n:"Diócesis del Reino"),
            el("span",{class:"tag"},d.metropoli?"🏛 Sede Metropolitana (Arzobispado)":"Diócesis sufragánea"),
            d.parSacre?el("span",{class:"tag ej"},"Par Eclesiástico del Sacre"):(d.par?el("span",{class:"tag ej"},"Par Eclesiástico de Francia"):null)
          ),
          d.metropoli&&d.sufraganeas?el("div",{class:"note"},el("b",{},"Diócesis sufragáneas: "),d.sufraganeas):null,
          !d.metropoli&&d.provinciaEcl?el("div",{class:"note"},el("b",{},"Metrópoli eclesiástica: "),d.provinciaEcl):null,
          armas?el("div",{class:"note blason-txt"},
            el("b",{},denominacion+" · "+CONF_LABELS[armas.conf]+". "),armas.blason," ",
            el("a",{href:armas.fuente,target:"_blank",rel:"noopener"},"Fuente heráldica"),
            armas.autor?el("span",{}," · SVG de ",el("a",{href:armas.original||armas.fuente,target:"_blank",rel:"noopener"},armas.autor)," · ",el("a",{href:armas.licencia,target:"_blank",rel:"noopener"},"Licencia")):null
          ):el("div",{class:"note blason-txt"},"Armas de la sede pendientes de identificación.")
        )
      ),
      escudoFranciaActs("sedes",d.id.replace(/^dioc-/,"")),
      titular,
      el("span",{class:"label"},"Rentas y beneficios eclesiásticos"),
      el("p",{},d.rentas),
      el("span",{class:"label"},"Alineamiento ante la Bula Unigenitus y el Sacre de Reims"),
      el("p",{class:"note"},d.nota),
      confFuenteBox(d.conf, d.fuente)
    );
    mapInfo(d.n, "Mapa 3 · Las 18 Provincias Metropolitanas y Obispados clave de Francia (junio de 1722).", wrap);
  } else if(capaFrancia==="apanajes"){
    const ap=APANAJES_LIST.find(x=>x.id===selApanaje)||APANAJES_LIST[0];
    wrap.append(
      el("div",{class:"emblema-header"},
        renderEscudoSVG(ap.escudo,"apanajes",ap.id),
        el("div",{class:"emblema-meta"},
          el("span",{class:"tag ej"},ap.categoria||"⚜ Armas de Sangre Real"),
          el("div",{class:"note blason-txt"},el("b",{},"Blasón y brisura: "),ap.escudo.blason)
        )
      ),
      liderCard(ap.pid, ap.titular, ap.cargo),
      el("span",{class:"label"},"Ducados, condados y patrimonios (distintos de los gobiernos militares)"),
      el("p",{},ap.dominios),
      el("span",{class:"label"},"Rentas y peso en la Regencia"),
      el("p",{},ap.rentas+" "+ap.nota)
    );
    mapInfo(ap.n, "Mapa 4 · Apanaje de Orleans, Dombes, Patrimonios señoriales de la Sangre y Dominio Real.", wrap);
  } else if(capaFrancia==="gobiernos"){
    const g=GOBIERNOS_LIST.find(x=>x.id===selGob)||GOBIERNOS_LIST[0];
    const gt=GOBIERNOS_TIPOS[g.tipoGob];
    const provObj=PROV_DEF.find(r=>r.id===g.prov);
    wrap.append(
      el("div",{class:"emblema-header"},
        renderEscudoSVG(govEmblem(g),"gobiernos",g.escudoId||g.id),
        el("div",{class:"emblema-meta"},
          el("span",{class:"tag ej"},"⚔ Gobierno Provincial y Militar"),
          gt?el("div",{},el("b",{},"Rango del titular: "),gt.n):null,
          provObj?.capital?el("div",{class:"note"},el("b",{},"Plaza / capital provincial: "),provObj.capital):null
        )
      ),
      liderCard(g.pid, g.titular, g.cargo),
      el("span",{class:"label"},"Jurisdicción militar y situación en junio de 1722"),
      el("p",{},g.nota),
      el("p",{class:"note"},"El gobierno militar es un cargo regio honorífico o estratégico, distinto de la administración fiscal del Intendente (Mapa 6) y de los señoríos feudales o apanajes (Mapas 1 y 4)."),
      confFuenteBox(g.conf, g.fuente)
    );
    mapInfo(g.n, "Mapa 5 · Los 32 Gobiernos Provinciales y Militares de Francia en junio de 1722.", wrap);
  } else if(capaFrancia==="intendencias"){
    const it=INTENDENCIAS_LIST.find(x=>x.id===selInt)||INTENDENCIAS_LIST[0];
    const rg=INTENDENCIA_REGIMENES[it.regimen];
    const provNames=(it.provs||[]).map(pid=>PROV_DEF.find(r=>r.id===pid)?.nombre||pid).join(", ");
    wrap.append(
      el("div",{class:"emblema-header"},
        renderEscudoSVG(intEmblem(it),"intendencias",it.escudoId||it.id),
        el("div",{class:"emblema-meta"},
          el("span",{class:"tag"},rg?rg.n:"Generalidad del Reino"),
          provNames?el("div",{class:"note"},el("b",{},"Ámbito provincial aproximado: "),provNames):null,
          rg?el("div",{class:"note"},rg.desc):null
        )
      ),
      liderCard(it.pid, it.titular, it.cargo),
      el("span",{class:"label"},"Administración de Justicia, Policía y Hacienda en 1722"),
      el("p",{},it.nota),
      confFuenteBox(it.conf, it.fuente)
    );
    mapInfo(it.n, "Mapa 6 · Las Intendencias y Generalidades de Francia en 1722 (Pays d'élections, d'États y d'imposition).", wrap);
  }
}

function renderFranciaLegend(legBox, selDrop){
  legBox.innerHTML="";
  selDrop.innerHTML="";
  if(capaFrancia==="ducados"){
    legBox.append(
      el("span",{},"🛡 Cada ducado, condado y marquesado muestra su escudo heráldico"),
      el("span",{},"⋯ Frontera señorial · Clic en un escudo o territorio para ver su líder")
    );
    selDrop.append(el("option",{value:""},`Ir a un Ducado o Señorío (${FEUDOS.length})…`),
      ...FEUDOS.map((f,i)=>el("option",{value:String(i),selected:i===selDucado},f.nombre+" — "+f.titular)));
  } else if(capaFrancia==="parlamentos"){
    PARLAMENTOS_LIST.slice(0,7).forEach(p=>
      legBox.append(el("span",{},el("i",{class:"dot",style:`background:rgb(${p.color})`}),p.corto)));
    selDrop.append(el("option",{value:""},`Ir a un Parlamento (${PARLAMENTOS_LIST.length})…`),
      ...PARLAMENTOS_LIST.map(p=>el("option",{value:p.id,selected:p.id===selParl},p.n+" — "+p.titular)));
  } else if(capaFrancia==="diocesis"){
    Object.values(DIOCESIS_PARTIDOS).forEach(d=>
      legBox.append(el("span",{},el("i",{class:"dot",style:`background:rgb(${d.color})`}),d.n)));
    selDrop.append(el("option",{value:""},`Ir a una Diócesis o Arzobispado (${DIOCESIS_LIST.length})…`),
      ...DIOCESIS_LIST.map(d=>el("option",{value:d.id,selected:d.id===selDioc},(d.metropoli?"[Metr.] ":"")+d.n+" — "+d.titular)));
  } else if(capaFrancia==="apanajes"){
    APANAJES_LIST.forEach(a=>
      legBox.append(el("span",{},el("i",{class:"dot",style:`background:rgb(${a.color})`}),a.corto)));
    selDrop.append(el("option",{value:""},`Ir a un Apanaje o Patrimonio (${APANAJES_LIST.length})…`),
      ...APANAJES_LIST.map(a=>el("option",{value:a.id,selected:a.id===selApanaje},a.n+" — "+a.titular)));
  } else if(capaFrancia==="gobiernos"){
    Object.values(GOBIERNOS_TIPOS).forEach(gt=>
      legBox.append(el("span",{},el("i",{class:"dot",style:`background:rgb(${gt.color})`}),gt.n)));
    selDrop.append(el("option",{value:""},`Ir a un Gobierno Militar (${GOBIERNOS_LIST.length})…`),
      ...GOBIERNOS_LIST.map(g=>el("option",{value:g.id,selected:g.id===selGob},g.n+" — "+g.titular)));
  } else if(capaFrancia==="intendencias"){
    Object.values(INTENDENCIA_REGIMENES).forEach(rg=>
      legBox.append(el("span",{},el("i",{class:"dot",style:`background:rgb(${rg.color})`}),rg.n)));
    selDrop.append(el("option",{value:""},`Ir a una Intendencia (${INTENDENCIAS_LIST.length})…`),
      ...INTENDENCIAS_LIST.map(it=>el("option",{value:it.id,selected:it.id===selInt},it.n+" — "+it.titular)));
  }
}

function provInfo(i,fIdx=-1){
  if(fIdx>=0&&FEUDOS[fIdx]){
    capaFrancia="ducados"; selDucado=fIdx;
  } else if(i>=0&&PROV_DEF[i]){
    const r=PROV_DEF[i];
    if(capaFrancia==="ducados"){
      const fi=FEUDOS.findIndex(f=>f.prov===r.id);
      if(fi>=0) selDucado=fi;
    } else if(capaFrancia==="parlamentos"&&PROV_PARL[r.id]){
      selParl=PROV_PARL[r.id];
    } else if(capaFrancia==="apanajes"&&PROV_APANAJE[r.id]){
      selApanaje=PROV_APANAJE[r.id];
    } else if(capaFrancia==="gobiernos"){
      const g=GOBIERNOS_LIST.find(x=>x.prov===r.id);
      if(g) selGob=g.id;
    } else if(capaFrancia==="intendencias"){
      const it=INTENDENCIAS_LIST.find(x=>(x.provs||[]).includes(r.id));
      if(it) selInt=it.id;
    }
  }
  const cv=document.querySelector("#map-box canvas");
  if(cv) renderProvinces(cv);
  showFranciaSelection();
}

async function drawProvinces(box,isCurrent){
  mapInfo("Reino de Francia","Cargando los 6 mapas separados del Reino de Francia…");
  try{await loadProvinces()}catch(e){
    if(isCurrent())mapInfo("Reino de Francia","No se pudo cargar el mapa de Francia.");
    return;
  }
  if(!isCurrent())return;
  const {w,h}=provState;

  const tb=el("div",{class:"map-toolbar"});
  const cBar=el("div",{class:"sectores-bar fr-tabs",role:"group","aria-label":"Los 6 mapas separados de Francia"});
  const legBox=el("div",{class:"leyenda-map"});
  const selDrop=el("select",{id:"francia-entity-sel","aria-label":"Seleccionar territorio en el mapa activo"});
  const canvas=el("canvas",{width:w,height:h,role:"img","aria-label":"Mapa de Francia en junio de 1722",style:"display:block;width:100%;height:auto;cursor:pointer"});

  Object.entries(CAPAS_FRANCIA).forEach(([k,v])=>{
    const b=el("button",{class:"btn sm","aria-pressed":String(capaFrancia===k),onclick:()=>{
      capaFrancia=k;
      [...cBar.children].forEach(x=>x.setAttribute("aria-pressed","false"));
      b.setAttribute("aria-pressed","true");
      renderFranciaLegend(legBox,selDrop);
      renderProvinces(canvas);
      showFranciaSelection();
    }},`${v.ico} ${v.num}. ${v.label}`);
    cBar.append(b);
  });

  selDrop.onchange=()=>{
    const val=selDrop.value; if(!val)return;
    if(capaFrancia==="ducados") selDucado=+val;
    else if(capaFrancia==="parlamentos") selParl=val;
    else if(capaFrancia==="diocesis") selDioc=val;
    else if(capaFrancia==="apanajes") selApanaje=val;
    else if(capaFrancia==="gobiernos") selGob=val;
    else if(capaFrancia==="intendencias") selInt=val;
    renderProvinces(canvas);
    showFranciaSelection();
  };

  tb.append(cBar, el("div",{class:"sectores-bar"},selDrop));
  renderFranciaLegend(legBox,selDrop);
  box.append(tb,legBox,canvas);

  const clickCfg={
    ducados:      {pts:()=>provState.feudoPts, ids:()=>provState.feudoIds, r:28, set:idx=>{selDucado=idx; return String(idx)}},
    parlamentos:  {pts:()=>provState.parlPts,  ids:()=>provState.parlIds,  r:30, set:idx=>(selParl=PARLAMENTOS_LIST[idx].id)},
    diocesis:     {pts:()=>provState.diocPts,  ids:()=>provState.diocIds,  r:26, set:idx=>(selDioc=DIOCESIS_LIST[idx].id)},
    apanajes:     {pts:()=>provState.apanPts,  ids:()=>provState.apanIds,  r:32, set:idx=>(selApanaje=APANAJES_LIST[idx].id)},
    gobiernos:    {pts:()=>provState.gobPts,   ids:()=>provState.gobIds,   r:26, set:idx=>(selGob=GOBIERNOS_LIST[idx].id)},
    intendencias: {pts:()=>provState.intPts,   ids:()=>provState.intIds,   r:26, set:idx=>(selInt=INTENDENCIAS_LIST[idx].id)}
  };

  canvas.addEventListener("click",e=>{
    const cfg=clickCfg[capaFrancia]; if(!cfg)return;
    const rect=canvas.getBoundingClientRect();
    const x=Math.floor((e.clientX-rect.left)*w/rect.width), y=Math.floor((e.clientY-rect.top)*h/rect.height);
    const idx=y*w+x;
    let best=-1, bestD=(cfg.r*FR_K)*(cfg.r*FR_K);
    cfg.pts().forEach((pt,k)=>{
      const dx=x-pt.fx, dy=y-pt.fy, d2=dx*dx+dy*dy;
      if(d2<bestD){bestD=d2;best=k}
    });
    if(best<0&&cfg.ids()[idx]>=0) best=cfg.ids()[idx];
    if(best>=0){selDrop.value=cfg.set(best); renderProvinces(canvas); showFranciaSelection();}
  });

  renderProvinces(canvas);
  showFranciaSelection();
}
