function deleteCard() {
    // Check if the device supports touch events
    const isTouchDevice = 'ontouchstart' in window;

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
                if (isTouchDevice) {
                    // Use touchstart event listener for touch devices
                    deleteButton.addEventListener("touchstart", event => {
                        event.stopPropagation();
                    });
                } else {
                    // Use pointerdown event listener for non-touch devices
                    deleteButton.addEventListener("pointerdown", event => {
                        event.stopPropagation();
                    });
                }
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
    // Check if the device supports touch events
    const isTouchDevice = 'ontouchstart' in window;

    // Iterate over all four wrappers and adds the edit button to the event handlers
    for (let i = 0; i < 4; i++) {
        let wrapper = document.getElementById("wrapper_" + i);
        // Iterate over all cards in the wrapper
        const cards = wrapper.querySelectorAll(".card");
        cards.forEach(card => {
            // Find the edit button in the card
            const editButton = card.querySelector(`[id^='edit_']`);
            if (editButton) {
                // Add event listener to the edit button inside the card
                if (isTouchDevice) {
                    // Use touchstart event listener for touch devices
                    editButton.addEventListener("touchstart", event => {
                        event.stopPropagation();
                    });
                } else {
                    // Use pointerdown event listener for non-touch devices
                    editButton.addEventListener("pointerdown", event => {
                        event.stopPropagation();
                    });
                }
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

function saveEditTask(i) {
    event.preventDefault();
    if (!validateAssignContacts() || !validateCategory() || !validatePriority()) {
        return;
    }
    let saveEditedTasks = createEditedTask(i);
    tasks = [];
    tasks.push(saveEditedTasks);
    tasksToServer[i] = tasks;
    // Write the updated tasks array back to the backend
    backend.setItem("tasks", JSON.stringify(tasksToServer));
    NavRenderBoard();
    loadWrappersFromServer(); //load again
}

function createEditedTask(i) {
    let title = document.getElementById("title").value;
    let assigns = pickedContacts;
    let deadline = document.getElementById("date").value;
    let priority = setPriority;
    let category = setCategory;
    let description = document.getElementById("textarea").value;
    let position = tasksToServer[i][0][6];
    return [
        title,
        assigns,
        deadline,
        category,
        priority,
        description,
        position,
    ];
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
}
