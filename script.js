// ─── Componentes compartidos (inline, funciona sin servidor) ─────────────────
const HEADER_HTML = `
<header class="header">
  <div class="container header-inner">
    <a href="index.html" class="logo" aria-label="Iluminem inicio">
      <img src="assets/iluminem-logo.png" alt="Iluminem">
    </a>
    <nav class="nav">
      <a href="index.html"     data-page="index">Inicio</a>
      <a href="productos.html" data-page="productos">Productos</a>
      <a href="nosotros.html"  data-page="nosotros">Sobre nosotros</a>
      <a href="contacto.html"  data-page="contacto">Contacto</a>
    </nav>
    <button class="menu-btn" aria-label="Menú">☰</button>
  </div>
</header>`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container footer-grid">
    <div>
      <img src="assets/iluminem-logo.png" alt="Iluminem">
      <p style="font-style:italic">"Iluminemos nuestra calidad de vida."</p>
    </div>
    <div>
      <h4>Contacto</h4>
      <ul>
        <li><a href="mailto:IluminemGIFIS@gmail.com" class="footer-link">✉ IluminemGIFIS@gmail.com</a></li>
        <li><a href="https://www.instagram.com/iluminem.gifis" target="_blank" rel="noopener" class="footer-link"><img src="assets/Instagram.jpeg"> @iluminem</a></li>
        <li>📍 Valencia, España</li>
      </ul>
      <p style="font-size:12px">© 2026 Iluminem. Todos los derechos reservados.</p>
    </div>
    <div>
      <h4>Patrocinadores</h4>
      <div style="display:flex;align-items:center;gap:10px">
        <img src="assets/LOGO-UPV.png" alt="UPV" style="width:160px;height:auto">
        <img src="assets/GIFIS.png"    alt="GIFIS" style="width:120px;height:auto">
      </div>
    </div>
  </div>
</footer>`;

function loadComponents() {
  const headerEl = document.querySelector("#site-header");
  const footerEl = document.querySelector("#site-footer");
  if (headerEl) headerEl.innerHTML = HEADER_HTML;
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;
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
document.addEventListener("DOMContentLoaded", () => {
  loadComponents();   // 1. Inyectar header y footer (síncrono, funciona con file://)
  markActiveNav();    // 2. Marcar enlace activo
  initMobileMenu();   // 3. Resto de interacciones
  initContactForm();
  initScrollReveal();
});
