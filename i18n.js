const $=id=>document.getElementById(id);
const HOOKS=[];
let LANG=(navigator.language||"fr").toLowerCase().startsWith("fr")?"fr":"en";
const t=k=>I18N[LANG][k];
const num=(v,d=1)=>v.toFixed(d).replace(".",LANG==="fr"?",":".");
const cname=c=>((typeof NAMES!=="undefined"&&NAMES[LANG])||{})[c]||c;
const Z={0:"AUT BEL HRV CYP CZE DNK EST FIN FRA DEU GRC ISL IRL ITA LVA LTU LUX MLT NLD NOR POL SWE CHE GBR BIH MKD MDA UKR RUS",
 1:"ARG BRA CAN COL PER TTO AUS",2:"BEN BFA CMR COD EGY ETH GHA KEN LBR LBY MDG MWI MLI MAR MOZ MUS NAM NGA RWA SDN TZA TUN UGA ZAF ZMB CIV",3:"BGD BTN IND LKA MDV NPL PAK"};
const ZS=Object.fromEntries(Object.entries(Z).map(([k,v])=>[k,new Set(v.split(" "))]));
const zone=c=>[0,1,2,3].find(k=>ZS[k].has(c))??4;
const ZC=["var(--ok)","var(--c2)","var(--c3)","var(--res)","var(--mute)"];
const I18N={
fr:{title:"Quand les antibiotiques ne marchent plus",
intro:"La résistance aux antibiotiques tue déjà plus d'un million de personnes par an. Choisissez une région : chaque point est une infection, en rose celles que le traitement ne soigne plus.",
of:"sur",ok:"sensible",res:"résistante",
r0:"Monde",r1:"Asie du Sud-Est et Méditerranée orientale",r2:"Afrique",r3:"Europe",
l0:"infections bactériennes courantes testées en laboratoire résistent aux antibiotiques.",l1:"Les deux régions OMS où la résistance est la plus élevée.",l2:"Souvent là où les laboratoires manquent pour choisir le bon traitement.",l3:"La région où la résistance est la plus faible, mais pas nulle.",
infT:"Selon le type d'infection",infS:"Part des infections résistantes, médiane mondiale, 2023.",i0:"Urinaire",i1:"Sang",i2:"Digestive",i3:"Gonorrhée",
bugT:"Les bactéries les plus redoutées",bugS:"Résistance à l'antibiotique de première intention.",b0:"K. pneumoniae",b1:"E. coli",b2:"MRSA (staph. doré)",
dthT:"Les décès, hier et demain",dthS:"Millions de décès par an : estimation 2021 et projection 2050 si rien ne change.",d0:"Décès directement dus",d1:"Décès où la résistance joue un rôle",proj:"projection",
s1:"de décès directement dus à la résistance entre 2025 et 2050 (169 M en comptant les décès où elle joue un rôle)",s2:"de ces décès en Asie du Sud, la région la plus touchée",s3:"décès par MRSA doublés entre 1990 et 2021",
mapT:"La carte, pays par pays",mapS:"Part des infections du sang à <i>E. coli</i> résistantes aux céphalosporines de 3e génération. Plus le rose est foncé, plus la résistance est élevée. Cliquez sur des pays (jusqu'à 3) pour les comparer.",
yr:"Année",shadow:"Montrer les zones d'ombre",shT:(n,m)=>`${n} pays sur ${m} n'ont aucune donnée dans cette série : la carte sous-estime sans doute le problème.`,
rTop:"Les plus touchés",rLow:"Les moins touchés",rRise:"Hausse la plus rapide",perYr:"pts/an",
pnTxt:"des infections du sang à <i>E. coli</i> résistaient aux céphalosporines de 3e génération en",noData:"pas de donnée",
whyT:"Pourquoi le Sud global est-il le plus touché ?",
whyI:"Les taux les plus élevés se trouvent surtout en Asie du Sud, au Moyen-Orient et en Afrique. L'Afrique du Sud (le pays) est à environ 30 %, dans la moyenne : « Sud global » désigne ici ces régions. Les causes sont multiples, et la quantité d'antibiotiques consommée n'est qu'une partie de l'explication.",
w1T:"Usage inapproprié",w1:"L'OMS relie la hausse de la résistance au mauvais usage des antibiotiques : sans ordonnance, mauvaise dose, traitement interrompu.",
w2T:"Prévention des infections",w2:"Hygiène à l'hôpital, eau et assainissement insuffisants : les bactéries résistantes circulent plus facilement. L'OMS pointe le manque de contrôle des infections.",
w3T:"Peu de diagnostic",w3:"Sans laboratoire, on ne sait pas quel antibiotique marche : on traite à l'aveugle, ce qui entretient la résistance. Les régions les plus touchées sont celles où la capacité de test est la plus limitée.",
w4T:"Accès aux soins et aux médicaments",w4:"En Afrique, l'OMS cite un accès limité à des médicaments de qualité. L'étude du Lancet estime que de meilleurs soins et un meilleur accès aux antibiotiques pourraient sauver jusqu'à 92 millions de vies d'ici 2050.",
w5T:"Des chiffres imparfaits",w5:"Près de la moitié des pays n'ont pas déclaré de données à l'OMS et beaucoup n'ont pas de système fiable : l'écart réel est difficile à mesurer.",
zoneT:"La résistance selon les grandes zones",zoneS:"Médiane des pays déclarants pour l'année choisie sur la carte (entre parenthèses : nombre de pays).",
z0:"Europe",z1:"Amériques et Océanie",z2:"Afrique",z3:"Asie du Sud",z4:"Asie de l'Est, Sud-Est et Moyen-Orient",
scT:"Consommer plus d'antibiotiques, est-ce résister plus ?",scS:"Chaque point est un pays.",scX:"Antibiotiques consommés (doses par 1 000 habitants et par jour)",scY:"Résistance d'E. coli (%)",
q0:"très faible",q1:"modérée",q2:"forte",
scR:(r,r2,n,q,y)=>`En ${y}, sur ${n} pays, la corrélation est ${q} (r = ${num(r,2)}) : la consommation n'explique qu'environ ${num(r2*100,0)} % des écarts. L'Europe consomme beaucoup mais résiste peu ; l'Éthiopie ou le Mali consomment peu mais résistent beaucoup. Ce qui compte semble être la qualité de l'usage, de la prévention et du diagnostic, pas seulement la quantité. Corrélation n'est pas causalité.`,
scC:"Limites : certains pays ne déclarent que le secteur public ou la médecine de ville, et l'Asie du Sud est peu représentée (pas de données de consommation pour l'Inde ni le Pakistan).",
src:"Sources : OMS, <i>Global antibiotic resistance surveillance report 2025</i> (GLASS, données 2023) ; GRAM Project, <i>The Lancet</i>, 2024 ; OMS GLASS traité par Our World in Data (<i>E. coli</i> dans les infections du sang 2018-2022, consommation d'antibiotiques). Les petits échantillons peuvent afficher 0 % ou 100 %. Statistiques de santé publique : ni outil de diagnostic, ni conseil médical."},
en:{title:"When Antibiotics Stop Working",
intro:"Antibiotic resistance already kills over a million people a year. Pick a region: each dot is an infection, and pink ones no longer respond to treatment.",
of:"in",ok:"susceptible",res:"resistant",
r0:"World",r1:"South-East Asia and Eastern Mediterranean",r2:"Africa",r3:"Europe",
l0:"common lab-confirmed bacterial infections are resistant to antibiotics.",l1:"The two WHO regions with the highest resistance.",l2:"Often where labs are lacking to choose the right treatment.",l3:"The region with the lowest resistance, but not zero.",
infT:"By type of infection",infS:"Share of resistant infections, global median, 2023.",i0:"Urinary",i1:"Bloodstream",i2:"Gastrointestinal",i3:"Gonorrhoea",
bugT:"The most feared bacteria",bugS:"Resistance to the first-line antibiotic.",b0:"K. pneumoniae",b1:"E. coli",b2:"MRSA (S. aureus)",
dthT:"Deaths, yesterday and tomorrow",dthS:"Millions of deaths per year: 2021 estimate and 2050 projection if nothing changes.",d0:"Directly attributable deaths",d1:"Deaths where resistance plays a role",proj:"projection",
s1:"deaths directly attributable to resistance between 2025 and 2050 (169 M counting deaths where it plays a role)",s2:"of those deaths in South Asia, the hardest-hit region",s3:"MRSA deaths doubled between 1990 and 2021",
mapT:"The map, country by country",mapS:"Share of <i>E. coli</i> bloodstream infections resistant to third-generation cephalosporins. The darker the pink, the higher the resistance. Click up to 3 countries to compare them.",
yr:"Year",shadow:"Show the blind spots",shT:(n,m)=>`${n} of ${m} countries have no data in this series: the map probably understates the problem.`,
rTop:"Most affected",rLow:"Least affected",rRise:"Fastest rising",perYr:"pts/yr",
pnTxt:"of <i>E. coli</i> bloodstream infections were resistant to third-generation cephalosporins in",noData:"no data",
whyT:"Why is the Global South hit hardest?",
whyI:"The highest rates are mostly in South Asia, the Middle East and Africa. South Africa (the country) is at about 30%, near the middle: here, “Global South” means these regions. The causes are many, and the quantity of antibiotics consumed is only part of the explanation.",
w1T:"Inappropriate use",w1:"WHO links rising resistance to misuse of antibiotics: without a prescription, wrong dose, treatment stopped early.",
w2T:"Infection prevention",w2:"Weak hospital hygiene, water and sanitation let resistant bacteria spread more easily. WHO points to poor infection control.",
w3T:"Little diagnostic testing",w3:"Without a lab, nobody knows which antibiotic works, so patients are treated blindly, which sustains resistance. The hardest-hit regions are those with the least testing capacity.",
w4T:"Access to care and medicines",w4:"In Africa, WHO cites limited access to quality medicines. The Lancet study estimates that better care and better access to antibiotics could save up to 92 million lives by 2050.",
w5T:"Imperfect numbers",w5:"Nearly half of countries did not report data to WHO and many lack reliable systems: the true gap is hard to measure.",
zoneT:"Resistance by broad zone",zoneS:"Median of reporting countries for the year chosen on the map (number of countries in brackets).",
z0:"Europe",z1:"Americas and Oceania",z2:"Africa",z3:"South Asia",z4:"East, South-East Asia and Middle East",
scT:"Does using more antibiotics mean more resistance?",scS:"Each dot is a country.",scX:"Antibiotics used (doses per 1,000 people per day)",scY:"E. coli resistance (%)",
q0:"very weak",q1:"moderate",q2:"strong",
scR:(r,r2,n,q,y)=>`In ${y}, across ${n} countries, the correlation is ${q} (r = ${num(r,2)}): consumption explains only about ${num(r2*100,0)}% of the differences. Europe uses a lot but has low resistance; Ethiopia or Mali use little yet have high resistance. What seems to matter is the quality of use, prevention and diagnosis, not just the quantity. Correlation is not causation.`,
scC:"Limits: some countries report only the public sector or community use, and South Asia is thinly covered (no consumption data for India or Pakistan).",
src:"Sources: WHO, <i>Global antibiotic resistance surveillance report 2025</i> (GLASS, 2023 data); GRAM Project, <i>The Lancet</i>, 2024; WHO GLASS processed by Our World in Data (<i>E. coli</i> in bloodstream infections 2018-2022, antibiotic consumption). Small samples can show 0% or 100%. Public health statistics: not a diagnostic tool and not medical advice."}};
function setLang(l){LANG=l;document.documentElement.lang=l;
 document.querySelectorAll("[data-t]").forEach(e=>e.innerHTML=t(e.dataset.t));
 document.title=t("title");$("lang").textContent=l==="fr"?"EN":"FR";HOOKS.forEach(f=>f())}
Object.assign(I18N.fr,{
brT:"L'essentiel en 4 chiffres",
br:o=>[[`×${num(o.ratio,1)}`,`Résistance d'<i>E. coli</i> ${num(o.ratio,1)} fois plus élevée en Asie du Sud (${num(o.hi,0)} %) qu'en Europe (${num(o.lo,0)} %), en ${o.y}.`],
 [`${o.up} / ${o.tot}`,`pays où la résistance augmente depuis ${o.y0} (tendance linéaire, pays avec au moins 4 années de données).`],
 [`${o.blind}`,`pays sur ${o.m} sans aucune donnée dans cette série : la situation réelle est probablement pire que sur la carte.`],
 [`${o.use} %`,`seulement des écarts de résistance entre pays sont associés à la consommation d'antibiotiques : la quantité ne suffit pas à expliquer la résistance.`]],
ax_use:"Antibiotiques consommés (doses par 1 000 habitants et par jour)",pos:"positive",neg:"négative",
scR:(r,r2,n,q,dir)=>`Sur ${n} pays, la corrélation est ${q} et ${dir} (r = ${num(r,2)}) : cette cause est associée à environ ${num(r2*100,0)} % des écarts de résistance entre pays.`,
nt_use:"L'Europe consomme beaucoup mais résiste peu ; l'Éthiopie ou le Mali consomment peu mais résistent beaucoup. Ce qui compte semble être la qualité de l'usage, de la prévention et du diagnostic, pas seulement la quantité.",
lm_use:"Limites : certains pays ne déclarent que le secteur public ou la médecine de ville, et l'Asie du Sud est peu représentée (pas de données de consommation pour l'Inde ni le Pakistan).",
actT:"Que peut-on faire ?",actS:"Ce que disent l'OMS et l'étude du Lancet.",
a1T:"Mesurer pour agir",a1:"L'OMS demande à tous les pays de déclarer des données de qualité d'ici 2030. De 2016 à 2023, la participation à GLASS est passée de 25 à 104 pays, mais 48 % des pays n'ont rien déclaré en 2023.",
a2T:"Mieux tester",a2:"Renforcer les laboratoires permet d'identifier la bonne bactérie et le bon antibiotique, au lieu de traiter à l'aveugle.",
a3T:"Mieux utiliser les antibiotiques",a3:"L'OMS vise au moins 70 % d'antibiotiques du groupe « Access » (à moindre risque de résistance) dans la consommation. Seuls 34 % des pays déclarants atteignaient cette cible en 2023.",
a4T:"Prévenir les infections",a4:"Hygiène des mains, eau, assainissement, vaccination : une infection évitée est un antibiotique de moins à utiliser. L'OMS pointe le contrôle des infections parmi les causes à traiter.",
a5T:"Garantir l'accès aux soins",a5:"L'étude du Lancet estime que de meilleurs soins et un meilleur accès aux antibiotiques pourraient sauver jusqu'à 92 millions de vies d'ici 2050.",
src:"Sources : OMS, <i>Global antibiotic resistance surveillance report 2025</i> (GLASS, données 2023) ; GRAM Project, <i>The Lancet</i>, 2024 ; OMS GLASS traité par Our World in Data (<i>E. coli</i> dans les infections du sang 2018-2022, consommation d'antibiotiques) . Les petits échantillons peuvent afficher 0 % ou 100 %. Statistiques de santé publique : ni outil de diagnostic, ni conseil médical."});
Object.assign(I18N.en,{
brT:"The essentials in 4 numbers",
br:o=>[[`×${num(o.ratio,1)}`,`<i>E. coli</i> resistance is ${num(o.ratio,1)} times higher in South Asia (${num(o.hi,0)}%) than in Europe (${num(o.lo,0)}%), in ${o.y}.`],
 [`${o.up} / ${o.tot}`,`countries where resistance has been rising since ${o.y0} (linear trend, countries with at least 4 years of data).`],
 [`${o.blind}`,`of ${o.m} countries have no data at all in this series: the real situation is probably worse than the map shows.`],
 [`${o.use}%`,`only of the differences in resistance between countries are associated with antibiotic consumption: quantity alone does not explain resistance.`]],
ax_use:"Antibiotics used (doses per 1,000 people per day)",pos:"positive",neg:"negative",
scR:(r,r2,n,q,dir)=>`Across ${n} countries, the correlation is ${q} and ${dir} (r = ${num(r,2)}): this cause is associated with about ${num(r2*100,0)}% of the differences in resistance between countries.`,
nt_use:"Europe uses a lot but has low resistance; Ethiopia or Mali use little yet have high resistance. What seems to matter is the quality of use, prevention and diagnosis, not just the quantity.",
lm_use:"Limits: some countries report only the public sector or community use, and South Asia is thinly covered (no consumption data for India or Pakistan).",
actT:"What can be done?",actS:"What WHO and the Lancet study say.",
a1T:"Measure to act",a1:"WHO asks all countries to report quality data by 2030. From 2016 to 2023, participation in GLASS grew from 25 to 104 countries, yet 48% of countries reported nothing in 2023.",
a2T:"Test more",a2:"Stronger labs identify the right bacterium and the right antibiotic instead of treating blindly.",
a3T:"Use antibiotics better",a3:"WHO aims for at least 70% of antibiotic use to come from the “Access” group (lower resistance risk). Only 34% of reporting countries met that target in 2023.",
a4T:"Prevent infections",a4:"Hand hygiene, water, sanitation, vaccination: an infection avoided is one less antibiotic course. WHO points to infection control among the causes to address.",
a5T:"Guarantee access to care",a5:"The Lancet study estimates that better care and better access to antibiotics could save up to 92 million lives by 2050.",
src:"Sources: WHO, <i>Global antibiotic resistance surveillance report 2025</i> (GLASS, 2023 data); GRAM Project, <i>The Lancet</i>, 2024; WHO GLASS processed by Our World in Data (<i>E. coli</i> in bloodstream infections 2018-2022, antibiotic consumption). Small samples can show 0% or 100%. Public health statistics: not a diagnostic tool and not medical advice."});
Object.assign(I18N.fr,{tab1:"Aperçu",tab2:"Carte",tab3:"Causes et solutions",
tgAll:"Toutes bactéries · 2023",tgBug:"Sang · 2023",tgDth:"Étude GRAM · 2021 et projection 2050",
tgEc:"<i>E. coli</i> · infections du sang · 2018-2022",tgDrv:"<i>E. coli</i> · résistance et consommation 2022"});
Object.assign(I18N.en,{tab1:"Overview",tab2:"Map",tab3:"Causes and solutions",
tgAll:"All bacteria · 2023",tgBug:"Bloodstream · 2023",tgDth:"GRAM study · 2021 and 2050 projection",
tgEc:"<i>E. coli</i> · bloodstream infections · 2018-2022",tgDrv:"<i>E. coli</i> · resistance and consumption, 2022"});
