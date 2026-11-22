/* ---------- Mecánicas (sección Mundo) ----------
   Resumen legible de REGLAS.md. Si algo difiere, manda REGLAS.md.
   Cada bloque lleva su estado: Canónico · Provisional · Abierto. */
let mecanicasDrawn=false;
const MEC_EJES=[
  ["Lucidez","amplitud con que lee la intriga","Naïf","Crédule","Moyen","Avisé","Lucide"],
  ["Moral","trato a los demás","Juste","Droit","Accommodant","Retors","Pervers"],
  ["Audacia","","Prudent","Mesuré","Pondéré","Hardi","Audacieux"],
  ["Discreción","","Secret","Discret","Réservé","Causeur","Bavard"],
  ["Ego","solidez ante el desaire","Quebradizo","Susceptible","Firme","Flexible","Maleable"]
];
const MEC_FUENTES=[
  ["rango","precedencia"],["linaje","sangre antigua"],["saber","competencia en su terreno"],["fortuna",""],
  ["belleza","gracia, juventud"],["virilidad","fuerza, aguante, «el más hombre»"],["ingenio","esprit; el ridículo"],
  ["virtud","fe, reputación moral"],["honor_familiar","esposa, hijas, apellido"],["favor_real",""],["oficio","destreza en su trabajo"]
];
const MEC_EGO_ESTAMENTO=[
  ["Príncipes, duques y pares","Alto, sereno","rango, linaje, favor_real"],
  ["Nobleza de espada","Alto","rango, linaje, honor_familiar, virilidad"],
  ["Nobleza de toga","Medio-alto","saber, linaje (contestado), virtud"],
  ["Alto clero","Medio-alto, revestido de humildad","virtud, saber, rango"],
  ["Oficios de la casa del rey","Medio","saber, oficio, favor_real"],
  ["Financieros y burgueses","Bajo en público","fortuna, ingenio"],
  ["Servidumbre","Muy bajo; el orgullo se desplaza","virilidad, oficio, favor del amo"]
];
const MEC_DESAIRE=[
  ["Audacia alta","cólera abierta: escena pública, réplica hiriente, desafío."],
  ["Audacia baja","herida hacia dentro: llanto, retirada, «indisposición»."],
  ["Pervers + Secret/Discret","sonríe; se registra un rencor en la verdad y se cobra después."],
  ["Causeur/Bavard","se queja con todos; el desaire se vuelve rumor y la humillación crece."],
  ["Lucidez alta","tirada para reconocer la provocación y contenerse."]
];
const MEC_NIVELES=[
  ["Basal","salud, hambre, duelo, miedo físico. Si está afectada, todo lo demás se pausa (o se ejecuta mal)."],
  ["Mantenimiento","no perder cargo, fortuna ni rango. Aversión a la pérdida."],
  ["Reconocimiento","lugar dentro de los propios grupos (amigos, salón, cuerpo de oficio, iguales de rango). No es ascender: es posición en un ranking."],
  ["Aspiración","estatus esperado (alcanzar lo que el propio estamento permite) · ascenso (cambiar de estamento) · fama (ser conocido, al margen del estamento)."]
];
const MEC_POSICIONES=[
  ["Espada","Duque y par","Reclamar precedencia; proteger o hundir con su sola presencia"],
  ["Espada","Cortesano sin cargo","Asistir a todo; tejer y vender presentaciones"],
  ["Espada","Oficial de la guardia","Controlar quién pasa por una puerta; ver quién entra de noche"],
  ["Toga","Magistrado del Parlamento","Retrasar o desaparecer un expediente; registrar o negar un edicto"],
  ["Toga","Consejero de Estado","Redactar informes que deciden carreras"],
  ["Clero","Obispo cortesano","Predicar ante el rey; otorgar beneficios"],
  ["Clero","Confesor","Oír secretos; condicionar la absolución"],
  ["Clero","Abate de salón","Circular libremente; difundir ideas y libelos"],
  ["Casa del rey","Médico / cirujano","Diagnosticar u ocultar un diagnóstico; acceso a los cuerpos"],
  ["Casa del rey","Ayuda de cámara","Presente en el lever y el coucher; oír"],
  ["Casa del rey","Intendente de los Menus-Plaisirs","Organizar fiestas: decidir quién luce y quién no"],
  ["Fuera de jerarquía","Financiero","Prestar; comprar deudas ajenas; cobrarlas en favores"],
  ["Fuera de jerarquía","Artista / arquitecto real","Retratar (intimidad, halago); acceso a obras y estancias"],
  ["Fuera de jerarquía","Embajador extranjero","Correo diplomático; inmunidad; pagar informantes"],
  ["Casa de una princesa","Dama de compañía","Llevar mensajes; concertar matrimonios; estar en la intimidad femenina"]
];
function mecTabla(cab,filas){
  return el("table",{class:"mec-table"},
    el("thead",{},el("tr",{},...cab.map(c=>el("th",{},c)))),
    el("tbody",{},...filas.map(f=>el("tr",{},...f.map(c=>el("td",{},c))))));
}
function mecCard(titulo,estado,...hijos){
  return el("section",{class:"pane mec-card"},
    el("div",{class:"pane-h"},el("h3",{},titulo),estado?el("span",{class:"tag"+(estado==="Canónico"?"":" ej")},estado):null),...hijos);
}
function mecLista(items){return el("ul",{class:"mec-list"},...items.map(t=>el("li",{},...(Array.isArray(t)?t:[t]))))}
function drawMecanicas(){
  if(mecanicasDrawn)return;
  const b=$("#mecanicas-body"); if(!b)return; b.innerHTML="";
  b.append(
    mecCard("Principios: dos capas de información","Canónico",
      mecLista([
        [el("b",{},"Verdad"),": ejes reales, fuentes del ego, secretos, motivaciones, rencores. Solo la usa el narrador para que cada personaje actúe con coherencia (carpeta narrador/)."],
        [el("b",{},"Creencias del jugador"),": observaciones con origen y fiabilidad; pueden ser incompletas o falsas (carpeta jugador/)."],
        "Ninguna herramienta del juego opera sobre la verdad: sin filtros ni rankings por rasgo, sin indicadores de deriva.",
        "El narrador no filtra la verdad: solo narra lo que el personaje del jugador podría percibir.",
        "La base es la autoridad: si la narración contradice la base, gana la base. Un objeto, personaje o hecho solo existe si está en la base."
      ])),
    mecCard("Cinco ejes de carácter","Canónico",
      el("p",{class:"note"},"En pantalla se muestran con palabras; el valor numérico (−2 a +2) vive solo en la base."),
      mecTabla(["Eje","−2","−1","0","+1","+2"],MEC_EJES.map(e=>[e[1]?e[0]+" ("+e[1]+")":e[0],...e.slice(2)])),
      mecLista([
        "Lucidez decide cuánto y con qué fidelidad percibe el personaje. Baja lucidez produce creencias erróneas sin aviso.",
        "Moral Pervers: aparenta bondad y hace el movimiento sucio si nadie lo ve (depende de la regla de testigos).",
        "Deriva: actuar contra el propio eje no está prohibido; lo mueve un grado hacia el acto cometido. La deriva de los personajes no jugadores es invisible.",
        "Religiosidad y costumbres (devoto/libertino) no son eje: son afiliación del trasfondo. Un devoto puede ser Pervers (Tartufo); un libertino puede ser Juste."
      ])),
    mecCard("Ego","Canónico",
      el("p",{},"Cada personaje tiene 1–2 fuentes principales. ",el("b",{},"Un desaire solo hiere si toca una fuente."),
        " Las fuentes de cada personaje son verdad: el jugador solo las infiere por observación."),
      mecTabla(["Fuente","Qué es"],MEC_FUENTES.map(f=>[f[0],f[1]||"—"])),
      el("h4",{},"Ego esperado por estamento"),
      el("p",{class:"note"},"Mostrar más ego del permitido es insolencia (castigo, ridículo); mostrar menos del exigido por el rango, pérdida de prestigio."),
      mecTabla(["Estamento","Ego esperado","Fuentes típicas"],MEC_EGO_ESTAMENTO),
      el("h4",{},"Reacción ante el desaire"),
      el("p",{class:"note"},"Si el desaire toca una fuente y el Ego es Quebradizo o Susceptible, la forma la deciden los otros ejes. Flexible y Maleable absorben el golpe: pierden estima, no acumulan rencor."),
      mecTabla(["Si…","Entonces…"],MEC_DESAIRE)),
    mecCard("Motivaciones y necesidades","Provisional",
      el("p",{},"Los ejes dicen cómo actúa alguien; esta capa dice qué persigue y qué teme perder."),
      mecTabla(["Nivel (de abajo arriba)","Qué cubre"],MEC_NIVELES),
      mecLista([
        "Impulso dominante (rasgo; verdad para los PNJ): nivel hacia el que tiende cada personaje cuando los inferiores están cubiertos. Se cruza con Audacia.",
        "Estado de necesidades (dinámico): cada nivel está cubierto, amenazado o perdido. Domina el nivel más bajo amenazado.",
        "Grupos: cada personaje pertenece a uno o varios grupos y ocupa un lugar en cada uno (verdad).",
        "Las crisis basales (enfermedad, duelo, ruina súbita) reordenan las prioridades de cualquiera, incluido el jugador."
      ])),
    mecCard("Posiciones en Versalles","Provisional",
      el("p",{class:"note"},"Cada posición da accesos (lugares, personas), recursos y movimientos propios, y sugiere ambiciones."),
      mecTabla(["Estamento","Posición","Movimientos propios"],MEC_POSICIONES)),
    mecCard("Trasfondo invisible","Provisional",
      el("p",{class:"note"},"No se muestra como número; se nota en lo que el personaje puede hacer."),
      mecLista([
        [el("b",{},"Educación"),": colegio jesuita · oratorianos de tendencia jansenista · facultad (p. ej. medicina de Montpellier) · autodidacta de salones · sin estudios."],
        [el("b",{},"Ideas / afiliaciones"),": devoto (sincero o de conveniencia) · libertino · jansenista · ilustrado · galicano. Se adquieren o pierden jugando."],
        [el("b",{},"Origen"),": parisino / provinciano · ascendencia protestante oculta · bastardía · arruinado o enriquecido por Law."],
        [el("b",{},"Red"),": los contactos son personajes concretos de la base generados desde el trasfondo, no un número."]
      ])),
    mecCard("Resolución, testigos y percepción","Provisional",
      mecLista([
        [el("b",{},"2d6 + modificadores"),": valor del eje pertinente (−2 a +2), posición o acceso (−1 a +1), circunstancias (−2 a +2)."],
        [el("b",{},"10+")," éxito · ",el("b",{},"7–9")," éxito con coste o complicación · ",el("b",{},"6 o menos")," fracaso y el mundo reacciona."],
        "La tirada se hace de forma visible, nunca a criterio del narrador. Solo se tira cuando el resultado es incierto y tiene consecuencias.",
        [el("b",{},"Testigos (canónico)"),": cada acción relevante registra quién la vio. Un movimiento oculto solo rinde si nadie lo vio; si alguien lo vio, ese alguien tiene un arma contra el autor."],
        [el("b",{},"Percepción (canónico)"),": lo que el jugador sabe de otro son observaciones con origen (visto, oído, rumor, documento, impresión) y fiabilidad; la lucidez modula qué se le narra."]
      ])),
    mecCard("Generación de personajes","Canónico",
      mecLista([
        [el("b",{},"1. Figuras clave"),": a mano, rasgo por rasgo (Luis XV, Orleans, Dubois, Fleury, Borbón y ~10–20 más). Sus rasgos internos son interpretación a partir de fuentes y se marcan así."],
        [el("b",{},"2. Secundarios con nombre"),": generados con tablas de probabilidad por estamento (narrador/tablas/) mediante script con semilla."],
        [el("b",{},"3. Figurantes"),": generados solo cuando entran en escena. Lo que no aparece, no existe."]
      ])),
    mecCard("Pendiente","Abierto",
      mecLista([
        "Apertura: llegada de la corte a Versalles, junio de 1722.",
        "Tablas de probabilidad por estamento: pendientes.",
        "Verificación de fechas históricas antes de fijarlas en la base."
      ]))
  );
  mecanicasDrawn=true;
}
