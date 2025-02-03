chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
      inputLang: "en",
      outputLang: "ur",
      outputType: "popup"
  });
});
