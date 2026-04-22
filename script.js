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
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" }
        });
        if (response.ok) {
          form.style.display = "none";
          document.querySelector("#form-success").style.display = "block";
        } else {
          alert("Ha habido un error al enviar. Inténtalo de nuevo.");
        }
      } catch {
        alert("Ha habido un error al enviar. Inténtalo de nuevo.");
      }
    });
  }
});
