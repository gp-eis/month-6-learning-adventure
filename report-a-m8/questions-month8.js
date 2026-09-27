(() => {
  const media = "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-a/assets/month8/media/";
  const audio = "https://pub-aa69c309a877446c857c4f2564279578.r2.dev/report-a/assets/month8/audio/letters/";
  const phonicsImage = (week, word) => `${media}phonics/week-${week}/elements/${word}-3d-v1.png`;
  const flashcard = (week, file) => `${media}flashcards/week-${week}/${file}`;
  const literacy = (folder, file) => `${media}literacy/${folder}/${file}`;
  const mathBall = file => `${media}math/week-1/${file}`;
  const mathObject = (week, file) => `${media}math/week-${week}/${file}`;

  const sound = (letter, shownLetter, otherLetter, icon = "🔤") => ({
    section: "Phonics", tag: "SOUND CHECK", icon,
    q: `What is the sound of the letter ${shownLetter}?`,
    hint: "Listen to a sound to unlock its answer button.",
    choices: [`Phoneme ${letter.toUpperCase()}`, `Phoneme ${otherLetter.toUpperCase()}`],
    audioChoices: [`${audio}${letter}.mp3`, `${audio}${otherLetter}.mp3`],
    choiceLetters: [shownLetter, shownLetter === shownLetter.toUpperCase() ? otherLetter.toUpperCase() : otherLetter],
    practice: `The sound of ${shownLetter} is`, practiceDisplay: `The sound of ${shownLetter} is /${letter === "o" ? "ŏ" : letter}/.`, answer: 0,
    correctAnimation: "letter-pop"
  });
  const word = (week, name, wrong, icon) => ({
    section: "Phonics", tag: "PICTURE WORD", icon, q: "What is this?",
    hint: "Look at the picture and choose its name.", image: phonicsImage(week, name.toLowerCase()),
    imageAlt: `${/^[aeiou]/i.test(name) ? "An" : "A"} ${name.toLowerCase()}`, choices: [name, wrong], practice: `I see the ${name.toLowerCase()}.`, answer: 0,
    correctAnimation: "picture-cheer"
  });
  const phonicsSentence = (week, name, wrong, icon) => ({
    section: "Phonics", tag: "SENTENCE CHECK", icon, q: "Which is the correct sentence?",
    hint: `Look at the ${name.toLowerCase()} and choose the matching sentence.`,
    image: phonicsImage(week, name.toLowerCase()), imageAlt: `A ${name.toLowerCase()}`,
    choices: [`I see the ${name.toLowerCase()}.`, `I see the ${wrong.toLowerCase()}.`],
    practice: `I see the ${name.toLowerCase()}.`, answer: 0,
    correctAnimation: "sentence-shine"
  });
  const keySentence = (image, sentence, distractors, icon, alt) => ({
    section: "Sentences", tag: "KEY SENTENCE", icon, q: "Choose the correct sentence.",
    hint: "Look carefully at the picture.", image, imageAlt: alt, imageWide: true,
    choices: [sentence, ""], distractors, answer: 0,
    correctAnimation: "sport-cheer"
  });
  const reading = (image, q, choices, practice, icon = "📖", alt = "Workbook activity picture") => ({
    section: "Reading", tag: "READ & CHOOSE", icon, q, hint: "Look at the picture and choose the best answer.",
    image, imageAlt: alt, imageWide: true, imageCompact: true, choices, practice: practice || choices[0], answer: 0
  });
  const pictureReading = (sentence, correctImage, correctLabel, otherImage, otherLabel, icon = "📖") => ({
    section: "Reading", tag: "READ & FIND", icon,
    q: `Read and find the picture.\n${sentence}`,
    hint: "Choose the picture that matches the sentence.",
    choices: [correctLabel, otherLabel], spokenChoices: [correctLabel, otherLabel],
    choiceImagePaths: [correctImage, otherImage],
    choiceImageAlts: [`Picture for ${correctLabel.toLowerCase()}`, `Picture for ${otherLabel.toLowerCase()}`],
    choiceImagesWide: true, hideChoiceLabels: true, practice: sentence, answer: 0,
    correctAnimation: "picture-cheer"
  });
  const groupChoice = (group, correctImage, correctLabel, otherImage, otherLabel, icon) => ({
    section: "Math", tag: "SORT BY TYPE", icon,
    q: `Which picture belongs in the ${group} group?`,
    hint: "Look at both pictures and choose the matching sport.",
    choices: [correctLabel, otherLabel], spokenChoices: [correctLabel, otherLabel],
    choiceImagePaths: [correctImage, otherImage],
    choiceImageAlts: [`${correctLabel} picture`, `${otherLabel} picture`],
    choiceImagesWide: true, hideChoiceLabels: true,
    practice: `${correctLabel} belongs in the ${group} group.`, answer: 0,
    correctAnimation: "sort-snap"
  });
  const ballGroup = (name, articleName, targetFile, icon, correctCount, mixedFiles) => {
    const target = mathBall(targetFile);
    return {
      section: "Math", tag: "SORT BY TYPE", icon,
      q: `This is the ${name} group. Choose the correct group.`,
      hint: `Look at the ${articleName}. Choose the group where every ball is ${articleName === "soccer ball" ? "a soccer ball" : `a ${articleName}`}.`,
      image: target, imageAlt: `One ${articleName}`, imageCompact: true,
      choices: [`All ${name}`, "Mixed balls"],
      spokenChoices: [`All ${name}`, "Mixed balls"],
      choiceImageGroups: [
        Array(correctCount).fill(target),
        mixedFiles.map(mathBall)
      ],
      hideChoiceLabels: true,
      practice: `This is the ${name} group.`, answer: 0,
      correctAnimation: "sort-snap"
    };
  };
  const basketballGroup = () => ballGroup("basketball", "basketball", "basketball-ball-v1.png", "🏀", 4, [
    "basketball-ball-v1.png", "basketball-ball-v1.png", "basketball-ball-v1.png", "volleyball-ball-v1.png"
  ]);
  const soccerBallGroup = () => ballGroup("soccer ball", "soccer ball", "soccer-ball-v1.png", "⚽", 3, [
    "basketball-ball-v1.png", "volleyball-ball-v1.png", "tennis-ball-v1.png"
  ]);
  const volleyballGroup = () => ballGroup("volleyball", "volleyball", "volleyball-ball-v1.png", "🏐", 6, [
    "volleyball-ball-v1.png", "volleyball-ball-v1.png", "volleyball-ball-v1.png",
    "soccer-ball-v1.png", "soccer-ball-v1.png", "soccer-ball-v1.png"
  ]);
  const objectGroup = (week, name, articleName, targetFile, icon, correctFiles, mixedFiles) => {
    const target = mathObject(week, targetFile);
    return {
      section: "Math", tag: "SORT BY TYPE", icon,
      q: `This is the ${name} group. Choose the correct group.`,
      hint: `Look at the ${articleName}. Choose the group where every picture belongs with it.`,
      image: target, imageAlt: `One ${articleName}`, imageCompact: true,
      choices: [`All ${name}`, "Mixed group"], spokenChoices: [`All ${name}`, "Mixed group"],
      choiceImageGroups: [correctFiles.map(file => mathObject(week, file)), mixedFiles.map(file => mathObject(week, file))],
      hideChoiceLabels: true,
      practice: `This is the ${name} group.`, answer: 0,
      correctAnimation: "sort-snap"
    };
  };
  const smaller = (pair, icon = "🔢") => ({
    section: "Math", tag: "SMALLER NUMBER", icon, q: "Which number is smaller?",
    hint: "Look at both numbers and choose the smaller number.", numberPair: pair,
    choices: [String(Math.min(...pair)), String(Math.max(...pair))],
    practice: `${Math.min(...pair)} is smaller than ${Math.max(...pair)}.`, answer: 0,
    correctAnimation: "number-jump"
  });
  const bigger = (pair, items, icon = "🔢") => ({
    section: "Math", tag: "BIGGER NUMBER", icon, q: "Which number is bigger?",
    hint: "Look at both numbers and choose the greater number.", numberPair: pair, numberItems: items,
    choices: [String(Math.max(...pair)), String(Math.min(...pair))], practice: `${Math.max(...pair)} is bigger than ${Math.min(...pair)}.`, answer: 0
  });
  const pattern = (sequence, correct, wrong, icon = "🧩") => ({
    section: "Math", tag: "PICTURE PATTERN", icon, q: "What comes next in the pattern?",
    hint: "Look for the part that repeats.", pattern: [...sequence, null], choices: [correct.label, wrong.label],
    choiceImages: [correct.key, wrong.key], practice: `${correct.label} comes next.`, answer: 0
  });

  const w1Cards = {
    ball: flashcard(1, "ball-sports-flashcard-v2.png"), soccer: flashcard(1, "soccer-flashcard-v2.png"),
    basketball: flashcard(1, "basketball-flashcard-v2.png"), baseball: flashcard(1, "baseball-flashcard-v2.png"),
    volleyball: flashcard(1, "volleyball-flashcard-v2.png")
  };
  const w2Cards = {
    gym: flashcard(2, "gym-flashcard-v1.png"), bike: flashcard(2, "bike-flashcard-v1.png"),
    dumbbells: flashcard(2, "dumbbells-flashcard-v1.png"), barbell: flashcard(2, "barbell-flashcard-v1.png"),
    bench: flashcard(2, "bench-flashcard-v1.png"), petStore: flashcard(2, "pet-store-flashcard-v1.png")
  };
  const w3Cards = {
    run: flashcard(3, "run-flashcard-v1.png"), pass: flashcard(3, "pass-flashcard-v1.png"),
    tackle: flashcard(3, "tackle-flashcard-v1.png"), kick: flashcard(3, "kick-flashcard-v1.png"),
    jump: flashcard(3, "jump-flashcard-v1.png")
  };
  const w4Cards = {
    sportswear: flashcard(4, "sportswear-flashcard-v1.png"), sneakers: flashcard(4, "sneakers-flashcard-v1.png"),
    swimsuit: flashcard(4, "swimsuit-flashcard-v1.png"), helmet: flashcard(4, "helmet-flashcard-v1.png"),
    socks: flashcard(4, "socks-flashcard-v1.png")
  };

  window.month8MathImages = {
    soccer: w1Cards.soccer, basketball: w1Cards.basketball, baseball: w1Cards.baseball, volleyball: w1Cards.volleyball,
    bike: w2Cards.bike, dumbbells: w2Cards.dumbbells, barbell: w2Cards.barbell, bench: w2Cards.bench,
    run: w3Cards.run, pass: w3Cards.pass, tackle: w3Cards.tackle, kick: w3Cards.kick, jump: w3Cards.jump,
    sportswear: w4Cards.sportswear, sneakers: w4Cards.sneakers, swimsuit: w4Cards.swimsuit, helmet: w4Cards.helmet, socks: w4Cards.socks
  };

  const week1Sentences = ["I like ball sports.", "I like soccer.", "I like basketball.", "I like baseball.", "I like volleyball."];
  const week2Sentences = ["At the gym.", "At the gym. I use a bike.", "At the gym. I use dumbbells.", "At the gym. I use a barbell.", "At the gym. I use a bench."];
  const week3Sentences = ["Soccer players run.", "Soccer players pass.", "Soccer players tackle.", "Soccer players kick.", "Soccer players jump."];
  const week4Sentences = ["I need sportswear.", "I need sneakers.", "I need a swimsuit.", "I need a helmet.", "I need socks."];
  const distractors = (all, correct) => all.filter(value => value !== correct);

  const week1 = [
    {...sound("o", "O", "p", "🅾️"), correctAnimation: "letter-pop"},
    {...word(1, "Octopus", "Olive", "🐙"), correctAnimation: "octopus-wave"},
    {...word(1, "Olive", "Omelet", "🫒"), correctAnimation: "olive-roll"},
    {...word(1, "Omelet", "Octopus", "🍳"), correctAnimation: "omelet-hop"},
    {...phonicsSentence(1, "Olive", "Omelet", "🫒"), correctAnimation: "sentence-shine"},
    {...keySentence(w1Cards.ball, week1Sentences[0], distractors(week1Sentences, week1Sentences[0]), "⚽", "Different ball sports"), correctAnimation: "sport-cheer"},
    {...keySentence(w1Cards.soccer, week1Sentences[1], distractors(week1Sentences, week1Sentences[1]), "⚽", "Children playing soccer"), correctAnimation: "sport-cheer"},
    {...keySentence(w1Cards.basketball, week1Sentences[2], distractors(week1Sentences, week1Sentences[2]), "🏀", "A child playing basketball"), correctAnimation: "sport-cheer"},
    {...keySentence(w1Cards.baseball, week1Sentences[3], distractors(week1Sentences, week1Sentences[3]), "⚾", "A child playing baseball"), correctAnimation: "sport-cheer"},
    {...keySentence(w1Cards.volleyball, week1Sentences[4], distractors(week1Sentences, week1Sentences[4]), "🏐", "A child playing volleyball"), correctAnimation: "sport-cheer"},
    {...pictureReading(week1Sentences[1], w1Cards.soccer, "Soccer", w1Cards.basketball, "Basketball", "⚽"), correctAnimation: "picture-cheer"},
    {...pictureReading(week1Sentences[2], w1Cards.basketball, "Basketball", w1Cards.baseball, "Baseball", "🏀"), correctAnimation: "picture-cheer"},
    {...pictureReading(week1Sentences[3], w1Cards.baseball, "Baseball", w1Cards.volleyball, "Volleyball", "⚾"), correctAnimation: "picture-cheer"},
    {...pictureReading(week1Sentences[4], w1Cards.volleyball, "Volleyball", w1Cards.soccer, "Soccer", "🏐"), correctAnimation: "picture-cheer"},
    {...pictureReading(week1Sentences[0], w1Cards.ball, "Ball sports", w1Cards.basketball, "Basketball", "🏆"), correctAnimation: "picture-cheer"},
    basketballGroup(),
    soccerBallGroup(),
    volleyballGroup(),
    smaller([2, 1]),
    smaller([3, 4])
  ];

  const week2 = [
    sound("o", "o", "p", "🅾️"),
    word(2, "Orange", "Otter", "🍊"), word(2, "Otter", "Ox", "🦦"), word(2, "Ox", "Orange", "🐂"),
    phonicsSentence(2, "Orange", "Otter", "🍊"),
    {
      section: "Sentences", tag: "KEY SENTENCE", icon: "🏋️", q: "Choose the correct sentence.",
      hint: "Look carefully at the picture.", image: w2Cards.gym,
      imageAlt: "A gym with exercise equipment", imageWide: true,
      choices: ["At the gym.", "At the pet store."],
      spokenChoices: ["At the gym.", "At the pet store."],
      practice: "At the gym.", answer: 0, correctAnimation: "sport-cheer"
    },
    keySentence(w2Cards.bike, week2Sentences[1], distractors(week2Sentences, week2Sentences[1]), "🚲", "An exercise bike"),
    keySentence(w2Cards.dumbbells, week2Sentences[2], distractors(week2Sentences, week2Sentences[2]), "🏋️", "Dumbbells"),
    keySentence(w2Cards.barbell, week2Sentences[3], distractors(week2Sentences, week2Sentences[3]), "🏋️", "A barbell"),
    keySentence(w2Cards.bench, week2Sentences[4], distractors(week2Sentences, week2Sentences[4]), "🪑", "An exercise bench"),
    {
      section: "Reading", tag: "READ & FIND", icon: "🏋️", q: "Where is this?\nAt the gym.",
      hint: "Read the sentence and choose the matching place.",
      choices: ["At the gym.", "At the pet store."],
      spokenChoices: ["At the gym.", "At the pet store."],
      choiceImagePaths: [w2Cards.gym, w2Cards.petStore],
      choiceImageAlts: ["A gym with exercise equipment", "A pet store"],
      choiceImagesWide: true, hideChoiceLabels: true,
      practice: "Where is this? At the gym.", answer: 0, correctAnimation: "picture-cheer"
    },
    pictureReading(week2Sentences[1], w2Cards.bike, "Bike", w2Cards.dumbbells, "Dumbbells", "🚲"),
    pictureReading(week2Sentences[2], w2Cards.dumbbells, "Dumbbells", w2Cards.barbell, "Barbell", "🏋️"),
    pictureReading(week2Sentences[3], w2Cards.barbell, "Barbell", w2Cards.bench, "Bench", "🏋️"),
    pictureReading(week2Sentences[4], w2Cards.bench, "Bench", w2Cards.bike, "Bike", "🪑"),
    objectGroup(2, "bench", "bench", "bench-v2.png", "🪑",
      ["bench-v2.png", "bench-v2.png", "bench-v2.png", "bench-v2.png"],
      ["bench-v2.png", "bench-v2.png", "bench-v2.png", "dumbbells-v1.png"]),
    {...objectGroup(2, "dumbbell", "dumbbell", "dumbbells-v1.png", "🏋️",
      ["dumbbells-v1.png", "dumbbells-v1.png", "dumbbells-v1.png"],
      ["bench-v2.png", "dumbbells-v1.png", "bike-v1.png"]), imageWide: true, imageCompact: true},
    objectGroup(2, "bike", "exercise bike", "bike-v1.png", "🚲",
      ["bike-v1.png", "bike-v1.png", "bike-v1.png", "bike-v1.png", "bike-v1.png", "bike-v1.png"],
      ["bike-v1.png", "bike-v1.png", "bike-v1.png", "bench-v2.png", "bench-v2.png", "bench-v2.png"]),
    smaller([5, 6]),
    smaller([10, 8])
  ];

  const week3 = [
    sound("p", "P", "o", "🅿️"),
    word(3, "Paint", "Pen", "🎨"), word(3, "Pen", "Pencil", "🖊️"), word(3, "Pencil", "Paint", "✏️"),
    phonicsSentence(3, "Pencil", "Paint", "✏️"),
    keySentence(w3Cards.run, week3Sentences[0], distractors(week3Sentences, week3Sentences[0]), "🏃", "Soccer players running"),
    keySentence(w3Cards.pass, week3Sentences[1], distractors(week3Sentences, week3Sentences[1]), "⚽", "Soccer players passing"),
    keySentence(w3Cards.tackle, week3Sentences[2], distractors(week3Sentences, week3Sentences[2]), "🥅", "Soccer players tackling"),
    keySentence(w3Cards.kick, week3Sentences[3], distractors(week3Sentences, week3Sentences[3]), "⚽", "A soccer player kicking"),
    keySentence(w3Cards.jump, week3Sentences[4], distractors(week3Sentences, week3Sentences[4]), "⭐", "A soccer player jumping"),
    pictureReading(week3Sentences[0], w3Cards.run, "Run", w3Cards.pass, "Pass", "🏃"),
    pictureReading(week3Sentences[1], w3Cards.pass, "Pass", w3Cards.tackle, "Tackle", "⚽"),
    pictureReading(week3Sentences[2], w3Cards.tackle, "Tackle", w3Cards.kick, "Kick", "🥅"),
    pictureReading(week3Sentences[3], w3Cards.kick, "Kick", w3Cards.jump, "Jump", "⚽"),
    pictureReading(week3Sentences[4], w3Cards.jump, "Jump", w3Cards.run, "Run", "⭐"),
    objectGroup(3, "blue jersey", "blue jersey", "jersey-blue-v1.png", "👕",
      ["jersey-blue-v1.png", "jersey-blue-v1.png", "jersey-blue-v1.png", "jersey-blue-v1.png"],
      ["jersey-blue-v1.png", "jersey-blue-v1.png", "jersey-blue-v1.png", "jersey-red-v1.png"]),
    objectGroup(3, "yellow", "yellow cone", "cone-yellow-v1.png", "🟡",
      ["jersey-yellow-v1.png", "cone-yellow-v1.png", "jersey-yellow-v1.png"],
      ["jersey-blue-v1.png", "cone-red-v1.png", "cone-yellow-v1.png"]),
    objectGroup(3, "red", "red cone", "cone-red-v1.png", "🔴",
      ["cone-red-v1.png", "jersey-red-v1.png", "cone-red-v1.png", "jersey-red-v1.png", "cone-red-v1.png", "jersey-red-v1.png"],
      ["cone-red-v1.png", "jersey-red-v1.png", "cone-red-v1.png", "cone-blue-v1.png", "jersey-blue-v1.png", "cone-blue-v1.png"]),
    smaller([7, 1]),
    smaller([4, 10])
  ];

  const week4 = [
    sound("p", "p", "o", "🅿️"),
    word(4, "Penguin", "Piano", "🐧"), word(4, "Piano", "Pig", "🎹"), word(4, "Pig", "Penguin", "🐷"),
    phonicsSentence(4, "Penguin", "Piano", "🐧"),
    keySentence(w4Cards.sportswear, week4Sentences[0], distractors(week4Sentences, week4Sentences[0]), "👕", "Sportswear"),
    keySentence(w4Cards.sneakers, week4Sentences[1], distractors(week4Sentences, week4Sentences[1]), "👟", "Sneakers"),
    keySentence(w4Cards.swimsuit, week4Sentences[2], distractors(week4Sentences, week4Sentences[2]), "🩱", "A swimsuit"),
    keySentence(w4Cards.helmet, week4Sentences[3], distractors(week4Sentences, week4Sentences[3]), "⛑️", "A helmet"),
    keySentence(w4Cards.socks, week4Sentences[4], distractors(week4Sentences, week4Sentences[4]), "🧦", "Socks"),
    pictureReading(week4Sentences[0], w4Cards.sportswear, "Sportswear", w4Cards.sneakers, "Sneakers", "👕"),
    pictureReading(week4Sentences[1], w4Cards.sneakers, "Sneakers", w4Cards.swimsuit, "Swimsuit", "👟"),
    pictureReading(week4Sentences[2], w4Cards.swimsuit, "Swimsuit", w4Cards.helmet, "Helmet", "🩱"),
    pictureReading(week4Sentences[3], w4Cards.helmet, "Helmet", w4Cards.socks, "Socks", "⛑️"),
    pictureReading(week4Sentences[4], w4Cards.socks, "Socks", w4Cards.sportswear, "Sportswear", "🧦"),
    objectGroup(4, "helmet", "helmet", "helmet-v1.png", "⛑️",
      ["helmet-v1.png", "helmet-v1.png", "helmet-v1.png", "helmet-v1.png"],
      ["helmet-v1.png", "helmet-v1.png", "helmet-v1.png", "swimsuit-v1.png"]),
    objectGroup(4, "sneakers", "pair of sneakers", "sneakers-v1.png", "👟",
      ["sneakers-v1.png", "sneakers-v1.png", "sneakers-v1.png"],
      ["sportswear-v1.png", "swimsuit-v1.png", "helmet-v1.png"]),
    objectGroup(4, "sportswear", "sportswear outfit", "sportswear-v1.png", "👕",
      ["sportswear-v1.png", "sportswear-v1.png", "sportswear-v1.png", "sportswear-v1.png", "sportswear-v1.png", "sportswear-v1.png"],
      ["sportswear-v1.png", "sportswear-v1.png", "sportswear-v1.png", "socks-v1.png", "socks-v1.png", "socks-v1.png"]),
    smaller([3, 8]),
    smaller([10, 9])
  ];

  window.month8ReportQuestions = {1: week1, 2: week2, 3: week3, 4: week4};
})();
