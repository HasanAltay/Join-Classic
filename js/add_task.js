function addHover(img) {
    document.getElementById('clear-icon').src= img;
}

function removeHover(img) {
    document.getElementById('clear-icon').src= img;
}

function activeMode(img) {
    document.getElementById('bright-button').classList.add('defaultButton');
    document.getElementById('clear-icon').src = img;
    console.log('active');
}

function inactiveMode(img) {
    document.getElementById('bright-button').classList.remove('defaultButton');
    document.getElementById('clear-icon').src = img;
    console.log('inactive');
}

