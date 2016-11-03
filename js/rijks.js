"use strict";

$(document).ready(function() {
    makeButtons();
    getRijksArtSearch();
    getRijksArtDropDown();
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
var artImage = $('#art-image');
var title = $('#title');
var maker = $('#maker');


var classi = ["Still Life", "Portrait", "Minimal", "Jewelry", "Pottery", "Vessels", "Plaques", "Drawings",
   "Paintings", "Sculpture", "Fragments", "Archival Material", "Tools and Equipment", "Architecture"];

var classification;
/*******************************************************/

function makeButtons() {
    for (let i = 0; i < classi.length; i++) {
        $("#dropdown").append('<li><a class="dropdown-item" href="#">' + classi[i] + '</a></li>');
    }
}


function getRijksArtDropDown() {
    $("#dropdown").on("click", function(event) {
        event.preventDefault();

        if (event.target !== event.currentTarget) {
            classification = event.target.innerText;
            callRijks(classification);
        }
    });
}


function getRijksArtSearch() {
    $('#domainform').on('submit', function(event) {
        event.preventDefault();
        var searchQuery = $('#s').val();
        callRijks(searchQuery);
    });
}


function callRijks(query) {
    query = query.replace(/\s+/g, '');
    $('#s').val('');

    var url = "https://www.rijksmuseum.nl/api/en/collection?q=" + query + "&key=PYC2DUue&format=json";

    var request = $.ajax({
        url: url,
        dataType: "json"
    });

    request.done(function(data) {
        console.log(data.artObjects);
        if (data) {
            rijksArt = [];
        }

        for (var i = 0; i < data.artObjects.length; i++) {
            if (data.artObjects[i].hasImage === false || data.artObjects[i].webImage === null) {
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
}


function addToContent() {

    for (let i = 0; i <= rijksArt.length; i++) {

        console.log(rijksArt[i].webImage.url);
        artImage.attr('src', rijksArt[i].webImage.url);

        let p = i + 1;

        $("#position").text(p + " out of " + rijksArt.length);

        if (rijksArt[i].longTitle) {
            title.text(rijksArt[i].longTitle);
        }
        if (rijksArt[i].principalOrFirstMaker) {
            maker.text(rijksArt[i].principalOrFirstMaker);
        }

        currentImg = i;
        break;
    }
    artDiv.fadeIn();
}


function moveForward() {
    forward.on("click", function() {
        event.preventDefault();

        for (let i = currentImg + 1; i < rijksArt.length + 1; i++) {

            if (i === rijksArt.length) {
                i = 0;
            }

            artImage.attr('src', rijksArt[i].webImage.url);

            let p = i + 1;

            $("#position").text(p + " out of " + rijksArt.length);

            if (rijksArt[i].longTitle) {
                title.text(rijksArt[i].longTitle);
            }
            if (rijksArt[i].principalOrFirstMaker) {
                maker.text(rijksArt[i].principalOrFirstMaker);
            }

            currentImg = i;

            break;
        }
        artDiv.fadeIn();

    });
}


function moveBack() {

    back.on("click", function() {
        // artDiv.hide();
        event.preventDefault();

        for (var i = currentImg - 1; i < rijksArt.length + 1; i++) {

            if (i === -1) {
                i = rijksArt.length - 1;
            }

            artImage.attr('src', rijksArt[i].webImage.url);

            let p = i + 1;

            $("#position").text(p + " out of " + rijksArt.length);

            if (rijksArt[i].longTitle) {
                title.text(rijksArt[i].longTitle);
            }
            if (rijksArt[i].principalOrFirstMaker) {
                maker.text(rijksArt[i].principalOrFirstMaker);
            }

            currentImg = i;

            break;
        }
        artDiv.fadeIn();
    });
}
