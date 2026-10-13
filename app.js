const $=id=>document.getElementById(id);
const REG=[
 {n:"Monde",r:1/6,t:"1",d:"6",l:"infections bactériennes courantes testées en laboratoire résistent aux antibiotiques."},
 {n:"Asie du Sud-Est et Méditerranée orientale",r:1/3,t:"1",d:"3",l:"Les deux régions OMS où la résistance est la plus élevée."},
 {n:"Afrique",r:1/5,t:"1",d:"5",l:"Souvent là où les laboratoires manquent pour choisir le bon traitement."},
 {n:"Europe",r:1/10,t:"1",d:"10",l:"La région où la résistance est la plus faible, mais pas nulle."}];
const INF=[["Urinaire",1/3,"1 sur 3"],["Sang",1/6,"1 sur 6"],["Digestive",1/15,"1 sur 15"],["Gonorrhée",1/125,"1 sur 125"]];
const BUG=[["K. pneumoniae",.552],["E. coli",.448],["MRSA (staph. doré)",.27]];
const DTH={att:{n:"Décès directement dus",v:[1.14,1.91]},aso:{n:"Décès où la résistance joue un rôle",v:[4.71,8.22]}};
const N=120;let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
const pts=[];
let tries=0;while(pts.length<N&&tries++<20000){const a=rnd()*6.283,r=Math.sqrt(rnd())*150,x=170+r*Math.cos(a),y=170+r*Math.sin(a);
  if(pts.every(p=>Math.hypot(p[0]-x,p[1]-y)>20))pts.push([x,y]);if(rnd()<.0005)break}
const order=pts.map((_,i)=>i).sort(()=>rnd()-.5);
$("dish").innerHTML=`<circle cx="170" cy="170" r="165" fill="none" stroke="var(--line)" stroke-width="3"/>`+pts.map(p=>`<circle class="d" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${(6+rnd()*4).toFixed(1)}"/>`).join("");
const dots=[...$("dish").querySelectorAll(".d")];
function region(i){
  const g=REG[i],k=Math.round(g.r*dots.length);
  dots.forEach((c,j)=>c.style.fill=order.indexOf(j)<k?"var(--res)":"var(--ok)");
  $("big").innerHTML=`<em>${g.t}</em> sur ${g.d}`;
  $("lead").textContent=(i?g.n+" : ":"")+g.l;
  [...$("btns").children].forEach((b,j)=>b.setAttribute("aria-pressed",i===j));
}
$("btns").innerHTML=REG.map((g,i)=>`<button data-i="${i}">${g.n}</button>`).join("");
$("btns").onclick=e=>{const b=e.target.closest("button");if(b)region(+b.dataset.i)};
const pct=v=>(v*100).toFixed(v<.1?1:0).replace(".",",")+" %";
$("inf").innerHTML=INF.map(r=>`<div class="row"><span>${r[0]}</span><div class="track"><div class="fill" style="width:${r[1]*100}%"></div></div><b>${r[2]}</b></div>`).join("");
$("bug").innerHTML=BUG.map(r=>`<div class="row"><span>${r[0]}</span><div class="track"><div class="fill" style="width:${r[1]*100}%"></div></div><b>${pct(r[1])}</b></div>`).join("");
function deaths(k){
  const d=DTH[k];
  $("dth").innerHTML=[2021,2050].map((y,i)=>`<div class="row"><span>${y}${i?" (projection)":""}</span><div class="track"><div class="fill" style="width:${d.v[i]/8.22*100}%"></div></div><b>${d.v[i].toFixed(2).replace(".",",")} M</b></div>`).join("");
  [...$("dbtn").children].forEach(b=>b.setAttribute("aria-pressed",b.dataset.k===k));
}
$("dbtn").innerHTML=Object.entries(DTH).map(([k,v])=>`<button data-k="${k}">${v.n}</button>`).join("");
$("dbtn").onclick=e=>{const b=e.target.closest("button");if(b)deaths(b.dataset.k)};
region(0);deaths("att");
