import playerList from "./playerList";

// Victory is when only 1 player has ships still floating.
export default function getWinnersName(){
    /*
        Checks the playerList. If only 1 player has ships 
        still floating, return the winning player's name.
        Else, return null.
    */

    if (playerList.length <= 1){
        // if game has less than 2 players, winning is pointless
        return null;
    }

    let playersWithShips = [];
    playerList.forEach((player) => {
        if (!player.board.allShipsSunk()) playersWithShips.push(player);
    })

    if (playersWithShips.length === 1) return playersWithShips[0].name
    else return null;
}
