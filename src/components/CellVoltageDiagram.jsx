import { useEffect, useRef, useState } from 'react';

const CELL_TYPES = [
  { key: 'slc', label: 'SLC', bits: 1, states: 2, color: '#00FFFF', desc: '1 bit per cell, 2 voltage states \u2014 fastest and most durable.' },
  { key: 'mlc', label: 'MLC', bits: 2, states: 4, color: '#39FF14', desc: '2 bits per cell, 4 voltage states.' },
  { key: 'tlc', label: 'TLC', bits: 3, states: 8, color: '#ffee00', desc: '3 bits per cell, 8 voltage states \u2014 the mainstream consumer standard.' },
  { key: 'qlc', label: 'QLC', bits: 4, states: 16, color: '#FF00FF', desc: '4 bits per cell, 16 voltage states \u2014 cheapest per gigabyte, shortest lifespan.' },
];

const CYCLE_MS = 2200;

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
    <div className="cellvolt-wrap" ref={containerRef}>
      <div className="cellvolt-row">
        {CELL_TYPES.map((c, i) => {
          const isActive = running && i === activeIndex;
          return (
            <div
              key={c.key}
              className={`cellvolt-card${isActive ? ' is-active' : ''}`}
              style={isActive ? {
                borderColor: c.color,
                background: `${c.color}1a`,
                boxShadow: `0 0 20px ${c.color}55`,
              } : undefined}
            >
              <div className="cellvolt-name" style={isActive ? { color: c.color } : undefined}>
                {c.label}
              </div>
              <div className="cellvolt-states">
                {Array.from({ length: c.states }).map((_, j) => (
                  <span
                    key={j}
                    className="cellvolt-dot"
                    style={isActive ? {
                      background: c.color,
                      boxShadow: `0 0 6px ${c.color}`,
                      animationDelay: `${j * 0.05}s`,
                    } : undefined}
                  />
                ))}
              </div>
              <div className="cellvolt-bits">{c.bits} bit{c.bits > 1 ? 's' : ''}/cell</div>
            </div>
          );
        })}
      </div>
      <p className="cellvolt-caption" style={{ color: active.color }}>{active.desc}</p>
    </div>
  );
}
