/* ═══════════════════════════════════════════════════
   STHAPATYA 2026-27 — Application Logic (Redesigned)
   ═══════════════════════════════════════════════════ */

// ── EVENT DATA ──
const EVENTS = [
  {
    id: "the-site-investigation",
    icon: "🔎",
    title: "THE SITE INVESTIGATION",
    subtitle: "A Treasure Hunt Experience",
    tagline: "Explore. Decipher. Discover.",
    theme: "It's more than a hunt, it's a perspective.",
    category: "Treasure Hunt",
    catColor: "#4ecdc4",
    accent: "linear-gradient(135deg, #4ecdc4, #2a9d8f)",
    iconBg: "rgba(78,205,196,0.1)",
    shortDesc: "Step into a world of clues, maps, challenges & real-world civil investigation across campus.",
    fullDesc: "Ready to investigate, decode & discover? CiESA – STHAPATYA presents The Site Investigation! This isn't just a simple hunt — it's about how you explore, decipher, and discover. Teams will navigate clues, interpret campus maps, solve situational civil and logical puzzles, and complete investigatory checkpoints across Building No. 9 and PCCOE grounds.",
    objective: "Decode cryptic clues, analyze location footprints, think critically under pressure, and reach the final investigation objective in the shortest time.",
    teamSize: "2 – 3",
    duration: "10 AM onwards",
    feePCCOE: "FREE",
    feeOther: "₹100/team",
    prize: "Up to ₹5,000",
    date: "9–10 Oct 2026",
    lastDate: "8th Oct 2026",
    venue: "Building No. 9, PCCOE",
    rules: [
      "Teams must consist of 2 to 3 members.",
      "All team members must carry valid college Identity Cards.",
      "Clues must be solved in the designated sequence — skipping checkpoints leads to penalty or disqualification.",
      "Any damage to campus property or unauthorized interference results in immediate disqualification.",
      "The decision of the CiESA organizing committee is final."
    ],
    materials: [
      "Clue sheets, maps, and checkpoint stamps provided at the venue.",
      "Teams must carry at least one fully charged smartphone."
    ],
    notes: [
      "Free for PCCOE students (requires valid College PRN/ID).",
      "₹100 per team for external college participants.",
      "Register before 8th October 2026."
    ],
    coordinators: [
      { name: "Arya Bhor", phone: "+91 8624943235", tel: "tel:+918624943235" },
      { name: "Harshali Bhilkar", phone: "+91 8624807812", tel: "tel:+918624807812" }
    ],
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLSfkQ4qN1KOk06yGOBNxP9TDAcIrrjIe_lqS2PPXv-RMa6uIdQ/viewform?usp=publish-editor"
  },
  {
    id: "3d-showdown",
    icon: "🖨️",
    title: "3-D SHOWDOWN",
    subtitle: "The Ultimate 3D Model-Printing Challenge",
    tagline: "Design It. Model It. Print It. Show It.",
    theme: "Think in 3D. Build in 3D. Own the Showdown.",
    category: "3D Printing",
    catColor: "#a78bfa",
    accent: "linear-gradient(135deg, #a78bfa, #7c3aed)",
    iconBg: "rgba(167,139,250,0.1)",
    shortDesc: "🏆 Event in 2 Stages: Stage 1 (Online Digital Submission) & Stage 2 (Offline 3D Printing & Presentation at PCCOE).",
    fullDesc: "Have an idea? Bring it to life! Put your creativity, design skills, and 3D-printing abilities to the test as you transform a digital concept into a real, tangible 3D model using 3D printers. This isn't just about making a model — it's about turning imagination into innovation, one layer at a time.",
    objective: "Design, model, slice, and fabricate an optimized, functional 3D prototype that solves a given structural/spatial problem.",
    stages: [
      {
        stage: "1️⃣ STAGE 1 – ONLINE 💻",
        badge: "Online Mode",
        desc: "Design & submit your 3D model digitally."
      },
      {
        stage: "2️⃣ STAGE 2 – OFFLINE 🖨️",
        badge: "At PCCOE Campus",
        desc: "Shortlisted teams will 3D print their model and present it at PCCOE."
      }
    ],
    teamSize: "2 – 3",
    duration: "10 AM onwards",
    feePCCOE: "FREE",
    feeOther: "₹200/team",
    prize: "₹4,000 (1 Winner)",
    date: "9–10 Oct 2026",
    lastDate: "4th Oct 2026",
    venue: "Building No. 9, PCCOE",
    rules: [
      "🏆 STAGE 1 (ONLINE): Teams design and submit their digital 3D model files (.STL / .OBJ / CAD files) digitally before the deadline.",
      "🏆 STAGE 2 (OFFLINE): Shortlisted teams from Stage 1 will 3D print their model and present it live in front of the jury at PCCOE.",
      "Teams must consist of 2 to 3 members.",
      "All models must be original designs created during the designated challenge rounds.",
      "Slicing settings, infill density, and material usage must adhere to jury-specified parameters.",
      "Decision of the technical jury on model precision, printability, and aesthetics is final.",
      "Only 1 winner will be awarded the grand prize of ₹4,000 (Winner takes all)."
    ],
    materials: [
      "Stage 1: Any CAD/3D modeling software (Fusion 360, Blender, SolidWorks, AutoCAD, etc.).",
      "Stage 2: 3D printers and designated workstations available at PCCOE venue.",
      "Slicer software pre-installed on lab systems."
    ],
    notes: [
      "🏆 Event in 2 Stages: 1️⃣ Stage 1 (Online) — Design & submit digitally | 2️⃣ Stage 2 (Offline) — Shortlisted teams print & present at PCCOE.",
      "🏆 Prize Pool: ₹4,000 for 1 Winner (Winner takes all).",
      "Free for PCCOE students.",
      "₹200 per team for external college participants.",
      "Register before 4th October 2026."
    ],
    coordinators: [
      { name: "Parv Rathod", phone: "+91 9145373155", tel: "tel:+919145373155" },
      { name: "Vishnu Gupta", phone: "+91 7499260190", tel: "tel:+917499260190" }
    ],
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLSckeJ8YORvzo6XExdpaiuNxK7nqyLbiVM8PdQ-NG5b9jQtCeQ/viewform"
  },
  {
    id: "cadnova",
    icon: "🛠️",
    title: "CADNOVA 2026",
    subtitle: "2-Day AutoCAD Drafting & Design Challenge",
    tagline: "Think. Draft. Engineer. Build the Future.",
    theme: "The Transition of Civil Engineering.",
    category: "AutoCAD Design",
    catColor: "#38bdf8",
    accent: "linear-gradient(135deg, #38bdf8, #0284c7)",
    iconBg: "rgba(56,189,248,0.1)",
    shortDesc: "Put your AutoCAD speed and precision to the test with random problem statements and NBC compliance.",
    fullDesc: "CADNOVA 2026 is an intensive 2-day drafting and design challenge where participants are assigned real-time civil problem statements. Draft floor plans, elevations, and cross-sections adhering strictly to NBC/FSI bye-laws, then integrate electrical and plumbing/sanitary building services with correct ISO/IS colour coding.",
    objective: "Design compliant, accurate, and professional civil engineering drawings with proper layer hierarchy, dimensional precision, and service integration.",
    teamSize: "Solo / Max 2",
    duration: "2-Day Challenge",
    feePCCOE: "FREE",
    feeOther: "₹150/team",
    prize: "₹5,000",
    date: "9–10 Oct 2026",
    lastDate: "7th Oct 2026",
    venue: "Lab 9406L, PCCOE",
    rules: [
      "Solo or duo participation (max 2 members).",
      "All drafting on designated lab systems during allotted slots.",
      "Drawings must adhere to NBC guidelines, FSI restrictions, and municipal bye-laws.",
      "Day 2 requires ISO/IS standard line weights and color coding for utilities."
    ],
    scheduleDays: {
      day1: "Planning · AutoCAD · Plan/Elevation/Section · NBC/FSI Compliance · Scrutiny",
      day2: "Electrical Layout · Plumbing/Sanitary · ISO/IS Colour Coding · Final Submission · Results"
    },
    materials: [
      "Desktop workstations with licensed AutoCAD.",
      "Problem statement sheets and scratch paper provided."
    ],
    notes: [
      "Day 1: Planning, Drafting, NBC/FSI Compliance, Scrutiny",
      "Day 2: Electrical, Plumbing, ISO Coding, Results",
      "Evaluation: Accuracy · Compliance · Drafting Quality · Presentation"
    ],
    coordinators: [
      { name: "Vrushank Shirsath", phone: "+91 8888909419", tel: "tel:+918888909419" },
      { name: "Shruti S Pagaree", phone: "+91 8421711369", tel: "tel:+918421711369" }
    ],
    formLink: "https://forms.gle/13BrzGNz1vbY3D3o8"
  },
  {
    id: "structural-showdown",
    icon: "🏗️",
    title: "STRUCTURAL SHOWDOWN 2026",
    subtitle: "Where Creativity Meets Engineering!",
    tagline: "Design • Build • Load • Conquer",
    theme: "Where Engineers Rise. Where Structures Prove Their Strength.",
    category: "Structural Design",
    catColor: "#f59e0b",
    accent: "linear-gradient(135deg, #f59e0b, #d97706)",
    iconBg: "rgba(245,158,11,0.1)",
    shortDesc: "Design it. Build it. Test it. Prove it. Put your strength, strategy & innovation to the ultimate test under load!",
    fullDesc: "Build beyond limits. Prove your strength! CiESA – STHAPATYA presents Structural Showdown 2026 — Where Creativity Meets Engineering. Think you can Design • Build • Load • Conquer? Put your strength, strategy, and structural innovation to the ultimate test as your fabricated structures face real-time mechanical loading. Compete against the best civil engineering minds across colleges!",
    objective: "Design and construct an efficient, resilient truss or structural prototype using given constraints and materials, maximizing strength-to-weight load capacity.",
    teamSize: "2 – 3",
    duration: "10 AM onwards",
    feePCCOE: "FREE",
    feeOther: "₹100/team",
    prize: "₹5,000",
    date: "9–10 Oct 2026",
    lastDate: "8th Oct 2026",
    venue: "Building No. 9, PCCOE",
    rules: [
      "Teams must consist of 2 to 3 members.",
      "Structures must be fabricated strictly using the official materials provided at the venue.",
      "Designs must conform to given dimensional tolerances, span lengths, and clearance criteria.",
      "Testing involves progressive load application until structural failure or maximum allowable deflection.",
      "Scoring is based on Strength-to-Weight ratio (Load capacity / Self-weight) and engineering efficiency.",
      "Decision of the judges and CiESA organizing committee is final."
    ],
    materials: [
      "Truss fabrication materials, joinery, and adhesives provided at the venue.",
      "Mechanical testing rig, weights, and deflection dial gauges set up in the testing lab."
    ],
    notes: [
      "🚨 LIMITED SLOTS — REGISTER NOW!",
      "Free for PCCOE students (College PRN/ID required).",
      "Registration deadline: 8th October 2026."
    ],
    coordinators: [
      { name: "Riya Gaikwad", phone: "+91 7385761731", tel: "tel:+917385761731" },
      { name: "Shravani Wable", phone: "+91 7721845655", tel: "tel:+917721845655" }
    ],
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLSekcsZKyOGRiYfP1BcFNWfMAd8jwJZlOHJTFPY7golrlzIJgA/viewform?usp=publish-editor"
  },
  {
    id: "beyond-the-benchmark",
    icon: "🧭",
    title: "BEYOND THE BENCHMARK",
    subtitle: "3-Round Advanced Surveying & Field Challenge",
    tagline: "Precision • Calculation • Field Mastery",
    theme: "Benchmark Your Surveying Skills from Theory to Field Instruments.",
    category: "Surveying & Geomatics",
    catColor: "#10b981",
    accent: "linear-gradient(135deg, #10b981, #059669)",
    iconBg: "rgba(16,185,129,0.1)",
    shortDesc: "Test your surveying expertise across technical MCQs, levelling numericals, and live field equipment setups.",
    fullDesc: "BEYOND THE BENCHMARK is an intensive 3-round offline surveying competition designed to test theoretical knowledge, mathematical calculations, and practical field equipment handling. From levelling, bearings, traversing, and area corrections to setting up and sighting instruments under time limits, prove your engineering precision!",
    objective: "Excel across technical surveying theory, numerical problem-solving, and accurate hands-on field instrument handling.",
    teamSize: "Group of 3",
    duration: "Offline · 10 AM onwards",
    feePCCOE: "FREE (PCET)",
    feeOther: "₹50/-",
    prize: "₹5,000 (1st: ₹3,000 | 2nd: ₹2,000)",
    date: "9–10 Oct 2026",
    lastDate: "8th Oct 2026",
    venue: "Building No. 9 / Survey Lab, PCCOE",
    rules: [
      "The event is open to all students. Team size must be exactly a group of 3 students.",
      "PCET students must compulsory register using their official college email only.",
      "Students from non-PCET institutes must pay an entry fee of ₹50/- and provide payment receipt.",
      "Participants must carry valid college identity cards at reporting time.",
      "Bring required stationery (pen, pencil, notebook). Calculator use permitted only if announced by organizers.",
      "No mobile phones or unauthorized electronic devices allowed during written rounds.",
      "All field equipment must be handled carefully and only as instructed by coordinators.",
      "Lowest scoring teams will be eliminated after rounds; judges' decision is final and binding."
    ],
    rounds: [
      { name: "Round 1 – Technical MCQ (20 Marks)", desc: "Objective questions on basic & advanced surveying concepts, instruments, methods, errors, and field procedures." },
      { name: "Round 2 – Surveying Numericals (10 Marks)", desc: "Numerical problems based on levelling, bearings, traversing, area computations, and corrections." },
      { name: "Round 3 – Field Equipment Challenge (20 Marks)", desc: "Identify, set up, and operate surveying instruments under judge supervision within time limits." }
    ],
    materials: [
      "Bring your own stationery (pens, pencils, notebook).",
      "Surveying instruments (Dumpy levels, auto levels, theodolites, tripods, leveling staves) provided on field."
    ],
    notes: [
      "🏆 Total Prize Pool: 1st Rank: ₹3,000/- | 2nd Rank: ₹2,000/- (Total: 50 Marks).",
      "Registration fees once paid are non-refundable.",
      "PCET students must register with college email."
    ],
    coordinators: [
      { name: "Vedika Shinde", phone: "+91 7038867783", tel: "tel:+917038867783" },
      { name: "Yuvraj Chilwant", phone: "+91 9823045565", tel: "tel:+919823045565" }
    ],
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLSfTAdxcEEEal1o-gtVTPu-NuX7fgKO_-EJlGb938rf9UTFKEQ/viewform?usp=publish-editor"
  },
  {
    id: "ecovision",
    icon: "🌱",
    title: "ECOVISION 2026",
    subtitle: "Ideas Today • A Greener Tomorrow",
    tagline: "Innovate. Design. Build. Sustain.",
    theme: "Showcase your innovative ideas, creativity & practical solutions for a sustainable and smarter future!",
    category: "Sustainability & Green Tech",
    catColor: "#22c55e",
    accent: "linear-gradient(135deg, #22c55e, #15803d)",
    iconBg: "rgba(34,197,94,0.12)",
    shortDesc: "Showcase your innovative ideas, creativity & practical solutions for a sustainable and smarter future!",
    fullDesc: "Ready to innovate, create & inspire? CiESA – STHAPATYA 2026–27 presents ECOVISION 2026 — Ideas Today • A Greener Tomorrow. Showcase your innovative ideas, creativity, and practical engineering solutions for a sustainable and smarter future! Present your vision across Sustainability (SDGs), Net Zero emissions, Green Technology, and Smart Cities to shape resilient civil and urban infrastructure.",
    objective: "Propose actionable, sustainable, and engineering-driven solutions addressing UN Sustainable Development Goals (SDGs), Net Zero carbon targets, Green Building technologies, and Smart City development.",
    teamSize: "Max 4 Members (UG)",
    duration: "Reporting: 9 AM | Starts: 10 AM (Max 7-min Pitch)",
    feePCCOE: "FREE",
    feeOther: "₹200/team",
    prize: "₹5,000",
    date: "9–10 Oct 2026",
    lastDate: "6th Oct 2026",
    venue: "PCCOE Campus, Nigdi, Pune",
    rules: [
      "Open to all Undergraduate (UG) students from any recognized college or university.",
      "Team Size: Maximum of 4 members per team.",
      "Presentation Time: Maximum 7 minutes per team, strictly timed, followed by jury Q&A.",
      "Mandatory Poster: Participants must carry their physical poster during the presentation.",
      "Core Themes: Projects must align with Sustainability (SDGs), Net Zero, Green Tech, or Smart Cities.",
      "All team members must carry valid college Identity Cards at the time of reporting.",
      "Decision of the evaluation jury and organizing committee will be final and binding."
    ],
    rounds: [
      { name: "Reporting & Verification", desc: "Desk registration, ID verification, and presentation venue allotment." },
      { name: "Poster & Concept Pitch (Max 7 Minutes)", desc: "Teams pitch their sustainable idea and display physical poster before the judging panel." },
      { name: "Jury Q&A & Impact Assessment", desc: "Evaluation based on innovation, feasibility, SDG relevance, engineering merit, and clarity." }
    ],
    materials: [
      "Teams must carry their printed presentation poster during presentation.",
      "Presentation room, display stands, and timing displays provided at venue."
    ],
    notes: [
      "🌿 Themes: Sustainability (SDGs) • Net Zero • Green Tech • Smart Cities.",
      "🎓 Eligibility: Open to all Undergraduate (UG) students.",
      "Free for PCCOE students.",
      "₹200 per team for other college students.",
      "📌 Carry your physical poster during the presentation (Max 7 mins).",
      "🚨 Last Date to Register: 6th October 2026.",
      "⚡ Innovate. Design. Build. Sustain. ✨ Shape a greener future!"
    ],
    coordinators: [
      { name: "Akshata Bhosale", phone: "+91 7276609137", tel: "tel:+917276609137" },
      { name: "Amol Anbhule", phone: "+91 8459162850", tel: "tel:+918459162850" }
    ],
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLSfsMzFtm5lQRW9sz8ulKbW-IxXo9KxJ2dIRrMYvxRx1pQUWdg/viewform?usp=dialog"
  }
];


// ═══════════════════════════════════════
// ═══════════════════════════════════════
// SPLASH — Fast dismiss & instant layout
// ═══════════════════════════════════════

window.addEventListener('DOMContentLoaded', () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  if (!location.hash) {
    window.scrollTo(0, 0);
  }

  const splash = document.getElementById('splash');
  const site = document.getElementById('site-wrap');
  const skipBtn = document.getElementById('splash-skip');

  // Initialize React Bits ParticleText on intro screen
  const introEl = document.getElementById('intro-particle-text');
  let particleInstance = null;
  if (introEl && window.ParticleText) {
    particleInstance = new window.ParticleText(introEl, {
      text: 'STHAPATYA',
      particleSize: 2,
      density: window.innerWidth < 768 ? 2 : 4,
      color: '#ffffff',
      highlightColor: '#8b5cf6',
      scatter: 160,
      gatherDuration: 1200,
      stagger: 300,
      pointerRepel: 40,
      repelRadius: 120,
      idleDrift: 0.6,
      trigger: 'hover',
      fontSize: 'clamp(2.8rem, 11vw, 7.5rem)',
      fontWeight: 800,
      fontFamily: 'inherit',
      glow: true
    });
  }

  let splashDismissed = false;
  const dismissSplash = () => {
    if (splashDismissed) return;
    splashDismissed = true;

    if (splash) {
      splash.classList.add('done');
      if (site) site.classList.add('show');

      // Wake up WebGL and 3D carousels smoothly
      requestAnimationFrame(() => {
        if (window.galleryCarousel) window.galleryCarousel.wake();
        if (window.eventsAccordion && typeof window.eventsAccordion.applyLayout === 'function') {
          window.eventsAccordion.applyLayout(false);
        }
      });

      setTimeout(() => {
        if (particleInstance) particleInstance.destroy();
        splash.remove();
        if (window.galleryCarousel) window.galleryCarousel.wake();
      }, 700);
    }
  };

  // 1. User clicks "Skip Intro"
  if (skipBtn) {
    skipBtn.addEventListener('click', e => {
      e.stopPropagation();
      dismissSplash();
    });
  }

  // 2. User presses Escape or Enter or scrolls / taps
  const onQuickDismiss = () => dismissSplash();
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' || e.key === 'Enter') dismissSplash();
  }, { once: true });
  window.addEventListener('wheel', onQuickDismiss, { passive: true, once: true });
  window.addEventListener('touchmove', onQuickDismiss, { passive: true, once: true });

  // 3. Fast auto-dismiss after intro gather (~1.5s instead of 3.2s delay)
  setTimeout(dismissSplash, 1500);

  // Initialize components immediately so geometry is measured accurately
  renderCards();
  renderAccordionGallery();
  renderGalleryCarousel();
  renderHeroDepthText();
  initHeroStructureTilt();
  initReveal();
  checkHash();
});


// ═══════════════════════════════════════
// COUNTDOWN
// ═══════════════════════════════════════

const TARGET = new Date('2026-10-09T10:00:00+05:30');

function tick() {
  const diff = Math.max(0, TARGET - new Date());
  const d = Math.floor(diff / 864e5);
  const h = Math.floor((diff % 864e5) / 36e5);
  const m = Math.floor((diff % 36e5) / 6e4);
  const s = Math.floor((diff % 6e4) / 1e3);
  const pad = n => String(n).padStart(2, '0');
  const dEl = document.getElementById('cd-d');
  if (dEl) {
    dEl.textContent = pad(d);
    document.getElementById('cd-h').textContent = pad(h);
    document.getElementById('cd-m').textContent = pad(m);
    document.getElementById('cd-s').textContent = pad(s);
  }
}

tick();
setInterval(tick, 1000);


// ═══════════════════════════════════════
// NAVBAR (Throttled Scroll)
// ═══════════════════════════════════════

let navScrollTicking = false;
const navElement = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (!navScrollTicking) {
    requestAnimationFrame(() => {
      if (navElement) navElement.classList.toggle('scrolled', window.scrollY > 40);
      navScrollTicking = false;
    });
    navScrollTicking = true;
  }
}, { passive: true });

const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('on');
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('on');
      menu.classList.remove('open');
    });
  });
}


// ═══════════════════════════════════════
// RENDER EVENT CARDS
// ═══════════════════════════════════════

function renderCards() {
  const grid = document.getElementById('events-grid');

  EVENTS.forEach((ev, i) => {
    const el = document.createElement('div');
    el.className = `ev-card reveal reveal-d${i + 1}`;
    el.setAttribute('data-id', ev.id);
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');

    const sheetNo = `CE-DWG-0${i + 1}`;

    el.innerHTML = `
      <div class="card-beam" style="background:${ev.accent};"></div>
      <div class="card-inner">
        <div class="card-dwg-header">
          <span class="card-dwg-num">⌖ SHEET ${sheetNo}</span>
          <span>ZONE: BLDG 9 · FIELD SCALE</span>
        </div>
        <div class="card-icon-wrap" style="background:${ev.iconBg};">${ev.icon}</div>
        <div class="card-cat" style="color:${ev.catColor};">${ev.category}</div>
        <h3 class="card-name">${ev.title}</h3>
        <div class="card-tag">"${ev.tagline}"</div>
        <p class="card-excerpt">${ev.shortDesc}</p>
        <div class="card-chips">
          ${ev.stages ? `<span class="chip chip--stages" style="border-color:${ev.catColor}60;color:${ev.catColor};"><span class="chip-ico">🏆</span>2 Stages</span>` : ''}
          <span class="chip"><span class="chip-ico">👥</span>${ev.teamSize}</span>
          <span class="chip"><span class="chip-ico">⏱️</span>${ev.duration}</span>
          <span class="chip"><span class="chip-ico">💰</span>PCCOE: ${ev.feePCCOE}</span>
        </div>
        <div class="card-bottom">
          <span class="details-link" style="color:${ev.catColor};">View Details <span>→</span></span>
          <span class="prize-tag" style="color:${ev.catColor};border-color:${ev.catColor}30;">🏆 ${ev.prize}</span>
        </div>
      </div>
    `;

    el.addEventListener('click', () => {
      if (window.eventsAccordion) window.eventsAccordion.setActiveById(ev.id);
      showModal(ev.id);
    });
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        if (window.eventsAccordion) window.eventsAccordion.setActiveById(ev.id);
        showModal(ev.id);
      }
    });
    grid.appendChild(el);
  });
}


// ═══════════════════════════════════════
// RENDER ACCORDION GALLERY (React Bits + Interactive CAD Suite)
// ═══════════════════════════════════════

function renderAccordionGallery() {
  const container = document.getElementById('events-accordion-gallery');
  if (!container || !window.AccordionGallery) return;

  const imageMap = {
    'the-site-investigation': 'assets/events/site-investigation.jpg',
    '3d-showdown': 'assets/events/3d-showdown.jpg',
    'cadnova': 'assets/events/cadnova.jpg',
    'structural-showdown': 'assets/events/structural-showdown.jpg',
    'beyond-the-benchmark': 'assets/events/beyond-the-benchmark.jpg',
    'ecovision': 'assets/events/ecovision.jpg'
  };

  const galleryItems = EVENTS.map((ev, i) => ({
    id: ev.id,
    label: `${ev.icon} ${ev.title}`,
    title: ev.title,
    icon: ev.icon,
    subtitle: ev.subtitle,
    tagline: ev.tagline,
    category: ev.category,
    catColor: ev.catColor,
    prize: ev.prize,
    teamSize: ev.teamSize,
    date: ev.date,
    venue: ev.venue,
    feePCCOE: ev.feePCCOE,
    feeOther: ev.feeOther,
    shortDesc: ev.shortDesc,
    stages: ev.stages,
    formLink: ev.formLink,
    image: imageMap[ev.id] || 'assets/events/cadnova.jpg',
    alt: `${ev.title} — ${ev.subtitle}`,
    link: `#${ev.id}`
  }));

  window.eventsAccordion = new window.AccordionGallery(container, {
    items: galleryItems,
    defaultIndex: 2,
    expandRatio: 0.54,
    trigger: 'hover',
    accentColor: '#e8a020',
    overlayColor: '#08090c',
    textColor: '#ffffff',
    height: 450,
    gap: 12,
    radius: 16,
    duration: 0.6,
    ease: 'power3.out',
    parallax: 0.5,
    tilt: 8,
    stagger: 0.06,
    grayscale: true,
    showLabels: true,
    autoPlay: false,
    autoPlayInterval: 4800,
    onSelect: item => {
      if (item && item.id) {
        showModal(item.id, false);
      }
    },
    onRegister: item => {
      if (item && item.id) {
        showModal(item.id, true);
      }
    }
  });
}


// ═══════════════════════════════════════
// GALLERY CAROUSEL (React Bits FlexCarousel)
// ═══════════════════════════════════════

// NOTE FOR USER: Real Sthapatya event photos. When you send more photos, we append them here!
const GALLERY_ITEMS = [
  {
    src: 'assets/gallery/gallery-07.jpg',
    alt: 'Dignitaries and student coordinators inaugurating the event by cutting the ceremonial ribbon',
    title: 'Ribbon-Cutting & Event Launch',
    subtitle: 'Official Inauguration · CiESA Sthapatya'
  },
  {
    src: 'assets/gallery/gallery-05.jpg',
    alt: 'CiESA Sthapatya 2026 Grand Inauguration Ceremony with students and faculty',
    title: 'Inauguration Ceremony',
    subtitle: 'Flagship National Symposium Kickoff'
  },
  {
    src: 'assets/gallery/gallery-25.jpg',
    alt: 'Faculty dignitaries holding up and unveiling the official Sthapatya symposium souvenir brochure on stage',
    title: 'Sthapatya Souvenir Unveiling',
    subtitle: 'Official Brochure Release & Faculty Felicitation'
  },
  {
    src: 'assets/gallery/gallery-08.jpg',
    alt: 'Civil engineering faculty dignitaries with CiESA student coordinators and organizing team',
    title: 'Faculty Dignitaries & Student Leads',
    subtitle: 'Surveying & Civil Engineering Labs'
  },
  {
    src: 'assets/gallery/gallery-06.jpg',
    alt: 'Civil engineering faculty members and students attending keynote session',
    title: 'Keynote & Faculty Address',
    subtitle: 'Department of Civil Engineering · PCCOE'
  },
  {
    src: 'assets/gallery/gallery-21.jpg',
    alt: 'CiESA volunteer team standing under decorative surveying chains and pennants along the department corridor',
    title: 'Civil Corridor & CiESA Volunteers',
    subtitle: 'Festive Civil Decor & Ground Coordination'
  },
  {
    src: 'assets/gallery/gallery-04.jpg',
    alt: 'CiESA student coordinators and organizers with the vibrant Sthapatya emblem at PCCOE',
    title: 'Sthapatya Arena & CiESA Crew',
    subtitle: 'PCCOE Campus Grounds · Building No. 9'
  },
  {
    src: 'assets/gallery/gallery-09.jpg',
    alt: 'CiESA coordinators in team hoodies managing events and supporting participants',
    title: 'CiESA Volunteers & Operations',
    subtitle: 'Building No. 9 · Team Coordination'
  },
  {
    src: 'assets/gallery/gallery-16.jpg',
    alt: 'Coordinator explaining event rules and problem statement to participants seated in classroom',
    title: 'Participant Briefing & Problem Statement',
    subtitle: 'Competition Orientation · Building No. 9'
  },
  {
    src: 'assets/gallery/gallery-22.jpg',
    alt: 'Classroom session with participants listening to coordinators in front of a whiteboard scoring matrix',
    title: 'Event Briefing & Scoring Grid',
    subtitle: 'Classroom Round Setup & Participant Rules'
  },
  {
    src: 'assets/gallery/gallery-17.jpg',
    alt: 'Coordinators conducting interactive technical challenge round with student teams',
    title: 'Civil Technical Quiz & Debate',
    subtitle: 'Rapid Response & Structural Logic'
  },
  {
    src: 'assets/gallery/gallery-18.jpg',
    alt: 'Civil engineering students aligning and taking level measurements using an electronic total station on PCCOE campus field',
    title: 'Total Station & Geodetic Surveying',
    subtitle: 'Beyond the Benchmark · Precision Field Sighting'
  },
  {
    src: 'assets/gallery/gallery-26.jpg',
    alt: 'Civil engineering student sighting through an auto level telescope on tripod while partner records field book readings',
    title: 'Auto Level & Differential Leveling',
    subtitle: 'Beyond the Benchmark · Staff & Instrument Sighting'
  },
  {
    src: 'assets/gallery/gallery-01.jpg',
    alt: 'Civil engineering students collaborating on structural bridge and truss models',
    title: 'Truss Showdown Workshop',
    subtitle: 'Model Fabrication & Limit State Assembly'
  },
  {
    src: 'assets/gallery/gallery-02.jpg',
    alt: 'Team of participants assembling structural frame members with precision instruments',
    title: 'Structural Precision Challenge',
    subtitle: 'Hands-on Engineering & Alignment'
  },
  {
    src: 'assets/gallery/gallery-11.jpg',
    alt: 'Student incrementally adding gravel weight to suspended bucket to test truss bridge capacity',
    title: 'Structural Load & Failure Testing',
    subtitle: 'Truss Deflection & Breaking Stress Challenge'
  },
  {
    src: 'assets/gallery/gallery-23.jpg',
    alt: 'Faculty members and jury seated at evaluation table inside the Civil Engineering Materials Testing Laboratory',
    title: 'Materials & Testing Lab Jury',
    subtitle: 'Faculty Scrutiny Desk · Concrete & Testing Lab'
  },
  {
    src: 'assets/gallery/gallery-03.jpg',
    alt: 'Student presenting environmental engineering and sustainable development research project to jury',
    title: 'ECOVISION & Project Defense',
    subtitle: 'Poster Evaluation & Jury Scrutiny'
  },
  {
    src: 'assets/gallery/gallery-10.jpg',
    alt: 'Students defending their environmental research paper in front of faculty jury',
    title: 'Green Tech & SDG Research',
    subtitle: 'Carbon Footprint & Eco-Resilient Planning'
  },
  {
    src: 'assets/gallery/gallery-24.jpg',
    alt: 'Student presenting research on methods for estimating evaporation in front of PCCOE Civil SDG Cell banner',
    title: 'Hydrology & Evaporation Analysis',
    subtitle: 'SDG Cell & Water Resources Research Defense'
  },
  {
    src: 'assets/gallery/gallery-27.jpg',
    alt: 'Tug-of-war anchor and team straining against rope on red clay sports ground with cheering crowd',
    title: 'Tug-of-War Anchor & Power Pull',
    subtitle: 'Annual Sports & Civil Spirit on Red Clay'
  },
  {
    src: 'assets/gallery/gallery-28.jpg',
    alt: 'Civil engineering students in synchronized pull during tug of war contest with dust kicking up from the red clay pitch',
    title: 'Tug-of-War Turf Battle',
    subtitle: 'Red Clay Grit, Dust & Team Camaraderie'
  },
  {
    src: 'assets/gallery/gallery-20.jpg',
    alt: 'Evaluation committee and student teams celebrating with event mementos in front of scoring board',
    title: 'Scrutiny & Evaluation Committee',
    subtitle: 'Round Scoring & Memento Distribution'
  },
  {
    src: 'assets/gallery/gallery-12.jpg',
    alt: 'Audience of professors, participants, and students applauding in the PCCOE conference hall',
    title: 'Valedictory & Plenary Session',
    subtitle: 'PCCOE Auditorium & Conference Hall'
  },
  {
    src: 'assets/gallery/gallery-13.jpg',
    alt: 'Distinguished faculty member delivering address from the podium to the student assembly',
    title: 'Presidential Address & Remarks',
    subtitle: 'CiESA Annual Symposium Assembly'
  },
  {
    src: 'assets/gallery/gallery-14.jpg',
    alt: 'Winning student participants receiving achievement certificates from faculty on PCCOE stage',
    title: 'Prize Distribution & Felicitation',
    subtitle: 'Celebrating Winners & Excellence'
  },
  {
    src: 'assets/gallery/gallery-15.jpg',
    alt: 'Grand group photograph of the complete CiESA student organizing committee on PCCOE auditorium stage',
    title: 'CiESA Organizing Secretariat',
    subtitle: 'The Architects of Sthapatya 2026–27'
  },
  {
    src: 'assets/gallery/gallery-19.jpg',
    alt: 'Grand group photo of faculty members, jury, student organizers, and participants in the PCCOE conference hall',
    title: 'Sthapatya Grand Symposium Conclave',
    subtitle: 'Department of Civil Engineering & CiESA'
  }
];

function renderGalleryCarousel() {
  const container = document.getElementById('flex-carousel-root');
  if (!container || !window.FlexCarousel) return;

  if (window.galleryCarousel) {
    window.galleryCarousel.wake();
    return;
  }

  window.galleryCarousel = new window.FlexCarousel(container, {
    items: GALLERY_ITEMS,
    preset: 'liquid',
    intro: 'rise',
    cardHeight: 0.52,
    gap: 16,
    radius: 14,
    fit: 'natural',
    tilt: 58,
    bend: 0.36,
    squeeze: 0.22,
    focusOnClick: true,
    autoplay: true,
    interval: 4.5,
    captions: true,
    captureWheel: true
  });
}



// ═══════════════════════════════════════
// RENDER HERO DEPTH TEXT (React Bits)
// ═══════════════════════════════════════

function renderHeroDepthText() {
  const container = document.getElementById('hero-depth-text');
  if (!container || !window.DepthText) return;

  const isMobile = window.innerWidth < 768;

  new window.DepthText(container, {
    text: 'STHAPATYA',
    html: 'STHAPAT<span class="thin">Y</span>A',
    layers: isMobile ? 6 : 10,
    depth: 2.2,
    faceColor: '#f8fafc',
    depthColor: '#7c3aed',
    tilt: isMobile ? 6 : 9,
    pointerTracking: true,
    smoothing: 0.12,
    perspective: 850,
    autoOrbit: true,
    orbitSpeed: isMobile ? 0.25 : 0.38,
    fontSize: 'clamp(2.4rem, 7.5vw, 5.2rem)',
    fontWeight: 900,
    shadow: true
  });
}

// ═══════════════════════════════════════
// HERO STRUCTURE 3D INTERACTIVE TILT (Synchronized with Hero)
// ═══════════════════════════════════════

function initHeroStructureTilt() {
  const hero = document.getElementById('hero');
  const structure = document.querySelector('.hero-structure');
  if (!hero || !structure) return;

  let currentX = 0, currentY = 0;
  let targetX = 0, targetY = 0;
  let isHovered = false;
  let rafId = null;

  const onMove = (clientX, clientY) => {
    const rect = hero.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    isHovered = true;
    const x = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    targetX = -Math.max(-1, Math.min(1, y)) * 11;
    targetY = Math.max(-1, Math.min(1, x)) * 13;
    startLoop();
  };

  const onEnd = () => {
    isHovered = false;
    targetX = 0;
    targetY = 0;
    startLoop();
  };

  hero.addEventListener('pointermove', e => onMove(e.clientX, e.clientY), { passive: true });
  hero.addEventListener('pointerleave', onEnd);
  window.addEventListener('blur', onEnd);

  const startLoop = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(loop);
  };

  const loop = () => {
    const dx = targetX - currentX;
    const dy = targetY - currentY;
    currentX += dx * 0.1;
    currentY += dy * 0.1;
    structure.style.transform = `perspective(900px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg)`;

    // Only continue animation loop while moving or hovered; sleep when settled
    if (Math.abs(dx) > 0.02 || Math.abs(dy) > 0.02 || isHovered) {
      rafId = requestAnimationFrame(loop);
    } else {
      currentX = targetX;
      currentY = targetY;
      structure.style.transform = `perspective(900px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg)`;
      rafId = null;
    }
  };
}


// ═══════════════════════════════════════
// EVENT DETAIL MODAL
// ═══════════════════════════════════════

const bg = document.getElementById('modal-bg');
const panel = document.getElementById('modal-panel');

function showModal(id, focusRegister = false) {
  const ev = EVENTS.find(e => e.id === id);
  if (!ev) return;

  let stagesHTML = '';
  if (ev.stages) {
    stagesHTML = `
      <div class="m-section m-section--stages">
        <div class="m-sec-title">🏆 Event Structure (${ev.stages.length} Stages)</div>
        <div class="m-stages-grid">
          ${ev.stages.map((st, sIdx) => `
            <div class="m-stage-card">
              <div class="m-stage-header">
                <span class="m-stage-badge">${st.stage}</span>
                <span class="m-stage-tag">${st.badge || (sIdx === 0 ? 'Digital Submission' : 'Campus Presentation')}</span>
              </div>
              <p class="m-stage-desc">${st.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>`;
  }

  let schedHTML = '';
  if (ev.scheduleDays) {
    schedHTML = `
      <div class="m-section">
        <div class="m-sec-title">📋 Schedule Breakdown</div>
        <ul>
          <li><strong>Day 1:</strong> ${ev.scheduleDays.day1}</li>
          <li><strong>Day 2:</strong> ${ev.scheduleDays.day2}</li>
        </ul>
      </div>`;
  }

  let roundsHTML = '';
  if (ev.rounds) {
    roundsHTML = `
      <div class="m-section">
        <div class="m-sec-title">🎯 Event Format & Rounds</div>
        <ul>
          ${ev.rounds.map(r => `<li><strong>${r.name}:</strong> ${r.desc}</li>`).join('')}
        </ul>
      </div>`;
  }

  const regBtn = ev.formLink
    ? `<div class="m-registration-hub" id="modal-reg-hub">
         <div class="m-reg-hub-header">
           <div class="m-reg-hub-badge">OFFICIAL REGISTRATION PORTAL</div>
           <div class="m-reg-hub-status">● Live & Accepting Submissions</div>
         </div>

         <!-- Primary Direct 1-Tap CTA: Native <a> is 100% UNBLOCKABLE on iOS Safari & All Mobile Browsers -->
         <a href="${ev.formLink}" target="_blank" rel="noopener noreferrer" class="m-direct-reg-btn" id="m-direct-reg-btn" aria-label="Open official registration form for ${ev.title}">
           <div class="m-reg-btn-left">
             <span class="m-reg-btn-bolt">⚡</span>
             <div class="m-reg-btn-text-group">
               <span class="m-reg-btn-title">Register for ${ev.title}</span>
               <span class="m-reg-btn-subtitle">Direct Google Form · Instant Submission · Free for PCCOE</span>
             </div>
           </div>
           <span class="m-reg-btn-arrow">↗</span>
         </a>

         <div class="m-reg-divider">
           <span>OR SWIPE / TAP SLIDER</span>
         </div>

         <!-- Interactive SlideCommit Slider with Tap & Swipe Support -->
         <div class="m-slide-commit-wrap">
           <div id="modal-slide-commit" class="modal-slide-box"></div>
           <span class="m-slide-commit-hint">⚡ Tap or slide handle to register</span>
         </div>

         <!-- Fallback direct link for iOS / In-App Browsers -->
         <div class="m-reg-fallback-wrap">
           <span class="m-fallback-icon">📱</span>
           <span class="m-fallback-label">iOS / WhatsApp / Instagram user?</span>
           <a href="${ev.formLink}" target="_blank" rel="noopener noreferrer" class="m-fallback-link">
             Tap here to open link directly ↗
           </a>
         </div>
       </div>`
    : `<div class="m-register" style="opacity:0.5;cursor:default;">Registration Link Coming Soon</div>`;

  panel.innerHTML = `
    <div class="m-beam" style="background:${ev.accent};"></div>
    <div class="m-head">
      <button class="m-close" id="m-close">✕</button>
      <div class="m-icon">${ev.icon}</div>
      <div class="m-cat" style="color:${ev.catColor};">${ev.category}</div>
      <h2 class="m-title">${ev.title}</h2>
      <div class="m-tagline">"${ev.tagline}" — ${ev.theme}</div>
    </div>
    <div class="m-facts">
      <div class="m-fact"><div class="f-ico">👥</div><div class="f-lbl">Team</div><div class="f-val">${ev.teamSize}</div></div>
      <div class="m-fact"><div class="f-ico">📅</div><div class="f-lbl">Date</div><div class="f-val">${ev.date}</div></div>
      <div class="m-fact"><div class="f-ico">🏆</div><div class="f-lbl">Prize</div><div class="f-val">${ev.prize}</div></div>
      <div class="m-fact"><div class="f-ico">💰</div><div class="f-lbl">PCCOE Fee</div><div class="f-val">${ev.feePCCOE}</div></div>
      <div class="m-fact"><div class="f-ico">💳</div><div class="f-lbl">Others</div><div class="f-val">${ev.feeOther}</div></div>
      <div class="m-fact"><div class="f-ico">📍</div><div class="f-lbl">Venue</div><div class="f-val">${ev.venue}</div></div>
      <div class="m-fact"><div class="f-ico">🚨</div><div class="f-lbl">Deadline</div><div class="f-val">${ev.lastDate}</div></div>
    </div>
    <div class="m-body">
      <div class="m-section"><div class="m-sec-title">📌 Description</div><p>${ev.fullDesc}</p></div>
      ${stagesHTML}
      <div class="m-section"><div class="m-sec-title">🎯 Objective</div><p>${ev.objective}</p></div>
      ${schedHTML}
      ${roundsHTML}
      <div class="m-section"><div class="m-sec-title">📋 Rules & Regulations</div><ol>${ev.rules.map(r=>`<li>${r}</li>`).join('')}</ol></div>
      <div class="m-section"><div class="m-sec-title">🧰 Materials</div><ul>${ev.materials.map(m=>`<li>${m}</li>`).join('')}</ul></div>
      <div class="m-section"><div class="m-sec-title">⚠️ Important Notes</div><ul>${ev.notes.map(n=>`<li>${n}</li>`).join('')}</ul></div>
      <div class="m-section">
        <div class="m-sec-title">📞 Coordinators</div>
        <div class="coord-row">
          ${ev.coordinators.map(c => `
            <div class="coord">
              <span class="c-name">${c.name}</span>
              <a href="${c.tel}" class="c-phone">${c.phone}</a>
            </div>`).join('')}
        </div>
      </div>
      ${regBtn}
    </div>`;

  // Initialize React Bits SlideCommit inside modal
  if (ev.formLink && window.SlideCommit) {
    const slideBox = document.getElementById('modal-slide-commit');
    if (slideBox) {
      new window.SlideCommit(slideBox, {
        label: 'Register Now',
        doneLabel: 'Form Opened! ↗',
        errorLabel: 'Tap to Retry',
        trackColor: '#12151c',
        handleColor: ev.accent || '#e8a020',
        successColor: '#22c55e',
        dangerColor: '#e5484d',
        width: '100%',
        height: 56,
        radius: 28,
        speed: 50,
        returnBounce: 0.38,
        landingDip: 0.026,
        holdMs: 2000,
        onConfirm: () => {
          // Open SYNCHRONOUSLY within the gesture event so iOS Safari doesn't block it!
          try {
            const newWindow = window.open(ev.formLink, '_blank', 'noopener,noreferrer');
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
              // Popup blocked by iOS Safari / browser setting -> redirect directly
              window.location.href = ev.formLink;
            }
          } catch (e) {
            window.location.href = ev.formLink;
          }
          return Promise.resolve();
        },
        onDone: () => {
          console.log(`Registered: ${ev.title}`);
        }
      });
    }
  }

  bg.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('m-close').addEventListener('click', hideModal);
  history.pushState(null, '', `#${ev.id}`);

  if (focusRegister) {
    setTimeout(() => {
      const regBtnEl = document.getElementById('m-direct-reg-btn');
      if (regBtnEl) {
        regBtnEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        regBtnEl.classList.add('pulse-focus');
      }
    }, 180);
  }
}

function hideModal() {
  bg.classList.remove('open');
  document.body.style.overflow = '';
  history.pushState(null, '', location.pathname);
}

bg.addEventListener('click', e => { if (e.target === bg) hideModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') hideModal(); });

function checkHash() {
  const h = location.hash.slice(1);
  if (h && EVENTS.find(e => e.id === h)) {
    setTimeout(() => showModal(h), 600);
  }
}


// ═══════════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════════

function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
