"""Télécharge les séries OMS GLASS (via Our World in Data) et régénère data.js.
- DATA : % d'infections du sang à E. coli résistantes aux céphalosporines de 3e génération
- USE  : consommation d'antibiotiques (doses journalières pour 1 000 habitants), même année"""
import csv, io, json, urllib.request
BASE = "https://ourworldindata.org/grapher/{}.csv?v=1&csvType=full&useColumnShortNames=false"
RES = "share-of-e-coli-bloodstream-infections-due-to-antimicrobial-resistant-bacteria"
USE = "antibiotic-consumption-rate"
Y0 = 2018

def load(slug):
    req = urllib.request.Request(BASE.format(slug), headers={"User-Agent": "Our World In Data data fetch/1.0"})
    rows = csv.reader(io.StringIO(urllib.request.urlopen(req).read().decode("utf-8")))
    next(rows)
    out = {}
    for _, code, year, val in rows:
        if len(code) == 3 and val != "":      # ignore les agrégats (UN_*, OWID_*)
            out.setdefault(code, {})[int(year)] = float(val)
    return out

res, use = load(RES), load(USE)
y1 = max(y for d in res.values() for y in d)
data = {c: [d.get(y) for y in range(Y0, y1 + 1)] for c, d in sorted(res.items())
        if any(d.get(y) is not None for y in range(Y0, y1 + 1))}
uy = y1 if sum(1 for c in data if use.get(c, {}).get(y1) is not None) >= 20 else y1 - 1
usev = {c: round(use[c][uy], 1) for c in sorted(use) if uy in use[c] and c in data}
with open("data.js", "w", encoding="utf-8") as f:
    f.write(f"const YEARS={json.dumps(list(range(Y0, y1 + 1)))};\nconst DATA={json.dumps(data, separators=(',', ':'))};\n"
            f"const USE_YEAR={uy};\nconst USE={json.dumps(usev, separators=(',', ':'))};\n")
print(len(data), "pays résistance,", len(usev), "pays consommation,", Y0, "-", y1)
