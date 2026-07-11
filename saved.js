const savedVideosList = document.getElementById('savedVideosList');
const savedFactsList = document.getElementById('savedFactsList');
const savedVideosCount = document.getElementById('savedVideosCount');
const savedFactsCount = document.getElementById('savedFactsCount');
const reconnectBtn = document.getElementById('reconnectApiBtn');
const reconnectStatus = document.getElementById('reconnectStatus');

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
    savedFactsList.innerHTML = '<p class="saved-empty">No saved facts yet. Tap the bookmark on any fact on the <a href="index.html">home page</a>.</p>';
    return;
  }

  savedFactsList.innerHTML = facts.map((item) => `
    <article class="saved-fact-card" data-fact-id="${item.id}">
      <div class="saved-fact-head">
        ${item.logo ? `<img src="${item.logo}" alt="" class="saved-fact-logo">` : ''}
        <strong class="saved-fact-team">${EffStorage.escapeHtml(item.team)}</strong>
        <button type="button" class="saved-fact-remove" data-remove-fact="${item.id}" aria-label="Remove">×</button>
      </div>
      <p class="saved-fact-text">${EffStorage.escapeHtml(item.fact)}</p>
    </article>
  `).join('');

  savedFactsList.querySelectorAll('[data-remove-fact]').forEach((btn) => {
    btn.addEventListener('click', () => {
      EffStorage.removeSavedFact(btn.dataset.removeFact);
      renderSavedFacts();
    });
  });
}

async function connectToApi(fullReload = false) {
  reconnectBtn.disabled = true;
  reconnectStatus.textContent = 'Connecting to API…';
  reconnectStatus.className = 'reconnect-status';

  try {
    const data = await apiFetch('/teams?country=Egypt');
    const count = (data.response || []).length;
    reconnectStatus.textContent = `Connected — ${count} Egypt teams found.`;
    reconnectStatus.className = 'reconnect-status reconnect-status-ok';

    if (fullReload) {
      reconnectStatus.textContent += ' Reloading home page…';
      setTimeout(() => { window.location.href = 'index.html?refresh=1'; }, 600);
    }
  } catch (err) {
    reconnectStatus.textContent = err.message;
    reconnectStatus.className = 'reconnect-status reconnect-status-error';
  } finally {
    reconnectBtn.disabled = false;
  }
}

reconnectBtn?.addEventListener('click', () => connectToApi(true));

renderSavedVideos();
renderSavedFacts();
connectToApi(false);
