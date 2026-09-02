import getWinnersName from "./getWinnersName";

export default function updateWinnerDisplay(){
    let winnerNameString = getWinnersName();
    if (winnerNameString){
        let winnerNameP = document.querySelector(".winnerName");
        winnerNameP.textContent = winnerNameString;
    }
}