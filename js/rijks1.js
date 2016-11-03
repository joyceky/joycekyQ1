"use strict";
$(function() {
    makeButtons();
    moveForward();
    moveBack();
});
/*********************GLOBALS***************************/
var rijksArt = [];
var currentImg = 0;
var artDiv = $("#art");
var infoDiv = $("#info");
var artImage = $('#art-image');
var title = $('#title');
var maker = $('#maker');


var classi = ["Trees", "Still Life", "Paintings", "Dogs", "Jewelry", "Vessels", "Plaques", "Drawings",
    "Multiples", "Paintings", "Sculpture", "Fragments", "Textile Arts", "Photographs",
    "Archival Material", "Ritual Implements", "Tools and Equipment", "Medals and Medallions"
];
var classification;

var query;

/*******************************************************/

function makeButtons() {
    for (let i = 0; i < classi.length; i++) {
        $("#dropdown").append('<li><a class="dropdown-item" href="#">' + classi[i] + '</a></li>');
    }

    $("#dropdown").on("click", function(event) {
        event.preventDefault();
        if (event.target !== event.currentTarget) {
            query = event.target.innerText;
            query = query.replace(/\s+/g, '');
            query = query.toLowerCase();


            var url = "https://www.rijksmuseum.nl/api/en/collection?q=" + query + "&key=PYC2DUue&format=json";

            var request = $.ajax({
                url: url,
                dataType: "json"
            });

            request.done(function(data) {
                rijksArt = [];

                for (var i = 0; i < data.artObjects.length; i++) {
                    let artData = data.artObjects[i];

                    if (artData.hasImage === false) {
                        continue;
                    }
                    rijksArt.push(artData);
                }

                console.log(rijksArt, "buttons");
                addToContent();
            });

            request.fail(function(jqXHR, textStatus) {
                console.log("Request failed: " + textStatus);
            });
            }
        });
      }






            // getHArtDropdown();

        // $('#domainform').on('submit', function(event) {
        //     event.preventDefault();
        //
        //     query = $('#s').val();
        //     query = query.replace(/\s+/g, '');
        //     query = query.toLowerCase();
        //     $('#s').val('');
        //     console.log(query);
        //
        //     getRijksSearch();
        // });
    // });


// function getRijksSearch() {
//   var url = "https://www.rijksmuseum.nl/api/en/collection?q=" + query + "&key=PYC2DUue&format=json";
//
//     var request = $.ajax({
//         url: url,
//         dataType: "json"
//     });
//
//     request.done(function(data) {
//         // console.log(data.artObjects)
//         rijksArt = [];
//         for (var i = 0; i < data.artObjects.length; i++) {
//
//           let artData = data.artObjects[i];
//
//           if (artData.hasImage === false) {
//               continue;
//           }

            // Object.keys(artData).forEach(function(key) {
            //     if (artData[key] == null) {
            //         delete artData[key];
            //     }
            // });
//             console.log('in here');
//             rijksArt.push(artData);
//         }
//         console.log(rijksArt, "search");
//         addToContent();
//     });
//
//
//     request.fail(function(jqXHR, textStatus) {
//         console.log("Request failed: " + textStatus);
//     });
// }



// function getHArtDropdown() {
//     var url = "https://www.rijksmuseum.nl/api/en/collection?q=" + query + "&key=PYC2DUue&format=json";
//
//     var request = $.ajax({
//         url: url,
//         dataType: "json"
//     });
//
//     request.done(function(data) {
//         rijksArt = [];
//
//         for (var i = 0; i < data.artObjects.length; i++) {
//             let artData = data.artObjects[i];
//
//             if (artData.hasImage === false) {
//                 continue;
//             }
//             rijksArt.push(artData);
//         }
//
//         console.log(rijksArt, "buttons");
//         addToContent();
//     });
//
//     request.fail(function(jqXHR, textStatus) {
//         console.log("Request failed: " + textStatus);
//     });
// }


function addToContent() {
    // artDiv.empty();
    // infoDiv.empty();
    artDiv.hide();

    for (var i = 0; i <= rijksArt.length; i++) {

        // var art = '<img class="art" src=' + rijksArt[i].primaryimageurl + '>';
        // artDiv.append(art);

        artImage.attr('src', rijksArt[i].webImage.url);

        if(rijksArt[i].longTitle){
          title.text(rijksArt[i].longTitle);
        }
        if(rijksArt[i].principalOrFirstMaker){
          maker.text(rijksArt[i].principalOrFirstMaker);
        }

        // // var info = '<p>' + rijksArt[i].title + ' : ' + rijksArt[i].culture + '</p><p>' + rijksArt[i].period + '</p><p>' + rijksArt[i].medium + '</p>';
        //
        // if(rijksArt && Array.isArray(rijksArt) && rijksArt[i].title) {
        //   infoDiv.append(createArtElement(rijksArt[i]));
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

        for (var i = currentImg + 1; i < rijksArt.length + 1; i++) {

            if (i === rijksArt.length) {
                i = 0;
            }

            artImage.attr('src', rijksArt[i].webImage.url);

            if(rijksArt[i].longTitle){
              title.text(rijksArt[i].longTitle);
            }
            if(rijksArt[i].principalOrFirstMaker){
              culture.text(rijksArt[i].principalOrFirstMaker);
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

        for (var i = currentImg - 1; i < rijksArt.length + 1; i++) {

            if (i === -1) {
                i = rijksArt.length - 1;
            }

            artImage.attr('src', rijksArt[i].webImage.url);

            if(rijksArt[i].longTitle){
              title.text(rijksArt[i].longTitle);
            }
            if(rijksArt[i].principalOrFirstMaker){
              culture.text(rijksArt[i].principalOrFirstMaker);
            }

            currentImg = i;

            break;
        }
    });
}
