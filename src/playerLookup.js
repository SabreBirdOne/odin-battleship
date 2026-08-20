import playerList from "./playerList"

function getPlayer(name){
    /* Given a player's name, return the player from PlayerList
        If no player exist with the name, return null
    */
    const foundPlayer = playerList.find((player) => player.name === name);
    return foundPlayer ? foundPlayer : null;
}

function getPlayerCard(name, playerCards){
    /* Given playerCards and the name of a player, 
        return the playerCard of that player. if not found, return null
    */
    const foundCard = playerCards.querySelector(`[data-name="${name}"]`)
    return foundCard ? foundCard : null;
}

export {
    getPlayer, getPlayerCard
}

