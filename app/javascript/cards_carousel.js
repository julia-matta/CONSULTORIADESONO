document.addEventListener("turbo:load", () => {
  console.log("✅ cards_carousel iniciado (turbo:load)")

  const carousels = document.querySelectorAll("[data-cards-carousel]")
  console.log("carousels encontrados:", carousels.length)

  carousels.forEach((carousel) => {
    const track = carousel.querySelector("[data-cards-track]")
    const cards = Array.from(carousel.querySelectorAll(".testimonial-card"))
    const prev = carousel.querySelector("[data-cards-prev]")
    const next = carousel.querySelector("[data-cards-next]")
    const dotsWrap = carousel.parentElement.querySelector("[data-cards-dots]")

    console.log({ track, cards: cards.length, prev, next, dotsWrap })

    if (!track || !prev || !next || !dotsWrap || cards.length === 0) return

    let index = 0

    function cardsPerView() {
      if (window.matchMedia("(max-width: 600px)").matches) return 1
      if (window.matchMedia("(max-width: 900px)").matches) return 2
      return 3
    }

    function maxIndex() {
      return Math.max(0, cards.length - cardsPerView())
    }

    function updateDots() {
      dotsWrap.innerHTML = ""
      const total = maxIndex() + 1

      for (let i = 0; i < total; i++) {
        const dot = document.createElement("button")
        dot.className = "cards-carousel-dot" + (i === index ? " is-active" : "")
        dot.addEventListener("click", () => goTo(i))
        dotsWrap.appendChild(dot)
      }
    }

    function move() {
      const gap = parseFloat(getComputedStyle(track).gap || "0")
      const cardWidth = cards[0].getBoundingClientRect().width
      const offset = index * (cardWidth + gap)

      track.style.transform = `translateX(-${offset}px)`
      console.log("➡️ move()", { index, offset })
    }

    function goTo(i) {
      index = Math.min(Math.max(i, 0), maxIndex())
      updateDots()
      move()
    }

    prev.addEventListener("click", () => {
      console.log("⬅️ clicou PREV")
      goTo(index - 1)
    })

    next.addEventListener("click", () => {
      console.log("➡️ clicou NEXT")
      goTo(index + 1)
    })

    updateDots()
    move()
  })
})
