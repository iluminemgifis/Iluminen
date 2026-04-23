// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");
  if (btn && nav) {
    btn.addEventListener("click", () => nav.classList.toggle("open"));
  }

  // Form submit
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.style.display = "none";
      document.querySelector("#form-success").style.display = "block";
    });
  }

  // Scroll reveal: marca elementos y los anima cuando entran en pantalla
  const selectors = [
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
  selectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => items.add(el));
  });

  // Excluir el hero (ya visible al cargar)
  const hero = document.querySelector(".hero");
  items.forEach((el) => {
    if (hero && hero.contains(el)) items.delete(el);
  });

  // Aplicar clase y delay escalonado por grupo
  items.forEach((el) => el.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          // Delay escalonado entre hermanos para que aparezcan en cascada
          const siblings = Array.from(el.parentElement?.children || []).filter((s) =>
            s.classList.contains("reveal")
          );
          const idx = siblings.indexOf(el);
          el.style.transitionDelay = `${Math.max(0, idx) * 100}ms`;
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach((el) => observer.observe(el));
});
