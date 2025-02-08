const setButton = document.getElementById("btn");
const titleInput = document.getElementById("title");
// setButton.addEventListener("click", () => {
//   const title = titleInput.value;
//   window.electronAPI.setTitle(title);
// });

const { ipcRenderer } = require("electron");

document.getElementById("close-btn").addEventListener("click", () => {
  ipcRenderer.send("close-app");
});

document.getElementById("minimize-btn").addEventListener("click", () => {
  ipcRenderer.send("minimize-app");
});

const today = new Date()
  .toLocaleDateString("en-US", { month: "short", day: "numeric" })
  .replace(" ", ".");
document.getElementById("date").innerHTML = today;
