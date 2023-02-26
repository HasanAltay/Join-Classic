let urgent = 0;
let deadline = "May 09, 2023";
let board = 0;
let inProgress = 0;
let awaitFeedback = 0;
let todo = 0;
let done = 0;

function initSummary() {
    const sum_frame_squares = document.getElementById("sum_frame_squares");
    sum_frame_squares.innerHTML = /*html*/ `
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
    `;
    getTime();
    NavClick(1);
}

function SumTodoChangeImage(img) {
    document.getElementById("sum_todo_img").src = img;
}

function SumDoneChangeImage(img) {
    document.getElementById("sum_done_img").src = img;
}

function getTime() {
    let currentTime = new Date();
    let currentHour = currentTime.getHours().toString().padStart(2, "0");
    let currentMinute = currentTime.getMinutes().toString().padStart(2, "0");
    let formattedTime = currentHour + currentMinute;
    generateGreeting(formattedTime);
}

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
    // console.log(time, greet);
    document.getElementById("sum_daytime").innerHTML = `${greet},`;
    document.getElementById("sum_daytime_mobile").innerHTML = `${greet},`;
}

function NoMobileGreeting() {
    document.getElementsByClassName("sum_greeting_mobile").style =
        "display:none";
}
