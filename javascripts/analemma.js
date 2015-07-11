window.ANALEMMA = {

  equationOfTime: function(day) {
    //days since start of the year

    var B = this.radiansSinceNewYears(day);
    return (9.87 * Math.sin(2*B)) -
           (7.53 * Math.cos(B)) -
           (1.5 * Math.sin(B))
  },

  radiansSinceNewYears: function(day) {
    return this.toRadians(
      (360/365) * (day - 81)
    );
  },

  daysSinceNewYears: function(date) {
    var newYears = new Date(String(date.getFullYear()));
    return Math.floor(date - newYears) / (1000*60*60*24);
  },

  declinationInRadians: function(day) {
    return this.toRadians(
      23.439 *
      Math.sin(this.radiansSinceNewYears(day))
    );
  },

  // elevationInRadians: function(day) {
  //   var latitude = this.toRadians(45);
  //   var declination = this.declinationInRadians(day);

  //   return Math.PI/2 - Math.acos(
  //     (Math.sin(latitude) *
  //      Math.sin(declination)
  //     ) +
  //     (Math.cos(latitude) *
  //      Math.cos(declination) *
  //      Math.cos(1)
  //     )
  //   );
  // },

  // toDegrees: function(angle) {
  //   return angle * (180 / Math.PI);
  // },

  toRadians: function(angle) {
    return angle * (Math.PI / 180);
  },

  drawBaseLine: function() {
    var baseLineCoords = Array
      .prototype
      .slice
      .call(new Uint8ClampedArray(365));

    var that = this;

    return baseLineCoords
      .map(function(day, i) {
        return i;
      })
      .map(function(day) {
        return {
          declination: that.declinationInRadians(day),
          eot: that.equationOfTime(day)
        }
      });
  },

  // placePost: function() {

  //   var day = this.daysSinceNewYears(date);
  //   var eot = this.equationOfTime(day);
  // }

  generate: function() {
    var baseLineCoords = this.drawBaseLine();

    var declinations = baseLineCoords
      .map(function(d) {
        return d.declination;
      });

    var eots = baseLineCoords
      .map(function(d) {
        return d.eot;
      });

    var mindec = declinations
      .reduce(function(a,b) {
        return Math.min(a,b);
      });

    var maxdec = declinations
      .reduce(function(a,b) {
        return Math.max(a,b);
      });

    var mineot = eots
      .reduce(function(a,b) {
        return Math.min(a,b);
      });

    var maxeot = eots
      .reduce(function(a,b) {
        return Math.max(a,b);
      });

    return {
      declinationRange: [mindec, maxdec],
      eotRange: [mineot, maxeot],
      coords: baseLineCoords
    }
  }
}

window.ANALEMMAGraph = function(dataObj) {

  var that = this;

  this.declinationRange = dataObj.declinationRange;
  this.eotRange = dataObj.eotRange;
  this.coords = dataObj.coords;

  this.width = 800;
  this.height = 800;

  this.xScale = d3.scale.linear()
    .domain(this.eotRange)
    .range([0, this.height]);

  this.yScale = d3.scale.linear()
    .domain(this.declinationRange)
    .range([0, this.width]);

  this.line = d3.svg.line()
    .x(function(d) { return that.xScale(d.eot); })
    .y(function(d) { return that.yScale(d.declination); })
    .interpolate('basis-closed');

  this.svg = d3.select('.page-content')
    .append('svg')
    .attr('width', String(this.width) + 'px')
    .attr('height', String(this.height) + 'px');

  this.path = this.svg.append('path')
    .attr('d', this.line(this.coords))
    .attr('stroke', 'blue')
    .attr('stroke-width', '2')
    .attr('fill', 'none')

};
