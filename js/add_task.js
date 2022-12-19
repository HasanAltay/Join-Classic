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
let subtasks = [];
let teamUp = [];

async function addTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let category = document.getElementById('categoryContent');
    let categoryDefault = document.getElementById('dropdownArea');
    let contacts = document.getElementById('new_assigned');
    let date = document.getElementById('due_date');
    let prioStat = setPrioStat();
    let subtask = document.getElementById('inputSubtask');
    let subtaskList = document.getElementById('list_subtask');

    let task = {
        "title": title.value,
        "description": description.value,
        "category": category.innerHTML,
        "categoryColor": clickedColor,
        "contacts": contacts.value,
        "prio": prioStat,
        "date": date.value,
        "subtasks": subtasks,
        "status": "Todo",
        "id": new Date().getTime()
    };

    tasks.push(task);
    console.log(tasks);
    title.value = '';
    description.value = '';
    categoryDefault.innerHTML = /*html*/`
    <div id="dropdown" class="category-selection">
        <div onclick="showCategory()" id="new-category"  class="dropdown-container">
            <div class="categorybox">Select task category</div>
            <img class="open-img" src="./img/open.png">
        </div>
        <div class="dropdown-content" id="content">
        <div onclick="new_category()" class="dropdown-child">
            <span class="dropdown-item">New category</span>
        </div>
        <div onclick="showSales()" class="dropdown-child">
            <span class="dropdown-item">Sales</span>
            <img class="item-img" src="./img/sales-img.png">
        </div>
        <div onclick="backOffice()" class="dropdown-child">
            <span class="dropdown-item">Backoffice</span>
            <img class="item-img" src="./img/backoffice-img.png">
        </div>
    </div>`;
    clickedColor = [];
    contacts.value = '';
    date.value = '';
    subtask.value = '';
    subtaskList.innerHTML = '';
    urgentButtonDefault();
    mediumButtonDefault();
    lowButtonDefault();

    await backend.setItem("tasks", JSON.stringify(tasks));
}

// async function loadArrayFromBackend() {
//     // tasks = getArrayFromBackend('tasks');
//     await downloadFromServer();
//     tasks = JSON.parse(backend.getItem('tasks')) || [];
// }

function clearTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let categoryDefault = document.getElementById('dropdownArea');
    let date = document.getElementById('due_date');
    let subtask = document.getElementById('inputSubtask');
    let subtaskList = document.getElementById('list_subtask');

    title.value = '';
    description.value = '';
    categoryDefault.innerHTML = /*html*/`
    <div id="dropdown" class="category-selection">
        <div onclick="showCategory()" id="new-category"  class="dropdown-container">
            <div class="categorybox">Select task category</div>
            <img class="open-img" src="./img/open.png">
        </div>
        <div class="dropdown-content" id="content">
        <div onclick="new_category()" class="dropdown-child">
            <span class="dropdown-item">New category</span>
        </div>
        <div onclick="showSales()" class="dropdown-child">
            <span class="dropdown-item">Sales</span>
            <img class="item-img" src="./img/sales-img.png">
        </div>
        <div onclick="backOffice()" class="dropdown-child">
            <span class="dropdown-item">Backoffice</span>
            <img class="item-img" src="./img/backoffice-img.png">
        </div>
    </div>`;
    clickedColor = [];
    date.value = '';
    subtask.value = '';
    subtaskList.innerHTML = '';
    urgentButtonDefault();
    mediumButtonDefault();
    lowButtonDefault();
}

function setPrioStat() {
    let prioStat = '';
    if (urgent_clicked) prioStat = "Urgent";
    if (medium_clicked) prioStat = "Medium";
    if (low_clicked) prioStat = "Low";
    return prioStat;
}

// function dataSetting() {
//     let dateInput = document.getElementById('due_date');
//     dateInput.value = formatDate();
//     console.log(formatDate());
// }

// function padTo2Digits(num) {
//     return num.toString().padStart(2, '0');
// }

// function formatDate(myDate = new Date()) {
//     return [
//       myDate.getFullYear(),
//       padTo2Digits(myDate.getMonth() + 1),
//       padTo2Digits(myDate.getDate()),
//     ].join('-');
// }

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
        subtasks.push(input.value);
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

function showAssigned() {
    document.getElementById('dropdownAssigned').classList.add('height');
    if (dropdown_clicked == false) {
        document.getElementById("content-assigned").classList.toggle("show");
        document.getElementById("dropdownAssigned").classList.add("dropdown");
        dropdown_clicked = true;
    } else {
        showAssignedDefault();
    }
}

function showAssignedDefault() {
    document.getElementById("content-assigned").classList.toggle("show");
    document.getElementById("dropdownAssigned").classList.remove("dropdown");
    dropdown_clicked = false;
}

let dropdown_clicked = false;
let clickedDropdown = false;

function showCategory() {
    document.getElementById('dropdown').classList.add('height');
    if (clickedDropdown == false) {
        document.getElementById("content").classList.toggle("show");
        document.getElementById("dropdown").classList.add("dropdown");
        clickedDropdown = true;
    } else {
        showCategoryDefault();
    }
}

function showCategoryDefault() {
    document.getElementById("content").classList.toggle("show");
    document.getElementById("dropdown").classList.remove("dropdown");
}

function new_category() {
    let new_category = document.getElementById('dropdown');
    new_category.classList.add('height-default');
    new_category.classList.remove('dropdown');
    new_category.innerHTML = /*html*/`
    <div id="new-category" class="new_category">
        <input id="design" class="categorybox" type="text" placeholder="New category name" onfocus="this.placeholder=''" onblur="this.placeholder='New category name'">
        <div class="img_new_category">
            <img class="img-cancelSubtask" src='./img/subtask-cancel.png' onclick="new_category()">
            <img src="./img/vertical.png">
            <img class="img-addSubtask" src='./img/addSubtask.png' onclick="fillInput()">
        </div>
    </div>
    `;
    document.getElementById('color-picker').innerHTML = /*html*/`
    <div class="img-color-picker" id="img-picker">
        <img class="color" onclick="pick_color(0)" src="./img/color-1.png">
        <img class="color" onclick="pick_color(1)" src="./img/color-2.png">
        <img class="color" onclick="pick_color(2)" src="./img/color-3.png">
        <img class="color" onclick="pick_color(3)" src="./img/color-4.png">
        <img class="color" onclick="pick_color(4)" src="./img/color-5.png">
        <img class="color" onclick="pick_color(5)" src="./img/color-6.png">
        </div>
    `;
}

let allColors = [
    {
        "img": './img/color-1.png',
        "bg-color": '#8AA4FF;'
    },
    {
        "img": './img/color-2.png',
        "bg-color": '#FF0000;'
    },
    {
        "img": './img/color-3.png',
        "bg-color": '#2AD300;'
    },
    {
        "img": './img/color-4.png',
        "bg-color": '#FF8A00;'
    },
    {
        "img": './img/color-5.png',
        "bg-color": '#E200BE;'
    },
    {
        "img": './img/color-6.png',
        "bg-color": '#0038FF;'
    },
    {
        "img": './img/sales-img.png',
        "bg-color": '#FC71FF;'
    },
    {
        "img": './img/backoffice-img.png',
        "bg-color": '#1FD7C1;'
    }
];

let clickedColor = [];

function fillInput() {
    let input = document.getElementById('design');
    if (input.value == '') { return 0 }
    else {
        alert("Please select a color, before you continue!")
    }
}

function pick_color(i) {
    clickedColor.push(allColors[i]['bg-color']);
    document.getElementById('dropdown').classList.remove('height-default');
    document.getElementById('dropdown').classList.remove('height');
    document.getElementById('img-picker').classList.add("d-none");
    let design = document.getElementById('design');
    document.getElementById('new-category').classList.remove("new_category");
    document.getElementById('new-category').innerHTML = /*html*/`
    <div onclick="clearCategory()" class="design">
        <div class="add_changeColor">
            <div class="categorybox design-picked caret-hidden">
                <span id="categoryContent">${design.value}</span>
            </div>
            <img class="color add_setColor" src=${allColors[i]['img']}>
        </div>
        <img class="open-img" src = "./img/open.png">
    </div>
    <div class="dropdown-content" id="dropdownDesign">
        <div onclick="new_category()" class="dropdown-child">
            <span class="dropdown-item">New category</span>
        </div>
        <div onclick="showSales()" class="dropdown-child">
            <span class="dropdown-item">Sales</span>
            <img src="./img/sales-img.png">
        </div>
            <div onclick="backOffice()" class="dropdown-child">
            <span class="dropdown-item">Backoffice</span>
            <img src="./img/backoffice-img.png">
        </div>
    </div>
    `;
}

function clearCategory() {
    document.getElementById('new-category').classList.remove("new_category");
    document.getElementById('img-picker').classList.add("d-none");
    document.getElementById('dropdown').classList.add('dropdown');
    document.getElementById('dropdown').innerHTML = /*html*/`
    <div onclick="dropdownClear()" id="new_category" class="dropdown-container">
        <div class="categorybox">Select task category</div>
        <div><img class="open-img" src="./img/open.png"></div>
    </div>
    <div class="dropdown-content" id="content-clear">
        <div onclick="new_category()" class="dropdown-child">
            <span class="dropdown-item">New category</span>
        </div>
        <div onclick="showSales()" class="dropdown-child">
            <span class="dropdown-item">Sales</span>
            <img class="img-sales-clear" src="./img/sales-img.png">
        </div>
        <div onclick="backOffice()" class="dropdown-child">
            <span class="dropdown-item">Backoffice</span>
            <img class="img-backoffice-clear" src="./img/backoffice-img.png">
        </div>
    </div>`;
}

function dropdownClear() {
    document.getElementById("content-clear").classList.toggle("show");
}

function showSales() {
    clickedColor.push(allColors[6]['bg-color']);
    let showSales = document.getElementById('dropdown');
    showSales.classList.add('height-default');
    showSales.innerHTML = /*html*/`
    <div onclick="defaultModeCategory()" id="new-category" class="new_category">
        <div class="add_changeColor">
            <div class="categorybox design-picked caret-hidden">
               <span id="categoryContent">Sales</span> 
            </div>
            <img class="color add_setColor" src=${allColors[6]['img']}>
        </div>
        <img class="open-img" src="./img/open.png">     
   </div>
    <div class="dropdown-content" id="content-sales">
        <div onclick="new_category()" class="dropdown-child">
            <span class="dropdown-item">New category</span>
        </div>
        <div onclick="showSales()" class="dropdown-child">
            <span class="dropdown-item">Sales</span>
            <img src="./img/sales-img.png">
        </div>
        <div onclick="backOffice()" class="dropdown-child">
            <span class="dropdown-item">Backoffice</span>
            <img src="./img/backoffice-img.png">
        </div>
    </div>`;
}

function backOffice() {
    clickedColor.push(allColors[7]['bg-color']);
    let backOffice = document.getElementById('dropdown');
    backOffice.classList.add('height-default');
    backOffice.innerHTML = /*html*/`
    <div onclick="defaultModeCategory()" id="new-category" class="new_category">
        <div class="add_changeColor">
            <div class="categorybox design-picked caret-hidden">
                <span id="categoryContent">Backoffice</span>
            </div>
            <img class="color add_setColor" src=${allColors[7]['img']}>
        </div>
        <img class="open-img" src="./img/open.png">     
   </div>
   <div class="dropdown-content" id="content-office">
        <div onclick="new_category()" class="dropdown-child">
            <span class="dropdown-item">New category</span>
        </div>
        <div onclick="showSales()" class="dropdown-child">
            <span class="dropdown-item">Sales</span>
            <img class="img-sales" src="./img/sales-img.png">
        </div>
        <div onclick="backOffice()" class="dropdown-child">
            <span class="dropdown-item">Backoffice</span>
            <img class="img-backoffice" src="./img/backoffice-img.png">
        </div>
    </div>`;
}

function defaultModeCategory() {
    document.getElementById('dropdownArea').classList.remove("height-default");
    document.getElementById('dropdownArea').innerHTML = /*html*/`
    <div id="dropdown" class="category-selection">
        <div onclick="showCategory()" id="new-category" class="dropdown-container">
            <div class="categorybox">Select task category</div>
            <img class="open-img" src="./img/open.png">
        </div>
        <div class="dropdown-content" id="content">
            <div onclick="new_category()" class="dropdown-child">
                <span class="dropdown-item">New category</span>
            </div>
            <div onclick="showSales()" class="dropdown-child">
                <span class="dropdown-item">Sales</span>
                <img class="item-img" src="./img/sales-img.png">
            </div>
            <div onclick="backOffice()" class="dropdown-child">
                <span class="dropdown-item">Backoffice</span>
                <img class="item-img" src="./img/backoffice-img.png">
            </div>
        </div>
    </div>`;
}

function designCategory() {
    document.getElementById('dropdown').innerHTML = /*html*/`
    <div id="new-category" class="new_category">
        <input id="design" class="categorybox caret-hidden" type="text" placeholder="New category name" onfocus="this.placeholder=''" onblur="this.placeholder='New category name'">
        <div class="img_new_category">
            <img class="img-cancelSubtask" src='./img/subtask-cancel.png' onclick="clearCategory()">
            <img src="./img/vertical.png">
            <img class="img-addSubtask" src='./img/addSubtask.png' onclick="pick_color()">
        </div>
    </div>`;
    document.getElementById('img-picker').classList.remove("d-none");
    document.getElementById('img-picker').innerHTML = "";
    document.getElementById('design').value = "";
    document.getElementById('img-picker').innerHTML = /*html*/`
    <img class="color" src="./img/color-1.png">
    <img class="color" src="./img/color-2.png">
    <img class="color" src="./img/color-3.png">
    <img class="color-brown" onclick="pick_color()" src="./img/color-4.png">
    <img class="color" src="./img/color-5.png">
    <img class="color" src="./img/color-6.png">`;
}

let clickedYou = false;
let clickedContact = false;

function clickyou(event) {
    event.stopPropagation();
    let click = document.getElementById('assigned-you');
    if (clickedYou == false) {
        click.innerHTML = /*html*/`
        <span class="dropdown-item">You</span>
        <div id="rectangle">
            <div id="rectangle-clicked"></div>
        </div>`;
        clickedYou = true;
    } else {
        click.innerHTML = /*html*/`
        <span class="dropdown-item">You</span>
        <div id="rectangle"></div>`;
        clickedYou = false;
    }
}

function clickcontact(event) {
    event.stopPropagation();
    let click = document.getElementById('assigned-contact');
    if (clickedContact == false) {
        click.innerHTML = /*html*/`
    <span class="dropdown-item">Laura Numey</span>
    <div id="rectangle">
        <div id="rectangle-clicked"></div>
    </div>`;
        clickedContact = true;
    } else {
        click.innerHTML = /*html*/`
        <span class="dropdown-item">Laura Numey</span>
        <div id="rectangle"></div>`;
        clickedContact = false;
    }
}

function clickinvite() {
    let invite = document.getElementById('dropdownAssigned');
    invite.innerHTML = /*html*/`
    <div id="contact" class="new_category">
        <input id="email" class="categorybox" type="text" placeholder="Contact email" onfocus="this.placeholder=''" onblur="this.placeholder='Contact email'">
        <div class="img_new_category">
            <img class="img-cancelSubtask" src='./img/subtask-cancel.png' onclick="defaultMode()">
            <img src="./img/vertical.png">
            <img class="img-addSubtask" src='./img/addSubtask.png' onclick="selection()">
        </div>
    </div>
    `;
}

function defaultMode() {
    document.getElementById('dropdownAssigned').classList.remove("height-default");
    document.getElementById('dropdownAssigned').innerHTML = /*html*/`
    <div onclick="showAssigned()" id="new_assigned" class="dropdown-container">
        <div class="assignedbox">Select contacts to assign</div>
        <img src="./img/open.png">
    </div>
    <div class="dropdown-content" id="content-assigned">
        <div id="assigned-you" onclick="clickyou(event)" class="dropdown-assigned">
            <span class="dropdown-item">You</span>
            <div id="rectangle"></div>
        </div>
        <div id="assigned-contact" onclick="clickcontact(event)" class="dropdown-assigned">
            <span class="dropdown-item">Laura Numey</span>
            <div id="rectangle"></div>
        </div>
        <div onclick="clickinvite()" class="dropdown-assigned">
            <span class="dropdown-item">Invite new contact</span>
            <img class="img-invite" src="./img/invite-sign.png">
        </div>
    </div>`;
}

function selection() {
    document.getElementById('dropdownAssigned').classList.remove("dropdown");
    document.getElementById('dropdownAssigned').classList.remove("height");
    document.getElementById('dropdownAssigned').classList.add("height-default");
    document.getElementById('dropdownAssigned').innerHTML = /*html*/`
    <div onclick="restartDefault()" id="new_assigned" class="dropdown-container">
        <div class="assignedbox">Select contacts to assign</div>
        <img src="./img/open.png">
    </div>
    <div id="initials">
        <img class="initials" src="./img/contactSM.png">
        <img class="initials" src="./img/contactEV.png">
        <img class="initials" src="./img/contactMV.png">
    </div>
    <div class="dropdown-content" id="content-assigned">
        <div id="assigned-you" onclick="clickyou(event)" class="dropdown-assigned">
            <span class="dropdown-item">You</span>
            <div id="rectangle"></div>
        </div>
        <div id="assigned-contact" onclick="clickcontact(event)" class="dropdown-assigned">
            <span class="dropdown-item">Laura Numey</span>
            <div id="rectangle"></div>
        </div>
        <div onclick="clickinvite()" class="dropdown-assigned">
            <span class="dropdown-item">Invite new contact</span>
            <img class="img-invite" src="./img/invite-sign.png">
        </div>
    </div>`;
    document.getElementById('initials').innerHTML += allColors.filter(initials);
    console.log(allColors.filter(initials));
}

function initials() {
   return allColors[0]['img'];
}

function restartDefault() {
    document.getElementById('dropdownAssigned').classList.add("dropdown");
    document.getElementById('initials').classList.add("d-none");
    document.getElementById('content-assigned').classList.toggle("show");
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

function addPrioUrgentHover() {
    document.getElementById('prioUrgent').classList.add('prio-urgent-hover');
}

function removePrioUrgentHover() {
    document.getElementById('prioUrgent').classList.remove('prio-urgent-hover');
}

function addPrioMediumHover() {
    document.getElementById('prioMedium').classList.add('prio-medium-hover');
}

function removePrioMediumHover() {
    document.getElementById('prioMedium').classList.remove('prio-medium-hover');
}

function addPrioLowHover() {
    document.getElementById('prioLow').classList.add('prio-low-hover');
}

function removePrioLowHover() {
    document.getElementById('prioLow').classList.remove('prio-low-hover');
}