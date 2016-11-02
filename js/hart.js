"use strict";
$(function() {
    makeButtons();
    moveForward();
    moveBack();
});
/*********************GLOBALS***************************/
var hArt = [];
var currentImg = 0;
var artDiv = $("#art");
var infoDiv = $("#info");
var classi = ["any", "Coins",  "Prints",  "Books", "Jewelry", "Vessels", "Plaques", "Drawings",
          "Multiples", "Paintings", "Sculpture", "Fragments",  "Textile Arts", "Photographs",
          "Archival Material", "Ritual Implements", "Tools and Equipment", "Medals and Medallions"
            ];
var classification;
/*******************************************************/

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
        // console.log(data.records)
        hArt = [];
        for (var i = 0; i < data.records.length; i++) {
            hArt.push(data.records[i]);
        }
        addToContent();
    });

    request.fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    });
}

function addToContent() {
    artDiv.empty();
    infoDiv.empty();

    for (var i = 0; i <= hArt.length; i++) {

        var art = '<img class="art" src=' + hArt[i].primaryimageurl + '>';
        artDiv.append(art);

        var info = '<p>' + hArt[i].title + ' : ' + hArt[i].culture + '</p><p>' + hArt[i].period + '</p><p>' + hArt[i].medium + '</p>';
        infoDiv.append(info);

        currentImg = i;
        break;
    }
}

function moveForward() {
    console.log("LISTENING");
    var forward = $("#forward");

    forward.on("click", function() {

        for (var i = currentImg + 1; i < hArt.length + 1; i++) {

            if (i === hArt.length) {
                i = 0;
            }

            artDiv.empty();
            infoDiv.empty();

            var art = '<img class="art" src=' + hArt[i].primaryimageurl + '>';
            artDiv.append(art);
            var info = '<p>' + hArt[i].title + '</p><p>' + hArt[i].culture + '</p><p>' + hArt[i].period + '</p><p>' + hArt[i].medium + '</p>';
            infoDiv.append(info);
            currentImg = i;

            break;
        }
    });
}

function moveBack() {
    var back = $("#back");

    back.on("click", function() {

        for (var i = currentImg - 1; i < hArt.length + 1; i++) {

            if (i === -1) {
                i = hArt.length - 1;
            }

            artDiv.empty();
            infoDiv.empty();

            var art = '<img class="art" src=' + hArt[i].primaryimageurl + '>';
            artDiv.append(art);
            var info = '<p>' + hArt[i].title + '</p><p>' + hArt[i].culture + '</p><p>' + hArt[i].period + '</p><p>' + hArt[i].medium + '</p>';
            infoDiv.append(info);
            currentImg = i;

            break;
        }
    });

}
