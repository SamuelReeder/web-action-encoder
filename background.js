let actions = {};
let trackingActive = false; // Track whether we are currently tracking events

console.log("Background script loaded.");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    if (request.action === "startTracking" || request.action === "stopTracking" || request.action === "exportActions") {
        console.log("Received message:", request.action);
        // Relay message to content script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, request, response => {
                sendResponse(response);
            });
        });
        console.log("Relayed message to content script.");
        return true; // This is important for asynchronous sendResponse
    }
});
