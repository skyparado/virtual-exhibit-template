(function () {

  const DATA_TYPES = {
    photos: {
      name: 'Photos', icon: '🖼️', sizeLabel: '5 MB – 50 GB', sizePct: 30,
      accessLabel: 'Frequent', accessPct: 70,
      retentionLabel: 'Medium-term', retentionPct: 45,
      securityLabel: 'Low', securityPct: 25,
    },
    videos: {
      name: 'Videos', icon: '🎬', sizeLabel: '1 GB – 5 TB', sizePct: 90,
      accessLabel: 'High', accessPct: 65,
      retentionLabel: 'Long-term', retentionPct: 70,
      securityLabel: 'Medium', securityPct: 40,
    },
    documents: {
      name: 'Documents', icon: '📄', sizeLabel: '1 KB – 10 MB', sizePct: 10,
      accessLabel: 'Very Frequent', accessPct: 85,
      retentionLabel: 'Ongoing', retentionPct: 55,
      securityLabel: 'High', securityPct: 80,
    },
    backups: {
      name: 'Backups', icon: '🗄️', sizeLabel: '10 GB – 10 TB', sizePct: 75,
      accessLabel: 'Rare', accessPct: 20,
      retentionLabel: 'Long-term', retentionPct: 80,
      securityLabel: 'High', securityPct: 85,
    },
    archives: {
      name: 'Archives', icon: '📦', sizeLabel: '100 GB – 100 TB+', sizePct: 100,
      accessLabel: 'Very Rare', accessPct: 10,
      retentionLabel: 'Permanent', retentionPct: 100,
      securityLabel: 'Very High', securityPct: 95,
    },
  };

  const TECHS = {
    ssd: {
      name: 'SSD Storage', icon: '💾',
      bullets: ['Very fast access', 'Limited capacity', 'Higher cost / GB'],
      bestFor: 'Best for: active files, apps, high-performance work',
      how: 'SSD storage keeps data on flash memory chips located inside the device itself. Because there is no physical read/write arm and no network hop involved, files load almost instantly.',
      ratings: { accessibility: 'medium', scalability: 'low', reliability: 'medium', cost: 'medium', security: 'medium' },
      stars: { speed: 5, capacity: 3, reliability: 4, accessibility: 3, cost: 3, longevity: 1 },
      journey: [
        { icon: '💻', label: 'Your Device' },
        { icon: '💾', label: 'Local SSD', sub: 'On-device flash memory' },
        { icon: '✅', label: 'Instantly Available' },
      ],
    },
    cloud: {
      name: 'Cloud Storage', icon: '☁️',
      bullets: ['Access anywhere', 'Highly scalable', 'Needs internet'],
      bestFor: 'Best for: personal files, sharing, collaboration',
      how: 'Cloud storage sends your data over the internet to a provider\u2019s remote servers. The provider automatically replicates it across multiple machines and, often, multiple locations so it stays available.',
      ratings: { accessibility: 'high', scalability: 'high', reliability: 'high', cost: 'good', security: 'good' },
      stars: { speed: 4, capacity: 5, reliability: 5, accessibility: 5, cost: 4, longevity: 3 },
      journey: [
        { icon: '💻', label: 'Your Device' },
        { icon: '🌐', label: 'Internet' },
        { icon: '☁️', label: 'Cloud Server', sub: 'Primary storage' },
        { icon: '🗄️', label: 'Backup Servers', sub: 'Multiple locations' },
        { icon: '🛡️', label: 'Data Protected', sub: 'Secure & redundant' },
      ],
    },
    distributed: {
      name: 'Distributed Storage', icon: '🕸️',
      bullets: ['Multiple nodes', 'High reliability', 'Massive scalability'],
      bestFor: 'Best for: enterprises, big data, streaming',
      how: 'Distributed storage splits your data into shards and/or replicated copies, then spreads those pieces across many independent servers and locations so no single failure can take it offline.',
      ratings: { accessibility: 'high', scalability: 'high', reliability: 'high', cost: 'medium', security: 'good' },
      stars: { speed: 4, capacity: 5, reliability: 5, accessibility: 4, cost: 3, longevity: 4 },
      journey: [
        { icon: '💻', label: 'Your Device' },
        { icon: '🌐', label: 'Internet' },
        { icon: '🔀', label: 'Shard / Replicate' },
        { icon: '🖥️', label: 'Node Cluster', sub: 'Many servers, many sites' },
        { icon: '🛡️', label: 'Fault-Tolerant' },
      ],
    },
    dna: {
      name: 'DNA Storage', icon: '🧬',
      bullets: ['Experimental tech', 'Ultra-high density', 'Very long lifespan'],
      bestFor: 'Best for: archives, long-term preservation',
      how: 'DNA storage encodes your data as sequences of the four DNA bases (A, T, C, G), synthesizes real DNA strands from that code, and preserves them in a sealed capsule until they need to be sequenced back into digital form.',
      ratings: { accessibility: 'low', scalability: 'high', reliability: 'medium', cost: 'low', security: 'good' },
      stars: { speed: 1, capacity: 5, reliability: 4, accessibility: 1, cost: 1, longevity: 5 },
      journey: [
        { icon: '💻', label: 'Digital Data' },
        { icon: '🧬', label: 'DNA Synthesis', sub: 'Encoded into A T C G' },
        { icon: '🧪', label: 'Sealed Capsule', sub: 'Long-term vault' },
        { icon: '🔬', label: 'Sequenced on Demand' },
      ],
    },
  };

  const SUITABILITY = {
    photos:    { ssd: 78, cloud: 90, distributed: 70, dna: 35 },
    videos:    { ssd: 62, cloud: 87, distributed: 82, dna: 40 },
    documents: { ssd: 92, cloud: 80, distributed: 58, dna: 30 },
    backups:   { ssd: 55, cloud: 85, distributed: 88, dna: 60 },
    archives:  { ssd: 38, cloud: 68, distributed: 76, dna: 95 },
  };

  const RATING_LABEL = { high: 'High', medium: 'Medium', good: 'Good', low: 'Low' };

  const SCAN_PHRASES = [
    'Reading data profile…',
    'Matching storage technology…',
    'Calculating compatibility…',
    'Finalizing results…',
  ];

  const SCAN_DURATION = 1000;

  let state = { dataType: 'photos', tech: 'cloud', running: false, revealed: false };
  let built = false;
  let scanTimer = null;
  let scanInterval = null;

  function stars(count) {
    let out = '<span class="sim-stars">';
    for (let i = 1; i <= 5; i++) {
      out += `<span class="${i <= count ? 'star-on' : ''}">★</span>`;
    }
    return out + '</span>';
  }

  function verdictFor(score) {
    if (score >= 85) return { text: 'Excellent Choice!', color: 'var(--accent-green)' };
    if (score >= 70) return { text: 'Good Choice', color: 'var(--accent-cyan)' };
    if (score >= 50) return { text: 'Workable — consider alternatives', color: '#ffd23f' };
    return { text: 'Not Recommended', color: 'var(--accent-magenta)' };
  }

  function buildModal() {
    const overlay = document.createElement('div');
    overlay.className = 'sim-overlay';
    overlay.id = 'simOverlay';

    const dtCards = Object.entries(DATA_TYPES).map(([key, d]) => `
      <div class="sim-datatype-card" data-datatype="${key}">
        <span class="dt-icon">${d.icon}</span>
        <div class="dt-name">${d.name}</div>
        <div class="dt-size">${d.sizeLabel}</div>
      </div>`).join('');

    const techCards = Object.entries(TECHS).map(([key, t]) => `
      <div class="sim-tech-card" data-tech="${key}">
        <span class="tc-icon">${t.icon}</span>
        <div class="tc-name">${t.name.toUpperCase()}</div>
        <ul class="tc-bullets">${t.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
        <div class="tc-bestfor">${t.bestFor}</div>
      </div>`).join('');

    const compareRows = Object.entries(TECHS).map(([key, t]) => `
      <tr data-techrow="${key}">
        <td>${t.icon} ${t.name}</td>
        <td>${stars(t.stars.speed)}</td>
        <td>${stars(t.stars.capacity)}</td>
        <td>${stars(t.stars.reliability)}</td>
        <td>${stars(t.stars.accessibility)}</td>
        <td>${stars(t.stars.cost)}</td>
        <td>${stars(t.stars.longevity)}</td>
      </tr>`).join('');

    overlay.innerHTML = `
      <div class="sim-modal" role="dialog" aria-modal="true" aria-label="Data Storage Destination Simulator">
        <div class="sim-modal-header">
          <div class="sim-modal-title"><span class="sim-modal-title-icon">📡</span> Data Storage Destination Simulator</div>
          <button class="sim-modal-close" id="simClose" aria-label="Close simulator">✕</button>
        </div>

        <div class="sim-modal-body">

          <section>
            <div class="sim-step">
              <span class="sim-step-num">1</span>
              <span class="sim-step-title">SELECT DATA TYPE</span>
              <span class="sim-step-sub">Choose the type of data you want to store</span>
            </div>
            <div class="sim-datatype-grid" id="simDataTypeGrid">${dtCards}</div>
          </section>

          <section>
            <div class="sim-step">
              <span class="sim-step-num">2</span>
              <span class="sim-step-title">DATA PROFILE</span>
              <span class="sim-step-sub">Understanding your data</span>
            </div>
            <div class="sim-profile-grid" id="simProfileGrid"></div>
          </section>

          <section>
            <div class="sim-step">
              <span class="sim-step-num">3</span>
              <span class="sim-step-title">CHOOSE STORAGE TECHNOLOGY</span>
              <span class="sim-step-sub">Select where you want to store your data</span>
            </div>
            <div class="sim-tech-grid" id="simTechGrid">${techCards}</div>
          </section>

          <section class="sim-run-section">
            <div class="sim-run-wrap" id="simRunWrap">
              <button class="sim-run-btn" id="simRunBtn">
                <span class="sim-run-btn-icon">▶</span>
                <span id="simRunBtnLabel">Run Simulation</span>
              </button>
              <p class="sim-run-hint" id="simRunHint">See where your data goes and how well it fits</p>
            </div>

            <div class="sim-loading" id="simLoading">
              <div class="sim-loading-ring"></div>
              <div class="sim-loading-text" id="simLoadingText">Reading data profile…</div>
              <div class="sim-loading-track"><div class="sim-loading-fill" id="simLoadingFill"></div></div>
            </div>
          </section>

          <div class="sim-result-wrap" id="simResultWrap">

            <section>
              <div class="sim-step">
                <span class="sim-step-num">4</span>
                <span class="sim-step-title">STORAGE JOURNEY</span>
                <span class="sim-step-sub">See where your data will go</span>
              </div>
              <div class="sim-journey-row" id="simJourneyRow"></div>
            </section>

            <section>
              <div class="sim-step">
                <span class="sim-step-num">5</span>
                <span class="sim-step-title">STORAGE STATS</span>
                <span class="sim-step-sub">Based on your selection</span>
              </div>
              <div class="sim-stats-wrap">
                <div class="sim-score-gauge">
                  <svg viewBox="0 0 130 130" width="130" height="130">
                    <circle class="ring-bg" cx="65" cy="65" r="55"></circle>
                    <circle class="ring-fill" id="simScoreRing" cx="65" cy="65" r="55"
                            stroke-dasharray="345.6" stroke-dashoffset="345.6"></circle>
                  </svg>
                  <div class="sim-score-center">
                    <div class="sim-score-num" id="simScoreNum">0%</div>
                    <div class="sim-score-caption">SUITABILITY<br>SCORE</div>
                  </div>
                </div>
                <div class="sim-stats-right">
                  <div class="sim-verdict" id="simVerdict"></div>
                  <ul class="sim-checklist" id="simChecklist"></ul>
                  <div class="sim-verdict-note" id="simVerdictNote"></div>
                </div>
              </div>
            </section>

            <section>
              <div class="sim-step">
                <span class="sim-step-num">6</span>
                <span class="sim-step-title">COMPARE TECHNOLOGIES</span>
                <span class="sim-step-sub">See how different storage options compare</span>
              </div>
              <table class="sim-compare-table" id="simCompareTable">
                <thead>
                  <tr><th></th><th>Speed</th><th>Capacity</th><th>Reliability</th><th>Accessibility</th><th>Cost</th><th>Longevity</th></tr>
                </thead>
                <tbody>${compareRows}</tbody>
              </table>
            </section>

          </div>

        </div>
      </div>`;

    document.body.appendChild(overlay);

    overlay.querySelectorAll('.sim-datatype-card').forEach(card => {
      card.addEventListener('click', () => {
        state.dataType = card.dataset.datatype;
        onSelectionChanged();
      });
    });

    overlay.querySelectorAll('.sim-tech-card').forEach(card => {
      card.addEventListener('click', () => {
        state.tech = card.dataset.tech;
        onSelectionChanged();
      });
    });

    overlay.querySelector('#simRunBtn').addEventListener('click', runSimulation);
    overlay.querySelector('#simClose').addEventListener('click', closeSim);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeSim(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeSim();
    });

    built = true;
  }

  function renderLive() {
    const dt = DATA_TYPES[state.dataType];
    const overlay = document.getElementById('simOverlay');

    overlay.querySelectorAll('.sim-datatype-card').forEach(c =>
      c.classList.toggle('is-selected', c.dataset.datatype === state.dataType));

    const profileGrid = document.getElementById('simProfileGrid');
    profileGrid.innerHTML = `
      <div class="sim-profile-row">
        <div class="pr-top"><span>📏 Size</span><span class="pr-value">${dt.sizeLabel}</span></div>
        <div class="pr-track"><div class="pr-fill" style="width:${dt.sizePct}%"></div></div>
      </div>
      <div class="sim-profile-row">
        <div class="pr-top"><span>⏱️ Access Frequency</span><span class="pr-value">${dt.accessLabel}</span></div>
        <div class="pr-track"><div class="pr-fill" style="width:${dt.accessPct}%"></div></div>
      </div>
      <div class="sim-profile-row">
        <div class="pr-top"><span>📅 Retention Period</span><span class="pr-value">${dt.retentionLabel}</span></div>
        <div class="pr-track"><div class="pr-fill" style="width:${dt.retentionPct}%"></div></div>
      </div>
      <div class="sim-profile-row">
        <div class="pr-top"><span>🛡️ Security Need</span><span class="pr-value">${dt.securityLabel}</span></div>
        <div class="pr-track"><div class="pr-fill" style="width:${dt.securityPct}%"></div></div>
      </div>`;

    overlay.querySelectorAll('.sim-tech-card').forEach(c =>
      c.classList.toggle('is-selected', c.dataset.tech === state.tech));
  }

  function renderResult() {
    const dt = DATA_TYPES[state.dataType];
    const tech = TECHS[state.tech];

    const journeyRow = document.getElementById('simJourneyRow');
    journeyRow.innerHTML = tech.journey.map((step, i) => `
      ${i > 0 ? '<span class="sim-journey-arrow">→</span>' : ''}
      <div class="sim-journey-step">
        <span class="js-icon">${step.icon}</span>
        <div class="js-label">${step.label}</div>
        ${step.sub ? `<div class="js-sub">${step.sub}</div>` : ''}
      </div>`).join('');

    const score = SUITABILITY[state.dataType][state.tech];
    const circumference = 345.6;
    const offset = circumference * (1 - score / 100);
    const ring = document.getElementById('simScoreRing');
    ring.style.strokeDashoffset = offset;
    ring.style.stroke = score >= 70 ? 'var(--accent-green)' : score >= 50 ? '#ffd23f' : 'var(--accent-magenta)';
    document.getElementById('simScoreNum').textContent = score + '%';

    const verdict = verdictFor(score);
    const verdictEl = document.getElementById('simVerdict');
    verdictEl.textContent = verdict.text;
    verdictEl.style.color = verdict.color;

    const checklist = document.getElementById('simChecklist');
    const ratingEntries = [
      ['Accessibility', tech.ratings.accessibility],
      ['Scalability', tech.ratings.scalability],
      ['Reliability', tech.ratings.reliability],
      ['Cost Efficiency', tech.ratings.cost],
      ['Security', tech.ratings.security],
    ];
    checklist.innerHTML = ratingEntries.map(([label, rating]) => `
      <li><span>${label}</span><span class="cl-tag tag-${rating}">${RATING_LABEL[rating]}</span></li>`).join('');

    document.getElementById('simVerdictNote').textContent =
      `${tech.name} for ${dt.name.toLowerCase()}: ${tech.how}`;

    document.querySelectorAll('#simCompareTable tr').forEach(row =>
      row.classList.toggle('is-current', row.dataset.techrow === state.tech));
  }

  function onSelectionChanged() {
    renderLive();
    if (state.running || state.revealed) resetToUnrun();
  }

  function resetToUnrun() {
    clearTimeout(scanTimer);
    clearInterval(scanInterval);
    state.running = false;
    state.revealed = false;

    const overlay = document.getElementById('simOverlay');
    overlay.querySelector('#simResultWrap').classList.remove('is-revealed');
    overlay.querySelector('#simLoading').classList.remove('is-active');
    overlay.querySelector('#simRunWrap').classList.remove('is-hidden');
    const btn = overlay.querySelector('#simRunBtn');
    btn.disabled = false;
    overlay.querySelector('#simRunBtnLabel').textContent = 'Run Simulation';
    overlay.querySelector('#simRunHint').textContent = 'See where your data goes and how well it fits';
  }

  function runSimulation() {
    if (state.running) return;
    const overlay = document.getElementById('simOverlay');
    state.running = true;
    state.revealed = false;

    overlay.querySelector('#simResultWrap').classList.remove('is-revealed');
    overlay.querySelector('#simRunWrap').classList.add('is-hidden');
    const loading = overlay.querySelector('#simLoading');
    const fill = overlay.querySelector('#simLoadingFill');
    const text = overlay.querySelector('#simLoadingText');

    loading.classList.add('is-active');
    fill.style.transition = 'none';
    fill.style.width = '0%';
    void fill.offsetWidth;
    fill.style.transition = `width ${SCAN_DURATION}ms linear`;
    requestAnimationFrame(() => { fill.style.width = '100%'; });

    let phraseIndex = 0;
    text.textContent = SCAN_PHRASES[0];
    scanInterval = setInterval(() => {
      phraseIndex = (phraseIndex + 1) % SCAN_PHRASES.length;
      text.textContent = SCAN_PHRASES[phraseIndex];
    }, SCAN_DURATION / SCAN_PHRASES.length);

    scanTimer = setTimeout(() => {
      clearInterval(scanInterval);
      loading.classList.remove('is-active');

      renderResult();
      const resultWrap = overlay.querySelector('#simResultWrap');
      resultWrap.classList.add('is-revealed');

      let hasScrolled = false;
      const scrollToResult = (e) => {
        if (e && e.propertyName !== 'max-height') return;
        if (hasScrolled) return;
        hasScrolled = true;
        resultWrap.removeEventListener('transitionend', scrollToResult);
        resultWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      resultWrap.addEventListener('transitionend', scrollToResult);
      setTimeout(scrollToResult, 700);

      overlay.querySelector('#simRunWrap').classList.remove('is-hidden');
      overlay.querySelector('#simRunBtnLabel').textContent = '↻ Re-run Simulation';
      overlay.querySelector('#simRunHint').textContent = 'Change a selection above to try a different combination';

      state.running = false;
      state.revealed = true;
    }, SCAN_DURATION);
  }

  function openSim() {
    if (!built) buildModal();
    renderLive();
    const overlay = document.getElementById('simOverlay');
    requestAnimationFrame(() => overlay.classList.add('is-open'));
    document.body.classList.add('sim-locked');
  }

  function closeSim() {
    const overlay = document.getElementById('simOverlay');
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.classList.remove('sim-locked');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const launchBtn = document.getElementById('simLaunchBtn');
    if (launchBtn) launchBtn.addEventListener('click', openSim);
  });

})();