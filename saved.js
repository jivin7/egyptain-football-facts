const savedVideosList = document.getElementById('savedVideosList');
const savedFactsList = document.getElementById('savedFactsList');
const savedVideosCount = document.getElementById('savedVideosCount');
const savedFactsCount = document.getElementById('savedFactsCount');

function renderSavedVideos() {
  const videoSaves = EffStorage.getVideoSaves();
  const savedIds = Object.keys(videoSaves).filter((id) => videoSaves[id]);
  savedVideosCount.textContent = `${savedIds.length} video${savedIds.length === 1 ? '' : 's'}`;

  if (!savedIds.length) {
    savedVideosList.innerHTML = '<p class="saved-empty">No saved videos. Tap Save on any reel in <a href="videos.html">Videos</a>.</p>';
    return;
  }

  savedVideosList.innerHTML = savedIds.map((id) => {
    const video = FOOTBALL_VIDEOS.find((v) => v.id === id);
    if (!video) return '';
    return `
      <a href="videos.html#video-${video.id}" class="saved-card">
        <img src="${video.poster}" alt="" class="saved-thumb">
        <div class="saved-card-body">
          <p class="saved-card-user">${EffStorage.escapeHtml(video.username)}</p>
          <p class="saved-card-caption">${EffStorage.escapeHtml(video.caption)}</p>
        </div>
      </a>
    `;
  }).join('');
}

function renderSavedFacts() {
  const facts = EffStorage.getSavedFacts();
  savedFactsCount.textContent = `${facts.length} fact${facts.length === 1 ? '' : 's'}`;

  if (!facts.length) {
    savedFactsList.innerHTML = '<p class="saved-empty">No saved facts yet. Browse <a href="facts.html">Facts</a> or tap Did You Know on the <a href="index.html">home page</a>.</p>';
    return;
  }

  savedFactsList.innerHTML = facts.map((item) => `
    <article class="saved-fact-card" data-fact-id="${item.id}">
      <div class="saved-fact-head">
        <strong class="saved-fact-team">${EffStorage.escapeHtml(item.team)}</strong>
        <button type="button" class="saved-fact-remove" data-remove-fact="${item.id}" aria-label="Remove">×</button>
      </div>
      <p class="saved-fact-text">${EffStorage.escapeHtml(item.fact)}</p>
      ${item.clubId ? `<a class="saved-fact-link" href="facts.html?club=${encodeURIComponent(item.clubId)}">Open club facts →</a>` : ''}
    </article>
  `).join('');

  savedFactsList.querySelectorAll('[data-remove-fact]').forEach((btn) => {
    btn.addEventListener('click', () => {
      EffStorage.removeSavedFact(btn.dataset.removeFact);
      renderSavedFacts();
    });
  });
}

renderSavedVideos();
renderSavedFacts();
