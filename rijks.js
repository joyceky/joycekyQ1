"use strict";

$( document ).ready(function() {
    getRijksArt();
});

function getRijksArt() {
    var content = $("#content");

  $('#domainform').on('submit', function(event) {
        event.preventDefault();

        var query = $('#s').val();
        query = query.replace(/\s+/g, '');

        var url = "https://www.rijksmuseum.nl/api/en/collection?q=" + query + "&key=PYC2DUue&format=json";

        var request = $.ajax({
            url: url,
            dataType: "json"
        });

        request.done(function(data) {
              console.log(data.artObjects);
              var rijksArt = data.artObjects;
              content.empty();
              content.hide();

          for (var i = 0; i < rijksArt.length; i++) {
                console.log(rijksArt[i].webImage.url);
                var myImg = "<br><img class=\"gif\" src=" + rijksArt[i].webImage.url + ">";
                content.append(myImg);
              }
              content.fadeIn(900);
          }
        );
    request.fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    });
  });
}
