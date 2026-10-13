# 🧫 Quand les antibiotiques ne marchent plus

Dashboard interactif sur la résistance aux antibiotiques, construit sur des **données publiques réelles**.
HTML, CSS et JavaScript purs : aucune dépendance au runtime, pas de build pour afficher le site.

## Fonctionnalités

- Boîte de Petri interactive : résistance par région OMS
- Carte du monde (pays par pays, 2018-2022) avec curseur d'année, clic sur un pays, courbe d'évolution et classements
- Résistance par type d'infection et par bactérie
- Décès 2021 et projection 2050 (étude GRAM / The Lancet)
- Mode clair / sombre, responsive, accessible au clavier (classements) et aux animations réduites

## Données et sources

| Donnée | Source | Fichier |
|---|---|---|
| % d'infections du sang à *E. coli* résistantes aux céphalosporines de 3e génération, par pays et par année | OMS GLASS, via [Our World in Data](https://ourworldindata.org/grapher/share-of-e-coli-bloodstream-infections-due-to-antimicrobial-resistant-bacteria) | `data.js` |
| Fonds de carte | Natural Earth via le paquet npm `world-atlas` | `geo.js` |
| Chiffres régionaux, par infection, par bactérie | OMS, *Global antibiotic resistance surveillance report 2025* | `app.js` |
| Décès 2021 et projections 2050 | GRAM Project, *The Lancet*, 2024 | `app.js` |

Limites : les pays à petit échantillon peuvent afficher 0 % ou 100 %, et les pays sans donnée restent gris.
Les chiffres de `app.js` sont saisis à la main à partir des publications : à revérifier avant réutilisation.

> Statistiques de santé publique, pas un outil de diagnostic ni un conseil médical.

## Mettre à jour les données

```bash
python3 scripts/update_data.py   # télécharge la série OMS GLASS et régénère data.js
npm install && npm run geo       # régénère geo.js (fonds de carte)
```

## Lancer en local

Ouvrir `index.html`, ou `python3 -m http.server 8000`.

## Déployer sur GitHub Pages

Settings → Pages → Deploy from a branch → `main` / `(root)`.

## Structure

```
index.html            page
style.css             thème clair/sombre
app.js                petri, graphiques, décès
map.js                carte, curseur, classements
data.js  geo.js       données pays et fonds de carte (générés)
scripts/              update_data.py, build_geo.mjs
```

## Licence

MIT
