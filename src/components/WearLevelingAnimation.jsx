import { useEffect, useRef, useState } from "react";

/* ============================================================
   WearLevelingAnimation.jsx
   "Wear Leveling in Action" — two 24-block grids simulating 40
   writes each: one panel always hits 3 fixed "hot" blocks (no
   wear leveling), the other rotates writes round-robin across
   all blocks (wear leveling). Meant to be used with
   client:visible so it plays once the figure scrolls into view.
   Independent of SSDSpeedChallenge — no shared state or DOM.
   ============================================================ */

const TOTAL_BLOCKS = 24;
const TOTAL_WRITES = 40;
const DEAD_THRESHOLD = 8;
const TICK_MS = 140;
const HOT_INDICES = [5, 11, 17];

function makeBlocks() {
  return Array.from({ length: TOTAL_BLOCKS }, () => ({ heat: 0, dead: false }));
}

function stateForHeat(heat, dead) {
  if (dead) return "dead";
  if (heat === 0) return "cool";
  if (heat <= 3) return "warm";
  if (heat <= 6) return "hot";
  return "critical";
}

function applyWrite(blocks, idx) {
  const cell = blocks[idx];
  if (cell.dead) return blocks;
  const next = blocks.slice();
  const heat = cell.heat + 1;
  next[idx] = { heat, dead: heat >= DEAD_THRESHOLD };
  return next;
}

export default function WearLevelingAnimation() {
  const [hotBlocks, setHotBlocks] = useState(makeBlocks);
  const [levBlocks, setLevBlocks] = useState(makeBlocks);
  const [lastHotIdx, setLastHotIdx] = useState(-1);
  const [lastLevIdx, setLastLevIdx] = useState(-1);
  const [status, setStatus] = useState("Scroll here to run 40 simulated writes…");
  const [done, setDone] = useState(false);

  const runningRef = useRef(false);
  const hasRunRef = useRef(false);

  function finish(hot, lev) {
    const hotDead = hot.filter((c) => c.dead).length;
    const levDead = lev.filter((c) => c.dead).length;
    setStatus(
      `Done — ${hotDead} blocks dead without wear leveling vs. ${levDead} with it. Click to replay.`
    );
    setDone(true);
    setLastHotIdx(-1);
    setLastLevIdx(-1);
  }

  function runOnce(instant) {
    if (runningRef.current) return;
    runningRef.current = true;
    setDone(false);

    let hot = makeBlocks();
    let lev = makeBlocks();

    if (instant) {
      for (let t = 0; t < TOTAL_WRITES; t++) {
        const hotIdx = HOT_INDICES[Math.floor(Math.random() * HOT_INDICES.length)];
        hot = applyWrite(hot, hotIdx);
        lev = applyWrite(lev, t % TOTAL_BLOCKS);
      }
      setHotBlocks(hot);
      setLevBlocks(lev);
      finish(hot, lev);
      runningRef.current = false;
      return;
    }

    let tick = 0;
    setStatus("Simulating writes…");
    const interval = setInterval(() => {
      tick++;
      const hotIdx = HOT_INDICES[Math.floor(Math.random() * HOT_INDICES.length)];
      const levIdx = (tick - 1) % TOTAL_BLOCKS;
      hot = applyWrite(hot, hotIdx);
      lev = applyWrite(lev, levIdx);
      setHotBlocks(hot);
      setLevBlocks(lev);
      setLastHotIdx(hotIdx);
      setLastLevIdx(levIdx);
      setStatus(`Write ${tick} of ${TOTAL_WRITES}…`);
      if (tick >= TOTAL_WRITES) {
        clearInterval(interval);
        runningRef.current = false;
        finish(hot, lev);
      }
    }, TICK_MS);
  }

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;
    runOnce(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleReplay() {
    if (runningRef.current) return;
    setHotBlocks(makeBlocks());
    setLevBlocks(makeBlocks());
    runOnce(false);
  }

  const hotDeadCount = hotBlocks.filter((c) => c.dead).length;
  const levDeadCount = levBlocks.filter((c) => c.dead).length;

  return (
    <figure className="wearanim-figure">
      <figcaption className="wearanim-caption-top">
        Fig. Same 40 writes, two strategies — watch which blocks wear out
      </figcaption>
      <div className="wearanim-wrap">
        <div className="wearanim-panel">
          <div className="wearanim-panel-head">
            <span className="wearanim-panel-title">No Wear Leveling</span>
            <span className="wearanim-panel-stat">
              <span className="wearanim-dead-count">{hotDeadCount}</span> blocks dead
            </span>
          </div>
          <div className="wearanim-grid">
            {hotBlocks.map((cell, i) => (
              <div
                key={i}
                className={
                  `wearanim-cell state-${stateForHeat(cell.heat, cell.dead)}` +
                  (i === lastHotIdx ? " is-writing" : "")
                }
              />
            ))}
          </div>
        </div>
        <div className="wearanim-panel">
          <div className="wearanim-panel-head">
            <span className="wearanim-panel-title">With Wear Leveling</span>
            <span className="wearanim-panel-stat">
              <span className="wearanim-dead-count">{levDeadCount}</span> blocks dead
            </span>
          </div>
          <div className="wearanim-grid">
            {levBlocks.map((cell, i) => (
              <div
                key={i}
                className={
                  `wearanim-cell state-${stateForHeat(cell.heat, cell.dead)}` +
                  (i === lastLevIdx ? " is-writing" : "")
                }
              />
            ))}
          </div>
        </div>
      </div>
      <div className="wearanim-legend">
        <span className="wearanim-legend-item">
          <span className="wearanim-swatch wearanim-swatch-cool"></span>Fresh
        </span>
        <span className="wearanim-legend-item">
          <span className="wearanim-swatch wearanim-swatch-warm"></span>Wearing
        </span>
        <span className="wearanim-legend-item">
          <span className="wearanim-swatch wearanim-swatch-hot"></span>Near limit
        </span>
        <span className="wearanim-legend-item">
          <span className="wearanim-swatch wearanim-swatch-dead"></span>Dead cell
        </span>
      </div>
      <p
        className={`wearanim-status${done ? " wearanim-replayable" : ""}`}
        onClick={done ? handleReplay : undefined}
        aria-live="polite"
      >
        {status}
      </p>
    </figure>
  );
}