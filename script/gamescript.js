// dom content loaded
$(document).ready(function() {
  /* hide pause && game over msg before game starts */
  var gameover = undefined;
  var msg = $('.msg');
  var startOverMsg = $('h2');
  var msgLeft = ($('body').width() / 2) - (startOverMsg.width() / 2);
  startOverMsg.css('margin-left', msgLeft);
  startOverMsg.hide();
  msg.hide();

  /* object of pokemons for random catch */
  var pokemons = {
    '0': 'url("assets/pokemon/bulb.gif")',
    '1': 'url("assets/pokemon/dratini.gif")',
    '2': 'url("assets/pokemon/front-blastoise.gif")',
    '3': 'url("assets/pokemon/magikarp.gif")',
    '4': 'url("assets/pokemon/mew.gif")',
    '5': 'url("assets/pokemon/abra.png")',
    '6': 'url("assets/pokemon/pikachu.png")',
    '7': 'url("assets/pokemon/poliwhirl.png")',
    '8': 'url("assets/pokemon/clefairy.png")',
    '9': 'url("assets/pokemon/dragonite.png")',
    '10': 'url("assets/pokemon/psyduck.png")',
    '11': 'url("assets/pokemon/vaporean.png")'
  };

  /* score counter */
  var scoreCounter = 0;
  var timer = $('.timer');

  /* position trainer at the middle of page */
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  var player = $('.player');
  var playerWidth = player.width();
  var playerHeight = player.height();
  var playerPosition = (windowWidth / 2) - (playerWidth / 2);
  player.css('left', playerPosition);

  var speed = 1000; // falling speed
  var paused = false; // start game with paused as false
  var sky = $('.fire-container');
  var highscores = window.localStorage; // local storage of browser for saving highscore data
  var storageKey = 0;

  var username = getUsername();

  /**
    * Sang Min (Samuel) Na
    *
    * the search URL is passed through form get method
    * get username by parsing the URL
  */
  function getUsername() {
    var url = window.location.search.substring(1);
    var parseURL = url.split('&');
    var uname = []; // uname[1] is the username
    for (var x = 0; x < parseURL.length; x++) {
      var temp = [];
      temp = parseURL[x].split('=');
      if (temp[0] === 'uname') {
        uname.push(temp[0]);
        uname.push(temp[1]);
      }
    }
    // var username = uname[1];
    return uname[1];
  }

  /**
    * Sang Min (Samuel) Na
    *
    * filters out specific keys pressed for game control
    * @event, to filter out which key was pressed
  */
  function move(event) {
    if (gameover) { /* PREVENT USER FROM MOVING */ }
    else {
      var left = player.position().left;
      var edge = $('body').width() - player.width();

      var key = event.which;
      switch (key) {
        case 37: // left
        if (left <= 8) {
          left = 8;
        } else {
          player.css('left', left - 25);
          // player.animate({'left': left - 25}, 'fast');
        }
        break;

        case 39: // right
        if (left >= edge) {
          left = edge;
        } else {
          player.css('left', left + 25);
          // player.animate({'left': left + 25}, 'fast');

        }
        break;

        /**
          * Sang Min (Samuel) Na
          *
          * when paused, stop fireball, score, and gameSpeed
          * show pause message
          * when unpaused, start fireball, score, and gameSpeed again
          * hide pause message
        */
        case 27: // pause
        if (!paused) {
          clearInterval(score);
          clearInterval(gameSpeedID);
          clearInterval(drawer);
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

          score = setInterval(scoreUpdate, 100);
          gameSpeedID = setInterval(gameSpeed, 3000);
          drawer = setInterval(draw, speed);
        }
        break;
      }
    }
  }

  /**
    * Sang Min (Samuel) Na
    *
    * draw a fixed size of fireball and pokemon helper as a new div element with css styling
    * get random position for left, range: 0 to (width of window - width of player)
  */
  function draw() {
    var width = 80;
    var height = 80;
    var top = 0;
    var left = Math.round(Math.random() * (windowWidth - width));
    var newFire1 = $('<div>');
    newFire1.addClass('fires').css({
      'width': width,
      'height': height,
      'background': 'url("assets/fireball3.gif")',
      'background-size': 'cover',
      'display': 'inline-block',
      'left': left,
      'position': 'absolute',
      'top': top,
      'z-index': '-1'
    });
    sky.append(newFire1);
    fall(newFire1);

    // draw pokemon randomly
    var rand = Math.round(Math.random() * 10);
    var pokemonSelector = Math.round(Math.random() * 11);
    var pokemonPic = pokemons[pokemonSelector];
    if (rand === 7) {
      var pokemonHelper = $('<div>');
      left = Math.round(Math.random() * (windowWidth - width));
      pokemonHelper.addClass('helpers').css({
        'width': width,
        'height': height,
        'background': pokemonPic,
        'background-size': 'cover',
        'display': 'inline-block',
        'left': left,
        'top': top,
        'position': 'absolute',
        'z-index': '-1'
      });
      sky.append(pokemonHelper);
      fall(pokemonHelper);
    }

  } // draw() end

  /**
    * Sang Min (Samuel) Na
    *
    * @obj, the created div from fall function
    * animate objects (fireball && pokemon) to bottom of screen
    * remove objects when it reaches to the bottom of page
  */
  function fall(obj) {
    obj.animate({top: windowHeight}, 3000, function() {
      // remove obj when it reaches the bottom
      if ($(this).position().top >= windowHeight) {
        $(this).remove();
      }
      $(this).css({
        bottom: '-50'
      });
    })
  }

  /**
    * Sang Min (Samuel) Na
    *
    * check any collions by looping through all object
    * show game over message when collision is detected and set gameover as true
    * increase scoreCounter when collision with pokemon is detected
    * sets highscores using browser's local storage
  */
  function checkCollision() {
    var playerTop = player.position().top;
    var playerLeft = player.position().left;
    var fires = $('.fires');
    var helpers = $('.helpers');

    // collision for fire
    for (var i = 0; i < fires.length; i++ ) {
      var fireTop = fires.eq(i).position().top;
      var fireLeft = fires.eq(i).position().left;

      /**
        * @Daniel J. Pease
        * helped with the equation for collion detection
      */
      if (Math.abs(playerTop - fireTop) < 50 && Math.abs(playerLeft - fireLeft) < 40) {
        console.log('it burnss');
        player.css({'background': 'url("assets/dead.gif")', 'background-size': '60px 60px'});
        fires.stop();
        helpers.stop();
        clearInterval(drawer);
        clearInterval(score);
        clearInterval(gameSpeedID);

        // game over message
        msg.children().first().hide();
        msg.children().first().next().show();
        startOverMsg.show();
        msg.fadeIn();
        gameover = true;

        // local storage
        storageKey++;
        highscores.setItem('' + storageKey, '' + username + ' ' + scoreCounter);
        console.log(highscores.getItem('uname'));
      }
    }

    // catch Pokemon
    for (var j = 0; j < helpers.length; j++) {
      var helperTop = helpers.eq(j).position().top;
      var helperLeft = helpers.eq(j).position().left;

      if (Math.abs(playerTop - helperTop) < 60 && Math.abs(playerLeft - helperLeft) < 40) {
        console.log('caught a pokemon!');
        scoreCounter += 100;
        // change class of the caught pokemon so it won't be counted
        helpers.eq(j).css({
          'background': 'url("assets/pokeball.gif")',
          'background-size': 'cover'
        });
        helpers.eq(j).attr('class', 'caught');
      }
    }
  }

  /**
    * Sang Min (Samuel) Na
    *
    * display score on set interval after incrementing
  */
  function scoreUpdate() {
    scoreCounter++;
    timer.text('' + username + ': ' + scoreCounter);
  }

  /**
    * Sang Min (Samuel) Na
    *
    * the setInterval speed for drawer decreases which increases the game speed
  */
  function gameSpeed() {
    speed -= 50;
    if (speed <= 100) {
      speed = 100;
    }
    clearInterval(drawer);
    drawer = setInterval(draw, speed);
    console.log('speeding', speed);
  }


  $('body').on('keydown', move);

  var drawer = setInterval(draw, speed); // create fireballs
  var collision = setInterval(checkCollision, 200); // check for collision
  var score = setInterval(scoreUpdate, 100); // increment score
  var gameSpeedID = setInterval(gameSpeed, 3000); // increase game speed every 3 seconds
});

// implement high score, top 10 only

/*

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
