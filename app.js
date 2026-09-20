/**
 * Egyptian Football Facts — local-only app (no API)
 */
let allClubFacts = [];
let activeClubView = null;
let currentFact = null;

const dykText = document.getElementById('dykText');
const exploreFactsBtn = document.getElementById('exploreFactsBtn');
const clubSearch = document.getElementById('clubSearch');
const searchResults = document.getElementById('searchResults');
const searchHint = document.getElementById('searchHint');
const clubsStat = document.getElementById('clubsStat');
const factsStat = document.getElementById('factsStat');
const clubsCategoryCount = document.getElementById('clubsCategoryCount');
const standingsSection = document.getElementById('standingsSection');
const clubPage = document.getElementById('clubPage');
const clubPageBack = document.getElementById('clubPageBack');
const clubPageHeader = document.getElementById('clubPageHeader');
const clubPageBody = document.getElementById('clubPageBody');
const homeView = document.getElementById('homeView');
const saveFactBtn = document.getElementById('saveFactBtn');
const toast = document.getElementById('toast');

const GROUP_G_WORLD_CUP = {
  groupName: 'Group G',
  teams: [
    { rank: 1, name: 'Belgium', played: 3, win: 1, draw: 2, lose: 0, gf: 6, ga: 2, gd: 4, points: 5, form: 'WDW', qualified: true },
    { rank: 2, name: 'Egypt', played: 3, win: 1, draw: 2, lose: 0, gf: 5, ga: 3, gd: 2, points: 5, form: 'DWD', isEgypt: true, qualified: true },
    { rank: 3, name: 'Iran', played: 3, win: 0, draw: 3, lose: 0, gf: 3, ga: 3, gd: 0, points: 3, form: 'DDD', eliminated: true },
    { rank: 4, name: 'New Zealand', played: 3, win: 0, draw: 1, lose: 2, gf: 4, ga: 10, gd: -6, points: 1, form: 'DLL', eliminated: true },
  ],
};

const EGYPT_KNOCKOUT_PATH = {
  nextRound: 'Round of 32',
  nextOpponent: 'Australia',
  nextNote: 'Group D runners-up',
  winRound: 'Round of 16',
  winOpponent: 'Argentina',
};

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => { toast.hidden = true; }, 2200);
}

function displayFact(pick) {
  if (!pick || !dykText) return;
  currentFact = pick;
  dykText.innerHTML = `<strong>${escapeHtml(pick.team)}</strong> — ${escapeHtml(pick.fact)}`;
  if (saveFactBtn) {
    saveFactBtn.hidden = false;
    const saved = typeof EffStorage !== 'undefined' && EffStorage.isFactSaved?.(pick);
    saveFactBtn.classList.toggle('is-saved', !!saved);
    const label = saveFactBtn.querySelector('.dyk-save-label');
    if (label) label.textContent = saved ? 'Saved' : 'Save fact';
  }
}

function showRandomFact() {
  if (!allClubFacts.length) return;
  const pick = allClubFacts[Math.floor(Math.random() * allClubFacts.length)];
  displayFact(pick);
  document.querySelector('.did-you-know')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function toggleSaveCurrentFact() {
  if (!currentFact || typeof EffStorage === 'undefined') return;
  const saved = EffStorage.toggleSaveFact(currentFact);
  saveFactBtn?.classList.toggle('is-saved', saved);
  const label = saveFactBtn?.querySelector('.dyk-save-label');
  if (label) label.textContent = saved ? 'Saved' : 'Save fact';
  showToast(saved ? 'Fact saved' : 'Removed from saved');
}

function badgeHtml(club) {
  const initials = clubInitials(club.name);
  const bg = club.color || '#ce1126';
  const color = bg.toLowerCase() === '#ffffff' ? '#ce1126' : '#fff';
  const border = bg.toLowerCase() === '#ffffff' ? 'border:2px solid #ce1126;' : '';
  return `<span class="club-badge" style="background:${bg};color:${color};${border}">${escapeHtml(initials)}</span>`;
}

function renderSearchResults(clubs) {
  if (!searchResults) return;
  if (!clubs.length) {
    searchResults.innerHTML = '<p class="search-empty">No Egypt clubs match that search.</p>';
    searchResults.classList.add('is-visible');
    return;
  }

  searchResults.innerHTML = clubs.map((club) => {
    const count = getClubFacts(club).length;
    return `
      <button type="button" class="search-result-item" data-club-id="${escapeHtml(club.id)}">
        ${badgeHtml(club)}
        <span class="search-result-info">
          <span class="search-result-name">${escapeHtml(club.name)}</span>
          <span class="search-result-meta">${escapeHtml(club.city)} · ${count} facts${club.nickname ? ` · ${escapeHtml(club.nickname)}` : ''}</span>
        </span>
      </button>
    `;
  }).join('');
  searchResults.classList.add('is-visible');
}

function handleClubSearch() {
  const q = clubSearch?.value || '';
  const clubs = searchEgyptClubs(q);
  if (searchHint) {
    searchHint.textContent = q.trim()
      ? `${clubs.length} club${clubs.length === 1 ? '' : 's'} found — tap for facts`
      : `${EGYPT_CLUBS.length} Egypt clubs — type to filter, tap for facts`;
  }
  renderSearchResults(clubs);
}

function openClubPage(club) {
  if (!club || !clubPage) return;
  const facts = getClubFacts(club);
  activeClubView = { club, facts };

  if (homeView) homeView.hidden = true;
  clubPage.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  clubPageHeader.innerHTML = `
    <div class="club-page-hero">
      ${badgeHtml(club)}
      <div>
        <p class="club-page-kicker">${club.national ? 'National team' : 'Egyptian club'} · ${escapeHtml(club.city)}</p>
        <h2 class="club-page-name">${escapeHtml(club.fullName || club.name)}</h2>
        <p class="club-page-nick">${club.nickname ? escapeHtml(club.nickname) : ''}${club.founded ? ` · Founded ${club.founded}` : ''}</p>
      </div>
    </div>
  `;

  clubPageBody.innerHTML = `
    <section class="club-facts-section">
      <h3 class="club-block-title">Facts <span class="club-facts-count">${facts.length}</span></h3>
      <ul class="club-facts-list">
        ${facts.map((fact, i) => `
          <li class="club-fact-item">
            <p>${escapeHtml(fact)}</p>
            <button type="button" class="fact-save-btn" data-fact-index="${i}">Save</button>
          </li>
        `).join('')}
      </ul>
    </section>
    <p class="club-page-more"><a href="facts.html?club=${encodeURIComponent(club.id)}">Open full fact page →</a></p>
  `;

  clubPageBody.querySelectorAll('.fact-save-btn').forEach((btn) => {
    const idx = Number(btn.dataset.factIndex);
    const pick = { team: club.name, fact: facts[idx], clubId: club.id };
    if (typeof EffStorage !== 'undefined' && EffStorage.isFactSaved?.(pick)) {
      btn.classList.add('is-saved');
      btn.textContent = 'Saved';
    }
  });
}

function closeClubPage() {
  if (!clubPage) return;
  clubPage.hidden = true;
  if (homeView) homeView.hidden = false;
  activeClubView = null;
}

function handleClubFactSaveClick(e) {
  const btn = e.target.closest('[data-fact-index]');
  if (!btn || !activeClubView?.facts) return;
  e.stopPropagation();
  const fact = activeClubView.facts[Number(btn.dataset.factIndex)];
  if (!fact) return;
  const pick = { team: activeClubView.club.name, fact, clubId: activeClubView.club.id };
  if (typeof EffStorage === 'undefined') return;
  const saved = EffStorage.toggleSaveFact(pick);
  btn.classList.toggle('is-saved', saved);
  btn.textContent = saved ? 'Saved' : 'Save';
  showToast(saved ? 'Fact saved' : 'Removed from saved');
}

function formDots(form) {
  return String(form || '').split('').map((c) => {
    const cls = c === 'W' ? 'form-w' : c === 'D' ? 'form-d' : 'form-l';
    return `<span class="form-dot ${cls}">${c}</span>`;
  }).join('');
}

function renderStandingsSection() {
  if (!standingsSection) return;
  const teams = GROUP_G_WORLD_CUP.teams;
  const egypt = teams.find((t) => t.isEgypt);

  standingsSection.innerHTML = `
    <article class="standings-card standings-card-wc">
      <div class="standings-header">
        <div>
          <h3 class="standings-title">FIFA World Cup 2026 · ${GROUP_G_WORLD_CUP.groupName}</h3>
          <p class="standings-subtitle">Final standings (local) · Egypt qualified</p>
        </div>
        <span class="live-badge live-badge-final">Final</span>
      </div>

      ${egypt ? `
        <div class="egypt-points-banner">
          <div class="egypt-points-info">
            <span class="egypt-points-label">Egypt · 2nd in Group G</span>
            <span class="egypt-points-value">${egypt.points} <small>pts</small></span>
          </div>
          <div class="egypt-points-stats">
            <div class="egypt-stat"><span class="egypt-stat-val">${egypt.win}</span><span class="egypt-stat-lbl">W</span></div>
            <div class="egypt-stat"><span class="egypt-stat-val">${egypt.draw}</span><span class="egypt-stat-lbl">D</span></div>
            <div class="egypt-stat"><span class="egypt-stat-val">${egypt.lose}</span><span class="egypt-stat-lbl">L</span></div>
            <div class="egypt-stat"><span class="egypt-stat-val">${egypt.gd > 0 ? '+' : ''}${egypt.gd}</span><span class="egypt-stat-lbl">GD</span></div>
          </div>
        </div>
      ` : ''}

      <div class="standings-table-wrap">
        <table class="standings-table">
          <thead>
            <tr><th>#</th><th>Team</th><th>P</th><th>GD</th><th>Pts</th><th>Form</th></tr>
          </thead>
          <tbody>
            ${teams.map((t) => `
              <tr class="${t.isEgypt ? 'standings-row-egypt' : ''} ${t.qualified ? 'standings-row-qualify' : ''}">
                <td class="standings-rank">${t.rank}</td>
                <td>
                  <span class="standings-team">
                    ${escapeHtml(t.name)}
                    ${t.qualified ? '<span class="standings-qual-badge">Q</span>' : ''}
                  </span>
                </td>
                <td>${t.played}</td>
                <td>${t.gd > 0 ? '+' : ''}${t.gd}</td>
                <td><strong>${t.points}</strong></td>
                <td class="standings-form-cell"><span class="standings-form">${formDots(t.form)}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="egypt-knockout">
        <div class="knockout-path">
          <div class="knockout-step knockout-step-next">
            <span class="knockout-step-label">${EGYPT_KNOCKOUT_PATH.nextRound}</span>
            <div class="knockout-matchup">
              <span class="knockout-team knockout-team-egypt">Egypt</span>
              <span class="knockout-vs">vs</span>
              <span class="knockout-team">${EGYPT_KNOCKOUT_PATH.nextOpponent}</span>
            </div>
            <span class="knockout-step-note">${EGYPT_KNOCKOUT_PATH.nextNote}</span>
          </div>
          <div class="knockout-arrow">↓</div>
          <div class="knockout-step knockout-step-win">
            <span class="knockout-step-label">If Egypt win → ${EGYPT_KNOCKOUT_PATH.winRound}</span>
            <div class="knockout-matchup">
              <span class="knockout-team knockout-team-egypt">Egypt</span>
              <span class="knockout-vs">vs</span>
              <span class="knockout-team">${EGYPT_KNOCKOUT_PATH.winOpponent}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
}

function focusClubSearch() {
  document.getElementById('teamsSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  clubSearch?.focus();
}

function initLocalApp() {
  allClubFacts = getAllFactPool();

  if (clubsStat) clubsStat.textContent = String(EGYPT_CLUBS.length);
  if (factsStat) factsStat.textContent = `${allClubFacts.length}+`;
  if (clubsCategoryCount) clubsCategoryCount.textContent = `${EGYPT_CLUBS.length} Clubs`;
  if (searchHint) searchHint.textContent = `Search ${EGYPT_CLUBS.length} Egypt clubs — tap one for facts`;

  renderStandingsSection();
  handleClubSearch();
  // show full club list on home by default
  renderSearchResults(EGYPT_CLUBS);

  if (allClubFacts.length) {
    displayFact(allClubFacts[Math.floor(Math.random() * allClubFacts.length)]);
  }

  const params = new URLSearchParams(window.location.search);
  const clubId = params.get('club');
  if (clubId) {
    const club = getClubById(clubId);
    if (club) openClubPage(club);
  }
}

clubPageBack?.addEventListener('click', closeClubPage);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && clubPage && !clubPage.hidden) closeClubPage();
});
clubPageBody?.addEventListener('click', handleClubFactSaveClick);
clubSearch?.addEventListener('input', handleClubSearch);
searchResults?.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-club-id]');
  if (!btn) return;
  const club = getClubById(btn.dataset.clubId);
  if (club) openClubPage(club);
});
exploreFactsBtn?.addEventListener('click', () => { window.location.href = 'facts.html'; });
saveFactBtn?.addEventListener('click', (e) => { e.stopPropagation(); toggleSaveCurrentFact(); });
document.getElementById('didYouKnow')?.addEventListener('click', (e) => {
  if (e.target.closest('#saveFactBtn')) return;
  showRandomFact();
});

document.querySelectorAll('.category-card[data-facts-page]').forEach((card) => {
  card.addEventListener('click', () => {
    window.location.href = card.getAttribute('data-facts-page');
  });
});

initLocalApp();
