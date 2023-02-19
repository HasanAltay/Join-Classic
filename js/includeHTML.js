async function includeHTML() {
    const templatesContainer = getAllTemplatesContainer();
    if (templatesContainer.length == 0) return; // there are no templates container
    await asyncForEach(templatesContainer, includeTemplate);
    await includeHTML(); // included templates can have nested data-templates
    eventListeners();
}

function getAllTemplatesContainer() {
    return document.querySelectorAll('[data-template]');
}

async function includeTemplate(container) {
    const templatePath = container.getAttribute("data-template");
    const content = await getTemplateContent(templatePath);
    container.innerHTML = content;
    container.removeAttribute("data-template"); // otherwise recursion will find this container again
}

async function getTemplateContent(templatePath){
    try{
        const response = await fetch(templatePath);
        const content = await response.text();
        return content;
    }catch(error){
        return "PAGE NOT FOUND";
    }
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

fetch('./content/add_task.html')
.then(response => response.text())
.then(data => {
    const pageContainer = document.getElementById('page-container');
    pageContainer.innerHTML += data;
});

fetch('./content/contacts.html')
.then(response => response.text())
.then(async data => {
    const pageContainer = document.getElementById('page-container');
    pageContainer.innerHTML += data;
    await fetchContacts();
});

fetch('./content/board.html')
.then(response => response.text())
.then(data => {
    const pageContainer = document.getElementById('page-container');
    pageContainer.innerHTML += data;
});

// counts the letters in add task textarea
function eventListeners() {
    const textarea = document.getElementById("textarea");
    textarea.addEventListener("input", function() {
        const textarea = document.getElementById("textarea");
        const text = textarea.value;
        const letterCount = text.length;
        const countDisplay = document.getElementById("current");
        countDisplay.innerText = letterCount;
    });
}

