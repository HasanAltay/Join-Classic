async function includeHTML() {
    const templatesContainer = getAllTemplatesContainer();
    if (templatesContainer.length == 0) return; // there are no templates container
    await asyncForEach(templatesContainer, includeTemplate);
    await includeHTML(); // included templates can have nested data-templates
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

fetch('/content/add_task.html')
.then(response => response.text())
.then(data => {
    const pageContainer = document.getElementById('page-container');
    pageContainer.innerHTML += data;
});

fetch('/content/contacts.html')
.then(response => response.text())
.then(async data => {
    const pageContainer = document.getElementById('page-container');
    pageContainer.innerHTML += data;
    await fetchContacts();
    // initAssignDropDown();
});



fetch('/content/board.html')
.then(response => response.text())
.then(data => {
    const pageContainer = document.getElementById('page-container');
    pageContainer.innerHTML += data;
});