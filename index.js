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

  function getNumbers(l){
    var array = [];
    while(l--){
      array.push( { x: l, y: Math.floor((Math.random()*5)+1)} );
    }
    return(array);
  }
  $('#intro-btn').click(function() {
    var currentStep = $(this).data('step');
    if(currentStep === 1) {
      Reveal.next();
    } else {
      $('.definition-text').fadeOut(500, function() {
        $('.definition-text').text('If you\'re given a sample with a non-normal distribution, its sampling distribution of means will be approximately normal for large sample sizes (over 30).');
        $('.definition-text').fadeIn();
      });
      $(this).val('I still don\'t get it');
      $(this).data('step', 1);
    }
  });

  if ($('html').hasClass('csstransforms3d')) {    
    // if it's supported, remove the scroll effect add the cool card flipping instead
    $('.thumb').removeClass('scroll').addClass('flip');     

    // add/remove flip class that make the transition effect
    $('#user-graph-next-btn').click(
      function () {
        $('.thumb-wrapper').addClass('flipIt');
      }
    );

  } else {
    // CSS 3D is not supported, use the scroll up effect instead
    $('#user-graph-next-btn').click(
      function () {
        $('.thumb-detail').stop().animate({bottom:0}, 500);
        $(this).val("Show me");
        $(this).click( function() {
          Reveal.next();
        });
      }
    );
  }

  var userData = [ { x: 0, y: 3 },{ x: 1, y: 9 },{ x: 2, y: 7 },{ x: 3, y: 1 },{ x: 4, y: 6 }];
  var userDataGraph = new Rickshaw.Graph( {
      element: document.querySelector('#user-ratings-graph'),
      renderer: 'bar',
      series: [
      {
        color: "#9c646b",
        data: userData,
        name: 'Time'
      }
      ]
  } );
  var hoverDetail = new Rickshaw.Graph.HoverDetail( {
        graph: userDataGraph,
        xFormatter: function(x) { return null },
        yFormatter: function(y) { return Math.floor(y) + " months" }
  } );
  userDataGraph.render();

  var generatedGraphLarge = new Rickshaw.Graph( {
      element: document.querySelector('#generated-graph-large'),
      width: 800,
      height: 200,
      renderer: 'bar',
      series: [
      {
        color: '#4b7865',
        data: getNumbers(50),
        name: 'Time'
      }
      ]
  });
  //TODO: implement the fuckin axis marker`
  /*var generatedGraphLargeYaxis = new Rickshaw.Graph.Axis.Y( {
    element: document.getElementById('#generated-graph-large-yaxis'),
    graph: generatedGraphLarge,
    orientation: 'left',
    tickFormat: Rickshaw.Fixtures.Number.formatKBMT,
  });*/
  generatedGraphLarge.render();
});
