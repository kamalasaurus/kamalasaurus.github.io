window.REQUEST = {

  // (<str>, <fn>)
  get: function(url, callback) {
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType('application/json');
    xobj.open('GET', url, true);
    xobj.onreadystatechange = function() {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  },

  // (<str>, <fn>, <formdata>)
  post: function(url, callback, data) {
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType('application/json');
    xobj.open('POST', url, true);
    xobj.onreadystatechange = function() {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send(data);
  }

}