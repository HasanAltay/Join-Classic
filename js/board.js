document.addEventListener("DOMContentLoaded", e => {
    const list = document.querySelector(".list-wrapper");
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

            // 쥐고 있는 카드 복사
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

function loadWrappersFromServer() {
    for (let i = 0; i < tasksToServer.length; i++) {
        const taskServer = tasksToServer[i];
        let wrapper_0 = document.getElementById("wrapper_0");
        wrapper_0.innerHTML += ``;
        wrapper_0.innerHTML += `
          <div class="card">
            <div class="header">
              <div class="title">
                <span class="wrapper_category" 
                  style="background-color:${taskServer.Category.color}">
                ${taskServer.Category.category}</span>
              </div>
            </div>
              <div class="body">
                <p>${taskServer.Titel}</p>
              </div>
              <div class="caption">
                ${taskServer.Description}
              </div>
              <div class="wrapper_footer">
                <div class="assigns" id="wrapper_assigns_${i}"></div>
                <img class="priority" src="./img/${taskServer.Priority}.png">
              </div>
            </div>
          </div>
          `;
        console.log(taskServer.Contacts);
       
        console.log(i);

        for (let j = 0; j < taskServer.Contacts.length; j++) {
          const contacts = taskServer.Contacts[j];
          let wrapper_assigns = document.getElementById('wrapper_assigns_'+ i);
          wrapper_assigns.innerHTML += ``;
          wrapper_assigns.innerHTML += `
            <div class="wrapper_assigns" style="background-color:${contacts.color}">
            ${contacts.initials}
            </div>
          `; 
          console.log('wrapper_assigns_'+ i);
        }

    }




}
