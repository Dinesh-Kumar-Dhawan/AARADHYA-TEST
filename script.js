/* =============================================================
   AARADHYA — interaction layer
   Orchestrates: carousel · card→detail FLIP · chapter player ·
   cursor · keyboard · ambient.
   ============================================================= */

import { SCENES, THUMBS } from "./scenes.js";

/* ---------- DATA ---------- */

const CARDS = [
  { id:'elevation', type:'Overview', num:'I',
    eyebrow:'Overview', title:'Elevation', sub:'A view, from above',
    color:'#3d4a33', image:'First Frame/1.1.png',
    desc:'An architectural prologue — the elevation drawing, the first outline of a building before it becomes a home. A line, then a shadow, then a wall.' },

  { id:'arrival', type:'Overview', num:'II',
    eyebrow:'Overview', title:'Your Royal Arrival', sub:'The driveway, the doorway',
    color:'#5c3a20', image:'First Frame/2.1.png',
    desc:'Arrival is the first chapter of every visit. A landscaped approach, a porte-cochère, a marble hush — the slow ceremony of coming home.' },

  { id:'aravalli', type:'Residence', num:'III',
    eyebrow:'The Residences', title:'The Aravalli Residences', sub:'At the foot of old hills',
    color:'#1e3d30', image:'First Frame/3.1.png',
    desc:'Stone, shadow, and the long shoulders of hills. Homes oriented to catch first light against the ranges — each living room a landscape framed.' },

  { id:'garden', type:'Residence', num:'IV',
    eyebrow:'The Residences', title:'The Garden Residences', sub:'Where every window holds green',
    color:'#3e5623', image:'First Frame/4.1.png',
    desc:'Terraced lawns and private courtyards. A residence for those who prefer the slow conversation of leaves — and are happy to let a morning pass at a window.' },

  { id:'city', type:'Residence', num:'V',
    eyebrow:'The Residences', title:'The City Residences', sub:'Above the hum',
    color:'#2b2017', image:'First Frame/5.1.png',
    desc:'Skyline suites positioned above the city\'s current. Wide glass, low horizons, and the practiced calm of a building that knows exactly what it is.' },

  { id:'raj', type:'Amenity', num:'VI',
    eyebrow:'Amenity', title:'Raj Aangan', sub:'The Royal Courtyard',
    color:'#6b2a14', image:'First Frame/6.1.png',
    desc:'An open square ringed by carved arcades. In the evenings, the courtyard becomes a stage for tea, conversation, and the slow passage of sandstone light.' },

  { id:'taal', type:'Amenity', num:'VII',
    eyebrow:'Amenity', title:'Taran Taal', sub:'The Swimming Waters',
    color:'#1f4a5c', image:'First Frame/7.1.png',
    desc:'A long basin, edged in travertine. Cool at dawn, copper at sunset — an architecture of stillness and shimmer.' },

  { id:'pranayam', type:'Amenity', num:'VIII',
    eyebrow:'Amenity', title:'Pranayam Kaksh', sub:'Room of Breath',
    color:'#6e4a1e', image:'First Frame/8.1.png',
    desc:'A low-lit pavilion for yoga and stillness. The floor is teak, the walls are breath, and the ceiling keeps a particular silence.' },

  { id:'krida', type:'Amenity', num:'IX',
    eyebrow:'Amenity', title:'Krida Ksherta', sub:'The Playing Field',
    color:'#2a6347', image:'First Frame/9.1.png',
    desc:'Courts, lawns, and a quarter-mile loop for the long walks that end conversations and begin others. A field for the body and the afternoon.' },

  { id:'vatika', type:'Amenity', num:'X',
    eyebrow:'Amenity', title:'Vatika', sub:'The Garden',
    color:'#3d5523', image:'First Frame/10.1.png',
    desc:'Three acres planted by hand — jasmine, champa, neem. A path that finds no particular destination, by design.' },
];

/* Per-card CTA labels, keyed by card id */
const CARD_CHAPTERS = {
  elevation: ['The Splendor', 'The Grandness', 'The Magnificence'],
  arrival:   ['Welcome', 'Happy Diwali', 'Say Hi!'],
  aravalli:  ['Evening Tea', 'Beautiful Night', 'Hi Little Fellow!'],
  garden:    ["Let's Picnic", 'Seasons', 'The Perfect Partner'],
  city:      ['The Right Decision', 'Book by the Balcony', 'Pranam Dada ji'],
  raj:       ['Hi Pixie!', 'Burst a Bubble', 'Namaste'],
  taal:      ['Thirsty Bird', 'A Refreshing Dive', 'Hi Neighbour!'],
  pranayam:  ['Virabhadrasana', 'Vrikshasana', 'Adho Mukha Svanasana'],
  krida:     ["Let's Play!", 'Happy Holi!', 'A bit of Splash!'],
  vatika:    ['The Night Changes', 'A bit of Magic', 'Aaradhya'],
};

/* Thumb art cycles through these three for chapters 1 / 2 / 3 */
const THUMB_ORDER = ['walk', 'story', 'life'];
const DEFAULT_DUR = '0:42';

/* ---------- HELPERS ---------- */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function renderScene(sceneId, color) {
  const fn = SCENES[sceneId];
  return fn ? fn(color) : '';
}
function renderThumb(thumbId, color) {
  const fn = THUMBS[thumbId];
  return fn ? fn(color) : '';
}

function parseDur(s) { const [m, sec] = s.split(':').map(Number); return m*60 + sec; }
function fmtDur(n)   { const m = Math.floor(n/60); const s = Math.floor(n%60); return `${m}:${String(s).padStart(2,'0')}`; }

/* ---------- AMBIENT ---------- */
const ambientScene = $('#ambientScene');
function setAmbient(card) {
  ambientScene.innerHTML = `<img src="${encodeURI(card.image)}" alt="${card.title}">`;
}
setAmbient(CARDS[0]);

/* ---------- HERO / COVER ---------- */
const coverEyebrowText = $('#coverEyebrowText');
const coverTitle       = $('#coverTitle');
const coverDesc        = $('#coverDesc');
const coverPlay        = $('#coverPlay');
const coverDots        = $('#coverDots');

/* ---------- CAROUSEL ---------- */
const carTrack    = $('#carTrack');
const carPrev     = $('#carPrev');
const carNext     = $('#carNext');
const pageCurrent = $('#pageCurrent');
const pageTotal   = $('#pageTotal');
const pageFill    = $('#pageFill');

pageTotal.textContent = String(CARDS.length).padStart(2, '0');

/* build the hero pagination dots once */
coverDots.innerHTML = CARDS.map((_, i) =>
  `<button class="cover-dot" data-i="${i}" aria-label="Go to chapter ${i + 1}"></button>`
).join('');
coverDots.addEventListener('click', (e) => {
  const dot = e.target.closest('.cover-dot');
  if (dot) scrollToCard(parseInt(dot.dataset.i, 10));
});

function updateHero(card) {
  coverEyebrowText.textContent = `Chapter ${card.num} · ${card.type}`;
  coverTitle.textContent       = card.title;
  coverDesc.textContent        = card.desc;
}
coverPlay.addEventListener('click', () => {
  if (focusedIndex >= 0) openDetail(focusedIndex);
});

carTrack.innerHTML = CARDS.map((card, i) => `
  <button class="card" data-i="${i}" style="--c:${card.color}" aria-label="Open ${card.title}">
    <div class="card-media"><img src="${encodeURI(card.image)}" alt="${card.title}" loading="lazy" draggable="false"></div>
    <div class="card-scrim"></div>
    <div class="card-vignette"></div>
    <div class="card-meta">
      <h3 class="card-title">${card.title}</h3>
    </div>
  </button>
`).join('');

const cards = $$('.card', carTrack);
let focusedIndex = -1;

/* parallax on card hover — only on fine-pointer (mouse) devices */
const IS_TOUCH = matchMedia('(pointer: coarse)').matches;
if (!IS_TOUCH) {
  cards.forEach(card => {
    const media = card.querySelector('.card-media');
    card.addEventListener('mousemove', e => {
      if (dragging) return; // ignore parallax while dragging the carousel
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      media.style.transform = `translate(${x * -12}px, ${y * -12}px) scale(1.04)`;
    });
    card.addEventListener('mouseleave', () => { media.style.transform = ''; });
  });
}

/* ---------- SMOOTH DRAGGABLE CAROUSEL (mouse — touch already scrolls natively) ---------- */
let dragging = false;
let dragStartX = 0;
let dragStartScroll = 0;
let dragLastX = 0;
let dragLastTime = 0;
let dragVelocity = 0;    /* px per millisecond, in scrollLeft direction */
let dragMoved = false;
let momentumId = null;

const DRAG_MOVE_THRESHOLD = 8;   /* px of wobble allowed before we treat it as a drag */
const MOMENTUM_DECAY      = 0.93;
const MOMENTUM_MIN        = 0.25;
const MOMENTUM_FRAME_MS   = 16;

function cancelMomentum() {
  if (momentumId !== null) { cancelAnimationFrame(momentumId); momentumId = null; }
}

carTrack.addEventListener('pointerdown', (e) => {
  if (e.pointerType !== 'mouse' || e.button !== 0) return;
  cancelMomentum();
  dragging = true;
  dragMoved = false;
  dragStartX    = dragLastX = e.clientX;
  dragStartScroll = carTrack.scrollLeft;
  dragLastTime  = performance.now();
  dragVelocity  = 0;
  /* disable CSS snap + smooth-scroll so JS moves scrollLeft freely */
  carTrack.style.scrollBehavior = 'auto';
  carTrack.style.scrollSnapType = 'none';
  carTrack.style.userSelect     = 'none';
  /* NOTE: no setPointerCapture — it would redirect the later `click` event
     to carTrack and prevent the per-card click from firing. */
});

carTrack.addEventListener('pointermove', (e) => {
  if (!dragging) return;
  const now = performance.now();
  const dx  = e.clientX - dragLastX;
  const dt  = Math.max(1, now - dragLastTime);
  /* running velocity = px/ms in scroll direction (opposite of mouse x) */
  dragVelocity = -dx / dt;
  dragLastX    = e.clientX;
  dragLastTime = now;

  const total = e.clientX - dragStartX;
  if (Math.abs(total) > DRAG_MOVE_THRESHOLD) dragMoved = true;
  carTrack.scrollLeft = dragStartScroll - total;
});

function snapToNearest() {
  const trackRect = carTrack.getBoundingClientRect();
  const centerX   = trackRect.left + trackRect.width / 2;
  let bestIdx = 0, bestDist = Infinity;
  for (let i = 0; i < cards.length; i++) {
    const r = cards[i].getBoundingClientRect();
    const d = Math.abs((r.left + r.width / 2) - centerX);
    if (d < bestDist) { bestDist = d; bestIdx = i; }
  }
  cards[bestIdx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

function endDrag() {
  if (!dragging) return;
  dragging = false;
  carTrack.style.userSelect = '';

  const finishMomentum = () => {
    carTrack.style.scrollSnapType = '';
    carTrack.style.scrollBehavior = '';
    momentumId = null;
    snapToNearest();
  };

  let v = dragVelocity * MOMENTUM_FRAME_MS;  /* → per-frame pixels */

  /* flick too small? just snap */
  if (Math.abs(v) < MOMENTUM_MIN * 1.5) { finishMomentum(); return; }

  const step = () => {
    carTrack.scrollLeft += v;
    v *= MOMENTUM_DECAY;
    if (Math.abs(v) < MOMENTUM_MIN) { finishMomentum(); return; }
    momentumId = requestAnimationFrame(step);
  };
  momentumId = requestAnimationFrame(step);
}

carTrack.addEventListener('pointerup', endDrag);
carTrack.addEventListener('pointercancel', endDrag);
carTrack.addEventListener('pointerleave', endDrag);

/* block the browser's native image-drag ghost */
carTrack.addEventListener('dragstart', (e) => e.preventDefault());

/* focused card = closest to the carousel's horizontal center */
let scrollTicking = false;
function updateFocused() {
  scrollTicking = false;
  const trackRect = carTrack.getBoundingClientRect();
  const centerX = trackRect.left + trackRect.width / 2;
  let bestIdx = 0, bestDist = Infinity;
  for (let i = 0; i < cards.length; i++) {
    const r = cards[i].getBoundingClientRect();
    const d = Math.abs((r.left + r.width / 2) - centerX);
    if (d < bestDist) { bestDist = d; bestIdx = i; }
  }
  if (bestIdx !== focusedIndex) setFocused(bestIdx);
}
carTrack.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(updateFocused);
}, { passive: true });

/* let mouse-wheel scroll the carousel horizontally */
carTrack.addEventListener('wheel', (e) => {
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    e.preventDefault();
    carTrack.scrollLeft += e.deltaY;
  }
}, { passive: false });

function setFocused(i) {
  if (i === focusedIndex) return;
  focusedIndex = i;
  cards.forEach((c, idx) => c.classList.toggle('focused', idx === i));
  pageCurrent.textContent = String(i + 1).padStart(2, '0');
  pageFill.style.width = ((i + 1) / CARDS.length * 100) + '%';
  /* hero ambient + text sync with the focused card */
  setAmbient(CARDS[i]);
  updateHero(CARDS[i]);
  /* active dot */
  const dots = coverDots.children;
  for (let k = 0; k < dots.length; k++) dots[k].classList.toggle('active', k === i);
  // arrow disabled states
  carPrev.disabled = i === 0;
  carNext.disabled = i === CARDS.length - 1;
}

function scrollToCard(i) {
  i = Math.max(0, Math.min(CARDS.length - 1, i));
  const target = cards[i];
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

carPrev.addEventListener('click', () => scrollToCard(focusedIndex - 1));
carNext.addEventListener('click', () => scrollToCard(focusedIndex + 1));

/* single delegated click handler — survives pointer-capture quirks and
   skips opening the detail view if the press was actually a drag */
carTrack.addEventListener('click', (e) => {
  if (dragMoved) { dragMoved = false; e.preventDefault(); return; }
  const card = e.target.closest('.card');
  if (!card) return;
  const i = parseInt(card.dataset.i, 10);
  scrollToCard(i);
  openDetail(i);
});

/* initial focus — wait a frame so layout is stable, then detect */
requestAnimationFrame(() => {
  cards[0] && cards[0].scrollIntoView({ inline: 'center', block: 'nearest' });
  requestAnimationFrame(updateFocused);
});
addEventListener('resize', updateFocused);

/* ---------- DETAIL VIEW ---------- */
const detail      = $('#detail');
const detailBg    = $('#detailBg');
const detailBack  = $('#detailBack');
const detailPrev  = $('#detailPrev');
const detailNext  = $('#detailNext');
const ctaTiles    = $('#ctaTiles');

let activeDetailIndex = -1;
let activeDetailOrigin = null;   // the actual element the FLIP should fly from/to

/* given a card index, find a sensible visible origin element for the FLIP.
   Prefers the active view's representation: grid card in grid view,
   list item in list view, otherwise the carousel card. */
function originElementForIndex(i) {
  const body = document.body;
  if (body.classList.contains('grid-view')) {
    const el = gridCards.querySelector(`.grid-card[data-i="${i}"]`);
    if (el) return el;
  }
  if (body.classList.contains('list-view')) {
    const el = sectionList.querySelector(`.section-list-item[data-i="${i}"]`);
    if (el) return el;
  }
  return cards[i];
}

function populateDetail(i) {
  const card = CARDS[i];
  detailBg.innerHTML = `<img src="${encodeURI(card.image)}" alt="${card.title}">`;

  const chapters = CARD_CHAPTERS[card.id] || [];
  ctaTiles.innerHTML = chapters.map((title, j) => `
    <button class="cta-tile" data-card="${i}" data-chapter="${j}"
            aria-label="Play ${title}">
      ${title}
    </button>
  `).join('');
}

function openDetail(i, originEl) {
  activeDetailIndex  = i;
  activeDetailOrigin = originEl || originElementForIndex(i);
  populateDetail(i);

  const rect = activeDetailOrigin.getBoundingClientRect();

  // Lock detailBg to the origin element's current rect
  detailBg.style.transition = 'none';
  detailBg.style.left   = rect.left + 'px';
  detailBg.style.top    = rect.top + 'px';
  detailBg.style.width  = rect.width + 'px';
  detailBg.style.height = rect.height + 'px';

  detail.classList.add('open');
  document.body.classList.add('detail-open');

  // Force reflow then animate to fullscreen
  void detailBg.offsetHeight;
  detailBg.style.transition = 'left 0.8s var(--ease), top 0.8s var(--ease), width 0.8s var(--ease), height 0.8s var(--ease)';
  requestAnimationFrame(() => {
    detailBg.style.left   = '0';
    detailBg.style.top    = '0';
    detailBg.style.width  = '100vw';
    detailBg.style.height = '100vh';
  });
}

function closeDetail() {
  if (activeDetailIndex < 0) return;
  /* re-fetch the origin in case the DOM moved (carousel scrolled, etc.) */
  const originEl = originElementForIndex(activeDetailIndex);
  const rect = (originEl || activeDetailOrigin).getBoundingClientRect();

  detailBg.style.transition = 'left 0.6s var(--ease), top 0.6s var(--ease), width 0.6s var(--ease), height 0.6s var(--ease)';
  detailBg.style.left   = rect.left + 'px';
  detailBg.style.top    = rect.top + 'px';
  detailBg.style.width  = rect.width + 'px';
  detailBg.style.height = rect.height + 'px';

  detail.classList.remove('open');
  document.body.classList.remove('detail-open');
  activeDetailIndex  = -1;
  activeDetailOrigin = null;
}

detailBack.addEventListener('click', closeDetail);

detailPrev.addEventListener('click', () => {
  const ni = activeDetailIndex > 0 ? activeDetailIndex - 1 : CARDS.length - 1;
  morphToCardInDetail(ni);
});
detailNext.addEventListener('click', () => {
  const ni = activeDetailIndex < CARDS.length - 1 ? activeDetailIndex + 1 : 0;
  morphToCardInDetail(ni);
});

/* Swap detail content in place when navigating between cards */
function morphToCardInDetail(i) {
  activeDetailIndex = i;
  // fade overlay elements briefly during swap
  detail.style.opacity = '0.3';
  setTimeout(() => {
    populateDetail(i);
    // align bg to full immediately
    detailBg.style.transition = 'none';
    detailBg.style.left = '0'; detailBg.style.top = '0';
    detailBg.style.width = '100vw'; detailBg.style.height = '100vh';
    detail.style.opacity = '';
    scrollToCard(i); // keep carousel in sync underneath
  }, 180);
}

/* ---------- PLAYER ---------- */
const player       = $('#player');
const playerScene  = $('#playerScene');
const pEyebrow     = $('#pEyebrow');
const pTitle       = $('#pTitle');
const pCur         = $('#pCur');
const pDur         = $('#pDur');
const pFill        = $('#pFill');
const pTrack       = $('#pTrack');
const pPlay        = $('#pPlay');
const pMute        = $('#pMute');
const pPrev        = $('#pPrev');
const pNext        = $('#pNext');
const pClose       = $('#pClose');
const playPulse    = $('#playPulse');
const playerCtas   = $('#playerCtas');

let videoEl = null;
let playerState = {
  card: 0, chapter: 0,
  playing: false,
  muted: localStorage.getItem('aaradhya.muted') === 'true',
};

function updateMute() { player.classList.toggle('muted', playerState.muted); }
updateMute();

function openPlayer(cardIdx, chapterIdx) {
  playerState.card = cardIdx;
  playerState.chapter = chapterIdx;
  const card      = CARDS[cardIdx];
  const chapters  = CARD_CHAPTERS[card.id] || [];
  const title     = chapters[chapterIdx] || 'Chapter';
  const num       = String(chapterIdx + 1).padStart(2, '0');
  const videoPath = `Final Videos/${cardIdx + 1}.${chapterIdx + 1}.mp4`;

  pEyebrow.textContent = `${card.title} · Chapter ${num}`;
  pTitle.textContent   = title;
  pCur.textContent     = '0:00';
  pDur.textContent     = '0:00';
  pFill.style.width    = '0%';

  /* inject the same chapter pills into the player overlay */
  playerCtas.innerHTML = chapters.map((t, j) => `
    <button class="cta-tile" data-card="${cardIdx}" data-chapter="${j}"
            ${j === chapterIdx ? 'aria-current="true"' : ''}>
      ${t}
    </button>
  `).join('');

  player.classList.add('open', 'loading');
  document.body.classList.add('player-open');

  // tear down any previous video element so we don't leak
  if (videoEl) { videoEl.pause(); videoEl.removeAttribute('src'); videoEl.load(); }
  playerScene.innerHTML = '';

  videoEl = document.createElement('video');
  videoEl.src         = encodeURI(videoPath);
  videoEl.playsInline = true;
  videoEl.preload     = 'auto';
  videoEl.muted       = playerState.muted;

  videoEl.addEventListener('loadedmetadata', () => {
    player.classList.remove('loading');
    pDur.textContent = fmtDur(videoEl.duration || 0);
    setPlay(true);
    /* chrome stays hidden after a pill click — user can reveal it with touch/mouse */
    hideChromeNow();
  });
  videoEl.addEventListener('timeupdate', () => {
    if (!videoEl.duration) return;
    pCur.textContent  = fmtDur(videoEl.currentTime);
    pFill.style.width = (videoEl.currentTime / videoEl.duration * 100) + '%';
  });
  videoEl.addEventListener('play',  () => { playerState.playing = true;  player.classList.add('playing'); });
  videoEl.addEventListener('pause', () => { playerState.playing = false; player.classList.remove('playing'); });
  /* when the video ends, close the player — user returns to the CTA frame */
  videoEl.addEventListener('ended', closePlayer);
  videoEl.addEventListener('error', () => {
    // if the file is missing or unplayable, still give the user controls
    player.classList.remove('loading');
  });

  playerScene.appendChild(videoEl);
}

function closePlayer() {
  if (videoEl) {
    videoEl.pause();
    videoEl.removeAttribute('src');
    videoEl.load();
    videoEl = null;
  }
  playerScene.innerHTML = '';
  playerState.playing = false;
  player.classList.remove('open', 'playing');
  document.body.classList.remove('player-open');
}

function setPlay(play) {
  if (!videoEl) return;
  if (play) videoEl.play().catch(() => {}); // silently eat autoplay-blocked
  else      videoEl.pause();
  /* playing-class state is synced via video 'play' / 'pause' events */
}

function togglePlay() {
  if (!videoEl) return;
  setPlay(videoEl.paused);
}

function prevChapter() {
  const chapters = CARD_CHAPTERS[CARDS[playerState.card].id] || [];
  const i = playerState.chapter > 0 ? playerState.chapter - 1 : chapters.length - 1;
  openPlayer(playerState.card, i);
}
function nextChapter() {
  const chapters = CARD_CHAPTERS[CARDS[playerState.card].id] || [];
  const i = playerState.chapter + 1;
  if (i >= chapters.length) {
    openPlayer((playerState.card + 1) % CARDS.length, 0);
  } else openPlayer(playerState.card, i);
}

pPlay.addEventListener('click', togglePlay);
pMute.addEventListener('click', () => {
  playerState.muted = !playerState.muted;
  localStorage.setItem('aaradhya.muted', String(playerState.muted));
  updateMute();
  if (videoEl) videoEl.muted = playerState.muted;
});
pPrev.addEventListener('click', prevChapter);
pNext.addEventListener('click', nextChapter);
pClose.addEventListener('click', closePlayer);

pTrack.addEventListener('click', (e) => {
  if (!videoEl || !videoEl.duration) return;
  const r = pTrack.getBoundingClientRect();
  const p = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
  videoEl.currentTime = p * videoEl.duration;
});

/* Chapter tile clicks — from the detail view */
ctaTiles.addEventListener('click', (e) => {
  const tile = e.target.closest('.cta-tile');
  if (!tile) return;
  openPlayer(parseInt(tile.dataset.card, 10), parseInt(tile.dataset.chapter, 10));
});

/* Chapter tile clicks — from the overlay inside the player */
playerCtas.addEventListener('click', (e) => {
  const tile = e.target.closest('.cta-tile');
  if (!tile) return;
  openPlayer(parseInt(tile.dataset.card, 10), parseInt(tile.dataset.chapter, 10));
});

/* Idle-hide controls */
let idleTimer;
function resetIdle() {
  player.classList.remove('idle');
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    if (playerState.playing) player.classList.add('idle');
  }, 2800);
}
/* Immediately hide all player chrome (pills, top, bottom) — used after a pill click */
function hideChromeNow() {
  clearTimeout(idleTimer);
  player.classList.add('idle');
}
player.addEventListener('mousemove', resetIdle);
player.addEventListener('touchstart', resetIdle, { passive: true });
player.addEventListener('touchmove',  resetIdle, { passive: true });
playerScene.parentElement.addEventListener('click', (e) => {
  /* tap on the video area: on desktop toggles play; on touch just reveals controls */
  if (e.target === playerScene || e.target.closest('.player-stage')) {
    if (!IS_TOUCH) togglePlay();
    resetIdle();
  }
});

/* ---------- KEYBOARD ---------- */
document.addEventListener('keydown', (e) => {
  if (player.classList.contains('open')) {
    if (e.key === 'Escape')     closePlayer();
    if (e.key === 'ArrowRight') nextChapter();
    if (e.key === 'ArrowLeft')  prevChapter();
    if (e.key === ' ')          { e.preventDefault(); togglePlay(); resetIdle(); }
    if (e.key.toLowerCase() === 'm') pMute.click();
    return;
  }
  if (detail.classList.contains('open')) {
    if (e.key === 'Escape')     closeDetail();
    if (e.key === 'ArrowRight') detailNext.click();
    if (e.key === 'ArrowLeft')  detailPrev.click();
    if (e.key === 'Enter')      {
      const firstTile = ctaTiles.querySelector('.cta-tile');
      if (firstTile) firstTile.click();
    }
    return;
  }
  // default: carousel nav
  if (e.key === 'ArrowRight') scrollToCard(focusedIndex + 1);
  if (e.key === 'ArrowLeft')  scrollToCard(focusedIndex - 1);
  if (e.key === 'Enter')      openDetail(focusedIndex);
});

/* ---------- CURSOR ---------- */
const cursorDot   = $('#cursorDot');
const cursorRing  = $('#cursorRing');
const cursorLabel = $('#cursorLabel');

let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });

(function loop() {
  rx += (mx - rx) * 0.2;
  ry += (my - ry) * 0.2;
  cursorDot.style.transform  = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
  cursorRing.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
  requestAnimationFrame(loop);
})();

function setCursor(state, label = '') {
  cursorRing.classList.remove('card', 'tile', 'link', 'close');
  if (state) cursorRing.classList.add(state);
  cursorLabel.textContent = label;
}
document.body.addEventListener('mouseover', (e) => {
  if (e.target.closest('.card'))             setCursor('card',  'Open');
  else if (e.target.closest('.cta-tile'))    setCursor('tile',  'Play');
  else if (e.target.closest('.detail-back') ||
           e.target.closest('.player-close'))setCursor('close', 'Close');
  else if (e.target.closest('a, button'))    setCursor('link',  '');
  else                                        setCursor(null,   '');
});

/* ---------- ALTERNATIVE HERO: side-list view ---------- */
const viewSwitcher = $('#viewSwitcher');
const sectionList  = $('#sectionList');
const listCtas     = $('#listCtas');

/* populate the section list once */
sectionList.innerHTML = CARDS.map((card, i) => `
  <button class="section-list-item" data-i="${i}" aria-label="${card.title}">
    <span class="section-list-num">${card.num}</span>
    <span class="section-list-title">${card.title}</span>
  </button>
`).join('');

let listSelectedIndex = -1;

function selectListItem(i) {
  if (i === listSelectedIndex) return;
  listSelectedIndex = i;
  const card = CARDS[i];
  setAmbient(card);  // switch hero image to selected section
  /* highlight the active item */
  const items = sectionList.querySelectorAll('.section-list-item');
  items.forEach((el, idx) => {
    el.setAttribute('aria-current', idx === i ? 'true' : 'false');
  });
  /* render this section's 3 chapter pills at the bottom */
  const chapters = CARD_CHAPTERS[card.id] || [];
  listCtas.innerHTML = chapters.map((title, j) => `
    <button class="cta-tile" data-card="${i}" data-chapter="${j}"
            aria-label="Play ${title}">${title}</button>
  `).join('');
}

sectionList.addEventListener('click', (e) => {
  const item = e.target.closest('.section-list-item');
  if (!item) return;
  selectListItem(parseInt(item.dataset.i, 10));
});

listCtas.addEventListener('click', (e) => {
  const tile = e.target.closest('.cta-tile');
  if (!tile) return;
  openPlayer(parseInt(tile.dataset.card, 10), parseInt(tile.dataset.chapter, 10));
});

/* ---------- GRID VIEW (third hero alternative) ---------- */
const gridCards = $('#gridCards');

gridCards.innerHTML = CARDS.map((card, i) => `
  <button class="grid-card" data-i="${i}" aria-label="Open ${card.title}">
    <img src="${encodeURI(card.image)}" alt="${card.title}" loading="lazy" draggable="false">
    <div class="scrim"></div>
    <div class="meta">
      <div class="num">${card.num}</div>
      <h3>${card.title}</h3>
    </div>
  </button>
`).join('');

gridCards.addEventListener('click', (e) => {
  const card = e.target.closest('.grid-card');
  if (!card) return;
  /* pass the grid-card itself as the FLIP origin so the detail view
     animates from where the user actually tapped, not from the hidden carousel */
  openDetail(parseInt(card.dataset.i, 10), card);
});

/* ---------- view switcher — three explicit toggles ---------- */
function setView(view) {
  const body = document.body;
  /* clear both alt-view classes; default (no class) = carousel */
  body.classList.remove('list-view', 'grid-view');

  if (view === 'list') {
    body.classList.add('list-view');
    const seed = focusedIndex >= 0 ? focusedIndex : 0;
    listSelectedIndex = -1;       /* force re-render even if same index */
    selectListItem(seed);
  } else if (view === 'grid') {
    body.classList.add('grid-view');
  } else {
    /* carousel — restore ambient to whatever the carousel is focused on */
    if (focusedIndex >= 0) setAmbient(CARDS[focusedIndex]);
  }

  /* sync active-state on all 3 buttons */
  viewSwitcher.querySelectorAll('.view-btn').forEach((b) => {
    b.setAttribute('aria-pressed', b.dataset.view === view ? 'true' : 'false');
  });
}

viewSwitcher.addEventListener('click', (e) => {
  const btn = e.target.closest('.view-btn');
  if (!btn) return;
  setView(btn.dataset.view);
});

/* ---------- RESIZE ---------- */
addEventListener('resize', () => {
  if (detail.classList.contains('open')) {
    detailBg.style.transition = 'none';
    detailBg.style.width  = '100vw';
    detailBg.style.height = '100vh';
  }
});

/* ---------- 30-SECOND INACTIVITY → RETURN TO HOME ---------- */
const IDLE_TIMEOUT_MS = 30000;
let idleReturnTimer;
function resetIdleReturn() {
  clearTimeout(idleReturnTimer);
  idleReturnTimer = setTimeout(returnToHome, IDLE_TIMEOUT_MS);
}
function returnToHome() {
  if (player.classList.contains('open')) closePlayer();
  if (detail.classList.contains('open')) closeDetail();
}
['click', 'touchstart', 'touchmove', 'touchend', 'keydown', 'wheel']
  .forEach(ev => document.addEventListener(ev, resetIdleReturn, { passive: true }));
/* keep timer alive while a video is actively playing */
setInterval(() => { if (videoEl && !videoEl.paused) resetIdleReturn(); }, 2000);
resetIdleReturn();
