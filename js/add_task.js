let tasks = [];

let categories = [
    ["Sales", "#EE55FF"],
    ["Design", "#E88300"],
    ["Backoffice", "#6DD8BE"],
    ["Marketing", "#5000FF"],
    ["Media", "#EFD100"],
];

let setCategory = [];
let setPriority;
let setAssignContacts = [];
let placeholder = true;
let pickedContacts = [];
let addedCategory = [];
let progress = 0;

// dropdown menus open or close status
let assignOpen = false;
let categoryOpen = false;

function createAddTaskJSON() {
    event.preventDefault();
    let title = document.getElementById("title").value;
    let textarea = document.getElementById("textarea").value;
    let date = document.getElementById("date").value;

    tasks = [];
    tasks.push([
        title,
        pickedContacts,
        date,
        setCategory,
        setPriority,
        textarea,
        progress,
    ]);

    // Load existing tasks from the backend
    let existingTasks = JSON.parse(backend.getItem("tasks")) || [];
    existingTasks.push(tasks);

    // Write the updated tasks array back to the backend
    backend.setItem("tasks", JSON.stringify(existingTasks));

    // Load existing tasks from the backend
    // let existingTasks = JSON.parse(backend.getItem("tasks")) || [];
    // existingTasks.push(tasks);
    // tasksToServer = existingTasks;

    // backend.setItem("tasks", JSON.stringify(tasks));
    // tasksToServer.push(tasks);

    console.log(tasks);
    let a = true;
    showConfirmationAddTask(a);
    // dropDownOpenClose();
}

function initAssignDropDown() {
    let assign_dropdown_list = document.getElementById("assign_dropdown_list");
    for (let i = 0; i < contactsListTasks.length; i++) {
        const list = contactsListTasks[i];
        assign_dropdown_list.innerHTML += `
            <button onclick="setContacts('${list[0]}','${list[3]}','${i}','${list[1]}','${list[2]}')">
            <div class="assign_initials" style="background-color:${list[3]}">${list[0]}</div>
            <span class="assign_details_name">${list[1]} ${list[2]}</span>
            </button>
        `;
    }
}

function setContacts(initials, color, i, name, surname) {
    event.preventDefault();
    let assign_contacts_placeholder = document.getElementById(
        "assign_contacts_placeholder"
    );
    let pickedContactIds = pickedContacts.map(contact => contact[0]);

    if (pickedContacts.length === 0) {
        assign_contacts_placeholder.innerHTML = "";
        placeholder = false;
    }

    if (pickedContactIds.includes(initials)) {
        return; // Exit the function if the contact has already been picked
    }

    if (pickedContacts.length >= 6) {
        return; // Exit the function if there are already 7 picked contacts
    }

    let pickedContact = document.createElement("div");
    pickedContact.setAttribute("id", `user${i}`);
    pickedContact.classList.add("picked_contacts");
    pickedContact.style.backgroundColor = color;
    pickedContact.textContent = initials;

    // Create and position the "x" icon
    let deleteIcon = document.createElement("img");
    deleteIcon.src = "./img/delete.png";
    deleteIcon.classList.add("delete_icon");
    pickedContact.appendChild(deleteIcon);

    assign_contacts_placeholder.appendChild(pickedContact);
    pickedContacts.push([initials, color, name, surname]);

    // Add event listener to remove contact when clicked
    pickedContact.addEventListener("click", () => {
        pickedContact.remove(); // Remove the contact from the DOM
        pickedContacts = pickedContacts.filter(
            contact => contact[0] !== initials
        ); // Remove the contact from the array

        // Sets the placeholder text back if all contacts were removed
        if (pickedContacts.length === 0) {
            assign_contacts_placeholder.innerHTML = "Select contacts to assign";
            placeholder = true;
        }
        !assignsOpenClose();
    });
}

function categoryDropdown() {
    let category_dropdown = document.getElementById("category_dropdown");
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        category_dropdown.innerHTML += `
            <button onclick="setCategoryOption('${category[0]}','${category[1]}');categoriesOpenClose()">
                <div class="assign_initials" style="background-color:${category[1]}"></div>
                <span class="assign_details_name">${category[0]}</span>
            </button>
        `;
    }
    category_dropdown.innerHTML += `
        <div class="assign_category_input">
            <input type="text" placeholder="Add new category" id="category_name_input" maxlength="12">
            <div class="color_picker_btn">
                <input type="color" id="category_color_input" value="#ffffff">
                <img src="./img/color-wheel.png">
            </div>
            <button onclick="addCategory()" id="category_btn_input">Add</button>
        </div>
    `;
}

// adds new category to select from dropdown list
function addCategory() {
    event.preventDefault();
    let new_input = document.getElementById("category_name_input");
    let color_input = document.getElementById("category_color_input");
    categories.push([new_input.value, color_input.value]);

    setCategory = [];
    setCategory.push(new_input.value, color_input.value);

    let category_dropdown = document.getElementById("category_dropdown");
    category_dropdown.innerHTML = "";
    categoryDropdown();

    // Clear the input fields
    category_name_input.value = "";
    category_color_input.value = "#000000";
}

function setCategoryOption(category, color) {
    event.preventDefault();
    // console.log(category, color);
    let assign_placeholder = document.getElementById("assign_placeholder");
    assign_placeholder.innerHTML = `
        <div style="background-color:${color}" class="assign_set_category">
            ${category}
        </div>
    `;
    setCategory = [];
    setCategory.push(category, color);
}

function SetPriority(picked) {
    event.preventDefault();
    // setPriority = set;
    let urgent = document.getElementById("urgent");
    let medium = document.getElementById("medium");
    let low = document.getElementById("low");
    let urgent_img = document.getElementById("urgent_img");
    let medium_img = document.getElementById("medium_img");
    let low_img = document.getElementById("low_img");

    if (picked == "urgent") {
        urgent.style.backgroundColor = "#FF3D00";
        medium.style.backgroundColor = "#FFFFFF";
        low.style.backgroundColor = "#FFFFFF";
        urgent.style.color = "#FFFFFF";
        medium.style.color = "#000000";
        low.style.color = "#000000";
        urgent_img.style.filter = "brightness(0) invert(1)";
        medium_img.style.filter = "unset";
        low_img.style.filter = "unset";
    } else if (picked == "medium") {
        urgent.style.backgroundColor = "#FFFFFF";
        medium.style.backgroundColor = "#FFA800";
        low.style.backgroundColor = "#FFFFFF";
        urgent.style.color = "#000000";
        medium.style.color = "#FFFFFF";
        low.style.color = "#000000";
        urgent_img.style.filter = "unset";
        medium_img.style.filter = "brightness(0) invert(1)";
        low_img.style.filter = "unset";
    } else if (picked == "low") {
        urgent.style.backgroundColor = "#FFFFFF";
        medium.style.backgroundColor = "#FFFFFF";
        low.style.backgroundColor = "#7AE229";
        urgent.style.color = "#000000";
        medium.style.color = "#000000";
        low.style.color = "#FFFFFF";
        urgent_img.style.filter = "unset";
        medium_img.style.filter = "unset";
        low_img.style.filter = "brightness(0) invert(1)";
    }
}

// shows confirmation menu if task is added
function showConfirmationAddTask(a) {
    let task_added_confirmation = document.getElementById(
        "task_added_confirmation"
    );
    if (a) {
        task_added_confirmation.style.visibility = "visible";
    }
    if (!a) {
        task_added_confirmation.style.visibility = "hidden";
    }
}

function onFormSubmit() {
    event.preventDefault();
    // your Javascript code here
}

// clears the input fields of the form and refreshes hole section
function clearForm(formId) {
    const form = document.getElementById(formId);
    form.reset();
    NavRenderAddTask();
    NavClick(3);
}

// open and close for contacts assigns dropdown
function assignsOpenClose() {
    const assignsContent = document.getElementById("assign_dropdown_list");
    if (assignOpen == false) {
        assignsContent.style.visibility = "visible";
        assignOpen = true;
    } else if (assignOpen == true) {
        assignsContent.style.visibility = "hidden";
        assignOpen = false;
    }
}

// open and close for categories dropdown
function categoriesOpenClose() {
    const categoriesContent = document.getElementById("category_dropdown");
    if (categoryOpen == false) {
        categoriesContent.style.visibility = "visible";
        categoryOpen = true;
    } else if (categoryOpen == true) {
        categoriesContent.style.visibility = "hidden";
        categoryOpen = false;
    }
}
