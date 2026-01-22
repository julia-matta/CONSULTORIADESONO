import "@hotwired/turbo-rails"
import "controllers"

import { initTestimonialsCarousel } from "testimonials_carousel"

document.addEventListener("turbo:load", () => {
  console.log("turbo:load ✅")
  initTestimonialsCarousel()
})

import { initFAQ } from "pages/faq"

document.addEventListener("turbo:load", () => {
  initFAQ()
})

import { initNavbar } from "./navbar";

document.addEventListener("turbo:load", () => {
  initNavbar();
});
