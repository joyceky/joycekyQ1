"use strict";

$(document).ready(function() {

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

    getQuote();

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
        artArr = [];

        for (var i = 0; i < data.artObjects.length; i++) {
            if (data.artObjects[i].hasImage === false || data.artObjects[i].webImage === null) {
                continue;
            }
            artArr.push(data.artObjects[i]);
        }

        localStorage.setItem("artArr", JSON.stringify(artArr));
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

function getQuote() {
    var request = $.ajax({
        url: "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?",
        dataType: "jsonp"
    });

    request.done(function(data) {
        $("#quote").text(data.quoteText);
        $("#quoteAuthor").text(data.quoteAuthor);
    });

    request.fail(function(jqXHR, textStatus) {
        alert("Request failed: " + textStatus);

    });
}
