window.onload = initialize;
window.onresize = resize;

function initialize() {
  window.CLOUDCOVER ? window.CLOUDCOVER.initialize() : void(0);
  window.MEDIAEMBED ? window.MEDIAEMBED.format() : void(0);
  window.POST ? window.POST.initialize() : void(0);
}

function resize() {
  window.CLOUDCOVER.resize.call(window.CLOUDCOVER);
}
