(() => {
  const P = "Phonics", S = "Key Sentences", R = "Reading", M = "Math";
  const root = "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-b/external/level-b/assets/";
  const ph = word => `${root}phonics/week-1/${word}-3d-v1.png`;
  const fc = (week, word) => `${root}flashcards/week-${week}/${word}-flashcard-v1.png`;

  const pictureWord = (word, other, answer = 0) => ({
    section: P, tag: "PICTURE WORD", icon: "🔤", q: "What is this?",
    hint: "Look at the picture and choose its name.", image: ph(word), imageAlt: `A picture of ${word}`,
    choices: answer === 0 ? [word, other] : [other, word], answer, practice: `This is ${word}.`
  });
  const picturePair = (first, second, wrongFirst, wrongSecond, answer = 0) => ({
    section: P, tag: "TWO PICTURES", icon: "🔤", q: "What are these?",
    hint: "Look at both pictures and choose the two words.", imagePair: [ph(first), ph(second)],
    imagePairAlts: [`A picture of ${first}`, `A picture of ${second}`],
    choices: answer === 0 ? [`${first} and ${second}`, `${wrongFirst} and ${wrongSecond}`] : [`${wrongFirst} and ${wrongSecond}`, `${first} and ${second}`],
    answer, practice: `They are ${first} and ${second}.`
  });
  const keySentence = (image, imageAlt, choices, answer, practice, q = "Which sentence matches the picture?") => ({
    section: S, tag: "KEY SENTENCE", icon: "💬", q,
    hint: "Look at the picture and choose the matching sentence.", image, imageAlt, imageWide: true, imageCompact: true,
    choices, answer, practice
  });
  const reading = (q, firstImage, secondImage, firstAlt, secondAlt, choices, answer, practice) => ({
    section: R, tag: "READ & CHOOSE", icon: "📖", q,
    hint: "Read the sentence and choose the matching picture.",
    choiceImageFiles: [firstImage, secondImage], choiceImageAlts: [firstAlt, secondAlt], choices, answer, practice
  });
  const mathPicture = (q, image, imageAlt, choices, answer, practice, tag = "ATTRIBUTE SORTING") => ({
    section: M, tag, icon: "🔎", q, hint: "Look carefully and choose the best answer.",
    image, imageAlt, imageWide: true, imageCompact: true, choices, answer, practice
  });
  const subtraction = (q, visual, choices, answer, practice) => ({
    section: M, tag: "NUMBER LINE", icon: "➖", q, hint: "Count back to find the answer.", visual, choices, answer, practice
  });

  window.LevelBMonth8Weeks = [
    {
      title: "Where Are the Bees?", headline: "Where Are<br><em>the Busy Bees?</em>",
      hero: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-b/assets/month8/heroes/week-1-bees-garden-v2.png", heroAlt: "Gerry and Penny finding bees near flowers, a garden lamp, trees, a bench, and grass", friend: "Gerry",
      questions: [
        pictureWord("bug", "mug", 0),
        pictureWord("mug", "rug", 1),
        pictureWord("rug", "bug", 0),
        picturePair("bug", "mug", "rug", "mug", 1),
        picturePair("mug", "rug", "bug", "rug", 0),

        keySentence(fc(1,"flowers"), "Bees near flowers", ["There are bees near the flowers.","There are bees near the lamp."], 0, "There are bees near the flowers."),
        keySentence(fc(1,"lamp"), "Bees near a lamp", ["There are bees near the bench.","There are bees near the lamp."], 1, "There are bees near the lamp."),
        keySentence(fc(1,"trees"), "Bees near trees", ["There are bees near the trees.","There are bees near the grass."], 0, "There are bees near the trees."),
        keySentence(fc(1,"bench"), "Bees near a bench", ["There are bees near the flowers.","There are bees near the bench."], 1, "There are bees near the bench."),
        keySentence(fc(1,"grass"), "Bees near grass", ["There are bees near the grass.","There are bees near the trees."], 0, "There are bees near the grass."),

        reading("There are bees near the flowers. Choose the picture.",fc(1,"flowers"),fc(1,"lamp"),"Bees near flowers","Bees near a lamp",["flowers","lamp"],0,"There are bees near the flowers."),
        reading("There are bees near the lamp. Choose the picture.",fc(1,"bench"),fc(1,"lamp"),"Bees near a bench","Bees near a lamp",["bench","lamp"],1,"There are bees near the lamp."),
        reading("There are bees near the trees. Choose the picture.",fc(1,"trees"),fc(1,"grass"),"Bees near trees","Bees near grass",["trees","grass"],0,"There are bees near the trees."),
        reading("There are bees near the bench. Choose the picture.",fc(1,"flowers"),fc(1,"bench"),"Bees near flowers","Bees near a bench",["flowers","bench"],1,"There are bees near the bench."),
        reading("There are bees near the grass. Choose the picture.",fc(1,"grass"),fc(1,"trees"),"Bees near grass","Bees near trees",["grass","trees"],0,"There are bees near the grass."),

        mathPicture("Which flower is big and yellow?",fc(1,"flowers"),"Flowers of different sizes and colors",["The big yellow flower.","The small blue flower."],0,"The big yellow flower is sorted by size and color."),
        mathPicture("Which lamp is small and red?",fc(1,"lamp"),"Lamps of different sizes and colors",["The big green lamp.","The small red lamp."],1,"The small red lamp is sorted by size and color."),
        mathPicture("Which tree is big and green?",fc(1,"trees"),"Trees of different sizes and colors",["The big green tree.","The small orange tree."],0,"The big green tree is sorted by size and color."),
        subtraction("Start at 2. Jump back 1. Where do you land?","2 − 1 = ?",["1","2"],0,"Two take away one is one."),
        subtraction("Start at 5. Jump back 2. Where do you land?","5 − 2 = ?",["4","3"],1,"Five take away two is three.")
      ]
    },
    {
      title: "Honey Is Good", headline: "Why Is Honey<br><em>So Helpful?</em>",
      hero: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-b/assets/month8/heroes/week-2-honey-good-v2.png", heroAlt: "Coover and Wanda discovering golden honey from a honeycomb in a sunny flower garden", friend: "Penny",
      questions: [
        pictureWord("drum", "gum", 0),
        pictureWord("gum", "plum", 1),
        pictureWord("plum", "drum", 0),
        picturePair("drum", "gum", "plum", "gum", 0),
        picturePair("gum", "plum", "drum", "plum", 1),

        keySentence(fc(2,"healthy"),"Healthy honey",["Honey is healthy.","Honey is sweet."],0,"Honey is healthy."),
        keySentence(fc(2,"natural"),"Natural honey",["Honey is healing.","Honey is natural."],1,"Honey is natural."),
        keySentence(fc(2,"sweet"),"Sweet honey",["Honey is sweet.","Honey is healthy."],0,"Honey is sweet."),
        keySentence(fc(2,"healing"),"Healing honey",["Honey is natural.","Honey is healing."],1,"Honey is healing."),
        keySentence(fc(2,"healthy"),"Honey that is good for us",["Honey is good for us.","Honey is bad for us."],0,"Honey is good for us.","What do we know about honey?"),

        reading("Honey is healthy. Choose the picture.",fc(2,"healthy"),fc(2,"sweet"),"Healthy honey","Sweet honey",["healthy","sweet"],0,"Honey is healthy."),
        reading("Honey is natural. Choose the picture.",fc(2,"healing"),fc(2,"natural"),"Healing honey","Natural honey",["healing","natural"],1,"Honey is natural."),
        reading("Honey is sweet. Choose the picture.",fc(2,"sweet"),fc(2,"healthy"),"Sweet honey","Healthy honey",["sweet","healthy"],0,"Honey is sweet."),
        reading("Honey is healing. Choose the picture.",fc(2,"natural"),fc(2,"healing"),"Natural honey","Healing honey",["natural","healing"],1,"Honey is healing."),
        reading("Honey is good for us. Choose the best picture.",fc(2,"healthy"),fc(2,"natural"),"Healthy honey","Natural honey",["healthy","natural"],0,"Honey is good for us."),

        mathPicture("Which honey jar is big and has a red lid?",fc(2,"natural"),"Honey jars of different sizes and lid colors",["The big jar with a red lid.","The small jar with a yellow lid."],0,"The big jar has a red lid."),
        mathPicture("Which honeycomb is small and shaped like a hexagon?",fc(2,"healing"),"Honeycomb pieces of different sizes and shapes",["The big round honeycomb.","The small hexagon honeycomb."],1,"The small honeycomb is a hexagon."),
        mathPicture("Which honey toast is big and shaped like a star?",fc(2,"sweet"),"Honey toast pieces of different sizes and shapes",["The big star-shaped toast.","The small square toast."],0,"The big honey toast is shaped like a star."),
        subtraction("Start at 6. Jump back 1. Where do you land?","6 − 1 = ?",["5","4"],0,"Six take away one is five."),
        subtraction("Start at 7. Jump back 2. Where do you land?","7 − 2 = ?",["6","5"],1,"Seven take away two is five.")
      ]
    },
    {
      title: "What Can We Make?", headline: "What Can We Make<br><em>With Honey?</em>",
      hero: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-b/assets/month8/heroes/week-3-honey-foods-v2.png", heroAlt: "Syd and Penny making honey cake, honey pancakes, honey tea, and honey chicken in a kitchen", friend: "Syd",
      questions: [
        pictureWord("bun", "sun", 0),
        pictureWord("nun", "bun", 1),
        pictureWord("sun", "nun", 0),
        picturePair("bun", "nun", "sun", "nun", 1),
        picturePair("nun", "sun", "bun", "sun", 0),

        keySentence(fc(3,"tea"),"Honey tea",["We can make honey tea.","We can make honey cake."],0,"We can make honey tea."),
        keySentence(fc(3,"cake"),"Honey cake",["We can make honey chicken.","We can make honey cake."],1,"We can make honey cake."),
        keySentence(fc(3,"pancakes"),"Honey pancakes",["We can make honey pancakes.","We can make honey tea."],0,"We can make honey pancakes."),
        keySentence(fc(3,"chicken"),"Honey chicken",["We can make honey cake.","We can make honey chicken."],1,"We can make honey chicken."),
        keySentence(fc(3,"cake"),"A food made with honey",["We can make food with honey.","We cannot cook with honey."],0,"We can make food with honey.","What can we do with honey?"),

        reading("We can make honey tea. Choose the picture.",fc(3,"tea"),fc(3,"cake"),"Honey tea","Honey cake",["tea","cake"],0,"We can make honey tea."),
        reading("We can make honey cake. Choose the picture.",fc(3,"chicken"),fc(3,"cake"),"Honey chicken","Honey cake",["chicken","cake"],1,"We can make honey cake."),
        reading("We can make honey pancakes. Choose the picture.",fc(3,"pancakes"),fc(3,"tea"),"Honey pancakes","Honey tea",["pancakes","tea"],0,"We can make honey pancakes."),
        reading("We can make honey chicken. Choose the picture.",fc(3,"cake"),fc(3,"chicken"),"Honey cake","Honey chicken",["cake","chicken"],1,"We can make honey chicken."),
        reading("Choose a sweet food we can make with honey.",fc(3,"cake"),fc(3,"chicken"),"Honey cake","Honey chicken",["cake","chicken"],0,"We can make sweet honey cake."),

        mathPicture("Which pancake is big and on a blue plate?",fc(3,"pancakes"),"Pancakes on plates of different sizes and colors",["The big pancake on a blue plate.","The small pancake on a red plate."],0,"The big pancake is on a blue plate."),
        mathPicture("Which cup is blue and has lemon?",fc(3,"tea"),"Tea cups of different colors",["The red cup without lemon.","The blue cup with lemon."],1,"The blue cup has lemon."),
        mathPicture("Which honey cake is on a round plate?",fc(3,"cake"),"Honey cakes on different plates",["The cake on a round plate.","The cake on a square plate."],0,"The honey cake is on a round plate."),
        subtraction("Start at 8. Jump back 5. Where do you land?","8 − 5 = ?",["3","4"],0,"Eight take away five is three."),
        subtraction("Start at 10. Jump back 7. Where do you land?","10 − 7 = ?",["2","3"],1,"Ten take away seven is three.")
      ]
    },
    {
      title: "Honey Helps Our Body", headline: "How Does Honey<br><em>Help Our Body?</em>",
      hero: "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-b/assets/month8/heroes/week-4-honey-body-v2.png", heroAlt: "Gerry, Wanda, and Penny learning about honey, with gestures toward the throat, tummy, and arm", friend: "Ria",
      questions: [
        pictureWord("bug", "bun", 0),
        pictureWord("drum", "rug", 1),
        pictureWord("sun", "plum", 0),
        picturePair("mug", "gum", "rug", "gum", 1),
        picturePair("nun", "sun", "bun", "sun", 0),

        keySentence(fc(4,"tummy"),"Honey that is good for the tummy",["It's good for our tummy.","It's good for our skin."],0,"It's good for our tummy."),
        keySentence(fc(4,"throat"),"Honey that is good for the throat",["It's good for our body.","It's good for our throat."],1,"It's good for our throat."),
        keySentence(fc(4,"body"),"Honey that is good for the body",["It's good for our body.","It's good for our tummy."],0,"It's good for our body."),
        keySentence(fc(4,"skin"),"Honey that is good for the skin",["It's good for our throat.","It's good for our skin."],1,"It's good for our skin."),
        keySentence(fc(4,"body"),"Honey that helps our health",["Honey is good for our health.","Honey is a toy."],0,"Honey is good for our health.","What do we know about honey?"),

        reading("It's good for our tummy. Choose the picture.",fc(4,"tummy"),fc(4,"skin"),"A tummy","Skin",["tummy","skin"],0,"It's good for our tummy."),
        reading("It's good for our throat. Choose the picture.",fc(4,"body"),fc(4,"throat"),"A body","A throat",["body","throat"],1,"It's good for our throat."),
        reading("It's good for our body. Choose the picture.",fc(4,"body"),fc(4,"tummy"),"A body","A tummy",["body","tummy"],0,"It's good for our body."),
        reading("It's good for our skin. Choose the picture.",fc(4,"throat"),fc(4,"skin"),"A throat","Skin",["throat","skin"],1,"It's good for our skin."),
        reading("Honey can help when this feels sore. Choose the picture.",fc(4,"throat"),fc(4,"tummy"),"A throat","A tummy",["throat","tummy"],0,"Honey can help our throat."),

        mathPicture("Which honey jar is big and blue?",fc(2,"natural"),"Honey jars of different sizes and colors",["The big blue jar.","The small red jar."],0,"The big jar is blue."),
        mathPicture("Which tea set has a cup on a round plate?",fc(3,"tea"),"Tea cups and pots on different plates",["The teapot on an oval plate.","The cup on a round plate."],1,"The cup is on a round plate."),
        mathPicture("Which flower is brown and has five petals?",fc(1,"flowers"),"Flowers of different colors and shapes",["The brown flower with five petals.","The yellow flower with many petals."],0,"The brown flower has five petals."),
        subtraction("Start at 7. Jump back 1. Where do you land?","7 − 1 = ?",["6","5"],0,"Seven take away one is six."),
        subtraction("Start at 10. Jump back 3. Where do you land?","10 − 3 = ?",["6","7"],1,"Ten take away three is seven.")
      ]
    }
  ];
})();
