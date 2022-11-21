let users = [];
setURL('https://gruppe-375.developerakademie.net/backend');

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}


async function registerUser() {
    users.push({username:username.value, email:email.value, password:password.value});
    await backend.setItem('users', JSON.stringify(users));
    alert('You are Registered:',users);
}

function guestUser(){
    document.getElementById('')
}