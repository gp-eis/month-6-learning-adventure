(function(){
  const path=location.pathname.toLowerCase();
  const level=path.includes('levelb_')?'B':path.includes('levelc_')?'C':'A';
  const week=Math.min(4,Math.max(1,Number(new URLSearchParams(location.search).get('week'))||1));
  const data={
    A:{
      1:{title:'How Do You Groom a Cat?',sentence:['I can','its fur.'],cards:[['Dry','&#128168;'],['Brush','&#129529;'],['Cut','&#9986;&#65039;'],['Stroke','&#128062;'],['Wash','&#129532;']]},
      2:{title:'How Heavy Is the Rain?',sentence:['It is raining','.' ],cards:[['Very lightly','&#127783;&#65039;'],['Lightly','&#127782;&#65039;'],['Heavily','&#127784;&#65039;'],['Very heavily','&#9928;&#65039;'],['Cats and dogs','&#9748;&#65039;']]},
      3:{title:'How Can I Help You?',sentence:['I can help you','.' ],cards:[['Brush','&#129529;'],['Wash','&#129532;'],['Dry','&#128168;'],['Cut','&#9986;&#65039;']]},
      4:{title:'What Kind Is It?',sentence:['It is a','pet.'],cards:[['Friendly','&#128522;'],['Fluffy','&#9729;&#65039;'],['Small','&#128057;'],['Playful','&#127918;']]}
    },
    B:{
      1:{title:'What Do You Grow?',sentence:['I grow','.' ],cards:[['Corn','&#127805;'],['Apples','&#127822;'],['Pumpkins','&#127875;'],['Cabbages','&#129388;'],['Carrots','&#129365;'],['Eggplants','&#127814;']]},
      2:{title:'Where Are You From?',sentence:['I am from','.' ],cards:[
        ['France','../assets/images/week-2/flashcards/country-france.png','image',['I am from','France.']],
        ['Spain','../assets/images/week-2/flashcards/country-spain.png','image',['I am from','Spain.']],
        ['England','../assets/images/week-2/flashcards/country-england-union.png','image',['I am from','England.']],
        ['China','../assets/images/week-2/flashcards/country-china.png','image',['I am from','China.']],
        ['Germany','../assets/images/week-2/flashcards/country-germany.png','image',['I am from','Germany.']],
        ['Italy','../assets/images/week-2/flashcards/country-italy.png','image',['I am from','Italy.']],
        ['Pizza','../assets/images/week-2/flashcards/food-pizza-centered.png','image',['Pizza comes from','Italy.']],
        ['Fish & Chips','../assets/images/week-2/flashcards/food-fish-and-chips-centered.png','image',['Fish and chips come from','England.']],
        ['Baguette','../assets/images/week-2/flashcards/food-baguette-centered.png','image',['Baguette comes from','France.']],
        ['Churros','../assets/images/week-2/flashcards/food-churros-centered.png','image',['Churros come from','Spain.']],
        ['Dumplings','../assets/images/week-2/flashcards/food-dumplings-centered.png','image',['Dumplings come from','China.']],
        ['Sausage','../assets/images/week-2/flashcards/food-sausage-centered.png','image',['Sausage comes from','Germany.']]
      ]},
      3:{title:'What Do Plants Need?',sentence:['Plants need','.' ],cards:[['Sunlight','&#9728;&#65039;'],['Water','&#128167;'],['Soil','&#129717;'],['Air','&#128168;']]},
      4:{title:"It's Time to Wake Up!",sentence:["It's time to",'.'],cards:[['Wake up','&#127749;'],['Get dressed','&#128085;'],['Eat breakfast','&#127859;'],['Go outside','&#127793;']]}
    },
    C:{
      1:{title:'Numbers in Our Words',sentence:['I can count to','.' ],cards:[['One','1&#65039;&#8419;'],['Two','2&#65039;&#8419;'],['Three','3&#65039;&#8419;'],['Four','4&#65039;&#8419;'],['Five','5&#65039;&#8419;']]},
      2:{title:'Shape Talk',sentence:['This is a','.' ],cards:[['Circle','&#128308;'],['Square','&#128998;'],['Triangle','&#128314;'],['Rectangle','&#9646;']]},
      3:{title:'Compare and Describe',sentence:['This one is','.' ],cards:[['More','&#10133;'],['Less','&#10134;'],['Same','&#61;'],['Different','&#8800;']]},
      4:{title:'Patterns and Positions',sentence:['The object is','.' ],cards:[['First','1st'],['Next','&#10145;&#65039;'],['Above','&#11014;&#65039;'],['Below','&#11015;&#65039;']]}
    }
  }[level][week];
  document.title=`Flashcards - Level ${level} Week ${week}`;
  document.getElementById('fc-week-label').textContent=`Level ${level} - Week ${week}: ${data.title}`;
  const back=document.getElementById('fc-back');back.href=`page-0${week}.html`;back.textContent=`Back to Week ${week}`;
  const pictureHtml=c=>c[2]==='image'?`<img class="fc-entity ${c[1].includes('/food-')?'fc-food':''}" src="${c[1]}" alt="${c[0]}">`:c[1];
  const cardHtml=c=>`<div class="fc-card"><div class="fc-picture">${pictureHtml(c)}</div><div class="fc-word">${c[0]}</div></div>`;
  const random=(avoid)=>{const pool=data.cards.filter(c=>c[0]!==avoid);return pool[Math.floor(Math.random()*pool.length)]||data.cards[0]};
  const speak=t=>{if(!window.speechSynthesis)return; speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.rate=.88;u.pitch=1.08;speechSynthesis.speak(u)};
  document.querySelectorAll('.fc-nav-btn').forEach(b=>b.onclick=()=>{document.querySelectorAll('.fc-nav-btn').forEach(x=>x.classList.toggle('is-active',x===b));document.querySelectorAll('.fc-panel').forEach(x=>x.classList.toggle('is-active',x.dataset.panel===b.dataset.activity));});
  const lessonStage=document.getElementById('lesson-stage'),lessonList=document.getElementById('lesson-list');
  function showLesson(c,btn){lessonStage.innerHTML=cardHtml(c);lessonList.querySelectorAll('button').forEach(x=>x.classList.toggle('is-active',x===btn));speak(c[0])}
  data.cards.forEach((c,i)=>{const b=document.createElement('button');b.className='fc-thumb';b.innerHTML=`<span class="mini">${pictureHtml(c)}</span>${c[0]}`;b.onclick=()=>showLesson(c,b);lessonList.appendChild(b);if(!i)showLesson(c,b)});
  let fast=random();const fastStage=document.getElementById('fast-stage');function setFast(){fastStage.innerHTML=cardHtml(fast);fastStage.classList.remove('is-open')}setFast();document.getElementById('fast-peek').onclick=()=>{fastStage.classList.add('is-open');setTimeout(()=>fastStage.classList.remove('is-open'),300)};document.getElementById('fast-show').onclick=()=>{fastStage.classList.add('is-open');speak(fast[0])};document.getElementById('fast-next').onclick=()=>{fast=random(fast[0]);setFast()};
  let spot=random();const spotStage=document.getElementById('spot-stage');function setSpot(){spotStage.innerHTML=cardHtml(spot)+'<div class="spot-mask"></div>';spotStage.classList.remove('is-open')}setSpot();spotStage.onpointermove=e=>{const r=spotStage.getBoundingClientRect(),m=spotStage.querySelector('.spot-mask');m.style.setProperty('--x',`${(e.clientX-r.left)/r.width*100}%`);m.style.setProperty('--y',`${(e.clientY-r.top)/r.height*100}%`)};document.getElementById('spot-show').onclick=()=>{spotStage.classList.add('is-open');speak(spot[0])};document.getElementById('spot-next').onclick=()=>{spot=random(spot[0]);setSpot()};
  const sentenceList=document.getElementById('sentence-list'),blank=document.getElementById('sentence-blank'),sentenceStart=document.getElementById('sentence-start'),sentenceEnd=document.getElementById('sentence-end');sentenceStart.textContent=data.sentence[0];sentenceEnd.textContent=data.sentence[1];data.cards.forEach(c=>{const b=document.createElement('button');b.className='fc-thumb';b.innerHTML=`<span class="mini">${pictureHtml(c)}</span>${c[0]}`;b.onclick=()=>{const prompt=c[3]||[data.sentence[0],`${c[0].toLowerCase()}${data.sentence[1]}`];sentenceStart.textContent=prompt[0];blank.textContent=prompt[1];sentenceEnd.textContent='';blank.classList.add('is-filled');speak(`${prompt[0]} ${prompt[1]}`)};sentenceList.appendChild(b)});document.getElementById('sentence-reset').onclick=()=>{sentenceStart.textContent=data.sentence[0];blank.textContent='______';sentenceEnd.textContent=data.sentence[1];blank.classList.remove('is-filled')};
})();
