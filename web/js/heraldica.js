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
    escudo_propio: "Escudo propio (subido)",
    wikimedia_local: "Escudo histórico (Wikimedia)",
    wikimedia_pendiente: "Armas históricas (pendiente H2)",
    blason_manual: "Blasón documentado (dibujo pendiente H2)",
    plebeya_generico: "Emblema plebeyo (código oficio/origen)",
    por_verificar: "Blasón por verificar (H2/H3)",
  };
  const PALETA_PLEBEYA = {
    oscuros: [
      { id: "azul_petroleo", nombre: "Azul petróleo", hex: "#22415a", lectura: "Mar, puertos, ríos y navegación" },
      { id: "carmesi", nombre: "Carmesí", hex: "#5c2228", lectura: "Textil, vestido y vino" },
      { id: "terracota", nombre: "Terracota", hex: "#7a3320", lectura: "Comercio, mercados y botica" },
      { id: "bosque", nombre: "Bosque", hex: "#264639", lectura: "Campo, bosque y tierra" },
      { id: "ciruela", nombre: "Ciruela", hex: "#4a3556", lectura: "Artes, letras y música" },
      { id: "nogal", nombre: "Nogal", hex: "#5a3d24", lectura: "Arquitectura, madera y obra" },
      { id: "negro", nombre: "Negro", hex: "#1e2024", lectura: "Pluma, leyes, medicina y servicio interior" },
    ],
    claros: [
      { id: "plata", nombre: "Plata / Lino", hex: "#f5f3ec", lectura: "París e Île-de-France" },
      { id: "oro", nombre: "Oro suave", hex: "#e8c45a", lectura: "Dinero, contratas o servicio real" },
      { id: "celeste", nombre: "Celeste", hex: "#b9cfe3", lectura: "Norte, Oeste o extranjero" },
      { id: "salmon", nombre: "Salmón", hex: "#e4b8a6", lectura: "Sur y Centro / Midi" },
    ],
    neutros: [
      { id: "salvia_prof", nombre: "Salvia profunda", hex: "#6f886b", lectura: "Raíz rural o botánica" },
      { id: "ocre_prof", nombre: "Ocre profundo", hex: "#a67f43", lectura: "Gremio tradicional o mercado" },
      { id: "piedra", nombre: "Piedra", hex: "#847e74", lectura: "Oficio aún sin documentar" },
    ],
  };
  const BI_SIN_INV = new Set(["rayas_horizontales", "rayas_verticales"]);
  const TODOS_PATRONES = [
    "partido_horizontal",
    "partido_vertical",
    "grid_2x2",
    "rayas_horizontales",
    "rayas_verticales",
    "moteado",
    "grid_2x2_tricolor",
    "tres_bandas",
  ];

  let casas = [];
  let byId = Object.create(null);
  let escudos = Object.create(null);
  let escudosPropios = Object.create(null);
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
    } else if (pat === "grid_2x2_tricolor") {
      const c3 = safeHex(pd.c3, "#5c2228");
      const inv = Boolean(pd.inv);
      const q1 = inv ? c2 : c1;
      const q2 = inv ? c1 : c2;
      const q3 = inv ? c3 : c2;
      const q4 = inv ? c2 : c3;
      body.append(
        svgEl("rect", { x: 8, y: 8, width: 52, height: 60, fill: q1 }),
        svgEl("rect", { x: 60, y: 8, width: 52, height: 60, fill: q2 }),
        svgEl("rect", { x: 8, y: 68, width: 52, height: 70, fill: q3 }),
        svgEl("rect", { x: 60, y: 68, width: 52, height: 70, fill: q4 }),
        svgEl("line", { x1: 60, y1: 8, x2: 60, y2: 136, stroke: "#1a1a1a", "stroke-width": 1.3, opacity: 0.45 }),
        svgEl("line", { x1: 8, y1: 68, x2: 112, y2: 68, stroke: "#1a1a1a", "stroke-width": 1.3, opacity: 0.45 })
      );
    } else if (pat === "tres_bandas") {
      const c3 = safeHex(pd.c3, "#4a3556");
      body.append(
        svgEl("rect", { x: 8, y: 8, width: 104, height: 42, fill: c1 }),
        svgEl("rect", { x: 8, y: 50, width: 104, height: 42, fill: c2 }),
        svgEl("rect", { x: 8, y: 92, width: 104, height: 46, fill: c3 }),
        svgEl("line", { x1: 8, y1: 50, x2: 112, y2: 50, stroke: "#1a1a1a", "stroke-width": 1.2, opacity: 0.45 }),
        svgEl("line", { x1: 8, y1: 92, x2: 112, y2: 92, stroke: "#1a1a1a", "stroke-width": 1.2, opacity: 0.45 })
      );
    }

    body.append(svgEl("rect", { x: 0, y: 0, width: 120, height: 140, fill: `url(#${glossId})` }));
    svg.append(svgEl("path", { d: ECU_PATH, fill: "none", stroke: "#1a1a1a", "stroke-width": 2.4 }));
    return svg;
  }

  function firmaPlebeya(pd) {
    if (!pd || !pd.patron) return "";
    const p = pd.patron;
    const c1 = String(pd.c1 || "").toLowerCase();
    const c2 = String(pd.c2 || "").toLowerCase();
    if (BI_SIN_INV.has(p)) {
      const par = [c1, c2].sort();
      return `${p}|${par[0]}|${par[1]}`;
    }
    if (p === "grid_2x2_tricolor" || p === "tres_bandas") {
      const c3 = String(pd.c3 || "").toLowerCase();
      const inv = p === "grid_2x2_tricolor" ? (pd.inv ? 1 : 0) : 0;
      return `${p}|${c1}|${c2}|${c3}|${inv}`;
    }
    return `${p}|${c1}|${c2}`;
  }

  function generarPlebeyoUnico(base, usadosSet, seed) {
    const usados = usadosSet instanceof Set ? usadosSet : new Set(usadosSet || []);
    const cand0 = { ...(base || { patron: "partido_horizontal", c1: "#847e74", c2: "#f5f3ec" }) };
    if (!usados.has(firmaPlebeya(cand0))) return cand0;

    let h = 2166136261;
    const str = String(seed || JSON.stringify(cand0));
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619) >>> 0;
    }
    const nextRand = () => {
      h = (Math.imul(1664525, h) + 1013904223) >>> 0;
      return h / 4294967296;
    };
    const poolOsc = [...PALETA_PLEBEYA.oscuros, ...PALETA_PLEBEYA.neutros].map((x) => x.hex);
    const poolCla = [...PALETA_PLEBEYA.claros, ...PALETA_PLEBEYA.neutros].map((x) => x.hex);
    const esTri = cand0.patron === "grid_2x2_tricolor" || cand0.patron === "tres_bandas";

    for (let i = 0; i < 300; i++) {
      const c = { ...cand0 };
      if (esTri) {
        const alt = poolOsc.filter((x) => x.toLowerCase() !== c.c1.toLowerCase());
        c.c3 = alt[Math.floor(nextRand() * alt.length)];
        if (cand0.patron === "grid_2x2_tricolor" && i < 2) c.inv = !cand0.inv;
        else if (i > 20) c.c2 = poolCla[Math.floor(nextRand() * poolCla.length)];
      } else {
        const patsBi = TODOS_PATRONES.slice(0, 6);
        c.patron = patsBi[(i + Math.floor(nextRand() * patsBi.length)) % patsBi.length];
        if (!BI_SIN_INV.has(c.patron) && i % 3 === 1) {
          c.c1 = cand0.c2;
          c.c2 = cand0.c1;
        }
        if (i >= patsBi.length * 2) {
          const alts = poolCla.filter((x) => x.toLowerCase() !== c.c1.toLowerCase());
          if (alts.length) c.c2 = alts[Math.floor(nextRand() * alts.length)];
        }
      }
      if (!usados.has(firmaPlebeya(c))) return c;
    }
    return cand0;
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

  function setEscudosPropios(filesObj) {
    escudosPropios = Object.create(null);
    if (filesObj && typeof filesObj === "object") {
      for (const [k, v] of Object.entries(filesObj)) {
        if (v) escudosPropios[k] = v;
      }
    }
  }

  function setEscudoPropio(id, src) {
    if (!id) return;
    if (src) escudosPropios[id] = src;
    else delete escudosPropios[id];
  }

  function tieneEscudoPropio(id) {
    return Boolean(id && escudosPropios[id]);
  }

  function estadoEfectivo(casa) {
    if (!casa) return "";
    return tieneEscudoPropio(casa.id) ? "escudo_propio" : (casa.escudo_estado || "");
  }

  function bytesToBase64(bytes) {
    let bin = "";
    for (let i = 0; i < bytes.length; i += 0x8000) {
      bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    }
    return btoa(bin);
  }

  async function procesarArchivo(file) {
    if (!file) throw new Error("No se seleccionó ningún archivo.");
    const name = file.name || "";
    const isSvg = file.type === "image/svg+xml" || /\.svg$/i.test(name);
    const isPng = file.type === "image/png" || /\.png$/i.test(name);
    if (!isSvg && !isPng) {
      throw new Error("Solo se admiten archivos SVG o PNG.");
    }
    if (isSvg) {
      if (file.size > 2 * 1024 * 1024) {
        throw new Error("El SVG pesa demasiado (máximo 2 MB).");
      }
      const txt = await file.text();
      const doc = new DOMParser().parseFromString(txt, "image/svg+xml");
      if (doc.querySelector("parsererror") || !doc.documentElement || doc.documentElement.tagName.toLowerCase() !== "svg") {
        throw new Error("El archivo SVG no es válido.");
      }
      const bytes = new TextEncoder().encode(txt);
      return "data:image/svg+xml;base64," + bytesToBase64(bytes);
    }
    if (file.size > 10 * 1024 * 1024) {
      throw new Error("El PNG pesa demasiado (máximo 10 MB).");
    }
    return new Promise((ok, ko) => {
      const u = URL.createObjectURL(file);
      const im = new Image();
      im.onload = () => {
        try {
          const nw = im.naturalWidth || 1, nh = im.naturalHeight || 1;
          const m = Math.max(nw, nh), scale = m > 512 ? 512 / m : 1;
          const tw = Math.max(1, Math.round(nw * scale)), th = Math.max(1, Math.round(nh * scale));
          const c = document.createElement("canvas");
          c.width = tw;
          c.height = th;
          c.getContext("2d").drawImage(im, 0, 0, tw, th);
          URL.revokeObjectURL(u);
          ok(c.toDataURL("image/png"));
        } catch (err) {
          URL.revokeObjectURL(u);
          ko(err);
        }
      };
      im.onerror = () => {
        URL.revokeObjectURL(u);
        ko(new Error("No se pudo leer la imagen PNG."));
      };
      im.src = u;
    });
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

    const estEf = estadoEfectivo(casa);
    const estadoNom = ESTADO_NOMBRES[estEf] || "";
    wrap.title = (o.rol ? o.rol + ": " : "") + casa.nombre + (estadoNom ? " · " + estadoNom : "");

    if (escudosPropios[casaId]) {
      const img = new Image();
      img.className = "esc-img";
      img.src = escudosPropios[casaId];
      img.alt = "Escudo de " + casa.nombre;
      img.loading = "lazy";
      wrap.append(img);
    } else if (casa.escudo_estado === "wikimedia_local" && casa.escudo_ref && escudos[casa.escudo_ref]) {
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
    PALETA_PLEBEYA,
    PATRONES_PLEBEYOS: TODOS_PATRONES,
    firmaPlebeya,
    generarPlebeyoUnico,
    setCasas,
    setEscudos,
    setEscudosPropios,
    setEscudoPropio,
    tieneEscudoPropio,
    estadoEfectivo,
    procesarArchivo,
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
