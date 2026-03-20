const htmlTextArea = document.getElementById("html-textarea");
const runScriptBtn = document.getElementById("run-script-button");

runScriptBtn.addEventListener("click", () => {
  const htmlContent = htmlTextArea.value;
  if (!htmlContent) alert("Please Enter Data.");
  //   console.log(htmlContent);
});
