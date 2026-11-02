/* Deterministic teaching diagrams. No network calls or student data. */
(()=>{'use strict';
const $=id=>document.getElementById(id),num=v=>Number(v.toFixed(3)).toString().replace('-','−');
const ink='#183a3b',teal='#12685d',orange='#b65f38',muted='#5a6f70';
const math=t=>window.katex.renderToString(t,{throwOnError:true,strict:false});
const text=(x,y,t,c=ink,size=18,anchor='middle')=>`<text x="${x}" y="${y}" fill="${c}" font-size="${size}" text-anchor="${anchor}">${t}</text>`;
const line=(x1,y1,x2,y2,c=ink,w=2,dash='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" ${dash?'stroke-dasharray="'+dash+'"':''}/>`;
const dot=(x,y,c,r=7)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
function axis(lo,hi,px,y,step=1){let s=line(45,y,755,y,muted)+`<path d="M755 ${y}l-9 -5v10z" fill="${muted}"/>`;for(let i=lo;i<=hi;i+=step)s+=line(px(i),y-5,px(i),y+5,muted,1)+text(px(i),y+29,num(i),muted,14);return s;}
const distCases={
 equal:{a:-6,b:2,lo:-10,hi:6,x:-2,q:'|x-2|=|x+6|',predict:'先猜：到−6和2一样远，会不会有一整段位置？',presets:[[-6,'A点 −6'],[-2,'试中点 −2'],[0,'再试0'],[2,'B点 2']]},
 sum:{a:-3,b:1,lo:-7,hi:5,x:-1,q:'|x+3|+|x-1|=8',predict:'先猜：中间的基础长度只有4，怎样才能让两段合起来等于8？',presets:[[-5,'左外侧 −5'],[-1,'中间 −1'],[3,'右外侧 3']]},
 min:{a:3,b:8,lo:0,hi:11,x:5,q:'|x-3|+|x-8|\\text{ 的最小值}',predict:'先猜：只有中点最短，还是中间每个位置都一样短？',presets:[[1,'左外侧 1'],[3,'端点 3'],[5.5,'中点 5.5'],[8,'端点 8'],[10,'右外侧 10']]}
};
let dc='equal';
const stepStory=(parts)=>parts.map((p,i)=>`<div class="v-number">${i+1}</div><div><h3>${p[0]}</h3><p>${p[1]}</p></div>`).join('');
const stories={equal:[['先读成两段距离。',`${math('|x-2|')} 是到2的距离；${math('|x+6|=|x-(-6)|')} 是到−6的距离。`],['一样远，只能是中点。','从−6走到2一共8格，一半是4格。从−6向右4格，落在 <b>−2</b>。也可以算 (−6+2)÷2=−2。'],['移动一点，就不再相等。','在中间向右移1，左段增加1，右段减少1，差距拉开2。外侧两段始终相差AB=8，也不会相等。原题的 −2 正确。']],
 sum:[['中间不绕路：和总是4。','当P在−3与1之间，PA与PB正好拼成AB。拖动P，一段增长，另一段缩短，合起来仍是4。'],['外侧多走的那段，要算两遍。','P移到A左侧，P到B的路已经包含PA，再加一次PA，就让外伸段出现两遍。因此 <b>距离和=AB+2×外伸段</b>。右侧也一样。'],['多出的4，平分给两遍外伸。','8−4=4，所以外伸长度为4÷2=2。左侧 −3−2=<b>−5</b>；右侧 1+2=<b>3</b>。两个解都要写。原题写的3和−5正确。']],
 min:[['最短的底线，是AB本来的长度。','从3到8已有5格。P在中间时，两段拼起来恰好5；P在外侧时，会额外走两遍外伸段，结果大于5。'],['最小值5，对应一整段。',`<b>${math('3\\le x\\le8')}</b> 的每个位置都达到最小值 <b>5</b>，包括端点。P=3时，0+5=5；P=8时，5+0=5。`],['分清“最小值”与“在哪取到”。','原题只问最小值，答5正确。继续追问在哪取到，不能只答中点5.5，要答从3到8的整段。']]};
function setDistance(key){dc=key;const c=distCases[dc];$('vd-x').min=c.lo;$('vd-x').max=c.hi;$('vd-x').value=c.x;$('vd-question').innerHTML=math(c.q);$('vd-predict').textContent=c.predict;$('vd-presets').innerHTML=c.presets.map(([v,label])=>`<button data-distance-x="${v}">${label}</button>`).join('');document.querySelectorAll('[data-distance-case]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.distanceCase===key)));$('vd-story').innerHTML=stepStory(stories[key]);renderDistance();}
function renderDistance(){const c=distCases[dc],x=+$('vd-x').value,pa=Math.abs(x-c.a),pb=Math.abs(x-c.b),base=c.b-c.a,sum=pa+pb,extra=Math.max(c.a-x,0,x-c.b),inside=x>=c.a&&x<=c.b,px=v=>50+(v-c.lo)/(c.hi-c.lo)*690;
 let s=axis(c.lo,c.hi,px,175);if(dc==='min')s+=line(px(c.a),175,px(c.b),175,'#bed9c4',14)+dot(px(c.a),175,teal,6)+dot(px(c.b),175,teal,6);
 s+=line(px(c.a),64,px(x),64,teal,6)+text((px(c.a)+px(x))/2,48,'PA = '+num(pa),teal)+line(px(x),105,px(c.b),105,orange,6)+text((px(x)+px(c.b))/2,91,'PB = '+num(pb),orange);
 s+=line(px(c.a),150,px(c.a),180,ink)+line(px(c.b),150,px(c.b),180,ink)+text(px(c.a),235,'A = '+num(c.a),ink,17)+text(px(c.b),235,'B = '+num(c.b),ink,17);
 s+=`<g class="v-drag" data-drag-point="true"><circle cx="${px(x)}" cy="175" r="23" fill="transparent"/>${dot(px(x),175,orange,9)}${text(px(x),143,'P = '+num(x),orange,18)}</g>`;
 s+=line(px(c.a),270,px(c.b),270,'#d0b469',6)+text((px(c.a)+px(c.b))/2,299,'基础长度 AB = '+base,muted,16);
 if(!inside){const end=x<c.a?c.a:c.b;s+=line(px(x),250,px(end),250,orange,4)+line(px(x),262,px(end),262,teal,4)+text((px(x)+px(end))/2,284,'外伸×2',orange,13);}
 $('vd-svg').innerHTML=s;$('vd-svg').setAttribute('aria-label',`P在${num(x)}，PA为${num(pa)}，PB为${num(pb)}，合计${num(sum)}`);
 $('vd-readout').innerHTML=`P = <b>${num(x)}</b>　 PA = <b>${num(pa)}</b>　 PB = <b>${num(pb)}</b><small>${dc==='equal'?(pa===pb?'两边一样远 ✓':'两边不相等，还差 '+num(Math.abs(pa-pb))):`距离和 = <b>${num(sum)}</b>${dc==='sum'&&sum===8?'　满足题目 ✓':''}${dc==='min'&&inside?'　取到最小值 ✓':''}`}</small>`;
 $('vd-insight').innerHTML=dc==='equal'?(pa===pb?'这里是中点。左右各4格；再向任一侧移动，两段就不一样长。':inside?'向右移一点：PA变长，PB变短。找两种颜色一样长的时刻。':'在外侧，一段距离比另一段多整个AB，不可能相等。'):inside?`P在两端点之间（含端点）：<b>${num(pa)} + ${num(pb)} = ${base}</b>。两段正好拼成AB。`:`P在外侧：<b>${base} + 2 × ${num(extra)} = ${num(sum)}</b>。外伸的${num(extra)}，在两段距离中各出现一次。`;
}
$('vd-x').addEventListener('input',renderDistance);document.querySelectorAll('[data-distance-case]').forEach(b=>b.addEventListener('click',()=>setDistance(b.dataset.distanceCase)));$('vd-presets').addEventListener('click',e=>{const b=e.target.closest('[data-distance-x]');if(b){$('vd-x').value=b.dataset.distanceX;renderDistance();}});
let dragging=false;const svg=$('vd-svg');function drag(e){const c=distCases[dc],p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;const local=p.matrixTransform(svg.getScreenCTM().inverse());$('vd-x').value=Math.max(c.lo,Math.min(c.hi,Math.round((c.lo+(local.x-50)/690*(c.hi-c.lo))*2)/2));renderDistance();}
svg.addEventListener('pointerdown',e=>{if(e.target.closest('[data-drag-point]')){dragging=true;svg.setPointerCapture(e.pointerId);e.preventDefault();drag(e);}});svg.addEventListener('pointermove',e=>{if(dragging)drag(e);});svg.addEventListener('pointerup',()=>dragging=false);svg.addEventListener('pointercancel',()=>dragging=false);svg.addEventListener('lostpointercapture',()=>dragging=false);
function renderChase(){const t=+$('vc-t').value,p=-3+3*t,q=5+t,d=Math.abs(p-q),px=v=>50+(v+4)/20*690;let s=axis(-4,16,px,145,2);s+=line(px(p),62,px(q),62,'#c3a85d',5)+text((px(p)+px(q))/2,43,'相距 '+num(d),ink,20);s+=dot(px(p),145,orange,9)+dot(px(q),145,teal,6)+text(px(p),110,'P = '+num(p),orange,19)+text(px(q),210,'Q = '+num(q),teal,19);s+=text(400,245,t<4?'P在左，正在追近Q':t===4?'P与Q重合：追上了':'P在右，已经超过Q',muted,17);$('vc-svg').innerHTML=s;$('vc-svg').setAttribute('aria-label',`${num(t)}秒，P在${num(p)}，Q在${num(q)}，距离${num(d)}`);
 $('vc-readout').innerHTML=`<b>${num(t)} 秒</b>　P = −3 + 3×${num(t)} = ${num(p)}　Q = 5 + ${num(t)} = ${num(q)}<small>距离 |P−Q| = <b>${num(d)}</b>${d===2?'　相距2 ✓':''}${t===4?'　追上 ✓':''}</small>`;
 const gx=v=>70+v*105,gy=v=>205-v*20;let g=line(70,205,735,205,muted)+line(70,205,70,20,muted);for(let i=0;i<=6;i++)g+=text(gx(i),229,String(i),muted,14);for(let i=0;i<=8;i+=2)g+=text(50,gy(i)+5,String(i),muted,14);g+=text(735,248,'时间/秒',muted,14,'end')+text(75,15,'距离',muted,14,'start');g+=`<polyline points="${gx(0)},${gy(8)} ${gx(4)},${gy(0)} ${gx(6)},${gy(4)}" fill="none" stroke="${teal}" stroke-width="4"/>`+line(gx(0),gy(2),gx(6),gy(2),orange,2,'6 5');for(const v of [3,5])g+=line(gx(v),gy(2),gx(v),gy(0),orange,1,'4 4')+dot(gx(v),gy(2),orange,6)+text(gx(v),gy(2)-17,v+'秒',orange,17);g+=dot(gx(t),gy(d),ink,8);$('vc-graph').innerHTML=g;
}
$('vc-t').addEventListener('input',renderChase);document.querySelectorAll('[data-chase-time]').forEach(b=>b.addEventListener('click',()=>{$('vc-t').value=b.dataset.chaseTime;renderChase();}));
const cases={six:{b:6,a:1},seven:{b:7,a:1},two:{b:3,a:2},four:{b:3,a:4},comp7:{b:7,a:3,comp:true},comp8:{b:8,a:3,comp:true},grow:{b:2,a:1,grow:true}};let si=0;
const frac=(a,b,k)=>k===0?String(a):`\\frac{${a}}{${b}${k===1?'':`^{${k}}`}}`;
function renderSum(){const key=$('vs-case').value,c=cases[key],n=+$('vs-n').value,b=c.b,a=c.a,steps=c.comp?['先拆项','乘一下','同列相减','求出小和S','代回原和T']:['写出原式','乘一下','同列相减','得到结果'];si=Math.min(si,steps.length-1);$('vs-n-label').textContent=n;
 const origin=c.grow?'1+2+2^2+\\cdots+2^{30}':c.comp?`\\frac{${b}-3}{${b}}+\\frac{${b}^2-3}{${b}^2}+\\cdots+\\frac{${b}^n-3}{${b}^n}`:`${frac(a,b,1)}+${frac(a,b,2)}+\\cdots+${frac(a,b,'n')}`;$('vs-original').innerHTML=math(origin);
 $('vs-split').innerHTML=c.comp?`<p>${math(`\\frac{${b}^k-3}{${b}^k}=1-\\frac3{${b}^k}`)}，每项贡献一个1。</p><div class="v-ones">${Array.from({length:n},()=>'<span class="v-one">1</span>').join('<span>+</span>')}</div><p>图中${n}个1；原题n个1。原和 ${math(`T=n-S`)}，小和 ${math(`S=\\frac3${b}+\\cdots+\\frac3{${b}^n}`)}。</p>`:'';
 $('vs-steps').innerHTML=steps.map((label,i)=>`<button data-sum-step="${i}" ${si===i?'aria-current="step"':''}>${i+1} · ${label}</button>`).join('');
 let captions=c.grow?['先看缩短版：从1开始，图中一共'+n+'项。','两边乘2，幂的指数增加1，每一项向右移一列。','用2S减S。同列相同的项全部抵消，只剩右端的新末项减去左端的1。','图里是缩短版；原题从2⁰加到2³⁰，一共31项，所以新末项是2³¹。']:[c.comp?'先拆成“n个1−小分数和S”。下面只求S，最后还要代回T。':'先排列原式。注意最右边：末项分母的指数就是项数。',`两边乘${b}，分母指数都减1，每一项向左移一列。原末项指数n，乘后为n−1。`,`用${b}S减S。同一列的相同数抵消；左端剩${a}，右端剩“减去原末项”。`,`左边(${b}−1)S=${b-1}S。两边都除以${b-1}，求出S。`, '现在才求原和T。减去的是整个S，先加括号再变号；最后一项变成加号。'];$('vs-caption').textContent=captions[si];
 const cols=n+2;let grid=`<div class="v-term-grid" style="grid-template-columns:65px repeat(${n+1},minmax(70px,1fr))">`;
 function term(k){return c.grow?(k===0?'1':k===1?'2':`2^{${k}}`):frac(a,b,k);}
 for(let row=0;row<2;row++){grid+=`<div class="v-term-label">${row===0?'S':b+'S'}</div>`;for(let k=0;k<=n;k++){const active=c.grow?(row===0?k<n:k>0):(row===0?k>0:k<n),visible=active&&(row===0||si>0),cancel=si>=2&&k>0&&k<n,end=si>=2&&(k===0||k===n);grid+=`<div class="v-term ${visible?'':'v-empty'} ${visible&&cancel?'v-cancel':''} ${visible&&end?'v-end':''}">${visible?math(term(k)):''}</div>`;}}
 grid+='<div></div>';for(let k=0;k<=n;k++)grid+=`<div class="v-term-note">${si<2?(c.grow?'指数 '+k:(k===0?'整数':'分母指数 '+k)):(k>0&&k<n?'相同，消去':c.grow?(k===0?'减去1':'留下新末项'):(k===0?'留下整数':'减去原末项'))}</div>`;grid+='</div>';$('vs-grid').innerHTML=grid;
 let result='';if(si<2)result='<p class="v-small">每排各项之间都是加号。相同的项排在同一列，方便下一步相减。</p>';else if(c.grow){result=`<p>${math(`2S-S=2^{${n}}-1`)}（图中${n}项）</p>`;if(si>=3)result+=`<p>回到原题：${math('S=2^{31}-1')}。<b>从指数0到30，共31项。</b></p>`;}else{result=`<p>${math(`${b}S-S=${a}-${frac(a,b,'n')}`)}</p>`;if(si>=3)result+=`<p>${math(`S=\\frac{${a}}{${b-1}}\\left(1-\\frac1{${b}^n}\\right)`)}${c.comp?' ← 这还是小分数和':''}</p>`;if(si>=4&&c.comp)result+=`<p>${math(`T=n-\\left(\\frac3{${b-1}}-\\frac3{${b-1}\\cdot${b}^n}\\right)`)}<br>${math(`=n-\\frac3{${b-1}}+\\frac3{${b-1}\\cdot${b}^n}`)}</p><p>减去一个“少了一点”的数，结果就多出这一点。</p>`;}
 $('vs-result').innerHTML=result;$('vs-prev').disabled=si===0;$('vs-next').disabled=si===steps.length-1;$('vs-prev').style.opacity=si===0?'.45':'1';$('vs-next').style.opacity=si===steps.length-1?'.45':'1';
}
$('vs-case').addEventListener('change',()=>{si=0;renderSum();});$('vs-n').addEventListener('input',renderSum);$('vs-steps').addEventListener('click',e=>{const b=e.target.closest('[data-sum-step]');if(b){si=+b.dataset.sumStep;renderSum();}});$('vs-next').addEventListener('click',()=>{si++;renderSum();});$('vs-prev').addEventListener('click',()=>{si=Math.max(0,si-1);renderSum();});$('vs-reset').addEventListener('click',()=>{si=0;renderSum();});
setDistance('equal');renderChase();renderSum();
})();
