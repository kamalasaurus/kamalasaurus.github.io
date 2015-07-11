window.CLOUDCOVER = {

  header: null,
  context: null,

  width: null,
  height: null,

  clouds: [],

  animateClouds: function() {
    this.clouds.forEach(function(cloud) {
      cloud.x -= 1;
    });
  },

  initialize: function() {
    var header = document.querySelector('header');
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    this.header = header;
    this.context = context;

    this.resize();

    header.appendChild(canvas);

  },

  resize: function() {
    this.width = this.context.canvas.width = this.header.offsetWidth;
    this.height = this.context.canvas.height = this.header.offsetHeight;
  }

}

window.CLOUD = function(x, y, id) {
  this.x = x;
  this.y = y;
  this.id = id;

  this.img = new Image(100, 150);
  this.img.src = 'data.cloud.gif';

  this.animate = function() {
    this.x -= 1;
    // document.querySelector('#' + String(id)).
  };


}
