(function(){
  const base='../../assets/images/week-2/flashcards/';
  const pairs=[
    {country:'France',food:'Baguette',countryImg:'country-france.png',foodImg:'food-baguette-centered.png',countrySentence:'I am from France.',foodSentence:'Baguette comes from France.'},
    {country:'Spain',food:'Churros',countryImg:'country-spain.png',foodImg:'food-churros-centered.png',countrySentence:'I am from Spain.',foodSentence:'Churros come from Spain.'},
    {country:'England',food:'Fish & Chips',countryImg:'country-england-union.png',foodImg:'food-fish-and-chips-centered.png',countrySentence:'I am from England.',foodSentence:'Fish and chips come from England.'},
    {country:'China',food:'Dumplings',countryImg:'country-china.png',foodImg:'food-dumplings-centered.png',countrySentence:'I am from China.',foodSentence:'Dumplings come from China.'},
    {country:'Germany',food:'Sausage',countryImg:'country-germany.png',foodImg:'food-sausage-centered.png',countrySentence:'I am from Germany.',foodSentence:'Sausage comes from Germany.'},
    {country:'Italy',food:'Pizza',countryImg:'country-italy.png',foodImg:'food-pizza-centered.png',countrySentence:'I am from Italy.',foodSentence:'Pizza comes from Italy.'}
  ];
  const items=pairs.flatMap((p,i)=>[
    {id:`c${i}`,pair:i,label:p.country,img:p.countryImg,sentence:p.countrySentence,type:'country'},
    {id:`f${i}`,pair:i,label:p.food,img:p.foodImg,sentence:p.foodSentence,type:'food'}
  ]);
  const shuffle=a=>[...a].sort(()=>Math.random()-.5);
  const img=item=>`<img class="entity-img ${item.type==='food'?'food-img':''}" src="${base}${item.img}" alt="${item.label}">`;
  const speak=text=>{if(!window.speechSynthesis)return;speechSynthesis.cancel();const spoken=text.replace(/Churros/gi,'Choor-rohs');const u=new SpeechSynthesisUtterance(spoken);u.lang='en-US';u.rate=.86;u.pitch=1.02;speechSynthesis.speak(u)};
  const status=document.getElementById('game-status');
  const setStatus=(text,good)=>{if(!status)return;status.textContent=text;status.style.color=good===false?'var(--barn-d)':'var(--purple-d)'};

  function memory(){
    const board=document.getElementById('memory-board'),movesEl=document.getElementById('moves'),pairsEl=document.getElementById('pairs');
    const preview=document.getElementById('preview'),matchModal=document.getElementById('match-modal'),celebration=document.getElementById('celebration');
    let activeCards=[];
    let first=null,locked=false,moves=0,matched=0,game=0;
    function start(){game++;speechSynthesis.cancel();board.innerHTML='';matchModal.hidden=true;celebration.hidden=true;first=null;locked=false;moves=0;matched=0;movesEl.textContent='0';pairsEl.textContent='0';preview.disabled=false;preview.textContent='👀 Look for 3 Seconds';setStatus('Find two identical country or food pictures.');activeCards=shuffle([...shuffle(items.filter(item=>item.type==='country')).slice(0,3),...shuffle(items.filter(item=>item.type==='food')).slice(0,3)]);
      shuffle([...activeCards,...activeCards]).forEach(item=>{const b=document.createElement('button');b.className='memory-card';b.dataset.id=item.id;b.innerHTML=`<span class="memory-face memory-back">?</span><span class="memory-face memory-front">${img(item)}</span>`;b.onclick=()=>flip(b,item);board.appendChild(b)})}
    function flip(card,item){if(locked||card.classList.contains('is-open')||card.classList.contains('is-matched'))return;card.classList.add('is-open');speak(item.label);if(!first){first={card,item};return}locked=true;moves++;movesEl.textContent=moves;const a=first;first=null;if(a.item.id===item.id){setTimeout(()=>{a.card.classList.add('is-matched');card.classList.add('is-matched');matched++;pairsEl.textContent=matched;document.getElementById('match-pictures').innerHTML=img(item)+img(item);document.getElementById('match-sentence').textContent=item.sentence;matchModal.hidden=false;speak(item.sentence)},450)}else setTimeout(()=>{a.card.classList.remove('is-open');card.classList.remove('is-open');locked=false;setStatus('Try another pair!',false)},750)}
    preview.onclick=()=>{if(locked)return;board.scrollIntoView({block:'center',inline:'nearest'});const current=game;locked=true;preview.disabled=true;board.querySelectorAll('.memory-card:not(.is-matched)').forEach(c=>c.classList.add('is-open'));let n=3;preview.textContent=`👀 Look: ${n}`;const tick=setInterval(()=>{n--;if(n)preview.textContent=`👀 Look: ${n}`},1000);setTimeout(()=>{clearInterval(tick);if(current!==game)return;board.querySelectorAll('.memory-card:not(.is-matched)').forEach(c=>c.classList.remove('is-open'));preview.disabled=false;preview.textContent='👀 Look for 3 Seconds';locked=false},3000)};
    document.getElementById('match-continue').onclick=()=>{matchModal.hidden=true;locked=false;if(matched===6){document.getElementById('final-moves').textContent=`You finished in ${moves} moves.`;celebration.hidden=false}};
    document.getElementById('restart').onclick=start;document.getElementById('celebration-again').onclick=start;start();
  }

  function matching(){
    const choices=document.getElementById('choices-row'),sentence=document.getElementById('sentence-text'),scoreEl=document.getElementById('score'),modal=document.getElementById('success-modal');
    let current=null,score=0,locked=false,last='';
    function round(autoSpeak=true){locked=false;modal.hidden=true;let answer;do answer=items[Math.floor(Math.random()*items.length)];while(answer.id===last);last=answer.id;current=answer;sentence.textContent=answer.sentence;const pool=shuffle(items.filter(x=>x.id!==answer.id&&x.type===answer.type)).slice(0,2);choices.innerHTML='';shuffle([answer,...pool]).forEach(item=>{const b=document.createElement('button');b.className='choice-btn';b.innerHTML=img(item)+`<span>${item.label}</span>`;b.onclick=()=>choose(b,item);choices.appendChild(b)});setStatus('Listen and choose one of the three pictures.');if(autoSpeak)speak(answer.sentence)}
    function choose(button,item){if(locked)return;if(item.id!==current.id){button.classList.add('wrong');setStatus('Try again!',false);setTimeout(()=>button.classList.remove('wrong'),600);return}locked=true;button.classList.add('correct');score++;scoreEl.textContent=score;document.getElementById('review-picture').innerHTML=img(current);document.getElementById('review-sentence').textContent=current.sentence;modal.hidden=false;speak(current.sentence)}
    document.getElementById('sentence-listen').onclick=()=>speak(current.sentence);document.getElementById('new-round').onclick=()=>round();document.getElementById('continue-btn').onclick=()=>round();round();
  }

  function wheelGame(){
    const wheel=document.getElementById('wheel'),spin=document.getElementById('spin'),stop=document.getElementById('stop'),area=document.getElementById('selected-area'),card=document.getElementById('word-card');
    let rotation=0,spinning=false,frame=0,last=0,current=null;const speed=110,segmentAngle=360/items.length;
    items.forEach((item,index)=>{const angle=(index*segmentAngle+segmentAngle/2)*Math.PI/180;const label=document.createElement('span');label.className='wheel-label';label.textContent=item.label;label.style.left=`${50+Math.sin(angle)*32}%`;label.style.top=`${50-Math.cos(angle)*32}%`;wheel.appendChild(label)});
    function render(){wheel.style.transform=`rotate(${rotation}deg)`}
    function loop(time){if(!spinning)return;if(last)rotation+=speed*Math.min(time-last,40)/1000;last=time;render();frame=requestAnimationFrame(loop)}
    spin.onclick=()=>{if(spinning)return;spinning=true;last=0;spin.disabled=true;stop.hidden=false;area.hidden=true;setStatus('Press Stop when you are ready!');frame=requestAnimationFrame(loop)};
    stop.onclick=()=>{if(!spinning)return;spinning=false;cancelAnimationFrame(frame);stop.disabled=true;setStatus('Slowing down… watch the pointer!');const start=rotation,began=performance.now(),duration=2400,maxCoast=speed*duration/1000;function coast(time){const p=Math.min((time-began)/duration,1);rotation=start+maxCoast*(p-.5*p*p);render();if(p<1)requestAnimationFrame(coast);else finish()}requestAnimationFrame(coast)};
    function finish(){const pointerAngle=((360-(rotation%360))+360)%360;const landedIndex=Math.floor(pointerAngle/segmentAngle)%items.length;current=items[landedIndex];document.getElementById('card-front').innerHTML=img(current)+`<strong>${current.label}</strong>`;document.getElementById('card-back').innerHTML=img(current)+`<span class="sentence-display">${current.sentence}</span>`;card.classList.remove('is-flipped');card.setAttribute('aria-pressed','false');area.hidden=false;stop.hidden=true;stop.disabled=false;spin.disabled=false;setStatus(`You landed on ${current.label}!`);speak(current.label)}
    card.onclick=()=>{const flipped=card.classList.toggle('is-flipped');card.setAttribute('aria-pressed',String(flipped));if(flipped)speak(current.sentence)};document.getElementById('return-btn').onclick=()=>{area.hidden=true;spin.focus()};
  }

  function quiz(){
    const options=document.getElementById('food-options'),stage=document.getElementById('character-stage'),character=document.getElementById('character-image'),scoreEl=document.getElementById('score'),stars=document.getElementById('happy-stars');
    let order=shuffle(pairs.map((_,i)=>i)),index=0,score=0,attempts=0,currentPair=0,answer=null,locked=false,selected=null;
    function show(){locked=false;selected=null;stars.innerHTML='';stage.classList.remove('is-correct','is-wrong');currentPair=order[index%order.length];const country=items.find(x=>x.pair===currentPair&&x.type==='country');answer=items.find(x=>x.pair===currentPair&&x.type==='food');character.src=base+country.img;character.alt=`Character holding the ${country.label} flag`;document.getElementById('drop-instruction').textContent='Choose a food on the left';const distractors=shuffle(items.filter(x=>x.type==='food'&&x.pair!==currentPair)).slice(0,2);options.innerHTML='';shuffle([answer,...distractors]).forEach(food=>{const b=document.createElement('button');b.className='happy-food-option';b.draggable=true;b.dataset.id=food.id;b.innerHTML=img(food)+`<strong>${food.label}</strong>`;b.onclick=()=>{if(locked)return;options.querySelectorAll('button').forEach(x=>x.classList.remove('is-selected'));selected=food;b.classList.add('is-selected');evaluate(food,b)};b.ondragstart=e=>{e.dataTransfer.setData('text/plain',food.id)};options.appendChild(b)});setStatus('Look at the flag and choose the matching food.')}
    function evaluate(food,button){if(locked)return;attempts++;if(food.id===answer.id){locked=true;score++;button.classList.add('correct');stage.classList.add('is-correct');document.getElementById('drop-instruction').textContent=`${answer.sentence} Great job!`;stars.textContent='⭐ ✨ 🌟';setStatus(answer.sentence,true);speak(answer.sentence)}else{button.classList.add('wrong');stage.classList.add('is-wrong');setStatus('Try again. Look carefully at the flag!',false);setTimeout(()=>{button.classList.remove('wrong','is-selected');stage.classList.remove('is-wrong')},650)}scoreEl.textContent=`Score: ${score} / ${attempts}`}
    stage.ondragover=e=>e.preventDefault();stage.ondrop=e=>{e.preventDefault();const food=items.find(x=>x.id===e.dataTransfer.getData('text/plain'));const button=options.querySelector(`[data-id="${food&&food.id}"]`);if(food&&button)evaluate(food,button)};
    document.getElementById('refresh').onclick=()=>{index++;if(index%order.length===0)order=shuffle(order);show()};show();
  }
  const game=document.body.dataset.game;if(game==='memory')memory();if(game==='matching')matching();if(game==='wheel')wheelGame();if(game==='quiz')quiz();
})();
