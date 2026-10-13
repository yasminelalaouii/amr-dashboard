// Génère geo.js : fonds de carte (Natural Earth via world-atlas) projetés en chemins SVG.
import fs from 'fs';import {createRequire} from 'module';
import {feature} from 'topojson-client';import {geoNaturalEarth1,geoPath} from 'd3-geo';
const iso=createRequire(import.meta.url)('i18n-iso-countries');
for(const l of ['fr','en'])iso.registerLocale(createRequire(import.meta.url)(`i18n-iso-countries/langs/${l}.json`));
const topo=JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-110m.json','utf8'));
const proj=geoNaturalEarth1().fitSize([960,500],{type:'Sphere'});
const path=geoPath(proj).digits(1);
const out=feature(topo,topo.objects.countries).features.filter(f=>f.id&&String(f.id)!=='010').map(f=>{
  const c=iso.numericToAlpha3(String(f.id).padStart(3,'0'));
  return c?{c,d:path(f)}:null}).filter(x=>x&&x.d);
const names=Object.fromEntries(['fr','en'].map(l=>[l,Object.fromEntries(Object.keys(iso.getAlpha3Codes()).map(c=>[c,iso.getName(c,l)]))]));
fs.writeFileSync('geo.js','const GEO='+JSON.stringify(out)+';\nconst NAMES='+JSON.stringify(names)+';\n');console.log(out.length+' pays');
