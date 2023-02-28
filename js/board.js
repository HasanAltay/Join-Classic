let wrapperNo;
let tasksToDo = [];
let tasksInProgress = [];
let awaitingFeedback = [];
let tasksDone = [];

function initSortArrays() {
  for (let i = 0; i < tasksToServer.length; i++) {
    const task = tasksToServer[i];
    const titel = tasksToServer[i][0][0];
    const wrapper = tasksToServer[i][0][6];
    const priority = tasksToServer[i][0][4];
    console.log(titel,'= Wrapper:',wrapper,'/ 3');
    sortTasksArraysForBoard(i);
    sortTasksServerToArrays(task,wrapper);
  }
}

function sortTasksArraysForBoard(task) {
  // console.log('urgent = ',task[3]);
}

function sortTasksServerToArrays(task,wrapper) {
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
  // console.log(tasksToDo,'|',tasksInProgress,'|',awaitingFeedback,'|',tasksDone);
}

function loadWrappersFromServer() {
  for (let i = 0; i < tasksToServer.length; i++) {
    const wrapper_0 = document.getElementById("wrapper_0");
    wrapper_0.innerHTML += `
    <div class="card" id="card_${i}">
      <div class="header">
        <div class="title" id="card_category">
          <span class="wrapper_category" 
          style="background-color:${tasksToServer[i][0][3][1]}">
          ${tasksToServer[i][0][3][0]}
          </span>
          <img src="./img/delete.png" id="delete_${i}" class="delete" onclick="deleteCard()" >
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

    const assigns = tasksToServer[i][0][1];
    for (let j = 0; j < assigns.length; j++) {
        let wrapper_assigns = document.getElementById(
            `wrapper_assigns_${i}`
        );
        wrapper_assigns.innerHTML += `
          <div class="wrapper_assigns" style="background-color:${assigns[j][1]}">
          ${assigns[j][0]}
          </div>
        `;
    }
    wrapperNo = i;

    // Add event listener to the delete button inside the card
    const wrapper = document.getElementById("wrapper_0");
    const deleteButton = wrapper.querySelector('.card #delete_'+wrapperNo);
    deleteButton.addEventListener('pointerdown', (event) => {      
      event.stopPropagation();
    });

    // Event listener for search bar input changes
    const searchInput = document.querySelector('.board_search_bar input');
    searchInput.addEventListener('input', searchTasks);
  }

  board = tasksToServer.length;
}

function deleteCard() {
  console.log('.card #delete_'+wrapperNo)
}

function searchTasks() {
  const input = document.querySelector('.board_search_bar input');
  const filter = input.value.toUpperCase();
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const title = card.querySelector('#card_titel p').textContent.toUpperCase();
    const category = card.querySelector('.wrapper_category').textContent.toUpperCase();
    const description = card.querySelector('#card_description').textContent.toUpperCase();

    if (title.indexOf(filter) > -1 || category.indexOf(filter) > -1 || description.indexOf(filter) > -1) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

// drag and drop functionality for cards in board
document.addEventListener("DOMContentLoaded", e => {
    let pointerDown = false;
    let shiftX = 0;
    let shiftY = 0;
    loadWrappersFromServer();

    // Check if the device is a touch device and log a message
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;
    if (isTouchDevice) {
      console.log('This is a touch device');
    }

    window.addEventListener(
        "pointerdown",
        ({clientX, clientY, pageX, pageY, target}) => {
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
    );

    window.addEventListener(
        "pointermove",
        ({clientX, clientY, pageX, pageY, target}) => {
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

            const placeCard = ghost.firstChild.cloneNode(true);
            placeCard.classList.replace("dragging", "afterimage");
            const fromCard = document.querySelector(".afterimage");

            if (closestCard) {
                if (closestCard.classList.contains("afterimage")) {
                    return;
                }

                closestCard.before(placeCard);

            } else {
                const cardWrapper = column.querySelector(".card-wrapper");
                cardWrapper.appendChild(placeCard);
            }

            fromCard.remove();

            // from here it log out the position of the card -->
            if (closestCard) {
              if (closestCard.classList.contains("afterimage")) {
                  return;
              }
          
              closestCard.before(placeCard);
          
              console.log(`Placed ${placeCard.innerText} in ${closestCard.parentNode.parentNode.querySelector('.column-header').innerText}`);
          } else {
              const cardWrapper = column.querySelector(".card-wrapper");
              cardWrapper.appendChild(placeCard);
          
              console.log(`Placed ${placeCard.innerText} in ${cardWrapper.parentNode.querySelector('.column-header').innerText}`);
          }
          // <-- till here
          
        }
    );

    window.addEventListener("pointerup", e => {
        if (!pointerDown) {
            return;
        }

        pointerDown = false;

        const ghost = document.querySelector(".ghost");
        ghost.innerHTML = "";

        const activeCard = document.querySelector(".afterimage");
        activeCard.classList.remove("afterimage");
    });
});




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
