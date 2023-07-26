// TODO: change function comments to js doc comments

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
// put collection of tiles elements into a list because collection of tiles is not an array, which we need in order to 
// use .pop() method.
let arrayOfTiles = [];
for (let tile of collectionOfTiles) {
    // Flip all the tiles so the gradient image is actually backwards. We want this so that when a user clicks on the 
    // tile we can flip it another 180 degrees and get the right orientation when an image shows.
    tile.classList.toggle("flipTile180Deg");
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

let clickTracker = 0;
let previousTileClicked;
for (let individualTile of arrayOfTiles) {
    individualTile.onclick = function () {
        if (individualTile !== previousTileClicked) {
            clickTracker++;
        }
        if (clickTracker <= 2) {
            // Flip the user is not clicking on the same tile over and over
            individualTile !== previousTileClicked ? individualTile.classList.toggle("flipTile180Deg") : false;
            individualTile.src = `images/${individualTile.id}.jpg`;
        }
        if (clickTracker === 2) {
            oneRound(previousTileClicked, individualTile);
            clickTracker = 0;
        } else {
            previousTileClicked = individualTile;
        }
    }
}

/**
 * A pointer event controls the behavior of HTML elements in response to mouse or touch events.
 * This function will be used to prevent users from clicking tiles and causing them to flip when we don't want that to happen.
 * @param collectionOfElements list of elements we want to apply pointer event to.
 * @param {string} pointerEvent "none" turns off pointer event and "auto" turns on pointer event.
 */
function setPointerEventOfElements(collectionOfElements, pointerEvent) {
    for (let individualElement of collectionOfElements) {
        individualElement.style.pointerEvents = pointerEvent;
    }
}


// TODO: implement this
let currentRound = 0;


function oneRound(firstTileClicked, secondTileClicked) {
    setPointerEventOfElements(collectionOfTiles, "none");
    currentRound++;
    if (paintingsAndArtistsHashmap.get(firstTileClicked.id) === secondTileClicked.id || paintingsAndArtistsHashmap.get(secondTileClicked.id) === firstTileClicked.id) {
        setTimeout(function () {
            firstTileClicked.style.filter = "blur(1rem)";
            secondTileClicked.style.filter = "blur(1rem)";
        }, 1500);
    } else {
        setTimeout(function () {
            firstTileClicked.src = "images/gradient-square.jpg";
            secondTileClicked.src = "images/gradient-square.jpg";
        }, 1500);
    }
    previousTileClicked = undefined;
    setTimeout(function () {
        setPointerEventOfElements(collectionOfTiles, "auto");
        // Flip the tiles to the original orientation
        firstTileClicked.classList.toggle("flipTile180Deg");
        secondTileClicked.classList.toggle("flipTile180Deg");
    }, 1500);
}

assignIDs(paintingsAndArtistsHashmap);
