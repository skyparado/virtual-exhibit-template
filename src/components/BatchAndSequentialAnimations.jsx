const styles = `
.bsa-wrap {
  font-family: 'Courier New', 'IBM Plex Mono', monospace;
  background: #F5EFDD;
  border: 1px solid #C9A66B;
  border-radius: 4px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  color: #2B2118;
  overflow: hidden;
}
.bsa-label {
  display: block;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  font-weight: 700;
  color: #3E6E64;
  margin-bottom: 1.1rem;
  border-bottom: 1px dashed #C9A66B;
  padding-bottom: 0.65rem;
}
.bsa-caption {
  margin-top: 1.25rem;
  font-family: system-ui, sans-serif;
  font-size: 0.92rem;
  line-height: 1.5;
  color: #4A3F30;
  text-align: justify;
}

/* --- Batch processing: conveyor of cards feeding a reader --- */
.bpa-lane {
  display: flex;
  align-items: center;
  gap: 1.1rem;
}
.bpa-hopper, .bpa-reader {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  width: 4.2rem;
  height: 4.2rem;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #3E6E64;
  border: 2px solid #3E6E64;
  border-radius: 4px;
  background: repeating-linear-gradient(135deg, #EDE3C8, #EDE3C8 4px, #E4D7B4 4px, #E4D7B4 8px);
}
.bpa-lamp {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: #C1652F;
  box-shadow: 0 0 8px 2px rgba(193, 101, 47, 0.6);
  animation: bpa-blink 0.7s infinite alternate;
}
@keyframes bpa-blink { from { opacity: 1; } to { opacity: 0.25; } }

.bpa-track-window {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  height: 3.4rem;
  position: relative;
  -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
}
.bpa-track {
  display: flex;
  gap: 0.6rem;
  width: max-content;
  animation: bpa-scroll 9s linear infinite;
}
@keyframes bpa-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.bpa-card {
  flex-shrink: 0;
  width: 2.3rem;
  height: 3.1rem;
  border: 1.5px solid #8B6F3E;
  background: #C9A66B;
  color: #2B2118;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 700;
  clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 24%);
}
.bpa-output {
  flex-shrink: 0;
  display: flex;
  align-items: flex-end;
}
.bpa-output .bpa-card {
  width: 1.9rem;
  height: 2.5rem;
  margin-left: -0.7rem;
  background: #D9CBA3;
  opacity: 0.75;
}
.bpa-output .bpa-card:first-child { margin-left: 0; }

/* --- Sequential access: fixed head, drum spinning underneath --- */
.sda-track {
  position: relative;
  display: flex;
  gap: 6px;
  padding-top: 2.2rem;
  padding-bottom: 0.4rem;
}
.sda-record {
  flex: 1;
  min-width: 0;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid #C9A66B;
  background: #EDE3C8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  color: #8B6F3E;
  animation: sda-pulse 4s ease-in-out infinite;
}
@keyframes sda-pulse {
  0%, 82%, 100% { background: #EDE3C8; border-color: #C9A66B; color: #8B6F3E; }
  4%, 10% { background: #C1652F; border-color: #8B4321; color: #F5EFDD; }
  14%, 78% { background: #D9CBA3; border-color: #8B6F3E; color: #4A3F30; }
}
.sda-head {
  position: absolute;
  top: 0;
  left: 0;
  width: calc((100% - 54px) / 10);
  text-align: center;
  font-size: 0.58rem;
  font-weight: 700;
  color: #3E6E64;
  line-height: 1.1;
  animation: sda-sweep 4s linear infinite;
}
@keyframes sda-sweep {
  0% { transform: translateX(0); opacity: 1; }
  92% { transform: translateX(calc((100% + 60px) * 9)); opacity: 1; }
  96%, 100% { transform: translateX(0); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .bpa-track, .bpa-lamp, .sda-record, .sda-head { animation: none !important; }
}
`;

export function BatchProcessingAnimation() {
  const jobs = ['J1', 'J2', 'J3', 'J4', 'J5'];
  const doubled = [...jobs, ...jobs];

  return (
    <div className="bsa-wrap">
      <style>{styles}</style>
      <span className="bsa-label">BATCH QUEUE — JOBS RUN ONE AFTER ANOTHER</span>
      <div className="bpa-lane">
        <div className="bpa-hopper">HOPPER</div>
        <div className="bpa-track-window">
          <div className="bpa-track">
            {doubled.map((j, i) => (
              <div className="bpa-card" key={i}>
                {j}
              </div>
            ))}
          </div>
        </div>
        <div className="bpa-reader">
          <div className="bpa-lamp" />
          READER
        </div>
        <div className="bpa-output">
          {jobs.slice(0, 4).map((j, i) => (
            <div className="bpa-card" key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SequentialAccessAnimation() {
  const total = 10;

  return (
    <div className="bsa-wrap">
      <style>{styles}</style>
      <span className="bsa-label">MAGNETIC DRUM — HEAD FIXED, RECORDS PASS UNDERNEATH</span>
      <div className="sda-track">
        <div className="sda-head">▼<br />HEAD</div>
        {Array.from({ length: total }, (_, i) => (
          <div className="sda-record" key={i} style={{ animationDelay: `${(i * 4) / total}s` }}>
            {i}
          </div>
        ))}
      </div>
    </div>
  );
}
