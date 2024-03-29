function initBoard() {
    const board_tasks = document.getElementById("board_tasks");
    board_tasks.innerHTML = `
    <div class="list-wrapper" id="list_wrapper">
        <div class="column">
            <div class="column-header">
                <a>To Do</a
                ><img
                    src="./img/plus-dark.png"
                    onclick="addTaskForWrapper(0);showTaskForWrapper()"
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
                    onclick="addTaskForWrapper(1);showTaskForWrapper()"
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
                    onclick="addTaskForWrapper(2);showTaskForWrapper()"
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
                    onclick="addTaskForWrapper(3);showTaskForWrapper()"
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
    showTaskPreview();
    let show_task = document.getElementById("show_task");
    let priority =
        tasksToServer[i][0][4].charAt(0).toUpperCase() +
        tasksToServer[i][0][4].slice(1);
    show_task.innerHTML = `
    <img class="show_task_close_btn" src="./img/cancel.png" onclick="closeTaskPreview()">
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
            <img class="priority" src="./img/${tasksToServer[i][0][4]}.png" alt="Priority">
        </a>
    </div>
    <div>
        <b>Assigned To: </b>
    </div>
        <div class="edit_card_assigns" id="edit_assigns">
    </div>
    <div class="edit_card_footer">
        <button class="task_edit_button" onclick="showEditTask();editTask('${i}')">
            <img src="./img/pen.png" alt="Pen">
        </button>
    </div>
    `;
    let edit_assigns = document.getElementById(`edit_assigns`);
    const assigns = tasksToServer[i][0][1];
    for (let j = 0; j < assigns.length; j++) {
        edit_assigns.innerHTML += `
    <div class="edit_assigns_list">
        <div class="edit_assigns_circles" 
            style="background-color:${assigns[j][1]}">${assigns[j][0]}</div>
        <a>${assigns[j][2]} ${assigns[j][3]}</a>
    </div>
    `;
    }
}

// task editing options menue.
async function editTask(i) {
    await loadTaskFromBackend();
    let edit_task = document.getElementById("edit_task");
    edit_task.innerHTML = `
<img class="show_task_close_btn" src="./img/cancel.png" onclick="closeEditTask();" alt="Close">
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
        value=""
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
            class="textarea"
            id="textarea"
            style="max-width:340px;max-height:150px"
            required
            aria-label="Description"
        >${tasksToServer[i][0][5]}</textarea>
        <div id="the-count">
            <span id="count">0</span>
            <span>/130</span>
        </div>
    </div>

    <span class="required_message_board"></span>

    <div class="task_confirmation_btns">
        <button class="button_dark" type="submit">Save
            <img src="./img/check.png" alt="Check Icon" />
        </button>
    </div>
</form>
`;
noOlderDate('date');
letterCountTextarea('textarea','count');
loadEditTaskInputs(i);
}

// task to put in the selected wrapper.
function addTaskForWrapper(pos) {
    pickedContacts = [];
    let titel;
    if (pos == 0) {
        titel = "To Do";
    }
    if (pos == 1) {
        titel = "In progress";
    }
    if (pos == 2) {
        titel = "Awaiting feedback";
    }
    if (pos == 3) {
        titel = "Done";
    }
    let add_task_for_wrapper = document.getElementById("add_task_for_wrapper");
    add_task_for_wrapper.innerHTML = `
    <a class="add_task_for_wrapper_titel">${titel}</a>
    <img class="add_task_for_wrapper_close_btn" src="./img/close.png" onclick="closeTaskForWrapper()" alt="Close">

    <form class="task_main" id="add_new_task" onsubmit="createAddTaskJSON(${pos})" style="gap:20px">
        <input
            type="text"
            placeholder="Enter a title"
            name="title"
            maxlength="33"
            id="title"
            title="Enter a title for your new Task!"
            required
            aria-label="Title"
            autofocus
        />

        <div class="assign_dropdown" type="checkbox" name="categorie">
            <div class="assign_dropdown_titel" onclick="assignsOpenClose()">
                <span id="assign_contacts_placeholder">Select contacts to assign</span>
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
            value=""
            required
            min="{{ today }}"
            placeholder="Select a deadline"
            title="Select a deadline"
            aria-label="Date"
        />

        <div class="assign_dropdown" type="checkbox" name="categorie">
            <div class="assign_dropdown_titel" onclick="categoriesOpenClose()">
                <span id="assign_placeholder">Select task categorie</span>
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
                class="textarea"
                id="textarea"
                style="max-width:340px;max-height:150px"
                required
                aria-label="Description"
            ></textarea>
            <div id="the-count">
                <span id="count">0</span>
                <span>/130</span>
            </div>
        </div>

        <span class="required_message_board"></span>

        <div class="task_confirmation_btns">
            <button class="button_dark" type="submit">Add Task
                <img src="./img/plus_white.png" alt="Check Icon" />
            </button>
        </div>
    </form>
    `;
    noOlderDate('date');
    letterCountTextarea('textarea','count');
    categoryDropdown();
    initAssignDropDown();
}

function showEditTask() {
    let edit_task = document.getElementById("edit_task");
    edit_task.style.display = "block";
    closeTaskForWrapper();
}

function showTaskForWrapper() {
    let add_task_for_wrapper = document.getElementById("add_task_for_wrapper");
    add_task_for_wrapper.style.display = "block";
    closeEditTask();
}

function showTaskPreview() {
    let show_task = document.getElementById("show_task");
    show_task.style.display = "block";
}

function closeTaskPreview() {
    let show_task = document.getElementById("show_task");
    show_task.style.display = "none";
        show_task.innerHTML = ``;
}

function closeEditTask() {
    let edit_task = document.getElementById("edit_task");
    edit_task.style.display = "none";
        edit_task.innerHTML = ``;
    closeTaskPreview();
}

function closeTaskForWrapper() {
    let add_task_for_wrapper = document.getElementById("add_task_for_wrapper");
    add_task_for_wrapper.style.display = "none";
        add_task_for_wrapper.innerHTML = ``;
    closeTaskPreview();
}
