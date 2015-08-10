(function($, undefined) {
  var youtubeSearch = function youtubeSearch(query, cb, acb) {
    $.ajax({
      method: 'POST',
      url: 'youtube/search',
      contentType: 'application/json',
      data: JSON.stringify({query: query}),
      dataType: 'json'
    }).then(function(results) {
      acb(results.map(function(result) {
        return result;
      }));
    });
  };

  $(function() {
    $('input#query').typeahead({

    }, {
      name: 'Videos',
      // limit: 10,
      source: youtubeSearch,
      display: 'title',
      templates: {
        suggestion: Handlebars.compile('<div class="tt-suggestion"><img src="{{ thumbnails.default.url }}"><h2>{{ title }}</h2><p>{{ description }}</p><div style="clear:both"></div></div>')
      }
    });

    $('input#query').bind('typeahead:select', function(ev, suggestion) {
      $(this).data('selected', suggestion);
    });

    $('input#play').click(function() {
      var video = $('input#query').data('selected');
      var room = $('input#room').val();

      if (!video || !room) {
        return alert('Please choose a video and a room');
      }

      $.ajax({
        method: 'POST',
        url: 'media/play',
        contentType: 'application/json',
        data: JSON.stringify({
          video: video.link,
          room: room
        }),
        dataType: 'json'
      });
    });
  });
})(jQuery);
