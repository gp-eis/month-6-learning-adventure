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
      2:{title:'Where Is It From?',sentence:['It is from','.' ],cards:[['China','&#127759;'],['France','&#127467;&#127479;'],['Spain','&#127466;&#127480;'],['Italy','&#127470;&#127481;'],['England','&#127468;&#127463;']]},
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
  const cardHtml=c=>`<div class="fc-card"><div class="fc-picture">${c[1]}</div><div class="fc-word">${c[0]}</div></div>`;
  const random=(avoid)=>{const pool=data.cards.filter(c=>c[0]!==avoid);return pool[Math.floor(Math.random()*pool.length)]||data.cards[0]};
  const speak=t=>{if(!window.speechSynthesis)return; speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.rate=.88;u.pitch=1.08;speechSynthesis.speak(u)};
  document.querySelectorAll('.fc-nav-btn').forEach(b=>b.onclick=()=>{document.querySelectorAll('.fc-nav-btn').forEach(x=>x.classList.toggle('is-active',x===b));document.querySelectorAll('.fc-panel').forEach(x=>x.classList.toggle('is-active',x.dataset.panel===b.dataset.activity));});
  const lessonStage=document.getElementById('lesson-stage'),lessonList=document.getElementById('lesson-list');
  function showLesson(c,btn){lessonStage.innerHTML=cardHtml(c);lessonList.querySelectorAll('button').forEach(x=>x.classList.toggle('is-active',x===btn));speak(c[0])}
  data.cards.forEach((c,i)=>{const b=document.createElement('button');b.className='fc-thumb';b.innerHTML=`<span class="mini">${c[1]}</span>${c[0]}`;b.onclick=()=>showLesson(c,b);lessonList.appendChild(b);if(!i)showLesson(c,b)});
  let fast=random();const fastStage=document.getElementById('fast-stage');function setFast(){fastStage.innerHTML=cardHtml(fast);fastStage.classList.remove('is-open')}setFast();document.getElementById('fast-peek').onclick=()=>{fastStage.classList.add('is-open');setTimeout(()=>fastStage.classList.remove('is-open'),300)};document.getElementById('fast-show').onclick=()=>{fastStage.classList.add('is-open');speak(fast[0])};document.getElementById('fast-next').onclick=()=>{fast=random(fast[0]);setFast()};
  let spot=random();const spotStage=document.getElementById('spot-stage');function setSpot(){spotStage.innerHTML=cardHtml(spot)+'<div class="spot-mask"></div>';spotStage.classList.remove('is-open')}setSpot();spotStage.onpointermove=e=>{const r=spotStage.getBoundingClientRect(),m=spotStage.querySelector('.spot-mask');m.style.setProperty('--x',`${(e.clientX-r.left)/r.width*100}%`);m.style.setProperty('--y',`${(e.clientY-r.top)/r.height*100}%`)};document.getElementById('spot-show').onclick=()=>{spotStage.classList.add('is-open');speak(spot[0])};document.getElementById('spot-next').onclick=()=>{spot=random(spot[0]);setSpot()};
  const sentenceList=document.getElementById('sentence-list'),blank=document.getElementById('sentence-blank');document.getElementById('sentence-start').textContent=data.sentence[0];document.getElementById('sentence-end').textContent=data.sentence[1];data.cards.forEach(c=>{const b=document.createElement('button');b.className='fc-thumb';b.innerHTML=`<span class="mini">${c[1]}</span>${c[0]}`;b.onclick=()=>{blank.textContent=c[0].toLowerCase();blank.classList.add('is-filled');speak(`${data.sentence[0]} ${c[0]} ${data.sentence[1]}`)};sentenceList.appendChild(b)});document.getElementById('sentence-reset').onclick=()=>{blank.textContent='______';blank.classList.remove('is-filled')};
})();
