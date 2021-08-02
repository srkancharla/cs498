// https://bl.ocks.org/d3noob/402dd382a51a4f6eea487f9a35566de0
// https://bl.ocks.org/mbostock/5649592

charts.chart2 = function () {

  var fileName = "data/chart1.csv";
  var margin = { top: 40, right: 20, bottom: 60, left: 60 };
  var width = 600;
  var height = 400;
  var total_average = 55;

  var svg = d3.select("#svg3")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  d3.csv(fileName, function (dataa) {
    data = dataa.slice(0, 20);

    // X axis
    var x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(function (d) { return d.Club; }))
      .padding(0.2);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-30)")
      .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 200])
      .range([height, 0]);
    var tmp = svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text").call(e => e._groups[0].forEach(t => t.innerHTML = t.innerHTML + 'K€'));

    svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .style("font-size", "15px")
      .attr("y", -40)
      .attr("x", -250)
      .attr("transform", "rotate(-90)")
      .text("Average Wage");

    // Bars
    svg.selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) { return x(d.Club); })
      .attr("y", function (d) { return y(d.Average_Wage); })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d.Average_Wage); })
      .attr("fill", "chocolate")

    svg.append("line")
      .style("stroke", "black")
      .attr("x1", 0)
      .attr("y1", y(total_average))
      .attr("x2", width)
      .attr("y2", y(total_average));

    svg.append("text")
      .attr("stroke", "black")
      .style("font-size", "15px")
      .attr("y", y(total_average) - 5)
      .attr("x", width - 200)
      .text("Average Wage of a player")

  })


}
