// ─── Component Loader ───────────────────────────────────────────────────────
// Detecta la página actual comparando el nombre del archivo HTML con data-page
async function loadComponent(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    el.innerHTML = await res.text();
  } catch (e) {
    console.warn(`No se pudo cargar ${url}:`, e);
  }
}

function markActiveNav() {
  // Extrae el nombre del archivo sin extensión: "productos.html" → "productos"
  const page = location.pathname.split("/").pop().replace(".html", "") || "index";
  document.querySelectorAll(".nav a[data-page]").forEach((a) => {
    a.classList.toggle("active", a.dataset.page === page);
  });
}

// ─── Mobile Menu ─────────────────────────────────────────────────────────────
function initMobileMenu() {
  const btn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen);
  });
  // Cerrar menú al hacer clic en un enlace
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") nav.classList.remove("open");
  });
}

// ─── Formulario de contacto ───────────────────────────────────────────────────
function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.style.display = "none";
    document.querySelector("#form-success").style.display = "block";
  });
}

// ─── Scroll Reveal ───────────────────────────────────────────────────────────
function initScrollReveal() {
  const SELECTORS = [
    "section .container > *",
    ".grid-2 > *",
    ".grid-2-equal > *",
    ".grid-3 > *",
    ".team-grid > *",
    ".product",
    ".form-card",
    "aside .info-row",
    ".cta-box",
  ];

  const items = new Set();
  SELECTORS.forEach((sel) =>
    document.querySelectorAll(sel).forEach((el) => items.add(el))
  );

  // Excluir elementos dentro del hero (ya visibles al cargar)
  const hero = document.querySelector(".hero");
  items.forEach((el) => {
    if (hero?.contains(el)) items.delete(el);
  });

  items.forEach((el) => el.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = Array.from(el.parentElement?.children ?? []).filter(
          (s) => s.classList.contains("reveal")
        );
        el.style.transitionDelay = `${Math.max(0, siblings.indexOf(el)) * 100}ms`;
        el.classList.add("is-visible");
        observer.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  // 1. Inyectar header y footer
  await Promise.all([
    loadComponent("#site-header", "_header.html"),
    loadComponent("#site-footer", "_footer.html"),
  ]);

  // 2. Marcar enlace activo DESPUÉS de inyectar el header
  markActiveNav();

  // 3. Resto de interacciones
  initMobileMenu();
  initContactForm();
  initScrollReveal();
});
