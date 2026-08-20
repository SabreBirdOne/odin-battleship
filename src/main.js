import playerList from "./playerList";
import Player from "./Player";

import createPlayerCard from "./playerCardFactory";

export default function init(){
    const body = document.querySelector("body");
    
    const mainPageHeader = document.createElement("h1");
    mainPageHeader.textContent = "ODIN'S BATTLESHIP";

    const playerCards = document.createElement("div");
    playerCards.classList.add("playerCards");

    playerList.push(new Player("Admiral 1"));
    playerList.push(new Player("ABYSS", "computer"));
    
    for (const player of playerList){
        // Add playerCards to this div based on playerList
        playerCards.appendChild(createPlayerCard(player));
    }

    
    [
        mainPageHeader,
        playerCards
    ].forEach((element) => body.appendChild(element));
}