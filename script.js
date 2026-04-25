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
      <p style="font-size:12px">© 2026 Iluminem. Todos los derechos reservados.</p>
    </div>
    <div>
      <h4>Contacto</h4>
      <ul>
        <li><a href="mailto:IluminemGIFIS@gmail.com" class="footer-link">✉ IluminemGIFIS@gmail.com</a></li>
        <li><a href="https://www.instagram.com/iluminem.gifis" target="_blank" rel="noopener" class="footer-link instagram"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle;margin-right:6px"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>@iluminem.gifis</a></li>
        <li><a href="https://www.linkedin.com/in/iluminem-gifis" target="_blank" rel="noopener" class="footer-link linkedin"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle;margin-right:6px"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>Iluminem GIFIS</a></li>
        <li><a href="https://www.google.com/maps/search/?api=1&query=ETSIT+UPV+Cami+de+Vera" target="_blank" rel="noopener noreferrer" class="footer-link">
        📍Camí de Vera, ETSIT – UPV<br>
          46022 València · España
      </a></li>
      </ul>
    </div>
    <div>
      <h4>Patrocinadores</h4>
      <div style="display:flex;align-items:center;gap:10px">
        <a href="https://www.upv.es" target="_blank" rel="noopener">
          <img src="assets/LOGO-UPV.png" alt="UPV" style="width:160px;height:auto;cursor:pointer">
        </a>
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
