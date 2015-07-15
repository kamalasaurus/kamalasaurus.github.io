window.onload = initialize;
window.onresize = resize;

function initialize() {
  window.CLOUDCOVER.initialize();
  window.MEDIAEMBED.format();
}

function resize() {
  window.CLOUDCOVER.resize();
}
