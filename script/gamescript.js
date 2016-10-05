// dom content loaded
$(document).ready(function() {
  var player = $('.player');
  var windowWidth = $('body').width();
  var playerWidth = player.width();
  var playerPosition = (windowWidth/2) - (playerWidth/2);
  player.css('left', playerPosition);

  function move(event) {
    var left = player.offset().left;
    var edge = $('body').width() - player.width();

    // 37 => move player to left
    // 39 => move player to right
    if (event.which === 37) {
      // check for left edge
      if (left <= 8) {
        left = 8;
      } else {
        player.css('left', left - 15);
        // console.log(player.offset().left);
      }
    }
    if (event.which === 39) {
      // check for right edge
      if (left >= edge) {
        left = edge;
      } else {
        player.css('left', left + 15);
        // console.log(player.offset().left);
      }
    }
  }

  // draw 50 x 50 of fireballs
  function draw() {
    var edge = $('body').width();
    var width = 50;
    var height = 50;
    var top = 0;
    var left = Math.round(Math.random() * (edge - 60));
    // randomize rock's width & height & top & left
    // var width =   Math.round((Math.random() * 80) + 50);
    // var height =  Math.round((Math.random() * 60) + 30);
    console.log('width', width, 'height', height, 'top', top, 'left', left);

    var sky = $('.rock-container');
    var $newRock = $('<div>');
    $newRock.addClass('rocks');
    $newRock.css({
      'position': 'absolute',
      'background': 'url("assets/fireball3.gif")',
      'background-size': 'cover',
      'display': 'inline-block',
      'left': left,
      'top': top,
      'width': width,
      'height': height
    })
    sky.append($newRock);

    /**
      * Need to make sure the rocks don't overlap
    **/


    // make it rain flaming rocks
    // fall($newRock);
  }

  // update the rock's top position incrementally
  // incremental value gets higher when the pace increases
  /**
    * the fall() targets ALL rocks
  **/
  function fall(target) {
    // var rocks = $('.rocks
    var top = $(this).css('top');
    $('.rock').css('top', top += 10);
    // var rockTimer = setInterval(function() {
    // }, 500);
  }

  // update periodically to speed up
  // also check for all rocks under the screen to delete them
  function update() {
  }

  $('body').on('keydown', move)

  // in loop, update and make rocks fall
  // setInterval(draw, 2000);
  // setInterval(fall, 1000);

});
