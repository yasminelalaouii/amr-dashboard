"""Télécharge la série OMS GLASS (via Our World in Data) et régénère data.js.
Indicateur : % d'infections du sang à E. coli résistantes aux céphalosporines de 3e génération."""
import csv, io, json, urllib.request
URL = ("https://ourworldindata.org/grapher/share-of-e-coli-bloodstream-infections-due-to-"
       "antimicrobial-resistant-bacteria.csv?v=1&csvType=full&useColumnShortNames=false")
Y0 = 2018
req = urllib.request.Request(URL, headers={"User-Agent": "Our World In Data data fetch/1.0"})
rows = csv.reader(io.StringIO(urllib.request.urlopen(req).read().decode("utf-8")))
next(rows)
raw = {}
for ent, code, year, val in rows:
    if len(code) == 3 and val != "":          # ignore les agrégats régionaux (UN_*, OWID_*)
        raw.setdefault(code, {})[int(year)] = float(val)
y1 = max(y for d in raw.values() for y in d)
data = {c: [d.get(y) for y in range(Y0, y1 + 1)] for c, d in sorted(raw.items())
        if any(d.get(y) is not None for y in range(Y0, y1 + 1))}
open("data.js", "w", encoding="utf-8").write(
    f"const YEARS={json.dumps(list(range(Y0, y1 + 1)))};\nconst DATA={json.dumps(data, separators=(',', ':'))};\n")
print(len(data), "pays,", Y0, "-", y1)
