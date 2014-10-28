// app.js: our main javascript file for this app

// jquery is a big js library, to make working with DOM a bit easier, selecting and manipulating groups of elements.
// adds $() function that can select elements from css and you get a jQuery object that wraps around all of the elements
// that meet that css selector. Whatever we do works with entire set of elements as a group.
// jquery also has animations that is impossible to do without.

"use strict";

var tiles = [];
var idx;
var tile;

for(idx = 1; idx <= 32; ++idx) {
    tiles.push({
        tileNum: idx,
        src: 'img/tile' + idx + '.jpg',
        flipped: false,
        matched: false
    });
} // for each tile

console.log(tiles);

// when document is ready...
// created an array of 8 tiles out of our shuffled array of all tiles
// and then cloned those 8 to make set of 16, for 8 matching pairs, and then reshuffled.
$(document).ready(function() {
    var timer;
    $('#start-game').click(function() {
        console.log('start game button clicked!');
        tiles = _.shuffle(tiles);
        var selectedTiles = tiles.slice(0,8);
        var tilePairs = [];
        _.forEach(selectedTiles, function(tile) { // underscore has a function that clones
           tilePairs.push(tile);
           tilePairs.push(_.clone(tile)); // underscore has a function to clone
        });
        tilePairs = _.shuffle(tilePairs);
       console.log(tilePairs);

        var gameBoard = $('#game-board');
        gameBoard.empty(); // clears game board
        window.clearInterval(timer);
        var row = $(document.createElement('div')); // creates a new div that row refers to
        var img;
        _.forEach(tilePairs, function(tile, elemIndex) {       // forEach passes two arguments, the first is array
                                                               // element, and the second is the array index
            img = $(document.createElement('img'));            //creates jquery element around the img element and
                                                               // allows to set mass attributes
            img.attr({ // pass many attributes at once
                src: 'img/tile-back.png',
                alt: 'tile ' + tile.tileNum
            });

            if (elemIndex > 0 && 0 == elemIndex % 4) { // if it's > 0, and each time you hit something divisible by 4
                                                       // === is not true if it's not of the same type.
                gameBoard.append(row);
                row = $(document.createElement('div'));
            }

            img.data('tile', tile); // jquery tracks which tile is associated with that image.
            row.append(img);
        });
        gameBoard.append(row);
        var startTime = Date.now();
        timer = window.setInterval(function() {
            var elapsedSeconds = (Date.now() - startTime) /1000; // number of seconds btwn when started and when it's called
            elapsedSeconds = Math.floor(elapsedSeconds);
            if (elapsedSeconds == 1) {
                $('#elapsed-seconds').text(elapsedSeconds + ' second');
            } else {
                $('#elapsed-seconds').text(elapsedSeconds + ' seconds');
            }

        }, 1000);
        // track last tile they clicked on jQuery image element

        var lastImg;

        $('#game-board img').click(function() {

            //this refers to image that got clicked
            // console.log(this.alt);
            var clickedImg = $(this); // allows us to do clickedImg.data and use the key
            var tile = clickedImg.data('tile'); // gives full data on the image object that's clicked ./ WHAT IS GOING ON HERE
            if (lastImg) {
                // on
                // another if statement, do tiles matched? clicked = last
                lastImg.data('tile'); // tile associated with last image, object
                lastImg = null;
            } else {
                lastImg = clickedImg;
            }



            console.log(tile);
            flipTile(tile, clickedImg);
        }); // one event handler for all of the imgs,
    }); // start game button click

}); // document ready function

function flipTile(tile, img) {

    img.fadeOut(100, function() {
        if (tile.flipped) {
            img.attr('src', 'img/tile-back.png');
        } else {
            img.attr('src', tile.src);
            console.log('hi');
        }

        tile.flipped = !tile.flipped; // makes it so the tile isn't flipped
        img.fadeIn(100);
    });
}