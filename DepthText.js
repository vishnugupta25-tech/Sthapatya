/**
 * DepthText — React Bits (Vanilla JavaScript + CSS Implementation)
 * 3D Layer Extrusion, Pointer Tracking Parallax & Smooth Auto-Orbit
 */

(function (global) {
  'use strict';

  const MAX_LAYERS = 64;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const getLayerColor = (faceColor, depthColor, index, total) => {
    const progress = total <= 1 ? 1 : index / total;
    const eased = progress * progress;
    const faceMix = Math.round((1 - eased) * 72 + 4);
    return `color-mix(in srgb, ${faceColor} ${faceMix}%, ${depthColor})`;
  };

  const getTransform = (rotateX, rotateY) =>
    `rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg)`;

  class DepthText {
    constructor(container, options = {}) {
      this.container = typeof container === 'string' ? document.querySelector(container) : container;
      if (!this.container) return;

      this.text = options.text !== undefined ? options.text : (this.container.textContent.trim() || 'STHAPATYA');
      this.html = options.html !== undefined ? options.html : (this.container.innerHTML.trim() || this.text);
      this.layers = options.layers !== undefined ? options.layers : 34;
      this.depth = options.depth !== undefined ? options.depth : 2.4;
      this.faceColor = options.faceColor || '#f8fafc';
      this.depthColor = options.depthColor || '#7c3aed';
      this.tilt = options.tilt !== undefined ? options.tilt : 7.5;
      this.pointerTracking = options.pointerTracking !== undefined ? options.pointerTracking : true;
      this.smoothing = options.smoothing !== undefined ? options.smoothing : 0.14;
      this.perspective = options.perspective !== undefined ? options.perspective : 900;
      this.autoOrbit = options.autoOrbit !== undefined ? options.autoOrbit : true;
      this.orbitSpeed = options.orbitSpeed !== undefined ? options.orbitSpeed : 0.35;
      this.fontSize = options.fontSize || 'clamp(3rem, 6.2vw, 5.2rem)';
      this.fontWeight = options.fontWeight !== undefined ? options.fontWeight : 900;
      this.shadow = options.shadow !== undefined ? options.shadow : true;
      this.className = options.className || '';

      this.safeLayers = clamp(Math.round(Number(this.layers) || 1), 2, MAX_LAYERS);
      this.safeDepth = clamp(Number(this.depth) || 0, 0, 12);
      this.safeTilt = clamp(Number(this.tilt) || 0, 0, 12);
      this.safeSmoothing = clamp(Number(this.smoothing) || 0.14, 0.02, 0.35);
      this.safePerspective = clamp(Number(this.perspective) || 900, 300, 2000);
      this.safeOrbitSpeed = clamp(Number(this.orbitSpeed) || 0, 0, 2);

      this.baseRotation = { x: -this.safeTilt * 0.32, y: this.safeTilt * 0.42 };
      this.current = { ...this.baseRotation };
      this.target = { ...this.baseRotation };

      this.frameId = 0;
      this.activePointer = false;
      this.startTime = performance.now();

      this.render();
      this.initEvents();
    }

    render() {
      this.root = document.createElement('span');
      this.root.className = `depth-text ${this.className}`.trim();
      this.root.style.setProperty('--depth-text-perspective', `${this.safePerspective}px`);
      this.root.style.setProperty('--depth-text-font-size', this.fontSize);
      this.root.style.setProperty('--depth-text-font-weight', this.fontWeight);
      this.root.style.setProperty('--depth-text-face-color', this.faceColor);
      this.root.style.setProperty('--depth-text-depth-color', this.depthColor);
      this.root.style.setProperty(
        '--depth-text-shadow',
        this.shadow
          ? `0 22px 34px color-mix(in srgb, ${this.depthColor} 36%, transparent), 0 4px 8px rgba(0, 0, 0, 0.28)`
          : 'none'
      );

      this.stage = document.createElement('span');
      this.stage.className = 'depth-text__stage';

      // Build depth layers from safeLayers down to 1
      for (let layerIndex = 0; layerIndex < this.safeLayers; layerIndex++) {
        const index = this.safeLayers - layerIndex;
        const layer = document.createElement('span');
        layer.className = 'depth-text__layer';
        layer.setAttribute('aria-hidden', 'true');
        layer.style.color = getLayerColor(this.faceColor, this.depthColor, index, this.safeLayers);
        layer.style.transform = `translateZ(${-index * this.safeDepth}px)`;
        layer.innerHTML = this.html;
        this.stage.appendChild(layer);
      }

      // Front crisp face
      const face = document.createElement('span');
      face.className = 'depth-text__face';
      face.innerHTML = this.html;
      this.stage.appendChild(face);

      this.root.appendChild(this.stage);

      this.container.innerHTML = '';
      this.container.appendChild(this.root);
    }

    initEvents() {
      const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

      const applyTransform = () => {
        if (this.stage) {
          this.stage.style.transform = getTransform(this.current.x, this.current.y);
        }
      };

      if (reducedMotion) {
        if (this.stage) {
          this.stage.style.transform = getTransform(this.baseRotation.x, this.baseRotation.y);
        }
        return;
      }

      const updateCoordinates = (clientX, clientY) => {
        if (!this.root) return;
        const rect = this.root.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        this.activePointer = true;
        const x = clamp((clientX - (rect.left + rect.width / 2)) / (rect.width * 0.8), -1.2, 1.2);
        const y = clamp((clientY - (rect.top + rect.height / 2)) / (rect.height * 0.8), -1.2, 1.2);

        this.target.x = this.baseRotation.x - y * this.safeTilt * 1.2;
        this.target.y = this.baseRotation.y + x * this.safeTilt * 1.2;
      };

      const handlePointerMove = event => {
        updateCoordinates(event.clientX, event.clientY);
      };

      const handleTouchMove = event => {
        if (event.touches && event.touches.length > 0) {
          updateCoordinates(event.touches[0].clientX, event.touches[0].clientY);
        }
      };

      const handlePointerLeave = () => {
        this.activePointer = false;
        this.target.x = this.baseRotation.x;
        this.target.y = this.baseRotation.y;
      };

      // Gyroscope tilt on mobile phones
      const handleOrientation = event => {
        if (this.activePointer) return; // Touch takes precedence
        if (event.gamma !== null && event.beta !== null) {
          const tiltX = clamp((event.beta - 40) / 30, -1, 1); // Normal holding angle ~40deg
          const tiltY = clamp(event.gamma / 30, -1, 1);
          this.target.x = this.baseRotation.x - tiltX * this.safeTilt * 0.6;
          this.target.y = this.baseRotation.y + tiltY * this.safeTilt * 0.6;
        }
      };

      if (this.pointerTracking) {
        window.addEventListener('pointermove', handlePointerMove, { passive: true });
        window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
        window.addEventListener('blur', handlePointerLeave);

        // Mobile touch interaction
        this.root.addEventListener('touchstart', handleTouchMove, { passive: true });
        this.root.addEventListener('touchmove', handleTouchMove, { passive: true });
        this.root.addEventListener('touchend', handlePointerLeave, { passive: true });

        // Mobile gyro tilt
        if (window.DeviceOrientationEvent && typeof window.DeviceOrientationEvent.requestPermission !== 'function') {
          window.addEventListener('deviceorientation', handleOrientation, { passive: true });
        }
      }

      this._cleanupEvents = () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerleave', handlePointerLeave);
        window.removeEventListener('blur', handlePointerLeave);
        if (this.root) {
          this.root.removeEventListener('touchstart', handleTouchMove);
          this.root.removeEventListener('touchmove', handleTouchMove);
          this.root.removeEventListener('touchend', handlePointerLeave);
        }
        window.removeEventListener('deviceorientation', handleOrientation);
      };

      const tick = now => {
        if ((!canTrackPointer || !this.activePointer) && this.autoOrbit) {
          const elapsed = (now - this.startTime) / 1000;
          const orbit = elapsed * this.safeOrbitSpeed * Math.PI * 2;
          const fallbackAmount = canTrackPointer ? 0.18 : 0.55;
          this.target.x = this.baseRotation.x + Math.sin(orbit) * this.safeTilt * fallbackAmount;
          this.target.y = this.baseRotation.y + Math.cos(orbit * 0.85) * this.safeTilt * fallbackAmount;
        }

        this.current.x += (this.target.x - this.current.x) * this.safeSmoothing;
        this.current.y += (this.target.y - this.current.y) * this.safeSmoothing;
        applyTransform();
        this.frameId = requestAnimationFrame(tick);
      };

      applyTransform();
      this.frameId = requestAnimationFrame(tick);
    }

    destroy() {
      if (this.frameId) cancelAnimationFrame(this.frameId);
      if (this._cleanupEvents) this._cleanupEvents();
      if (this.root && this.root.parentNode) {
        this.root.parentNode.removeChild(this.root);
      }
    }
  }

  global.DepthText = DepthText;
})(window);
