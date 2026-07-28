# Roller Customize Design Contract

## 0. Research Log
- 2026-07-28 — https://www.studio-104.com/ Source type: real uniform design studio
  Observed: The homepage uses a restrained header, a high-contrast statement, one decisive accent color, and a clear route from selected work to the studio story.
  Reusable pattern: Put the service promise and the next action in the first viewport, then let process and imagery prove the promise.
  Deliberately not copying: The centered luxury-fashion hero, serif branding, coral palette, and account-navigation model.
- 2026-07-28 — https://www.studio-104.com/services/development Source type: real uniform design studio / service page
  Observed: A single material photograph introduces the service, followed by large process headings and technical explanations.
  Reusable pattern: Treat material, pattern, sampling, and quality control as a visible production sequence rather than generic feature claims.
  Deliberately not copying: The full-bleed hero treatment and luxury-hospitality positioning.
- 2026-07-28 — https://www.circularagency.com/work/this-is-the-story-of-how-two-cousins-from-texas-changed-the-workwear-world-forever/ Source type: agency case study
  Observed: Oversized editorial typography is balanced by quiet metadata rows and generous white space; the work is framed as a story, not a feature grid.
  Reusable pattern: Use small production annotations and a strong typographic opening to make a workwear portfolio feel intentional.
  Deliberately not copying: The agency case-study framing, client name treatment, and oversized headline proportions.
- 2026-07-28 — https://garphyttan.com/ Source type: real workwear product brand
  Observed: Product categories, proof cues, and a single action are kept close to the main image; the site makes durability and everyday use explicit.
  Reusable pattern: Name the working context plainly and keep the primary action adjacent to the product evidence.
  Deliberately not copying: The promotional sale bar, commerce-heavy navigation, cookie overlay, and generic full-bleed lifestyle hero.
- 2026-07-28 — https://www.pinterest.com/search/pins/?q=workwear%20website%20design%20editorial Source type: Pinterest visual search
  Observed: Public search results were visible behind a sign-in prompt; the available board previews consistently favored portrait product crops, contact-sheet groupings, and low-chrome presentation.
  Reusable pattern: Curate a small set of consistent image crops instead of forcing every source photograph into a uniform card grid.
  Deliberately not copying: Any individual pin, logo, layout, or image treatment. Pinterest remained partially gated, so no individual pin was treated as verified evidence.
- https://universalworks.com/ Source type: real product / fashion brand
  Observed: Fabric, garment, collection, and journal imagery are treated as the story sequence; navigation stays quiet while the product image carries the page.
  Reusable pattern: Make material and garment evidence the first visual information, then introduce service details in a separate rhythm.
  Deliberately not copying: The large commerce navigation, product catalogue taxonomy, and brand assets.
- https://www.margarethowell.co.uk/ Source type: real product / utilitarian fashion brand
  Observed: Large campaign blocks use restrained typography and become a vertical sequence on narrow screens instead of preserving a desktop split.
  Reusable pattern: Every breakpoint gets a deliberate reading order: image, statement, action, then supporting content.
  Deliberately not copying: The retail sale and account flows.
- https://in.pinterest.com/pin/khaite--1618549863961094/ Source type: Pinterest editorial reference
  Observed: The reference is tagged as a minimalist online lookbook with photography-led composition and low visual chrome.
  Reusable pattern: Let image scale and negative space create hierarchy rather than badges, shadows, or rounded panels.
  Deliberately not copying: The luxury fashion tone and imagery.
- https://in.pinterest.com/pin/716494622013732980/ Source type: Pinterest editorial reference
  Observed: The TOTEME reference frames the site as a fashion-led visual system with restrained interaction and clear collection groupings.
  Reusable pattern: Keep labels quiet, use consistent image crops, and avoid making every section compete for attention.
  Deliberately not copying: The exact grid, logo, and product presentation.
- https://www.rocket.new/templates/drape-elegant-salon-landing-page-template Source type: anti-reference / generated template
  Observed: The template relies on generic full-screen media, masonry tiles, and floating calls to action.
  Reusable pattern: None. It is retained as an anti-reference because those defaults are the source of the current AI-slop feel.
  Deliberately not copying: Full-screen video, floating badges, generic masonry, and persistent conversion bars.

## 1. Visual Thesis
Roller Customize is a practical Indonesian workwear studio: material-first, measured, and human. The home page should feel like an annotated production board that helps a team decide, using the same earth-toned palette as the rest of the site rather than a separate campaign colorway.

## 2. Atmosphere & Identity

Roller Customize should feel like a capable partner on the factory floor: direct, orderly, and quietly confident. The signature is the **production mark**—thin structural rules, offset image crops, and numbered annotations using the existing umber signal. The experience should give a procurement team confidence that every detail has an owner.

## 3. Color

### Palette

| Role | Token | Value | Usage |
|---|---|---:|---|
| Surface / primary | `--color-canvas` | `#A79A8A` | Main page background |
| Surface / inverse | `--color-ink` | `#1A1A1A` | Dark sections and primary text |
| Surface / muted | `--color-mist` | `#D8CFC4` | Header and quiet panels |
| Surface / accent | `--color-signal` | `#3D352E` | Secondary emphasis and dark field |
| Surface / accent-hover | `--color-signal-strong` | `#1A1A1A` | CTA hover and active states |
| Text / primary | `--color-text` | `#1A1A1A` | Headings and body copy |
| Text / on-dark | `--color-text-inverse` | `#F7F3EE` | Copy on dark surfaces |
| Text / muted | `--color-text-muted` | `#3D352E` | Supporting copy and metadata |
| Rule / default | `--color-rule` | `#6F6257` | Dividers and outlines |
| Focus | `--color-focus` | `#D8CFC4` | Keyboard focus indicators |

### Rules

- The umber signal is reserved for primary actions, selected states, and decisive production annotations.
- The same warm canvas, mist, ink, and umber family anchors every route; no ad-hoc grey, blue, or campaign-only accent tones are allowed.
- Text on `--color-ink` and `--color-signal` uses `--color-text-inverse`.

## 4. Typography

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

## 5. Spacing & Layout

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
- Breakpoints: `48rem` for tablet and `64rem` for desktop composition changes, with an explicit tablet composition rather than a squeezed desktop layout.
- The home hero leads with the product statement and a garment image, then uses material and detail images as evidence. On mobile it becomes a content-first sequence; on tablet it uses a stable two-column board; on desktop it uses a 12-column editorial grid.
- The home gallery is a curated selection of three visible images with a lightbox for the full set. Images use explicit aspect ratios so lazy loading cannot create layout gaps or accidental masonry collisions.

## 6. Components

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
- **Structure:** article with a number, title, description, and optional deliverable.
- **Variants:** ruled production row or tonal proof panel.
- **Spacing:** `--space-6` padding and `--space-4` internal rhythm.
- **States:** static by default; linked rows expose hover and focus.
- **Accessibility:** rows are not clickable unless they lead to a defined destination; photo controls expose their lightbox state and restore focus on close.

## 7. Motion & Interaction

| Type | Duration | Easing | Usage |
|---|---:|---|---|
| Micro | `150ms` | `ease-out` | Button press and utility links |
| Standard | `240ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Menu disclosure and hover lift |
| Emphasis | `480ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Page-entry reveal |

- Only `transform`, `opacity`, and color transitions are animated.
- All non-essential animation stops under `prefers-reduced-motion: reduce`.
- The mobile navigation uses native disclosure behaviour, so it remains usable without JavaScript.

## 8. Depth & Surface

### Strategy

**Rules plus contrast.** Layout hierarchy is created through background shifts, rules, and generous negative space. Panels use `1px solid var(--color-rule)`; shadows are reserved for the lightbox only.

- Paper sections are open and spacious.
- Mist surfaces group supporting information and client proof.
- Ink and signal sections are reserved for process and calls to action.

## 9. Anti-Slop Decisions
- No rounded cards, floating glass surfaces, gradient text, decorative blobs, moving marquees, or random badges on the home route.
- No desktop layout is allowed to simply shrink into tablet or mobile; each mode has an explicit reading order.
- No three-card feature grid as the primary proof pattern. Services use numbered rows and production language.
- Image crops must preserve a visible garment, material, embroidery, or construction detail, not act as abstract background decoration.

## 10. Accessibility Constraints
- Maintain visible focus outlines and 44px minimum touch targets for navigation and actions.
- Keep body text at least 16px on narrow screens and avoid horizontal overflow.
- Preserve semantic heading order and meaningful image alt text.
- Respect reduced-motion preferences.

## 11. Accepted Debt
- The existing source photography has mixed crops and will be normalized with CSS aspect-ratio rules until a dedicated art-directed shoot is available.
