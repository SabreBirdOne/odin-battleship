export default function updateBoardUI(board, boardUI){
    /* Given a player's GameBoard and the board UI div,
        update the board UI.
     */

    let occupiedSquares = board._getOccupiedSquares();
    let attackedSquares = board.hits.concat(board.misses);

    for (let i = 0; i < board.sideLength; i++){
        for(let j = 0; j < board.sideLength; j++){
            // find each squareButton on the board UI
            let squareButton = boardUI.querySelector(
                `[data-x="${j}"][data-y="${i}"]`
            );
            
            let squareString = `${j},${i}`;

            squareButton.dataset.attacked = 
                attackedSquares.includes(squareString) ?
                1 : 0;
                
            squareButton.dataset.occupied = 
                occupiedSquares.includes(squareString) ?
                1 : 0;
        }
    }
}