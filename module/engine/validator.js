import { showError } from "../ui/reporter.js";

export function isSafe(str) {
  const lowerStr = str.toLowerCase();
  if (lowerStr.includes("<script") || lowerStr.includes("onclick")) {
    showError("SECURITY BREACH: Scripting tokens are forbidden in the buffer.");
    return false;
  }
  return true;
}

export function validHTML(htmlContent) {
  const htmlPattern = /<\/?[a-z][\s\S]*>/i;

  // Check 1: Empty check
  if (!htmlContent) {
    showError("BUFFER EMPTY: Please enter HTML content.");
    return false;
  }

  // Check 2: Pattern Match
  if (!htmlPattern.test(htmlContent)) {
    showError("SYNTAX ERROR: No valid HTML tags detected.");
    return false;
  }

  // Check 3: Security
  if (!isSafe(htmlContent)) return false;

  // Check 4: Structural Integrity (The Virtual Test)
  const virtualDiv = document.createElement("div");
  virtualDiv.innerHTML = htmlContent;

  if (virtualDiv.children.length === 0) {
    showError("DOM ERROR: Input contains text but no renderable elements.");
    return false;
  }
  return true;
}
