const EffStorage = (() => {
  const KEYS = {
    VIDEO_LIKES: 'eff_video_likes',
    VIDEO_SAVES: 'eff_video_saves',
    VIDEO_COMMENTS: 'eff_video_comments',
    FACT_SAVES: 'eff_fact_saves',
    GAME_POINTS: 'eff_game_points',
    GAME_STATS: 'eff_game_stats',
    LIFE_DATA: 'eff_football_life',
  };

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function loadJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    } catch {
      return fallback;
    }
  }

  function saveJson(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function getVideoLikes() {
    return loadJson(KEYS.VIDEO_LIKES, {});
  }

  function getVideoSaves() {
    return loadJson(KEYS.VIDEO_SAVES, {});
  }

  function getVideoComments() {
    return loadJson(KEYS.VIDEO_COMMENTS, {});
  }

  function saveVideoLikes(data) {
    saveJson(KEYS.VIDEO_LIKES, data);
  }

  function saveVideoSaves(data) {
    saveJson(KEYS.VIDEO_SAVES, data);
  }

  function saveVideoComments(data) {
    saveJson(KEYS.VIDEO_COMMENTS, data);
  }

  function getFactId(team, fact) {
    const raw = `${team}::${fact}`;
    let hash = 0;
    for (let i = 0; i < raw.length; i += 1) {
      hash = ((hash << 5) - hash) + raw.charCodeAt(i);
      hash |= 0;
    }
    return `fact_${Math.abs(hash)}`;
  }

  function getSavedFacts() {
    return loadJson(KEYS.FACT_SAVES, []);
  }

  function isFactSaved(teamOrPick, fact) {
    let team = teamOrPick;
    let factText = fact;
    if (teamOrPick && typeof teamOrPick === 'object') {
      team = teamOrPick.team;
      factText = teamOrPick.fact;
    }
    const id = getFactId(team, factText);
    return getSavedFacts().some((item) => item.id === id);
  }

  function toggleSaveFact({ team, fact, logo = '' }) {
    const id = getFactId(team, fact);
    const saved = getSavedFacts();
    const index = saved.findIndex((item) => item.id === id);
    if (index >= 0) {
      saved.splice(index, 1);
      saveJson(KEYS.FACT_SAVES, saved);
      return false;
    }
    saved.unshift({
      id,
      team,
      fact,
      logo,
      savedAt: Date.now(),
    });
    saveJson(KEYS.FACT_SAVES, saved);
    return true;
  }

  function removeSavedFact(id) {
    const saved = getSavedFacts().filter((item) => item.id !== id);
    saveJson(KEYS.FACT_SAVES, saved);
  }

  function formatVideoCount(n) {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return String(n);
  }

  function getGamePoints() {
    const n = Number(localStorage.getItem(KEYS.GAME_POINTS) || 0);
    return Number.isFinite(n) ? n : 0;
  }

  function addGamePoints(amount) {
    const next = getGamePoints() + Math.max(0, Number(amount) || 0);
    localStorage.setItem(KEYS.GAME_POINTS, String(next));
    return next;
  }

  function spendGamePoints(amount) {
    const cost = Math.max(0, Number(amount) || 0);
    const cur = getGamePoints();
    if (cur < cost) return false;
    localStorage.setItem(KEYS.GAME_POINTS, String(cur - cost));
    return true;
  }

  function defaultLifeData() {
    return {
      name: 'JIVIN',
      skills: { speed: 22, shooting: 28, passing: 24, dribbling: 20 },
      houses: [],
      outfit: 'starter',
      lastTrainAt: 0,
    };
  }

  function getLifeData() {
    return { ...defaultLifeData(), ...loadJson(KEYS.LIFE_DATA, {}) };
  }

  function saveLifeData(data) {
    saveJson(KEYS.LIFE_DATA, data);
  }

  function getPlayerLevel() {
    const pts = getGamePoints();
    const stats = getGameStats();
    const xp = pts + stats.wins * 10;
    const level = Math.max(1, Math.floor(xp / 40) + 1);
    const into = xp % 40;
    return { level, xp, into, need: 40, progress: Math.round((into / 40) * 100) };
  }

  return {
    KEYS,
    escapeHtml,
    getVideoLikes,
    getVideoSaves,
    getVideoComments,
    saveVideoLikes,
    saveVideoSaves,
    saveVideoComments,
    getFactId,
    getSavedFacts,
    isFactSaved,
    toggleSaveFact,
    removeSavedFact,
    formatVideoCount,
    getGamePoints,
    addGamePoints,
    spendGamePoints,
    getGameStats,
    recordGameResult,
    getLifeData,
    saveLifeData,
    getPlayerLevel,
  };
})();

window.EffStorage = EffStorage;

