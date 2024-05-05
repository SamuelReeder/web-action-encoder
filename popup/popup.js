let actions = {};


document.getElementById('clickme').addEventListener('click', function() {
    // check valid input
    const input = document.getElementById('input').value;
    if (input === '') {
        alert('Please enter a valid name');
        return;
    }

    chrome.runtime.sendMessage({ action: "startTracking", name: input });
    
    window.close();
});

document.getElementById('closeme').addEventListener('click', function() {
    // Send message to stop tracking
    chrome.runtime.sendMessage({action: "stopTracking"}, response => {
        if (response.status === "Tracking stopped") {
            console.log("Data ready for export:", response.data);
        }
    });

});


document.getElementById('export').addEventListener('click', function() {
    chrome.runtime.sendMessage({action: "exportActions"}, response => {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(response.data, null, 2));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", "actions.json");
        document.body.appendChild(downloadAnchorNode); // Required for Firefox
        downloadAnchorNode.click();
        // Delay the removal to ensure Firefox processes the click
        setTimeout(() => {
            downloadAnchorNode.remove();
        }, 100); // 100 milliseconds should be enough
        // downloadAnchorNode.remove();
    });
});

document.getElementById('clear').addEventListener('click', function() {
    chrome.runtime.sendMessage({action: "clear"});
});