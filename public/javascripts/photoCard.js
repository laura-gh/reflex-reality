    // Lightbox for photos using Semantic UI
    $('.PhotoCard').click(function () {
      var image = $(this)
        .children('img')
        .attr('src')
      $('body').append(
        '<div class="ui basic modal"><div class="content"><img src="' +
        image +
        '" width="100%" /></div></div>'
      )
      $('.ui.basic.modal')
        .remove()
        .modal('show')
    })