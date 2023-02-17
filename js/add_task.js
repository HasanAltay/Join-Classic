let tasks = [];
let categories = [
    {
        category: "Sales",
        color: "#EE55FF",
    },
    {
        category: "Design",
        color: "#E88300",
    },
    {
        category: "Backoffice",
        color: "#6DD8BE",
    },
    {
        category: "Marketing",
        color: "#5000FF",
    },
    {
        category: "Media",
        color: "#EFD100",
    },
];
let setCategory;
let setPriority;
let setAssignContacts = [];
let placeholder = true;
let pickedContacts = [];

function SetPriority(num, set) {
    event.preventDefault();
    setPriority = set;
    let urgent = document.getElementById("urgent");
    let medium = document.getElementById("medium");
    let low = document.getElementById("low");

    let urgent_img = document.getElementById("urgent_img");
    let medium_img = document.getElementById("medium_img");
    let low_img = document.getElementById("low_img");

    if (num == 1) {
        urgent.style.backgroundColor = "#FF3D00";
        medium.style.backgroundColor = "#FFFFFF";
        low.style.backgroundColor = "#FFFFFF";

        urgent.style.color = "#FFFFFF";
        medium.style.color = "#000000";
        low.style.color = "#000000";

        urgent_img.style.filter = "brightness(0) invert(1)";
        medium_img.style.filter = "unset";
        low_img.style.filter = "unset";
    } else if (num == 2) {
        urgent.style.backgroundColor = "#FFFFFF";
        medium.style.backgroundColor = "#FFA800";
        low.style.backgroundColor = "#FFFFFF";

        urgent.style.color = "#000000";
        medium.style.color = "#FFFFFF";
        low.style.color = "#000000";

        urgent_img.style.filter = "unset";
        medium_img.style.filter = "brightness(0) invert(1)";
        low_img.style.filter = "unset";
    } else if (num == 3) {
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

function addTask() {
    event.preventDefault();
    let title = document.getElementById("title").value;
    let textarea = document.getElementById("textarea").value;
    let date = document.getElementById("date").value;

    console.log(title, textarea, date, setCategory, setPriority);
    // tasks.push({
    //     Titel: title,
    //     Textarea: textarea,
    //     Date: date,
    // });
    console.log(tasks);
}

function onFormSubmit() {
    event.preventDefault();
    // your Javascript code here
}

function clearForm(formId) {
    const form = document.getElementById(formId);
    form.reset();
}

function initAssignDropDown() {
    let assign_dropdown_list = document.getElementById("assign_dropdown_list");
    for (let i = 0; i < contactsListTasks.length; i++) {
        const list = contactsListTasks[i];
        assign_dropdown_list.innerHTML += `
            <button onclick="setContacts('${list[0]}','${list[3]}','${i}')">
            <div class="assign_initials" style="background-color:${list[3]}">${list[0]}</div>
            <span class="assign_details_name">${list[1]} ${list[2]}</span>
            </button>
        `;
    }
}

function setContacts(initials, color, i) {
    event.preventDefault();
    let assign_contacts_placeholder = document.getElementById(
        "assign_contacts_placeholder"
    );
    let pickedContactIds = pickedContacts.map(contact => contact.id);

    if (pickedContacts.length === 0) {
        assign_contacts_placeholder.innerHTML = "";
        placeholder = false;
    }

    if (pickedContactIds.includes(`user${i}`)) {
        return; // Exit the function if the contact has already been picked
    }

    if (pickedContacts.length >= 7) {
        return; // Exit the function if there are already 7 picked contacts
    }

    let pickedContact = document.createElement("div");
    pickedContact.setAttribute("id", `user${i}`);
    pickedContact.classList.add("picked_contacts");
    pickedContact.style.backgroundColor = color;
    pickedContact.textContent = initials;
    assign_contacts_placeholder.appendChild(pickedContact);
    pickedContacts.push(pickedContact);

    // Add event listener to remove contact when clicked
    pickedContact.addEventListener("click", () => {
        pickedContact.remove(); // Remove the contact from the DOM
        pickedContacts = pickedContacts.filter(
            contact => contact.id !== `user${i}`
        ); // Remove the contact from the array

        if (pickedContacts.length === 0) {
            assign_contacts_placeholder.innerHTML = "Select contact to assign";
            placeholder = true;
        }
    });
}

function categoryDropdown() {
    let category_dropdown = document.getElementById("category_dropdown");

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        category_dropdown.innerHTML += `
            <button onclick="setCategoryOption('${category.category}', '${category.color}')">
                <div class="assign_initials" style="background-color:${category.color}"></div>
                <span class="assign_details_name">${category.category}</span>
            </button>
        `;
    }

    category_dropdown.innerHTML += `
        <div class="assign_category_input">
            <input type="text" placeholder="Add new category" id="category_name_input">
            <input type="color" id="category_color_input" value="#000000">
            <button onclick="addCategory()" id="category_btn_input">Add</button>
        </div>
    `;
}

function addCategory() {
    event.preventDefault();
    let category_name_input = document.getElementById("category_name_input");
    let category_color_input = document.getElementById("category_color_input");

    let newCategory = {
        category: category_name_input.value,
        color: category_color_input.value,
    };

    categories.push(newCategory);

    let category_dropdown = document.getElementById("category_dropdown");
    category_dropdown.innerHTML = "";
    categoryDropdown();

    // Clear the input fields
    category_name_input.value = "";
    category_color_input.value = "#000000";
}

function setCategoryOption(category, color) {
    event.preventDefault();
    console.log(category, color);
    let assign_placeholder = document.getElementById("assign_placeholder");
    assign_placeholder.innerHTML = `
        <div style="background-color:${color}" class="assign_set_category">
            ${category}
        </div>
    `;
    setCategory = category;
}
