export function initTestimonials() {
  initTestimonialsCarousel();
  initTestimonialsModal();
}

/* =======================
   CARROSSEL
======================= */
function initTestimonialsCarousel() {
  const track = document.getElementById("testimonialsTrack");
  const prev = document.querySelector(".carousel-btn.prev");
  const next = document.querySelector(".carousel-btn.next");

  if (!track || !prev || !next) return;

  const cards = track.querySelectorAll(".testimonial-card");
  if (cards.length === 0) return;

  let index = 0;
  const perPage = 3;

  const update = () => {
    const cardWidth = cards[0].offsetWidth;
    const gap = 22;
    const step = perPage * (cardWidth + gap);
    track.style.transform = `translateX(-${index * step}px)`;
  };

  next.addEventListener("click", () => {
    const maxIndex = Math.ceil(cards.length / perPage) - 1;
    index = Math.min(index + 1, maxIndex);
    update();
  });

  prev.addEventListener("click", () => {
    index = Math.max(index - 1, 0);
    update();
  });

  window.addEventListener("resize", () => {
    index = 0;
    update();
  });

  update();
}

/* =======================
   MODAL DO "VER MAIS"
======================= */
function initTestimonialsModal() {
  const modal = document.getElementById("testimonialModal");
  const modalText = document.getElementById("modalText");
  const modalClose = document.getElementById("modalClose");

  if (!modal || !modalText || !modalClose) return;

  document.querySelectorAll(".testimonial-more").forEach((btn) => {
    btn.addEventListener("click", () => {
      modalText.textContent = btn.dataset.full || "";
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  modalClose.addEventListener("click", () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }
  });
}
