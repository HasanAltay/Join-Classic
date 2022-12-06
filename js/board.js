let currentDraggedElement;
let urgentClicked = false;
let mediumClicked = false;
let lowClicked = false;
let dropdownClicked = false;
let clicked_You = false;
let clicked_Contact = false;

async function loadArrayFromBackend() {
    // tasks = getArrayFromBackend('tasks');
     await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];    
}

function updateHTML() {
    let todo = tasks.filter(t => t['status'] == 'Todo');

    document.getElementById('todo').innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('todo').innerHTML += generateTodoHTML(element, i);
        BoardPrioColor(i)
    }


    let inProgress = tasks.filter(t => t['status'] == 'In progress');

    document.getElementById('inProgress').innerHTML = '';

    for (let i = 0; i < inProgress.length; i++) {
        const element = inProgress[i];
        document.getElementById('inProgress').innerHTML += generateTodoHTML(element, i);
        BoardPrioColor(i)
    }


    let awaitingFB = tasks.filter(t => t['status'] == 'Awaiting Feedback');

    document.getElementById('awaitingFB').innerHTML = '';

    for (let i = 0; i < awaitingFB.length; i++) {
        const element = awaitingFB[i];
        document.getElementById('awaitingFB').innerHTML += generateTodoHTML(element, i);
        BoardPrioColor(i)
    }


    let done = tasks.filter(t => t['status'] == 'Done');

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateTodoHTML(element, i);
        BoardPrioColor(i)
    }
}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateTodoHTML(element, i) {
    return `<div onclick="openTodoInfo('bo_popUp${i}')" draggable="true" ondragstart="startDragging(${i})" class="bo_todo c-pointer">
              <div class="bo_todo_infos">
                <span class="bo_department font16-400">${element['category']}</span>
                <br>
                  <div class="bo_todo_title font16-700">${element['title']}</div>
                   <div>
                    <div class="font16-400">${element['description']}</div>
                  </div>
                  <br>
                  <div class="bo_todo_contacts_prio">
                    <div>${element['contacts']}</div>
                    <div class="${element['prio']}"><img id="prioTodo${i}" src="./img/up.png"></div>
                  </div>
               </div>
                ${showTodoPopUp(element, i)}
            </div>`;
}

function showTodoPopUp(element, i) {
    return `<div id="bo_popUp${i}" class="bo_pop_up d-none">
             <div class="bo_popup_todo_Info">
                <div id="boPopUpInfo${i}">
                   <button onclick="closeTodoInfo('bo_popUp${i}', event)" class="bo_cancel_btn c-pointer">
                     <img src="./img/cancel.png">
                   </button>
                     <span class="bo_popUp_department">${element['category']}</span>
                     <br>
                     <div class="mt-25 font61-700">${element['title']}</div>
                        <div>
                         <div class="mt-25 font21-400">${element['description']}</div>
                        </div>
                            <div class="mt-25 font21-400 bo-width400"><span class="mr-20 bo_font21-700">Due date:</span>${element['date']}</div>

                            <div class="bo_d-flex mt-25 font21-400"><span class="mr-20 bo_font21-700">Priority:</span>
                                <div class="bo_prio_color" id="boPrioColor${i}">${element['prio']} <img id="boPrioImg${i}" src="./img/arrowUpWhite.png"></div></div>
                            
                            <div class="mt-25 font21-400"><span class="mr-20 bo_font21-700">Assigned to:</span>${element['contacts']}</div>
                               
                            <button onclick="openTodoEdit(${i})" class="bo_edit_todo c-pointer"
                                 onmouseenter="changeEditBtn('./img/edit-light.png', ${i})"
                                 onmouseleave="resetEditBtn('./img/edit-dark.png', ${i})">
                                  <img id="boEditTodo${i}" src="./img/edit-dark.png">
                                </button>
                </div>

               
             <div id="boEditPopUp${i}" class="bo_edit_task d-none">
                <div class="mb-40">
                 <span class="bo_task_title">Title</span>
                    <input id="bo_task_title${i}" class="bo_task_titlebox" type="text" value="${element['title']}" placeholder="Enter a title" 
                    onfocus="this.placeholder=''"
                    onblur="this.placeholder='Enter a title'">
                </div>

                <div class="mb-40">
                  <span class="bo_task_description">Description</span>
                         <textarea id="bo_task_description${i}" class="bo_task_descriptionbox" placeholder="Enter a description"
                             onfocus="this.placeholder=''" onblur="this.placeholder='Enter a description'">${element['description']}</textarea>
                </div>

                <div class="mb-40">
                  <span class="bo_task_date"></span>
                       <input id="bo_task_due_Date${i}" class="bo_task_datebox" type="date" value="${element['date']}">
                </div>

                <div class="mb-40">
                  <span class="font21-400 bo_prio">Prio</span>
                    <div class="bo_prio_btn">
                        <button id="boPrioUrgent${i}" onclick="BoardChangeToRed(${i})" class="bo_task_prio-urgent"><span id="boWhiteUrgent${i}"
                         class="bo_task_urgent">Urgent</span><img id="boImg-up-white${i}" src="./img/up.png"></button>
                        <button id="boPrioMedium${i}" onclick="BoardChangeToOrange(${i})" class="bo_task_prio-medium"><span id="boWhiteMedium${i}"
                            class="bo_task_medium">Medium</span><img id="boImg-middle-white${i}" src="./img/middle.png"></button>
                        <button id="boPrioLow${i}" onclick="BoardChangeToGreen(${i})" class="bo_task_prio-low"><span id="boWhiteLow${i}"
                        class="bo_task_low">Low</span><img id="boImg-down-white${i}" src="./img/down.png"></button>
                     </div>
                </div>

                <div class="mb-40">
                <span class="bo_task_assigned">Assigned to</span>
                <div id="boDropdownAssigned${i}" class="bo_assign-selection">
                    <div onclick="BoardShowAssigned(${i})" id="boNew_assigned${i}" class="bo_task_dropdown-container">
                        <div class="bo_task_assignedbox">Select contacts to assign</div>
                        <img src="./img/open.png">
                    </div>
                    <div class="bo_task_dropdown-content" id="boContent-assigned${i}">
                        <div id="boAssigned-you${i}" onclick="BoardClickyou(event, ${i})" class="bo_dropdown-assigned">
                            <span class="bo_dropdown-item">You</span>
                            <div class="bo_rectangle" id="bo_rectangle${i}"></div>
                        </div>
                        <div id="boAssigned-contact${i}" onclick="BoardClickcontact(event, ${i})" class="bo_dropdown-assigned">
                            <span class="bo_dropdown-item">Laura Numey</span>
                            <div class="bo_rectangle" id="bo_rectangle${i}"></div>
                        </div>
                        <div onclick="BoardClickinvite(${i})" class="bo_dropdown-assigned">
                            <span class="bo_dropdown-item">Invite new contact</span>
                            <img class="bo_task_img-invite" src="./img/invite-sign.png">
                        </div>
                    </div>
                </div>
                 </div>

                 <button onclick="closeTodoEdit(${i}, event)" class="bo_button_dark ">Ok<img src="./img/check.png"></button>
        </div>
    </div>`;


}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    tasks[currentDraggedElement]['status'] = status;
    updateHTML();
}

function filterTodos() {
    let search = document.getElementById('searchTodo').value;
    search = search.toLowerCase();
    console.log(search);

    document.getElementById('todo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitingFB').innerHTML = '';
    document.getElementById('done').innerHTML = '';

    let searchedTodo = tasks.filter(t => t.status == 'Todo' && t.title.toLowerCase().includes(search))
    let searchedInProgress = tasks.filter(t => t.status == 'In progress' && t.title.toLowerCase().includes(search))
    let searchedInAwaitingFeedback = tasks.filter(t => t.status == "Awaiting Feedback" && t.title.toLowerCase().includes(search))
    let searchedInDone = tasks.filter(t => t.status == "Done" && t.title.toLowerCase().includes(search))

    searchedTodo.forEach(t => document.getElementById('todo').innerHTML += generateTodoHTML(t))
    searchedInProgress.forEach(t => document.getElementById('inProgress').innerHTML += generateTodoHTML(t))
    searchedInAwaitingFeedback.forEach(t => document.getElementById('awaitingFB').innerHTML += generateTodoHTML(t))
    searchedInDone.forEach(t => document.getElementById('done').innerHTML += generateTodoHTML(t))
}

async function openAddTask() {
   
  document.getElementById('boAddTaskPopUp').classList.remove('d-none');
  document.getElementById('boAddTaskPopUp').innerHTML = `<div>
                  <div id="boTemplateAddTask" data-template="./content/add_task.html">
                  <button>x</button>
                  </div>
                </div>`;
                           
  await includeHTML();
  BoardChangesAddTask(); 
}

function BoardChangesAddTask() {
    document.getElementById('bo_changes_addTask').classList.remove('global_main_format', 'add_main_format');
    document.getElementById('bo_changes_addTask').classList.add('bo_addTask_Temp');  
}

// function closeAddTaskPopUp() {
//     document.getElementById('boAddTaskPopUp').classList.add('d-none');
// }

function openTodoInfo(id) {
    document.getElementById(id).classList.remove('d-none');
}

function closeTodoInfo(id, event) {
    document.getElementById(id).classList.add('d-none');
    event.stopPropagation();
}

function changeEditBtn(img, i) {
    document.getElementById('boEditTodo' + i).src = img;
}

function resetEditBtn(img, i) {
    document.getElementById('boEditTodo' + i).src = img;
}

function openTodoEdit(i) {
    document.getElementById('boEditPopUp' + i).classList.remove('d-none');
    document.getElementById('boPopUpInfo' + i).classList.add('d-none');
}

// function changeDataBackend(i) {
//     title = document.getElementById(`bo_task_title${i}`);
//     description = document.getElementById(`bo_task_description${i}`);
//     date = document.getElementById(`bo_task_due_Date${i}`);
//     // let contacts = document.getElementById(``);
//     prioStat = BoardSetPrioStat();

   
//     task = {
//         "title": title.value,
//         "description": description.value,
//         "contacts": contacts.value,
//         "prio": prioStat,
//         "date": date.value,
//     };

//     tasks[i] = task; 
//     backend.setItem("tasks", JSON.stringify(tasks));
//     // loadArrayFromBackend();
// }

// function BoardSetPrioStat() {
//     prioStat = '';
//     if (urgentClicked) prioStat = "Urgent";
//     if (mediumClicked) prioStat = "Medium";
//     if (lowClicked) prioStat = "Low";
//     return prioStat;
// }

function closeTodoEdit(i, event) {
    changeDataBackend(i);
    document.getElementById('boEditPopUp' + i).classList.add('d-none');
    document.getElementById('boPopUpInfo' + i).classList.remove('d-none');
    event.stopPropagation();
}

function changeMobileAddTaskBtn(img) {
    document.getElementById('bo_mobile_AddTaskPlus').src = img;
}

function resetMobileAddTaskBtn(img) {
    document.getElementById('bo_mobile_AddTaskPlus').src = img;
}

function BoardPrioColor(i) {
    let prioPopUp = document.getElementById('boPrioColor' + i).innerHTML;
    

    if ( prioPopUp.includes('Urgent')) {
        document.getElementById('boPrioColor' + i).style.background = "#FF3D00";
        BoardChangeToRed(i);
    } 
    if ( prioPopUp.includes('Medium')) {
        document.getElementById('boPrioColor' + i).style.background = "#FFA800";
        document.getElementById('boPrioImg' + i).src = './img/arrowMiddleWhite.png';
        document.getElementById('prioTodo' + i).src = './img/middle.png';
        BoardChangeToOrange(i);
    }
    if ( prioPopUp.includes('Low')) {
        document.getElementById('boPrioColor' + i).style.background = "#7AE229";
        document.getElementById('boPrioImg' + i).src = './img/arrowDownWhite.png';
        document.getElementById('prioTodo' + i).src = './img/down.png';
        BoardChangeToGreen(i);
    }
    prioPopUp = document.getElementById('boPrioColor' + i).style.color = "#FFFFFF";  
}

function BoardUrgentButtonDefault(i) {
    document.getElementById('boPrioUrgent' + i).style.backgroundColor = "#FFFFFF";
    document.getElementById('boWhiteUrgent' + i).style.color = "#000000";
    document.getElementById('boImg-up-white' + i).src = "./img/up.png";
    urgentClicked = false;
}

function BoardMediumButtonDefault(i) {
    document.getElementById('boPrioMedium' + i).style.backgroundColor = "#FFFFFF";
    document.getElementById('boWhiteMedium' + i).style.color = "#000000";
    document.getElementById('boImg-middle-white' + i).src = "./img/middle.png";
    mediumClicked = false;
}

function BoardLowButtonDefault(i) {
    document.getElementById('boPrioLow' + i).style.backgroundColor = "#FFFFFF";
    document.getElementById('boWhiteLow' + i).style.color = "#000000";
    document.getElementById('boImg-down-white' + i).src = "./img/down.png";
    lowClicked = false;
}

function BoardChangeToRed(i) {
    if (urgentClicked == false) {
        document.getElementById('boPrioUrgent' + i).style.backgroundColor = "#FF3D00";
        document.getElementById('boWhiteUrgent' + i).style.color = "#FFFFFF";
        document.getElementById('boImg-up-white' + i).src = "./img/arrowUpWhite.png";
        urgentClicked = true;
    } else {
        BoardUrgentButtonDefault(i);
    }
    BoardMediumButtonDefault(i);
    BoardLowButtonDefault(i);
}

function BoardChangeToOrange(i) {
    if (mediumClicked == false) {
        document.getElementById('boPrioMedium' + i).style.backgroundColor = "#FFA800";
        document.getElementById('boWhiteMedium' + i).style.color = "#FFFFFF";
        document.getElementById('boImg-middle-white' + i).src = "./img/arrowMiddleWhite.png";
        mediumClicked = true;
    } else {
        BoardMediumButtonDefault(i);
    }
    BoardUrgentButtonDefault(i);
    BoardLowButtonDefault(i);
}

function BoardChangeToGreen(i) {
    if (lowClicked == false) {
        document.getElementById('boPrioLow' + i).style.backgroundColor = "#7AE229";
        document.getElementById('boWhiteLow' + i).style.color = "#FFFFFF";
        document.getElementById('boImg-down-white' + i).src = "./img/arrowDownWhite.png";
        lowClicked = true;
    } else {
        BoardLowButtonDefault(i);
    }
    BoardUrgentButtonDefault(i);
    BoardMediumButtonDefault(i);
}

function BoardShowAssigned(i) {
    document.getElementById('boDropdownAssigned' + i).classList.add('bo_task_height');
    if (dropdownClicked == false) {
        document.getElementById("boContent-assigned" + i).classList.toggle("bo_task_show");
        document.getElementById("boDropdownAssigned" + i).classList.add("bo_task_dropdown");
        dropdownClicked = true;
    } else {
        BoardShowAssignedDefault(i);
    }
}

function BoardShowAssignedDefault(i) {
    document.getElementById("boContent-assigned" + i).classList.toggle("bo_task_show");
    document.getElementById("boDropdownAssigned" + i).classList.remove("bo_task_dropdown");
    dropdownClicked = false;
}

function BoardClickyou(event, i) {
    event.stopPropagation();
    let click = document.getElementById('boAssigned-you' + i);
    if (clicked_You == false) {
        click.innerHTML = `
        <span class="bo_dropdown-item">You</span>
        <div class="bo_rectangle" id='bo_rectangle${i}'>
            <div class="bo_rectangle-clicked" id='bo_rectangle-clicked${i}'></div>
        </div>`;
        clicked_You = true;
    } else {
        click.innerHTML = `
        <span class="bo_dropdown-item">You</span>
        <div class="bo_rectangle" id='bo_rectangle${i}'></div>`;
        clicked_You = false;
    }
}

function BoardClickcontact(event, i) {
    event.stopPropagation();
    let click = document.getElementById('boAssigned-contact' + i);
    if (clicked_Contact == false) {
        click.innerHTML = `
    <span class="bo_dropdown-item">Laura Numey</span>
    <div class="bo_rectangle" id='bo_rectangle${i}'>
        <div class="bo_rectangle-clicked" id='bo_rectangle-clicked${i}'></div>
    </div>`;
        clicked_Contact = true;
    } else {
        click.innerHTML = /*html*/`
        <span class="bo_dropdown-item">Laura Numey</span>
        <div class="bo_rectangle" id='bo_rectangle${i}'></div>`;
        clicked_Contact = false;
    }
}

function BoardClickinvite(i) {
    let invite = document.getElementById('boDropdownAssigned' + i);
    invite.innerHTML = `
    <div id="boContact${i}" class="new_category">
        <input id="boEmail" onclick="BoardSelect_email(i)" class="categorybox caret-hidden" type="text" placeholder="Contact email" onfocus="this.placeholder=''" onblur="this.placeholder='Contact email'">
        <div class="img_new_category">
            <img class="img-cancelSubtask" src='./img/subtask-cancel.png' onclick="BoardDefaultMode()">
            <img src="./img/vertical.png">
            <img class="img-addSubtask" src='./img/addSubtask.png' onclick="BoardSelect_email()">
        </div>
    </div>
    `;
}

function BoardSelect_email(i) {
    document.getElementById('boContact').innerHTML = `
    <input id="boEmail${i}" onclick="BoardSelection()" class="categorybox caret-hidden" type="text" placeholder="New category name" onfocus="this.placeholder=''" onblur="this.placeholder='New category name'">
    <div class="img_new_category">
        <img class="img-cancelSubtask" src='./img/subtask-cancel.png' onclick="BoardDefaultMode()">
        <img src="./img/vertical.png">
        <img class="img-addSubtask" src='./img/addSubtask.png' onclick="BoardSelection()">
    </div>`;
    document.getElementById('boEmail' + i).value = "laura@gmail.com";
}

function BoardDefaultMode(i) {
    document.getElementById('boDropdownAssigned' + i).innerHTML = `
    <div onclick="BoardShowAssigned(i)" id="boNew_assigned${i}" class="bo_task_dropdown-container">
        <div class="bo_task_assignedbox">Select contacts to assign</div>
        <img src="./img/open.png">
    </div>
    <div class="bo_task_dropdown-content" id="boContent-assigned${i}">
        <div id="boAssigned-you${i}" onclick="BoardClickyou(event, i)" class="bo_dropdown-assigned">
            <span class="bo_dropdown-item">You</span>
            <div class="bo_rectangle" id="bo_rectangle${i}"></div>
        </div>
        <div id="boAssigned-contact${i}" onclick="BoardClickcontact(event, i)" class="bo_dropdown-assigned">
            <span class="bo_dropdown-item">Laura Numey</span>
            <div class="bo_rectangle" id="bo_rectangle${i}"></div>
        </div>
        <div onclick="BoardClickinvite(i)" class="bo_dropdown-assigned">
            <span class="bo_dropdown-item">Invite new contact</span>
            <img class="bo_task_img-invite" src="./img/invite-sign.png">
        </div>
    </div>`;
}

function BoardSelection(i) {
    document.getElementById('boDropdownAssigned' + i).classList.remove("bo_task_dropdown");
    document.getElementById('boDropdownAssigned' + i).classList.remove("bo_task_height");
    document.getElementById('boDropdownAssigned' + i).classList.add("bo_task_height-default");
    document.getElementById('boDropdownAssigned' + i).innerHTML = /*html*/`
    <div onclick="BoardRestartDefault()" id="boNew_assigned${i}" class="bo_task_dropdown-container">
        <div class="bo_task_assignedbox">Select contacts to assign</div>
        <img src="./img/open.png">
    </div>
    <div id="boInitials${i}">
        <img class="bo_task_initials" src="./img/contactSM.png">
        <img class="bo_task_initials" src="./img/contactEV.png">
        <img class="bo_task_initials" src="./img/contactMV.png">
    </div>
    <div class="bo_task_dropdown-content" id="boContent-assigned${i}">
        <div id="boAssigned-you${i}" onclick="BoardClickyou(event, i)" class="bo_dropdown-assigned">
            <span class="bo_dropdown-item">You</span>
            <div class="bo_rectangle" id="bo_rectangle${i}"></div>
        </div>
        <div id="boAssigned-contact${i}" onclick="BoardClickcontact(event, i)" class="bo_dropdown-assigned">
            <span class="bo_dropdown-item">Laura Numey</span>
            <div class="bo_rectangle" id="bo_rectangle${i}"></div>
        </div>
        <div onclick="BoardClickinvite(i)" class="bo_dropdown-assigned">
            <span class="bo_dropdown-item">Invite new contact</span>
            <img class="bo_task_img-invite" src="./img/invite-sign.png">
        </div>
    </div>`;
}

function BoardRestartDefault(i) {
    document.getElementById('boDropdownAssigned' + i).classList.add("bo_task_dropdown");
    document.getElementById('boInitials' + i).classList.add("d-none");
    document.getElementById('boContent-assigned' + i).classList.toggle("bo_task_show");
}