export default function createWinnerDisplay(){
    let div = document.createElement("div");
    div.classList.add("winnerDisplay");

    let winnerP = document.createElement("p");
    winnerP.textContent = "Winner";
    
    let winnerName = document.createElement("p");
    winnerName.classList.add("winnerName");
    winnerName.textContent = "N/A";

    [
        winnerP, winnerName
    ].forEach((element) => div.appendChild(element));

    return div;
}