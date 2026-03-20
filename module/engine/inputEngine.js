// The job of this is to take a file from the HTML input or the from textarea where the input file has more priority than the text area.
const inputHTML = document.getElementById("html-input");
const runScriptBtn = document.getElementById("run-script-btn");
const livePreviewBody = document.getElementById("live-body");

runScriptBtn.addEventListener("click", () => {
  const htmlContent = inputHTML.value.trim();
  const htmlPattern = /<\/?[a-z][\s\S]*>/i;
  if (!htmlContent) alert("Please enter a valid value in the document.");
  // Validation of the input
  // Step 1: HTML Validator
  if (htmlPattern.test(htmlContent)) {
    // Step 2: HTML Children Count
    livePreviewBody.innerHTML = htmlContent;
    if (livePreviewBody.children.length !== 0) {
      livePreviewBody.innerHTML = htmlContent;
    } else {
      alert("There is a syntax error in the tags.");
    }
  } else {
    alert("no html tags found");
  }
});
