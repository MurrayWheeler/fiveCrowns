// General utility methods



function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}


// Function to request full screen mode
async function requestFullScreen() {
    try {
        // Going to fullscreen. Need to be linked to a button press (I don't know why)
        // https://wiki.appstudio.dev/How_to_run_fullscreen_in_an_Android_Chrome_app
        document.documentElement.webkitRequestFullScreen();
        console.log('Full screen mode');
    } catch (err) {
        console.error('Failed to go full screen:', err);
    }
}

