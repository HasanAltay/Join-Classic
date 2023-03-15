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

  const assigns = tasksToServer[i][0][1];
  for (let j = 0; j < assigns.length; j++) {
      let edit_assigns = document.getElementById(`edit_assigns`);
      edit_assigns.innerHTML += `
      <div class="edit_assigns_list">
          <div class="edit_assigns_circles" style="background-color:${assigns[j][1]}">${assigns[j][0]}</div>
          <a>${assigns[j][2]} ${assigns[j][3]}</a>
      </div>
      `;
      // console.log(tasksToServer[i][0][1]);
  }
}

function showEdit() {
  let edit_task = document.getElementById("edit_task");
  edit_task.style.display = "block";
}

function closeEdit() {
  let edit_task = document.getElementById("edit_task");
  edit_task.style.display = "none";
  resetSetContacts();
}

function showTask() {
  let show_task = document.getElementById("show_task");
  show_task.style.display = "block";
}

function closeTask() {
  let show_task = document.getElementById("show_task");
  show_task.style.display = "none";
}

function editTask(i) {
  let edit_task = document.getElementById("edit_task");
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
              <img src="./img/dd_blue.png" alt="Drop Down Arrow" />
          </div>
          <div
              class="assign_dropdown-content"
              id="assign_dropdown_list"
          ></div>
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
  `;
  loadEditTaskInputs(i);
}

// necessary to avoid errors after closing and opening
// the task edit window again.
function resetSetContacts() {
  setCategory = [];
  setPriority = undefined;
  setAssignContacts = [];
  placeholder = true;
  pickedContacts = [];
  addedCategory = [];
  progress = 0;
  assignOpen = false;
  categoryOpen = false;
}

function loadEditTaskInputs(i) {
  let category = tasksToServer[i][0][3][0];
  let color = tasksToServer[i][0][3][1];
  let assignedContacts = tasksToServer[i][0][1];
  setCategoryOption(category, color);
  initAssignDropDown();
  categoryDropdown();
  letterCountTextarea("textarea");
  SetPriority(tasksToServer[i][0][4]);
  for (let i = 0; i < assignedContacts.length; i++) {
      const list = assignedContacts[i];
      initials = list[0];
      color = list[1];
      names = list[2];
      surname = list[3];
      setContacts(initials, color, i, names, surname);
  }
}

function saveEditTask(i) {
  event.preventDefault();
  let assignContacts = pickedContacts.map(contact => contact[0]);
  if (assignContacts.length === 0) {
      document.getElementById("req_msg_assign").innerHTML = `
      Please select at least one contact.
      `;
      return;
  }
  let title = document.getElementById("title").value;
  let textarea = document.getElementById("textarea").value;
  let date = document.getElementById("date").value;
  let setPriority = tasksToServer[i][0][4];

  tasks.push([
      title,
      pickedContacts,
      date,
      setCategory,
      setPriority,
      textarea,
      progress,
  ]);
  tasksToServer[i] = tasks;
  console.log(progress);

  // Write the updated tasks array back to the backend
  backend.setItem("tasks", JSON.stringify(tasksToServer));
  initBackend();
  NavRenderBoard();
}