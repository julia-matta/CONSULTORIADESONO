export function initTestimonialsCarousel() {
  const track = document.getElementById("testimonialsTrack");
  if (!track) return;

  const prev = document.querySelector(".carousel-btn.prev");
  const next = document.querySelector(".carousel-btn.next");

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

  window.addEventListener("resize", () => {
    track.style.transform = "translateX(0px)";
    index = 0;
    update();
  });

  if (next) {
    next.addEventListener("click", () => {
      const maxIndex = Math.ceil(cards.length / perPage) - 1;
      if (index < maxIndex) index += 1;
      update();
    });
  }

  if (prev) {
    prev.addEventListener("click", () => {
      if (index > 0) index -= 1;
      update();
    });
  }

  update();
}
