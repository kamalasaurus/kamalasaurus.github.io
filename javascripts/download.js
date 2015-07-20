window.download = function(filename) {
  window.location.href = '//' + window.location.host + '/downloads/' + filename;
  return false;
}
