(()=>{
const Y0=YEARS[0],Y1=YEARS[YEARS.length-1];
const med=a=>{a=[...a].sort((p,q)=>p-q);const m=a.length>>1;return a.length%2?a[m]:(a[m-1]+a[m])/2};
const slope=c=>{const p=DATA[c].map((v,i)=>v==null?null:[i,v]).filter(Boolean);if(p.length<4)return null;
  const n=p.length,sx=p.reduce((a,q)=>a+q[0],0),sy=p.reduce((a,q)=>a+q[1],0),sxy=p.reduce((a,q)=>a+q[0]*q[1],0),sxx=p.reduce((a,q)=>a+q[0]*q[0],0);
  return (n*sxy-sx*sy)/(n*sxx-sx*sx)};
function draw(){
  const g=[[],[],[],[],[]];Object.keys(DATA).forEach(c=>{const v=DATA[c][Y1-Y0];if(v!=null)g[zone(c)].push(v)});
  const hi=med(g[3]),lo=med(g[0]),S=Object.keys(DATA).map(slope).filter(x=>x!=null);
  const o={hi,lo,ratio:hi/lo,y:Y1,y0:Y0,up:S.filter(s=>s>0).length,tot:S.length,blind:GEO.filter(x=>!DATA[x.c]).length,m:GEO.length,use:STATS.use};
  $("brief").innerHTML=t("br")(o).map(([b,s])=>`<div class="card stat"><b>${b}</b><span>${s}</span></div>`).join("");
}
HOOKS.push(draw);
})();
