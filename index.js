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

  $('#intro-btn').click(function() {
    var currentStep = $(this).data('step');
    console.log(currentStep);
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
  var data = [ { x: 0, y: 3 },{ x: 1, y: 9 },{ x: 2, y: 7 },{ x: 3, y: 1 },{ x: 4, y: 6 }];

  var graph = new Rickshaw.Graph( {
      element: document.querySelector('#user-ratings-graph'),
      renderer: 'bar',
      series: [
      {
        color: 'steelblue',
        data: data
      }
      ]
  } );

  graph.render();

});
