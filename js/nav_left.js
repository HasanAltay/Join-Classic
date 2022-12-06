async function NavRenderSummary() {
    document.getElementById('includeHTML').innerHTML = `
    <div data-template="./content/summary.html" onclick="closeLogout(); closeLogoutMobile();"></div>
    `;
    await includeHTML();
}


async function NavRenderBoard() {
    document.getElementById('includeHTML').innerHTML = `
    <div data-template="./content/board.html" onclick="closeLogout(); closeLogoutMobile();"></div>
    `;
    await includeHTML();
    await loadArrayFromBackend();
    updateHTML();
}


async function NavRenderAddTask() {
    document.getElementById('includeHTML').innerHTML = `
    <div data-template="./content/add_task.html" onclick="closeLogout(); closeLogoutMobile();"></div>
    `;
    await includeHTML();
}


async function NavRenderContacts() {
    document.getElementById('includeHTML').innerHTML = `
    <div data-template="./content/contacts.html" onclick="closeLogout(); closeLogoutMobile();"></div>
    `;
    await includeHTML();
    await initContacts();
}


async function NavRenderPrivacy() {
    document.getElementById('includeHTML').innerHTML = `
    <div data-template="./content/privacy.html" onclick="closeLogout(); closeLogoutMobile();"></div>
    `;
    NavClickMobile(0);
    await includeHTML();
}


async function NavRenderImprint() {
    document.getElementById('includeHTML').innerHTML = `
    <div data-template="./content/imprint.html" onclick="closeLogout(); closeLogoutMobile();"></div>
    `;
    NavClickMobile(0);
    await includeHTML();
}


async function NavRenderHelp() {
    document.getElementById('includeHTML').innerHTML = `
    <div data-template="./content/help.html" onclick="closeLogout()"></div>
    `;
    NavClick(0);
    NavClickMobile(0);
    await includeHTML();
}


function NavClick(x) {
    let summary = document.getElementById('nav_summary');
    let board = document.getElementById('nav_board');
    let add_task = document.getElementById('nav_add_task');
    let contacts = document.getElementById('nav_contacts');
    let privacy = document.getElementById('nav_privacy');
    let imprint = document.getElementById('nav_imprint');

    if (x == 0) {
            summary.className = "nav_btn";
            board.className = "nav_btn";
            add_task.className = "nav_btn";
            contacts.className = "nav_btn";
            privacy.className = "nav_btn";
            imprint.className = "nav_btn";
    }
    else if (x == 1) {
        summary.className = "nav_btn_picked";
            board.className = "nav_btn";
            add_task.className = "nav_btn";
            contacts.className = "nav_btn";
            privacy.className = "nav_btn";
            imprint.className = "nav_btn";
    }
    else if (x == 2) {
            summary.className = "nav_btn";
        board.className = "nav_btn_picked";
            add_task.className = "nav_btn";
            contacts.className = "nav_btn";
            privacy.className = "nav_btn";
            imprint.className = "nav_btn";
    }
    else if (x == 3) {
            summary.className = "nav_btn";
            board.className = "nav_btn";
        add_task.className = "nav_btn_picked";
            contacts.className = "nav_btn";
            privacy.className = "nav_btn";
            imprint.className = "nav_btn";
    }
    else if (x == 4) {
            summary.className = "nav_btn";
            board.className = "nav_btn";
            add_task.className = "nav_btn";
        contacts.className = "nav_btn_picked";
            privacy.className = "nav_btn";
            imprint.className = "nav_btn";
        }
    else if (x == 5) {
            summary.className = "nav_btn";
            board.className = "nav_btn";
            add_task.className = "nav_btn";
            contacts.className = "nav_btn";
        privacy.className = "nav_btn_picked";
            imprint.className = "nav_btn";
    }
    else if (x == 6) {
            summary.className = "nav_btn";
            board.className = "nav_btn";
            add_task.className = "nav_btn";
            contacts.className = "nav_btn";
            privacy.className = "nav_btn";
        imprint.className = "nav_btn_picked";
    }
}


function NavClickMobile(x) {
    let summary = document.getElementById('nav_summary_mobile');
    let board = document.getElementById('nav_board_mobile');
    let add_task = document.getElementById('nav_add_task_mobile');
    let contacts = document.getElementById('nav_contacts_mobile');

    if (x == 0) {
            summary.className = "nav_btns_mobile";
            board.className = "nav_btns_mobile";
            add_task.className = "nav_btns_mobile";
            contacts.className = "nav_btns_mobile";
    }
    else if (x == 1) {
        summary.className = "nav_btns_mobile_picked";
            board.className = "nav_btns_mobile";
            add_task.className = "nav_btns_mobile";
            contacts.className = "nav_btns_mobile";
    }
    else if (x == 2) {
            summary.className = "nav_btns_mobile";
        board.className = "nav_btns_mobile_picked";
            add_task.className = "nav_btns_mobile";
            contacts.className = "nav_btns_mobile";
    }
    else if (x == 3) {
            summary.className = "nav_btns_mobile";
            board.className = "nav_btns_mobile";
        add_task.className = "nav_btns_mobile_picked";
            contacts.className = "nav_btns_mobile";

    }
    else if (x == 4) {
            summary.className = "nav_btns_mobile";
            board.className = "nav_btns_mobile";
            add_task.className = "nav_btns_mobile";
        contacts.className = "nav_btns_mobile_picked";
        }
}
