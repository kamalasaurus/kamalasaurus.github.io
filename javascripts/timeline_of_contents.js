window.onload = initialize;

function initialize() {
  window.REQUEST.get('data/blob.json', printer);
}

function printer(data) {
  console.log(data);
}
