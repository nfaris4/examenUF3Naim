const form = document.getElementById("registration-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const isValid = validateForm();
  if (isValid) {
    alert("Formulari enviat correctament.");
  }
});

function validateForm() {
  let valid = true;

  const fields = {
    full_name: {
      value: document.getElementById("full_name").value.trim(),
      regex: /^[A-Za-zÀ-ÿ\s]+$/,
      error: "El nom només pot contenir lletres i espais."
    },
    username: {
      value: document.getElementById("username").value.trim(),
      regex: /^[A-Za-z][A-Za-z0-9._]{4,14}$/,
      error: "El nom d'usuari ha de començar per una lletra i tenir entre 5 i 15 caràcters."
    },
    email: {
      value: document.getElementById("email").value.trim(),
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      error: "Introdueix un correu electrònic vàlid."
    },
    phone: {
      value: document.getElementById("phone").value.trim(),
      regex: /^(\+34)?\d{9}$/,
      error: "Introdueix un número de telèfon vàlid."
    },
    postal_code: {
      value: document.getElementById("postal_code").value.trim(),
      regex: /^\d{5}$/,
      error: "Introdueix un codi postal vàlid de 5 xifres."
    },
    address: {
      value: document.getElementById("address").value.trim(),
      validate: v => v !== "" && v.length <= 100,
      error: "L'adreça no pot estar buida ni superar els 100 caràcters."
    },
    password: {
      value: document.getElementById("password").value,
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]{8,}$/,
      error: "La contrasenya ha de tenir almenys 8 caràcters, amb majúscules, minúscules, números i símbols especials."
    },
    confirm_password: {
      value: document.getElementById("confirm_password").value,
      validate: v => v === document.getElementById("password").value,
      error: "Les contrasenyes no coincideixen."
    },
    birthdate: {
      value: document.getElementById("birthdate").value,
      validate: function (v) {
        const date = new Date(v);
        const today = new Date();
        const age = today.getFullYear() - date.getFullYear();
        return age > 18 || (age === 18 && today >= new Date(date.setFullYear(date.getFullYear() + 18)));
      },
      error: "Has de ser major d’edat per poder registrar-te."
    },
    terms: {
      value: document.getElementById("terms").checked,
      validate: v => v,
      error: "Has d'acceptar els termes i condicions per continuar."
    }
  };

  for (const key in fields) {
    const field = fields[key];
    const errorDiv = document.getElementById(`error-${key}`);
    let isFieldValid = false;

    if (field.value === "" || field.value === null || field.value === undefined) {
      errorDiv.textContent = "Aquest camp és obligatori.";
      valid = false;
    } else if (field.regex && !field.regex.test(field.value)) {
      errorDiv.textContent = field.error;
      valid = false;
    } else if (field.validate && !field.validate(field.value)) {
      errorDiv.textContent = field.error;
      valid = false;
    } else {
      errorDiv.textContent = "";
      isFieldValid = true;
    }
  }

  return valid;
}
