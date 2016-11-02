"use strict";

$(document).ready(function() {
    getRijksArt();
    moveForward();
});
/*********************GLOBALS***************************/
var rijksArt = [];
var currentImg = 0;
var artDiv = $("#art");
var infoDiv = $("#info");

function getRijksArt() {

    $('#domainform').on('submit', function(event) {
        event.preventDefault();

        var query = $('#s').val();
        query = query.replace(/\s+/g, '');
        $('#s').val('');

        var url = "https://www.rijksmuseum.nl/api/en/collection?q=" + query + "&key=PYC2DUue&format=json";

        var request = $.ajax({
            url: url,
            dataType: "json"
        });

        request.done(function(data) {
            console.log(data.artObjects)
            rijksArt = [];
            for (var i = 0; i < data.artObjects.length; i++) {
              if (data.artObjects[i].hasImage === false) {
                continue;
              }
              rijksArt.push(data.artObjects[i]);
            }

            // content.empty();
            // content.hide();
            console.log(rijksArt, "ONLY IMAGES");
            addToContent();

            // moveBack();
        });

        request.fail(function(jqXHR, textStatus) {
            console.log("Request failed: " + textStatus);
        });
    });
}

function addToContent() {
    artDiv.empty();
    infoDiv.empty();

    for (var i = 0; i <= rijksArt.length; i++) {

        var art = '<img class="art" src=' + rijksArt[i].webImage.url + '>';
        artDiv.append(art);

        var info = '<p>' + rijksArt[i].longTitle + '</p><p>' + rijksArt[i].principalOrFirstMaker + '</p>';
        infoDiv.append(info);

        currentImg = i;
        break;
    }
}

//if equal to length, back to 0
//if at 0 and go backwards, set to length - 1

function moveForward() {
    console.log("LISTENING");
    var forward = $("#forward");
    //var back = $("#back");

    forward.on("click", function() {

        for (var i = currentImg+1; i < rijksArt.length+1; i++) {

              if (i === rijksArt.length) {
                  i = 0;
              }
              
            artDiv.empty();
            infoDiv.empty();

            var art = '<img class="art" src=' + rijksArt[i].webImage.url + '>';
            artDiv.append(art);
            var info = '<p>' + rijksArt[i].longTitle + '</p><p>' + rijksArt[i].principalOrFirstMaker + '</p>';
            infoDiv.append(info, i);
            currentImg = i;

            break;
        }
    });
}

// back.on("click", function(){
//     artDiv.empty();
//     infoDiv.empty();
//     var art = '<img class="art" src=' + rijksArt.prev.webImage.url + '>';
//     artDiv.append(art);
//     var info = '<p>' + rijksArt.prev.longTitle + '</p><p>' + rijksArt.prev.principalOrFirstMaker + '</p>';
//     infoDiv.append(info);
//   });

// function moveBack(){
//   var back = $("#back");
//
//   back.on("click", function(){
//     artDiv.empty();
//     infoDiv.empty();
//     var art = '<img class="art" src=' + prevImg.webImage.url + '>';
//     artDiv.append(art);
//     var info = '<p>' + prevImg.longTitle + '</p><p>' + prevImg.principalOrFirstMaker + '</p>';
//     infoDiv.append(info);
//    currentImg--;
// });
// }
