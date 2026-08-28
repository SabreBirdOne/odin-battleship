import { getPlayer } from "./playerLookup"
import updateBoardUI from "./updateBoardUI"
import TurnManager from "./TurnManager";
import updateCurrentPlayerDisplay from "./updateCurrentPlayerDisplay";

export default function attackSquareHandler(event){
    
    let squareButton = event.target;
    let x = squareButton.dataset.x;
    let y = squareButton.dataset.y;

    let playerCard = squareButton.parentNode.parentNode;
    const targetPlayerName = playerCard.dataset.name;
    let player = getPlayer(targetPlayerName);

    // only receive attack if target player is not the current player
    if (targetPlayerName !== TurnManager.getCurrentPlayerName()){
        player.board.receiveAttack(x, y);
        TurnManager.nextTurn();

        updateBoardUI(player.board, playerCard.querySelector(".boardUI"));
        
        let currentPlayerDisplay = playerCard.parentNode.parentNode
            .querySelector(".currentPlayerDisplay");
        updateCurrentPlayerDisplay(currentPlayerDisplay);
    }

    
}