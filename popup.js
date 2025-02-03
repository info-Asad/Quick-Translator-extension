document.getElementById("saveSettings").addEventListener("click", () => {
  const inputLang = document.getElementById("inputLang").value;
  const outputLang = document.getElementById("outputLang").value;

  chrome.storage.sync.set({ inputLang, outputLang }, () => {
    alert("Settings saved!");
  });
});
