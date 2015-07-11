window.DINO = {

  MAXLENGTH: 80,

  rightWardDino: '            __ \n           / _)\n    .-^^^-/ /  \n __/ Kamal /   \n<__.|_|-|_|    ',
  leftWardDino: ' __            \n(_ \\           \n  \\ \\-^^^-.    \n   \\ Kamal \\__ \n    |_|-|_|.__>',

  currentDino: '',
  lineLength: 0,

  timer: null,

  goRight: true,

  animateRight: function() {
    if (this.currentDino === '' || this.lineLength === 15) {
      this.initializeDino();
    }

    var that = this;
    var dino = this.currentDino
      .split('\n')
      .map(function(line) {
        var newLine = ' ' + line;
        that.lineLength = newLine.length;
        return newLine;
      })
      .join('\n');

    this.currentDino = dino;
  },

  animateLeft: function() {
    if (this.lineLength === this.MAXLENGTH) {
      this.turnaroundDino();
    }

    that = this;
    var dino = this.currentDino
      .split('\n')
      .map(function(line) {
        var newLine = line.substring(1);
        that.lineLength = newLine.length;
        return newLine;
      })
      .join('\n');

    this.currentDino = dino;
  },

  turnaroundDino: function() {
    var leftSlices = this.leftWardDino.split('\n');

    var dino = this.currentDino
      .split('\n')
      .map(function(line, i) {
        return line.substring(0, line.length - 15) + leftSlices[i];
      })
      .join('\n');

    this.currentDino = dino;
  },

  initializeDino: function() {
    this.currentDino = this.rightWardDino;
  },

  animateDino: function(dinoTarget) {
    var dino = this;
    this.timer = window.setInterval(function() {

      if (dino.lineLength === 0 || dino.lineLength === 15) {
        dino.goRight = true;
      }

      if (dino.lineLength === dino.MAXLENGTH) {
        dino.goRight = false;
      }

      if (dino.goRight) {
        dino.animateRight();
      } else {
        dino.animateLeft();
      }

      dinoTarget.innerHTML = dino.currentDino;
    }, 100);
  }

}
