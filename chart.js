function plot () {

document.getElementById('chart').innerHTML = ""

var margin = {top: 50, right: 30, bottom: 90, left: 80},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data

  var data_raw = getparameters_plot()
  var data = data_raw[0]
  var xs = data_raw[1]
  var ys = data_raw[2]
  var xmin = d3.min(xs)
  var xmax = d3.max(xs)
  var ymin = d3.min(ys)
  var ymax = d3.max(ys)  

  likelihood(getparameters())

  // Add X axis
  var x = d3.scaleLinear()
    .domain([xmin - 1, xmax + 1])
    .range([ 0, width ]);
  svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(-height).ticks(10));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([ymin - 1, ymax + 1])
    .range([ height, 0]);
  svg.append("g")
    .attr("class", "yAxis")
    .call(d3.axisLeft(y).tickSize(-width).ticks(10));

  svg.selectAll(".tick line").attr("stroke", "grey")

  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width/2 + margin.left - 75)
      .attr("y", height + margin.top - 10)
      .style("font-family", "serif")
      .text("α");

  // Y axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .style("font-family", "serif")
      .attr("y", -margin.left + 40)
      .attr("x", -margin.top - height/2 + 55)
      .text("β")

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function(d) {return x(d[0])} )
      .attr("cy", function(d) {return y(d[1])} )
      .attr("r", 3)
      .style("fill", function(d) {return (d[2])})

    }