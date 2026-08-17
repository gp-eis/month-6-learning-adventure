(function(){
  const path=location.pathname.toLowerCase();
  const level=path.includes('levelb_')?'B':path.includes('levelc_')?'C':'A';
  const week=Math.min(4,Math.max(1,Number(new URLSearchParams(location.search).get('week'))||1));
  const img=(file,alt)=>`<img src="../assets/images/week-2/flashcards/${file}" alt="${alt}">`;
  const petImg=(file,alt)=>`<img src="../assets/images/week-3/flashcards/${file}" alt="${alt}">`;
  const animalImg=(file,alt)=>`<img src="../assets/images/week-4/flashcards/${file}" alt="${alt}">`;
  const phonicsImg=(weekNumber,file,alt)=>`<img src="../assets/images/phonics/week-${weekNumber}/${file}" alt="${alt}">`;
  const phonicsByWeek={
    1:{letter:'K',caseLabel:'uppercase K',cards:[
      ['Kangaroo',phonicsImg(1,'kangaroo-3d.png','A kangaroo')],
      ['Kettle',phonicsImg(1,'kettle-3d.png','A kettle')],
      ['Key',phonicsImg(1,'key-3d.png','A key')]
    ]},
    2:{letter:'k',caseLabel:'lowercase k',cards:[
      ['king',phonicsImg(2,'king-3d.png','A king')],
      ['kitten',phonicsImg(2,'kitten-3d.png','A kitten')],
      ['koala',phonicsImg(2,'koala-3d.png','A koala')]
    ]},
    3:{letter:'L',caseLabel:'uppercase L',cards:[
      ['Lamp',phonicsImg(3,'lamp-3d.png','A lamp')],
      ['Leaf',phonicsImg(3,'leaf-3d.png','A leaf')],
      ['Lemon',phonicsImg(3,'lemon-3d.png','A lemon')]
    ]},
    4:{letter:'l',caseLabel:'lowercase l',cards:[
      ['lion',phonicsImg(4,'lion-3d.png','A lion')],
      ['lock',phonicsImg(4,'lock-3d.png','A lock')],
      ['log',phonicsImg(4,'log-3d.png','A log')]
    ]}
  };
  const data={
    A:{
      1:{title:'How Do You Groom a Cat?',sentence:['I can','its fur.'],cards:[['Dry','&#128168;'],['Brush','&#129529;'],['Cut','&#9986;&#65039;'],['Stroke','&#128062;'],['Wash','&#129532;']]},
      2:{title:'How Heavy Is the Rain?',cards:[
        ['Very lightly',img('raining-very-lightly-3d.png','Very light rain'),'rain',["It's raining",'.']],
        ['Lightly',img('raining-lightly-3d.png','Light rain'),'rain',["It's raining",'.']],
        ['Heavily',img('raining-heavily-3d.png','Heavy rain'),'rain',["It's raining",'.']],
        ['Very heavily',img('raining-very-heavily-3d.png','Very heavy rain'),'rain',["It's raining",'.']],
        ['Cats and dogs',img('raining-cats-and-dogs-3d.png','Raining cats and dogs'),'rain',["It's raining",'.']],
        ['Sunny',img('sunny-3d.png','Sunny weather'),'weather',['It is','.']],
        ['Rainy',img('raining-lightly-3d.png','Rainy weather'),'weather',['It is','.']],
        ['Windy',img('windy-3d.png','Windy weather'),'weather',['It is','.']],
        ['Snowing',img('snowing-3d.png','Snowing weather'),'weather',['It is','.']],
        ['Sunglasses',img('sunglasses-3d.png','Sunglasses'),'weather',['I need','.']],
        ['Rain boots',img('rain-boots-3d.png','Rain boots'),'weather',['I need','.']],
        ['Scarf',img('scarf-3d.png','A winter scarf'),'weather',['I need','.']],
        ['Gloves',img('gloves-3d.png','Winter gloves'),'weather',['I need','.']]
      ]},
      3:{title:'What Does My Pet Need?',sentence:['My pet needs','.'],cards:[
        ['A leash',petImg('leash-3d.png','A pet leash')],
        ['A water bowl',petImg('water-bowl-3d.png','A pet water bowl')],
        ['Food',petImg('food-3d.png','Pet food and a bowl of kibble')],
        ['A carrier',petImg('carrier-3d.png','A pet carrier')],
        ['A collar',petImg('collar-3d.png','A pet collar')],
        ['Toys',petImg('toys-3d.png','Pet toys')],
        ['A blanket',petImg('blanket-3d.png','A pet blanket')]
      ]},
      4:{title:'What Pet Is It?',sentence:['It is a','.'],cards:[
        ['Dog',animalImg('dog-3d.png','A friendly dog')],
        ['Cat',animalImg('cat-3d.png','A friendly cat')],
        ['Rabbit',animalImg('rabbit-3d.png','A friendly rabbit')],
        ['Turtle',animalImg('turtle-3d.png','A friendly turtle')],
        ['Bird',animalImg('bird-3d.png','A friendly pet bird')],
        ['Hamster',animalImg('hamster-3d.png','A friendly hamster')]
      ]}
    },
    B:{
      1:{title:'What Do You Grow?',sentence:['I grow','.'],cards:[['Corn','&#127805;'],['Apples','&#127822;'],['Pumpkins','&#127875;'],['Cabbages','&#129388;'],['Carrots','&#129365;'],['Eggplants','&#127814;']]},
      2:{title:'Where Is It From?',sentence:['It is from','.'],cards:[['China','&#127759;'],['France','&#127467;&#127479;'],['Spain','&#127466;&#127480;'],['Italy','&#127470;&#127481;'],['England','&#127468;&#127463;']]},
      3:{title:'What Do Plants Need?',sentence:['Plants need','.'],cards:[['Sunlight','&#9728;&#65039;'],['Water','&#128167;'],['Soil','&#129717;'],['Air','&#128168;']]},
      4:{title:"It's Time to Wake Up!",sentence:["It's time to",'.'],cards:[['Wake up','&#127749;'],['Get dressed','&#128085;'],['Eat breakfast','&#127859;'],['Go outside','&#127793;']]}
    },
    C:{
      1:{title:'Numbers in Our Words',sentence:['I can count to','.'],cards:[['One','1&#65039;&#8419;'],['Two','2&#65039;&#8419;'],['Three','3&#65039;&#8419;'],['Four','4&#65039;&#8419;'],['Five','5&#65039;&#8419;']]},
      2:{title:'Shape Talk',sentence:['This is a','.'],cards:[['Circle','&#128308;'],['Square','&#128998;'],['Triangle','&#128314;'],['Rectangle','&#9646;']]},
      3:{title:'Compare and Describe',sentence:['This one is','.'],cards:[['More','&#10133;'],['Less','&#10134;'],['Same','&#61;'],['Different','&#8800;']]},
      4:{title:'Patterns and Positions',sentence:['The object is','.'],cards:[['First','1st'],['Next','&#10145;&#65039;'],['Above','&#11014;&#65039;'],['Below','&#11015;&#65039;']]}
    }
  }[level][week];
  const cards=data.cards.map(c=>({word:c[0],picture:c[1],group:c[2]||'lesson',sentence:c[3]||data.sentence}));
  const phonics=phonicsByWeek[week];
  document.title=`Flashcards - Level ${level} Week ${week}`;
  document.getElementById('fc-week-label').textContent=`Level ${level} - Week ${week}: ${data.title}`;
  const back=document.getElementById('fc-back');back.href=`page-0${week}.html`;back.textContent=`Back to Week ${week}`;
  const isWeatherLesson=level==='A'&&week===2;
  const weatherTab=document.getElementById('weather-lesson-tab');
  weatherTab.hidden=!isWeatherLesson;
  if(isWeatherLesson){
    document.querySelector('[data-activity="lesson"]').innerHTML='&#127783;&#65039; Lesson Flashcard - How Heavy Is the Rain';
    document.getElementById('lesson-heading').textContent='Lesson Flashcard - How Heavy Is the Rain';
  }
  const showKeySentence=level==='A'&&(week===3||week===4);
  const cardHtml=c=>`<div class="fc-card"><div class="fc-picture">${c.picture}</div><div class="fc-word">${c.word}</div>${showKeySentence?`<div class="fc-key-sentence">${sentenceFor(c)}</div>`:''}</div>`;
  const random=(avoid)=>{const pool=cards.filter(c=>c.word!==avoid);return pool[Math.floor(Math.random()*pool.length)]||cards[0]};
  const sentenceFor=c=>`${c.sentence[0]} ${c.word.toLowerCase()}${c.sentence[1]}`;
  const speak=t=>{if(!window.speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.rate=.88;u.pitch=1.08;speechSynthesis.speak(u)};
  const speakCard=c=>speak(showKeySentence?`${c.word}. ${sentenceFor(c)}`:c.word);
  document.querySelectorAll('.fc-nav-btn').forEach(b=>b.onclick=()=>{document.querySelectorAll('.fc-nav-btn').forEach(x=>x.classList.toggle('is-active',x===b));document.querySelectorAll('.fc-panel').forEach(x=>x.classList.toggle('is-active',x.dataset.panel===b.dataset.activity));});
  const phonicsCardHtml=p=>`<div class="fc-card"><div class="fc-picture">${p.picture}</div><div class="fc-phonics-word"><span class="fc-phonics-letter">${phonics.letter}</span><span>${p.word.slice(1)}</span></div><div class="fc-key-sentence">I found a ${p.word.toLowerCase()}.</div></div>`;
  const phonicsThumbHtml=p=>`<span class="mini">${p.picture}</span><span class="phonics-mini-word"><strong>${phonics.letter}</strong>${p.word.slice(1)}</span>`;
  const speakPhonics=p=>speak(`${p.word}. I found a ${p.word.toLowerCase()}.`);
  function renderLesson(pool,stage,list){
    function show(c,btn){stage.innerHTML=cardHtml(c);list.querySelectorAll('button').forEach(x=>x.classList.toggle('is-active',x===btn));speakCard(c)}
    pool.forEach((c,i)=>{const b=document.createElement('button');b.className='fc-thumb';b.innerHTML=`<span class="mini">${c.picture}</span>${c.word}`;b.onclick=()=>show(c,b);list.appendChild(b);if(!i)show(c,b)});
  }
  renderLesson(isWeatherLesson?cards.filter(c=>c.group==='rain'):cards,document.getElementById('lesson-stage'),document.getElementById('lesson-list'));
  if(isWeatherLesson)renderLesson(cards.filter(c=>c.group==='weather'),document.getElementById('weather-stage'),document.getElementById('weather-list'));
  document.getElementById('phonics-help').textContent=`Practice ${phonics.caseLabel} and its words.`;
  const phonicsStage=document.getElementById('phonics-stage'),phonicsList=document.getElementById('phonics-list');
  const phonicsCards=phonics.cards.map(c=>({word:c[0],picture:c[1]}));
  phonicsCards.forEach((p,i)=>{const b=document.createElement('button');b.className='fc-thumb phonics-thumb';b.innerHTML=phonicsThumbHtml(p);b.onclick=()=>{phonicsStage.innerHTML=phonicsCardHtml(p);phonicsList.querySelectorAll('button').forEach(x=>x.classList.toggle('is-active',x===b));speakPhonics(p)};phonicsList.appendChild(b);if(!i){phonicsStage.innerHTML=phonicsCardHtml(p);b.classList.add('is-active')}});
  const randomPhonics=avoid=>{const pool=phonicsCards.filter(p=>p.word!==avoid);return pool[Math.floor(Math.random()*pool.length)]||phonicsCards[0]};
  let phonicsFast=randomPhonics(),phonicsFastStage=document.getElementById('phonics-fast-stage');
  function setPhonicsFast(){phonicsFastStage.innerHTML=phonicsCardHtml(phonicsFast);phonicsFastStage.classList.remove('is-open')}
  setPhonicsFast();document.getElementById('phonics-fast-peek').onclick=()=>{phonicsFastStage.classList.add('is-open');setTimeout(()=>phonicsFastStage.classList.remove('is-open'),300)};document.getElementById('phonics-fast-show').onclick=()=>{phonicsFastStage.classList.add('is-open');speakPhonics(phonicsFast)};document.getElementById('phonics-fast-next').onclick=()=>{phonicsFast=randomPhonics(phonicsFast.word);setPhonicsFast()};
  let phonicsSpot=randomPhonics(),phonicsSpotStage=document.getElementById('phonics-spot-stage');
  function setPhonicsSpot(){phonicsSpotStage.innerHTML=phonicsCardHtml(phonicsSpot)+'<div class="spot-mask"></div>';phonicsSpotStage.classList.remove('is-open')}
  setPhonicsSpot();phonicsSpotStage.onpointermove=e=>{const r=phonicsSpotStage.getBoundingClientRect(),m=phonicsSpotStage.querySelector('.spot-mask');m.style.setProperty('--x',`${(e.clientX-r.left)/r.width*100}%`);m.style.setProperty('--y',`${(e.clientY-r.top)/r.height*100}%`)};document.getElementById('phonics-spot-show').onclick=()=>{phonicsSpotStage.classList.add('is-open');speakPhonics(phonicsSpot)};document.getElementById('phonics-spot-next').onclick=()=>{phonicsSpot=randomPhonics(phonicsSpot.word);setPhonicsSpot()};
  let fast=random();const fastStage=document.getElementById('fast-stage');function setFast(){fastStage.innerHTML=cardHtml(fast);fastStage.classList.remove('is-open')}setFast();document.getElementById('fast-peek').onclick=()=>{fastStage.classList.add('is-open');setTimeout(()=>fastStage.classList.remove('is-open'),300)};document.getElementById('fast-show').onclick=()=>{fastStage.classList.add('is-open');speakCard(fast)};document.getElementById('fast-next').onclick=()=>{fast=random(fast.word);setFast()};
  let spot=random();const spotStage=document.getElementById('spot-stage');function setSpot(){spotStage.innerHTML=cardHtml(spot)+'<div class="spot-mask"></div>';spotStage.classList.remove('is-open')}setSpot();spotStage.onpointermove=e=>{const r=spotStage.getBoundingClientRect(),m=spotStage.querySelector('.spot-mask');m.style.setProperty('--x',`${(e.clientX-r.left)/r.width*100}%`);m.style.setProperty('--y',`${(e.clientY-r.top)/r.height*100}%`)};document.getElementById('spot-show').onclick=()=>{spotStage.classList.add('is-open');speakCard(spot)};document.getElementById('spot-next').onclick=()=>{spot=random(spot.word);setSpot()};
  const sentenceList=document.getElementById('sentence-list'),blank=document.getElementById('sentence-blank'),start=document.getElementById('sentence-start'),end=document.getElementById('sentence-end');
  function resetSentence(){start.textContent=isWeatherLesson?'Choose a card:':cards[0].sentence[0];blank.textContent='______';blank.classList.remove('is-filled');end.textContent=isWeatherLesson?'':cards[0].sentence[1]}
  cards.forEach(c=>{const b=document.createElement('button');b.className='fc-thumb';b.innerHTML=`<span class="mini">${c.picture}</span>${c.word}`;b.onclick=()=>{start.textContent=c.sentence[0];blank.textContent=c.word.toLowerCase();end.textContent=c.sentence[1];blank.classList.add('is-filled');speak(sentenceFor(c))};sentenceList.appendChild(b)});document.getElementById('sentence-reset').onclick=resetSentence;resetSentence();
  const phonicsSentenceList=document.getElementById('phonics-sentence-list'),phonicsBlank=document.getElementById('phonics-sentence-blank');
  phonicsCards.forEach(p=>{const b=document.createElement('button');b.className='fc-thumb phonics-thumb';b.innerHTML=phonicsThumbHtml(p);b.onclick=()=>{phonicsBlank.textContent=p.word.toLowerCase();phonicsBlank.classList.add('is-filled');speak(`I found a ${p.word.toLowerCase()}.`)};phonicsSentenceList.appendChild(b)});
  document.getElementById('phonics-sentence-reset').onclick=()=>{phonicsBlank.textContent='______';phonicsBlank.classList.remove('is-filled')};
})();
