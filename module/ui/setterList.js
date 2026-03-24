const SVG_EYE_ON = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;

const SVG_EYE_OFF = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

const SVG_REMOVE = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

function updateCounts() {
  const appliedCount = document.getElementById("applied-count");
  const failedCount = document.getElementById("failed-count");

  if (appliedCount) {
    const n = document
      .getElementById("applied-list")
      .querySelectorAll(".style-row").length;
    appliedCount.textContent = `✓ ${n}`;
  }

  if (failedCount) {
    const n = document
      .getElementById("failed-list")
      .querySelectorAll(".fail-row").length;
    failedCount.textContent = `✗ ${n}`;
  }
}

export function addToAppliedList(targetElement, className, mappedKey, value) {
  const appliedList = document.getElementById("applied-list");

  // prevent duplicates
  const existing = appliedList.querySelector(
    `[data-classname="${CSS.escape(className)}"]`,
  );
  if (existing) return;

  const liDiv = document.createElement("div");
  liDiv.classList = "style-row";
  liDiv.dataset.classname = className;
  liDiv.dataset.mappedKey = mappedKey;
  liDiv.dataset.value = value;

  liDiv.innerHTML = `
    <button class="eye-btn" title="Toggle visibility">${SVG_EYE_ON}</button>
    <span class="style-name">${className} ( ${mappedKey}: ${value} )</span>
  `;

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.title = "Remove rule";
  removeBtn.innerHTML = SVG_REMOVE;
  liDiv.appendChild(removeBtn);

  // eye toggle
  const eyeBtn = liDiv.querySelector(".eye-btn");
  eyeBtn.addEventListener("click", () => {
    const isOn = eyeBtn.dataset.on !== "false";
    eyeBtn.dataset.on = isOn ? "false" : "true";
    eyeBtn.innerHTML = isOn ? SVG_EYE_OFF : SVG_EYE_ON;
    eyeBtn.classList.toggle("off", isOn);
    liDiv.classList.toggle("hidden", isOn);

    targetElement.style[mappedKey] = isOn ? "" : value;
  });

  // remove
  removeBtn.addEventListener("click", () => {
    targetElement.style[mappedKey] = "";
    liDiv.style.transition = "opacity .18s, transform .18s";
    liDiv.style.opacity = "0";
    liDiv.style.transform = "translateX(10px)";
    setTimeout(() => {
      liDiv.remove();
      updateCounts();
    }, 180);
  });

  appliedList.appendChild(liDiv);
  updateCounts();
}

export function addToFailedList(className, reason = "unknown error") {
  const failedList = document.getElementById("failed-list");

  // prevent duplicates
  const existing = failedList.querySelector(
    `[data-classname="${CSS.escape(className)}"]`,
  );
  if (existing) return;

  const liDiv = document.createElement("div");
  liDiv.classList = "fail-row";
  liDiv.dataset.classname = className;

  liDiv.innerHTML = `
    <span class="fail-x">✗</span>
    <div style="flex:1">
      <span class="fail-cls">${className}</span>
      <span class="fail-reason">${reason}</span>
    </div>
  `;

  failedList.appendChild(liDiv);
  updateCounts();
}
