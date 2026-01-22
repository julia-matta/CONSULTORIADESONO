export function initTestimonialsCarousel() {
  const track = document.getElementById("testimonialsTrack");
  if (!track) return;

  // evita init duplicado com Turbo
  if (track.dataset.carouselInit === "true") return;
  track.dataset.carouselInit = "true";

  const root = track.closest(".testimonials-carousel") || document;
  const prev = root.querySelector(".carousel-btn.prev");
  const next = root.querySelector(".carousel-btn.next");
  const viewport = root.querySelector(".carousel-viewport");

  if (!viewport) return;

  const cards = track.querySelectorAll(".testimonial-card");
  if (cards.length === 0) return;

  // dots container
  let dotsContainer = root.parentElement?.querySelector("#carouselDots");
  if (!dotsContainer) {
    dotsContainer = document.createElement("div");
    dotsContainer.className = "carousel-dots";
    dotsContainer.id = "carouselDots";
    root.parentElement?.appendChild(dotsContainer);
  }

  let index = 0;
  const isMobile = () => window.innerWidth <= 900;

  const getStep = () => viewport.getBoundingClientRect().width;

  const getMaxIndex = () => {
    const step = getStep();
    if (!step) return 0;

    const totalScrollable = track.scrollWidth;
    const visible = viewport.getBoundingClientRect().width;
    const remaining = Math.max(0, totalScrollable - visible);

    return Math.ceil(remaining / step);
  };

  const buildDots = () => {
    dotsContainer.innerHTML = "";

    // ✅ no mobile não tem dots (swipe nativo)
    if (isMobile()) return;

    const total = getMaxIndex() + 1;
    for (let i = 0; i < total; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", `Ir para página ${i + 1} do carrossel`);

      dot.addEventListener("click", () => {
        index = i;
        update(true);
      });

      dotsContainer.appendChild(dot);
    }

    updateDots();
  };

  const updateDots = () => {
    const dots = dotsContainer.querySelectorAll(".carousel-dot");
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  };

  const update = (animate = true) => {
    // ✅ MOBILE: swipe nativo
    if (isMobile()) {
      track.style.transform = "none";
      track.style.transition = "none";
      return;
    }

    // ✅ DESKTOP: transform
    const max = getMaxIndex();
    if (index > max) index = 0;
    if (index < 0) index = max;

    track.style.transition = animate ? "transform 0.35s ease" : "none";
    track.style.transform = `translateX(-${index * getStep()}px)`;

    if (!animate) {
      requestAnimationFrame(() => {
        track.style.transition = "transform 0.35s ease";
      });
    }

    updateDots();
  };

  // setas (somente desktop)
  next?.addEventListener("click", () => {
    if (isMobile()) return;
    index += 1;
    update(true);
  });

  prev?.addEventListener("click", () => {
    if (isMobile()) return;
    index -= 1;
    update(true);
  });

  // resize
  window.addEventListener("resize", () => {
    index = 0;
    buildDots();
    update(false);
  });

  // init
  buildDots();
  requestAnimationFrame(() => update(false));
}
