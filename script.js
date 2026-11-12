const CARS = [
  { src: "assets/car-1.webp", bg: "#1D5FD1", name: "SPARQ Aero", type: "Sedan", bio: "The daily driver. Silent, smooth, and 520 km on a single charge.", range: 520, zeroToHundred: 4.8, pricePKR: 12500000 },
  { src: "assets/car-2.webp", bg: "#0B7448", name: "SPARQ Terra", type: "SUV", bio: "Built for Karachi roads and weekend trips north. Room for everyone.", range: 480, zeroToHundred: 5.6, pricePKR: 14800000 },
  { src: "assets/car-3.webp", bg: "#C62F3B", name: "SPARQ Pulse", type: "Hatchback", bio: "City-sized, lightning-quick. Parks anywhere, charges anywhere.", range: 390, zeroToHundred: 3.9, pricePKR: 9200000 },
  { src: "assets/car-4.webp", bg: "#6B46D9", name: "SPARQ Apex", type: "Hypercar", bio: "Zero to 100 in 2.4 seconds. The reason the brand exists.", range: 410, zeroToHundred: 2.4, pricePKR: 42500000 },
  { src: "assets/car-5.webp", bg: "#9B2335", name: "SPARQ Rosso", type: "Supercar", bio: "A pulse-raising silhouette. Every curve, an invitation to go further.", range: 450, zeroToHundred: 2.8, pricePKR: 36000000 },
  { src: "assets/car-6.webp", bg: "#344656", name: "SPARQ Prisma", type: "Sport sedan", bio: "Precision in every line. Intelligence in every instinct.", range: 560, zeroToHundred: 4.2, pricePKR: 18200000 },
  { src: "assets/car-7.webp", bg: "#66503A", name: "SPARQ Classica GT", type: "Grand tourer", bio: "Timeless curves. Effortless miles. Take the long way home.", range: 590, zeroToHundred: 3.6, pricePKR: 28500000 }
];
// All values are fictional concept data. Original four model specifications are preserved.
CARS.forEach((car, i) => { car.topSpeed = [220, 200, 190, 320, 310, 250, 280][i]; car.chargeTime = [30, 32, 25, 22, 24, 28, 30][i]; });
// Longer fictional descriptions shown when a collection card is opened.
const DESCRIPTIONS = [
  { desc: "A calm, aerodynamic executive sedan built for long motorway miles and quiet city commutes. A low roofline and slim lamps cut drag, so 520 km feels effortless.", bestFor: "Daily commutes · Executive travel" },
  { desc: "A family SUV with an athletic stance and a cabin that gives everyone room to breathe. Tuned for Karachi's roads and weekend runs up north, with a calm, confident ride.", bestFor: "Families · Weekend road trips" },
  { desc: "A compact hatchback with big personality. Short overhangs make it easy to park anywhere, and instant electric torque turns every green light into a small thrill.", bestFor: "City driving · Your first EV" },
  { desc: "The reason the brand exists. A low, wide hypercar shaped by airflow, launching from zero to 100 km/h in 2.4 seconds with a silhouette that stops traffic.", bestFor: "Track days · Collectors" },
  { desc: "A scarlet wedge of a supercar with sharp lamps and a low, wide stance. Built to feel dramatic at a standstill and unmistakable at speed.", bestFor: "Weekend drives · Making a statement" },
  { desc: "A precise sport sedan drawn with faceted lines and a segmented LED signature. Sharp, composed handling without giving up 560 km of range.", bestFor: "Driving enthusiasts · Business travel" },
  { desc: "A rounded, flowing grand tourer made for the long way home. Sculpted haunches, oval lamps and 590 km of range make it the most relaxed way to cover distance.", bestFor: "Long-distance touring · Comfort" }
];
CARS.forEach((car, i) => Object.assign(car, DESCRIPTIONS[i]));
const COLORS = [
  { name: "Voltage Blue", value: "#1D5FD1" },   { name: "Charge Green", value: "#0B7448" },
  { name: "Pulse Red", value: "#C62F3B" }, { name: "Apex Violet", value: "#6B46D9" },
  { name: "Obsidian", value: "#17191F" }, { name: "Pearl", value: "#E8E7E1" }
];
let activeIndex = 0, isAnimating = false, isMobile = window.innerWidth < 640;
let battery = "standard", selectedColor = COLORS[0];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const money = value => `PKR ${Math.round(value).toLocaleString("en-PK")}`;
const svgCar = (color) => `<svg viewBox="0 0 800 450" role="img" aria-label="Illustrative car"><path fill="${color}" d="M92 302h52l48-86c14-25 34-39 64-43l188-24c27-3 49 6 68 27l66 74 75 13c28 5 43 21 43 48v25H92z"/><path fill="#16181d" d="M206 206l33-52 184-23c26-3 41 2 58 20l47 55zm-47 83a48 48 0 1 0 96 0 48 48 0 0 0-96 0zm430 0a48 48 0 1 0 96 0 48 48 0 0 0-96 0z"/><circle cx="207" cy="289" r="20" fill="#adb0b8"/><circle cx="637" cy="289" r="20" fill="#adb0b8"/><path fill="#fff" opacity=".3" d="M256 165h155l18 42H229z"/></svg>`;
const stage = document.querySelector(".car-stage");
const hero = document.querySelector(".hero");
const details = document.querySelector("#hero-details");
const title = document.querySelector("#hero-title");

function imageMarkup(car, eager = false) {
  return `<img src="${car.src}" alt="${car.name} original electric ${car.type.toLowerCase()} concept" loading="${eager ? 'eager' : 'lazy'}" decoding="async" draggable="false">`;
}
function applyFallbacks(root = document) {
  root.querySelectorAll('img').forEach(img => img.addEventListener('error', () => {
    const car = CARS.find(c => img.getAttribute('src') === c.src) || CARS[0];
    const fallback = document.createElement('span'); fallback.className = 'image-fallback';
    fallback.innerHTML = svgCar(car.bg); img.replaceWith(fallback);
  }, { once: true }));
}
function renderCars() {
  if (!stage.children.length) {
    stage.innerHTML = CARS.map((car, i) => `<div class="car" data-index="${i}" aria-hidden="true">${imageMarkup(car, true)}</div>`).join('');
    applyFallbacks(stage);
  }
  [...stage.children].forEach((el, i) => {
    const offset = (i - activeIndex + CARS.length) % CARS.length;
    const role = offset === 0 ? 'center' : offset === CARS.length - 1 ? 'left' : offset === 1 ? 'right' : offset === 2 ? 'back' : 'parked';
    el.className = `car ${role}`; el.setAttribute('aria-hidden', role !== 'center');
  });
}
let detailTimer;
function preloadImages() {
  CARS.forEach(car => {
    const image = new Image();
    image.src = car.src;
  });
}
function updateDetails() {
  const car = CARS[activeIndex];
  hero.style.backgroundColor = car.bg;
  document.documentElement.style.setProperty("--model-accent", car.bg);
  document.querySelector("#slide-number").textContent = String(activeIndex + 1).padStart(2, "0");
  clearTimeout(detailTimer);
  details.style.opacity = "0";
  detailTimer = window.setTimeout(() => {
    document.querySelector("#car-type").textContent = `ELECTRIC ${car.type.toUpperCase()} / ${String(activeIndex + 1).padStart(2, "0")}`;
    document.querySelector("#car-name").textContent = car.name;
    document.querySelector("#car-bio").textContent = car.bio;
    document.querySelector("#spec-line").innerHTML = `${car.range} km range <span>|</span> 0-100 in ${car.zeroToHundred}s <span>|</span> ${money(car.pricePKR)} <small>sample price</small>`;
    document.querySelector("#carousel-announcement").textContent = `Showing ${car.name}, ${car.type}, ${car.range} km range`;
    details.style.opacity = "1";
  }, reducedMotion.matches ? 0 : 200);
  renderCars();
  syncConfigurator();
  updateStats();
}
function navigate(direction) {
  if (isAnimating) return;
  isAnimating = true;
  activeIndex = (activeIndex + (direction === "next" ? 1 : CARS.length - 1)) % CARS.length;
  hero.classList.add("shifting");
  updateDetails();
  window.setTimeout(() => { isAnimating = false; hero.classList.remove("shifting"); }, reducedMotion.matches ? 0 : 650);
}
function syncConfigurator() {
  document.querySelectorAll("#model-toggle button").forEach((button, i) => button.setAttribute("aria-pressed", i === activeIndex));
  document.querySelector("#form-model").value = CARS[activeIndex].name;
  updateBuild();
}
function updateBuild() {
  const car = CARS[activeIndex], range = battery === "long" ? Math.round(car.range * 1.16) : car.range;
  const price = car.pricePKR + (battery === "long" ? 1200000 : 0);
  document.querySelector("#build-name").textContent = car.name;
  document.querySelector("#build-color").textContent = selectedColor.name;
  document.querySelector("#build-range").textContent = `${range} km`;
  animateNumber(document.querySelector("#build-price"), price, money);
  const buildCar = document.querySelector("#build-car");
  if (buildCar.dataset.model !== String(activeIndex)) { buildCar.innerHTML = imageMarkup(car); buildCar.dataset.model = String(activeIndex); applyFallbacks(buildCar); }
  buildCar.style.setProperty('--finish', selectedColor.value);
  const finishIndex = COLORS.indexOf(selectedColor);
  const baseHue = [210, 155, 5, 275, 0, 210, 35][activeIndex];
  buildCar.style.filter = finishIndex > 3 ? (finishIndex === 4 ? 'saturate(.1) brightness(.65)' : 'saturate(.1) brightness(1.3)') : `hue-rotate(${[210, 155, 5, 275][finishIndex] - baseHue}deg)`;
  document.querySelector("#config-announcement").textContent = `${car.name} in ${selectedColor.name}, ${range} km range, total ${money(price)}`;
}
function setupConfigurator() {
  document.querySelector("#model-toggle").innerHTML = CARS.map(car => `<button type="button">${car.name.replace("SPARQ ", "")}</button>`).join("");
  document.querySelector("#form-model").innerHTML = CARS.map(car => `<option>${car.name}</option>`).join("");
  document.querySelector("#color-swatches").innerHTML = COLORS.map(color => `<button class="swatch" type="button" title="${color.name}" aria-label="${color.name}" aria-pressed="${color === selectedColor}" style="background:${color.value}"></button>`).join("");
  document.querySelectorAll("#model-toggle button").forEach((button, i) => button.addEventListener("click", () => { selectModel(i); }));
  document.querySelectorAll(".swatch").forEach((button, i) => button.addEventListener("click", () => { selectedColor = COLORS[i]; document.querySelectorAll(".swatch").forEach((swatch, j) => swatch.setAttribute("aria-pressed", j === i)); updateBuild(); }));
  document.querySelectorAll("[data-battery]").forEach(button => button.addEventListener("click", () => { battery = button.dataset.battery; document.querySelectorAll("[data-battery]").forEach(item => item.setAttribute("aria-pressed", item === button)); updateBuild(); }));
}
function setupCalculator() {
  const input = document.querySelector("#km-per-day");
  const calculate = () => {
    const km = Math.max(0, Math.min(1000, Number(input.value) || 0)), ev = km * 30 * .15 * 12, petrol = km * 30 / 12 * 280;
    document.querySelector("#ev-cost").textContent = money(ev);
    document.querySelector("#petrol-cost").textContent = money(petrol);
    document.querySelector("#saving-cost").textContent = money(Math.max(0, petrol - ev));
  };
  input.addEventListener("input", calculate); input.addEventListener("change", () => { input.value = Math.max(1, Math.min(1000, Number(input.value) || 1)); calculate(); }); calculate();
}
function setupForm() {
  const form = document.querySelector("#test-drive-form");
  form.querySelectorAll('[required]').forEach(field => { const error = form.querySelector(`[data-error-for="${field.name}"]`); error.id = `error-${field.name}`; field.setAttribute('aria-describedby', error.id); });
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Karachi' });
  form.elements.date.min = today;
  form.addEventListener('input', () => { document.querySelector('#form-success').hidden = true; });
  form.addEventListener("submit", event => {
    event.preventDefault();
    let valid = true;
    form.querySelectorAll("[required]").forEach(field => {
      const error = form.querySelector(`[data-error-for="${field.name}"]`);
      const message = !field.value.trim() ? "This field is required." : field.type === "email" && !field.validity.valid ? "Enter a valid email." : field.type === "date" && field.value < today ? "Choose today or a future date." : "";
      error.textContent = message; field.setAttribute("aria-invalid", Boolean(message)); valid = valid && !message;
    });
    document.querySelector("#form-success").hidden = !valid;
    if (!valid) form.querySelector('[aria-invalid="true"]').focus();
  });
}
const countAnimations = new WeakMap();
function animateNumber(element, target, format = Math.round) {
  cancelAnimationFrame(countAnimations.get(element));
  const from = Number(element.dataset.value) || 0; element.dataset.value = target;
  if (reducedMotion.matches) { element.textContent = format(target); return; }
  const start = performance.now();
  const tick = now => { const p = Math.min((now - start) / 650, 1); element.textContent = format(from + (target - from) * (1 - (1 - p) ** 3)); if (p < 1) countAnimations.set(element, requestAnimationFrame(tick)); };
  countAnimations.set(element, requestAnimationFrame(tick));
}
let statsVisible = false;
function updateStats() {
  const car = CARS[activeIndex];
  document.querySelector('#stats-model').textContent = `${car.name} · fictional concept specifications`;
  const targets = { range: car.range, zero: car.zeroToHundred, charge: car.chargeTime, speed: car.topSpeed };
  Object.entries(targets).forEach(([key, target]) => {
    const el = document.querySelector(`[data-stat="${key}"]`);
    if (statsVisible) animateNumber(el, target, key === 'zero' ? n => n.toFixed(1) : Math.round);
    else el.textContent = key === 'zero' ? target.toFixed(1) : target;
    el.parentElement.style.setProperty('--gauge', `${Math.min(100, target / ({range:700, zero:8, charge:40, speed:350}[key]) * 100)}%`);
  });
}
function setupStats() {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { statsVisible = true; updateStats(); observer.disconnect(); }
  }), { threshold: .25 }); observer.observe(document.querySelector('.stat-grid'));
}
function selectModel(index) {
  if (isAnimating || index === activeIndex) return;
  activeIndex = index; isAnimating = true; updateDetails();
  setTimeout(() => { isAnimating = false; }, reducedMotion.matches ? 0 : 650);
}
document.querySelector("#prev-button").addEventListener("click", () => navigate("prev"));
document.querySelector("#next-button").addEventListener("click", () => navigate("next"));
document.addEventListener('keydown', event => {
  if (event.target.closest('input, select, textarea, [contenteditable], dialog') || document.querySelector('dialog[open]')) return;
  if (hero.getBoundingClientRect().bottom <= 0) return;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); navigate(event.key === 'ArrowRight' ? 'next' : 'prev'); }
});
let touchStartX = 0;
hero.addEventListener("touchstart", event => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
hero.addEventListener("touchend", event => { const distance = event.changedTouches[0].clientX - touchStartX; if (Math.abs(distance) > 50) navigate(distance < 0 ? "next" : "prev"); }, { passive: true });
window.addEventListener("resize", () => { isMobile = window.innerWidth < 640; });
const compared = new Set();
function setupCards() {
  const cards = document.querySelector('#model-cards');
  cards.innerHTML = CARS.map((car, i) => `<article class="model-card"><div class="card-top"><span>${car.type}</span><span>0${i + 1} / 07</span></div><h3>${car.name.replace('SPARQ ', '')}</h3><div class="card-body">${imageMarkup(car)}<div class="card-specs"><span>${car.range} km range</span><span>${car.zeroToHundred}s / 0–100</span></div><span class="card-hint" aria-hidden="true">Details <b>+</b></span><div class="card-desc" id="card-desc-${i}"><div class="desc-kicker">ABOUT THE ${car.name.replace('SPARQ ', '').toUpperCase()}</div><div class="desc-text">${car.desc}</div><div class="desc-best"><span>Best for</span>${car.bestFor}</div><div class="desc-chips"><span><b>${car.range}</b> km</span><span><b>${car.zeroToHundred}</b> s 0–100</span><span><b>${car.topSpeed}</b> km/h</span></div></div><button class="card-trigger" type="button" aria-expanded="false" aria-controls="card-desc-${i}" aria-label="${car.name}: show description"></button></div><div class="card-actions"><button class="text-button" data-explore="${i}" aria-label="Explore ${car.name}">Explore model ↗</button><button class="text-button" data-compare="${i}" aria-pressed="false" aria-label="Compare ${car.name}">+ Compare</button></div></article>`).join('');
  applyFallbacks(cards);
  // Description panel: opens on mouse hover, on tap (touch/pen) and on Enter/Space (keyboard).
  const setOpen = (body, open) => { body.classList.toggle('is-open', open); body.querySelector('.card-trigger').setAttribute('aria-expanded', String(open)); };
  const closeAll = except => cards.querySelectorAll('.card-body.is-open').forEach(body => { if (body !== except) setOpen(body, false); });
  cards.querySelectorAll('.card-body').forEach(body => {
    body.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { closeAll(body); setOpen(body, true); } });
    body.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') setOpen(body, false); });
    body.querySelector('.card-trigger').addEventListener('click', e => {
      if (e.pointerType === 'mouse') { setOpen(body, true); return; } // hover already opened it; a click keeps it open
      const open = !body.classList.contains('is-open'); closeAll(body); setOpen(body, open);
    });
  });
  document.addEventListener('click', e => { if (!e.target.closest('.card-body')) closeAll(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
  cards.addEventListener('click', event => {
    const explore = event.target.closest('[data-explore]');
    if (explore) { selectModel(Number(explore.dataset.explore)); document.querySelector('#configurator').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth' }); }
    const compare = event.target.closest('[data-compare]');
    if (!compare) return;
    const i = Number(compare.dataset.compare);
    if (compared.has(i)) compared.delete(i); else if (compared.size < 2) compared.add(i); else {
      document.querySelector('#compare-status').textContent = 'Two models selected. Remove one to choose another.'; return;
    }
    updateCompare();
  });
  document.querySelector('#clear-compare').addEventListener('click', () => { compared.clear(); updateCompare(); });
  const dialog = document.querySelector('#compare-dialog');
  document.querySelector('#close-compare').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  document.querySelector('#open-compare').addEventListener('click', () => {
    if (compared.size !== 2) return;
    const cars = [...compared].map(i => CARS[i]);
    const rows = [['Class', 'type', v => v], ['Range', 'range', v => `${v} km`], ['0–100 km/h', 'zeroToHundred', v => `${v} sec`], ['Top speed', 'topSpeed', v => `${v} km/h`], ['Fast charge', 'chargeTime', v => `${v} min`], ['Sample price', 'pricePKR', money]];
    document.querySelector('#comparison-content').innerHTML = `<div class="compare-pictures">${cars.map(c => `<div>${imageMarkup(c)}<h3>${c.name}</h3></div>`).join('')}</div><table><caption class="visually-hidden">Comparison of ${cars[0].name} and ${cars[1].name}</caption><thead><tr><th scope="col">Specification</th>${cars.map(c => `<th scope="col">${c.name}</th>`).join('')}</tr></thead><tbody>${rows.map(([label, key, format]) => `<tr><th scope="row">${label}</th>${cars.map(c => `<td class="${cars[0][key] !== cars[1][key] ? 'different' : ''}">${format(c[key])}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    applyFallbacks(dialog); dialog.showModal();
  });
}
function updateCompare() {
  document.querySelectorAll('[data-compare]').forEach(btn => { const selected = compared.has(Number(btn.dataset.compare)); btn.setAttribute('aria-pressed', selected); btn.textContent = selected ? '✓ Selected' : '+ Compare'; });
  document.querySelector('#compare-bar').hidden = compared.size === 0;
  document.querySelector('#open-compare').disabled = compared.size !== 2;
  document.querySelector('#compare-status').textContent = compared.size === 2 ? [...compared].map(i => CARS[i].name).join(' / ') : '1 of 2 selected. Choose another model.';
}
function setupTheme() {
  const root = document.documentElement;
  const toggle = document.querySelector('#theme-toggle');
  const updateLabel = () => {
    const light = root.dataset.theme === 'light';
    toggle.setAttribute('aria-pressed', light);
    toggle.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
  };
  updateLabel();
  toggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    updateLabel();
    try { localStorage.setItem('sparq-theme', next); } catch (error) { /* Storage is optional. */ }
  });
}
let lineupIndex = 0;
function setupLineup() {
  const panels = document.querySelector('#lineup-panels');
  const dots = document.querySelector('#lineup-dots');
  const render = () => {
    panels.innerHTML = CARS.map((car, i) => `<article class="lineup-panel${i === lineupIndex ? ' active' : ''}" data-name="${car.name.replace('SPARQ ', '')}" aria-hidden="${i !== lineupIndex}">${imageMarkup(car)}<div class="lineup-copy"><p class="eyebrow">${String(i + 1).padStart(2, '0')} / ${car.type}</p><h3>${car.name.replace('SPARQ ', '')}</h3><p>${car.bio}</p><div class="spec-bars"><span class="spec-bar">RANGE · ${car.range} KM<i style="--fill:${Math.min(100, car.range / 6)}%"></i></span><span class="spec-bar">0–100 · ${car.zeroToHundred} SEC<i style="--fill:${Math.min(100, (8 - car.zeroToHundred) / 8 * 100)}%"></i></span><span class="spec-bar">TOP SPEED · ${car.topSpeed} KM/H<i style="--fill:${Math.min(100, car.topSpeed / 3.5)}%"></i></span></div></div></article>`).join('');
    dots.innerHTML = CARS.map((car, i) => `<button type="button" aria-label="Show ${car.name}" aria-pressed="${i === lineupIndex}"></button>`).join('');
    applyFallbacks(panels);
    document.querySelector('#lineup-counter').textContent = `${String(lineupIndex + 1).padStart(2, '0')} / 07`;
    dots.querySelectorAll('button').forEach((button, i) => button.addEventListener('click', () => { lineupIndex = i; render(); }));
  };
  const step = direction => { lineupIndex = (lineupIndex + direction + CARS.length) % CARS.length; render(); };
  document.querySelector('#lineup-prev').addEventListener('click', () => step(-1));
  document.querySelector('#lineup-next').addEventListener('click', () => step(1));
  render();
  const track = document.querySelector('#lineup-track');
  const onScroll = () => {
    if (reducedMotion.matches) return;
    const rect = track.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - innerHeight)));
    const next = Math.min(CARS.length - 1, Math.floor(progress * CARS.length));
    if (next !== lineupIndex) { lineupIndex = next; render(); }
  };
  /* lineup changes only via arrows/dots/keys: no scroll-driven auto-switching */
}
function setupChapters() {
  const links = [...document.querySelectorAll('.chapter-nav a')];
  const chapters = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const index = chapters.indexOf(entry.target);
    links.forEach((link, i) => link.setAttribute('aria-current', i === index ? 'step' : 'false'));
    document.querySelector('.chapter-road').style.setProperty('--road-progress', `${Math.max(0, index * 34)}px`);
  }), { threshold: .35 });
  chapters.forEach(chapter => observer.observe(chapter));
}
function setupEffects() {
  const menu = document.querySelector('.menu-button'), links = document.querySelector('#nav-links');
  const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open menu'); links.classList.remove('open'); };
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', open); menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); links.classList.toggle('open', open); });
  links.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && links.classList.contains('open')) { closeMenu(); menu.focus(); } });
  const intro = document.querySelector('#power-intro'); let introTimer;
  const finishIntro = () => { const focused = intro.contains(document.activeElement); intro.hidden = true; clearTimeout(introTimer); if (focused) document.querySelector('.brand-label').focus(); };
  document.querySelector('#skip-intro').addEventListener('click', finishIntro);
  if (!reducedMotion.matches) { intro.hidden = false; introTimer = setTimeout(finishIntro, 1300); }
  const revealObserver = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); revealObserver.unobserve(e.target); } }), { threshold: .08 });
  document.querySelectorAll('.section-heading, .model-card, .config-grid, .stat-grid, .drive-card, .story-copy, .story-visual').forEach((el, i) => { if (!reducedMotion.matches) el.classList.add('reveal'); el.style.transitionDelay = `${el.classList.contains('model-card') ? (i % 3) * 65 : 0}ms`; revealObserver.observe(el); });
  let scheduled = false, heroVisible = true, storyVisible = false;
  const storyImage = document.querySelector('.problem-answer img') || document.createElement('img');
  new IntersectionObserver(entries => entries.forEach(e => { if (e.target === hero) { heroVisible = e.isIntersecting; hero.classList.toggle('offscreen', !heroVisible); } else storyVisible = e.isIntersecting; })).observe(hero);
  const storyObserver = new IntersectionObserver(entries => { storyVisible = entries[0].isIntersecting; }); const storyEl = document.querySelector('.problem'); if (storyEl) storyObserver.observe(storyEl);
  const scrollUpdate = () => { scheduled = false; const max = document.documentElement.scrollHeight - innerHeight; document.querySelector('.page-progress').style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`; document.querySelector('.site-header').classList.toggle('scrolled', scrollY > 30); document.querySelector('.chapter-road').style.setProperty('--road-progress', `${max > 0 ? scrollY / max * 170 : 0}px`); if (!reducedMotion.matches && storyVisible) { const rect = storyImage.getBoundingClientRect(); const p = Math.max(-1, Math.min(1, (innerHeight / 2 - rect.top) / innerHeight)); storyImage.style.transform = `translateY(${p * -22}px) rotate(${-8 + p * 4}deg) scale(${1 + p * .03})`; } };
  window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(scrollUpdate); } }, { passive: true }); scrollUpdate();
  const finePointer = matchMedia('(pointer:fine)'); let pointerFrame;
  window.addEventListener('pointermove', e => { if (reducedMotion.matches || !finePointer.matches) return; cancelAnimationFrame(pointerFrame); pointerFrame = requestAnimationFrame(() => { document.querySelector('.cursor-glow').style.transform = `translate(${e.clientX}px,${e.clientY}px)`; if (heroVisible) { const x = (e.clientX / innerWidth - .5) * 3; title.style.transform = `translateX(-50%) perspective(1000px) rotateY(${x}deg)`; } }); }, { passive: true });
  document.querySelectorAll('.button').forEach(btn => { btn.addEventListener('pointermove', e => { if (reducedMotion.matches || !finePointer.matches) return; const r = btn.getBoundingClientRect(); btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .035}px,${(e.clientY - r.top - r.height / 2) * .06}px)`; }); btn.addEventListener('pointerleave', () => { btn.style.transform = ''; }); });
  const preview = document.querySelector('#build-car'); let dragX = null;
  preview.addEventListener('pointerdown', e => { if (reducedMotion.matches) return; dragX = e.clientX; preview.setPointerCapture(e.pointerId); });
  preview.addEventListener('pointermove', e => { if (dragX === null || reducedMotion.matches) return; preview.style.transform = `perspective(900px) rotateY(${Math.max(-14, Math.min(14, (e.clientX - dragX) / 8))}deg)`; });
  const release = () => { dragX = null; preview.style.transform = ''; }; preview.addEventListener('pointerup', release); preview.addEventListener('pointercancel', release);
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) { finishIntro(); title.style.transform = ''; storyImage.style.transform = ''; release(); } });
}
setupTheme(); setupLineup(); setupChapters();
setupCards(); setupEffects();
preloadImages(); renderCars(); setupConfigurator(); updateDetails(); setupCalculator(); setupForm(); setupStats();

/* Performance car strip + mouse-follow tilt */
(function () {
  const strip = document.querySelector('#car-strip');
  strip.innerHTML = CARS.map((c, i) => `<button type="button" class="strip-car" aria-label="Show performance of ${c.name}" aria-pressed="false" data-i="${i}"><img src="${c.src}" alt="" loading="lazy" draggable="false"><span>${c.name.replace('SPARQ ', '')}</span></button>`).join('');
  const mark = () => { const big = document.querySelector('#performance-car'); if (big && CARS[activeIndex]) { big.src = CARS[activeIndex].src; big.alt = ''; } strip.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-pressed', String(i === activeIndex))); };
  strip.addEventListener('click', e => { const b = e.target.closest('button'); if (b) selectModel(+b.dataset.i); });
  const base = updateDetails; updateDetails = function () { base.apply(this, arguments); mark(); }; mark();
  if (matchMedia('(pointer:fine)').matches && !reducedMotion.matches) {
    let f; const root = document.documentElement.style;
    addEventListener('pointermove', e => { cancelAnimationFrame(f); f = requestAnimationFrame(() => { root.setProperty('--mx', ((e.clientX / innerWidth) * 2 - 1).toFixed(3)); root.setProperty('--my', ((e.clientY / innerHeight) * 2 - 1).toFixed(3)); }); }, { passive: true });
  }
})();
