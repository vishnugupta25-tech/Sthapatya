# 🎨 Frontend Architecture & UI/UX Design System (`frontend.md`)

## 1. Visual Identity & Creative Theme
STHAPTYA 2026 demands a design language that feels distinctly **Civil Engineering** yet strikingly **modern, high-tech, and premium**:
- **Concept:** *"The Blueprint of Tomorrow"* — architectural blueprint grids, structural trusses, isometric angles, concrete textures, and steel beams paired with glowing neon accents.
- **Vibe:** Bold, authoritative, futuristic, dynamic, and clean (no clutter, no generic festival templates).

---

## 2. Color Palette & Design Tokens

### Primary & Accent Colors
```css
:root {
  /* Backgrounds */
  --bg-primary: #0a0e17;          /* Deep obsidian / night sky blueprint */
  --bg-surface: #111827;          /* Sleek charcoal surface */
  --bg-surface-glass: rgba(17, 24, 39, 0.75); /* Glassmorphic container */
  --bg-card: #151f32;             /* Card surface */
  --bg-card-hover: #1b2842;       /* Active card hover */

  /* Structural Accents */
  --accent-amber: #f59e0b;        /* Construction safety gold / beam highlight */
  --accent-amber-glow: rgba(245, 158, 11, 0.35);
  --accent-cyan: #06b6d4;         /* Blueprint laser cyan */
  --accent-cyan-glow: rgba(6, 182, 212, 0.35);
  --accent-orange: #ff5722;       /* High-visibility architectural punch */

  /* Text & Borders */
  --text-main: #f8fafc;           /* Crisp off-white */
  --text-muted: #94a3b8;          /* Slate secondary text */
  --text-subtle: #64748b;         /* Subtle helper text */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-highlight: rgba(245, 158, 11, 0.4);
  --grid-line: rgba(6, 182, 212, 0.07);

  /* Shadows & Radius */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --shadow-glow: 0 0 25px var(--accent-amber-glow);
  --shadow-card: 0 10px 30px -10px rgba(0, 0, 0, 0.6);
}
```

---

## 3. Typography
- **Headings & Event Titles:** `Syne` or `Space Grotesk` (Google Fonts) — architectural, wide, geometric, commanding authority.
- **Body & Metadata:** `Inter` or `Plus Jakarta Sans` — legible, sharp, and comfortable to read on all screens.
- **Numbers / Metrics / Countdown:** `JetBrains Mono` or `Chakra Petch` — technical, precision-engineered feel.

---

## 4. Component Hierarchy & Layout

```
[ Navigation Bar ] (Sticky glassmorphism with logo, live status, nav links, Quick Register CTA)
       │
[ 1. Hero Section ]
       ├── Department & College Badge
       ├── Animated Title: "STHAPTYA 2026"
       ├── Dynamic Tagline: "The Flagship Technical Event of Civil Engineering"
       ├── Event Meta Bar: 📅 Date | 📍 Venue | ⏱️ Live Countdown Timer
       └── Primary CTAs: [Explore Events] (smooth scroll) & [Register Now] (open modal/page)
       │
[ 2. About Sthaptya ]
       ├── Clean 2-column layout: Story/Mission + Key Stats (6 Events, ₹XX,XXX Prize Pool, 500+ Builders)
       └── Subtle blueprint truss wireframe animation in background
       │
[ 3. Explore Our Events — Grid (Flagship Section) ]
       ├── Section Header with Category Badges
       └── 6 Interactive Event Cards:
             ├── Bridge Battle
             ├── Site Investigation
             ├── 3D Printing
             ├── Surveying
             ├── AutoCAD
             └── Evo Vision
       │
[ 4. Event Card Anatomy ]
       ├── Event Icon / 3D Render / Blueprint Graphic
       ├── Title & Catchy 1-line Pitch
       ├── Meta Pills: 👥 Team Size | ⏱️ Duration | 🏆 Prize Pool
       └── Action Link: [View Details →] & [Quick Register]
       │
[ 5. Dedicated Event Detail View ]
       ├── Can be rendered either as dedicated route (`/events/bridge-battle`) or immersive full-screen modal
       ├── Header Banner with Title & Catchphrase ("Build. Innovate. Compete.")
       ├── Quick Facts Panel (Fee, Date, Time, Venue, Team Size, Prize)
       ├── Tabbed or Structured Specs:
       │     ├── 📌 Description & 🎯 Objectives
       │     ├── 📋 Rules & Regulations (Collapsible accordion or clean numbered steps)
       │     ├── 🧰 Materials / Equipment Provided vs. Brought by Participant
       │     ├── ⚠️ Critical Instructions & Safety Protocols
       │     └── 📞 Student & Faculty Coordinators (Names & Direct Phone Links)
       └── Sticky Footer CTA: [REGISTER FOR THIS EVENT]
       │
[ 6. Schedule & Venue Section ]
       ├── Interactive Timeline (Day 1 / Day 2 Slot Planner)
       └── Campus / Department Map pointer with directions
       │
[ 7. Footer ]
       └── Department branding, organizing committee contacts, social links, copyright.
```

---

## 5. Micro-Interactions & Animations
1. **Interactive Background:** Blueprint grid background with subtle ambient cursor light tracking or floating geometric structural lines.
2. **Card Hover Effects:** 3D card tilt with a subtle glowing neon border on hover (`--accent-amber` / `--accent-cyan`).
3. **Smooth View Transition:** Seamless sliding drawer or modal reveal when clicking *"View Details →"*, preventing disruptive full-page reload lag.
4. **Live Countdown Ticker:** High-precision flip/slide animation for Days, Hours, Minutes, Seconds.
5. **Interactive Copy & Share:** One-click copy event link or rulebook link with toast notification feedback.

---

## 6. Mobile Responsiveness & Touch Optimization
- **Sticky Bottom Action Bar on Mobile:** During scroll on event pages, a fixed bottom bar displays `[Register Now - ₹XXX]` for frictionless conversions.
- **Card Swiping or Stacked Grid:** Event cards transform into clean single-column cards with touch-friendly button targets (minimum 48px height).
- **Collapsible Rules:** Long rule sections on mobile default to clean accordion items to avoid endless scrolling fatigue.

---

## 7. Performance & Accessibility (a11y)
- **High Contrast:** All text passes WCAG AA contrast against dark backgrounds.
- **SVG / CSS-First:** Structural icons (bridges, calipers, printers, CAD crosshairs) rendered using lightweight SVGs rather than heavy PNGs.
- **Accessible Modals:** Full `aria-labelledby`, `aria-modal="true"`, keyboard `Esc` closing, and focus trapping.
