# 🏗️ Technical Architecture & Project Blueprint (`architecture.md`)

## 1. Technology Stack Recommendation
In accordance with modern web engineering best practices:
- **Core:** Semantic HTML5, Vanilla CSS3 (Custom Design System with CSS variables), and Modern Vanilla ES6+ JavaScript (or Vite for ultra-fast bundling).
- **Icons & Graphics:** Lucide Icons / Feather SVGs + Custom Civil Engineering isometric vector illustrations.
- **Animations:** CSS Keyframe Micro-animations + IntersectionObserver API for lightweight scroll-triggered reveals (no bloated external animation libraries required).
- **Fonts:** Google Fonts (`Syne` / `Space Grotesk` for bold architectural headings, `Inter` for crisp body copy).

---

## 2. Directory & File Organization Blueprint

```
website/
├── index.html                 # Main Homepage (Hero, About, Events Grid, Schedule, Contact)
├── events.html (or /events/)  # Dedicated Event Viewer / Deep-dive details
├── css/
│   ├── variables.css          # Design tokens (colors, gradients, typography, shadows)
│   ├── base.css               # Reset, typography, body & blueprint background grid
│   ├── components/
│   │   ├── navbar.css         # Sticky glassmorphic navbar
│   │   ├── hero.css           # Hero banner, countdown timer, CTA buttons
│   │   ├── event-card.css     # 3D interactive event card styles & badges
│   │   ├── modal.css          # Event details drawer & full modal dialog
│   │   └── registration.css   # Dynamic multi-step registration form & pass
│   └── responsive.css         # Media queries for mobile, tablet, and ultra-wide
├── js/
│   ├── data/
│   │   └── events-data.js     # Single source of truth containing data from events.md
│   ├── modules/
│   │   ├── countdown.js       # Live event countdown ticker
│   │   ├── eventRenderer.js   # Dynamic card & detail modal rendering engine
│   │   ├── modalHandler.js    # Seamless modal open/close & URL hash routing
│   │   └── registration.js    # Team member adder, fee calculator, validation
│   └── main.js                # App entry point & event listeners
├── assets/
│   ├── images/
│   │   ├── logo.svg           # Sthaptya & Civil Dept crest
│   │   ├── blueprints/        # Background structural wireframe SVG patterns
│   │   └── events/            # 6 curated 3D / vector event visual representations
│   └── qr/                    # Official UPI payment QR code image
├── idea.md                    # Project vision, objectives, target personas & features
├── frontend.md                # UI/UX design tokens, typography, component specs
├── events.md                  # Master catalog & schema for all 6 events
├── registration.md            # Registration form rules, UPI flow & ticket generation
└── architecture.md            # Tech architecture, directory blueprint & SEO
```

---

## 3. Industry Benchmark Analysis (Top Symposium Websites)
Based on analysis of leading college tech fests (such as IIT Bombay *Aakaar*, IIT Madras *Shaastra*, BITS Pilani *APOGEE*):
1. **Instant Clarity above the Fold:** Within 3 seconds of landing, attendees must grasp the Date, Location, and Core Fest Theme without having to hunt through menus.
2. **Deep-linking to Events:** Giving each event a unique URL (e.g., `/#bridge-battle` or `/events/bridge-battle`) enables coordinators to paste direct links into WhatsApp groups and Instagram stories, doubling registration conversion rates.
3. **No PDF Rulebook Wall:** Requiring students to download 20MB PDFs to read rules kills participation. Display rules clearly in the browser with collapsible sections.
4. **Mobile First:** >70% of registrations happen on mobile screens while chatting on WhatsApp. Forms must be single-thumb accessible.

---

## 4. SEO & Meta Tags Blueprint
Every page includes:
```html
<title>STHAPTYA 2026 | Flagship Civil Engineering Symposium</title>
<meta name="description" content="Join STHAPTYA 2026, the premier Civil Engineering Technical Fest. Compete in Bridge Battle, Site Investigation, 3D Printing, Surveying, AutoCAD, and Evo Vision. Register now!">
<meta property="og:title" content="STHAPTYA 2026 — The Blueprint of Tomorrow">
<meta property="og:description" content="Win ₹XX,XXX in prizes across 6 flagship civil engineering competitions.">
<meta property="og:image" content="assets/images/og-preview.jpg">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#0a0e17">
```
