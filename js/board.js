let wrapperNo;
let tasksToDo = [];
let tasksInProgress = [];
let awaitingFeedback = [];
let tasksDone = [];

function initSortArrays() {
    tasksToDo = [];
    tasksInProgress = [];
    awaitingFeedback = [];
    tasksDone = [];
    for (let i = 0; i < tasksToServer.length; i++) {
        const task = tasksToServer[i];
        const wrapper = tasksToServer[i][0][6];
        sortTasksServerToArrays(task, wrapper);
    }
    consoleLogTasks();
}

function sortTasksServerToArrays(task, wrapper) {
    if (wrapper == 0) {
        tasksToDo.push(task);
    }
    if (wrapper == 1) {
        tasksInProgress.push(task);
    }
    if (wrapper == 2) {
        awaitingFeedback.push(task);
    }
    if (wrapper == 3) {
        tasksDone.push(task);
    }
}

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
}

// loading tasks from database.json in backend folder.
function loadWrappersFromServer() {
    for (let i = 0; i < tasksToServer.length; i++) {
        const wrapper_0 = document.getElementById("wrapper_0");
        const wrapper_1 = document.getElementById("wrapper_1");
        const wrapper_2 = document.getElementById("wrapper_2");
        const wrapper_3 = document.getElementById("wrapper_3");
        const card_content = `
        <div class="card" id="card_${i}" data-id="${i}">
          <div class="header">
            <div class="title" id="card_category">
              <span class="wrapper_category" 
              style="background-color:${tasksToServer[i][0][3][1]}">
              ${tasksToServer[i][0][3][0]}
              </span>
              <div class="card_btns">
                <img src="./img/pen_blue.png" id="edit_${i}" class="edit" onclick="editCardNo(${i});" alt="Edit Task">
                <img src="./img/delete.png" id="delete_${i}" class="delete" onclick="deleteTask(${i})" alt="Delete Task">
              </div>
            </div>
          </div>
          <div class="body" id="card_titel"><p>${tasksToServer[i][0][0]}</p></div>
          <div class="caption" id="card_description">${tasksToServer[i][0][5]}</div>
          <div class="wrapper_footer" id="card_footer">
            <div class="assigns" id="wrapper_assigns_${i}"></div>
              <img class="priority" src="./img/${tasksToServer[i][0][4]}.png">
            </div>
          </div>
        </div>
      `;
        if (tasksToServer[i][0][6] == 0) {
            wrapper_0.innerHTML += card_content;
        }
        if (tasksToServer[i][0][6] == 1) {
            wrapper_1.innerHTML += card_content;
        }
        if (tasksToServer[i][0][6] == 2) {
            wrapper_2.innerHTML += card_content;
        }
        if (tasksToServer[i][0][6] == 3) {
            wrapper_3.innerHTML += card_content;
        }
        initAssignsForCard(i);
        wrapperNo = i;
        searchTasks();
    }
    board = tasksToServer.length; // shows Tasks in Board at Summary
}

// inits the assigned contacts from list
function initAssignsForCard(i) {
    const assigns = tasksToServer[i][0][1];
    // console.log(assigns)
    for (let j = 0; j < assigns.length; j++) {
        let wrapper_assigns = document.getElementById(`wrapper_assigns_${i}`);
        wrapper_assigns.innerHTML += `
    <div class="wrapper_assigns" style="background-color:${assigns[j][1]}">
    ${assigns[j][0]}
    </div>
    `;
    }
    deleteCard();
    countCardsInWrappers();
    editCard();
}

function searchTasks() {
    const searchInput = document.querySelector(".board_search_bar input");
    // Event listener for search bar input changes
    searchInput.addEventListener("input", searchTasks);
    const filter = searchInput.value.toUpperCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const title = card
            .querySelector("#card_titel p")
            .textContent.toUpperCase();
        const category = card
            .querySelector(".wrapper_category")
            .textContent.toUpperCase();
        const description = card
            .querySelector("#card_description")
            .textContent.toUpperCase();

        if (
            title.indexOf(filter) > -1 ||
            category.indexOf(filter) > -1 ||
            description.indexOf(filter) > -1
        ) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

// drag and drop functionality for cards in board
document.addEventListener("DOMContentLoaded", () => {
    const list = document.querySelector(".list-wrapper");
    let pointerDown = false;
    let shiftX = 0;
    let shiftY = 0;
    loadWrappersFromServer();

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    function handlePointerDown({clientX, clientY, pageX, pageY, target}) {
        const card = target.closest(".card");
        if (!card) return;

        const cloneCard = card.cloneNode(true);
        cloneCard.classList.add("dragging");
        const ghost = document.querySelector(".ghost");
        ghost.appendChild(cloneCard);

        shiftX = clientX - card.getBoundingClientRect().left;
        shiftY = clientY - card.getBoundingClientRect().top;

        ghost.style.cssText = `width: ${
            card.offsetWidth
        }px; transform: translateX(${pageX - shiftX}px) translateY(${
            pageY - shiftY
        }px)`;

        pointerDown = true;
        card.classList.add("afterimage");
    }

    function handlePointerMove({clientX, clientY, pageX, pageY, target}) {
        if (!pointerDown) {
            return;
        }

        const ghost = document.querySelector(".ghost");
        ghost.hidden = true;
        const pointedEl = document.elementFromPoint(clientX, clientY);
        const closestCard = pointedEl.closest(".card");
        const column = pointedEl.closest(".column");
        ghost.hidden = false;

        ghost.style.cssText = `width: ${
            ghost.offsetWidth
        }px; transform: translateX(${pageX - shiftX}px) translateY(${
            pageY - shiftY
        }px)`;

        if (!column) {
            return;
        }

        // Copying a card you're holding
        const placeCard = ghost.firstChild.cloneNode(true);
        placeCard.classList.replace("dragging", "afterimage");
        const fromCard = document.querySelector(".afterimage");

        if (closestCard) {
            if (closestCard.classList.contains("afterimage")) {
                return;
            }

            closestCard.before(placeCard);
        } else {
            addCardToColumn(column, placeCard);
        }

        removeCard(fromCard);
    }

    function handlePointerUp(e) {
        if (!pointerDown) {
            return;
        }

        pointerDown = false;

        const ghost = document.querySelector(".ghost");
        ghost.innerHTML = "";

        const activeCard = document.querySelector(".afterimage");
        activeCard.classList.remove("afterimage");
    }

    function addCardToColumn(column, card) {
        const cardWrapper = column.querySelector(".card-wrapper");

            // shows which card is placed in which wrapper
            const wrapperId = cardWrapper.dataset.id;
            const cardId = parseInt(card.dataset.id);
            console.log(`Card_${cardId} placed in Wrapper_${wrapperId}`);
            chanceWrapperNoFromTask(cardId, wrapperId);

        cardWrapper.appendChild(card);
    }

    function removeCard(card) {
        card.remove();
    }
});

function chanceWrapperNoFromTask(cardId, wrapperId) {
    tasks = [];
    let title = tasksToServer[cardId][0][0];
    let assigns = tasksToServer[cardId][0][1];
    let deadline = tasksToServer[cardId][0][2];
    let category = tasksToServer[cardId][0][3];
    let priority = tasksToServer[cardId][0][4];
    let description = tasksToServer[cardId][0][5];
    let wrapper = wrapperId;

    tasks.push([
        title,
        assigns,
        deadline,
        category,
        priority,
        description,
        wrapper,
    ]);
    tasksToServer[cardId] = tasks;

    // Write the updated tasks array back to the backend
    backend.setItem("tasks", JSON.stringify(tasksToServer));
    initSortArrays();
}


// // add event listener to all cards
// const cards = document.querySelectorAll('.card');
// cards.forEach(card => {
//   card.addEventListener('dragstart', dragstart);
//   card.addEventListener('dragend', dragend);
// });

// let draggedCard = null;

// function dragstart() {
//   draggedCard = this;
// }

// function dragend() {
//   const wrapperId = this.parentNode.parentNode.id;
//   const cardId = this.id;
//   console.log(`Card ${cardId} moved to wrapper ${wrapperId}`);
// }

// document.addEventListener("DOMContentLoaded", e => {
//     let pointerDown = false;
//     let shiftX = 0;
//     let shiftY = 0;
//     loadWrappersFromServer();

//     // Check if the device is a touch device and log a message
//     const isTouchDevice =
//         "ontouchstart" in window ||
//         navigator.maxTouchPoints > 0 ||
//         navigator.msMaxTouchPoints > 0;
//     if (isTouchDevice) {
//         console.log("This is a touch device");
//     }

//     window.addEventListener(
//         "pointerdown",
//         ({clientX, clientY, pageX, pageY, target}) => {
//             const card = target.closest(".card");
//             if (!card) return;

//             const cloneCard = card.cloneNode(true);
//             cloneCard.classList.add("dragging");
//             const ghost = document.querySelector(".ghost");
//             ghost.appendChild(cloneCard);

//             shiftX = clientX - card.getBoundingClientRect().left;
//             shiftY = clientY - card.getBoundingClientRect().top;

//             ghost.style.cssText = `width: ${
//                 card.offsetWidth
//             }px; transform: translateX(${pageX - shiftX}px) translateY(${
//                 pageY - shiftY
//             }px)`;

//             pointerDown = true;
//             card.classList.add("afterimage");
//         }
//     );

//     window.addEventListener(
//         "pointermove",
//         ({clientX, clientY, pageX, pageY, target}) => {
//             if (!pointerDown) {
//                 return;
//             }

//             const ghost = document.querySelector(".ghost");
//             ghost.hidden = true;
//             const pointedEl = document.elementFromPoint(clientX, clientY);
//             const closestCard = pointedEl.closest(".card");
//             const i = closestCard ? closestCard.dataset.i : null;
//             const column = pointedEl.closest(".column");
//             if (!column) {
//                 return;
//             }
//             const currentWrapper = column.querySelector(".card-wrapper");
//             ghost.hidden = false;

//             ghost.style.cssText = `width: ${
//                 ghost.offsetWidth
//             }px; transform: translateX(${pageX - shiftX}px) translateY(${
//                 pageY - shiftY
//             }px)`;

//             if (!column) {
//                 return;
//             }

//             const placeCard = ghost.firstChild.cloneNode(true);
//             placeCard.classList.replace("dragging", "afterimage");
//             const fromCard = document.querySelector(".afterimage");

//             if (
//                 closestCard &&
//                 closestCard !== fromCard &&
//                 currentWrapper !== previousWrapper
//             ) {
//                 closestCard.before(placeCard);
//                 console.log(`Dragged card ${closestCard.id} to wrapper ${closestCard.id}`);
//             } else {
//                 currentWrapper.appendChild(placeCard);
//             }

//             fromCard.remove();

//             previousWrapper = currentWrapper;
//         }
//     );

//     window.addEventListener("pointerup", e => {
//         if (!pointerDown) {
//             return;
//         }

//         pointerDown = false;

//         const ghost = document.querySelector(".ghost");
//         ghost.innerHTML = "";

//         const activeCard = document.querySelector(".afterimage");
//         activeCard.classList.remove("afterimage");
//     });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   let dragging = null;
//   let shiftX = 0;
//   let shiftY = 0;

//   // touch event listeners for starting and ending drag
//   document.addEventListener("touchstart", e => {
//     const card = e.target.closest(".card");
//     if (!card) return;

//     // clone the card and add it to a 'ghost' element
//     const cloneCard = card.cloneNode(true);
//     cloneCard.classList.add("dragging");
//     const ghost = document.querySelector(".ghost");
//     ghost.appendChild(cloneCard);

//     // calculate the offset between the touch position and the card's position
//     const rect = card.getBoundingClientRect();
//     shiftX = e.touches[0].clientX - rect.left;
//     shiftY = e.touches[0].clientY - rect.top;

//     // set the initial position of the ghost element
//     ghost.style.cssText = `width: ${
//       card.offsetWidth
//     }px; transform: translateX(${e.touches[0].pageX - shiftX}px) translateY(${
//       e.touches[0].pageY - shiftY
//     }px)`;

//     dragging = card;
//     dragging.style.opacity = 0.5;
//   }, { passive: false });

//   document.addEventListener("touchend", e => {
//     if (!dragging) return;

//     // remove the ghost element and restore the opacity of the dragged card
//     const ghost = document.querySelector(".ghost");
//     ghost.innerHTML = "";
//     dragging.style.opacity = 1;

//     dragging = null;
//   }, { passive: false });

//   // touch event listener for dragging the card
//   document.addEventListener("touchmove", e => {
//     e.preventDefault();

//     if (!dragging) return;

//     // move the ghost element with the touch movement
//     const ghost = document.querySelector(".ghost");
//     ghost.hidden = true;
//     const pointedEl = document.elementFromPoint(
//       e.touches[0].clientX,
//       e.touches[0].clientY
//     );
//     const closestCard = pointedEl.closest(".card");
//     const column = pointedEl.closest(".column");
//     ghost.hidden = false;

//     ghost.style.cssText = `width: ${
//       ghost.offsetWidth
//     }px; transform: translateX(${e.touches[0].pageX - shiftX}px) translateY(${
//       e.touches[0].pageY - shiftY
//     }px)`;

//     if (!column) {
//       return;
//     }

//     const placeCard = ghost.firstChild.cloneNode(true);
//     placeCard.classList.add("afterimage");
//     const fromCard = document.querySelector(".afterimage");

//     if (closestCard) {
//       if (closestCard.classList.contains("afterimage")) {
//         return;
//       }

//       closestCard.before(placeCard);
//     } else {
//       const cardWrapper = column.querySelector(".card-wrapper");
//       cardWrapper.appendChild(placeCard);
//     }

//     fromCard.remove();
//   }, { passive: false });
// });

// Check if the device is a touch device and log a message
// const isTouchDevice =
//     "ontouchstart" in window ||
//     navigator.maxTouchPoints > 0 ||
//     navigator.msMaxTouchPoints > 0;
// if (isTouchDevice) {
//     console.log("This is a touch device");
// }
