/* VeloraHireupdate01: "how a QR grows". A sample student's QR is scanned from a resume, then develops as courses,
   skills and AI interview sessions are completed. Plain JS. Numbers are an illustrative sample journey, never real data.
   The markup (including all copy) comes from the server; this file only animates it. */
(function () {
  var root = document.querySelector("[data-hq]");
  if (!root) return;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s) { return root.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(root.querySelectorAll(s)); };
  var SVG = "http://www.w3.org/2000/svg", N = 29;

  /* ---- the QR: finder squares, a small alignment square, and data modules in a fixed random order ---- */
  var qr = $("[data-hq-qr]"), seed = 21, rnd = function () { return (seed = (seed * 16807) % 2147483647) / 2147483647; };
  function rect(x, y, w, h, cls) { var r = document.createElementNS(SVG, "rect"); r.setAttribute("x", x); r.setAttribute("y", y); r.setAttribute("width", w); r.setAttribute("height", h); r.setAttribute("rx", 0.18); r.setAttribute("class", cls); qr.appendChild(r); return r; }
  var finders = [];
  [[0, 0], [N - 7, 0], [0, N - 7]].forEach(function (p) {
    finders.push(rect(p[0] + 0.5, p[1] + 0.5, 6, 6, "hq-f hq-f-o"));
    finders.push(rect(p[0] + 2, p[1] + 2, 3, 3, "hq-f hq-f-i"));
  });
  function reserved(x, y) { return (x < 8 && y < 8) || (x >= N - 8 && y < 8) || (x < 8 && y >= N - 8); }
  var mods = [];
  for (var y = 0; y < N; y++) for (var x = 0; x < N; x++) {
    if (reserved(x, y)) continue;
    var keep = (x === 6 || y === 6) ? ((x + y) % 2 === 0) : rnd() < 0.5;
    if (!keep) continue;
    var r = rect(x + 0.07, y + 0.07, 0.86, 0.86, "hq-m"); mods.push({ el: r, x: x, y: y, k: rnd() });
  }
  mods.sort(function (a, b) { return a.k - b.k; });
  var M = mods.length;

  /* ---- the story, read from the markup ---- */
  var stepEls = $$("[data-hq-step]");
  var STEPS = stepEls.map(function (el) {
    return { delta: parseInt(el.getAttribute("data-delta"), 10), cat: el.getAttribute("data-cat"), skills: (el.getAttribute("data-skills") || "").split("|").filter(Boolean), course: el.getAttribute("data-course") || "", interview: el.getAttribute("data-interview") || "", strength: parseInt(el.getAttribute("data-strength"), 10) || 0, label: el.getAttribute("data-label") || "", text: el.getAttribute("data-text") || "" };
  });
  var unlockEls = $$("[data-at]"), score = $("[data-hq-score]"), bar = $("[data-hq-bar]"), badge = $("[data-hq-badge]"), plus = $("[data-hq-plus]"), resume = $("[data-hq-resume]"), strength = $("[data-hq-strength]");
  var now = $("[data-hq-now]"), skillsBox = $("[data-hq-skills]"), coursesBox = $("[data-hq-courses]"), intsBox = $("[data-hq-ints]"), pauseBtn = $("[data-hq-pause]"), qrwrap = $("[data-hq-qrwrap]"), fileName = $("[data-hq-file]");
  var cum = [], base = STEPS[0].delta;

  function compute() { cum = []; var s = 0; STEPS.forEach(function (st, i) { s += i === 0 ? base : st.delta; cum.push(s); }); }
  compute();
  var cur = -1, shown = 0, timer = 0, paused = false, visible = true, tween = 0;

  function countTo(to) {
    var from = parseInt(score.textContent, 10) || 0, t0 = performance.now();
    cancelAnimationFrame(tween);
    if (reduce) { score.textContent = to; return; }
    (function step(t) { var p = Math.min(1, (t - t0) / 900), e = 1 - Math.pow(1 - p, 3); score.textContent = Math.round(from + (to - from) * e); if (p < 1) tween = requestAnimationFrame(step); })(t0);
  }
  function restart(el, cls) { el.classList.remove(cls); void el.getBoundingClientRect(); el.classList.add(cls); }

  function clearResume() {
    skillsBox.innerHTML = '<i class="sk"></i><i class="sk"></i><i class="sk"></i>'; coursesBox.innerHTML = '<li class="sk"></li><li class="sk"></li>'; intsBox.innerHTML = '<li class="sk"></li><li class="sk"></li>';
    strength.style.width = "34%";
  }
  function addResume(st, animate) {
    st.skills.forEach(function (s) { var first = skillsBox.querySelector(".sk"); var c = document.createElement("span"); c.className = "hq-chip" + (animate ? " pop" : ""); c.textContent = s; if (first) skillsBox.replaceChild(c, first); else skillsBox.appendChild(c); });
    if (st.course) { var first2 = coursesBox.querySelector(".sk"), li = document.createElement("li"); li.className = "hq-line" + (animate ? " pop" : ""); li.textContent = st.course; if (first2) coursesBox.replaceChild(li, first2); else coursesBox.appendChild(li); }
    if (st.interview) { var first3 = intsBox.querySelector(".sk"), li2 = document.createElement("li"); li2.className = "hq-line iv" + (animate ? " pop" : ""); li2.textContent = st.interview; if (first3) intsBox.replaceChild(li2, first3); else intsBox.appendChild(li2); }
    if (st.strength) strength.style.width = st.strength + "%";
  }
  function setModules(upTo, cat, animate) {
    for (var i = shown; i < upTo && i < M; i++) {
      var m = mods[i]; m.el.setAttribute("data-c", cat);
      m.el.style.transitionDelay = animate ? (m.y / N * 1.1 + Math.random() * 0.15).toFixed(2) + "s" : "0s";
      m.el.classList.add("on");
    }
    shown = Math.max(shown, upTo);
  }
  function resetAll() {
    mods.forEach(function (m) { m.el.style.transitionDelay = "0s"; m.el.classList.remove("on"); m.el.removeAttribute("data-c"); });
    finders.forEach(function (f) { f.classList.remove("on"); });
    shown = 0; cur = -1; score.textContent = "0"; bar.style.width = "0%"; clearResume();
    unlockEls.forEach(function (u) { u.classList.remove("on"); });
    qrwrap.classList.remove("done"); badge.textContent = "WAITING FOR A RESUME"; badge.setAttribute("data-s", "wait");
    stepEls.forEach(function (s) { s.classList.remove("on", "past"); s.removeAttribute("aria-current"); });
  }

  /* go to step i. animate=false fast-forwards (used when you click a step). */
  function go(i, animate) {
    if (i === 0 || i < cur) { resetAll(); }
    for (var k = cur + 1; k <= i; k++) apply(k, animate && k === i);
    cur = i;
    stepEls.forEach(function (s, k) { s.classList.toggle("on", k === i); s.classList.toggle("past", k < i); if (k === i) s.setAttribute("aria-current", "step"); else s.removeAttribute("aria-current"); });
  }
  function apply(k, animate) {
    var st = STEPS[k], total = cum[k], target = Math.round(M * total / 100);
    if (k === 0) { finders.forEach(function (f, n) { f.style.transitionDelay = animate ? (0.2 + n * 0.12) + "s" : "0s"; f.classList.add("on"); }); resume.classList.toggle("scanning", animate); if (animate) restart(resume, "scanning"); }
    setModules(target, st.cat, animate);
    addResume(st, animate);
    countTo(total); bar.style.width = total + "%";
    if (animate) { restart(qrwrap, "scan"); plus.textContent = k === 0 ? "scanned" : "+" + st.delta; plus.setAttribute("data-c", st.cat); restart(plus, "go"); }
    if (now) now.textContent = st.text;
    badge.textContent = (k === STEPS.length - 1 ? "VERIFIED · SCANNABLE" : st.label.toUpperCase()); badge.setAttribute("data-s", k === STEPS.length - 1 ? "done" : "work");
    unlockEls.forEach(function (u) { var at = parseInt(u.getAttribute("data-at"), 10); var on = total >= at; if (on && !u.classList.contains("on")) { u.classList.add("on"); if (animate) restart(u, "unlock"); } });
    if (k === STEPS.length - 1) qrwrap.classList.add("done");
  }

  function schedule() {
    clearTimeout(timer);
    if (paused || !visible || reduce) return;
    timer = setTimeout(function () { var n = cur + 1; if (n >= STEPS.length) { timer = setTimeout(function () { go(0, true); schedule(); }, 4800); return; } go(n, true); schedule(); }, cur === STEPS.length - 1 ? 4800 : 3400);
  }

  /* controls */
  stepEls.forEach(function (el, i) { el.addEventListener("click", function () { paused = true; syncPause(); go(i, i === cur + 1); }); });
  function syncPause() { if (pauseBtn) pauseBtn.textContent = paused ? "Play" : "Pause"; if (pauseBtn) pauseBtn.setAttribute("aria-pressed", paused ? "true" : "false"); }
  if (pauseBtn) pauseBtn.addEventListener("click", function () { paused = !paused; syncPause(); if (!paused) schedule(); else clearTimeout(timer); });
  new IntersectionObserver(function (es) { visible = es.some(function (e) { return e.isIntersecting; }); if (visible) schedule(); else clearTimeout(timer); }).observe(root);

  /* drop a resume: the story restarts from that file, with an illustrative starting score */
  var inp = document.querySelector("[data-score-input]");
  if (inp) inp.addEventListener("change", function () {
    var f = inp.files && inp.files[0]; if (!f) return;
    var h = 0; for (var i = 0; i < f.name.length; i++) h = (h * 31 + f.name.charCodeAt(i)) >>> 0;
    base = 30 + (h % 14); compute();
    if (fileName) fileName.textContent = "Scanning " + f.name.slice(0, 28) + " (illustrative)";
    paused = false; syncPause(); resetAll(); go(0, true); schedule();
  });

  /* start */
  resetAll();
  if (reduce) { go(STEPS.length - 1, false); if (pauseBtn) pauseBtn.hidden = true; }
  else { setTimeout(function () { go(0, true); schedule(); }, 1400); }
})();
