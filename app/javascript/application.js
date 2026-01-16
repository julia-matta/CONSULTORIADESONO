import "@hotwired/turbo-rails"
import "controllers"

import { initTestimonialsCarousel } from "testimonials_carousel"

document.addEventListener("turbo:load", () => {
  initTestimonialsCarousel()
})

document.addEventListener("turbo:load", () => {
  console.log("JS carregou ✅")
})
