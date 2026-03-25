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
      spanText.style.color = "green";
      spanText.textContent = `uploaded file: ${file.name}`;
    };

    reader.onerror = function (e) {
      showError(`Error reading file: ${e.target.error}`);
    };

    reader.readAsText(file);
  }
  uploadBtn.addEventListener("change", readFile);
}

export function demoBtn() {
  const demoBtn = document.getElementById("demo-btn");
  const inputHTML = document.getElementById("html-input");
  const spanText = document.getElementById("upload-details");

  const data =
    '<!doctype html> <html lang="en"> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Document</title></head><body><h1 class="chai-bg-red tushar chai-p-4">Welcome to the Live Preview.</h1><p class="chai-bg-pink nebhnani chai-t-purple chai-opacity-100">  Not that easy to build it is.</p></body></html>';

  demoBtn.addEventListener("click", () => {
    inputHTML.value = data;
    spanText.style.color = "green";
    spanText.textContent = `demo data added. Try the Engine.`;
  });
}
