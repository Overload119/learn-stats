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
      $('.definition-text').fadeOut(250, function() {
        $('.definition-text').text('If you\'re given a sample with a non-normal distribution, its sampling distribution of means will be approximately normal for large sample sizes (over 30).');
        $('.definition-text').fadeIn(250);
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
    $('#user-graph-next-btn').click( function () {
      $('.thumb-detail').stop().animate({bottom:0}, 500);
      $(this).val("Show me");
      $(this).off('click').click( function() {
        Reveal.next();
      });
    });
  }
  $("#what-happens-btn").click( function(){
    var graphs = [];
    $('.generated-graph').addClass('clear-graph').html('');
    graphs = rollGraphs();
    $(this).val('with a different 5?').off('click').click(function() {
      graphs = rollGraphs();
      $('#middle-bar-text').html("See how random the results are? ");
      $(this).val('Try one last time').off('click').click(function(){
        graphs = rollGraphs();
        $('#middle-bar-text').html("What happens ");
        $(this).val('if we average the ratings?').off('click').click(function(){
          $(this).val('if a lot of people rate the cats?').off('click').click(function(){
            Reveal.next();
          });
          $('.generated-graph').removeClass('clear-graph').html('');
          var l = graphs.length;
          for (var i = 1; i <= l; i++){
            var data = graphs[i-1].series[0].data;
            var sum = 0;
            for (var j = 0; j < data.length; j++){
              sum += data[j].y;
            }
            $("#generated-graph-" + i).html(sum/data.length);
          }
        });
      });
    });
  });
  function rollGraphs(){
    var graphs = [];
    graphs.push(generateSmallGraph(1));
    graphs.push(generateSmallGraph(2));
    graphs.push(generateSmallGraph(3));
    graphs.push(generateSmallGraph(4));
    return graphs;
    /*
    setTimeout(function() { generateSmallGraph(2); }, 200);
    setTimeout(function() { generateSmallGraph(3); }, 400);
    setTimeout(function() { generateSmallGraph(4); }, 600);
    */
  }
  $("#five-cats").click( function() { $("#value-plot").html(''); generateNormalGraph(5) });
  $("#ten-cats").click( function() { $("#value-plot").html(''); generateNormalGraph(10) });
  $("#fifteen-cats").click( function() { $("#value-plot").html(''); generateNormalGraph(15) });
  $("#thirty-cats").click( function() { $("#value-plot").html(''); generateNormalGraph(30) });
  function generateNormalGraph(cats){
    var averageOccurences = [];
    for (var i = 0; i < $("#number-of-people").val(); i++){
      var sum = 0;
      for (var j = 0; j < cats; j++){
        sum += Math.floor((Math.random()*5)+1);
      }
      sum /= cats;
      sum = sum.toFixed(5);
      if (averageOccurences[sum]){
        averageOccurences[sum] += 1;
      }
      else{
        averageOccurences[sum] = 1;
      }
    }
    var newarray = []; //HACKISH AS FUCK I HATE THIS CODE
    for(var key in averageOccurences){
      newarray.push({'x': parseFloat(key), 'y': averageOccurences[key]});
    }
    console.log(newarray);
    var normalGraph = new Rickshaw.Graph( {
      element: document.querySelector('#value-plot'),
      renderer: 'bar',
      series: [
      {
        color: "#000",
        data: newarray.sort(function(a, b){
          if (a.x < b.x) return -1;
          if (a.x > b.x) return 1;
          return 0;
        })
      }]
    });
    normalGraph.render();
  }

  function swag (a) {
    return a;
  }


  function generateSmallGraph(x) {
    $('#generated-graph-' + x).html('');
    var generated = new Rickshaw.Graph( {
      element: document.querySelector("#generated-graph-" + x),
      renderer: 'bar',
      series: [
      {
        color: "#000",
        data: getNumbers(50),
        name: 'Time'
      }
      ]
    });
    generated.render();
    return generated;
  }
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
    catGameArray.push({ x: catGameCounter - 1, y: parseFloat(rating) });
    catGameCounter++;
    if(catGameArray.length === 5) {
      Reveal.next();
      var userDataGraph = new Rickshaw.Graph( {
        element: document.querySelector('#user-ratings-graph'),
        renderer: 'bar',
        series: [
          {
            color: "#9c646b",
            data: catGameArray,
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
      return;
    }
    $('.cat-image-container img').attr('src', './cats/cat' + catGameCounter + '.jpg');
    $('.cat-image-container img').hide().fadeIn();
  });

});
