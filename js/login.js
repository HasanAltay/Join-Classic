function login() {
    document.getElementById('login').innerHTML = /*html*/`
    <div class="login_frame"> 
        <div></div>
        <div class="login_access">
            <span>Log in</span><br><br>
            <div class="login_blue_line"></div><br><br>
            <input placeholder="Email" id="email"><br><br>
            <input placeholder="Password" id="password"><br><br>
            <div>[ ] Remember me &nbsp;&nbsp;&nbsp;
                <a href="#">Forgot my Password</a></div><br><br>
            <div class="login_btns_dflex">
                <button class="btn_dark" onclick="hideLogin()">Log in</button>
                <button class="btn_bright" onclick="hideLogin()">Guest Log in</button>
            </div>
        </div>        
    </div>
    `;
}


function hideLogin() {
    document.getElementById('login').style.visibility = "hidden";
}