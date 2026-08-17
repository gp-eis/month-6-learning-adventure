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
      3:{title:'What Do Plants Need?',sentence:['Plants need','.' ],cards:[
        ['The Sun','../assets/images/week-3/flashcards/the-sun.png','image',['Plants need','the sun.'],true],
        ['Land','../assets/images/week-3/flashcards/land.png','image',['Plants need','land.'],true],
        ['Love','../assets/images/week-3/flashcards/love.png','image',['Plants need','love.'],true],
        ['Soil','../assets/images/week-3/flashcards/soil.png','image',['Plants need','soil.'],true],
        ['Rain','../assets/images/week-3/flashcards/rain.png','image',['Plants need','rain.'],true],
        ['Water','../assets/images/week-3/flashcards/water.png','image',['Plants need','water.'],true],
        ['Clean Air','../assets/images/week-3/flashcards/clean-air.png','image',['Plants need','clean air.'],true]
      ]},
      4:{title:'From Sunrise to Sleep',sentence:['Choose a card:',''],cards:[
        ['The sun rises.','../assets/images/week-4/flashcards/sun-rises.png','image',['','The sun rises.']],
        ["It's time to wake up.",'../assets/images/week-4/flashcards/wake-up.png','image',['',"It's time to wake up."]],
        ["It's time to eat breakfast.",'../assets/images/week-4/flashcards/eat-breakfast.png','image',['',"It's time to eat breakfast."]],
        ["It's time to start work.",'../assets/images/week-4/flashcards/start-work.png','image',['',"It's time to start work."]],
        ['The sun sets.','../assets/images/week-4/flashcards/sun-sets.png','image',['','The sun sets.']],
        ["It's time to eat dinner.",'../assets/images/week-4/flashcards/eat-dinner.png','image',['',"It's time to eat dinner."]],
        ["It's time to read a story.",'../assets/images/week-4/flashcards/read-story.png','image',['',"It's time to read a story."]],
        ["It's time to sleep.",'../assets/images/week-4/flashcards/sleep.png','image',['',"It's time to sleep."]]
      ]}
    },
    C:{
      1:{title:'Numbers in Our Words',sentence:['I can count to','.' ],cards:[['One','1&#65039;&#8419;'],['Two','2&#65039;&#8419;'],['Three','3&#65039;&#8419;'],['Four','4&#65039;&#8419;'],['Five','5&#65039;&#8419;']]},
      2:{title:'Shape Talk',sentence:['This is a','.' ],cards:[['Circle','&#128308;'],['Square','&#128998;'],['Triangle','&#128314;'],['Rectangle','&#9646;']]},
      3:{title:'Compare and Describe',sentence:['This one is','.' ],cards:[['More','&#10133;'],['Less','&#10134;'],['Same','&#61;'],['Different','&#8800;']]},
      4:{title:'Patterns and Positions',sentence:['The object is','.' ],cards:[['First','1st'],['Next','&#10145;&#65039;'],['Above','&#11014;&#65039;'],['Below','&#11015;&#65039;']]}
    }
  }[level][week];
  const phonics={
    1:{pattern:'Week 1 phonics: -ip',cards:[
      {label:'lip',image:'../assets/images/phonics/lip.png',speech:'lip. Here is the lip.'},
      {label:'pip',image:'../assets/images/phonics/pip.png',speech:'pip. Here is the pip.'},
      {label:'ship',image:'../assets/images/phonics/ship.png',speech:'ship. Here is the ship.'}
    ],completions:[
      {label:'lip',image:'../assets/images/phonics/lip.png',answer:'lip.'},
      {label:'pip',image:'../assets/images/phonics/pip.png',answer:'pip.'},
      {label:'ship',image:'../assets/images/phonics/ship.png',answer:'ship.'}
    ]},
    2:{pattern:'Week 2 phonics: -it',cards:[
      {label:'kit',image:'../assets/images/phonics/kit.png',speech:'kit. Here is the kit.'},
      {label:'pit',image:'../assets/images/phonics/pit.png',speech:'pit. Here is the pit.'},
      {label:'sit',image:'../assets/images/phonics/sit.png',speech:'sit. Here I sit.'}
    ],completions:[
      {label:'kit',image:'../assets/images/phonics/kit.png',answer:'kit.'},
      {label:'pit',image:'../assets/images/phonics/pit.png',answer:'pit.'},
      {label:'sit',image:'../assets/images/phonics/sit.png',answer:'place where I sit.'}
    ]},
    3:{pattern:'Week 3 phonics: -ix',cards:[
      {label:'mix',image:'../assets/images/phonics/mix-reference.png',speech:'mix. Here is the mix.'},
      {label:'pixie',image:'../assets/images/phonics/pixie.png',speech:'pixie. Here is the pixie.'},
      {label:'six',image:'../assets/images/phonics/six.png',speech:'six. Here is the number six.'}
    ],completions:[
      {label:'mix',image:'../assets/images/phonics/mix-reference.png',answer:'mix.'},
      {label:'pixie',image:'../assets/images/phonics/pixie.png',answer:'pixie.'},
      {label:'six',image:'../assets/images/phonics/six.png',answer:'number six.'}
    ]},
    4:{pattern:'Week 4 phonics: review sentences',cards:[
      {label:'ship / pip / lip',image:'../assets/images/phonics/week4-ship-pip-lip.png',sentence:'Here is the ship, and here is the pip on my lip.',speech:'Here is the ship, and here is the pip on my lip.'},
      {label:'kit / pit / sit',image:'../assets/images/phonics/week4-kit-pit-sit.png',sentence:'Here is the kit in the pit where I sit.',speech:'Here is the kit in the pit where I sit.'},
      {label:'pixie / mix / six',image:'../assets/images/phonics/week4-pixie-mix-six.png',sentence:'Here is the pixie with a mix of six sticks.',speech:'Here is the pixie with a mix of six sticks.'}
    ],completions:[
      {label:'ship / pip / lip',image:'../assets/images/phonics/week4-ship-pip-lip.png',answer:'ship, and here is the pip on my lip.'},
      {label:'kit / pit / sit',image:'../assets/images/phonics/week4-kit-pit-sit.png',answer:'kit in the pit where I sit.'},
      {label:'pixie / mix / six',image:'../assets/images/phonics/week4-pixie-mix-six.png',answer:'pixie with a mix of six sticks.'}
    ]}
  }[week];
  if(week===4)document.body.classList.add('week4-flashcards');
  document.title=`Flashcards - Level ${level} Week ${week}`;
  document.getElementById('fc-week-label').textContent=`Level ${level} - Week ${week}: ${data.title}`;
  const back=document.getElementById('fc-back');back.href=`page-0${week}.html`;back.textContent=`Back to Week ${week}`;
  const pictureHtml=c=>c[2]==='image'?`<img class="fc-entity ${c[1].includes('/food-')?'fc-food':''}" src="${c[1]}" alt="${c[0]}">`:c[1];
  const cardHtml=c=>`<div class="fc-card"><div class="fc-picture">${pictureHtml(c)}</div><div class="fc-word">${c[0]}</div></div>`;
  const random=(avoid)=>{const pool=data.cards.filter(c=>c[0]!==avoid);return pool[Math.floor(Math.random()*pool.length)]||data.cards[0]};
  const speak=t=>{if(!window.speechSynthesis)return; speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.rate=.88;u.pitch=1.08;speechSynthesis.speak(u)};
  const speakCard=c=>speak(c[4]?`${c[0]}. ${c[3][0]} ${c[3][1]}`:c[0]);
  document.querySelectorAll('.fc-nav-btn').forEach(b=>b.onclick=()=>{document.querySelectorAll('.fc-nav-btn').forEach(x=>x.classList.toggle('is-active',x===b));document.querySelectorAll('.fc-panel').forEach(x=>x.classList.toggle('is-active',x.dataset.panel===b.dataset.activity));});
  const lessonStage=document.getElementById('lesson-stage'),lessonList=document.getElementById('lesson-list');
  function showLesson(c,btn){lessonStage.innerHTML=cardHtml(c);lessonList.querySelectorAll('button').forEach(x=>x.classList.toggle('is-active',x===btn));speakCard(c)}
  data.cards.forEach((c,i)=>{const b=document.createElement('button');b.className='fc-thumb';b.innerHTML=`<span class="mini">${pictureHtml(c)}</span>${c[0]}`;b.onclick=()=>showLesson(c,b);lessonList.appendChild(b);if(!i)showLesson(c,b)});
  const phonicsStage=document.getElementById('phonics-stage'),phonicsList=document.getElementById('phonics-list');
  document.getElementById('phonics-pattern').textContent=phonics.pattern;
  const phonicsCardHtml=c=>`<div class="fc-card phonics-card ${c.sentence?'phonics-review-card':''}"><div class="fc-picture"><img class="fc-entity" src="${c.image}" alt="${c.label}"></div><div class="fc-word">${c.sentence||c.label}</div></div>`;
  function showPhonics(c,btn){phonicsStage.innerHTML=phonicsCardHtml(c);phonicsList.querySelectorAll('button').forEach(x=>x.classList.toggle('is-active',x===btn));speak(c.speech)}
  phonics.cards.forEach((c,i)=>{const b=document.createElement('button');b.className='fc-thumb phonics-thumb';b.innerHTML=`<span class="mini"><img class="fc-entity" src="${c.image}" alt=""></span>${c.label}`;b.onclick=()=>showPhonics(c,b);phonicsList.appendChild(b);if(!i)phonicsStage.innerHTML=phonicsCardHtml(c)});
  const randomPhonics=avoid=>{const pool=phonics.cards.filter(c=>c.label!==avoid);return pool[Math.floor(Math.random()*pool.length)]||phonics.cards[0]};
  let phonicsFast=randomPhonics(),phonicsFastStage=document.getElementById('phonics-fast-stage');
  function setPhonicsFast(){phonicsFastStage.innerHTML=phonicsCardHtml(phonicsFast);phonicsFastStage.classList.remove('is-open')}
  setPhonicsFast();document.getElementById('phonics-fast-peek').onclick=()=>{phonicsFastStage.classList.add('is-open');setTimeout(()=>phonicsFastStage.classList.remove('is-open'),300)};document.getElementById('phonics-fast-show').onclick=()=>{phonicsFastStage.classList.add('is-open');speak(phonicsFast.speech)};document.getElementById('phonics-fast-next').onclick=()=>{phonicsFast=randomPhonics(phonicsFast.label);setPhonicsFast()};
  let phonicsSpot=randomPhonics(),phonicsSpotStage=document.getElementById('phonics-spot-stage');
  function setPhonicsSpot(){phonicsSpotStage.innerHTML=phonicsCardHtml(phonicsSpot)+'<div class="spot-mask"></div>';phonicsSpotStage.classList.remove('is-open')}
  setPhonicsSpot();phonicsSpotStage.onpointermove=e=>{const r=phonicsSpotStage.getBoundingClientRect(),m=phonicsSpotStage.querySelector('.spot-mask');m.style.setProperty('--x',`${(e.clientX-r.left)/r.width*100}%`);m.style.setProperty('--y',`${(e.clientY-r.top)/r.height*100}%`)};document.getElementById('phonics-spot-show').onclick=()=>{phonicsSpotStage.classList.add('is-open');speak(phonicsSpot.speech)};document.getElementById('phonics-spot-next').onclick=()=>{phonicsSpot=randomPhonics(phonicsSpot.label);setPhonicsSpot()};
  let fast=random();const fastStage=document.getElementById('fast-stage');function setFast(){fastStage.innerHTML=cardHtml(fast);fastStage.classList.remove('is-open')}setFast();document.getElementById('fast-peek').onclick=()=>{fastStage.classList.add('is-open');setTimeout(()=>fastStage.classList.remove('is-open'),300)};document.getElementById('fast-show').onclick=()=>{fastStage.classList.add('is-open');speakCard(fast)};document.getElementById('fast-next').onclick=()=>{fast=random(fast[0]);setFast()};
  let spot=random();const spotStage=document.getElementById('spot-stage');function setSpot(){spotStage.innerHTML=cardHtml(spot)+'<div class="spot-mask"></div>';spotStage.classList.remove('is-open')}setSpot();spotStage.onpointermove=e=>{const r=spotStage.getBoundingClientRect(),m=spotStage.querySelector('.spot-mask');m.style.setProperty('--x',`${(e.clientX-r.left)/r.width*100}%`);m.style.setProperty('--y',`${(e.clientY-r.top)/r.height*100}%`)};document.getElementById('spot-show').onclick=()=>{spotStage.classList.add('is-open');speakCard(spot)};document.getElementById('spot-next').onclick=()=>{spot=random(spot[0]);setSpot()};
  const sentenceList=document.getElementById('sentence-list'),blank=document.getElementById('sentence-blank'),sentenceStart=document.getElementById('sentence-start'),sentenceEnd=document.getElementById('sentence-end');sentenceStart.textContent=data.sentence[0];sentenceEnd.textContent=data.sentence[1];data.cards.forEach(c=>{const b=document.createElement('button');b.className='fc-thumb';b.innerHTML=`<span class="mini">${pictureHtml(c)}</span>${c[0]}`;b.onclick=()=>{const prompt=c[3]||[data.sentence[0],`${c[0].toLowerCase()}${data.sentence[1]}`];sentenceStart.textContent=prompt[0];blank.textContent=prompt[1];sentenceEnd.textContent='';blank.classList.add('is-filled');speak(`${prompt[0]} ${prompt[1]}`)};sentenceList.appendChild(b)});document.getElementById('sentence-reset').onclick=()=>{sentenceStart.textContent=data.sentence[0];blank.textContent='______';sentenceEnd.textContent=data.sentence[1];blank.classList.remove('is-filled')};
  const phonicsSentenceList=document.getElementById('phonics-sentence-list'),phonicsBlank=document.getElementById('phonics-sentence-blank');
  phonics.completions.forEach(c=>{const b=document.createElement('button');b.className='fc-thumb phonics-thumb';b.innerHTML=`<span class="mini"><img class="fc-entity" src="${c.image}" alt=""></span>${c.label}`;b.onclick=()=>{phonicsBlank.textContent=c.answer;phonicsBlank.classList.add('is-filled');speak(`Here is the ${c.answer}`)};phonicsSentenceList.appendChild(b)});
  document.getElementById('phonics-sentence-reset').onclick=()=>{phonicsBlank.textContent='______';phonicsBlank.classList.remove('is-filled')};
})();
