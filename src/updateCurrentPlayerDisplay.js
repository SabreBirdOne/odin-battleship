import TurnManager from "./TurnManager";

export default function updateCurrentPlayerDisplay(display){
    
    let currentPlayerNameElement = display.querySelector(".currentPlayerName");
    currentPlayerNameElement.textContent = 
        TurnManager.getCurrentPlayerName();
}