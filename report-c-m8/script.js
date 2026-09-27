(() => {
  const REPORT_MONTH = Number(window.GP_REPORT_PERIOD?.month) || 8;
  const $ = (id) => document.getElementById(id);
  const make = (section, tag, icon, q, choices, practice, visual = "", hint = "Choose the best answer.", image = false) => ({ section, tag, icon, q, choices, answer: 0, practice, visual, hint, image });
  const P = "Phonics", S = "Key Sentences", R = "Reading", M = "Math";

  const legacyWeeks = [
    {
      title: "Do You Keep Bees?", headline: "Ready to Visit<br><em>the Busy Hive?</em>", hero: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/images/week-1-card-hero-v2.png", heroAlt: "Gerry and Penny carefully inspect a honeycomb frame at the sunny apiary", reward: "Gerry’s Beekeeper Gear", friend: "Gerry", items: [["🧢","Bee veil"],["🧤","Gloves"],["🥼","Bee suit"],["💨","Smoker"]],
      questions: [
        {section:P,tag:"PICTURE WORD",icon:"🐶",q:"What is this?",hint:"Look at the picture and choose its name.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/phonics/dog.png",imageAlt:"A dog",choices:["dog","log"],practice:"This is a dog.",answer:0},
        {section:P,tag:"PICTURE WORD",icon:"🪵",q:"What is this?",hint:"Look at the picture and choose its name.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/phonics/log.png",imageAlt:"A log",choices:["log","fog"],practice:"This is a log.",answer:0},
        {section:P,tag:"PICTURE WORD",icon:"🌫️",q:"What is this?",hint:"Look at the picture and choose its name.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/phonics/fog.png",imageAlt:"Fog",choices:["fog","dog"],practice:"This is fog.",answer:0},
        {section:P,tag:"TWO PICTURES",icon:"🔤",q:"What are these?",hint:"Look at both pictures and choose the two words.",imagePair:["https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/phonics/dog.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/phonics/log.png"],imagePairAlts:["A dog","A log"],choices:["dog and log","fog and log"],practice:"They are a dog and a log.",answer:0},
        {section:P,tag:"TWO PICTURES",icon:"🔤",q:"What are these?",hint:"Look at both pictures and choose the two words.",imagePair:["https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/phonics/log.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/phonics/fog.png"],imagePairAlts:["A log","Fog"],choices:["log and fog","dog and fog"],practice:"They are a log and fog.",answer:0},
        {section:S,tag:"KEY SENTENCE",icon:"🧑‍🌾",q:"Who is this?",hint:"Look at the person and choose the matching sentence.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/images/week-1-beekeeper.png",imageAlt:"A beekeeper holding a honeycomb frame",imageCompact:true,choices:["I am a beekeeper.","I am a farmer."],practice:"I am a beekeeper.",answer:0},
        {section:S,tag:"KEY SENTENCE",icon:"🍯",q:"What do bees do?",hint:"Look at the bee action and choose the matching sentence.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/literacy/make-honey.png",imageAlt:"Bees making honey",choices:["Bees make honey.","Bees find flowers."],practice:"Bees make honey.",answer:0},
        {section:S,tag:"KEY SENTENCE",icon:"👑",q:"What do bees do?",hint:"Look at the bee action and choose the matching sentence.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/literacy/protect-the-queen.png",imageAlt:"Bees protecting the queen bee",choices:["Bees protect the queen.","Bees collect nectar."],practice:"Bees protect the queen.",answer:0},
        {section:S,tag:"KEY SENTENCE",icon:"🌼",q:"What do bees do?",hint:"Look at the bee action and choose the matching sentence.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/literacy/find-flowers.png",imageAlt:"Bees finding flowers",choices:["Bees find flowers.","Bees make honey."],practice:"Bees find flowers.",answer:0},
        {section:S,tag:"KEY SENTENCE",icon:"🐝",q:"What do bees do?",hint:"Look at the bee action and choose the matching sentence.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/literacy/collect-nectar.png",imageAlt:"Bees collecting nectar",choices:["Bees collect nectar.","Bees build hives."],practice:"Bees collect nectar.",answer:0},
        {section:R,tag:"READ & CHOOSE",icon:"👑",q:"She has a crown and a dress. Who is she?",hint:"Read the clues and choose the matching person.",choiceImageFiles:["https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/reading/queen.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/reading/athlete.png"],choiceImageAlts:["A queen wearing a crown and dress","An athlete running"],choices:["I am the queen.","I am an athlete."],practice:"I am the queen.",answer:0},
        {section:R,tag:"BEE BODY",icon:"🪽",q:"What are these?",hint:"Look at the queen bee body part.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/reading/wings-clean.png",imageAlt:"Queen bee wings on a clean circular badge",imageCompact:true,imageCircle:true,choices:["wings","antennae"],practice:"This is a queen bee. She has wings.",answer:0},
        {section:R,tag:"BEE BODY",icon:"🐝",q:"What are these?",hint:"Look at the queen bee body part.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/reading/antennae-clean.png",imageAlt:"Queen bee antennae on a clean circular badge",imageCompact:true,imageCircle:true,choices:["antennae","stinger"],practice:"This is a queen bee. She has antennae.",answer:0},
        {section:R,tag:"BEE BODY",icon:"🐝",q:"What is this?",hint:"Look at the queen bee body part.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/reading/stinger-arrow.png",imageAlt:"Queen bee with an arrow pointing to her stinger",imageCompact:true,imageCircle:true,choices:["stinger","abdomen"],practice:"This is a queen bee. She has a stinger.",answer:0},
        {section:R,tag:"BEE BODY",icon:"🐝",q:"What is this?",hint:"Look at the queen bee body part.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/reading/abdomen-arrow.png",imageAlt:"Bee with an arrow pointing to its abdomen",imageCompact:true,imageCircle:true,choices:["abdomen","wings"],practice:"This is a queen bee. She has an abdomen.",answer:0},
        {section:M,tag:"AB PATTERN",icon:"🌼",q:"What is missing?",hint:"Find the picture that completes the repeating pattern.",pattern:["bee","flower","bee",null],choices:["flower","bee"],choiceImages:["flower","bee"],practice:"The bee and flower pattern repeats.",answer:0},
        {section:M,tag:"AB PATTERN",icon:"🍯",q:"What is missing?",hint:"Find the picture that completes the repeating pattern.",pattern:["beehive","honeyPot","beehive","honeyPot",null],choices:["beehive","honey pot"],choiceImages:["beehive","honeyPot"],practice:"The beehive and honey pot pattern repeats.",answer:0},
        {section:M,tag:"TAKE AWAY",icon:"🐝",q:"Take away one. How many are left?",hint:"Count the bees that are not crossed out.",subtraction:{count:3,take:1,item:"bee",equation:"3 − 1"},choices:["2","1"],practice:"Three take away one leaves two.",answer:0},
        {section:M,tag:"TAKE AWAY",icon:"🍯",q:"Take away two. How many are left?",hint:"Count the honey pots that are not crossed out.",subtraction:{count:4,take:2,item:"honeyPot",equation:"4 − 2"},choices:["2","3"],practice:"Four take away two leaves two.",answer:0},
        {section:M,tag:"TAKE AWAY",icon:"🍯",q:"Take away two. How many are left?",hint:"Count the honey pots that are not crossed out.",subtraction:{count:5,take:2,item:"honeyPot",equation:"5 − 2"},choices:["3","2"],practice:"Five take away two leaves three.",answer:0}
      ]
    },
    {
      title: "When Can I See Bees?", headline: "When Do Bees<br><em>Buzz Outside?</em>", hero: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/images/week-2-card-hero.png", heroAlt: "GP Friends discover bees visiting flowers on a sunny spring day", reward: "Penny’s Honey Helper Look", friend: "Penny", items: [["🌻","Flower hat"],["🪽","Bee wings"],["🧵","Honey apron"],["🍯","Honey jar"]],
      questions: [
        {section:P,tag:"PICTURE WORD",icon:"👮",q:"What is this?",hint:"Look at the picture and choose its name.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/phonics/cop.png",imageAlt:"A friendly cop",choices:["cop","mop"],practice:"There is a cop.",answer:0},
        {section:P,tag:"PICTURE WORD",icon:"🧹",q:"What is this?",hint:"Look at the picture and choose its name.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/phonics/mop.png",imageAlt:"A mop",choices:["mop","shop"],practice:"There is a mop.",answer:0},
        {section:P,tag:"PICTURE WORD",icon:"🏪",q:"What is this?",hint:"Look at the picture and choose its name.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/phonics/shop.png",imageAlt:"A shop",choices:["shop","cop"],practice:"There is a shop.",answer:0},
        {section:P,tag:"TWO PICTURES",icon:"🔤",q:"What are these?",hint:"Look at both pictures and choose the two words.",imagePair:["https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/phonics/cop.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/phonics/mop.png"],imagePairAlts:["A cop","A mop"],choices:["cop and mop","shop and mop"],practice:"They are a cop and a mop.",answer:0},
        {section:P,tag:"TWO PICTURES",icon:"🔤",q:"What are these?",hint:"Look at both pictures and choose the two words.",imagePair:["https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/phonics/mop.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/phonics/shop.png"],imagePairAlts:["A mop","A shop"],choices:["mop and shop","cop and shop"],practice:"They are a mop and a shop.",answer:0},
        {section:S,tag:"KEY SENTENCE",icon:"🐝",q:"When can I see bees?",hint:"Look at the seasons and choose the best answer.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/literacy/seasons-panorama.png",imageAlt:"Spring, summer, fall, and winter shown together",imageCompact:true,choices:["In spring, summer, and fall.","In winter."],practice:"You can see bees in spring, summer, and fall.",answer:0},
        {section:S,tag:"SEASON WORD",icon:"🌸",q:"What season is this?",hint:"Look at the picture and choose the season.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/literacy/spring-scene.png",imageAlt:"A colorful spring garden filled with blooming flowers",imageCompact:true,choices:["spring","winter"],practice:"This is spring.",answer:0},
        {section:S,tag:"SEASON WORD",icon:"☀️",q:"What season is this?",hint:"Look at the picture and choose the season.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/literacy/summer-scene.png",imageAlt:"A sunny green summer meadow",imageCompact:true,choices:["summer","fall"],practice:"This is summer.",answer:0},
        {section:S,tag:"SEASON WORD",icon:"🍂",q:"What season is this?",hint:"Look at the picture and choose the season.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/literacy/fall-scene.png",imageAlt:"An autumn woodland filled with orange and red leaves",imageCompact:true,choices:["fall","spring"],practice:"This is fall.",answer:0},
        {section:S,tag:"KEY SENTENCE",icon:"❄️",q:"When do bees stay inside?",hint:"Look at the season and choose the best answer.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/literacy/winter-object.png",imageAlt:"A snowman dressed for winter",imageCompact:true,choices:["In winter.","In summer."],practice:"Bees stay inside during winter.",answer:0},
        {section:R,tag:"LOOK & READ",icon:"🌸",q:"Look at the bee. How does the bee feel?",hint:"Choose the sentence that matches the picture.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/reading/bee-warm-happy.png",imageAlt:"A warm and happy bee with a flower",imageCompact:true,choices:["The bee is warm and happy.","The bee is cold and shivering."],practice:"The bee is warm and happy.",answer:0},
        {section:R,tag:"LOOK & READ",icon:"☀️",q:"Look at the bee. How does the bee feel?",hint:"Choose the sentence that matches the picture.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/reading/bee-hot-thirsty.png",imageAlt:"A hot and thirsty bee sweating and holding a fan",imageCompact:true,choices:["The bee is hot and thirsty.","The bee is cool and calm."],practice:"The bee is hot and thirsty.",answer:0},
        {section:R,tag:"LOOK & READ",icon:"🍂",q:"Look at the bee. How does the bee feel?",hint:"Choose the sentence that matches the picture.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/reading/bee-cool-calm.png",imageAlt:"A cool and calm bee relaxing",imageCompact:true,choices:["The bee is cool and calm.","The bee is cold and shivering."],practice:"The bee is cool and calm.",answer:0},
        {section:R,tag:"LOOK & READ",icon:"❄️",q:"Look at the bee. How does the bee feel?",hint:"Choose the sentence that matches the picture.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/reading/bee-cold-shivering.png",imageAlt:"A cold and shivering bee wearing a blue scarf",imageCompact:true,choices:["The bee is cold and shivering.","The bee is hot and thirsty."],practice:"The bee is cold and shivering.",answer:0},
        {section:R,tag:"READ & CHOOSE",icon:"🏠",q:"Where do bees go in winter?",hint:"Look at both pictures and choose the best answer.",visual:"❄️  🐝  ❄️",choiceImageFiles:["https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/reading/bees-in-hive.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/reading/bees-on-tree.png"],choiceImageAlts:["Bees safely inside a warm hive","Bees sitting on the branches of a snowy tree"],choices:["In the hive.","On trees."],practice:"Bees go into the hive in winter.",answer:0},
        {section:M,tag:"MATCHING PATTERN",icon:"🌸",q:"Which pattern is the same?",hint:"Look at the pattern, then choose the matching pattern.",matchPattern:["flower","flower","bee","bee"],choicePatterns:[["bee","flower","bee","bee"],["flower","flower","bee","bee"]],choices:["bee, flower, bee, bee","flower, flower, bee, bee"],practice:"The matching pattern is flower, flower, bee, bee.",answer:1},
        {section:M,tag:"MATCHING PATTERN",icon:"☀️",q:"Which pattern is the same?",hint:"Look at the pattern, then choose the matching pattern.",matchPattern:["sun","bee","sun","bee"],choicePatterns:[["sun","bee","sun","bee"],["bee","sun","bee","sun"]],choices:["sun, bee, sun, bee","bee, sun, bee, sun"],practice:"The matching pattern is sun, bee, sun, bee.",answer:0},
        {section:M,tag:"TAKE AWAY",icon:"🌸",q:"Take away three. How many are left?",hint:"Count the flowers that are not crossed out.",subtraction:{count:5,take:3,item:"flower",equation:"5 − 3"},choices:["2","3"],practice:"Five take away three leaves two.",answer:0},
        {section:M,tag:"TAKE AWAY",icon:"🌸",q:"Take away three. How many are left?",hint:"Count the flowers that are not crossed out.",subtraction:{count:7,take:3,item:"flower",equation:"7 − 3"},choices:["4","3"],practice:"Seven take away three leaves four.",answer:0},
        {section:M,tag:"TAKE AWAY",icon:"🍯",q:"Take away four. How many are left?",hint:"Count the honeycomb frames that are not crossed out.",subtraction:{count:6,take:4,item:"honeycombFrame",equation:"6 − 4"},choices:["2","4"],practice:"Six take away four leaves two.",answer:0}
      ]
    },
    {
      title: "Why Do We Need Bees?", headline: "Help the Flowers<br><em>Grow and Glow!</em>", hero: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/images/week-3-card-hero.png", heroAlt: "Coover watches a bee pollinate flowers in a fruit orchard", reward: "Coover’s Pollination Hero", friend: "Coover", items: [["📡","Antennae"],["🦸","Flower cape"],["🥾","Garden boots"],["🌺","Pollen wand"]],
      questions: [
        {section:P,tag:"PICTURE WORD",icon:"🛏️",q:"What is this?",hint:"Look at the picture and choose its name.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/phonics/cot.png",imageAlt:"A cot",choices:["cot","dot"],practice:"There is a cot.",answer:0},
        {section:P,tag:"PICTURE WORD",icon:"🔵",q:"What is this?",hint:"Look at the picture and choose its name.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/phonics/dot.png",imageAlt:"Colorful dots",choices:["dot","pot"],practice:"There are dots.",answer:0},
        {section:P,tag:"PICTURE WORD",icon:"🪴",q:"What is this?",hint:"Look at the picture and choose its name.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/phonics/pot.png",imageAlt:"A pot",choices:["pot","cot"],practice:"There is a pot.",answer:0},
        {section:P,tag:"TWO PICTURES",icon:"🔤",q:"What are these?",hint:"Look at both pictures and choose the two words.",imagePair:["https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/phonics/cot.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/phonics/dot.png"],imagePairAlts:["A cot","Colorful dots"],choices:["cot and dot","pot and dot"],practice:"There is a cot and there are dots.",answer:0},
        {section:P,tag:"TWO PICTURES",icon:"🔤",q:"What are these?",hint:"Look at both pictures and choose the two words.",imagePair:["https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/phonics/dot.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/phonics/pot.png"],imagePairAlts:["Colorful dots","A pot"],choices:["dot and pot","cot and pot"],practice:"There are dots and there is a pot.",answer:0},
        {section:S,tag:"KEY SENTENCE",icon:"🌸",q:"What do bees help grow?",hint:"Look at the picture and choose the matching sentence.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/literacy/flowers-grow.png",imageAlt:"A bee helping flowers grow",imageWide:true,imageCompact:true,choices:["Bees help flowers grow.","Bees help fruits grow."],practice:"Bees help flowers grow.",answer:0},
        {section:S,tag:"KEY SENTENCE",icon:"🍎",q:"What do bees help grow?",hint:"Look at the picture and choose the matching sentence.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/literacy/fruits-grow.png",imageAlt:"A bee helping fruits grow",imageWide:true,imageCompact:true,choices:["Bees help vegetables grow.","Bees help fruits grow."],practice:"Bees help fruits grow.",answer:1},
        {section:S,tag:"KEY SENTENCE",icon:"🥕",q:"What do bees help grow?",hint:"Look at the picture and choose the matching sentence.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/literacy/vegetables-grow.png",imageAlt:"A bee helping vegetables grow",imageWide:true,imageCompact:true,choices:["Bees help vegetables grow.","Bees help flowers grow."],practice:"Bees help vegetables grow.",answer:0},
        {section:S,tag:"KEY SENTENCE",icon:"💧",q:"What does Earth need?",hint:"Look at the picture and choose the matching sentence.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/literacy/earth-clean-water.png",imageAlt:"Earth with clean water",imageWide:true,imageCompact:true,choices:["Earth needs clean air.","Earth needs clean water."],practice:"Earth needs clean water.",answer:1},
        {section:S,tag:"KEY SENTENCE",icon:"🌬️",q:"What does Earth need?",hint:"Look at the picture and choose the matching sentence.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/literacy/earth-clean-air.png",imageAlt:"Earth with clean air",imageWide:true,imageCompact:true,choices:["Earth needs clean air.","Earth needs clean water."],practice:"Earth needs clean air.",answer:0},
        {section:R,tag:"READ & CHOOSE",icon:"🌸",q:"Bees help flowers. What do bees help?",hint:"Read the short sentence and choose the answer.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/literacy/flowers-grow.png",imageAlt:"A bee helping flowers grow",imageWide:true,imageCompact:true,choices:["flowers","cars"],practice:"Bees help flowers grow.",answer:0},
        {section:R,tag:"READ & CHOOSE",icon:"🍎",q:"Bees help fruit. What do bees help?",hint:"Read the short sentence and choose the answer.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/literacy/fruits-grow.png",imageAlt:"A bee helping fruit grow",imageWide:true,imageCompact:true,choices:["fruit","boats"],practice:"Bees help fruit grow.",answer:0},
        {section:R,tag:"READ & CHOOSE",icon:"💧",q:"Earth needs water. What does Earth need?",hint:"Read the sentence, then choose the matching picture.",choiceImageFiles:["https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/literacy/earth-clean-water.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/reading/plane.png"],choiceImageAlts:["Earth with clean water","A toy airplane"],choices:["water","a plane"],practice:"Earth needs clean water.",answer:0},
        {section:R,tag:"READ & CHOOSE",icon:"🌱",q:"Earth needs plants. What does Earth need?",hint:"Read the short sentence and choose the answer.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/literacy/earth-plants.png",imageAlt:"A happy Earth surrounded by healthy plants",imageWide:true,imageCompact:true,choices:["plants","cars"],practice:"Earth needs plants.",answer:0},
        {section:R,tag:"READ & CHOOSE",icon:"🌬️",q:"Earth needs clean air. What does Earth need?",hint:"Read the short sentence and choose the answer.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/literacy/earth-clean-air.png",imageAlt:"Earth with clean air",imageWide:true,imageCompact:true,choices:["clean air","dirty air"],practice:"Earth needs clean air.",answer:0},
        {section:M,tag:"FIX THE AABB PATTERN",icon:"🌸",q:"What should replace the wrong second picture?",hint:"This is a flower, flower, bee, bee pattern. Fix picture number 2.",fixPattern:["flower","bee","bee","bee","flower","flower","bee","bee"],highlightIndex:1,choiceImages:["flower","bee"],choices:["flower","bee"],practice:"The flower, flower, bee, bee pattern repeats.",answer:0},
        {section:M,tag:"FIX THE ABAA PATTERN",icon:"🌳",q:"What should replace the wrong fourth picture?",hint:"This is a trees, river, trees, trees pattern. Fix picture number 4.",fixPattern:["tree","river","tree","river","tree","river","tree","tree"],highlightIndex:3,choiceImages:["tree","river"],choices:["trees","river"],practice:"The trees, river, trees, trees pattern repeats.",answer:0},
        {section:M,tag:"TAKE AWAY",icon:"🏠",q:"Take away seven. How many are left?",hint:"Count the beehives that are not crossed out.",subtraction:{count:9,take:7,item:"beehive",equation:"9 − 7"},choices:["2","3"],practice:"Nine take away seven leaves two.",answer:0},
        {section:M,tag:"TAKE AWAY",icon:"🌳",q:"Take away four. How many are left?",hint:"Count the trees that are not crossed out.",subtraction:{count:9,take:4,item:"tree",equation:"9 − 4"},choices:["5","4"],practice:"Nine take away four leaves five.",answer:0},
        {section:M,tag:"TAKE AWAY",icon:"🐝",q:"Take away six. How many are left?",hint:"Count the bees that are not crossed out.",subtraction:{count:10,take:6,item:"bee",equation:"10 − 6"},choices:["4","6"],practice:"Ten take away six leaves four.",answer:0}
      ]
    },
    {
      title: "I Am Lorenzo Langstroth", headline: "Meet the Inventor<br><em>of a Better Hive!</em>", hero: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/images/week-4-card-hero-v2.png", heroAlt: "A friendly 3D Lorenzo Langstroth demonstrates a movable honeycomb frame beside Ria", reward: "Langstroth’s Hive Inventor Set", friend: "Lorenzo", items: [["🎩","Inventor hat"],["👓","Round glasses"],["🦺","Work vest"],["📐","Hive plan"]],
      questions: [
        {section:P,tag:"PICTURE WORD",icon:"🐶",q:"What is this?",hint:"Look at the picture and choose its name.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/phonics/dog.png",imageAlt:"A dog",choices:["dog","log"],practice:"I see a dog.",answer:0},
        {section:P,tag:"PICTURE WORD",icon:"🏪",q:"What is this?",hint:"Look at the picture and choose its name.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/phonics/shop.png",imageAlt:"A shop",choices:["shop","mop"],practice:"I see a shop.",answer:0},
        {section:P,tag:"PICTURE WORD",icon:"🪴",q:"What is this?",hint:"Look at the picture and choose its name.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/phonics/pot.png",imageAlt:"A pot",choices:["pot","dot"],practice:"I see a pot.",answer:0},
        {section:P,tag:"TWO PICTURES",icon:"🔤",q:"What are these?",hint:"Look at both pictures and choose the two words.",imagePair:["https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/phonics/fog.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/phonics/log.png"],imagePairAlts:["Fog","A log"],choices:["fog and log","dog and log"],practice:"I see fog and a log.",answer:0},
        {section:P,tag:"TWO PICTURES",icon:"🔤",q:"What are these?",hint:"Look at both pictures and choose the two words.",imagePair:["https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/phonics/cop.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/phonics/cot.png"],imagePairAlts:["A cop","A cot"],choices:["cop and cot","mop and pot"],practice:"I see a cop and a cot.",answer:0},
        {section:S,tag:"KEY SENTENCE",icon:"📗",q:"Look at Lorenzo. What did he do?",hint:"Look at the action picture and choose the matching Week 4 sentence.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-4/literacy/answer-wrote-a-book.png",imageAlt:"Lorenzo writing a book at his desk",imageWide:true,imageCompact:true,choices:["I wrote a book.","I kept bees."],practice:"I wrote a book.",answer:0},
        {section:S,tag:"KEY SENTENCE",icon:"💛",q:"Look at Lorenzo. What did he do?",hint:"Look at the action picture and choose the matching Week 4 sentence.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-4/literacy/answer-loved-bees.png",imageAlt:"Lorenzo showing that he loved bees",imageWide:true,imageCompact:true,choices:["I loved bees.","I helped beekeepers."],practice:"I loved bees.",answer:0},
        {section:S,tag:"KEY SENTENCE",icon:"🏠",q:"Look at Lorenzo. What did he do?",hint:"Look at the action picture and choose the matching Week 4 sentence.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-4/literacy/answer-made-modern-beehive.png",imageAlt:"Lorenzo making the modern beehive",imageWide:true,imageCompact:true,choices:["I made the modern beehive.","I wrote a book."],practice:"I made the modern beehive.",answer:0},
        {section:S,tag:"KEY SENTENCE",icon:"🧑‍🌾",q:"Look at Lorenzo. What did he do?",hint:"Look at the action picture and choose the matching Week 4 sentence.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-4/literacy/answer-helped-beekeepers.png",imageAlt:"Lorenzo helping other beekeepers",imageWide:true,imageCompact:true,choices:["I helped beekeepers.","I kept bees."],practice:"I helped beekeepers.",answer:0},
        {section:S,tag:"KEY SENTENCE",icon:"🐝",q:"Look at Lorenzo. What did he do?",hint:"Look at the action picture and choose the matching Week 4 sentence.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-4/literacy/answer-kept-bees.png",imageAlt:"Lorenzo keeping bees and lifting a honey frame",imageWide:true,imageCompact:true,choices:["I kept bees.","I loved bees."],practice:"I kept bees.",answer:0},
        {section:R,tag:"READ & CHOOSE",icon:"🧑‍🌾",q:"Who is Lorenzo Langstroth?",hint:"Look at Lorenzo and choose the answer.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-4/reading/answer-beekeeper.webp",imageAlt:"Lorenzo Langstroth dressed as a beekeeper",imageWide:true,imageCompact:true,choices:["A beekeeper.","A designer."],practice:"Lorenzo Langstroth is a beekeeper.",answer:0},
        {section:R,tag:"READ & CHOOSE",icon:"🤝",q:"Lorenzo helps beekeepers. Who does he help?",hint:"Read the short sentence and choose the answer.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-4/literacy/answer-helped-beekeepers.png",imageAlt:"Lorenzo helping beekeepers",imageWide:true,imageCompact:true,choices:["beekeepers","nurses"],practice:"Lorenzo helps beekeepers.",answer:0},
        {section:R,tag:"READ & CHOOSE",icon:"🏠",q:"Lorenzo makes a new hive. What does he make?",hint:"Read the sentence, then choose the matching picture.",choiceImageFiles:["https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-4/literacy/answer-made-modern-beehive.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-4/literacy/answer-wrote-a-book.png"],choiceImageAlts:["Lorenzo with the modern beehive","Lorenzo writing a book"],choices:["a hive","a book"],practice:"Lorenzo makes a new hive.",answer:0},
        {section:R,tag:"READ & CHOOSE",icon:"📗",q:"Lorenzo writes a book. What does he write?",hint:"Read the short sentence and choose the answer.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-4/literacy/answer-wrote-a-book.png",imageAlt:"Lorenzo writing a book at his desk",imageWide:true,imageCompact:true,choices:["a book","a hive"],practice:"Lorenzo writes a book.",answer:0},
        {section:R,tag:"READ & CHOOSE",icon:"🐝",q:"Lorenzo loves bees. What does he love?",hint:"Read the short sentence and choose the answer.",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-4/literacy/answer-loved-bees.png",imageAlt:"Lorenzo showing that he loves bees",imageWide:true,imageCompact:true,choices:["bees","flowers"],practice:"Lorenzo loves bees.",answer:0},
        {section:M,tag:"COMPLETE THE PATTERN",icon:"🍯",q:"What is missing?",hint:"Complete the flower and honey jar pattern.",pattern:["flower",null,"flower","honeyPot"],choices:["honey jar","flower"],choiceImages:["honeyPot","flower"],practice:"The flower and honey jar pattern repeats.",answer:0},
        {section:M,tag:"MATCHING PATTERN",icon:"🌸",q:"Which pattern is the same?",hint:"Look at the beehive and flower pattern, then choose the matching row.",matchPattern:["beehive","flower","beehive","flower","beehive","flower"],choicePatterns:[["beehive","flower","beehive","flower","beehive","flower"],["book","beehive","book","beehive","book","beehive"]],choices:["beehive, flower, beehive, flower, beehive, flower","bee book, beehive, bee book, beehive, bee book, beehive"],practice:"The beehive and flower pattern matches.",answer:0},
        {section:M,tag:"FIX THE AABB PATTERN",icon:"📗",q:"What should replace the wrong fourth picture?",hint:"This is a bee book, bee book, Lorenzo, Lorenzo pattern. Fix picture number 4.",fixPattern:["book","book","lorenzo","book","book","book","lorenzo","lorenzo"],highlightIndex:3,choiceImages:["lorenzo","book"],choices:["Lorenzo Langstroth","bee book"],practice:"The bee book, bee book, Lorenzo, Lorenzo pattern repeats.",answer:0},
        {section:M,tag:"TAKE AWAY",icon:"📗",q:"Take away two. How many are left?",hint:"Count the bee books that are not crossed out.",subtraction:{count:7,take:2,item:"book",equation:"7 − 2"},choices:["5","4"],practice:"Seven take away two leaves five.",answer:0},
        {section:M,tag:"TAKE AWAY",icon:"🐝",q:"Take away five. How many are left?",hint:"Count the bees that are not crossed out.",subtraction:{count:9,take:5,item:"bee",equation:"9 − 5"},choices:["4","5"],practice:"Nine take away five leaves four.",answer:0}
      ]
    }
  ];

  const weeks = window.LevelCMonth8Weeks || legacyWeeks;
  const colors = { Phonics: "#f279a8", "Key Sentences": "#f2b51d", Reading: "#58bde7", Math: "#66bd66" };
  const weekOneMathImages = {
    bee: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/math/bee.webp",
    flower: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/math/flower.webp",
    beehive: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/math/beehive.webp",
    honeyPot: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/math/honey-pot.webp"
  };
  const weekTwoMathImages = {
    flower: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/math/flower.png",
    bee: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/math/bee.png",
    sun: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/math/sun.png",
    honeycombFrame: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-2/math/honeycomb-frame.png"
  };
  const weekThreeMathImages = {
    flower: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/math/flower.png",
    bee: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/math/bee.png",
    tree: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/math/tree.png",
    river: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/math/river.png",
    beehive: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-3/math/beehive.png"
  };
  const weekFourMathImages = {
    flower: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/math/flower.webp",
    bee: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/math/bee.webp",
    beehive: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/math/beehive.webp",
    honeyPot: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-1/math/honey-pot.webp",
    book: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-4/math/bee-book.png",
    lorenzo: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/questions/week-4/math/lorenzo.png"
  };
  const dressupConfigs = [
    {
      friend: "Gerry", cardTitle: "Gerry’s Animal Parts Explorer", resultTitle: "My Animal Parts Explorer Look", modalTitle: "Animal Parts Explorer Gerry!", characterAlt: "Gerry ready for his animal parts explorer dress-up",
      stages: ["https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-1/gerry-animal-parts-base-v1.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-1/gerry-animal-parts-stage-1-boots-v1.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-1/gerry-animal-parts-stage-2-goggles-v1.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-1/gerry-animal-parts-stage-3-uniform-v1.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-1/gerry-animal-parts-stage-4-horse-trophy-v1.png"],
      items: [
        {key:"trackBoots",name:"animal-track boots",label:"Track Boots",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-1/item-animal-track-boots-v1.png",alt:"Animal-track boots"},
        {key:"scannerGoggles",name:"animal scanner goggles",label:"Scanner Goggles",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-1/item-animal-scanner-goggles-v1.png",alt:"Animal scanner goggles"},
        {key:"explorerUniform",name:"wildlife explorer uniform",label:"Explorer Uniform",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-1/item-wildlife-explorer-uniform-v1.png",alt:"Wildlife explorer uniform"},
        {key:"horseTrophy",name:"golden horse-care trophy",label:"Horse Trophy",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-1/item-golden-horse-care-trophy-v1.png",alt:"Golden horse-care trophy"}
      ],
      unlockLabels:["the Animal-Track Boots","the boots and Scanner Goggles","the boots, goggles, and Explorer Uniform","Gerry’s complete Animal Parts Explorer look"],
      clips:["https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-1/videos/gerry-stage-1-trail-boots-grok-v1.mp4","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-1/videos/gerry-stage-2-scanner-goggles-grok-v1.mp4","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-1/videos/gerry-stage-3-explorer-uniform-grok-v1.mp4","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-1/videos/gerry-stage-4-horse-trophy-grok-v1.mp4"]
    },
    {
      friend: "Penny", cardTitle: "Penny’s Insect Investigator", resultTitle: "My Insect Investigator Look", modalTitle: "Insect Investigator Penny!", characterAlt: "Penny ready for her insect investigator dress-up",
      stages: ["https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-2/penny-insect-investigator-base-v1.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-2/penny-insect-investigator-stage-1-shoes-v1.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-2/penny-insect-investigator-stage-2-headband-v1.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-2/penny-insect-investigator-stage-3-outfit-v1.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-2/penny-insect-investigator-stage-4-v1.png"],
      items: [
        {key:"ladybugShoes",name:"ladybug shoes",label:"Ladybug Shoes",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-2/item-ladybug-shoes-v1.png",alt:"Ladybug shoes"},
        {key:"antennaScanner",name:"antenna scanner",label:"Antenna Scanner",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-2/item-antenna-headband-v1.png",alt:"Antenna scanner headband"},
        {key:"investigatorOutfit",name:"insect investigator outfit",label:"Investigator Outfit",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-2/item-investigator-outfit-v1.png",alt:"Insect investigator outfit"},
        {key:"butterflyLantern",name:"butterfly lantern",label:"Butterfly Lantern",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-2/item-butterfly-lantern-v1.png",alt:"Butterfly lantern"}
      ],
      unlockLabels:["the Ladybug Shoes","the shoes and Antenna Scanner","the shoes, scanner, and Investigator Outfit","Penny’s complete Insect Investigator look"],
      clips:["https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-2/videos/penny-stage-1-ladybug-shoes-grok-v1.mp4","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-2/videos/penny-stage-2-antenna-scanner-grok-v1.mp4","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-2/videos/penny-stage-3-investigator-outfit-grok-v1.mp4","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-2/videos/penny-stage-4-butterfly-lantern-grok-v2.mp4"]
    },
    {
      friend: "Don", cardTitle: "Don’s Sky Wildlife Scout", resultTitle: "My Sky Wildlife Scout Look", modalTitle: "Sky Wildlife Scout Don!", characterAlt: "Don ready for his sky wildlife scout dress-up",
      stages: ["https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-3/don-sky-wildlife-scout-base-v1.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-3/don-sky-wildlife-scout-stage-1-boots-v1.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-3/don-sky-wildlife-scout-stage-2-visor-v1.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-3/don-sky-wildlife-scout-stage-3-uniform-v1.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-3/don-sky-wildlife-scout-stage-4-v1.png"],
      items: [
        {key:"featherBoots",name:"feather boots",label:"Feather Boots",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-3/item-feather-boots-v1.png",alt:"Feather boots"},
        {key:"falconVisor",name:"falcon visor",label:"Falcon Visor",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-3/item-falcon-visor-v1.png",alt:"Falcon visor"},
        {key:"scoutUniform",name:"sky wildlife scout uniform",label:"Scout Uniform",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-3/item-scout-uniform-v1.png",alt:"Sky wildlife scout uniform"},
        {key:"eagleTrophy",name:"golden eagle trophy",label:"Eagle Trophy",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-3/item-eagle-trophy-v1.png",alt:"Golden eagle trophy"}
      ],
      unlockLabels:["the Feather Boots","the boots and Falcon Visor","the boots, visor, and Scout Uniform","Don’s complete Sky Wildlife Scout look"],
      clips:["https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-3/videos/don-stage-1-feather-boots-grok-v1.mp4","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-3/videos/don-stage-2-falcon-visor-grok-v1.mp4","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-3/videos/don-stage-3-scout-uniform-grok-v1.mp4","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-3/videos/don-stage-4-eagle-trophy-grok-v2.mp4"]
    },
    {
      friend: "Ria", cardTitle: "Ria’s Night Habitat Guardian", resultTitle: "My Night Habitat Guardian Look", modalTitle: "Night Habitat Guardian Ria!", characterAlt: "Ria ready for her night habitat guardian dress-up",
      stages: ["https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-4/ria-sleep-guardian-base-v1.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-4/ria-sleep-guardian-stage-1-slippers-v1.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-4/ria-sleep-guardian-stage-2-headband-v1.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-4/ria-sleep-guardian-stage-3-outfit-v2.png","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-4/ria-sleep-guardian-stage-4-v1.png"],
      items: [
        {key:"moonSlippers",name:"moon slippers",label:"Moon Slippers",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-4/item-moon-slippers-v1.png",alt:"Moon slippers"},
        {key:"starryHeadband",name:"starry headband",label:"Starry Headband",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-4/item-starry-headband-v1.png",alt:"Starry crescent headband"},
        {key:"guardianOutfit",name:"night guardian coat",label:"Guardian Coat",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-4/item-guardian-outfit-v2.png",alt:"Night habitat guardian coat"},
        {key:"dreamLantern",name:"dream-nest lantern",label:"Dream Lantern",image:"https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-4/item-dream-nest-lantern-v1.png",alt:"Dream-nest lantern"}
      ],
      unlockLabels:["the Moon Slippers","the slippers and Starry Headband","the slippers, headband, and Guardian Coat","Ria’s complete Night Habitat Guardian look"],
      clips:["https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-4/videos/ria-stage-1-moon-slippers-grok-v1.mp4","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-4/videos/ria-stage-2-starry-headband-grok-v1.mp4","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-4/videos/ria-stage-3-guardian-outfit-grok-v2.mp4","https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/month8/dressup/week-4/videos/ria-stage-4-dream-nest-lantern-grok-v1.mp4"]
    }
  ];
  let activeWeek = 0, questions = weeks[0].questions, current = 0, answers = [], orders = [], student = "Little Learner", lastStats = {}, lastScore = 0, reportBlob = null, reportUrl = "", applied = 0, dressupCompletedLevel = 0, dressupClipTimer = null, dressupInitialized = false, answerFxAudio = null, answerFxTimer = null, correctAnimationTimer = null, audioContext = null;

  function showScreen(id) { document.querySelectorAll(".screen").forEach(s => s.classList.toggle("active", s.id === id)); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function speak(text, button) {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/<[^>]+>/g, ""));
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices.find(v => /^en-US$/i.test(v.lang) && /Samantha|Jenny|Aria|Google US English/i.test(v.name)) || voices.find(v => /^en-US$/i.test(v.lang)) || null;
    utterance.lang = "en-US"; utterance.rate = .82; utterance.pitch = 1.05;
    if (button) { button.classList.add("speaking"); utterance.onend = utterance.onerror = () => button.classList.remove("speaking"); }
    speechSynthesis.speak(utterance);
  }
  function stopAnswerFx() {
    if (answerFxTimer) { clearTimeout(answerFxTimer); answerFxTimer = null; }
    if (answerFxAudio) { answerFxAudio.pause(); answerFxAudio.currentTime = 0; answerFxAudio = null; }
  }
  function playAnswerFx(kind) {
    stopAnswerFx();
    const audio = new Audio(`https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/audio/fx/${kind}-answer.mp3`); answerFxAudio = audio; audio.volume = .9;
    return new Promise(resolve => {
      let finished = false;
      const finish = () => { if (finished) return; finished = true; if (answerFxTimer) { clearTimeout(answerFxTimer); answerFxTimer = null; } if (answerFxAudio === audio) answerFxAudio = null; resolve(); };
      audio.onended = finish; audio.onerror = finish;
      if (kind === "correct") {
        audio.onloadedmetadata = () => {
          const trimStart = .25, trimEnd = .75; audio.playbackRate = 2; audio.preservesPitch = true; audio.currentTime = Math.min(trimStart, Math.max(0, audio.duration - .1));
          answerFxTimer = setTimeout(() => { audio.pause(); finish(); }, Math.max(.1, audio.duration - trimStart - trimEnd) / audio.playbackRate * 1000); audio.play().catch(finish);
        };
        audio.load();
      } else audio.play().catch(finish);
    });
  }
  function playButtonClickFx() {
    try {
      audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === "suspended") audioContext.resume();
      const start = audioContext.currentTime, master = audioContext.createGain(); master.gain.setValueAtTime(1.35, start); master.connect(audioContext.destination);
      const pop = audioContext.createOscillator(), popGain = audioContext.createGain(); pop.type = "sine"; pop.frequency.setValueAtTime(220, start); pop.frequency.exponentialRampToValueAtTime(620, start + .095); pop.frequency.exponentialRampToValueAtTime(470, start + .15); popGain.gain.setValueAtTime(.0001, start); popGain.gain.exponentialRampToValueAtTime(.24, start + .01); popGain.gain.exponentialRampToValueAtTime(.0001, start + .17); pop.connect(popGain); popGain.connect(master); pop.start(start); pop.stop(start + .18);
      [{ frequency:740, delay:.045, volume:.075 }, { frequency:980, delay:.092, volume:.065 }, { frequency:1320, delay:.138, volume:.055 }].forEach(({ frequency, delay, volume }) => {
        const note = audioContext.createOscillator(), gain = audioContext.createGain(), noteStart = start + delay; note.type = "triangle"; note.frequency.setValueAtTime(frequency, noteStart); note.frequency.exponentialRampToValueAtTime(frequency * 1.08, noteStart + .07); gain.gain.setValueAtTime(.0001, noteStart); gain.gain.exponentialRampToValueAtTime(volume, noteStart + .008); gain.gain.exponentialRampToValueAtTime(.0001, noteStart + .095); note.connect(gain); gain.connect(master); note.start(noteStart); note.stop(noteStart + .105);
      });
    } catch (error) { /* The interface still works if the browser blocks Web Audio. */ }
  }
  function stopCorrectAnswerAnimation() {
    if (correctAnimationTimer) { clearTimeout(correctAnimationTimer); correctAnimationTimer = null; }
    document.querySelectorAll(".answer-celebration").forEach(element => element.classList.remove("answer-celebration","fx-picture-cheer"));
    document.querySelectorAll(".correct-spark-burst").forEach(element => element.remove());
  }
  function playCorrectAnswerAnimation(index) {
    stopCorrectAnswerAnimation();
    const selected = [...document.querySelectorAll(".choice")].find(button => Number(button.dataset.index) === index);
    const target = !$("question-image").hidden ? $("question-image") : selected;
    if (!target) return;
    target.classList.add("answer-celebration","fx-picture-cheer");
    const burst = document.createElement("div"); burst.className = "correct-spark-burst"; burst.setAttribute("aria-hidden","true");
    ["★","✦","●","★","✦","●","★","✦"].forEach((symbol,position) => { const sparkle = document.createElement("span"); sparkle.textContent = symbol; sparkle.style.setProperty("--spark",position); burst.appendChild(sparkle); });
    document.querySelector(".question-card")?.appendChild(burst);
    correctAnimationTimer = setTimeout(stopCorrectAnswerAnimation,2800);
  }
  function selectWeek(index) {
    activeWeek = index; questions = weeks[index].questions; const week = weeks[index];
    $("week-pill").textContent = `Week ${index + 1}`;
    $("welcome-title").innerHTML = week.headline; $("welcome-copy").textContent = `Join ${week.friend} for 20 nature-filled learning challenges!`;
    $("week-hero-image").src = week.hero; $("week-hero-image").alt = week.heroAlt; showScreen("welcome"); setTimeout(() => $("student-name").focus(), 250);
  }
  function start() {
    student = $("student-name").value.trim() || "Little Learner"; current = 0; answers = [];
    orders = questions.map(() => Math.random() < .5 ? [0, 1] : [1, 0]); showScreen("quiz"); renderQuestion();
  }
  function appendPicture(parent, src, alt, className = "") {
    const picture = document.createElement("img"); picture.src = src; picture.alt = alt || ""; if (className) picture.className = className; parent.appendChild(picture); return picture;
  }
  function currentMathImages() { return activeWeek === 1 ? weekTwoMathImages : activeWeek === 2 ? weekThreeMathImages : activeWeek === 3 ? weekFourMathImages : weekOneMathImages; }
  function makeCategoryToken(key, catalog, small = false) {
    const info = catalog[key], token = document.createElement("span");
    token.className = `category-token category-${info.className || key}${small ? " small" : ""}`;
    token.setAttribute("aria-label", info.label);
    if (info.image) appendPicture(token,info.image,info.label,"category-token-image"); else token.textContent = info.symbol;
    return token;
  }
  function renderCategoryScene(parent, scene) {
    const box = document.createElement("div"), items = document.createElement("div"), legend = document.createElement("div");
    box.className = "category-scene"; items.className = "category-scene-items"; legend.className = "category-scene-legend";
    scene.tokens.forEach(key => items.appendChild(makeCategoryToken(key,scene.catalog)));
    scene.order.forEach(key => { const chip = document.createElement("span"); chip.append(makeCategoryToken(key,scene.catalog,true),document.createTextNode(scene.catalog[key].label)); legend.appendChild(chip); });
    box.append(items,legend); parent.appendChild(box);
  }
  function renderMiniTable(parent, data) {
    const table = document.createElement("span"), head = document.createElement("span"); table.className = "visual-data-table"; head.className = "visual-data-row visual-data-head";
    ["Category","Number"].forEach(value => { const cell = document.createElement("b"); cell.textContent = value; head.appendChild(cell); }); table.appendChild(head);
    data.order.forEach(key => { const row = document.createElement("span"), name = document.createElement("span"), count = document.createElement("strong"); row.className = "visual-data-row"; name.className = "visual-data-name"; name.append(makeCategoryToken(key,data.catalog,true),document.createTextNode(data.catalog[key].label)); count.textContent = data.counts[key]; row.append(name,count); table.appendChild(row); });
    parent.appendChild(table);
  }
  function renderPictureGraph(parent, data) {
    const graph = document.createElement("span"); graph.className = "visual-picture-graph";
    data.order.forEach(key => { const row = document.createElement("span"), label = document.createElement("b"), marks = document.createElement("span"); row.className = "visual-graph-row"; label.textContent = data.catalog[key].label; marks.className = "visual-graph-marks"; for (let n = 0; n < data.counts[key]; n += 1) marks.appendChild(makeCategoryToken(key,data.catalog,true)); row.append(label,marks); graph.appendChild(row); });
    const key = document.createElement("small"); key.textContent = "Each picture = 1"; graph.appendChild(key); parent.appendChild(graph);
  }
  function renderEqualGroups(parent, data) {
    const picture = document.createElement("span"), groups = document.createElement("span"), expression = document.createElement("b"); picture.className = "equal-groups-choice"; groups.className = "equal-groups-row"; expression.textContent = data.expression;
    groups.classList.add(`groups-${data.groups}`);
    for (let groupIndex = 0; groupIndex < data.groups; groupIndex += 1) { const group = document.createElement("span"); group.className = "equal-group-circle"; for (let itemIndex = 0; itemIndex < data.perGroup; itemIndex += 1) { const item = document.createElement("i"); if (data.image) appendPicture(item,data.image,data.alt || "counting item"); else item.textContent = data.symbol; group.appendChild(item); } groups.appendChild(group); }
    picture.append(groups,expression); parent.appendChild(picture);
  }
  function renderQuestionVisual(item) {
    const visual = $("question-visual"), image = $("question-image");
    visual.innerHTML = ""; visual.className = "question-visual"; image.hidden = true; image.className = "question-image"; image.removeAttribute("src"); image.alt = "";
    if (typeof item.image === "string") {
      image.src = item.image; image.alt = item.imageAlt || "Question picture"; image.hidden = false;
      if (item.imageWide) image.classList.add("wide"); if (item.imageCompact) image.classList.add("compact"); if (item.imageCircle) image.classList.add("circle-cutout");
      return;
    }
    if (item.imagePair) {
      visual.classList.add("question-picture-pair");
      item.imagePair.forEach((src, index) => appendPicture(visual, src, item.imagePairAlts?.[index] || "Question picture"));
      return;
    }
    if (item.pattern) {
      visual.classList.add("pattern-strip", item.pattern.length > 4 ? "pattern-strip-five" : "pattern-strip-four");
      item.pattern.forEach(key => {
        const tile = document.createElement("span"); tile.className = `pattern-tile${key ? "" : " empty"}`;
        if (key) appendPicture(tile, currentMathImages()[key], key === "honeyPot" ? "Honey pot" : key); else tile.textContent = "?";
        visual.appendChild(tile);
      });
      return;
    }
    if (item.matchPattern) {
      visual.classList.add("matching-pattern-question");
      const label = document.createElement("small"), row = document.createElement("div"); label.textContent = "LOOK AT THE PATTERN"; row.className = "matching-pattern-row";
      item.matchPattern.forEach(key => { const tile = document.createElement("span"); tile.className = "matching-pattern-tile"; appendPicture(tile, currentMathImages()[key], key); row.appendChild(tile); });
      visual.append(label, row); return;
    }
    if (item.fixPattern) {
      visual.classList.add("fixing-pattern-question");
      const label = document.createElement("small"), row = document.createElement("div"); label.textContent = "FIND AND FIX THE WRONG PICTURE"; row.className = "fixing-pattern-row";
      item.fixPattern.forEach((key, index) => {
        const tile = document.createElement("span"), number = document.createElement("b"); tile.className = `fixing-pattern-tile${index === item.highlightIndex ? " is-highlighted" : ""}`; number.textContent = index + 1;
        appendPicture(tile, currentMathImages()[key], key === "tree" ? "Trees" : key); tile.appendChild(number); row.appendChild(tile);
      });
      visual.append(label, row); return;
    }
    if (item.subtraction) {
      const scene = document.createElement("div"), objects = document.createElement("div"), equation = document.createElement("div");
      scene.className = "subtraction-scene"; objects.className = `subtraction-objects count-${item.subtraction.count}`; equation.className = "subtraction-equation"; equation.textContent = item.subtraction.equation;
      for (let index = 0; index < item.subtraction.count; index += 1) {
        const tile = document.createElement("span"); tile.className = `subtraction-item${index >= item.subtraction.count - item.subtraction.take ? " taken" : ""}`;
        const alt = item.subtraction.item === "honeyPot" ? "Honey pot" : item.subtraction.item === "honeycombFrame" ? "Honeycomb frame" : item.subtraction.item;
        appendPicture(tile, currentMathImages()[item.subtraction.item], alt); objects.appendChild(tile);
      }
      scene.append(objects, equation); visual.appendChild(scene); return;
    }
    if (item.categoryScene) {
      visual.classList.add("category-question-visual"); renderCategoryScene(visual,item.categoryScene); return;
    }
    visual.textContent = item.visual || "";
    if (item.image === true) { image.src = weeks[activeWeek].hero; image.alt = weeks[activeWeek].heroAlt; image.hidden = false; }
  }
  function renderChoiceAnswer(answer, item, index) {
    answer.innerHTML = "";
    if (item.imageWide && item.choiceImageFiles) answer.classList.add("compact-picture-choice");
    if (item.choiceImages?.[index]) appendPicture(answer, currentMathImages()[item.choiceImages[index]], "", "choice-picture");
    if (item.choiceImageFiles?.[index]) appendPicture(answer, item.choiceImageFiles[index], item.choiceImageAlts?.[index] || "Answer picture", "choice-picture choice-scene-picture");
    if (item.choicePatterns?.[index]) {
      const row = document.createElement("span"); row.className = "choice-pattern";
      item.choicePatterns[index].forEach(key => appendPicture(row, currentMathImages()[key], key)); answer.appendChild(row);
    }
    if (item.choiceTables?.[index]) { answer.classList.add("visual-answer-choice"); renderMiniTable(answer,item.choiceTables[index]); }
    if (item.choiceGraphs?.[index]) { answer.classList.add("visual-answer-choice","graph-answer-choice"); renderPictureGraph(answer,item.choiceGraphs[index]); }
    if (item.choiceGroups?.[index]) { answer.classList.add("visual-answer-choice","groups-answer-choice"); renderEqualGroups(answer,item.choiceGroups[index]); }
    const label = document.createElement("span"), helper = document.createElement("small"); label.textContent = item.choices[index]; helper.textContent = "Tap to choose"; answer.append(label, helper);
  }
  function renderQuestion() {
    stopAnswerFx(); stopCorrectAnswerAnimation();
    const item = questions[current], correctSoFar = answers.reduce((n, a, i) => n + (a === questions[i].answer), 0);
    $("section-label").textContent = item.section; $("section-label").style.color = colors[item.section]; $("progress-label").textContent = `${current + 1} of 20`; $("progress-bar").style.width = `${(current + 1) * 5}%`; $("honey-count").textContent = correctSoFar;
    $("mascot").textContent = item.icon; $("question-tag").textContent = item.tag; $("question-text").textContent = item.q; $("question-hint").textContent = item.hint; renderQuestionVisual(item);
    $("feedback").textContent = ""; $("feedback").className = "feedback"; $("practice-popup").hidden = true; $("next-btn").classList.remove("show");
    const choices = $("choices"); choices.innerHTML = "";
    orders[current].forEach(index => {
      const wrap = document.createElement("div"), answer = document.createElement("button"), listen = document.createElement("button");
      wrap.className = "choice-wrap"; answer.className = "choice"; answer.type = "button"; answer.dataset.index = index; renderChoiceAnswer(answer, item, index); answer.addEventListener("click", () => choose(index));
      listen.className = "choice-listen"; listen.type = "button"; listen.textContent = "🔊"; listen.setAttribute("aria-label", `Hear ${item.choices[index]}`); listen.addEventListener("click", () => speak(item.choices[index], listen)); wrap.append(answer, listen); choices.appendChild(wrap);
    });
    requestAnimationFrame(() => {
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      document.querySelector(".question-card")?.scrollIntoView({ behavior, block: "center" });
    });
    setTimeout(() => speak(item.q), 300);
  }
  function choose(index) {
    if (answers[current] !== undefined) return; const item = questions[current], ok = index === item.answer; answers[current] = index;
    window.speechSynthesis?.cancel(); const answeredQuestion = current; playAnswerFx(ok ? "correct" : "wrong").then(() => { if (current === answeredQuestion && answers[current] !== undefined) speak(item.practice); }); document.querySelectorAll(".choice").forEach(button => { const value = Number(button.dataset.index); button.disabled = true; if (value === index) button.classList.add("selected", ok ? "correct" : "wrong"); if (!ok && value === item.answer) button.classList.add("reveal"); });
    if (ok) playCorrectAnswerAnimation(index); else { $("question-text").classList.add("shake"); setTimeout(() => $("question-text").classList.remove("shake"),350); }
    $("feedback").textContent = ok ? "Trailblazing work! You earned a paw print! 🐾" : "Good try! The green answer is the one to practice. 🌱"; $("feedback").classList.add(ok ? "good" : "try");
    $("practice-text").textContent = item.practice; $("practice-popup").hidden = false; $("next-btn").textContent = current === 19 ? "See my results 🎉" : "Next question →"; $("next-btn").classList.add("show");
  }
  function next() { if (answers[current] === undefined) return; if (current < 19) { current += 1; renderQuestion(); } else showResults(); }
  function showResults() {
    lastScore = questions.reduce((n, q, i) => n + (answers[i] === q.answer), 0); const percent = lastScore * 5; lastStats = {};
    Object.keys(colors).forEach(section => { const indexes = questions.map((q, i) => q.section === section ? i : -1).filter(i => i >= 0); lastStats[section] = indexes.filter(i => answers[i] === questions[i].answer).length; });
    $("score-number").textContent = lastScore; $("percent-badge").textContent = `${percent}%`; $("student-report-name").textContent = `${student}’s Month ${REPORT_MONTH} Week ${activeWeek + 1} Report`; $("results-message").textContent = `You completed all 20 challenges in “${weeks[activeWeek].title}.”`;
    $("score-title").textContent = percent >= 90 ? "Nature-trail brilliant!" : percent >= 70 ? "Wonderful exploring!" : "Growing strong!"; $("score-note").textContent = percent >= 80 ? "Your learning adventure is shining!" : "Every try helps your knowledge grow."; document.querySelector(".score-ring").style.background = `conic-gradient(var(--honey,#e49a19) ${percent * 3.6}deg,#eee2cb 0deg)`;
    $("skill-chart").innerHTML = Object.entries(lastStats).map(([name, score]) => `<div class="skill-row"><span>${name}</span><div class="bar-track"><div class="bar-fill" style="background:${colors[name]};width:${score * 20}%"></div></div><b>${score}/5</b></div>`).join("");
    const sorted = Object.entries(lastStats).sort((a, b) => a[1] - b[1]), weakest = sorted[0], strongest = sorted[sorted.length - 1];
    $("analysis-text").textContent = weakest[1] === 5 ? `Every section was perfect, ${student}! Keep reading aloud and explaining your ideas to make them stick.` : `${strongest[0]} was your strongest skill. Practice ${weakest[0].toLowerCase()} next—five playful minutes can help that skill bloom.`;
    $("answer-review").innerHTML = questions.map((q, i) => `<div class="review-item"><span>${answers[i] === q.answer ? "✅" : "🌱"}</span><span><b>${i + 1}. ${q.section}</b><br>${q.q}</span><span>${q.choices[answers[i]]}<br><small>Answer: ${q.choices[q.answer]}</small></span></div>`).join("");
    dressupInitialized = false; $("dressup-card").disabled = false; $("dressup-card").classList.remove("coming-soon");
    $("reward-preview").src = "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/images/kids-3d-present-box.webp"; $("reward-preview").classList.remove("character-reward");
    document.querySelector(".dressup-badge").textContent = "NEW REWARD"; $("reward-card-title").textContent = currentDressupConfig().cardTitle;
    document.querySelector(".dressup-prompt").textContent = "Tap to open the reward basket →";
    showScreen("results");
  }
  function unlockedCount() { return lastScore <= 5 ? 1 : lastScore <= 10 ? 2 : lastScore <= 15 ? 3 : 4; }
  function currentDressupConfig() { return dressupConfigs[activeWeek]; }
  function resetRewardPreview() {
    const image = $("reward-preview"), config = currentDressupConfig();
    image.src = "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-c/assets/images/kids-3d-present-box.webp";
    image.alt = `A colorful 3D present box containing ${config.cardTitle}`;
    image.classList.remove("character-reward");
    document.querySelector(".dressup-badge").textContent = "NEW REWARD";
    $("reward-card-title").textContent = config.cardTitle;
    document.querySelector(".dressup-prompt").textContent = "Tap to open the reward basket →";
  }
  function resetDressup() {
    const config = currentDressupConfig(), unlocked = unlockedCount(), video = $("dressup-celebration-video");
    if (dressupClipTimer) { clearTimeout(dressupClipTimer); dressupClipTimer = null; }
    video.pause(); video.removeAttribute("src"); video.load(); video.hidden = true;
    applied = 0; dressupCompletedLevel = 0; dressupInitialized = true; resetRewardPreview(); $("replay-clip").hidden = true; $("replay-clip").disabled = false;
    $("dressup-title").textContent = config.modalTitle; $("dressup-character").src = config.stages[0]; $("dressup-character").alt = config.characterAlt;
    $("dressup-unlock-message").textContent = `Score: ${lastScore}/20 — You unlocked ${config.unlockLabels[unlocked - 1]}!`; $("dressup-status").textContent = `Start with the ${config.items[0].name}!`;
    $("dressup-items").innerHTML = "";
    config.items.forEach((item, index) => {
      const isUnlocked = index < unlocked, button = document.createElement("button"); button.type = "button"; button.className = `dressup-item${isUnlocked ? "" : " locked"}`; button.disabled = !isUnlocked; button.draggable = isUnlocked; button.dataset.item = item.key; button.dataset.order = index; button.setAttribute("aria-disabled", String(!isUnlocked));
      button.innerHTML = `<span class="lock-mark" aria-hidden="true">🔒</span><img src="${item.image}" alt="${item.alt}"><b>${item.label}</b>`;
      button.addEventListener("click", () => applyDressup(item.key));
      button.addEventListener("dragstart", event => { if (!isUnlocked) { event.preventDefault(); return; } event.dataTransfer.setData("text/plain", item.key); event.dataTransfer.effectAllowed = "move"; });
      $("dressup-items").appendChild(button);
    });
  }
  function openDressup() { if (!dressupInitialized) resetDressup(); $("dressup-modal").hidden = false; $("dressup-close").focus(); }
  function closeDressup() {
    if (dressupClipTimer) { clearTimeout(dressupClipTimer); dressupClipTimer = null; }
    const video = $("dressup-celebration-video"); video.pause(); video.hidden = true; if (dressupCompletedLevel) $("replay-clip").hidden = false; $("dressup-modal").hidden = true;
  }
  function completeDressup(level) {
    const config = currentDressupConfig(), video = $("dressup-celebration-video"), rewardImage = $("reward-preview"); dressupCompletedLevel = level; $("replay-clip").hidden = true;
    rewardImage.src = config.stages[level]; rewardImage.alt = `${student}’s completed ${config.resultTitle}`; rewardImage.classList.add("character-reward"); document.querySelector(".dressup-badge").textContent = "COMPLETE!"; $("reward-card-title").textContent = config.resultTitle; document.querySelector(".dressup-prompt").textContent = "Tap to see it again →";
    $("dressup-status").textContent = level === 4 ? "Amazing! You earned every reward item! 🏆" : "Great look! Keep learning to unlock more next time! 🌟";
    const clip = config.clips[level - 1]; if (!clip) { playButtonClickFx(); return; }
    video.src = clip; video.hidden = true; const showFinal = () => { video.hidden = true; $("replay-clip").hidden = false; $("replay-clip").disabled = false; }; video.onended = showFinal; video.onerror = showFinal;
    dressupClipTimer = setTimeout(() => { dressupClipTimer = null; video.hidden = false; video.play().catch(showFinal); }, 1000);
  }
  function replayDressupClip() {
    const clip = currentDressupConfig().clips[dressupCompletedLevel - 1]; if (!dressupCompletedLevel || !clip) return; const video = $("dressup-celebration-video"); video.currentTime = 0; video.hidden = false; $("replay-clip").disabled = true; video.play().catch(() => { video.hidden = true; $("replay-clip").disabled = false; });
  }
  function applyDressup(itemKey) {
    const config = currentDressupConfig(), itemButton = document.querySelector(`.dressup-item[data-item="${itemKey}"]`); if (!itemButton || itemButton.classList.contains("locked") || itemButton.classList.contains("applied")) return;
    const order = Number(itemButton.dataset.order); if (order !== applied) { $("dressup-status").textContent = `Try the ${config.items[applied].name} first!`; return; }
    applied += 1; itemButton.classList.add("applied"); itemButton.draggable = false; $("dressup-character").src = config.stages[applied]; $("dressup-character").alt = `${config.friend} wearing ${config.items.slice(0, applied).map(item => item.name).join(", ")}`;
    if (applied === unlockedCount()) completeDressup(applied); else { playButtonClickFx(); $("dressup-status").textContent = `Great! Now add the ${config.items[applied].name}.`; }
  }
  async function captureReport() {
    const button = $("capture-btn"), original = button.innerHTML; button.disabled = true; button.innerHTML = "📸 Capturing…";
    let stage = null;
    try {
      if (typeof html2canvas !== "function") throw new Error("The report capture library did not load.");
      const source = $("results"), report = source.cloneNode(true);
      stage = document.createElement("div"); stage.className = "capture-export-stage";
      report.removeAttribute("id"); report.classList.add("active", "capture-export"); report.style.display = "block";
      stage.appendChild(report); document.body.appendChild(stage);
      if (document.fonts?.ready) await document.fonts.ready;
      await Promise.all([...report.querySelectorAll("img")].map(image => {
        image.loading = "eager"; image.decoding = "sync";
        if (image.complete && image.naturalWidth) return Promise.resolve();
        return new Promise(resolve => { const timeout = setTimeout(resolve, 10000); image.onload = image.onerror = () => { clearTimeout(timeout); resolve(); }; });
      }));
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const width = Math.ceil(report.scrollWidth), height = Math.ceil(report.scrollHeight);
      const maxPixels = 16000000;
      const preferredScale = Math.min(1.5, window.devicePixelRatio || 1.5);
      const safeScale = Math.min(preferredScale, Math.sqrt(maxPixels / Math.max(1, width * height)));
      const canvas = await html2canvas(report, {
        scale: Math.max(1, safeScale), width, height,
        windowWidth: Math.max(1200, width), windowHeight: Math.max(900, height),
        useCORS: true, allowTaint: false, imageTimeout: 15000,
        backgroundColor: "#fff9ef", logging: false,
        onclone: clonedDocument => {
          const clonedReport = clonedDocument.querySelector(".capture-export-stage .capture-export");
          if (clonedReport) { clonedReport.classList.add("active", "capture-export"); clonedReport.style.display = "block"; }
        }
      });
      reportBlob = await new Promise(resolve => canvas.toBlob(resolve, "image/png", .95));
      if (!reportBlob) throw new Error("The browser could not create the report image.");
      if (reportUrl) URL.revokeObjectURL(reportUrl);
      reportUrl = URL.createObjectURL(reportBlob); $("capture-image").src = reportUrl; $("share-note").textContent = "Download it to this device or share it using an available app."; $("capture-modal").hidden = false; $("capture-close").focus();
    } catch (error) { console.error("Report capture failed:", error); alert("The report picture could not be created. Please try again."); }
    finally { stage?.remove(); button.disabled = false; button.innerHTML = original; }
  }
  function fileName() { return `${student.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "student"}-level-c-month-${REPORT_MONTH}-week-${activeWeek + 1}-report.png`; }
  function downloadReport() { if (!reportBlob) return; const link = document.createElement("a"); link.href = reportUrl; link.download = fileName(); link.style.display = "none"; document.body.appendChild(link); link.click(); link.remove(); $("share-note").textContent = "Your report picture has been downloaded!"; }
  async function shareReport() {
    if (!reportBlob) return; const file = new File([reportBlob], fileName(), { type: "image/png" });
    if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) { try { await navigator.share({ title: `${student}’s GP Weekly Report`, text: "My Level C Month 8 weekly report", files: [file] }); $("share-note").textContent = "Your report was shared!"; return; } catch (error) { if (error.name === "AbortError") return; } }
    downloadReport(); $("share-note").textContent = "Direct sharing is not available here, so the report was downloaded. You can attach it to any app.";
  }
  function goHome() { window.speechSynthesis?.cancel(); stopAnswerFx(); current = 0; answers = []; $("week-pill").innerHTML = `<span>🌿</span> Level C · Month ${REPORT_MONTH}`; showScreen("week-select"); }

  function clearStudentName() { $("student-name").value = ""; }
  clearStudentName();
  window.addEventListener("pageshow", clearStudentName);

  weeks.forEach((_, i) => $(`week-${i + 1}-btn`).addEventListener("click", () => selectWeek(i)));
  $("all-weeks-btn").addEventListener("click", goHome); $("home-logo").addEventListener("click", e => { e.preventDefault(); if ($("quiz").classList.contains("active") && !confirm("Go back to the weekly selection? Your answers will be cleared.")) return; goHome(); });
  $("start-btn").addEventListener("click", start); $("student-name").addEventListener("keydown", e => { if (e.key === "Enter") start(); }); $("question-listen-btn").addEventListener("click", () => speak(questions[current].q, $("question-listen-btn"))); $("practice-replay").addEventListener("click", () => speak(questions[current].practice, $("practice-replay"))); $("next-btn").addEventListener("click", next); $("quit-btn").addEventListener("click", () => { if (confirm("Return to all weeks? Your answers will be cleared.")) goHome(); }); $("restart-btn").addEventListener("click", () => { current = 0; answers = []; showScreen("welcome"); });
  $("dressup-card").addEventListener("click", openDressup); $("dressup-reset").addEventListener("click", resetDressup); $("dressup-close").addEventListener("click", closeDressup); $("replay-clip")?.addEventListener("click", replayDressupClip); $("dressup-modal").addEventListener("click", e => { if (e.target === $("dressup-modal")) closeDressup(); });
  $("character-dropzone").addEventListener("dragover", event => { event.preventDefault(); event.currentTarget.classList.add("drag-over"); event.dataTransfer.dropEffect = "move"; });
  $("character-dropzone").addEventListener("dragleave", event => event.currentTarget.classList.remove("drag-over"));
  $("character-dropzone").addEventListener("drop", event => { event.preventDefault(); event.currentTarget.classList.remove("drag-over"); applyDressup(event.dataTransfer.getData("text/plain")); });
  $("capture-btn").addEventListener("click", captureReport); $("capture-close").addEventListener("click", () => $("capture-modal").hidden = true); $("capture-modal").addEventListener("click", e => { if (e.target === $("capture-modal")) $("capture-modal").hidden = true; }); $("download-capture").addEventListener("click", downloadReport); $("share-capture").addEventListener("click", shareReport);
  document.addEventListener("click", event => { const button = event.target.closest("button"); if (button && !button.matches(".choice,.choice-listen,.question-listen,#practice-replay")) playButtonClickFx(); }, true);
  document.addEventListener("keydown", e => { if (e.key === "Escape") { $("capture-modal").hidden = true; closeDressup(); } });
  const reviewMode = new URLSearchParams(window.location.search).get("review");
  if (reviewMode === "week-3-dressup") {
    activeWeek = 2; questions = weeks[activeWeek].questions; student = "Little Learner";
    answers = questions.map(question => question.answer); showResults(); resetDressup(); openDressup();
  }
})();
