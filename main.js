import { hidesError, showError } from "./module/ui/reporter.js";

hidesError();

const SVG_EYE_ON = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
const SVG_EYE_OFF = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
const SVG_REMOVE = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

const btnLight = document.getElementById("btn-light");
const btnDark = document.getElementById("btn-dark");
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

/* 2. AUTO-RUN TOGGLE */
const autoToggle = document.getElementById("autorun-toggle");
const autoLabel = document.getElementById("autorun-label");
autoToggle.addEventListener("change", () => {
  const on = autoToggle.checked;
  autoLabel.textContent = on ? "auto-run: on" : "auto-run: off";
  autoLabel.style.color = on ? "var(--c-success)" : "";
});

/* 3. FILE UPLOAD */
const fileInput = document.getElementById("file-upload");
const uploadHint = document.querySelector(".upload-hint");
fileInput.addEventListener("change", () => {
  if (!fileInput.files.length) return;
  const file = fileInput.files[0];
  uploadHint.textContent = file.name;
  uploadHint.style.color = "var(--c-path)";
  const reader = new FileReader();
  reader.onload = (e) => {
    document.querySelector(".input-html .code-textarea").value =
      e.target.result;
  };
  reader.readAsText(file);
});

/* 4. EYE + REMOVE BUTTONS */
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

/* 5. RESET */
document.querySelector(".btn-secondary").addEventListener("click", () => {
  document.querySelector(".input-html .code-textarea").value = "";
  document.querySelector(".input-css .code-textarea").value = "";
  document.getElementById("live-body").innerHTML = `
      <div class="live-empty-icon">⌗</div>
      <div class="live-empty-text">write or upload html above<br/>then hit ▶ run script to preview</div>`;
  uploadHint.textContent = "no file selected";
  uploadHint.style.color = "";
  fileInput.value = "";
});

/* 6. RUN SCRIPT */
const runBtn = document.querySelector(".btn-run");
const liveBody = document.getElementById("live-body");
runBtn.addEventListener("click", () => {
  const html = document
    .querySelector(".input-html .code-textarea")
    .value.trim();
  const css = document.querySelector(".input-css .code-textarea").value.trim();
  if (!html) {
    liveBody.innerHTML = `
        <div class="live-empty-icon" style="color:var(--c-error);opacity:.5">⚠</div>
        <div class="live-empty-text" style="color:var(--c-error)">no html to render — write or upload something first</div>`;
    return;
  }
  runBtn.textContent = "running…";
  setTimeout(() => {
    runBtn.textContent = "▶ run script";
    const styleTag = css ? `<style>${css}</style>` : "";
    const blob = new Blob([styleTag + html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    liveBody.innerHTML = `<iframe src="${url}" style="width:100%;height:300px;border:none;background:#fff;display:block;" onload="URL.revokeObjectURL('${url}')"></iframe>`;
  }, 500);
});

/* 7. AUTO-RUN on input */
document.querySelectorAll(".code-textarea").forEach((ta) => {
  ta.addEventListener("input", () => {
    if (autoToggle.checked) runBtn.click();
  });
});
