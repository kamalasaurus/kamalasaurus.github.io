window.MEDIAEMBED = {

  format: function() {
    var mediaArray = this.toArray(document.querySelectorAll('.media-embed'));

    mediaArray.forEach(function(div) {
      var height = div.children[0].getAttribute('height');
      div.setAttribute('height', String(height) + 'px');
      div.setAttribute('style', 'background-color: yellow');
    });
  },

  toArray(list) {
    return Array.prototype.slice.call(list);
  }

}