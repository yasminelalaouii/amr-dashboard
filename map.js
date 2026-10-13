(()=>{
const $=id=>document.getElementById(id),Y0=YEARS[0],Y1=YEARS[YEARS.length-1];
const geo={};GEO.forEach(g=>geo[g.c]=g);
const name=c=>NAMES[c]||c,val=(c,y)=>(DATA[c]||[])[y-Y0]??null;
const f=v=>v.toFixed(1).replace(".",",")+" %";
let yr=Y1,sel="IND";
$("map").innerHTML=GEO.map(g=>`<path data-c="${g.c}" d="${g.d}"><title></title></path>`).join("");
const sl=$("my");sl.min=Y0;sl.max=Y1;sl.value=yr;
const row=c=>`<button class="rk" data-c="${c}" aria-pressed="${c===sel}"><span>${name(c)}</span><b>${f(val(c,yr))}</b></button>`;
function draw(){
  $("yv").textContent=yr;
  $("map").querySelectorAll("path").forEach(p=>{const c=p.dataset.c,v=val(c,yr);
    p.style.fill=v==null?"var(--line)":"var(--res)";p.style.fillOpacity=v==null?1:.12+.88*v/100;
    p.classList.toggle("on",c===sel);
    p.firstChild.textContent=name(c)+(v==null?" : pas de donnée":" : "+f(v))});
  const L=Object.keys(DATA).filter(c=>val(c,yr)!=null).sort((a,b)=>val(b,yr)-val(a,yr));
  $("top").innerHTML=L.slice(0,6).map(row).join("");$("low").innerHTML=L.slice(-6).reverse().map(row).join("");
  const a=DATA[sel]||[],pts=a.map((v,i)=>v==null?null:[20+i*65,80-v*.7]);
  let d="";pts.forEach(p=>{if(p)d+=(d?"L":"M")+p[0]+" "+p[1]});
  const svg=`<line x1="10" x2="290" y1="80" y2="80" stroke="var(--line)"/><path d="${d}" fill="none" stroke="var(--res)" stroke-width="2.5"/>`
   +pts.map((p,i)=>p?`<circle cx="${p[0]}" cy="${p[1]}" r="${YEARS[i]===yr?5.5:3}" fill="var(--res)"/>`:"").join("")
   +YEARS.map((y,i)=>`<text x="${20+i*65}" y="98" text-anchor="middle" fill="var(--mute)" font-size="11">${y}</text>`).join("");
  const v=val(sel,yr);
  $("pn").innerHTML=`<h3>${name(sel)}</h3><div class="pv">${v==null?"pas de donnée":f(v)}</div><p>des infections du sang à <i>E. coli</i> résistaient aux céphalosporines de 3e génération en ${yr}.</p><svg viewBox="0 0 300 104" role="img" aria-label="Évolution ${Y0}-${Y1}">${svg}</svg>`;
}
const pick=e=>{const b=e.target.closest("[data-c]");if(b){sel=b.dataset.c;draw()}};
$("map").onclick=pick;$("top").onclick=pick;$("low").onclick=pick;
sl.oninput=()=>{yr=+sl.value;draw()};
draw();
})();
