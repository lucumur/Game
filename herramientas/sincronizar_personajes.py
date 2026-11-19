"""Sincroniza y valida la base de personajes del proyecto.

Fuente maestra: web/datos/personajes.json (119 fichas).
Genera:
  - canon/personajes.json (capa publica sincronizada)
  - web/js/00-datos.js (PERSONAJES, LINAJE y GLOSARIO incrustados)

Uso:
  python herramientas/sincronizar_personajes.py          # sincroniza y valida
  python herramientas/sincronizar_personajes.py --check  # solo valida sin escribir
"""
import argparse
import json
import pathlib
import re
import sys

RAIZ = pathlib.Path(__file__).resolve().parents[1]
R_DATOS = RAIZ / "web" / "datos" / "personajes.json"
R_SIMBOLOS = RAIZ / "web" / "datos" / "simbolos.json"
R_CANON = RAIZ / "canon" / "personajes.json"
R_LINAJE = RAIZ / "canon" / "linaje.json"
R_GLOSARIO = RAIZ / "canon" / "glosario.json"
R_00 = RAIZ / "web" / "js" / "00-datos.js"
R_OCUP = RAIZ / "web" / "datos" / "ocupantes.json"
R_MAPAS = RAIZ / "web" / "js" / "12-mapas.js"
R_FRANCIA = RAIZ / "web" / "js" / "14-francia-mapa-de-provincias-a.js"

RANGOS_VALIDOS = {
    "sang", "legitime", "etranger", "pair", "epee",
    "robe", "eglise", "service", "finance", "ambassade",
}
PRESENCIAS_VALIDAS = {
    "reside", "frecuenta", "ocasional", "ausente", "por verificar",
}
CORRECCIONES_NOTAS = {
    "mariana-victoria",
    "noailles",
    "armand-jules-rohan",
    "claude-st-georges-rouen",
}


def limpiar(v):
    s = str(v or "").strip()
    return "" if s in ("", "—") else s


def normalizar_nacimiento(raw):
    s = str(raw or "").strip()
    m = re.match(r"^(\d{2})/(\d{2})/(\d{4})\b", s)
    if m:
        return f"{m.group(3)}-{m.group(2)}-{m.group(1)}"
    m = re.match(r"^(\d{4})-(\d{2})-(\d{2})\b", s)
    if m:
        return f"{m.group(1)}-{m.group(2)}-{m.group(3)}"
    m = re.search(r"\b(\d{4})\b", s)
    if m:
        return m.group(1)
    raise ValueError(f"No se pudo extraer fecha de nacimiento de {raw!r}")


def calcular_edad(nac_iso, edad_raw):
    m = re.match(r"^(\d{4})-(\d{2})-(\d{2})$", nac_iso)
    if m:
        y, mo, da = int(m.group(1)), int(m.group(2)), int(m.group(3))
        return 1722 - y - (1 if (mo, da) > (6, 15) else 0)
    m_yr = re.match(r"^(\d{4})$", nac_iso)
    m_ed = re.search(r"(\d+)", str(edad_raw or ""))
    if m_ed:
        return int(m_ed.group(1))
    if m_yr:
        return 1722 - int(m_yr.group(1))
    raise ValueError(f"No se pudo calcular edad para nacimiento={nac_iso!r}, edad={edad_raw!r}")


def construir_canon(datos, old_canon):
    old_map = {p["id"]: p for p in old_canon.get("personajes", [])}
    out = []
    for d in datos:
        eid = d["escritorio_id"]
        old = old_map.get(eid, {})
        titulo = limpiar(d.get("titulo_nob")) or limpiar(d.get("titulo")) or limpiar(d.get("puesto"))
        rama = limpiar(old.get("rama")) or limpiar(d.get("casa"))
        nac = normalizar_nacimiento(d.get("nacimiento"))
        edad = calcular_edad(nac, d.get("edad"))
        parentesco = limpiar(old.get("parentesco"))
        if not parentesco:
            padre = limpiar(d.get("padre"))
            if padre:
                parentesco = "Padre: " + padre
            else:
                parentesco = limpiar(d.get("lugar_familia"))
        sit = limpiar(d.get("puesto")) or limpiar(d.get("cargo"))
        pv = d["presencia_versalles"]
        verif = "verificado" if d.get("estatus") == "verificado" else "por verificar"
        hitos = limpiar(d.get("hitos"))
        if eid in CORRECCIONES_NOTAS:
            notas = hitos
        elif hitos:
            notas = hitos
        else:
            notas = str(old.get("notas") or "").strip()
        out.append({
            "id": eid,
            "nombre": d["nombre"],
            "titulo": titulo,
            "rama": rama,
            "nacimiento": nac,
            "edad_jun_1722": edad,
            "parentesco": parentesco,
            "situacion_1722": sit,
            "presencia_versalles": pv,
            "verificacion": verif,
            "notas": notas,
            "historico": True,
        })
    return {
        "schema_version": old_canon.get("schema_version", 1),
        "fecha_referencia": old_canon.get("fecha_referencia", "1722-06-15"),
        "capa": old_canon.get("capa", "publica"),
        "leyenda_presencia": old_canon.get("leyenda_presencia", {}),
        "personajes": out,
    }


def validar(datos, canon_obj, pj00):
    errores = []
    sims_validos = {s["id"] for s in json.loads(R_SIMBOLOS.read_text(encoding="utf-8"))}
    ids = set()
    eids = set()

    for d in datos:
        pid = str(d.get("id") or "").strip()
        eid = str(d.get("escritorio_id") or "").strip()
        if not pid or pid in ids:
            errores.append(f"datos: id vacío o duplicado ({pid!r})")
        ids.add(pid)
        if not eid or eid in eids:
            errores.append(f"datos {pid}: escritorio_id vacío o duplicado ({eid!r})")
        eids.add(eid)

        pv = d.get("presencia_versalles")
        if pv not in PRESENCIAS_VALIDAS:
            errores.append(f"{pid} ({eid}): presencia_versalles inválida ({pv!r})")

        rs = d.get("rangos") or []
        if not rs or any(r not in RANGOS_VALIDOS for r in rs):
            errores.append(f"{pid} ({eid}): rangos inválidos ({rs!r})")

        sm = d.get("simbolos") or []
        bad_sm = [s for s in sm if s not in sims_validos]
        if bad_sm:
            errores.append(f"{pid} ({eid}): símbolos desconocidos ({bad_sm!r})")

        pares = [
            ("pair", "par"),
            ("etranger", "principe-extranjero"),
            ("sang", "principe-sangre"),
            ("legitime", "legitimado"),
            ("ambassade", "embajador"),
            ("finance", "financiero"),
        ]
        for rk, sk in pares:
            if (rk in rs) != (sk in sm):
                errores.append(f"{pid} ({eid}): desajuste {rk} vs {sk} (rangos={rs}, simbolos={sm})")

        if d.get("sexo") == "F" and "mariscal" in sm:
            errores.append(f"{pid} ({eid}): personaje femenino con símbolo 'mariscal'")

        res = d.get("residencia") or []
        if pv == "reside" and "residente_palacio" not in res and "habitante_versalles" not in res:
            errores.append(f"{pid} ({eid}): presencia 'reside' sin residencia en palacio/Versalles ({res!r})")
        if pv == "ausente" and ("residente_palacio" in res or "habitante_versalles" in res):
            errores.append(f"{pid} ({eid}): presencia 'ausente' con residencia en palacio/Versalles ({res!r})")

    canon_list = canon_obj.get("personajes", [])
    if len(canon_list) != len(datos):
        errores.append(f"Cantidad distinta: canon={len(canon_list)} vs datos={len(datos)}")
    if len(pj00) != len(datos):
        errores.append(f"Cantidad distinta: 00-datos.js={len(pj00)} vs datos={len(datos)}")

    d_by_eid = {d["escritorio_id"]: d for d in datos}
    for label, lst in [("canon", canon_list), ("00-datos.js", pj00)]:
        seen = set()
        for p in lst:
            pid = p.get("id", "")
            if not pid or pid in seen:
                errores.append(f"{label}: id vacío o duplicado ({pid!r})")
            seen.add(pid)
            if not re.match(r"^\d{4}(-\d{2}-\d{2})?$", str(p.get("nacimiento") or "")):
                errores.append(f"{label} {pid}: nacimiento no ISO ({p.get('nacimiento')!r})")
            if not isinstance(p.get("edad_jun_1722"), int):
                errores.append(f"{label} {pid}: edad_jun_1722 no es int ({p.get('edad_jun_1722')!r})")
            if not str(p.get("rama") or "").strip():
                errores.append(f"{label} {pid}: rama vacía")
            dp = d_by_eid.get(pid)
            if not dp:
                errores.append(f"{label} {pid}: no existe en web/datos/personajes.json")
            elif p.get("presencia_versalles") != dp.get("presencia_versalles"):
                errores.append(
                    f"{label} {pid}: presencia_versalles {p.get('presencia_versalles')!r} != datos {dp.get('presencia_versalles')!r}"
                )

    # Validar pids en mapas
    txt_mapas = R_MAPAS.read_text(encoding="utf-8")
    m_ocup = re.search(r"const OCUP = \{(.*?)\n\};", txt_mapas, re.S)
    if not m_ocup:
        errores.append("No se encontró el bloque OCUP en 12-mapas.js")
    else:
        for pid in sorted(set(re.findall(r'\["[^"]+","([^"]+)","[amb]"', m_ocup.group(1)))):
            if pid not in d_by_eid:
                errores.append(f"12-mapas.js OCUP: pid {pid!r} no existe en datos")

    txt_fr = R_FRANCIA.read_text(encoding="utf-8")
    for attr in ("pid", "refPid"):
        for pid in sorted(set(re.findall(rf'\b{attr}:"([^"]+)"', txt_fr))):
            if pid not in d_by_eid:
                errores.append(f"14-francia-mapa-de-provincias-a.js ({attr}): pid {pid!r} no existe en datos")

    # Validar web/datos/ocupantes.json
    if not R_OCUP.exists():
        errores.append("Falta web/datos/ocupantes.json")
    else:
        ocup_db = json.loads(R_OCUP.read_text(encoding="utf-8"))
        if not isinstance(ocup_db, dict) or not ocup_db:
            errores.append("web/datos/ocupantes.json debe ser un objeto no vacío")
        else:
            est_ids = set(re.findall(r'^\s*(?:\["|aptsC?:.*?\[|"?)([\w-]+)', txt_mapas, re.M))
            est_ids |= set(re.findall(r'\["([\w-]+)",\s*"[^"]+",', txt_mapas))
            for room_id, entry in ocup_db.items():
                if room_id not in est_ids:
                    errores.append(f"ocupantes.json: estancia {room_id!r} no encontrada en 12-mapas.js")
                lista = entry.get("lista") if isinstance(entry, dict) else None
                if not isinstance(lista, list) or not lista:
                    errores.append(f"ocupantes.json {room_id}: 'lista' debe ser una lista no vacía")
                    continue
                for idx, o in enumerate(lista):
                    if not str(o.get("n") or "").strip():
                        errores.append(f"ocupantes.json {room_id}[{idx}]: 'n' vacío")
                    if o.get("conf") not in {"a", "m", "b"}:
                        errores.append(f"ocupantes.json {room_id}[{idx}]: conf inválida ({o.get('conf')!r})")
                    if o.get("cat") not in {"real", "hombre", "mujer", "cargo"}:
                        errores.append(f"ocupantes.json {room_id}[{idx}]: cat inválida ({o.get('cat')!r})")
                    if not str(o.get("fuente") or "").strip():
                        errores.append(f"ocupantes.json {room_id}[{idx}]: 'fuente' vacía")
                    pid = o.get("pid")
                    if pid is not None and pid not in d_by_eid:
                        errores.append(f"ocupantes.json {room_id}[{idx}]: pid {pid!r} no existe en datos")

    return errores


def main():
    ap = argparse.ArgumentParser(description="Sincroniza y valida personajes entre datos, canon y 00-datos.js")
    ap.add_argument("--check", action="store_true", help="Solo valida sin modificar archivos")
    args = ap.parse_args()

    datos = json.loads(R_DATOS.read_text(encoding="utf-8"))
    old_canon = json.loads(R_CANON.read_text(encoding="utf-8"))
    linaje = json.loads(R_LINAJE.read_text(encoding="utf-8"))
    glosario = json.loads(R_GLOSARIO.read_text(encoding="utf-8"))["entradas"]

    if not args.check:
        canon_obj = construir_canon(datos, old_canon)
        R_CANON.write_text(json.dumps(canon_obj, ensure_ascii=False, indent=1), encoding="utf-8")
        js00 = "\n".join([
            "const PERSONAJES = " + json.dumps(canon_obj["personajes"], ensure_ascii=False) + ";",
            "const LINAJE = " + json.dumps(linaje, ensure_ascii=False) + ";",
            "const GLOSARIO = " + json.dumps(glosario, ensure_ascii=False) + ";",
        ]) + "\n"
        R_00.write_text(js00, encoding="utf-8")
        pj00 = canon_obj["personajes"]
    else:
        canon_obj = old_canon
        txt00 = R_00.read_text(encoding="utf-8")
        m = re.search(r"const PERSONAJES\s*=\s*(\[.*?\]);", txt00, re.S)
        if not m:
            print("ERROR: No se pudo leer PERSONAJES de web/js/00-datos.js", file=sys.stderr)
            return 1
        pj00 = json.loads(m.group(1))
        if canon_obj.get("personajes") != pj00:
            print("ERROR: canon/personajes.json y PERSONAJES de web/js/00-datos.js difieren", file=sys.stderr)
            return 1

    errores = validar(datos, canon_obj, pj00)
    if errores:
        print(f"FALLARON {len(errores)} validaciones:", file=sys.stderr)
        for e in errores:
            print(" -", e, file=sys.stderr)
        return 1

    print(
        f"OK: {len(datos)} datos == {len(canon_obj['personajes'])} canon == {len(pj00)} 00-datos.js; "
        "0 errores de esquema y mapas."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
