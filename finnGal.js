"use strict";

// CORS ISSUES
// CALL URL WORKING ACCORDING TO POSTMAN

$( document ).ready(function() {
    getFinnArt();
});

function getFinnArt() {
    var content = $("#content");

  $('#domainform').on('submit', function(event) {
        event.preventDefault();

        var query = $('#s').val();
        query = query.replace(/\s+/g, '');

        var url = "http://kokoelmat.fng.fi/api/v2?apikey=iux6oahe20gvn&q=search:" + query + "&format=dc-jsonp";

        var request = $.ajax({
            url: url,
            dataType: "json"
        });

        request.done(function(data) {
              console.log(data);
          //     var rijksArt = data.artObjects;
          //     content.empty();
          //     content.hide();
          //
          // for (var i = 0; i < rijksArt.length; i++) {
          //       console.log(rijksArt[i].webImage.url);
          //       var myImg = "<br><img class=\"gif\" src=" + rijksArt[i].webImage.url + ">";
          //       content.append(myImg);
          //     }
          //     content.fadeIn(900);
          }
        );
    request.fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    });
  });
}
