console.log('donut.js loaded')

// load data

// function drawDonutChart(ai, dl, pr)
d3.json('/donut').then(data => {

  var pr_results = data.reduce(function(sums,entry){
      sums[entry.status_perf_rev] = (sums[entry.status_perf_rev] || 0) + 1;
      return sums;
  },
  {});

  var ai_results = data.reduce(function(sums,entry){
      sums[entry.status_auto_ins] = (sums[entry.status_auto_ins] || 0) + 1;
      return sums;
  },
  {});

  var dl_results = data.reduce(function(sums,entry){
      sums[entry.status_driverlic] = (sums[entry.status_driverlic] || 0) + 1;
      return sums;
  },
  {});

  // function to sort object alphebetically
 function sortOnKeys(obj) {
    var sorted = [];
    for(var key in obj) {
        sorted[sorted.length] = key;
    }
    sorted.sort();
    var sortedObj = {};
    for(var i = 0; i < sorted.length; i++) {
      sortedObj[sorted[i]] = obj[sorted[i]];
    }
    return sortedObj;
  };

  // function to insert missing keys to object when applicable
  function insertMissingKeys (obj) {
      obj['Good'] = obj['Good'] || 0;
      obj['Near Due'] = obj['Near Due'] || 0;
      obj['Overdue'] = obj['Overdue'] || 0;
      obj['Missing'] = obj['Missing'] || 0;
      return obj;
  };

  // insert missing keys to object when applicable
  ai_results = insertMissingKeys(ai_results);
  ai_results = sortOnKeys(ai_results);
  console.log(ai_results);

  function totalStaff( obj ) {
    var sum = 0;
    for( var el in obj ) {
      if( obj.hasOwnProperty( el ) ) {
        sum += parseFloat( obj[el] );
      }
    }
    return sum;
  }

  // calculate compliance percentage as variable
  var compliancePercentage =
  Math.floor(((ai_results['Good'] + ai_results['Near Due']) / totalStaff(ai_results)) * 100);

  console.log(compliancePercentage);

  // set the dimensions and margins of the graph
  var width = 500
      height = 500
      margin = 40;

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin;

  // append the svg object to the div
  var pieGroup = d3.select("form")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  pieGroup.append('text')
    // .attr('dy', '.25em')
    .style('text-anchor', 'middle')
    .style('font-size', '75px')
    .attr('class', 'inside')
    .attr('y', 25)
    .text(`${compliancePercentage}%`);

  // Compute the position of each group on the pie
  var pie = d3.pie()
    .value(function(d) {return d.value; });

  // convert object to entries format
  var ai_results_ready = pie(d3.entries(ai_results));

  // set the color scheme
  var colorScheme = d3.scaleOrdinal()
    .domain(ai_results)
    .range(['#6d8941', '#FF0000', '#e3a711', '#c55f54']);

  // draw the pie chart
  piecesGroup = pieGroup
    .selectAll('path')
    .data(ai_results_ready)
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(120)
      .outerRadius(radius)
      .cornerRadius(10)
    )
    .attr('fill', function(d, i){ return(colorScheme(d.data.key)) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style('border-radius', '20px')
    .style("opacity", 1);

  piecesGroup.on('mouseover', function() {
    d3.select(this)
      .transition()
      .duration(175)
      .style("opacity", .75)
      .attr('d', d3.arc()
        .innerRadius(115)
        .outerRadius(radius + 5)
        .cornerRadius(10)
      )
      .attr('fill', function(d, i){ return(colorScheme(d.data.key)) });
    });

  piecesGroup.on('mouseout', function() {
    d3.select(this)
      .transition()
      .duration(175)
      .style("opacity", 1)
      .attr('d', d3.arc()
        .innerRadius(120)
        .outerRadius(radius)
        .cornerRadius(10)
      )
      .attr('fill', function(d, i){ return(colorScheme(d.data.key)) });
  });

function dateConverter(date) {
var d = new Date(date);
var formattedDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
return formattedDate
};

console.log(dateConverter(data[0].date_perf_rev));
console.log(dateConverter(data[0].date_annual));


});