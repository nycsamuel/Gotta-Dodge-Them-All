// DOM content loaded
$(document).ready(function() {
  console.log('dom loaded');

  var formContainer = $('.flex-container');
  var welcomeContainer = $('.welcome-container');

  /**
  * Sang Min (Samuel) Na
  *
  * fadeout welcome message
  * fadein input forms
  */
  function welcomeEffects() {
    $(this).animate({'font-size': '1.2em'}, 2000);
    $(this).fadeOut(1000, function() {
      formContainer.fadeIn('slow');
    });
  }

  welcomeContainer.on('click', welcomeEffects);
});
