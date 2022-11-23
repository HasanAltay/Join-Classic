async function NavRenderSummaryMobile() {
    document.getElementById('includeHTML').innerHTML = `
    <div data-template="./content/summary.html" onclick="closeLogoutMobile();"></div>
    `;
    await includeHTML();
    summaryPickedMobile(); 
}


async function NavRenderBoardMobile() {
    document.getElementById('includeHTML').innerHTML = `
    <div data-template="./content/board.html" onclick="closeLogoutMobile();"></div>
    `;
    await includeHTML();
    updateHTML();
    boardPickedMobile();
}


async function NavRenderAddTaskMobile() {
    document.getElementById('includeHTML').innerHTML = `
    <div data-template="./content/add_task.html" onclick="closeLogoutMobile();"></div>
    `;
    await includeHTML();
    addTaskPickedMobile();
}


async function NavRenderContactsMobile() {
    document.getElementById('includeHTML').innerHTML = `
    <div data-template="./content/contacts.html" onclick="closeLogoutMobile();"></div>
    `;
    await includeHTML();
    contactsPickedMobile();
    await initContacts();
}


async function NavRenderPrivacyMobile() {
    document.getElementById('includeHTML').innerHTML = `
    <div data-template="./content/privacy.html" onclick="closeLogoutMobile();"></div>
    `;
    await includeHTML();
}


async function NavRenderImprintMobile() {
    document.getElementById('includeHTML').innerHTML = `
    <div data-template="./content/imprint.html" onclick="closeLogoutMobile();"></div>
    `;
    await includeHTML();
}


async function NavRenderHelpMobile() {
    document.getElementById('includeHTML').innerHTML = `
    <div data-template="./content/help.html" onclick="closeLogoutMobile();"></div>
    `;
    await includeHTML();
}


    function summaryPickedMobile() {
        document.getElementById('nav_summary_mobile').innerHTML = `
        <div class="nav_btns_mobile_picked" onclick="NavRenderSummaryMobile()">
            <img src="./img/summary.png">
            <a>Summary</a>
        </div>
        `;
    }


    function boardPickedMobile() {
        document.getElementById('nav_board_mobile').innerHTML = `
        <div class="nav_btns_mobile_picked" onclick="NavRenderBoardMobile()">
            <img src="./img/board.png">
            <a>Board</a>
        </div>
        `;
    }


    function addTaskPickedMobile() {
        document.getElementById('nav_add_task_mobile').innerHTML = `
        <div class="nav_btns_mobile_picked" onclick="NavRenderAddTaskMobile()">
            <img src="./img/add_task.png">
            <a>Add Task</a>
        </div>
        `;
    }


    function contactsPickedMobile() {
        document.getElementById('nav_contacts_mobile').innerHTML = `
        <div class="nav_btns_mobile_picked" onclick="NavRenderContactsMobile()">
            <img src="./img/contacts.png">
            <a>Contacts</a>
        </div>
        `;
    }