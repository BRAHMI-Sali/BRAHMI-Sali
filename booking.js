document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  const successMessage = document.getElementById("successMessage");
  const cancelBtn = document.getElementById("cancelBtn");

  cancelBtn.addEventListener("click", () => {
    form.reset();
    clearErrors();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    clearErrors();

    if (validateForm()) {
      form.style.display = "none";
      successMessage.classList.remove("hidden");
    }
  });

  function clearErrors() {
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      input.classList.remove("error");
      const errorMsg = input.nextElementSibling;
      if (errorMsg) errorMsg.textContent = "";
    });
  }

  function validateForm() {
    let valid = true;

    const firstName = form.firstName;
    if (!firstName.value.trim() || firstName.value.trim().length < 2) {
      showError(firstName, "Please enter a valid first name (min 2 chars).");
      valid = false;
    }

    const lastName = form.lastName;
    if (!lastName.value.trim() || lastName.value.trim().length < 2) {
      showError(lastName, "Please enter a valid last name (min 2 chars).");
      valid = false;
    }

    const email = form.email;
    if (!email.value.trim() || !validateEmail(email.value.trim())) {
      showError(email, "Please enter a valid email address.");
      valid = false;
    }

    const phone = form.phone;
    if (!phone.value.trim() || !phone.checkValidity()) {
      showError(phone, "Please enter a valid phone number.");
      valid = false;
    }

    const idCard = form.idCard;
    if (idCard.files.length === 0) {
      showError(idCard, "Please upload your identity card (PDF).");
      valid = false;
    } else {
      const file = idCard.files[0];
      if (file.type !== "application/pdf") {
        showError(idCard, "Only PDF files are allowed.");
        valid = false;
      }
    }

    return valid;
  }

  function showError(input, message) {
    input.classList.add("error");
    const errorMsg = input.nextElementSibling;
    if (errorMsg) errorMsg.textContent = message;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }
});