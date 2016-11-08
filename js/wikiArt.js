"use strict";


$(document).ready(function() {
  // loginWiki();
  makeButtons();
  getWikiSearch();
  getWikiDropDown();
});


/*********************GLOBALS***************************/

var artImage = $('#artist-image');
var nameA = $('#nameA');
var originName = $('#originName');
var bday = $('#birthday');
var bio = $('#bio');
var wiki = $("#wikiLink");

var classi = ["Rembrandt", "Michelangelo", "Raphael", "Titian"];

var classification;

// var accessKey = "26a6ea6e0a724a95";
// var secretkey = "bcfbca365657b9df";
/*******************************************************/

function makeButtons() {
    for (let i = 0; i < classi.length; i++) {
        $("#dropdown").append('<li><a class="dropdown-item" href="#">' + classi[i] + '</a></li>');
    }
}

// function loginWiki() {
//     var loginUrl = "https://g-wikiart.herokuapp.com/en/Api/2/login?accessCode=837b1a644925467d&secretCode=b09303415adeea33";
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
     var url = "https://g-wikiart.herokuapp.com/en/" + query + "?json=2";
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
          wiki.attr("href", data.wikipediaUrl);
          wiki.text("Further Information");
        }
      });


      request.fail(function(jqXHR, textStatus) {
          console.log("Request failed: " + textStatus);
      });
    }
