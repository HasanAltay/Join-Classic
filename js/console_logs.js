function deletedCardNo(i) {
  // console.log(
  //     "%cCard %c%d %cDeleted",
  //     "color: red; font-size: 16px",
  //     "color: yellow; font-size: 16px",
  //     i,
  //     "color: red; font-size: 16px;"
  // );
}

function consoleLogTasks() {
  // console.log(
  //     "%cTo-Do: %c%d",
  //     "color: orange; font-size: 16px",
  //     "color: yellow; font-size: 16px",
  //     tasksToDo.length,
  //     tasksToDo
  // );
  // console.log(
  //     "%cIn progress: %c%d",
  //     "color: orange; font-size: 16px",
  //     "color: yellow; font-size: 16px",
  //     tasksInProgress.length,
  //     tasksInProgress
  // );
  // console.log(
  //     "%cAwaiting Feedback: %c%d",
  //     "color: orange; font-size: 16px",
  //     "color: yellow; font-size: 16px",
  //     awaitingFeedback.length,
  //     awaitingFeedback
  // );
  // console.log(
  //     "%cDone: %c%d",
  //     "color: orange; font-size: 16px",
  //     "color: yellow; font-size: 16px",
  //     tasksDone.length,
  //     tasksDone
  // );
}

// document.addEventListener("DOMContentLoaded", e => {
//   const list = document.querySelector(".list-wrapper");
//   let pointerDown = false;
//   let shiftX = 0;
//   let shiftY = 0;
//   loadWrappersFromServer();

//   window.addEventListener(
//       "pointerdown",
//       ({clientX, clientY, pageX, pageY, target}) => {
//           const card = target.closest(".card");
//           if (!card) return;

//           const cloneCard = card.cloneNode(true);
//           cloneCard.classList.add("dragging");
//           const ghost = document.querySelector(".ghost");
//           ghost.appendChild(cloneCard);

//           shiftX = clientX - card.getBoundingClientRect().left;
//           shiftY = clientY - card.getBoundingClientRect().top;

//           ghost.style.cssText = `width: ${
//               card.offsetWidth
//           }px; transform: translateX(${pageX - shiftX}px) translateY(${
//               pageY - shiftY
//           }px)`;

//           pointerDown = true;
//           card.classList.add("afterimage");
//       }
//   );

//   window.addEventListener(
//       "pointermove",
//       ({clientX, clientY, pageX, pageY, target}) => {
//           if (!pointerDown) {
//               return;
//           }

//           const ghost = document.querySelector(".ghost");
//           ghost.hidden = true;
//           const pointedEl = document.elementFromPoint(clientX, clientY);
//           const closestCard = pointedEl.closest(".card");
//           const column = pointedEl.closest(".column");
//           ghost.hidden = false;

//           ghost.style.cssText = `width: ${
//               ghost.offsetWidth
//           }px; transform: translateX(${pageX - shiftX}px) translateY(${
//               pageY - shiftY
//           }px)`;

//           if (!column) {
//               return;
//           }

//           // Copying a card you're holding
//           const placeCard = ghost.firstChild.cloneNode(true);
//           placeCard.classList.replace("dragging", "afterimage");
//           const fromCard = document.querySelector(".afterimage");

//           if (closestCard) {
//               if (closestCard.classList.contains("afterimage")) {
//                   return;
//               }

//               closestCard.before(placeCard);
//           } else {
//               const cardWrapper = column.querySelector(".card-wrapper");
//               cardWrapper.appendChild(placeCard);
//           }

//           fromCard.remove();
//       }
//   );

//   window.addEventListener("pointerup", e => {
//       if (!pointerDown) {
//           return;
//       }

//       pointerDown = false;

//       const ghost = document.querySelector(".ghost");
//       ghost.innerHTML = "";

//       const activeCard = document.querySelector(".afterimage");
//       activeCard.classList.remove("afterimage");
//   });
// });