window.ANALEMMA = {

  SANFRANLATITUDE: 37.7833,
  SANFRANLONGITUDE: 122.4167,
  SANFRANTIMEDIFFERENCE: 7,
  TIMEDIFFERENTIALDEGREES: 15,

  equationOfTime: function(day) {
    //days since start of the year

    var B = this.radiansSinceNewYears(day);
    return this.toRadians(
            (9.87 * Math.sin(2*B)) -
            (7.53 * Math.cos(B)) -
            (1.5 * Math.sin(B))
          )
  },

  radiansSinceNewYears: function(day) {
    return this.toRadians(
      (360/365) * (day - 81)
    );
  },

  daysSinceNewYears: function(date) {
    var newDate = new Date(date);
    var newYears = new Date(newDate.getFullYear());
    return Math.floor(newDate - newYears) / (1000*60*60*24);
  },

  declinationInRadians: function(day) {
    return this.toRadians(
      23.439 *
      Math.sin(this.radiansSinceNewYears(day))
    );
  },

  // hourAngleInRadians: function(day) {
  //   //http://www.pveducation.org/pvcdrom/properties-of-sunlight/solar-time#HRA
  //   //1˚ every 4 minutes
  //   var radiansFromGMT = this.toRadians(this.SANFRANTIMEDIFFERENCE * this.TIMEDIFFERENTIALDEGREES);
  //   var timeCorrection = 4 * (this.toRadians(this.SANFRANLONGITUDE) - radiansFromGMT) + this.equationOfTime(day);
  //   var localSolarTime = Date.now() + timeCorrection / (60 * 1000);
  // },

  elevationInRadians: function(day) {
    var latitude = this.toRadians(this.SANFRANLATITUDE);
    var declination = this.declinationInRadians(day);
    var hourAngle = 1; //hour angle always 1 because math is hard

    return Math.PI/2 - Math.acos(
      (Math.sin(latitude) *
       Math.sin(declination)
      ) +
      (Math.cos(latitude) *
       Math.cos(declination) *
       Math.cos(hourAngle)
      )
    );
  },

  //useful for debugging
  toDegrees: function(angle) {
    return angle * (180 / Math.PI);
  },

  toRadians: function(angle) {
    return angle * (Math.PI / 180);
  },

  drawBaseLine: function() {
    var baseLineCoords = Array
      .prototype
      .slice
      .call(new Uint8ClampedArray(365));

    return baseLineCoords
      .map(function(day, i) {
        return i;
      })
      .map(function(day) {
        return {
          elevation: this.elevationInRadians(day),
          eot: this.equationOfTime(day)
        }
      }.bind(this));
  },

  placePosts: function(posts) {

    return posts.map(function(post) {
      var day = this.daysSinceNewYears(post.date);
      var eot = this.equationOfTime(day);
      var ele = this.elevationInRadians(day);

      return {
        elevation: ele,
        eot: eot,
        date: post.date,
        title: post.title,
        url: post.url
      }
    }.bind(this));

  },

  generate: function(postsByYear, targetContainer) {
    var baseLineCoords = this.drawBaseLine();

    var elevations = baseLineCoords
      .map(function(d) {
        return d.elevation;
      });

    var eots = baseLineCoords
      .map(function(d) {
        return d.eot;
      });

    var minele = elevations
      .reduce(function(a,b) {
        return Math.min(a,b);
      });

    var maxele = elevations
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

    Object.keys(postsByYear).forEach(function(year) {

      var posts = postsByYear[year];
      new window.ANALEMMAGraph({
          eleRange: [minele, maxele],
          eotRange: [mineot, maxeot],
          coords: baseLineCoords
        },
        this.placePosts(posts),
        year,
        targetContainer
      );

    }.bind(this));
  }
}

window.ANALEMMAGraph = function(baseline, posts, year, targetContainer) {

  this.targetContainer = document.querySelector(targetContainer);

  this.eleRange = baseline.eleRange;
  this.eotRange = baseline.eotRange;
  this.coords = baseline.coords;

  this.title = String(year);

  // this.height = +this.targetContainer.offsetWidth;
  // this.width = this.height / 2;

  this.height = 800;
  this.width = 400;  

  this.xScale = d3.scale.linear()
    .domain(this.eotRange)
    .range([1, this.width]);

  this.yScale = d3.scale.linear()
    .domain(this.eleRange)
    .range([1, this.height]);

  this.line = d3.svg.line()
    .x(function(d) { return this.xScale(d.eot); }.bind(this))
    .y(function(d) { return this.yScale(d.elevation); }.bind(this))
    .interpolate('basis-closed');

  this.container = document.createElement('div');
  this.container.setAttribute('class', 'analemma-container year-' + this.title + '-container');
  this.container.innerHTML = '<div class="year-title">' + this.title + '</div>' + '<div class="analemma-text graph-' + this.title + '-text"></div>';

  this.targetContainer.appendChild(this.container);

  this.svg = d3.select('.year-' + this.title + '-container')
    .append('svg')
    .attr('width', String(this.height + 1) + 'px')
    .attr('height', String(this.width + 1) + 'px');
    //invert height and width for rotation

  this.path = this.svg.append('path')
    .attr('d', this.line(this.coords))
    .attr('stroke', '#aeaeae')
    .attr('stroke-width', '1')
    .attr('fill', 'none')
    .attr('transform', 'rotate(-90) translate(-' + String(this.width + 1) + ', 0)');

  this.posts = this.svg.selectAll('rect')
      .data(posts)
    .enter()
      .append('rect')
        .attr('height', 15)
        .attr('width', 15)
        .attr('x', function(post) { return this.xScale(post.eot) - 7.5}.bind(this))
        .attr('y', function(post) { return this.yScale(post.elevation) - 7.5}.bind(this))
        .attr('transform', 'rotate(-90) translate(-' + String(this.width + 1) + ', 0)')
        .attr('fill', '#cccccc')
        .on('mouseover', function(post) {
          var year = (new Date(post.date)).getFullYear()
          var title = '.graph-' + year + '-text';
          var target = document.querySelector(title);

          var selected = document.querySelector('.selected')
          if (selected) {
            selected.setAttribute('class', '');
          }

          target.innerHTML = '<div class="date">' +
                              String(post.date) +
                              '</div><a href="' +
                              post.url +
                              '"class="url">' +
                              post.title +
                              '</a>'

          this.setAttribute('class', 'selected');
        })
        .on('click' , function(post){
          window.location = post.url;
        });

};
