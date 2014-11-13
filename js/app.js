// app.js: our main javascript file for this app

// jquery is a big js library, to make working with DOM a bit easier, selecting and manipulating groups of elements.
// adds $() function that can select elements from css and you get a jQuery object that wraps around all of the elements
// that meet that css selector. Whatever we do works with entire set of elements as a group.
// jquery also has animations that is impossible to do without.


// 4 variales higher than click event
// track which image was clicked on, and it's tile to compare to last one
// clear the variable using to track first and last image
// won game when matches ==8 or remain = 0
// get another variable to decide when to ignore your click, boolean resetting outside click handler
// reset to true, and then set to false. inside click handler, if the resetting is true then just return
"use strict";

var tiles = [];
var idx;
var tile;
var resetting = false;
var matched = 0;
var missed = 0;

for(idx = 1; idx <= 32; ++idx) {
    tiles.push({
        tileNum: idx,
        src: 'img/tile' + idx + '.jpg',
        flipped: false,
        matched: false
    });
} // for each tile


// when document is ready...
// created an array of 8 tiles out of our shuffled array of all tiles
// and then cloned those 8 to make set of 16, for 8 matching pairs, and then reshuffled.
$(document).ready(function() {
    var timer;
    missed = 0;
    $('#start-game').click(function() {
        $('#win-screen').attr('display', 'none');
        matched = 0;
        tiles = _.shuffle(tiles);
        var selectedTiles = tiles.slice(0,8);
        var tilePairs = [];
        _.forEach(selectedTiles, function(tile) { // underscore has a function that clones
           tilePairs.push(tile);
           tilePairs.push(_.clone(tile)); // underscore has a function to clone
        });
        tilePairs = _.shuffle(tilePairs);

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
                $('.elapsed-seconds').text(elapsedSeconds + ' second');
            } else {
                $('.elapsed-seconds').text(elapsedSeconds + ' seconds');
            }

            if (missed == 1) {
                $('.missed').text(missed + ' match missed');
            } else {
                $('.missed').text(missed + ' matches missed');
            }

            if (matched == 1) {
                $('.matched').text(matched + ' match made');
            } else {
                $('.matched').text(matched + ' matches made');
            }

            if (matched == 8) {
                elapsedSeconds == (Date.now() - startTime);
                $('#win-screen').css('display', 'block'); // display win thing
            }
        }, 1000);
        // track last tile they clicked on jQuery image element




        var lastImg;

        $('#game-board img').click(function() {
            if (!resetting) {
                //this refers to image that got clicked
                var clickedImg = $(this); // allows us to do clickedImg.data and use the key
                var tile = clickedImg.data('tile'); // gives full data on the image object that's clicked
                if (!tile.flipped) {
                    if (lastImg) {
                        // on
                        // another if statement, do tiles matched? clicked = last
                        // lastImg.data('tile'); // tile associated with last image, object
                        var tileLast = lastImg.data('tile');
                        if (tile.tileNum == tileLast.tileNum) {
                            console.log("matched");
                            tile.matched = true;
                            tileLast.matched = true;
                            lastImg = null;
                            matched++;
                        } else {
                            resetting = true;
                            setTimeout(function() {
                                    flipTile(tile, clickedImg);
                                    flipTile(tileLast, lastImg);
                                    resetting = false;
                                    lastImg = null;
                                }, 1000
                            );
                            missed++;
                        }
                    } else {
                        lastImg = clickedImg;
                    }
                    flipTile(tile, clickedImg);
                }
            }

        }); // one event handler for all of the imgs,

    }); // start game button click
}); // document ready function

function flipTile(tile, img) {
    if (tile.matched && tile.flipped) {

    } else {
        img.fadeOut(100, function() {
            if (tile.flipped) {
                img.attr('src', 'img/tile-back.png');
            } else {
                img.attr('src', tile.src);
            }

            tile.flipped = !tile.flipped; // makes it so the tile isn't flipped
            img.fadeIn(100);
        });
    }

}