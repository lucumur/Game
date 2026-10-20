/* ---------- Utilidades ---------- */
const MEM={};
const store={get(k,d){try{const v=localStorage.getItem(k);if(v!=null)return JSON.parse(v)}catch(e){}return k in MEM?MEM[k]:d},set(k,v){if(v==null)return store.del(k);MEM[k]=v;try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},del(k){delete MEM[k];try{localStorage.removeItem(k)}catch(e){}}};
let player=store.get("vg_player",null);
const $=s=>document.querySelector(s);
const el=(t,a={},...c)=>{const e=document.createElement(t);for(const[k,v]of Object.entries(a)){if(v==null)continue;if(k==="class")e.className=v;else if(k.startsWith("on"))e.addEventListener(k.slice(2),v);else e.setAttribute(k,v)}for(const x of c)if(x!=null&&x!=="")e.append(x);return e};
const glById=Object.fromEntries(GLOSARIO.map(g=>[g.id,g]));
let unlocked=new Set(store.get("vg_glosario",[]));
function unlock(id){if(glById[id]&&!unlocked.has(id)){unlocked.add(id);store.set("vg_glosario",[...unlocked])}}
/* Convierte "texto [[id|etiqueta]]" en nodos; desbloquea los términos que aparecen. */
function rich(text){
  const frag=document.createDocumentFragment(); let last=0;
  text.replace(/\[\[([\w-]+)(?:\|([^\]]+))?\]\]/g,(m,id,label,i)=>{
    frag.append(text.slice(last,i)); last=i+m.length; unlock(id);
    frag.append(el("button",{class:"gl",type:"button",onclick:()=>{go("diario");showGloss(id)}},label||glById[id]?.termino||id));
  });
  frag.append(text.slice(last)); return frag;
}
