"use strict";

$(document).ready(function() {
  if(storedRijksArt) {
    rijksArt = storedRijksArt;
    addToContent();
  }
    makeButtons();
    getRijksArtSearch();
    getRijksArtDropDown();

    arrowListeners();
    document.onkeydown = checkKey;

});

/*********************GLOBALS***************************/
var rijksArt = [];
var currentImg = 0;

var artDiv = $("#art");
var forward = $("#forward");
var back = $("#back");
var artImage = $('#art-image');
var title = $('#title');
var maker = $('#maker');

var storedRijksArt = JSON.parse(localStorage.getItem("storedRijksArt"));

var classi = ["Still Life", "Portrait", "Minimal", "Jewelry", "Pottery", "Vessels", "Plaques", "Drawings",
   "Paintings", "Sculpture", "Fragments", "Archival Material", "Tools and Equipment", "Architecture"];

var classification;
/*******************************************************/

function makeButtons() {
    for (let i = 0; i < classi.length; i++) {
        $("#dropdown").append('<li><a class="dropdown-item" href="#">' + classi[i] + '</a></li>');
    }
}

function checkKey(e) {
    e = e || window.event;

   if (e.keyCode == '37') {
       console.log("LEFT");
       moveBack();

     }
    else if (e.keyCode == '39') {
       console.log("RIGHT");
       moveForward();
    }
   }

   function arrowListeners() {
     var forward = $("#forward");

     forward.on("click", function(event) {
         event.preventDefault();
         moveForward();
     });

     var back = $("#back");

     back.on("click", function() {
         event.preventDefault();
         moveBack();
         });
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
            localStorage.setItem("storedRijksArt", JSON.stringify("[]"));
        }

        for (var i = 0; i < data.artObjects.length; i++) {
            if (data.artObjects[i].hasImage === false || data.artObjects[i].webImage === null) {
                continue;
            }
            rijksArt.push(data.artObjects[i]);
        }

        console.log(rijksArt, "ONLY IMAGES");
        localStorage.setItem("storedRijksArt", JSON.stringify(rijksArt));
        console.log(JSON.parse(localStorage.getItem("storedRijksArt")), "STORED LOCALLY");

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
   }


function moveBack() {

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
      }
