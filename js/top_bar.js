function openLogout() {
    document.getElementById('nav_open_logout').style.display = 'block';
}


function logout() {
    document.getElementById('nav_open_logout').style.display = 'none';
    location.reload();
}