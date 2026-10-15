"""Construye web/escritorio.html a partir de la plantilla, los módulos JS y los datos de canon/."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[1]
W = R / "web"
t = (W / "template.html").read_text(encoding="utf-8")
per = json.loads((R / "canon/personajes.json").read_text(encoding="utf-8"))["personajes"]
lin = json.loads((R / "canon/linaje.json").read_text(encoding="utf-8"))
glo = json.loads((R / "canon/glosario.json").read_text(encoding="utf-8"))["entradas"]
for name in ("mapas", "linaje", "nombres", "creacion", "familia"):
    t = t.replace(f"/*__MOD_{name.upper()}__*/", (W / "js" / f"{name}.js").read_text(encoding="utf-8"))
import base64, csv
rows = list(csv.DictReader((R / "mapa/definition.csv").read_text(encoding="utf-8").splitlines(), delimiter=";"))
for r in rows:
    for k in ("r", "g", "b"): r[k] = int(r[k])
t = t.replace("__PROVDEF__", json.dumps(rows, ensure_ascii=False))
t = t.replace("__PROVPNG__", "data:image/png;base64," + base64.b64encode((R / "mapa/provinces.png").read_bytes()).decode())
t = t.replace("__PERSONAJES__", json.dumps(per, ensure_ascii=False))
t = t.replace("__LINAJE__", json.dumps(lin, ensure_ascii=False))
t = t.replace("__GLOSARIO__", json.dumps(glo, ensure_ascii=False))
(W / "escritorio.html").write_text(t, encoding="utf-8")
print("escritorio.html:", len(t), "bytes")
