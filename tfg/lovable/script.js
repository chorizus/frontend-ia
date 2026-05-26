/* =========================================================
   Flowdeck — script.js
   - Toggle de navegación móvil
   - Año dinámico en footer
   - Validación accesible del formulario de contacto
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Año dinámico ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Navegación móvil ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.getElementById("primary-nav");

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.querySelector(".visually-hidden").textContent = isOpen
        ? "Cerrar menú"
        : "Abrir menú";
    });

    // Cierra el menú al hacer clic en un enlace (mejor UX móvil)
    navList.addEventListener("click", (e) => {
      if (e.target.tagName === "A" && navList.classList.contains("is-open")) {
        navList.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Formulario de contacto ---------- */
  const form = document.getElementById("contact-form");
  if (!form) return;

  // Reglas de validación declarativas (DRY)
  // Regex estricta: usuario + dominio con etiquetas válidas + TLD ≥2 letras.
  const EMAIL_RE =
    /^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

  const rules = {
    name: [
      { test: (v) => v.length > 0, msg: "El nombre es obligatorio." },
      { test: (v) => v.length >= 2, msg: "Mínimo 2 caracteres." },
      { test: (v) => v.length <= 80, msg: "Máximo 80 caracteres." },
    ],
    email: [
      { test: (v) => v.length > 0, msg: "El email es obligatorio." },
      { test: (v) => EMAIL_RE.test(v), msg: "Introduce un email válido." },
      { test: (v) => v.length <= 120, msg: "Máximo 120 caracteres." },
    ],
    message: [
      { test: (v) => v.length > 0, msg: "El mensaje es obligatorio." },
      { test: (v) => v.length >= 10, msg: "Cuéntanos un poco más (mín. 10 caracteres)." },
      { test: (v) => v.length <= 1000, msg: "Máximo 1000 caracteres." },
    ],
  };

  /**
   * Valida un campo y refleja el estado en el DOM mediante clases.
   * Devuelve true si el campo es válido.
   */
  function validateField(name) {
    const input = form.elements.namedItem(name);
    if (!input) return true;

    const value = input.value.trim();
    const field = input.closest(".field");
    const errorEl = document.getElementById(`${name}-error`);

    const failed = rules[name].find((r) => !r.test(value));

    if (failed) {
      field.classList.add("is-error");
      field.classList.remove("is-success");
      input.setAttribute("aria-invalid", "true");
      if (errorEl) errorEl.textContent = failed.msg;
      return false;
    }

    field.classList.remove("is-error");
    field.classList.add("is-success");
    input.removeAttribute("aria-invalid");
    if (errorEl) errorEl.textContent = "";
    return true;
  }

  // Validación on-blur por campo
  Object.keys(rules).forEach((name) => {
    const input = form.elements.namedItem(name);
    if (!input) return;
    input.addEventListener("blur", () => validateField(name));
    input.addEventListener("input", () => {
      // Limpia errores en cuanto el usuario corrige
      const field = input.closest(".field");
      if (field.classList.contains("is-error")) validateField(name);
    });
  });

  // Submit
  const statusEl = document.getElementById("form-status");
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.className = "form__status";
    statusEl.textContent = "";

    const results = Object.keys(rules).map(validateField);
    const allValid = results.every(Boolean);

    if (!allValid) {
      statusEl.classList.add("is-error");
      statusEl.textContent = "Revisa los campos marcados antes de enviar.";
      // Devuelve foco al primer error
      const firstError = form.querySelector(".field.is-error .field__input");
      if (firstError) firstError.focus();
      return;
    }

    // Simulación de envío (no hay backend en esta entrega estática)
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Enviando…";

    try {
      await new Promise((res) => setTimeout(res, 900));
      statusEl.classList.add("is-success");
      statusEl.textContent =
        "¡Gracias! Hemos recibido tu mensaje. Te respondemos en menos de 24 h hábiles.";
      form.reset();
      form.querySelectorAll(".field").forEach((f) =>
        f.classList.remove("is-success", "is-error")
      );
    } catch {
      statusEl.classList.add("is-error");
      statusEl.textContent = "Hubo un problema al enviar. Inténtalo de nuevo.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
})();
