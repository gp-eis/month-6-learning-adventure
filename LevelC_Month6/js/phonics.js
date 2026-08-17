(() => {
  const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const params=new URLSearchParams(location.search),week=Math.min(4,Math.max(1,Number(params.get('week'))||1));
  let mode=1,selected=['A'];
  const stage=document.getElementById('letter-stage'),grid=document.getElementById('alphabet-grid'),help=document.getElementById('letter-help');
  document.getElementById('phonics-week').textContent=`WEEK ${week} · PHONICS`;
  document.getElementById('phonics-back').href=`index.html?week=${week}`;
  document.getElementById('phonics-flash-link').href=`phonics-flashcards.html?week=${week}`;
  document.querySelectorAll('.language-week-tabs a').forEach((a,i)=>a.classList.toggle('active',i+1===week));
  const render=()=>{stage.innerHTML=selected.map(letter=>`<span>${letter}</span>`).join('');help.textContent=mode===1?`Letter ${alphabet.indexOf(selected[0])+1} of 26`:`Two-letter sound: ${selected.join('')}`;grid.querySelectorAll('button').forEach(button=>button.classList.toggle('selected',selected.includes(button.dataset.letter)))};
  alphabet.forEach(letter=>{const b=document.createElement('button');b.type='button';b.dataset.letter=letter;b.textContent=letter;b.setAttribute('aria-label',`Choose letter ${letter}`);b.onclick=()=>{if(mode===1)selected=[letter];else if(selected.includes(letter))selected=selected.filter(x=>x!==letter);else if(selected.length<2)selected.push(letter);else selected=[selected[1],letter];if(!selected.length)selected=[letter];render()};grid.appendChild(b)});
  document.querySelectorAll('[data-mode]').forEach(button=>button.onclick=()=>{mode=Number(button.dataset.mode);document.querySelectorAll('[data-mode]').forEach(x=>x.classList.toggle('active',x===button));selected=mode===1?[selected[0]]:selected.length===2?selected:[selected[0],alphabet[(alphabet.indexOf(selected[0])+1)%26]];render()});
  const step=direction=>{if(mode===1){const index=(alphabet.indexOf(selected[0])+direction+26)%26;selected=[alphabet[index]]}else{selected=selected.map(letter=>alphabet[(alphabet.indexOf(letter)+direction+26)%26])}render()};
  document.getElementById('letter-prev').onclick=()=>step(-1);document.getElementById('letter-next').onclick=()=>step(1);render();
})();
