(()=>{
const Y0=YEARS[0],Y1=YEARS[YEARS.length-1],COL=["var(--res)","var(--c2)","var(--c3)"];
const val=(c,y)=>(DATA[c]||[])[y-Y0]??null,pct=v=>num(v)+" %";
const blind=GEO.filter(g=>!DATA[g.c]).length;
let yr=Y1,sel=["IND","FRA"],shade=false;
$("map").innerHTML=GEO.map(g=>`<path data-c="${g.c}" d="${g.d}"><title></title></path>`).join("");
const sl=$("my");sl.min=Y0;sl.max=Y1;sl.value=yr;
const slope=c=>{const p=DATA[c].map((v,i)=>v==null?null:[i,v]).filter(Boolean);if(p.length<4)return null;
  const n=p.length,sx=p.reduce((a,q)=>a+q[0],0),sy=p.reduce((a,q)=>a+q[1],0),sxy=p.reduce((a,q)=>a+q[0]*q[1],0),sxx=p.reduce((a,q)=>a+q[0]*q[0],0);
  return (n*sxy-sx*sy)/(n*sxx-sx*sx)};
const rk=(c,txt)=>`<button class="rk" data-c="${c}" aria-pressed="${sel.includes(c)}"><span>${cname(c)}</span><b>${txt}</b></button>`;
const med=a=>{a=[...a].sort((p,q)=>p-q);const m=a.length>>1;return a.length%2?a[m]:(a[m-1]+a[m])/2};
function draw(){
  $("yv").textContent=yr;
  $("map").querySelectorAll("path").forEach(p=>{const c=p.dataset.c,v=val(c,yr),i=sel.indexOf(c),none=!DATA[c];
    p.style.fill=v!=null?"var(--res)":(shade&&none?"var(--ink)":"var(--line)");
    p.style.fillOpacity=v!=null?.12+.88*v/100:(shade&&none?.55:1);
    p.style.stroke=i>=0?COL[i]:"";p.style.strokeWidth=i>=0?2.4:"";
    if(i>=0)p.parentNode.appendChild(p);
    p.firstChild.textContent=cname(c)+" : "+(v==null?t("noData"):pct(v))});
  $("shadow").setAttribute("aria-pressed",shade);
  $("shT").textContent=shade?t("shT")(blind,GEO.length):"";
  const L=Object.keys(DATA).filter(c=>val(c,yr)!=null).sort((a,b)=>val(b,yr)-val(a,yr));
  $("top").innerHTML=L.slice(0,6).map(c=>rk(c,pct(val(c,yr)))).join("");
  $("low").innerHTML=L.slice(-6).reverse().map(c=>rk(c,pct(val(c,yr)))).join("");
  const S=Object.keys(DATA).map(c=>[c,slope(c)]).filter(x=>x[1]!=null).sort((a,b)=>b[1]-a[1]);
  $("rise").innerHTML=S.slice(0,6).map(([c,s])=>rk(c,"+"+num(s)+" "+t("perYr"))).join("");
  const W=320,x=i=>34+i*(W-50)/(YEARS.length-1),y=v=>100-v*.85;
  let s=[0,50,100].map(v=>`<line x1="30" x2="312" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)"/><text x="26" y="${y(v)+4}" text-anchor="end" fill="var(--mute)" font-size="10">${v}</text>`).join("");
  sel.forEach((c,k)=>{const a=DATA[c]||[];let d="";a.forEach((v,i)=>{if(v!=null)d+=(d?"L":"M")+x(i).toFixed(1)+" "+y(v).toFixed(1)});
    s+=`<path d="${d}" fill="none" stroke="${COL[k]}" stroke-width="2.5"/>`+a.map((v,i)=>v==null?"":`<circle cx="${x(i)}" cy="${y(v)}" r="${YEARS[i]===yr?5:2.8}" fill="${COL[k]}"/>`).join("")});
  s+=YEARS.map((yy,i)=>`<text x="${x(i)}" y="118" text-anchor="middle" fill="var(--mute)" font-size="10">${yy}</text>`).join("");
  $("pn").innerHTML=`<div class="leg">${sel.map((c,k)=>{const v=val(c,yr);return `<div><i style="background:${COL[k]}"></i><b>${cname(c)}</b><span class="pv" style="color:${COL[k]}">${v==null?t("noData"):pct(v)}</span></div>`}).join("")}</div><p style="margin:0 0 6px;color:var(--mute);font-size:14px">${t("pnTxt")} ${yr}.</p><svg viewBox="0 0 320 124" style="width:100%;max-width:420px" role="img" aria-label="${YEARS[0]}-${Y1}">${s}</svg>`;
  const g=[[],[],[],[],[]];Object.keys(DATA).forEach(c=>{const v=val(c,yr);if(v!=null)g[zone(c)].push(v)});
  $("zones").innerHTML=g.map((a,i)=>[i,a.length?med(a):null,a.length]).filter(z=>z[1]!=null).sort((p,q)=>q[1]-p[1])
    .map(([i,m,n])=>`<div class="row zr"><span>${t("z"+i)}</span><div class="track"><div class="fill" style="width:${m}%;background:${ZC[i]}"></div></div><b>${num(m,0)} % (${n})</b></div>`).join("");
}
const pick=e=>{const b=e.target.closest("[data-c]");if(!b)return;const c=b.dataset.c,i=sel.indexOf(c);
  if(i>=0){if(sel.length>1)sel.splice(i,1)}else{sel.push(c);if(sel.length>3)sel.shift()}draw()};
["map","top","low","rise"].forEach(id=>$(id).onclick=pick);
$("shadow").onclick=()=>{shade=!shade;draw()};
sl.oninput=()=>{yr=+sl.value;draw()};
HOOKS.push(draw);
})();
