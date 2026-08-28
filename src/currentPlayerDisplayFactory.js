export default function createCurrentPlayerDisplay(){
    let div = document.createElement("div");
    div.classList.add("currentPlayerDisplay");

    let currentPlayerP = document.createElement("p");
    currentPlayerP.textContent = "Current Player";
    
    let currentPlayerName = document.createElement("p");
    currentPlayerName.classList.add("currentPlayerName");
    currentPlayerName.textContent = "N/A";

    [
        currentPlayerP, currentPlayerName
    ].forEach((element) => div.appendChild(element));

    return div;
}