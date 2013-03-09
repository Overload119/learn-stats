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
  var data = [ { x: 0, y: 3 },{ x: 1, y: 9 },{ x: 2, y: 7 },{ x: 3, y: 1 },{ x: 4, y: 6 }];

  $('#roll-dice').click(function() {

  });

  $('#formula-box').keyup(function() {
    var content = $(this).val();
    var splitNum = content.split(' ');

    console.log(content);

    var numberArray = [];
    for(var i = 0; i < splitNum.length; i++) {
      if( splitNum[i] !== '' ) {
        try {
          numberArray.push( parseInt(splitNum[i], 10) );

        }
        catch(err) {
        }
      }
    }

    var n = numberArray.length;
    var sum = 0;
    for(var i = 0; i < n; i++) {
      sum += numberArray[i];
    }

    var mean = Math.round( (sum / n) * 100 ) / 100;

    var vsum = 0;
    for(var i = 0; i < n; i++) {
      vsum += Math.pow(numberArray[i] - mean, 2);
    }

    var variance = Math.round( (vsum / n) * 100) / 100;
    $('#formula-box-result').text('Mean: ' + mean.toString() + ' | Variance: ' + variance.toString());
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
