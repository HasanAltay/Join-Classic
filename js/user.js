let users = [];
setURL('https://gruppe-375.developerakademie.net/backend');

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}


function registerUser() {
    users.push({username:username.value, email:email.value, password:password.value});
    backend.setItem('users', JSON.stringify(users));
}

function guestUser(){
    document.getElementById('')
}