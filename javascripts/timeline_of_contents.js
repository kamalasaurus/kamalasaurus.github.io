window.onload = initialize;
window.onresize = resize;

function initialize() {
  window.CLOUDCOVER.initialize();
  window.REQUEST.get('data/blob.json', printer, true);
}

function resize() {
  window.CLOUDCOVER.resize();
}

function printer(data) {
  console.log(data);
}
