(() => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const params = new URLSearchParams(location.search);
  const week = Math.min(4, Math.max(1, Number(params.get('week')) || 1));
  const back = document.getElementById('alphabet-back');
  back.href = `page-0${week}.html`;
  back.innerHTML = `&#11013;&#65039; Back to Week ${week} Lesson`;

  const singleMode = document.getElementById('single-mode');
  const pairMode = document.getElementById('pair-mode');
  const singleDisplay = document.getElementById('single-display');
  const pairDisplay = document.getElementById('pair-display');
  const singleControls = document.getElementById('single-controls');
  const pairHelp = document.getElementById('pair-help');
  const clearPair = document.getElementById('clear-pair');
  const grid = document.getElementById('alphabet-grid');
  const count = document.getElementById('letter-count');
  let mode = 'single';
  let current = 0;
  let pair = [];

  letters.forEach((letter, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'letter-choice';
    button.textContent = letter.toLowerCase();
    button.setAttribute('aria-label', `Letter ${letter}`);
    button.addEventListener('click', () => chooseLetter(index));
    grid.appendChild(button);
  });

  function renderSingle() {
    const letter = letters[current];
    singleDisplay.innerHTML = `<span class="letter-upper">${letter}</span>`;
    count.textContent = `${current + 1} of 26`;
    [...grid.children].forEach((button, index) => button.classList.toggle('is-current', index === current));
  }

  function renderPair() {
    pairDisplay.innerHTML = pair.length
      ? pair.map((letter) => `<span class="pair-letter">${letter.toLowerCase()}</span>`).join('')
      : '<span class="pair-placeholder">Choose two letters</span>';
    [...grid.children].forEach((button, index) => {
      const letter = letters[index];
      button.classList.toggle('is-first', pair[0] === letter);
      button.classList.toggle('is-second', pair[1] === letter);
    });
  }

  function chooseLetter(index) {
    if (mode === 'single') {
      current = index;
      renderSingle();
      return;
    }
    const letter = letters[index];
    if (pair.length < 2) pair.push(letter);
    else pair = [letter];
    renderPair();
  }

  function setMode(nextMode) {
    mode = nextMode;
    const isSingle = mode === 'single';
    singleMode.classList.toggle('is-active', isSingle);
    pairMode.classList.toggle('is-active', !isSingle);
    singleMode.setAttribute('aria-selected', String(isSingle));
    pairMode.setAttribute('aria-selected', String(!isSingle));
    singleDisplay.hidden = !isSingle;
    pairDisplay.hidden = isSingle;
    singleControls.hidden = !isSingle;
    pairHelp.hidden = isSingle;
    clearPair.hidden = isSingle;
    [...grid.children].forEach((button) => button.classList.remove('is-current','is-first','is-second'));
    if (isSingle) renderSingle(); else renderPair();
  }

  document.getElementById('previous-letter').addEventListener('click', () => {
    current = (current + letters.length - 1) % letters.length;
    renderSingle();
  });
  document.getElementById('next-letter').addEventListener('click', () => {
    current = (current + 1) % letters.length;
    renderSingle();
  });
  singleMode.addEventListener('click', () => setMode('single'));
  pairMode.addEventListener('click', () => setMode('pair'));
  clearPair.addEventListener('click', () => { pair = []; renderPair(); });
  document.addEventListener('keydown', (event) => {
    if (mode !== 'single') return;
    if (event.key === 'ArrowLeft') document.getElementById('previous-letter').click();
    if (event.key === 'ArrowRight') document.getElementById('next-letter').click();
  });

  renderSingle();
})();
