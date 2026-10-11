"""Genera un provinces.png PROVISIONAL de Francia en 1722 (estilo Clausewitz) y su definition.csv.

Método: cada píxel dentro del contorno aproximado del reino se asigna a la «semilla» más cercana
(capitales de los gobiernos generales), con un peso aditivo por provincia (Voronoi aditivo: sin enclaves).
El resultado tiene la topología correcta pero fronteras inventadas: está pensado para corregirse a mano.

Reglas del archivo (no romper al editar):
  - PNG sin pérdida, sin suavizado: cada provincia es un único color RGB exacto.
  - Fuera del reino: color FUERA. Las semillas con tipo != "reino" son territorios no franceses en 1722.
  - Si se edita la imagen, no hace falta volver a ejecutar este script; si se añade una provincia,
    añadir su fila en definition.csv con un color nuevo.
"""
import csv, math, pathlib
import numpy as np
from PIL import Image, ImageDraw

AQUI = pathlib.Path(__file__).resolve().parent
W = 1200
LON0, LON1, LAT0, LAT1 = -5.2, 8.6, 42.2, 51.3
K = math.cos(math.radians(46.5))
S = W / ((LON1 - LON0) * K)
H = round((LAT1 - LAT0) * S)
FUERA = (0, 0, 0)

def P(lon, lat):
    return ((lon - LON0) * K * S, (LAT1 - lat) * S)

# Contorno aproximado (el mismo que usa web/js/mapas.js). Incluye la Lorena, que se asigna como «extranjero».
CONTORNO = [[2.37,51.03],[1.6,50.7],[1.6,50.2],[1.08,49.92],[0.1,49.49],[-1.2,49.35],[-1.9,49.7],[-1.5,48.64],[-2.0,48.65],[-3.0,48.8],[-4.5,48.4],[-4.7,48.04],[-3.37,47.75],[-2.2,47.27],[-1.15,46.16],[-1.03,45.62],[-1.17,44.66],[-1.47,43.49],[-1.78,43.36],[-0.5,42.8],[0.7,42.7],[1.7,42.5],[3.17,42.43],[3.05,42.7],[3.1,43.1],[3.7,43.4],[4.6,43.4],[5.37,43.3],[5.93,43.12],[6.7,43.4],[7.2,43.7],[6.9,44.4],[6.9,45.1],[6.2,45.4],[5.8,45.7],[5.95,46.2],[6.1,46.4],[6.8,47.3],[7.5,47.6],[7.8,48.5],[8.2,48.97],[6.9,49.2],[6.0,49.5],[4.9,49.8],[4.2,49.95],[3.6,50.4],[2.6,50.8]]

# id, nombre, tipo, capital, peso, [semillas (lon, lat)], nota
PROV = [
 ("ile-de-france","Île-de-France","reino","París",1.0,[(2.35,48.86),(2.6,49.3)],"Gobierno de la capital y de Versalles."),
 ("picardie","Picardía","reino","Amiens",1.0,[(2.30,49.89)],""),
 ("flandre","Flandes y Henao","reino","Lille",0.8,[(3.06,50.63),(3.6,50.3)],"Frontera norte, plazas fuertes."),
 ("artois","Artois","reino","Arras",0.85,[(2.6,50.35)],""),
 ("champagne","Champaña","reino","Troyes",1.1,[(4.07,48.30),(4.36,48.96),(4.7,49.6)],"Reims, ciudad de la consagración."),
 ("trois-eveches","Metz y Verdún (Tres Obispados)","reino","Metz",0.7,[(6.18,49.12),(5.4,49.16)],"Enclaves franceses dentro de la Lorena."),
 ("lorraine","Ducado de Lorena","extranjero","Nancy",0.9,[(6.18,48.69),(6.6,48.3)],"Ducado soberano. Francés solo desde 1766."),
 ("alsace","Alsacia","reino","Estrasburgo",0.8,[(7.75,48.58),(7.35,47.9)],"Francesa desde el siglo XVII."),
 ("normandie","Normandía","reino","Ruan",1.1,[(1.10,49.44),(-0.37,49.18),(-1.3,49.1)],""),
 ("bretagne","Bretaña","reino","Rennes",1.2,[(-1.68,48.11),(-3.3,48.2),(-4.2,48.2)],"Estados provinciales propios."),
 ("maine","Maine y Perche","reino","Le Mans",0.8,[(0.20,48.00)],""),
 ("anjou","Anjou","reino","Angers",0.75,[(-0.55,47.47)],""),
 ("touraine","Turena","reino","Tours",0.7,[(0.69,47.39)],""),
 ("orleanais","Orleanesado","reino","Orleans",1.0,[(1.91,47.90),(1.3,48.3)],""),
 ("berry","Berry","reino","Bourges",0.85,[(2.40,47.08)],""),
 ("nivernais","Nivernés","reino","Nevers",0.8,[(3.30,47.1)],""),
 ("bourgogne","Borgoña","reino","Dijon",1.0,[(5.04,47.32),(4.5,46.6)],"Estados de Borgoña."),
 ("dombes","Principado de Dombes","extranjero","Trévoux",0.7,[(4.95,46.03)],"Principado soberano del duque de Maine."),
 ("franche-comte","Franco Condado","reino","Besanzón",0.9,[(6.02,47.24)],"Francés desde 1678."),
 ("poitou","Poitou","reino","Poitiers",1.0,[(0.34,46.58),(-1.0,46.6)],""),
 ("aunis","Aunis","reino","La Rochelle",0.8,[(-1.0,46.2)],""),
 ("saintonge","Saintonge y Angoumois","reino","Saintes",0.8,[(-0.63,45.75),(0.16,45.65)],""),
 ("limousin","Lemosín","reino","Limoges",0.8,[(1.26,45.83)],""),
 ("marche","La Marche","reino","Guéret",0.75,[(1.87,46.17)],""),
 ("bourbonnais","Borbonés","reino","Moulins",0.8,[(3.33,46.57)],""),
 ("auvergne","Auvernia","reino","Clermont",0.9,[(3.09,45.78),(2.6,45.1)],""),
 ("lyonnais","Lionesado","reino","Lyon",0.75,[(4.6,45.75)],"Sedas y banca."),
 ("dauphine","Delfinado","reino","Grenoble",1.0,[(5.72,45.19),(5.6,44.5)],""),
 ("guyenne","Guyena y Gascuña","reino","Burdeos",1.0,[(-0.58,44.84),(0.59,43.65),(1.4,44.4),(-0.6,43.9)],"El gobierno más extenso del reino."),
 ("bearn","Bearne y Navarra","reino","Pau",0.85,[(-0.6,43.3)],""),
 ("foix","Condado de Foix","reino","Foix",0.75,[(1.61,42.96)],""),
 ("roussillon","Rosellón","reino","Perpiñán",0.8,[(2.75,42.62)],"Francés desde 1659."),
 ("languedoc","Languedoc","reino","Toulouse",0.95,[(1.44,43.60),(3.88,43.61),(2.4,43.4),(3.7,44.5)],"Estados de Languedoc; Montpellier y su facultad."),
 ("comtat","Condado Venesino y Aviñón","extranjero","Aviñón",0.72,[(4.95,44.0)],"Territorio del papa."),
 ("provence","Provenza","reino","Aix",1.0,[(5.45,43.53),(6.4,43.7),(6.2,44.2)],"Sale de la peste de 1720."),
]

def color(i):
    # Colores únicos y separados, evitando el negro (FUERA).
    r = 40 + (i * 53) % 200; g = 40 + (i * 97) % 200; b = 40 + (i * 151) % 200
    return (r, g, b)

def main():
    mask = Image.new("L", (W, H), 0)
    ImageDraw.Draw(mask).polygon([P(*p) for p in CONTORNO], fill=1)
    inside = np.array(mask, dtype=bool)
    ys, xs = np.mgrid[0:H, 0:W]
    best = np.full((H, W), np.inf); owner = np.full((H, W), -1)
    for i, (_, _, _, _, peso, seeds, _) in enumerate(PROV):
        for lon, lat in seeds:
            sx, sy = P(lon, lat)
            d = np.hypot(xs - sx, ys - sy) - (peso - 1.0) * 90
            m = d < best; best[m] = d[m]; owner[m] = i
    img = np.zeros((H, W, 3), dtype=np.uint8)
    cols = [color(i + 1) for i in range(len(PROV))]
    assert len(set(cols)) == len(cols)
    for i, c in enumerate(cols):
        img[(owner == i) & inside] = c
    img[~inside] = FUERA
    Image.fromarray(img, "RGB").save(AQUI / "provinces.png", optimize=True)
    with open(AQUI / "definition.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f, delimiter=";")
        w.writerow(["id", "r", "g", "b", "nombre", "tipo", "capital", "nota"])
        w.writerow(["fuera", *FUERA, "Fuera del reino", "fuera", "", ""])
        for (pid, nombre, tipo, cap, _, _, nota), c in zip(PROV, cols):
            w.writerow([pid, *c, nombre, tipo, cap, nota])
    print(f"provinces.png {W}x{H}, {len(PROV)} provincias")

if __name__ == "__main__":
    main()
