import { CHAI_DB } from "../data/index.js";
import { showError } from "../ui/reporter.js";

export function extractDetails(container) {
  console.log("extracting details");

  const bodyElements = container.querySelectorAll("*");
  const pattern = "chai-";
  bodyElements.forEach((e) => {
    let classes = [];
    classes.push(...e.classList);
    const validClasses = classes.filter((e) => e.startsWith(pattern));
    const invalidClasses = classes.filter((e) => !e.startsWith(pattern));

    if (validClasses.length > 0) {
      validClasses.forEach((className) => {
        const parts = className.split("-");
        const key = parts[1];
        const value = parts[2];
        console.log("applying css");

        applyCSS(e, key, value);
      });
    }
  });
}

export function applyCSS(name, key, propertyValue) {
  let successCount = 0;
  let failedCount = 0;
  const appliedCounter = document.getElementById("applied-count");
  const keyProperties = CHAI_DB[key]; // finding the actual mapped value
  if (!keyProperties) showError("Invalid chai class.");
  const category = keyProperties[0];
  let finalValue = propertyValue;

  // performing propertyValue validation
  if (category === "layout" || category === "spacing") {
    if (isNaN(propertyValue)) {
      showError("Value must be an number");
      return;
    }

    finalValue = propertyValue + "px";
  }

  const cleanProps = keyProperties.slice(1);
  cleanProps.forEach((property) => {
    name.style[property] = finalValue; // applying css
    successCount++;
  });
  appliedCounter.textContent = `✓ ${successCount}`;
}
