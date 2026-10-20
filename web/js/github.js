/* ---------- Editor en GitHub ----------
   Sin base de datos en vivo, el dueño edita con su llave (token fine-grained de GitHub
   con permiso Contents: Read and write solo sobre lucumur/Game). La llave vive solo en
   este navegador (localStorage) y nunca se escribe en el repositorio.
   GH.doc("retratos/p01").set({img}) / .delete() escribe directamente en web/datos/. */
const GH=(()=>{
  const REPO="lucumur/Game", RAMA="main", RAIZ="web/datos/", KEY="gh_token";
  const tok=()=>{try{return localStorage.getItem(KEY)||""}catch(e){return ""}};
  const api=(path,opt={})=>fetch("https://api.github.com/repos/"+REPO+path,{...opt,headers:{Accept:"application/vnd.github+json",Authorization:"Bearer "+tok(),...(opt.headers||{})}});
  const b64=s=>{const u=new TextEncoder().encode(s);let r="";for(let i=0;i<u.length;i+=0x8000)r+=String.fromCharCode(...u.subarray(i,i+0x8000));return btoa(r)};
  const unb64=s=>new TextDecoder().decode(Uint8Array.from(atob(s.replace(/\s/g,"")),c=>c.charCodeAt(0)));
  async function leer(ruta){const r=await api("/contents/"+ruta+"?ref="+RAMA);if(r.status===404)return null;if(!r.ok)throw new Error("GitHub "+r.status);return r.json()}
  async function escribir(ruta,contenido64,msg){const prev=await leer(ruta);
    const r=await api("/contents/"+ruta,{method:"PUT",body:JSON.stringify({message:msg,content:contenido64,branch:RAMA,...(prev?{sha:prev.sha}:{})})});
    if(!r.ok)throw new Error("GitHub "+r.status+(r.status===403||r.status===401?" (revisa la llave y su permiso de escritura)":""))}
  async function borrar(ruta,msg){const prev=await leer(ruta);if(!prev)return;
    const r=await api("/contents/"+ruta,{method:"DELETE",body:JSON.stringify({message:msg,sha:prev.sha,branch:RAMA})});if(!r.ok)throw new Error("GitHub "+r.status)}
  async function json(ruta,cambio,msg){const prev=await leer(ruta);const v=prev?JSON.parse(unb64(prev.content)):{};cambio(v);
    await escribir(ruta,b64(JSON.stringify(v,null,1)+"\n"),msg)}
  let cola=Promise.resolve(); const enCola=f=>(cola=cola.then(f,f));
  const avisar=(c,id,d)=>{try{window.ghCambio&&window.ghCambio(c,id,d)}catch(e){}};
  function doc(path){const [col,id]=path.split("/");
    return {
      set:data=>enCola(async()=>{
        if(col==="retratos"||col==="estancias"){const ext=/^data:image\/png/.test(data.img)?"png":"jpg",f=id+"."+ext;
          await escritor(RAIZ+col+"/"+f,data.img.split(",")[1],"Subir "+(col==="retratos"?"retrato ":"imagen de estancia ")+id);
          await json(RAIZ+"indice.json",v=>{v[col]=(v[col]||[]).filter(x=>x.replace(/\.\w+$/,"")!==id);v[col].push(f);v[col].sort()},"Índice: "+col+"/"+f)}
        else if(col==="ocupantes")await json(RAIZ+"ocupantes.json",v=>{v[id]=data},"Ocupantes de "+id);
        else throw new Error("Colección no editable: "+col);
        avisar(col,id,data)}),
      delete:()=>enCola(async()=>{
        if(col==="retratos"||col==="estancias"){let f=null;
          await json(RAIZ+"indice.json",v=>{f=(v[col]||[]).find(x=>x.replace(/\.\w+$/,"")===id);v[col]=(v[col]||[]).filter(x=>x!==f)},"Índice: quitar "+col+"/"+id);
          if(f)await borrar(RAIZ+col+"/"+f,"Quitar "+col+"/"+f)}
        else if(col==="ocupantes")await json(RAIZ+"ocupantes.json",v=>{delete v[id]},"Ocupantes: quitar "+id);
        avisar(col,id,null)})}}
  const escritor=(ruta,c64,msg)=>escribir(ruta,c64,msg);
  async function comprobar(){if(!tok())return false;try{const r=await api("");if(!r.ok)return false;const j=await r.json();return !!(j.permissions&&j.permissions.push)}catch(e){return false}}
  return {doc,comprobar,tiene:()=>!!tok(),
    guardar:t=>{try{localStorage.setItem(KEY,t.trim())}catch(e){}},quitar:()=>{try{localStorage.removeItem(KEY)}catch(e){}}};
})();
