let wrapperNo;

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
    // const list = document.querySelector(".list-wrapper");
    let pointerDown = false;
    let shiftX = 0;
    let shiftY = 0;
    loadWrappersFromServer();

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