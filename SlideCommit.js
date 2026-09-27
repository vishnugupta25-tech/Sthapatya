/**
 * SlideCommit — React Bits (Vanilla JavaScript + CSS Implementation)
 * Physics-based Swipe-to-Commit / Slide-to-Register Slider
 */

(function (global) {
  'use strict';

  const PAD = 4;
  const SQUASH_MAX = 0.08;
  const SQUASH_DIV = 110;
  const SWELL = 1.03;
  const MIN_PENDING = 300;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const onColor = hex => {
    const raw = String(hex || '#ffffff').replace('#', '').trim();
    const full = raw.length === 3 ? [...raw].map(ch => ch + ch).join('') : raw.slice(0, 6);
    const n = parseInt(full, 16);
    if (Number.isNaN(n)) return '#ffffff';
    const yiq = (((n >> 16) & 255) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000;
    return yiq >= 128 ? '#111111' : '#ffffff';
  };

  const velocityOf = hist => {
    if (hist.length < 2) return 0;
    const [t0, x0] = hist[0];
    const [t1, x1] = hist[hist.length - 1];
    return ((x1 - x0) / Math.max(1, t1 - t0)) * 1000;
  };

  class SlideCommit {
    constructor(container, options = {}) {
      this.container = typeof container === 'string' ? document.querySelector(container) : container;
      if (!this.container) return;

      this.label = options.label !== undefined ? options.label : 'Slide to Register';
      this.doneLabel = options.doneLabel !== undefined ? options.doneLabel : 'Registered!';
      this.errorLabel = options.errorLabel !== undefined ? options.errorLabel : 'Try Again';
      this.onConfirm = options.onConfirm || null;
      this.onDone = options.onDone || null;
      this.onError = options.onError || null;

      this.trackColor = options.trackColor || '#181a20';
      this.handleColor = options.handleColor || '#e8a020';
      this.successColor = options.successColor || '#22c55e';
      this.dangerColor = options.dangerColor || '#e5484d';

      this.width = options.width || 280;
      this.height = options.height || 56;
      this.radius = options.radius !== undefined ? options.radius : 28;
      this.speed = options.speed !== undefined ? options.speed : 50;
      this.returnBounce = options.returnBounce !== undefined ? options.returnBounce : 0.38;
      this.landingDip = options.landingDip !== undefined ? options.landingDip : 0.026;
      this.holdMs = options.holdMs !== undefined ? options.holdMs : 1500;
      this.disabled = options.disabled || false;
      this.className = options.className || '';

      this.phase = 'idle'; // 'idle' | 'pending' | 'done' | 'error'
      this.held = false;
      this.hot = false;
      this.x = 0;
      this.anchor = 0;
      this.grip = null;
      this.timer = null;
      this.homeTimer = null;
      this.animId = null;
      this.runId = 0;

      this.measure();
      this.render();
      this.initEvents();
    }

    measure() {
      this.GRIP = this.height - PAD * 2;
      this.r = clamp(this.radius, 0, this.height / 2);
      this.gripR = Math.max(0, this.r - PAD);
      this.fontSize = clamp(Math.round(this.height * 0.25), 13, 17);
      this.iconSize = Math.round(this.GRIP * 0.44);
    }

    getTrackWidth() {
      if (typeof this.width === 'number') return this.width;
      const rect = this.trackRef?.getBoundingClientRect();
      return rect?.width || 280;
    }

    getTravel() {
      const trackW = this.getTrackWidth();
      const inner = trackW - PAD * 2;
      return Math.max(1, inner - this.GRIP);
    }

    render() {
      this.container.innerHTML = '';

      this.root = document.createElement('div');
      this.root.className = `slide-commit ${this.className}`.trim();
      this.root.setAttribute('data-phase', this.phase);
      if (this.disabled) this.root.setAttribute('data-disabled', '');

      const trackW = typeof this.width === 'number' ? `${this.width}px` : this.width;
      this.root.style.width = trackW;
      this.root.style.height = `${this.height}px`;
      this.root.style.setProperty('--sc-track', this.trackColor);
      this.root.style.setProperty('--sc-ink', this.handleColor);
      this.root.style.setProperty('--sc-ok', this.successColor);
      this.root.style.setProperty('--sc-no', this.dangerColor);
      this.root.style.setProperty('--sc-on-ink', onColor(this.handleColor));
      this.root.style.setProperty('--sc-on-ok', onColor(this.successColor));
      this.root.style.setProperty('--sc-on-no', onColor(this.dangerColor));
      this.root.style.setProperty('--sc-radius', `${this.r}px`);
      this.root.style.setProperty('--sc-grip-r', `${this.gripR}px`);
      this.root.style.setProperty('--sc-pad', `${PAD}px`);
      this.root.style.setProperty('--sc-font', `${this.fontSize}px`);

      // Track Element
      this.trackRef = document.createElement('div');
      this.trackRef.className = 'slide-commit__track';

      // Centered Label
      this.labelRef = document.createElement('span');
      this.labelRef.className = 'slide-commit__label';
      this.labelRef.setAttribute('aria-hidden', 'true');
      this.labelRef.innerHTML = `
        <span class="slide-commit__text slide-commit__text--plain">${this.label}</span>
        <span class="slide-commit__text slide-commit__text--error">${this.errorLabel}</span>
      `;
      this.trackRef.appendChild(this.labelRef);

      // Capsule / Sliding Handle
      this.capsuleRef = document.createElement('div');
      this.capsuleRef.className = 'slide-commit__capsule';
      this.capsuleRef.setAttribute('role', 'slider');
      this.capsuleRef.setAttribute('tabindex', this.disabled ? '-1' : '0');
      this.capsuleRef.setAttribute('aria-label', this.label);
      this.capsuleRef.setAttribute('aria-valuemin', '0');
      this.capsuleRef.setAttribute('aria-valuemax', '100');
      this.capsuleRef.setAttribute('aria-valuenow', '0');
      this.capsuleRef.setAttribute('aria-valuetext', `${this.label}, 0%`);

      // Handle Content (Arrow, Spinner, Done Icon)
      this.contentRef = document.createElement('div');
      this.contentRef.className = 'slide-commit__content';

      // Arrow
      this.arrowRef = document.createElement('span');
      this.arrowRef.className = 'slide-commit__arrow';
      this.arrowRef.setAttribute('aria-hidden', 'true');
      this.arrowRef.innerHTML = `
        <svg width="${this.iconSize}" height="${this.iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      `;

      // Spinner
      this.spinRef = document.createElement('span');
      this.spinRef.className = 'slide-commit__spin';
      this.spinRef.setAttribute('aria-hidden', 'true');
      this.spinRef.innerHTML = `
        <svg class="slide-commit__spinner" width="${this.iconSize}" height="${this.iconSize}" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.4" stroke-opacity="0.25"></circle>
          <path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
        </svg>
      `;

      // Done Checkmark
      this.doneRef = document.createElement('span');
      this.doneRef.className = 'slide-commit__done';
      this.doneRef.setAttribute('aria-hidden', 'true');
      const checkSize = Math.round(this.GRIP * 0.38);
      this.doneRef.innerHTML = `
        <svg width="${checkSize}" height="${checkSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${this.doneLabel}</span>
      `;

      this.contentRef.appendChild(this.arrowRef);
      this.contentRef.appendChild(this.spinRef);
      this.contentRef.appendChild(this.doneRef);
      this.capsuleRef.appendChild(this.contentRef);
      this.trackRef.appendChild(this.capsuleRef);

      // Screen reader polite status
      this.srRef = document.createElement('span');
      this.srRef.className = 'slide-commit__sr';
      this.srRef.setAttribute('aria-live', 'polite');
      this.trackRef.appendChild(this.srRef);

      this.root.appendChild(this.trackRef);
      this.container.appendChild(this.root);

      this.updateVisuals();
    }

    updateVisuals() {
      const travel = this.getTravel();
      const trackW = this.getTrackWidth();
      const inner = trackW - PAD * 2;
      const seen = clamp(this.x, 0, travel);
      const edge = seen + this.GRIP + clamp(this.anchor - seen, 0, travel);

      // Capsule clipPath wipes across the track
      this.capsuleRef.style.clipPath = `inset(0px ${Math.max(0, inner - edge)}px 0px 0px round ${this.gripR}px)`;

      // Center the handle content
      const contentX = (seen + edge) / 2 - inner / 2;
      this.contentRef.style.transform = `translateX(${contentX}px)`;

      // Fade label instruction as handle advances
      const say = clamp(1 - seen / (travel * 0.55), 0, 1);
      this.labelRef.style.opacity = String(say);

      // Fade arrow when nearing the end
      const arrowOp = clamp(1 - (seen - travel * 0.55) / (travel * 0.4), 0, 1);
      this.arrowRef.style.opacity = this.phase === 'pending' || this.phase === 'done' ? '0' : String(arrowOp);

      // Squash and swell effect
      const q = 1 - Math.min(SQUASH_MAX, Math.max(0, -this.x) / SQUASH_DIV);
      const swell = this.hot && !this.held && this.phase === 'idle' ? SWELL : 1;
      this.capsuleRef.style.transform = `scale(${q * swell}, ${swell / q})`;
      this.capsuleRef.style.transformOrigin = `${seen}px 50%`;

      // Accessibility percentage
      const percent = Math.round((seen / travel) * 100);
      this.capsuleRef.setAttribute('aria-valuenow', String(percent));
      this.capsuleRef.setAttribute('aria-valuetext', `${this.label}, ${percent}%`);
    }

    initEvents() {
      const onPointerDown = e => {
        if (this.disabled || this.grip || this.phase === 'pending' || this.phase === 'done' || e.button !== 0) return;
        this.stopSpring();

        const rect = this.trackRef.getBoundingClientRect();
        const clientX = e.clientX;
        const localX = (clientX - rect.left) / (rect.width / this.getTrackWidth() || 1);

        this.grip = {
          id: e.pointerId,
          grab: localX - this.x,
          moved: false,
          hist: [[e.timeStamp, this.x]]
        };

        this.held = true;
        this.root.setAttribute('data-held', '');

        try {
          this.trackRef.setPointerCapture(e.pointerId);
        } catch {}

        const onPointerMove = ev => {
          if (!this.grip || this.grip.id !== ev.pointerId) return;
          const r = this.trackRef.getBoundingClientRect();
          const at = (ev.clientX - r.left) / (r.width / this.getTrackWidth() || 1);
          if (this.grip.grab === null) {
            this.grip.grab = at - this.x;
            return;
          }
          const travel = this.getTravel();
          const next = clamp(at - this.grip.grab, 0, travel);
          if (Math.abs(next - this.x) > 0.5) this.grip.moved = true;
          this.grip.hist.push([ev.timeStamp, next]);
          if (this.grip.hist.length > 5) this.grip.hist.shift();
          this.x = next;
          this.updateVisuals();
        };

        const onPointerUp = ev => {
          if (!this.grip || this.grip.id !== ev.pointerId) return;
          const g = this.grip;
          this.grip = null;
          this.held = false;
          this.root.removeAttribute('data-held');

          try {
            this.trackRef.releasePointerCapture(ev.pointerId);
          } catch {}

          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('pointerup', onPointerUp);
          window.removeEventListener('pointercancel', onPointerUp);

          const travel = this.getTravel();
          if (this.x >= travel * 0.96) {
            this.commit();
          } else if (g.moved) {
            const v = velocityOf(g.hist);
            this.goHome(v);
          } else {
            this.goHome(0);
          }
        };

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('pointerup', onPointerUp, { passive: true });
        window.addEventListener('pointercancel', onPointerUp, { passive: true });
      };

      this.trackRef.addEventListener('pointerdown', onPointerDown);

      this.capsuleRef.addEventListener('pointerenter', e => {
        if (e.pointerType === 'mouse') {
          this.hot = true;
          this.updateVisuals();
        }
      });
      this.capsuleRef.addEventListener('pointerleave', () => {
        this.hot = false;
        this.updateVisuals();
      });

      // Keyboard Accessibility (Arrows, End, Escape)
      this.capsuleRef.addEventListener('keydown', e => {
        if (this.disabled || this.phase === 'pending' || this.phase === 'done') return;
        const travel = this.getTravel();
        const step = travel / 10;
        if (e.key === 'End') {
          e.preventDefault();
          this.x = travel;
          this.updateVisuals();
          this.commit();
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          e.preventDefault();
          this.x = Math.min(travel, this.x + step);
          this.updateVisuals();
          if (this.x >= travel) this.commit();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          e.preventDefault();
          this.x = Math.max(0, this.x - step);
          this.updateVisuals();
        } else if (e.key === 'Home' || e.key === 'Escape') {
          e.preventDefault();
          this.goHome(0);
        }
      });
    }

    goHome(velocity = 0) {
      this.stopSpring();
      const startX = this.x;
      const startTime = performance.now();
      const dur = 320;

      const step = now => {
        const elapsed = (now - startTime) / dur;
        if (elapsed >= 1) {
          this.x = 0;
          this.updateVisuals();
          return;
        }
        // Smooth cubic ease out with slight return bounce
        const t = 1 - elapsed;
        const bounce = Math.sin(elapsed * Math.PI) * this.returnBounce * -8;
        this.x = startX * (t * t * t) + bounce;
        this.updateVisuals();
        this.animId = requestAnimationFrame(step);
      };
      this.animId = requestAnimationFrame(step);
    }

    stopSpring() {
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
    }

    commit() {
      clearTimeout(this.timer);
      this.stopSpring();
      const run = ++this.runId;
      const travel = this.getTravel();
      this.x = travel;
      this.updateVisuals();

      let result;
      try {
        result = this.onConfirm ? this.onConfirm() : null;
      } catch (err) {
        this.reject(err);
        return;
      }

      const isPromise = result && typeof result.then === 'function';
      if (!isPromise) {
        this.resolve();
        return;
      }

      this.setPhase('pending');
      const start = performance.now();
      const later = fn => {
        const remaining = Math.max(0, MIN_PENDING - (performance.now() - start));
        setTimeout(() => {
          if (run === this.runId) fn();
        }, remaining);
      };

      result.then(
        () => later(() => this.resolve()),
        err => later(() => this.reject(err))
      );
    }

    resolve() {
      this.setPhase('done');
      this.anchor = this.x;
      this.x = 0;
      this.updateVisuals();

      if (this.landingDip > 0) {
        this.trackRef.animate(
          [
            { transform: 'scale(1)' },
            { transform: `scale(${1 - this.landingDip})` },
            { transform: 'scale(1)' }
          ],
          { duration: 420, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' }
        );
      }

      if (this.onDone) this.onDone();

      if (this.holdMs > 0) {
        this.timer = setTimeout(() => {
          this.settle();
        }, this.holdMs);
      }
    }

    reject(reason) {
      this.setPhase('error');
      if (this.onError) this.onError(reason);

      // Shake animation
      this.trackRef.animate(
        [
          { transform: 'translateX(0px)' },
          { transform: 'translateX(-5px)' },
          { transform: 'translateX(5px)' },
          { transform: 'translateX(-3px)' },
          { transform: 'translateX(3px)' },
          { transform: 'translateX(0px)' }
        ],
        { duration: 400, easing: 'ease-out' }
      );

      this.homeTimer = setTimeout(() => {
        this.goHome(0);
      }, 300);

      this.timer = setTimeout(() => {
        this.setPhase('idle');
      }, Math.max(this.holdMs, 1600));
    }

    settle() {
      this.setPhase('idle');
      this.anchor = 0;
      this.x = 0;
      this.updateVisuals();
    }

    setPhase(phase) {
      this.phase = phase;
      this.root.setAttribute('data-phase', phase);
      if (this.srRef) {
        this.srRef.textContent =
          phase === 'pending' ? 'Working' : phase === 'done' ? this.doneLabel : phase === 'error' ? this.errorLabel : '';
      }
      this.updateVisuals();
    }

    destroy() {
      this.stopSpring();
      clearTimeout(this.timer);
      clearTimeout(this.homeTimer);
      if (this.root && this.root.parentNode) {
        this.root.parentNode.removeChild(this.root);
      }
    }
  }

  global.SlideCommit = SlideCommit;
})(window);
