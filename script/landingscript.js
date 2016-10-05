

// DOM content loaded
$(document).ready(function() {
  console.log('dom loaded');

  var formContainer = $('.flex-container');
  var welcomeContainer = $('.welcome-container');


  welcomeContainer.on('click', welcomeEffects);





  


  /* when user clicks on 'welcome', it will grow in size and fade away to show formContainer */
  function welcomeEffects() {
    $(this).animate({'font-size': '1.5em'}, 2000);
    $(this).fadeOut(1000, function() {
      formContainer.fadeIn('slow');
    });
  }

});
