let tasksToServer = [];

// sorting Tasks from database.json into the wrappers.
function loadWrappersFromServer() {
    for (let i = 0; i < tasksToServer.length; i++) {
        const wrapper_0 = document.getElementById("wrapper_0");
        const wrapper_1 = document.getElementById("wrapper_1");
        const wrapper_2 = document.getElementById("wrapper_2");
        const wrapper_3 = document.getElementById("wrapper_3");
        const position = tasksToServer[i][0][6];
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
              <img class="priority" src="./img/${tasksToServer[i][0][4]}.png" style="margin-bottom: 10px;">
            </div>
          </div>
        </div>
      `;
        if (position == 0) {
            wrapper_0.innerHTML += card_content;
        }
        if (position == 1) {
            wrapper_1.innerHTML += card_content;
        }
        if (position == 2) {
            wrapper_2.innerHTML += card_content;
        }
        if (position == 3) {
            wrapper_3.innerHTML += card_content;
        }
        initAssignsForCard(i);
        // wrapperNo = i;
    }
    board = tasksToServer.length; // shows Tasks in Board at Summary
    consoleLogTasksToServer();
}

// loading the assigned contacts of the tasks to the cards
function initAssignsForCard(i) {
    const assigns = tasksToServer[i][0][1];
    const assignSpacing = 30; // horizontal spacing for overlapping between assigns
    const maxContacts = 3; // maximum number of contacts to display
    const numContacts = Math.min(assigns.length, maxContacts); // get the smaller of the two values
    
    for (let j = 0; j < numContacts; j++) {
        let wrapper_assigns = document.getElementById(`wrapper_assigns_${i}`);
        wrapper_assigns.innerHTML += `
            <div class="wrapper_assigns" style="background-color:${
                assigns[j][1]
            }; left:${j * assignSpacing}px;">
                ${assigns[j][0]}
            </div>
        `;
    }
    
    // if there are more than 3 contacts, display the number of remaining contacts in a separate div
    if (assigns.length > maxContacts) {
        let wrapper_assigns = document.getElementById(`wrapper_assigns_${i}`);
        wrapper_assigns.innerHTML += `
            <div class="wrapper_assigns" style="background-color:#6F72FF; left:${maxContacts * assignSpacing}px;">
                +${assigns.length - maxContacts}
            </div>
        `;
    }
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
