function renderAddTask() {
    document.getElementById('includeHTML').innerHTML = `
    <div w3-include-html="./content/add_task.html"></div>
    `;
    includeHTML();
}


function renderContacts() {
    document.getElementById('includeHTML').innerHTML = `
    <div w3-include-html="./content/contacts.html"></div>
    `;
    includeHTML();
}


function renderSummary() {
    document.getElementById('includeHTML').innerHTML = `
    <div w3-include-html="./content/summary.html"></div>
    `;
    includeHTML();
}


function renderBoard() {
    document.getElementById('includeHTML').innerHTML = `
    <div w3-include-html="./content/board.html"></div>
    `;
    includeHTML();
}