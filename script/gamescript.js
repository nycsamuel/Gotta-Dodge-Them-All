// dom content loaded
$(document).ready(function() {
  var windowWidth = $('body').width();
  var player = $('.player');
  var playerWidth = player.width();
  var playerHeight = player.height();

  // place player at the middle
  var playerPosition = (windowWidth/2) - (playerWidth/2);
  player.css('left', playerPosition);

  var speed = 3000; // counter for falling speed

  var paused = false;
  var pauseMsg = $('.msg');
  pauseMsg.hide();


  function move(event) {
    var left = player.offset().left;
    var edge = $('body').width() - player.width();

    var key = event.which;
    switch (key) {
      // left
      case 37:
        if (left <= 8) {
          left = 8;
        } else {
          player.css('left', left - 15);
        }
        break;
      // right
      case 39:
        if (left >= edge) {
          left = edge;
        } else {
          player.css('left', left + 15);
        }
        break;
      // pause
      case 27:
        if (!paused) {
          clearInterval(timerId);
          $('.fires').stop();
          paused = !paused;
          pauseMsg.fadeIn();
        } else {
          paused = !paused;
          var fires = $('.fires');
          for (var i = 0; i < fires.length; i++ ) {
            fall(fires.eq(i));
          }
          timerId = setInterval(draw, 1000);
          pauseMsg.fadeOut();
        }
        break;
    }
  }

  // draw fireballs
  var edgeWidth = $(window).width();
  var edgeHeight = $(window).height();
  var firePosition = edgeHeight;
  function draw() {
    var width = 80;
    var height = 80;
    var top = 0;
    var left = Math.round(Math.random() * (edgeWidth - 60));
    var sky = $('.fire-container');

    /* Need to make sure the fire don't overlap */
    var $newFire1 = $('<div>');
    $newFire1.addClass('fires');
    $newFire1.css({
      'position': 'absolute',
      'background': 'url("assets/fireball3.gif")',
      // 'background-color': 'purple',
      'background-size': 'cover',
      'display': 'inline-block',
      'left': left,
      'top': top,
      'width': width,
      'height': height,
      'z-index': -1
    });
    sky.append($newFire1);

    var $newFire2 = $('<div>');
    left = Math.round(Math.random() * (edgeWidth - 60));
    $newFire2.addClass('fires');
    $newFire2.css({
      'position': 'absolute',
      'background': 'url("assets/fireball3.gif")',
      // 'background-color': 'purple',
      'background-size': 'cover',
      'display': 'inline-block',
      'left': left,
      'top': top,
      'width': width,
      'height': height,
      'z-index': -1
    });
    sky.append($newFire2);

    fall($newFire1);
    fall($newFire2);
  } // draw() end

  function fall(fire) {
    // console.log(fire);
    fire.animate({top: firePosition}, speed, function() {
      // remove fire when it reaches the bottom
      if ($(this).position().top >= firePosition) {
        $(this).remove();
      }
      $(this).css({
        bottom: '-50'
      });
    });
  }

  function checkCollision() {
    var fires = $('.fires');
      for (var i = 0; i < fires.length; i++ ) {
        var fireTop = fires.eq(i).offset().top
        var fireLeft = fires.eq(i).offset().left;
        var playerTop = player.offset().top;
        var playerLeft = player.offset().left;

        if (Math.abs(playerTop - fireTop) < 60 && Math.abs(playerLeft - fireLeft) < 60) {
          console.log('it burnss');
          player.css({'background': 'url("assets/dead.gif")', 'background-size': '60px 60px'});
          fires.stop();
          clearInterval(timerId);
          // fires.eq(i).remove()
          // 
        }
      }
  }



  $('body').on('keydown', move)

  // in loop, update and make fires fall
  var timerId = setInterval(draw, 1000);
  setInterval(checkCollision, 100);

});
