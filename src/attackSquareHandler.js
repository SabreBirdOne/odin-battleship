import { getPlayer } from "./playerLookup"
import updateBoardUI from "./updateBoardUI"

export default function attackSquareHandler(event){
    
    let squareButton = event.target;
    let x = squareButton.dataset.x;
    let y = squareButton.dataset.y;

    let playerCard = squareButton.parentNode.parentNode;
    const playerName = playerCard.dataset.name;
    let player = getPlayer(playerName);

    player.board.receiveAttack(x, y);
    updateBoardUI(player.board, playerCard.querySelector(".boardUI"));
}