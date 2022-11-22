let todos = [
    {
        'id': 0,
        'department': 'Design',
        'title': 'Website redesign',
        'category': 'Todo',
        'description': 'Modify the contents of the main website'
    },

    {
        'id': 1,
        'department': 'Marketing',
        'title': 'Social media Strategy',
        'category': 'In progress',
        'description': 'Develop an ad campaign for brand positioning'
    },

    {
        'id': 2,
        'department': 'Sales',
        'title': 'Call potencial clients',
        'category': 'Awaiting Feedback',
        'description': 'Make the product presentation to the prospective buyers'
    },

    {
        'id': 3,
        'department': 'Backoffice',
        'title': 'Accounting Invoices',
        'category': 'Done',
        'description': 'Write open invoices for customer'
    }
];


let currentDraggedElement;
let urgentClicked = false;
let mediumClicked = false;
let lowClicked = false;


function updateHTML() {
    let todo = todos.filter(t => t['category'] == 'Todo');

    document.getElementById('todo').innerHTML = '';

    for (let index = 0; index < todo.length; index++) {
        const element = todo[index];

        document.getElementById('todo').innerHTML += generateTodoHTML(element);
    }


    let inProgress = todos.filter(t => t['category'] == 'In progress');

    document.getElementById('inProgress').innerHTML = '';

    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];

        document.getElementById('inProgress').innerHTML += generateTodoHTML(element);
    }


    let awaitingFB = todos.filter(t => t['category'] == 'Awaiting Feedback');

    document.getElementById('awaitingFB').innerHTML = '';

    for (let index = 0; index < awaitingFB.length; index++) {
        const element = awaitingFB[index];

        document.getElementById('awaitingFB').innerHTML += generateTodoHTML(element);
    }



    let done = todos.filter(t => t['category'] == 'Done');

    document.getElementById('done').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const element = done[index];

        document.getElementById('done').innerHTML += generateTodoHTML(element);
    }
}


function startDragging(id) {
    currentDraggedElement = id;
}


function generateTodoHTML(element) {
    return `<div onclick="openTodoInfo('bo_popUp${element['id']}')" draggable="true" ondragstart="startDragging(${element['id']})" class="bo_todo c-pointer">
              <div class="bo_todo_infos">
                <span class="bo_department font16-400">${element['department']}</span>
                <br>
                  <div class="bo_todo_title font16-700">${element['title']}</div>
                   <div>
                    <div class="font16-400">${element['description']}</div>
                  </div>
               </div>
                ${showPopUp(element)}
            </div>`;          
}


function showPopUp(element) {
    return `<div id="bo_popUp${element['id']}" class="bo_pop_up d-none">
             <div class="bo_popup_todo_Info">
                <div id="boPopUpInfo${element['id']}">
                   <button onclick="closeTodoInfo('bo_popUp${element['id']}', event)" class="bo_cancel_btn c-pointer">
                     <img src="./img/cancel.png">
                   </button>
                     <span class="bo_popUp_department">${element['department']}</span>
                     <br>
                     <div class="mt-25 font61-700">${element['title']}</div>
                        <div>
                         <div class="mt-25 font21-400">${element['description']}</div>
                        </div>
                            <div class="mt-25 font21-400"><span class="mr-20 font21-700">Due date:</span> 05-08-2022</div>
                            <div class="mt-25 font21-400"><span class="mr-20 font21-700">Priority:</span></div>
                            <div class="mt-25 font21-400"><span class="mr-20 font21-700">Assigned to:</span></div>
                                <button onclick="openTodoEdit(${element['id']})" class="bo_edit_todo c-pointer" onmouseenter="changeEditBtn('./img/edit-light.png', ${element['id']})" onmouseleave="resetEditBtn('./img/edit-dark.png', ${element['id']})">
                                  <img id="boEditTodo${element['id']}" src="./img/edit-dark.png">
                                </button>
                </div>

             <div id="boEditPopUp${element['id']}" class="bo_edit_task d-none">
                <div class="mb-40">
                 <span class="title">Title</span>
                    <input id="title" class="titlebox" type="text" placeholder="Enter a title" onfocus="this.placeholder=''"
                    onblur="this.placeholder='Enter a title'">
                </div>

                <div class="mb-40">
                  <span class="description">Description</span>
                         <textarea id="description" class="descriptionbox" placeholder="Enter a description"
                             onfocus="this.placeholder=''" onblur="this.placeholder='Enter a description'"></textarea>
                </div>

                <div class="mb-40">
                  <span class="date">Due Date</span>
                       <input class="datebox" type="date">
                </div>

                <div class="mb-40">
                  <span class="font21-400 bo_prio">Prio</span>
                    <div class="bo_prio_btn">
                        <button id="prioUrgent" onclick="changeToRed()" class="prio-urgent"><span id="whiteUrgent"
                         class="urgent">Urgent</span><img id="img-up-white" src="./img/up.png"></button>
                        <button id="prioMedium" onclick="changeToOrange()" class="prio-medium"><span id="whiteMedium"
                            class="medium">Medium</span><img id="img-middle-white" src="./img/middle.png"></button>
                        <button id="prioLow" onclick="changeToGreen()" class="prio-low"><span id="whiteLow"
                        class="low">Low</span><img id="img-down-white" src="./img/down.png"></button>
                     </div>
                </div>

                <div class="mb-40">
                    <span class="assigned">Assigned to</span>
                     <div id="assign" class="assign-selection">
                        <span class="assignedbox">Select contacts to assign</span>
                          <img src="./img/open.png">
                     </div>
                 </div>

                 <button onclick="closeTodoEdit(${element['id']})" class="bo_button_dark ">Ok<img src="./img/check.png"></button>
        </div>
    </div>`;   
}



function allowDrop(ev) {
    ev.preventDefault();
}


function moveTo(category) {
    todos[currentDraggedElement]['category'] = category;
    updateHTML();
}


function openTodoInfo(id) {
    document.getElementById(id).classList.remove('d-none');
}


function closeTodoInfo(id, event) {
    document.getElementById(id).classList.add('d-none');
    event.stopPropagation();
}


function changeEditBtn(img, i) {
    document.getElementById('boEditTodo'+ i).src = img;
}


function resetEditBtn(img, i) {
    document.getElementById('boEditTodo'+ i).src = img;
}


function openTodoEdit(i) {
    document.getElementById('boEditPopUp'+ i).classList.remove('d-none');
    document.getElementById('boPopUpInfo'+ i).classList.add('d-none');
}


function closeTodoEdit(i) {
    document.getElementById('boEditPopUp'+ i).classList.add('d-none');
    document.getElementById('boPopUpInfo'+ i).classList.remove('d-none');
}


function changeAddTaskBtn(img) {
    document.getElementById('bo_AddTaskPlus').src = img;
}


function resetAddTaskBtn(img) {
    document.getElementById('bo_AddTaskPlus').src = img;
}


function urgentButtonDefault() {
    document.getElementById('prioUrgent').style.backgroundColor = "#FFFFFF";
    document.getElementById('whiteUrgent').style.color = "#000000";
    document.getElementById('img-up-white').src = "./img/up.png";
    urgentClicked = false;
}


function mediumButtonDefault() {
    document.getElementById('prioMedium').style.backgroundColor = "#FFFFFF";
    document.getElementById('whiteMedium').style.color = "#000000";
    document.getElementById('img-middle-white').src = "./img/middle.png";
    mediumClicked = false;
}


function lowButtonDefault() {
    document.getElementById('prioLow').style.backgroundColor = "#FFFFFF";
    document.getElementById('whiteLow').style.color = "#000000";
    document.getElementById('img-down-white').src = "./img/down.png";
    lowClicked = false;
}


function changeToRed() {
    if (urgentClicked == false) {
        document.getElementById('prioUrgent').style.backgroundColor = "#FF3D00";
        document.getElementById('whiteUrgent').style.color = "#FFFFFF";
        document.getElementById('img-up-white').src = "./img/arrowUpWhite.png";
        urgentClicked = true;
    } else {
        urgentButtonDefault();
    }
    mediumButtonDefault();
    lowButtonDefault();
}

function changeToOrange() {
    if (mediumClicked == false) {
        document.getElementById('prioMedium').style.backgroundColor = "#FFA800";
        document.getElementById('whiteMedium').style.color = "#FFFFFF";
        document.getElementById('img-middle-white').src = "./img/arrowMiddleWhite.png";
        mediumClicked = true;
    } else {
        mediumButtonDefault();
    }
    urgentButtonDefault();
    lowButtonDefault();
}

function changeToGreen() {
    if (lowClicked == false) {
        document.getElementById('prioLow').style.backgroundColor = "#7AE229";
        document.getElementById('whiteLow').style.color = "#FFFFFF";
        document.getElementById('img-down-white').src = "./img/arrowDownWhite.png";
        lowClicked = true;
    } else {
        lowButtonDefault();
    }
    urgentButtonDefault();
    mediumButtonDefault();
}