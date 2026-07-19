import { useEffect, useRef, useState } from 'react';

const CELL_TYPES = [
  { key: 'slc', label: 'SLC', bits: 1, states: 2, color: '#00FFFF', desc: '1 bit per cell, 2 voltage states \u2014 fastest and most durable.' },
  { key: 'mlc', label: 'MLC', bits: 2, states: 4, color: '#39FF14', desc: '2 bits per cell, 4 voltage states.' },
  { key: 'tlc', label: 'TLC', bits: 3, states: 8, color: '#ffee00', desc: '3 bits per cell, 8 voltage states \u2014 the mainstream consumer standard.' },
  { key: 'qlc', label: 'QLC', bits: 4, states: 16, color: '#FF00FF', desc: '4 bits per cell, 16 voltage states \u2014 cheapest per gigabyte, shortest lifespan.' },
];

const CYCLE_MS = 2200;

// Everything below is inline-styled on purpose: this component no longer
// depends on any class in flash.css, so it can't be broken by a stylesheet
// that isn't rebuilding/reloading. The only thing that can't be inlined is
// the dot's blink keyframes, so that one rule ships in a scoped <style> tag
// rendered by React itself.

const wrapStyle = {
  position: 'relative',
  margin: '1.75rem 0',
  padding: '2rem 1.75rem 1.6rem',
  background:
    'radial-gradient(ellipse at 50% 0%, rgba(0,255,255,0.07), transparent 60%), rgba(10,0,20,0.9)',
  border: '1px solid rgba(255,255,255,0.16)',
  borderRadius: '10px',
  boxShadow: 'inset 0 0 26px rgba(0,0,0,0.6)',
};

const cornerBase = {
  position: 'absolute',
  width: '16px',
  height: '16px',
  borderColor: 'rgba(0,255,255,0.5)',
  borderStyle: 'solid',
  pointerEvents: 'none',
};

const CORNERS = [
  { top: 8, left: 8, borderWidth: '2px 0 0 2px' },
  { top: 8, right: 8, borderWidth: '2px 2px 0 0' },
  { bottom: 8, left: 8, borderWidth: '0 0 2px 2px' },
  { bottom: 8, right: 8, borderWidth: '0 2px 2px 0' },
];

const headerStyle = {
  textAlign: 'center',
  fontFamily: 'var(--font-head)',
  fontSize: '0.68rem',
  letterSpacing: '2.5px',
  color: 'rgba(170,170,204,0.6)',
  textTransform: 'uppercase',
  marginBottom: '1.15rem',
};

const rowStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
  border: '1px solid rgba(255,255,255,0.14)',
  borderRadius: '8px',
  overflow: 'hidden',
};

export default function CellVoltageDiagram() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !intervalRef.current) {
          setRunning(true);
          intervalRef.current = setInterval(() => {
            setActiveIndex((i) => (i + 1) % CELL_TYPES.length);
          }, CYCLE_MS);
        } else if (!entry.isIntersecting && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setRunning(false);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearInterval(intervalRef.current);
    };
  }, []);

  const active = CELL_TYPES[activeIndex];

  return (
    <div style={wrapStyle} ref={containerRef}>
      <style>{`
        @keyframes cellvoltBlinkInline {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>

      {CORNERS.map((c, i) => (
        <span key={i} style={{ ...cornerBase, ...c }} />
      ))}

      <div style={headerStyle}>NAND CELL TYPES</div>

      <div style={rowStyle}>
        {CELL_TYPES.map((c, i) => {
          const isActive = running && i === activeIndex;
          const isLast = i === CELL_TYPES.length - 1;
          return (
            <div
              key={c.key}
              style={{
                textAlign: 'center',
                padding: '1rem 0.6rem',
                borderRight: isLast ? 'none' : '1px solid rgba(255,255,255,0.1)',
                background: isActive ? `${c.color}14` : 'rgba(255,255,255,0.02)',
                boxShadow: isActive
                  ? `inset 0 0 0 1px ${c.color}, 0 0 18px ${c.color}55`
                  : 'none',
                transform: isActive ? 'translateY(-3px)' : 'none',
                transition: 'background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-head)',
                  fontSize: '0.8rem',
                  letterSpacing: '1.5px',
                  color: isActive ? c.color : 'var(--text-muted)',
                  marginBottom: '0.6rem',
                  transition: 'color 0.3s ease',
                }}
              >
                {c.label}
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '3px',
                  minHeight: '32px',
                  alignItems: 'center',
                  marginBottom: '0.6rem',
                }}
              >
                {Array.from({ length: c.states }).map((_, j) => (
                  <span
                    key={j}
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: isActive ? c.color : 'rgba(255,255,255,0.14)',
                      boxShadow: isActive ? `0 0 6px ${c.color}` : 'none',
                      animation: isActive ? 'cellvoltBlinkInline 1.6s ease-in-out infinite' : 'none',
                      animationDelay: `${j * 0.05}s`,
                      transition: 'background 0.2s ease, box-shadow 0.2s ease',
                    }}
                  />
                ))}
              </div>

              <div
                style={{
                  fontSize: '0.68rem',
                  color: 'rgba(170,170,204,0.65)',
                  letterSpacing: '0.4px',
                }}
              >
                {c.bits} bit{c.bits > 1 ? 's' : ''}/cell
              </div>
            </div>
          );
        })}
      </div>

      <p
        style={{
          textAlign: 'center',
          marginTop: '1.1rem',
          fontSize: '0.8rem',
          letterSpacing: '0.3px',
          minHeight: '1.4rem',
          color: active.color,
          transition: 'color 0.3s ease',
        }}
      >
        {active.desc}
      </p>
    </div>
  );
}