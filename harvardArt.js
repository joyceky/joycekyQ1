"use strict";
$(function() {
    makeButtons();
});

var classi = ["any", "Coins",  "Prints",  "Books", "Jewelry", "Vessels", "Plaques", "Drawings",
          "Multiples", "Paintings", "Sculpture", "Fragments",  "Textile Arts", "Photographs",
          "Archival Material", "Ritual Implements", "Tools and Equipment", "Medals and Medallions"
            ];
var classification;

function makeButtons() {
    for (var i = 0; i < classi.length; i++) {
        $("#buttons").append("<button class=\"btn\">" + classi[i] + "</button><br>");
    }
    $("#buttons").on("click", function(event) {
        if (event.target !== event.currentTarget) {
            classification = event.target.innerText;
            getArt();
        }
    });
}

function getArt() {
    var content = $("#content");

    var fields = "primaryimageurl,classification,period,title,medium,century,culture,department,division,description,technique,dated";

    var url = "https://g-ham.herokuapp.com/object?apikey=335c6710-9d5a-11e6-8ab4-ad600566c465&size=30&classification=" + classification + "&fields=" + fields + "&hasimage=1&sort=random";

    var request = $.ajax({
        url: url,
        dataType: "json"
    });

    request.done(function(data) {

        console.log(data);
        var imgArr = [];
        content.empty();
        for (var i = 0; i < data.records.length; i++) {
            imgArr.push(data.records[i]);
            var myImg = "<br><img class=\"gif\" src=" + imgArr[i].primaryimageurl + ">";
            content.append(myImg).fadeIn("slow");
            console.log(imgArr[i].classification);
        }
    });
    request.fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);

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
