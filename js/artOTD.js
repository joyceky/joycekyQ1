"use strict";

$(document).ready(function() {
  var storedArt = JSON.parse(localStorage.getItem("artArr"));
  console.log(JSON.parse(localStorage.getItem("artArr")), "STORED ART");
  var currentPosition = (JSON.parse(localStorage.getItem("currentImg")));
  console.log(JSON.parse(localStorage.getItem("currentImg")));
  if (currentPosition >= storedArt.length) {
    callRijks();
  }

  else {
    artArr = storedArt;
    addToContent();
  }
  // callRijks();
});

var artArr = JSON.parse(localStorage.getItem("artArr"));
var currentImg = JSON.parse(localStorage.getItem("currentImg"));


var artDiv = $("#art");
var artImage = $('#art-image');
var title = $('#title');
var maker = $('#maker');



var classi = ["Still Life", "Portrait", "Minimal", "Jewelry", "Pottery", "Vessels", "Plaques", "Drawings",
   "Paintings", "Sculpture", "Fragments", "Archival Material", "Tools and Equipment", "Architecture"];

var classification;


function callRijks() {
    classification = classi[Math.floor(Math.random()*classi.length)];

    var url = "https://www.rijksmuseum.nl/api/en/collection?q=" + classification + "&key=PYC2DUue&format=json";

    var request = $.ajax({
        url: url,
        dataType: "json"
    });

    request.done(function(data) {
        // console.log(data.artObjects);
          artArr = [];

        for (var i = 0; i < data.artObjects.length; i++) {
            if (data.artObjects[i].hasImage === false || data.artObjects[i].webImage === null) {
                continue;
            }
            artArr.push(data.artObjects[i]);
        }

        // console.log(artArr, "ONLY IMAGES");
        localStorage.setItem("artArr", JSON.stringify(artArr));
        // console.log(storedArt);
        currentImg = 0;
        localStorage.setItem("currentImg", JSON.stringify(currentImg));

        addToContent();
    });

    request.fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    });
  }

function addToContent() {
    for (let i = currentImg; i < artArr.length; i++) {

        // console.log(artArr[i].webImage.url);
        artImage.attr('src', artArr[i].webImage.url);


        if (artArr[i].longTitle) {
            title.text(artArr[i].longTitle);
        }
        if (artArr[i].principalOrFirstMaker) {
            maker.text(artArr[i].principalOrFirstMaker);
        }

        artArr.pop(i);
        console.log(artArr, "POPPED ARR");
        localStorage.setItem("artArr", JSON.stringify(artArr));
        currentImg = currentImg + 1;
        localStorage.setItem("currentImg", JSON.stringify(currentImg));

        break;
    }
    artDiv.fadeIn("slow");
}