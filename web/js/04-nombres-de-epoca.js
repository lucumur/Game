/* ---------- Nombres de época ----------
   Nombre según sexo, cuna y procedencia. Nobles: partícula + nombre de tierra inventado con fonética regional
   (para no atribuir al jugador una familia real). Burgueses y pueblo: apellidos comunes de la región. */
const R = a => a[Math.floor(Math.random()*a.length)];
const NOM = {
  M:{noble:["Louis","Louis-Henri","Charles","Charles-François","Henri","Armand","Alexandre","Philippe","François","Jean-Baptiste","Anne-Jules","Joseph","César","Gaston","Claude-Louis"],
     burguesia:["Jean","Jacques","Pierre","Nicolas","Antoine","Étienne","Claude","Michel","Jean-Baptiste","Joseph","François","Guillaume","Denis","Simon"],
     pueblo:["Jean","Pierre","Jacques","Nicolas","Antoine","Guillaume","Michel","Martin","Mathieu","Toussaint","Blaise","Gilles","Sébastien"]},
  F:{noble:["Marie-Anne","Louise-Élisabeth","Marie-Thérèse","Henriette","Charlotte","Françoise","Élisabeth","Marie-Madeleine","Angélique","Gabrielle","Victoire","Anne-Marie","Diane"],
     burguesia:["Marie","Anne","Marguerite","Catherine","Jeanne","Madeleine","Geneviève","Marie-Anne","Élisabeth","Françoise","Agnès"],
     pueblo:["Jeanne","Marie","Marguerite","Catherine","Anne","Toinette","Nanette","Madeleine","Claudine","Barbe","Louise"]}
};
const NOM_REG = { // nombres que añaden color regional
  bretona:{M:["Yves","Hervé","Corentin","Guénolé","Alain"],F:["Perrine","Jacquette","Guillemette","Anne"]},
  occitana:{M:["Raymond","Bertrand","Arnaud","Bernard","Jean-Pierre"],F:["Raymonde","Jeanne","Bertrande","Isabeau"]},
  provenzal:{M:["Honoré","Marius","Joseph","Esprit"],F:["Thérèse","Rose","Honorade"]},
  alemana:{M:["Jean-Georges","Jean-Michel","Mathias","Laurent","Jean-Jacques"],F:["Marie-Salomé","Barbe","Odile","Marie-Ève"]},
  catalana:{M:["Joseph","Jean","Bonaventure","Raphaël"],F:["Thérèse","Marie-Rose","Eulalie"]},
  norte:{M:["Adrien","Pierre-Joseph","Hubert"],F:["Marie-Joseph","Aldegonde","Rictrude"]}
};
const TOP = { // [prefijos, sufijos] para nombres de tierra
  bretona:[["Ker","Plou","Tré","Lan","Coët","Pen","Locmar"],["gall","ven","lan","guen","dren","mor","goat","nevez","ouarn"]],
  normanda:[["Beau","Belle","Grand","Mont","Bois","Haute","Clair"],["ville","bec","tot","fleur","mesnil","quetot","bosc"]],
  norte:[["Haut","Fres","Ber","Ver","Hon","Wa","Ro","Cour"],["court","ghem","becque","ricourt","val","mont","linghem"]],
  central:[["Mont","Beau","Ville","Bois","Fon","Roche","Chante","Bel"],["morin","mont","ville","fort","lieu","ray","ceaux","val","loup","ronde"]],
  este:[["Chas","Ver","Mar","Bel","Vau","Cor","Mon","Sau"],["ey","ay","enay","olles","eney","igny","ot"]],
  occitana:[["Castel","Mont","Puy","Roque","Ville","Lau","Bel","Mira"],["ac","ignac","ous","an","astre","ès","ade","erre"]],
  provenzal:[["Castel","Roque","Ma","Vi","Bel","Sain"],["argues","ignan","ane","olles","aude","ière","auron"]],
  alpina:[["Mont","Cha","Vau","Bel","Pont","Ro"],["oz","az","ieu","ens","ard","ier"]],
  alemana:[["Ober","Nieder","Rot","Weiss","Hoh","Lich","Wald"],["heim","berg","bach","stein","feld","hausen"]],
  catalana:[["Cast","Vila","Mont","Sant ","Bell"],["ell","franca","ral","oles","ach","lloc"]]
};
const APE = {
  bretona:["Le Gall","Le Goff","Guillou","Le Bihan","Le Roux","Tanguy","Kerbrat","Le Floch","Morvan","Le Meur"],
  normanda:["Lecomte","Lemoine","Leroux","Lefebvre","Hébert","Lecoq","Duval","Lepetit","Anquetil","Langlois"],
  norte:["Delannoy","Lefebvre","Dupont","Vasseur","Caron","Leclercq","Vandamme","Delattre","Lemaire","Deschamps"],
  central:["Martin","Bernard","Moreau","Dubois","Durand","Lefèvre","Laurent","Girard","Bonnin","Rousseau","Mercier","Chevalier","Leblanc"],
  este:["Petit","Guyot","Bouchard","Thiébaut","Gauthier","Perrin","Roy","Fournier","Mathieu","Jacquot","Bourgeois"],
  occitana:["Fabre","Roux","Bonnet","Rouquette","Blanc","Delmas","Vidal","Costes","Mas","Barthe","Laborde","Castaing"],
  provenzal:["Martel","Arnaud","Giraud","Imbert","Olive","Reynaud","Audibert","Gautier","Roubaud","Brun"],
  alpina:["Perret","Brunet","Favre","Collomb","Chabert","Bouvier","Pellet","Ravier","Mollard","Gros"],
  alemana:["Muller","Schmitt","Meyer","Weber","Klein","Hoffmann","Wagner","Koch","Fischer","Becker"],
  catalana:["Puig","Vidal","Roca","Ferrer","Pujol","Serra","Font","Camps","Sala"]
};
const REG_GRUPO = {"Bretaña":"bretona","Normandía":"normanda","Maine y Perche":"normanda","Picardía":"norte","Artois":"norte","Flandes y Henao":"norte",
  "Champaña":"este","Borgoña":"este","Franco Condado":"este","Metz y Verdún (Tres Obispados)":"este","Alsacia":"alemana",
  "Languedoc":"occitana","Guyena y Gascuña":"occitana","Bearne y Navarra":"occitana","Condado de Foix":"occitana","Lemosín":"occitana","Auvernia":"occitana",
  "Provenza":"provenzal","Rosellón":"catalana","Delfinado":"alpina","Lionesado":"alpina"};
/* Extranjeros: [nombres M, nombres F, apellidos, formato noble] */
const EXT = {
  italiana:[["Giovanni","Carlo","Francesco","Giuseppe","Antonio","Pietro","Lorenzo"],["Maria","Anna","Caterina","Lucrezia","Teresa"],["Rossi","Bianchi","Ferrari","Conti","Gallo","Moretti","Bassi"],["di ",[["Monte","Castel","Val","Rocca","Torre"],["alto","bruno","verde","franca","maggiore"]]]],
  espanola:[["Juan","Pedro","Diego","Francisco","José","Fernando"],["María","Ana","Isabel","Teresa","Catalina"],["García","López","Martínez","Sánchez","Pérez","Gómez","Ruiz"],["de ",[["Villa","Monte","Torre","Valde","Castro"],["franca","alegre","mayor","rubio","seca"]]]],
  portuguesa:[["João","Pedro","Manuel","António","Luís"],["Maria","Ana","Teresa","Joana"],["Silva","Pereira","Costa","Ferreira","Almeida"],["de ",[["Vila","Monte","Torre","Castelo"],["nova","alto","branco","real"]]]],
  alemana_ext:[["Johann","Friedrich","Georg","Karl","Heinrich","Wilhelm"],["Anna","Maria","Elisabeth","Sophie","Charlotte"],["Müller","Schmidt","Schneider","Weber","Wagner"],["von ",TOP.alemana]],
  suiza:[["Johann","Jakob","Ulrich","Jean","Pierre","Beat"],["Anna","Verena","Maria","Barbara"],["Keller","Steiner","Huber","Favre","Gerber","Ammann"],["von ",TOP.alemana]],
  neerlandesa:[["Jan","Pieter","Willem","Hendrik","Cornelis"],["Anna","Maria","Catharina","Johanna"],["de Vries","Jansen","van Dijk","Bakker","Visser"],["van ",[["Oost","Hoog","Bergh","Groen","Wal"],["wijk","land","stein","dael","ven"]]]],
  valona:[["Jean","Pierre","Hubert","Lambert","Nicolas"],["Marie","Anne","Catherine","Jeanne"],["Delvaux","Lambert","Dumont","Lejeune","Wauters","Peeters"],["de ",TOP.norte]],
  inglesa:[["William","Charles","John","Thomas","Richard"],["Mary","Anne","Elizabeth","Catherine","Sarah"],["Smith","Taylor","Brown","Wilson","Harris"],["",[["Ash","Thorn","Wey","Hart","Brad","Stan"],["ford","ley","bridge","wood","ham","ton"]]]],
  irlandesa:[["Patrick","Charles","James","Daniel","Terence","Owen"],["Mary","Bridget","Honora","Catherine","Margaret"],["O'Brien","MacCarthy","O'Connor","O'Sullivan","Burke","Fitzgerald","Walsh","Kelly"],null],
  escocesa:[["James","Alexander","John","Archibald","Lachlan"],["Margaret","Janet","Isobel","Agnes"],["Drummond","Murray","Gordon","Macdonald","Maclean","Ogilvy"],null],
  polaca:[["Jan","Stanisław","Józef","Antoni","Michał"],["Anna","Maria","Zofia","Katarzyna"],["Nowak","Kowalski","Wiśniewski","Zieliński","Lewandowski"],null],
  sueca:[["Erik","Carl","Gustaf","Johan"],["Anna","Maria","Brita","Kristina"],["Andersson","Johansson","Lindqvist","Ekström"],null],
  danesa:[["Hans","Christian","Peder","Niels"],["Anne","Karen","Maren"],["Hansen","Jensen","Nielsen","Rasmussen"],null],
  rusa:[["Ivan","Pyotr","Aleksey","Fyodor","Vasily"],["Anna","Mariya","Yekaterina","Natalya"],["Ivanov","Petrov","Sokolov","Volkov","Golovin"],null]
};
const EXT_GRUPO = {"Saboya":"alpina","Lorena":"este","Dombes":"alpina","Aviñón y Condado Venesino":"provenzal","Génova":"italiana","Toscana":"italiana","Venecia":"italiana","Milán":"italiana","Nápoles":"italiana","Estados Pontificios":"italiana",
  "España":"espanola","Portugal":"portuguesa","Suiza (cantones)":"suiza","Estados alemanes":"alemana_ext","Provincias Unidas":"neerlandesa","Países Bajos austríacos":"valona","Principado de Lieja":"valona",
  "Inglaterra":"inglesa","Irlanda (jacobita)":"irlandesa","Escocia (jacobita)":"escocesa","Polonia":"polaca","Suecia":"sueca","Dinamarca":"danesa","Rusia":"rusa"};
const topo = ([pre,suf]) => {
  let p=R(pre), s=R(suf), n=0;
  const V=/[aeiouyéèê]/i, eco=x=>p.toLowerCase().replace(/[- ]/g,"").endsWith(x.toLowerCase().slice(0,3));
  while(n++<12&&eco(s))s=R(suf);
  if(/[- ]$/.test(p)) return p+s.charAt(0).toUpperCase()+s.slice(1);
  if(V.test(p.slice(-1))&&V.test(s[0])) p=(/[ea]$/i.test(p)||p.slice(-1)===s[0])?p.slice(0,-1):p+"r";
  return (p+s).replace(/(.)\1\1+/g,"$1$1");
};
const de = t => /^[AEIOUÉÈY]/.test(t) ? "d'"+t : "de "+t;
const NOBLE = c => c==="espada"||c==="toga"||c==="nuevo";
function generarNombre(p){
  const sx=p.sexo==="F"?"F":"M";
  if(p.proc==="extranjero"){
    const g=EXT_GRUPO[p.region]||"italiana";
    if(!EXT[g]) return generarFrances(p,g);
    const [nm,nf,ape,nob]=EXT[g];
    let ap=(NOBLE(p.cuna)&&nob)?(nob[0]+topo(nob[1])).trim():R(ape);
    if(sx==="F"&&g==="polaca")ap=ap.replace(/ski$/,"ska").replace(/cki$/,"cka");
    if(sx==="F"&&g==="rusa")ap=ap+"a";
    return R(sx==="F"?nf:nm)+" "+ap;
  }
  return generarFrances(p, p.proc==="paris" ? "central" : (REG_GRUPO[p.region]||"central"));
}
function generarFrances(p,g){
  const sx=p.sexo==="F"?"F":"M", clase=NOBLE(p.cuna)?"noble":p.cuna==="pueblo"?"pueblo":"burguesia";
  const pool=NOM[sx][clase].concat(NOM_REG[g]?.[sx]&&clase!=="noble"?NOM_REG[g][sx]:[]);
  const tierra=topo(TOP[g]||TOP.central), comun=R(APE[g]||APE.central);
  const ap = p.cuna==="espada" ? de(tierra)
           : p.cuna==="toga" ? (Math.random()<.6 ? comun+" "+de(tierra) : de(tierra))
           : p.cuna==="nuevo" ? comun+" "+de(tierra)
           : comun;
  return R(pool)+" "+ap;
}
