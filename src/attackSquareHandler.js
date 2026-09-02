import { getPlayer } from "./playerLookup"
import updateBoardUI from "./updateBoardUI"
import TurnManager from "./TurnManager";
import updateCurrentPlayerDisplay from "./updateCurrentPlayerDisplay";
import computerAttack from "./computerAttack";
import updateWinnerDisplay from "./updateWinnerDisplay";
import getWinnersName from "./getWinnersName";

export default function attackSquareHandler(event){
    if (getWinnersName()) return;

    let squareButton = event.target;
    let x = squareButton.dataset.x;
    let y = squareButton.dataset.y;

    let playerCard = squareButton.parentNode.parentNode;
    let targetPlayerName = playerCard.dataset.name;
    let targetPlayer = getPlayer(targetPlayerName);
    let currentPlayer = TurnManager.getCurrentPlayer();

    // only receive attack if target player is not the current player
    if (targetPlayerName !== TurnManager.getCurrentPlayerName() 
        && !Number(squareButton.dataset.attacked)
        && !currentPlayer.board.allShipsSunk()){
        // if current player is computer player type, record attack
        if (currentPlayer.playerType === "computer"){
            currentPlayer.computerRecordAttack(x, y);
        }
        targetPlayer.board.receiveAttack(x, y);   
    }

    updateBoardUI(targetPlayer.board, playerCard.querySelector(".boardUI"));
    updateWinnerDisplay();

    if (getWinnersName()) return;

    TurnManager.nextTurn();
    let currentPlayerDisplay = playerCard.parentNode.parentNode
        .querySelector(".currentPlayerDisplay");
    updateCurrentPlayerDisplay(currentPlayerDisplay);
    
    computerAttack();
}