import { hidesError } from "./module/ui/reporter.js";
import { takeHTMLInput } from "./module/engine/input.js";
import { validHTML } from "./module/engine/validator.js";
import { resetInputFields, resetList } from "./module/ui/reseter.js";
import { extractDetails } from "./module/engine/core.js";
hidesError();

const SVG_EYE_ON = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
const SVG_EYE_OFF = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
const SVG_REMOVE = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
const btnLight = document.getElementById("btn-light");
const btnDark = document.getElementById("btn-dark");

// dark-light mode
btnLight.addEventListener("click", () => {
  document.documentElement.setAttribute("data-theme", "light");
  btnLight.classList.add("active");
  btnDark.classList.remove("active");
});
btnDark.addEventListener("click", () => {
  document.documentElement.setAttribute("data-theme", "dark");
  btnDark.classList.add("active");
  btnLight.classList.remove("active");
});

// eye-remove button in the applied css
document.querySelectorAll(".style-row").forEach((row) => {
  const eyeBtn = row.querySelector(".eye-btn");

  /* inject remove button */
  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.title = "Remove rule";
  removeBtn.innerHTML = SVG_REMOVE;
  row.appendChild(removeBtn);

  /* eye toggle */
  eyeBtn.addEventListener("click", () => {
    const isOn = eyeBtn.dataset.on !== "false";
    eyeBtn.dataset.on = isOn ? "false" : "true";
    eyeBtn.innerHTML = isOn ? SVG_EYE_OFF : SVG_EYE_ON;
    eyeBtn.classList.toggle("off", isOn);
    row.classList.toggle("hidden", isOn);
  });

  /* remove */
  removeBtn.addEventListener("click", () => {
    row.style.transition = "opacity .18s, transform .18s";
    row.style.opacity = "0";
    row.style.transform = "translateX(10px)";
    setTimeout(() => row.remove(), 180);
  });
});

////////////////////////////////////////////////////////////////////////
const runBtn = document.getElementById("run-script-btn");
const livePreviewBody = document.getElementById("live-body");
const resetBtn = document.getElementById("reset-button");

function fullReset() {
  resetInputFields();
  resetList();
  hidesError();
  livePreviewBody.innerHTML =
    ' <div class="live-empty-text"> write or upload html above <br /> then hit ▶ run script to preview </div> ';
}

runBtn.addEventListener("click", () => {
  const data = takeHTMLInput();
  // if the data is valid it will automatically load into the preview option
  if (validHTML(data)) {
    console.log(data);
    livePreviewBody.innerHTML = data;
    extractDetails(livePreviewBody);
  }
});

resetBtn.addEventListener("click", fullReset);
