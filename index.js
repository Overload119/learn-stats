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
    if(currentStep === 1) {
      Reveal.next();
    } else {
      $('.definition-text').fadeOut(250, function() {
        $('.definition-text').text('If you\'re given a sample with a non-normal distribution, its sampling distribution of means will be approximately normal for large sample sizes (over 30).');
        $('.definition-text').fadeIn(250);
      });
      $(this).val('I still don\'t get it');
      $(this).data('step', 1);
    }
  });

  var catGameCounter = 1;
  var catGameArray = [];
  $('#play-game').click(function() {
    $('.panel-two').fadeIn();
    $(this).hide();
  });
  $('.panel-two').hide(); // Hide this at the start
  $('.rate-button').click(function() {
    var rating = $(this).val();
    catGameArray.push(rating);
    catGameCounter++;
    $('.cat-image-container img').attr('src', './cats/cat' + catGameCounter + '.jpg');
    $('.cat-image-container img').hide().fadeIn();
    if(catGameArray.length === 5) {
      Reveal.next();
    }
  });

});