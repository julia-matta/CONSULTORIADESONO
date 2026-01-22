export function initTestimonialsCarousel() {
  const track = document.getElementById("testimonialsTrack");
  if (!track) return;

  // evita init duplicado com Turbo (senão pode duplicar listeners)
  if (track.dataset.carouselInit === "true") return;
  track.dataset.carouselInit = "true";

  // ✅ ativa modal
  initTestimonialsModal();

  const root = track.closest(".testimonials-carousel") || document;
  const prev = root.querySelector(".carousel-btn.prev");
  const next = root.querySelector(".carousel-btn.next");

  const viewport = root.querySelector(".carousel-viewport");
  if (!viewport) return;

  const cards = track.querySelectorAll(".testimonial-card");
  if (cards.length === 0) return;

  // ✅ dots
  let dotsContainer = root.parentElement?.querySelector("#carouselDots");
  if (!dotsContainer) {
    dotsContainer = document.createElement("div");
    dotsContainer.className = "carousel-dots";
    dotsContainer.id = "carouselDots";
    root.parentElement?.appendChild(dotsContainer);
  }

  let index = 0;

  const getStep = () => {
    // anda sempre por “páginas” do tamanho do viewport
    return viewport.getBoundingClientRect().width;
  };

  const getMaxIndex = () => {
    const step = getStep();
    if (!step) return 0;

    // total rolável do track (inclui padding do track, gap, etc)
    const totalScrollable = track.scrollWidth;

    // tamanho visível
    const visible = viewport.getBoundingClientRect().width;

    // quanto sobra para rolar
    const remaining = Math.max(0, totalScrollable - visible);

    // número de páginas possíveis
    return Math.ceil(remaining / step);
  };

  const update = (animate = true) => {
    const max = getMaxIndex();

    if (index > max) index = 0;
    if (index < 0) index = max;

    if (!animate) track.style.transition = "none";
    else track.style.transition = "transform 0.35s ease";

    track.style.transform = `translateX(-${index * getStep()}px)`;

    if (!animate) {
      requestAnimationFrame(() => {
        track.style.transition = "transform 0.35s ease";
      });
    }

    updateDots();
  };

  // ===== DOTS =====
  const buildDots = () => {
    dotsContainer.innerHTML = "";
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

  // ===== LOOP (setas) =====
  next?.addEventListener("click", () => {
    index += 1;
    update(true);
  });

  prev?.addEventListener("click", () => {
    index -= 1;
    update(true);
  });

  // ===== SWIPE / DRAG =====
  let isDown = false;
  let startX = 0;
  let moved = false;

  viewport.addEventListener("pointerdown", (e) => {
    isDown = true;
    moved = false;
    startX = e.clientX;
    viewport.setPointerCapture(e.pointerId);
  });

  viewport.addEventListener("pointermove", (e) => {
    if (!isDown) return;
    const diff = e.clientX - startX;
    if (Math.abs(diff) > 10) moved = true;
  });

  viewport.addEventListener("pointerup", (e) => {
    if (!isDown) return;
    isDown = false;

    const diff = e.clientX - startX;
    if (!moved) return;

    if (diff < -40) {
      index += 1;
      update(true);
    } else if (diff > 40) {
      index -= 1;
      update(true);
    }
  });

  // ===== RESIZE =====
  window.addEventListener("resize", () => {
    index = 0;
    buildDots();
    update(false);
  });

  // INIT
  buildDots();
  requestAnimationFrame(() => update(false));
}

/* ==============================
   MODAL (Ver mais) — pega texto do card
============================== */
function initTestimonialsModal() {
  const modal = document.getElementById("testimonialModal");
  const modalClose = document.getElementById("modalClose");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");

  if (!modal || !modalClose || !modalTitle || !modalText) return;

  if (modal.dataset.modalInit === "true") return;
  modal.dataset.modalInit = "true";

  const openModal = ({ title, text }) => {
    modalTitle.textContent = title || "";
    modalText.textContent = (text || "").trim();

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");

    modalTitle.textContent = "";
    modalText.textContent = "";
  };

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".testimonial-more");
    if (!btn) return;

    const card = btn.closest(".testimonial-card");
    if (!card) return;

    const quote = card.querySelector(".testimonial-quote");
    const name = card.querySelector(".testimonial-name");

    if (!quote) return;

    openModal({
      title: name?.innerText || "",
      text: quote.innerText,
    });
  });

  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
}
