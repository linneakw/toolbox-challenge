// app.js: our main javascript file for this app

// jquery is a big js library, to make working with DOM a bit easier, selecting and manipulating groups of elements.
// adds $() function that can select elements from css and you get a jQuery object that wraps around all of the elements
// that meet that css selector. Whatever we do works with entire set of elements as a group.
// jquery also has animations that is impossible to do without.

var tiles = [];
var idx;
var tile;

for(idx = 1; idx <= 32; ++idx) {
    tile = {
        tileNum: idx,
        src: 'img/tile' + idx + '.jpg',
        flipped: false,
        matched: false
    };

    tiles.push(tile);
}

console.log(tiles);