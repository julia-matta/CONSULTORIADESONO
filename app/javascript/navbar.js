export function initNavbar() {
  const toggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("navbarMobileMenu");

  if (!toggle || !mobileMenu) return;

  // evita duplicar listener com Turbo
  if (toggle.dataset.navInit === "true") return;
  toggle.dataset.navInit = "true";

  const closeMenu = () => {
    mobileMenu.classList.remove("open");
    toggle.textContent = "☰";
    toggle.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    mobileMenu.classList.add("open");
    toggle.textContent = "×";
    toggle.setAttribute("aria-expanded", "true");
  };

  // ✅ sempre iniciar fechado
  closeMenu();

  toggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("open");
    if (isOpen) closeMenu();
    else openMenu();
  });

  // fecha ao clicar num link
  mobileMenu.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) closeMenu();
  });

  // fecha com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // se virar desktop, fecha
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMenu();
  });
}
