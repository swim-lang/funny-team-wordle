# Anchovies Wordle Design Tokens

Reusable tokens for the cheerful bitmap/pixel UI: warm paper, black grid lines, square edges, heavy shadows, and loud arcade accents.

## Mood

- Playful, social, and morning-friendly.
- Bitmap arcade meets notebook grid paper.
- High contrast, chunky, square, tactile.
- Fun accents, but the base stays warm and readable.

## CSS Token Starter

```css
:root {
  /* Core */
  --aw-ink: #111111;
  --aw-grid: #111111;
  --aw-paper: #fff8e8;
  --aw-panel: #ffffff;
  --aw-panel-soft: #fff3bd;

  /* Accents */
  --aw-cyan: #68d8ff;
  --aw-lime: #72e06a;
  --aw-amber: #ffd24a;
  --aw-pink: #ff7ab8;
  --aw-red: #ff5c5c;

  /* Utility */
  --aw-gray: #6d6d6d;
  --aw-inset: #d7d7d7;
  --aw-tile-fill: #dff5ff;
  --aw-hint-bg: #ffe58a;
  --aw-hint-text: #6b4500;
  --aw-overlay: rgba(255, 248, 232, 0.96);

  /* Borders + Shadows */
  --aw-border-sm: 3px solid var(--aw-ink);
  --aw-border-lg: 4px solid var(--aw-ink);
  --aw-shadow-sm: 3px 3px 0 var(--aw-ink);
  --aw-shadow-md: 4px 4px 0 var(--aw-ink);
  --aw-shadow-lg: 8px 8px 0 var(--aw-ink);
  --aw-inset-shadow: inset 3px 3px 0 var(--aw-inset);

  /* Radius */
  --aw-radius: 0;

  /* Type */
  --aw-font-display: "Arial Black", "Arial Narrow", system-ui, sans-serif;
  --aw-font-body: Arial, system-ui, sans-serif;

  /* Motion */
  --aw-press: 120ms ease;
  --aw-fade: 180ms ease;
}
```

## Color Roles

| Token | Hex | Use |
| --- | --- | --- |
| `--aw-ink` | `#111111` | Text, borders, grid, shadows |
| `--aw-paper` | `#fff8e8` | Page background |
| `--aw-panel` | `#ffffff` | Main panels, buttons, tiles |
| `--aw-panel-soft` | `#fff3bd` | Secondary cards and menus |
| `--aw-cyan` | `#68d8ff` | Primary badges, selected states |
| `--aw-pink` | `#ff7ab8` | Emoji/avatar moments, ticker badge |
| `--aw-amber` | `#ffd24a` | Hints, active tools, Wordle present |
| `--aw-lime` | `#72e06a` | Success and Wordle correct |
| `--aw-red` | `#ff5c5c` | Dividers, alerts, spicy emphasis |
| `--aw-gray` | `#6d6d6d` | Used letters, inactive results |

## Background

Use a cream page with a black 32px grid.

```css
body {
  color: var(--aw-ink);
  font-family: var(--aw-font-display);
  background:
    linear-gradient(var(--aw-grid) 2px, transparent 2px),
    linear-gradient(90deg, var(--aw-grid) 2px, transparent 2px),
    var(--aw-paper);
  background-size: 32px 32px;
}
```

## Shape Language

- Corners are square: `border-radius: 0`.
- Main panels use `4px` black borders and `8px 8px` hard shadows.
- Controls use `3px` black borders and `4px 4px` hard shadows.
- Avoid soft glows, gradients, glass, blur, or rounded pill shapes.

## Typography

| Role | Style |
| --- | --- |
| Display | `Arial Black`, uppercase, tight line height |
| Body/support | Arial, `font-weight: 800-900` |
| Badges | 10-13px, uppercase |
| Board tiles | 22-36px, uppercase |
| Article/headline | 26-46px, uppercase |

Keep letter spacing at `0`; the chunky font carries the attitude.

## Components

### Pixel Badge

```css
.pixel-badge {
  display: inline-flex;
  width: fit-content;
  border: var(--aw-border-sm);
  background: var(--aw-cyan);
  padding: 5px 8px;
  font-size: 12px;
  text-transform: uppercase;
  box-shadow: var(--aw-shadow-sm);
}
```

### Button

```css
button {
  border: var(--aw-border-sm);
  border-radius: 0;
  color: var(--aw-ink);
  background: var(--aw-panel);
  box-shadow: var(--aw-shadow-md);
  transition: transform var(--aw-press), box-shadow var(--aw-press), background var(--aw-press);
}

button:hover {
  transform: translate(-1px, -1px);
  box-shadow: 5px 5px 0 var(--aw-ink);
}

button:active {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0 var(--aw-ink);
}
```

### Panel

```css
.panel {
  border: var(--aw-border-lg);
  background: var(--aw-panel);
  box-shadow: var(--aw-shadow-lg);
  padding: 24px;
}
```

### Input / Name Pill

```css
.inset-field {
  border: var(--aw-border-sm);
  background: var(--aw-panel);
  box-shadow: var(--aw-inset-shadow);
  padding: 0 12px;
}
```

### Wordle Tile

```css
.tile {
  display: grid;
  place-items: center;
  width: clamp(44px, 7vw, 68px);
  height: clamp(44px, 7vw, 68px);
  border: var(--aw-border-lg);
  background: var(--aw-panel);
  box-shadow: var(--aw-shadow-md);
  font-size: clamp(22px, 4vw, 36px);
  text-transform: uppercase;
}

.tile.filled { background: var(--aw-tile-fill); }
.tile.correct { background: var(--aw-lime); }
.tile.present { background: var(--aw-amber); }
.tile.absent {
  color: white;
  background: var(--aw-gray);
}
```

## Layout Tokens

```css
:root {
  --aw-page-width: 1220px;
  --aw-page-gutter: 16px;
  --aw-sidebar-width: 360px;
  --aw-gap-lg: 24px;
  --aw-gap-md: 18px;
  --aw-gap-sm: 10px;
  --aw-card-pad: 24px;
  --aw-control-pad: 9px 12px;
}
```

Primary app layout:

```css
.app-shell {
  display: grid;
  grid-template-columns: var(--aw-sidebar-width) minmax(0, 1fr);
  gap: var(--aw-gap-lg);
  width: min(var(--aw-page-width), calc(100vw - 32px));
  margin: 16px auto;
}
```

Mobile breakpoint: collapse to one column around `860px`.

## Interaction States

- Hover: move up-left by `1px`, grow shadow by `1px`.
- Pressed: move down-right by `3px`, collapse shadow to `1px`.
- Disabled: `opacity: 0.45`.
- Waiting/locked surface: `opacity: 0.42`, `filter: grayscale(1)`, `pointer-events: none`.
- Selected state: usually cyan; active tool can be amber.

## Dos And Don'ts

Do:
- Use black outlines everywhere.
- Keep surfaces square and chunky.
- Use accent colors as labels, badges, states, and small highlights.
- Make controls feel physical through hard offset shadows.

Don't:
- Add rounded cards or pill buttons.
- Use gradients as the main visual move.
- Use low-contrast pastel text.
- Let the accent palette become one-note; cyan, pink, amber, and lime should all get moments.
