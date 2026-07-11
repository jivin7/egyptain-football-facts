const EffStorage = (() => {
  const KEYS = {
    VIDEO_LIKES: 'eff_video_likes',
    VIDEO_SAVES: 'eff_video_saves',
    VIDEO_COMMENTS: 'eff_video_comments',
    FACT_SAVES: 'eff_fact_saves',
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

  function isFactSaved(team, fact) {
    const id = getFactId(team, fact);
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
  };
})();

window.EffStorage = EffStorage;
