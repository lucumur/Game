/* ---------- Familia del jugador ----------
   Se genera una vez al entrar, coherente con el destino (filiación, condición, lugar) y la posición. */
const AÑO = () => (typeof epoca!=="undefined"&&epoca?.año)||1722;
const rnd = (a,b) => a+Math.floor(Math.random()*(b-a+1));
const nombreDe = n => n.split(" ")[0];
const apellidoDe = n => n.split(" ").slice(1).join(" ");
const vivoA = edad => Math.random() > Math.max(0, Math.min(.95, (edad-38)/38));
function persona(rol, nombre, edad, extra={}){
  const vivo = extra.vivo ?? vivoA(edad);
  const p = {rol, nombre, nac: AÑO()-edad, vivo, ...extra};
  if(!vivo && p.muerte==null) p.muerte = rnd(Math.max(p.nac+1, AÑO()-15), AÑO()-1);
  return p;
}
function generarFamilia(p){
  const d = p.destino||{}, q = POS_ID[p.pos]||{}, sx = p.sexo==="F"?"F":"M";
  const clero = q.g==="Clero";
  const viudo = d.lugar==="viudo"||d.lugar==="viuda";
  const huer = d.condicion==="huerfano"||d.lugar==="huerfano"||d.lugar==="huerfana";
  const otro = (sexo, extra={}) => generarNombre({...p, sexo, ...extra});
  let edad = 18 + Math.floor(Math.pow(Math.random(),1.4)*37);
  if(["obispo","consejero-estado","duque","embajador","confesor"].includes(p.pos)) edad = Math.max(edad, rnd(38,58));
  if(viudo) edad = Math.max(edad, rnd(26,45));
  const ape = apellidoDe(p.nombre), fam = [];
  /* Padres */
  const eP = edad+rnd(24,38), eM = edad+rnd(18,30);
  const madreN = otro("F");
  if(d.condicion==="exposito"){
    fam.push({rol:"Padre",desconocido:true,nota:"Expósito: nadie sabe quién fue"},{rol:"Madre",desconocido:true,nota:"Te dejaron en el torno del hospital"});
  } else if(d.condicion==="no_reconocido"){
    fam.push({rol:"Padre",desconocido:true,nota:"Nunca te reconoció; tu madre no dijo su nombre"},
             persona("Madre", nombreDe(madreN)+" "+ape, eM, huer?{vivo:false}:{}));
  } else if(d.filiacion==="bastardo"){
    fam.push(persona("Padre", nombreDe(otro("M"))+" "+ape, eP, {nota:"Te reconoció; no estaba casado con tu madre", ...(huer?{vivo:false}:{})}),
             persona("Madre", otro("F",{cuna:p.cuna==="espada"?"burguesia":"pueblo"}), eM, {nota:"Amante de tu padre", ...(huer?{vivo:false}:{})}));
  } else if(d.filiacion==="materna"){
    fam.push(persona("Padre", otro("M",{cuna:p.cuna==="espada"?"toga":p.cuna==="pueblo"?"pueblo":"burguesia"}), eP, {nota:"Llevas el apellido y los bienes de tu madre", ...(huer?{vivo:false}:{})}),
             persona("Madre", nombreDe(madreN)+" "+ape, eM, {nota:"De ella viene tu casa", ...(huer?{vivo:false}:{})}));
  } else {
    fam.push(persona("Padre", nombreDe(otro("M"))+" "+ape, eP, huer?{vivo:false}:{}),
             persona("Madre", madreN, eM, {nota:"Casada con tu padre; "+apellidoDe(madreN)+" de soltera", ...(huer?{vivo:false}:{})}));
  }
  /* Hermanos */
  if(d.condicion!=="exposito"&&d.condicion!=="no_reconocido"&&!["unico","unica"].includes(d.lugar)){
    let mayores=0, menores=0;
    if(d.lugar==="primogenito"||d.lugar==="primogenita") menores=rnd(0,3);
    else if(d.lugar==="segundon"){ mayores=rnd(1,2); menores=rnd(0,2); }
    else if(d.lugar==="benjamin"||d.lugar==="benjamina") mayores=rnd(1,4);
    else { mayores=rnd(0,2); menores=rnd(0,2); }
    const DEST = {M:["heredero de la casa","en el ejército","en la Iglesia","en el comercio familiar","en las colonias"],F:["casada","en un convento","soltera, en casa"]};
    const her = (i,mayor) => {
      const s = (d.lugar==="segundon"&&mayor&&i===0) ? "M" : (Math.random()<.5?"M":"F");
      const e = mayor ? edad+rnd(1,4)*(i+1) : Math.max(1, edad-rnd(1,4)*(i+1));
      let nota = s==="M" ? (mayor&&i===0?DEST.M[0]:DEST.M[rnd(1, p.cuna==="espada"?2:4)]) : DEST.F[rnd(0,2)];
      if(e<14) nota = "aún niño";
      return persona(s==="M"?"Hermano":"Hermana", nombreDe(otro(s))+" "+ape, e, {mayor, nota, vivo: e<14 ? Math.random()>.1 : vivoA(e+10)});
    };
    for(let i=0;i<mayores;i++) fam.push(her(i,true));
    for(let i=0;i<menores;i++) fam.push(her(i,false));
  }
  /* Cónyuge */
  let casado = false;
  if(!clero){
    const pr = sx==="M" ? (edad<25?.2:edad<35?.55:.75) : (edad<20?.35:.75);
    casado = viudo || Math.random() < pr*(d.lugar==="sin_dote"?.3:1);
    if(casado){
      const s2 = sx==="M"?"F":"M", eC = Math.max(16, edad + (sx==="M"?-rnd(2,12):rnd(2,15)));
      fam.push(persona(viudo?(s2==="F"?"Esposa difunta":"Esposo difunto"):(s2==="F"?"Esposa":"Esposo"), otro(s2), eC,
        viudo?{vivo:false, muerte:AÑO()-rnd(0,6)}:{vivo:true}));
    }
  }
  /* Hijos */
  if(casado){
    const n = Math.min(6, rnd(0, Math.max(0, Math.floor((edad-19)/3))));
    for(let i=0;i<n;i++){
      const s = Math.random()<.5?"M":"F", e = Math.max(0, edad-rnd(19,23)-i*rnd(1,3));
      const muerto = Math.random()<.3;
      fam.push(persona(s==="M"?"Hijo":"Hija", nombreDe(otro(s))+" "+ape, e, {vivo:!muerto, ...(muerto?{muerte:rnd(AÑO()-e, AÑO())}:{}), nota:e<7?"en la nodriza o en casa":""}));
    }
  }
  /* Amantes */
  if(Math.random() < (clero?.1:p.cuna==="espada"?.35:.2)){
    const s2 = sx==="M"?"F":"M", cunas=["espada","toga","nuevo","burguesia","pueblo"];
    fam.push(persona(s2==="F"?"Amante":"Amante", otro(s2,{cuna:cunas[rnd(0,4)]}), Math.max(17, edad+rnd(-12,8)), {vivo:true, nota:casado||clero?"en secreto":"discreta, pero no tanto"}));
  }
  return {edad, nac: AÑO()-edad, miembros: fam};
}

const JORNADA = ["Lever","Messe","Conseil","Dîner","Promenade","Souper","Coucher"];
const EJEMPLO = {nombre:"Antoine Fabre",sexo:"M",proc:"provincia",region:"Languedoc",cuna:"burguesia",destino:{filiacion:"directa",edu:2,dinero:"menos",condicion:"ninguna",lugar:"segundon",confesion:"catolico"},pos:"medico"};
