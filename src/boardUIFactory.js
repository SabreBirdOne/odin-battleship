import createSquareButton from "./squareButtonFactory";

export default function createBoardUI(board){
    // board is a GameBoard object to build the board UI

    const boardUI = document.createElement("div");
    boardUI.classList.add("boardUI");

    for (let i = 0; i < board.sideLength; i++){
        for (let j = 0; j < board.sideLength; j++){
            // Add squares to the boardUI element
            boardUI.appendChild(createSquareButton(j, i));
        }
    }

    return boardUI;
};