window.REQUEST = {

  url: function(path) {
    return window.location.origin + '/' + path;
  },

  formData: function(obj) {
    var data = new FormData();
    Object.keys(obj).forEach(function(key) {
      data.append(key, obj[key]);
    })
    return data;
  },

  // (<str>, <fn>, <bool>)
  get: function(path, callback, isNative) {
    var route = isNative ? this.url(path) : path;

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType('application/json');
    xobj.open('GET', route, true);
    xobj.onreadystatechange = function() {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  },

  // (<str>, <fn>, <obj>, <bool>)
  post: function(path, callback, dataObj, isNative) {
    var route = isNative ? this.url(path) : path;
    var data = this.formData(dataObj);

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType('application/json');
    xobj.open('POST', route, true);
    xobj.onreadystatechange = function() {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send(data);
  }

}