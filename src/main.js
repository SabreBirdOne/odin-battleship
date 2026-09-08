import playerList from "./playerList";
import Player from "./Player";

import createPlayerCard from "./playerCardFactory";
import { getPlayer } from "./playerLookup";
import updateBoardUI from "./updateBoardUI";
import createCurrentPlayerDisplay from "./currentPlayerDisplayFactory";
import updateCurrentPlayerDisplay from "./updateCurrentPlayerDisplay";
import createWinnerDisplay from "./winnerDisplayFactory";

export default function init(){
    const body = document.querySelector("body");
    
    const mainPageHeader = document.createElement("h1");
    mainPageHeader.textContent = "ODIN'S BATTLESHIP";

    const playerCards = document.createElement("div");
    playerCards.classList.add("playerCards");

    playerList.push(new Player("Admiral 1"));
    playerList.push(new Player("ABYSS", "computer"));

    // Place ships to each player's board
    const admiral1 = getPlayer("Admiral 1");
    const abyss = getPlayer("ABYSS");
    
    for (const player of playerList){
        // Add playerCards to this div based on playerList
        let playerCard = createPlayerCard(player);
        playerCards.appendChild(playerCard);

        updateBoardUI(player.board, playerCard.querySelector(".boardUI"))
    }

    const currentPlayerDisplay = createCurrentPlayerDisplay();
    updateCurrentPlayerDisplay(currentPlayerDisplay);

    const winnerDisplay = createWinnerDisplay();

    [
        mainPageHeader,
        currentPlayerDisplay,
        winnerDisplay,
        playerCards,
    ].forEach((element) => body.appendChild(element));
}