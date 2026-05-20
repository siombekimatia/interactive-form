const form = document.getElementById("signupForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");

const successMessage = document.getElementById("successMessage");

// Validation Functions

function validateName() {
  const name = nameInput.value.trim();

  if (name === "") {
    showError(nameInput, "nameError", "Name is required");
    return false;
  }

  if (name.length < 3) {
    showError(nameInput, "nameError", "Name must be at least 3 characters");
    return false;
  }

  showSuccess(nameInput, "nameError");
  return true;
}

function validateEmail() {
  const email = emailInput.value.trim();

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    showError(emailInput, "emailError", "Email is required");
    return false;
  }

  if (!emailPattern.test(email)) {
    showError(emailInput, "emailError", "Enter a valid email address");
    return false;
  }

  showSuccess(emailInput, "emailError");
  return true;
}

function validatePhone() {
  const phone = phoneInput.value.trim();

  const phonePattern = /^[0-9]{10}$/;

  if (phone === "") {
    showError(phoneInput, "phoneError", "Phone number is required");
    return false;
  }

  if (!phonePattern.test(phone)) {
    showError(phoneInput, "phoneError", "Phone number must be 10 digits");
    return false;
  }

  showSuccess(phoneInput, "phoneError");
  return true;
}

function validatePassword() {
  const password = passwordInput.value.trim();

  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (password === "") {
    showError(passwordInput, "passwordError", "Password is required");
    return false;
  }

  if (!strongPassword.test(password)) {
    showError(
      passwordInput,
      "passwordError",
      "Password must contain uppercase, lowercase, number and 8+ characters"
    );
    return false;
  }

  showSuccess(passwordInput, "passwordError");
  return true;
}

// Show Error
function showError(input, errorId, message) {
  const errorElement = document.getElementById(errorId);

  errorElement.textContent = message;

  input.classList.add("invalid");
  input.classList.remove("valid");
}

// Show Success
function showSuccess(input, errorId) {
  const errorElement = document.getElementById(errorId);

  errorElement.textContent = "";

  input.classList.add("valid");
  input.classList.remove("invalid");
}

// Real-Time Validation
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
phoneInput.addEventListener("input", validatePhone);
passwordInput.addEventListener("input", validatePassword);

// Focus and Blur Events
const inputs = document.querySelectorAll("input");

inputs.forEach(input => {

  input.addEventListener("focus", () => {
    input.style.backgroundColor = "#f0f8ff";
  });

  input.addEventListener("blur", () => {
    input.style.backgroundColor = "#fff";
  });

});

// Form Submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isPasswordValid = validatePassword();

  if (
    isNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isPasswordValid
  ) {
    successMessage.textContent =
      "Form submitted successfully!";

    form.reset();

    inputs.forEach(input => {
      input.classList.remove("valid");
    });
  } else {
    successMessage.textContent = "";
  }
});