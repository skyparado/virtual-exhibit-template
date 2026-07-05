/* ============================================================
   flash.js — TOC scroll-spy + SSD Speed Challenge simulator
   for exhibit-flash.html.
   Matches the pattern used by horizon.js: a dedicated per-page
   script loaded after main.js, flat at the top level (no IIFE
   needed — none of the names below collide with anything in
   main.js: navToggle, navLinks, currentPage, exhibits,
   carouselItems, currentIndex, carouselPrev, carouselNext,
   totalExhibits).
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
 * SSD Speed Challenge
 * --------------------------------------------------------------- */
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
    concurrency: 16, stepMs: 70,
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

const ssdEl = {
  path: document.getElementById('ssdsimPath'),
  reset: document.getElementById('simReset'),
  deviceList: document.getElementById('deviceList'),
  pathLine: document.getElementById('pathLine'),
  pathDot: document.getElementById('pathDot'),
  devIconBox: document.getElementById('devIconBox'),
  devIconLabel: document.getElementById('devIconLabel'),
  queueLabel: document.getElementById('queueLabel'),
  fireBtn: document.getElementById('fireBtn'),
  queueGrid: document.getElementById('queueGrid'),
  statsRow: document.getElementById('statsRow'),
  blurb: document.getElementById('blurb'),
  legendList: document.getElementById('legendList'),
};

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

  ssdEl.queueLabel.textContent = `Read Queue — ${
    d.concurrency === 1 ? 'sequential' : d.concurrency + '-wide parallel'
  }`;

  ssdEl.fireBtn.disabled = running;
  ssdEl.fireBtn.textContent = running ? 'Running…' : 'Fire Queue';
  ssdEl.fireBtn.style.borderColor = d.accent;
  ssdEl.fireBtn.style.color = running ? '#666' : d.accent;

  ssdEl.reset.style.borderColor = 'rgba(170,170,204,0.4)';

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
}

function resetSsd() {
  clearSsdTimers();
  running = false;
  deviceKey = 'nvme';
  queue = makeQueue();
  cycles = 0;
  renderAll();
}

function runQueue() {
  if (running) return;
  clearSsdTimers();
  queue = makeQueue();
  running = true;
  cycles = 0;
  renderAll();

  const d = DEVICES[deviceKey];
  let pending = queue.map((r) => r.id);

  function runBatch() {
    if (pending.length === 0) {
      running = false;
      renderChrome();
      return;
    }
    const batch = pending.slice(0, d.concurrency);
    pending = pending.slice(d.concurrency);
    cycles += 1;

    queue = queue.map((r) => (batch.includes(r.id) ? { ...r, status: 'active' } : r));
    renderQueue();
    ssdEl.pathDot.style.left = ((cycles * 37) % 90) + '%';

    const t1 = setTimeout(() => {
      queue = queue.map((r) => (batch.includes(r.id) ? { ...r, status: 'done' } : r));
      renderQueue();
      const t2 = setTimeout(runBatch, 90);
      timers.push(t2);
    }, d.stepMs);
    timers.push(t1);
  }

  runBatch();
}

// Only wire up the simulator if this page actually has it
// (mirrors horizon.js's `if (!container) return;` guard pattern).
if (ssdEl.deviceList) {
  ssdEl.reset.addEventListener('click', resetSsd);
  ssdEl.fireBtn.addEventListener('click', runQueue);

  queue = makeQueue();
  renderAll();
}