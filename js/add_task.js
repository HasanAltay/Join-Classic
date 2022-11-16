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

function addTask() {
    let task = document.getElementById('task').innerHTML;
    let category = document.getElementById('category').innerHTML;
}

function showSubtask() {
    let subtask = document.getElementById('input_subtask');
    document.getElementById('ul_subtask').innerHTML+=`<ul>${subtask.value}</ul>`;
    subtask.value = '';

}

