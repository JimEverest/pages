(function(){
  const tabsEl = document.getElementById('tabs');
  const gridEl = document.getElementById('grid');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');
  let current = 'all';

  function render(zone){
    current = zone;
    [...tabsEl.children].forEach(b=>b.classList.toggle('active', b.dataset.k===zone));
    const list = zone==='all' ? EXERCISES : EXERCISES.filter(e=>e.zones.includes(zone));
    const zoneLabel = k => (ZONES.find(z=>z.key===k)||{}).label || k;
    gridEl.innerHTML = list.map(e=>`
      <article class="card">
        <img src="img/${e.img}.jpg" alt="${e.title}" loading="lazy" data-full="img/${e.img}.jpg">
        <div class="card-body">
          <div class="card-title"><span class="num">${e.id}</span>${e.title}</div>
          <div class="goal">🎯 ${e.goal}</div>
          <div class="dose"><b>剂量：</b>${e.dose}</div>
          <div class="note">⚠️ ${e.note}</div>
          <div>${e.zones.map(z=>`<span class="zone-badge">${zoneLabel(z)}</span>`).join('')}</div>
        </div>
      </article>`).join('');
    gridEl.querySelectorAll('img').forEach(img=>{
      img.addEventListener('click',()=>{modalImg.src=img.dataset.full;modal.hidden=false;});
    });
  }

  tabsEl.innerHTML = ZONES.map(z=>`<button class="tab" data-k="${z.key}">${z.label}</button>`).join('');
  [...tabsEl.children].forEach(b=>b.addEventListener('click',()=>render(b.dataset.k)));

  function closeModal(){modal.hidden=true;modalImg.src='';}
  modalClose.addEventListener('click',closeModal);
  modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

  render('all');
})();
