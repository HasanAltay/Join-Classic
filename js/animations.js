function animations() {
  logoAnimation();
}

function logoAnimation() {
  document.getElementById('animation').innerHTML = `
      <img src="./img/logo_dark.png" class="login_logo_animation">
      <img src="./img/logo_white.png" class="login_hidden_mobile">
  `;
}

