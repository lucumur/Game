"""Pone ?v=<fecha> a los css/js de index.html y libro.html para que el navegador no use copias viejas.
Correr antes de cada commit que toque web/css o web/js:  python3 herramientas/version.py"""
import re, time, pathlib
W = pathlib.Path(__file__).resolve().parents[1] / "web"; v = time.strftime("%Y%m%d%H%M")
for f in ("index.html", "libro.html"):
    p = W / f; s = p.read_text(encoding="utf-8")
    s = re.sub(r'((?:src|href)="(?:js|css)/[^"?]+)(\?v=\d+)?"', lambda m: f'{m.group(1)}?v={v}"', s)
    p.write_text(s, encoding="utf-8")
print("versión", v)
