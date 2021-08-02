// https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4

charts.chart1 = function () {
  var fileName = "data/cleaned_data.csv";
  var margin = { top: 40, right: 20, bottom: 60, left: 60 };
  var width = 600;
  var height = 400;



  // append the svg object to the body of the page
  var svg = d3.select("#svg2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  d3.csv(fileName, function (data) {

    svg.append("text")
      .attr("x", (width / 2) - 15)
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "15px")
      .style("text-decoration", "underline")
      .style('fill', 'chocolate')
      .text("Age vs Potential");

    var x = d3.scaleLinear()
      .domain([13, 50])
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add X axis title    
    svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .style("font-size", "15px")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .text("Age");

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([43, 100])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));
    // Add y axis title 

    svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .style("font-size", "15px")
      .attr("y", -40)
      .attr("x", -100)
      .attr("transform", "rotate(-90)")
      .text("Potential");

    svg.append('g')
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) { return x(d.Age); })
      .attr("cy", function (d) { return y(d.Potential); })
      .attr("r", 1.1)
      .style("fill", "#d2691e")

    svg.append("text")
      .attr("x", 2 * (width / 3) + 30)
      .attr("y", margin.top)
      .style("font-size", "15px")
      .style('fill', 'chocolate')
      .text("Regression");  //Coefficient(r2) = 0.25

    svg.append("text")
      .attr("x", 2 * (width / 3) + 30)
      .attr("y", margin.top + 15)
      .style("font-size", "15px")
      .style('fill', 'chocolate')
      .text("Coefficient (r^2) = -0.25");
  });
}