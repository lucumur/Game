/* ---------- Contenido de ejemplo ---------- */
const DOCS = [
 {id:"c1",tipo:"carta",urg:true,tit:"Del intendente de sus tierras",de:"Montpellier, 2 de junio",firma:"Bertrand",sello:"B",
  txt:"Monsieur: las rentas del semestre no alcanzarán para pagar al prestamista de la [[quincampoix|rue Quincampoix]]. El granizo de mayo se llevó la mitad de la cosecha. Espero sus instrucciones antes de San Juan."},
 {id:"c2",tipo:"carta",tit:"Del abate de Saint-Pierre",de:"París, 10 de junio",firma:"L’abbé de S.-P.",sello:"S",
  txt:"Querido doctor: le ruego que cene conmigo el jueves. Tengo amigos interesados en la medicina y en lo que se dice en el [[oeil-de-boeuf|Œil-de-Bœuf]]."},
 {id:"r1",tipo:"rumor",tit:"Dubois será primer ministro antes del otoño",de:"Oído en la galería · fiabilidad desconocida",
  txt:"Lo repiten dos secretarios del ala de los Ministros. Uno de ellos añade que el mariscal de Villeroy «no lo consentirá»."},
 {id:"r2",tipo:"rumor",tit:"Una disputa en el Gran Común",de:"Oído a un lacayo · fiabilidad baja",
  txt:"Los oficiales de boca se pelean por los alojamientos. Dicen que el reparto lo decide alguien de la casa de [[monsieur-le-duc|Monsieur le Duc]]."},
 {id:"r3",tipo:"rumor",tit:"La marquesa no saluda a nadie de Orleans",de:"Oído en la capilla · fiabilidad media",
  txt:"Una dama asegura que la marquesa de Prie volvió la cara al pasar el duque de Chartres. Otra dice que solo estaba mirando el órgano."},
 {id:"a1",tipo:"aviso",tit:"Reparto de alojamientos",de:"Versalles, 15 de junio",firma:"Le Grand Maréchal des Logis",sello:"⚜",formula:"Avis",
  txt:"Los oficiales de la casa del rey que no hayan recibido alojamiento se presentarán en el [[gran-comun|Gran Común]] ante los aposentadores. Las reclamaciones se atenderán hasta el sábado; pasado ese día, las puertas marcadas con tiza se tendrán por asignadas."},
 {id:"a2",tipo:"aviso",tit:"Orden de la jornada",de:"Versalles, 16 de junio",firma:"Pour le Premier Gentilhomme de la Chambre",sello:"⚜",formula:"Avis",
  txt:"Mañana el [[lever|lever]] del rey será a la hora acostumbrada. Solo pasarán a la cámara las personas con entrada. Los demás aguardarán en el [[oeil-de-boeuf|Œil-de-Bœuf]] sin obstruir el paso."},
 {id:"g2",tipo:"gazette",impresa:true,tit:"Gazette",de:"De Paris, le 13 juin 1722",
  arts:[
   {where:"De Paris",h:"El rey se prepara para Versalles",t:"Su Majestad partirá de París el lunes. La corte lo seguirá; varios ministros ya han enviado su equipaje."},
   {where:"De Madrid",h:"Noticias de la corte de España",t:"Las cartas de Madrid alaban la salud de la princesa de Asturias y la alegría de Sus Majestades Católicas."},
   {where:"De Londres",h:"El Parlamento se separa",t:"El rey Jorge se dispone a pasar el verano en Hannover."}
  ]},
 {id:"o1",tipo:"oblig",urg:true,tit:"Presentarse ante el primer médico del rey",de:"Antes del domingo",
  txt:"Sin esta visita, su carta de recomendación no vale nada. El [[primer-medico|primer médico]] recibe después del [[lever|lever]]."},
 {id:"o2",tipo:"oblig",tit:"Deuda con un boticario",de:"48 libras · vence a fin de mes",
  txt:"Por el láudano y los emplastos del viaje. El boticario de la rue Saint-Honoré no es paciente."},
 {id:"g1",tipo:"gazette",tit:"Nouvelles à la main",de:"Paris, 14 juin 1722",
  arts:[
   {where:"Versailles",h:"La corte vuelve mañana",t:"El Regente ha dado orden de que la corte se instale en Versalles. Los aposentadores marcan las puertas con tiza desde hace una semana."},
   {where:"Marseille",h:"La contagion se apaga",t:"Las cartas de Provenza hablan de pocos casos nuevos. Los barcos siguen en cuarentena."},
   {where:"Paris",h:"Los papeles de Law, otra vez",t:"Continúan las verificaciones de billetes y acciones. Quien no justifique su origen pierde la mitad."},
   {where:"Rome",h:"Unigenitus",t:"El nuncio insiste en que el Parlamento registre la bula sin reservas. Los jansenistas se niegan."}
  ]}
];
const OBJETOS = [
 ["Carta de recomendación","1","Firmada por un antiguo profesor de Montpellier. Su valor depende de quién la lea."],
 ["Estuche de lancetas","1","Plata y concha. Herramienta de oficio."],
 ["Frasco de láudano","1","Del boticario de la rue Saint-Honoré. Potencia desconocida."],
 ["Bolsa","120 libras","Lo que queda tras el viaje."]
];
const DESCONOCIDOS = [
 {id:"u1",desc:"Dama de cabello empolvado, vista en la capilla junto al rey",donde:"Capilla Real"},
 {id:"u2",desc:"Hombre de negro con un portafolio de cuero",donde:"Ala de los Ministros"},
 {id:"u3",desc:"Joven caballero que ríe muy alto en la Galería",donde:"Galería de los Espejos"},
 {id:"u4",desc:"Mujer joven con escolta, saliendo del ala sur",donde:"Ala Sur"}
];
const DIARIO = [
 {d:"15 de junio de 1722",t:"Llegamos con la corte al caer la tarde. El [[patio-real|Patio Real]] estaba lleno de carrozas y nadie sabía dónde dormiría esa noche. Un aposentador me dijo, sin mirarme, que los médicos de mi rango se alojan en el [[gran-comun|Gran Común]]."},
 {d:"16 de junio",t:"Antes del [[lever|lever]] esperé dos horas en el [[oeil-de-boeuf|Œil-de-Bœuf]]. Oí hablar de la [[regencia|Regencia]] como de algo que ya termina, y de los [[legitimados|legitimados]] como de algo que ya terminó."}
];
const PLAN_EJEMPLO = {id:"p0",ejemplo:true,tipo:"Ganar favor",obj:"",meta:"Que el primer médico me admita entre sus ayudantes",cons:[],medios:["Carta de recomendación"],riesgo:1,paso:1};
const TIPOS_PLAN = ["Ganar favor","Obtener un cargo","Desacreditar","Averiguar un secreto","Concertar un matrimonio","Cobrar una deuda","Otro"];
const PASOS = ["Preparar","Acercarse","Actuar","Consumar"];
