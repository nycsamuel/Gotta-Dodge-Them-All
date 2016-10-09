// dom content loaded
$(document).ready(function() {
  // hide puase and game over msg
  var gameover = undefined;
  var msg = $('.msg');
  var startOverMsg = $('h2');
  var msgLeft = ($('body').width() / 2) - (startOverMsg.width() / 2);
  startOverMsg.css('margin-left', msgLeft);
  startOverMsg.hide();
  msg.hide();

  // score counter
  var scoreCounter = 0;
  var timer = $('.timer');

  // place player at the middle
  var windowWidth = $('body').width();
  var player = $('.player');
  var playerWidth = player.width();
  var playerHeight = player.height();
  var playerPosition = (windowWidth / 2) - (playerWidth / 2);
  player.css('left', playerPosition);

  var speed = 1000; // falling speed
  var paused = false;
  var edgeWidth = $(window).width();
  var edgeHeight = $(window).height();
  var desiredPosition = edgeHeight; // when fireball hits the bottom
  var sky = $('.fire-container');


  function move(event) {
    if (gameover) {
      // do not allow gamer to continue
    } else {
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
          clearInterval(drawer);
          clearInterval(score);
          clearInterval(gameSpeed);
          $('.fires').stop();
          $('.helpers').stop();

          paused = !paused;
          msg.children().first().next().hide(); // game over msg
          if (gameover) {
            msg.children().first().next().show();
          }
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
          msg.fadeOut();

          drawer = setInterval(draw, speed);
          score = setInterval(scoreUpdate, 100);
          gameSpeed = setInterval(gameSpeed, 5000);
        }
        break;
      }
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

    // draw pokemon
    var rand = Math.round(Math.random() * 10);
    if (rand === 7) {
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
    }

  } // draw() end

  function fall(obj) {
    // console.log(obj);
    obj.animate({top: desiredPosition}, 3000, function() {
      // remove obj when it reaches the bottom
      if ($(this).offset().top >= desiredPosition) {
        $(this).remove();
      }

      $(this).css({
        bottom: '-50'
      });
    })
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
        clearInterval(drawer);
        clearInterval(score);
        clearInterval(gameSpeed);

        // game over message
        msg.children().first().hide();
        msg.children().first().next().show();
        startOverMsg.show();
        msg.fadeIn();
        gameover = true;
      }
    }

    // catch Pokemon
    for (var j = 0; j < helpers.length; j++) {
      var helperTop = helpers.eq(j).offset().top;
      var helperLeft = helpers.eq(j).offset().left;

      if (Math.abs(playerTop - helperTop) < 45 && Math.abs(playerLeft - helperLeft) < 45) {
        console.log('caught a pokemon!');
        scoreCounter += 50;
        // change class of the caught pokemon so it won't be counted
        helpers.eq(j).css({
          'background': 'url("assets/pokeball.gif")',
          'background-size': 'cover'
        });
        helpers.eq(j).attr('class', 'caught');
      }
    }
  }

  function scoreUpdate() {
    scoreCounter++;
    timer.text(scoreCounter);
  }

  function gameSpeed() {
    speed -= 100;
  }


  $('body').on('keydown', move);

  var drawer = setInterval(draw, speed); // create fireballs
  var collision = setInterval(checkCollision, 200); // check for collision
  var score = setInterval(scoreUpdate, 100);
  var gameSpeed = setInterval(gameSpeed, 5000);
});



/*
  for counting pokemons
  counter = 0;
  counter++;
  $('.timer').text(counter);

class Pokemon {
  constructor() {
    this.width = 80;
    this.height = 80;
    this.top = 0;
    this.number = 7;
    this.element = $('<div>')
  }
}

  var helper = new Pokemon();
  helper.element.css({})

*/
