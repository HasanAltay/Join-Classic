function addHover(img) {
    document.getElementById('clear-icon').src = img;
}

function removeHover(img) {
    document.getElementById('clear-icon').src = img;
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

let tasks = [];

function addTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let category = document.getElementById('task').innerHTML;
    let contacts = document.getElementById('assign').innerHTML;

    let task = {
        "title": title.value,
        "description": description.value,
        "category": category,
        "contacts": contacts
    };

    tasks.push(task);
    console.log(tasks);
    title.value = '';
    description.value = '';
}

function clear_subtaskInput() {
    let typeSubtask = document.getElementById('img-replace');
    typeSubtask.innerHTML = /*html*/`
    <img class="img-cancelSubtask" src='./img/subtask-cancel.png' onclick="clearInputSubtask()">
    <img src="./img/vertical.png">
    <img class="img-addSubtask" src='./img/addSubtask.png' onclick="showSubtask()">
    `;
}

function clearInputSubtask() {
    let input = document.getElementById('inputSubtask');
    input.value = '';
    showDefaultSubtask();
}

function showSubtask() {
    let input = document.getElementById('inputSubtask');
    let subtask = document.getElementById('list_subtask');
    if (input.value == '') { return 0 }
    else {
        subtask.innerHTML += /*html*/`
        <li><input class="checkbox" type="checkbox"><span class="subtask-item">${input.value}</span></li>`;
    }
    clearInputSubtask();
}

function showDefaultSubtask() {
    let defaultSubtask = document.getElementById('img-replace');
    defaultSubtask.innerHTML = /*html*/`
    <img id="img-subtask" class="plus-icon" src="./img/plus.png">
    `;
}

function showCategory() {
    let selection = document.getElementById('contentCategory');
    if (selection.style.display == 'block') {
        selection.style.display = 'none';
    } else {
        selection.style.display = 'block';
    }
}

function urgentButtonDefault() {
    document.getElementById('prioUrgent').style.backgroundColor = "#FFFFFF";
    document.getElementById('whiteUrgent').style.color = "#000000";
    document.getElementById('img-up-white').src = "./img/up.png";
    urgent_clicked = false;
}

function mediumButtonDefault() {
    document.getElementById('prioMedium').style.backgroundColor = "#FFFFFF";
    document.getElementById('whiteMedium').style.color = "#000000";
    document.getElementById('img-middle-white').src = "./img/middle.png";
    medium_clicked = false;
}

function lowButtonDefault() {
    document.getElementById('prioLow').style.backgroundColor = "#FFFFFF";
    document.getElementById('whiteLow').style.color = "#000000";
    document.getElementById('img-down-white').src = "./img/down.png";
    low_clicked = false;
}

let urgent_clicked = false;
let medium_clicked = false;
let low_clicked = false;

function changeToRed() {
    if (urgent_clicked == false) {
        document.getElementById('prioUrgent').style.backgroundColor = "#FF3D00";
        document.getElementById('whiteUrgent').style.color = "#FFFFFF";
        document.getElementById('img-up-white').src = "./img/arrowUpWhite.png";
        urgent_clicked = true;
    } else {
        urgentButtonDefault();
    }
    mediumButtonDefault();
    lowButtonDefault();
}

function changeToOrange() {
    if (medium_clicked == false) {
        document.getElementById('prioMedium').style.backgroundColor = "#FFA800";
        document.getElementById('whiteMedium').style.color = "#FFFFFF";
        document.getElementById('img-middle-white').src = "./img/arrowMiddleWhite.png";
        medium_clicked = true;
    } else {
        mediumButtonDefault();
    }
    urgentButtonDefault();
    lowButtonDefault();
}

function changeToGreen() {
    if (low_clicked == false) {
        document.getElementById('prioLow').style.backgroundColor = "#7AE229";
        document.getElementById('whiteLow').style.color = "#FFFFFF";
        document.getElementById('img-down-white').src = "./img/arrowDownWhite.png";
        low_clicked = true;
    } else {
        lowButtonDefault();
    }
    urgentButtonDefault();
    mediumButtonDefault();
}