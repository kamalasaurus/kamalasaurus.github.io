window.CLOUDCOVER = {

  header: null,
  context: null,

  width: null,
  height: null,

  cloud: null,
  clouds: [],

  timer: null,
  waitForNext: false,

  animateClouds: function() {
    this.clouds.forEach(function(cloud) {
      cloud.x -= 4;
    });
  },

  animate: function() {
    this.cloudFactory();
    this.animateClouds();

    this.context.clearRect(0, 0, this.width, this.height);

    var removeIndices = [];

    this.clouds.forEach(function(cloud) {
      if (cloud.x < -this.cloud.clientWidth) {
        removeIndex = this.clouds.indexOf(cloud);
      }
      this.context.drawImage(this.cloud, cloud.x, cloud.y);
    }.bind(this));

    removeIndices.forEach(function(idx) {
      this.clouds.splice(idx, 1);
    }.bind(this));
  },

  cloudFactory: function() {
    if (Math.random() > 0.96 && !this.waitForNext) {
      this.waitForNext = true;

      var x = this.width;
      var y = Math.floor(
                Math.random() * this.height
              ) - (0.5 * this.cloud.clientHeight);

      var cloud = new window.CLOUD(x, y);
      this.clouds.push(cloud);

      window.setTimeout(this.debounceCloud.bind(this), 1000);
    }
  },

  debounceCloud: function() {
    this.waitForNext = false;
  },

  initialize: function() {
    var header = document.querySelector('header');
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    this.header = header;
    this.context = context;

    this.cloud = new Image(128, 96);
    this.cloud.src = '/images/cloud.gif';

    this.resize();

    header.appendChild(canvas);

    this.timer = window.setInterval(this.animate.bind(this), 100);

  },

  resize: function() {
    this.width = this.context.canvas.width = this.header.offsetWidth;
    this.height = this.context.canvas.height = this.header.offsetHeight;
  }

}

window.CLOUD = function(x, y) {
  this.x = x;
  this.y = y;
}
