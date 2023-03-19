let urgent = 0;
let deadline = "Mon May 09 2023";
let board = 0;
let inProgress = 0;
let awaitFeedback = 0;
let todo = 0;
let done = 0;

function initSummary() {
    const sum_frame_squares = document.getElementById("sum_frame_squares");
    sum_frame_squares.innerHTML = /*html*/ `
        <div class="sum_greeting">
            <div class="sum_daytime" id="sum_daytime"></div>
            <div class="sum_user" id="sum_user">Guest</div>
        </div>
        <div class="sum_middle">
        <div class="sum_frame_urgent">
            <img src="./img/urgent_summary.png"/>
            <div>
                <span id="sum_urgent">${urgent}</span><br />
                <a style="font-size: 16px; font-weight: 400">Urgent</a>
            </div>
        </div>
        <div class="sum_frame_deadline">
            <span id="sum_deadline">${deadline}</span>
            <a>Upcoming Deadline</a>
        </div>
        </div>
        <div class="sum_squares">
            <div>
                <img src="./img/kanban.png">
                <a id="sum_board">${board}</a>
            </div>
            <span>Tasks in Board</span>
        </div>
        <div class="sum_squares">
            <div>
                <img src="./img/in-progress.png">
                <a id="sum_progress">${inProgress}</a>
            </div>
            <span>Tasks in Progress</span>
        </div>
        <div class="sum_squares">
            <div>
                <img src="./img/comment.png">
                <a id="sum_freedback">${awaitFeedback}</a>
            </div>
            <span>Awaiting Feedback</span>
        </div>
        <div class="sum_squares">
            <div>
                <img id="sum_todo_img" src="./img/todo.png" />
                <a id="sum_todo">${todo}</a>
            </div>
            <span>Tasks To-Do</span>
        </div>
        <div class="sum_squares">
            <div>
                <img id="sum_done_img" src="./img/done.png" />
                <a id="sum_done">${done}</a>
            </div>
            <span>Tasks Done</span>
        </div>
        <!-- <div class="chat_gpt">
            <input type="text" id="prompt" name="prompt" placeholder="Ask me" onclick="show_chat_gpt_answer()">
            <button type="button" onclick="getChatGPTResponse()">
                <img id="sum_done_img" src="./img/send.png" alt="Send">
            </button>  
        </div>
        <div class="chat_gpt_answer" id="chat_gpt_answer">
            <img class="hide_chat_gpt_answer_btn" src="./img/cancel.png" onclick="hide_chat_gpt_answer()">
            <textarea id="output" name="output"></textarea>
            <img class="loading_gif" id="loading_gif" src="./img/loading.gif" alt="Loading"> 
        </div> -->
    `;
    getTime();
    countUrgent();
    findClosestDate();
    countCardsInWrappers();
}

// Get the local time
function getTime() {
    let currentTime = new Date();
    let currentHour = currentTime.getHours().toString().padStart(2, "0");
    let currentMinute = currentTime.getMinutes().toString().padStart(2, "0");
    let formattedTime = currentHour + currentMinute;
    generateGreeting(formattedTime);
}

// Generate greeting for every Time of the Day
function generateGreeting(time) {
    let greeting = [];
    if (time >= 0600 && time < 1200) {
        greeting.push("Good morning");
    } else if (time >= 1200 && time < 1800) {
        greeting.push("Good day");
    } else if (time >= 1800 && time < 2400) {
        greeting.push("Good evening");
    } else if (time >= 0000 && time < 0600) {
        greeting.push("Good night");
    }
    let greet = greeting[0];
    document.getElementById("sum_daytime").innerHTML = `${greet},`;
}

// Count Urgents in Array
function countUrgent() {
    let count = 0;
    for (let i = 0; i < tasksToServer.length; i++) {
      const priority = tasksToServer[i][0][4];
        if (priority === "urgent") {
          count++;
        }
    }
    // console.log("Total Urgent Count: " + count);
    urgent = count;
  }
  
  // Shows Deadline. Closest Date in Array. Check also if no date.
  function findClosestDate() {
    if (!tasksToServer || tasksToServer.length === 0) {
      // No tasks found, set deadline to null or another appropriate value
      deadline = null;
      return;
    }
  
    let closestDate = new Date(tasksToServer[0][0][2]);
    for (let i = 1; i < tasksToServer.length; i++) {
      const dateString = tasksToServer[i][0][2];
      const currentDate = new Date(dateString);
      if (currentDate > new Date() && currentDate < closestDate) {
        closestDate = currentDate;
      }
    }
    deadline = closestDate.toDateString();
  }

  // counts tasks/cards in wrappers 0-3 and sets the variables for summary
  function countCardsInWrappers() {
    todo = document.querySelectorAll("#wrapper_0 .card").length;
    inProgress = document.querySelectorAll("#wrapper_1 .card").length;
    awaitFeedback = document.querySelectorAll("#wrapper_2 .card").length;
    done = document.querySelectorAll("#wrapper_3 .card").length;
  }

  