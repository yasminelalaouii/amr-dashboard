(()=>{
const REG=[{r:1/6,d:6},{r:1/3,d:3},{r:1/5,d:5},{r:1/10,d:10}];
const INF=[[1/3,3],[1/6,6],[1/15,15],[1/125,125]],BUG=[.552,.448,.27];
const DTH={d0:[1.14,1.91],d1:[4.71,8.22]};
let ri=0,dk="d0";
const N=120;let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
const pts=[];let tries=0;
while(pts.length<N&&tries++<20000){const a=rnd()*6.283,r=Math.sqrt(rnd())*150,x=170+r*Math.cos(a),y=170+r*Math.sin(a);
  if(pts.every(p=>Math.hypot(p[0]-x,p[1]-y)>17))pts.push([x,y])}
const order=pts.map((_,i)=>i).sort(()=>rnd()-.5);
$("dish").innerHTML=`<circle cx="170" cy="170" r="165" fill="none" stroke="var(--line)" stroke-width="3"/>`+pts.map(p=>`<circle class="d" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${(6+rnd()*4).toFixed(1)}"/>`).join("");
const dots=[...$("dish").querySelectorAll(".d")];
const bar=(n,w,l)=>`<div class="row"><span>${n}</span><div class="track"><div class="fill" style="width:${w}%"></div></div><b>${l}</b></div>`;
function render(){
  $("s2n").textContent=num(11.8)+" M";
  const g=REG[ri],k=Math.round(g.r*dots.length);
  dots.forEach((c,j)=>c.style.fill=order.indexOf(j)<k?"var(--res)":"var(--ok)");
  $("big").innerHTML=`<em>1</em> ${t("of")} ${g.d}`;
  $("lead").textContent=(ri?t("r"+ri)+" : ":"")+t("l"+ri);
  $("btns").innerHTML=REG.map((_,i)=>`<button data-i="${i}" aria-pressed="${i===ri}">${t("r"+i)}</button>`).join("");
  $("inf").innerHTML=INF.map(([v,d],i)=>bar(t("i"+i),v*100,`1 ${t("of")} ${d}`)).join("");
  $("bug").innerHTML=BUG.map((v,i)=>bar(t("b"+i),v*100,num(v*100,Math.round(v*1000)%10?1:0)+" %")).join("");
  $("dbtn").innerHTML=Object.keys(DTH).map(k=>`<button data-k="${k}" aria-pressed="${k===dk}">${t(k)}</button>`).join("");
  $("dth").innerHTML=[2021,2050].map((y,i)=>bar(y+(i?` (${t("proj")})`:""),DTH[dk][i]/8.22*100,num(DTH[dk][i],2)+" M")).join("");
}
$("btns").onclick=e=>{const b=e.target.closest("button");if(b){ri=+b.dataset.i;render()}};
$("dbtn").onclick=e=>{const b=e.target.closest("button");if(b){dk=b.dataset.k;render()}};
HOOKS.push(render);
})();
