(function ($) {
  $(function () {
    // SOLR search scrollbar
    $('.solr-result-page').jScrollPane({
      verticalDragMinHeight: 65,
      verticalDragMaxHeight: 65,
      verticalGutter: 22,
    });
    
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
