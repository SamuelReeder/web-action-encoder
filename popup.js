let actions = {};


document.getElementById('clickme').addEventListener('click', function() {
    // check valid input
    const input = document.getElementById('input').value;
    if (input === '') {
        alert('Please enter a valid name');
        return;
    }

    // Send message to start tracking
    chrome.runtime.sendMessage({ action: "startTracking", name: input });
    
    // alert("tracking started");



    window.close(); // This closes the popup
});

//     const exportButton = document.getElementById('export');
//     exportButton.disabled = true;

//     // create action structure
//     let steps = [];

//     // enable close button
//     const closeButton = document.getElementById('closeme');
//     closeButton.disabled = false;
//     closeButton.addEventListener('click', function() {
//         // export action to json
//         // const json = JSON.stringify(action);

//         // save to local storage
//         actions[input] = steps;

//         exportButton.disabled = false;

//     });




//     document.addEventListener('click', function(event) {
//         const element = event.target;
//         const elementDetails = {
//             tag: element.tagName,
//             type: element.type || 'N/A',
//             id: element.id || 'none',
//             classes: element.className || 'none',
//             position: {
//                 x: event.clientX,
//                 y: event.clientY
//             }
//         };

//         steps.push(elementDetails);
//     });


//     alert('Button was clicked!');
// });


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
        localStorage.setItem('actions', JSON.stringify(response.data));
        document.getElementById('actions').textContent = JSON.stringify(response.data, null, 2);
        alert('Actions exported to local storage');
    });
});
