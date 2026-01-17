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

  const cards = track.querySelectorAll(".testimonial-card");
  if (cards.length === 0) return;

  let index = 0;
  const perPage = 3;

  const viewport = track.parentElement;

  const update = () => {
    const styles = getComputedStyle(viewport);
    const step =
      viewport.clientWidth -
      parseFloat(styles.paddingLeft) -
      parseFloat(styles.paddingRight);

    track.style.transform = `translateX(-${index * step}px)`;
  };

  window.addEventListener("resize", () => {
    index = 0;
    track.style.transform = "translateX(0px)";
    requestAnimationFrame(update);
  });

  next?.addEventListener("click", () => {
    const maxIndex = Math.ceil(cards.length / perPage) - 1;
    if (index < maxIndex) index += 1;
    update();
  });

  prev?.addEventListener("click", () => {
    if (index > 0) index -= 1;
    update();
  });

  requestAnimationFrame(update);
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

  // evita duplicar listeners com Turbo
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

  // ✅ clique no botão "Ver mais"
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

  // fechar no X
  modalClose.addEventListener("click", closeModal);

  // fechar clicando fora do card
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // fechar com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
}
