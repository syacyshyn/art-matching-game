let paintingsAndArtistsHashmap = new Map();
paintingsAndArtistsHashmap.set("starry-night", "van-gogh");
paintingsAndArtistsHashmap.set("mona-lisa", "leonardo-da-vinci");
paintingsAndArtistsHashmap.set("girl-with-a-pearl-earring", "johannes-vermeer");
paintingsAndArtistsHashmap.set("the-kiss", "gustav-klimt");
paintingsAndArtistsHashmap.set("weeping-woman", "pablo-picasso");
paintingsAndArtistsHashmap.set("the-scream", "edvard-munch");
paintingsAndArtistsHashmap.set("american-gothic", "grant-wood");
paintingsAndArtistsHashmap.set("the-persistence-of-memory", "salvador-dali");
paintingsAndArtistsHashmap.set("sistine-chapel", "michelangelo");
paintingsAndArtistsHashmap.set("a-sunday-afternoon-on-the-island-of-la-grande-jatte", "george-seurat");


/*
This function returns a random tile from the "collection of tiles" on our game board.
*/
function getRandomItem(listOfElements) {
    let randomGeneratedIndex = Math.floor(Math.random() * listOfElements.length);
    // swap value at random generated index with the last value in the list of elements
    [listOfElements[randomGeneratedIndex], listOfElements[listOfElements.length - 1]] = [listOfElements[listOfElements.length - 1], listOfElements[randomGeneratedIndex]];
    return listOfElements.pop();
}


let collectionOfTiles = document.getElementsByClassName("tiles");
// put collection of tiles elements into a list because collection of tiles is not an array, which we need in order to use .pop() method.
let arrayOfTiles = [];
for (let tile of collectionOfTiles) {
    arrayOfTiles.push(tile);
}

/*
This function loops through our "paintings and artists hashmap" and assigns each key and value as a new id for the randomly generated tiles.
 */

function assignIDs(map) {
    for (let keyAndValuePair of map) {
        getRandomItem(arrayOfTiles).id = keyAndValuePair[0];
    }
    for (let keyAndValuePairAgain of map) {
        getRandomItem(arrayOfTiles).id = keyAndValuePairAgain[1];
    }
}


/*
This function changes the tile image to it's assigned ID image on click if there have been less than two clicks.
 */
let clickTracker = 0;
let previousTileClicked;
for (let individualTile of arrayOfTiles) {
    individualTile.onclick = function () {
        if (individualTile !== previousTileClicked) {
            clickTracker++;
        }
        if (clickTracker <= 2) {
            individualTile.src = `images/${individualTile.id}.jpg`;
        }
        if (clickTracker === 2) {
            // TODO: pass in arguments once created
            oneRound(previousTileClicked, individualTile);
            clickTracker = 0;
        } else {
            previousTileClicked = individualTile;
        }
    }
}


/*
This function starts one round of game play
 */
// TODO: implement this
let currentRound = 0;

function oneRound(firstTileClicked, secondTileClicked) {
    currentRound++;
    if (paintingsAndArtistsHashmap.get(firstTileClicked.id) === secondTileClicked.id || paintingsAndArtistsHashmap.get(secondTileClicked.id) === firstTileClicked.id) {
        setInterval(function () {
            firstTileClicked.style.filter = "blur(1rem)";
            secondTileClicked.style.filter = "blur(1rem)";
        }, 1500);

    } else {
        setInterval(function () {
            firstTileClicked.src = "images/gradient-square.jpg";
            secondTileClicked.src = "images/gradient-square.jpg";
        }, 1500);

        previousTileClicked = undefined;
    }
    /*
    start when clicked tracker = 2
    check if key and value match
    if it's a match, tell user and keep images the same (flipped)
    if it's not a match flip the images back after a few seconds
     */
}

assignIDs(paintingsAndArtistsHashmap);
