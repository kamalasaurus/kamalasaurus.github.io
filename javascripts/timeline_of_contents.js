window.onload = initialize;

function initialize() {
  window.REQUEST.get('data/blob.json', printer, true);
}

function printer(data) {
  console.log(data);
}
