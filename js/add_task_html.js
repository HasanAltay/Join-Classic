function initAddTask() {
pickedContacts = [];
addedCategory = [];
const init_add_task = document.getElementById('init_add_task');
init_add_task.innerHTML = `
<form class="task_main" id="add_new_task" onsubmit="createAddTaskJSON(0)">
<input
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
    <span class="required_message" id="req_msg_assign"></span>
    <div class="assign_dropdown_titel" onclick="assignsOpenClose()">
        <span id="assign_contacts_placeholder"
            >Select contacts to assign</span
        ><img src="./img/dd_blue.png" alt="Drop Down Arrow" />
    </div>
    <div
        class="assign_dropdown-content"
        id="assign_dropdown_list"
    ></div>
</div>

<input
    type="date"
    name="date"
    id="date_add_task"
    class="task_date"
    pattern="\d{4}-\d{2}-\d{2}"
    required
    min="{{today}}"
    placeholder="Select a deadline"
    title="Select a deadline"
    aria-label="Date"
/>

<div class="assign_dropdown" type="checkbox" name="categorie">
    <span class="required_message" id="req_msg_category"></span>
    <div class="assign_dropdown_titel" onclick="categoriesOpenClose()">
        <span id="assign_placeholder">Select task categorie</span>
        <img src="./img/dd_blue.png" alt="Drop Down Arrow" />
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
        id="textarea_add_task"
        required
        aria-label="Description"
    ></textarea>
    <div id="the-count">
        <span id="count_add_task">0</span>
        <span>/130</span>
    </div>
</div>

<div class="task_confirmation_btns">
    <button class="button_bright" onclick="clearForm('add_new_task')">
        Clear
    </button>
    <button class="button_dark" type="submit">
        Create Task<img src="./img/check.png" alt="Check Icon" />
    </button>
</div>
</form>

<div class="confirmation" id="task_added_confirmation">
<span>Task added to Board!</span>
<button
    class="button_dark"
    onclick="NavRenderBoard(); NavClick(2); showConfirmationAddTask(a=false);"
>
    OK
</button>
</div>
`;
noOlderDate('date_add_task');
letterCountTextarea('textarea_add_task','count_add_task');
}