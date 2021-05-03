console.log('donut.js loaded')

var employeeSum = data => {
    sum = 0;
    for (var i = 0; i < data.length; i++) {
        sum += data[i].employees;
    };
    return sum;
};

var librarianSum = data => {
    sum = 0;
    for (var i = 0; i < data.length; i++) {
        sum += data[i].librarians;
    };
    return sum;
};

var MLSlibrarianSum = data => {
    sum = 0;
    for (var i = 0; i < data.length; i++) {
        sum += data[i].mls_librarians;
    };
    return sum;
};

// load data
d3.json('/donut').then(data => {

    console.log(data);

    var employees = Math.round(employeeSum(data) * 100) / 100;
    var librarians = Math.round(librarianSum(data) * 100) / 100;
    var MLSlibrarians = Math.round(MLSlibrarianSum(data) * 100) / 100;
    var totalStaff = employees + librarians + MLSlibrarians

    staffDistribution = {
        'Employees': employees,
        'Librarians': librarians,
        'MLS Librarians': MLSlibrarians
    }
  
    console.log(staffDistribution);

//     // function to sort object alphebetically
//    function sortOnKeys(obj) {
//       var sorted = [];
//       for(var key in obj) {
//           sorted[sorted.length] = key;
//       }
//       sorted.sort();
//       var sortedObj = {};
//       for(var i = 0; i < sorted.length; i++) {
//         sortedObj[sorted[i]] = obj[sorted[i]];
//       }
//       return sortedObj;
//     };
  
//     function totalStaff( obj ) {
//       var sum = 0;
//       for( var el in obj ) {
//         if( obj.hasOwnProperty( el ) ) {
//           sum += parseFloat( obj[el] );
//         }
//       }
//       return sum;
//     }
  
    // set the dimensions and margins of the graph
    var width = 475
        height = 475
        margin = 35;
  
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin;
  
    // append the svg object to the div
    var pieGroup = d3.select("#donut")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
    // pieGroup.append('text')
    //   // .attr('dy', '.25em')
    //   .style('text-anchor', 'middle')
    //   .style('font-size', '75px')
    //   .attr('class', 'inside')
    //   .attr('y', 25)
    //   .text(`${compliancePercentage}%`);
  
    // Compute the position of each group on the pie
    var pie = d3.pie()
      .value(function(d) {return d.value; });
  
    // convert object to entries format
    var staffDistributionReady = pie(d3.entries(staffDistribution));
  
    // set the color scheme
    var colorScheme = d3.scaleOrdinal()
      .domain(staffDistribution)
      .range(['#136F63', '#E0CA3C', '#F17105']);
  
    // draw the pie chart
    slicesGroup = pieGroup
      .selectAll('path')
      .data(staffDistributionReady)
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
  
    slicesGroup.on('mouseover', function() {
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
  
    slicesGroup.on('mouseout', function() {
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
  
  });