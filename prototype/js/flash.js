/* ============================================================
   flash.js — TOC scroll-spy, SSD Speed Challenge simulator, and
   scroll-triggered entrance animations for exhibit-flash.html.
   Matches the pattern used by horizon.js: a dedicated per-page
   script loaded after main.js, flat at the top level for the
   TOC/animation code — none of those names collide with
   anything in main.js (navToggle, navLinks, currentPage,
   exhibits, carouselItems, currentIndex, carouselPrev,
   carouselNext, totalExhibits).

   The SSD Speed Challenge itself is now wrapped in an IIFE and
   follows the horizon-simulator.js pattern: it builds a
   .sim-overlay modal lazily on first launch-button click, and
   does nothing until then (matching #simLaunchBtn -> openSim()).
   ============================================================ */

const tocObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('#tocList a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-20% 0px -70% 0px' });

document.querySelectorAll('section[id]').forEach(s => tocObserver.observe(s));

/* ---------------------------------------------------------------
 * SSD Speed Challenge (pop-up simulator)
 * --------------------------------------------------------------- */
(function () {

  const ICONS = {
    hdd: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></svg>',
    sata: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    nvme: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/></svg>',
  };

  const DEVICES = {
    hdd: {
      label: 'HDD', sub: '7,200 RPM', accent: '#FF0080',
      concurrency: 1, stepMs: 480,
      latency: '~6 ms', iops: '~150', throughput: '~150 MB/s',
      barPct: { speed: 12, latency: 95, iops: 4 },
      blurb: 'One request at a time — the arm has to physically seek before each read.',
      legend: 'One request serviced at a time (physical seek).',
    },
    sata: {
      label: 'SATA SSD', sub: 'AHCI · 1 queue × 32', accent: '#00FFFF',
      concurrency: 6, stepMs: 140,
      latency: '~100 µs', iops: '~50,000', throughput: '~550 MB/s',
      barPct: { speed: 55, latency: 15, iops: 45 },
      blurb: 'No seek time, but AHCI still caps the drive to a single command queue.',
      legend: 'No seek time, but capped to one AHCI queue, 32 commands deep.',
    },
    nvme: {
      label: 'NVMe SSD', sub: 'PCIe · 65,535 queues', accent: '#39FF14',
      concurrency: 8, stepMs: 70,
      latency: '~20 µs', iops: '1,000,000+', throughput: '~7,000 MB/s',
      barPct: { speed: 100, latency: 3, iops: 100 },
      blurb: 'Thousands of queues in flight at once — requests barely wait at all.',
      legend: 'Talks directly over PCIe with up to 65,535 parallel queues.',
    },
  };
  const ORDER = ['hdd', 'sata', 'nvme'];
  const QUEUE_SIZE = 16;

  let deviceKey = 'nvme';
  let running = false;
  let timers = [];
  let queue = [];
  let cycles = 0;
  let built = false;
  let ssdEl = {};

  function randomAddr() {
    const n = Math.floor(Math.random() * 0xffff);
    return '0x' + n.toString(16).padStart(4, '0').toUpperCase();
  }

  function makeQueue() {
    const q = [];
    for (let i = 0; i < QUEUE_SIZE; i++) {
      q.push({ id: i, addr: randomAddr(), status: 'queued' });
    }
    return q;
  }

  function clearSsdTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function buildModal() {
    const overlay = document.createElement('div');
    overlay.className = 'sim-overlay';
    overlay.id = 'ssdSimOverlay';

    overlay.innerHTML = `
      <div class="sim-modal" role="dialog" aria-modal="true" aria-label="SSD Speed Challenge">
        <div class="sim-modal-header">
          <div class="sim-modal-title"><span class="sim-modal-title-icon">⚡</span> SSD Speed Challenge</div>
          <button class="sim-modal-close" id="ssdSimClose" aria-label="Close simulator">✕</button>
        </div>

        <div class="sim-modal-body">
          <div class="ssdsim-body">
            <div class="ssdsim-devices" id="deviceList" role="group" aria-label="Storage device selector"></div>

            <div>
              <div class="ssdsim-path" id="ssdsimPath">
                <div class="ssdsim-path-node">
                  <div class="ssdsim-path-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(200,200,220,0.8)" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/></svg>
                  </div>
                  <span class="ssdsim-path-label">CPU</span>
                </div>
                <div class="ssdsim-path-line" id="pathLine">
                  <div class="ssdsim-path-dot" id="pathDot"></div>
                </div>
                <div class="ssdsim-path-node">
                  <div class="ssdsim-path-box" id="devIconBox"></div>
                  <span class="ssdsim-path-label" id="devIconLabel"></span>
                </div>
              </div>

              <div class="ssdsim-queue-head">
                <span class="ssdsim-queue-label" id="queueLabel">Read Queue</span>
                <button class="btn btn-primary btn-sm" id="fireBtn">Send Requests</button>
              </div>
              <div class="ssdsim-cell-legend">
                <span class="cell-legend-item"><span class="cell-swatch cell-waiting"></span> Waiting its turn</span>
                <span class="cell-legend-item"><span class="cell-swatch cell-reading"></span> Being read right now</span>
                <span class="cell-legend-item"><span class="cell-swatch cell-done"></span> Done</span>
              </div>
              <div class="ssdsim-queue-grid" id="queueGrid" role="img" aria-label="16 pending read requests"></div>
              <p class="ssdsim-runstats" id="runStats" aria-live="polite"></p>

              <p class="ssdsim-stats-caption">These numbers summarize why, in three ways:</p>
              <div class="ssdsim-stats" id="statsRow"></div>

              <p class="ssdsim-blurb" id="blurb"></p>

              <div class="ssdsim-legend" id="legendList"></div>

              <p class="ssdsim-caveat">
                <strong>Simplified model:</strong> concurrency and per-request timing above
                are illustrative, scaled from each interface's real queue depth and typical
                latency &mdash; not a cycle-accurate simulation of controller firmware.
              </p>
            </div>
          </div>
        </div>
      </div>`;

    document.body.appendChild(overlay);

    ssdEl = {
      path: overlay.querySelector('#ssdsimPath'),
      deviceList: overlay.querySelector('#deviceList'),
      pathLine: overlay.querySelector('#pathLine'),
      pathDot: overlay.querySelector('#pathDot'),
      devIconBox: overlay.querySelector('#devIconBox'),
      devIconLabel: overlay.querySelector('#devIconLabel'),
      queueLabel: overlay.querySelector('#queueLabel'),
      fireBtn: overlay.querySelector('#fireBtn'),
      queueGrid: overlay.querySelector('#queueGrid'),
      statsRow: overlay.querySelector('#statsRow'),
      blurb: overlay.querySelector('#blurb'),
      legendList: overlay.querySelector('#legendList'),
      runStats: overlay.querySelector('#runStats'),
    };

    ssdEl.fireBtn.addEventListener('click', runQueue);
    overlay.querySelector('#ssdSimClose').addEventListener('click', closeSim);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeSim(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeSim();
    });

    built = true;
  }

  function renderDeviceList() {
    ssdEl.deviceList.innerHTML = '';
    ORDER.forEach((key) => {
      const d = DEVICES[key];
      const selected = key === deviceKey;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ssdsim-device-btn' + (selected ? ' active' : '');
      btn.disabled = running;
      btn.setAttribute('aria-pressed', selected ? 'true' : 'false');
      btn.style.borderColor = selected ? d.accent : 'rgba(170,170,204,0.25)';
      btn.style.color = selected ? d.accent : '#888';
      btn.innerHTML = `<span>${ICONS[key]}</span><span class="dname">${d.label}</span><span class="dsub">${d.sub}</span>`;
      btn.addEventListener('click', () => selectDevice(key));
      ssdEl.deviceList.appendChild(btn);
    });
  }

  function renderQueue() {
    const d = DEVICES[deviceKey];
    ssdEl.queueGrid.setAttribute(
      'aria-label',
      `${QUEUE_SIZE} pending read requests, ${
        d.concurrency === 1 ? 'serviced one at a time' : `serviced ${d.concurrency} at a time`
      }`
    );
    ssdEl.queueGrid.innerHTML = '';
    queue.forEach((r) => {
      const cell = document.createElement('div');
      cell.className = 'ssdsim-queue-cell';
      cell.title = r.addr;
      if (r.status === 'done') {
        cell.style.background = d.accent + '33';
        cell.style.borderColor = d.accent;
      } else if (r.status === 'active') {
        cell.style.background = d.accent;
        cell.style.borderColor = d.accent;
        cell.style.color = '#000';
        cell.textContent = '●';
      } else {
        cell.style.background = '';
        cell.style.borderColor = '';
        cell.style.color = '';
      }
      ssdEl.queueGrid.appendChild(cell);
    });
  }

  function renderStats() {
    const d = DEVICES[deviceKey];
    const stats = [
      { label: 'Access Speed', pct: d.barPct.speed, value: d.throughput },
      { label: 'Latency', pct: d.barPct.latency, value: d.latency },
      { label: 'IOPS', pct: d.barPct.iops, value: d.iops },
    ];
    ssdEl.statsRow.innerHTML = '';
    stats.forEach((s) => {
      const wrap = document.createElement('div');
      wrap.className = 'ssdsim-stat';
      wrap.innerHTML = `
        <div class="ssdsim-stat-track"><div class="ssdsim-stat-fill" style="height:${Math.max(s.pct, 4)}%; background:${d.accent};"></div></div>
        <span class="ssdsim-stat-name">${s.label}</span>
        <span class="ssdsim-stat-value" style="color:${d.accent};">${s.value}</span>
      `;
      ssdEl.statsRow.appendChild(wrap);
    });
  }

  function renderLegend() {
    ssdEl.legendList.innerHTML = '';
    ORDER.forEach((key) => {
      const d = DEVICES[key];
      const item = document.createElement('div');
      item.className = 'ssdsim-legend-item';
      item.innerHTML = `
        <span class="ssdsim-legend-swatch" style="background:${d.accent};"></span>
        <span><span class="ssdsim-legend-name" style="color:${d.accent};">${d.label}</span> — ${d.legend}</span>
      `;
      ssdEl.legendList.appendChild(item);
    });
  }

  function renderChrome() {
    const d = DEVICES[deviceKey];

    ssdEl.devIconBox.style.borderColor = d.accent;
    ssdEl.devIconBox.style.color = d.accent;
    ssdEl.devIconBox.innerHTML = ICONS[deviceKey];
    ssdEl.devIconLabel.textContent = d.label;
    ssdEl.devIconLabel.style.color = d.accent;

    ssdEl.pathLine.style.background = d.accent + '44';
    ssdEl.pathDot.style.background = d.accent;
    ssdEl.pathDot.classList.toggle('on', running);
    ssdEl.pathDot.style.left = ((cycles * 37) % 90) + '%';

    ssdEl.queueLabel.textContent = `${QUEUE_SIZE} requests — ${d.label} reads ${
      d.concurrency === 1 ? '1 at a time' : d.concurrency + ' at a time'
    }`;

    ssdEl.fireBtn.disabled = running;
    ssdEl.fireBtn.textContent = running ? 'Sending…' : 'Send Requests';
    ssdEl.fireBtn.style.borderColor = d.accent;
    ssdEl.fireBtn.style.color = running ? '#666' : d.accent;

    ssdEl.blurb.textContent = d.blurb;
    ssdEl.path.classList.toggle('running', running);
  }

  function renderAll() {
    renderDeviceList();
    renderChrome();
    renderQueue();
    renderStats();
    renderLegend();
  }

  function selectDevice(key) {
    if (running) return;
    deviceKey = key;
    queue = makeQueue();
    cycles = 0;
    renderAll();
    if (ssdEl.runStats) {
      ssdEl.runStats.textContent = 'Press "Send Requests" to fire 16 read requests.';
    }
  }

  function runQueue() {
    if (running) return;
    clearSsdTimers();
    queue = makeQueue();
    running = true;
    cycles = 0;
    renderAll();

    const d = DEVICES[deviceKey];
    const totalBatches = Math.ceil(QUEUE_SIZE / d.concurrency);
    let pending = queue.map((r) => r.id);
    let elapsed = 0;
    const startTime = Date.now();

    if (ssdEl.runStats) {
      ssdEl.runStats.textContent = `Batch 1 of ${totalBatches} · 0ms elapsed`;
    }

    function runBatch() {
      if (pending.length === 0) {
        running = false;
        renderChrome();
        const total = Date.now() - startTime;
        if (ssdEl.runStats) {
          ssdEl.runStats.textContent = `\u2713 Completed in ${total}ms across ${totalBatches} batch${totalBatches === 1 ? '' : 'es'} of up to ${d.concurrency} request${d.concurrency === 1 ? '' : 's'} each`;
        }
        return;
      }
      const batch = pending.slice(0, d.concurrency);
      pending = pending.slice(d.concurrency);
      cycles += 1;

      if (ssdEl.runStats) {
        ssdEl.runStats.textContent = `Batch ${cycles} of ${totalBatches} · ${elapsed}ms elapsed`;
      }

      queue = queue.map((r) => (batch.includes(r.id) ? { ...r, status: 'active' } : r));
      renderQueue();
      ssdEl.pathDot.style.left = ((cycles * 37) % 90) + '%';

      const t1 = setTimeout(() => {
        queue = queue.map((r) => (batch.includes(r.id) ? { ...r, status: 'done' } : r));
        renderQueue();
        elapsed += d.stepMs + 90;
        const t2 = setTimeout(runBatch, 90);
        timers.push(t2);
      }, d.stepMs);
      timers.push(t1);
    }

    runBatch();
  }

  function openSim() {
    if (!built) buildModal();

    clearSsdTimers();
    running = false;
    deviceKey = 'nvme';
    queue = makeQueue();
    cycles = 0;
    renderAll();
    if (ssdEl.runStats) {
      ssdEl.runStats.textContent = 'Press "Send Requests" to fire 16 read requests.';
    }

    const overlay = document.getElementById('ssdSimOverlay');
    requestAnimationFrame(() => overlay.classList.add('is-open'));
    document.body.classList.add('sim-locked');
  }

  function closeSim() {
    clearSsdTimers();
    running = false;
    const overlay = document.getElementById('ssdSimOverlay');
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.classList.remove('sim-locked');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const launchBtn = document.getElementById('simLaunchBtn');
    if (launchBtn) launchBtn.addEventListener('click', openSim);
  });

})();

/* ---------------------------------------------------------------
 * Scroll-triggered entrance animations
 * (reading progress bar, content reveal-on-scroll, animated
 * chart bar-fills). Kept below the simulator code in this same
 * file per request, but every identifier here is deliberately
 * distinct from everything above (prefersReduced, progress*,
 * reveal*, BAR_WIDTH_BY_CLASS, barRows, barsByRow, barObserver)
 * so nothing here can shadow or collide with the simulator's
 * top-level declarations.
 * --------------------------------------------------------------- */

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- 3. Animated bar-fill charts ---- */
const BAR_WIDTH_BY_CLASS = {
  'tier-package': '100%',
  'tier-die': '58%',
  'tier-block': '22%',
  'tier-page': '9%',
  'tier-cell': '2%',
  'wear-slc': '100%',
  'wear-mlc': '74%',
  'wear-tlc': '66%',
  'wear-qlc': '46%',
  'iops-hdd': '15%',
  'iops-sata': '55%',
  'iops-nvme': '100%',
};

const barRows = Array.from(document.querySelectorAll('.nand-tier, .wear-row, .iops-row'));

const barsByRow = barRows
  .map((row) => {
    const bar = row.querySelector('.nand-tier-bar, .wear-fill, .iops-fill');
    if (!bar) return null;
    const key = Object.keys(BAR_WIDTH_BY_CLASS).find((k) => row.classList.contains(k));
    if (!key) return null;
    return { row, bar, target: BAR_WIDTH_BY_CLASS[key] };
  })
  .filter(Boolean);

if (!prefersReduced) {
  barsByRow.forEach(({ bar }) => {
    bar.style.width = '0';
  });

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const match = barsByRow.find((b) => b.row === entry.target);
        if (!match) return;
        const groupRows = Array.from(entry.target.parentElement.children);
        const idx = groupRows.indexOf(entry.target);
        match.bar.style.transitionDelay = idx * 90 + 'ms';
        match.bar.style.width = match.target;
        barObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );
  barRows.forEach((row) => barObserver.observe(row));
}