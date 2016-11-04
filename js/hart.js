"use strict";
$(function() {
    if (storedHArt) {
        hArt = storedHArt;
        addToContent();
    }
    makeButtons();
    getSearch();
    arrowListeners();
    document.onkeydown = checkKey;

});

/*********************GLOBALS***************************/
var hArt = [];
var currentImg = 0;
var artDiv = $("#art");
var artImage = $('#art-image');
var title = $('#title');
var culture = $('#culture');
var period = $('#period');
var medium = $('#medium');

var storedHArt = JSON.parse(localStorage.getItem("storedHArt"));

var classi = ["any", "Coins", "Prints", "Books", "Jewelry", "Vessels", "Plaques", "Drawings",
    "Multiples", "Paintings", "Sculpture", "Fragments", "Textile Arts", "Photographs",
    "Archival Material", "Ritual Implements", "Tools and Equipment", "Medals and Medallions"
];

var classification;
var fields = "primaryimageurl,classification,period,title,medium,culture";

var url = "https://g-ham.herokuapp.com/object?apikey=335c6710-9d5a-11e6-8ab4-ad600566c465&size=10&hasimage=1&fields=" + fields + "&sort=random";

/*******************************************************/

function makeButtons() {
    for (let i = 0; i < classi.length; i++) {
        $("#dropdown").append('<li><a class="dropdown-item" href="#">' + classi[i] + '</a></li>');
    }

    $("#dropdown").on("click", function(event) {
        if (event.target !== event.currentTarget) {
            classification = event.target.innerText;
            getHArtDropdown(classification);
        }
    });
}


function getSearch() {
    $('#domainform').on('submit', function(event) {
        event.preventDefault();

        var sQuery = $('#s').val();
        sQuery = sQuery.replace(/\s+/g, '');
        sQuery = sQuery.toLowerCase();
        $('#s').val('');

        getHartSearch(sQuery);
    });
}


function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '37') {
        console.log("LEFT");
        moveBack();

    } else if (e.keyCode == '39') {
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


function getHartSearch(quer) {

    var request = $.ajax({
        url: url + "&query=" + quer,
        dataType: "json"
    });

    request.done(function(data) {
        if (data) {
            hArt = [];
            localStorage.setItem("s", JSON.stringify("[]"));
        }

        for (var i = 0; i < data.records.length; i++) {
            let artData = data.records[i];

            hArt.push(artData);
        }
        console.log(hArt, "search");
        localStorage.setItem("storedHArt", JSON.stringify(hArt));
        addToContent();
    });

    request.fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    });
}


function getHArtDropdown(classif) {
    var request = $.ajax({
        url: url + "&classification=" + classif,
        dataType: "json"
    });

    request.done(function(data) {
        hArt = [];
        for (var i = 0; i < data.records.length; i++) {
            let artData = data.records[i];

            hArt.push(artData);
        }
        console.log(hArt, "buttons");
        localStorage.setItem("storedHArt", JSON.stringify(hArt));
        addToContent();
    });

    request.fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    });
}


function addToContent() {
    for (var i = 0; i <= hArt.length; i++) {

        artImage.attr('src', hArt[i].primaryimageurl);

        let p = i + 1;

        $("#position").text(p + " out of " + hArt.length);

        if (hArt[i].title) {
            title.text(hArt[i].title);
        }
        if (hArt[i].culture) {
            culture.text(hArt[i].culture);
        }
        if (hArt[i].period) {
            period.text(hArt[i].period);
        }
        if (hArt[i].medium) {
            medium.text(hArt[i].medium);
        }

        currentImg = i;
        break;
    }
    artImage.fadeIn('slow');
}


function moveForward() {
    for (var i = currentImg + 1; i < hArt.length + 1; i++) {

        if (i === hArt.length) {
            i = 0;
        }

        artImage.attr('src', hArt[i].primaryimageurl);

        let p = i + 1;

        $("#position").text(p + " out of " + hArt.length);

        if (hArt[i].title) {
            title.text(hArt[i].title);
        }
        if (hArt[i].culture) {
            culture.text(hArt[i].culture);
        }
        if (hArt[i].period) {
            period.text(hArt[i].period);
        }
        if (hArt[i].medium) {
            medium.text(hArt[i].medium);
        }

        currentImg = i;

        break;
    }
    artDiv.fadeIn();
}


function moveBack() {
    for (var i = currentImg - 1; i < hArt.length + 1; i++) {

        if (i === -1) {
            i = hArt.length - 1;
        }

        artImage.attr('src', hArt[i].primaryimageurl);

        let p = i + 1;

        $("#position").text(p + " out of " + hArt.length);

        if (hArt[i].title) {
            title.text(hArt[i].title);
        }
        if (hArt[i].culture) {
            culture.text(hArt[i].culture);
        }
        if (hArt[i].period) {
            period.text(hArt[i].period);
        }
        if (hArt[i].medium) {
            medium.text(hArt[i].medium);
        }

        currentImg = i;

        break;
    }
    artDiv.fadeIn();
}
