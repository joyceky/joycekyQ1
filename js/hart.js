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
            getHArt();
        }
    });
}

function getHArt() {
    var content = $("#content");

    var fields = "primaryimageurl,classification,period,title,medium,century,culture,department,division,description,technique,dated";

    var url = "https://g-ham.herokuapp.com/object?apikey=335c6710-9d5a-11e6-8ab4-ad600566c465&size=50&classification=" + classification + "&fields=" + fields + "&hasimage=1&sort=random";

    var request = $.ajax({
        url: url,
        dataType: "json"
    });

    request.done(function(data) {
        content.empty();
        content.hide();
        for (var i = 0; i < data.records.length; i++) {
            var myImg = "<br><img class=\"gif\" src=" + data.records[i].primaryimageurl + ">";
            content.append(myImg);
          }
          content.fadeIn(900);
    });
    request.fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    });
}
