document.addEventListener('DOMContentLoaded', () => {
  const shuffle = items => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  let soundEnabled = true;
  const soundToggle = document.getElementById('sound-toggle');
  soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.setAttribute('aria-pressed', String(soundEnabled));
    soundToggle.innerHTML = soundEnabled ? '&#128266; Sound On' : '&#128263; Sound Off';
  });
  const successSound = () => {
    if (!soundEnabled || !window.AudioContext) return;
    const context = new AudioContext();
    [523, 659].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      gain.gain.setValueAtTime(0.045, context.currentTime + index * .1);
      gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + .32 + index * .1);
      oscillator.connect(gain); gain.connect(context.destination);
      oscillator.start(context.currentTime + index * .1);
      oscillator.stop(context.currentTime + .34 + index * .1);
    });
  };
  const speakText = text => {
    if (!soundEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US'; speech.rate = .86; speech.pitch = 1.03;
    window.speechSynthesis.speak(speech);
  };

  if (document.getElementById('silly-sentence')) {
  const corrections = shuffle([
    { before: 'The horse was ', wrong: 'faster', after: '.', correct: 'fast', choices: ['fast', 'faster', 'the fastest'] },
    { before: 'The lion was ', wrong: 'fast', after: '.', correct: 'faster', choices: ['fast', 'faster', 'the fastest'] },
    { before: 'The cheetah was ', wrong: 'faster', after: '.', correct: 'the fastest', choices: ['fast', 'faster', 'the fastest'] },
    { before: 'The turtle was ', wrong: 'slower', after: '.', correct: 'slow', choices: ['slow', 'slower', 'the slowest'] },
    { before: 'The snail was ', wrong: 'slow', after: '.', correct: 'slower', choices: ['slow', 'slower', 'the slowest'] },
    { before: 'The sloth was ', wrong: 'slower', after: '.', correct: 'the slowest', choices: ['slow', 'slower', 'the slowest'] },
    { before: '', wrong: 'The horse', after: ' won the race.', correct: 'The cheetah', choices: ['The horse', 'The lion', 'The cheetah'] },
    { before: '', wrong: 'The lion', after: ' is the winner.', correct: 'The cheetah', choices: ['The horse', 'The lion', 'The cheetah'] },
    { before: '', wrong: 'The turtle', after: ' won the race.', correct: 'The sloth', choices: ['The turtle', 'The snail', 'The sloth'] },
    { before: '', wrong: 'The snail', after: ' is the winner.', correct: 'The sloth', choices: ['The turtle', 'The snail', 'The sloth'] }
  ]);
  let correctionIndex = 0;
  const sentence = document.getElementById('silly-sentence');
  const choices = document.getElementById('replacement-choices');
  const correctionFeedback = document.getElementById('silly-feedback');
  const nextCorrection = document.getElementById('silly-next');
  const correctionProgress = document.getElementById('silly-progress');
  const renderCorrection = () => {
    const item = corrections[correctionIndex];
    sentence.classList.remove('correct');
    sentence.innerHTML = `${item.before}<span class="wrong-part">${item.wrong}</span>${item.after}`;
    choices.innerHTML = shuffle(item.choices).map(choice => `<span class="choice-pair"><button class="replacement-choice" type="button" data-choice="${choice}">${choice}</button><button class="speaker-button choice-speaker" type="button" data-speak="${choice}" aria-label="Read ${choice} aloud">&#128266;</button></span>`).join('');
    correctionFeedback.textContent = '';
    nextCorrection.hidden = true;
    correctionProgress.textContent = `${correctionIndex + 1} / ${corrections.length}`;
    choices.querySelectorAll('.replacement-choice').forEach(button => button.addEventListener('click', () => {
      speakText(button.dataset.choice);
      if (button.dataset.choice !== item.correct) {
        button.classList.remove('wrong'); void button.offsetWidth; button.classList.add('wrong');
        correctionFeedback.textContent = 'Try again!';
        return;
      }
      sentence.innerHTML = `${item.before}<span class="wrong-part">${item.correct}</span>${item.after}`;
      sentence.classList.add('correct');
      correctionFeedback.textContent = '';
      choices.querySelectorAll('button').forEach(choiceButton => { choiceButton.disabled = true; });
      successSound();
      nextCorrection.textContent = correctionIndex === corrections.length - 1 ? 'Play Again' : 'Next →';
      nextCorrection.hidden = false;
    }));
    choices.querySelectorAll('.choice-speaker').forEach(button => button.addEventListener('click', () => speakText(button.dataset.speak)));
  };
  nextCorrection.addEventListener('click', () => {
    correctionIndex += 1;
    if (correctionIndex >= corrections.length) {
      corrections.splice(0, corrections.length, ...shuffle(corrections));
      correctionIndex = 0;
    }
    renderCorrection();
  });
  document.getElementById('sentence-speaker').addEventListener('click', () => speakText(sentence.textContent));
  renderCorrection();
  }

  if (document.getElementById('race-slots')) {
  const raceData = {
    fast: {
      labels: ['fast', 'faster', 'the fastest'], correct: ['horse', 'lion', 'cheetah'],
      animals: { horse: ['🐎', 'horse'], lion: ['🦁', 'lion'], cheetah: ['🐆', 'cheetah'] }, winner: 'cheetah', winnerDelay: 2200,
      durations: { horse: 4, lion: 3, cheetah: 2 },
      story: ['Today is the Fast Animal Race Day!', 'Who will win?', 'The horse runs fast.', 'The lion runs faster.', 'The cheetah runs the fastest.', 'The cheetah won the race.', 'The cheetah is the winner.', 'Let’s clap and cheer!']
    },
    slow: {
      labels: ['slow', 'slower', 'the slowest'], correct: ['turtle', 'snail', 'sloth'],
      animals: { turtle: ['🐢', 'turtle'], snail: ['🐌', 'snail'], sloth: ['🦥', 'sloth'] }, winner: 'sloth', winnerDelay: 7200,
      durations: { turtle: 5, snail: 6, sloth: 7 },
      story: ['It’s the Slow Animal Race Day!', 'The slowest animal wins.', 'The turtle moves slow.', 'The snail moves slower.', 'The sloth moves the slowest.', 'Who was the slowest animal?', 'That’s the winner.', 'The sloth won the race!']
    }
  };
  let raceType = 'fast';
  let arrangement = shuffle(raceData.fast.correct);
  let selectedSlot = null;
  let dragSlot = null;
  const slots = document.getElementById('race-slots');
  const raceFeedback = document.getElementById('race-feedback');
  const startRace = document.getElementById('start-race');
  const raceShow = document.getElementById('race-show');
  const raceTrack = document.getElementById('race-track');
  const storyLines = document.getElementById('story-lines');
  const swapSlots = (from, to) => {
    [arrangement[from], arrangement[to]] = [arrangement[to], arrangement[from]];
    selectedSlot = null; renderSlots(); resetRaceResult();
  };
  const renderSlots = () => {
    const data = raceData[raceType];
    slots.innerHTML = arrangement.map((animal, index) => `<div class="race-slot" data-index="${index}" tabindex="0" role="group" aria-label="${data.labels[index]} position"><div class="slot-heading"><span class="slot-label">${data.labels[index]}</span><button class="speaker-button mini-speaker" type="button" data-speak="${data.labels[index]}" aria-label="Read ${data.labels[index]} aloud">&#128266;</button></div><button class="animal-card${selectedSlot === index ? ' selected' : ''}" type="button" draggable="true" data-index="${index}" aria-pressed="${selectedSlot === index}"><span>${data.animals[animal][0]}</span>${data.animals[animal][1]} <i class="card-speaker" aria-hidden="true">&#128266;</i></button></div>`).join('');
    slots.querySelectorAll('.animal-card').forEach(card => {
      card.addEventListener('click', event => {
        event.stopPropagation(); const index = Number(card.dataset.index);
        speakText(data.animals[arrangement[index]][1]);
        if (selectedSlot === null) { selectedSlot = index; renderSlots(); }
        else if (selectedSlot === index) { selectedSlot = null; renderSlots(); }
        else swapSlots(selectedSlot, index);
      });
      card.addEventListener('dragstart', () => { dragSlot = Number(card.dataset.index); });
    });
    slots.querySelectorAll('.mini-speaker').forEach(button => button.addEventListener('click', event => { event.stopPropagation(); speakText(button.dataset.speak); }));
    slots.querySelectorAll('.race-slot').forEach(slot => {
      const place = () => { const index = Number(slot.dataset.index); if (selectedSlot !== null && selectedSlot !== index) swapSlots(selectedSlot, index); };
      slot.addEventListener('click', place);
      slot.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); place(); } });
      slot.addEventListener('dragover', event => event.preventDefault());
      slot.addEventListener('drop', event => { event.preventDefault(); const target = Number(slot.dataset.index); if (dragSlot !== null && dragSlot !== target) swapSlots(dragSlot, target); dragSlot = null; });
    });
  };
  const resetRaceResult = () => {
    startRace.disabled = true; raceFeedback.textContent = ''; raceFeedback.className = 'race-feedback'; raceShow.hidden = true;
  };
  document.querySelectorAll('.race-type').forEach(button => button.addEventListener('click', () => {
    raceType = button.dataset.race;
    speakText(raceType === 'fast' ? 'Fast Animal Race' : 'Slow Animal Race');
    document.querySelectorAll('.race-type').forEach(item => item.classList.toggle('active', item === button));
    arrangement = shuffle(raceData[raceType].correct); selectedSlot = null; renderSlots(); resetRaceResult();
  }));
  document.getElementById('check-race').addEventListener('click', () => {
    const correct = raceData[raceType].correct;
    const wrongPositions = arrangement.map((animal, index) => animal === correct[index] ? null : index).filter(index => index !== null);
    slots.querySelectorAll('.race-slot').forEach((slot, index) => slot.classList.toggle('needs-work', wrongPositions.includes(index)));
    if (wrongPositions.length) {
      raceFeedback.textContent = `${wrongPositions.length} ${wrongPositions.length === 1 ? 'position needs' : 'positions need'} another try.`;
      startRace.disabled = true;
    } else {
      raceFeedback.textContent = 'Your race is ready!'; raceFeedback.classList.add('correct'); startRace.disabled = false; successSound();
    }
  });
  startRace.addEventListener('click', () => {
    const data = raceData[raceType];
    raceShow.hidden = false; storyLines.innerHTML = '';
    raceTrack.className = 'race-track';
    raceTrack.innerHTML = data.correct.map(animal => `<div class="race-lane"><div class="runner" data-animal="${animal}" style="animation-duration:${data.durations[animal]}s" aria-label="${animal}">${data.animals[animal][0]}</div></div>`).join('');
    void raceTrack.offsetWidth; raceTrack.classList.add('running');
    data.story.forEach((line, index) => window.setTimeout(() => {
      const paragraph = document.createElement('p'); paragraph.className = 'story-line'; paragraph.innerHTML = `<span>${line}</span><button class="speaker-button" type="button" aria-label="Read this sentence aloud">&#128266;</button>`; paragraph.querySelector('button').addEventListener('click', () => speakText(line)); storyLines.appendChild(paragraph);
    }, index * 800));
    window.setTimeout(() => {
      raceTrack.querySelector(`[data-animal="${data.winner}"]`).classList.add('winner'); successSound();
    }, data.winnerDelay);
    raceShow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  renderSlots();
  }
});
