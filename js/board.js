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
    tasks = await JSON.parse(backend.getItem('tasks')) || [];    
}

function updateHTML() {
    let todo = tasks.filter(t => t['status'] == 'Todo');

    document.getElementById('todo').innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('todo').innerHTML += generateTodoHTML(element, i);
        BoardPrioColor(`${element['id']}`);
    }


    let inProgress = tasks.filter(t => t['status'] == 'In progress');

    document.getElementById('inProgress').innerHTML = '';

    for (let i = 0; i < inProgress.length; i++) {
        const element = inProgress[i];
        document.getElementById('inProgress').innerHTML += generateTodoHTML(element, i);
        BoardPrioColor(`${element['id']}`);
    }


    let awaitingFB = tasks.filter(t => t['status'] == 'Awaiting Feedback');

    document.getElementById('awaitingFB').innerHTML = '';

    for (let i = 0; i < awaitingFB.length; i++) {
        const element = awaitingFB[i];
        document.getElementById('awaitingFB').innerHTML += generateTodoHTML(element, i);
        BoardPrioColor(`${element['id']}`);
    }


    let done = tasks.filter(t => t['status'] == 'Done');

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateTodoHTML(element, i);
        BoardPrioColor(`${element['id']}`);
    }
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * Function to move the dragged element to the selected area
 * filter the id which is the timestemp
 * 
 * @param {string} status - status changes on drop
 */
async function moveTo(status) {
    let draggedElement = tasks.filter(t => t['id'] == currentDraggedElement);
    draggedElement[0]['status'] = status;
    await backend.setItem("tasks", JSON.stringify(tasks));
    updateHTML();
}

function generateTodoHTML(element, i) {
    return `<div onclick="openTodoInfo(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})" class="bo_todo c-pointer">
              <div class="bo_todo_infos">
                <span style="background: ${element['categoryColor'][0]}" class="bo_department font16-400">${element['category']}</span>
                <br>
                  <div class="bo_todo_title font16-700">${element['title']}</div>
                   <div>
                    <div class="font16-400">${element['description']}</div>
                  </div>
                  <br>
                  <div class="bo_todo_contacts_prio">
                    <div>${element['contacts']}</div>
                    <div class="${element['prio']}"><img id="prioTodo${element['id']}" src="./img/up.png"></div>
                  </div>
               </div>     
            </div>
            ${showTodoPopUp(element, i)}`;
}

function showTodoPopUp(element, i) {
    return `<div id="bo_popUp${element['id']}" class="bo_pop_up d-none">
             <div class="bo_popup_todo_Info">
                <div id="boPopUpInfo${element['id']}">
                   <button onclick="closeTodoInfo(${element['id']}, event)" class="bo_cancel_btn c-pointer">
                     <img src="./img/cancel.png">
                   </button>
                     <span style="background: ${element['categoryColor'][0]}" class="bo_popUp_department">${element['category']}</span>
                     <br>
                     <div class="mt-25 font61-700">${element['title']}</div>
                        <div>
                         <div class="mt-25 font21-400">${element['description']}</div>
                        </div>
                            <div class="mt-25 font21-400 bo-width400"><span class="mr-20 bo_font21-700">Due date:</span>${element['date']}</div>

                            <div class="bo_d-flex mt-25 font21-400"><span class="mr-20 bo_font21-700">Priority:</span>
                                <div class="bo_prio_color" id="boPrioColor${element['id']}">${element['prio']} <img id="boPrioImg${element['id']}" src="./img/arrowUpWhite.png"></div></div>
                            
                            <div class="mt-25 font21-400"><span class="mr-20 bo_font21-700">Assigned to:</span>${element['contacts']}</div>
                               
                            <button onclick="openTodoEdit(${element['id']})" class="bo_edit_todo c-pointer"
                                 onmouseenter="changeEditBtn('./img/edit-light.png', ${element['id']})"
                                 onmouseleave="resetEditBtn('./img/edit-dark.png', ${element['id']})">
                                  <img id="boEditTodo${element['id']}" src="./img/edit-dark.png">
                                </button>
                </div>

               
             <div id="boEditPopUp${element['id']}" class="bo_edit_task d-none">
                <div class="mb-40">
                 <span class="bo_task_title">Title</span>
                    <input id="bo_task_title${element['id']}" class="bo_task_titlebox" type="text" value="${element['title']}" placeholder="Enter a title" 
                    onfocus="this.placeholder=''"
                    onblur="this.placeholder='Enter a title'">
                </div>

                <div class="mb-40">
                  <span class="bo_task_description">Description</span>
                         <textarea id="bo_task_description${element['id']}" class="bo_task_descriptionbox" placeholder="Enter a description"
                             onfocus="this.placeholder=''" onblur="this.placeholder='Enter a description'">${element['description']}</textarea>
                </div>

                <div class="mb-40">
                  <span class="bo_task_date"></span>
                       <input id="bo_task_due_Date${element['id']}" class="bo_task_datebox" type="date" value="${element['date']}">
                </div>

                <div class="mb-40">
                  <span class="font21-400 bo_prio">Prio</span>
                    <div class="bo_prio_btn">
                        <button id="boPrioUrgent${element['id']}" onclick="BoardChangeToRed(${element['id']})" class="bo_task_prio-urgent"><span id="boWhiteUrgent${element['id']}"
                         class="bo_task_urgent">Urgent</span><img id="boImg-up-white${element['id']}" src="./img/up.png"></button>
                        <button id="boPrioMedium${element['id']}" onclick="BoardChangeToOrange(${element['id']})" class="bo_task_prio-medium"><span id="boWhiteMedium${element['id']}"
                            class="bo_task_medium">Medium</span><img id="boImg-middle-white${element['id']}" src="./img/middle.png"></button>
                        <button id="boPrioLow${element['id']}" onclick="BoardChangeToGreen(${element['id']})" class="bo_task_prio-low"><span id="boWhiteLow${element['id']}"
                        class="bo_task_low">Low</span><img id="boImg-down-white${element['id']}" src="./img/down.png"></button>
                     </div>
                </div>

                <div class="mb-40">
                <span class="bo_task_assigned">Assigned to</span>
                <div id="boDropdownAssigned${element['id']}" class="bo_assign-selection">
                    <div onclick="BoardShowAssigned(${element['id']})" id="boNew_assigned${element['id']}" class="bo_task_dropdown-container">
                        <div class="bo_task_assignedbox">Select contacts to assign</div>
                        <img src="./img/open.png">
                    </div>
                    <div class="bo_task_dropdown-content" id="boContent-assigned${element['id']}">
                        <div id="boAssigned-you${element['id']}" onclick="BoardClickyou(event, ${element['id']})" class="bo_dropdown-assigned">
                            <span class="bo_dropdown-item">You</span>
                            <div class="bo_rectangle" id="bo_rectangle${element['id']}"></div>
                        </div>
                        <div id="boAssigned-contact${element['id']}" onclick="BoardClickcontact(event, ${element['id']})" class="bo_dropdown-assigned">
                            <span class="bo_dropdown-item">Laura Numey</span>
                            <div class="bo_rectangle" id="bo_rectangle${element['id']}"></div>
                        </div>
                        <div onclick="BoardClickinvite(${element['id']})" class="bo_dropdown-assigned">
                            <span class="bo_dropdown-item">Invite new contact</span>
                            <img class="bo_task_img-invite" src="./img/invite-sign.png">
                        </div>
                    </div>
                </div>
                 </div>

                 <button onclick="closeTodoEdit(${element['id']})" class="bo_button_dark ">Ok<img src="./img/check.png"></button>
        </div>
    </div>`;
}


function filterTodos() {
    let search = document.getElementById('searchTodo').value;
    search = search.toLowerCase();

    document.getElementById('todo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitingFB').innerHTML = '';
    document.getElementById('done').innerHTML = '';

    let searchedTodo = tasks.filter(t => t.status == 'Todo' && t.title.toLowerCase().includes(search))
    let searchedInProgress = tasks.filter(t => t.status == 'In progress' && t.title.toLowerCase().includes(search))
    let searchedInAwaitingFeedback = tasks.filter(t => t.status == "Awaiting Feedback" && t.title.toLowerCase().includes(search))
    let searchedInDone = tasks.filter(t => t.status == "Done" && t.title.toLowerCase().includes(search))

    searchedTodo.forEach(t => {
        document.getElementById('todo').innerHTML += generateTodoHTML(t); 
        BoardPrioColor(t['id']); 
        BoardUrgentButtonDefault(t['id']);  
        BoardMediumButtonDefault(t['id']);
        BoardLowButtonDefault(t['id']);
    })

    searchedInProgress.forEach(t => { 
        document.getElementById('inProgress').innerHTML += generateTodoHTML(t);
        BoardPrioColor(t['id']); 
        BoardUrgentButtonDefault(t['id']);  
        BoardMediumButtonDefault(t['id']);
        BoardLowButtonDefault(t['id']);
    })

    searchedInAwaitingFeedback.forEach(t => {
        document.getElementById('awaitingFB').innerHTML += generateTodoHTML(t);
        BoardPrioColor(t['id']); 
        BoardUrgentButtonDefault(t['id']);  
        BoardMediumButtonDefault(t['id']);
        BoardLowButtonDefault(t['id']);
    })

    searchedInDone.forEach(t => {
        document.getElementById('done').innerHTML += generateTodoHTML(t);
        BoardPrioColor(t['id']); 
        BoardUrgentButtonDefault(t['id']);  
        BoardMediumButtonDefault(t['id']);
        BoardLowButtonDefault(t['id']);
    })

    
    
   
   
   
}

/**
 * Function to render the addTask section into the board section
 */
async function openAddTask() {
    
  document.getElementById('boAddTaskPopUp').classList.remove('d-none');
  document.getElementById('boAddTaskPopUp').innerHTML = `<div>
                  <div data-template="./content/add_task.html"></div>
                </div>`;
                           
              await includeHTML();
  BoardChangesAddTask(); 
}

/** 
 * Function to change the css attributes on the rendered addTask section
 * 
 */
function BoardChangesAddTask() {
    document.getElementById('bo_changes_addTask').classList.remove('global_main_format', 'add_main_format');
    document.getElementById('bo_changes_addTask').classList.add('bo_addTask_Temp');  
    document.getElementById('bo_changes_addTask').innerHTML += `
            <img class="addTask_temp_close_btn" id="closeAddTaskBTN" onclick="closeAddTaskPopUp();  updateHTML();" src="./img/cancel.png">
    `; 
}

/**
 * Function to close the rendered addTask section
 */
function closeAddTaskPopUp() {
    document.getElementById('boAddTaskPopUp').classList.add('d-none');
}

/**
 * Function to open the information of a todo
 * 
 * @param {number} id - the id is the timestemp
 */
function openTodoInfo(id) {
    document.getElementById(`bo_popUp${id}`).classList.remove('d-none');
}

/**
 * Function to close the information of a todo
 * 
 * @param {number} id - the id is the timestemp
 * @param {string} event - for the stopPropagation, so that the popUp only closes when the "x-btn" is clicked
 */
function closeTodoInfo(id, event) {
    document.getElementById(`bo_popUp${id}`).classList.add('d-none');
    event.stopPropagation();
}

/**
 * on hover the image will change to a lighter one
 * 
 * @param {path} img - image from the light edit button
 * @param {number} id - the id is the timestemp
 */
function changeEditBtn(img, id) {
    document.getElementById(`boEditTodo${id}`).src = img;
}

/**
 * on hover the image will change back to the dark one
 * 
 * @param {path} img - image from the dark edit button
 * @param {number} id - the id is the timestemp
 */
function resetEditBtn(img, id) {
    document.getElementById(`boEditTodo${id}`).src = img;
}

/**
 * Function to open the second popUp to edit the todo
 * 
 * @param {number} id - the id is the timestemp
 */
function openTodoEdit(id) {
    document.getElementById(`boEditPopUp${id}`).classList.remove('d-none');
    document.getElementById(`boPopUpInfo${id}`).classList.add('d-none');
}

/**
 * Function to close the second popUp to edit the todo
 * and save the changes
 * 
 * @param {number} id - the id is the timestemp
 */
function closeTodoEdit(id) {
    changeDataBackend(id);
    document.getElementById(`boEditPopUp${id}`).classList.add('d-none');
    document.getElementById(`boPopUpInfo${id}`).classList.remove('d-none');
}

/**
 * Function to save the changes on the todos
 * 
 * @param {number} i - the timestemp
 */
async function changeDataBackend(i) {
    title = document.getElementById(`bo_task_title${i}`);
    description = document.getElementById(`bo_task_description${i}`);
    date = document.getElementById(`bo_task_due_Date${i}`);
    contacts = document.getElementById(`boNew_assigned${i}`);
    prioStat = BoardSetPrioStat();

    let changedTask = tasks.filter(t => t['id'] == i);
    let idxOfChangedTask = tasks.indexOf(changedTask[0]);
    
    task = {
        "title": title.value,
        "description": description.value,
        "category": changedTask[0]['category'],
        "categoryColor": changedTask[0]['categoryColor'],
        "contacts": contacts.value,
        "prio": prioStat,
        "date": date.value,
        "subtasks": changedTask[0]['subtasks'],
        "status": changedTask[0]['status'],
        "id": changedTask[0]['id']
    };


    tasks[idxOfChangedTask] = task;
    await backend.setItem("tasks", JSON.stringify(tasks));
    await loadArrayFromBackend();
    updateHTML();
}


/**
 * Function to check which priority is choosed
 * 
 * @returns - returns the status from the currently clicked prio button
 */
function BoardSetPrioStat() {
    prioStat = '';
    if (urgentClicked) prioStat = "Urgent";
    if (mediumClicked) prioStat = "Medium";
    if (lowClicked) prioStat = "Low";
    return prioStat;
}

function changeMobileAddTaskBtn(img) {
    document.getElementById('bo_mobile_AddTaskPlus').src = img;
}

function resetMobileAddTaskBtn(img) {
    document.getElementById('bo_mobile_AddTaskPlus').src = img;
}

//prioTodo = is the sign in the todo next to the assigned contacts
//boPrioColor = The word Urgent, Medium, Low in the first popUp when todo is clicked
//boPrioImg = is the Sign next to the word
function BoardPrioColor(id) {
    let prioPopUp = document.getElementById(`boPrioColor${id}`).innerHTML;
    

    if (prioPopUp.includes('Urgent')) {
        document.getElementById(`boPrioColor${id}`).style.background = "#FF3D00";
        BoardChangeToRed(id);
    } 
    if (prioPopUp.includes('Medium')) {
        document.getElementById(`boPrioColor${id}`).style.background = "#FFA800";
        document.getElementById(`boPrioImg${id}`).src = './img/arrowMiddleWhite.png';
        document.getElementById(`prioTodo${id}`).src = './img/middle.png';
        BoardChangeToOrange(id);
    }
    if (prioPopUp.includes('Low')) {
        document.getElementById(`boPrioColor${id}`).style.background = "#7AE229";
        document.getElementById(`boPrioImg${id}`).src = './img/arrowDownWhite.png';
        document.getElementById(`prioTodo${id}`).src = './img/down.png';
        BoardChangeToGreen(id);
    }
    prioPopUp = document.getElementById(`boPrioColor${id}`).style.color = "#FFFFFF";  
}

function BoardUrgentButtonDefault(id) {
    document.getElementById(`boPrioUrgent${id}`).style.backgroundColor = "#FFFFFF";
    document.getElementById(`boWhiteUrgent${id}`).style.color = "#000000";
    document.getElementById(`boImg-up-white${id}`).src = "./img/up.png";
    urgentClicked = false;
}

function BoardMediumButtonDefault(id) {
    document.getElementById(`boPrioMedium${id}`).style.backgroundColor = "#FFFFFF";
    document.getElementById(`boWhiteMedium${id}`).style.color = "#000000";
    document.getElementById(`boImg-middle-white${id}`).src = "./img/middle.png";
    mediumClicked = false;
}

function BoardLowButtonDefault(id) {
    document.getElementById(`boPrioLow${id}`).style.backgroundColor = "#FFFFFF";
    document.getElementById(`boWhiteLow${id}`).style.color = "#000000";
    document.getElementById(`boImg-down-white${id}`).src = "./img/down.png";
    lowClicked = false;
}

function BoardChangeToRed(id) {
    if (urgentClicked == false) {
        document.getElementById(`boPrioUrgent${id}`).style.backgroundColor = "#FF3D00";
        document.getElementById(`boWhiteUrgent${id}`).style.color = "#FFFFFF";
        document.getElementById(`boImg-up-white${id}`).src = "./img/arrowUpWhite.png";
        urgentClicked = true;
    } else {
        BoardUrgentButtonDefault(id);
    }
    BoardMediumButtonDefault(id);
    BoardLowButtonDefault(id);
}

function BoardChangeToOrange(id) {
    if (mediumClicked == false) {
        document.getElementById(`boPrioMedium${id}`).style.backgroundColor = "#FFA800";
        document.getElementById(`boWhiteMedium${id}`).style.color = "#FFFFFF";
        document.getElementById(`boImg-middle-white${id}`).src = "./img/arrowMiddleWhite.png";
        mediumClicked = true;
    } else {
        BoardMediumButtonDefault(id);
    }
    BoardUrgentButtonDefault(id);
    BoardLowButtonDefault(id);
}

function BoardChangeToGreen(id) {
    if (lowClicked == false) {
        document.getElementById(`boPrioLow${id}`).style.backgroundColor = "#7AE229";
        document.getElementById(`boWhiteLow${id}`).style.color = "#FFFFFF";
        document.getElementById(`boImg-down-white${id}`).src = "./img/arrowDownWhite.png";
        lowClicked = true;
    } else {
        BoardLowButtonDefault(id);
    }
    BoardUrgentButtonDefault(id);
    BoardMediumButtonDefault(id);
}

function BoardShowAssigned(id) {
    document.getElementById(`boDropdownAssigned${id}`).classList.add('bo_task_height');
    if (dropdownClicked == false) {
        document.getElementById(`boContent-assigned${id}`).classList.toggle("bo_task_show");
        document.getElementById(`boDropdownAssigned${id}`).classList.add("bo_task_dropdown");
        dropdownClicked = true;
    } else {
        BoardShowAssignedDefault(id);
    }
}

function BoardShowAssignedDefault(id) {
    document.getElementById(`boContent-assigned${id}`).classList.toggle("bo_task_show");
    document.getElementById(`boDropdownAssigned${id}`).classList.remove("bo_task_dropdown");
    dropdownClicked = false;
}

function BoardClickyou(event, id) {
    event.stopPropagation();
    let click = document.getElementById(`boAssigned-you${id}`);
    if (clicked_You == false) {
        click.innerHTML = `
        <span class="bo_dropdown-item">You</span>
        <div class="bo_rectangle" id='bo_rectangle${id}'>
            <div class="bo_rectangle-clicked" id='bo_rectangle-clicked${id}'></div>
        </div>`;
        clicked_You = true;
    } else {
        click.innerHTML = `
        <span class="bo_dropdown-item">You</span>
        <div class="bo_rectangle" id='bo_rectangle${id}'div>`;
        clicked_You = false;
    }
}

function BoardClickcontact(event, id) {
    event.stopPropagation();
    let click = document.getElementById(`boAssigned-contact${id}`);
    if (clicked_Contact == false) {
        click.innerHTML = `
    <span class="bo_dropdown-item">Laura Numey</span>
    <div class="bo_rectangle" id='bo_rectangle${id}'>
        <div class="bo_rectangle-clicked" id='bo_rectangle-clicked${id}'></div>
    </div>`;
        clicked_Contact = true;
    } else {
        click.innerHTML = `
        <span class="bo_dropdown-item">Laura Numey</span>
        <div class="bo_rectangle" id='bo_rectangle${id}'></div>`;
        clicked_Contact = false;
    }
}

function BoardClickinvite(id) {
    let invite = document.getElementById(`boDropdownAssigned${id}`);
    invite.innerHTML = `
    <div id="boContact${id}" class="new_category">
        <input id="boEmail" onclick="BoardSelect_email(id)" class="categorybox caret-hidden" type="text" placeholder="Contact email" onfocus="this.placeholder=''" onblur="this.placeholder='Contact email'">
        <div class="img_new_category">
            <img class="img-cancelSubtask" src='./img/subtask-cancel.png' onclick="BoardDefaultMode(id)">
            <img src="./img/vertical.png">
            <img class="img-addSubtask" src='./img/addSubtask.png' onclick="BoardSelect_email(id)">
        </div>
    </div>
    `;
}

function BoardSelect_email(id) {
    document.getElementById('boContact').innerHTML = `
    <input id="boEmail${id}" onclick="BoardSelection(id)" class="categorybox caret-hidden" type="text" placeholder="New category name" onfocus="this.placeholder=''" onblur="this.placeholder='New category name'">
    <div class="img_new_category">
        <img class="img-cancelSubtask" src='./img/subtask-cancel.png' onclick="BoardDefaultMode(id)">
        <img src="./img/vertical.png">
        <img class="img-addSubtask" src='./img/addSubtask.png' onclick="BoardSelection(id)">
    </div>`;
    document.getElementById(`boEmail${id}`).value = "laura@gmail.com";
}

function BoardDefaultMode(id) {
    document.getElementById(`boDropdownAssigned${id}`).innerHTML = `
    <div onclick="BoardShowAssigned(i)" id='boNew_assigned${id}' class="bo_task_dropdown-container">
        <div class="bo_task_assignedbox">Select contacts to assign</div>
        <img src="./img/open.png">
    </div>
    <div class="bo_task_dropdown-content" id="boContent-assigned${id}">
        <div id='boAssigned-you${id}' onclick="BoardClickyou(event, id)" class="bo_dropdown-assigned">
            <span class="bo_dropdown-item">You</span>
            <div class="bo_rectangle" id="bo_rectangle${id}"></div>
        </div>
        <div id='boAssigned-contact${id}' onclick="BoardClickcontact(event, id)" class="bo_dropdown-assigned">
            <span class="bo_dropdown-item">Laura Numey</span>
            <div class="bo_rectangle" id="bo_rectangle${id}"></div>
        </div>
        <div onclick="BoardClickinvite(id)" class="bo_dropdown-assigned">
            <span class="bo_dropdown-item">Invite new contact</span>
            <img class="bo_task_img-invite" src="./img/invite-sign.png">
        </div>
    </div>`;
}

function BoardSelection(id) {
    document.getElementById(`boDropdownAssigned${id}`).classList.remove("bo_task_dropdown");
    document.getElementById(`boDropdownAssigned${id}`).classList.remove("bo_task_height");
    document.getElementById(`boDropdownAssigned${id}`).classList.add("bo_task_height-default");
    document.getElementById(`boDropdownAssigned${id}`).innerHTML = `
    <div onclick="BoardRestartDefault(id)" id='boNew_assigned${id}' class="bo_task_dropdown-container">
        <div class="bo_task_assignedbox">Select contacts to assign</div>
        <img src="./img/open.png">
    </div>
    <div id='boInitials${id}'>
        <img class="bo_task_initials" src="./img/contactSM.png">
        <img class="bo_task_initials" src="./img/contactEV.png">
        <img class="bo_task_initials" src="./img/contactMV.png">
    </div>
    <div class="bo_task_dropdown-content" id='boContent-assigned${id}'>
        <div id='boAssigned-you${id}' onclick="BoardClickyou(event, id)" class="bo_dropdown-assigned">
            <span class="bo_dropdown-item">You</span>
            <div class="bo_rectangle" id="bo_rectangle${id}"></div>
        </div>
        <div id='boAssigned-contact${id}' onclick="BoardClickcontact(event, id)" class="bo_dropdown-assigned">
            <span class="bo_dropdown-item">Laura Numey</span>
            <div class="bo_rectangle" id='bo_rectangle${id}'></div>
        </div>
        <div onclick="BoardClickinvite(id)" class="bo_dropdown-assigned">
            <span class="bo_dropdown-item">Invite new contact</span>
            <img class="bo_task_img-invite" src="./img/invite-sign.png">
        </div>
    </div>`;
}

function BoardRestartDefault(id) {
    document.getElementById(`boDropdownAssigned${id}`).classList.add("bo_task_dropdown");
    document.getElementById(`boInitials${id}`).classList.add("d-none");
    document.getElementById(`boContent-assigned${id}`).classList.toggle("bo_task_show");
}