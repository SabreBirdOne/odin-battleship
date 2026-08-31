import playerList from "./playerList";

export default class TurnManager {
    static currentTurn = 0;

    static getCurrentTurn(){
        return this.currentTurn;
    }

    static getNextTurn(){
        return (this.currentTurn + 1) % playerList.length;
    }

    static getCurrentPlayerName(){
        return playerList[this.currentTurn] ? 
            playerList[this.currentTurn].name :
            "N/A";
    }

    static getCurrentPlayer(){
        return playerList[this.currentTurn] ? 
            playerList[this.currentTurn] :
            null;
    }

    static getNextPlayerName(){
        return playerList[this.getNextTurn()] ?
            playerList[this.getNextTurn()].name :
            null;
    }

    static nextTurn(){
        this.currentTurn = this.getNextTurn();
    }

    static resetTurn(){
        this.currentTurn = 0;
    }
} 