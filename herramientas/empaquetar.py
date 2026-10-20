"""Empaqueta web/ en un solo HTML para publicarlo como artifact de Claude.

Uso:  python3 herramientas/empaquetar.py  →  dist/escritorio.html
Inserta css/escritorio.css y todos los js/ (en el orden de index.html).
En Claude los datos vienen de la base del artifact; en GitHub, de web/datos/.
"""
import re, pathlib
R = pathlib.Path(__file__).resolve().parents[1]; W = R / "web"
html = (W / "index.html").read_text(encoding="utf-8")
html = html.replace('<link rel="stylesheet" href="css/escritorio.css">',
                    "<style>\n" + (W / "css/escritorio.css").read_text(encoding="utf-8") + "</style>")
srcs = re.findall(r'<script src="(js/[^"]+)"></script>\n?', html)
code = "\n".join((W / s).read_text(encoding="utf-8") for s in srcs)
html = re.sub(r'(<script src="js/[^"]+"></script>\n?)+', lambda m: "<script>\n" + code + "</script>\n", html, count=1)
(R / "dist").mkdir(exist_ok=True)
(R / "dist/escritorio.html").write_text(html, encoding="utf-8")
print("dist/escritorio.html:", len(html), "bytes,", len(srcs), "módulos")
