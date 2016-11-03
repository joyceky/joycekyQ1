"use strict";

$(document).ready(function() {

    // var now = new Date();
    // console.log(now, "NOW");
    // var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0) - now;
    // if (millisTill10 < 0) {
    //      millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
    // }
    //
    // setTimeout(function(){alert("It's 10am!")}, millisTill10);

    var storedArt = JSON.parse(localStorage.getItem("artArr"));
    var Length = JSON.parse(localStorage.getItem("arrayLength"));
    var imageNum = JSON.parse(localStorage.getItem("currentImg"));

    console.log(JSON.parse(localStorage.getItem("artArr")), "STORED ART");
    console.log(JSON.parse(localStorage.getItem("currentImg")), "CURRENT IMAGE");
    console.log(JSON.parse(localStorage.getItem("arrayLength")), "LENGTH");

    if (imageNum >= Length) {
        callRijks();
    } else if (storedArt.length > 0) {
        artArr = storedArt;
        addToContent();
    } else {
        callRijks();
    }
});

var artArr = JSON.parse(localStorage.getItem("artArr"));
var currentImg = JSON.parse(localStorage.getItem("currentImg"));
var arrayLength = JSON.parse(localStorage.getItem("arrayLength"));

var artImage = $('#art-image');
var title = $('#title');
var maker = $('#maker');



var classi = ["Still Life", "Portrait", "Minimal", "Jewelry", "Pottery", "Vessels", "Plaques", "Drawings",
    "Paintings", "Sculpture", "Fragments", "Archival Material", "Tools and Equipment", "Architecture"
];

var classification;


function callRijks() {
    classification = classi[Math.floor(Math.random() * classi.length)];

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
        console.log(JSON.parse(localStorage.getItem("currentImg")));

        addToContent();
    });

    request.fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    });
}

function addToContent() {

    arrayLength = artArr.length;
    localStorage.setItem("arrayLength", JSON.stringify(arrayLength));

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
        arrayLength = artArr.length;
        localStorage.setItem("arrayLength", JSON.stringify(arrayLength));
        break;
    }
}
