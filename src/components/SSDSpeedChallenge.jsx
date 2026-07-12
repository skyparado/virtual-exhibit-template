import { useState, useRef, useCallback } from 'react';

// Small inline icon components — no external icon package needed.
function CpuIcon({ size = 20, color, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="15" x2="23" y2="15" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="15" x2="4" y2="15" />
    </svg>
  );
}

function HardDriveIcon({ size = 20, color, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <line x1="22" y1="12" x2="2" y2="12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      <line x1="6" y1="16" x2="6.01" y2="16" />
      <line x1="10" y1="16" x2="10.01" y2="16" />
    </svg>
  );
}

function ZapIcon({ size = 20, color, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function RotateCcwIcon({ size = 20, color, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  );
}

// --- Device profiles, sourced from the article's own numbers ---
// NOTE: NVMe's concurrency is deliberately kept below QUEUE_SIZE (16).
// It used to be set to 16 — exactly equal to the queue size — which meant
// the entire queue fired in a single batch and finished almost instantly.
// Visually that looked like the widget just "flashed" once with nothing
// to read. Dropping it to 8 keeps NVMe dramatically faster/wider than
// HDD and SATA while still showing a readable 2-batch progression.
const DEVICES = {
  hdd: {
    label: 'HDD', sub: '7,200 RPM', icon: HardDriveIcon, accent: '#FF0080',
    concurrency: 1, stepMs: 480,
    latency: '~6 ms', iops: '~150', throughput: '~150 MB/s',
    barPct: { speed: 12, latency: 95, iops: 4 },
    blurb: 'One request at a time — the arm has to physically seek before each read.',
    legend: 'One request serviced at a time (physical seek).',
  },
  sata: {
    label: 'SATA SSD', sub: 'AHCI · 1 queue × 32', icon: ZapIcon, accent: '#00FFFF',
    concurrency: 6, stepMs: 140,
    latency: '~100 µs', iops: '~50,000', throughput: '~550 MB/s',
    barPct: { speed: 55, latency: 15, iops: 45 },
    blurb: 'No seek time, but AHCI still caps the drive to a single command queue.',
    legend: 'No seek time, but capped to one AHCI queue, 32 commands deep.',
  },
  nvme: {
    label: 'NVMe SSD', sub: 'PCIe · 65,535 queues', icon: CpuIcon, accent: '#39FF14',
    concurrency: 8, stepMs: 70,
    latency: '~20 µs', iops: '1,000,000+', throughput: '~7,000 MB/s',
    barPct: { speed: 100, latency: 3, iops: 100 },
    blurb: 'Thousands of queues in flight at once — requests barely wait at all.',
    legend: 'Talks directly over PCIe with up to 65,535 parallel queues.',
  },
};

const ORDER = ['hdd', 'sata', 'nvme'];
const QUEUE_SIZE = 16;
const READY_MSG = 'Press "Send Requests" to send 16 read requests.';

function makeQueue() {
  return Array.from({ length: QUEUE_SIZE }, (_, i) => ({
    id: i,
    addr: '0x' + Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0').toUpperCase(),
    status: 'queued', // queued | active | done
  }));
}

export default function SSDSpeedChallenge() {
  const [deviceKey, setDeviceKey] = useState('nvme');
  const [queue, setQueue] = useState(makeQueue);
  const [running, setRunning] = useState(false);
  const [cycles, setCycles] = useState(0);
  // runStats: the human-readable readout — the actual "information" the
  // widget presents. Shows live batch progress while running, then a
  // final plain-English summary once the queue finishes.
  const [runStats, setRunStats] = useState(READY_MSG);
  const timers = useRef([]);

  const device = DEVICES[deviceKey];
  const Icon = device.icon;

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const selectDevice = (key) => {
    if (running) return;
    setDeviceKey(key);
    setQueue(makeQueue());
    setCycles(0);
    setRunStats(READY_MSG);
  };

  const reset = () => {
    clearTimers();
    setRunning(false);
    setDeviceKey('nvme');
    setQueue(makeQueue());
    setCycles(0);
    setRunStats(READY_MSG);
  };

  const runQueue = useCallback(() => {
    clearTimers();
    const fresh = makeQueue();
    setQueue(fresh);
    setRunning(true);
    setCycles(0);

    const { concurrency, stepMs } = DEVICES[deviceKey];
    const totalBatches = Math.ceil(QUEUE_SIZE / concurrency);
    let pending = fresh.map((r) => r.id);
    let batchIndex = 0;
    let elapsed = 0;
    const startTime = Date.now();

    setRunStats(`Round 1 of ${totalBatches} · 0ms elapsed`);

    const runBatch = () => {
      if (pending.length === 0) {
        setRunning(false);
        const total = Date.now() - startTime;
        setRunStats(
          `\u2713 All 16 requests done in ${total}ms, using ${totalBatches} round${totalBatches === 1 ? '' : 's'} of up to ${concurrency} at a time`
        );
        return;
      }
      const batch = pending.slice(0, concurrency);
      pending = pending.slice(concurrency);
      batchIndex += 1;
      setCycles(batchIndex);
      setRunStats(`Round ${batchIndex} of ${totalBatches} · ${elapsed}ms elapsed`);

      setQueue((prev) =>
        prev.map((r) => (batch.includes(r.id) ? { ...r, status: 'active' } : r))
      );

      const t1 = setTimeout(() => {
        setQueue((prev) =>
          prev.map((r) => (batch.includes(r.id) ? { ...r, status: 'done' } : r))
        );
        elapsed += stepMs + 90;
        const t2 = setTimeout(runBatch, 90);
        timers.current.push(t2);
      }, stepMs);
      timers.current.push(t1);
    };

    runBatch();
  }, [deviceKey]);

  // All layout below is plain inline styles — this project doesn't run
  // Tailwind (confirmed: none of these utility classes exist anywhere in
  // the deployed CSS), so no className here does anything useful except
  // "sim-wrap" / "btn" / "btn-outline" / "btn-sm", which ARE real classes
  // already defined site-wide and used by the other exhibits' simulators.

  return (
    <div
      className="sim-wrap"
      style={{ borderColor: device.accent, fontFamily: "'Space Mono', monospace" }}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '0.75rem',
          marginBottom: '1.25rem',
          borderBottom: `2px solid ${device.accent}`,
        }}
      >
        <span
          style={{
            fontSize: '0.85rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: device.accent,
          }}
        >
          SSD Speed Challenge
        </span>
        <button
          onClick={reset}
          className="btn btn-outline btn-sm"
          aria-label="Reset simulator to NVMe SSD"
          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <RotateCcwIcon size={12} /> Reset
        </button>
      </div>

      <p
        style={{
          fontSize: '0.76rem',
          color: 'rgba(170,170,204,0.75)',
          lineHeight: 1.6,
          margin: '0 0 1rem 0',
        }}
      >
        Each of the 16 squares below is one waiting read request. Pick a drive, send
        them all at once, and watch how many rounds it takes to clear the queue.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '140px 1fr',
          gap: '1.25rem',
        }}
      >
        {/* Device selector */}
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          role="group"
          aria-label="Storage device selector"
        >
          {ORDER.map((key) => {
            const d = DEVICES[key];
            const DIcon = d.icon;
            const selected = key === deviceKey;
            return (
              <button
                key={key}
                onClick={() => selectDevice(key)}
                disabled={running}
                aria-pressed={selected}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.35rem',
                  border: `1px solid ${selected ? d.accent : 'rgba(170,170,204,0.25)'}`,
                  borderRadius: '4px',
                  background: selected ? `${d.accent}1A` : 'transparent',
                  color: selected ? d.accent : '#888',
                  padding: '0.6rem 0.4rem',
                  cursor: running ? 'not-allowed' : 'pointer',
                  fontFamily: "'Space Mono', monospace",
                  transition: 'all 0.15s',
                }}
              >
                <DIcon size={16} color={selected ? d.accent : '#888'} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700 }}>{d.label}</span>
                <span style={{ fontSize: '0.6rem', color: 'rgba(170,170,204,0.5)' }}>{d.sub}</span>
              </button>
            );
          })}
        </div>

        {/* Main panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Data path: CPU <-> device */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(170,170,204,0.15)',
              borderRadius: '4px',
              padding: '0.9rem 1.1rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
              <div style={{ border: '1px solid rgba(170,170,204,0.4)', borderRadius: '4px', padding: '0.5rem' }}>
                <CpuIcon size={22} color="rgba(200,200,220,0.8)" />
              </div>
              <span style={{ fontSize: '0.6rem', color: 'rgba(170,170,204,0.5)', textTransform: 'uppercase' }}>CPU</span>
            </div>

            <div style={{ flex: 1, margin: '0 0.8rem', height: '1px', position: 'relative', background: `${device.accent}44` }}>
              {running && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    height: '7px',
                    width: '7px',
                    borderRadius: '50%',
                    background: device.accent,
                    left: `${(cycles * 37) % 90}%`,
                    transition: 'left 0.3s ease',
                    animation: 'ssdsim-pulse 0.9s ease-in-out infinite alternate',
                  }}
                />
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
              <div style={{ border: `1px solid ${device.accent}`, borderRadius: '4px', padding: '0.5rem' }}>
                <Icon size={22} color={device.accent} />
              </div>
              <span style={{ fontSize: '0.6rem', color: device.accent, textTransform: 'uppercase' }}>{device.label}</span>
            </div>
          </div>

          {/* Request queue visualization */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.62rem', color: 'rgba(170,170,204,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {QUEUE_SIZE} requests &mdash; {device.label} reads {device.concurrency === 1 ? '1 at a time' : `${device.concurrency} at a time`}
              </span>
              <button
                onClick={runQueue}
                disabled={running}
                className="btn btn-outline btn-sm"
                style={{ borderColor: device.accent, color: running ? '#666' : device.accent }}
              >
                {running ? 'Sending…' : 'Send Requests'}
              </button>
            </div>

            {/* Cell-state legend — spells out what the colors below mean,
                since that was previously only visible via an invisible
                hover tooltip. */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.62rem', color: 'rgba(170,170,204,0.6)', marginBottom: '0.6rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, display: 'inline-block', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(170,170,204,0.25)' }} />
                Waiting its turn
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, display: 'inline-block', background: 'rgba(255,255,255,0.9)' }} />
                Being read right now
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, display: 'inline-block', background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.4)' }} />
                Done
              </span>
            </div>

            <div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '0.35rem' }}
              role="img"
              aria-label={`${QUEUE_SIZE} pending read requests, ${device.concurrency === 1 ? 'serviced one at a time' : `serviced ${device.concurrency} at a time`}`}
            >
              {queue.map((r) => (
                <div
                  key={r.id}
                  style={{
                    aspectRatio: '1',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '8px',
                    transition: 'all 0.15s',
                    background:
                      r.status === 'done'
                        ? `${device.accent}33`
                        : r.status === 'active'
                        ? device.accent
                        : 'rgba(255,255,255,0.03)',
                    color: r.status === 'active' ? '#000' : '#555',
                    border: `1px solid ${r.status === 'queued' ? 'rgba(170,170,204,0.15)' : device.accent}`,
                  }}
                  title={r.addr}
                >
                  {r.status === 'active' ? '●' : ''}
                </div>
              ))}
            </div>

            {/* Live/final results readout — this is the "information" the
                widget presents, so it never just looks like an animation
                with nothing to read. */}
            <p
              aria-live="polite"
              style={{
                fontFamily: "'Orbitron', 'Space Mono', monospace",
                fontSize: '0.72rem',
                letterSpacing: '0.5px',
                color: '#aaaacc',
                minHeight: '1.2rem',
                margin: '0.5rem 0 0 0',
                padding: '0.4rem 0.6rem',
                background: 'rgba(255,255,255,0.03)',
                borderLeft: '2px solid #00FFFF',
              }}
            >
              {runStats}
            </p>
          </div>

          <p style={{ fontSize: '0.62rem', color: 'rgba(170,170,204,0.5)', letterSpacing: '0.5px', margin: '0.9rem 0 0.5rem 0' }}>
            These numbers summarize why, in three ways:
          </p>

          {/* Stats bars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem' }}>
            {[
              { label: 'Access Speed', pct: device.barPct.speed, value: device.throughput },
              { label: 'Latency', pct: device.barPct.latency, value: device.latency },
              { label: 'IOPS', pct: device.barPct.iops, value: device.iops },
            ].map((stat) => (
              <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                <div
                  style={{
                    width: '100%',
                    height: '70px',
                    background: 'rgba(255,255,255,0.03)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: `${Math.max(stat.pct, 4)}%`,
                      background: device.accent,
                      transition: 'height 0.5s ease-out',
                    }}
                  />
                </div>
                <span style={{ fontSize: '0.6rem', color: 'rgba(170,170,204,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {stat.label}
                </span>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: device.accent }}>{stat.value}</span>
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: '0.78rem',
              color: 'rgba(170,170,204,0.7)',
              lineHeight: 1.6,
              borderTop: '1px solid rgba(170,170,204,0.15)',
              paddingTop: '0.9rem',
              margin: 0,
            }}
          >
            {device.blurb}
          </p>

          {/* Legend: explains each interface's communication method */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid rgba(170,170,204,0.15)', paddingTop: '0.9rem' }}>
            {ORDER.map((key) => {
              const d = DEVICES[key];
              return (
                <div key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ marginTop: '3px', width: '8px', height: '8px', borderRadius: '2px', background: d.accent, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.68rem', color: 'rgba(170,170,204,0.6)', lineHeight: 1.5 }}>
                    <span style={{ fontWeight: 700, color: d.accent }}>{d.label}</span> — {d.legend}
                  </span>
                </div>
              );
            })}
          </div>

          <p style={{ fontSize: '0.62rem', color: 'rgba(170,170,204,0.35)', lineHeight: 1.5, margin: 0 }}>
            <span style={{ fontWeight: 700, color: 'rgba(170,170,204,0.5)' }}>Simplified model:</span> concurrency and
            per-request timing above are illustrative, scaled from each interface&rsquo;s real queue
            depth and typical latency — not a cycle-accurate simulation of controller firmware.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes ssdsim-pulse {
          from { opacity: 0.4; }
          to   { opacity: 1; }
        }
        @media (max-width: 640px) {
          .sim-wrap > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}