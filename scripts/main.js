new fullpage('#fullpage', {
  licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
  sectionsColor: ['#F5F3D7', '#F5F3D7', '#F5F3D7', 'F5F3D7', '#F5F3D7'],
  scrollOverflow: true,

  // events
  afterSlideLoad: function (section, origin, destination, direction) {
    if (destination.index > 0 && destination.index <= 3) {
      if (!charts.drawn.includes('chart' + destination.index)) {
        charts.drawn.push('chart' + destination.index)
        var runChart = charts['chart' + destination.index];
        runChart();
      }
    }
  },
});


