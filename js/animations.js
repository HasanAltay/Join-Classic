function animations() {

  logoAnimation();

}


function pixelAnimation() {
  let pixelCon = document.getElementById("pixelCon");

  for (let i = 0; i < 250; i++) {
      let pixel = document.createElement("div");
      pixel.className = "pixel";
      pixelCon.appendChild(pixel);
  }
}


function logoAnimation() {
  document.getElementById('animation').innerHTML = `
      <img src="./img/logo_dark.png" class="login_logo_animation">
      <img src="./img/logo_white.png" class="login_hidden_mobile">
  `;
}


function backgroundAnimation() {
  var pix = document.getElementsByClassName("pixel");
  for (var i = 0; i < pix.length; i++) {
      pix[i].style.animationDelay = Math.ceil(Math.random() * 5000) + "ms";
  }
}