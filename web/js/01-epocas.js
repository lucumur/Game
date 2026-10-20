/* ---------- Épocas ---------- */
const EPOCAS = [
 {id:"1682",etapa:"Prisca",año:1682,ev:"Luis XIV instala oficialmente la corte en Versalles (mayo)."},
 {id:"1705",etapa:"Temprana",año:1705,ev:"Apogeo del reinado, diez años antes de la muerte de Luis XIV."},
 {id:"1722",etapa:"Segunda etapa",año:1722,fecha:"1722-06-15",lugar:"Patio Real",jugable:true,ev:"La corte vuelve a Versalles tras siete años en París. ¿Quién eres al cruzar el Patio Real?"},
 {id:"1743",etapa:"Segunda etapa",año:1743,ev:"Muere el cardenal Fleury; Luis XV gobierna sin primer ministro."},
 {id:"1765",etapa:"Segunda etapa tardía",año:1765,ev:"Muere el delfín Luis Fernando."},
 {id:"1770",etapa:"Tercera etapa",año:1770,ev:"Llega María Antonieta."},
 {id:"1774",etapa:"Cuarta etapa",año:1774,ev:"Luis XVI llega al trono."},
 {id:"1780",etapa:"Final",año:1780,ev:"Acontecimiento por definir."},
 {id:"1789",etapa:"Último año",año:1789,ev:"El último año de la corte en Versalles."}
];
let epoca=EPOCAS.find(e=>e.id===(()=>{try{return JSON.parse(localStorage.getItem("vg_epoca"))}catch(e){return null}})())||null;
