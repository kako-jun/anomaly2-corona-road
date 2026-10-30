'use strict';
/* ---- PLACEHOLDER DIALOGUE (sample only) ----
 * Temporary samples for a look-and-feel check. NOT the final script.
 * Setting: present day (Reiwa), a night shift in an old building.
 * who 'A' = the middle-aged woman, a veteran detective staking out in the guard room.
 *           She outranks him: phrased as requests ("...してもらえる?") but really orders. Casual, confident.
 * who 'M' = the young man, the building's security guard. Always polite, hesitant, goes along with her.
 *           (He knows the site better; that is a fact in the lines, not a change in rank.)
 * No names, ages or case details on purpose (only hints like "that matter").
 * A few lines faintly foreshadow a presence behind them (cold neck, a door closing, a half-finished "behind me...");
 * both brush it off.
 * The "who" field is not shown on screen; tone tells them apart.
 * Arc (kept subtle): unaware of each other -> his awkwardness -> she notices and gets awkward too.
 * Entries are shown one at a time, in order, as film-style subtitles.
 * hint: true = sample hint lines, shown in sequence (one at a time) after a false report. */
const DIALOGUE = [
  { who: 'A', text: '今夜もここ使わせてもらうわね。' },
  { who: 'M', text: 'はい。三時に巡回に出ます。' },
  { who: 'A', text: '換気効きすぎ? 首のうしろ寒いわ。' },
  { who: 'M', text: 'すみません。空調、見ておきます。' },
  { who: 'M', text: '3番の看板、いつもと違います。' },
  { who: 'A', text: 'メモしといてもらえる? 例の件。' },
  { who: 'M', text: 'あ、毛布……いえ、なんでも。' },
  { who: 'A', text: 'なによ、言いかけてやめて。' },
  { who: 'M', text: 'いま後ろ……いえ、なんでもないです。' },
  { who: 'A', text: '今ドア閉まった? 気のせいね。' },
  { who: 'A', text: '……あんた、顔赤くない?' },
  { who: 'M', text: 'い、いえ! 暖房のせいです。' },
  { hint: true, who: 'A', text: 'さっきの違うみたい。日誌は?' },
  { hint: true, who: 'M', text: '3番に看板はない、はずです。' },
  { hint: true, who: 'A', text: '映ってる物だけ見てない?' },
  { hint: true, who: 'M', text: 'カメラの向きも日誌にあります。' },
];
const NORMAL = DIALOGUE.filter(d => !d.hint);
const HINT_GROUPS = [];
DIALOGUE.filter(d => d.hint).forEach((d, i, arr) => { if (i % 2 === 0) HINT_GROUPS.push(arr.slice(i, i + 2).map(x => x.text)); });
let pending = []; // queued hint lines, shown before the normal sequence resumes
const CATEGORIES = ['CAMERA', 'OBJECT', 'ENVIRONMENT', 'PERSON', 'SURREAL'];

const $ = id => document.getElementById(id);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- Noise (low-res canvas, ~12fps, fresh random every frame) ---- */
(function noise() {
  const c = $('noise'), ctx = c.getContext('2d');
  c.width = 120; c.height = 160;
  const img = ctx.createImageData(c.width, c.height);
  function frame() {
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = Math.random() * 255 | 0;
      d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    // occasional faint horizontal tear band
    if (Math.random() < 0.08) {
      ctx.fillStyle = 'rgba(255,255,255,.35)';
      ctx.fillRect(0, Math.random() * c.height | 0, c.width, 1 + (Math.random() * 3 | 0));
    }
  }
  frame();
  if (!reduced) setInterval(frame, 1000 / 12);
})();

/* ---- Knobs ---- */
function makeKnob(el, onChange) {
  const MIN = -135, MAX = 135;
  let value = 50;
  function render() {
    const ang = MIN + (MAX - MIN) * value / 100;
    el.style.setProperty('--a', ang + 'deg');
    el.setAttribute('aria-valuenow', String(Math.round(value)));
    onChange(value);
  }
  // Slider-style: horizontal drag only. Right = clockwise = increase. Start point on the knob does not matter.
  const PX_FULL_RANGE = 180;
  let startX = 0, startValue = 0;
  el.addEventListener('pointerdown', e => {
    el.setPointerCapture(e.pointerId); startX = e.clientX; startValue = value; e.preventDefault();
  });
  el.addEventListener('pointermove', e => {
    if (!el.hasPointerCapture(e.pointerId)) return;
    value = Math.max(0, Math.min(100, startValue + (e.clientX - startX) / PX_FULL_RANGE * 100));
    render();
  });
  el.addEventListener('keydown', e => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') value = Math.min(100, value + step);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') value = Math.max(0, value - step);
    else if (e.key === 'Home') value = 0;
    else if (e.key === 'End') value = 100;
    else return;
    e.preventDefault(); render();
  });
  render();
}
const glass = $('glass');
makeKnob($('knobBri'), v => glass.style.setProperty('--bri', (0.55 + v / 100 * 0.9).toFixed(3)));
makeKnob($('knobCon'), v => glass.style.setProperty('--con', (0.6 + v / 100 * 0.9).toFixed(3)));

/* ---- Pressed look for keys (also for touch/keyboard) ---- */
function press(btn) { btn.classList.add('pressed'); setTimeout(() => btn.classList.remove('pressed'), 140); }

/* ---- Camera select ---- */
const camGrid = $('camGrid');
const camKeys = [];
for (let i = 1; i <= 8; i++) {
  const cell = document.createElement('div'); cell.className = 'cam-cell';
  const lamp = document.createElement('i'); lamp.className = 'lamp green';
  const b = document.createElement('button'); b.type = 'button'; b.className = 'key'; b.textContent = String(i);
  b.setAttribute('aria-label', 'Camera ' + i); b.setAttribute('aria-pressed', 'false');
  b.addEventListener('click', () => selectCam(i));
  cell.append(lamp, b); camGrid.append(cell); camKeys.push({ b, lamp });
}
function selectCam(n) {
  const src = `/public/images/cam${n}.webp`;
  $('picBase').src = src; $('picGlow').src = src; $('osdCam').textContent = 'CAM ' + n;
  camKeys.forEach((k, i) => {
    const on = i === n - 1;
    k.lamp.classList.toggle('on', on); k.b.classList.toggle('pressed', on); k.b.setAttribute('aria-pressed', String(on));
  });
}
selectCam(1);

/* ---- Report ---- */
const reportBtn = $('reportBtn'), cats = $('cats'), lamp = $('reportLamp'), fb = $('feedback');
let falseNext = false, reports = 0, strikes = 0, fbTimer = 0;
function setCats(open) {
  cats.hidden = !open; reportBtn.setAttribute('aria-expanded', String(open)); lamp.classList.toggle('lit', open);
  reportBtn.classList.toggle('pressed', open);
}
reportBtn.addEventListener('click', () => setCats(cats.hidden));
const catGrid = $('catGrid');
CATEGORIES.forEach(name => {
  const b = document.createElement('button'); b.type = 'button'; b.className = 'key'; b.textContent = name;
  b.addEventListener('click', () => { press(b); setCats(false); feedback(); });
  catGrid.append(b);
});
const cancel = document.createElement('button'); cancel.type = 'button'; cancel.className = 'key cancel'; cancel.textContent = 'CANCEL';
cancel.addEventListener('click', () => { press(cancel); setCats(false); });
catGrid.append(cancel);

function feedback() {
  const ok = !falseNext; falseNext = !falseNext;
  fb.textContent = ok ? 'CONFIRMED' : 'FALSE REPORT'; fb.classList.toggle('bad', !ok);
  if (ok) { reports = Math.min(4, reports + 1); $('reports').textContent = reports; }
  else {
    strikes = Math.min(3, strikes + 1);
    document.querySelectorAll('#strikes .lamp').forEach((l, i) => l.classList.toggle('on', i < strikes));
    $('strikes').setAttribute('aria-label', `Strikes ${strikes} of 3`);
    pending = HINT_GROUPS[hintIdx++ % HINT_GROUPS.length].slice();
    next();
  }
  clearTimeout(fbTimer);
  fbTimer = setTimeout(() => { fb.textContent = 'READY'; fb.classList.remove('bad'); }, 2400);
}

/* ---- Shift clock (dummy: 1 minute per 2 seconds) ---- */
let mins = 22 * 60;
setInterval(() => {
  mins = (mins + 1) % 1440;
  $('shiftTime').textContent = String(mins / 60 | 0).padStart(2, '0') + ':' + String(mins % 60).padStart(2, '0');
}, 2000);

/* ---- Subtitles (movie style, white text over the picture) ---- */
const sub = $('movieSub');
let idx = 0, hintIdx = 0, subTimer = 0;
function showLines(lines) {
  clearTimeout(subTimer);
  sub.classList.remove('show');
  const hold = Math.max(2200, 1600 + lines.join('').length * 120);
  setTimeout(() => {
    sub.textContent = '';
    lines.forEach(t => { const d = document.createElement('div'); d.textContent = t; sub.append(d); });
    sub.classList.add('show');
  }, 600);
  subTimer = setTimeout(next, hold + 600);
}
// One speaker at a time; queued hint lines go first.
function next() {
  const text = pending.length ? pending.shift() : NORMAL[idx++ % NORMAL.length].text;
  showLines([text]);
}
next();

/* ---- Wear A/B: ?wear=0 (clean) ... ?wear=1 (standard, default) sets the --wear CSS variable ---- */
(function () {
  const w = parseFloat(new URLSearchParams(location.search).get('wear'));
  if (!isNaN(w)) document.documentElement.style.setProperty('--wear', String(Math.max(0, Math.min(1, w))));
})();
