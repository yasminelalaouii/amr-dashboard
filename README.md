# 🧫 When Antibiotics Stop Working

An interactive, bilingual (FR/EN) dashboard on **antibiotic resistance (AMR)**, built on real public data from the WHO and *The Lancet*.
Plain HTML, CSS and JavaScript: no framework, no runtime dependencies, no build step to view the site.

**[Live demo](https://yasminelalaouii.github.io/amr-dashboard/)**

<!-- Add a screenshot: save it as docs/screenshot.png and uncomment the line below -->
<!-- ![Dashboard screenshot](docs/screenshot.png) -->

## Why this project

Drug-resistant infections are a major global health threat, but the data is buried in long PDF reports. This dashboard makes it explorable, and goes one step further: it asks **why** the Global South is hit hardest, and tests one popular explanation (antibiotic consumption) against the data.

## Features

- Three tabs (Overview, Map, Causes and solutions), and every chart is labelled with its measure and year.
- **Headline summary**: four numbers computed from the data (regional gap, rising countries, blind spots, weight of consumption).
- **Petri dish view**: pick a WHO region and see the share of resistant infections.
- **World map, 2018-2022**: *E. coli* resistance to third-generation cephalosporins in bloodstream infections, with a year slider.
- **Country comparison**: click up to 3 countries to overlay their trends.
- **Rankings**: most affected, least affected, and **fastest-rising** countries (linear trend over the period).
- **Blind spots**: one click highlights the countries with no data in the series.
- **Why the Global South?**: five drivers, resistance by broad world zone, and a scatter plot testing whether antibiotic consumption explains resistance across countries.
- **What can be done?**: five levers from WHO and *The Lancet*, tied to the causes tested above.
- Resistance by infection type and by bacterium, deaths in 2021 and the 2050 projection.
- French / English toggle, light and dark themes, responsive, reduced-motion support.

## Key finding

Across the 45 countries with both measures (2022), antibiotic consumption and *E. coli* resistance are only moderately correlated (r ≈ 0.30), so consumption is associated with about 9% of the differences between countries. Europe uses a lot of antibiotics with low resistance; Ethiopia and Mali use little with high resistance. Quality of use, prevention and diagnostics seem to matter more than raw volume. Correlation is not causation, and consumption data has gaps (see limitations).

## Data sources

| Data | Source | File |
|---|---|---|
| *E. coli* bloodstream infections resistant to 3rd-gen. cephalosporins, by country and year | WHO GLASS via [Our World in Data](https://ourworldindata.org/grapher/share-of-e-coli-bloodstream-infections-due-to-antimicrobial-resistant-bacteria) | `data.js` |
| Antibiotic consumption (doses per 1,000 people per day) | WHO GLASS via [Our World in Data](https://ourworldindata.org/grapher/antibiotic-consumption-rate) | `data.js` |
| Base map | Natural Earth via the `world-atlas` npm package | `geo.js` |
| Regional, per-infection and per-bacterium figures | WHO, *Global antibiotic resistance surveillance report 2025* | `app.js` |
| Deaths in 2021 and projections to 2050 | GRAM Project, *The Lancet*, 2024 | `app.js` |

### Limitations

- Countries with very few tested infections can show 0% or 100%. Grey countries have no data in the series.
- Surveillance is uneven: many countries with limited lab capacity report little or nothing, so the map understates the real picture.
- Consumption data is incomplete and not fully comparable (some countries report only the public sector or community use). India and Pakistan have no consumption data.
- World zones are a simple grouping defined in `i18n.js`; medians are computed on reporting countries only.
- Figures in `app.js` and the "why" explanations are summarised by hand from the cited reports: check them against the originals before reuse.

> This project presents public health statistics. It is not a diagnostic tool and not medical advice.

## Updating the data

```bash
python3 scripts/update_data.py   # downloads both WHO GLASS series and regenerates data.js
npm install && npm run geo       # regenerates geo.js (projected base map and country names)
```

A GitHub Action (`.github/workflows/update-data.yml`) runs the data update on the 1st of every month and commits `data.js` if it changed. You can also trigger it from the **Actions** tab.

## Run locally

Open `index.html`, or serve the folder: `python3 -m http.server 8000`.

## Deploy on GitHub Pages

Settings → Pages → Deploy from a branch → `main` / `(root)`.

## Project structure

```
index.html            page structure
style.css             themes and layout
i18n.js               FR/EN strings, language toggle, world zones
app.js                Petri dish, bar charts, deaths chart
map.js                map, comparison, rankings, blind spots, zones
why.js                "why" cards, consumption scatter plot, action cards
brief.js              headline summary
data.js  geo.js       generated data and base map
.github/workflows/    monthly data update
```

## Next steps

- Per-bacterium trends for 2018-2023 (export the time series from the GLASS dashboard)
- Testing coverage and income as additional explanations (needs reliable data sources)

## License

MIT
