var rows = 4;
var columns = 4;
var currTile;
var otherTile; // blank tile
var turns = 0;
var theme;
var folder;

window.onload = function() {
    document.getElementById("puzzle-container").classList.add("d-none");
}

function selectFolder(selectedTheme) {
    theme = selectedTheme;
    document.getElementById("theme-selection").classList.add("d-none");
    document.getElementById("folder-selection").classList.remove("d-none");

    let folderButtons = document.getElementById("folder-buttons");
    folderButtons.innerHTML = ''; // clear previous buttons

    for (let i = 1; i <= 25; i++) {
        let button = document.createElement("button");
        button.className = "btn btn-secondary m-2";
        button.innerText = i;
        button.onclick = function() { startGame(i.toString()) };
        folderButtons.appendChild(button);
    }
}

function startGame(selectedFolder) {
    folder = selectedFolder;
    document.getElementById("folder-selection").classList.add("d-none");
    document.getElementById("puzzle-container").classList.remove("d-none");
    loadImages();
}

function loadImages() {
    let board = document.getElementById("board");
    board.innerHTML = ''; // clear the board

    let imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15","16"];
    imgOrder = shuffleArray(imgOrder); // Shuffle the image order

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = `${theme}/${folder}/${imgOrder.shift()}.jpg`;

            // DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);  // click an image to drag
            tile.addEventListener("dragover", dragOver);    // moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);  // dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);  // dragged image leaving another image
            tile.addEventListener("drop", dragDrop);        // drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      // after drag drop, swap the two tiles

            board.append(tile);
        }
    }
}

function exitToThemes() {
    document.getElementById("theme-selection").classList.remove("d-none");
    document.getElementById("folder-selection").classList.add("d-none");
    document.getElementById("puzzle-container").classList.add("d-none");
    turns = 0;
    document.getElementById("turns").innerText = turns;
    document.getElementById("result").innerText = '';
}

function dragStart() {
    currTile = this; // this refers to the img tile being dragged
    console.log("Drag Start: ", currTile.src);
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
}

function dragDrop() {
    otherTile = this; // this refers to the img tile being dropped on
    console.log("Drag Drop: ", otherTile.src);
}

function dragEnd() {
    if (!otherTile || !otherTile.src.includes("16.jpg")) {
        console.log("Invalid drop target");
        return;
    }

    let currCoords = currTile.id.split("-"); // ex) "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;
    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = ` ${turns}`;

        checkCorrect();
    }
}

function checkCorrect() {
    let correct = true;
    let board = document.getElementById("board");
    let tiles = board.getElementsByTagName("img");

    for (let i = 0; i < tiles.length; i++) {
        let tile = tiles[i];
        let coords = tile.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        let position = (r * columns) + c + 1;

        if (!tile.src.includes(position.toString() + ".jpg")) {
            correct = false;
            break;
        }
    }

    if (correct) {
        document.getElementById("result").innerText = "Congratulations!";
        for (let tile of tiles) {
            tile.classList.add("correct");
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
/**
 * 
 */
