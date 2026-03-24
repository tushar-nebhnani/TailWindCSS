import { showError } from "../ui/reporter.js";

export function fileUpload() {
  const uploadBtn = document.getElementById("file-upload");
  const inputHTML = document.getElementById("html-input");
  const spanText = document.getElementById("upload-details");

  function readFile(event) {
    const file = event.target.files[0];
    if (!file) {
      showError("Please upload a file.");
    }
    if (!file.name.toLowerCase().endsWith(".html")) {
      showError(
        `Please upload a html document with the extension .html, ${file.name} is not a valid file.`,
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      inputHTML.value = e.target.result;
      spanText.textContent = `uploaded file: ${file.name}`;
    };

    reader.onerror = function (e) {
      showError(`Error reading file: ${e.target.error}`);
    };

    reader.readAsText(file);
  }
  uploadBtn.addEventListener("change", readFile);
}
