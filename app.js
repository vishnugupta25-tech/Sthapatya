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
    formLink: null
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
    shortDesc: "Transform a digital concept into a tangible 3D-printed model — creativity meets fabrication.",
    fullDesc: "Have an idea? Bring it to life! Put your creativity, design skills, and 3D-printing abilities to the test as you transform a digital concept into a real, tangible 3D model using 3D printers. This isn't just about making a model — it's about turning imagination into innovation, one layer at a time.",
    objective: "Design, model, slice, and fabricate an optimized, functional 3D prototype that solves a given structural/spatial problem.",
    teamSize: "2 – 3",
    duration: "10 AM onwards",
    feePCCOE: "FREE",
    feeOther: "₹200/team",
    prize: "Up to ₹5,000",
    date: "9–10 Oct 2026",
    lastDate: "4th Oct 2026",
    venue: "Building No. 9, PCCOE",
    rules: [
      "Teams must have 2 to 3 members.",
      "All models must be original designs created during the designated event rounds.",
      "Slicing settings and material usage must adhere to jury-specified parameters.",
      "Decision of the jury on model precision, printability, and aesthetics is final."
    ],
    materials: [
      "3D printers and designated workstations available at venue.",
      "Slicer software pre-installed on lab systems."
    ],
    notes: [
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
  }
];


// ═══════════════════════════════════════
// SPLASH — auto dismiss after 3 seconds
// ═══════════════════════════════════════

window.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const site = document.getElementById('site-wrap');

  setTimeout(() => {
    splash.classList.add('done');
    site.style.display = 'block';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => site.classList.add('show'));
    });
    setTimeout(() => splash.remove(), 1000);
  }, 3000);

  renderCards();
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
  document.getElementById('cd-d').textContent = pad(d);
  document.getElementById('cd-h').textContent = pad(h);
  document.getElementById('cd-m').textContent = pad(m);
  document.getElementById('cd-s').textContent = pad(s);
}

tick();
setInterval(tick, 1000);


// ═══════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════

window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 50);
});

const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');

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

    el.innerHTML = `
      <div class="card-beam" style="background:${ev.accent};"></div>
      <div class="card-inner">
        <div class="card-icon-wrap" style="background:${ev.iconBg};">${ev.icon}</div>
        <div class="card-cat" style="color:${ev.catColor};">${ev.category}</div>
        <h3 class="card-name">${ev.title}</h3>
        <div class="card-tag">"${ev.tagline}"</div>
        <p class="card-excerpt">${ev.shortDesc}</p>
        <div class="card-chips">
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

    el.addEventListener('click', () => showModal(ev.id));
    el.addEventListener('keydown', e => { if (e.key === 'Enter') showModal(ev.id); });
    grid.appendChild(el);
  });
}


// ═══════════════════════════════════════
// EVENT DETAIL MODAL
// ═══════════════════════════════════════

const bg = document.getElementById('modal-bg');
const panel = document.getElementById('modal-panel');

function showModal(id) {
  const ev = EVENTS.find(e => e.id === id);
  if (!ev) return;

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

  const regBtn = ev.formLink
    ? `<a href="${ev.formLink}" target="_blank" rel="noopener" class="m-register">Register Now →</a>`
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
      <div class="m-section"><div class="m-sec-title">🎯 Objective</div><p>${ev.objective}</p></div>
      ${schedHTML}
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

  bg.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('m-close').addEventListener('click', hideModal);
  history.pushState(null, '', `#${ev.id}`);
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
