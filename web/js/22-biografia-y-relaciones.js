/* ---------- Biografía y relaciones ---------- */
function familia(){if(!player.familia){player.familia=generarFamilia(player);store.set("vg_player",player)}return player.familia}
const PROC_T=p=>p.proc==="paris"?"París":p.proc==="extranjero"?(p.region||"Extranjero")+" (extranjero)":(p.region||"Provincia");
function pjLibro(){return player?.existente?(LIBRO||[]).find(c=>c.id===player.existente)||null:null}
function drawBioExistente(){const b=$("#bio"),c=pjLibro();b.innerHTML="";
  if(!c){b.append(el("p",{class:"note"},"Cargando la ficha…"));return}
  const rows=[["Nacimiento",[c.nacimiento,edadPj(c)!=null?edadPj(c)+" años":""].filter(Boolean).join(" · ")],["Sexo",c.sexo==="F"?"Mujer":"Hombre"],["Rango",(c.rangos||[]).map(r=>RANGO_N[r]).join(" · ")],
    ["Casa",c.casa],["Condición",c.estatus_familia],["Título",c.titulo_nob||c.titulo],["Cargo",c.cargo],["Educación",c.educacion],["Religión",c.religion],["Lengua",c.lengua],["Llegada a la corte",c.llegada_corte],["Residencia",c.ubicacion]];
  b.append(el("div",{class:"bio-h"},retratoEl(c),el("h3",{},c.nombre)),el("dl",{},...rows.filter(r=>r[1]&&r[1]!=="—").flatMap(([k,v])=>[el("dt",{},k),el("dd",{},v)])));
}
function drawRelExistente(){const b=$("#rel"),c=pjLibro();b.innerHTML="";
  if(!c){b.append(el("p",{class:"note"},"Cargando la ficha…"));return}
  [["Padre",c.padre],["Madre",c.madre],["Cónyuge",c.conyuge],["Hijos",c.hijos],["Lugar en la familia",c.lugar_familia]].forEach(([t,v])=>b.append(el("span",{class:"label"},t),el("p",{},v&&v!=="—"?v:"Ninguno.")));
}
function drawBio(){
  if(player?.existente)return drawBioExistente();
  const b=$("#bio"),f=familia(),d=player.destino||{};b.innerHTML="";
  const rows=[["Nacimiento",f.nac+" · "+f.edad+" años"],["Sexo",player.sexo==="F"?"Mujer":"Hombre"],["Procedencia",PROC_T(player)],["Cuna",CUNA_N[player.cuna]],["Posición",posName(player)],
    ["Filiación",FIL_N[d.filiacion]],["Educación",EDUCACIONES[d.edu]],["Fortuna",DINERO_N[d.dinero]],["Condición",CONDICION_N[d.condicion]],["Lugar en la familia",LUGAR_N[d.lugar]],["Confesión",CONF_N[d.confesion]]];
  const cy=f.miembros.find(m=>/^Espos/.test(m.rol));
  rows.push(["Estado",cy?(cy.vivo?(player.sexo==="F"?"Casada":"Casado"):(player.sexo==="F"?"Viuda":"Viudo")):(POS_ID[player.pos]?.g==="Clero"?"Célibe (estado eclesiástico)":(player.sexo==="F"?"Soltera":"Soltero"))]);
  b.append(el("div",{class:"bio-h"},el("h3",{},player.nombre)),el("dl",{},...rows.filter(r=>r[1]).flatMap(([k,v])=>[el("dt",{},k),el("dd",{},v)])));
}
function drawRel(){
  if(player?.existente)return drawRelExistente();
  const b=$("#rel"),f=familia();b.innerHTML="";
  const card=m=>m.desconocido?el("span",{class:"kin empty"},el("small",{},m.rol),"Desconocido",el("small",{},m.nota||""))
    :el("span",{class:"kin"+(m.vivo?"":" dead")},el("small",{},m.rol+(m.mayor===true?" mayor":m.mayor===false?" menor":"")),m.nombre,
      el("small",{},(m.vivo?"n. "+m.nac+" · "+(AÑO()-m.nac)+" años":m.nac+"–"+m.muerte+" †")+(m.nota?" · "+m.nota:"")));
  const G=[["Padres",/^(Padre|Madre)/],["Hermanos",/^Herman/],["Cónyuge",/^Espos/],["Hijos",/^Hij/],["Amantes",/^Amante/]];
  for(const [t,re] of G){const xs=f.miembros.filter(m=>re.test(m.rol));
    b.append(el("span",{class:"label"},t),xs.length?el("div",{class:"kgrid"},...xs.map(card)):el("p",{class:"note"},"Ninguno."))}
}
