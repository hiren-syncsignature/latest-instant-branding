console.log("Hello from background")

console.log("Background script loaded.");

chrome.action.onClicked.addListener((tab) => {
  if (tab.id && tab.url?.startsWith("https://www.linkedin.com/")) {
    console.log("Action clicked on LinkedIn tab:", tab.id);
    chrome.tabs.sendMessage(tab.id, { action: "toggleSidebar" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message:", chrome.runtime.lastError.message);
        // Potentially inject content script here if it wasn't loaded
        // chrome.scripting.executeScript(...)
      } else {
        console.log("Message sent, response:", response);
      }
    });
  } else {
    console.log("Action clicked on non-LinkedIn tab or tab ID missing.");
  }
});