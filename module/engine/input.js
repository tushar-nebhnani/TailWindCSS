import { showError } from "../ui/reporter.js";

export function takeHTMLInput() {
  const inputHTML = document.getElementById("html-input");
  if (!inputHTML) {
    showError("Terminal Error: html-input element not found in DOM.");
    return null;
  }
  const htmlContent = inputHTML.value.trim();

  if (!htmlContent) {
    showError("Error 404: No HTML content found.");
    return null;
  }

  return htmlContent;
}

export function takeCSSInput() {
  const inputCSS = document.getElementById("input-css");

  const cssContent = inputCSS.value.trim();

  if (!cssContent) {
    showError("Error 404: No CSS content found.");
    return null;
  }

  return cssContent;
}
