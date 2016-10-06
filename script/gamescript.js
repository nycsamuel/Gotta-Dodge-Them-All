// dom content loaded
$(document).ready(function() {
  // place player at the middle
  var player = $('.player');
  var windowWidth = $('body').width();
  var playerWidth = player.width();
  var playerPosition = (windowWidth/2) - (playerWidth/2);
  player.css('left', playerPosition);

  // counter for falling speed
  // decreasing time makes the fireball faster
  var time = 1000;



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
  var edgeWidth = $(window).width();
  var edgeHeight = $(window).height();
  var firePosition = edgeHeight - 50;
  function draw() {
    var width = 50;
    var height = 50;
    var top = 0;
    var left = Math.round(Math.random() * (edgeWidth - 60));
    var sky = $('.fire-container');

    /* Need to make sure the fire don't overlap */
    var $newFire1 = $('<div>');
    $newFire1.addClass('fires');
    $newFire1.css({
      'position': 'absolute',
      'background': 'url("assets/fireball3.gif")',
      'background-size': 'cover',
      'display': 'inline-block',
      'left': left,
      'top': top,
      'width': width,
      'height': height
    });
    sky.append($newFire1);


    var $newFire2 = $('<div>');
    $newFire2.addClass('fires');
    $newFire2.css({
      'position': 'absolute',
      'background': 'url("assets/fireball3.gif")',
      'background-size': 'cover',
      'display': 'inline-block',
      'left': left,
      'top': top,
      'width': width,
      'height': height
    });
    sky.append($newFire2);

    fall($newFire1);
    fall($newFire2);
  } // draw() end

  // update periodically to speed up
  // also check for all fires under the screen to delete them
  function update() {
  }
  function fall(fire) {
    console.log(fire);
    fire.animate({top: firePosition}, time * 3, function() {
      // remove fire when it reaches the bottom
      if ($(this).position().top >= firePosition) {
        $(this).remove();
      }

      $(this).css({
        bottom: '-50'
      });
    });
  }





  $('body').on('keydown', move)

  // in loop, update and make fires fall
  // setInterval(draw, 1000);

});
