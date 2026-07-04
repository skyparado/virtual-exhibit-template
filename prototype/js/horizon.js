/* ============================================================
   horizon.js — lightweight step-cycling animations for
   exhibit-horizon.html (data-access flow + DNA encoding process)
   Uses IntersectionObserver so loops only run once a diagram is
   actually on screen (kinder to battery/CPU).
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

function cycleSteps(containerSelector, stepSelector, connectorSelector, interval) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const steps = Array.from(container.querySelectorAll(stepSelector));
  const connectors = connectorSelector ? Array.from(container.querySelectorAll(connectorSelector)) : [];
  if (!steps.length) return;

  let i = 0;
  let timer = null;

  function tick() {
    steps.forEach(s => s.classList.remove('is-active'));
    connectors.forEach(c => c.classList.remove('is-active'));

    steps[i].classList.add('is-active');
    if (connectors[i - 1]) connectors[i - 1].classList.add('is-active');

    i = (i + 1) % steps.length;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !timer) {
        tick();
        timer = setInterval(tick, interval);
      } else if (!entry.isIntersecting && timer) {
        clearInterval(timer);
        timer = null;
        steps.forEach(s => s.classList.remove('is-active'));
        connectors.forEach(c => c.classList.remove('is-active'));
        i = 0;
      }
    });
  }, { threshold: 0.35 });

  observer.observe(container);
}

document.addEventListener('DOMContentLoaded', () => {
  cycleSteps('#dataFlowDiagram', '.flow-step', '.flow-connector', 1100);
  cycleSteps('#dnaProcessDiagram', '.dna-step', null, 1000);
});
