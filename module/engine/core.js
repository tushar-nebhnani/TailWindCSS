import { CHAI_DB } from "../data/index.js";
import { showError } from "../ui/reporter.js";
import { addToAppliedList, addToFailedList } from "../ui/setterList.js";

export function extractDetails(container) {
  const bodyElements = container.querySelectorAll("*");

  let successCount = 0;
  let failedCount = 0;
  const pattern = "chai-";

  bodyElements.forEach((e) => {
    let classes = [];
    classes.push(...e.classList);
    const validClasses = classes.filter((c) => c.startsWith(pattern));
    const invalidClasses = classes.filter((c) => !c.startsWith(pattern));

    invalidClasses.forEach((className) => {
      console.log("sjabda");
      addToFailedList(className, "not a chai class");
    });

    if (validClasses.length > 0) {
      validClasses.forEach((className) => {
        const parts = className.split("-");
        const key = parts[1];
        const value = parts[2];

        const result = applyCSS(e, key, value);
        if (result.isApplied) {
          addToAppliedList(e, className, result.cleanProps, result.finalValue);
        } else {
          addToFailedList(className, result.reason);
        }
      });
    }
  });
}

export function applyCSS(name, key, propertyValue) {
  let reason = "";
  const keyProperties = CHAI_DB[key];

  if (!keyProperties) {
    showError("Invalid chai class.");
    reason = "Unknown utility";
    return { isApplied: false, finalValue: null, cleanProps: [], reason };
  }

  const category = keyProperties[0];
  let finalValue = propertyValue;

  if (category === "layout" || category === "spacing") {
    if (isNaN(propertyValue)) {
      showError("Value must be a number");
      reason = "Value needs to be a number for this property.";
      return { isApplied: false, finalValue: null, cleanProps: [], reason };
    }
    finalValue = propertyValue + "px";
  }

  let isApplied = false;
  const cleanProps = keyProperties.slice(1);
  cleanProps.forEach((property) => {
    name.style[property] = finalValue;
    if (name.style[property]) {
      isApplied = true;
    }
  });

  return {
    isApplied,
    finalValue,
    cleanProps,
    reason,
  };
}
