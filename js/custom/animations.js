(function ($) {
  $(function () {
    
    // Sticky tabs
    $('.header-main .tab').mouseenter(function () {
      $('.header-main .tab').removeClass('active');
      $(this).addClass('active');
    });

    // Collapsibles
    $('.collapsible h3').click(function () {
      $(this).parent().toggleClass('collapsed');
    });

  });
})(jQuery);
