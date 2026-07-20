# CashTap AI Design System

Design tokens and reusable classes for CashTap AI. Ad creatives (EarningsBanner, WelcomeOfferBanner, VideoOverlay withdraw bar) intentionally keep their own palette.

## Color tokens

| Token | Value | Usage |
|---|---|---|
| `--bg-page` | `#0A0A0B` | App canvas |
| `--bg-sidebar` | `#0F0F11` | Sidebar surface |
| `--bg-panel` / `surface` | `#161618` | Cards, wells |
| `--bg-border` | `#242427` | Borders |
| `--brand-primary` / `accent` | `#EAB308` | Gold primary |
| `--brand-secondary` / `accent-muted` | `#6366F1` | Indigo partner |
| `text-primary` | `#F8FAFC` | Headings, body |
| `text-secondary` | `#94A3B8` | Subtitles |
| `text-muted` | `#64748B` | Labels, hints |
| Success | `#10B981` | Verified states |
| Error | `#EF4444` | Errors |

## Typography classes

| Class | Use |
|---|---|
| `page-eyebrow` | Uppercase route label above titles |
| `ds-h1` | One page title per screen |
| `ds-h2` | Section headings |
| `ds-h3` | Card titles |
| `ds-h4` | Micro labels |
| `ds-subtitle` | Supporting copy under titles |
| `ds-label` | Form labels |
| `ds-well` | Inner content boxes |

## Layout

- **Container:** `max-w-7xl mx-auto` in `Shell.tsx` for all authenticated pages
- **Sidebar:** `--sidebar-w: 280px`, collapsed `--sidebar-w-collapsed: 76px`
- **Dashboard rail:** `grid xl:grid-cols-4` with main `xl:col-span-3`

## Buttons

| Class | Style |
|---|---|
| `btn-primary` | Gold gradient, **white text**, min-height 44px on mobile CTAs |
| `btn-secondary` | Surface + border |
| `btn-soft` | Accent tint |
| `btn-ghost` | Text only |
| `btn-danger` | Red fill |
| `btn-chip` / `btn-chip-active` | Filter pills |

**Rule:** filled/gradient CTAs use white text — never black on saturated gradients.

## Surfaces

| Class | Use |
|---|---|
| `card-base` | Standard glass card |
| `glass-card` | Elevated marketing blocks |
| `card-interactive` | Clickable cards |

## Media

- All video previews: `VideoThumbnail` + bottom-heavy scrim (`from-black/72`)
- Playback only in `VideoOverlay`
- Thumbnail map: `src/lib/video-thumbnails.ts`

## PageHeader

Every main route uses `PageHeader` with eyebrow + `ds-h1` + `ds-subtitle`. Premium pages keep hero flavor below the standard header.

## Spacing & UX

- Section gap: `gap-6` / `gap-8`
- Touch targets: ≥44px
- Mobile input font size: 16px (prevents iOS zoom)
- `prefers-reduced-motion` honored in `globals.css`
