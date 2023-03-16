setURL("https://hasanaltay.de/portfolio-web/Join-classic/backend");

async function includeHTML() {
    const templatesContainer = getAllTemplatesContainer();
    if (templatesContainer.length == 0) return; // there are no templates container
    await asyncForEach(templatesContainer, includeTemplate);
    await includeHTML(); // included templates can have nested data-templates
    eventListeners();
}

function getAllTemplatesContainer() {
    return document.querySelectorAll("[data-template]");
}

async function includeTemplate(container) {
    const templatePath = container.getAttribute("data-template");
    const content = await getTemplateContent(templatePath);
    container.innerHTML = content;
    container.removeAttribute("data-template"); // otherwise recursion will find this container again
}

async function getTemplateContent(templatePath) {
    try {
        const response = await fetch(templatePath);
        const content = await response.text();
        return content;
    } catch (error) {
        return "PAGE NOT FOUND";
    }
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

fetch("./content/add_task.html")
    .then(response => response.text())
    .then(data => {
        const pageContainer = document.getElementById("page-container");
        pageContainer.innerHTML += data;
    });

fetch("./content/contacts.html")
    .then(response => response.text())
    .then(async data => {
        const pageContainer = document.getElementById("page-container");
        pageContainer.innerHTML += data;
    });

fetch("./content/board.html")
    .then(response => response.text())
    .then(data => {
        const pageContainer = document.getElementById("page-container");
        pageContainer.innerHTML += data;
    });

fetch("./content/summary.html")
    .then(response => response.text())
    .then(data => {
        const pageContainer = document.getElementById("page-container");
        pageContainer.innerHTML += data;
        NavRenderSummary();
    });

async function initBackend() {
    await downloadFromServer();
    // await loadTaskFromBackend();
    initBoard();
    initLettersFromContacts();
    initSummary();
}

async function loadTaskFromBackend() {
    try {
      const tasksData = backend.getItem("tasks") || "[]";
      tasksToServer = JSON.parse(tasksData);
    } catch (err) {
      console.error("Error while parsing task data:", err);
      tasksToServer = [];
    }
}   

function eventListeners() {
    initBackend(); // backend for add Tasks Data
    letterCountTextarea("textarea"); // letter count at add_task & task_edit textarea
    noOlderDate(); // no older dates at input date
}

function letterCountTextarea(textareaId) {
    const textarea = document.getElementById(textareaId);
    const text = textarea.value;
    const letterCount = text.length;
    const countDisplay = document.getElementById("current");
    countDisplay.innerText = letterCount;

    textarea.addEventListener("input", function () {
        const text = textarea.value;
        const letterCount = text.length;
        countDisplay.innerText = letterCount;
    });
}

function noOlderDate() {
    // Get the current date and format it as yyyy-MM-dd
    var today = new Date().toISOString().slice(0, 10);
    // Set the value of the "today" variable as the min attribute of the input element
    document.getElementById("date").min = today;
}
