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
var wiki = $("#wikiLink");




var storedRijksArt = JSON.parse(localStorage.getItem("storedRijksArt"));

var classi = ["Rembrandt", "Michelangelo", "Raphael", "Titian"];

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

          if(data.artistName) {
          nameA.text(data.artistName);
        }
          if(data.OriginalArtistName) {
          originName.text(data.OriginalArtistName);
        }
          if(data.birthDayAsString && data.deathDayAsString) {
          bday.text(data.birthDayAsString + " to " + data.deathDayAsString);
        }
          if(data.biography) {
          bio.text(data.biography);
        }
          if(data.wikipediaUrl) {
          wiki.attr("src", data.wikipediaUrl);
          wiki.text("Further Information")
        }
      });


      request.fail(function(jqXHR, textStatus) {
          console.log("Request failed: " + textStatus);
      });
    }
