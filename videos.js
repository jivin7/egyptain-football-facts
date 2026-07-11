const videoFeed = document.getElementById('videoFeed');
const commentSheet = document.getElementById('commentSheet');
const commentList = document.getElementById('commentList');
const commentForm = document.getElementById('commentForm');
const commentInput = document.getElementById('commentInput');
const commentClose = document.getElementById('commentClose');
const commentBackdrop = document.getElementById('commentBackdrop');
const toast = document.getElementById('toast');

let videoLikes = EffStorage.getVideoLikes();
let videoSaves = EffStorage.getVideoSaves();
let videoComments = EffStorage.getVideoComments();
let activeCommentVideoId = null;
let videoObserver = null;
let toastTimer = null;
let lastVideoTap = 0;
let videoFeedSoundBound = false;

const VIDEO_SOUND_ON_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';

function getVideoById(id) {
  return FOOTBALL_VIDEOS.find((v) => v.id === id);
}

function persistVideoStorage() {
  EffStorage.saveVideoLikes(videoLikes);
  EffStorage.saveVideoSaves(videoSaves);
  EffStorage.saveVideoComments(videoComments);
}

function getLikeCount(video) {
  return video.baseLikes + (videoLikes[video.id] ? 1 : 0);
}

function getCommentCount(videoId) {
  return (videoComments[videoId] || []).length;
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2200);
}

function enableVideoSound() {
  videoFeed?.querySelectorAll('video').forEach((video) => {
    video.muted = false;
    video.volume = 1;
  });
}

function playVideoAudible(video) {
  if (!video) return;
  video.muted = false;
  video.volume = 1;
  const attempt = video.play();
  if (attempt?.catch) {
    attempt.catch(() => {
      video.muted = true;
      video.play()?.catch(() => {});
    });
  }
}

function renderVideoFeed() {
  if (!videoFeed) return;

  videoFeed.innerHTML = FOOTBALL_VIDEOS.map((video) => {
    const liked = Boolean(videoLikes[video.id]);
    const saved = Boolean(videoSaves[video.id]);
    const comments = getCommentCount(video.id);

    return `
      <article class="video-slide" data-video-id="${video.id}">
        <video class="video-player" src="${video.src}" poster="${video.poster}" playsinline loop preload="metadata"></video>
        <div class="video-gradient"></div>
        <div class="video-like-burst" aria-hidden="true">❤️</div>
        <div class="video-info">
          <div class="video-user">
            <img src="${video.avatar}" alt="" class="video-avatar">
            <span class="video-username">${EffStorage.escapeHtml(video.username)}</span>
          </div>
          <p class="video-caption">${EffStorage.escapeHtml(video.caption)}</p>
          <p class="video-tags">${EffStorage.escapeHtml(video.tags)}</p>
        </div>
        <div class="video-actions">
          <button type="button" class="video-action-btn ${liked ? 'is-liked' : ''}" data-action="like" data-video-id="${video.id}" aria-label="Like">
            <span class="video-action-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="${liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </span>
            <span class="video-action-count" data-like-count="${video.id}">${EffStorage.formatVideoCount(getLikeCount(video))}</span>
          </button>
          <button type="button" class="video-action-btn" data-action="comment" data-video-id="${video.id}" aria-label="Comment">
            <span class="video-action-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </span>
            <span class="video-action-count" data-comment-count="${video.id}">${EffStorage.formatVideoCount(comments)}</span>
          </button>
          <button type="button" class="video-action-btn" data-action="share" data-video-id="${video.id}" aria-label="Share">
            <span class="video-action-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            </span>
            <span class="video-action-count">Share</span>
          </button>
          <button type="button" class="video-action-btn ${saved ? 'is-saved' : ''}" data-action="save" data-video-id="${video.id}" aria-label="Save">
            <span class="video-action-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="${saved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            </span>
            <span class="video-action-count">Save</span>
          </button>
        </div>
      </article>
    `;
  }).join('');

  setupVideoPlayback();
  bindVideoActions();
  enableVideoSound();
}

function setupVideoPlayback() {
  if (videoObserver) videoObserver.disconnect();
  const videos = videoFeed.querySelectorAll('video');
  videos.forEach((video) => {
    video.muted = false;
    video.volume = 1;
  });

  videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
        videos.forEach((v) => { if (v !== video) v.pause(); });
        playVideoAudible(video);
      } else if (!entry.isIntersecting) {
        video.pause();
      }
    });
  }, { threshold: [0.55, 0.75] });

  videos.forEach((video) => videoObserver.observe(video));
}

function updateVideoLikeUI(videoId) {
  const video = getVideoById(videoId);
  if (!video) return;
  const btn = videoFeed.querySelector(`[data-action="like"][data-video-id="${videoId}"]`);
  const countEl = videoFeed.querySelector(`[data-like-count="${videoId}"]`);
  if (btn) btn.classList.toggle('is-liked', Boolean(videoLikes[videoId]));
  if (countEl) countEl.textContent = EffStorage.formatVideoCount(getLikeCount(video));
}

function updateVideoSaveUI(videoId) {
  const btn = videoFeed.querySelector(`[data-action="save"][data-video-id="${videoId}"]`);
  if (btn) btn.classList.toggle('is-saved', Boolean(videoSaves[videoId]));
}

function updateVideoCommentCount(videoId) {
  const countEl = videoFeed.querySelector(`[data-comment-count="${videoId}"]`);
  if (countEl) countEl.textContent = EffStorage.formatVideoCount(getCommentCount(videoId));
}

function toggleVideoLike(videoId, showBurst = false) {
  if (videoLikes[videoId]) delete videoLikes[videoId];
  else videoLikes[videoId] = true;
  persistVideoStorage();
  updateVideoLikeUI(videoId);
  if (showBurst) {
    const burst = videoFeed.querySelector(`[data-video-id="${videoId}"] .video-like-burst`);
    if (burst) {
      burst.classList.remove('show');
      void burst.offsetWidth;
      burst.classList.add('show');
    }
  }
}

function toggleVideoSave(videoId) {
  if (videoSaves[videoId]) delete videoSaves[videoId];
  else videoSaves[videoId] = true;
  persistVideoStorage();
  updateVideoSaveUI(videoId);
  showToast(videoSaves[videoId] ? 'Video saved — see Saved page' : 'Removed from saved');
}

async function shareVideo(videoId) {
  const video = getVideoById(videoId);
  if (!video) return;
  const shareData = {
    title: 'Egyptian Football Facts',
    text: `${video.caption} ${video.tags}`,
    url: `${window.location.origin}${window.location.pathname}#video-${videoId}`,
  };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      showToast('Shared!');
      return;
    } catch (err) {
      if (err.name === 'AbortError') return;
    }
  }
  try {
    await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
    showToast('Link copied');
  } catch {
    showToast('Could not share');
  }
}

function openCommentSheet(videoId) {
  activeCommentVideoId = videoId;
  renderCommentList();
  commentSheet.hidden = false;
  commentInput?.focus();
}

function closeCommentSheet() {
  commentSheet.hidden = true;
  activeCommentVideoId = null;
  if (commentInput) commentInput.value = '';
}

function renderCommentList() {
  if (!commentList || !activeCommentVideoId) return;
  const comments = videoComments[activeCommentVideoId] || [];
  if (!comments.length) {
    commentList.innerHTML = '<li class="comment-empty">No comments yet — be the first!</li>';
    return;
  }
  commentList.innerHTML = comments.map((c) => `
    <li class="comment-item">
      <strong>${EffStorage.escapeHtml(c.user)}</strong>${EffStorage.escapeHtml(c.text)}
      <time>${EffStorage.escapeHtml(c.timeLabel)}</time>
    </li>
  `).join('');
}

function addComment(text) {
  if (!activeCommentVideoId || !text.trim()) return;
  if (!videoComments[activeCommentVideoId]) videoComments[activeCommentVideoId] = [];
  videoComments[activeCommentVideoId].unshift({
    user: 'You',
    text: text.trim(),
    timeLabel: 'Just now',
  });
  persistVideoStorage();
  renderCommentList();
  updateVideoCommentCount(activeCommentVideoId);
}

function bindVideoActions() {
  if (!videoFeedSoundBound && videoFeed) {
    videoFeed.addEventListener('pointerdown', enableVideoSound);
    videoFeedSoundBound = true;
  }

  videoFeed.querySelectorAll('.video-slide').forEach((slide) => {
    slide.addEventListener('click', (e) => {
      if (e.target.closest('.video-actions')) return;
      enableVideoSound();
      const now = Date.now();
      const videoId = slide.dataset.videoId;
      if (now - lastVideoTap < 300) {
        if (!videoLikes[videoId]) toggleVideoLike(videoId, true);
        lastVideoTap = 0;
      } else {
        lastVideoTap = now;
        const video = slide.querySelector('video');
        if (video) {
          video.muted = false;
          if (video.paused) playVideoAudible(video);
          else video.pause();
        }
      }
    });
  });

  videoFeed.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    e.stopPropagation();
    const { action, videoId } = btn.dataset;
    if (!videoId) return;
    if (action === 'like') toggleVideoLike(videoId, true);
    if (action === 'comment') openCommentSheet(videoId);
    if (action === 'share') shareVideo(videoId);
    if (action === 'save') toggleVideoSave(videoId);
  });
}

commentClose?.addEventListener('click', closeCommentSheet);
commentBackdrop?.addEventListener('click', closeCommentSheet);
commentForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  addComment(commentInput.value);
  commentInput.value = '';
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && commentSheet && !commentSheet.hidden) closeCommentSheet();
});

renderVideoFeed();
enableVideoSound();
requestAnimationFrame(() => {
  const hashId = window.location.hash.replace('#video-', '');
  const target = hashId && getVideoById(hashId)
    ? videoFeed.querySelector(`[data-video-id="${hashId}"]`)
    : videoFeed.querySelector('.video-slide');
  target?.scrollIntoView();
  const video = target?.querySelector('video');
  if (video) playVideoAudible(video);
});
