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
});
