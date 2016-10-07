// dom content loaded
$(document).ready(function() {
  // hide puase and game over msg
  var msg = $('.msg');
  var startOverMsg = $('h2');
  var msgLeft = $('body').width()/2 - startOverMsg.width()/2;
  startOverMsg.css('margin-left', msgLeft);
  startOverMsg.hide();
  msg.hide();

  // place player at the middle
  var windowWidth = $('body').width();
  var player = $('.player');
  var playerWidth = player.width();
  var playerHeight = player.height();
  var playerPosition = (windowWidth/2) - (playerWidth/2);
  player.css('left', playerPosition);

  var speed = 800; // falling speed
  var paused = false;
  var edgeWidth = $(window).width();
  var edgeHeight = $(window).height();
  var desiredPosition = edgeHeight; // when fireball hits the bottom
  var sky = $('.fire-container');


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
          $('.helpers').stop()
          paused = !paused;
          msg.children().first().next().hide(); // game over msg
          msg.fadeIn();
        } else {
          paused = !paused;
          var fires = $('.fires');
          for (var i = 0; i < fires.length; i++ ) {
            fall(fires.eq(i));
          }
          var helpers = $('.helpers');
          for (var j = 0; j < helpers.length; j++) {
            fall(helpers.eq(j));
          }
          timerId = setInterval(function() {
            draw();
          }, 1000);
          msg.fadeOut();
        }
        break;
    }
  }

  function draw() {
    var width = 80;
    var height = 80;
    var top = 0;
    var left = Math.round(Math.random() * (edgeWidth - 60));
    var newFire1 = $('<div>');
    newFire1.addClass('fires').css({
      'position': 'absolute',
      'background': 'url("assets/fireball3.gif")',
      // 'background-color': 'purple',
      'background-size': 'cover',
      'display': 'inline-block',
      'left': left,
      'top': top,
      'width': width,
      'height': height,
      'z-index': '-1'
    });
    sky.append(newFire1);
    fall(newFire1);

    var pokemonHelper = $('<div>');
    left = Math.round(Math.random() * (edgeWidth - 60));
    pokemonHelper.addClass('helpers').css({
      'position': 'absolute',
      'background': 'url("assets/front-blastoise.gif")',
      'background-size': 'cover',
      'display': 'inline-block',
      'left': left,
      'top': top,
      'width': width,
      'height': height,
      'z-index': '-1'
    });
    sky.append(pokemonHelper);
    fall(pokemonHelper);

  } // draw() end

  function fall(obj) {
    // console.log(obj);
    obj.animate({top: desiredPosition}, 3000, function() {
      // remove obj when it reaches the bottom
      if ($(this).offset().top >= desiredPosition) {
        $(this).remove();
      }
      // $(this).css({
      //   bottom: '-50'
      // });
    });
  }

  function checkCollision() {
    var playerTop = player.offset().top;
    var playerLeft = player.offset().left;
    var fires = $('.fires');
    var helpers = $('.helpers');

    // collision for fire
    for (var i = 0; i < fires.length; i++ ) {
      var fireTop = fires.eq(i).offset().top;
      var fireLeft = fires.eq(i).offset().left;

      if (Math.abs(playerTop - fireTop) < 40 && Math.abs(playerLeft - fireLeft) < 40) {
        console.log('it burnss');
        player.css({'background': 'url("assets/dead.gif")', 'background-size': '60px 60px'});
        fires.stop();
        helpers.stop();
        clearInterval(timerId);
        // fires.eq(i).remove()
        // game over message
        msg.children().first().hide();
        msg.children().first().next().show();
        startOverMsg.show();
        msg.fadeIn();
      }
    } // loop fires

    // catch Pokemon
    for (var j = 0; j < helpers.length; j++) {
      var helperTop = helpers.eq(j).offset().top;
      var helperLeft = helpers.eq(j).offset().left;

      if (Math.abs(playerTop - helperTop) < 40 && Math.abs(playerLeft - helperLeft) < 40) {
        console.log('caught a pokemon!');
        helpers.eq(j).css({
          'background': 'url("assets/pokeball.gif")',
          'background-size': 'cover'
        });
      }
    }
  }


  $('body').on('keydown', move)

  // in loop, update and make fires fall
  var timerId = setInterval(draw, speed);
  setInterval(checkCollision, 100);

});

// class pokemon helper
// class Pokemon {
//   constructor() {
//     this.width = 80;
//     this.height = 80;
//     this.top = 0;
//     this.number = 7;
//   }
// }
