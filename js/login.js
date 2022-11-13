function init() {
    login();
    logoAnimation();
}


function logoAnimation() {
    document.getElementById('animation').innerHTML = /*html*/`
        <img src="./img/logo_dark.png" class="login_logo_animation">
    `;
}


function login() {
    document.getElementById('login_access').innerHTML = /*html*/`
            <span class="font61-700">Log in</span><br>
            <div class="login_blue_line"></div><br><br>
            <div class="login_pos_rel">
                <input placeholder="Email" id="email" type="email" class="login_input">
                <img src="./img/mail.png" class="login_mail_png">
                <br><br>
                <input placeholder="Password" id="password" type="password" class="login_input">
                <img src="./img/secure.png" class="login_secure_png">
                <br>
            </div>
            <div class="login_forgot">
                <input type="checkbox" class="login_checkbox">
                <span>Remember me</span>
                <a href="#" onclick="forgotPassword()">Forgot my Password</a>
                <br><br><br>
            </div>
            <br>
            <div class="login_btns_dflex">
                <button class="btn_dark" onclick="hideLogin()">Log in</button>
                <button class="btn_bright" onclick="hideLogin()">Guest Log in</button>
            </div>
    `;
}


function forgotPassword() {
    document.getElementById('login_access').innerHTML = /*html*/`
            <div class="c-pointer scale-105 login_arrow_left" onclick="login()">
                <img src="./img/left_arrow_blue.png">
            </div>
            <span class="font61-700">i forgot my password</span><br>
            <div class="login_blue_line"></div><br>
            <span class="font21-400 txt-cr">
                Don't worry! We will send you an email with the instructions to <br>reset your password.<br>
            </span><br><br>
            <div class="login_pos_rel">
                <input placeholder="Email" id="email_forgot" type="email" class="login_input">
                <img src="./img/mail.png" class="login_mail_png">
                <br><br>
            </div>
            <br>
            <div>
                <button class="btn_dark" onclick="resetPassword()">Send me the email</button>
            </div>
    `;
}


function signUp() {
    document.getElementById('login_access').innerHTML = /*html*/`
            <div class="c-pointer scale-105 login_arrow_left" onclick="login()">
                <img src="./img/left_arrow_blue.png">
            </div>
            <span class="font61-700">Sign up</span><br>
            <div class="login_blue_line"></div><br><br>
            <div class="login_pos_rel">
            <input placeholder="Name" id="name_sign" type="name" class="login_input">
                <img src="./img/name.png" class="sign_name_png">
                <br><br>
                <input placeholder="Email" id="email_sign" type="email" class="login_input">
                <img src="./img/mail.png" class="sign_mail_png">
                <br><br>
                <input placeholder="Password" id="password_sign" type="password" class="login_input">
                <img src="./img/secure.png" class="sign_secure_png">
                <br>
            </div>
            <br>
            <div>
                <button class="btn_dark" onclick="hideLogin()">Sign up</button>
            </div>
    `;
}


function resetPassword() {
    document.getElementById('login_access').innerHTML = /*html*/`
    <div class="c-pointer scale-105 login_arrow_left" onclick="forgotPassword()">
        <img src="./img/left_arrow_blue.png">
    </div>
    <span class="font61-700">Reset your password</span><br>
    <div class="login_blue_line"></div><br>
    <span class="font21-400 txt-cr">
        Change your account password<br>
    </span><br><br>
    <div class="login_pos_rel">
        <input placeholder="New password" id="new_password" type="password" class="login_input">
        <br><br>
    </div>
    <div class="login_pos_rel">
        <input placeholder="Confirm password" id="confirm_password" type="password" class="login_input">
        <br><br>
    </div>
    <br>
    <div>
        <button class="btn_dark" onclick="hideLogin()">Continue</button>
    </div>
`;
}


function hideLogin() {
    document.getElementById('login').style.visibility = "hidden";
    document.getElementById('animation').style.visibility = "hidden";
    NavRenderSummary();
}