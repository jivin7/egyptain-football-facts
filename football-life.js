/**
 * Football Life Simulator — web hub for Jivin
 */
const HOUSES = [
  { id: 'flat', name: 'Starter Flat', price: 40, blurb: 'First place of your own' },
  { id: 'town', name: 'Town House', price: 100, blurb: 'Quiet street near the pitch' },
  { id: 'villa', name: 'Modern Villa', price: 220, blurb: 'Garden + training lawn' },
  { id: 'pent', name: 'City Penthouse', price: 400, blurb: 'Skyline views after big wins' },
];

const SKILL_META = [
  { key: 'speed', label: 'Speed', cost: 8 },
  { key: 'shooting', label: 'Shooting', cost: 10 },
  { key: 'passing', label: 'Passing', cost: 8 },
  { key: 'dribbling', label: 'Dribbling', cost: 9 },
];

const PLACE_LINES = {
  pitch: 'You warm up at the stadium. Ready for penalties?',
  shop: 'Football shop: new boots flash in the window (+style points later).',
  mall: 'Mall run complete. Fans ask for a selfie with Jivin.',
  beach: 'Beach recovery day. Fresh air, fresh legs.',
  city: 'City streets buzz. Someone shouts “Jivin!” from a café.',
  cars: 'Car dealership — dream motors, someday. Keep winning points.',
};

const toast = document.getElementById('toast');

function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.hidden = false;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => { toast.hidden = true; }, 1800);
}

function getLife() {
  const data = EffStorage.getLifeData();
  if (!data.skills) data.skills = { speed: 22, shooting: 28, passing: 24, dribbling: 20 };
  if (!Array.isArray(data.houses)) data.houses = [];
  data.name = data.name || 'JIVIN';
  return data;
}

function goalsFor(stats, life, levelInfo, points) {
  const goals = [];
  const winsNeeded = Math.max(0, 5 - stats.wins);
  goals.push({
    done: winsNeeded === 0,
    text: winsNeeded === 0 ? 'Won 5 matches ✓' : `Win ${winsNeeded} more match${winsNeeded === 1 ? '' : 'es'}`,
  });
  const to20 = Math.max(0, 20 - levelInfo.level);
  goals.push({
    done: to20 === 0,
    text: to20 === 0 ? 'Reached level 20 ✓' : `Reach level 20 (${to20} to go)`,
  });
  goals.push({
    done: life.houses.includes('villa'),
    text: life.houses.includes('villa') ? 'Own Modern Villa ✓' : 'Buy the Modern Villa',
  });
  goals.push({
    done: (life.skills.shooting || 0) >= 60,
    text: (life.skills.shooting || 0) >= 60 ? 'Shooting 60+ ✓' : `Raise Shooting to 60 (now ${life.skills.shooting})`,
  });
  goals.push({
    done: points >= 300,
    text: points >= 300 ? 'Banked 300 points ✓' : `Earn 300 total points (now ${points})`,
  });
  return goals;
}

function render() {
  const life = getLife();
  const stats = EffStorage.getGameStats();
  const points = EffStorage.getGamePoints();
  const levelInfo = EffStorage.getPlayerLevel();

  document.getElementById('lifeName').textContent = life.name;
  document.getElementById('lifeLevel').textContent = `Level ${levelInfo.level}`;
  document.getElementById('lifeXpFill').style.width = `${levelInfo.progress}%`;
  document.getElementById('lifeXpText').textContent = `${levelInfo.into} / ${levelInfo.need} XP to next level`;
  document.getElementById('lifeWins').textContent = String(stats.wins);
  document.getElementById('lifePoints').textContent = String(points);
  document.getElementById('lifeHousesCount').textContent = String(life.houses.length);
  document.getElementById('lifePtsBadge').textContent = `${points} pts`;

  const goalsEl = document.getElementById('lifeGoals');
  goalsEl.innerHTML = goalsFor(stats, life, levelInfo, points).map((g) => `
    <li class="${g.done ? 'is-done' : ''}">
      <span class="life-goal-check">${g.done ? '✓' : '○'}</span>
      <span>${EffStorage.escapeHtml(g.text)}</span>
    </li>
  `).join('');

  const skillsEl = document.getElementById('lifeSkills');
  skillsEl.innerHTML = SKILL_META.map((s) => {
    const val = Math.min(99, life.skills[s.key] || 0);
    return `
      <div class="life-skill-row">
        <div class="life-skill-head">
          <span>${s.label}</span>
          <strong>${val}</strong>
        </div>
        <div class="life-skill-track"><div class="life-skill-fill" style="width:${val}%"></div></div>
        <button type="button" class="life-train-btn" data-skill="${s.key}" data-cost="${s.cost}" ${val >= 99 ? 'disabled' : ''}>
          Train · ${s.cost} pts
        </button>
      </div>
    `;
  }).join('');

  skillsEl.querySelectorAll('.life-train-btn').forEach((btn) => {
    btn.addEventListener('click', () => trainSkill(btn.dataset.skill, Number(btn.dataset.cost)));
  });

  const housesEl = document.getElementById('lifeHouses');
  housesEl.innerHTML = HOUSES.map((h) => {
    const owned = life.houses.includes(h.id);
    const canBuy = !owned && points >= h.price;
    return `
      <article class="life-house ${owned ? 'is-owned' : ''}">
        <div class="life-house-visual" data-house="${h.id}"></div>
        <h4>${EffStorage.escapeHtml(h.name)}</h4>
        <p>${EffStorage.escapeHtml(h.blurb)}</p>
        <p class="life-house-price">${owned ? 'Owned' : h.price + ' pts'}</p>
        <button type="button" class="life-buy-btn" data-house="${h.id}" data-price="${h.price}" ${owned || !canBuy ? 'disabled' : ''}>
          ${owned ? 'Owned' : canBuy ? 'Buy' : 'Need more pts'}
        </button>
      </article>
    `;
  }).join('');

  housesEl.querySelectorAll('.life-buy-btn').forEach((btn) => {
    btn.addEventListener('click', () => buyHouse(btn.dataset.house, Number(btn.dataset.price)));
  });
}

function trainSkill(key, cost) {
  const life = getLife();
  if ((life.skills[key] || 0) >= 99) {
    showToast('Maxed out!');
    return;
  }
  if (!EffStorage.spendGamePoints(cost)) {
    showToast('Not enough points — win penalties first');
    return;
  }
  life.skills[key] = Math.min(99, (life.skills[key] || 0) + 4 + Math.floor(Math.random() * 3));
  EffStorage.saveLifeData(life);
  // small refund of "session XP feel" — already spent points which lower level slightly;
  // give 2 pts back as training bonus so training isn't only loss
  EffStorage.addGamePoints(2);
  showToast(`${key} trained! +2 pts bonus`);
  render();
}

function buyHouse(id, price) {
  const life = getLife();
  if (life.houses.includes(id)) return;
  if (!EffStorage.spendGamePoints(price)) {
    showToast('Not enough points');
    return;
  }
  life.houses.push(id);
  EffStorage.saveLifeData(life);
  showToast('Keys collected — house unlocked!');
  render();
}

document.getElementById('lifeDeclineBtn')?.addEventListener('click', () => {
  document.getElementById('lifeTrain')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast('Training mode — raise your skills');
});

document.querySelectorAll('.life-place').forEach((btn) => {
  btn.addEventListener('click', () => {
    const msg = PLACE_LINES[btn.dataset.place] || 'Nice spot.';
    document.getElementById('lifePlaceMsg').textContent = msg;
    if (btn.dataset.place === 'pitch') {
      showToast('Heading to the penalty pitch…');
      setTimeout(() => { window.location.href = 'penalty.html'; }, 700);
    }
  });
});

render();
