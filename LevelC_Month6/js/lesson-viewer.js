document.addEventListener('DOMContentLoaded', () => {
  const lessons = {
    1: { title: 'How Many?', pages: [
      ['../assets/week1/page-2.png', 'Balloons and number words from eleven through twenty'],
      ['../assets/week1/page-3.png', 'Read and Speak: counting twenty balloons'],
      ['../assets/week1/page-4.png', 'Count jump-rope jumps from eleven through twenty'],
      ['../assets/week1/page-5.png', 'Read and Speak: a jump rope in the locker']
    ]},
    2: { title: 'Who Will Win the Race?', pages: [
      ['../assets/week2/page-6.png', 'Compare a horse, lion, and cheetah in a fast animal race'],
      ['../assets/week2/page-7.png', 'Read and Speak: the cheetah wins the race'],
      ['../assets/week2/page-8.png', 'Compare a turtle, snail, and sloth in a slow animal race'],
      ['../assets/week2/page-9.png', 'Read and Speak: the sloth wins the slow race']
    ]},
    3: { title: 'Number Bonds 1–10', pages: [
      ['../assets/week3/page-10.png', 'Put groups of birds and tomatoes together to make ten'],
      ['../assets/week3/page-11.png', 'Read and Speak: number bonds with birds and tomatoes'],
      ['../assets/week3/page-12.png', 'A family picks groups of apples that make ten'],
      ['../assets/week3/page-13.png', 'Read and Speak: apple number bonds making ten']
    ]},
    4: { title: 'Number Bonds 11–20', pages: [
      ['../assets/week4/page-14.png', 'Break apart fifteen and twenty marbles'],
      ['../assets/week4/page-15.png', 'Read and Speak: share marbles and make ten first'],
      ['../assets/week4/page-16.png', 'Break apart fifteen and twenty blocks'],
      ['../assets/week4/page-17.png', 'Read and Speak: share blocks and make ten first']
    ]}
  };

  const params = new URLSearchParams(location.search);
  const week = Math.min(4, Math.max(1, Number(params.get('week')) || 1));
  const weekMenuLink = document.getElementById('week-menu-link');
  if (weekMenuLink) weekMenuLink.href = `../Month 6 Level C.html?week=${week}`;
  const page = Math.min(4, Math.max(1, Number(params.get('page')) || 1));
  const lesson = lessons[week];
  const makeUrl = (w, p) => `viewer.html?week=${w}&page=${p}`;
  const isLast = page === 4;
  const isFinal = week === 4 && isLast;
  const nextUrl = isFinal ? 'index.html' : isLast ? makeUrl(week + 1, 1) : makeUrl(week, page + 1);
  const previousUrl = page > 1 ? makeUrl(week, page - 1) : week > 1 ? makeUrl(week - 1, 4) : 'index.html';
  const nextLabel = isFinal ? 'All Lessons' : isLast ? `Start Week ${week + 1} →` : 'Next Page →';

  const speak = (sentence, onEnd) => {
    if (!('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(sentence);
    speech.lang = 'en-US';
    speech.rate = 0.86;
    speech.pitch = 1.04;
    if (onEnd) {
      let completed = false;
      const finish = () => {
        if (completed) return;
        completed = true;
        onEnd();
      };
      speech.addEventListener('end', finish, { once: true });
      speech.addEventListener('error', finish, { once: true });
    }
    window.speechSynthesis.speak(speech);
  };

  const audioActivities = {
    '2-1': {
      introduction: 'Who will win the race? This is the fast animal race day!',
      hotspots: [
        { name: 'Duck', sentence: 'The cheetah won the race.', left: 0, top: 53, width: 23, height: 46 },
        { name: 'Horse', sentence: 'The horse was fast.', left: 22.2, top: 21.5, width: 23.7, height: 50.5 },
        { name: 'Lion', sentence: 'The lion was faster.', left: 47.8, top: 24.5, width: 23.8, height: 50.5 },
        { name: 'Cheetah', sentence: 'The cheetah was the fastest.', left: 73.4, top: 21.5, width: 23.7, height: 50.5 }
      ]
    },
    '2-3': {
      introduction: 'Who will win the race? This is the slow animal race day!',
      hotspots: [
        { name: 'Turtle', sentence: 'The turtle was slow.', left: 3.5, top: 24.5, width: 23.7, height: 51 },
        { name: 'Snail', sentence: 'The snail was slower.', left: 29, top: 21.5, width: 23.7, height: 51 },
        { name: 'Sloth', sentence: 'The sloth was the slowest.', left: 54.6, top: 24.5, width: 23.7, height: 51 },
        { name: 'Elephant', sentence: 'The sloth won the race.', left: 79.4, top: 36, width: 20.6, height: 63 }
      ]
    }
  };

  const quizActivities = {
    '2-2': {
      questions: [
        { question: 'What day is it today?', answer: 'Today is the Fast Animal Race Day.', key: 'race-day' },
        { question: 'Who runs fast?', answer: 'The horse runs fast.', key: 'horse' },
        { question: 'Who runs faster?', answer: 'The lion runs faster.', key: 'lion' },
        { question: 'Who runs the fastest?', answer: 'The cheetah runs the fastest.', key: 'cheetah' },
        { question: 'The cheetah is the _________.', answer: 'The cheetah is the winner.', key: 'winner' }
      ],
      entities: [
        { key: 'race-day', label: 'Fast Animal Race Day', left: 55.2, top: 37.5, width: 36, height: 9.5 },
        { key: 'horse', label: 'The horse', left: 55.2, top: 57, width: 15.5, height: 5.5 },
        { key: 'lion', label: 'The lion', left: 55.2, top: 62, width: 15.5, height: 5.5 },
        { key: 'cheetah', label: 'The cheetah', left: 55.2, top: 67, width: 18, height: 5.5 },
        { key: 'winner', label: 'winner', left: 77.5, top: 81, width: 11.5, height: 5.5 }
      ]
    },
    '2-4': {
      questions: [
        { question: 'What day is it today?', answer: "It's the Slow Animal Race Day.", key: 'race-day' },
        { question: 'Who moves slow?', answer: 'The turtle moves slow.', key: 'turtle' },
        { question: 'Who moves slower?', answer: 'The snail moves slower.', key: 'snail' },
        { question: 'Who moves the slowest?', answer: 'The sloth moves the slowest.', key: 'sloth' },
        { question: 'The sloth _____ the race.', answer: 'The sloth won the race.', key: 'won' }
      ],
      entities: [
        { key: 'race-day', label: 'Slow Animal Race Day', left: 65, top: 37.5, width: 27, height: 9.5 },
        { key: 'turtle', label: 'The turtle', left: 55.1, top: 52.5, width: 18, height: 5.5 },
        { key: 'snail', label: 'The snail', left: 55.1, top: 57.5, width: 18, height: 5.5 },
        { key: 'sloth', label: 'The sloth', left: 55.1, top: 62.5, width: 18, height: 5.5 },
        { key: 'won', label: 'won', left: 65.5, top: 86.5, width: 6.5, height: 5.5 }
      ]
    }
  };

  document.title = `Week ${week} · ${lesson.title} · Page ${page}`;
  document.getElementById('viewer-week').textContent = `WEEK ${week}`;
  document.getElementById('viewer-title').textContent = lesson.title;
  document.getElementById('viewer-progress').textContent = `Lesson page ${page} of 4`;
  const image = document.getElementById('lesson-image');
  image.src = lesson.pages[page - 1][0];
  image.alt = lesson.pages[page - 1][1];
  document.getElementById('previous-page').href = previousUrl;
  ['next-page-top', 'next-page-bottom'].forEach(id => {
    const link = document.getElementById(id);
    link.href = nextUrl;
    link.textContent = nextLabel;
  });
  document.getElementById('page-dots').innerHTML = [1, 2, 3, 4].map(n =>
    `<a href="${makeUrl(week, n)}" class="${n === page ? 'active' : ''}" aria-label="Open page ${n}"${n === page ? ' aria-current="page"' : ''}>${n}</a>`
  ).join('');

  const activity = audioActivities[`${week}-${page}`];
  if (activity) {
    const hotspotLayer = document.getElementById('audio-hotspots');
    activity.hotspots.forEach(({ name, sentence, left, top, width, height }) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'audio-hotspot';
      button.style.left = `${left}%`;
      button.style.top = `${top}%`;
      button.style.width = `${width}%`;
      button.style.height = `${height}%`;
      button.setAttribute('aria-label', `${name}: play “${sentence}”`);
      button.title = `${name} — click to listen`;
      button.innerHTML = `<span class="hotspot-label">🔊 ${name}</span>`;
      button.addEventListener('click', () => speak(sentence));
      hotspotLayer.appendChild(button);
    });
    image.addEventListener('load', () => window.setTimeout(() => speak(activity.introduction), 450), { once: true });
  }

  const quiz = quizActivities[`${week}-${page}`];
  if (quiz) {
    const launcherWrap = document.getElementById('quiz-launcher-wrap');
    const launcher = document.getElementById('quiz-launcher');
    const panel = document.getElementById('quiz-panel');
    const closeButton = document.getElementById('quiz-close');
    const questionBox = document.getElementById('quiz-questions');
    const hotspotLayer = document.getElementById('audio-hotspots');
    const middle = quiz.questions.slice(1, 4);
    for (let i = middle.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [middle[i], middle[j]] = [middle[j], middle[i]];
    }
    const orderedQuiz = [quiz.questions[0], ...middle, quiz.questions[4]];
    let currentQuestion = 0;
    let transitioning = false;
    const celebration = document.createElement('div');
    celebration.className = 'quiz-yay';
    celebration.hidden = true;
    celebration.setAttribute('role', 'status');
    panel.appendChild(celebration);
    const entityButtons = quiz.entities.map(({ key, label, left, top, width, height }) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'quiz-entity-hotspot';
      button.dataset.key = key;
      button.style.left = `${left}%`;
      button.style.top = `${top}%`;
      button.style.width = `${width}%`;
      button.style.height = `${height}%`;
      button.setAttribute('aria-label', `Choose ${label}`);
      button.title = label;
      hotspotLayer.appendChild(button);
      return button;
    });
    const showQuestion = () => {
      if (currentQuestion >= orderedQuiz.length) {
        questionBox.innerHTML = '<div class="quiz-complete"><strong>Quiz complete!</strong><span>You answered all five questions.</span></div>';
        entityButtons.forEach(button => button.classList.remove('quiz-active', 'quiz-correct', 'quiz-wrong'));
        speak('You answered all five questions.');
        return;
      }
      const item = orderedQuiz[currentQuestion];
      questionBox.innerHTML = `<div class="quiz-one-question"><span>Question ${currentQuestion + 1} of 5</span><strong>${item.question}</strong><small>Click the answer in the picture.</small></div>`;
      entityButtons.forEach(button => button.classList.remove('quiz-correct', 'quiz-wrong'));
    };
    entityButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (panel.hidden || transitioning || currentQuestion >= orderedQuiz.length) return;
        const item = orderedQuiz[currentQuestion];
        if (button.dataset.key !== item.key) {
          button.classList.add('quiz-wrong');
          window.setTimeout(() => button.classList.remove('quiz-wrong'), 450);
          speak('Try again.');
          return;
        }
        transitioning = true;
        button.classList.add('quiz-correct');
        celebration.innerHTML = `<div class="quiz-result-text"><small>Question</small><strong>${item.question}</strong><small>Answer</small><strong>${item.answer}</strong></div>`;
        celebration.hidden = false;
        currentQuestion += 1;
        speak(`${item.question} ${item.answer}`, () => {
          window.setTimeout(() => {
            celebration.hidden = true;
            transitioning = false;
            showQuestion();
          }, 450);
        });
      });
    });
    const openQuiz = () => {
      panel.hidden = false;
      launcherWrap.hidden = true;
      entityButtons.forEach(button => button.classList.add('quiz-active'));
      showQuestion();
      closeButton.focus();
    };
    const closeQuiz = () => {
      panel.hidden = true;
      launcherWrap.hidden = false;
      celebration.hidden = true;
      transitioning = false;
      entityButtons.forEach(button => button.classList.remove('quiz-active', 'quiz-correct', 'quiz-wrong'));
      launcher.focus();
    };
    launcherWrap.hidden = false;
    launcher.addEventListener('click', openQuiz);
    closeButton.addEventListener('click', closeQuiz);
  }
});
