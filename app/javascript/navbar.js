export function initNavbar() {
  const toggle = document.querySelector(".menu-toggle");
  const menus = document.querySelectorAll(".navbar-links");

  if (!toggle || menus.length === 0) return;

  // evita duplicar listeners com Turbo
  if (toggle.dataset.navInit === "true") return;
  toggle.dataset.navInit = "true";

  toggle.addEventListener("click", () => {
    menus.forEach((menu) => menu.classList.toggle("open"));
  });

  // fecha ao clicar em qualquer link
  document.addEventListener("click", (e) => {
    const link = e.target.closest(".navbar-links a");
    if (!link) return;

    menus.forEach((menu) => menu.classList.remove("open"));
  });
}
