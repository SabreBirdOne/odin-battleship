import TurnManager from "./TurnManager";

export default function computerAttack(){
    let currentPlayer = TurnManager.getCurrentPlayer();
    if (currentPlayer.playerType === "computer"
        && !currentPlayer.board.allShipsSunk()
    ){
        // if current player is computer player type,
        // And this player still has unsunked ships
        
        // find next player to attack
        let targetPlayerName = TurnManager.getNextPlayerName();
        let nextAttack = currentPlayer.computerGetNextAttack().split(",");

        // find the next squareButton of the player to attack
        let targetPlayerCard = document.querySelector(
            `[data-name="${targetPlayerName}"]`
        );
        let targetButton = targetPlayerCard.querySelector(
            `[data-x="${nextAttack[0]}"][data-y="${nextAttack[1]}"]`
        )

        // attack the next player
        targetButton.click();
    }
}

