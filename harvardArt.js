"use strict";
$(function() {
    getArt();
});

function getArt() {

  var classification  = '';
  var content = document.getElementById("content");

  $('#domainform').on('submit', function(event) {
      event.preventDefault();
      var classification = $('#s').val();
      classification = classification.replace(/\s+/g, '');
      classification = classification.charAt(0).toUpperCase();
      content.innerHTML = "";
      $('#s').val('');
      console.log(classification);
      var fields = "primaryimageurl,classification,period,title,medium,century,culture,department,division,description,technique,dated";
      var url = "https://g-ham.herokuapp.com/object?apikey=335c6710-9d5a-11e6-8ab4-ad600566c465&size=100&classification=any&fields=" + fields + "&hasimage=1&sort=century"
    var request = $.ajax({
        url: url,
        dataType: "json"
    });

    request.done(function (data) {

      console.log(data);
      var imgArr = [];

      for (var i = 0; i < data.records.length; i++) {
          imgArr.push(data.records[i]);
          content.innerHTML += "<br><img class=\"gif\" src=" + imgArr[i].primaryimageurl + ">";
      }
      console.log(imgArr);
    });


    request.fail(function (jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);

    });
  });
}

// $(function() {
//
//     // Set the api variable
//     var content = document.getElementById("content");
//
//     $('#domainform').on('submit', function(event) {
//         event.preventDefault();
//
//         var apiKey = "335c6710-9d5a-11e6-8ab4-ad600566c465";
//
//         var search = $('#s').val();
//         search = search.replace(/\s+/g, '');
//         content.innerHTML = "";
//         $('#s').val('');
//         var hArtAPI = 'http://api.harvardartmuseums.org?api_key=' + apiKey + 'callback=?';
//         // Make a ajax call to get the json data as data.
//         $.getJSON(hArtAPI, function(data) {
//             console.log(data);
//             var artArr = [];
//             //
//             // for (var i = 0; i < data.data.length; i++) {
//             //     giphArr.push(data.data[i].images.downsized);
//             //     content.innerHTML += "<br><img class=\"gif\" src=" + giphArr[i].url + ">";
//             // }
//         });
//     });
// });
