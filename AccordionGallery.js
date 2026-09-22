/**
 * AccordionGallery — React Bits (Vanilla JavaScript + GSAP Implementation)
 * 3D Tilt, Parallax Drift, Smooth Flex Expansion, Grayscale to Color
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
      this.height = options.height || 420;
      this.gap = options.gap !== undefined ? options.gap : 12;
      this.radius = options.radius !== undefined ? options.radius : 16;
      this.expandRatio = options.expandRatio !== undefined ? options.expandRatio : 0.52;
      this.orientation = options.orientation || 'horizontal';
      this.duration = options.duration !== undefined ? options.duration : 0.6;
      this.ease = options.ease || 'power3.out';
      this.parallax = options.parallax !== undefined ? options.parallax : 0.5;
      this.tilt = options.tilt !== undefined ? options.tilt : 8;
      this.stagger = options.stagger !== undefined ? options.stagger : 0.06;
      this.trigger = options.trigger || 'hover';
      this.showLabels = options.showLabels !== undefined ? options.showLabels : true;
      this.grayscale = options.grayscale !== undefined ? options.grayscale : true;
      this.onSelect = options.onSelect || null;

      this.vertical = this.orientation === 'vertical';
      this.panelEls = [];
      this.mediaEls = [];
      this.barEls = [];
      this.textEls = [];
      this.currentTl = null;
      this.mediaSize = 320;
      this.firstRun = true;

      this.prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

      this.render();
      this.initEvents();
    }

    render() {
      this.container.innerHTML = '';
      this.root = document.createElement('div');
      this.root.className = `accordion-gallery${this.vertical ? ' accordion-gallery--vertical' : ''}`;
      this.root.setAttribute('role', 'list');
      this.root.setAttribute('aria-label', 'Events Accordion Gallery');

      this.root.style.setProperty('--ag-accent', this.accentColor);
      this.root.style.setProperty('--ag-overlay', this.overlayColor);
      this.root.style.setProperty('--ag-text', this.textColor);
      this.root.style.setProperty('--ag-gap', `${this.gap}px`);
      this.root.style.setProperty('--ag-radius', `${this.radius}px`);
      this.root.style.height = this.vertical ? `${Math.round(this.height * 1.6)}px` : `${this.height}px`;

      this.items.forEach((item, i) => {
        const isActive = i === this.active;
        const panel = document.createElement('a');
        panel.className = `ag-panel${isActive ? ' ag-panel--active' : ''}`;
        panel.style.borderRadius = `${this.radius}px`;
        panel.href = item.link || '#';
        panel.setAttribute('role', 'listitem');
        panel.setAttribute('tabindex', '0');
        panel.setAttribute('aria-label', item.label || '');
        if (isActive) panel.setAttribute('aria-current', 'true');

        // Frame and Media
        const frame = document.createElement('span');
        frame.className = 'ag-panel__frame';

        const media = document.createElement('span');
        media.className = 'ag-panel__media';

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.alt || item.label || '';
        img.draggable = false;
        img.loading = 'lazy';
        media.appendChild(img);

        const overlay = document.createElement('span');
        overlay.className = 'ag-panel__overlay';
        overlay.setAttribute('aria-hidden', 'true');

        frame.appendChild(media);
        frame.appendChild(overlay);
        panel.appendChild(frame);

        // Label
        let bar = null;
        let text = null;
        if (this.showLabels) {
          const labelWrap = document.createElement('span');
          labelWrap.className = 'ag-panel__label';
          labelWrap.setAttribute('aria-hidden', 'true');

          bar = document.createElement('span');
          bar.className = 'ag-panel__bar';

          text = document.createElement('span');
          text.className = 'ag-panel__text';
          text.textContent = item.label || '';

          labelWrap.appendChild(bar);
          labelWrap.appendChild(text);
          panel.appendChild(labelWrap);
        }

        this.panelEls.push(panel);
        this.mediaEls.push(media);
        this.barEls.push(bar);
        this.textEls.push(text);

        this.root.appendChild(panel);
      });

      this.container.appendChild(this.root);
    }

    initEvents() {
      this.panelEls.forEach((panel, i) => {
        if (this.trigger === 'hover') {
          panel.addEventListener('mouseenter', () => this.setActive(i));
        }

        panel.addEventListener('click', e => {
          e.preventDefault();
          this.setActive(i);
          if (this.onSelect && this.items[i]) {
            this.onSelect(this.items[i], i);
          }
        });

        panel.addEventListener('focus', () => this.setActive(i));

        panel.addEventListener('keydown', e => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            this.setActive((i + 1) % this.count);
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            this.setActive((i - 1 + this.count) % this.count);
          } else if (e.key === 'Enter') {
            e.preventDefault();
            if (this.onSelect && this.items[i]) {
              this.onSelect(this.items[i], i);
            }
          }
        });
      });

      const measure = () => {
        if (!this.root) return;
        const rect = this.root.getBoundingClientRect();
        const total = this.vertical ? rect.height : rect.width;
        const usable = Math.max(total - this.gap * (this.count - 1), 120);
        const r = Math.min(Math.max(this.expandRatio, 0.2), 0.9);
        const size = Math.max(140, usable * r * 1.22);
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

      measure();
    }

    setActive(index) {
      if (this.active === index) return;
      this.active = index;
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
        // CSS fallback if GSAP not loaded
        this.panelEls.forEach((panel, i) => {
          const isActive = i === this.active;
          panel.style.flexGrow = isActive ? grow : 1;
          const media = this.mediaEls[i];
          if (media) {
            media.style.filter = this.grayscale && !isActive ? 'grayscale(1)' : 'grayscale(0)';
          }
          const bar = this.barEls[i];
          const text = this.textEls[i];
          if (bar && text) {
            bar.style.opacity = isActive ? '1' : '0';
            text.style.opacity = isActive ? '1' : '0';
          }
        });
        return;
      }

      const tl = gsapLib.timeline();

      this.panelEls.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === this.active;
        const media = this.mediaEls[i];
        const bar = this.barEls[i];
        const text = this.textEls[i];

        const rot = isActive ? 0 : i < this.active ? this.tilt : -this.tilt;
        const rotProp = this.vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease: this.ease }, 0);

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, this.active - i));
          const shift = drift * this.parallax * mediaSize * 0.06;
          const gray = this.grayscale ? (isActive ? 0 : 1) : 0;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: this.vertical ? 0 : isActive ? 0 : shift,
              y: this.vertical ? (isActive ? 0 : shift) : 0,
              '--ag-gray': gray,
              '--ag-dim': isActive ? 0 : 0.35,
              duration: dur,
              ease: this.ease
            },
            0
          );
        }

        if (this.showLabels && bar && text) {
          if (isActive) {
            tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease: this.ease, stagger: this.prefersReduced ? 0 : this.stagger }, 0);
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease: this.ease }, 0);
          }
        }
      });

      this.currentTl = tl;
    }

    destroy() {
      if (this.currentTl) this.currentTl.kill();
      if (this.resizeObserver) this.resizeObserver.disconnect();
    }
  }

  global.AccordionGallery = AccordionGallery;
})(window);
