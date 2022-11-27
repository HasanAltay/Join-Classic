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
    let category = document.getElementById('new_category');
    let contacts = document.getElementById('new_assigned');
    let date = document.getElementById('due_date');
    let prioStat = setPrioStat();
    let subtasks = document.getElementById('inputSubtask');

    let task = {
        "title": title.value,
        "description": description.value,
        "category": category,
        "contacts": contacts,
        "prio": prioStat,
        "date": date.value,
        "subtasks": subtasks.value
    };

    tasks.push(task);
    console.log(tasks);
    title.value = '';
    description.value = '';
    category = '';
    contacts = '';
    date.value = '';
    subtasks.value = '';
}

function setPrioStat() {
    let status = '';
    if (urgent_clicked) status = "urgent";
    if (medium_clicked) status = "medium";
    if (low_clicked) status = "low";
    return status;  
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
    }
}

function new_category() {
    let new_category = document.getElementById('dropdown');
    new_category.innerHTML = /*html*/`
    <div id="new-category" class="new_category">
        <input id="design" onclick="design()" class="categorybox caret-hidden" type="text" placeholder="New category name" onfocus="this.placeholder=''" onblur="this.placeholder='New category name'">
        <div class="img_new_category">
            <img class="img-cancelSubtask" src='./img/subtask-cancel.png' onclick="clearCategory()">
            <img src="./img/vertical.png">
            <img class="img-addSubtask" src='./img/addSubtask.png' onclick="design()">
        </div>
    </div>
    `;
    document.getElementById('color-picker').innerHTML = /*html*/`
    <div class="img-color-picker" id="img-picker">
        <img id="picker" src="./img/color-picker.png">
    </div>
    `;
}

function clearCategory() {
    document.getElementById('new-category').classList.remove("new_category");
    document.getElementById('img-picker').classList.add("d-none");
    document.getElementById('new-category').innerHTML = /*html*/`
    <div onclick="dropdownClear()" id="new_category" class="dropdown-container">
        <div class="categorybox">Select task category</div>
        <div><img src="./img/open.png"></div>
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

function dropdownClear() {
    document.getElementById("content-sales").classList.toggle("show");
}

function showSales() {
    let showSales = document.getElementById('dropdown');
    showSales.innerHTML = /*html*/`
    <div onclick="dropdownSales()" id="new-category" class="new_category">
        <div>
            <input id="design" class="categorybox sales caret-hidden" type="text" value="Sales">
            <img class="img-sales" src="./img/sales-img.png">
        </div>
        <img src="./img/open.png">     
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

function dropdownSales() {
    document.getElementById("content-sales").classList.toggle("show");
}

function backOffice() {
    let backOffice = document.getElementById('dropdown');
    backOffice.innerHTML = /*html*/`
    <div onclick="dropdownOffice()" id="new-category" class="new_category">
        <div>
            <input id="design" class="categorybox backoffice caret-hidden" type="text" value="Backoffice">
            <img class="img-sales" src="./img/backoffice-img.png">
        </div>
        <img src="./img/open.png">     
   </div>
   <div class="dropdown-content" id="content-office">
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

function dropdownOffice() {
    document.getElementById("content-office").classList.toggle("show");
}

function design() {
    document.getElementById('new-category').innerHTML = /*html*/`
    <input id="design" onclick="click_design()" class="categorybox caret-hidden" type="text" placeholder="New category name" onfocus="this.placeholder=''" onblur="this.placeholder='New category name'">
    <div class="img_new_category">
        <img class="img-cancelSubtask" src='./img/subtask-cancel.png' onclick="clearCategory()">
        <img src="./img/vertical.png">
        <img class="img-addSubtask" src='./img/addSubtask.png' onclick="click_design()">
    </div>`;
    document.getElementById('img-picker').classList.remove("d-none");
    document.getElementById('img-picker').innerHTML = "";
    document.getElementById('design').value = "Design";
    document.getElementById('img-picker').innerHTML = /*html*/`
    <img class="color" src="./img/color-1.png">
    <img class="color" src="./img/color-2.png">
    <img class="color" src="./img/color-3.png">
    <img class="color-brown" onclick="pick_brown()" src="./img/color-4.png">
    <img class="color" src="./img/color-5.png">
    <img class="color" src="./img/color-6.png">`;
}

function click_design() {
    document.getElementById('img-picker').classList.add("d-none");
    let design = document.getElementById('design');
    design.value = "Design";
    document.getElementById('new-category').classList.remove("new_category");
    document.getElementById('new-category').innerHTML = /*html*/`
    <div onclick="dropdownDesign()" class="design">
        <div>
            <span class="design-picked">${design.value}</span>
            <img class="img-pick-brown" src="./img/color-4.png">
        </div>
        <img src = "./img/open.png">
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

function dropdownDesign() {
    document.getElementById("dropdownDesign").classList.toggle("show");
}

function pick_brown() {
    document.getElementById('img-picker').classList.add("d-none");
    let design = document.getElementById('design');
    design.value = "";
    design.value = "Design";
    document.getElementById('new-category').classList.remove("new_category");
    document.getElementById('new-category').innerHTML = /*html*/`
    <div onclick="dropdownDesign()" class="design">
        <div>
            <span class="design-picked">${design.value}</span>
            <img class="img-pick-brown" src="./img/color-4.png">
        </div>
        <img src = "./img/open.png">
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
    if (clickedContact == false) {click.innerHTML = /*html*/`
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
        <input id="email" onclick="select_email()" class="categorybox caret-hidden" type="text" placeholder="Contact email" onfocus="this.placeholder=''" onblur="this.placeholder='Contact email'">
        <div class="img_new_category">
            <img class="img-cancelSubtask" src='./img/subtask-cancel.png' onclick="defaultMode()">
            <img src="./img/vertical.png">
            <img class="img-addSubtask" src='./img/addSubtask.png' onclick="select_email()">
        </div>
    </div>
    `;
}

function select_email() {
    document.getElementById('contact').innerHTML = /*html*/`
    <input id="email" onclick="selection()" class="categorybox caret-hidden" type="text" placeholder="New category name" onfocus="this.placeholder=''" onblur="this.placeholder='New category name'">
    <div class="img_new_category">
        <img class="img-cancelSubtask" src='./img/subtask-cancel.png' onclick="defaultMode()">
        <img src="./img/vertical.png">
        <img class="img-addSubtask" src='./img/addSubtask.png' onclick="selection()">
    </div>`;
    document.getElementById('email').value = "laura@gmail.com";
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