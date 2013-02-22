$(function() {
  Reveal.initialize({
    width: 960,
    height: 700,
    controls: false,
    progress: true,
    history: false,
    keyboard: true,
    overview: true,
    center: true,
    loop: false,
    rtl: false,
    autoSlide: 0,
    mouseWheel: false,
    rollingLinks: false,
    transition: 'default' // default/cube/page/concave/zoom/linear/fade/none
  });

  //FAKE USER DATA
  var userData = [{x: 0, y: 8}, {x: 1, y: 2}, {x: 2, y: 10}, {x: 3, y: 4}, {x: 4, y: 6}];

  var userDataGraph = new Rickshaw.Graph ( {
    element: document.querySelector("#user-ratings-graph"),
    width: 600,
    height: 300,
    renderer: 'bar',
    series: [ {
      color: '#686091',
      data: userData
    }]
  });
  
  userDataGraph.render();
});
