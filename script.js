/* ============ PERSONALIZE HERE ============ */
const CONFIG = {
  name: "Chaitanya Sister",
  from: "Your brother, Mohammad",
  heroLine: "May this year be gentle, bright, and full of everything you love. ✨",
  footer: "You are loved, always.",
  // Optional: put an mp3 next to index.html and set e.g. "song.mp3". Leave "" to use the built-in birthday tune.
  musicFile: "song.mp3",
  wishes: [
    ["🌸","May your day bloom with joy."],
    ["✨","May every wish you make come true."],
    ["💖","You deserve all the love in the world."],
    ["🌈","May this year paint your life in happy colors."],
    ["🦋","May you always feel light and free."],
    ["☀️","Stay as bright as you are, Chaitanya Sister."],
    ["🍰","Wishing you sweet days and sweeter moments."],
    ["🌙","May your nights be peaceful and your dreams brave."],
    ["💫","Your smile makes everything better."],
    ["🎈","May laughter follow you everywhere."],
    ["🌷","Grow, glow, and never doubt yourself."],
    ["👑","You are strong, kind, and wonderful."]
  ],
  letter: [
    "Dear Chaitanya Sister,",
    "Happy birthday, my dear sister. I wanted to make something that does what words alone never quite manage: tell you how much you mean to me.",
    "Thank you for being the person you are. Your kindness, your laughter, and the way you care about the people around you make our family brighter.",
    "I may not say it often enough, but I am proud of you. Whatever you dream of, whatever you choose, I will be right behind you, cheering the loudest.",
    "On the hard days, call me. On the happy days, call me too. I am always on your side, now and forever.",
    "I love you more than this little website can show. Have the most beautiful birthday."
  ],
  surprises: [
    "You are my favorite sister. (Don't tell anyone else.) 💖",
    "Coupon: one free favorite snack, redeemable anytime. 🍫",
    "You are braver than you think, Chaitanya Sister. 🌟",
    "Reminder: you are loved, and I am so proud of you. 🥹",
    "Today the whole day is yours. Be the princess. 👑",
    "Coupon: one big hug, delivered on demand. 🤗",
    "Fun fact: the world is a better place with you in it. 🌍"
  ]
};
/* ============ END PERSONALIZE ============ */

const $ = s => document.querySelector(s);
const esc = t => t.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

// fill content
$('#heroTitle').textContent = 'Happy Birthday, ' + CONFIG.name + '!';
$('#heroLine').textContent = CONFIG.heroLine;
$('#footLine').textContent = CONFIG.footer;
$('#wishGrid').innerHTML = CONFIG.wishes.map(w => `<div class="wish"><b>${w[0]}</b>${esc(w[1])}</div>`).join('');
$('#letterBox').innerHTML = CONFIG.letter.map((p,i) => `<p class="${i?'':'to script'}">${esc(p)}</p>`).join('') + `<p class="sign script">${esc(CONFIG.from)}</p>`;
if ($('#photoGrid') && CONFIG.photos) {
  $('#photoGrid').innerHTML = CONFIG.photos.map((p,i) => `<figure class="ph"><div class="img"><img src="${p.src}" alt="${esc(p.caption)}"></div><p contenteditable="true" spellcheck="false">${esc(p.caption)}</p></figure>`).join('');
}
if ($('#memList') && CONFIG.memories) {
  $('#memList').innerHTML = CONFIG.memories.map(m => `<div class="mem"><h3>${esc(m.title)}</h3><p>${esc(m.text)}</p></div>`).join('');
}

// reveal wishes on scroll
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold:.2});
document.querySelectorAll('.wish').forEach((w,i) => { w.style.transitionDelay = (i%3)*120 + 'ms'; io.observe(w); });

// floating hearts
const HEARTS = ['💖','💗','💕','🌸','✨','💜','⭐'];
function heart() {
  if (reduce || document.hidden) return;
  const h = document.createElement('div');
  h.className = 'heart';
  h.textContent = HEARTS[Math.random()*HEARTS.length|0];
  h.style.left = Math.random()*100 + 'vw';
  h.style.fontSize = (14 + Math.random()*22) + 'px';
  h.style.opacity = .35 + Math.random()*.5;
  h.style.setProperty('--dx', (Math.random()*120-60) + 'px');
  h.style.setProperty('--r', (Math.random()*60-30) + 'deg');
  h.style.animationDuration = (7 + Math.random()*7) + 's';
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 15000);
}
setInterval(heart, 700);

// sparkles on tap/move
function spark(x, y) {
  if (reduce) return;
  const s = document.createElement('div');
  s.className = 'spark';
  s.textContent = ['✨','⭐','💫','💖'][Math.random()*4|0];
  s.style.left = x + 'px'; s.style.top = y + 'px';
  s.style.setProperty('--dx', (Math.random()*80-40) + 'px');
  s.style.setProperty('--dy', (Math.random()*80-40) + 'px');
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 800);
}
let last = 0;
addEventListener('pointermove', e => { const n = Date.now(); if (n - last > 90) { last = n; spark(e.clientX, e.clientY); } });
addEventListener('pointerdown', e => { for (let i = 0; i < 5; i++) spark(e.clientX, e.clientY); });

// confetti
const cv = $('#confetti'), cx = cv.getContext('2d');
let parts = [], running = false;
function size() { cv.width = innerWidth; cv.height = innerHeight; }
size(); addEventListener('resize', size);
const COLORS = ['#ff9ec9','#b79cf0','#f6c85f','#ffd6e8','#e4d6ff','#fff3a8'];
function confetti(n = 160, x = innerWidth/2, y = innerHeight/3) {
  if (reduce) n = 40;
  for (let i = 0; i < n; i++) parts.push({x, y, vx:(Math.random()-.5)*14, vy:Math.random()*-12-3, g:.28, w:6+Math.random()*7, h:4+Math.random()*6,
    r:Math.random()*6, vr:(Math.random()-.5)*.3, c:COLORS[Math.random()*COLORS.length|0], life:140+Math.random()*80});
  if (!running) { running = true; requestAnimationFrame(tick); }
}
function tick() {
  cx.clearRect(0, 0, cv.width, cv.height);
  parts = parts.filter(p => p.life-- > 0 && p.y < cv.height + 20);
  parts.forEach(p => {
    p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.r += p.vr;
    cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.fillStyle = p.c; cx.globalAlpha = Math.min(1, p.life/40);
    cx.fillRect(-p.w/2, -p.h/2, p.w, p.h); cx.restore();
  });
  if (parts.length) requestAnimationFrame(tick); else running = false;
}
function burst(n) { confetti(n, innerWidth*.2, innerHeight*.5); confetti(n, innerWidth*.8, innerHeight*.5); confetti(n, innerWidth*.5, innerHeight*.25); }

// music: mp3 file with soft synthesized birthday tune as reliable fallback
let audioEl = $('#bgMusic');
let actx = null, playing = false, timer = null, step = 0;
const N = {C4:262,D4:294,E4:330,F4:349,G4:392,A4:440,B4:494,C5:523,D5:587,E5:659,F5:698,G5:784};
const TUNE = [['G4',.75],['G4',.25],['A4',1],['G4',1],['C5',1],['B4',2],['G4',.75],['G4',.25],['A4',1],['G4',1],['D5',1],['C5',2],
  ['G4',.75],['G4',.25],['G5',1],['E5',1],['C5',1],['B4',1],['A4',2],['F5',.75],['F5',.25],['E5',1],['C5',1],['D5',1],['C5',2.5]];

function note(f, d) {
  const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime;
  o.type = 'triangle'; o.frequency.value = f;
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.16, t + .03); g.gain.exponentialRampToValueAtTime(.001, t + d);
  o.connect(g).connect(actx.destination); o.start(t); o.stop(t + d + .05);
}

function next() {
  if (!playing) return;
  const [n, b] = TUNE[step % TUNE.length], d = b * .42;
  note(N[n], d * 1.6);
  step++;
  timer = setTimeout(next, d * 1000 + (step % TUNE.length === 0 ? 1500 : 0));
}

function startSynth() {
  actx = actx || new (window.AudioContext || window.webkitAudioContext)();
  if (actx.state === 'suspended') actx.resume();
  next();
}

function startMusic() {
  playing = true;
  $('#music').classList.add('on');
  $('#music').textContent = '⏸️';

  if (!audioEl) audioEl = $('#bgMusic');

  if (CONFIG.musicFile && audioEl) {
    audioEl.volume = 0.6;
    const playPromise = audioEl.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn('Audio play prevented or failed, fallback to synth:', err);
        startSynth();
      });
    }
  } else {
    startSynth();
  }
}

function stopMusic() {
  playing = false;
  clearTimeout(timer);
  $('#music').classList.remove('on');
  $('#music').textContent = '🎵';
  if (audioEl) audioEl.pause();
}

$('#music').onclick = () => playing ? stopMusic() : startMusic();

// open
$('#openBtn').onclick = () => {
  $('#welcome').classList.add('gone');
  document.body.classList.remove('locked');
  burst(130);
  startMusic();
  for (let i = 0; i < 14; i++) setTimeout(heart, i * 80);
};

// cake
const candles = [...document.querySelectorAll('.candle')];
const cakeMsg = $('#cakeMsg');
function checkCake() {
  const lit = candles.filter(c => !c.classList.contains('out')).length;
  if (lit === 0) { cakeMsg.textContent = 'Your wish is on its way, ' + CONFIG.name + '! 🌟'; burst(180); }
  else cakeMsg.textContent = lit + (lit === 1 ? ' candle' : ' candles') + ' still glowing…';
}
candles.forEach(c => c.onclick = () => { c.classList.add('out'); checkCake(); });
$('#blowBtn').onclick = () => {
  candles.forEach((c,i) => setTimeout(() => { c.classList.add('out'); if (i === candles.length-1) checkCake(); }, i*250));
};
$('#relightBtn').onclick = () => { candles.forEach(c => c.classList.remove('out')); cakeMsg.textContent = 'Make another wish… 💫'; };

// surprise gift
let si = 0;
$('#giftBox').onclick = e => {
  const t = $('#surpriseText');
  t.textContent = CONFIG.surprises[si++ % CONFIG.surprises.length];
  const r = e.currentTarget.getBoundingClientRect();
  confetti(70, r.left + r.width/2, r.top);
  for (let i = 0; i < 8; i++) heart();
};
$('#againBtn').onclick = () => { burst(200); scrollTo({top:0}); };
