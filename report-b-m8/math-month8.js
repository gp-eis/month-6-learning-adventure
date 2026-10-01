/* Level B Month 8: matches the sorting boards and number-line sets in M8B_DATA. */
(() => {
  const groups = [
  {
    "key": "w1-flowers",
    "q": "Which is the big yellow flower group?",
    "right": "big yellow flowers",
    "wrong": "small yellow flowers",
    "alt": "A mixed collection of three large yellow sunflowers, two small yellow sunflowers, two blue flowers and one red rose",
    "answer": 0
  },
  {
    "key": "w1-lamps",
    "q": "Which is the small red lamp group?",
    "right": "small red lamps",
    "wrong": "big red lamps",
    "alt": "A mixed collection of three short red garden lamp posts, two tall red garden lamp posts, one short blue lamp post and one tall yellow lamp post",
    "answer": 1
  },
  {
    "key": "w1-trees",
    "q": "Which is the big green tree group?",
    "right": "big green trees",
    "wrong": "small green trees",
    "alt": "A mixed collection of three large green leafy trees, two small green leafy trees, one large orange autumn tree and one bare brown tree",
    "answer": 0
  },
  {
    "key": "w2-jars",
    "q": "Which is the big honey jars with red lids group?",
    "right": "big honey jars with red lids",
    "wrong": "small honey jars with red lids",
    "alt": "A mixed collection of three large glass honey jars with red lids, two small glass honey jars with red lids, one large jar with blue lid and one small jar with yellow lid",
    "answer": 0
  },
  {
    "key": "w2-bread",
    "q": "Which is the big bread slices with honey group?",
    "right": "big bread slices with honey",
    "wrong": "big bread slices with jam",
    "alt": "A mixed collection of three large toast slices with golden honey topping, two large toast slices with red strawberry jam topping, one small toast with golden honey and one large plain toast slice",
    "answer": 1
  },
  {
    "key": "w2-combs",
    "q": "Which is the small hexagon-shaped honeycombs group?",
    "right": "small hexagon-shaped honeycombs",
    "wrong": "big hexagon-shaped honeycombs",
    "alt": "A mixed collection of three small golden hexagon-shaped honeycomb pieces, two big golden hexagon-shaped honeycomb pieces, one small round honeycomb piece and one small square honeycomb piece",
    "answer": 0
  },
  {
    "key": "w3-pancakes",
    "q": "Which is the big honey pancakes on blue plates group?",
    "right": "big honey pancakes on blue plates",
    "wrong": "big honey pancakes on red plates",
    "alt": "A mixed collection of three large honey pancakes each on its own blue round plate, two large pancakes each on a red round plate, one small pancake on a blue round plate and one small pancake on a yellow round plate",
    "answer": 0
  },
  {
    "key": "w3-cups",
    "q": "Which is the blue cups with lemon group?",
    "right": "blue cups with lemon",
    "wrong": "blue cups without lemon",
    "alt": "A mixed collection of three blue tea cups each with a clearly visible lemon slice on the rim, two blue tea cups without lemon, one red tea cup with a lemon slice and one yellow tea cup without lemon",
    "answer": 1
  },
  {
    "key": "w3-cakes",
    "q": "Which is the honey cakes on round plates group?",
    "right": "honey cakes on round plates",
    "wrong": "honey cakes on square plates",
    "alt": "A mixed collection of three honey cake slices each on a round plate, two honey cake slices each on a square plate and two honey cake slices each on an oval plate",
    "answer": 0
  },
  {
    "key": "w4-jars",
    "q": "Which is the big yellow jars group?",
    "right": "big yellow jars",
    "wrong": "small yellow jars",
    "alt": "A mixed collection of three large yellow honey jars, two small yellow honey jars, one large blue honey jar and one small red honey jar",
    "answer": 0
  },
  {
    "key": "w4-cups",
    "q": "Which is the cups on round plates group?",
    "right": "cups on round plates",
    "wrong": "teapots on round plates",
    "alt": "A mixed collection of three tea cups each on a round saucer, two teapots each on a round plate, one cup on an oval saucer and one teapot on a square plate",
    "answer": 1
  },
  {
    "key": "w4-combs",
    "q": "Which is the yellow honeycombs group?",
    "right": "yellow honeycombs",
    "wrong": "brown honeycombs",
    "alt": "A mixed collection of three bright yellow honeycomb pieces, three clearly dark brown honeycomb pieces and one pale white honeycomb piece",
    "answer": 0
  }
];
  const lines = [[[2,1],[5,2]],[[6,1],[7,4]],[[8,5],[10,7]],[[7,1],[10,3]]];
  // Versioned selections are audited against the visible collection, not assumed counts.
  const counts = [[3,2],[3,1],[3,2],[3,2],[2,2],[2,2],[3,2],[3,2],[3,2],[2,2],[2,1],[3,3]];
  const art = key => {
    if (key === 'w1-flowers-other' || key === 'w3-cakes-other') return `https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-b/assets/month8/math-groups-v2/${key}-v4.png`;
    if (key.startsWith('w2-bread-') && !key.endsWith('-question')) return `https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-b/assets/month8/math-groups-v2/${key}-v4.png`;
    if (key === 'w1-lamps-other') return `https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-b/assets/month8/math-groups-v2/${key}-v4.png`;
    if (key === 'w3-cakes-question') return `https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-b/assets/month8/math-groups-v2/${key}-v3.png`;
    if (key.endsWith('-question')) return `https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-b/assets/month8/math-groups-v2/${key}-v1.png`;
    const other = key.endsWith('-other');
    const groupIndex = groups.findIndex(group => key === group.key + (other ? '-other' : '-correct'));
    const count = counts[groupIndex][other ? 1 : 0];
    return `https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-b/assets/month8/math-groups-v2/${key}-v${count === 3 ? 2 : 3}.png`;
  };
  window.LevelBMonth8Weeks.forEach((week, weekIndex) => {
    const questions = groups.slice(weekIndex*3,weekIndex*3+3).map(group => {
      const labels = [group.right,group.wrong], pictures = [art(group.key+'-correct'),art(group.key+'-other')];
      if (group.answer === 1) { labels.reverse(); pictures.reverse(); }
      return {section:'Math',tag:'FIND THE GROUP',icon:'🔎',q:`Which group has ${group.right}?`,
        hint:'Look at the mixed collection. Choose the matching group.',
        image:art(group.key+'-question'),
        imageAlt:`Mixed collection including ${counts[groups.indexOf(group)][0]} ${group.right} and ${counts[groups.indexOf(group)][1]} ${group.wrong}, plus contrasting objects.`,
        imageWide:true,imageCompact:true,mathGroup:true,
        choices:labels,choiceImageFiles:pictures,
        choiceImageAlts:group.answer === 1
          ? [counts[groups.indexOf(group)][1] + ' ' + group.wrong, counts[groups.indexOf(group)][0] + ' ' + group.right]
          : [counts[groups.indexOf(group)][0] + ' ' + group.right, counts[groups.indexOf(group)][1] + ' ' + group.wrong],
        answer:group.answer,
        practice:'This group has '+group.right+'.',correctAnimation:'picture-cheer'};
    });
    lines[weekIndex].forEach(([start,jumps],i) => {
      const end=start-jumps, choices=i===0?[String(end),String(end+1)]:[String(end-1),String(end)];
      questions.push({section:'Math',tag:'NUMBER LINE',icon:'➖',
        q:`Start at ${start}. Jump back ${jumps}. Where do you land?`,
        hint:'Follow each backward jump on the number line.',
        numberLine:{start,jumps},choices,answer:i===0?0:1,
        practice:`Start at ${start}. Jump back ${jumps}. I land on ${end}.`,correctAnimation:'number-jump'});
    });
    week.questions.splice(15,5,...questions);
  });
  window.renderReportMathNumberLine = ({start,jumps}) => {
    const ns='http://www.w3.org/2000/svg', box=document.createElement('div'), svg=document.createElementNS(ns,'svg');
    box.className='report-number-line';
    svg.setAttribute('viewBox','0 0 720 175');svg.setAttribute('role','img');
    svg.setAttribute('aria-label',`Number line from 0 to 10. Start at ${start}, then follow ${jumps} one-step jumps to the left.`);
    const add=(tag,attrs,text,parent=svg)=>{const el=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));if(text!==undefined)el.textContent=text;parent.appendChild(el);return el;};
    const defs=add('defs',{}), marker=add('marker',{id:'report-hop-arrow',viewBox:'0 0 10 10',refX:8,refY:5,markerWidth:5,markerHeight:5,orient:'auto-start-reverse'},undefined,defs);
    add('path',{d:'M 0 0 L 10 5 L 0 10 z',fill:'#2087c8'},undefined,marker);
    const x=n=>40+n*64;
    add('line',{x1:x(0),x2:x(10),y1:110,y2:110,stroke:'#17345a','stroke-width':3});
    for(let n=0;n<=10;n++){add('line',{x1:x(n),x2:x(n),y1:103,y2:117,stroke:'#17345a','stroke-width':2});add('text',{x:x(n),y:145,'text-anchor':'middle',fill:'#17345a','font-size':32,'font-family':'Arial, sans-serif','font-weight':700},n);}
    add('circle',{cx:x(start),cy:110,r:18,fill:'none',stroke:'#27b788','stroke-width':3});
    add('text',{x:x(start),y:30,'text-anchor':'middle',fill:'#177d61','font-size':18,'font-family':'Arial, sans-serif','font-weight':700},'START');
    for(let hop=0;hop<jumps;hop++){const from=x(start-hop),to=x(start-hop-1);add('path',{d:`M ${from} 94 Q ${(from+to)/2} 45 ${to} 94`,fill:'none',stroke:'#2087c8','stroke-width':3,'marker-end':'url(#report-hop-arrow)','data-hop':hop+1});}
    box.appendChild(svg);
    const equation=document.createElement('div');equation.className='report-number-equation';equation.textContent=`${start} − ${jumps} = ?`;box.appendChild(equation);
    return box;
  };
})();
