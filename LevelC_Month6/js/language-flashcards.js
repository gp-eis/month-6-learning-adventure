(() => {
  const week=Math.min(4,Math.max(1,Number(new URLSearchParams(location.search).get('week'))||1));
  const img=(w,name)=>`<img src="../assets/language/week${w}/${name}.png" alt="">`;
  const card=(word,file,sentence)=>({word,file,sentence});
  const weeks={
    1:{title:'Animals and Where We Go',cards:[
      card('dog','dog','This is a dog.'),card('hamster','hamster','This is a hamster.'),card('fish','fish','This is a fish.'),card('rabbit','rabbit','This is a rabbit.'),card('cat','cat','This is a cat.'),
      card('goes to play soccer','goes-to-play-soccer','He goes to play soccer.'),card('goes to the gym','goes-to-the-gym','He goes to the gym.'),card('goes to the store','goes-to-the-store','He goes to the store.'),card('goes to the coffee shop','goes-to-the-coffee-shop','He goes to the coffee shop.'),card('goes to work','goes-to-work','He goes to work.')
    ]},
    2:{title:'Birds, Sea Animals, and More',cards:['goose','penguin','swan','pigeon','dolphin','whale','seal','manatee','elephant'].map(name=>card(name,name,`This is ${/^[aeiou]/.test(name)?'an':'a'} ${name}.`))},
    3:{title:'Open and Move',cards:[card('open my mouth','open-my-mouth','I open my mouth.'),card('open my hands','open-my-hands','I open my hands.'),card('open my arms','open-my-arms','I open my arms.'),card('open my fingers','open-my-fingers','I open my fingers.')]},
    4:{title:'Week 4',cards:[]}
  };
  const data=weeks[week];
  document.title=`Language Flashcards · Week ${week}`;
  document.getElementById('fc-week-label').textContent=`Week ${week} · ${data.title}`;
  document.getElementById('fc-back').href=`index.html?week=${week}`;
  document.querySelectorAll('.language-week-tabs a').forEach((a,i)=>a.classList.toggle('active',i+1===week));
  if(!data.cards.length){document.getElementById('empty-week').hidden=false;document.getElementById('flashcard-app').hidden=true;return;}
  const picture=c=>img(week,c.file);
  const cardHtml=c=>`<div class="fc-card"><div class="fc-picture">${picture(c)}</div><div class="fc-word">${c.word}</div></div>`;
  const speak=text=>{if(!window.speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.86;speechSynthesis.speak(u)};
  const random=avoid=>{const pool=data.cards.filter(c=>c.word!==avoid);return pool[Math.floor(Math.random()*pool.length)]||data.cards[0]};
  document.querySelectorAll('.fc-nav-btn').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.fc-nav-btn').forEach(item=>item.classList.toggle('is-active',item===button));document.querySelectorAll('.fc-panel').forEach(panel=>panel.classList.toggle('is-active',panel.dataset.panel===button.dataset.activity));}));
  const stage=document.getElementById('lesson-stage'),list=document.getElementById('lesson-list');
  const show=(c,b)=>{stage.innerHTML=cardHtml(c);list.querySelectorAll('button').forEach(x=>x.classList.toggle('is-active',x===b));speak(c.word)};
  data.cards.forEach((c,i)=>{const b=document.createElement('button');b.className='fc-thumb';b.innerHTML=`<span class="mini">${picture(c)}</span>${c.word}`;b.addEventListener('click',()=>show(c,b));list.appendChild(b);if(!i)show(c,b)});
  let fast=random();const fastStage=document.getElementById('fast-stage');const setFast=()=>{fastStage.innerHTML=cardHtml(fast);fastStage.classList.remove('is-open')};setFast();document.getElementById('fast-peek').onclick=()=>{fastStage.classList.add('is-open');setTimeout(()=>fastStage.classList.remove('is-open'),300)};document.getElementById('fast-show').onclick=()=>{fastStage.classList.add('is-open');speak(fast.word)};document.getElementById('fast-next').onclick=()=>{fast=random(fast.word);setFast()};
  let spot=random();const spotStage=document.getElementById('spot-stage');const setSpot=()=>{spotStage.innerHTML=cardHtml(spot)+'<div class="spot-mask"></div>';spotStage.classList.remove('is-open')};setSpot();spotStage.onpointermove=e=>{const r=spotStage.getBoundingClientRect(),m=spotStage.querySelector('.spot-mask');m.style.setProperty('--x',`${(e.clientX-r.left)/r.width*100}%`);m.style.setProperty('--y',`${(e.clientY-r.top)/r.height*100}%`)};document.getElementById('spot-show').onclick=()=>{spotStage.classList.add('is-open');speak(spot.word)};document.getElementById('spot-next').onclick=()=>{spot=random(spot.word);setSpot()};
  const sentenceList=document.getElementById('sentence-list'),sentenceText=document.getElementById('sentence-text');data.cards.forEach(c=>{const b=document.createElement('button');b.className='fc-thumb';b.innerHTML=`<span class="mini">${picture(c)}</span>${c.word}`;b.onclick=()=>{sentenceText.textContent=c.sentence;speak(c.sentence)};sentenceList.appendChild(b)});document.getElementById('sentence-reset').onclick=()=>{sentenceText.textContent='Choose a card.'};
})();
