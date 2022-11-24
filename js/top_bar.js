function openLogout() {
    document.getElementById('nav_open_logout').style.display = 'block';
}


function openLogoutMobile() {
    document.getElementById('nav_open_logout_mobile').style.display = 'flex';
}


function closeLogout() {
    document.getElementById('nav_open_logout').style.display = 'none';
}


function closeLogoutMobile() {
    document.getElementById('nav_open_logout_mobile').style.display = 'none';
}


function logout() {
    document.getElementById('nav_open_logout').style.display = 'none';
    location.reload();
}


function goBackToIndex() {
    window.location = "./index.html";
}