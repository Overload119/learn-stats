(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

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

  // Setup the Dice canvas
  (function() {
    var diceCanvas = document.getElementById('dice-canvas');
    var g = diceCanvas.getContext('2d');
    var graph = [0, 0, 0, 0, 0, 0];
    var diceRolling = false;
    var diceAlpha = 0;
    var diceValue = 0;

    var sampleSum = 0;
    var sampleSize = 0;

    var BARWIDTH = 45;
    var CANVAS_WIDTH = 274;
    var CANVAS_HEIGHT = 197;
    var DICE_WIDTH = 64;
    var DICE_HEIGHT = 64;
    var DICE_SWITCH_TIME = 2000;
    var DICE_SWITCH_TIME_MAX = 1000;

    var updateDiceStat = function() {
      var text = 'Your sample mean is ' + Math.round((sampleSum / sampleSize) * 100) / 100 + ' and your sample size is ' + sampleSize + '.';
      $('#dice-stat').text(text);
    }

    var drawDice = function(num) {
      var centerX = Math.floor( CANVAS_WIDTH / 2 ) - Math.floor( DICE_WIDTH / 2 );
      var centerY = Math.floor( CANVAS_HEIGHT / 2 ) - Math.floor( DICE_HEIGHT / 2 );
      var HOLESIZE = 14;
      var PADDING = 2;

      g.strokeStyle = 'black';
      g.fillStyle = '#fff';

      g.fillRect(centerX, centerY, DICE_WIDTH, DICE_HEIGHT);
      g.strokeRect(centerX, centerY, DICE_WIDTH, DICE_HEIGHT);

      centerX = centerX + Math.floor(DICE_WIDTH/2) - Math.floor(HOLESIZE/2);
      centerY = centerY + Math.floor(DICE_HEIGHT/2) - Math.floor(HOLESIZE/2);

      g.fillStyle = 'rgba(0, 0, 0, ' + diceAlpha + ')'
      if(num === 1) {
        g.fillRect(centerX, centerY, HOLESIZE, HOLESIZE);
      }
      else if(num === 2) {
        g.fillRect(centerX - HOLESIZE - PADDING, centerY - HOLESIZE - PADDING, HOLESIZE, HOLESIZE);
        g.fillRect(centerX + HOLESIZE + PADDING, centerY + HOLESIZE + PADDING, HOLESIZE, HOLESIZE);
      }
      else if(num === 3) {
        g.fillRect(centerX, centerY, HOLESIZE, HOLESIZE);
        g.fillRect(centerX - HOLESIZE - PADDING, centerY - HOLESIZE - PADDING, HOLESIZE, HOLESIZE);
        g.fillRect(centerX + HOLESIZE + PADDING, centerY + HOLESIZE + PADDING, HOLESIZE, HOLESIZE);
      }
      else if(num === 4) {
        g.fillRect(centerX - HOLESIZE - PADDING, centerY - HOLESIZE - PADDING, HOLESIZE, HOLESIZE);
        g.fillRect(centerX - HOLESIZE - PADDING, centerY + HOLESIZE + PADDING, HOLESIZE, HOLESIZE);

        g.fillRect(centerX + HOLESIZE + PADDING, centerY - HOLESIZE - PADDING, HOLESIZE, HOLESIZE);
        g.fillRect(centerX + HOLESIZE + PADDING, centerY + HOLESIZE + PADDING, HOLESIZE, HOLESIZE);
      }
      else if(num === 5) {
        g.fillRect(centerX, centerY, HOLESIZE, HOLESIZE);
        g.fillRect(centerX - HOLESIZE - PADDING, centerY - HOLESIZE - PADDING, HOLESIZE, HOLESIZE);
        g.fillRect(centerX + HOLESIZE + PADDING, centerY + HOLESIZE + PADDING, HOLESIZE, HOLESIZE);

        g.fillRect(centerX - HOLESIZE - PADDING, centerY + HOLESIZE + PADDING, HOLESIZE, HOLESIZE);
        g.fillRect(centerX + HOLESIZE + PADDING, centerY - HOLESIZE - PADDING, HOLESIZE, HOLESIZE);
      }
      else if(num === 6) {
        g.fillRect(centerX - HOLESIZE - PADDING, centerY - HOLESIZE - PADDING, HOLESIZE, HOLESIZE);
        g.fillRect(centerX - HOLESIZE - PADDING, centerY + HOLESIZE + PADDING, HOLESIZE, HOLESIZE);
        g.fillRect(centerX + HOLESIZE + PADDING, centerY - HOLESIZE - PADDING, HOLESIZE, HOLESIZE);
        g.fillRect(centerX + HOLESIZE + PADDING, centerY + HOLESIZE + PADDING, HOLESIZE, HOLESIZE);

        g.fillRect(centerX + HOLESIZE + PADDING, centerY, HOLESIZE, HOLESIZE);
        g.fillRect(centerX - HOLESIZE - PADDING, centerY, HOLESIZE, HOLESIZE);
      }
    }

    var render = function() {
      g.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      g.fillStyle = 'black';
      // Draw the X-axis graph
      for(var i = 0; i < 6; i++) {
        g.strokeStyle = 'white'
        g.fillRect(i * BARWIDTH, (CANVAS_HEIGHT - graph[i] * 10) - 22, BARWIDTH, graph[i] * 10);
        g.strokeRect(i * BARWIDTH, (CANVAS_HEIGHT - graph[i] * 10) - 22, BARWIDTH, graph[i] * 10);
        g.font = '11px Arial';
        g.strokeStyle = 'black';
        g.strokeText((i + 1).toString(), 22 + i * BARWIDTH, CANVAS_HEIGHT - 11);
      }

      if(diceRolling) {
        diceAlpha -= 0.05;
        drawDice(diceValue);

        if(diceAlpha < 0) {
          diceRolling = false;
          graph[diceValue-1]++;
          sampleSize++;
          sampleSum += diceValue;
          updateDiceStat();
        }
      }
    }

    var animate = function() {
      requestAnimationFrame(animate);
      render();
    }

    $('#roll-dice').click(function() {
      if( diceRolling === false ) {
        diceRolling = true;
        diceAlpha = 1;
        diceValue = Math.floor(Math.random() * 6) + 1;
      }
    });

    // Start the canvas code
    animate();
  })();

  $('#formula-box').keyup(function() {
    var content = $(this).val();
    var splitNum = content.split(' ');
    if($.trim(content) === '') {
      content = '0';
      splitNum = content.split(' ');
    }

    var numberArray = [];
    for(var i = 0; i < splitNum.length; i++) {
      if( splitNum[i] !== '' ) {
        try {
          numberArray.push( parseInt(splitNum[i], 10) );
        } catch(err) {}
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