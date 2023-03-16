function deleteCard() {
    // Iterate over all four wrappers and adds the delete button to the event handlers
    for (let i = 0; i < 4; i++) {
        let wrapper = document.getElementById("wrapper_" + i);
        // Iterate over all cards in the wrapper
        const cards = wrapper.querySelectorAll(".card");
        cards.forEach(card => {
            // Find the delete button in the card
            const deleteButton = card.querySelector(`[id^='delete_']`);
            if (deleteButton) {
                // Add event listener to the delete button inside the card
                deleteButton.addEventListener("pointerdown", event => {
                    event.stopPropagation();
                });
            }
        });
    }
}

function deleteTask(i) {
    console.log(tasksToServer[i]);
    tasksToServer.splice(i, 1);
    backend.setItem("tasks", JSON.stringify(tasksToServer));
    initBoard();
}

function editCard() {
    // Iterate over all four wrappers and adds the edit button to the event handlers
    for (let i = 0; i < 4; i++) {
        let wrapper = document.getElementById("wrapper_" + i);
        // Iterate over all cards in the wrapper
        const cards = wrapper.querySelectorAll(".card");
        cards.forEach(card => {
            // Find the delete button in the card
            const editButton = card.querySelector(`[id^='edit_']`);
            if (editButton) {
                // Add event listener to the delete button inside the card
                editButton.addEventListener("pointerdown", event => {
                    event.stopPropagation();
                });
            }
        });
    }
}

function loadEditTaskInputs(i) {
    pickedContacts = []; // must delete to avoid error when reopening the dialog
    let category = tasksToServer[i][0][3][0];
    let color = tasksToServer[i][0][3][1];
    setCategoryOption(category, color);
    categoryDropdown();
    letterCountTextarea("textarea");
    SetPriority(tasksToServer[i][0][4]);
    let assignedContacts = tasksToServer[i][0][1];
    for (let i = 0; i < assignedContacts.length; i++) {
        const list = assignedContacts[i];
        initials = list[0];
        color = list[1];
        names = list[2];
        surname = list[3];
        setContacts(initials, color, i, names, surname);
    }
    initAssignDropDown();
}

async function saveEditTask(i) {
    event.preventDefault();
    let assignContacts = pickedContacts.map(contact => contact[0]);
    if (assignContacts.length === 0) {
        document.getElementById("req_msg_assign").innerHTML = `
      Please select at least one contact.
      `;
        return;
    }

    let title = document.getElementById("title").value;
    let assigns = pickedContacts;
    let deadline = document.getElementById("date").value;
    let priority = setPriority;
    let category = setCategory;
    let description = document.getElementById("textarea").value;
    let position = tasksToServer[i][0][6];

    tasks = [];
    tasks.push([
        title,
        assigns,
        deadline,
        category,
        priority,
        description,
        position,
    ]);

    console.log(tasks, i);

    tasksToServer[i] = tasks;

    updateDivContent(title, assigns, deadline, category, priority, description, position);
    // console.log(tasksToServer);

    // Write the updated tasks array back to the backend
    backend.setItem("tasks", JSON.stringify(tasksToServer));
    NavRenderBoard();
}

function updateDivContent(title, assigns, deadline, category, priority, description, position) {
    let divContent = document.getElementById("output");
  
    let html = `
      <h2>${title}</h2>
      <p><strong>Assigned to:</strong> ${assigns.join(", ")}</p>
      <p><strong>Deadline:</strong> ${deadline}</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Priority:</strong> ${priority}</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Position:</strong> ${position}</p>
    `;
  
    divContent.innerHTML = html;
}
  

// saves the position of the cards if moved to another wrapper
function chanceWrapperNoFromTask(cardId, wrapperId) {
    tasks = [];
    let title = tasksToServer[cardId][0][0];
    let assigns = tasksToServer[cardId][0][1];
    let deadline = tasksToServer[cardId][0][2];
    let category = tasksToServer[cardId][0][3];
    let priority = tasksToServer[cardId][0][4];
    let description = tasksToServer[cardId][0][5];
    let position = wrapperId;

    tasks.push([
        title,
        assigns,
        deadline,
        category,
        priority,
        description,
        position,
    ]);
    tasksToServer[cardId] = tasks;

    // Write the updated tasks array back to the backend
    backend.setItem("tasks", JSON.stringify(tasksToServer));
    // initSortArrays();
}