// Job: To report the error to the user, and remove the error once the error has been resolved.
export function hidesError() {
  const errorSection = document.querySelector(".error-section");
  const errorMsg = document.querySelector(".error-msg");

  if (errorSection && errorMsg) {
    errorSection.style.display = "none";
    errorMsg.textContent = "";
  }
}

export function showError(message) {
  const errorSection = document.querySelector(".error-section");
  const errorMsg = document.querySelector(".error-msg");

  if (errorSection && errorMsg) {
    errorSection.style.display = "flex";
    errorMsg.textContent = message;
  }
}
