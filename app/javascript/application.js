import "@hotwired/turbo-rails"
import "controllers"

import { initTestimonialsCarousel } from "./testimonials_carousel"
import { initFAQ } from "./pages/faq"
import { initNavbar } from "./navbar"
import { initTestimonials } from "./pages/testimonials"

document.addEventListener("turbo:load", () => {
  console.log("turbo:load ✅")

  initNavbar()
  initFAQ()

  // ✅ inicializa só quando existe na página
  if (document.getElementById("testimonialsTrack")) {
    initTestimonialsCarousel()
    initTestimonials() // (modal)
  }
})
