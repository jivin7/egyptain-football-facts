/**
 * Facts page — browse clubs + category fact pages (local, no API)
 */
const params = new URLSearchParams(window.location.search);
const clubId = params.get('club');
const category = params.get('cat');

const titleEl = document.getElementById('factsPageTitle');
const blurbEl = document.getElementById('factsPageBlurb');
const searchInput = document.getElementById('factsClubSearch');
const searchHint = document.getElementById('factsSearchHint');
const clubResults = document.getElementById('factsClubResults');
const catGrid = document.getElementById('factsCatGrid');
const listTitle = document.getElementById('factsListTitle');
const listCount = document.getElementById('factsListCount');
const factsList = document.getElementById('factsList');
const toast = document.getElementById('toast');

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => { toast.hidden = true; }, 2200);
}

function badgeHtml(club) {
  const initials = clubInitials(club.name);
  const bg = club.color || '#ce1126';
  const color = bg.toLowerCase() === '#ffffff' ? '#ce1126' : '#fff';
  const border = bg.toLowerCase() === '#ffffff' ? 'border:2px solid #ce1126;' : '';
  return `<span class="club-badge" style="background:${bg};color:${color};${border}">${escapeHtml(initials)}</span>`;
}

function renderClubResults(clubs) {
  clubResults.innerHTML = clubs.map((club) => {
    const count = getClubFacts(club).length;
    return `
      <a class="search-result-item" href="facts.html?club=${encodeURIComponent(club.id)}">
        ${badgeHtml(club)}
        <span class="search-result-info">
          <span class="search-result-name">${escapeHtml(club.name)}</span>
          <span class="search-result-meta">${escapeHtml(club.city)} · ${count} facts</span>
        </span>
      </a>
    `;
  }).join('') || '<p class="search-empty">No Egypt clubs match that search.</p>';
}

function renderCategories() {
  const entries = Object.entries(FACT_CATEGORIES);
  catGrid.innerHTML = entries.map(([key, data]) => {
    const count = key === 'clubs'
      ? EGYPT_CLUBS.length
      : (data.facts || []).length;
    return `
      <a class="facts-cat-card" href="facts.html?cat=${encodeURIComponent(key)}">
        <span class="facts-cat-name">${escapeHtml(data.title)}</span>
        <span class="facts-cat-count">${count} ${key === 'clubs' ? 'clubs' : 'facts'}</span>
      </a>
    `;
  }).join('');
}

function renderClubFactPage(club) {
  const facts = getClubFacts(club);
  titleEl.textContent = club.fullName || club.name;
  blurbEl.textContent = `${club.city} · ${club.nickname || 'Egyptian club'} · ${facts.length} facts`;
  listTitle.textContent = `${club.name} facts`;
  listCount.textContent = `${facts.length} facts`;
  document.getElementById('factsListSection').scrollIntoView({ behavior: 'smooth', block: 'start' });

  factsList.innerHTML = facts.map((fact, i) => {
    const pick = { team: club.name, fact, clubId: club.id };
    const saved = typeof EffStorage !== 'undefined' && EffStorage.isFactSaved?.(pick);
    return `
      <article class="fact-card">
        <p class="fact-card-text">${escapeHtml(fact)}</p>
        <button type="button" class="fact-save-btn ${saved ? 'is-saved' : ''}" data-idx="${i}">${saved ? 'Saved' : 'Save'}</button>
      </article>
    `;
  }).join('');

  factsList.querySelectorAll('.fact-save-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const fact = facts[Number(btn.dataset.idx)];
      const pick = { team: club.name, fact, clubId: club.id };
      const saved = EffStorage.toggleSaveFact(pick);
      btn.classList.toggle('is-saved', saved);
      btn.textContent = saved ? 'Saved' : 'Save';
      showToast(saved ? 'Fact saved' : 'Removed from saved');
    });
  });
}

function renderCategoryPage(key) {
  const data = FACT_CATEGORIES[key];
  if (!data) return;

  if (key === 'clubs') {
    titleEl.textContent = 'All Egypt clubs';
    blurbEl.textContent = data.blurb;
    listTitle.textContent = 'Clubs';
    listCount.textContent = `${EGYPT_CLUBS.length} clubs`;
    factsList.innerHTML = EGYPT_CLUBS.map((club) => {
      const count = getClubFacts(club).length;
      return `
        <a class="club-list-card" href="facts.html?club=${encodeURIComponent(club.id)}">
          ${badgeHtml(club)}
          <span class="search-result-info">
            <span class="search-result-name">${escapeHtml(club.name)}</span>
            <span class="search-result-meta">${escapeHtml(club.city)} · ${count} facts</span>
          </span>
        </a>
      `;
    }).join('');
    return;
  }

  titleEl.textContent = data.title;
  blurbEl.textContent = data.blurb;
  listTitle.textContent = `${data.title} facts`;
  listCount.textContent = `${data.facts.length} facts`;

  factsList.innerHTML = data.facts.map((fact, i) => {
    const pick = { team: data.title, fact, category: key };
    const saved = typeof EffStorage !== 'undefined' && EffStorage.isFactSaved?.(pick);
    return `
      <article class="fact-card">
        <p class="fact-card-text">${escapeHtml(fact)}</p>
        <button type="button" class="fact-save-btn ${saved ? 'is-saved' : ''}" data-idx="${i}">${saved ? 'Saved' : 'Save'}</button>
      </article>
    `;
  }).join('');

  factsList.querySelectorAll('.fact-save-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const fact = data.facts[Number(btn.dataset.idx)];
      const pick = { team: data.title, fact, category: key };
      const saved = EffStorage.toggleSaveFact(pick);
      btn.classList.toggle('is-saved', saved);
      btn.textContent = saved ? 'Saved' : 'Save';
      showToast(saved ? 'Fact saved' : 'Removed from saved');
    });
  });
}

function renderDefaultClubsList() {
  listTitle.textContent = 'All Egypt clubs';
  listCount.textContent = `${EGYPT_CLUBS.length} clubs`;
  factsList.innerHTML = EGYPT_CLUBS.map((club) => {
    const count = getClubFacts(club).length;
    return `
      <a class="club-list-card" href="facts.html?club=${encodeURIComponent(club.id)}">
        ${badgeHtml(club)}
        <span class="search-result-info">
          <span class="search-result-name">${escapeHtml(club.name)}</span>
          <span class="search-result-meta">${escapeHtml(club.city)} · ${count} facts</span>
        </span>
      </a>
    `;
  }).join('');
}

function onSearch() {
  const q = searchInput.value || '';
  const clubs = searchEgyptClubs(q);
  searchHint.textContent = q.trim()
    ? `${clubs.length} club${clubs.length === 1 ? '' : 's'} found`
    : `Type to search ${EGYPT_CLUBS.length} Egypt clubs`;
  renderClubResults(q.trim() ? clubs : clubs.slice(0, 6));
}

renderCategories();
searchInput.addEventListener('input', onSearch);
onSearch();

if (clubId) {
  const club = getClubById(clubId);
  if (club) renderClubFactPage(club);
  else renderDefaultClubsList();
} else if (category) {
  renderCategoryPage(category);
} else {
  renderDefaultClubsList();
}
