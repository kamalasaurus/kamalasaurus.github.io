window.onload = initialize;
window.onresize = resize;

function initialize() {
  window.CLOUDCOVER.initialize();
  window.ANALEMMA.generate();
  // window.REQUEST.get('data/blob.json', printer, true);
}

function resize() {
  window.CLOUDCOVER.resize();
}
