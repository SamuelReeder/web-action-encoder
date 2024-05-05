let actions = {};
let trackingActive = false;
let currentActionName = null;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Received message:", request.action);
    switch (request.action) {
        case "startTracking":
            if (trackingActive && currentActionName === request.name) {
                console.warn("Already tracking actions for:", request.name);
                return;
            }
            actions[request.name] = actions[request.name] || {};
            actions[request.name]["steps"] = actions[request.name]["steps"] || [];
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                let currentURL = tabs[0].url;
                console.log("Current URL from background script:", currentURL);
        
                if (!currentURL) {
                    console.warn("Could not get current URL.");
                    sendResponse({status: "Error getting URL"});
                    return;
                }
        
                actions[request.name]["url"] = actions[request.name]["url"] || currentURL;
                trackingActive = true;
                currentActionName = request.name;
                console.log("Tracking started for:", request.name);
                sendResponse({status: "Tracking started", url: currentURL}); 
            });
            return true;

        case "trackEvent":
            console.log("Tracking event:", request.eventDetails);
            if (trackingActive) {
                actions[currentActionName]["steps"].push(request.eventDetails);
                console.log("Event tracked:", request.eventDetails);
            }
            break;
        
        case "trackKeyPress":
            console.log("Tracking key press:", request.keyDetails);
            if (trackingActive) {
                actions[currentActionName]["steps"].push(request.keyDetails);
                console.log("Key press tracked:", request.keyDetails);
            }
            break;
        case "stopTracking":
            if (!trackingActive) {
                console.warn("Not tracking any actions.");
                return;
            }
            trackingActive = false;
            console.log("Tracking stopped for:", currentActionName);
            sendResponse({status: "Tracking stopped", data: actions[currentActionName]});
            currentActionName = null;
            break;

        case "exportActions":
            sendResponse({data: actions});
            break;

        case "clear":
            actions = {};
            trackingActive = false;
            currentActionName = null;
            console.log("Cleared all actions.");
            break;
        
        default:
            console.warn("Unknown action:", request.action);
            break;
    }
});

