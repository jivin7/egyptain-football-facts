/**
 * Penalty Shootout — best of 5, shoot or save, easy/medium/hard, points on win
 */
const DIRS = ['left', 'center', 'right'];
const TOTAL_ROUNDS = 5;
const WIN_POINTS = { easy: 15, medium: 30, hard: 50 };
const AI_ACCURACY = { easy: 0.28, medium: 0.48, hard: 0.72 };

const setupEl = document.getElementById('penSetup');
const playEl = document.getElementById('penPlay');
const resultEl = document.getElementById('penResult');
const youScoreEl = document.getElementById('youScore');
const cpuScoreEl = document.getElementById('cpuScore');
const roundLabel = document.getElementById('penRoundLabel');
const modeTag = document.getElementById('penModeTag');
const promptEl = document.getElementById('penPrompt');
const keeperEl = document.getElementById('penKeeper');
const ballEl = document.getElementById('penBall');
const historyEl = document.getElementById('penHistory');
const pointsBadge = document.getElementById('penPoints');
const toast = document.getElementById('toast');

let role = 'shoot';
let difficulty = 'easy';
let round = 1;
let youScore = 0;
let cpuScore = 0;
let busy = false;
let history = [];

function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.hidden = false;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => { toast.hidden = true; }, 1600);
}

function refreshPointsBadge() {
  if (pointsBadge) pointsBadge.textContent = `${EffStorage.getGamePoints()} pts`;
}

function pickRole(next) {
  role = next;
  document.querySelectorAll('#roleChoices .pen-choice').forEach((btn) => {
    btn.classList.toggle('is-selected', btn.dataset.role === role);
  });
}

function pickDiff(next) {
  difficulty = next;
  document.querySelectorAll('#diffChoices .pen-choice').forEach((btn) => {
    btn.classList.toggle('is-selected', btn.dataset.diff === difficulty);
  });
}

function randomDir() {
  return DIRS[Math.floor(Math.random() * DIRS.length)];
}

function aiChoose(playerDir) {
  if (Math.random() < AI_ACCURACY[difficulty]) return playerDir;
  const others = DIRS.filter((d) => d !== playerDir);
  return others[Math.floor(Math.random() * others.length)];
}

function resetVisual() {
  keeperEl.dataset.dive = 'center';
  keeperEl.classList.remove('is-diving', 'is-save');
  ballEl.dataset.pos = 'spot';
  ballEl.classList.remove('is-flying', 'is-goal', 'is-saved');
}

function updateScoreboard() {
  youScoreEl.textContent = String(youScore);
  cpuScoreEl.textContent = String(cpuScore);
  roundLabel.textContent = `Round ${Math.min(round, TOTAL_ROUNDS)} / ${TOTAL_ROUNDS}`;
  modeTag.textContent = role === 'shoot' ? 'You shoot' : 'You save';
  const cpuLabel = document.getElementById('cpuLabel');
  if (cpuLabel) cpuLabel.textContent = role === 'shoot' ? 'Keeper' : 'CPU';
  promptEl.textContent = role === 'shoot'
    ? 'Tap Left, Center, or Right to shoot'
    : 'Tap Left, Center, or Right to dive';
}

function renderHistory() {
  historyEl.innerHTML = history.map((h) => {
    const youWinRound = role === 'shoot' ? h.scored : !h.scored;
    const cls = youWinRound ? 'is-goal' : 'is-save';
    const label = role === 'shoot'
      ? (h.scored ? 'GOAL' : 'MISS')
      : (h.scored ? 'CONCEDED' : 'SAVE');
    return `<span class="pen-chip ${cls}" title="${h.note}">R${h.round} ${label}</span>`;
  }).join('');
}

function setZonesEnabled(on) {
  document.querySelectorAll('.pen-zone').forEach((z) => {
    z.disabled = !on;
  });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function startGame() {
  round = 1;
  youScore = 0;
  cpuScore = 0;
  busy = false;
  history = [];
  setupEl.hidden = true;
  resultEl.hidden = true;
  playEl.hidden = false;
  resetVisual();
  updateScoreboard();
  renderHistory();
  setZonesEnabled(true);
}

function endGame() {
  playEl.hidden = true;
  resultEl.hidden = false;
  setZonesEnabled(false);

  let outcome = 'draw';
  if (youScore > cpuScore) outcome = 'win';
  else if (youScore < cpuScore) outcome = 'loss';

  EffStorage.recordGameResult(outcome);

  const title = document.getElementById('penResultTitle');
  const scoreLine = document.getElementById('penResultScore');
  const ptsLine = document.getElementById('penResultPoints');
  const totalLine = document.getElementById('penResultTotal');

  scoreLine.textContent = `${youScore} – ${cpuScore}`;

  let gained = 0;
  if (outcome === 'win') {
    title.textContent = 'You win!';
    gained = WIN_POINTS[difficulty];
    if (youScore - cpuScore >= 3) gained += 10;
    EffStorage.addGamePoints(gained);
    ptsLine.textContent = `+${gained} points`;
  } else if (outcome === 'loss') {
    title.textContent = 'CPU wins';
    ptsLine.textContent = 'No points — try again!';
  } else {
    title.textContent = "It's a draw!";
    gained = 5;
    EffStorage.addGamePoints(gained);
    ptsLine.textContent = `+${gained} points for the draw`;
  }

  totalLine.textContent = `Total: ${EffStorage.getGamePoints()} pts`;
  refreshPointsBadge();
}

async function takeKick(playerDir) {
  if (busy) return;
  busy = true;
  setZonesEnabled(false);

  const youShoot = role === 'shoot';
  let shootDir;
  let diveDir;

  if (youShoot) {
    shootDir = playerDir;
    diveDir = aiChoose(playerDir);
  } else {
    diveDir = playerDir;
    shootDir = difficulty === 'hard' && Math.random() < 0.4
      ? randomDir()
      : aiChoose(playerDir);
  }

  promptEl.textContent = youShoot ? 'Shooting…' : 'Diving…';
  await wait(250);

  keeperEl.classList.add('is-diving');
  keeperEl.dataset.dive = diveDir;
  ballEl.classList.add('is-flying');
  ballEl.dataset.pos = shootDir;

  await wait(700);

  const isSaved = shootDir === diveDir;
  const isGoal = !isSaved;

  if (isSaved) {
    keeperEl.classList.add('is-save');
    ballEl.classList.add('is-saved');
    promptEl.textContent = 'SAVE!';
  } else {
    ballEl.classList.add('is-goal');
    promptEl.textContent = 'GOAL!';
  }

  if (youShoot) {
    if (isGoal) youScore += 1;
    else cpuScore += 1;
  } else if (isSaved) {
    youScore += 1;
  } else {
    cpuScore += 1;
  }

  history.push({
    round,
    scored: isGoal,
    note: youShoot
      ? (isGoal ? `Goal → ${shootDir}` : `Saved at ${diveDir}`)
      : (isSaved ? `Save ← ${diveDir}` : `Conceded ← ${shootDir}`),
  });

  updateScoreboard();
  renderHistory();
  showToast(promptEl.textContent);
  await wait(1000);

  if (round >= TOTAL_ROUNDS) {
    endGame();
    busy = false;
    return;
  }

  round += 1;
  resetVisual();
  updateScoreboard();
  busy = false;
  setZonesEnabled(true);
}

document.querySelectorAll('#roleChoices .pen-choice').forEach((btn) => {
  btn.addEventListener('click', () => pickRole(btn.dataset.role));
});
document.querySelectorAll('#diffChoices .pen-choice').forEach((btn) => {
  btn.addEventListener('click', () => pickDiff(btn.dataset.diff));
});
document.getElementById('penStartBtn').addEventListener('click', startGame);
document.getElementById('penPlayAgain').addEventListener('click', () => {
  resultEl.hidden = true;
  setupEl.hidden = false;
  refreshPointsBadge();
});
document.querySelectorAll('.pen-zone').forEach((zone) => {
  zone.addEventListener('click', () => takeKick(zone.dataset.dir));
});

refreshPointsBadge();
