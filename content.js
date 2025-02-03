document.addEventListener("mouseup", async (event) => {
    const selectedText = window.getSelection().toString().trim();
    if (!selectedText) return;

    chrome.storage.sync.get(["inputLang", "outputLang"], async (settings) => {
        const { inputLang = "en", outputLang = "ur" } = settings;

        const translatedText = await translateText(selectedText, inputLang, outputLang);

        showPopup(translatedText, event);
    });
});

async function translateText(text, from, to) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.responseData.translatedText;
    } catch (error) {
        console.error("Translation error:", error);
        return "Translation failed.";
    }
}

function showPopup(text, event) {
    const popup = document.createElement("div");
    popup.innerText = text;
    popup.style.position = "absolute";
    popup.style.background = "black";
    popup.style.color = "white";
    popup.style.padding = "20px 20px";
    popup.style.borderRadius = "5px";
    popup.style.zIndex = "9999";
    popup.style.maxWidth = "500px";
    popup.style.whiteSpace = "pre-wrap";
    popup.style.fontSize = "18px";

    const range = window.getSelection().getRangeAt(0);
    const rect = range.getBoundingClientRect();
    popup.style.top = `${rect.bottom + window.scrollY + 10}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;

    document.body.appendChild(popup);

    let timeoutId = setTimeout(() => popup.remove(), 3000);

    popup.addEventListener("mouseenter", () => {
        clearTimeout(timeoutId);
    });

    popup.addEventListener("mouseleave", () => {
        timeoutId = setTimeout(() => popup.remove(), 2000);
    });
}
