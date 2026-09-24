/**
 * STHAPATYA 2026-27 — Interactive Civil Engineering Constellation Canvas
 * Ambient Space-Truss Triangulation, Surveying Nodes, and Interactive Laser Beams
 */

(function () {
  'use strict';

  class CivilBackgroundCanvas {
    constructor(canvasId = 'bg-canvas') {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d', { alpha: true });
      if (!this.ctx) return;

      this.nodes = [];
      this.mouse = { x: -1000, y: -1000, active: false };
      this.width = 0;
      this.height = 0;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.animId = null;
      this.isRunning = false;

      // Color palette matching Sthapatya Civil Engineering theme
      this.colors = [
        'rgba(232, 160, 32, ',   // Amber (#e8a020)
        'rgba(56, 189, 248, ',   // Cyan / Blueprint (#38bdf8)
        'rgba(78, 205, 196, ',   // Teal / Green (#4ecdc4)
        'rgba(237, 234, 229, '   // Concrete White (#edeae5)
      ];

      // Engineering labels attached to landmark survey nodes
      this.sampleLabels = [
        'BM +562.4m', 'NODE 01 [APEX]', 'IS 800:TRUSS', 'GRID C-4',
        'DATUM 0°', 'COORD 18°37\'N', 'ELEV +14.2m', 'PIER P-02',
        'LIMIT STATE', 'CAD DWG-06', 'NBC COMPLIANT', 'BEARING 42°'
      ];

      this.init();
    }

    init() {
      this.resize();
      window.addEventListener('resize', () => this.resize(), { passive: true });

      // Mouse and touch tracking for interactive laser lines
      window.addEventListener('pointermove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this.mouse.active = true;
      }, { passive: true });

      window.addEventListener('pointerleave', () => {
        this.mouse.active = false;
      }, { passive: true });

      // Pause rendering when tab is hidden to conserve battery
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stop();
        } else {
          this.start();
        }
      });

      this.createNodes();
      this.start();
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width * this.dpr;
      this.canvas.height = this.height * this.dpr;
      this.ctx.scale(this.dpr, this.dpr);

      // Re-adjust node count on significant resize
      const targetCount = this.width < 768 ? 24 : 52;
      if (this.nodes.length !== targetCount) {
        this.createNodes();
      }
    }

    createNodes() {
      const isMobile = this.width < 768;
      const count = isMobile ? 24 : 52;
      this.nodes = [];

      for (let i = 0; i < count; i++) {
        const colorBase = this.colors[Math.floor(Math.random() * this.colors.length)];
        const hasLabel = i % (isMobile ? 8 : 5) === 0;
        const label = hasLabel ? this.sampleLabels[i % this.sampleLabels.length] : null;

        this.nodes.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          baseRadius: Math.random() * 1.8 + 1.2,
          radius: 1.5,
          colorBase: colorBase,
          label: label,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.02,
          isBenchmark: Math.random() > 0.8
        });
      }
    }

    start() {
      if (!this.isRunning) {
        this.isRunning = true;
        this.loop();
      }
    }

    stop() {
      this.isRunning = false;
      if (this.animId) {
        cancelAnimationFrame(this.animId);
      }
    }

    loop() {
      if (!this.isRunning) return;
      this.render();
      this.animId = requestAnimationFrame(() => this.loop());
    }

    render() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      const maxConnectDist = this.width < 768 ? 95 : 135;
      const maxMouseDist = 180;
      const nodesLen = this.nodes.length;

      // 1. Update and draw nodes
      for (let i = 0; i < nodesLen; i++) {
        const n = this.nodes[i];

        // Move
        n.x += n.vx;
        n.y += n.vy;

        // Bounce gently at viewport edges
        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        else if (n.x > this.width) { n.x = this.width; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        else if (n.y > this.height) { n.y = this.height; n.vy *= -1; }

        // Subtle pulsing size
        n.pulse += n.pulseSpeed;
        const pulseFactor = Math.sin(n.pulse);
        n.radius = n.baseRadius + pulseFactor * 0.6;

        // Mouse gentle repulsion/drift
        if (this.mouse.active) {
          const dx = n.x - this.mouse.x;
          const dy = n.y - this.mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120 * 0.4;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
          }
        }

        // Draw node center point
        this.ctx.beginPath();
        this.ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = n.colorBase + (0.55 + pulseFactor * 0.25) + ')';
        this.ctx.fill();

        // Benchmark crosshair target symbol for designated nodes
        if (n.isBenchmark) {
          this.ctx.strokeStyle = n.colorBase + '0.35)';
          this.ctx.lineWidth = 0.8;
          this.ctx.beginPath();
          this.ctx.arc(n.x, n.y, n.radius + 4, 0, Math.PI * 2);
          this.ctx.stroke();

          // Tiny tick lines
          this.ctx.beginPath();
          this.ctx.moveTo(n.x - n.radius - 6, n.y);
          this.ctx.lineTo(n.x + n.radius + 6, n.y);
          this.ctx.moveTo(n.x, n.y - n.radius - 6);
          this.ctx.lineTo(n.x, n.y + n.radius + 6);
          this.ctx.stroke();
        }

        // Surveying / CAD labels
        if (n.label) {
          this.ctx.font = '8px "Space Mono", monospace';
          this.ctx.fillStyle = n.colorBase + '0.45)';
          this.ctx.fillText(n.label, n.x + 8, n.y - 6);
        }
      }

      // 2. Draw Civil Structural Truss Lines between nearby nodes
      for (let i = 0; i < nodesLen; i++) {
        const nA = this.nodes[i];

        for (let j = i + 1; j < nodesLen; j++) {
          const nB = this.nodes[j];
          const dx = nA.x - nB.x;
          const dy = nA.y - nB.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.22;
            this.ctx.beginPath();
            this.ctx.moveTo(nA.x, nA.y);
            this.ctx.lineTo(nB.x, nB.y);
            this.ctx.strokeStyle = `rgba(232, 160, 32, ${alpha})`;
            this.ctx.lineWidth = 0.85;
            this.ctx.stroke();

            // Structural triangulation mesh fill for very close nodes
            for (let k = j + 1; k < nodesLen; k++) {
              const nC = this.nodes[k];
              const dAC = Math.hypot(nA.x - nC.x, nA.y - nC.y);
              const dBC = Math.hypot(nB.x - nC.x, nB.y - nC.y);

              if (dAC < maxConnectDist * 0.75 && dBC < maxConnectDist * 0.75) {
                const triAlpha = (1 - (dist + dAC + dBC) / (maxConnectDist * 2.5)) * 0.04;
                if (triAlpha > 0) {
                  this.ctx.beginPath();
                  this.ctx.moveTo(nA.x, nA.y);
                  this.ctx.lineTo(nB.x, nB.y);
                  this.ctx.lineTo(nC.x, nC.y);
                  this.ctx.closePath();
                  this.ctx.fillStyle = `rgba(56, 189, 248, ${triAlpha})`;
                  this.ctx.fill();
                }
              }
            }
          }
        }

        // 3. Draw Laser Coordinate Beams from cursor to nearest nodes
        if (this.mouse.active) {
          const dx = nA.x - this.mouse.x;
          const dy = nA.y - this.mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxMouseDist) {
            const laserAlpha = (1 - dist / maxMouseDist) * 0.38;
            this.ctx.beginPath();
            this.ctx.moveTo(this.mouse.x, this.mouse.y);
            this.ctx.lineTo(nA.x, nA.y);
            this.ctx.strokeStyle = `rgba(78, 205, 196, ${laserAlpha})`;
            this.ctx.lineWidth = 1;
            this.ctx.setLineDash([3, 4]);
            this.ctx.stroke();
            this.ctx.setLineDash([]);
          }
        }
      }

      // 4. Cursor laser target HUD
      if (this.mouse.active) {
        this.ctx.strokeStyle = 'rgba(232, 160, 32, 0.4)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, 8, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(this.mouse.x - 12, this.mouse.y);
        this.ctx.lineTo(this.mouse.x + 12, this.mouse.y);
        this.ctx.moveTo(this.mouse.x, this.mouse.y - 12);
        this.ctx.lineTo(this.mouse.x, this.mouse.y + 12);
        this.ctx.stroke();
      }
    }
  }

  // Auto initialize on DOMContentLoaded or immediate if ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new CivilBackgroundCanvas());
  } else {
    new CivilBackgroundCanvas();
  }
})();
