import { getPlayer } from "./playerLookup";
import updateBoardUI from "./updateBoardUI";

function computeShipLength(startX, startY, endX, endY){
    if (startX === endX && startY < endY){
        // vertically placed ship
        return Math.abs(startY - endY) + 1;
    }
    else if (startY === endY && startX < endX){
        // horizontally placed ship
        return Math.abs(startX - endX) + 1;
    }
    else if (startX === endX && startY === endY){
        // ship of length 1
        return 1;
    }
    else {
        return -1;
    }
}

export default function placeShipButtonHandler(event){
    event.preventDefault();

    const form = event.target.parentNode;
    const playerNameInForm = form.dataset.playerName;
    
    // Get the coordinates
    const startX = form.querySelector(`input#StartX_${playerNameInForm}`).value ?? -1;
    const startY = form.querySelector(`input#StartY_${playerNameInForm}`).value ?? -1;
    const endX = form.querySelector(`input#EndX_${playerNameInForm}`).value ?? -1;
    const endY = form.querySelector(`input#EndY_${playerNameInForm}`).value ?? -1;
    const length = computeShipLength(startX, startY, endX, endY);
    
    // Get the player
    const playerName = form.parentNode.dataset.name;
    const player = getPlayer(playerName);
    let playerCard = form.parentNode;
    
    // Place Ship (validity check is built-in as part of GameBoard)
    player.board.placeShip(length, startX, startY, endX, endY);

    // Update boardUI
    updateBoardUI(player.board, playerCard.querySelector(".boardUI"))
}