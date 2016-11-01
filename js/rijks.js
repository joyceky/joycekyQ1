"use strict";

$( document ).ready(function() {
    getRijksArt();

});

var rijksArt = [];

function getRijksArt() {

  $('#domainform').on('submit', function(event) {
        event.preventDefault();

        var query = $('#s').val();
        query = query.replace(/\s+/g, '');
        $('#s').val('');

        var url = "https://www.rijksmuseum.nl/api/en/collection?q=" + query + "&key=PYC2DUue&format=json";

        var request = $.ajax({
            url: url,
            dataType: "json"
        });

        request.done(function(data) {
              console.log(data.artObjects);
              rijksArt = data.artObjects;
              // content.empty();
              // content.hide();
              console.log(rijksArt);
              addToContent();
            });

            request.fail(function(jqXHR, textStatus) {
                console.log("Request failed: " + textStatus);
            });
          });
        }

function addToContent() {
            var artDiv = $("#art");
            var infoDiv = $("#info");

            artDiv.empty();
            infoDiv.empty();

            for (var i = 0; i < rijksArt.length; i++) {
              if(rijksArt[i].hasImage === false) {
                continue;
              }
              var art = '<img class="art" src=' + rijksArt[i].webImage.url + '>';
              artDiv.append(art);
              var info = '<p>' + rijksArt[i].longTitle + '</p><br><p>' + rijksArt[i].principalOrFirstMaker + '</p>';
              artDiv.append(info);
                }
              }
