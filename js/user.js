let users = [];
setURL('https://gruppe-375.developerakademie.net/backend');

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}


function addUser() {
    users.push(username.value);
    backend.setItem('users', JSON.stringify(users));
}

function guestUser(){
    document.getElementById('')
}