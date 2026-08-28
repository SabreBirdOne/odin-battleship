import createBoardUI from "./boardUIFactory";

export default function createPlayerCard (player){
    // player is a Player instance to build the playerCard

    const card = document.createElement("div");

    card.dataset.name = player.name;
    card.classList.add("playerCard");
    
    const playerTag = document.createElement("p");
    const playerType = player.playerType === "real" ? "real" : "CPU"
    playerTag.textContent = `Admiral: ${player.name} (${playerType})`;

    // Use player.board to build board in the DOM
    const playerBoard = createBoardUI(player.board);

    [ playerTag, playerBoard ]
    .forEach((element) => card.append(element));

    return card;
}