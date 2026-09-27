import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

import './AccordionGallery.css';

const DEFAULT_ITEMS = [
  { image: 'https://picsum.photos/id/1015/900/1200', label: 'Canyon', link: '#' },
  { image: 'https://picsum.photos/id/1018/900/1200', label: 'Ridgeline', link: '#' },
  { image: 'https://picsum.photos/id/1039/900/1200', label: 'Falls', link: '#' },
  { image: 'https://picsum.photos/id/1043/900/1200', label: 'Harbour', link: '#' },
  { image: 'https://picsum.photos/id/1044/900/1200', label: 'Skyline', link: '#' }
];

const AccordionGallery = ({
  items = DEFAULT_ITEMS,
  defaultIndex = 2,
  accentColor = '#e8a020',
  overlayColor = '#08090c',
  textColor = '#ffffff',
  height = 450,
  gap = 12,
  radius = 16,
  expandRatio = 0.54,
  orientation = 'horizontal',
  duration = 0.6,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  trigger = 'hover',
  showLabels = true,
  grayscale = true,
  autoPlay = true,
  autoPlayInterval = 4500,
  onSelect = null,
  onRegister = null,
  className = ''
}) => {
  const rootRef = useRef(null);
  const panelRefs = useRef([]);
  const mediaRefs = useRef([]);
  const glareRefs = useRef([]);
  const contentRefs = useRef([]);
  const peekRefs = useRef([]);
  const tlRef = useRef(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(340);
  const tourTimerRef = useRef(null);

  const vertical = orientation === 'vertical';
  const count = items.length;
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), count - 1));
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const applyLayout = useCallback(
    animate => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const content = contentRefs.current[i];
        const peek = peekRefs.current[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(
          panel,
          {
            flexGrow: isActive ? grow : 1,
            '--ag-dim': isActive ? 0.08 : 0.42,
            ...rotProp,
            duration: dur,
            ease
          },
          0
        );

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 0.8) : 0;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              '--ag-gray': gray,
              '--ag-dim': isActive ? 0.08 : 0.42,
              duration: dur,
              ease
            },
            0
          );
        }

        if (content) {
          if (isActive) {
            tl.to(content, { opacity: 1, y: 0, duration: dur * 0.85, ease }, 0.05);
          } else {
            tl.to(content, { opacity: 0, y: 12, duration: dur * 0.4, ease: 'power2.in' }, 0);
          }
        }

        if (peek) {
          if (isActive) {
            tl.to(peek, { opacity: 0, duration: dur * 0.35, ease: 'power2.in' }, 0);
          } else {
            tl.to(peek, { opacity: 1, duration: dur * 0.8, ease }, 0.1);
          }
        }
      });

      tlRef.current = tl;
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      grayscale,
      prefersReduced
    ]
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(160, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.25);
      mediaSizeRef.current = size;
      el.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(() => {
    if (!isPlaying || isHovered) {
      setProgress(0);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / autoPlayInterval) * 100);
      setProgress(pct);

      if (elapsed >= autoPlayInterval) {
        setActive(prev => (prev + 1) % count);
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, active, count, autoPlayInterval]);

  const handleMouseMove = (i, e) => {
    if (prefersReduced) return;
    const panel = panelRefs.current[i];
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const xPct = x - 0.5;
    const yPct = y - 0.5;

    const tiltX = -yPct * (i === active ? 10 : 6);
    const tiltY = xPct * (i === active ? 12 : 8);

    panel.style.transform = `perspective(1200px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(${i === active ? '12px' : '4px'})`;

    const glare = glareRefs.current[i];
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%, rgba(255,255,255,0.22) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = i => {
    if (prefersReduced) return;
    const panel = panelRefs.current[i];
    if (!panel) return;
    const rot = i === active ? 0 : i < active ? tilt : -tilt;
    panel.style.transform = `perspective(1200px) rotateY(${rot}deg) translateZ(0px)`;
  };

  return (
    <div
      className="ag-container-wrap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Toolbar ── */}
      <div className="ag-toolbar" role="toolbar" aria-label="Events Gallery Controls">
        <div className="ag-toolbar__left">
          <div className="ag-toolbar__counter">
            EVENT <span className="ag-counter-curr">{String(active + 1).padStart(2, '0')}</span> / {String(count).padStart(2, '0')}
          </div>
          <div className="ag-toolbar__status">
            <span className="ag-pulse-dot"></span> LIVE CAD SELECTOR
          </div>
        </div>

        <div className="ag-pills">
          {items.map((it, i) => {
            const catCol = it.catColor || accentColor;
            return (
              <button
                key={i}
                type="button"
                className={`ag-pill${i === active ? ' is-active' : ''}`}
                style={{ '--pill-color': catCol }}
                onClick={() => setActive(i)}
              >
                <span className="ag-pill__dot"></span>
                <span>{String(i + 1).padStart(2, '0')} {it.icon || '⌖'} {(it.shortTitle || it.title || it.label || '').split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        <div className="ag-toolbar__right">
          <button
            type="button"
            className={`ag-tour-btn${isPlaying ? ' is-playing' : ''}`}
            onClick={() => setIsPlaying(p => !p)}
          >
            <span>{isPlaying ? '⏸' : '▶'}</span>
            <span>{isPlaying ? 'Pause Tour' : 'Auto Tour'}</span>
          </button>
          <button
            type="button"
            className="ag-nav-btn"
            onClick={() => setActive(prev => (prev - 1 + count) % count)}
            aria-label="Previous"
          >
            ◀
          </button>
          <button
            type="button"
            className="ag-nav-btn"
            onClick={() => setActive(prev => (prev + 1) % count)}
            aria-label="Next"
          >
            ▶
          </button>
        </div>
      </div>

      <div className="ag-progress-bar">
        <div className="ag-progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      {/* ── Accordion Gallery ── */}
      <div
        ref={rootRef}
        className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}${className ? ` ${className}` : ''}`}
        style={{
          '--ag-accent': accentColor,
          '--ag-overlay': overlayColor,
          '--ag-text': textColor,
          '--ag-gap': `${gap}px`,
          '--ag-radius': `${radius}px`,
          height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`
        }}
        role="list"
        aria-label="Interactive Events Accordion Gallery"
      >
        {items.map((item, i) => {
          const isActive = i === active;
          const catCol = item.catColor || accentColor;
          return (
            <div
              key={i}
              ref={el => (panelRefs.current[i] = el)}
              className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
              style={{ borderRadius: `${radius}px`, '--cat-color': catCol }}
              onClick={e => {
                if (i !== active) {
                  e.preventDefault();
                  setActive(i);
                } else if (!e.target.closest('button, a') && onSelect) {
                  onSelect(item, i);
                }
              }}
              onMouseEnter={() => trigger === 'hover' && setActive(i)}
              onMouseMove={e => handleMouseMove(i, e)}
              onMouseLeave={() => handleMouseLeave(i)}
              role="listitem"
              tabIndex={0}
              aria-current={isActive ? 'true' : undefined}
              aria-label={item.label || item.title}
            >
              <span className="ag-panel__frame">
                <span className="ag-panel__media" ref={el => (mediaRefs.current[i] = el)}>
                  <img src={item.image} alt={item.alt || item.label || ''} draggable="false" />
                </span>
                <span className="ag-panel__overlay" aria-hidden="true" />
                <span className="ag-panel__glare" ref={el => (glareRefs.current[i] = el)} aria-hidden="true" />
              </span>

              {/* Collapsed Peek */}
              <div className="ag-panel__peek" ref={el => (peekRefs.current[i] = el)}>
                <span className="ag-peek__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="ag-peek__center">{item.icon || '⌖'} {item.shortTitle || item.title || item.label}</span>
                <span className="ag-peek__dot" style={{ '--pill-color': catCol }}></span>
              </div>

              {/* Expanded Rich Card */}
              <div className="ag-panel__content" ref={el => (contentRefs.current[i] = el)}>
                <div className="ag-content__top">
                  <span className="ag-badge" style={{ '--cat-color': catCol }}>
                    <span className="ag-badge__pulse"></span> {item.category || 'CIVIL ENGINEERING'}
                  </span>
                  <span className="ag-dwg-ref">DWG 0{i + 1} // PCCOE</span>
                </div>

                <div className="ag-content__main">
                  {item.tagline && <div className="ag-content__tagline">"{item.tagline}"</div>}
                  <div className="ag-content__title-wrap">
                    <span className="ag-content__bar" style={{ '--cat-color': catCol }}></span>
                    <h3 className="ag-content__title">{item.label || item.title}</h3>
                  </div>

                  <div className="ag-content__meta">
                    {item.prize && <span className="ag-meta-chip ag-meta-chip--prize">🏆 {item.prize}</span>}
                    {item.teamSize && <span className="ag-meta-chip">👥 {item.teamSize}</span>}
                    {item.date && <span className="ag-meta-chip">📅 {item.date}</span>}
                    {item.venue && <span className="ag-meta-chip">📍 {item.venue}</span>}
                  </div>

                  <div className="ag-content__actions">
                    <button
                      type="button"
                      className="ag-btn-details"
                      onClick={e => {
                        e.stopPropagation();
                        if (onSelect) onSelect(item, i);
                      }}
                    >
                      <span>View Full Details</span><span>↗</span>
                    </button>
                    <button
                      type="button"
                      className="ag-btn-register"
                      style={{ '--cat-color': catCol }}
                      onClick={e => {
                        e.stopPropagation();
                        if (onRegister) onRegister(item, i);
                        else if (onSelect) onSelect(item, i);
                      }}
                    >
                      <span>Register Now</span><span>⚡</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccordionGallery;

