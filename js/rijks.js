"use strict";

$(document).ready(function() {
    getRijksArt();
    moveForward();
    moveBack();
});

/*********************GLOBALS***************************/
var rijksArt = [];
var currentImg = 0;
var artDiv = $("#art");
var infoDiv = $("#info");
var forward = $("#forward");
var back = $("#back");
var art;
var info;
/*******************************************************/

// function populatePage {
//
// }

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

            console.log(rijksArt, "ONLY IMAGES");
            addToContent();
        });

        request.fail(function(jqXHR, textStatus) {
            console.log("Request failed: " + textStatus);
        });
    });
}

function addToContent() {
    artDiv.empty();
    infoDiv.empty();

    for (let i = 0; i <= rijksArt.length; i++) {

        var art = '<img class="art" src=\"' + rijksArt[i].webImage.url + '\">';
        artDiv.append(art);

        var info = '<p>' + rijksArt[i].longTitle + '</p><p>' + rijksArt[i].principalOrFirstMaker + '</p>';
        infoDiv.append(info);

        currentImg = i;
        break;
    }
}

function moveForward() {
    forward.on("click", function() {

        artDiv.empty();
        infoDiv.empty();

        for (let i = currentImg + 1; i < rijksArt.length + 1; i++) {

            if (i === rijksArt.length) {
                i = 0;
            }

            art = '<img class="art" src=\"' + rijksArt[i].webImage.url + '\">';
            artDiv.append(art);
            info = '<p>' + rijksArt[i].longTitle + '</p><p>' + rijksArt[i].principalOrFirstMaker + '</p>';
            infoDiv.append(info);

            currentImg = i;

            break;
        }
    });
}

// function moveForward() {
//     console.log("LISTENING");
//
//     forward.on("click", function() {
//
//         for (var i = currentImg + 1; i < rijksArt.length + 1; i++) {
//             if (i === rijksArt.length) {
//                 i = 0;
//             }
//
//             artDiv.empty();
//             infoDiv.empty();
//
//             var art = '<img class="art" src=\"' + rijksArt[i].webImage.url + '\">';
//             artDiv.append(art);
//
//             var info = '<p>' + rijksArt[i].longTitle + '</p><p>' + rijksArt[i].principalOrFirstMaker + '</p>';
//             infoDiv.append(info);
//
//             currentImg = i;
//
//             break;
//           }
//     });
//   }


function moveBack() {

    back.on("click", function() {

        for (var i = currentImg - 1; i < rijksArt.length + 1; i++) {

            if (i === -1) {
                i = rijksArt.length - 1;
            }

            artDiv.empty();
            infoDiv.empty();

            art = '<img class="art" src=\"' + rijksArt[i].webImage.url + '\">';
            artDiv.append(art);
            info = '<p>' + rijksArt[i].longTitle + '</p><p>' + rijksArt[i].principalOrFirstMaker + '</p>';
            infoDiv.append(info);

            currentImg = i;

            break;
        }
    });
}
