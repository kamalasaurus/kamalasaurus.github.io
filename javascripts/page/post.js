window.onload = initialize;
window.onresize = resize;

function initialize() {
  window.CLOUDCOVER.initialize();
  window.MEDIAEMBED.format();
  window.POST.initialize();
}

function resize() {
  window.CLOUDCOVER.resize.call(window.CLOUDCOVER);
}
