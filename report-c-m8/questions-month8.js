(() => {
  const P = "Phonics", S = "Key Sentences", R = "Reading", M = "Math";
  const root = "../level-c/https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/";
  const ph = word => `${root}phonics/words/${word}.png`;
  const w1s = name => `${root}flashcards/week-1/speech/${name}`;
  const w2s = name => `${root}flashcards/week-2/speech/${name}`;
  const w3 = name => `${root}literacy/week-3/reading/${name}`;
  const w4 = name => `${root}literacy/week-4/reading/${name}`;
  const w4c = name => `${root}literacy/week-4/cats/${name}`;

  const pictureWord = (word, other, answer = 0) => ({
    section:P, tag:"PICTURE WORD", icon:"🔤", q:"What is this?",
    hint:"Look at the picture and choose its name.", image:ph(word), imageAlt:`A picture of ${word}`,
    choices:answer === 0 ? [word,other] : [other,word], answer, practice:`This is ${word}.`
  });
  const soundTeam = (word, team, other, answer = 0) => ({
    section:P, tag:"LETTER TEAM", icon:"🔤", q:`Which letter team completes ${word}?`,
    hint:"Listen to the middle sound and choose the letters.", image:ph(word), imageAlt:`A picture of ${word}`,
    choices:answer === 0 ? [team,other] : [other,team], answer, practice:`${word} uses ${team}.`
  });
  const phonicsSet = (a,b,c,d,firstTeam,secondTeam) => [
    pictureWord(a,b,0), pictureWord(b,c,1), pictureWord(c,d,0),
    soundTeam(d,secondTeam,firstTeam,1), soundTeam(a,firstTeam,secondTeam,0)
  ];
  const keySentence = (card, index) => ({
    section:S, tag:"KEY SENTENCE", icon:"💬", q:"Which sentence matches the picture?",
    hint:"Look at the picture and choose the matching sentence.", image:card.image, imageAlt:card.alt,
    imageWide:true, imageCompact:true,
    choices:index % 2 ? [card.wrong,card.sentence] : [card.sentence,card.wrong],
    answer:index % 2 ? 1 : 0, practice:card.sentence
  });
  const reading = (cards, card, index) => {
    const other = cards[(index + 1) % cards.length];
    const first = index % 2 ? other : card, second = index % 2 ? card : other;
    return {
      section:R, tag:"READ & CHOOSE", icon:"📖", q:`${card.sentence} Choose the picture.`,
      hint:"Read the sentence and choose the matching picture.",
      choiceImageFiles:[first.image,second.image], choiceImageAlts:[first.alt,second.alt],
      choices:[first.label,second.label], answer:index % 2 ? 1 : 0, practice:card.sentence
    };
  };
  const sentenceSet = cards => [...cards.map(keySentence), ...cards.map((card,index) => reading(cards,card,index))];
  const shapeInfo = {
    square:{label:"Squares",symbol:"■",className:"square",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/math/tokens/square-red-3d-v1.png"},
    circle:{label:"Circles",symbol:"●",className:"circle",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/math/tokens/circle-blue-3d-v1.png"},
    triangle:{label:"Triangles",symbol:"▲",className:"triangle",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/math/tokens/triangle-orange-3d-v1.png"},
    star:{label:"Stars",symbol:"★",className:"star",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/math/tokens/star-green-3d-v1.png"}
  };
  const animalInfo = {
    horse:{label:"Horses",symbol:"🐴",className:"animal",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/math/tokens/horse-3d-v1.png"},
    deer:{label:"Deer",symbol:"🦌",className:"animal",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/math/tokens/deer-3d-v1.png"},
    bear:{label:"Bears",symbol:"🐻",className:"animal",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/math/tokens/bear-3d-v1.png"},
    eagle:{label:"Eagles",symbol:"🦅",className:"animal",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/math/tokens/eagle-3d-v1.png"}
  };
  const makeScene = (catalog, counts) => {
    const order = Object.keys(counts), tokens = [], largest = Math.max(...Object.values(counts));
    for (let row = 0; row < largest; row += 1) order.forEach(key => { if (row < counts[key]) tokens.push(key); });
    return {catalog,order,tokens};
  };
  const alterCounts = (counts, first, second) => ({
    ...counts,
    [first]:counts[first] + 1,
    [second]:Math.max(0,counts[second] - 1)
  });
  const tableQuestion = (scene, counts, wrongCounts, wording = "Count each kind. Which table matches the picture?") => ({
    section:M, tag:"TABLES & GRAPHS", icon:"📊", q:wording,
    hint:"Count each kind in the picture box, then choose the matching table.", categoryScene:scene,
    choiceTables:[{catalog:scene.catalog,order:scene.order,counts},{catalog:scene.catalog,order:scene.order,counts:wrongCounts}],
    choices:["Choose this table.","Choose this table."], answer:0,
    practice:"Great counting! This table shows the correct number in every category."
  });
  const graphQuestion = (scene, counts, wrongCounts) => ({
    section:M, tag:"TABLES & GRAPHS", icon:"📈", q:"Count each kind. Which picture graph matches the box?",
    hint:"Count each kind in the picture box, then choose the matching graph.", categoryScene:scene,
    choiceGraphs:[{catalog:scene.catalog,order:scene.order,counts},{catalog:scene.catalog,order:scene.order,counts:wrongCounts}],
    choices:["Choose this graph.","Choose this graph."], answer:0,
    practice:"Excellent! Each picture in the graph stands for one item."
  });
  const equalGroupsQuestion = (addend, groups, picture, wrongAddend) => {
    const addition = Array.from({length:groups}, () => addend).join(" + "), total = addend * groups;
    return {
    section:M, tag:"EQUAL GROUPS", icon:"➕", q:`${addition} is the same as which equal-groups picture?`,
    hint:`Look for ${groups} equal groups with ${addend} items in each group.`, visual:`${addition} = ${total}`,
    choiceGroups:[
      {image:picture.image,alt:picture.alt,perGroup:addend,groups,expression:`${addend} × ${groups} = ${total}`},
      {image:picture.image,alt:picture.alt,perGroup:wrongAddend,groups,expression:`${wrongAddend} × ${groups} = ${wrongAddend * groups}`}
    ],
    choices:[`${addend} times ${groups} equals ${total}.`,`${wrongAddend} times ${groups} equals ${wrongAddend * groups}.`], answer:0,
    practice:`${addition} is the same as ${addend} times ${groups}. Both equal ${total}.`
  }};

  const animalCounts = {horse:4,deer:3,bear:2,eagle:1};
  const animalScene = makeScene(animalInfo,animalCounts);
  const shapeSets = [
    {square:3,circle:2,triangle:1,star:4},
    {square:3,circle:3,triangle:4,star:3},
    {square:8,circle:4,triangle:6,star:2},
    {square:5,circle:3,triangle:4,star:3}
  ];
  const graphShapeSets = [
    {square:2,circle:3,triangle:4,star:1},
    {square:3,circle:6,triangle:2,star:4},
    {square:3,circle:3,triangle:3,star:7},
    {square:4,circle:7,triangle:8,star:6}
  ];
  const groupPictures = [
    {image:animalInfo.horse.image,alt:"horse"},
    {image:shapeInfo.circle.image,alt:"blue circle"},
    {image:shapeInfo.triangle.image,alt:"orange triangle"},
    {image:shapeInfo.star.image,alt:"green star"}
  ];
  const groupProblems = [
    [{addend:4,groups:2,wrong:3},{addend:9,groups:2,wrong:8}],
    [{addend:3,groups:3,wrong:2},{addend:7,groups:3,wrong:6}],
    [{addend:2,groups:4,wrong:1},{addend:6,groups:4,wrong:5}],
    [{addend:4,groups:2,wrong:3},{addend:3,groups:4,wrong:2}]
  ];
  const mathSets = shapeSets.map((tableCounts,index) => {
    const tableScene = index === 0 ? animalScene : makeScene(shapeInfo,tableCounts);
    const tableAnswer = index === 0 ? animalCounts : tableCounts;
    const tableKeys = tableScene.order;
    const graphCounts = graphShapeSets[index];
    const graphScene = makeScene(shapeInfo,graphCounts);
    return [
      tableQuestion(tableScene,tableAnswer,alterCounts(tableAnswer,tableKeys[0],tableKeys[1])),
      graphQuestion(graphScene,graphCounts,alterCounts(graphCounts,"triangle","star")),
      tableQuestion(graphScene,graphCounts,alterCounts(graphCounts,"square","circle"),"Look at the new picture box. Which table shows the correct counts?"),
      equalGroupsQuestion(groupProblems[index][0].addend,groupProblems[index][0].groups,groupPictures[index],groupProblems[index][0].wrong),
      equalGroupsQuestion(groupProblems[index][1].addend,groupProblems[index][1].groups,groupPictures[index],groupProblems[index][1].wrong)
    ];
  });

  const weekCards = [
    [
      {label:"chest",sentence:"The horse has a chest.",wrong:"The horse has wings.",image:w1s("horse-chest-v1.png"),alt:"A horse with its chest highlighted"},
      {label:"mane",sentence:"The horse has a mane.",wrong:"The horse has antennae.",image:w1s("horse-mane-v1.png"),alt:"A horse with its mane highlighted"},
      {label:"hooves",sentence:"The horse has hooves.",wrong:"The horse has a beak.",image:w1s("horse-hooves-v1.png"),alt:"A horse with its hooves highlighted"},
      {label:"muzzle",sentence:"The horse has a muzzle.",wrong:"The horse has wings.",image:w1s("horse-muzzle-v1.png"),alt:"A horse with its muzzle highlighted"},
      {label:"eagle",sentence:"The eagle has a chest.",wrong:"The eagle has hooves.",image:w1s("eagle-chest-v1.png"),alt:"An eagle with its chest highlighted"}
    ],
    [
      {label:"antennae",sentence:"The bee has antennae.",wrong:"The bee has a mane.",image:w2s("bee-antennae-v2.png"),alt:"A bee with its antennae highlighted"},
      {label:"wings",sentence:"The bee has wings.",wrong:"The bee has hooves.",image:w2s("bee-wings-v2.png"),alt:"A bee with its wings highlighted"},
      {label:"eyes",sentence:"The bee has eyes.",wrong:"The bee has a muzzle.",image:w2s("bee-eyes-v2.png"),alt:"A bee with its eyes highlighted"},
      {label:"abdomen",sentence:"The bee has an abdomen.",wrong:"The bee has a mane.",image:w2s("bee-abdomen-v2.png"),alt:"A bee with its abdomen highlighted"},
      {label:"legs",sentence:"The bee has legs.",wrong:"The bee has feathers.",image:w2s("bee-legs-v2.png"),alt:"A bee with its legs highlighted"}
    ],
    [
      {label:"eagle",sentence:"An eagle hunts and flies.",wrong:"An eagle sleeps underground.",image:w3("eagle-landscape-v1.png"),alt:"An eagle flying in the sky"},
      {label:"lion",sentence:"A lion hunts on land.",wrong:"A lion flies in the dark.",image:w3("lion-landscape-v1.png"),alt:"A lion on land"},
      {label:"falcon",sentence:"A falcon hunts from the sky.",wrong:"A falcon sleeps in a den.",image:w3("falcon-landscape-v1.png"),alt:"A falcon hunting from the sky"},
      {label:"owl",sentence:"An owl flies in the dark.",wrong:"An owl flies in the day.",image:w3("owl-landscape-v1.png"),alt:"An owl flying at night"},
      {label:"butterfly",sentence:"A butterfly flies in the day.",wrong:"A butterfly hunts on land.",image:w3("butterfly-landscape-v1.png"),alt:"A butterfly flying in daylight"}
    ],
    [
      {label:"tiger",sentence:"A tiger sleeps.",wrong:"A tiger flies.",image:w4c("tiger-sleeping-v2.png"),alt:"A tiger sleeping"},
      {label:"koala",sentence:"A koala sleeps on the branches.",wrong:"A koala sleeps underground.",image:w4("koala-landscape-v1.png"),alt:"A koala sleeping on branches"},
      {label:"hamster",sentence:"A hamster sleeps underground.",wrong:"A hamster sleeps in the sky.",image:w4("hamster-landscape-v1.png"),alt:"A hamster sleeping underground"},
      {label:"panda",sentence:"A panda sleeps on the forest floor.",wrong:"A panda sleeps in a nest.",image:w4("panda-landscape-v1.png"),alt:"A panda sleeping on the forest floor"},
      {label:"bear",sentence:"A bear sleeps in dens.",wrong:"A bear sleeps on branches.",image:w4("bear-landscape-v1.png"),alt:"A bear sleeping in a den"}
    ]
  ];

  const metadata = [
    {title:"Animal Parts",headline:"Meet the Animals<br><em>and Their Parts!</em>",hero:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/gp-report/week-1/hero-animal-parts-v1.png",heroAlt:"Gerry and Penny learning about a horse's mane and hooves",friend:"Gerry",phonics:["car","star","fork","horse","ar","or"]},
    {title:"Insect Parts",headline:"Look Closely at<br><em>Busy Insects!</em>",hero:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/gp-report/week-2/hero-insect-parts-v1.png",heroAlt:"Penny and Coover examining a bee's antennae and wings",friend:"Penny",phonics:["horse","fork","car","star","or","ar"]},
    {title:"Animals That Hunt and Fly",headline:"Who Hunts on Land<br><em>and in the Sky?</em>",hero:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/gp-report/week-3/hero-hunt-and-fly-v1.png",heroAlt:"Coover and Wanda watching an eagle fly",friend:"Coover",phonics:["soccer","water","bird","girl","er","ir"]},
    {title:"Animals That Sleep",headline:"Where Do Animals<br><em>Rest and Sleep?</em>",hero:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/gp-report/week-4/hero-animals-sleep-v1.png",heroAlt:"Penny quietly watches a tiger cub and koala sleep",friend:"Penny",phonics:["girl","bird","water","soccer","ir","er"]}
  ];

  window.LevelCMonth8Weeks = metadata.map((week,index) => ({
    ...week,
    questions:[
      ...phonicsSet(...week.phonics),
      ...sentenceSet(weekCards[index]),
      ...mathSets[index]
    ]
  }));
})();
