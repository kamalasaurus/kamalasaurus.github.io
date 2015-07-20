window.MEDIAEMBED = {
  format: function() {
    var media = this.toArray(document.querySelectorAll('.media-embed'));
    
    var colors = ['yellow', 'deeppink', 'deepskyblue', 'tomato', 'purple'];

    media.forEach(function(div) {
      var color = colors[Math.floor(Math.random()*colors.length)];
      div.setAttribute('style', 'background-color: ' + color + ';')
    });
  },

  toArray: function(list) {
    return Array.prototype.slice.call(list);
  }
}