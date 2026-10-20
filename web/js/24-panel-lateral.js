/* ---------- Panel lateral ----------
   En pantallas anchas, la ficha no tapa el juego: el juego se queda con 2/3 y la ficha con 1/3.
   En pantallas estrechas sigue siendo una hoja superpuesta. */
(()=>{const f=$("#ficha"); if(!f)return;
  const sync=()=>document.body.classList.toggle("con-ficha",!f.hidden);
  new MutationObserver(sync).observe(f,{attributes:true,attributeFilter:["hidden"]}); sync();
})();
