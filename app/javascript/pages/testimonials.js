export function initTestimonials() {
  initTestimonialsModal();
}

/* =======================
   MODAL DO "VER MAIS"
   ✅ pega texto direto do card (sem data-full)
======================= */
function initTestimonialsModal() {
  const modal = document.getElementById("testimonialModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const modalClose = document.getElementById("modalClose");

  if (!modal || !modalText || !modalClose) return;

  // evita listeners duplicados com Turbo
  if (modal.dataset.modalInit === "true") return;
  modal.dataset.modalInit = "true";

  const openModal = ({ title, text }) => {
    if (modalTitle) modalTitle.textContent = title || "";
    modalText.textContent = (text || "").trim();

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");

    if (modalTitle) modalTitle.textContent = "";
    modalText.textContent = "";
  };

  // clique no botão ver mais
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
    if (e.key === "Escape") closeModal();
  });
}
