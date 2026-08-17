(() => {
  const week=Math.min(4,Math.max(1,Number(new URLSearchParams(location.search).get('week'))||1));
  const cards=[
    {word:'knife',focus:'kn'},{word:'knee',focus:'kn'},{word:'king',focus:'ng'},{word:'ring',focus:'ng'},
    {word:'drink',focus:'nk'},{word:'pink',focus:'nk'},{word:'lock',focus:'ck'},{word:'duck',focus:'ck'}
  ];
  let index=0;
  const stage=document.getElementById('phonics-picture-card'),count=document.getElementById('phonics-card-count'),list=document.getElementById('phonics-thumb-list');
  document.getElementById('phonics-card-week').textContent=`WEEK ${week} · PHONICS`;
  document.getElementById('phonics-card-back').href=`phonics.html?week=${week}`;
  const marked=card=>{const start=card.word.indexOf(card.focus);return start<0?card.word:`${card.word.slice(0,start)}<strong>${card.focus}</strong>${card.word.slice(start+card.focus.length)}`};
  const render=()=>{const card=cards[index];stage.innerHTML=`<img src="../assets/language/phonics/${card.word}.png" alt="${card.word}"><h2>${marked(card)}</h2>`;count.textContent=`Card ${index+1} of ${cards.length}`;list.querySelectorAll('button').forEach((button,i)=>button.classList.toggle('active',i===index))};
  cards.forEach((card,i)=>{const button=document.createElement('button');button.type='button';button.innerHTML=`<img src="../assets/language/phonics/${card.word}.png" alt=""><span>${card.word}</span>`;button.onclick=()=>{index=i;render()};list.appendChild(button)});
  document.getElementById('phonics-card-prev').onclick=()=>{index=(index-1+cards.length)%cards.length;render()};document.getElementById('phonics-card-next').onclick=()=>{index=(index+1)%cards.length;render()};render();
})();
