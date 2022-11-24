function backgroundAnimation() {
    var pix = document.getElementsByClassName("pixel");
    for (var i = 0; i < pix.length; i++) {
        pix[i].style.animationDelay = Math.ceil(Math.random() * 5000) + "ms";
    }
}


function logoAnimation() {
    document.getElementById('animation').innerHTML = `
        <img src="./img/logo_dark.png" class="login_logo_animation">
        <img src="./img/logo_white.png" class="login_hidden_mobile">
    `;
}


function login() {
    document.getElementById('login_access').innerHTML = /*html*/`
            <span class="font61-700">Log in</span>
            <div class="login_blue_line"></div>
            <form>
            <div class="login_pos_rel">
                <input placeholder="Email" id="email_login" type="email" class="login_input" name="email" required>
                <img src="./img/mail.png" class="login_mail_png">
                <input placeholder="Password" id="password_login" type="password" class="login_input" name="password" required>
                <img src="./img/secure.png" class="login_secure_png">  
            </div>
            <div class="login_forgot">
                <input type="checkbox" id="confirm"><label for="confirm">Remember me</label>
                <a href="#" onclick="forgotPassword()">Forgot my Password</a>
            </div>
            <div class="login_btns_dflex">
                <button type="submit" class="btn_dark" name="login">Log in</button>
                <button class="btn_bright" onclick="enterAsGuest()">Guest Log in</button>
            </div>
            </form>
            <div class="login_join">
                <a>Not a join user?</a><button class="login_btn_join" onclick="signUp()">Sign up</button>
            </div>
    `;
}


function forgotPassword() {
    document.getElementById('login_access').innerHTML = /*html*/`
            <div class="c-pointer scale-105 login_arrow_left" onclick="login()">
                <img src="./img/left_arrow_blue.png">
            </div>
            <span class="font61-700 txt-cr">i forgot my password</span><br>
            <div class="login_blue_line"></div>
            <span class="font21-400 txt-cr mb-40">
                Don't worry! We will send you an email with the instructions to <br>reset your password.
            </span>
            <form onsubmit="resetPassword()">
                <div class="ai-center jc-center d-flex fd-col pos-rel">
                    <input placeholder="Email" id="email_forgot" type="email" class="login_input" name="email_forgot" required>
                    <img src="./img/mail.png" class="login_mail_png">
                    <button class="button_dark" type="submit" name="sendmail">Send me the email</button>
                </div>
            </form>
    `;
}


function signUp() {
    document.getElementById('login_access').innerHTML = /*html*/`
        <div class="c-pointer scale-105 login_arrow_left" onclick="login()">
            <img src="./img/left_arrow_blue.png">
        </div>
        <span class="font61-700">Sign up</span>
        <div class="login_blue_line"></div>
        <form onsubmit="registerUser(); return false;">
            <div class="login_pos_rel">
                <input placeholder="Name" id="username" type="text" class="login_input" required>
                <img src="./img/name.png" class="sign_name_png">
                <input placeholder="Email" id="email" type="email" class="login_input" required>
                <img src="./img/mail.png" class="sign_mail_png">
                <input placeholder="Password" id="password" type="password" class="login_input" required>
                <img src="./img/secure.png" class="sign_secure_png">
            </div>
            <div>
                <button class="button_dark">Sign up</button>
            </div>
        </form>
    `;
}


function resetPassword() {
    document.getElementById('login_access').innerHTML = /*html*/`
    <div class="c-pointer scale-105 login_arrow_left" onclick="forgotPassword()">
        <img src="./img/left_arrow_blue.png">
    </div>
    <span class="font61-700 txt-cr">Reset your password</span><br>
    <div class="login_blue_line"></div>
    <span class="font21-400 txt-cr mb-40">Change your account password</span>
    <div class="login_pos_rel">
        <input placeholder="New password" id="new_password" type="password" class="login_input">
    </div>
    <div class="login_pos_rel">
        <input placeholder="Confirm password" id="confirm_password" type="password" class="login_input">
    </div>
    <br>
    <div>
        <button class="button_dark" onclick="hideLogin()">Continue</button>
    </div>
`;
}


function hideLogin() {
    document.getElementById('login').style.visibility = "hidden";
    document.getElementById('animation').style.visibility = "hidden";
    NavRenderSummary();
}


function enterAsGuest() {
    window.location = "./home.html";
}


// function mobileResCheck() {
//     if (screen.width <= 600) {
//         window.location = "./mobile.html";
//     }
// }