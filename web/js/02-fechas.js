/* ---------- Fechas ---------- */
const JOURS=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];
const MOIS=["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
const MESES=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
const D=s=>{const[y,m,d]=s.split("-").map(Number);return new Date(Date.UTC(y,m-1,d))};
const iso=d=>d.toISOString().slice(0,10);
const addDays=(d,n)=>new Date(d.getTime()+n*864e5);
const fmtFr=d=>`${JOURS[d.getUTCDay()]} ${d.getUTCDate()} ${MOIS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
function easter(y){const a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),mo=Math.floor((h+l-7*m+114)/31),da=((h+l-7*m+114)%31)+1;return new Date(Date.UTC(y,mo-1,da))}
function feasts(y){
  const e=easter(y), out={};
  [[-46,"Miércoles de Ceniza"],[-7,"Domingo de Ramos"],[-2,"Viernes Santo"],[0,"Pascua"],[39,"Ascensión"],[49,"Pentecostés"],[60,"Corpus Christi (Fête-Dieu)"]].forEach(([n,t])=>out[iso(addDays(e,n))]=t);
  [["01-01","Año Nuevo"],["01-06","Epifanía"],["02-02","Candelaria"],["03-25","Anunciación"],["06-24","San Juan"],["06-29","San Pedro y San Pablo"],["08-15","Asunción"],["08-25","San Luis, santo del rey"],["09-08","Natividad de la Virgen"],["11-01","Todos los Santos"],["11-02","Fieles Difuntos"],["12-08","Inmaculada Concepción"],["12-25","Navidad"]].forEach(([md,t])=>out[y+"-"+md]=t);
  return out;
}
/* Citas de la partida (ejemplo, ligadas a los papeles del escritorio) */
const CITAS = {"1722-06-15":"Llegada de la corte a Versalles","1722-06-18":"Cena con el abate de Saint-Pierre","1722-06-21":"Límite para presentarse ante el primer médico","1722-06-30":"Vence la deuda con el boticario"};
let hoy=null, calMes=null, calSel=null;
