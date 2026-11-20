/* ---------- Heráldica y casas familiares ---------- */
(function (global) {
  const NS = "http://www.w3.org/2000/svg";
  const ECU_PATH = "M 10,8 H 110 V 82 C 110,114 90,124 72,126 C 65,127 62,130 60,135 C 58,130 55,127 48,126 C 30,124 10,114 10,82 Z";
  const RAMA_NOMBRES = {
    borbon: "Tronco Borbón",
    rohan: "Casa de Rohan",
    albert: "Casa d'Albert (Luynes)",
    lorena: "Casa de Lorena",
    wittelsbach: "Casa de Wittelsbach",
    noailles: "Casa de Noailles",
    colbert: "Casa Colbert",
  };
  const CAT_NOMBRES = {
    real: "Casa real",
    principe_extranjero: "Príncipe extranjero",
    noble_alta: "Alta nobleza",
    noble_espada: "Nobleza de espada",
    toga: "Toga y clero",
    finanzas: "Finanzas",
    servicio_ennoblecido: "Servicio ennoblecido",
    extranjera: "Casa extranjera",
    plebeya: "Casa plebeya",
  };
  const ESTADO_NOMBRES = {
    wikimedia_local: "Escudo histórico (Wikimedia)",
    wikimedia_pendiente: "Armas históricas (pendiente H2)",
    blason_manual: "Blasón documentado (dibujo pendiente H2)",
    plebeya_generico: "Emblema bicolor provisional",
    por_verificar: "Blasón por verificar (H2/H3)",
  };

  let casas = [];
  let byId = Object.create(null);
  let escudos = Object.create(null);
  let uid = 0;

  const safeHex = (v, fb) => /^#[0-9a-fA-F]{6}$/.test(String(v || "")) ? v : fb;

  function inicialesCasa(nombre) {
    const clean = String(nombre || "?")
      .replace(/\([^)]*\)/g, "")
      .replace(/\b(de|du|des|da|di|d'|la|le|el|del|casa|sir)\b/gi, " ")
      .trim();
    const parts = clean.split(/[\s-]+/).filter(Boolean);
    if (!parts.length) return "?";
    return parts.slice(0, 2).map((p) => p[0].toUpperCase()).join("");
  }

  function svgEl(tag, attrs) {
    const node = document.createElementNS(NS, tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        node.setAttribute(k, String(v));
      }
    }
    return node;
  }

  function crearSvgMarco(w, h) {
    const idNum = ++uid;
    const clipId = "ecu-c-" + idNum;
    const glossId = "ecu-g-" + idNum;
    const svg = svgEl("svg", {
      viewBox: "0 0 120 140",
      width: w,
      height: h,
      class: "esc-svg",
      "aria-hidden": "true",
    });
    const defs = svgEl("defs");
    const cp = svgEl("clipPath", { id: clipId });
    cp.append(svgEl("path", { d: ECU_PATH }));
    const rg = svgEl("radialGradient", { id: glossId, cx: "32%", cy: "22%", r: "74%" });
    rg.append(
      svgEl("stop", { offset: "0%", "stop-color": "#ffffff", "stop-opacity": "0.22" }),
      svgEl("stop", { offset: "52%", "stop-color": "#ffffff", "stop-opacity": "0.03" }),
      svgEl("stop", { offset: "100%", "stop-color": "#000000", "stop-opacity": "0.18" })
    );
    defs.append(cp, rg);
    const body = svgEl("g", { "clip-path": `url(#${clipId})` });
    svg.append(defs, body);
    return { svg, body, glossId };
  }

  function renderPlebeyoSvg(casa, px) {
    const w = px;
    const h = Math.round((px * 140) / 120);
    const { svg, body, glossId } = crearSvgMarco(w, h);
    const pd = casa.plebeya_diseno || {};
    const c1 = safeHex(pd.c1, "#263859");
    const c2 = safeHex(pd.c2, "#f2ead7");
    const pat = pd.patron || "partido_horizontal";

    body.append(svgEl("rect", { x: 0, y: 0, width: 120, height: 140, fill: c1 }));

    if (pat === "partido_horizontal") {
      body.append(
        svgEl("rect", { x: 8, y: 68, width: 104, height: 70, fill: c2 }),
        svgEl("line", { x1: 8, y1: 68, x2: 112, y2: 68, stroke: "#1a1a1a", "stroke-width": 1.4, opacity: 0.45 })
      );
    } else if (pat === "partido_vertical") {
      body.append(
        svgEl("rect", { x: 60, y: 6, width: 54, height: 132, fill: c2 }),
        svgEl("line", { x1: 60, y1: 6, x2: 60, y2: 138, stroke: "#1a1a1a", "stroke-width": 1.4, opacity: 0.45 })
      );
    } else if (pat === "grid_2x2") {
      body.append(
        svgEl("rect", { x: 60, y: 8, width: 52, height: 60, fill: c2 }),
        svgEl("rect", { x: 8, y: 68, width: 52, height: 70, fill: c2 }),
        svgEl("line", { x1: 60, y1: 8, x2: 60, y2: 136, stroke: "#1a1a1a", "stroke-width": 1.3, opacity: 0.45 }),
        svgEl("line", { x1: 8, y1: 68, x2: 112, y2: 68, stroke: "#1a1a1a", "stroke-width": 1.3, opacity: 0.45 })
      );
    } else if (pat === "rayas_horizontales") {
      const paso = 127 / 6;
      for (let i = 1; i < 6; i += 2) {
        body.append(svgEl("rect", { x: 8, y: (8 + i * paso).toFixed(1), width: 104, height: (paso + 0.5).toFixed(1), fill: c2 }));
      }
    } else if (pat === "rayas_verticales") {
      const paso = 100 / 6;
      for (let i = 1; i < 6; i += 2) {
        body.append(svgEl("rect", { x: (10 + i * paso).toFixed(1), y: 6, width: (paso + 0.4).toFixed(1), height: 132, fill: c2 }));
      }
    } else if (pat === "moteado") {
      const coords = [
        [28, 26], [60, 26], [92, 26],
        [18, 48], [44, 48], [76, 48], [102, 48],
        [28, 70], [60, 70], [92, 70],
        [22, 92], [47, 92], [73, 92], [98, 92],
        [38, 113], [60, 113], [82, 113],
      ];
      for (const [cx, cy] of coords) {
        body.append(svgEl("path", {
          d: `M ${cx},${cy - 6.5} C ${cx + 4},${cy - 1} ${cx + 4.5},${cy + 3.5} ${cx},${cy + 6} C ${cx - 4.5},${cy + 3.5} ${cx - 4},${cy - 1} ${cx},${cy - 6.5} Z`,
          fill: c2,
          stroke: "#1a1a1a",
          "stroke-width": 0.7,
          "stroke-opacity": 0.35,
        }));
      }
    }

    body.append(svgEl("rect", { x: 0, y: 0, width: 120, height: 140, fill: `url(#${glossId})` }));
    svg.append(svgEl("path", { d: ECU_PATH, fill: "none", stroke: "#1a1a1a", "stroke-width": 2.4 }));
    return svg;
  }

  function renderPendienteSvg(casa, px) {
    const w = px;
    const h = Math.round((px * 140) / 120);
    const { svg, body } = crearSvgMarco(w, h);
    body.append(svgEl("rect", { x: 0, y: 0, width: 120, height: 140, fill: "#efe9da" }));
    const txt = svgEl("text", {
      x: 60,
      y: 77,
      "text-anchor": "middle",
      "font-family": "Georgia, serif",
      "font-size": 34,
      "font-weight": 600,
      fill: "#7c673b",
    });
    txt.textContent = inicialesCasa(casa.nombre);
    body.append(txt);
    svg.append(
      svgEl("path", { d: ECU_PATH, fill: "none", stroke: "#9c8554", "stroke-width": 2.2, "stroke-dasharray": "5 3" })
    );
    return svg;
  }

  function setCasas(list) {
    casas = Array.isArray(list) ? list : [];
    byId = Object.create(null);
    for (const c of casas) byId[c.id] = c;
  }

  function setEscudos(filesObj) {
    escudos = filesObj && typeof filesObj === "object" ? filesObj : Object.create(null);
  }

  function get(id) {
    return (id && byId[id]) || null;
  }

  function all() {
    return casas;
  }

  function nombre(id) {
    return (id && byId[id] && byId[id].nombre) || id || "";
  }

  function ramaNombre(rama) {
    return RAMA_NOMBRES[rama] || rama || "";
  }

  function coincideCasa(c, targetId) {
    if (!targetId) return true;
    if (!c) return false;
    if (targetId.startsWith("rama:")) {
      const rama = targetId.slice(5);
      return [c.casa_id, c.casa_materna_id, c.casa_alianza_id].some((id) => id && byId[id] && byId[id].rama_de === rama);
    }
    return c.casa_id === targetId || c.casa_materna_id === targetId || c.casa_alianza_id === targetId;
  }

  function personajesDeCasa(casaId, lista) {
    const pat = [];
    const mat = [];
    const ali = [];
    const seen = new Set();
    const todos = [];
    for (const p of lista || []) {
      let hit = false;
      if (p.casa_id === casaId) { pat.push(p); hit = true; }
      if (p.casa_materna_id === casaId) { mat.push(p); hit = true; }
      if (p.casa_alianza_id === casaId) { ali.push(p); hit = true; }
      if (hit && !seen.has(p.id)) {
        seen.add(p.id);
        todos.push(p);
      }
    }
    return { pat, mat, ali, todos };
  }

  function poblarSelect(selEl, listaPersonajes, etiquetaTodas) {
    if (!selEl) return;
    const prev = selEl.value;
    selEl.textContent = "";
    const opt0 = document.createElement("option");
    opt0.value = "";
    opt0.textContent = etiquetaTodas || "Todas";
    selEl.append(opt0);

    const cuentas = Object.create(null);
    const ramasSet = Object.create(null);
    for (const p of listaPersonajes || []) {
      const ids = new Set([p.casa_id, p.casa_materna_id, p.casa_alianza_id].filter(Boolean));
      const ramasP = new Set();
      for (const cid of ids) {
        cuentas[cid] = (cuentas[cid] || 0) + 1;
        const c = byId[cid];
        if (c && c.rama_de) ramasP.add(c.rama_de);
      }
      for (const rm of ramasP) ramasSet[rm] = (ramasSet[rm] || 0) + 1;
    }

    const ramasOrdenadas = Object.keys(ramasSet).sort((a, b) => ramaNombre(a).localeCompare(ramaNombre(b), "es"));
    if (ramasOrdenadas.length) {
      const ogR = document.createElement("optgroup");
      ogR.label = "Troncos familiares";
      for (const rm of ramasOrdenadas) {
        const o = document.createElement("option");
        o.value = "rama:" + rm;
        o.textContent = `${ramaNombre(rm)} (${ramasSet[rm]})`;
        ogR.append(o);
      }
      selEl.append(ogR);
    }

    const casasConGente = Object.keys(cuentas)
      .map((id) => byId[id])
      .filter(Boolean)
      .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    if (casasConGente.length) {
      const ogC = document.createElement("optgroup");
      ogC.label = "Casas en la corte";
      for (const c of casasConGente) {
        const o = document.createElement("option");
        o.value = c.id;
        o.textContent = `${c.nombre} (${cuentas[c.id]})`;
        ogC.append(o);
      }
      selEl.append(ogC);
    }

    if ([...selEl.options].some((o) => o.value === prev)) selEl.value = prev;
  }

  function escudoEl(casaId, opts) {
    const o = opts || {};
    const size = o.size || 28;
    const casa = get(casaId);
    const wrap = document.createElement("span");
    wrap.className = "esc-wrap" + (o.cls ? " " + o.cls : "");
    wrap.style.width = size + "px";
    wrap.style.height = Math.round((size * 140) / 120) + "px";

    if (!casa) {
      wrap.classList.add("esc-missing");
      wrap.title = o.rol ? `${o.rol}: por verificar` : "Casa por verificar";
      wrap.append(renderPendienteSvg({ nombre: "?" }, size));
      return wrap;
    }

    const estadoNom = ESTADO_NOMBRES[casa.escudo_estado] || "";
    wrap.title = (o.rol ? o.rol + ": " : "") + casa.nombre + (estadoNom ? " · " + estadoNom : "");

    if (casa.escudo_estado === "wikimedia_local" && casa.escudo_ref && escudos[casa.escudo_ref]) {
      const img = new Image();
      img.className = "esc-img";
      img.src = escudos[casa.escudo_ref];
      img.alt = "Escudo de " + casa.nombre;
      img.loading = "lazy";
      wrap.append(img);
    } else if (casa.escudo_estado === "plebeya_generico") {
      wrap.classList.add("esc-pleb");
      wrap.append(renderPlebeyoSvg(casa, size));
    } else {
      wrap.classList.add("esc-pend");
      wrap.append(renderPendienteSvg(casa, size));
    }
    return wrap;
  }

  function parCasasEl(p, opts) {
    const o = opts || {};
    const sz = o.size || 26;
    const szSec = Math.max(16, Math.round(sz * 0.72));
    const wrap = document.createElement("div");
    wrap.className = "casas-par" + (o.cls ? " " + o.cls : "");
    if (!p || !p.casa_id) return wrap;

    const addOne = (cid, size, rol, extraCls) => {
      const esc = escudoEl(cid, { size, rol, cls: extraCls });
      if (o.onClick && cid && byId[cid]) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "esc-btn";
        btn.title = esc.title;
        btn.setAttribute("aria-label", esc.title);
        btn.append(esc);
        btn.onclick = (ev) => {
          ev.stopPropagation();
          o.onClick(cid, btn);
        };
        wrap.append(btn);
      } else {
        wrap.append(esc);
      }
    };

    addOne(p.casa_id, sz, "Casa paterna", "esc-pat");
    if (p.casa_materna_id) {
      addOne(p.casa_materna_id, szSec, "Casa materna", "esc-mat");
    }
    if (o.incluirAlianza && p.casa_alianza_id) {
      addOne(p.casa_alianza_id, szSec, "Casa de alianza", "esc-ali");
    }
    return wrap;
  }

  global.Heraldica = {
    CATEGORIAS: CAT_NOMBRES,
    ESTADOS: ESTADO_NOMBRES,
    PATRONES_PLEBEYOS: [
      "partido_horizontal",
      "partido_vertical",
      "grid_2x2",
      "rayas_horizontales",
      "rayas_verticales",
      "moteado",
    ],
    setCasas,
    setEscudos,
    get,
    all,
    nombre,
    ramaNombre,
    coincideCasa,
    personajesDeCasa,
    poblarSelect,
    escudoEl,
    parCasasEl,
  };
})(window);
