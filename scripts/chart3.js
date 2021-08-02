// https://codepen.io/MichaelWStuart/pen/Xpmbyq?editors=0110
// https://bl.ocks.org/d3noob/6f082f0e3b820b6bf68b78f2f7786084
// https://bl.ocks.org/mbostock/5537697

charts.chart3 = function () {
    var fileName = "data/club_stats.csv";
    var textFields = [ 'Country_with_most_players', 'Position', 'Highest_Paid_Player']
    var clubFields = ['Average_Age', 'Average_potential', //'Highest_Paid_Player',
    'Highest_Paid_Wage(Euros)', 'Total_Players']

    d3.csv(fileName, function (error, data) {
        var clubStatsMap = {};
        data.forEach(function (d) {
            var club = d.Club;
            clubStatsMap[club] = [];

            clubFields.forEach(function (field) {
                clubStatsMap[club].push((+d[field]).toFixed(0));
            });
            textFields.forEach(function (field) {
                clubStatsMap[club].push(d[field]);
            });
        });
        makeVis(clubStatsMap);
    });

    var makeVis = function (clubStatsMap) {

        var updateBars = function (data, name) {
            // debugger;
            d3.select("#CountryLabel").text(data[4]);
            d3.select("#PlayerHigh").text(data[6]);
            d3.select("#Position").text(data[5]);
            d3.select("#WageLabel").text(data[2]+'K');
            d3.select("#AgeLabel").text(data[0]);
            d3.select("#PotentailLabel").text(data[1]);
            d3.select("#playesLabel").text(data[3]);
            d3.select("#clubLabel").text( ' Key Statistics of ' + name);
        };

        // Handler for dropdown value change
        var dropdownChange = function () {
            var newclub = d3.select(this).property('value'),
                newData = clubStatsMap[newclub];

            updateBars(newData, newclub);
        };

        var clubs = Object.keys(clubStatsMap).sort();

        var dropdown = d3.select("#optionSelect")
            // .insert("select", "svg")
            .on("change", dropdownChange);

        dropdown.selectAll("option")
            .data(clubs)
            .enter().append("option")
            .attr("value", function (d) { return d; })
            .text(function (d) {
                return d[0].toUpperCase() + d.slice(1, d.length); // capitalize 1st letter
            });
        
        var initialData = clubStatsMap[clubs[0]];
        updateBars(initialData, clubs[0]);
    };


};