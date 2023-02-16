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

function SetPriority(num, set) {
    event.preventDefault();
    console.log(set);

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
    event.preventDefault(list);
    let title = document.getElementById("title").value;
    let textarea = document.getElementById("textarea").value;
    let date = document.getElementById("date").value;

    console.log(title, textarea, date);
    tasks.push({
        Titel: title,
        Textarea: textarea,
        Date: date,
    });
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
    <button onclick="addTask(list)">
      <div class="assign_initials" style="background-color:${list[3]}">${list[0]}</div>
      <span class="assign_details_name">${list[1]} ${list[2]}</span>
    </button>
  `;
    }
}

function categoryDropdown() {
    let category_dropdown = document.getElementById("category_dropdown");

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        category_dropdown.innerHTML += `
  <button>
    <div class="assign_initials" style="background-color:${category.color}"></div>
    <span class="assign_details_name">${category.category}</span>
  </button>
`;
    }
}
