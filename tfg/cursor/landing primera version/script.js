const form = document.querySelector("#contact-form");
const submitButton = form?.querySelector('button[type="submit"]');
const feedbackNode = document.querySelector("#form-feedback");

const fields = {
  name: document.querySelector("#name"),
  email: document.querySelector("#email"),
  message: document.querySelector("#message"),
};

const validators = {
  name(value) {
    if (!value.trim()) return "El nombre es obligatorio.";
    if (value.trim().length < 2) return "El nombre debe tener al menos 2 caracteres.";
    return "";
  },
  email(value) {
    if (!value.trim()) return "El email es obligatorio.";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value.trim())) return "Introduce un email valido.";
    return "";
  },
  message(value) {
    if (!value.trim()) return "El mensaje es obligatorio.";
    if (value.trim().length < 10) return "El mensaje debe tener al menos 10 caracteres.";
    return "";
  },
};

function getFieldContainer(fieldName) {
  return document.querySelector(`.form-field[data-field="${fieldName}"]`);
}

function getErrorNode(fieldName) {
  return document.querySelector(`#${fieldName}-error`);
}

function setFieldState(fieldName, status, message = "") {
  const field = fields[fieldName];
  const container = getFieldContainer(fieldName);
  const errorNode = getErrorNode(fieldName);

  if (!field || !container || !errorNode) return;

  container.classList.remove("is-valid", "is-invalid");
  field.removeAttribute("aria-invalid");

  if (status === "invalid") {
    container.classList.add("is-invalid");
    field.setAttribute("aria-invalid", "true");
    errorNode.textContent = message;
    return;
  }

  if (status === "valid") {
    container.classList.add("is-valid");
  }

  errorNode.textContent = "";
}

function setFormFeedback(message, status = "") {
  if (!feedbackNode) return;
  feedbackNode.textContent = message;
  feedbackNode.classList.remove("is-success", "is-error");
  if (status) {
    feedbackNode.classList.add(status === "success" ? "is-success" : "is-error");
  }
}

function validateField(fieldName) {
  const field = fields[fieldName];
  if (!field || !validators[fieldName]) return true;

  const errorMessage = validators[fieldName](field.value);

  if (errorMessage) {
    setFieldState(fieldName, "invalid", errorMessage);
    return false;
  }

  setFieldState(fieldName, "valid");
  return true;
}

function clearFormFieldStates() {
  Object.keys(fields).forEach((fieldName) => setFieldState(fieldName, "default"));
}

function registerFieldValidation() {
  Object.entries(fields).forEach(([fieldName, field]) => {
    if (!field) return;

    field.addEventListener("blur", () => {
      validateField(fieldName);
    });

    field.addEventListener("input", () => {
      const container = getFieldContainer(fieldName);
      if (container?.classList.contains("is-invalid")) {
        validateField(fieldName);
      }
    });
  });
}

function handleSubmit(event) {
  event.preventDefault();
  setFormFeedback("");

  const allValid = Object.keys(fields).every((fieldName) => validateField(fieldName));

  if (!allValid) {
    setFormFeedback("Revisa los campos marcados para poder enviar el formulario.", "error");
    return;
  }

  if (!submitButton) return;
  submitButton.disabled = true;
  submitButton.textContent = "Enviando...";
  setFormFeedback("Enviando mensaje...", "");

  // Simula una llamada a backend manteniendo feedback accesible para el usuario.
  window.setTimeout(() => {
    form?.reset();
    clearFormFieldStates();
    setFormFeedback("Mensaje enviado correctamente. Te responderemos en menos de 24 horas.", "success");
    submitButton.disabled = false;
    submitButton.textContent = "Enviar mensaje";
  }, 900);
}

if (form) {
  registerFieldValidation();
  form.addEventListener("submit", handleSubmit);
}
