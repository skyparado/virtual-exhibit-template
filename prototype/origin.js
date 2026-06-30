function createSlideshow(imgId, images) {
  const img = document.getElementById(imgId);
  let current = 0;

  setInterval(() => {
    img.style.opacity = "0";
    setTimeout(() => {
      current = (current + 1) % images.length;
      img.src = images[current];
      img.style.opacity = "1";
    }, 200);
  }, 1500);
}

// ===== Text-to-Punch Card Simulator (typewriter-driven) =====
(function () {
  const canvas = document.getElementById('punchCanvas');
  if (!canvas) return; // section not on page, skip
  const ctx = canvas.getContext('2d');

  const DPR = window.devicePixelRatio || 1;
  const W_CSS = 900, H_CSS = 220;
  canvas.width = W_CSS * DPR;
  canvas.height = H_CSS * DPR;
  canvas.style.width = W_CSS + 'px';
  canvas.style.height = H_CSS + 'px';
  ctx.scale(DPR, DPR);

  const MAX_COLS = 40;
  const ROW_LABELS = ['12', '11', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const TOP_MARGIN = 26;
  const LEFT_MARGIN = 36;
  const ROW_GAP = 15;
  const COL_GAP = (W_CSS - LEFT_MARGIN - 20) / MAX_COLS;

  let buffer = '';
  let shiftLock = false;
  let shiftHeld = false;

  // Hollerith code: returns array of row indices (0-11, matching ROW_LABELS) to punch
  function charToRows(ch) {
    const c = ch.toUpperCase();
    if (c === ' ') return [];

    if (c >= '0' && c <= '9') {
      const d = parseInt(c, 10);
      return [2 + d];
    }

    if (c >= 'A' && c <= 'Z') {
      const code = c.charCodeAt(0) - 65;
      if (code <= 8) {
        const digit = code + 1;
        return [0, 2 + digit];
      } else if (code <= 17) {
        const digit = code - 9 + 1;
        return [1, 2 + digit];
      } else {
        const digit = code - 18 + 2;
        return [2, 2 + digit];
      }
    }

    return []; // punctuation left unpunched
  }

  function drawCard(text) {
    ctx.clearRect(0, 0, W_CSS, H_CSS);

    ctx.fillStyle = '#e8dfc0';
    ctx.fillRect(0, 0, W_CSS, H_CSS);

    ctx.font = '9px "Space Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#665f45';
    ROW_LABELS.forEach((label, r) => {
      const y = TOP_MARGIN + r * ROW_GAP;
      ctx.fillText(label, LEFT_MARGIN - 8, y + 3);
    });

    const chars = text.slice(0, MAX_COLS).split('');

    for (let col = 0; col < MAX_COLS; col++) {
      const x = LEFT_MARGIN + col * COL_GAP + COL_GAP / 2;

      if ((col + 1) % 5 === 0 || col === 0) {
        ctx.font = '7px "Space Mono", monospace';
        ctx.fillStyle = '#9c916c';
        ctx.textAlign = 'center';
        ctx.fillText(String(col + 1), x, H_CSS - 5);
      }

      const punched = chars[col] ? charToRows(chars[col]) : [];

      for (let r = 0; r < ROW_LABELS.length; r++) {
        const y = TOP_MARGIN + r * ROW_GAP;
        const isPunched = punched.includes(r);

        ctx.beginPath();
        ctx.rect(x - 3, y - 4.5, 6, 9);

        if (isPunched) {
          ctx.fillStyle = '#111128';
          ctx.fill();
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        } else {
          ctx.fillStyle = 'rgba(58,53,32,0.12)';
          ctx.fill();
        }
      }

      if (chars[col]) {
        ctx.font = 'bold 10px "Space Mono", monospace';
        ctx.fillStyle = '#3a3520';
        ctx.textAlign = 'center';
        ctx.fillText(chars[col].toUpperCase(), x, TOP_MARGIN - 12);
      }
    }

    // blinking cursor on next free column
    const cursorCol = chars.length;
    if (cursorCol < MAX_COLS) {
      const x = LEFT_MARGIN + cursorCol * COL_GAP + COL_GAP / 2;
      ctx.strokeStyle = 'rgba(0,180,0,0.6)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, TOP_MARGIN - 16);
      ctx.lineTo(x, TOP_MARGIN + (ROW_LABELS.length - 1) * ROW_GAP + 6);
      ctx.stroke();
    }

    ctx.strokeStyle = '#9c916c';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(2, 2, W_CSS - 4, H_CSS - 4);
  }

  function updateOutput() {
    const outEl = document.getElementById('punchOutput');
    if (!buffer.trim()) {
      outEl.textContent = '';
      return;
    }
    const shown = buffer.slice(0, MAX_COLS);
    const punched = shown.split('').filter(ch => charToRows(ch).length > 0).length;
    const skipped = shown.length - punched;
    outEl.textContent = `Column ${Math.min(buffer.length, MAX_COLS)} of ${MAX_COLS} — "${shown}" (${punched} punched, ${skipped} skipped)`;
  }

  function refresh() {
    drawCard(buffer);
    updateOutput();
  }

  // ---- Keyboard wiring ----
  const keys = document.querySelectorAll('.tw-key[data-char], .tw-spacebar[data-char]');
  const actionKeys = document.querySelectorAll('.tw-key[data-action]');
  const shiftLockKey = document.getElementById('shiftLockKey');
  const shiftKeys = [document.getElementById('shiftKeyLeft'), document.getElementById('shiftKeyRight')];

  function isShiftActive() {
    return shiftLock || shiftHeld;
  }

  function updateShiftVisuals() {
    if (shiftLockKey) shiftLockKey.classList.toggle('tw-active', shiftLock);
    shiftKeys.forEach(k => k && k.classList.toggle('tw-active', shiftHeld));
  }

  keys.forEach(key => {
    key.addEventListener('click', () => {
      const baseChar = key.getAttribute('data-char');
      const shiftChar = key.getAttribute('data-shift');
      let charToAdd = baseChar;

      if (isShiftActive()) {
        if (shiftChar) {
          charToAdd = shiftChar;
        } else if (/[a-z]/.test(baseChar)) {
          charToAdd = baseChar.toUpperCase();
        }
      }

      if (buffer.length < MAX_COLS) {
        buffer += charToAdd;
        refresh();
      }

      key.classList.add('tw-pressed');
      setTimeout(() => key.classList.remove('tw-pressed'), 100);

      // momentary shift releases after one keystroke (like a real shift key)
      if (shiftHeld && !shiftLock) {
        shiftHeld = false;
        updateShiftVisuals();
      }
    });
  });

  actionKeys.forEach(key => {
    const action = key.getAttribute('data-action');
    key.addEventListener('click', () => {
      if (action === 'backspace') {
        buffer = buffer.slice(0, -1);
        refresh();
      } else if (action === 'shiftlock') {
        shiftLock = !shiftLock;
        shiftHeld = false;
        updateShiftVisuals();
      } else if (action === 'shift') {
        shiftHeld = !shiftHeld;
        updateShiftVisuals();
      }

      key.classList.add('tw-pressed');
      setTimeout(() => key.classList.remove('tw-pressed'), 100);
    });
  });

  // Init
  drawCard('');
})();