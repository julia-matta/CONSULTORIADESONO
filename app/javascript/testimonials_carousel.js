export function initTestimonialsCarousel() {
  const track = document.getElementById("testimonialsTrack");
  if (!track) return;

  // evita init duplicado com Turbo (senão pode duplicar listeners)
  if (track.dataset.carouselInit === "true") return;
  track.dataset.carouselInit = "true";

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
