/* ═══════════════════════════════════════════════════
   STHAPATYA 2026-27 — Application Logic
   CiESA – PCCOE
   ═══════════════════════════════════════════════════ */

// ── EVENT DATA (Single Source of Truth) ──
const EVENTS_DATA = [
  {
    id: "the-site-investigation",
    icon: "🔎",
    title: "THE SITE INVESTIGATION",
    subtitle: "A Treasure Hunt Experience",
    tagline: "Explore. Decipher. Discover.",
    themeSlogan: "It's more than a hunt, it's a perspective. Think beyond the obvious. Follow the clues. Find the way.",
    category: "Treasure Hunt",
    categoryColor: "#10b981",
    accentGradient: "linear-gradient(135deg, #10b981, #22d3ee)",
    iconBg: "rgba(16, 185, 129, 0.12)",
    shortDesc: "Step into a world of clues, maps, challenges & real-world civil investigation across campus.",
    fullDesc: "Ready to investigate, decode & discover? CiESA – STHAPATYA presents The Site Investigation! This isn't just a simple hunt — it's about how you explore, decipher, and discover. Teams will navigate clues, interpret campus maps, solve situational civil and logical puzzles, and complete investigatory checkpoints across Building No. 9 and PCCOE grounds.",
    objective: "Decode cryptic clues, analyze location footprints, think critically under pressure, and reach the final investigation objective in the shortest time.",
    teamSize: "2 – 3 Members",
    duration: "10 AM onwards",
    feePCCOE: "FREE",
    feeOther: "₹100 / team",
    prizePool: "Up to ₹5,000",
    date: "9–10 October 2026",
    lastDate: "8th October 2026",
    venue: "Building No. 9, PCCOE",
    rules: [
      "Teams must consist of 2 to 3 members.",
      "All team members must carry valid college Identity Cards.",
      "Clues must be solved in the designated sequence; skipping checkpoints will lead to penalty or disqualification.",
      "Any damage to campus property or unauthorized interference will result in immediate disqualification.",
      "The decision of the CiESA organizing committee and event judges is final."
    ],
    materials: [
      "Clue sheets, maps, and checkpoint stamps provided at the venue.",
      "Teams must carry at least one fully charged smartphone for communications and emergency alerts."
    ],
    importantNotes: [
      "Free for PCCOE students (requires valid College PRN/ID).",
      "₹100 per team for external college participants.",
      "Register before 8th October 2026."
    ],
    coordinators: [
      { name: "Arya Bhor", phone: "+91 8624943235", tel: "tel:+918624943235" },
      { name: "Harshali Bhilkar", phone: "+91 8624807812", tel: "tel:+918624807812" }
    ],
    registerLink: null
  },
  {
    id: "3d-showdown",
    icon: "🖨️",
    title: "3-D SHOWDOWN",
    subtitle: "The Ultimate 3D Model-Printing Challenge",
    tagline: "Design It. Model It. Print It. Show It.",
    themeSlogan: "Think in 3D. Build in 3D. Own the Showdown. Turning imagination into innovation, one layer at a time.",
    category: "3D Printing",
    categoryColor: "#a78bfa",
    accentGradient: "linear-gradient(135deg, #a78bfa, #f472b6)",
    iconBg: "rgba(167, 139, 250, 0.12)",
    shortDesc: "Put your creativity and design skills to the test — transform a digital concept into a tangible 3D-printed model.",
    fullDesc: "Have an idea? Bring it to life! Put your creativity, design skills, and 3D-printing abilities to the test as you transform a digital concept into a real, tangible 3D model using 3D printers. This isn't just about making a model — it's about turning imagination into innovation, one layer at a time.",
    objective: "Design, model, slice, and fabricate an optimized, functional 3D prototype that solves a given structural/spatial problem.",
    teamSize: "2 – 3 Members",
    duration: "10 AM onwards",
    feePCCOE: "FREE",
    feeOther: "₹200 / team",
    prizePool: "Up to ₹5,000",
    date: "9–10 October 2026",
    lastDate: "4th October 2026",
    venue: "Building No. 9, PCCOE",
    rules: [
      "Teams must have 2 to 3 members.",
      "All models must be original designs created during the designated event rounds.",
      "Slicing settings and material usage must adhere to the parameters given by the technical jury.",
      "Decision of the jury on model precision, printability, and aesthetics will be final."
    ],
    materials: [
      "3D printers and designated workstations available at venue.",
      "Slicer software pre-installed on lab systems."
    ],
    importantNotes: [
      "Free for PCCOE students.",
      "₹200 per team for external college participants.",
      "Register before 4th October 2026."
    ],
    coordinators: [
      { name: "Parv Rathod", phone: "+91 9145373155", tel: "tel:+919145373155" },
      { name: "Vishnu Gupta", phone: "+91 7499260190", tel: "tel:+917499260190" }
    ],
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSckeJ8YORvzo6XExdpaiuNxK7nqyLbiVM8PdQ-NG5b9jQtCeQ/viewform?usp=publish-editor"
  },
  {
    id: "cadnova",
    icon: "🛠️",
    title: "CADNOVA 2026",
    subtitle: "2-Day AutoCAD Drafting & Design Challenge",
    tagline: "Think. Draft. Engineer. Build the Future.",
    themeSlogan: "The Transition of Civil Engineering — Get a random civil problem → Draft → Design → Add Services → Submit & Compete!",
    category: "AutoCAD Design",
    categoryColor: "#22d3ee",
    accentGradient: "linear-gradient(135deg, #22d3ee, #3b82f6)",
    iconBg: "rgba(34, 211, 238, 0.12)",
    shortDesc: "Put your AutoCAD speed and precision to the test with random problem statements, municipal bye-laws, and service integrations.",
    fullDesc: "CADNOVA 2026 is an intensive 2-day drafting and design challenge where participants are assigned real-time civil problem statements. Teams must draft floor plans, elevations, and cross-sections adhering strictly to NBC/FSI bye-laws, and subsequently integrate electrical and plumbing/sanitary building services with correct ISO/IS colour coding.",
    objective: "Design compliant, accurate, and professional civil engineering drawings with proper layer hierarchy, dimensional precision, and service integration.",
    teamSize: "Solo or Max 2",
    duration: "2-Day Challenge",
    feePCCOE: "FREE",
    feeOther: "₹150 / team",
    prizePool: "₹5,000",
    date: "9–10 October 2026",
    lastDate: "7th October 2026",
    venue: "Lab 9406L, PCCOE Nigdi",
    rules: [
      "Teams can participate solo or as a duo (max 2 members).",
      "All drafting must be completed on designated lab systems using standard CAD software during allotted slots.",
      "Drawings must adhere strictly to National Building Code (NBC) guidelines, FSI restrictions, and local municipal bye-laws.",
      "Day 2 requires correct ISO/IS standard line weights and color coding for electrical and plumbing utilities."
    ],
    materials: [
      "Desktop workstations with licensed AutoCAD installed.",
      "Problem statement sheets and scratch paper provided."
    ],
    importantNotes: [
      "Day 1: Planning • AutoCAD • Plan/Elevation/Section • NBC/FSI Compliance • Scrutiny",
      "Day 2: Electrical • Plumbing/Sanitary • ISO/IS Colour Coding • Final Submission • Results",
      "Evaluation: Accuracy • Compliance • Drafting Quality • Presentation"
    ],
    scheduleDays: {
      day1: "Planning • AutoCAD • Plan/Elevation/Section • NBC/FSI/Bye-laws Compliance • Scrutiny",
      day2: "Electrical Layout • Plumbing/Sanitary Services • ISO/IS Colour Coding • Final Submission • Results"
    },
    coordinators: [
      { name: "Vrushank Shirsath", phone: "+91 8888909419", tel: "tel:+918888909419" },
      { name: "Shruti S Pagaree", phone: "+91 8421711369", tel: "tel:+918421711369" }
    ],
    registerLink: "https://forms.gle/13BrzGNz1vbY3D3o8"
  }
];


// ═══════════════════════════════════════════════════
// INTRO SCREEN
// ═══════════════════════════════════════════════════

// Generate floating particles
(function generateParticles() {
  const container = document.getElementById('intro-particles');
  if (!container) return;
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 8 + 's';
    p.style.animationDuration = (6 + Math.random() * 6) + 's';
    const hue = Math.random() > 0.5 ? '45, 100%, 50%' : '187, 92%, 53%'; // amber or cyan
    p.style.background = `hsl(${hue})`;
    p.style.width = (2 + Math.random() * 3) + 'px';
    p.style.height = p.style.width;
    container.appendChild(p);
  }
})();

// Enter button transition
document.getElementById('intro-enter-btn').addEventListener('click', () => {
  const intro = document.getElementById('intro-screen');
  const mainSite = document.getElementById('main-site');

  intro.classList.add('hide');
  mainSite.style.display = 'block';

  // Small delay to allow display: block to render before opacity animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      mainSite.classList.add('visible');
    });
  });

  // Remove intro from DOM after animation completes
  setTimeout(() => {
    intro.style.display = 'none';
    document.body.style.overflow = 'auto';
  }, 900);
});


// ═══════════════════════════════════════════════════
// COUNTDOWN TIMER
// ═══════════════════════════════════════════════════

const EVENT_DATE = new Date('2026-10-09T10:00:00+05:30');

function updateCountdown() {
  const now = new Date();
  const diff = EVENT_DATE - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent = '00';
    document.getElementById('cd-secs').textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
  document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ═══════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════

// Scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile hamburger
const hamburger = document.getElementById('nav-hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});


// ═══════════════════════════════════════════════════
// RENDER EVENT CARDS
// ═══════════════════════════════════════════════════

function renderEventCards() {
  const grid = document.getElementById('events-grid');

  EVENTS_DATA.forEach((event, index) => {
    const card = document.createElement('div');
    card.className = `event-card reveal reveal-delay-${index + 1}`;
    card.setAttribute('data-event-id', event.id);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View details for ${event.title}`);

    card.innerHTML = `
      <div class="card-accent" style="background: ${event.accentGradient};"></div>

      <div class="card-icon" style="background: ${event.iconBg};">
        ${event.icon}
      </div>

      <div class="card-category" style="color: ${event.categoryColor};">${event.category}</div>
      <h3 class="card-title">${event.title}</h3>
      <div class="card-tagline">"${event.tagline}"</div>
      <p class="card-desc">${event.shortDesc}</p>

      <div class="card-meta">
        <span class="meta-pill">
          <span class="pill-icon">👥</span>
          ${event.teamSize}
        </span>
        <span class="meta-pill">
          <span class="pill-icon">⏱️</span>
          ${event.duration}
        </span>
        <span class="meta-pill">
          <span class="pill-icon">💰</span>
          PCCOE: ${event.feePCCOE}
        </span>
      </div>

      <div class="card-footer">
        <span class="view-details">View Details <span>→</span></span>
        <span class="prize-badge">🏆 ${event.prizePool}</span>
      </div>
    `;

    card.addEventListener('click', () => openModal(event.id));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(event.id);
      }
    });

    grid.appendChild(card);
  });
}


// ═══════════════════════════════════════════════════
// EVENT DETAIL MODAL
// ═══════════════════════════════════════════════════

const modalOverlay = document.getElementById('modal-overlay');
const modalEl = document.getElementById('modal');

function openModal(eventId) {
  const event = EVENTS_DATA.find(e => e.id === eventId);
  if (!event) return;

  // Build schedule breakdown HTML if it exists
  let scheduleHTML = '';
  if (event.scheduleDays) {
    scheduleHTML = `
      <div class="modal-section">
        <div class="modal-section-title"><span class="sec-icon">📋</span> Schedule Breakdown</div>
        <ul>
          <li><strong>Day 1:</strong> ${event.scheduleDays.day1}</li>
          <li><strong>Day 2:</strong> ${event.scheduleDays.day2}</li>
        </ul>
      </div>
    `;
  }

  // Build register button
  const registerBtn = event.registerLink
    ? `<a href="${event.registerLink}" target="_blank" rel="noopener noreferrer" class="modal-register-cta">Register Now →</a>`
    : `<div class="modal-register-cta" style="opacity: 0.7; cursor: default;">Registration Link Coming Soon</div>`;

  modalEl.innerHTML = `
    <div class="modal-accent-bar" style="background: ${event.accentGradient};"></div>

    <div class="modal-header">
      <button class="modal-close" id="modal-close-btn" aria-label="Close modal">✕</button>
      <div class="modal-icon">${event.icon}</div>
      <div class="modal-category" style="color: ${event.categoryColor};">${event.category}</div>
      <h2 class="modal-title">${event.title}</h2>
      <div class="modal-tagline">"${event.tagline}"</div>
    </div>

    <div class="modal-facts">
      <div class="fact-item">
        <div class="fact-icon">👥</div>
        <div class="fact-label">Team Size</div>
        <div class="fact-value">${event.teamSize}</div>
      </div>
      <div class="fact-item">
        <div class="fact-icon">📅</div>
        <div class="fact-label">Date</div>
        <div class="fact-value">${event.date}</div>
      </div>
      <div class="fact-item">
        <div class="fact-icon">🏆</div>
        <div class="fact-label">Prize Pool</div>
        <div class="fact-value">${event.prizePool}</div>
      </div>
      <div class="fact-item">
        <div class="fact-icon">💰</div>
        <div class="fact-label">Fee (PCCOE)</div>
        <div class="fact-value">${event.feePCCOE}</div>
      </div>
      <div class="fact-item">
        <div class="fact-icon">💳</div>
        <div class="fact-label">Fee (Others)</div>
        <div class="fact-value">${event.feeOther}</div>
      </div>
      <div class="fact-item">
        <div class="fact-icon">📍</div>
        <div class="fact-label">Venue</div>
        <div class="fact-value">${event.venue}</div>
      </div>
      <div class="fact-item">
        <div class="fact-icon">🚨</div>
        <div class="fact-label">Last Date</div>
        <div class="fact-value">${event.lastDate}</div>
      </div>
    </div>

    <div class="modal-body">
      <div class="modal-section">
        <div class="modal-section-title"><span class="sec-icon">📌</span> Event Description</div>
        <p>${event.fullDesc}</p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title"><span class="sec-icon">🎯</span> Objective</div>
        <p>${event.objective}</p>
      </div>

      ${scheduleHTML}

      <div class="modal-section">
        <div class="modal-section-title"><span class="sec-icon">📋</span> Rules & Regulations</div>
        <ol>
          ${event.rules.map(r => `<li>${r}</li>`).join('')}
        </ol>
      </div>

      <div class="modal-section">
        <div class="modal-section-title"><span class="sec-icon">🧰</span> Materials & Requirements</div>
        <ul>
          ${event.materials.map(m => `<li>${m}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title"><span class="sec-icon">⚠️</span> Important Instructions</div>
        <ul>
          ${event.importantNotes.map(n => `<li>${n}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title"><span class="sec-icon">📞</span> Event Coordinators</div>
        <div class="coordinator-list">
          ${event.coordinators.map(c => `
            <div class="coordinator">
              <span class="coord-name">${c.name}</span>
              <a href="${c.tel}" class="coord-phone">${c.phone}</a>
            </div>
          `).join('')}
        </div>
      </div>

      ${registerBtn}
    </div>
  `;

  // Show modal
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Close button
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);

  // Set URL hash
  history.pushState(null, '', `#${event.id}`);
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
  history.pushState(null, '', window.location.pathname);
}

// Close on overlay click
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Deep-link support
function checkHash() {
  const hash = window.location.hash.slice(1);
  if (hash) {
    const event = EVENTS_DATA.find(e => e.id === hash);
    if (event) {
      // Wait for main site to be visible
      setTimeout(() => openModal(event.id), 500);
    }
  }
}


// ═══════════════════════════════════════════════════
// SCROLL REVEAL ANIMATIONS
// ═══════════════════════════════════════════════════

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}


// ═══════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  renderEventCards();
  initScrollReveal();
  checkHash();
});
