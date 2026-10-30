'use strict';
/* ---- PLACEHOLDER DIALOGUE (sample only) ----
 * These lines are temporary samples written for a look-and-feel check.
 * They are NOT final script. who: 'A' = partner, 'ME' = player.
 * kind 'hint' = sample hint line shown after a false report. */
const DIALOGUE = [
  { who: 'A',  text: 'おい、今日の弁当、何だった? 俺は唐揚げだ。' },
  { who: 'ME', text: '焼き鮭。冷めてるとあんまりうまくないな。' },
  { who: 'A',  text: '次の巡回、二時だっけ。三時だっけ。' },
  { who: 'ME', text: '二時。さっき日誌に書いたろ。' },
  { who: 'A',  text: 'この前の雨、地下まで湿気がすごかったよな。' },
  { who: 'A',  text: 'なあ、さっきの3番、看板あったっけ。' },
  { who: 'ME', text: '……なんか変だぞ。今、誰か映らなかったか。' },
  { who: 'A',  text: 'ストーブ点けるか。足元だけ寒いんだよ。' },
  { who: 'ME', text: '五番の蛍光灯、前からあんなに暗かったか?' },
  { hint: true, who: 'A', text: '今のは違うな。もっと、床の近くを見てみろ。' },
  { hint: true, who: 'A', text: '映ってる物じゃない。カメラのほうがおかしくないか?' },
];
const NORMAL = DIALOGUE.filter(d => !d.hint);
const HINTS = DIALOGUE.filter(d => d.hint);
const WHO_LABEL = { A: 'PARTNER', ME: 'YOU' };
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
    showLine(HINTS[hintIdx++ % HINTS.length], 6000);
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

/* ---- Subtitles ---- */
const subLine = $('subLine'), subWho = $('subWho'), subWin = subLine.parentElement;
let idx = 0, hintIdx = 0, subTimer = 0;
function showLine(d, hold) {
  clearTimeout(subTimer);
  subLine.classList.add('fade');
  setTimeout(() => {
    subWho.textContent = WHO_LABEL[d.who]; subLine.textContent = d.text; subWin.classList.toggle('hint', !!d.hint);
    subLine.classList.remove('fade');
  }, 250);
  subTimer = setTimeout(next, hold || 5000);
}
function next() { showLine(NORMAL[idx++ % NORMAL.length]); }
subWho.textContent = WHO_LABEL[NORMAL[0].who]; subLine.textContent = NORMAL[0].text; idx = 1;
subTimer = setTimeout(next, 5000);
