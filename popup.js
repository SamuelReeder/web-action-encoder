let actions = {};

// detect browser being used
const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
const isFirefox = typeof InstallTrigger !== 'undefined';


document.getElementById('clickme').addEventListener('click', function() {

    // check valid input
    const input = document.getElementById('input').value;
    if (input === '') {
        alert('Please enter a valid name');
        return;
    }

    const exportButton = document.getElementById('export');
    exportButton.disabled = true;

    // create action structure
    let steps = [];

    // enable close button
    const closeButton = document.getElementById('closeme');
    closeButton.disabled = false;
    closeButton.addEventListener('click', function() {
        // export action to json
        // const json = JSON.stringify(action);

        // save to local storage
        actions[input] = steps;

        exportButton.disabled = false;

    });




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

        steps.push(elementDetails);
    });


    alert('Button was clicked!');
});


document.getElementById('export').addEventListener('click', function() {
    // export actions to json
    const json = JSON.stringify(actions);

    // save to local storage
    localStorage.setItem('actions', json);

    document.getElementById('actions').innerHTML = json;
    alert('Actions exported to local storage');
});