"use strict";


$(document).ready(function() {
  makeButtons();
  getWikiSearch();
  getWikiDropDown();
});


/*********************GLOBALS***************************/
var rijksArt = [];
var currentImg = 0;



var artDiv = $("#art");
var artImage = $('#artist-image');
var nameA = $('#nameA');
var originName = $('#originName');
var bday = $('#birthday');
var bio = $('#bio');




var storedRijksArt = JSON.parse(localStorage.getItem("storedRijksArt"));

var classi = ["Rembrandt", "Portrait", "Minimal", "Jewelry", "Pottery", "Vessels", "Plaques", "Drawings",
   "Paintings", "Sculpture", "Fragments", "Archival Material", "Tools and Equipment", "Architecture"];

var classification;

var accessKey = "26a6ea6e0a724a95";
var secretkey = "bcfbca365657b9df";
/*******************************************************/

function makeButtons() {
    for (let i = 0; i < classi.length; i++) {
        $("#dropdown").append('<li><a class="dropdown-item" href="#">' + classi[i] + '</a></li>');
    }
}

// function loginWiki() {
//     var loginUrl = "http://www.wikiart.org/en/Api/2/login?accessCode=26a6ea6e0a724a95&secretCode=bcfbca365657b9df";
//
//     var request = $.ajax({
//             url: loginUrl,
//             dataType: "json"
//     });
//
//     request.done(function(data) {
//         console.log(data);
//         callWiki();
//     });
//
//     request.fail(function(jqXHR, textStatus) {
//         console.log("Request failed: " + textStatus);
//     });
//   }


function getWikiDropDown() {
    $("#dropdown").on("click", function(event) {
        event.preventDefault();

        if (event.target !== event.currentTarget) {
            classification = event.target.innerText.toLowerCase();
            callWiki(classification);
        }
    });
}


function getWikiSearch() {
    $('#domainform').on('submit', function(event) {
        event.preventDefault();
        var searchQuery = $('#s').val().toLowerCase();
        callWiki(searchQuery);
    });
}

  function callWiki(query) {
     var url = "http://www.wikiart.org/en/" + query + "?json=2";
      var request = $.ajax({
              url: url,
              dataType: "json"
      });

      request.done(function(data) {
          console.log(data);
          artImage.attr('src', data.image);

          nameA.text(data.artistName);
          originName.text(data.OriginalArtistName);
          bday.text(data.birthDayAsString + " to " + data.deathDayAsString);
          bio.text(data.biography);

          $("#artistInfo").append("<a href=" + data.wikipediaUrl + ">Further Infomation</a>");

      });

      request.fail(function(jqXHR, textStatus) {
          console.log("Request failed: " + textStatus);
      });
    }
