let actions = {};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "startTracking") {
        if (actions[request.name]) {
            console.warn("Already tracking actions.");
            return;
        }

        console.log("Tracking started for:", request.name);
        actions[request.name] = [];

        document.addEventListener('click', function(event) {
            const element = event.target;
            const elementDetails = {
                tag: element.tagName,
                type: element.type || 'N/A',
                id: element.id || 'none',
                classes: element.className || 'none',
                position: {
                    x: event.clientX,
                    y: event.clientY
                }
            };
            console.log("Element clicked:", elementDetails);
            actions[request.name].push(elementDetails);
        }, {capture: true});
        sendResponse({status: "Tracking started"});
    } else if (request.action === "stopTracking") {
        console.log("Tracking stopped for:", request.name);
        sendResponse({status: "Tracking stopped", data: actions[request.name]});
    } else if (request.action === "exportActions") {
        sendResponse({data: actions});
    }
    return true;
});


