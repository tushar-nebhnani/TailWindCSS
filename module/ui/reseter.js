export function resetList() {
  const appliedList = document.getElementById("applied-list");
  const failedList = document.getElementById("failed-list");
  const appliedCounter = document.getElementById("applied-count");
  const failedCounter = document.getElementById("failed-count");

  appliedCounter.textContent = "✓ 0";
  failedCounter.textContent = "✗ 0";
  appliedList.innerHTML = "";
  failedList.innerHTML = "";
}

export function resetInputFields() {
  const inputHTML = document.getElementById("html-input");
  const inputCSS = document.getElementById("input-css");

  inputCSS.value = "";
  inputHTML.value = "";
}
