/**
 * AccordionGallery — Interactive CAD Blueprint Edition
 * Dynamic 3D Cursor Parallax, Tactile Navigation, Auto-Tour, Touch & Keyboard Gestures
 */

(function (global) {
  'use strict';

  class AccordionGallery {
    constructor(container, options = {}) {
      this.container = typeof container === 'string' ? document.querySelector(container) : container;
      if (!this.container) return;

      this.items = options.items || [];
      this.count = this.items.length;
      if (!this.count) return;

      this.defaultIndex = options.defaultIndex !== undefined ? options.defaultIndex : 2;
      this.active = Math.min(Math.max(this.defaultIndex, 0), this.count - 1);
      this.accentColor = options.accentColor || '#e8a020';
      this.overlayColor = options.overlayColor || '#08090c';
      this.textColor = options.textColor || '#ffffff';
      this.height = options.height || 450;
      this.gap = options.gap !== undefined ? options.gap : 12;
      this.radius = options.radius !== undefined ? options.radius : 16;
      this.expandRatio = options.expandRatio !== undefined ? options.expandRatio : 0.54;
      this.orientation = options.orientation || 'horizontal';
      this.duration = options.duration !== undefined ? options.duration : 0.6;
      this.ease = options.ease || 'power3.out';
      this.parallax = options.parallax !== undefined ? options.parallax : 0.5;
      this.tilt = options.tilt !== undefined ? options.tilt : 8;
      this.stagger = options.stagger !== undefined ? options.stagger : 0.06;
      this.trigger = options.trigger || 'hover';
      this.showLabels = options.showLabels !== undefined ? options.showLabels : true;
      this.grayscale = options.grayscale !== undefined ? options.grayscale : true;
      this.autoPlay = options.autoPlay !== undefined ? options.autoPlay : false;
      this.autoPlayInterval = options.autoPlayInterval || 4500;
      this.onSelect = options.onSelect || null;
      this.onRegister = options.onRegister || null;

      this.vertical = this.orientation === 'vertical';
      this.panelEls = [];
      this.mediaEls = [];
      this.glareEls = [];
      this.barEls = [];
      this.textEls = [];
      this.contentEls = [];
      this.peekEls = [];
      this.pillEls = [];
      this.currentTl = null;
      this.mediaSize = 340;
      this.firstRun = true;
      this.isPlaying = this.autoPlay;
      this.isHovered = false;
      this.isInView = false;
      this.tourTimer = null;
      this.progressAnim = null;

      this.prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

      this.render();
      this.initEvents();
      if (this.isPlaying) {
        this.startAutoTour();
      }
    }

    render() {
      this.container.innerHTML = '';

      // Outer wrapper holding toolbar and gallery
      this.wrap = document.createElement('div');
      this.wrap.className = 'ag-container-wrap';

      // ── 1. Interactive Toolbar ──
      this.toolbar = document.createElement('div');
      this.toolbar.className = 'ag-toolbar';
      this.toolbar.setAttribute('role', 'toolbar');
      this.toolbar.setAttribute('aria-label', 'Events Gallery Controls');

      // Left: Counter & Status
      const leftBox = document.createElement('div');
      leftBox.className = 'ag-toolbar__left';

      this.counterEl = document.createElement('div');
      this.counterEl.className = 'ag-toolbar__counter';
      this.counterEl.innerHTML = `EVENT <span class="ag-counter-curr">${String(this.active + 1).padStart(2, '0')}</span> / ${String(this.count).padStart(2, '0')}`;

      const statusEl = document.createElement('div');
      statusEl.className = 'ag-toolbar__status';
      statusEl.innerHTML = `<span class="ag-pulse-dot"></span> LIVE CAD SELECTOR`;

      leftBox.appendChild(this.counterEl);
      leftBox.appendChild(statusEl);
      this.toolbar.appendChild(leftBox);

      // Middle: Selector Pills
      this.pillsContainer = document.createElement('div');
      this.pillsContainer.className = 'ag-pills';

      this.items.forEach((item, i) => {
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = `ag-pill${i === this.active ? ' is-active' : ''}`;
        const catCol = item.catColor || this.accentColor;
        pill.style.setProperty('--pill-color', catCol);

        const shortTitle = item.shortTitle || item.title || item.label || `Event ${i + 1}`;
        const cleanTitle = shortTitle.replace(/^[^\w\s]+/, '').trim().split(' ')[0] || `0${i + 1}`;
        const icon = item.icon || '⌖';

        pill.innerHTML = `<span class="ag-pill__dot"></span><span>${String(i + 1).padStart(2, '0')} ${icon} ${cleanTitle}</span>`;
        pill.setAttribute('aria-label', `Select ${item.title || item.label || `Event ${i + 1}`}`);
        pill.addEventListener('click', e => {
          e.stopPropagation();
          this.setActive(i, true);
        });
        this.pillEls.push(pill);
        this.pillsContainer.appendChild(pill);
      });
      this.toolbar.appendChild(this.pillsContainer);

      // Right: Auto-Tour & Navigation Arrows
      const rightBox = document.createElement('div');
      rightBox.className = 'ag-toolbar__right';

      this.tourBtn = document.createElement('button');
      this.tourBtn.type = 'button';
      this.tourBtn.className = `ag-tour-btn${this.isPlaying ? ' is-playing' : ''}`;
      this.tourBtn.innerHTML = this.isPlaying ? '<span>⏸</span><span>Pause Tour</span>' : '<span>▶</span><span>Auto Tour</span>';
      this.tourBtn.title = 'Toggle Auto-Tour through events (Space or P)';
      this.tourBtn.addEventListener('click', e => {
        e.stopPropagation();
        this.toggleAutoTour();
      });
      rightBox.appendChild(this.tourBtn);

      const prevBtn = document.createElement('button');
      prevBtn.type = 'button';
      prevBtn.className = 'ag-nav-btn ag-btn--prev';
      prevBtn.innerHTML = '◀';
      prevBtn.title = 'Previous Event (Left Arrow)';
      prevBtn.setAttribute('aria-label', 'Previous Event');
      prevBtn.addEventListener('click', e => {
        e.stopPropagation();
        this.prev(true);
      });

      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'ag-nav-btn ag-btn--next';
      nextBtn.innerHTML = '▶';
      nextBtn.title = 'Next Event (Right Arrow)';
      nextBtn.setAttribute('aria-label', 'Next Event');
      nextBtn.addEventListener('click', e => {
        e.stopPropagation();
        this.next(true);
      });

      rightBox.appendChild(prevBtn);
      rightBox.appendChild(nextBtn);
      this.toolbar.appendChild(rightBox);

      this.wrap.appendChild(this.toolbar);

      // Progress Bar under Toolbar
      this.progressBar = document.createElement('div');
      this.progressBar.className = 'ag-progress-bar';
      this.progressFill = document.createElement('div');
      this.progressFill.className = 'ag-progress-fill';
      this.progressBar.appendChild(this.progressFill);
      this.wrap.appendChild(this.progressBar);

      // ── 2. Gallery Root ──
      this.root = document.createElement('div');
      this.root.className = `accordion-gallery${this.vertical ? ' accordion-gallery--vertical' : ''}`;
      this.root.setAttribute('role', 'list');
      this.root.setAttribute('aria-label', 'Civil Engineering Events Accordion Gallery');

      this.root.style.setProperty('--ag-accent', this.accentColor);
      this.root.style.setProperty('--ag-overlay', this.overlayColor);
      this.root.style.setProperty('--ag-text', this.textColor);
      this.root.style.setProperty('--ag-gap', `${this.gap}px`);
      this.root.style.setProperty('--ag-radius', `${this.radius}px`);
      this.root.style.height = this.vertical ? `${Math.round(this.height * 1.6)}px` : `${this.height}px`;

      this.items.forEach((item, i) => {
        const isActive = i === this.active;
        const panel = document.createElement('div');
        panel.className = `ag-panel${isActive ? ' ag-panel--active' : ''}`;
        panel.style.borderRadius = `${this.radius}px`;
        panel.setAttribute('role', 'listitem');
        panel.setAttribute('tabindex', '0');
        panel.setAttribute('aria-label', item.label || item.title || '');
        if (isActive) panel.setAttribute('aria-current', 'true');

        const catCol = item.catColor || this.accentColor;
        panel.style.setProperty('--cat-color', catCol);

        // Frame and Media
        const frame = document.createElement('span');
        frame.className = 'ag-panel__frame';

        const media = document.createElement('span');
        media.className = 'ag-panel__media';

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.alt || item.label || item.title || '';
        img.draggable = false;
        img.loading = 'eager';
        media.appendChild(img);

        const overlay = document.createElement('span');
        overlay.className = 'ag-panel__overlay';
        overlay.setAttribute('aria-hidden', 'true');

        const glare = document.createElement('span');
        glare.className = 'ag-panel__glare';
        glare.setAttribute('aria-hidden', 'true');

        frame.appendChild(media);
        frame.appendChild(overlay);
        frame.appendChild(glare);
        panel.appendChild(frame);

        // Peek Strip on Inactive Panels
        const peek = document.createElement('div');
        peek.className = 'ag-panel__peek';
        const numPill = `<span class="ag-peek__num">${String(i + 1).padStart(2, '0')}</span>`;
        const peekLabel = item.shortTitle || item.title || item.label || `Event ${i + 1}`;
        const peekText = `<span class="ag-peek__center">${item.icon || '⌖'} ${peekLabel}</span>`;
        const prizeTag = item.prize ? `<span class="ag-peek__prize">${item.prize}</span>` : '';
        const dot = `<span class="ag-peek__dot" style="--pill-color:${catCol};"></span>`;
        peek.innerHTML = `${numPill}${peekText}${prizeTag}${dot}`;
        panel.appendChild(peek);

        // Rich Active Overlay Card
        const content = document.createElement('div');
        content.className = 'ag-panel__content';

        // Top Row
        const topRow = document.createElement('div');
        topRow.className = 'ag-content__top';
        const catBadge = document.createElement('span');
        catBadge.className = 'ag-badge';
        catBadge.style.setProperty('--cat-color', catCol);
        catBadge.innerHTML = `<span class="ag-badge__pulse"></span> ${item.category || 'CIVIL ENGINEERING'}`;

        const dwgRef = document.createElement('span');
        dwgRef.className = 'ag-dwg-ref';
        dwgRef.textContent = `DWG 0${i + 1} // PCCOE`;

        topRow.appendChild(catBadge);
        topRow.appendChild(dwgRef);
        content.appendChild(topRow);

        // Main Bottom Info
        const mainInfo = document.createElement('div');
        mainInfo.className = 'ag-content__main';

        if (item.tagline) {
          const tagline = document.createElement('div');
          tagline.className = 'ag-content__tagline';
          tagline.textContent = `"${item.tagline}"`;
          mainInfo.appendChild(tagline);
        }

        const titleWrap = document.createElement('div');
        titleWrap.className = 'ag-content__title-wrap';

        const bar = document.createElement('span');
        bar.className = 'ag-content__bar';
        bar.style.setProperty('--cat-color', catCol);

        const title = document.createElement('h3');
        title.className = 'ag-content__title';
        title.textContent = item.label || item.title || '';

        titleWrap.appendChild(bar);
        titleWrap.appendChild(title);
        mainInfo.appendChild(titleWrap);

        // Metadata Chips
        const metaBox = document.createElement('div');
        metaBox.className = 'ag-content__meta';

        if (item.prize) {
          metaBox.innerHTML += `<span class="ag-meta-chip ag-meta-chip--prize">🏆 ${item.prize}</span>`;
        }
        if (item.teamSize) {
          metaBox.innerHTML += `<span class="ag-meta-chip">👥 ${item.teamSize}</span>`;
        }
        if (item.date) {
          metaBox.innerHTML += `<span class="ag-meta-chip">📅 ${item.date}</span>`;
        }
        if (item.venue) {
          metaBox.innerHTML += `<span class="ag-meta-chip">📍 ${item.venue}</span>`;
        }
        mainInfo.appendChild(metaBox);

        // Interactive Action Buttons
        const actionBox = document.createElement('div');
        actionBox.className = 'ag-content__actions';

        const detailsBtn = document.createElement('button');
        detailsBtn.type = 'button';
        detailsBtn.className = 'ag-btn-details';
        detailsBtn.innerHTML = `<span>View Full Details</span><span>↗</span>`;
        detailsBtn.addEventListener('click', e => {
          e.stopPropagation();
          if (this.onSelect) this.onSelect(this.items[i], i);
        });

        const regBtn = document.createElement('button');
        regBtn.type = 'button';
        regBtn.className = 'ag-btn-register';
        regBtn.style.setProperty('--cat-color', catCol);
        regBtn.innerHTML = `<span>Register Now</span><span>⚡</span>`;
        regBtn.addEventListener('click', e => {
          e.stopPropagation();
          if (this.onRegister) {
            this.onRegister(this.items[i], i);
          } else if (this.onSelect) {
            this.onSelect(this.items[i], i);
          }
        });

        actionBox.appendChild(detailsBtn);
        actionBox.appendChild(regBtn);
        mainInfo.appendChild(actionBox);

        content.appendChild(mainInfo);
        panel.appendChild(content);

        // Fallback Label support
        let oldBar = null;
        let oldText = null;
        if (this.showLabels) {
          const labelWrap = document.createElement('span');
          labelWrap.className = 'ag-panel__label';
          labelWrap.style.display = 'none'; // hidden when rich overlay is active
          oldBar = document.createElement('span');
          oldBar.className = 'ag-panel__bar';
          oldText = document.createElement('span');
          oldText.className = 'ag-panel__text';
          oldText.textContent = item.label || item.title || '';
          labelWrap.appendChild(oldBar);
          labelWrap.appendChild(oldText);
          panel.appendChild(labelWrap);
        }

        this.panelEls.push(panel);
        this.mediaEls.push(media);
        this.glareEls.push(glare);
        this.contentEls.push(content);
        this.peekEls.push(peek);
        this.barEls.push(oldBar);
        this.textEls.push(oldText);

        this.root.appendChild(panel);
      });

      this.wrap.appendChild(this.root);
      this.container.appendChild(this.wrap);
    }

    initEvents() {
      // Panel Interactions: Hover, Click, Touch & Mousemove 3D Tilt
      this.panelEls.forEach((panel, i) => {
        // Hover
        panel.addEventListener('mouseenter', () => {
          if (this.trigger === 'hover') {
            this.setActive(i);
          }
        });

        // Click: Inactive expands, Active opens details modal
        panel.addEventListener('click', e => {
          if (this.active !== i) {
            e.preventDefault();
            this.setActive(i, true);
          } else {
            // Click on active card frame opens details
            if (!e.target.closest('button, a')) {
              if (this.onSelect && this.items[i]) {
                this.onSelect(this.items[i], i);
              }
            }
          }
        });

        panel.addEventListener('focus', () => this.setActive(i, true));

        // Dynamic 3D Cursor Tilt & Spotlight Glare on MouseMove
        panel.addEventListener('mousemove', e => {
          if (this.prefersReduced) return;
          const rect = panel.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          const xPct = x - 0.5;
          const yPct = y - 0.5;

          const tiltX = -yPct * (i === this.active ? 10 : 6);
          const tiltY = xPct * (i === this.active ? 12 : 8);

          panel.style.transform = `perspective(1200px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(${i === this.active ? '12px' : '4px'})`;

          const glare = this.glareEls[i];
          if (glare) {
            glare.style.background = `radial-gradient(circle at ${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%, rgba(255,255,255,0.22) 0%, transparent 60%)`;
          }
        });

        panel.addEventListener('mouseleave', () => {
          if (this.prefersReduced) return;
          const rot = i === this.active ? 0 : i < this.active ? this.tilt : -this.tilt;
          const rotProp = this.vertical ? `rotateX(${-rot}deg)` : `rotateY(${rot}deg)`;
          panel.style.transform = `perspective(1200px) ${rotProp} translateZ(0px)`;
          const glare = this.glareEls[i];
          if (glare) {
            glare.style.background = 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.16) 0%, transparent 60%)';
          }
        });
      });

      // Pause Auto-Tour on hover, resume on leave
      this.wrap.addEventListener('mouseenter', () => {
        this.isHovered = true;
        this.pauseAutoTour();
      });

      this.wrap.addEventListener('mouseleave', () => {
        this.isHovered = false;
        if (this.isPlaying) {
          this.startAutoTour();
        }
      });

      // Touch / Swipe Navigation Support (Multi-directional for Mobile)
      let touchStartX = 0;
      let touchStartY = 0;
      let touchStartTime = 0;

      this.root.addEventListener('touchstart', e => {
        if (e.touches.length > 0) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          touchStartTime = Date.now();
          this.pauseAutoTour();
        }
      }, { passive: true });

      this.root.addEventListener('touchend', e => {
        if (e.changedTouches.length > 0) {
          const touchEndX = e.changedTouches[0].clientX;
          const touchEndY = e.changedTouches[0].clientY;
          const deltaX = touchEndX - touchStartX;
          const deltaY = touchEndY - touchStartY;
          const elapsed = Date.now() - touchStartTime;

          // Quick swipe gesture (< 450ms)
          if (elapsed < 450) {
            // Horizontal swipe (left or right)
            if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
              if (deltaX < 0) {
                this.next(true); // Swiped left -> next
              } else {
                this.prev(true); // Swiped right -> prev
              }
            }
            // Vertical swipe inside gallery (up or down on mobile vertical stack)
            else if (Math.abs(deltaY) > 45 && Math.abs(deltaY) > Math.abs(deltaX) * 1.4) {
              if (deltaY < 0) {
                this.next(true); // Swiped up -> next
              } else {
                this.prev(true); // Swiped down -> prev
              }
            }
          }
        }
        if (this.isPlaying && !this.isHovered) {
          this.startAutoTour();
        }
      }, { passive: true });

      // Keyboard Accessibility
      window.addEventListener('keydown', e => {
        // Only react if gallery is in viewport
        const rect = this.root.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (!inView) return;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
          e.preventDefault();
          this.next(true);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
          e.preventDefault();
          this.prev(true);
        } else if (e.key === ' ' || e.key.toLowerCase() === 'p') {
          if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
          e.preventDefault();
          this.toggleAutoTour();
        } else if (['1', '2', '3', '4', '5', '6'].includes(e.key)) {
          if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
          const targetIdx = parseInt(e.key, 10) - 1;
          if (targetIdx >= 0 && targetIdx < this.count) {
            this.setActive(targetIdx, true);
          }
        }
      });

      // Responsive measure observer
      const measure = () => {
        if (!this.root) return;
        const rect = this.root.getBoundingClientRect();
        const total = this.vertical ? rect.height : rect.width;
        const usable = Math.max(total - this.gap * (this.count - 1), 120);
        const r = Math.min(Math.max(this.expandRatio, 0.2), 0.9);
        const size = Math.max(160, usable * r * 1.25);
        this.mediaSize = size;
        this.root.style.setProperty('--ag-media-size', `${size}px`);
        this.applyLayout(!this.firstRun);
        this.firstRun = false;
      };

      if (window.ResizeObserver) {
        this.resizeObserver = new ResizeObserver(measure);
        this.resizeObserver.observe(this.root);
      } else {
        window.addEventListener('resize', measure);
      }

      if (window.IntersectionObserver) {
        this.inViewObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            this.isInView = entry.isIntersecting;
            if (!this.isInView) {
              this.pauseAutoTour();
            } else if (this.isPlaying && !this.isHovered) {
              this.startAutoTour();
            }
          });
        }, { threshold: 0.1 });
        this.inViewObserver.observe(this.root);
      } else {
        this.isInView = true;
      }

      measure();
    }

    setActive(index, userInitiated = false) {
      if (this.active === index && !this.firstRun) return;
      this.active = index;

      // Update Toolbar Counter
      if (this.counterEl) {
        const curr = this.counterEl.querySelector('.ag-counter-curr');
        if (curr) curr.textContent = String(this.active + 1).padStart(2, '0');
      }

      // Update Toolbar Pills (scroll ONLY the horizontal pills container, never the window!)
      this.pillEls.forEach((pill, i) => {
        if (i === this.active) {
          pill.classList.add('is-active');
          if (this.pillsContainer) {
            const pillLeft = pill.offsetLeft;
            const pillWidth = pill.offsetWidth;
            const containerWidth = this.pillsContainer.clientWidth;
            this.pillsContainer.scrollTo({
              left: pillLeft - containerWidth / 2 + pillWidth / 2,
              behavior: 'smooth'
            });
          }
        } else {
          pill.classList.remove('is-active');
        }
      });

      // Update Panels
      this.panelEls.forEach((p, i) => {
        if (i === this.active) {
          p.classList.add('ag-panel--active');
          p.setAttribute('aria-current', 'true');
        } else {
          p.classList.remove('ag-panel--active');
          p.removeAttribute('aria-current');
        }
      });

      this.applyLayout(true);

      // Reset auto-tour timer if user navigated
      if (userInitiated && this.isPlaying) {
        this.startAutoTour();
      }
    }

    setActiveById(id) {
      const idx = this.items.findIndex(it => it.id === id);
      if (idx !== -1) {
        this.setActive(idx, true);
      }
    }

    next(userInitiated = false) {
      this.setActive((this.active + 1) % this.count, userInitiated);
    }

    prev(userInitiated = false) {
      this.setActive((this.active - 1 + this.count) % this.count, userInitiated);
    }

    startAutoTour() {
      this.pauseAutoTour();
      if (!this.isPlaying) return;
      if (window.IntersectionObserver && !this.isInView) return;

      const dur = this.autoPlayInterval;
      const startTime = Date.now();

      const updateProgress = () => {
        if (!this.isPlaying || this.isHovered || (window.IntersectionObserver && !this.isInView)) return;
        const elapsed = Date.now() - startTime;
        const pct = Math.min(100, (elapsed / dur) * 100);
        if (this.progressFill) {
          this.progressFill.style.width = `${pct}%`;
        }

        if (elapsed >= dur) {
          this.next();
          this.startAutoTour();
        } else {
          this.tourTimer = requestAnimationFrame(updateProgress);
        }
      };

      this.tourTimer = requestAnimationFrame(updateProgress);
    }

    pauseAutoTour() {
      if (this.tourTimer) {
        cancelAnimationFrame(this.tourTimer);
        this.tourTimer = null;
      }
      if (this.progressFill) {
        this.progressFill.style.width = '0%';
      }
    }

    toggleAutoTour() {
      this.isPlaying = !this.isPlaying;
      if (this.tourBtn) {
        if (this.isPlaying) {
          this.tourBtn.classList.add('is-playing');
          this.tourBtn.innerHTML = '<span>⏸</span><span>Pause Tour</span>';
        } else {
          this.tourBtn.classList.remove('is-playing');
          this.tourBtn.innerHTML = '<span>▶</span><span>Auto Tour</span>';
        }
      }

      if (this.isPlaying) {
        this.startAutoTour();
      } else {
        this.pauseAutoTour();
      }
    }

    applyLayout(animate = true) {
      if (!this.panelEls.length) return;

      const r = Math.min(Math.max(this.expandRatio, 0.2), 0.9);
      const grow = this.count > 1 ? (r * (this.count - 1)) / (1 - r) : 1;
      const mediaSize = this.mediaSize;

      if (this.currentTl) {
        this.currentTl.kill();
      }

      const dur = animate && !this.prefersReduced ? this.duration : 0;
      const gsapLib = global.gsap;

      if (!gsapLib) {
        // Fallback without GSAP
        this.panelEls.forEach((panel, i) => {
          const isActive = i === this.active;
          panel.style.flexGrow = isActive ? grow : 1;
          const media = this.mediaEls[i];
          if (media) {
            media.style.filter = this.grayscale && !isActive ? 'grayscale(0.85)' : 'grayscale(0)';
          }
        });
        return;
      }

      const tl = gsapLib.timeline();

      this.panelEls.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === this.active;
        const media = this.mediaEls[i];
        const content = this.contentEls[i];
        const peek = this.peekEls[i];

        const rot = isActive ? 0 : i < this.active ? this.tilt : -this.tilt;
        const rotProp = this.vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(
          panel,
          {
            flexGrow: isActive ? grow : 1,
            '--ag-dim': isActive ? 0.08 : 0.42,
            ...rotProp,
            duration: dur,
            ease: this.ease
          },
          0
        );

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, this.active - i));
          const shift = drift * this.parallax * mediaSize * 0.06;
          const gray = this.grayscale ? (isActive ? 0 : 0.8) : 0;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: this.vertical ? 0 : isActive ? 0 : shift,
              y: this.vertical ? (isActive ? 0 : shift) : 0,
              '--ag-gray': gray,
              '--ag-dim': isActive ? 0.08 : 0.42,
              duration: dur,
              ease: this.ease
            },
            0
          );
        }

        if (content) {
          if (isActive) {
            tl.to(content, { opacity: 1, y: 0, duration: dur * 0.85, ease: this.ease }, 0.05);
          } else {
            tl.to(content, { opacity: 0, y: 12, duration: dur * 0.4, ease: 'power2.in' }, 0);
          }
        }

        if (peek) {
          if (isActive) {
            tl.to(peek, { opacity: 0, duration: dur * 0.35, ease: 'power2.in' }, 0);
          } else {
            tl.to(peek, { opacity: 1, duration: dur * 0.8, ease: this.ease }, 0.1);
          }
        }
      });

      this.currentTl = tl;
    }

    destroy() {
      if (this.currentTl) this.currentTl.kill();
      if (this.resizeObserver) this.resizeObserver.disconnect();
      if (this.inViewObserver) this.inViewObserver.disconnect();
      this.pauseAutoTour();
    }
  }

  global.AccordionGallery = AccordionGallery;
})(window);

