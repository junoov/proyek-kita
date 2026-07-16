# Karsa Uniform Design System

## 1. Atmosphere & Identity

Karsa Uniform feels like a capable partner on the factory floor: direct, orderly, and quietly confident. The signature is the **woven field**—thin structural rules, offset blocks, and deliberate red marks that suggest precision tailoring without relying on decorative fabric clichés. The experience should give a procurement team confidence that every detail has an owner.

## 2. Color

### Palette

| Role | Token | Value | Usage |
|---|---|---:|---|
| Surface / primary | `--color-canvas` | `oklch(97% 0.008 247)` | Main page background |
| Surface / inverse | `--color-ink` | `oklch(23% 0.035 255)` | Dark sections and primary text |
| Surface / muted | `--color-mist` | `oklch(92% 0.012 247)` | Quiet panels and image frames |
| Surface / accent | `--color-signal` | `oklch(54% 0.19 28)` | Primary calls to action and key emphasis |
| Surface / accent-hover | `--color-signal-strong` | `oklch(47% 0.18 28)` | CTA hover and active states |
| Text / primary | `--color-text` | `oklch(23% 0.035 255)` | Headings and body copy |
| Text / on-dark | `--color-text-inverse` | `oklch(98% 0.004 247)` | Copy on dark surfaces |
| Text / muted | `--color-text-muted` | `oklch(48% 0.025 255)` | Supporting copy and metadata |
| Rule / default | `--color-rule` | `oklch(80% 0.015 247)` | Dividers and outlines |
| Focus | `--color-focus` | `oklch(62% 0.15 230)` | Keyboard focus indicators |

### Rules

- Signal red is reserved for primary actions, selected states, and decisive emphasis.
- The same cool navy family anchors all neutral surfaces; no ad-hoc grey or blue tones are allowed.
- Text on `--color-signal` and `--color-ink` always uses `--color-text-inverse`.

## 3. Typography

### Scale

| Level | Token | Size | Weight | Line height | Usage |
|---|---|---|---:|---:|---|
| Display | `--type-display` | `clamp(3rem, 7vw, 7.5rem)` | 750 | 0.92 | Hero statement |
| H1 | `--type-h1` | `clamp(2.5rem, 5vw, 5rem)` | 720 | 0.98 | Page title |
| H2 | `--type-h2` | `clamp(2rem, 3.5vw, 3.5rem)` | 700 | 1.04 | Section headings |
| H3 | `--type-h3` | `1.25rem` | 700 | 1.25 | Card and article titles |
| Lead | `--type-lead` | `1.125rem` | 520 | 1.55 | Lead copy |
| Body | `--type-body` | `1rem` | 480 | 1.65 | Default copy |
| Small | `--type-small` | `0.875rem` | 560 | 1.5 | Metadata and utility copy |
| Label | `--type-label` | `0.75rem` | 720 | 1.25 | Navigation and section labels |

### Font Stack

- Primary: `"Manrope Variable", "Segoe UI", sans-serif`
- Body and display use the same family to keep the brand disciplined and fast to load.

### Rules

- Headings are left-aligned by default and rely on weight and scale, never gradient text.
- Labels use uppercase only when they signal category or document metadata.
- Body copy stays within 62 characters per line where reading density matters.

## 4. Spacing & Layout

### Base Unit

| Token | Value | Usage |
|---|---:|---|
| `--space-1` | `0.25rem` | Tight icon relationships |
| `--space-2` | `0.5rem` | Inline groups |
| `--space-3` | `0.75rem` | Compact blocks |
| `--space-4` | `1rem` | Standard padding |
| `--space-5` | `1.25rem` | Control groups |
| `--space-6` | `1.5rem` | Panel padding |
| `--space-8` | `2rem` | Related group spacing |
| `--space-10` | `2.5rem` | Section internals |
| `--space-12` | `3rem` | Major content breaks |
| `--space-16` | `4rem` | Compact section separation |
| `--space-20` | `5rem` | Standard section separation |
| `--space-24` | `6rem` | Hero and large section separation |

### Grid

- Max content width: `76rem`
- Layout: 12-column CSS grid with `1.5rem` gutters on desktop and `1rem` edge spacing on mobile.
- Breakpoints: `48rem` for tablet and `64rem` for desktop composition changes.
- The hero uses an asymmetric text-to-image relationship; supporting sections rotate their layout family rather than repeating the same card grid.

## 5. Components

### Button
- **Structure:** semantic anchor for navigation or button for an in-page action.
- **Variants:** signal, ink, quiet.
- **Spacing:** `--space-3` vertical and `--space-5` horizontal.
- **States:** default, hover, active, visible focus.
- **Accessibility:** labels remain on one line; minimum target size is `2.75rem`.
- **Motion:** `150ms` transform and background-color transition.

### Section Shell
- **Structure:** `section` with a contained inner grid and optional section label.
- **Variants:** canvas, mist, ink, signal.
- **Spacing:** vertical padding uses `--space-20` or `--space-24`.
- **Accessibility:** every section has a semantic heading; decorative rules are hidden from assistive technology.

### Information Tile
- **Structure:** article with a number or icon, title, and concise body.
- **Variants:** outline on canvas or tonal on mist.
- **Spacing:** `--space-6` padding and `--space-4` internal rhythm.
- **States:** static by default; linked tiles expose hover and focus.
- **Accessibility:** tiles are not clickable unless they lead to a defined destination.

## 6. Motion & Interaction

| Type | Duration | Easing | Usage |
|---|---:|---|---|
| Micro | `150ms` | `ease-out` | Button press and utility links |
| Standard | `240ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Menu disclosure and hover lift |
| Emphasis | `480ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Page-entry reveal |

- Only `transform`, `opacity`, and color transitions are animated.
- All non-essential animation stops under `prefers-reduced-motion: reduce`.
- The mobile navigation uses native disclosure behaviour, so it remains usable without JavaScript.

## 7. Depth & Surface

### Strategy

**Borders-only.** Layout hierarchy is created through contrast, rules, and generous negative space. Panels use `1px solid var(--color-rule)`; shadows are not used.

- Canvas sections are open and spacious.
- Mist surfaces group supporting information.
- Ink and signal sections are reserved for high-commitment brand moments and calls to action.
