window.onload = initialize;
window.onresize = resize;

window.analemmas = [];

function initialize() {
  window.CLOUDCOVER.initialize();
  var analemmaData = window.ANALEMMA.generate();
  var analemma = new window.ANALEMMAGraph(analemmaData);
  window.analemmas.push(analemma);
  // window.REQUEST.get('data/blob.json', printer, true);
}

function resize() {
  window.CLOUDCOVER.resize();
}

function printer(data) {
  console.log(data);
}
