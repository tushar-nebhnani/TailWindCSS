import { CHAI_DB } from "../data";
import { showError } from "./module/ui/reporter.js";

function extractDetails(container) {
  const bodyElements = container.querySelectorAll("*");
  const pattern = "chai-";
  bodyElements.forEach((e) => {
    const elementName = e.tagName;
    classes.push(...e.classList);
    const validClasses = classes.filter(e.startsWith(pattern));
    const invalidClasses = classes.filter(!e.startsWith(pattern));

    if (validClasses.length > 0) {
      validClasses.forEach((className) => {
        const parts = className.split("-");
        const key = parts[1];
        const value = parts[2];

        applyCSS(elementName, key, value);
      });
    } else {
      showError("No valid classes found.");
    }
  });
}

function applyCSS(name, key, propertyValue) {
  const keyProperties = CHAI_DB[key]; // finding the actual mapped value
  let finalValue = propertyValue;

  // performing propertyValue validation
  if (keyProperties[0] === "layout" || keyProperties[0] === "spacing") {
    if (isNaN(propertyValue)) {
      showError("Value must be an number");
    }

    finalValue = propertyValue + "px";
  }

  const cssProperties = keyProperties.slice(1);
  cssProperties.forEach((property) => {
    name.style[property] = finalValue; // applying css
  });
}
