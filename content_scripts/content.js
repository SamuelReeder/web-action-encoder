console.log("Content script has been loaded and is running.");

document.addEventListener('click', function(event) {
    const element = event.target;
    const elementDetails = {
        action: "click",
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
    chrome.runtime.sendMessage({
        action: "trackEvent",
        eventDetails: elementDetails
    });
}, { capture: true });

document.addEventListener('keydown', function(event) {
    const keyDetails = {
        action: "keydown",
        key: event.key,
        code: event.code
    };
    console.log("Key pressed:", keyDetails);
    chrome.runtime.sendMessage({
        action: "trackKeyPress",
        keyDetails: keyDetails
    });
});




