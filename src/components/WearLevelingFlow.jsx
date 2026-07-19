import { useEffect, useRef, useState } from 'react';

const ROWS = [
  { key: 'slc', label: 'SLC', width: 100, val: '~100,000 P/E cycles', color: '#00FFFF' },
  { key: 'mlc', label: 'MLC', width: 74, val: '~3,000\u201310,000', color: '#39FF14' },
  { key: 'tlc', label: 'TLC', width: 66, val: '~1,000\u20133,000', color: '#ffee00' },
  { key: 'qlc', label: 'QLC', width: 46, val: '~100\u2013300', color: '#FF00FF' },
];

const CYCLE_MS = 1300;

// Fully self-contained: inline styles only, plus one embedded <style> tag
// for the glow-pulse keyframes (the one thing that can't be inlined).
// No dependency on any external stylesheet class.

const wrapStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.7rem',
  margin: '1.5rem 0',
};

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.85rem',
};

const labelBaseStyle = {
  minWidth: '48px',
  fontFamily: 'var(--font-head)',
  letterSpacing: '1px',
  fontSize: '0.8rem',
  transition: 'color 0.3s ease, text-shadow 0.3s ease',
};

const trackStyle = {
  flex: 1,
  height: '16px',
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '3px',
  overflow: 'hidden',
};

const valStyle = {
  minWidth: '150px',
  textAlign: 'right',
  letterSpacing: '0.5px',
  fontSize: '0.74rem',
  color: 'var(--text-muted)',
};

export default function WearLevelingFlow() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !intervalRef.current) {
          setActiveIndex(0);
          intervalRef.current = setInterval(() => {
            setActiveIndex((i) => (i + 1) % ROWS.length);
          }, CYCLE_MS);
        } else if (!entry.isIntersecting && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setActiveIndex(-1);
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

  return (
    <div style={wrapStyle} ref={containerRef}>
      <style>{`
        @keyframes wearGlowPulse {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 1; }
        }
      `}</style>

      {ROWS.map((row, i) => {
        const isActive = i === activeIndex;
        const filled = activeIndex >= 0 && i <= activeIndex;

        return (
          <div key={row.key} style={rowStyle}>
            <div
              style={{
                ...labelBaseStyle,
                color: isActive ? row.color : 'var(--text-muted)',
                textShadow: isActive ? `0 0 10px ${row.color}` : 'none',
              }}
            >
              {row.label}
            </div>

            <div style={trackStyle}>
              <div
                style={{
                  height: '100%',
                  borderRadius: '3px',
                  width: filled ? `${row.width}%` : '0%',
                  background: row.color,
                  opacity: filled ? 0.9 : 0.85,
                  boxShadow: isActive ? `0 0 14px ${row.color}` : 'none',
                  animation: isActive ? 'wearGlowPulse 1s ease-in-out infinite' : 'none',
                  transition: 'width 0.6s ease, box-shadow 0.3s ease, opacity 0.3s ease',
                }}
              />
            </div>

            <div style={valStyle}>{row.val}</div>
          </div>
        );
      })}
    </div>
  );
}
