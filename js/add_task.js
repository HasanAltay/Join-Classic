let tasks = [];
let categories = [
    ["Sales", "#EE55FF"],
    ["Design", "#E88300"],
    ["Backoffice", "#6DD8BE"],
    ["Marketing", "#5000FF"],
    ["Media", "#EFD100"],
];
let setCategory = [];
let setPriority = null;
let placeholder = true;
let pickedContacts = [];
let addedCategory = [];
let new_color = 'brown'; // predefined color if none is selected

// dropdown menus open or close status
let assignOpen = false;
let categoryOpen = false;

function createAddTaskJSON(pos) {
    event.preventDefault();
    AddNewTask = createTask(pos);
    let required_msg = document.querySelector('.required_message_board');
    required_msg.innerHTML = ``;

    if (!validateAssignContacts() || !validateCategory() || !validatePriority()) {
        return;
      }

    required_msg.innerHTML = ``;
    tasks = [];
    tasks.push(AddNewTask);
    // Load existing tasks from the backend
    let existingTasks = JSON.parse(backend.getItem("tasks")) || [];
    existingTasks.push(tasks);
    // Write the updated tasks array back to the backend
    backend.setItem("tasks", JSON.stringify(existingTasks));
    showConfirmationAddTask(a = true);
}

function createTask(pos) {
    let title = document.getElementById("title").value;
    let textarea = document.querySelector('.textarea').value;
    let date = document.querySelector('.task_date').value;
    let position = pos;
    return [
        title,
        pickedContacts,
        date,
        setCategory,
        setPriority,
        textarea,
        position,
    ];
}

// check if at least one contact is added. otherwise give a warning.
function validateAssignContacts() {
    let assignContacts = pickedContacts.map(contact => contact[0]);
    if (assignContacts.length === 0) {
        let required_msg = document.querySelector('.required_message_board');
        required_msg.innerHTML = `
        Please select at least one contact!
      `;
      return false;
    }
    return true;
  }
  
  // check if a category is selected. otherwise give a warning.
  function validateCategory() {
    if (setCategory.length === 0) {
        let required_msg = document.querySelector('.required_message_board');
        required_msg.innerHTML = `
        Please select a category!
      `;
      return false;
    }
    return true;
  }

  
  function validatePriority() {
    if (setPriority == null) {
        let required_msg = document.querySelector('.required_message_board');
        required_msg.innerHTML = `
        Please select a priority!
      `;
      return false;
    }
    return true;
  }

function initAssignDropDown() {
    tasks = [];
    let form_ignore = true;
    let assign_dropdown_list = document.getElementById("assign_dropdown_list");
    assign_dropdown_list.innerHTML = ``;
    for (let i = 0; i < contactsListTasks.length; i++) {
        const list = contactsListTasks[i];
        assign_dropdown_list.innerHTML += `
        <button onclick="setContacts('${list[0]}','${list[3]}','${i}','${list[1]}','${list[2]}','${form_ignore}')">
        <div class="assign_initials" style="background-color:${list[3]}">${list[0]}</div>
        <span class="assign_details_name">${list[1]} ${list[2]}</span>
        </button>
        `;
    }
}

function setContacts(initials, color, i, name, surname, form_ignore) {
    if (form_ignore) {
        event.preventDefault();
    }
    let assign_contacts_placeholder = document.getElementById("assign_contacts_placeholder");
    let pickedContactIds = pickedContacts.map(contact => contact[0]);
    if (pickedContacts.length === 0) {
        assign_contacts_placeholder.innerHTML = "";
        placeholder = false;
    }
    if (pickedContactIds.includes(initials)) {
        return; // Exit the function if the contact has already been picked
    }
    if (pickedContacts.length >= 6) {
        return; // Exit the function if there are already 6 picked contacts
    }
    let pickedContact = document.createElement("div");
    pickedContact.setAttribute("id", `user${i}`);
    pickedContact.classList.add("picked_contacts");
    pickedContact.style.backgroundColor = color;
    pickedContact.textContent = initials;

    // Create and position the "x" remove/delete icon
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
        <input type="text" placeholder="Add new category" id="category_name_input" maxlength="12" minlength="3">
        <button class="color_picker_button" id="color_picker_button" onclick="showPickColor()">
        <img src="./img/eyedropper.png" id="picker_icon">
            <div class="colors_to_pick" id="colors_to_pick">
                <div onclick="pickColor('red')" value="red" style="background-color: red;">Red</div>
                <div onclick="pickColor('blue')" value="blue" style="background-color: blue;">Blue</div>
                <div onclick="pickColor('green')" value="green" style="background-color: green;">Green</div>
                <div onclick="pickColor('magenta')" value="magenta" style="background-color: magenta;">Magenta</div>
                <div onclick="pickColor('cyan')" value="cyan" style="background-color: cyan;">Cyan</div>
                <div onclick="pickColor('orange')" value="orange" style="background-color: orange;">Orange</div>
                <div onclick="pickColor('purple')" value="purple" style="background-color: purple;">Purple</div>
                <div onclick="pickColor('brown')" style="background-color: brown;">Brown</div>
            </div>  
        </button>
        <button onclick="addCategory()" id="category_btn_input">Add</button>
    </div>
    `;
}

function pickColor(color) {
    closePickColor();
    event.preventDefault();
    const color_picker_button = document.getElementById('color_picker_button');
    const picker_icon = document.getElementById('picker_icon');
    color_picker_button.style.backgroundColor = color;
    new_color = color;
    picker_icon.style.filter = "invert(1)";
}

function showPickColor() {
    event.preventDefault();
    let colors_to_pick = document.getElementById('colors_to_pick');
    colors_to_pick.style.visibility = 'visible';
}

function closePickColor() {
    event.preventDefault();
    let colors_to_pick = document.getElementById('colors_to_pick');
    colors_to_pick.style.visibility = 'hidden';
}

// adds new category to select from dropdown list
function addCategory() {
    event.preventDefault();
    let category_name = document.getElementById("category_name_input");
    if (category_name.value == '') {
        return;
    }
    let new_input = category_name.value.charAt(0).toUpperCase() + category_name.value.slice(1);
    const new_category = [new_input, new_color];

    // Check if a new category has already been added
    if (categories.length > 5) {
        categories.splice(-1, 1, new_category);
    } else {
        categories.push(new_category);
    }

    let category_dropdown = document.getElementById("category_dropdown");
    category_dropdown.innerHTML = "";
    categoryDropdown();

    // Clear the input fields
    category_name.value = "";
    new_color = "brown";
}

function setCategoryOption(category, color) {
    event.preventDefault();
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
    setPriority = picked;
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

// clears the input fields of the form and refreshes hole section
function clearForm(formId) {
    const form = document.getElementById(formId);
    form.reset();
    setPriority = null;
    setCategory = [];
    placeholder = true;
    pickedContacts = [];
    addedCategory = [];
    new_color = 'brown';
    NavRenderAddTask();
    NavClick(3);
}

// open and close for contacts assigns dropdown
function assignsOpenClose() {
    let assignsContent = document.getElementById("assign_dropdown_list");
    if (assignOpen == false) {
        assignsContent.style.visibility = "visible";
        assignOpen = true;
    } else {
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
    } else {
        categoriesContent.style.visibility = "hidden";
        categoryOpen = false;
        closePickColor();
    }
}
