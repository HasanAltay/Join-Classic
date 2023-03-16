function initBoard() {
    const board_tasks = document.getElementById("board_tasks");
    board_tasks.innerHTML = `
  <div class="list-wrapper" id="list_wrapper">
    <div class="column">
        <div class="column-header">
            <a>To Do</a
            ><img
                src="./img/plus-dark.png"
                onclick="NavRenderAddTask(); NavClick(3)"
                alt="Dark Plus Icon"
            />
        </div>
        <div class="card-wrapper" id="wrapper_0" data-id="0"></div>
    </div>
    <div class="column">
        <div class="column-header">
            <a>In progress</a
            ><img
                src="./img/plus-dark.png"
                onclick="NavRenderAddTask(); NavClick(3)"
                alt="Dark Plus Icon"
            />
        </div>
        <div class="card-wrapper" id="wrapper_1" data-id="1"></div>
    </div>
    <div class="column">
        <div class="column-header">
            <a>Await feedback</a
            ><img
                src="./img/plus-dark.png"
                onclick="NavRenderAddTask(); NavClick(3)"
                alt="Dark Plus Icon"
            />
        </div>
        <div class="card-wrapper" id="wrapper_2" data-id="2"></div>
    </div>
    <div class="column">
        <div class="column-header">
            <a>Done</a
            ><img
                src="./img/plus-dark.png"
                onclick="NavRenderAddTask(); NavClick(3)"
                alt="Dark Plus Icon"
            />
        </div>
        <div class="card-wrapper" id="wrapper_3" data-id="3"></div>
    </div>
  </div>
  <div class="ghost"></div>
`;
    loadWrappersFromServer();
    deleteCard();
    countCardsInWrappers();
    editCard();
    searchTasks();
}

function editCardNo(i) {
    showTask();
    let show_task = document.getElementById("show_task");
    let priority =
        tasksToServer[i][0][4].charAt(0).toUpperCase() +
        tasksToServer[i][0][4].slice(1);
    show_task.innerHTML = `
<img class="show_task_close_btn" src="./img/cancel.png" onclick="closeTask()">

<div class="header">
  <div class="title" id="card_category">
    <span class="wrapper_category" 
    style="background-color:${tasksToServer[i][0][3][1]}">
    ${tasksToServer[i][0][3][0]}
    </span>
  </div>
</div>
<div class="edit_card_titel">${tasksToServer[i][0][0]}</div>
<div class="edit_card_caption" id="card_description">${tasksToServer[i][0][5]}</div>

<div class="edit_card_details">
    <div>
        <b>Due Date:&emsp;</b>
        <a>${tasksToServer[i][0][2]}</a>
    </div>
    <div>
        <b>Priority:&emsp;</b>
        <a class="edit_task_priority">${priority}
            <img class="priority" src="./img/${tasksToServer[i][0][4]}.png">
        </a>
    </div>
    <div>
        <b>Assigned To: </b>
    </div>
        <div class="edit_card_assigns" id="edit_assigns">
    </div>
    <div class="edit_card_footer">
        <button class="task_edit_button" onclick="showEdit();editTask('${i}')">
            <img src="./img/pen.png">
        </button>
    </div>
`;
    let edit_assigns = document.getElementById(`edit_assigns`);
    // edit_assigns.innerHTML = ``;
    const assigns = tasksToServer[i][0][1];
    for (let j = 0; j < assigns.length; j++) {
        edit_assigns.innerHTML += `
    <div class="edit_assigns_list">
        <div class="edit_assigns_circles" style="background-color:${assigns[j][1]}">${assigns[j][0]}</div>
        <a>${assigns[j][2]} ${assigns[j][3]}</a>
    </div>
    `;
        console.log(assigns[j][0], assigns[j][2], assigns[j][3]);
    }
}

async function editTask(i) {
    await loadTaskFromBackend();
    let edit_task = document.getElementById("edit_task");
    // edit_task.innerHTML = ``;
    edit_task.innerHTML = `
<img class="show_task_close_btn" src="./img/cancel.png" onclick="closeEdit();closeTask();">
<form class="task_main" id="add_new_task" onsubmit="saveEditTask(${i})" style="gap:20px">
    <input
        value="${tasksToServer[i][0][0]}"
        type="text"
        placeholder="Enter a title"
        name="title"
        maxlength="33"
        id="title"
        title="Enter a title for your new Task!"
        required
        aria-label="Title"
    />

    <div class="assign_dropdown" type="checkbox" name="categorie">
        <div class="assign_dropdown_titel" onclick="assignsOpenClose()">
            <span id="assign_contacts_placeholder"></span>
            <img src="./img/dd_blue.png" alt="Drop Down Arrow">
        </div>
        <div class="assign_dropdown-content" id="assign_dropdown_list"></div>
    </div>

    <input
        type="date"
        name="date"
        id="date"
        class="task_date"
        pattern="\d{4}-\d{2}-\d{2}"
        required
        min="{{ today }}"
        value="${tasksToServer[i][0][2]}"
        placeholder="Select a deadline"
        title="Select a deadline"
        aria-label="Date"
    />

    <div class="assign_dropdown" type="checkbox" name="categorie">
        <div class="assign_dropdown_titel" onclick="categoriesOpenClose()">
            <span id="assign_placeholder"></span>
            <img src="./img/dd_blue.png" alt="Drop Down Arrow">
        </div>
        <div class="assign_dropdown-content" id="category_dropdown"></div>
    </div>

    <div class="task_priorities">
        <button
            id="urgent"
            class="pr_urgent"
            onclick="SetPriority('urgent')"
        >
            Urgent<img
                src="./img/urgent.png"
                id="urgent_img"
                alt="Urgent Icon"
            />
        </button>

        <button
            id="medium"
            class="pr_medium"
            onclick="SetPriority('medium')"
        >
            Medium<img
                src="./img/medium.png"
                id="medium_img"
                alt="Medium Icon"
            />
        </button>

        <button
            id="low"
            class="pr_low"
            onclick="SetPriority('low')"
        >
            Low<img src="./img/low.png" id="low_img" alt="Low Icon" />
        </button>
    </div>

    <div class="task_textarea">
        <textarea
            name="textarea"
            placeholder="Enter a Description"
            maxlength="130"
            type="text"
            id="textarea"
            style="max-width:340px;max-height:150px"
            required
            aria-label="Description"
        >${tasksToServer[i][0][5]}</textarea>
        <div id="the-count">
            <span id="current">0</span>
            <span id="maximum">/130</span>
        </div>
    </div>

    <span class="required_message_board" id="req_msg_assign"></span>

    <div class="task_confirmation_btns">
        <button class="button_dark" type="submit">Save
            <img src="./img/check.png" alt="Check Icon" />
        </button>
    </div>
</form>

<div id="output"></div>
`; 
loadEditTaskInputs(i);
}

function showEdit() {
  let edit_task = document.getElementById("edit_task");
  // edit_task.innerHTML = ``;
  edit_task.style.display = "block";
  let assign_contacts_placeholder = document.getElementById(
    "assign_contacts_placeholder");
  assign_contacts_placeholder = "";
}

function closeEdit() {
  let edit_task = document.getElementById("edit_task");
  // edit_task.innerHTML = ``;
  edit_task.style.display = "none";
}

function showTask() {
  let show_task = document.getElementById("show_task");
  show_task.style.display = "block";
  // show_task.innerHTML = ``;
}

function closeTask() {
  let show_task = document.getElementById("show_task");
  show_task.style.display = "none";
  // show_task.innerHTML = ``;
}