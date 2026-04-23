# Aaradhya — assets folder

Drop your real media here and swap the SVG placeholders out in code.

## What goes where

```
assets/
├── cards/               ← horizontal card preview stills (1600×1000)
│   ├── elevation.jpg
│   ├── arrival.jpg
│   ├── aravalli.jpg
│   ├── garden.jpg
│   ├── city.jpg
│   ├── raj.jpg
│   ├── taal.jpg
│   ├── pranayam.jpg
│   ├── krida.jpg
│   ├── vatika.jpg
│   └── plans.jpg
│
├── scenes/              ← full-bleed detail-view stills (2400×1500)
│   └── (same filenames as cards/)
│
└── videos/              ← three short films per card (3 × 11 = 33 clips)
    ├── elevation/
    │   ├── walk.mp4
    │   ├── story.mp4
    │   └── life.mp4
    ├── arrival/
    │   └── …
    └── …
```

## How to swap placeholder SVGs for real media

### Card previews in the carousel
Open `script.js`, find where `carTrack.innerHTML` is built, and change:

```html
<div class="card-media">${renderScene(card.scene, card.color)}</div>
```

to:

```html
<div class="card-media">
  <img src="assets/cards/${card.id}.jpg" alt="${card.title}" loading="lazy">
</div>
```

The SVG fills 100% of the container — an `<img>` with `width: 100%; height: 100%; object-fit: cover;` behaves the same. Add these styles in `styles.css` under `.card-media img { width: 100%; height: 100%; object-fit: cover; }` if you want to be explicit.

### Detail view full-bleed background
In `script.js` → `populateDetail()`:

```js
detailBg.innerHTML = renderScene(card.scene, card.color);
```

becomes:

```js
detailBg.innerHTML = `<img src="assets/scenes/${card.id}.jpg" alt="${card.title}">`;
```

### Videos in the player
In `script.js` → `openPlayer()`:

```js
playerScene.innerHTML = renderThumb(ch.id, card.color);
```

becomes:

```js
playerScene.innerHTML = `
  <video src="assets/videos/${card.id}/${ch.id}.mp4"
         autoplay ${playerState.muted ? 'muted' : ''}
         playsinline
         loop>
  </video>
`;
```

Then add styling in `styles.css`:

```css
.player-scene video { width: 100%; height: 100%; object-fit: cover; display: block; }
```

### Ambient background (idle state on the cover page)
Same swap pattern as the detail background — see `setAmbient()` in `script.js`.

## The card data (titles, copy, chapters)

All 11 cards, their copy, their Sanskrit/English pairs, and the 3 chapter titles per card live in the `CARDS` and `CHAPTER_TEMPLATE` arrays at the top of `script.js`. Edit them there — everything downstream updates automatically.

## Keyboard shortcuts (for your info, or to put in the cover tagline)

| Where | Key | Action |
|---|---|---|
| Carousel | ← → | Previous / next card |
| Carousel | Enter | Open focused card |
| Detail view | ← → | Previous / next card (in-place) |
| Detail view | Enter | Play first chapter |
| Detail view | Esc | Close |
| Player | Space | Play / pause |
| Player | M | Toggle sound |
| Player | ← → | Previous / next chapter |
| Player | Esc | Close |
