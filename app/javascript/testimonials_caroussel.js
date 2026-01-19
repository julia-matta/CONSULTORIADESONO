(() => {
  const root = document.querySelector('[data-carousel="testimonials"]');
  if (!root) return;

  const viewport = root.querySelector("[data-carousel-viewport]");
  const track = root.querySelector("[data-carousel-track]");
  const btnPrev = root.querySelector("[data-carousel-prev]");
  const btnNext = root.querySelector("[data-carousel-next]");
  const dotsWrap = root.querySelector("[data-carousel-dots]");

  const originalSlides = Array.from(track.children);
  if (originalSlides.length < 2) return;

  // ====== CONFIG ======
  const GAP = 16;                 // precisa bater com o gap do CSS
  const AUTOPLAY_MS = 3500;
  const DRAG_THRESHOLD = 40;

  // ====== LOOP INFINITO (com clones) ======
  // Vamos clonar o primeiro e o último pra fazer o looping "imperceptível"
  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);

  firstClone.setAttribute("data-clone", "true");
  lastClone.setAttribute("data-clone", "true");

  track.insertBefore(lastClone, originalSlides[0]);
  track.appendChild(firstClone);

  const slides = Array.from(track.children);

  let index = 1; // começa no primeiro slide "real"
  let slideWidth = 0;
  let autoplayTimer = null;
  let isAnimating = false;

  // ====== DOTS (um por slide real) ======
  const dots = originalSlides.map((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Ir para depoimento ${i + 1}`);
    b.addEventListener("click", () => goToRealIndex(i));
    dotsWrap.appendChild(b);
    return b;
  });

  function setActiveDot(realIndex) {
    dots.forEach((d, i) => {
      if (i === realIndex) d.setAttribute("aria-current", "true");
      else d.removeAttribute("aria-current");
    });
  }

  function getRealIndex() {
    // index aponta para slides com clones
    // 1..N corresponde aos reais
    const totalReals = originalSlides.length;
    if (index === 0) return totalReals - 1;
    if (index === totalReals + 1) return 0;
    return index - 1;
  }

  function measure() {
    const firstReal = slides[1];
    const rect = firstReal.getBoundingClientRect();
    slideWidth = rect.width + GAP;
    translate(false);
    setActiveDot(getRealIndex());
  }

  function translate(animate = true) {
    if (animate) {
      track.style.transition = "transform 380ms cubic-bezier(.2,.8,.2,1)";
    } else {
      track.style.transition = "none";
    }
    track.style.transform = `translate3d(${-index * slideWidth}px, 0, 0)`;
  }

  function next() {
    if (isAnimating) return;
    isAnimating = true;
    index++;
    translate(true);
  }

  function prev() {
    if (isAnimating) return;
    isAnimating = true;
    index--;
    translate(true);
  }

  function goToRealIndex(realIndex) {
    if (isAnimating) return;
    isAnimating = true;
    index = realIndex + 1;
    translate(true);
  }

  track.addEventListener("transitionend", () => {
    const totalReals = originalSlides.length;

    // se caiu no clone, pula sem animação pro slide real
    if (index === 0) {
      index = totalReals;
      translate(false);
    }
    if (index === totalReals + 1) {
      index = 1;
      translate(false);
    }

    isAnimating = false;
    setActiveDot(getRealIndex());
  });

  // ====== AUTOPLAY ======
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => next(), AUTOPLAY_MS);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  root.addEventListener("mouseenter", stopAutoplay);
  root.addEventListener("mouseleave", startAutoplay);
  root.addEventListener("focusin", stopAutoplay);
  root.addEventListener("focusout", startAutoplay);

  btnPrev.addEventListener("click", () => {
    stopAutoplay();
    prev();
    startAutoplay();
  });

  // ====== TECLADO ======
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") btnNext.click();
    if (e.key === "ArrowLeft") btnPrev.click();
  });

  // ====== SWIPE (touch) ======
  let startX = 0;
  let isDown = false;

  viewport.addEventListener("pointerdown", (e) => {
    isDown = true;
    startX = e.clientX;
    viewport.setPointerCapture(e.pointerId);
  });

  viewport.addEventListener("pointerup", (e) => {
    if (!isDown) return;
    isDown = false;

    const diff = e.clientX - startX;

    if (Math.abs(diff) > DRAG_THRESHOLD) {
      stopAutoplay();
      if (diff < 0) next();
      else prev();
      startAutoplay();
    }
  });

  viewport.addEventListener("pointercancel", () => (isDown = false));

  // ====== INIT ======
  window.addEventListener("resize", measure);

  requestAnimationFrame(() => {
    measure();
    translate(false);
    startAutoplay();
  });
})();
