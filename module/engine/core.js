import { CHAI_DB } from "../data";
import { showError } from "./module/ui/reporter.js";

function extractDetails(container) {
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

        applyCSS(e, key, value);
      });
    }
  });
}

function applyCSS(name, key, propertyValue) {
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
  });
}
