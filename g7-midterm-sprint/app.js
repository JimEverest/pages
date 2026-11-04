/* Local-only learning state and deterministic mathematics. */
(()=>{'use strict';
const $=id=>document.getElementById(id), all=s=>[...document.querySelectorAll(s)];
const storeKey='michelle-midterm-sprint-20261104-v1';
let state={marks:{},done:[],fast:false};
try{const v=JSON.parse(localStorage.getItem(storeKey)||'null');if(v&&v.marks&&Array.isArray(v.done))state=v;}catch{}
function save(){try{localStorage.setItem(storeKey,JSON.stringify(state));}catch{}}
const ids=['basics','calculate','distance','motion','models','place','sum','check'];
window.mathErrors=[];
const math=t=>{try{return katex.renderToString('\\displaystyle '+t,{throwOnError:true,strict:false});}catch(e){window.mathErrors.push(String(e));return '公式载入失败';}};
all('.math').forEach(e=>{e.innerHTML=math(e.dataset.tex);});
function go(){let key=location.hash.slice(1)||'start';if(!$(key)||!$(key).classList.contains('view'))key='start';all('.view').forEach(v=>v.hidden=v.id!==key);all('[data-nav]').forEach(a=>{if(a.dataset.nav===key)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});$('sidebar').classList.remove('open');$('menu-toggle').setAttribute('aria-expanded','false');window.scrollTo({top:0,behavior:'instant'});document.title=($(key).querySelector('h1')?.textContent||'考前精简Atlas')+' · Michelle';if(key==='repair')renderProgress();}
window.addEventListener('hashchange',go);
all('[data-nav]').forEach(a=>a.addEventListener('click',()=>{$('sidebar').classList.remove('open');$('menu-toggle').setAttribute('aria-expanded','false');}));
$('menu-toggle').addEventListener('click',()=>{const b=$('sidebar').classList.toggle('open');$('menu-toggle').setAttribute('aria-expanded',String(b));});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('sidebar').classList.remove('open');$('menu-toggle').setAttribute('aria-expanded','false');}});
function renderProgress(){
 const n=ids.filter(id=>state.done.includes(id)).length;$('progress').value=n;$('progress-text').textContent=`主线 ${n} / 8站`;
 all('[data-complete]').forEach(b=>{const yes=state.done.includes(b.dataset.complete);b.setAttribute('aria-pressed',String(yes));b.textContent=yes?'本站已完成 ✓（再点可取消）':'标记本站已完成';});
 all('[data-nav]').forEach(a=>a.classList.toggle('done',state.done.includes(a.dataset.nav)));
 all('[data-mark]').forEach(b=>b.setAttribute('aria-pressed',String(!!b.dataset.mark&&state.marks[b.dataset.q]===b.dataset.mark)));
 const retry=Object.keys(state.marks).filter(n=>state.marks[n]==='retry').map(Number).sort((a,b)=>a-b),marked=Object.keys(state.marks).length;
 $('repair-status').innerHTML=retry.length?`<b>你标出的“需订正”：第 ${retry.join('、')} 题。</b><p>优先找下方对应类型；若原题已经会解释并独立改对，可以把标记改为“独立做对”。</p>`:marked?'<b>目前没有标为“需订正”的题。</b><p>如果确实已独立完成并核对，可以直接看考前提醒卡，不必把选做题全做一遍。</p>':'<b>还没有练习自评记录。</b><p>先完成主线，再按实际卡点选择；不能把“未标记”当成“已经掌握”。</p>';
}
all('[data-complete]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.complete;state.done=state.done.includes(id)?state.done.filter(x=>x!==id):[...state.done,id];save();renderProgress();}));
all('[data-mark]').forEach(b=>b.addEventListener('click',()=>{const n=b.dataset.q,v=b.dataset.mark;if(v)state.marks[n]=v;else delete state.marks[n];save();renderProgress();}));
function timing(){all('.time').forEach(e=>e.textContent=e.dataset[state.fast?'fast':'regular']+'分');$('total-time').textContent=state.fast?'120':'150';$('fast-mode').checked=!!state.fast;$('route-note').textContent=state.fast?'快速路线：112分钟学习与核对＋两次4分钟休息。已有把握的内容快速过；卡住时切回标准路线。':'推荐标准路线：140分钟学习与核对＋两次5分钟休息。第3站和第5站后休息。';all('.break-min').forEach(e=>e.textContent=state.fast?'4':'5');}
$('fast-mode').addEventListener('change',()=>{state.fast=$('fast-mode').checked;save();timing();});
$('clear-progress').addEventListener('click',()=>{if(confirm('清除本浏览器中的本站完成标记和题目自评？')){state={marks:{},done:[],fast:false};save();renderProgress();timing();}});

const ink='#193f37',green='#176d52',red='#a8472f',gold='#bf9250',mute='#66776a';
const num=x=>Number(x.toFixed(3)).toString().replace('-','−');
const tx=(x,y,t,c=ink,z=18,a='middle')=>`<text x="${x}" y="${y}" fill="${c}" font-size="${z*(matchMedia('(max-width:760px)').matches?1.4:1)}" text-anchor="${a}">${t}</text>`;
const ln=(x1,y1,x2,y2,c=ink,w=2,d='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" ${d?`stroke-dasharray="${d}"`:''}/>`;
const dot=(x,y,c=red,r=7)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
function axis(lo,hi,px,y,step=1){let s=ln(40,y,720,y,mute)+`<path d="M720 ${y}l-9 -5v10z" fill="${mute}"/>`;for(let k=lo;k<=hi;k+=step)s+=ln(px(k),y-5,px(k),y+5,mute,1)+tx(px(k),y+25,num(k),mute,14);return s;}
const cases={
 min:{a:3,b:8,lo:0,hi:11,init:5,q:'|x-3|+|x-8|',presets:[3,5,8,10]},
 equal:{a:-6,b:2,lo:-10,hi:6,init:-2,q:'|x-2|=|x+6|',presets:[-6,-2,0,2]},
 sum:{a:-4,b:2,lo:-8,hi:6,init:0,q:'|x+4|+|x-2|=10',presets:[-6,0,4]},
 median:{a:-8,b:3,lo:-10,hi:5,init:-2,q:'|x+2|+|x+8|+|x-3|',presets:[-8,-2,0,3]}
};
function distance(reset=false){
 const k=$('distance-case').value,c=cases[k],r=$('distance-x');if(reset){r.min=c.lo;r.max=c.hi;r.value=c.init;$('distance-q').innerHTML=math(c.q);$('distance-presets').innerHTML=c.presets.map(v=>`<button data-position="${v}">x = ${num(v)}</button>`).join('');}
 const x=+r.value,da=Math.abs(x-c.a),db=Math.abs(x-c.b),extra=Math.max(c.a-x,0,x-c.b),sum=da+db,mid=Math.abs(x+2),px=v=>55+(v-c.lo)/(c.hi-c.lo)*650;
 let s=axis(c.lo,c.hi,px,165,k==='equal'?2:1);
 if(k==='min'||k==='median')s+=ln(px(c.a),165,px(c.b),165,'#b4ceaa',12);
 s+=ln(px(c.a),52,px(x),52,green,5)+tx((px(c.a)+px(x))/2,34,`${num(da)}`,green,19)+ln(px(x),89,px(c.b),89,red,5)+tx((px(x)+px(c.b))/2,76,`${num(db)}`,red,19);
 if(k==='median')s+=ln(px(x),124,px(-2),124,gold,5)+tx((px(x)+px(-2))/2,112,'到−2：'+num(mid),gold,16)+dot(px(-2),165,gold,5);
 s+=ln(px(c.a),145,px(c.a),180,ink)+ln(px(c.b),145,px(c.b),180,ink)+tx(px(c.a),222,'端点 '+num(c.a),ink,15)+tx(px(c.b),222,'端点 '+num(c.b),ink,15)+dot(px(x),165,red,8)+tx(px(x),145,'P',red,16);
 const total=k==='median'?sum+mid:sum;
 $('distance-svg').innerHTML=s;$('distance-svg').setAttribute('aria-label',`P在${num(x)}，到${c.a}的距离${num(da)}，到${c.b}的距离${num(db)}${k==='median'?'，到−2的距离'+num(mid):''}`);
 let desc=k==='equal'?(da===db?'左右各4，一样远的位置只有中点−2。':'两段长度不同；移动到中点才会相等。'):k==='median'?`最外两段合计${num(sum)}，加到−2的距离${num(mid)}，总和${num(total)}。${x===-2?'到中间端点的距离为0，取得最小值11。':'在最外两端之间时，外两段固定为11；要让第三段为0。'}`:extra?`基础长度${c.b-c.a}＋2×外伸${num(extra)}＝${num(sum)}。${k==='sum'&&sum===10?'这是一个解；另一侧也有一个。':'外伸段在两段距离里各算一次。'}`:`P在两端之间：${num(da)}＋${num(db)}＝${c.b-c.a}，整段都保持这个和。`;
 $('distance-output').innerHTML=`<b>x = ${num(x)}　${k==='equal'?'两段：'+num(da)+' 与 '+num(db):'距离和 = '+num(total)}</b><small>${desc}</small>`;
}
$('distance-case').addEventListener('change',()=>distance(true));$('distance-x').addEventListener('input',()=>distance());$('distance-presets').addEventListener('click',e=>{const b=e.target.closest('[data-position]');if(b){$('distance-x').value=b.dataset.position;distance();}});
function chase(){const t=+$('chase-t').value,p=-3+3*t,q=5+t,d=Math.abs(p-q),px=v=>55+(v+4)/20*650;let s=axis(-4,16,px,130,2)+ln(px(p),55,px(q),55,gold,5)+tx((px(p)+px(q))/2,34,'相距 '+num(d),ink,20)+dot(px(p),130,red,9)+dot(px(q),130,green,6)+tx(px(p),101,'P='+num(p),red,18)+tx(px(q),193,'Q='+num(q),green,18);$('chase-svg').innerHTML=s;$('chase-svg').setAttribute('aria-label',`${t}秒，P在${p}，Q在${q}，距离${d}`);$('chase-output').innerHTML=`<b>${num(t)}秒：距离 ${num(d)}</b><small>${t<4?'P在左，正在追近。':t===4?'两点重合，刚刚追上。':'P在右，已经超过。'}${d===2?' 相距2的两个时刻是3秒和5秒。':''}</small>`;}
$('chase-t').addEventListener('input',chase);all('[data-time]').forEach(b=>b.addEventListener('click',()=>{$('chase-t').value=b.dataset.time;chase();}));
function gapAt(n){return n%2?32-3.2*(n+1)/2:32+3.2*n/2;}
function ants(){const n=+$('ants-stage').value,d=gapAt(n),px=k=>60+k*34,py=d=>215-d*2.9;let s=ln(60,215,715,215,mute)+ln(60,215,60,15,mute);for(let k=0;k<=60;k+=10)s+=tx(45,py(k)+5,k,mute,12,'end')+ln(60,py(k),706,py(k),'#e4e9de',1);for(let k=0;k<=19;k++)s+=tx(px(k),238,k,mute,12);s+=tx(72,16,'间距 / 单位',mute,14,'start')+tx(706,257,'第几次爬行结束',mute,13,'end');
 for(let k=1;k<=19;k++)s+=ln(px(k-1),py(gapAt(k-1)),px(k),py(gapAt(k)),k%2?green:red,2.5);
 s+=dot(px(n),py(d),ink,7)+tx(px(n),Math.max(29,py(d)-15),num(d),ink,18);$('ants-svg').innerHTML=s;$('ants-svg').setAttribute('aria-label',`第${n}次结束，累计${n*(n+1)/2}秒，间距${num(d)}`);
 let explain=n===0?'从−18到14：14−(−18)=32。相向缩短、背向增大，每秒改变3.2。':n===19?'第18次结束还隔60.8；第19次相向19秒，刚好缩短3.2×19=60.8。此前奇数次末尾距离都大于0。':n%2?`这一段相向，距离缩短。奇数次末尾依次28.8、25.6、22.4……本次仍隔${num(d)}，还未相遇。`:`已完成${n/2}对，每对净远离3.2，所以32＋${n/2}×3.2＝${num(d)}。再看下一次靠近能走多远。`;
 $('ants-output').innerHTML=`<b>${n?'第'+n+'次结束':'出发时'}：距离${num(d)}　累计${n*(n+1)/2}秒</b><small>${explain}</small>`;
}
$('ants-stage').addEventListener('input',ants);all('[data-stage]').forEach(b=>b.addEventListener('click',()=>{$('ants-stage').value=b.dataset.stage;ants();}));
function profit(){const delta=+$('sale-delta').value,qty=+$('sale-qty').value,price=18+delta,unit=price-14,total=unit*qty,px=v=>50+v*26;let s=axis(0,24,px,100,2)+ln(px(14),48,px(price),48,unit>=0?green:red,7)+tx((px(14)+px(price))/2,29,'每kg '+(unit>=0?'赚':'亏')+Math.abs(unit)+'元',unit>=0?green:red,19)+dot(px(14),100,red,6)+tx(px(14),156,'成本14',red,17)+dot(px(18),100,mute,6)+tx(px(18),184,'标准18',mute,17)+dot(px(price),100,green,8)+tx(px(price),80,'售价'+price,green,19);$('profit-svg').innerHTML=s;$('profit-svg').setAttribute('aria-label',`偏差${delta}，售价${price}，成本14，销量${qty}千克，利润${total}元`);$('profit-output').innerHTML=`<b>偏差${delta>=0?'+':''}${delta}元/kg → 售价${price}元/kg</b><small>(${price}−14) 元/kg × ${qty} kg = <b>${total} 元</b>，${total>0?'盈利':total<0?'亏损':'保本'}。标准价18只负责还原售价。</small>`;}
$('sale-delta').addEventListener('input',profit);$('sale-qty').addEventListener('input',profit);all('[data-sale]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.sale;$('sale-delta').value=k==='sat'?4:k==='sun'?-4:-3;$('sale-qty').value=k==='sat'?10:30;profit();}));
let baseValue=508,baseMessage='原图从左到右是1、3、2、4个结。';
function base(){let v=baseValue;const ds=[];for(let k=3;k>=0;k--){ds.push(Math.floor(v/7**k));v%=7**k;}
 let s=ln(115,30,645,30,ink,4);ds.forEach((digit,i)=>{const x=140+i*160,power=7**(3-i);s+=ln(x,30,x,225,ink,3)+tx(x,262,'位值 '+power,green,18)+tx(x,16,digit+'个结',red,18);for(let k=0;k<digit;k++)s+=dot(x,53+k*25,ink,6);});$('base-svg').innerHTML=s;$('base-svg').setAttribute('aria-label',`七进制${ds.join('')}，十进制${baseValue}`);$('base-output').innerHTML=`<b>${ds.map((d,i)=>d+'×'+7**(3-i)).join(' + ')} = ${baseValue}天</b><small>${baseMessage}</small>`;$('base-add').disabled=baseValue>=2400;}
$('base-original').addEventListener('click',()=>{baseValue=508;baseMessage='原图1324按七进制读，表示508天。';base();});$('base-ready').addEventListener('click',()=>{baseValue=510;baseMessage='现在是1326（510天）：个位已有6个结。再点“再加1天”，7个个位换1个七位。';base();});$('base-add').addEventListener('click',()=>{const carry=baseValue%7===6;baseValue++;baseMessage=carry?'个位满7，清零并向左进1；左边若也满7，继续进位。总天数只增加1。':'加1天，个位增加1；没满7就不进位。';base();});
function sumStep(step){const f=k=>k===0?'4':`\\frac4{3^{${k}}}`;let html='<div class="sum-grid">';for(let row=0;row<2;row++){html+=`<div class="sum-label">${row?'3S':'S'}</div>`;for(let k=0;k<=4;k++){const show=(row===0?k>0:k<4)&&(row===0||step>0);html+=`<div class="${show?'':'empty'} ${show&&step>=2&&(k===0||k===4)?'remaining':''} ${show&&step>=2&&k>0&&k<4?'cancel':''}">${show?math(f(k)):''}</div>`;}}html+='<div class="sum-note"></div>';for(let k=0;k<=4;k++)html+=`<div class="sum-note">${step>=2?(k===0?'留下4':k===4?'减原末项':'抵消'):(k===0?'整数':'指数'+k)}</div>`;html+='</div>';$('sum-grid').innerHTML=html;
 const words=[`这里先用4项观察位置：${math('S=\\frac43+\\frac4{3^2}+\\frac4{3^3}+\\frac4{3^4}')}`,`乘3使每一项的分母指数减少1。3S末项变成${math('\\frac4{3^3}')}，不是${math('\\frac4{3^5}')}。`,`同列相减，中间抵消：${math('3S-S=4-\\frac4{3^4}')}。左端留下4，右端留下“减原末项”。`,`推广到n项：${math('2S=4-\\frac4{3^n}')}，所以 ${math('S=2(1-\\frac1{3^n})')}。<small>n=1时也成立。末项的尾巴不能删掉。</small>`];$('sum-output').innerHTML=words[step];all('[data-sum-step]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.sumStep===step)));}
all('[data-sum-step]').forEach(b=>b.addEventListener('click',()=>sumStep(+b.dataset.sumStep)));
distance(true);chase();ants();profit();base();sumStep(0);timing();renderProgress();go();window.mathReady=true;
})();
