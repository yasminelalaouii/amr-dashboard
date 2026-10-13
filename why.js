const STATS={};
(()=>{
const Y0=YEARS[0],ri=USE_YEAR-Y0;
const P=Object.keys(USE).filter(c=>DATA[c]&&DATA[c][ri]!=null).map(c=>({c,x:USE[c],y:DATA[c][ri]}));
const n=P.length,mx=P.reduce((a,p)=>a+p.x,0)/n,my=P.reduce((a,p)=>a+p.y,0)/n;
const sxy=P.reduce((a,p)=>a+(p.x-mx)*(p.y-my),0),sxx=P.reduce((a,p)=>a+(p.x-mx)**2,0),syy=P.reduce((a,p)=>a+(p.y-my)**2,0);
const r=sxy/Math.sqrt(sxx*syy),b=sxy/sxx,a0=my-b*mx;
STATS.use=Math.round(r*r*100);
function draw(){
  $("wcards").innerHTML=[1,2,3,4,5].map(i=>`<div class="wc"><h3>${t("w"+i+"T")}</h3><p>${t("w"+i)}</p></div>`).join("");
  $("acards").innerHTML=[1,2,3,4,5].map(i=>`<div class="wc"><h3>${t("a"+i+"T")}</h3><p>${t("a"+i)}</p></div>`).join("");
  const X=v=>50+v/70*570,Y=v=>310-v/100*290;
  let s="";
  [0,20,40,60].forEach(v=>s+=`<line x1="${X(v)}" x2="${X(v)}" y1="20" y2="310" stroke="var(--line)"/><text x="${X(v)}" y="328" text-anchor="middle">${v}</text>`);
  [0,25,50,75,100].forEach(v=>s+=`<line x1="50" x2="620" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)"/><text x="44" y="${Y(v)+4}" text-anchor="end">${v}</text>`);
  s+=`<line x1="${X(5)}" y1="${Y(a0+b*5)}" x2="${X(68)}" y2="${Y(Math.min(100,a0+b*68))}" stroke="var(--ink)" stroke-dasharray="5 4" opacity=".6"/>`;
  s+=P.map(p=>`<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="6" fill="${ZC[zone(p.c)]}" fill-opacity=".85" stroke="var(--panel)"><title>${cname(p.c)} : ${num(p.x)} / ${num(p.y)} %</title></circle>`).join("");
  s+=["ETH","MLI","FRA","IRN","BGD","OMN","ZAF"].map(c=>P.find(p=>p.c===c)).filter(Boolean).map(p=>`<text class="lb" x="${X(p.x)+9}" y="${Y(p.y)+4}">${cname(p.c)}</text>`).join("");
  s+=`<text x="335" y="348" text-anchor="middle">${t("ax_use")}</text><text transform="translate(12 165) rotate(-90)" text-anchor="middle">${t("scY")}</text>`;
  $("scat").innerHTML=s;
  $("zl").innerHTML=[0,1,2,3,4].map(i=>`<span><i style="background:${ZC[i]}"></i>${t("z"+i)}</span>`).join("");
  const q=Math.abs(r)<.2?t("q0"):Math.abs(r)<.5?t("q1"):t("q2");
  $("scr").textContent=t("scR")(r,r*r,n,q,r>0?t("pos"):t("neg"))+" "+t("nt_use");
  $("scl").textContent=t("lm_use");
}
HOOKS.push(draw);
})();
