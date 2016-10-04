// dom content loaded
$(document).ready(function() {
  var player = $('.player');

  function move(event) {
    var left = player.offset().left;
    var edge = $('body').width() - player.width();

    // 37 => move player to left
    // 39 => move player to right
    if (event.which === 37) {
      // check for edge
      if (left <= 0) {
        left = 0;
      } else {
        player.css('left', left - 20);
      }
    }
    if (event.which === 39) {

      if (left >= edge) {
        left = edge;
      } else {
        player.css('left', left + 20);
      }
    }
  }

  $('body').on('keydown', move)

});
