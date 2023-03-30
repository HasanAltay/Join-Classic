function deletedCardNo(i) {
  console.log(
      "%cCard %c%d %cDeleted",
      "color: red; font-size: 16px",
      "color: yellow; font-size: 16px",
      i,
      "color: red; font-size: 16px;"
  );
}

function consoleLogTasks() {
  console.log(
      "%cTo-Do: %c%d",
      "color: orange; font-size: 16px",
      "color: yellow; font-size: 16px",
      tasksToDo.length,
      tasksToDo
  );
  console.log(
      "%cIn progress: %c%d",
      "color: orange; font-size: 16px",
      "color: yellow; font-size: 16px",
      tasksInProgress.length,
      tasksInProgress
  );
  console.log(
      "%cAwaiting Feedback: %c%d",
      "color: orange; font-size: 16px",
      "color: yellow; font-size: 16px",
      awaitingFeedback.length,
      awaitingFeedback
  );
  console.log(
      "%cDone: %c%d",
      "color: orange; font-size: 16px",
      "color: yellow; font-size: 16px",
      tasksDone.length,
      tasksDone
  );
}