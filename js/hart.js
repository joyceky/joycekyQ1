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
var artImage = $('#art-image');
var title = $('#title');
var culture = $('#culture');
var period = $('#period');
var medium = $('#medium');

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

        $('#domainform').on('submit', function(event) {
            event.preventDefault();

            var query = $('#s').val();
            query = query.replace(/\s+/g, '');
            $('#s').val('');
            console.log(query);

            getHartSearch(query);
        });
    });
}

function getHartSearch(quer) {

    var request = $.ajax({
        url: url + "&query=" + quer,
        dataType: "json"
    });

    request.done(function(data) {
        // console.log(data.records)
        hArt = [];
        for (var i = 0; i < data.records.length; i++) {
            let artData = data.records[i];
            // Object.keys(artData).forEach(function(key) {
            //     if (artData[key] == null) {
            //         delete artData[key];
            //     }
            // });
            console.log('in here');
            hArt.push(artData);
        }
        console.log(hArt, "search");
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
            // Object.keys(artData).forEach(function(key) {
            //     if (artData[key] == null) {
            //         delete artData[key];
            //     }
            // });
            // console.log('in here');
            hArt.push(artData);
        }
        console.log(hArt, "buttons");
        addToContent();
    });

    request.fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    });
}


function addToContent() {
    // artDiv.empty();
    // infoDiv.empty();
    artDiv.hide();

    for (var i = 0; i <= hArt.length; i++) {

        // var art = '<img class="art" src=' + hArt[i].primaryimageurl + '>';
        // artDiv.append(art);

        artImage.attr('src', hArt[i].primaryimageurl);

        if(hArt[i].title){
          title.text(hArt[i].title);
        }
        if(hArt[i].culture){
          culture.text(hArt[i].culture);
        }
        if(hArt[i].period){
          period.text(hArt[i].period);
        }
        if(hArt[i].medium){
          medium.text(hArt[i].medium);
        }

        // // var info = '<p>' + hArt[i].title + ' : ' + hArt[i].culture + '</p><p>' + hArt[i].period + '</p><p>' + hArt[i].medium + '</p>';
        //
        // if(hArt && Array.isArray(hArt) && hArt[i].title) {
        //   infoDiv.append(createArtElement(hArt[i]));
        // }

        currentImg = i;
        break;
    }
    artDiv.show();
}

// function createArtElement(artObj) {
//   var str = '<p>' + artObj.title + '</p>';
//
//   if (artObj.culture) {
//     str += '<p>' + artObj.culture + '</p>';
//
//   }
//
//   if (artObj.period) {
//     console.log(artObj.period)
//     str += '<p>' + artObj.period + '</p>'
//   }
//
//   if (artObj.medium) {
//     str += '<p>' + artObj.medium + '</p>'
//   }
//
//   return $(str);
// }



function moveForward() {
    console.log("LISTENING");
    var forward = $("#forward");

    forward.on("click", function(event) {
        event.preventDefault();

        for (var i = currentImg + 1; i < hArt.length + 1; i++) {

            if (i === hArt.length) {
                i = 0;
            }

            artImage.attr('src', hArt[i].primaryimageurl);

            if(hArt[i].title){
              title.text(hArt[i].title);
            }
            if(hArt[i].culture){
              culture.text(hArt[i].culture);
            }
            if(hArt[i].period){
              period.text(hArt[i].period);
            }
            if(hArt[i].medium){
              medium.text(hArt[i].medium);
            }

            currentImg = i;

            break;
        }
    });
}

function moveBack() {
    var back = $("#back");

    back.on("click", function() {
        event.preventDefault();

        for (var i = currentImg - 1; i < hArt.length + 1; i++) {

            if (i === -1) {
                i = hArt.length - 1;
            }

            artImage.attr('src', hArt[i].primaryimageurl);

            if(hArt[i].title){
              title.text(hArt[i].title);
            }
            if(hArt[i].culture){
              culture.text(hArt[i].culture);
            }
            if(hArt[i].period){
              period.text(hArt[i].period);
            }
            if(hArt[i].medium){
              medium.text(hArt[i].medium);
            }

            currentImg = i;

            break;
        }
    });
}
