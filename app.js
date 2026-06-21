const API_KEY = 'be669a7810223736f57370c30634d3e0';
const API_BASE = 'https://v3.football.api-sports.io';
const STANDINGS_SEASON = 2026;

/** World Cup 2026 — Group G */
const GROUP_G_WORLD_CUP = {
  groupName: 'Group G',
  teams: [
    { rank: 1, name: 'New Zealand', flag: 'https://media.api-sports.io/football/teams/4673.png', played: 1, win: 0, draw: 1, lose: 0, gf: 2, ga: 2, gd: 0, points: 1 },
    { rank: 2, name: 'Iran', flag: 'https://media.api-sports.io/football/teams/22.png', played: 1, win: 0, draw: 1, lose: 0, gf: 2, ga: 2, gd: 0, points: 1 },
    { rank: 3, name: 'Belgium', flag: 'https://media.api-sports.io/football/teams/1.png', played: 1, win: 0, draw: 1, lose: 0, gf: 1, ga: 1, gd: 0, points: 1 },
    { rank: 4, name: 'Egypt', flag: null, played: 1, win: 0, draw: 1, lose: 0, gf: 1, ga: 1, gd: 0, points: 1, isEgypt: true },
  ],
  results: [
    { home: 'Belgium', away: 'Egypt', score: '1–1' },
    { home: 'Iran', away: 'New Zealand', score: '2–2' },
  ],
};

let allClubFacts = [];
let teamsCache = [];
let activeClubView = null;

const CURATED_CLUB_FACTS = [
  { match: 'egypt', facts: [
    'Egypt has won a record 7 Africa Cup of Nations titles — more than any other nation.',
    'The Pharaohs were the first African team to play at a FIFA World Cup, in 1934.',
    'Egypt reached the AFCON final in 2021 and 2022, showing their continued dominance.',
    'Mohamed Salah is the most famous modern Pharaoh and one of the world\'s best forwards.',
    'Hossam Hassan is Egypt\'s all-time top scorer with over 70 international goals.',
    'The national team plays in red kits with the iconic eagle crest.',
    'Egypt hosted and won AFCON tournaments in 1957, 1959, 1986, 1998, 2006, 2008, and 2010.',
    'The Cairo International Stadium is among the venues used for major national team matches.',
    'Egypt has produced legends like Mohamed Aboutrika, Ahmed Hassan, and Essam El-Hadary.',
    'The Pharaohs are perennial favourites every time AFCON comes around.',
    'Egypt\'s passionate supporters fill stadiums across the country for home qualifiers.',
    'The national team represents over 100 million football-mad Egyptians worldwide.',
  ]},
  { match: 'ahly', facts: [
    'Al Ahly are the most successful club in CAF Champions League history.',
    'Nicknamed "The Red Devils", Ahly were founded in 1907 in Cairo.',
    'The Cairo Derby against Zamalek is one of the fiercest rivalries in world football.',
    'Ahly have won the Egyptian Premier League more times than any other club.',
    'The club plays at the iconic Cairo International Stadium for many big matches.',
    'Ahly fans are known for creating incredible atmospheres with red flares and chants.',
    'The club has won multiple CAF Super Cup titles.',
    'Ahly\'s youth academy has produced countless Egyptian internationals.',
    'Aboutrika, Barakat, and El-Shahat are among Ahly\'s most beloved legends.',
    'Ahly regularly compete in the CAF Champions League knockout stages.',
    'The club\'s badge features the red devil symbol recognised across Africa.',
    'Ahly hold the record for most Egyptian Cup victories.',
  ]},
  { match: 'zamalek', facts: [
    'Zamalek are known as "The White Knights" and were founded in 1911.',
    'Zamalek share Cairo with rivals Al Ahly in the famous Cairo Derby.',
    'The club has won multiple Egyptian Premier League championships.',
    'Zamalek claimed CAF Confederation Cup glory in 2019.',
    'The White Knights play at the Cairo International Stadium.',
    'Zamalek have one of the largest and most passionate fanbases in Egypt.',
    'The club\'s white kit is instantly recognisable across African football.',
    'Zamalek have produced stars like Shikabala, Fawzy, and Hassan Shehata as a player.',
    'Derby day in Cairo stops the city as millions watch Ahly vs Zamalek.',
    'Zamalek have won the Egyptian Cup numerous times throughout their history.',
    'The club competed in the FIFA Club World Cup after continental success.',
    'Zamalek\'s ultras are famous for choreographed displays in the stands.',
  ]},
  { match: 'pyramids', facts: [
    'Pyramids FC rose quickly after major investment in the late 2010s.',
    'The club play at the 30 June Stadium in Cairo.',
    'Pyramids have finished near the top of the Egyptian Premier League table.',
    'The club signed high-profile players to challenge Ahly and Zamalek.',
    'Pyramids FC rebranded from their previous identity to build a new brand.',
    'The club has modern training facilities compared to many Egyptian sides.',
    'Pyramids have competed in CAF continental competitions.',
    'The name references Egypt\'s ancient pyramids, tying the club to national identity.',
    'Pyramids have been one of the biggest spenders in Egyptian football.',
    'The club aims to break the traditional duopoly of Ahly and Zamalek.',
  ]},
  { match: 'ismaily', facts: [
    'Ismaily SC are based in Ismailia on the Suez Canal.',
    'Nicknamed "The Yellow Dragons", Ismaily wear distinctive yellow kits.',
    'Ismaily won the CAF Champions League in 1969 — a historic achievement.',
    'The club has won the Egyptian Premier League multiple times.',
    'Ismaily Stadium is their fortress in the canal city.',
    'Ismaily have a fierce regional following in the Suez Canal zone.',
    'The club produced talented players who starred for the national team.',
    'Ismaily\'s golden era in the 1960s and 70s is still celebrated today.',
    'The Yellow Dragons remain one of Egypt\'s most historic clubs.',
    'Matches against Cairo giants always draw huge canal-city crowds.',
  ]},
  { match: 'smouha', facts: [
    'Smouha SC are based in Alexandria, Egypt\'s second-largest city.',
    'The club was founded in 1949 and plays at Smouha Stadium.',
    'Smouha are known for developing young Egyptian talent.',
    'The club has been a consistent Egyptian Premier League presence.',
    'Alexandria\'s coastal culture influences Smouha\'s passionate support.',
    'Smouha have competed in the Egyptian Cup knockout rounds regularly.',
    'The club\'s blue colours represent their Alexandria identity.',
    'Smouha have challenged bigger clubs in cup upsets over the years.',
    'The academy pipeline feeds players into the first team and national side.',
    'Smouha matches draw strong local crowds from across Alexandria.',
  ]},
  { match: 'gouna', facts: [
    'El Gouna FC represent the Red Sea resort town of El Gouna.',
    'The club offers a unique coastal setting in Egyptian football.',
    'El Gouna have competed in the Egyptian Premier League.',
    'The resort backing gives the club a distinctive identity.',
    'El Gouna Stadium hosts home matches near the Red Sea.',
    'The club has worked to establish itself among Egypt\'s top flight.',
    'El Gouna\'s location attracts visitors who discover Egyptian league football.',
    'The club has invested in squad building to avoid relegation battles.',
    'Red Sea communities rally behind El Gouna on matchdays.',
    'El Gouna represent tourism and sport combined in one club.',
  ]},
  { match: 'ceramica', facts: [
    'Ceramica Cleopatra FC were formed through merger and rebranding in 2020.',
    'The club plays at the New Suez Stadium.',
    'Ceramica reached the Egyptian Premier League remarkably quickly.',
    'Heavy investment helped build a competitive squad fast.',
    'The Ceramica name comes from the sponsoring ceramics company.',
    'Cleopatra in the name ties the club to Egyptian heritage.',
    'The club has aimed to establish itself as a top-tier regular.',
    'Ceramica Cleopatra have been active in the transfer market.',
    'Suez region fans have embraced the new club identity.',
    'The club represents modern corporate-backed football in Egypt.',
  ]},
  { match: 'pharco', facts: [
    'Pharco FC are based in Alexandria.',
    'The club is backed by the Pharco pharmaceutical group.',
    'Pharco play at the Alexandria Stadium.',
    'The club climbed through divisions to reach the top flight.',
    'Pharco\'s rise shows how investment can transform Egyptian clubs.',
    'Alexandria fans have welcomed another Premier League side.',
    'The club name references Egypt\'s ancient pharaohs.',
    'Pharco have focused on building a stable squad in the top division.',
    'The pharmaceutical backing provides financial stability.',
    'Pharco compete against Smouha and other Alexandria-area rivals.',
  ]},
  { match: 'national bank', facts: [
    'National Bank of Egypt FC reached the Premier League in 2021.',
    'The club is linked to Egypt\'s national banking institution.',
    'NBE FC play home matches in Cairo.',
    'Promotion was a major achievement for the banking-backed side.',
    'The club has focused on gradual squad improvement.',
    'NBE represent institutional investment in Egyptian football.',
    'The team has worked to secure their top-flight status.',
    'Young Egyptian players get opportunities at NBE.',
    'The club\'s green branding reflects the bank\'s identity.',
    'NBE matches are part of Cairo\'s busy football calendar.',
  ]},
  { match: 'masry', facts: [
    'Al Masry SC are based in Port Said on the Mediterranean.',
    'Nicknamed "The Green Eagles", Al Masry wear green kits.',
    'Port Said Stadium is one of Egypt\'s most atmospheric venues.',
    'Al Masry have a fierce fanbase in the Suez Canal region.',
    'The club has been a regular Premier League presence.',
    'Port Said\'s football culture is among the most passionate in Egypt.',
    'Al Masry have caused upsets against Cairo giants in cups.',
    'The Green Eagles represent canal-city pride.',
    'Al Masry\'s history stretches back decades in Egyptian football.',
    'Away trips to Port Said are daunting for visiting teams.',
  ]},
  { match: 'mokawloon', facts: [
    'Arab Contractors SC (Al Mokawloon) are a historic Cairo club.',
    'The club was founded in 1973.',
    'Al Mokawloon play at the Arab Contractors Stadium.',
    'The club has produced many Egyptian internationals over the years.',
    'Arab Contractors have won domestic honours in Egypt.',
    'The club is linked to Egypt\'s construction industry.',
    'Mokawloon have yo-yoed between divisions but remain respected.',
    'Their academy has developed technically gifted players.',
    'Cairo derbies against bigger clubs are always competitive.',
    'Al Mokawloon\'s green kit is recognisable in the league.',
  ]},
  { match: 'enppi', facts: [
    'ENPPI FC are based in Cairo and linked to the petroleum industry.',
    'The club is famous for its youth academy pipeline.',
    'ENPPI have won the Egyptian Premier League.',
    'Many ENPPI graduates became national team regulars.',
    'The club plays at Petrosport Stadium.',
    'ENPPI focus on developing talent before selling to bigger clubs.',
    'The petroleum backing provides structure and resources.',
    'ENPPI have competed in CAF competitions.',
    'The club\'s model influences other Egyptian sides.',
    'Technical, youthful football is ENPPI\'s trademark.',
  ]},
  { match: 'future', facts: [
    'Future FC are among the newer clubs in the Egyptian Premier League.',
    'The club has invested in reaching and staying in the top flight.',
    'Future FC aim to build a modern club structure.',
    'The name signals ambition for long-term success.',
    'Future have been active in the transfer market.',
    'The club represents new ownership in Egyptian football.',
    'Future FC matches add variety to the league fixture list.',
    'The squad blends experienced and young Egyptian players.',
    'Future are working to grow their fanbase.',
    'Every season is a step toward establishing the club\'s identity.',
  ]},
  { match: 'baladiyat', facts: [
    'Baladiyat El Mahalla represent El Mahalla El Kubra in the Nile Delta.',
    'The city is one of Egypt\'s major industrial centres.',
    'The club has strong local support in the Delta region.',
    'Baladiyat compete in Egypt\'s league pyramid.',
    'El Mahalla has a proud working-class football tradition.',
    'The club name means "Municipality of El Mahalla".',
    'Delta derbies bring intense local rivalry.',
    'Baladiyat\'s fans are known for loyalty through every division.',
    'The club represents community football far from Cairo.',
    'El Mahalla\'s textile industry history ties to the club\'s roots.',
  ]},
];

const dykText = document.getElementById('dykText');
const randomFactBtn = document.getElementById('randomFactBtn');
const exploreFactsBtn = document.getElementById('exploreFactsBtn');
const clubSearch = document.getElementById('clubSearch');
const searchResults = document.getElementById('searchResults');
const searchHint = document.getElementById('searchHint');
const clubsStat = document.getElementById('clubsStat');
const factsStat = document.getElementById('factsStat');
const clubsCategoryCount = document.getElementById('clubsCategoryCount');
const clubsCategoryBtn = document.getElementById('clubsCategoryBtn');
const standingsSection = document.getElementById('standingsSection');
const clubPage = document.getElementById('clubPage');
const clubPageBack = document.getElementById('clubPageBack');
const clubPageHeader = document.getElementById('clubPageHeader');
const clubPageBody = document.getElementById('clubPageBody');
const homeView = document.getElementById('homeView');
const bottomNav = document.getElementById('bottomNav');

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function fetchFromApi(endpoint) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'GET',
    headers: { 'x-apisports-key': API_KEY },
  });

  if (!response.ok) {
    throw new Error(`Could not load clubs (${response.status})`);
  }

  const data = await response.json();

  if (data.errors && Object.keys(data.errors).length > 0) {
    throw new Error(Object.values(data.errors).join(' ') || 'API returned an error');
  }

  return data;
}

function getEgyptNationalTeam() {
  return teamsCache.find((item) => isNationalTeam(item.team))?.team || null;
}

function getEgyptGroupTableData() {
  const egyptRow = GROUP_G_WORLD_CUP.teams.find((t) => t.isEgypt);
  return {
    groupName: GROUP_G_WORLD_CUP.groupName,
    teams: GROUP_G_WORLD_CUP.teams,
    egyptRow,
  };
}

function isNationalTeam(team) {
  return team.name.toLowerCase() === 'egypt' || team.national === true;
}

function getCuratedFacts(teamName) {
  const normalized = teamName.toLowerCase();
  const facts = [];

  CURATED_CLUB_FACTS.forEach(({ match, facts: clubFacts }) => {
    if (normalized.includes(match)) {
      facts.push(...clubFacts);
    }
  });

  return facts;
}

function buildApiFacts(team, venue) {
  const facts = [];

  if (team.founded) {
    facts.push(`Founded in ${team.founded} — over ${new Date().getFullYear() - team.founded} years of football history.`);
  }

  if (venue?.name) {
    let venueFact = `Home ground: ${venue.name}`;
    if (venue.city) venueFact += `, ${venue.city}`;
    if (venue.capacity) venueFact += ` — capacity ${venue.capacity.toLocaleString()} fans`;
    facts.push(`${venueFact}.`);
  }

  if (team.country) {
    facts.push(`Represents ${team.country} in official competitions.`);
  }

  if (isNationalTeam(team)) {
    facts.push('Egypt\'s senior national team — the Pharaohs.');
  } else {
    facts.push('Competes in the Egyptian Premier League and domestic cups.');
  }

  return facts;
}

function buildStandingsFacts(teamName) {
  if (teamName.toLowerCase() !== 'egypt') return [];

  const { groupName, egyptRow, teams } = getEgyptGroupTableData();
  if (!egyptRow) return [];

  return [
    `Egypt are in ${groupName} at the FIFA World Cup ${STANDINGS_SEASON} — rank ${egyptRow.rank} with ${egyptRow.points} point${egyptRow.points === 1 ? '' : 's'}.`,
    `Group table: ${teams.map((t) => `${t.name} (${t.points} pts)`).join(', ')}.`,
    `Egypt record: ${egyptRow.gf} GF, ${egyptRow.ga} GA — ${egyptRow.win}W-${egyptRow.draw}D-${egyptRow.lose}L from ${egyptRow.played} played.`,
    'Matchday 1: Belgium 1–1 Egypt · Iran 2–2 New Zealand.',
  ];
}

function buildGlobalStandingsFacts() {
  const { groupName, egyptRow, teams } = getEgyptGroupTableData();
  if (!egyptRow) return [];

  return [
    `Egypt are in World Cup ${STANDINGS_SEASON} ${groupName} — rank ${egyptRow.rank} with ${egyptRow.points} point${egyptRow.points === 1 ? '' : 's'}.`,
    `Egypt: ${egyptRow.gf} GF, ${egyptRow.ga} GA, ${egyptRow.win}W-${egyptRow.draw}D-${egyptRow.lose}L.`,
    `Full group: ${teams.map((t) => `${t.rank}. ${t.name}`).join(', ')}.`,
  ];
}

function loadAllFactsForTeam(team, venue) {
  const curated = getCuratedFacts(team.name);
  const apiFacts = buildApiFacts(team, venue);
  const generic = curated.length === 0
    ? [`${team.name} is part of Egypt's rich football landscape.`]
    : [];
  const standingsFacts = buildStandingsFacts(team.name);
  return [...new Set([...curated, ...apiFacts, ...generic, ...standingsFacts])];
}

function renderGroupGTableRows() {
  const { teams } = getEgyptGroupTableData();
  const egyptLogo = getEgyptNationalTeam()?.logo || 'https://media.api-sports.io/football/teams/32.png';

  return teams.map((team) => {
    const logo = team.isEgypt ? (team.logo || egyptLogo) : (team.logo || team.flag);
    return `
      <tr class="${team.isEgypt ? 'standings-row-egypt' : ''}">
        <td class="standings-rank">${team.rank}</td>
        <td class="standings-team">
          <img src="${logo}" alt="" class="standings-team-logo">
          <span>${escapeHtml(team.name)}${team.isEgypt ? ' 🇪🇬' : ''}</span>
        </td>
        <td>${team.played}</td>
        <td>${team.gf}</td>
        <td>${team.ga}</td>
        <td>${team.gd > 0 ? '+' : ''}${team.gd}</td>
        <td class="standings-points">${team.points}</td>
      </tr>
    `;
  }).join('');
}

function renderEgyptPointsBanner() {
  const { egyptRow } = getEgyptGroupTableData();
  const egyptLogo = getEgyptNationalTeam()?.logo || 'https://media.api-sports.io/football/teams/32.png';
  if (!egyptRow) return '';

  return `
    <div class="egypt-points-banner">
      <img src="${egyptLogo}" alt="Egypt" class="egypt-points-logo">
      <div class="egypt-points-info">
        <span class="egypt-points-label">Egypt</span>
        <span class="egypt-points-value">${egyptRow.points} <small>pts</small></span>
      </div>
      <div class="egypt-points-stats">
        <div class="egypt-stat"><span class="egypt-stat-val">${egyptRow.rank}</span><span class="egypt-stat-lbl">Rank</span></div>
        <div class="egypt-stat"><span class="egypt-stat-val">${egyptRow.gf}-${egyptRow.ga}</span><span class="egypt-stat-lbl">GF-GA</span></div>
        <div class="egypt-stat"><span class="egypt-stat-val">${egyptRow.win}-${egyptRow.draw}-${egyptRow.lose}</span><span class="egypt-stat-lbl">W-D-L</span></div>
      </div>
    </div>
  `;
}

function renderGroupGTableMarkup(compact = false) {
  const { groupName } = getEgyptGroupTableData();

  return `
    ${renderEgyptPointsBanner()}
    <div class="standings-table-wrap">
      <table class="standings-table ${compact ? 'standings-table-compact' : ''}">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>P</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>${renderGroupGTableRows()}</tbody>
      </table>
    </div>
    <div class="group-g-results">
      <h4 class="standings-group-label">Matchday 1</h4>
      <ul class="group-g-results-list">
        ${GROUP_G_WORLD_CUP.results.map((m) => `
          <li class="group-g-result">
            <span>${escapeHtml(m.home)}</span>
            <strong>${m.score}</strong>
            <span>${escapeHtml(m.away)}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `;
}

function renderStandingsSection() {
  const { groupName } = getEgyptGroupTableData();

  standingsSection.innerHTML = `
    <div class="standings-card group-g-card">
      <div class="standings-header">
        <div>
          <span class="card-badge">World Cup ${STANDINGS_SEASON}</span>
          <h3 class="standings-title">${escapeHtml(groupName)}</h3>
          <p class="standings-subtitle">Belgium · Egypt · Iran · New Zealand</p>
        </div>
      </div>
      ${renderGroupGTableMarkup()}
    </div>
  `;
}

function renderClubPageContent(facts, team) {
  const isEgypt = team.name.toLowerCase() === 'egypt';

  return `
    ${isEgypt ? `
      <section class="club-block">
        <h3 class="club-block-title">World Cup Group G</h3>
        <div class="standings-card group-g-card group-g-card-compact">
          ${renderGroupGTableMarkup(true)}
        </div>
      </section>
    ` : ''}
    <section class="club-block">
      <h3 class="club-block-title">Facts <span class="club-facts-count">${facts.length}</span></h3>
      <ul class="club-facts club-facts-page">
        ${facts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join('')}
      </ul>
    </section>
  `;
}

function openClubPage(team, venue) {
  const tagClass = isNationalTeam(team) ? 'tag-national' : 'tag-club';
  const tagLabel = isNationalTeam(team) ? 'NATIONAL TEAM' : 'CLUB';
  const facts = loadAllFactsForTeam(team, venue);

  facts.forEach((fact) => allClubFacts.push({ team: team.name, fact, logo: team.logo }));
  activeClubView = { team, venue, facts };

  clubPageHeader.innerHTML = `
    <div class="club-page-hero">
      <div class="club-page-logo">
        <img src="${team.logo}" alt="${escapeHtml(team.name)}">
      </div>
      <div class="club-page-hero-info">
        <span class="fact-tag ${tagClass}">${tagLabel}</span>
        <h1 class="club-page-title">${escapeHtml(team.name)}</h1>
        ${venue?.name ? `<p class="club-page-meta">${escapeHtml(venue.name)}${venue.city ? ` · ${escapeHtml(venue.city)}` : ''}</p>` : ''}
        ${team.founded ? `<p class="club-page-meta">Founded ${team.founded}</p>` : ''}
      </div>
    </div>
  `;

  clubPageBody.innerHTML = renderClubPageContent(facts, team);
  homeView.hidden = true;
  clubPage.hidden = false;
  if (bottomNav) bottomNav.hidden = true;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function closeClubPage() {
  activeClubView = null;
  clubPage.hidden = true;
  homeView.hidden = false;
  if (bottomNav) bottomNav.hidden = false;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function focusClubSearch() {
  document.getElementById('searchSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => clubSearch.focus(), 400);
}

function updateSearchHint() {
  if (teamsCache.length === 0) {
    searchHint.textContent = 'No clubs loaded';
    return;
  }
  searchHint.textContent = `${teamsCache.length} clubs — type to search`;
}

function renderSearchResults(matches, query) {
  if (!query.trim()) {
    searchResults.innerHTML = '';
    searchResults.classList.remove('is-visible');
    updateSearchHint();
    return;
  }

  searchResults.classList.add('is-visible');
  searchHint.textContent = matches.length === 1 ? '1 club found' : `${matches.length} clubs found`;

  if (matches.length === 0) {
    searchResults.innerHTML = `<p class="search-empty">No clubs found for "<strong>${escapeHtml(query)}</strong>"</p>`;
    return;
  }

  searchResults.innerHTML = matches.map((item) => {
    const team = item.team;
    const tagClass = isNationalTeam(team) ? 'tag-national' : 'tag-club';
    const tagLabel = isNationalTeam(team) ? 'NATIONAL' : 'CLUB';
    return `
      <button type="button" class="search-result-item" data-team-id="${team.id}">
        <img src="${team.logo}" alt="" class="search-result-logo">
        <div class="search-result-info">
          <span class="search-result-name">${escapeHtml(team.name)}</span>
          ${item.venue?.city ? `<span class="search-result-meta">${escapeHtml(item.venue.city)}</span>` : ''}
        </div>
        <span class="fact-tag ${tagClass} search-result-tag">${tagLabel}</span>
        <svg class="search-result-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </button>
    `;
  }).join('');

  searchResults.querySelectorAll('.search-result-item').forEach((btn) => {
    const id = Number(btn.dataset.teamId);
    const item = teamsCache.find((t) => t.team.id === id);
    if (item) {
      btn.addEventListener('click', () => openClubPage(item.team, item.venue));
    }
  });
}

function handleClubSearch() {
  const query = clubSearch.value;
  const q = query.trim().toLowerCase();

  if (!q) {
    renderSearchResults([], query);
    return;
  }

  const matches = teamsCache.filter((item) => {
    const name = item.team.name.toLowerCase();
    const city = item.venue?.city?.toLowerCase() || '';
    const code = item.team.code?.toLowerCase() || '';
    return name.includes(q) || city.includes(q) || code.includes(q);
  });

  renderSearchResults(matches, query);
}

function showTeamsError(message) {
  searchHint.textContent = 'Could not load clubs';
  searchResults.innerHTML = `
    <div class="api-error">
      <p>Could not load clubs. Check your connection and try again.</p>
      <p class="api-error-detail">${escapeHtml(message)}</p>
      <button class="btn btn-primary" id="retryTeamsBtn">Try Again</button>
    </div>
  `;
  searchResults.classList.add('is-visible');
  document.getElementById('retryTeamsBtn')?.addEventListener('click', loadEgyptTeams);
}

function showRandomClubFact() {
  if (allClubFacts.length === 0) return;

  const pick = allClubFacts[Math.floor(Math.random() * allClubFacts.length)];
  const html = `<strong>${escapeHtml(pick.team)}:</strong> ${escapeHtml(pick.fact)}`;

  dykText.style.opacity = '0';
  dykText.style.transform = 'translateY(6px)';

  setTimeout(() => {
    dykText.innerHTML = html;
    dykText.style.transition = 'opacity 0.3s, transform 0.3s';
    dykText.style.opacity = '1';
    dykText.style.transform = 'translateY(0)';
  }, 200);

  document.querySelector('.did-you-know').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

async function loadEgyptTeams() {
  allClubFacts = [];
  teamsCache = [];
  activeClubView = null;
  clubSearch.value = '';
  searchResults.innerHTML = '';
  searchResults.classList.remove('is-visible');
  searchHint.textContent = 'Loading clubs…';
  standingsSection.innerHTML = '<div class="standings-skeleton"></div>';

  try {
    const teamsResult = await fetchFromApi('/teams?country=Egypt');
    const teams = teamsResult.response || [];

    if (teams.length === 0) {
      searchHint.textContent = 'No clubs found';
      renderStandingsSection();
      return;
    }

    teams.sort((a, b) => {
      const aNational = isNationalTeam(a.team) ? 0 : 1;
      const bNational = isNationalTeam(b.team) ? 0 : 1;
      if (aNational !== bNational) return aNational - bNational;
      return a.team.name.localeCompare(b.team.name);
    });

    teamsCache = teams;
    updateSearchHint();
    renderStandingsSection();

    buildGlobalStandingsFacts().forEach((fact) => {
      allClubFacts.push({ team: 'Egypt', fact, logo: getEgyptNationalTeam()?.logo || '' });
    });

    const egyptTeam = getEgyptNationalTeam();
    if (egyptTeam) {
      buildStandingsFacts(egyptTeam.name).forEach((fact) => {
        allClubFacts.push({ team: egyptTeam.name, fact, logo: egyptTeam.logo });
      });
    }

    clubsStat.textContent = String(teams.length);
    factsStat.textContent = `${teams.length * 20}+`;
    clubsCategoryCount.textContent = `${teams.length} Clubs`;

    if (allClubFacts.length > 0) {
      const first = allClubFacts[0];
      dykText.innerHTML = `<strong>${escapeHtml(first.team)}:</strong> ${escapeHtml(first.fact)}`;
    }
  } catch (error) {
    console.error('Error fetching teams:', error);
    clubsStat.textContent = '—';
    factsStat.textContent = '—';
    clubsCategoryCount.textContent = 'Unavailable';
    renderStandingsSection();
    showTeamsError(error.message);
  }
}

clubPageBack.addEventListener('click', closeClubPage);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !clubPage.hidden) closeClubPage();
});
clubSearch.addEventListener('input', handleClubSearch);
randomFactBtn.addEventListener('click', showRandomClubFact);
exploreFactsBtn.addEventListener('click', focusClubSearch);
clubsCategoryBtn.addEventListener('click', focusClubSearch);

loadEgyptTeams();
