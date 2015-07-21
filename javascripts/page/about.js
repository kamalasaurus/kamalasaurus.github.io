window.onload = initialize;
window.onresize = resize;

function initialize() {
  var dinoTarget = document.querySelector('.dino');
  window.DINO.animateDino(dinoTarget);

  window.CLOUDCOVER.initialize();
}

function resize() {
  window.CLOUDCOVER.resize();
}
