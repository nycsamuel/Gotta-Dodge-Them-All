// dom content loaded
$(document).ready(function() {
  var player = $('.player');
  var sky = $('.rock-container');

  function move(event) {
    var left = player.offset().left;
    var edge = $('body').width() - player.width();

    // 37 => move player to left
    // 39 => move player to right
    if (event.which === 37) {
      // check for left edge
      if (left <= 0) {
        left = 0;
      } else {
        player.css('left', left - 20);
      }
    }
    if (event.which === 39) {
      // check for right edge
      if (left > edge) {
        left = edge;
      } else {
        player.css('left', left + 20);
      }
    }
  }

  // draw divs as burning rocks
  function draw() {
    var edge = $('body').width();
    var $newRock = $('<div>');
    $newRock.addClass('rocks');

    // randomize rock's width and height
    var width =   Math.round((Math.random() * 130) + 50);
    var height =  Math.round((Math.random() * 80) + 50);
    console.log(width, height);
    var top = 0;
    var left = Math.round(Math.random() * (edge - 60));
    console.log(top, left);

    $newRock.css({'width': width, 'height': height, 'background-color': 'red', 'display': 'inline-block', 'position': 'absolute', 'top': top, 'left': left});
    sky.append($newRock);
  }

  // update periodically to speed up
  function update() { }

  // update the rock's top position incrementally
  // incremental value gets higher when the pace increases
  function fall() {
    var rocks = $('.rocks');
    
  }


  // in loop, update and make rocks fall


  $('body').on('keydown', move)

});
