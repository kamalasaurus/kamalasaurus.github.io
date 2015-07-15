window.MEDIAEMBED = {
  format: function() {
    var media = this.toArray(document.querySelectorAll('.media-embed'));
    
  },

  toArray: function(list) {
    return Array.prototype.slice.call(list);
  }
}