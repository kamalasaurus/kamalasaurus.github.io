window.onload = initialize;
window.onresize = resize;

function initialize() {
  window.CLOUDCOVER.initialize();

  var postsByYear = groupByYears(posts());
  window.ANALEMMA.generate(postsByYear, '.page-content .wrapper');
  // window.REQUEST.get('data/blob.json', printer, true);
}

function resize() {
  window.CLOUDCOVER.resize();
}

function posts() {
  return JSON.parse(document.querySelector('.data.toc-posts').innerHTML)
}

function groupByYears(posts) {
  return posts.reduce(function(obj, post) {
    var year = getYear(post.date);
    if (obj[year] === undefined) {obj[year] = []; }

    obj[year].push(post);
    return obj;
  }, {});
}

function getYear(date) {
  return isNaN((new Date(date)).getFullYear()) ? (new Date(date.substring(0,10))).getFullYear() : (new Date(date)).getFullYear();
}
