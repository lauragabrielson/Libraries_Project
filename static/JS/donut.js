// console.log('donut.js loaded');

// Three functions that sum each category
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

// function that formats numbers to string with commas.
var formatNumber = num => {
return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};

// draw initial Donut chart with all data.
function DrawDonut(state) {

  // load data
  d3.json('/donut').then(data => {

    // console.log(data);

    var employees = Math.round(employeeSum(data) * 100) / 100;
    var librarians = Math.round(librarianSum(data) * 100) / 100;
    var MLSlibrarians = Math.round(MLSlibrarianSum(data) * 100) / 100;
    var totalStaff = employees + librarians + MLSlibrarians

    // console.log(employees);

    staffDistribution = {
        'Employees': employees,
        'Librarians': librarians,
        'MLS Librarians': MLSlibrarians
    };

    keys = Object.keys(staffDistribution);

    console.log(staffDistribution);
  
    // set the dimensions and margins of the graph
    var width = 350
        height = 350
        margin = 12;
  
    // The radius of the pieplot is half the width or half the height (smallest one).
    var radius = Math.min(width, height) / 2 - margin;
  
    // append the svg object to the div
    var pieGroup = d3.select("#donut")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // create a tooltip
    var Tooltip = d3.select("#donut")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border-radius", "10px")
      .style("box-shadow", "2px 2px 15px 1px")
      .style("padding", "10px")

    // Three functions that control the tooltip
    var mouseover = function(d) {
      Tooltip
        .style("opacity", 1)
      d3.select(this)
        .transition()
        .duration(600)
        .style("opacity", 1)
        .attr('d', d3.arc()
          .innerRadius(radius - 70)
          .outerRadius(radius + 10)
          .cornerRadius(10)
        )
    }

    var mousemove = function(d) {
      Tooltip
        .html(
          `<center><b>${d.data.key}</b> </br>
          ${formatNumber(d.data.value)} FTE </br>
          ${Math.round((d.data.value / totalStaff) * 100)}%</center>`
          )
        .style("left", (d3.mouse(this)[0]+275) + "px")
        .style("top", (d3.mouse(this)[1]+260) + "px")
    }

    var mouseleave = function(d) {
      Tooltip
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.9)
        .transition()
        .duration(175)
        .style("opacity", .9)
        .attr('d', d3.arc()
          .innerRadius(radius - 60)
          .outerRadius(radius)
          .cornerRadius(10)
        )
    }

    var drawArc = d3.arc()
        .innerRadius(radius - 60)
        .outerRadius(radius)
        .cornerRadius(10);
  
    // Compute the position of each group on the pie
    var pie = d3.pie()
      .value(function(d) {return d.value; });
  
    // convert object to entries format
    var staffDistributionReady = pie(d3.entries(staffDistribution));
  
    // set the color scheme
    var colorScheme = d3.scaleOrdinal()
      .domain(staffDistribution)
      .range(['#E0CA3C', '#F17105', '#136F63']);
  
    // draw the pie chart
    slicesGroup = pieGroup
      .selectAll('path')
      .data(staffDistributionReady)
      .enter()
      .append('path')
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave)
      .attr('fill', function(d, i) 
        { return( colorScheme(d.data.key) )
        })
      .transition().duration(750)
      .attrTween('d', function(d) {
        var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
        return function(t) {
          d.endAngle = i(t); 
          return drawArc(d)
          }
        })
      .style('border-radius', '20px')
      .style("opacity", .9);

    // Add one dot in the legend for each name.
    pieGroup.selectAll("dots")
      .data(keys)
      .enter()
      .append("circle")
        .attr("cx", -50)
        .attr("cy", function(d,i){ return -25 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 10)
        .style("fill", function(d){ return colorScheme(d)});

    // Add label for each dot.
    pieGroup.selectAll("labels")
      .data(keys)
      .enter()
      .append("text")
        .attr("x", -35)
        .attr("y", function(d,i){ return -25 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
        // .style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle");
    });
};

// draw Donut chart with filtered data by state.
function UpdateDonut(state) {

  // load data
  d3.json('/donut').then(data => {

    var result = data.filter(d => d.state_name === state);

    // console.log(data);

    var employees = Math.round(employeeSum(result) * 100) / 100;
    var librarians = Math.round(librarianSum(result) * 100) / 100;
    var MLSlibrarians = Math.round(MLSlibrarianSum(result) * 100) / 100;
    var totalStaff = employees + librarians + MLSlibrarians

    staffDistribution = {
        'Employees': employees,
        'Librarians': librarians,
        'MLS Librarians': MLSlibrarians
    };

    keys = Object.keys(staffDistribution);

    console.log(staffDistribution);
  
    // set the dimensions and margins of the graph
    var width = 350
        height = 350
        margin = 12;
  
    // The radius of the pieplot is half the width or half the height (smallest one).
    var radius = Math.min(width, height) / 2 - margin;

    // append the svg object to the div
    var pieGroup = d3.select("#donut")
      .selectAll("*").remove();

    var pieGroup = d3.select("#donut")  
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // create a tooltip
    var Tooltip = d3.select("#donut")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("box-shadow", "2px 2px 15px 1px")
      .style("border-radius", "10px")
      .style("padding", "10px")

    // Three functions that control the tooltip
    var mouseover = function(d) {
      Tooltip
        .style("opacity", 1)
      d3.select(this)
        .transition()
        .duration(175)
        .style("opacity", 1)
        .attr('d', d3.arc()
          .innerRadius(radius - 70)
          .outerRadius(radius + 10)
          .cornerRadius(10)
        )
    }

    var mousemove = function(d) {
      Tooltip
        .html(
          `<center><b>${d.data.key}</b> </br>
          ${formatNumber(d.data.value)} FTE </br>
          ${Math.round((d.data.value / totalStaff) * 100)}%</center>`
          )
        .style("left", (d3.mouse(this)[0]+275) + "px")
        .style("top", (d3.mouse(this)[1]+260) + "px")
    }

    var mouseleave = function(d) {
      Tooltip
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.9)
        .transition()
        .duration(175)
        .style("opacity", .9)
        .attr('d', d3.arc()
          .innerRadius(radius - 60)
          .outerRadius(radius)
          .cornerRadius(10)
        )
    }

    var drawArc = d3.arc()
        .innerRadius(radius - 60)
        .outerRadius(radius)
        .cornerRadius(10);

    // Compute the position of each group on the pie
    var pie = d3.pie()
      .value(function(d) {return d.value; });
  
    // convert object to entries format
    var staffDistributionReady = pie(d3.entries(staffDistribution));
  
    // set the color scheme
    var colorScheme = d3.scaleOrdinal()
      .domain(staffDistribution)
      .range(['#E0CA3C', '#F17105', '#136F63']);
  
    // draw the pie chart
    slicesGroup = pieGroup
      .selectAll('path')
      .data(staffDistributionReady)
      .enter()
      .append('path')
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave)
      .attr('fill', function(d, i) 
        { return( colorScheme(d.data.key) )
        })
      .transition().duration(600)
      .attrTween('d', function(d) {
        var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
        return function(t) {
          d.endAngle = i(t); 
          return drawArc(d)
          }
        })
      .style('border-radius', '20px')
      .style("opacity", .9);

    // Add one dot in the legend for each name.
    pieGroup.selectAll("dots")
      .data(keys)
      .enter()
      .append("circle")
        .attr("cx", -50)
        .attr("cy", function(d,i){ return -25 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 10)
        .style("fill", function(d){ return colorScheme(d)});

    // Add label for each dot.
    pieGroup.selectAll("labels")
      .data(keys)
      .enter()
      .append("text")
        .attr("x", -35)
        .attr("y", function(d,i){ return -25 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
        // .style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle");
    });
};
